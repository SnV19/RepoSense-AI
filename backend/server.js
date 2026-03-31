const express = require("express");
const cors = require("cors");

const repoRoutes = require("./routes/repoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/repo", repoRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});