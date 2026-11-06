import { useState } from 'react'
import { Briefcase, LayoutDashboard, Search, BarChart3, Mail, Lock, User } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Register = () => {
    const { register } = useAuth()
    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [loading, setloading] = useState(false)

    const [name, setname] = useState("")

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const onsubmitter = async (event) => {
        event.preventDefault()
        setloading(true)
        setError("")
        try {
            await register({ name, email, password })
            navigate("/")
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed")
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
                <h1>Start tracking your job hunt today</h1>
                <p>Create a free account in under a minute</p>
                <div className="brand-feature"><LayoutDashboard size={18} /> Kanban board by stage</div>
                <div className="brand-feature"><Search size={18} /> Search and filter fast</div>
                <div className="brand-feature"><BarChart3 size={18} /> Stats on interviews and offers</div>

            </div>
            <div className="login-form-side">
                <div className="login-card">
                    <h1>Create account</h1>
                    <p className="login-sub">Fill in your details below</p>
                    <form onSubmit={onsubmitter}>

                        {error && <p className="login-error">{error}</p>}
                        <label htmlFor="name">Name</label>
                        <div className="input-wrap">
                            <User size={17} />
                            <input id="name" type="text" name="name" value={name} onChange={(e) => setname(e.target.value)} placeholder="Your name" required />
                        </div>
                        <label htmlFor="email">Email</label>
                        <div className="input-wrap">
                            <Mail size={17} />
                            <input id="email" type="email" name="email" value={email} onChange={(e) => setemail(e.target.value)} placeholder="name@company.com" required />
                        </div>

                        <label htmlFor='password'>Password</label>
                        <div className="input-wrap">
                            <Lock size={17} />
                            <input id="password" minLength={6} type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Enter your password" required />
                        </div>

                        <button disabled={loading} type="submit">{loading ? "Creating account..." : "Create account"}</button>
                    </form>

                    <p>Already have an account? <Link to="/login">Log in</Link></p>
                </div>
            </div>
        </div>
    )
}
export default Register