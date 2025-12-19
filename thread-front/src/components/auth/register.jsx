// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import Title from "../shared/Title.jsx";
import { useContext } from "react";
import { NotifContext } from "../../utils/NotifContext";


export function Register() {
  const navigate = useNavigate();
  const { addNotif } = useContext(NotifContext);
  

  async function handleSubmit(event) {
    event.preventDefault();
    

    const formData = new FormData(event.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPasswordValue = formData.get("confirmPassword");

    if (password !== confirmPasswordValue) {
      return addNotif("Les mots de passe ne correspondent pas", "error");
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
      
      if (!response.ok) {
        const errorData = await response.json();
        return addNotif(errorData.message, "error");
      }

      if (response.ok) {
        console.log("Inscription réussie");
        addNotif("Inscription réussie", "success");
        navigate("/login"); // Redirection vers la page de login

      } else {
        console.error("Erreur serveur lors de l'inscription");
        addNotif("Erreur serveur lors de l'inscription", "error");
      }
    } catch (err) {
      console.error("Erreur Fetch:", err);
      addNotif("Erreur Réseau lors de l'inscription", "error");
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
          placeholder="@Username"
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
