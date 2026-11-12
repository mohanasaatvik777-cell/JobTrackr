import { useState, useRef, useEffect } from "react"
import Header from "../components/Header"
import { createConversation, streamMessage, listConversations, getConversation } from '../api/chat.js'

const ROLES = [
    "React Developer",
    "Node.js Developer",
    "Python Developer",
    "Java Developer",
    "Full stack developer",
    "Data analyst",
]
function formatDate(value) {
    if (!value) return ""
    const d = new Date(value)
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)
    if (d.toDateString() === today.toDateString()) return "Today"
    if (d.toDateString() === yesterday.toDateString()) return "Yesterday"
    return d.toLocaleDateString(undefined, { day: "numeric", month: "short" })
}
export default function Chat() {
    const [role, setRole] = useState("")
    const [activeRole, setActiveRole] = useState("")
    const [input, setInput] = useState("")
    const [conversationId, setconverse] = useState("")
    const [starting, setstarting] = useState(false)
    const [error, seterror] = useState("")
    const [messages, setmessagge] = useState([])
    const [streaming, setstreaming] = useState(false)
    const controllerRef = useRef(null);
    const [conversations, setconversations] = useState([])
    const [loadinglist, setloading] = useState(true)
    const [lastText, setlastText] = useState("")
    const startInterview = async () => {
        setstarting(true)
        seterror("")
        try {
            const convo = await createConversation(role.trim())
            setconverse(convo._id)
            setActiveRole(role.trim())
            setmessagge([])
            loadconversation()
            sendMessage(convo._id, "Start the interview", false)
        } catch (err) {
            seterror(err.status ? err.message : "Can't reach the server. Try again.")

        } finally {
            setstarting(false)
        }

    }
    const sendMessage = async (id, text, showUser = true) => {
        seterror("")
        setstreaming(true)
        setmessagge((prev) => [...prev, ...(showUser ? [{ role: "user", content: text }] : []),
        { role: "assistant", content: "" }])
        const controller = new AbortController()
        controllerRef.current = controller
        try {
            await streamMessage(id, text, (chunk) => {
                setmessagge((prev) => {
                    const copy = [...prev]
                    const last = copy[copy.length - 1]
                    copy[copy.length - 1] = { ...last, content: last.content + chunk }
                    return copy
                })
            }, controller.signal)
            setmessagge((prev) => {
                const last = prev[prev.length - 1]
                return last && last.role === "assistant" && last.content === ""
                    ? [...prev.slice(0, -1), { ...last, content: "(No reply. Try again.)" }]
                    : prev
            })


        } catch (err) {
            if (err.name === "AbortError") {
                setmessagge((prev) => {
                    const last = prev[prev.length - 1]
                    return last && last.content === "" ? prev.slice(0, -1) : prev
                })

            } else {

                setmessagge((prev) => prev.slice(0, -1))
                seterror(err.status ? err.message : "Cant't reach the server. Try again.")
            }
        } finally {
            controllerRef.current = null
            setstreaming(false)
        }
    }

    const newInterview = () => {
        setActiveRole("")
        setRole("")
        setInput("")
        setconverse("")
        seterror("")
        setmessagge([])
    }
    const handleSend = () => {
        const text = input.trim()
        if (text === "" || streaming) return
        setInput("")
        setlastText(text)
        sendMessage(conversationId, text)
    }
    const handleStop = () => {
        if (controllerRef.current) {
            controllerRef.current.abort()
        }
    }
    const handleRetry = () => {
        if (!lastText || streaming) return
        setmessagge((prev) => {
            const last = prev[prev.length - 1]
            return last && last.role === "user" ? prev.slice(0, -1) : prev
        })
        sendMessage(conversationId, lastText)
    }
    const openConversation = async (id) => {
        if (streaming || id === conversationId) return
        seterror("")
        try {
            const convo = await getConversation(id)
            setconverse(convo._id)
            setActiveRole(convo.role)
            setmessagge(convo.messages || [])
            setInput("")
        } catch (err) {
            seterror(err.status ? err.message : "Can't reach the server. Try again.")
        }
    }
    const loadconversation = async () => {
        try {
            const list = await listConversations()
            setconversations(list)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        loadconversation()
    }, [])
    return (
        <div className="chat-page">
            <Header />
            <div className="chat-layout">
                <aside className="chat-sidebar">
                    <button type="button" className="new-chat-btn" onClick={newInterview} disabled={streaming}>New interview</button>
                    <p className="sidebar-label">Your interviews</p>

                    {loadinglist ? (
                        <p className="sidebar-empty">Loading...</p>
                    ) : conversations.length === 0 ? (
                        <p className="sidebar-empty">No interviews yet</p>
                    ) : (
                        conversations.map((c) => (
                            <div
                                key={c._id}
                                className={c._id === conversationId ? "convo-item active" : "convo-item"}
                                onClick={() => openConversation(c._id)}
                            >
                                <p className="convo-role">{c.role}</p>
                                <p className="convo-date">{formatDate(c.createdAt)}</p>
                            </div>
                        ))
                    )}
                </aside>

                <section className="chat-main">
                    {activeRole === "" ? (
                        <div className="start-screen">
                            <h2 className="start-title">Start a mock interview</h2>
                            <p className="start-sub">Pick a role, or type your own</p>

                            <div className="role-chips">
                                {ROLES.map((r) => (
                                    <button
                                        key={r}
                                        type="button"
                                        className={role === r ? "chip active" : "chip"}
                                        onClick={() => setRole(r)}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>

                            <div className="start-row">
                                <input
                                    type="text"
                                    className="role-input"
                                    placeholder="Or type another role"
                                    maxLength={100}
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="start-btn"
                                    disabled={role.trim() === "" || starting}
                                    onClick={startInterview}
                                >
                                    {starting ? "Starting..." : "Start interview"}
                                </button>
                            </div>
                            {error && <p className="form-error">{error}</p>}
                        </div>
                    ) : (
                        <>
                            <div className="chat-head">
                                <p className="chat-head-role">{activeRole}</p>
                                <p className="chat-head-sub">Mock interview</p>
                            </div>

                            <div className="messages">
                                {messages.map((m, i) =>
                                    m.role === "assistant" ? (
                                        <div className="msg-row" key={i}>
                                            <div className="avatar">C</div>
                                            <div className="bubble coach-bubble">{m.content}</div>
                                        </div>
                                    ) : (
                                        <div className="msg-row me" key={i}>
                                            <div className="bubble me-bubble">{m.content}</div>
                                        </div>
                                    )
                                )}
                            </div>
                            {error && (
                                <p className="form-error">
                                    {error}{" "}
                                    {lastText && (
                                        <button type="button" className="retry-btn" onClick={handleRetry}>
                                            Retry
                                        </button>
                                    )}
                                </p>
                            )}
                            <div className="input-row">
                                <input
                                    type="text"
                                    className="chat-input"
                                    placeholder="Type your answer"
                                    maxLength={2000}
                                    value={input}
                                    disabled={streaming}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleSend()
                                    }}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                {streaming ? (
                                    <button type="button" className="send-btn stop-btn" onClick={handleStop}>
                                        Stop
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="send-btn"
                                        disabled={input.trim() === ""}
                                        onClick={handleSend}
                                    >
                                        Send
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </section>
            </div>
        </div>
    )
}