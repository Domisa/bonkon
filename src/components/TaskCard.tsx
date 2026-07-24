import { useDraggable } from "@dnd-kit/core"
import type { Task } from '../types'

interface TaskCardProps {
    task: Task
}

function getDueDateLabel(dueDate:  string | null): { text: string; color: string } | null {
    if (!dueDate) return null

    const due = new Date(dueDate)
    const now = new Date()
    const diffMs = due.getTime() - now.getTime()
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24 ))

    if (diffDays < 0 ) return { text: 'Overdue', color: '#dc2626' }
    if (diffDays <= 2) return { text: 'Due soon', color: '#d97706'}
    return { text: due.toLocaleDateString(), color: '#6b7280'}
}

function TaskCard({ task }: TaskCardProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    })

    const style = {
        background: 'white',
        padding: '0.75rem',
        marginBottom: '0.5rem',
        borderRadius: '6px',
        cursor: 'grab',
        touchAction: 'none',
        userSelect: 'none' as const,
        color: '#1e1e1e',
        ...(transform
            ? {transform: `translate(${transform.x}px, ${transform.y}px)` }
            : {}),
    }

    const dueLabel = getDueDateLabel(task.due_date)

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {task.title}
            {task.description && (
                <div style={{ fontSize: '0.85rem', color: '#4b5563', marginTop: '0.25rem' }}>
                    {task.description}
                </div>
            )}
            {dueLabel && (
                <div style={{ fontSize: '0.75rem', color: dueLabel.color, marginTop: '0.25rem' }}>
                    {dueLabel.text}
                </div>
            )}
            {task.labels && task.labels.length > 0 && (
                <div style ={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
                    {task.labels.map((label) => (
                        <span
                            key={label}
                            style={{
                                background: '#e0e7ff',
                                color: '#3730a3',
                                fontSize: '0.7rem',
                                padding: '0.1rem 0.5rem',
                                borderRadius: '999px',
                            }}
                        >
                            {label}
                        </span>
                    ))}
                    </div>
            )}
            {dueLabel && (
                <div style={{ fontSize: '0.75rem', color: dueLabel.color, marginTop: '0.25rem' }}>
                    {dueLabel.text}
                </div>
            )}
            </div>
    )
}

export default TaskCard