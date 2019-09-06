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
    user.token = userToken;
    bcrypt.hash(user.password, 10, (err, hash) => {
      // eslint-disable-next-line no-empty
      if (err) {
        return res.status(404).json({
          error: 'Not created',
        });
      }
      user.password = hash;
      Users.push(user);
      return res.status(201).json({
        status: 201,
        message: 'User created successfully',
        data: {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          address: user.address,
          occupation: user.occupation,
          expertise: user.expertise,
          isAdmin: user.isAdmin,
          isMentor: user.isMentor,
        },
      });
    });
  }

  // User can sign in
  static userSignIn(req, res) {
    const { email } = req.body;
    const { password } = req.body;
    const user = Users.find((u) => u.email === email && u.password === password);
    if (user.length >= 1) {
      return res.status(401).json({
        error: 'Not authorized',
      });
    }
    const userToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '24h' });
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
}
export default UsersController;
