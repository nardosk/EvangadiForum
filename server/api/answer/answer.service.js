const pool = require("../../config/database");

module.exports = {
  //data comes form the user controller
  newAnswer: (data, callback) => {
    //inserting data to registration table
    pool.query(
      `INSERT INTO answer(user_id, question_id, answer,time )VALUES(?,?,?,?)`,
      // ? it is hold  it help sql injections
      [data.user_id, data.question_id, data.answer, data.time],
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
      `SELECT * FROM answer WHERE question_id = ?`,
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
