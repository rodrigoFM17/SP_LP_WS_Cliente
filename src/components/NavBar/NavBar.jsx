import { useContext } from "react"
import UserContext from "../../context/UserContext"
import './NavBar.css'
import Notification from "../Notification/Notification"


export default function NavBar () {

    const {user} = useContext(UserContext)

    return (
        <header className="navBar">
            <h1>
                Bienvenido {user.name}
            </h1>

            <Notification />

        </header>
    )
}