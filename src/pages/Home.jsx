//import ApplicationCard from '../components/ApplicationCard.jsx'
import { createApplication, deleteApplication, getApplications, updateApplication, getStats } from '../api/application.js'
import ApplicationForm from '../components/ApplicationForm.jsx'
import Board from '../components/Board.jsx'
//import Column from '../components/Column.jsx'
import Header from '../components/Header.jsx'
import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

// const myjobs = [{ id: 1, company: "Google", role: "SDE Intern", status: "Applied", appliedOn: "2026-10-12", priority: "High" },
// { id: 2, company: "Zoho", role: "Frontend intern", status: "Applied", appliedOn: "2026-10-18", priority: "Medium" },
// { id: 3, company: "Swiggy", role: "React Developer", status: "Applied", appliedOn: "2026-08-12", priority: "Low" },
// { id: 4, company: "Razorpay", role: "MERN Intern", status: "Interview", appliedOn: "2026-10-12", priority: "High" },
// { id: 5, company: "Freshworks", role: "UI Intern", status: "Interview", appliedOn: "2026-10-11", priority: "Medium" },
// { id: 6, company: "Atlassian", role: "Web Intern", status: "Offer", appliedOn: "2026-10-12", priority: "High" }
// ]
const Home = () => {
    const [searchparams, setsearch] = useSearchParams()

    const [apps, setApp] = useState([])
    //const [search, setsearch] = useState("")
    // const [filt, setfilt] = useState("All")
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState("")
    const search = searchparams.get("search") || ""
    const status = searchparams.get("status") || ""
    const page = Number(searchparams.get("page")) || 1
    const [stats, setstats] = useState(null)
    const [totalPages, setTotalPages] = useState(1)
    const movedclicked = async (id) => {
        const list = ["Applied", "Interview", "Offer"]
        const card = apps.find((a) => a._id === id)


        const index = list.indexOf(card.status) + 1
        if (list[index] === undefined) {
            return
        }
        const newStatus = list[index]
        const before = apps
        setApp(apps.map(a => a._id === id ? { ...a, status: newStatus } : a));

        try {

            await updateApplication(id, { status: newStatus })
            loadStats()

        } catch (err) {
            setApp(before)
            seterror(err.response?.data?.message || "Could not move")
        }

    }
    const rejectedclicked = async (id) => {
        const before = apps
        setApp(apps.map(a => a._id === id ? { ...a, status: "Rejected" } : a));

        try {
            await updateApplication(id, { status: "Rejected" })
            loadStats()

        } catch (err) {
            setApp(before)
            seterror(err.response?.data?.message || "Could not reject")
        }



    }
    // const visibleApps = apps.filter((fil) => {
    //     const text = search.trim().toLowerCase();
    //     const matchedboth = fil.role.toLowerCase().includes(text) || fil.company.toLowerCase().includes(text)
    //     const matchpriority = status === 'All' || fil.priority === status || status === ""
    //     return matchedboth && matchpriority
    // })

    //apps.push(x) and setApps(x) does not re-renders: The apps.push(x) mutates a same array in- place like changeing the contents or modifying the existing box
    //and setApps(x) it is also keep the same memeory reference  means using a same memory box not using a new box again

    const deletehandler = async (id) => {
        try {
            if (window.confirm(`You want to remove the ${apps.filter((a) => a._id === id)[0].company}`)) {
                await deleteApplication(id)
                loadStats()
                await loadApplications()
            }
        } catch (err) {
            seterror(err.response?.data?.message || "Could not delete")
        }


    }
    const onAdd = async (formfile) => {
        try {
            await createApplication(formfile)
            loadStats()
            await loadApplications()
        } catch (err) {
            seterror(err.response?.data?.message || "Could not add application")
        }

    }
    const updateParams = (key, value) => {
        const next = new URLSearchParams(searchparams)
        if (value === "") {
            next.delete(key)
        } else {
            next.set(key, value)
        }
        if (key === "search" || key === "status") {
            next.set("page", "1")
        }
        setsearch(next)
    }
    const loadApplications = async () => {
        setloading(true)
        seterror("")
        try {
            const result = await getApplications({ search, status, page })
            setApp(result.data)
            setTotalPages(result.totalPages)
        } catch (err) {
            seterror(err.response?.data?.message || "Could not load applicatoins")
        } finally {
            setloading(false)
        }
    }
    const loadStats = async () => {
        try {
            const data = await getStats()
            setstats(data)
        } catch (err) {

        }
    }
    useEffect(() => {
        loadApplications()
    }, [search, status, page])
    useEffect(() => { loadStats() }, [])

    return (
        <>
            <Header apps={apps} />
            <main className='page'>


                <ApplicationForm apps={apps} onAdd={onAdd} />
                <section className="filters">
                    <label htmlFor="search">Search</label>

                    <input id="search" value={search} type="text" placeholder="Search company or role" onChange={(e) => updateParams("search", e.target.value)} />
                    <label htmlFor="filter">Filter</label>
                    <select id='filter' value={status} onChange={(e) => updateParams("status", e.target.value)}>
                        <option value="">All</option>
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>

                    </select>

                </section>
                {stats !== null && (
                    <section className="stats-bar">
                        <div className="stats-total">Total: {stats.total}</div>
                        {["Applied", "Interview", "Offer", "Rejected"].map((name) => {
                            const row = stats.byStatus.find((r) => r._id === name);
                            return (
                                <div key={name} className="stats-item">
                                    <span className="stats-name">{name}: </span>
                                    <span className="stats-count">{row?.count ?? 0}</span>
                                </div>
                            );
                        })}
                    </section>
                )}
                {loading && <div>Loading...</div>}
                {error && <div style={{ color: 'red' }}>{error}</div>}

                <Board apps={apps} onMove={movedclicked} onReject={rejectedclicked} onDelete={deletehandler} />
                <div className="pagination-controls">
                    <button
                        onClick={() => updateParams("page", String(page - 1))}
                        disabled={page <= 1}
                    >
                        Previous
                    </button>

                    <span>Page {page} of {totalPages}</span>

                    <button
                        onClick={() => updateParams("page", String(page + 1))}
                        disabled={page >= totalPages}
                    >
                        Next
                    </button>
                </div>

            </main>
        </>

    )
}
export default Home
