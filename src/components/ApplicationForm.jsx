import { useState } from 'react'

const ApplicationForm = () => {
    const [com, setcom] = useState("")
    const [rol, setrol] = useState("")
    const [applied, setapplied] = useState("")
    const [prior, setpre] = useState("")
    const onsubmitted = (event) => {
        event.preventDefault();
        const formfile = {
            id: Date.now(),
            company: com,
            role: rol,
            status: "Applied",
            appliedOn: applied,
            priority: prior

        }
        setcom("")
        setrol("")
        setapplied("")
        setpre("")



    }
    return (
        <section className="form">

            <form onSubmit={onsubmitted}>

                <label htmlFor="company">
                    company
                </label>
                <input id="company" name="company" type="text" placeholder="Company name" value={com} onChange={(e) => setcom(e.target.value)} />
                <label htmlFor="role">Role</label>
                <input id="role" name="role" value={rol} type="text" placeholder="Enter your role" onChange={(e) => setrol(e.target.value)} />
                <label htmlFor="applied" >Applied On</label>
                <input id="applied" value={applied} type="date" onChange={(e) => setapplied(e.target.value)} />
                <label htmlFor="priority">Priority</label>
                <select
                    id="priority"
                    value={color}
                    onChange={(e) => setpre(e.target.value)}
                >
                    <option value="High">High</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>

                </select>
                <button type="submit">Add application</button>
            </form>

        </section>
    )
}
export default ApplicationForm