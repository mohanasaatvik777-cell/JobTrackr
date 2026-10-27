import Column from './Column.jsx'

const Board = ({ apps, onMove, onReject, onDelete }) => {
    const stages_job = ["Applied", "Interview", "Offer", "Rejected"]

    return (
        <section className="board">
            {stages_job.map((item) => <Column key={item} status={item} apps={apps} onMove={onMove} onReject={onReject} onDelete={onDelete} />)}
        </section >
    )
}
export default Board