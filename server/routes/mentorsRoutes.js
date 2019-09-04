import express from 'express';
import MentorsController from '../controllers/mentorsControllers';

const mentorsRoute = express.Router();
// Get all Mentors
mentorsRoute.get('/mentors', MentorsController.getAllMentors);
export default mentorsRoute;
