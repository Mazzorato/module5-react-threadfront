import "./NavBar.css"
export default function navBar() {
    return (
        <footer className="navBar">
            <button className="navBar-button-plus">
                <img src="../src/assets/Logo/logo-newpost.svg" />
            </button>
            <button className="navBar-button-profile">
                <img src="../src/assets/Logo/logo-profile.svg" />
            </button>
            <button className="navBar-button-message">
                <img src="../src/assets/Logo/logo-feed.svg" />
            </button>

        </footer>
    )
}