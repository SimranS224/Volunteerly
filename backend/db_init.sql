drop schema if exists proj_309 cascade;
create schema proj_309;
set search_path to proj_309;

-- Create volunteer table
CREATE TABLE IF NOT EXISTS volunteer (
    id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    pass VARCHAR(100) NOT NULL,
    bio text,
    date_joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    profile_picture_url VARCHAR(255)
);

-- Create volunteer availability table
CREATE TABLE IF NOT EXISTS volunteer_availability (
    volunteer_id INTEGER REFERENCES volunteer(id),
    day_of_week VARCHAR(100) NOT NULL,
    start_hour TIME NOT NULL, 
    end_hour TIME NOT NULL
);

-- Create organization table
CREATE TABLE IF NOT EXISTS organization (
    id serial PRIMARY KEY,
    organization_name VARCHAR(255) NOT NULL,
    bio text,
    oraganization_logo_url VARCHAR(255)
);


-- Create stat or achievement category table
CREATE TABLE IF NOT EXISTS category (
    id serial PRIMARY KEY,
    photo_url text, 
    text text NOT NULL
);

-- Create stat table 
CREATE TABLE IF NOT EXISTS stat (
    volunteer_id INTEGER REFERENCES volunteer(id),
    number INTEGER,
    category_id INTEGER references category(id)
);

-- Create event type table
CREATE TABLE IF NOT EXISTS event_type (
    id serial PRIMARY KEY,
    text text NOT NULL
);


-- Create event table
CREATE TABLE IF NOT EXISTS event (
    id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    start_date TIMESTAMP, 
    end_date TIMESTAMP, 
    description text,
    location text,
    event_category_id INTEGER references event_type(id),
    photo_url text,
    organization_id INTEGER references organization(id),
    duration INTEGER
);



-- Create volunteer event preference table
CREATE TABLE IF NOT EXISTS volunteer_event_preference (
    volunteer_id INTEGER REFERENCES volunteer(id),
    event_type_id INTEGER REFERENCES event(id),
    PRIMARY KEY (volunteer_id, event_type_id)
);


-- Create achievement table
CREATE TABLE IF NOT EXISTS achievement (
    volunteer_id INTEGER REFERENCES volunteer(id),
    category_id INTEGER REFERENCES category(id),
    PRIMARY KEY (volunteer_id, category_id)
);


-- Create enrollment table
CREATE TABLE IF NOT EXISTS enrollment (
    volunteer_id INTEGER references volunteer(id) ON DELETE CASCADE,
    event_id INTEGER references event(id),
    PRIMARY KEY (volunteer_id, event_id)
);