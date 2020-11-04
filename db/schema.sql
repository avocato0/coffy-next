DROP DATABASE IF EXISTS coffy;

CREATE DATABASE coffy 
  WITH 
  OWNER = rocket
  ENCODING = 'UTF8'
  LC_COLLATE = 'C'
  LC_CTYPE = 'C'
  TABLESPACE = pg_default
  TEMPLATE template0
  CONNECTION LIMIT = -1;

\connect coffy;



CREATE TABLE companies (
  id bigserial PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

INSERT INTO 
  companies (name)
VALUES
  ('Snilcy Inc.'),
  ('Apple'),
  ('The Venus Project'),
  ('California Institute of Technology'),
  ('Google'),
  ('Yandex'),
  ('Telegram');



CREATE TABLE users (
  id bigserial PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  birth_date DATE,
  company BIGINT,
  FOREIGN KEY (company) REFERENCES companies(id)
);

INSERT INTO 
  users (name, email, birth_date, company)
VALUES
  ('Johnny Rocket', '0.snilcy@gmail.com', '1992-09-28', 1),
  ('AliQ', 'zubov@infonica.ru', '1992-09-28', 1),
  ('Mechanical Animal', 'animal@gmail.com', '1982-03-18', 1),
  ('Steven Paul Jobs', 'jobs@apple.com', '1955-02-02', 2),
  ('Jacque Fresco', 'mail@thevenusproject.com', '1916-03-13', 3),
  ('Murman', 'bezdelnik@gamil.com', '1992-06-05', NULL), 
  ('Kuzmich', 'kuzmich@gamil.com', '1992-05-25', NULL),
  ('Richard Phillips Feynman', 'manhattanlosalamos@gmail.com', '1918-02-15', 4);

