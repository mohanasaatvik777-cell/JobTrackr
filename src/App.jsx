//import ApplicationCard from '../components/ApplicationCard.jsx'
import ApplicationForm from './components/ApplicationForm.jsx'
import Board from './components/Board.jsx'
//import Column from '../components/Column.jsx'
import Header from './components/Header.jsx'

import { useState } from 'react'
const myjobs = [{ id: 1, company: "Google", role: "SDE Intern", status: "Applied", appliedOn: "2026-10-12", priority: "High" },
{ id: 2, company: "Zoho", role: "Frontend intern", status: "Applied", appliedOn: "2026-10-18", priority: "Medium" },
{ id: 3, company: "Swiggy", role: "React Developer", status: "Applied", appliedOn: "2026-08-12", priority: "Low" },
{ id: 4, company: "Razorpay", role: "MERN Intern", status: "Interview", appliedOn: "2026-10-12", priority: "High" },
{ id: 5, company: "Freshworks", role: "UI Intern", status: "Interview", appliedOn: "2026-10-11", priority: "Medium" },
{ id: 6, company: "Atlassian", role: "Web Intern", status: "Offer", appliedOn: "2026-10-12", priority: "High" }
]
const App = () => {
    const [apps, setApp] = useState(myjobs)
    const [search, setsearch] = useState("")
    const [filt, setfilt] = useState("All")
    const movedclicked = (id) => {
        const changedaftermoved = apps.map((i) => i.id !== id ? i :
            {
                ...i, status:
                    i.status === "Applied" ? "Interview"
                        : i.status === "Interview" ? "Offer"
                            : i.status,
            })

        setApp(changedaftermoved)
    }
    const rejectedclicked = (id) => {

        const rejectedclicks = apps.map((r) => r.id !== id ? r : {
            ...r, status: "Rejected"
        })
        setApp(rejectedclicks)


    }
    const visibleApps = apps.filter((fil) => {
        const text = search.trim().toLowerCase();
        const matchedboth = fil.role.toLowerCase().includes(text) || fil.company.toLowerCase().includes(text)
        const matchpriority = filt === 'All' || fil.priority === filt
        return matchedboth && matchpriority
    })

    //apps.push(x) and setApps(x) does not re-renders: The apps.push(x) mutates a same array in- place like changeing the contents or modifying the existing box
    //and setApps(x) it is also keep the same memeory reference  means using a same memory box not using a new box again

    const deletehandler = (id) => {
        if (window.confirm(`You want to remove the ${apps.filter((a) => a.id === id)[0].company}`)) {
            const deleteclicked = apps.filter((d) => d.id !== id)
            setApp(deleteclicked)
        }

    }
    const onAdd = (formfile) => {
        formfile.status = "Applied"
        setApp([...apps, formfile])
    }
    return (
        <>
            <Header apps={apps} />
            <main className='page'>


                <ApplicationForm apps={apps} onAdd={onAdd} />
                <section className="filters">
                    <label htmlFor="search">Search</label>

                    <input id="search" value={search} type="text" placeholder="Search company or role" onChange={(e) => setsearch(e.target.value)} />
                    <label htmlFor="filter">Filter</label>
                    <select id='filter' value={filt} onChange={(e) => setfilt(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>

                    </select>

                </section>

                <Board apps={visibleApps} onMove={movedclicked} onReject={rejectedclicked} onDelete={deletehandler} />
            </main>
        </>

    )
}
export default App
