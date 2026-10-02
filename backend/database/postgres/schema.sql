CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    duration_minutes INTEGER NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE personal (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clients (
    id SERIAL PRIMARY KEY, 
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(250),
    phone VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE working_hours (
    id SERIAL PRIMARY KEY,
    personal_id INTEGER NOT NULL,
    day_of_week INTEGER NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,

    CONSTRAINT fk_working_hours_peronal
        FOREIGN KEY (personal_id)
        REFERENCES personal(id)
        ON DELETE CASCADE,
    
    CONSTRAINT valid_day_of_week
        CHECK (day_of_week BETWEEN 1 AND 7),
    
    CONSTRAINT valid_working_hours
        CHECK (start_time < end_time)
);

CREATE TABLE time_off (
    id SERIAL PRIMARY KEY,
    personal_id INTEGER NOT NULL,
    date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    reason VARCHAR(250),

    CONSTRAINT fk_time_off_personal
        FOREIGN KEY (personal_id)
        REFERENCES personal(id)
        ON DELETE CASCADE,
    
    CONSTRAINT valid_time_off
        CHECK (
            (start_time IS NULL AND end_time IS NULL)
            OR
            (start_time IS NOT NULL AND end_time IS NOT NULL AND start_time < end_time)
        )
);

CREATE TABLE working_breaks(
    id SERIAL PRIMARY KEY,
    personal_id INTEGER NOT NULL,
    day_of_week INTEGER NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    CONSTRAINT fk_personal_break
        FOREIGN KEY (personal_id)
        REFERENCES personal(id)
        ON DELETE CASCADE,
    CHECK (start_time < end_time),
    CHECK (day_of_week BETWEEN 1 AND 7)
);


CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,

    personal_id INTEGER NOT NULL,
    service_id INTEGER NOT NULL,
    client_id INTEGER,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(250),
    phone VARCHAR(30),

    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,

    status VARCHAR(30) NOT NULL DEFAULT 'confirmed',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_reservation_personal
        FOREIGN KEY (personal_id)
        REFERENCES personal(id),

    CONSTRAINT fk_reservation_service
        FOREIGN KEY (service_id)
        REFERENCES services(id),

    CONSTRAINT fk_reservation_client
        FOREIGN KEY (client_id)
        REFERENCES clients(id),

    CONSTRAINT valid_reservation_time
        CHECK (start_time < end_time)
);