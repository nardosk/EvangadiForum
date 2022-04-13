const router = require("express").Router();
//importing auth middleware
const auth = require("../middleware/auth");

const { newAnswer, getAnswerByQuestId } = require("./answer.controller");

//route new user to be registered using createUser controller
router.post("/newanswer", newAnswer);

//route new user to be registered using createUser controller
router.get("/getanswer", auth, getAnswerByQuestId);

module.exports = router;
