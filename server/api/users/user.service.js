const pool = require('../../config/database');

module.exports = {
    //data comes form the user controller
    register: (data, callback) => {

        //inserting data to registration table
        pool.query(`INSERT INTO registration(user_name,user_email,user_password)VALUES(?,?,?)`,
            // ? it is hold  it help sql ingections
            [
                data.userName,
                data.email,
                data.password
            ],
            (err, result) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, result);
            }
        );
    },
    profile: (data, callback) => {

        //inserting data to profile table
        pool.query(`INSERT INTO profile(user_id,first_name,last_name)VALUES(?,?,?)`,
            [
                data.userId,
                data.firstName,
                data.lastName
            ],
            (err, result) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, result);
            }
        );
    },
    userById: (id, callback) => {

        //getting data from registration and profile tables by joining them
        pool.query(`SELECT registration.user_id,user_name,user_email,first_name,last_name FROM registration LEFT JOIN profile ON registration.user_id = profile.user_id WHERE registration.user_id = ?`, [id], (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result[0]);
        })
    },
    getUserByEmail: (email, callback) => {

        //getting the user-info by using email
        pool.query(`SELECT * FROM registration WHERE user_email = ?`, [email], (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result[0]);
        })
    }
}