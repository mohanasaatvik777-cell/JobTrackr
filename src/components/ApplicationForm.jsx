import { useState } from 'react'

const ApplicationForm = ({ apps, onAdd }) => {
    const [com, setcom] = useState("")
    const [rol, setrol] = useState("")
    const [applied, setapplied] = useState("")
    const [prior, setpre] = useState("Medium")
    const [error, seterr] = useState({})
    const onsubmitted = (event) => {
        event.preventDefault();
        const newError = {}
        if (com.trim().length < 2 || com.trim().length > 60) {
            newError.company = "Company name must be 2 to 60 characters"
        }
        if (rol.trim().length < 2 || rol.trim().length > 60) {
            newError.role = "Role name must be 2 to 60 characters"
        }


        if (!newError.company && !newError.role) {
            const exists = apps.some(dup => {
                return dup.company.toLowerCase() === com.trim().toLowerCase() && dup.role.toLowerCase() === rol.trim().toLowerCase()
            })
            if (exists) {
                newError.company = "This application already exists"
            }
        }

        if (applied.length < 1) {
            newError.date = "Select a date"
        }
        else if (applied > new Date().toISOString().slice(0, 10)) {
            newError.date = "Date can’t be in the future"
        }
        if (Object.keys(newError).length > 0) {
            seterr(newError)
            return;
        }
        const formfile = {
            id: Date.now(),
            company: com.trim(),
            role: rol.trim(),
            status: "Applied",
            appliedOn: applied,
            priority: prior

        }
        onAdd(formfile)
        setcom("")
        setrol("")
        setapplied("")
        setpre("Medium")
        seterr({})



    }
    return (
        <section className="form">

            <form onSubmit={onsubmitted}>

                <label htmlFor="company">
                    company
                </label>
                <input id="company" name="company" type="text" placeholder="Company name" value={com} onChange={(e) => setcom(e.target.value)} />
                {error.company && <p>{error.company}</p>}
                <label htmlFor="role">Role</label>

                <input id="role" name="role" value={rol} type="text" placeholder="Enter your role" onChange={(e) => setrol(e.target.value)} />
                {error.role && <p>{error.role}</p>}
                <label htmlFor="applied" >Applied On</label>
                <input id="applied" value={applied} type="date" onChange={(e) => setapplied(e.target.value)} />
                {error.date && <p>{error.date}</p>}
                <label htmlFor="priority">Priority</label>
                <select
                    id="priority"
                    value={prior}
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