//import ApplicationCard from '../components/ApplicationCard.jsx'
import ApplicationForm from './components/ApplicationForm.jsx'
import Board from './components/Board.jsx'
//import Column from '../components/Column.jsx'
import Header from './components/Header.jsx'

import { useState } from 'react'
const myjobs = [{ id: 1, company: "Google", role: "SDE Intern", status: "Applied", appliedOn: "2026-10-12", priority: "High" },
{ id: 2, company: "Zoho", role: "Frontend intern", status: "Applied", appliedOn: "2026-12-1", priority: "Medium" },
{ id: 3, company: "Swiggy", role: "React Developer", status: "Applied", appliedOn: "202608-12", priority: "Low" },
{ id: 4, company: "Razorpay", role: "MERN Intern", status: "Interview", appliedOn: "2026-10-12", priority: "High" },
{ id: 5, company: "Freshworks", role: "UI Intern", status: "Interview", appliedOn: "2026-10-11", priority: "Medium" },
{ id: 6, company: "Atlassian", role: "Web Intern", status: "Offer", appliedOn: "2026-10-12", priority: "High" }
]
const App = () => {
    const [apps, setApp] = useState(myjobs)
    const movedclicked = (id) => {
        const changedaftermoved = apps.map((i) => i.id !== id ? i :
            {
                ...i, status:
                    i.status === "Applied" ? "Interview"
                        : i.status === "Interview" ? "Offer"
                            : i.status === "Offer" ? "Rejected" : "Rejected",
            })

        setApp(changedaftermoved)
    }
    const rejectedclicked = (id) => {
        const rejectedclicks = apps.map((r) => r.id !== id ? r : {
            ...r, status: "Rejected"
        })
        setApp(rejectedclicks)
    }

    const deletehandler = (id) => {
        const deleteclicked = apps.filter((d) => d.id !== id)
        setApp(deleteclicked)
    }
    return (
        <>

            {/* <ApplicationForm /> */}
            <Header apps={apps} />
            <Board apps={apps} onMove={movedclicked} onReject={rejectedclicked} onDelete={deletehandler} />
        </>

    )
}
export default App
