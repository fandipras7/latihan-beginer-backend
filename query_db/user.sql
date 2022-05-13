CREATE TABLE users(
    id VARCHAR(64) NOT NULL,
    fullname VARCHAR(32),
    email VARCHAR(64) NOT NULL,
    password VARCHAR(64) NOT NULL,
    role: VARCHAR(16)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY(id)
);