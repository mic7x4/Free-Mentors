import express from 'express';
import UsersController from '../controllers/usersController';
import validation from '../validation/userValidation';


const usersRoute = express.Router();


// User can sign up
usersRoute.post('/auth/signup', validation.signup, UsersController.userSignUp);
// User can signin
usersRoute.post('/auth/signin', validation.login, UsersController.userSignIn);

export default usersRoute;
