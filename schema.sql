-- SQL Schema for CampusConnect

-- Users table to store student, faculty, and admin information
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) CHECK (role IN ('student', 'faculty', 'admin')) NOT NULL,
    -- In a real application, you would store a hashed password, not the plain text.
    -- For this example, we'll keep it simple.
    password_hash VARCHAR(255)
);

-- Courses table for the course catalog
CREATE TABLE courses (
    code VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    instructor_id VARCHAR(255) REFERENCES users(id)
);

-- Student enrollments in courses
CREATE TABLE enrollments (
    course_code VARCHAR(255) REFERENCES courses(code),
    student_id VARCHAR(255) REFERENCES users(id),
    PRIMARY KEY (course_code, student_id)
);

-- Appointments table for scheduling
CREATE TABLE appointments (
    id VARCHAR(255) PRIMARY KEY,
    student_id VARCHAR(255) REFERENCES users(id),
    advisor_id VARCHAR(255) REFERENCES users(id),
    appointment_date TIMESTAMP NOT NULL,
    status VARCHAR(50) CHECK (status IN ('Confirmed', 'Pending', 'Canceled')),
    notes TEXT
);

-- Faculty availability slots
CREATE TABLE availability_slots (
    id VARCHAR(255) PRIMARY KEY,
    advisor_id VARCHAR(255) REFERENCES users(id),
    slot_date DATE NOT NULL,
    slot_time TIME NOT NULL,
    UNIQUE(advisor_id, slot_date, slot_time)
);

-- Library books catalog
CREATE TABLE library_books (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    cover_image_url TEXT,
    borrowed_by_id VARCHAR(255) REFERENCES users(id) NULL
);

-- Audit logs for tracking system events
CREATE TABLE audit_logs (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id),
    action VARCHAR(255),
    details TEXT,
    level VARCHAR(50) CHECK (level IN ('info', 'warning', 'critical')),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Super Admin user for initial login
-- Email: admin@campus.edu
-- Password: 123 (In a real app, this should be a secure hash)
INSERT INTO users (id, name, email, role, password_hash) VALUES 
('user-1', 'Super Admin', 'admin@campus.edu', 'admin', '123');

-- You can add more INSERT statements here to populate your database with initial data.
