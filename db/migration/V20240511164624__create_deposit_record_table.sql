CREATE TABLE deposit_record (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP NOT NULL,
    description TEXT,
    amount DECIMAL(10, 2) NOT NULL
);