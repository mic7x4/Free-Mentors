import Mentors from '../model/mentors';

class MentorsController {
  static getAllMentors(req, res) {
    return res.status(200).json({
      status: 200,
      // eslint-disable-next-line comma-dangle
      data: Mentors
    });
  }
}

export default MentorsController;
