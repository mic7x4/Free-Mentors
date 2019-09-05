import express from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionsRoute = express.Router();
// create a session
sessionsRoute.post('/sessions', SessionsController.createMentorshipSession);

export default sessionsRoute;
