import "./register.css";


export function Register() {
  return (
    <form method="post">
      <label>
        Pseudo
        <input type="text" name="pseudo" required />
      </label>

      <label>
        Email
        <input type="email" name="email" required />
      </label>

      <label>
        Mot de passe
        <input type="password" name="password" required />
      </label>

      <label>
        Confirmer le mot de passe
        <input type="password" name="confirm_password" required />
      </label>

      <button type="submit">Créer un compte</button>
    </form>
  );
}
