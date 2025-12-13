// import { useState } from "react";
import "./register.css";
import Title from "../shared/Title.jsx";

export function Register() {
  return (
    <div className="registerPage">
      <Title title={"Création de compte"} />
      <form className="registerForm" method="post">
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
