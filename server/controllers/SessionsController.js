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

  // Accept Session
  static acceptSession(req, res) {
    const sessionId = parseInt(req.params.id, 10);
    const findSession = Sessions.find((session) => session.id === sessionId);
    if (findSession) {
      findSession.session_status = 'accepted';
      return res.status(200).json({
        status: 200,
        data: findSession,
      });
    }
    return res.status(204).json({
      status: 204,
      error: 'Not created',
    });
  }
}


export default SessionsController;
