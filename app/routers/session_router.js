const { Router } = require("express");
const {
  createSession,
  deleteSession,
  sessions,
} = require("../controllers/session_controller");

const SessionRouter = Router();

SessionRouter.all("/scanQR", createSession);
SessionRouter.all("/logout", deleteSession);
SessionRouter.all("/sessions", sessions);

module.exports = SessionRouter;
