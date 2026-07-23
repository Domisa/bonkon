import { useDroppable } from '@dnd-kit/core'
import type { Task } from '../types'
import TaskCard from './TaskCard'

interface ColumnProps {
    title: string
    tasks: Task[]
}

function Column({ title, tasks }: ColumnProps) {
    const { setNodeRef, isOver} = useDroppable({ id: title })
    //temporary inline styling
    return (
        <div
            ref={setNodeRef}
            style={{
                flex: 1,
                background: isOver ? '#e0e7ff' : '#f4f4f5',
                padding: '1rem',
                borderRadius: '8px',
            }}
        >
            <h2>{title}</h2>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    )
}

export default Column