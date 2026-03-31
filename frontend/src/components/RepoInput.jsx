import { useState } from "react";

export default function RepoInput({ onSubmit }) {
  const [url, setUrl] = useState("");

  return (
    <div className="header">
      <input
        placeholder="Enter GitHub repo URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={() => onSubmit(url)}>Analyze</button>
    </div>
  );
}