import { useEffect, useState } from 'react'
import { DndContext } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { ensureGuestSession, fetchTasks, updateTaskStatus } from './supabaseClient'
import type { Task } from './types'
import Board from './components/Board'

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

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return 

    const taskId = active.id as string
    const newStatus = over.id as string
    
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    )

    await updateTaskStatus(taskId, newStatus)
  }

  if (loading) return <div>Loading...</div>

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div>
        <h1>Konbon Board</h1>
        <Board tasks ={tasks} />
      </div>
    </DndContext>
  )
}

export default App