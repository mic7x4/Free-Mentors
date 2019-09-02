import express from 'express';
import UsersController from '../controllers/usersController';

const usersRoute = express.Router();


// User can sign up
usersRoute.post('/auth/signup', UsersController.userSignUp);
// User can signin
usersRoute.post('/auth/signin', UsersController.userSignIn);

export default usersRoute;
