export interface Media {
    id: number
    file_name: string
    file_path: string
    file_size: string
    mime_type: string
    media_type: 'image' | 'video' | 'document' | 'other' // adjust as needed for ENUM values
    uploaded_at: Date
    uploaded_by: number
    alt: string
    description: string
  }
  