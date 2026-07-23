import type { Task } from '../types'

interface ColumnProps {
    title: string
    tasks: Task[]
}

function Column({ title, tasks }: ColumnProps) {
    return (
        <div style={{ flex: 1, background: '#f4f45', padding: '1rem', borderRadius: '8px' }}>
            <h2>{title}</h2>
            {tasks.map((task) => (
                <div key ={task.id} style={{ background: 'white', padding: '0.75rem', marginBottom: '0.5rem', borderRadius: '6px' }}>
                    {task.title}
                </div>
        ))}
        </div>
    )
}

export default Column