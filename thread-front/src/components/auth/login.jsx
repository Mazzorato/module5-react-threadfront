import "./login.css";
import Title from "../shared/Title.jsx"; 

export function Login() {
  return (
    <div className="loginPage">
       <Title title={"Connexion"} />
      <form className="loginForm" method="post">
        <input
          className="emailL zoneT"
          type="email"
          name="email"
          placeholder="e m a i l"
          required
        />

        <input
          className="mdpL zoneT"
          type="password"
          name="password"
          placeholder="* * * * * * * *"
          required
        />

        <button className="btnLogin" type="submit">
          Se connecter
        </button>
      </form>

      <a className="lien" href="#">
        Se créer un compte
      </a>
    </div>
  );
}
