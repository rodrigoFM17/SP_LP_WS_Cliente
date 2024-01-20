import { useContext } from "react"
import UserContext from "../../context/UserContext"
import './NavBar.css'


export default function NavBar () {

    const {user} = useContext(UserContext)

    return (
        <header className="navBar">
            <h1>
                {user.name}
            </h1>

        </header>
    )
}