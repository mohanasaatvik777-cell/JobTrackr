import { createContext, useContext, useState, useEffect } from 'react'
import { loginUser, registerUser, getMe } from '../api/auth.js'
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(null)
    const [token, settoken] = useState(localStorage.getItem("token"))
    const [loading, setloading] = useState(true)
    useEffect(() => {
        const authfunc = async () => {
            if (!token) {
                return setloading(false)
            }
            if (token) {
                try {
                    const data = await getMe()

                    setuser(data.user)

                } catch (err) {
                    localStorage.removeItem("token")
                    settoken(null)
                    setuser(null)

                } finally {
                    setloading(false)
                }




            }
        }
        authfunc()
    }, []);
    const login = async (data) => {
        const result = await loginUser(data)
        localStorage.setItem("token", result.token)
        settoken(result.token)
        setuser(result.user)
    }
    const register = async (data) => {
        const result = await registerUser(data)
        localStorage.setItem("token", result.token)
        settoken(result.token)
        setuser(result.user)
    }
    const logout = () => {
        localStorage.removeItem("token")
        settoken(null)
        setuser(null)
    }
    return <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)