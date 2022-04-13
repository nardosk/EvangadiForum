const { newAnswer, getAnswerByQuestId } = require("./answer.service");

module.exports = {
  newAnswer: (req, res) => {
    const { user_id, question_id, answer, time } = req.body;

    //validation
    if (!user_id || !question_id || !answer || !time)
      return res
        .status(400)
        .json({ msg: "Not all fields have been provided!" });

    //sending data to profile with the user_id included in req.body
    newAnswer(req.body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      return res.status(200).json({
        msg: "New Answer added successfully",
        data: results,
      });
    });
  },
  getAnswerByQuestId: (req, res) => {
    console.log(req.query.question_id);
    getAnswerByQuestId(req.query.question_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      if (!results) {
        return res.status(404).json({ msg: "Record not found" });
      }
      return res.status(200).json({ data: results });
    });
  },
};
