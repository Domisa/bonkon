import { useEffect, useState } from 'react'
import { ensureGuestSession, fetchTasks } from './supabaseClient'
import type { Task } from './types'

function App() {
  const [tasks, setTasks] =  useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      console.log('init running')
      await ensureGuestSession()
      const data = await fetchTasks()
      setTasks(data)
      setLoading(false)
    }
    init()
  }, [])


  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>Konbon Board</h1>
      <pre>{JSON.stringify(tasks, null, 2)}</pre>
    </div>
  )
}

export default App