CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    crated_date TIMESTAMP NOT NULL,
    updated_date TIMESTAMP NOT NULL,
    tag VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE expense_tags (
    crated_date TIMESTAMP NOT NULL,
    updated_date TIMESTAMP NOT NULL,
    expense_id INT REFERENCES expense(id),
    tag_id INT REFERENCES tags(id),
    PRIMARY KEY (expense_id, tag_id)
);