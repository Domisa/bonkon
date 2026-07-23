import { useDraggable } from "@dnd-kit/core"
import type { Task } from '../types'

interface TaskCardProps {
    task: Task
}

function TaskCard({ task }: TaskCardProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    })

    const style = transform
        ? { transform: 'translate(${transform.x}px, ${transform.y}px)' }
        : undefined

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="bg-white p-3 mb-2 rounded-md shadow-sm cursor-grab"
            >
                {task.title}
            </div>
    )
}

export default TaskCard