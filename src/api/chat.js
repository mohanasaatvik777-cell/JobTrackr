const CHAT_URL = import.meta.env.VITE_API_URL + "/chat"

function authHeaders() {
    const token = localStorage.getItem("token")
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
}
async function handle(res) {
    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
        if (res.status === 401 && localStorage.getItem("token")) {
            localStorage.removeItem("token")
            window.location.href = "/login?expired=1"
        }
        const err = new Error(data.message || "something went wrong")
        err.status = res.status
        throw err
    }
    return data
}
export async function createConversation(role) {
    const res = await fetch(CHAT_URL, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ role })
    })
    return handle(res)
}
export async function streamMessage(conversationId, content, onChunk, signal) {

    const res = await fetch(`${CHAT_URL}/${conversationId}`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ content }),
        signal
    })
    if (!res.ok) {
        await handle(res)
    }
    const reader = res.body.getReader()
    const decode = new TextDecoder()
    while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const text = decode.decode(value, { stream: true })
        onChunk(text)
    }
} export async function listConversations() {
    const res = await fetch(CHAT_URL, {
        headers: authHeaders()
    })
    return handle(res)
}

export async function getConversation(id) {
    const res = await fetch(`${CHAT_URL}/${id}`, {
        headers: authHeaders()
    })
    return handle(res)
}