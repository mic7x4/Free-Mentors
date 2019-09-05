import express from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionsRoute = express.Router();
// create a session
sessionsRoute.post('/sessions', SessionsController.createMentorshipSession);
// A mentor can accept a session
sessionsRoute.patch('/sessions/:id/accept', SessionsController.acceptSession);
// Reject the Mentorship Session
sessionsRoute.patch('/sessions/:id/reject', SessionsController.rejectSession);

export default sessionsRoute;
