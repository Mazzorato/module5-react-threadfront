import "./register.css";

export function Register() {
  return (
    <form  className="register-container" method="post">
      <input className="pseudo" type="text" name="pseudo" placeholder="@Pseudo" required />

      <input className="email" type="email" name="email" placeholder="e m a i l" required />

      <input className="password"
        type="password"
        name="password"
        placeholder="m o t   d e   p a s s e "
        required
      />

      <input className="confirmPassword"
        type="password"
        name="confirm_password"
        placeholder="m o t   d e   p a s s e    e n c o r e"
        required
      />

      <button type="submit">Créer un compte</button>
    </form>
  );
}
