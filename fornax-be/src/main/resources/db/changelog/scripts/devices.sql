CREATE TABLE devices (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    ip VARCHAR(45) NOT NULL,
    status VARCHAR(10) NOT NULL CHECK (status IN ('active', 'error', 'inactive')),
    location VARCHAR(100) NOT NULL
);


INSERT INTO devices (name, type, ip, status, location) VALUES
('Printer A', 'Printer', '192.168.0.10', 'active', 'Office 1'),
('Router B', 'Router', '192.168.0.1', 'inactive', 'Server Room'),
('Camera C', 'Camera', '192.168.0.20', 'error', 'Entrance');
