import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import Title from "../shared/Title.jsx"; 

export function Login() {
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event. preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {

      const response = await fetch("http://localhost:3000/login",{
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (response.ok) {
        console.log("Connexion réussie");
        const {username} = await response.json();
        navigate("/feed/" + username);
      } else {
        const errorData = await response.json();
        console.error("Erreur connexion :", errorData);
      }

    } catch (err) {
      console.error("Erreur Réseau :", err);
    }
  }


  return (
    <div className="loginPage">
       <Title title={"Connexion"} />
      <form className="loginForm" method="post" onSubmit={handleSubmit}>
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

      <Link className="lien" to="/register">
        Se créer un compte
      </Link>
    </div>
  );
}
