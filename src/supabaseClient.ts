import { createClient } from '@supabase/supbase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabsae = createClient(supabaseUrl, supabaseAnonKey)

export async function ensureGuestSession() {
    const { data } = await supabase.auth.getSession()
    if (data.session) return data.session

    const { data: signInData, error } = await supabaseAnonKey.auth.signInAnonymously()
    if (error) {
        console.error('Anonymous sign-in failed:', error.message)
        throw error
    }
    return signInData.session
}
