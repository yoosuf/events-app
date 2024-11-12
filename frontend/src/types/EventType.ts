// src/types/Event.ts

export interface Event {
  id: number
  organizer_id: number
  title: string
  description: string
  timezone: string
  start_date: Date
  end_date: Date
  location: string
  is_online: boolean
  cover_image_id: number
  capacity: number
  created_at: Date
  updated_at: Date
  categories_id: number  // Foreign key reference to Category
  thumbnail_id: number    // Thumbnail image ID
}