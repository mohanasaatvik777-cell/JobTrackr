import { useState } from 'react'
import { Briefcase, LayoutDashboard, Search, BarChart3, Mail, Lock } from 'lucide-react'
const Login = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const onsubmitter = (event) => {
        event.preventDefault()

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
                        <label htmlFor="email">Email</label>
                        <div className="input-wrap">
                            <Mail size={17} />
                            <input id="email" type="email" name="email" value={email} onChange={(e) => setemail(e.target.value)} placeholder="name@company.com" />
                        </div>

                        <label htmlFor='password'>Password</label>
                        <div className="input-wrap">
                            <Mail size={17} />
                            <input id="password" type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Enter your password" />
                        </div>

                        <button type="submit">Log in</button>
                    </form>

                    <p>No account yet? Register</p>
                </div>
            </div>
        </div>
    )
}
export default Login