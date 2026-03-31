const { fetchRepoData } = require("../services/githubService");
const { buildTree } = require("../utils/treeBuilder");
const { generateSummary } = require("../services/aiService");

exports.getRepoStructure = async (req, res) => {
  console.log("API HIT");

  try {
    const { repoUrl } = req.body;

    // 🔹 Step 1: Get raw file list (array)
    const files = await fetchRepoData(repoUrl);

    // 🔹 Step 2: Build tree for frontend UI
    const tree = buildTree(files);

    let summary = "";

    try {
      // 🔥 IMPORTANT FIX: send RAW files, not tree
      summary = await generateSummary(files);
    } catch (err) {
      console.error("AI ERROR:", err.message);
      summary = "AI summary unavailable";
    }

    // 🔹 Step 3: Send both
    res.json({ tree, summary });

  } catch (err) {
    console.error("MAIN ERROR:", err.message);
    res.status(500).json({ error: "Server failed" });
  }
};