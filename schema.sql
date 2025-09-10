-- SQL Schema for the CampusConnect Project
-- This schema is based on the data structures defined in src/lib/data.ts

-- Users Table
-- Stores information about all users in the system.
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Courses Table
-- Stores all available courses.
CREATE TABLE courses (
    code VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    instructor_id VARCHAR(255) REFERENCES users(id)
);

-- Course Enrollments Table
-- A join table to manage the many-to-many relationship between students and courses.
CREATE TABLE course_enrollments (
    course_code VARCHAR(255) REFERENCES courses(code),
    student_id VARCHAR(255) REFERENCES users(id),
    PRIMARY KEY (course_code, student_id)
);

-- Appointments Table
-- Stores appointment information between students and advisors.
CREATE TABLE appointments (
    id VARCHAR(255) PRIMARY KEY,
    student_id VARCHAR(255) REFERENCES users(id),
    advisor_id VARCHAR(255) REFERENCES users(id),
    appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(50) NOT NULL, -- e.g., 'Confirmed', 'Pending', 'Canceled'
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Availability Slots Table
-- Stores the available time slots for advisors.
CREATE TABLE availability_slots (
    id VARCHAR(255) PRIMARY KEY,
    advisor_id VARCHAR(255) REFERENCES users(id),
    slot_date DATE NOT NULL,
    slot_time TIME NOT NULL,
    UNIQUE (advisor_id, slot_date, slot_time)
);

-- Books Table
-- Stores information about library books.
CREATE TABLE books (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    cover_image_url TEXT,
    borrowed_by_id VARCHAR(255) REFERENCES users(id),
    borrowed_at TIMESTAMP WITH TIME ZONE
);

-- Audit Logs Table
-- Stores a record of important system events.
CREATE TABLE audit_logs (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255), -- Can be null for system actions
    action VARCHAR(255) NOT NULL,
    details TEXT,
    level VARCHAR(50) NOT NULL, -- e.g., 'info', 'warning', 'critical'
    "timestamp" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Roles and Permissions could also be managed in the database for more flexibility
-- (The current implementation has them hardcoded in src/lib/roles.ts)

-- Roles Table
CREATE TABLE roles (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

-- Permissions Table
CREATE TABLE permissions (
    id VARCHAR(255) PRIMARY KEY,
    label VARCHAR(255) UNIQUE NOT NULL
);

-- Role-Permissions Join Table
CREATE TABLE role_permissions (
    role_id VARCHAR(255) REFERENCES roles(id),
    permission_id VARCHAR(255) REFERENCES permissions(id),
    PRIMARY KEY (role_id, permission_id)
);

-- Note: You would need to populate the `roles` and `permissions` tables
-- with the values from `src/lib/roles.ts` to make them functional.
