const router = require('express').Router();
//importing auth middleware
const auth = require('../middleware/auth');

const { askQuestion, getQuestions } = require('./question.controller');

//route new user to be registered using createUser controller
router.post("/question", askQuestion);

//route new user to be registered using createUser controller
router.get("/getquestions", auth, getQuestions);

module.exports = router;