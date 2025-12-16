import "./NavBar.css"
import { useNavigate } from "react-router-dom";
export default function navBar() {
    const navigate = useNavigate(); 
   
    return (
        <footer className="navBar">
            <button className="navBar-button-plus" onClick={()=>navigate("/NewPost")}>
                <img src="../src/assets/Logo/logo-newpost.svg" />
            </button>
            <button className="navBar-button-profile" >
                <img src="../src/assets/Logo/logo-profile.svg" />
            </button>
            <button className="navBar-button-message" onClick={()=>navigate("/Feed")}>
                <img src="../src/assets/Logo/logo-feed.svg" />
            </button>

        </footer>
    )
}