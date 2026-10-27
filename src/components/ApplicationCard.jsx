const ApplicationCard = ({ app, onMove, onReject, onDelete }) => {
    return (
        <article className="card">
            <div>
                <h3 className="card-company">{app.company}</h3>
                <p className="card-role">{app.role}</p>
                <p className="card-application">{app.appliedOn}</p>
            </div>
            <p className="card-priority">{app.priority}</p>
            <div className="card-actions">
                <button onClick={() => onMove(app.id)}>Move next</button>
                <button onClick={() => onReject(app.id)}>Rejected</button>
                <button onClick={() => onDelete(app.id)}>Deleted</button>
            </div>
        </article>
    )
}
export default ApplicationCard