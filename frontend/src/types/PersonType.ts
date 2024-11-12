export interface User {
    id: number
    name: string
    email: string
    phone: string
    password: string
    created_at: Date
    updated_at: Date
    timezone: string
    verified_at: Date | null
    profile_image_id: number | null
    role: 'admin' | 'user' | 'moderator'  // Adjust the roles based on the actual ENUM values
  }
  