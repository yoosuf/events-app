// src/store/eventStore.ts
import { defineStore } from 'pinia'
import eventService, { EventData } from '../services/eventService'
import { useAuthStore } from './authStore'
import { useRouter } from 'vue-router'

export const useEventStore = defineStore('eventStore', {
  state: () => ({
    events: [] as EventData[],
    joinedEvents: [] as EventData[],
    currentEvent: null as EventData | null,
    currentEventLoading: false,
    allEventsLoaded: false,
  }),

  actions: {
    async fetchEvents({ page = 1 }) {
      if (this.allEventsLoaded || this.currentEventLoading) return;

      this.currentEventLoading = true;
      try {
        const response = await eventService.fetchEvents({ page });

        if (response.length === 0) {
          this.allEventsLoaded = true;
        } else {
          const transformedEvents = response.map(event => ({
            ...event,
            cover_image_url: event.cover_image?.file_path || '',
            thumbnail_url: event.thumbnail?.file_path || '',
          }));
          this.events = [...this.events, ...transformedEvents];
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        this.currentEventLoading = false;
      }
    },

    getEventById(eventId: number) {
      return this.events.find(event => event.id === eventId) || null;
    },

    async fetchEventDetails(eventId: number) {
      if (this.currentEventLoading) return;

      const existingEvent = this.getEventById(eventId);
      if (existingEvent) {
        this.currentEvent = existingEvent;
        return;
      }

      this.currentEventLoading = true;

      try {
        const response = await eventService.getEventDetails(eventId);
        const event = response.data;

        const transformedEvent = {
          ...event,
          cover_image_url: event.cover_image?.file_path || '',
          thumbnail_url: event.thumbnail?.file_path || '',
        };

        this.events.push(transformedEvent);
        this.currentEvent = transformedEvent;
      } catch (error) {
        console.error('Error fetching event details:', error);
      } finally {
        this.currentEventLoading = false;
      }
    },

    async joinEvent(eventId: number) {
      const authStore = useAuthStore(); // Access the authStore to check authentication status
      const router = useRouter();

      // Check if user is authenticated
      if (!authStore.isAuthenticated) {
        console.warn('User is not authenticated, redirecting to login page.');
        await router.push({ name: 'Login', query: { redirect: `/events/${eventId}` } });
        return;
      }

      // Attempt to join the event if authenticated
      try {
        console.log(`Joining event ID ${eventId}`);
        await eventService.joinEvent(eventId);
        console.log(`Successfully joined event ID ${eventId}`);
      } catch (error) {
        console.error('Error joining event:', error);
      }
    },



    async fetchJoinedEvents() {
      try {
        console.log('Fetching joined events...');
        const response = await eventService.fetchJoinedEvents();

        // Apply the type to the `event` parameter to avoid the implicit `any` type error
        const transformedEvents = response.events.map((event: EventData) => ({
          ...event,
          cover_image_url: event.cover_image?.file_path || '',
          thumbnail_url: event.thumbnail?.file_path || '',
        }));

        this.joinedEvents = transformedEvents;
        console.log('Fetched joined events:', this.joinedEvents);
      } catch (error) {
        console.error('Error fetching joined events:', error);
      }
    }


  },
});
