// import { useState } from "react";
import "./register.css";

export function Register() {
  return (
    <div className="title">
      <h1> Création de Compte</h1>
      <form className="register-container" method="post">
        <input
          className="pseudo register"
          type="text"
          name="pseudo"
          placeholder="@Pseudo"
          required
        />

        <input
          className="email register"
          type="email"
          name="email"
          placeholder="e m a i l"
          required
        />

        <input
          className="password register"
          type="password"
          name="password"
          placeholder="m o t   d e   p a s s e"
          required
        />

        <input
          className="confirmPassword register"
          type="password"
          name="confirm_password"
          placeholder="m o t   d e   p a s s e   e n c o r e"
          required
        />

        <button type="submit">Créer un compte</button>
      </form>
    </div>
  );
}
