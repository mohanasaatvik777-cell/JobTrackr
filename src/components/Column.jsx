import ApplicationCard from "./ApplicationCard.jsx"

const Column = ({ status, apps, onMove, onReject, onDelete }) => {
    const givenstatus = apps.filter((f) => f.status === status)
    return (

        <section className="column">
            <h2>{status} ({givenstatus.length})</h2>

            {givenstatus.length === 0 ? <p>Nothing here yet</p> :
                givenstatus.map((item) => <ApplicationCard key={item.id} app={item} onMove={onMove} onReject={onReject} onDelete={onDelete} />)}
        </section>
    )
}
export default Column