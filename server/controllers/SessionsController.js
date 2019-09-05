import Sessions from '../model/sessions';

class SessionsController {
// create mentorship session
  static createMentorshipSession(req, res) {
    const newSession = {
      id: parseInt(Sessions.length + 1, 10),
      mentorId: parseInt(req.body.mentorId, 10),
      menteeId: parseInt(req.body.menteeId, 10),
      questions: req.body.questions,
      menteeEmail: req.body.menteeEmail,
      session_status: 'pending',
    };
    Sessions.push(newSession);
    res.status(200).json({
      status: 200,
      data: Sessions,
    });
  }
}


export default SessionsController;
