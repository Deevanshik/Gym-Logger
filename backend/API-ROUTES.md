# Workout Tracking API Routes

## Overview
This API serves a workout tracking application with the following hierarchy:
- **User** → **Split** → **Day** → **DayExercise** (template)
- **User** → **Workout** (instance) → **WorkoutExercise** → **WorkoutSet**

---

## 1. Authentication Routes

### POST /api/auth/register
**Purpose**: Register a new user account  
**Body**: 
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```
**Response**: User object + JWT token  
**Explanation**: Creates a new user with hashed password, returns authentication token

### POST /api/auth/login
**Purpose**: Login existing user  
**Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
**Response**: User object + JWT token  
**Explanation**: Validates credentials and returns authentication token

### POST /api/auth/logout
**Purpose**: Logout current user  
**Headers**: Authorization: Bearer {token}  
**Response**: Success message  
**Explanation**: Invalidates current session (if using session management)

---

## 2. User Routes

### GET /api/users/profile
**Purpose**: Get current user's profile  
**Headers**: Authorization: Bearer {token}  
**Response**: User object (without password)  
**Explanation**: Returns authenticated user's information

### PUT /api/users/profile
**Purpose**: Update user profile  
**Headers**: Authorization: Bearer {token}  
**Body**:
```json
{
  "username": "string (optional)",
  "email": "string (optional)"
}
```
**Response**: Updated user object  
**Explanation**: Updates user information, validates uniqueness constraints

### PUT /api/users/password
**Purpose**: Change user password  
**Headers**: Authorization: Bearer {token}  
**Body**:
```json
{
  "currentPassword": "string",
  "newPassword": "string"
}
```
**Response**: Success message  
**Explanation**: Validates current password before updating to new one

---

## 3. Exercise Template Routes

### GET /api/exercise-templates
**Purpose**: Get all exercise templates for current user  
**Headers**: Authorization: Bearer {token}  
**Query Params**: 
- `primaryMuscleGroup` (optional) - filter by muscle group
- `search` (optional) - search by name
**Response**: Array of ExerciseTemplate objects  
**Explanation**: Returns user's custom exercise library, supports filtering

### POST /api/exercise-templates
**Purpose**: Create a new exercise template  
**Headers**: Authorization: Bearer {token}  
**Body**:
```json
{
  "name": "Bench Press",
  "primaryMuscleGroup": "Chest",
  "secondaryMuscles": ["Triceps", "Shoulders"],
  "cues": ["Keep back flat", "Lower to nipple line"]
}
```
**Response**: Created ExerciseTemplate object  
**Explanation**: Creates reusable exercise template that can be added to workout plans

### GET /api/exercise-templates/:id
**Purpose**: Get specific exercise template  
**Headers**: Authorization: Bearer {token}  
**Response**: ExerciseTemplate object  
**Explanation**: Returns details of a single exercise template, verifies ownership

### PUT /api/exercise-templates/:id
**Purpose**: Update exercise template  
**Headers**: Authorization: Bearer {token}  
**Body**: Same as POST (all fields optional)  
**Response**: Updated ExerciseTemplate object  
**Explanation**: Modifies existing exercise template, verifies ownership

### DELETE /api/exercise-templates/:id
**Purpose**: Delete exercise template  
**Headers**: Authorization: Bearer {token}  
**Response**: Success message  
**Explanation**: Removes exercise template, should check if used in any splits first

---

## 4. Split Routes

### GET /api/splits
**Purpose**: Get all workout splits for current user  
**Headers**: Authorization: Bearer {token}  
**Response**: Array of Split objects  
**Explanation**: Returns all training programs (e.g., Push/Pull/Legs, Bro Split)

### POST /api/splits
**Purpose**: Create a new workout split  
**Headers**: Authorization: Bearer {token}  
**Body**:
```json
{
  "name": "Push Pull Legs"
}
```
**Response**: Created Split object  
**Explanation**: Creates new workout program framework

### GET /api/splits/:id
**Purpose**: Get specific split with all days  
**Headers**: Authorization: Bearer {token}  
**Response**: Split object with populated days array  
**Explanation**: Returns complete split structure including all training days

### PUT /api/splits/:id
**Purpose**: Update split name  
**Headers**: Authorization: Bearer {token}  
**Body**:
```json
{
  "name": "Updated Split Name"
}
```
**Response**: Updated Split object  
**Explanation**: Renames workout split, verifies ownership

### DELETE /api/splits/:id
**Purpose**: Delete workout split  
**Headers**: Authorization: Bearer {token}  
**Response**: Success message  
**Explanation**: Removes split and cascades to delete all associated days and day exercises

---

## 5. Day Routes

### GET /api/splits/:splitId/days
**Purpose**: Get all days for a specific split  
**Headers**: Authorization: Bearer {token}  
**Response**: Array of Day objects ordered by order field  
**Explanation**: Returns training days in sequence (e.g., Day 1: Push, Day 2: Pull)

### POST /api/splits/:splitId/days
**Purpose**: Add a day to a split  
**Headers**: Authorization: Bearer {token}  
**Body**:
```json
{
  "name": "Push Day",
  "order": 1
}
```
**Response**: Created Day object  
**Explanation**: Adds training day to split, auto-increments order if not provided

### GET /api/days/:id
**Purpose**: Get specific day with exercises  
**Headers**: Authorization: Bearer {token}  
**Response**: Day object with populated dayExercises array  
**Explanation**: Returns complete day structure with all planned exercises

### PUT /api/days/:id
**Purpose**: Update day details  
**Headers**: Authorization: Bearer {token}  
**Body**:
```json
{
  "name": "Upper Body",
  "order": 2
}
```
**Response**: Updated Day object  
**Explanation**: Modifies day name or order in split sequence

### DELETE /api/days/:id
**Purpose**: Delete a day from split  
**Headers**: Authorization: Bearer {token}  
**Response**: Success message  
**Explanation**: Removes day and cascades to delete all associated day exercises

---

## 6. Day Exercise Routes

### GET /api/days/:dayId/exercises
**Purpose**: Get all exercises planned for a day  
**Headers**: Authorization: Bearer {token}  
**Response**: Array of DayExercise objects with populated exerciseTemplate  
**Explanation**: Returns the workout template for this day with target sets/reps

### POST /api/days/:dayId/exercises
**Purpose**: Add exercise to a day  
**Headers**: Authorization: Bearer {token}  
**Body**:
```json
{
  "exerciseTemplateId": "64abc...",
  "targetSets": 3,
  "targetRepRange": "8-12",
  "targetWeight": 100,
  "order": 1
}
```
**Response**: Created DayExercise object  
**Explanation**: Adds exercise to day's template with target parameters

### PUT /api/day-exercises/:id
**Purpose**: Update day exercise parameters  
**Headers**: Authorization: Bearer {token}  
**Body**:
```json
{
  "targetSets": 4,
  "targetRepRange": "6-10",
  "targetWeight": 110,
  "order": 2
}
```
**Response**: Updated DayExercise object  
**Explanation**: Modifies planned sets/reps/weight for exercise in template

### DELETE /api/day-exercises/:id
**Purpose**: Remove exercise from day  
**Headers**: Authorization: Bearer {token}  
**Response**: Success message  
**Explanation**: Removes exercise from day template

### PUT /api/day-exercises/:id/reorder
**Purpose**: Reorder exercises within a day  
**Headers**: Authorization: Bearer {token}  
**Body**:
```json
{
  "newOrder": 3
}
```
**Response**: Updated DayExercise object  
**Explanation**: Changes exercise sequence in workout (e.g., move squats before deadlifts)

---

## 7. Workout Routes

### GET /api/workouts
**Purpose**: Get workout history for current user  
**Headers**: Authorization: Bearer {token}  
**Query Params**:
- `startDate` (optional) - filter by date range
- `endDate` (optional)
- `completed` (optional) - filter by completion status
- `limit` (optional, default: 20)
- `skip` (optional, default: 0)
**Response**: Array of Workout objects with pagination  
**Explanation**: Returns workout log with filtering options

### POST /api/workouts
**Purpose**: Start a new workout session  
**Headers**: Authorization: Bearer {token}  
**Body**:
```json
{
  "splitId": "64abc...",
  "dayId": "64def...",
  "date": "2024-02-06T10:00:00Z"
}
```
**Response**: Created Workout object with populated exercises  
**Explanation**: Creates workout instance from day template, copies planned exercises

### GET /api/workouts/:id
**Purpose**: Get specific workout details  
**Headers**: Authorization: Bearer {token}  
**Response**: Workout object with exercises and sets  
**Explanation**: Returns complete workout session with all exercises and recorded sets

### PUT /api/workouts/:id
**Purpose**: Update workout (mainly for completion)  
**Headers**: Authorization: Bearer {token}  
**Body**:
```json
{
  "completed": true,
  "date": "2024-02-06T11:30:00Z"
}
```
**Response**: Updated Workout object  
**Explanation**: Marks workout as complete or adjusts timestamp

### DELETE /api/workouts/:id
**Purpose**: Delete workout session  
**Headers**: Authorization: Bearer {token}  
**Response**: Success message  
**Explanation**: Removes workout and cascades to delete all exercises and sets

### GET /api/workouts/calendar/:year/:month
**Purpose**: Get workouts for calendar view  
**Headers**: Authorization: Bearer {token}  
**Response**: Array of workout summaries grouped by date  
**Explanation**: Returns month view of completed workouts for calendar display

---

## 8. Workout Exercise Routes

### GET /api/workouts/:workoutId/exercises
**Purpose**: Get all exercises in a workout  
**Headers**: Authorization: Bearer {token}  
**Response**: Array of WorkoutExercise objects with sets  
**Explanation**: Returns exercises performed in this workout session

### POST /api/workouts/:workoutId/exercises
**Purpose**: Add exercise to ongoing workout  
**Headers**: Authorization: Bearer {token}  
**Body**:
```json
{
  "exerciseTemplateId": "64abc...",
  "plannedSets": 3,
  "plannedRepRange": "8-12"
}
```
**Response**: Created WorkoutExercise object  
**Explanation**: Adds additional exercise to workout (beyond template)

### GET /api/workout-exercises/:id
**Purpose**: Get specific exercise with all sets  
**Headers**: Authorization: Bearer {token}  
**Response**: WorkoutExercise object with populated sets array  
**Explanation**: Returns exercise details and all recorded sets

### DELETE /api/workout-exercises/:id
**Purpose**: Remove exercise from workout  
**Headers**: Authorization: Bearer {token}  
**Response**: Success message  
**Explanation**: Removes exercise and all its sets from workout session

---

## 9. Workout Set Routes

### GET /api/workout-exercises/:exerciseId/sets
**Purpose**: Get all sets for an exercise  
**Headers**: Authorization: Bearer {token}  
**Response**: Array of WorkoutSet objects ordered by setNumber  
**Explanation**: Returns all sets performed for this exercise

### POST /api/workout-exercises/:exerciseId/sets
**Purpose**: Record a set  
**Headers**: Authorization: Bearer {token}  
**Body**:
```json
{
  "setNumber": 1,
  "weight": 100,
  "reps": 10,
  "completed": true
}
```
**Response**: Created WorkoutSet object  
**Explanation**: Records actual performance data for a set

### PUT /api/workout-sets/:id
**Purpose**: Update set data  
**Headers**: Authorization: Bearer {token}  
**Body**:
```json
{
  "weight": 105,
  "reps": 8,
  "completed": true
}
```
**Response**: Updated WorkoutSet object  
**Explanation**: Corrects or updates recorded set performance

### DELETE /api/workout-sets/:id
**Purpose**: Delete a set  
**Headers**: Authorization: Bearer {token}  
**Response**: Success message  
**Explanation**: Removes recorded set from workout

---

## 10. Analytics Routes

### GET /api/analytics/progress/:exerciseTemplateId
**Purpose**: Get progress over time for specific exercise  
**Headers**: Authorization: Bearer {token}  
**Query Params**:
- `startDate` (optional)
- `endDate` (optional)
**Response**: Array of workout data showing weight/rep progression  
**Explanation**: Tracks strength gains for an exercise over time

### GET /api/analytics/volume
**Purpose**: Get training volume statistics  
**Headers**: Authorization: Bearer {token}  
**Query Params**:
- `period` (week/month/year)
- `muscleGroup` (optional)
**Response**: Volume metrics (total weight lifted, sets, reps)  
**Explanation**: Analyzes training volume for periodization planning

### GET /api/analytics/streak
**Purpose**: Get workout consistency stats  
**Headers**: Authorization: Bearer {token}  
**Response**: Current streak, longest streak, workout frequency  
**Explanation**: Tracks adherence and consistency metrics

### GET /api/analytics/personal-records
**Purpose**: Get personal records across all exercises  
**Headers**: Authorization: Bearer {token}  
**Response**: Array of PRs with dates achieved  
**Explanation**: Lists best performances (heaviest weight, most reps, etc.)

---

## Common Response Codes

- **200**: Success
- **201**: Resource created
- **400**: Bad request (validation error)
- **401**: Unauthorized (missing/invalid token)
- **403**: Forbidden (not resource owner)
- **404**: Resource not found
- **409**: Conflict (duplicate username/email)
- **500**: Server error

---

## Middleware Requirements

1. **Authentication Middleware**: Verify JWT token on all protected routes
2. **Ownership Validation**: Ensure user owns the resource they're accessing
3. **Input Validation**: Validate request bodies using schemas
4. **Error Handling**: Consistent error response format
5. **Rate Limiting**: Prevent API abuse