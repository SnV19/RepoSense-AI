import { useState } from "react";
import RepoInput from "./components/RepoInput";
import FileTree from "./components/FileTree";
import { fetchRepoStructure } from "./services/api";

function App() {
  const [tree, setTree] = useState(null);
  const [repoName, setRepoName] = useState("");
  const [summary, setSummary] = useState("");

  const handleSubmit = async (url) => {
  try {
    const data = await fetchRepoStructure(url);

   setTree(data.tree);
   setSummary(data.summary);

   const parts = url.split("/");
  setRepoName(parts[4]);
  } catch (err) {
    alert("Error fetching repo");
  }
};

 return (
  <div className="container">
    <RepoInput onSubmit={handleSubmit} />

    <div className="main">
      <div className="sidebar">
        {tree ? <FileTree tree={tree} /> : "No data"}
      </div>

      <div className="content">
  <h2>{repoName || "Repository Viewer"}</h2>

  {!tree && <p>Enter a repo to analyze</p>}

  {tree && !summary && (
    <p>Analyzing repository with AI... ⏳</p>
  )}

  {summary && (
    <pre style={{ whiteSpace: "pre-wrap" }}>
      {summary}
    </pre>
  )}
</div>
    </div>
  </div>
);
}

export default App;