import "./NavBar.css"
export default function navBar() {
    return (
        <footer className="navBar">
            <button className="navBar-button">
                <img src="../src/assets/Logo/circle-plus-solid-full.svg" />
            </button>
            <button className="navBar-button">
                <img src="../src/assets/Logo/circle-user-solid-full.svg" />
            </button>
            <button className="navBar-button">
                <img src="../src/assets/Logo/message-solid-full.svg" />
            </button>

        </footer>
    )
}