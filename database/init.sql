-- Create a simple table
CREATE TABLE IF NOT EXISTS test_table (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

-- Insert a sample record
INSERT INTO test_table (name) VALUES ('Hello, World!');
