const express = require("express");
require("./config/db");

const app = express();

//init middleware
app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));

const PORT = process.env.POTR || 5000;
app.listen(PORT, () => {
  console.log("Server running on Port " + PORT);
});
