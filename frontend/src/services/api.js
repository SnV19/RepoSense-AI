import axios from "axios";

export const fetchRepoStructure = async (repoUrl) => {
  const res = await axios.post("http://localhost:5000/api/repo/structure", {
    repoUrl,
  });
  return res.data;
};