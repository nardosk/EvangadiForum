const pool = require('../../config/database');

module.exports = {
 //data comes form the user controller
 newAnswer: (data, callback) => {

  //inserting data to registration table
  pool.query(`INSERT INTO answer(user_id, question_id, answer,time )VALUES(?,?,?,?)`,
   // ? it is hold  it help sql injections
   [
    data.user_id,
    data.question_id,
    data.answer,
    data.time
   ],
   (err, result) => {
    if (err) {
     return callback(err);
    }
    return callback(null, result);
   }
  );
 },
 getAnswerByQuestId: (questionId, callback) => {
  //getting the question list by user_id
  pool.query(`SELECT * FROM answer WHERE question_id = ?`, [questionId], (err, result) => {
   if (err) {
    return callback(err);
   }
   return callback(null, result[0]);
  })
 }
}