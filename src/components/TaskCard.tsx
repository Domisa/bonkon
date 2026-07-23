import { useDraggable } from "@dnd-kit/core"
import type { Task } from '../types'

interface TaskCardProps {
    task: Task
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

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {task.title}
            </div>
    )
}

export default TaskCard