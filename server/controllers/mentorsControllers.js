import Mentors from '../model/mentors';

class MentorsController {
  static getAllMentors(req, res) {
    return res.status(200).json({
      status: 200,
      // eslint-disable-next-line comma-dangle
      data: Mentors
    });
  }

  // view specific mentor
  static ViewMentorDetail(req, res) {
    const findMentor = Mentors.find((mentor) => mentor.id == req.params.id);
    if (findMentor) {
      return res.status(200).json({
        status: 200,
        data: {
          findMentor,
        },
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Mentor not Found',
    });
  }
}

export default MentorsController;