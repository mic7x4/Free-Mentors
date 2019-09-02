import jwt from 'jsonwebtoken';
import Users from '../model/users';

require('dotenv').config();

const { JWT_SECRET } = process.env;

class UsersController {
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
}

export default UsersController;
