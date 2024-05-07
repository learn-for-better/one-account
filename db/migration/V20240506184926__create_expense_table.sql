CREATE TABLE expense (
    id SERIAL PRIMARY KEY,
    created_date TIMESTAMP NOT NULL,
    updated_date TIMESTAMP NOT NULL,
    date TIMESTAMP NOT NULL,
    description TEXT,
    amount DECIMAL(10, 2) NOT NULL
);