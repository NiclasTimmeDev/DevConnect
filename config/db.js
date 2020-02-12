const mongoose = require("mongoose");
const config = require("config"); //package that makes variables in default.json globally available

dbCredential = config.get("mongoURI"); //from default.json

const connectDB = async () => {
  try {
    await mongoose.connect(dbCredential, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("db connected");
  } catch (e) {
    console.log("db connection failed");
    console.log(e.message);
    //Exit process with failure
    process.exit(1);
  }
};

connectDB();
