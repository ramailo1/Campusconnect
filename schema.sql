-- Base schema for the CampusConnect application

-- Users table to store user information and their roles
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Roles table to define different user roles
CREATE TABLE roles (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

-- Permissions table to define granular permissions
CREATE TABLE permissions (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT
);

-- Junction table to link roles and permissions (many-to-many)
CREATE TABLE role_permissions (
    role_id VARCHAR(255) REFERENCES roles(id) ON DELETE CASCADE,
    permission_id VARCHAR(255) REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- Courses table for the course catalog
CREATE TABLE courses (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    instructor_id VARCHAR(255) REFERENCES users(id)
);

-- Junction table for student enrollments (many-to-many)
CREATE TABLE enrollments (
    student_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
    course_id VARCHAR(255) REFERENCES courses(id) ON DELETE CASCADE,
    enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (student_id, course_id)
);

-- Appointments table for scheduling
CREATE TABLE appointments (
    id VARCHAR(255) PRIMARY KEY,
    student_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
    advisor_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
    appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('Confirmed', 'Pending', 'Canceled')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Availability slots for faculty/advisors
CREATE TABLE availability_slots (
    id VARCHAR(255) PRIMARY KEY,
    advisor_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
    slot_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    UNIQUE (advisor_id, slot_date, start_time)
);

-- Library books table
CREATE TABLE library_books (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    cover_image_url VARCHAR(255),
    borrowed_by_id VARCHAR(255) REFERENCES users(id),
    borrowed_at TIMESTAMP WITH TIME ZONE,
    due_date DATE
);

-- Audit logs for tracking important system events
CREATE TABLE audit_logs (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id),
    action VARCHAR(255) NOT NULL,
    details TEXT,
    level VARCHAR(50) NOT NULL CHECK (level IN ('info', 'warning', 'critical')),
    ip_address VARCHAR(45),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- SEED DATA --

-- 1. Roles
INSERT INTO roles (id, name) VALUES
('admin', 'Super Admin'),
('faculty', 'Faculty'),
('student', 'Student');

-- 2. Permissions
INSERT INTO permissions (id, name, description) VALUES
('view-dashboard', 'View Dashboard', 'Can view the main dashboard.'),
('manage-courses', 'Manage Courses', 'Can create, edit, and delete courses.'),
('view-courses', 'View Courses', 'Can view the course catalog and enroll.'),
('manage-appointments', 'Manage Appointments', 'Can manage student appointments.'),
('view-appointments', 'View Appointments', 'Can view their own appointments.'),
('access-library', 'Access Library', 'Can borrow and return books from the library.'),
('view-analytics', 'View Analytics', 'Can view the analytics dashboard.'),
('manage-users', 'Manage Users', 'Can create, edit, and delete users.'),
('view-audit-logs', 'View Audit Logs', 'Can view the system audit logs.'),
('manage-settings', 'Manage Settings', 'Can change system-wide settings.'),
('manage-availability', 'Manage Availability', 'Can set their own availability for appointments.');

-- 3. Role-Permissions mapping
-- Super Admin permissions
INSERT INTO role_permissions (role_id, permission_id) VALUES
('admin', 'view-dashboard'),
('admin', 'manage-courses'),
('admin', 'manage-appointments'),
('admin', 'access-library'),
('admin', 'view-analytics'),
('admin', 'manage-users'),
('admin', 'view-audit-logs'),
('admin', 'manage-settings'),
('admin', 'manage-availability');

-- Faculty permissions
INSERT INTO role_permissions (role_id, permission_id) VALUES
('faculty', 'view-dashboard'),
('faculty', 'manage-courses'),
('faculty', 'manage-appointments'),
('faculty', 'access-library'),
('faculty', 'manage-availability');

-- Student permissions
INSERT INTO role_permissions (role_id, permission_id) VALUES
('student', 'view-dashboard'),
('student', 'view-courses'),
('student', 'view-appointments'),
('student', 'access-library');

-- 4. Users
-- In a real application, passwords should be hashed. Storing plain text is insecure.
INSERT INTO users (id, name, email, password_hash, role_id) VALUES
('user-1', 'Super Admin', 'admin@campus.edu', '123', 'admin'),
('user-2', 'Professor Jones', 'prof.jones@campus.edu', 'password123', 'faculty'),
('user-3', 'Dr. Smith', 'dr.smith@campus.edu', 'password123', 'faculty'),
('user-4', 'John Doe', 'john.doe@campus.edu', 'password123', 'student'),
('user-5', 'Jane Smith', 'jane.smith@campus.edu', 'password123', 'student');

-- 5. Courses
INSERT INTO courses (id, name, code, description, instructor_id) VALUES
('course-1', 'Introduction to AI', 'CS461', 'An intro to AI.', 'user-3'),
('course-2', 'Advanced Algorithms', 'CS501', 'Deep dive into algorithms.', 'user-2'),
('course-3', 'Web Development', 'CS330', 'Building for the web.', 'user-2');

-- 6. Enrollments
INSERT INTO enrollments (student_id, course_id) VALUES
('user-4', 'course-2');

-- 7. Library Books
INSERT INTO library_books (id, title, author, cover_image_url, borrowed_by_id) VALUES
('book-1', 'The Digital Fortress', 'Dan Brown', 'https://picsum.photos/seed/book1/400/600', NULL),
('book-2', 'Structure and Interpretation of Computer Programs', 'Harold Abelson', 'https://picsum.photos/seed/book2/400/600', 'user-4'),
('book-3', 'The Pragmatic Programmer', 'Andrew Hunt', 'https://picsum.photos/seed/book3/400/600', NULL),
('book-4', 'Clean Code: A Handbook of Agile Software Craftsmanship', 'Robert C. Martin', 'https://picsum.photos/seed/book4/400/600', NULL),
('book-5', 'Design Patterns: Elements of Reusable Object-Oriented Software', 'Erich Gamma', 'https://picsum.photos/seed/book5/400/600', 'user-5'),
('book-6', 'The Lord of the Rings', 'J.R.R. Tolkien', 'https://picsum.photos/seed/book6/400/600', NULL),
('book-7', 'Dune', 'Frank Herbert', 'https://picsum.photos/seed/book7/400/600', NULL),
('book-8', 'Foundation', 'Isaac Asimov', 'https://picsum.photos/seed/book8/400/600', NULL);

-- 8. Appointments
-- Note: Timestamps are hardcoded for reproducibility.
INSERT INTO appointments (id, student_id, advisor_id, appointment_date, status, notes) VALUES
('appt-1', 'user-4', 'user-2', '2024-08-01T14:00:00Z', 'Confirmed', 'Discussing fall semester'),
('appt-2', 'user-5', 'user-3', '2024-08-02T10:00:00Z', 'Confirmed', 'Thesis check-in');

-- 9. Availability Slots
INSERT INTO availability_slots (id, advisor_id, slot_date, start_time, end_time) VALUES
('avail-1', 'user-2', '2024-07-28', '10:00:00', '10:30:00'),
('avail-2', 'user-2', '2024-07-28', '11:00:00', '11:30:00'),
('avail-3', 'user-2', '2024-07-29', '14:00:00', '14:30:00'),
('avail-4', 'user-3', '2024-07-30', '09:00:00', '09:30:00');
