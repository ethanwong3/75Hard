# API Documentation

## Authentication

### User Signup & Login (Firebase Auth)

- **POST** `/auth/signup` → Create new user
- **POST** `/auth/login` → Login user
- **POST** `/auth/logout` → Logout user

## Habit Tracking

### Manage Habits

- **POST** `/habits/create` → Create new habit
- **GET** `/habits` → Fetch all habits
- **PATCH** `/habits/:id` → Update habit progress
- **DELETE** `/habits/:id` → Delete a habit

## Notifications

### Reminder System

- **POST** `/notifications/schedule` → Schedule a push notification
