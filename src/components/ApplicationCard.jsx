import { ArrowRight, X, Trash2 } from "lucide-react"

const ApplicationCard = ({ app, onMove, onReject, onDelete }) => {
    return (
        <article className="card">
            <div className="row-top">
                <div>
                    <h3 className="card-company">{app.company}</h3>
                    <p className="card-role">{app.role}</p>
                    <p className="card-application">{app.appliedOn}</p>
                </div>
                <p className={`card-priority ${app.priority.toLowerCase()}`}>{app.priority}</p>
            </div>
            <div className="card-actions">
                {(app.status !== "Offer" && app.status !== "Rejected") && <button type="button" onClick={() => onMove(app.id)}><ArrowRight size={18} /></button>}
                <button type="button" onClick={() => onReject(app.id)}><X size={18} /></button>
                <button type="button" onClick={() => onDelete(app.id)}><Trash2 size={18} /></button>
            </div>
        </article>
    )
}
export default ApplicationCard