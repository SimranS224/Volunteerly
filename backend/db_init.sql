-- Create user table
CREATE TABLE IF NOT EXISTS user (
    id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    pass VARCHAR(100) NOT NULL,
    bio text,
    date_joined TIMESTAMP, 
    profile_picture_url VARCHAR(255)
);

-- Create organization table
CREATE TABLE IF NOT EXISTS organization (
    id serial PRIMARY KEY,
    organization_name VARCHAR(255) NOT NULL,
    bio text,
    oraganization_logo_url VARCHAR(255)
);

-- Create event type table
CREATE TABLE IF NOT EXISTS event_type (
    id serial PRIMARY KEY,
    text text NOT NULL
);

-- Create category table
CREATE TABLE IF NOT EXISTS category (
    id serial PRIMARY KEY,
    text text NOT NULL
);

-- Create user event preference table
CREATE TABLE IF NOT EXISTS user_event_preference (
    user_id INTEGER REFERENCES user(id),
    event_type_id INTEGER REFERENCES event(id)
);

-- Create user availability table
CREATE TABLE IF NOT EXISTS user_availability (
    user_id INTEGER REFERENCES user(id),
    day_of_week VARCHAR(100) NOT NULL,
    start_hour TIME NOT NULL, 
    end_hour TIME NOT NULL
);

-- Create achievement table
CREATE TABLE IF NOT EXISTS achievement (
    id serial PRIMARY KEY,
    user_id INTEGER REFERENCES user(id),
    photo_url text, 
    text text, 
    category_id INTEGER REFERENCES category(id)
);

-- Create stat table 
CREATE TABLE IF NOT EXISTS stat (
    user_id INTEGER REFERENCES user(id),
    number INTEGER,
    category_id INTEGER references category(id)
);

-- Create event table
CREATE TABLE IF NOT EXIST event (
    id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    start_date TIMESTAMP, 
    end_date TIMESTAMP, 
    description text,
    location text,
    event_category_id INTEGER references category(id),
    photo_url text,
    organization_id INTEGER references organization(id),
    duration INTEGER,
);

-- Create enrollment table
CREATE TABLE IF NOT EXIST enrollment (
    user_id INTEGER references user(id),
    event_id INTEGER references event(id)
);

-- Create organization table
CREATE TABLE IF NOT EXIST enrollment (
    user_id INTEGER references user(id),
    event_id text references event(id)
);
