import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate, useLocation, Link } from 'react-router-dom'

const Header = ({ apps }) => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const onChat = location.pathname === "/chat"

    const logoutclicked = () => {
        logout()
        navigate("/login")
    }

    const list = apps || []
    const inter = list.filter((f) => f.status === "Interview")
    const offere = list.filter((f) => f.status === "Offer")

    return (
        <header className="header">
            <h1 className="heading1">JobTrackr</h1>
            {apps && (
                <p className="heading1para">
                    {apps.length} {apps.length === 1 ? "application" : "applications"} . {inter.length} {inter.length === 1 ? "interview" : "interviews"} . {offere.length} {offere.length === 1 ? "offer" : "offers"}
                </p>
            )}
            <div className="header-actions">
                {onChat ? (
                    <Link to="/" className="coach-link">Back to applications</Link>
                ) : (
                    <Link to="/chat" className="coach-link">Interview coach</Link>
                )}
                <button type="button" className="logout-btn" onClick={logoutclicked}>Log out</button>
            </div>
        </header>
    )
}
export default Header