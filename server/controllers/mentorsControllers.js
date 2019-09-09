import Users from '../model/users';

class MentorsController {
  static getAllMentors(req, res) {
    const mentors = Users.filter((user) => user.isMentor === true);
    return res.status(200).json({
      status: 200,
      data: mentors,
    });
  }

  // view specific mentor
  static ViewMentorDetail(req, res) {
    const mentorId = parseInt(req.params.id, 10);
    const findMentor = Users.find((mentor) => mentor.id === mentorId && mentor.isMentor === true);
    if (findMentor) {
      return res.status(200).json({
        status: 200,
        data: findMentor,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Mentor not Found',
    });
  }

  // Change user to Mentor
  static userToMentor(req, res) {
    const userId = parseInt(req.params.id, 10);
    const userIndex = Users.findIndex((usr) => usr.id === userId);
    if (userIndex >= 0) {
      Users[userIndex].isMentor = true;
      return res.status(200).json({
        status: 200,
        message: 'User account changed to mentor',
        data: Users[userIndex],
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'user not found',
    });
  }
}

export default MentorsController;
