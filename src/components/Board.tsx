import type { Task } from '../types'
import Column from './Column'

interface BoardProps {
    tasks: Task[]
}
//temporary hard limit to the current columns. No customization just
const DEFAULT_COLUMNS = ['To Do', 'In Progress', 'In Review', 'Done']

function Board({ tasks }: BoardProps) {
    //more temporary styling. Might use Tailwind
    return (
        <div style ={{ display: 'flex', gap: '1rem'  }}>
            {DEFAULT_COLUMNS.map((status) => (
                <Column
                    key={status}
                    title={status}
                    tasks={tasks.filter((task) => task.status === status)}
            />
        ))}
        </div>
    )
}

export default Board