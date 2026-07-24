export interface Task {
    id: string
    title: string
    description: string | null
    status: string
    priority: string | null
    due_date: string | null
    assignee_id: string | null
    labels: string[]
    user_id: string
    created_at: string
}

export interface TeamMember {
    id: string
    name: string
    avatar_color: string | null
    user_id: string
    created_at: string
}