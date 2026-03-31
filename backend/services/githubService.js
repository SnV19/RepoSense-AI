const axios = require("axios");

exports.fetchRepoData = async (repoUrl) => {
  const parts = repoUrl.split("/");
  const owner = parts[3];
  const repo = parts[4];

  // get default branch
  const repoInfo = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers: {
        "User-Agent": "RepoSenseAI",
      },
    }
  );

  const branch = repoInfo.data.default_branch;

  const treeRes = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
    {
      headers: {
        "User-Agent": "RepoSenseAI",
      },
    }
  );

  return treeRes.data.tree;
};