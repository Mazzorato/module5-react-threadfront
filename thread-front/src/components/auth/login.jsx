import "./login.css";

export function Login() {
  return (
    <div className="login">
      <div>
        <h1>Connexion</h1>
      </div>
      <form className="formulaire" method="post">
        <input className="email" type="email" name="email" placeholder="e m a i l" required />

        <input className="mdp"
          type="password"
          name="password"
          placeholder="* * * * * * * *"
          required
        />

        <button className="btn" type="submit">Se connecter</button>
      </form>

      <a className="lien" href="#">Se créer un compte</a>
    </div>
  );
}
