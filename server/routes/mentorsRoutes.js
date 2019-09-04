import express from 'express';
import MentorsController from '../controllers/mentorsControllers';

const mentorsRoute = express.Router();
// Get all Mentors
mentorsRoute.get('/mentors', MentorsController.getAllMentors);
// view mentor details
mentorsRoute.get('/mentors/:id', MentorsController.ViewMentorDetail);

export default mentorsRoute;
