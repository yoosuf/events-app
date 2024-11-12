export interface EventPerson {
    id: number
    event_id: number
    person_id: number
    status: 'attending' | 'interested' | 'not_attending' // Enum for statuses
    created_at: Date
    updated_at: Date
    is_confirmed: boolean
    hashToken: string
    confirmed_at: Date | null
    confirmed_status: 'pending' | 'confirmed' | 'canceled' // Enum for confirmation statuses
  }