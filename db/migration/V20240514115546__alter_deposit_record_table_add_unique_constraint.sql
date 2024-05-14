ALTER TABLE deposit_record
ADD CONSTRAINT unique_date_description UNIQUE (date, description);