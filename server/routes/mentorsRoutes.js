import express from 'express';
import MentorsController from '../controllers/mentorsControllers';
import validation from '../validation/userValidation';

const mentorsRoute = express.Router();
// Get all Mentors
mentorsRoute.get('/mentors', MentorsController.getAllMentors);
// view mentor details
mentorsRoute.get('/mentors/:id', validation.userId, MentorsController.ViewMentorDetail);
// Change user to the Mentor
mentorsRoute.patch('/user/:id', validation.userId, MentorsController.userToMentor);

export default mentorsRoute;
