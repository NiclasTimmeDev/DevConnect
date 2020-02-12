const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

/*
Middleware that executes before saving:
1. "isModified" will trigger whenever the users pasword is changed. This is also true for when the User is created
2. hash the password 8 times
*/
userSchema.pre("save", async function(next) {
  //1:
  if (this.isModified("password")) {
    //2:
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

/*
.statics are methods that will be available on the  the User Objects:
const newUser = User.findByCredentials();
___
1. find user by the email given in the request
2. return null if it doesn't
3. check if hashed version of password in the request and the hashed password for the corresponding user in the DB match.
4. return null if they don't
*/

userSchema.statics.findByCredentials = async (email, password) => {
  //1:
  const user = await User.findOne({ email });

  //2:
  if (!user) {
    return;
  }

  //3:
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return;
  }

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
