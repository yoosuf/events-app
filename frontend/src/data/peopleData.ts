import { Person } from '../types/PersonType'


export const people: Person[] = [
    {
        id: 1,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        phone: "+12345678901",
        password: "$2b$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",  // Hashed password
        created_at: new Date("2024-01-10T12:00:00Z"),
        updated_at: new Date("2024-02-15T08:30:00Z"),
        timezone: "America/New_York",
        verified_at: new Date("2024-01-15T14:00:00Z"),
        profile_image_id: 101,
        role: "admin",
    },
    {
        id: 2,
        name: "Bob Smith",
        email: "bob.smith@example.com",
        phone: "+19876543210",
        password: "$2b$10$YYYYYYYYYYYYYYYYYYYYYYYYYYYYYY",  // Hashed password
        created_at: new Date("2024-03-22T10:20:30Z"),
        updated_at: new Date("2024-04-01T16:00:00Z"),
        timezone: "Europe/London",
        verified_at: new Date("2024-03-25T09:00:00Z"),
        profile_image_id: 102,
        role: "user",
    },
    {
        id: 3,
        name: "Carol Davis",
        email: "carol.davis@example.com",
        phone: "+11234567890",
        password: "$2b$10$ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ",  // Hashed password
        created_at: new Date("2024-05-05T15:15:15Z"),
        updated_at: new Date("2024-05-10T12:45:30Z"),
        timezone: "Asia/Tokyo",
        verified_at: null,
        profile_image_id: null,
        role: "moderator",
    },
    {
        id: 4,
        name: "David Williams",
        email: "david.williams@example.com",
        phone: "+15005550006",
        password: "$2b$10$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",  // Hashed password
        created_at: new Date("2024-06-12T08:45:00Z"),
        updated_at: new Date("2024-07-03T11:30:45Z"),
        timezone: "Australia/Sydney",
        verified_at: new Date("2024-06-15T10:00:00Z"),
        profile_image_id: 104,
        role: "user",
    },
    {
        id: 5,
        name: "Eve Miller",
        email: "eve.miller@example.com",
        phone: "+14155552671",
        password: "$2b$10$BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",  // Hashed password
        created_at: new Date("2024-08-25T09:30:00Z"),
        updated_at: new Date("2024-09-01T14:00:00Z"),
        timezone: "America/Los_Angeles",
        verified_at: new Date("2024-08-28T12:00:00Z"),
        profile_image_id: 105,
        role: "admin",
    },
];
