import { createClient } from '@supabase/supabase-js'
import type { Task } from './types'

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