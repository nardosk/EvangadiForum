const router = require("express").Router();
//importing auth middleware
const auth = require("../middleware/auth");

const {
  askQuestion,
  getQuestions,
  getquestionbyid,
} = require("./question.controller");

//route new user to be registered using createUser controller
router.post("/question", auth, askQuestion);

//route new user to be registered using createUser controller
router.get("/getquestions", auth, getQuestions);

//route new user to be registered using createUser controller
router.get("/getquestionbyid", auth, getquestionbyid);

module.exports = router;
