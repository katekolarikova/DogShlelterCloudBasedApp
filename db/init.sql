CREATE DATABASE IF NOT EXISTS animals;
use animals;

CREATE TABLE dogs (
  dogID INT NOT NULL AUTO_INCREMENT, 
  name VARCHAR(20),
  breed VARCHAR(40),
  age INT,
  description VARCHAR(400),
  PRIMARY KEY(dogID)
);

INSERT INTO dogs
  (name, breed, age, description)
VALUES
  ('Rex', 'German Shepherd',4, 'Suitable as a house sitter, does not get along with other animals.'),
  ('Lisa', 'American Pit Bull Terrier', 3,'Very friendly dog also suitable for children.');
