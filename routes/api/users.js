const express = require("express");
const router = new express.Router();
const User = require("./../../models/User");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar"); //for avatar images
const config = require("config");
const jwt = require("jsonwebtoken");

//@route    POST /api/users
//@desc     Register User
//@access   public
/*
___
FUNCTIONALITY:
1. Middleware checks from express-validator and check the validity of the request body.
2. Store the errors from the validation in a variable and send error message, if errors exist
3. Send bad request status if user with the same email already exists
*/
router.post(
  "/register",
  [
    //1:
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    //2:
    const errors = validationResult(req); //conucts the checks of the middleware on the request
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).send({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      //3:
      if (user) {
        console.log("user exists");
        return res
          .status(400)
          .send({ errors: [{ msg: "This mail address is already taken" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200", //size 200px
        r: "pg", //rating ; no naked people can be shown etc
        d: "mm" //if email has no avatar, show user-icon as default instead
      });

      const newUser = new User({
        name,
        email,
        avatar,
        password
      });

      const jwtPayload = {
        user: {
          _id: newUser._id
        }
      };

      jwt.sign(
        jwtPayload,
        config.get("jwtSecret"),
        { expiresIn: "3600000000" },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.status(201).send({ token });
        }
      );

      await newUser.save();
    } catch (error) {
      console.log(error.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
