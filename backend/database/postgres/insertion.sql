TRUNCATE TABLE
    reservations,
    time_off,
    working_hours,
    clients,
    personal,
    services
RESTART IDENTITY CASCADE;

INSERT INTO roles (name)
VALUES
    ('admin'),
    ('employee');

INSERT INTO services (name, duration_minutes, price)
VALUES
    ('Haircut', 30, 32.00),
    ('Beard', 15, 20.00),
    ('Hair + Beard', 75, 45.00);



INSERT INTO personal (  first_name, last_name, role_id)
VALUES
    ('Janko', 'Mrkvička', 2),
    ('Ferko', 'Netuším', 2),
    ('Katarína', 'Neviem', 2),
    ('Kristína', 'Mrkvičková', 2);


INSERT INTO working_hours (personal_id, day_of_week, start_time, end_time)
VALUES
    (1, 1, '8:00', '16:00'),
    (1, 2, '8:00', '16:00'),
    (1, 3, '8:00', '16:00'),
    (1, 4, '8:00', '16:00'),
    (1, 5, '8:00', '16:00'),
    (1, 6, '8:00', '12:00');



INSERT INTO time_off (personal_id, date, reason)
VALUES
    (1, '2026-09-28', 'Dovolenka');


INSERT INTO working_breaks (personal_id, day_of_week, start_time, end_time)
VALUES
    (1, 1, '12:00', '12:30'),
    (1, 2, '12:00', '12:30'),
    (1, 3, '12:00', '12:30'),
    (1, 4, '12:00', '12:30'),
    (1, 5, '12:00', '12:30');
