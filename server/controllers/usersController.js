import jwt from 'jsonwebtoken';
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
    user.token = userToken;
    user.message = 'User created successfully';
    Users.push(user);
    return res.status(201).json({
      status: 201,
      message: 'User created successfully',
      data: {
        token: user,
      },
    });
  }

  // User can sign in
  static userSignIn(req, res) {
    const { email } = req.body;
    const { password } = req.body;
    const user = Users.find((u) => u.email === email && u.password === password);
    if (user) {
      const userToken = jwt.sign({ email }, JWT_SECRET, {});
      user.token = userToken;

      return res.status(200).json({
        status: 200,
        message: 'User is successfully logged in',
        data: user,
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'User not Found',
    });
  }
}

export default UsersController;
