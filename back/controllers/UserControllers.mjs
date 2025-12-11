import { UserModel } from "./UserModel";

//Création d'un compte utilisateur (route publique)
export async function register(req, res) {
  try {
    const { username, email, password, verifiedPassword } = req.body;

    //Vérification de la présence des champs requis
    if (!email || !password || !verifiedPassword || !username) {
      return res.status(400).json({
        message: "Email, password, verifiedPassword and username are required",
      });
    }

    //Vérifie que les deux mot de passe corrrespondent
    if (password != verifiedPassword) {
      // bcrypt compare
      return res.status(400).json({ message: "Password do not match" });
    }
    const emailNorm = email.trim().toLowerCase();

    // Création de l'utilisateur
    const user = await User.create({
      email: emailNorm,
      username,
      password,
    });

    return res.status(201).json({
      message: "User registered successfully",
      userId: user.id,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueContraintError") {
      return res.status(409).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: "Error registering user " });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const emailNorm = email.trim().toLowerCase();
    const user = await User.findOne({ where: { email: emailNorm } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true });
    res.json({ message: "Connexion réussie" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function logout(req, res) {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
}
