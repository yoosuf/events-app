import { EventPerson } from "../types/EventPersonType";

export const eventPeople: EventPerson[] = [
    {
      id: 1,
      event_id: 1,
      person_id: 1,
      status: 'attending',
      created_at: new Date('2024-01-01T09:00:00Z'),
      updated_at: new Date('2024-01-01T09:00:00Z'),
      is_confirmed: true,
      hashToken: 'abc123',
      confirmed_at: new Date('2024-01-01T10:00:00Z'),
      confirmed_status: 'confirmed'
    },
    {
      id: 2,
      event_id: 2,
      person_id: 1,
      status: 'interested',
      created_at: new Date('2024-02-01T09:00:00Z'),
      updated_at: new Date('2024-02-01T09:00:00Z'),
      is_confirmed: false,
      hashToken: 'def456',
      confirmed_at: null,
      confirmed_status: 'pending'
    },
    // Additional event-person relationships...
  ]