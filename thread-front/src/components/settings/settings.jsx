import { useNavigate } from "react-router-dom";

import "./settings.css";
import Title from "../shared/Title.jsx";
import NavBar from "../shared/NavBar.jsx";
import { useContext } from "react";
import { NotifContext } from "../../App.jsx";

export function Settings() {
  const navigate = useNavigate();
  const { addNotif } = useContext(NotifContext);

  const logout = async () => {
    try {
      await fetch("http://localhost:3000/logout", { method: "POST", credentials:'include' });
      addNotif("Déconnexion réussie", "success");
      navigate("/login");
    } catch (error) {
      console.error("Error logout:", error);
      addNotif("Erreur lors de la déconnexion", "error");
    }
  };

  return (
    <div className="SettingsPage">
      <Title title={"Settings"} />
      <div className="settings-container">
        <div>
          <p>Compte</p>
          <p>Notifications</p>
          <p>Confidentialité</p>
          <p>Paramètres avancés</p>
        </div>
        <button className="btnLogout" type="submit" onClick={logout}>
          Se déconnecter
        </button>
      </div>
      <NavBar />
    </div>
  );
}
