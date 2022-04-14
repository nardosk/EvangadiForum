const { newAnswer, getAnswerByQuestId } = require("./answer.service");

module.exports = {
  newAnswer: (req, res) => {
    const { question_id, answer } = req.body;
    //validation
    if (!question_id || !answer)
      return res
        .status(400)
        .json({ msg: "Not all fields have been provided!" });

    //sending data to profile with the user_id included in req.body
    newAnswer(req, (err, results) => {
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
