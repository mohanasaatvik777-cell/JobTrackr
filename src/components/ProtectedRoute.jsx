import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
const ProtectedRoute = ({ children }) => {
    const { loading, token } = useAuth()
    if (loading) {
        return <p>Loading...</p>
    }
    if (!token) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />
    }
    return children

}
export default ProtectedRoute