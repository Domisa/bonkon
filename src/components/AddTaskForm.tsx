import { useState } from 'react'
import { createTask } from '../supabaseClient'
import type { Task } from '../types'

interface AddTaskFormProps {
    onTaskCreated: (task: Task) => void
}

const STATUSES = ['To Do', 'In Progress', 'In Review', 'Done']

function AddTaskForm({ onTaskCreated }: AddTaskFormProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [labelsInput, setLabelsInput] = useState('')
    const [status, setStatus] = useState('To Do')
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit (e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!title.trim()) return
        
        setSubmitting(true)
        const labels = labelsInput
            .split(',')
            .map((l) => l.trim())
            .filter((l) => l.length > 0)

        const newTask = await createTask(title.trim(), status, description.trim(), dueDate, labels)
        onTaskCreated(newTask)
        setTitle('')
        setDescription('')
        setDueDate('')
        setLabelsInput('')
        setStatus('To Do')
        setSubmitting(false)
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                style={{ padding: '0.5rem', flex: 1 }}
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description (optional)"
                style={{ padding: '0.5rem', flex: 1 }}
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                style={{ padding: '0.5rem' }}
            />
            <input
                type="text"
                value={labelsInput}
                onChange = {(e) => setLabelsInput(e.target.value)}
                placeholder="Labels (comma separated)"
                style={{ padding: '0.5rem' }}
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: '0.5rem' }}>
                {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </select>
            <button type="submit" disabled={submitting} style={{ padding: '0.5rem 1rem' }}>
                Add
            </button>
        </form>
    )
}

export default AddTaskForm