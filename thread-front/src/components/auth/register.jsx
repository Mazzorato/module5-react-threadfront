// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import Title from "../shared/Title.jsx";

export function Register() {
  const navigate = useNavigate();

  

  async function handleSubmit(event) {
    event.preventDefault();
    

    const formData = new FormData(event.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPasswordValue = formData.get("confirmPassword");

    if (password !== confirmPasswordValue) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          verifiedPassword: confirmPasswordValue,
        }),
      });
      if (response.ok) {
        console.log("Inscription réussie");
        navigate("/login"); // Redirection vers la page de login
      } else {
        console.error("Erreur serveur lors de l'inscription");
      }
    } catch (err) {
      console.error("Erreur Fetch:", err);
    }
  }
  return (
    <div className="registerPage">
      <Title title={"Création de compte"} />
      <form className="registerForm" method="post" onSubmit={handleSubmit}>
        <input
          className="usernameR zoneT"
          type="text"
          name="username"
          placeholder="@Pseudo"
          required
        />

        <input
          className="emailR zoneT"
          type="email"
          name="email"
          placeholder="e m a i l"
          required
        />

        <input
          className="passwordR zoneT"
          type="password"
          name="password"
          placeholder="m o t   d e   p a s s e"
          required
        />

        <input
          className="confirmPasswordR zoneT"
          type="password"
          name="confirmPassword"
          placeholder="m o t   d e   p a s s e   e n c o r e"
          required
        />

        <button className="btnRegister" type="submit">
          Créer un compte
        </button>
      </form>
    </div>
  );
}
