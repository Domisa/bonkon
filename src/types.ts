export interface Task {
    id: string
    title: string
    description: string | null
    status: string
    priority: string | null
    due_date: string | null
    assignee_id: string | null
    user_id: string
    created_at: string
}