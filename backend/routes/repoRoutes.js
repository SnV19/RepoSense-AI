const express = require("express");
const router = express.Router();

const { getRepoStructure } = require("../controllers/repoController");

router.post("/structure", getRepoStructure);

module.exports = router;