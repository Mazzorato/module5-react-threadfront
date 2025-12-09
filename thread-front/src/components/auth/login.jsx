import "./login.css";

export function Login() {
  return (
    <>
      <form method="post">
        <label>
          Email
          <input type="email" name="email" required />
        </label>

        <label>
          Mot de passe
          <input type="password" name="password" required />
        </label>

        <button type="submit">Se connecter</button>
      </form>

      <a href="#">Se créer un compte</a>
    </>
  );
}
