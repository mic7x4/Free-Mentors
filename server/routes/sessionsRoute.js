import express from 'express';
import SessionsController from '../controllers/SessionsController';
import validation from '../validation/sessionValidation';

const sessionsRoute = express.Router();
// create a session
sessionsRoute.post('/sessions', validation.createSession, SessionsController.createMentorshipSession);
// A mentor can accept a session
sessionsRoute.patch('/sessions/:id/accept', validation.sessionId, SessionsController.acceptSession);
// Reject the Mentorship Session
sessionsRoute.patch('/sessions/:id/reject', validation.sessionId, SessionsController.rejectSession);

export default sessionsRoute;
