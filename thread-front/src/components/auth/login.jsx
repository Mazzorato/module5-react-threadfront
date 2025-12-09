import "./login.css";

export function Login() {
  return (
    <>
      <form method="post">
        <input type="email" name="email" placeholder="email" required />

        <input
          type="password"
          name="password"
          placeholder="********"
          required
        />

        <button type="submit">Se connecter</button>
      </form>

      <a href="#">Se créer un compte</a>
    </>
  );
}
