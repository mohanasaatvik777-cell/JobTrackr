import { useState } from 'react'
import { Briefcase, LayoutDashboard, Search, BarChart3, Mail, Lock } from 'lucide-react'
import { useNavigate, Link, useLocation, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Login = () => {
    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const [error, setError] = useState("")
    const [loading, setloading] = useState(false)
    const expired = searchParams.get("expired") === 1

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const onsubmitter = async (event) => {
        event.preventDefault()
        setloading(true)
        setError("")
        try {
            await login({ email, password })
            navigate(location.state?.from || "/")
        } catch (err) {
            setError(err.response?.data?.message || "Login failed")
        } finally {
            setloading(false)
        }

    }
    return (
        <div className="login-page">
            <div className="login-brand">
                <div className="brand-top">
                    <div className="brand-logo"><Briefcase size={20} /></div>
                    <span>JobTrackr</span>
                </div>
                <h1>Track every job application in one place</h1>
                <p>Stay organised from first apply to final offer</p>
                <div className="brand-feature"><LayoutDashboard size={18} /> Kanban board by stage</div>
                <div className="brand-feature"><Search size={18} /> Search and filter fast</div>
                <div className="brand-feature"><BarChart3 size={18} /> Stats on interviews and offers</div>

            </div>
            <div className="login-form-side">
                <div className="login-card">
                    <h1>Welcome back</h1>
                    <p className="login-sub">Log in to your account</p>
                    <form onSubmit={onsubmitter}>
                        {expired && <p className="login-notice">Your session has expired</p>}
                        {error && <p className="login-error">{error}</p>}
                        <label htmlFor="email">Email</label>
                        <div className="input-wrap">
                            <Mail size={17} />
                            <input id="email" type="email" name="email" value={email} onChange={(e) => setemail(e.target.value)} placeholder="name@company.com" required />
                        </div>

                        <label htmlFor='password'>Password</label>
                        <div className="input-wrap">
                            <Lock size={17} />
                            <input id="password" type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Enter your password" required />
                        </div>

                        <button disabled={loading} type="submit">{loading ? "Logging in..." : "Log in"}</button>
                    </form>

                    <p>No account yet? <Link to="/register">Register</Link></p>
                </div>
            </div>
        </div>
    )
}
export default Login