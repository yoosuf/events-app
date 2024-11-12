import { Media } from '../types/MediaType'

export const mediaRecords: Media[] = [
    {
        id: 1,
        file_name: "cover_image_1.jpg",
        file_path: "https://via.placeholder.com/851x315.jpg?text=Cover+Image+1",
        file_size: "150KB",
        mime_type: "image/jpeg",
        media_type: "image",
        uploaded_at: new Date("2024-01-15T10:15:30Z"),
        uploaded_by: 10,
        alt: "Sample cover image 1",
        description: "This is a placeholder cover image for testing purposes."
    },
    {
        id: 2,
        file_name: "cover_image_2.jpg",
        file_path: "https://via.placeholder.com/851x315.jpg?text=Cover+Image+2",
        file_size: "160KB",
        mime_type: "image/jpeg",
        media_type: "image",
        uploaded_at: new Date("2024-02-20T14:22:10Z"),
        uploaded_by: 15,
        alt: "Sample cover image 2",
        description: "Another placeholder cover image for testing purposes."
    },
    {
        id: 3,
        file_name: "cover_image_3.jpg",
        file_path: "https://via.placeholder.com/851x315.jpg?text=Cover+Image+3",
        file_size: "155KB",
        mime_type: "image/jpeg",
        media_type: "image",
        uploaded_at: new Date("2024-03-05T09:10:45Z"),
        uploaded_by: 12,
        alt: "Sample cover image 3",
        description: "A third placeholder cover image for testing purposes."
    },
    {
        id: 4,
        file_name: "cover_image_4.jpg",
        file_path: "https://via.placeholder.com/851x315.jpg?text=Cover+Image+4",
        file_size: "148KB",
        mime_type: "image/jpeg",
        media_type: "image",
        uploaded_at: new Date("2024-04-12T16:35:20Z"),
        uploaded_by: 8,
        alt: "Sample cover image 4",
        description: "This is another placeholder cover image for events."
    },
    {
        id: 5,
        file_name: "cover_image_5.jpg",
        file_path: "https://via.placeholder.com/851x315.jpg?text=Cover+Image+5",
        file_size: "152KB",
        mime_type: "image/jpeg",
        media_type: "image",
        uploaded_at: new Date("2024-05-18T20:45:55Z"),
        uploaded_by: 20,
        alt: "Sample cover image 5",
        description: "An additional placeholder cover image for event testing."
    },
    // Profile images for users with 128x128 size
    {
        id: 101,
        file_name: "profile_image_1.jpg",
        file_path: "https://via.placeholder.com/128.jpg?text=Profile+Image+1",
        file_size: "20KB",
        mime_type: "image/jpeg",
        media_type: "image",
        uploaded_at: new Date("2024-01-20T10:15:30Z"),
        uploaded_by: 10,
        alt: "User profile image 1",
        description: "This is a placeholder profile image for user 1."
    },
    {
        id: 102,
        file_name: "profile_image_2.jpg",
        file_path: "https://via.placeholder.com/128.jpg?text=Profile+Image+2",
        file_size: "22KB",
        mime_type: "image/jpeg",
        media_type: "image",
        uploaded_at: new Date("2024-02-22T14:22:10Z"),
        uploaded_by: 15,
        alt: "User profile image 2",
        description: "Placeholder profile image for user 2."
    },
    {
        id: 103,
        file_name: "profile_image_3.jpg",
        file_path: "https://via.placeholder.com/128.jpg?text=Profile+Image+3",
        file_size: "18KB",
        mime_type: "image/jpeg",
        media_type: "image",
        uploaded_at: new Date("2024-03-10T09:10:45Z"),
        uploaded_by: 12,
        alt: "User profile image 3",
        description: "Placeholder profile image for user 3."
    },
    {
        id: 104,
        file_name: "profile_image_4.jpg",
        file_path: "https://via.placeholder.com/128.jpg?text=Profile+Image+4",
        file_size: "25KB",
        mime_type: "image/jpeg",
        media_type: "image",
        uploaded_at: new Date("2024-04-05T16:35:20Z"),
        uploaded_by: 8,
        alt: "User profile image 4",
        description: "Placeholder profile image for user 4."
    },
    {
        id: 105,
        file_name: "profile_image_5.jpg",
        file_path: "https://via.placeholder.com/128.jpg?text=Profile+Image+5",
        file_size: "19KB",
        mime_type: "image/jpeg",
        media_type: "image",
        uploaded_at: new Date("2024-05-18T20:45:55Z"),
        uploaded_by: 20,
        alt: "User profile image 5",
        description: "Placeholder profile image for user 5."
    }
];
