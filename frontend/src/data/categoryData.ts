import { Category } from '../types/CategoryType'

export const categories: Category[] = [
  {
    id: 1,
    name: 'Technology',
    slug: 'technology',
    description: 'Events focused on technology and innovation.',
    cover_image_id: 201,
    thumbnail_id: 301
  },
  {
    id: 2,
    name: 'Health',
    slug: 'health',
    description: 'Health-related events, workshops, and seminars.',
    cover_image_id: 202,
    thumbnail_id: 302
  },
  {
    id: 3,
    name: 'Education',
    slug: 'education',
    description: 'Educational events for learning and development.',
    cover_image_id: 203,
    thumbnail_id: 303
  },
  {
    id: 4,
    name: 'Business',
    slug: 'business',
    description: 'Events for business networking and opportunities.',
    cover_image_id: 204,
    thumbnail_id: 304
  }
]
