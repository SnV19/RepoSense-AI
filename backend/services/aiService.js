const axios = require("axios");

exports.generateSummary = async (files) => {
  try {
    if (!files || files.length === 0) {
      return "No files found in repository.";
    }

    const paths = files.map(f => f.path.toLowerCase());

    // 🔹 RULE 1: Minimal repo detection
    const isMinimal =
      files.length <= 3 &&
      paths.some(p => p.includes("readme"));

    if (isMinimal) {
      return `
- Project Type: Demo Repository

- Tech Stack: Markdown

- Key Modules: None

- Confidence Level: High

- Summary: This repository is a minimal/demo project with no significant source code.
`;
    }

    // 🔹 RULE 2: Strict Tech Stack Detection (NO GUESSING)
    const tech = new Set();

    if (paths.some(p => p.endsWith(".js"))) tech.add("JavaScript");
    if (paths.some(p => p.endsWith(".ts"))) tech.add("TypeScript");
    if (paths.some(p => p.endsWith(".py"))) tech.add("Python");
    if (paths.some(p => p.endsWith(".cpp") || p.endsWith(".c"))) tech.add("C/C++");
    if (paths.some(p => p.endsWith(".java"))) tech.add("Java");
    if (paths.some(p => p.endsWith(".go"))) tech.add("Go");
    if (paths.some(p => p.endsWith(".rs"))) tech.add("Rust");

    if (paths.includes("package.json")) tech.add("Node.js");
    if (paths.includes("requirements.txt")) tech.add("Python (pip)");

    // 🔹 RULE 3: Project Type Classification
    let projectType = "Software Project";

    const hasSrc = paths.some(p => p.startsWith("src/"));
    const hasLib = paths.some(p => p.startsWith("lib/"));
    const hasApp =
      paths.some(p => p.includes("app.js") || p.includes("server.js") || p.includes("main.py"));
    const hasIndexOnly = paths.includes("index.js");

    if (!hasSrc && hasIndexOnly && !hasApp) {
      projectType = "Utility Library";
    } else if (hasLib && !hasApp) {
      projectType = "Library";
    } else if (hasApp || hasSrc) {
      projectType = "Application";
    }

    // 🔹 RULE 4: Key Modules (ONLY real ones)
    const keyModules = [];

    if (paths.some(p => p.startsWith("src/"))) keyModules.push("src/");
    if (paths.some(p => p.startsWith("lib/"))) keyModules.push("lib/");
    if (paths.some(p => p.startsWith("test"))) keyModules.push("test/");
    if (paths.some(p => p.startsWith("examples"))) keyModules.push("examples/");
    if (paths.some(p => p.startsWith("perf"))) keyModules.push("perf/");
    if (paths.includes("index.js")) keyModules.push("index.js");

    // 🔹 Confidence logic
    let confidence = "Medium";
    if (files.length > 20) confidence = "High";
    if (files.length < 5) confidence = "Low";

    // 🔹 Limit repo structure sent to AI
    const simplified = files
      .slice(0, 50)
      .map(f => f.path)
      .join("\n");

    // 🔹 FINAL STRICT PROMPT (ALL RULES INCLUDED)
    const prompt = `
You are a strict software analyzer.

Follow ALL rules strictly:

- ONLY use the provided repository file list
- DO NOT assume any frameworks (e.g., React, Express, Jest) unless explicitly present
- DO NOT invent or modify technology names (e.g., "Node.static" is invalid — only use real names like "Node.js")
- DO NOT invent files, tools, or technologies that are not explicitly listed
- DO NOT change the given project type unless clearly incorrect

- The main purpose of the repository MUST be inferred from core files (e.g., index.js, main.py), NOT from auxiliary folders like test/, perf/, or docs/

- If TypeScript definition files (.d.ts) are present, mention "TypeScript (type definitions)" ONLY — do not claim full TypeScript usage unless .ts files or configs exist

- Key Modules must include only real folders or important entry files (e.g., src/, lib/, index.js). Do NOT include config files like package.json

- If uncertain, say "Not enough information" instead of guessing

- Avoid unnecessary uncertainty. Be confident when evidence is clear
- DO NOT use words like "assuming", "likely", or "possibly"

- Keep the output concise, clean, and professional
- Focus on the primary functionality of the project in the summary, not secondary files

- Do NOT include explanations, reasoning, or confidence per section. Only provide final structured output.\
-The primary purpose must be inferred from core files (e.g., index.js). Ignore test/, benchmark/, or auxiliary folders when determining the main functionality.
-Do NOT infer internal logic, algorithms, or implementation details from file names alone.
-Do NOT infer or introduce folders (e.g., src/) unless they are explicitly present in the file list.
-Key Modules must prioritize core implementation files (e.g., index.js). Do NOT treat benchmark/, test/, or CI-related folders as primary modules.

Given Analysis:
Project Type: ${projectType}
Tech Stack: ${[...tech].join(", ") || "Unknown"}
Key Modules: ${keyModules.join(", ") || "None"}

Your task:
Refine the above analysis without adding new assumptions.

Return EXACT format:

- Project Type:

- Tech Stack:

- Key Modules:

- Confidence Level:

- Summary:

Repository Files:
${simplified}
`;

    // 🔹 Call Ollama (phi3)
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "phi3",
        prompt,
        stream: false,
      },
      { timeout: 60000 }
    );

    if (!response.data || !response.data.response) {
      throw new Error("Invalid AI response");
    }

    return response.data.response;

  } catch (err) {
    console.error("AI ERROR:", err.message);

    // 🔹 FINAL fallback (never break UI)
    return `
- Project Type: Software Project

- Tech Stack: Unknown

- Key Modules: Unknown

- Confidence Level: Low

- Summary: Unable to analyze repository due to insufficient data or processing error.
`;
  }
};