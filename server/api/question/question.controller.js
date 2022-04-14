const {
  askQuestion,
  getQuestions,
  getquestionbyid,
} = require("./question.service");

module.exports = {
  askQuestion: (req, res) => {
    const { user_id, title, question, time } = req.body;

    //validation
    if (!user_id || !title || !question || !time)
      return res
        .status(400)
        .json({ msg: "Not all fields have been provided!" });
    if (title.length > 200)
      return res
        .status(400)
        .json({ msg: "Title length can not be greater than 200!" });

    //sending data to profile with the user_id included in req.body
    askQuestion(req.body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      return res.status(200).json({
        msg: "New Questions added successfully",
        data: results,
      });
    });
  },
  getQuestions: (req, res) => {
    getQuestions((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      if (!results) {
        return res.status(404).json({ msg: "Record not found" });
      } else {
        return res.status(200).json({ data: results });
      }
    });
  },
  getquestionbyid: (req, res) => {
    getquestionbyid(req.query.question_id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      if (!results) {
        return res.status(404).json({ msg: "Record not found" });
      } else {
        return res.status(200).json({ data: results });
      }
    });
  },
};
