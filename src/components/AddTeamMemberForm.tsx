import { useState } from 'react'
import { createTeamMember } from '../supabaseClient'
import type { TeamMember } from '../types'

interface AddTeamMemberFormProps {
    onMemberCreated: (member: TeamMember) => void
}

const COLORS = ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#78bfa']

function AddTeamMemberForm({ onMemberCreated }: AddTeamMemberFormProps) {
    const [name, setName] = useState('')
    const [color, setColor] = useState(COLORS[0])
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!name.trim()) return

        setSubmitting(true)
        const newMember = await createTeamMember(name.trim(), color)
        onMemberCreated(newMember)
        setName('')
        setSubmitting(false)
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Team member name"
                style={{ padding: '0.5rem', flex: 1 }}
            />
            <select value={color} onChange={(e) => setColor(e.target.value)} style={{ padding: '0.5rem' }}>
                {COLORS.map((c) => (
                    <option key={c} value={c} style={{ background: c}}>{c}</option>
                ))}
            </select>
            <button type="submit" disabled={submitting} style={{ padding: '0.5rem 1rem'}}>
                Add Member
            </button>
        </form>
    )
}

export default AddTeamMemberForm