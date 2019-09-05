import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Users from '../model/users';

require('dotenv').config();

const { JWT_SECRET } = process.env;

class UsersController {
  // User can sign up
  static userSignUp(req, res) {
    const {
      firstname, lastname, email, password, address, occupation, expertise,
    } = req.body;
    const user = {
      id: Users.length + 1,
      firstname,
      lastname,
      email,
      password,
      address,
      occupation,
      expertise,
      isAdmin: false,
      isMentor: false,
    };

    const userToken = jwt.sign({ email }, JWT_SECRET, {});
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      user.password = hash;
      Users.push(user);
      user.token = userToken;
      return res.status(201).json({
        status: 201,
        message: 'User created successfully',
        data: {
          token: userToken,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          bio: user.bio,
          expertise: user.expertise,
        },
      });
    });
  }

  // User can sign in
  static userSignIn(req, res) {
    const { email } = req.body;
    const passwd = req.body.password;
    const user = Users.find((u) => u.email === email);
    if (user) {
      bcrypt.compare(passwd, user.password, (err, found) => {
        if (found) {
          const userToken = jwt.sign({ email }, JWT_SECRET, {});
          user.token = userToken;
          return res.status(200).json({
            status: 200,
            message: 'User is successfully logged in',
            data: {
              token: userToken,
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              bio: user.bio,
            },
          });
        }
        return res.status(401).json({ status: 404, error: 'Password Doesn\'t match' });
      });
    }
  }
}


export default UsersController;
