import { useEffect, useState } from 'react'
import { DndContext } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { ensureGuestSession, fetchTasks, updateTaskStatus } from './supabaseClient'
import type { Task, TeamMember } from './types'
import Board from './components/Board'
import AddTaskForm from './components/AddTaskForm'
import AddTeamMemberForm from './components/AddTeamMemberForm'

function App() {
  const [tasks, setTasks] =  useState<Task[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [labelFilter, setLabelFilter] = useState('')

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

  function handleTaskCreated(newTask: Task) {
    setTasks((prev) => [...prev, newTask])
  }

  function handleMemberCreated(newMember: TeamMember) {
    setTeamMembers((prev) => [...prev, newMember])
  }

  const allLabels = Array.from(new Set(tasks.flatMap((t) => t.labels || [])))

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLabel = !labelFilter || (task.labels || []).includes(labelFilter)
    return matchesSearch && matchesLabel
  })

  if (loading) return <div>Loading...</div>

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div>
        <h1>Konbon Board</h1>

        <h2 style={{ fontSize: '1rem' }}>Team</h2>
        <AddTeamMemberForm onMemberCreated={handleMemberCreated} />
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {teamMembers.map((member) => (
            <div
              key={member.id}
              title={member.name}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: member.avatar_color || '#9ca3af',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '0.75rem'
              }}
            >
              {member.name.charAt(0).toUpperCase()}
            </div>
          ))}
        </div>

        <AddTaskForm onTaskCreated={handleTaskCreated} teamMembers={teamMembers} />

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
          style={{ padding: '0.5rem', marginBottom: '1rem', width: '200px' }}
        />
        <select
          value={labelFilter}
          onChange={(e) => setLabelFilter(e.target.value)}
          style={{ padding: '0.5rem', marginBottom: '1rem' }}
        >
            <option value="">All labels</option>
            {allLabels.map((label)=> (
              <option key={label} value={label}>{label}</option>
            ))}
          </select>

        <Board tasks ={filteredTasks}  teamMembers={teamMembers} />
      </div>
    </DndContext>
  )
}

export default App