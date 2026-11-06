import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
const Header = ({ apps }) => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const logoutclicked = () => {
        logout()
        navigate("/login")
    }
    const inter = apps.filter((f) => f.status === "Interview")
    const offere = apps.filter((f) => f.status === "Offer")
    return (
        <header className="header" >
            <h1 className="heading1">JobTrackr</h1>
            <p className="heading1para" >{apps.length} {apps.length === 1 ? "application" : "applications"} . {inter.length} {inter.length === 1 ? "interview" : "interviews"} . {offere.length} {offere.length === 1 ? "offer" : "offers"} </p>
            <button type="button" className="logout-btn" onClick={logoutclicked}>Log out</button>
        </header>


    )
}
export default Header