# Project Setup Instructions

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setting Up Laravel Backend](#setting-up-laravel-backend)
  - [Environment Setup](#environment-setup)
  - [Run the Server](#run-the-server)
- [Setting Up Vue Frontend](#setting-up-vue-frontend)
  - [Environment Setup](#frontend-environment-setup)
  - [Run the Frontend](#run-the-frontend)

## Prerequisites

Ensure you have the following software installed before starting:

- **PHP** >= 8.0
- **Composer** (for Laravel dependency management)
- **Node.js** >= 14.x and **npm** (for Vue project)
- **MySQL** or any other compatible database for Laravel
- **Laravel Installer** (optional for easier Laravel setup)

## Setting Up Laravel Backend

### 1. Environment Setup

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

3. Install dependencies using Composer:

   ```bash
   composer install
   ```

4. Copy the `.env` example file to create your local environment configuration:

   ```bash
   cp .env.example .env
   ```

5. Generate the application key:

   ```bash
   php artisan key:generate
   ```

6. Update the `.env` file with your database credentials:

   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

7. Run migrations to set up the database schema:

   ```bash
   php artisan migrate
   ```

8. (Optional) Seed the database if you have seeders available:

   ```bash
   php artisan db:seed
   ```

### 2. Run the Server

Start the Laravel server using the following command:

```bash
php artisan serve
```

By default, it will run on `http://127.0.0.1:8000`.

## Setting Up Vue Frontend

### 1. Environment Setup

1. Navigate to the `frontend` directory:

   ```bash
   cd ../frontend
   ```

2. Install dependencies using npm:

   ```bash
   npm install
   ```

3. Copy the `.env.example` file to create the `.env` configuration file for the frontend:

   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file to set the API URL for the backend:

   ```
   VITE_API_URL=http://127.0.0.1:8000/api
   ```

### 2. Run the Frontend

Start the Vue app with the following command:

```bash
npm run dev
```

By default, it will run on `http://localhost:5173`.

## Additional Notes

- Ensure that the backend is running before launching the frontend to avoid API errors.
- If you are using **Laravel Sanctum** for authentication, make sure you have configured the correct CORS settings in both the Laravel and Vue projects.
- For production, remember to set up environment-specific values in the `.env` files and configure your hosting environments accordingly.

## Troubleshooting

- **Database Connection Error**: Check that your `.env` database credentials are correct and that your MySQL server is running.
- **CORS Issues**: Ensure that the backend's CORS settings allow requests from the Vue frontend URL.

Feel free to contact the project maintainer if you encounter any issues during setup.
