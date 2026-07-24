import { useDraggable } from "@dnd-kit/core"
import type { Task, TeamMember } from '../types'
import { colors, typography } from '../theme'

interface TaskCardProps {
    task: Task
    teamMembers: TeamMember[]
}

function getDueDateLabel(dueDate: string | null): { text: string; color: string } | null {
    if (!dueDate) return null
    const due = new Date(dueDate)
    const now = new Date()
    const diffMs = due.getTime() - now.getTime()
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
    if (diffDays < 0) return { text: 'Overdue', color: colors.danger }
    if (diffDays <= 2) return { text: 'Due soon', color: colors.warning }
    return { text: due.toLocaleDateString(), color: colors.neutral }
}

function TaskCard({ task, teamMembers }: TaskCardProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id })

    const style = {
        background: colors.surface,
        padding: '0.75rem',
        marginBottom: '0.5rem',
        borderRadius: '6px',
        cursor: 'grab',
        touchAction: 'none',
        userSelect: 'none' as const,
        color: colors.textPrimary,
        fontFamily: typography.fontFamily,
        fontSize: typography.sizeBase,
        ...(transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : {}),
    }

    const dueLabel = getDueDateLabel(task.due_date)
    const assignee = teamMembers.find((m) => m.id === task.assignee_id)

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontWeight: typography.weightSemibold }}>{task.title}</span>
                {assignee && (
                    <div
                        title={assignee.name}
                        style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: assignee.avatar_color || colors.neutral,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: colors.surface,
                            fontSize: typography.sizeSm,
                            flexShrink: 0,
                        }}
                    >
                        {assignee.name.charAt(0).toUpperCase()}
                    </div>
                )}
            </div>
            {task.description && (
                <div style={{ fontSize: typography.sizeSm, color: colors.textSecondary, marginTop: '0.25rem' }}>
                    {task.description}
                </div>
            )}
            {task.labels && task.labels.length > 0 && (
                <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.35rem' }}>
                    {task.labels.map((label) => (
                        <span
                            key={label}
                            style={{
                                background: colors.accentLight,
                                color: colors.accent,
                                fontSize: typography.sizeSm,
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
                <div style={{ fontSize: typography.sizeSm, color: dueLabel.color, marginTop: '0.25rem' }}>
                    {dueLabel.text}
                </div>
            )}
        </div>
    )
}

export default TaskCard