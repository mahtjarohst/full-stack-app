DROP TABLE IF EXISTS cats;
DROP TABLE IF EXISTS owners;

CREATE TABLE cats (
    id SERIAL PRIMARY KEY,
    name TEXT,
    age DEC,
    gender TEXT,
    color TEXT
);

CREATE TABLE owners (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    avatar TEXT,
    email TEXT
);

INSERT INTO cats (name, age, gender, color) VALUES ('Carmel', '4', 'Female', 'Brown');
INSERT INTO cats (name, age, gender, color) VALUES ('Butters', '1.5', 'Male', 'Black and white');
INSERT INTO cats (name, age, gender, color) VALUES ('Mi Mow', '12', 'Female', 'Orange');
INSERT INTO cats (name, age, gender, color) VALUES ('Wrigley', '12', 'Male', 'Grey');

INSERT INTO owners (first_name, last_name, avatar, email) VALUES ('Ellie', 'Ritz', 'Crazy Cat Lady', 'crazycatlady@email.com');
INSERT INTO owners (first_name, last_name, avatar, email) VALUES ('Matt', 'Rust', 'MattCat', 'mattlikescats@email.com');
INSERT INTO owners (first_name, last_name, avatar, email) VALUES ('Robert', 'Ritz', 'CatDad', 'catdad@email.com');
INSERT INTO owners (first_name, last_name, avatar, email) VALUES ('Cindy', 'Ritz', 'CatMom', 'catmom@email.com');