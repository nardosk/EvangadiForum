const pool = require('../../config/database');

module.exports = {
 //data comes form the user controller
 askQuestion: (data, callback) => {

  //inserting data to registration table
  pool.query(`INSERT INTO question(user_id, title, question,time )VALUES(?,?,?,?)`,
   // ? it is hold  it help sql injections
   [
    data.user_id,
    data.title,
    data.question,
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
 getQuestions: (callback) => {
  //getting the question list by user_id
  pool.query(`SELECT * FROM question`, (err, result) => {
   if (err) {
    return callback(err);
   }
   return callback(null, result);
  })
 }
}