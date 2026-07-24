import { useDroppable } from '@dnd-kit/core'
import type { Task, TeamMember } from '../types'
import TaskCard from './TaskCard'
import { colors, typography } from '../theme'

interface ColumnProps {
    title: string
    tasks: Task[]
    teamMembers: TeamMember[]
}

function Column({ title, tasks, teamMembers }: ColumnProps) {
    const { setNodeRef, isOver } = useDroppable({ id: title })
    return (
        <div
            ref={setNodeRef}
            style={{
                flex: 1,
                background: isOver ? colors.accentLight : colors.background,
                padding: '1rem',
                borderRadius: '8px',
                color: colors.textPrimary,
                fontFamily: typography.fontFamily,
            }}
        >
            <h2 style={{ color: colors.textPrimary, fontSize: typography.sizeLg, fontWeight: typography.weightSemibold }}>
                {title}
            </h2>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} teamMembers={teamMembers} />
            ))}
        </div>
    )
}

export default Column