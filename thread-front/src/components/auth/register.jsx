// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import Title from "../shared/Title.jsx";

export function Register() {
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const pseudo = formData.get("pseudo");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm_password");

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: pseudo,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        }),
      });
      if (response.ok) {
        console.log("Inscription réussie");
        navigate("/login"); // Redirection vers la page de login
      } else {
        console.error("Erreur serveur lors de l'inscription");
      }  
      } catch (err) {
        console.error(err);
      }
    } 
    return (
      <div className="registerPage">
      <Title title={"Création de compte"} />
      <form className="registerForm" onSubmit={handleSubmit}>
        <input
          className="pseudoR zoneT"
          type="text"
          name="pseudo"
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
          name="confirm_password"
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

