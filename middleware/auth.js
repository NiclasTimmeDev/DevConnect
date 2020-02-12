const jwt = require("jsonwebtoken");
const config = require("config");

/*
Middleware to check if a token is provided when making a request.
It will deny the access to a route if no token is provided
___
1. check if token is in req.header
2. throw error if no token is provided
3. If there is a token, decode if with the secret that is stored in config/default.json
4. If decoding is successful, the function will return the payload that the token was originally created with
4. (ctd.) This is defined in the user route. The playload is {user: {_id: user._id}}
5. set req.user to the user object that is stored in decoded upon successful verification
*/
module.exports = async (req, res, next) => {
  //1:
  const token = req.header("x-auth-token");
  //2:
  if (!token) {
    return res
      .status(401)
      .send({ error: [{ msg: "No token, authorization denied" }] });
  }

  try {
    //3 + 4:
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //5:
    req.user = decoded.user;
    next();
  } catch (e) {
    console.log(e.message);
    res.status(401).send({ error: [{ msg: "Token is not valid" }] });
  }
};
