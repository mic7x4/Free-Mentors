import dotenv from 'dotenv';

const { Pool } = require('pg');

dotenv.config();

const pool = new Pool({
  connectionString: 'postgres://postgres:p0w3rcuda@localhost:5432/freementor',
});
export const createTable = () => {
  const createTables = `CREATE TABLE IF NOT EXISTS
    users(
        id serial,
        firstName character varying(30) NOT NULL,
        lastName character varying(30) NOT NULL,
        email character varying(30) NOT NULL,
        password character varying(500) NOT NULL,
        address character varying(30) NOT NULL,
        bio character varying(100) NOT NULL,
        occupation character varying(30) NOT NULL,
        expertise character varying(30) NOT NULL,
        PRIMARY KEY(id)
    );

    CREATE TABLE IF NOT EXISTS
    sessions(
    id SERIAL PRIMARY KEY,
    mentorId INTEGER NOT NULL,
    menteerId INTEGER NOT NULL,
    questions VARCHAR NOT NULL,
    menteeEmail VARCHAR NOT NULL,
    status VARCHAR DEFAULT 'Pending'
    );

    CREATE TABLE IF NOT EXISTS
    reviews(
        sessionId integer NOT NULL,
        mentorId integer NOT NULL,
        menteeId integer NOT NULL,
        score integer NOT NULL,
        menteeFullName character varying(30) NOT NULL,
    );

    INSERT INTO users 
    (firstName, lastName, email, password,address, bio, occupation, expertise)
     VALUES('ndabaga', 'michel', 'crooked@gmail.com', '$2b$10$7cNLNPuo3SWmRy9gvlXtouEjXus9kW0kI5v6cOAPExmerVDJec8R6','address', 'bio', 'occupation', 'expertise');

    `;
  pool.query(createTables)
    .then((res) => console.log('Database initialized Successfull'))
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
export default pool;
require('make-runnable');
