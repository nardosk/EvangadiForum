const pool = require("../../config/database");

module.exports = {
  //data comes form the user controller
  newAnswer: (data, callback) => {
    //inserting data to registration table
    pool.query(
      `INSERT INTO answer(user_id, question_id, answer,time )VALUES(?,?,?,?)`,
      // ? it is hold  it help sql injections
      [data.id, data.body.question_id, data.body.answer, new Date()],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  getAnswerByQuestId: (question_id, callback) => {
    //getting the question list by question_id
    pool.query(
      `SELECT answer.answer_id, answer.question_id, answer.user_id, registration.user_name, answer.answer, answer.time FROM answer LEFT OUTER JOIN registration ON registration.user_id = answer.user_id WHERE answer.question_id = ?`,
      [question_id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
};
