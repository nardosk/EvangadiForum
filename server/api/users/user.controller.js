const {
  register,
  userById,
  getUserByEmail,
  profile,
} = require("./user.service");

//Importing bcryptJs module to use password encryption
const bcrypt = require("bcryptjs");

//Importing database structure
const pool = require("../../config/database");

//jsonwebtoken help to create a token
const jwt = require("jsonwebtoken");

//exporting all methods
module.exports = {
  createUser: (req, res) => {
    const { userName, firstName, lastName, email, password } = req.body;
    //validation
    if (!userName || !firstName || !lastName || !email || !password)
      return res
        .status(400)
        .json({ msg: "Not all fields have been provided!" });
    if (password.length < 8)
      return res
        .status(400)
        .json({ msg: "Password must be at least 8 characters!" });

    return getUserByEmail(email, (err, results) => {
      if (err) {
        res.status(500).json({ msg: "database connection err" });
      }
      if (results) {
        return res
          .status(400)
          .json({ msg: "An account with this email already exists!" });
      } else {
        //password encryption
        const salt = bcrypt.genSaltSync();

        //changing the value of password from req.body with the encrypted password
        req.body.password = bcrypt.hashSync(password, salt);

        //sending data to register
        register(req.body, (err, results) => {
          if (err) {
            if (err.code == "ER_DUP_ENTRY") {
              return res.status(500).json({ msg: err.sqlMessage });
            }
            return res.status(500).json({ msg: "database connection err" });
          }
          req.body.userId = results.insertId;
          //sending data to profile with the user_id included in req.body
          profile(req.body, (err, results) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ msg: "database connection err" });
            }
          });
          return res.status(200).json({
            msg: "New user added successfully!",
            data: results,
          });
        });
      }
    });
  },
  getUserById: (req, res) => {
    //getting req.id from auth middleware
    userById(req.id, (err, results) => {
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
  login: (req, res) => {
    //destructuring req.body
    const { email, password } = req.body;

    //validation
    if (!email || !password)
      return res
        .status(400)
        .json({ msg: "Not all fields have been provided!" });

    //sending data to check if email exist on our database
    getUserByEmail(email, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: "database connection err" });
      }
      if (!results) {
        return res
          .status(404)
          .json({ msg: "No account with this email has been registered" });
      }

      //check provided password by the user with the encrypted password from database
      const isMatch = bcrypt.compareSync(password, results.user_password);
      if (!isMatch) return res.status(404).json({ msg: "Invalid Credentials" });

      //creating token for the signed user that expires in 1 hour and using our secret key for creation
      const token = jwt.sign({ id: results.user_id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      //returning token and user-info
      return res.json({
        token,
        user: {
          id: results.user_id,
          display_name: results.user_name,
        },
      });
    });
  },
};
