import "./register.css";

export function Register() {
  return (
    <form method="post">
      <input type="text" name="pseudo" placeholder="@Pseudo" required />

      <input type="email" name="email" placeholder="email" required />

      <input
        type="password"
        name="password"
        placeholder="mot de passe"
        required
      />

      <input
        type="password"
        name="confirm_password"
        placeholder="mot de passe encore"
        required
      />

      <button type="submit">Créer un compte</button>
    </form>
  );
}
