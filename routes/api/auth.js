const express = require("express");
const router = new express.Router();
const auth = require("./../../middleware/auth");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar"); //for avatar images
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("./../../models/User");
const bcrypt = require("bcryptjs");

//@route    GET /api/auth
//@desc     Show a user
//@access   private

/*
FUNCTIONALITY: 
____
1. get the _id from req.user, which is defined in the auth middleware. Also, hide the password
2. send the user
*/
router.get("/", auth, async (req, res) => {
  console.log("auth hit");
  try {
    //1:
    const user = await User.findById(req.user._id).select("-password");
    //2:
    res.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ errors: [{ msg: "server error" }] });
  }
});

//@route    POST /api/auth/login
//@desc     Authenticate user & get token
//@access   public
/*
___
FUNCTIONALITY:
1. Middleware checks from express-validator and check the validity of the request body.
2. Store the errors from the validation in a variable and send error message, if errors exist
3. Find user with credentials with the method defined in the User model. The function will return null if the user credentials are incorrect
4. Send error if user could not be logged in
5. Generate token with payload {user: _id: user_id} and secret from config
6. send the token to client
*/

router.post(
  "/login",
  [
    //1:
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a password").exists()
  ],
  async (req, res) => {
    console.log("endpoint hit");
    //2:
    const errors = validationResult(req); //conucts the checks of the middleware on the request
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      //3:
      const user = await User.findByCredentials(email, password);
      //4:
      if (!user) {
        return res
          .status(401)
          .send({ error: [{ msg: "invalid credentials" }] });
      }
      //5:
      const jwtPayload = {
        user: {
          _id: user._id
        }
      };

      jwt.sign(
        jwtPayload,
        config.get("jwtSecret"),
        { expiresIn: "360000" },
        (err, token) => {
          if (err) {
            throw err;
          }
          //6:
          res.status(200).send({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
