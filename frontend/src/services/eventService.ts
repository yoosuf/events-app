// src/services/eventService.ts
import apiClient from './axiosInstance'

export interface ImageData {
  id: number
  file_name: string
  file_path: string
  file_size: string
  mime_type: string
}

export interface EventData {
  id: number
  title: string
  description: string
  startDate: string
  endDate: string
  is_online: boolean
  location: string
  cover_image?: ImageData
  thumbnail?: ImageData
}

export default {
  async fetchEvents({ page = 1 } = {}): Promise<EventData[]> {
    console.log(`Fetching events, page: ${page}`) // Debugging point
    try {
      const response = await apiClient.get('/events', { params: { page } })
      console.log(`Fetched events data for page ${page}:`, response.data) // Debugging point
      return Array.isArray(response.data.data) ? response.data.data : []
    } catch (error) {
      console.error(`Error fetching events for page ${page}:`, error) // Error logging
      throw error
    }
  },

  async getEventDetails(eventId: number): Promise<{ data: EventData }> {
    console.log(`Fetching event details for eventId: ${eventId}`) // Debugging point
    try {
      const response = await apiClient.get(`/events/${eventId}`)
      console.log(`Fetched event details for eventId ${eventId}:`, response.data) // Debugging point
      return response.data
    } catch (error) {
      console.error(`Error fetching event details for eventId ${eventId}:`, error) // Error logging
      throw error
    }
  },


  async joinEvent(eventId: number): Promise<void> {
    console.log(`Joining event with eventId: ${eventId}`) // Debugging point
    try {
      await apiClient.post(`/events/${eventId}/join`)
      console.log(`Successfully joined event with eventId: ${eventId}`) // Debugging point
    } catch (error) {
      console.error(`Error joining event with eventId ${eventId}:`, error) // Error logging
      throw error
    }
  },


  async fetchJoinedEvents() {
    console.log('Fetching joined events from API...')
    try {
      const response = await apiClient.get('/my-events')
      return response.data
    } catch (error) {
      console.error('Error fetching joined events:', error)
      throw error
    }
  },

}
