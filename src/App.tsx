import { useEffect, useState } from 'react'
import { ensureGuestSession, fetchTasks } from './supabaseClient'
import type { task } from './types'

function App() {
  const [tasks, setTasks] =  useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      await ensureGuestSession()
      const data = await fetchTasks()
      setTasks(data)
      setLoading(false)
    }
    init()
  }, [])
}

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>Konbon Board</h1>
      <pre>{JSON.stringify(TaskSignal, null, 2)}</pre>
    </div>
  )