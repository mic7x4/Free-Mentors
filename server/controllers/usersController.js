import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../database/querries';

require('dotenv').config();

const { JWT_SECRET } = process.env;

class UsersController {
  static userSignUp(req, res) {
    pool.connect((err, client, done) => {
      const email = req.body;
      const selectUser = `SELECT * FROM users WHERE email = $1`;
      console.log(selectUser);
      const value = [email];
      client.query(selectUser, value, ((error, result) => {
        if (error) {
          return res.status(404).json({
            error: 'user not found',
          });
        }
        if (result.rows[0]) {
          return res.status(409).json({
            status: 409,
            error: 'User exists',
          });
        }
        const {
          firstname, lastname, email, password, address, bio, occupation, expertise,
        } = req.body;
        bcrypt.hash(password, 10, (err, hash) => {
          const passwd = hash;
          const insertQuery = 'INSERT INTO users (firstname,lastname,email,password,address,bio,occupation,expertise) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)';
          const user = [firstname, lastname, email, password, address, bio, occupation, expertise];
          client.query(insertQuery, user, (results) => {
            if (results) {
              const userToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '24h' });
              return res.status(201).json({
                status: 201,
                message: 'User created',
                data: {
                  firstname,
                  lastname,
                  email,
                  passwd,
                  bio,
                  occupation,
                  expertise,
                },
                userToken,
              });
            }
          });
        });
      }),
      done());
    });
  }

  static userSignIn(req, res) {
    res.send('This is the sign in ');
  }
}

export default UsersController;
