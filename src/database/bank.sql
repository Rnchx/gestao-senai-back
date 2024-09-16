-- Create of the gestaoSenai database

CREATE DATABASE gestaoSenai;

-- Connect to the gestaoSenai database

\c gestaoSenai;

-- Create of the table students

CREATE TABLE IF NOT EXISTS students(
id SERIAL PRIMARY KEY UNIQUE NOT NULL,
name VARCHAR(150) NOT NULL
dateOfBirth VARCHAR(10) NOT NULL,
room VARCHAR(50) NOT NULL,
courseType VARCHAR(100) NOT NULL,
carometer VARCHAR(500) NOT NULL,
aapmStatus BOOLEAN NOT NULL
);

-- Create of the table lockers

CREATE TABLE IF NOT EXISTS lockers(
id UNIQUE NOT NULL,
occupationStatus BOOLEAN NOT NULL,
owner VARCHAR(150) NOT NULL
);