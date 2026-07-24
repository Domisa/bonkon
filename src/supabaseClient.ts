import { createClient } from '@supabase/supabase-js'
import type { Task } from './types'
import type { TeamMember } from './types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function ensureGuestSession() {
    const { data } = await supabase.auth.getSession()
    if (data.session) return data.session

    const { data: signInData, error } = await supabase.auth.signInAnonymously()
    if (error) {
        console.error('Anonymous sign-in failed:', error.message)
        throw error
    }
    return signInData.session
}

export async function fetchTasks(): Promise<Task[]> {
    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: true })
    
    if (error) {
        console.error('Failed to fetch tasks:', error.message)
        throw error
    }
    return data as Task[]
}

export async function updateTaskStatus(taskId: string, newStatus: string) {
    const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', taskId)
    
    if (error) {
        console.error('Failed to update task status:', error.message)
        throw error
    }
}

export async function fetchTeamMembers(): Promise<TeamMember[]> {
    const { data, error } = await supabase
        .from('team_member')
        .select('*')
        .order('created_at', {ascending: true})

    if (error) {
        console.error('Failed to fetch team members:', error.message)
        throw console.error();
    }
    return data as TeamMember[]
}

export async function createTeamMember(name: string, avatarColor: string): Promise<TeamMember> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('No authenticated user')

    const { data, error } = await supabase
        .from('team_members')
        .insert({ name, avatar_color: avatarColor || null, user_id: user.id })
        .select()
        .single()

        if (error) {
        console.error('Failed to create team member:', error.message)
        throw error
    }

    return data as TeamMember

}

    

export async function createTask(
    title: string, 
    status: string,
    description: string,
    dueDate: string,
    labels: string[],
    assigneeId: string | null
) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('No authenticated user')

        const { data, error } = await supabase
            .from('tasks')
            .insert({ 
                title, 
                status,
                description: description || null,
                due_date: dueDate || null,
                labels,
                assignee_id: assigneeId,
                user_id: user.id })
            .select()
            .single()
    
    if (error) {
        console.error('Failed to create task:', error.message)
        throw error
    }
    return data as Task
}