import { UserModel } from "./UserModel";


app.post("/register", async (req, res) => {
  //Création d'un compte utilisateur (route publique)
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
});

app.post("/login", async (req, res) => {
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
});

export async function UserAll() {
  const User = await new UserModel();

  app.get("/users", async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  });
}

export async function UserPost() {
  app.get("/user/:userId/posts", async (req, res) => {
    try {
      console.log(req.params);
      const userId = req.params.userId;
      req.user.getPosts();

      const posts = await Post.findAll({
        where: {
          UserId: userId,
        },
      });

      res.json(posts);
    } catch (error) {
      console.log(error);
      req.status(401).json({ error: "Unauthorized" });
    }
  });
}

app.get("/user/:id", async (req, res) => {
  console.log(req.params);

  const userId = req.params.id;
  const user = await User.findByPk(userId);
  res.json(user);
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
});

