import { User } from "../models/UserModel.mjs";
import { JWT_SECRET } from "../config/config.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Création d'un compte utilisateur (route publique)
export async function register(req, res) {
  try {
    const { username, email, password, verifiedPassword } = req.body;
    console.log("Connexion ?");

    //Vérification de la présence des champs requis
    if (!email || !password || !verifiedPassword || !username) {
      return res.status(400).json({
        message: "Email, password, verifiedPassword and username are required",
      });
    }

    //Vérifie que les deux mot de passe correspondent
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
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Cet email existe déjà" });
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

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
    res.json({ message: "Connexion réussie" });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Erreur serveur : ${JSON.stringify(error)}` });
  }
}

export async function logout(req, res) {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
}

export async function me(req, res) {
  res.json({ username: req.user.username });
}
