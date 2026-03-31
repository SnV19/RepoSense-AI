# RepoSense-AI 🔍

An intelligent, hallucination-resistant GitHub repository analyzer that generates structured summaries using a hybrid approach combining rule-based analysis and local LLM inference.

---

## 🚀 Overview

RepoSenseAI analyzes a GitHub repository’s file structure and automatically generates a concise summary including:

* Project Type
* Tech Stack
* Key Modules
* Confidence Level
* Functional Summary

Unlike typical AI-based tools, RepoSenseAI minimizes hallucinations by enforcing strict constraints and grounding outputs in actual repository data.

---

## ✨ Key Features

* 🧠 **Hybrid AI + Rule-Based System**
  Combines deterministic logic with local LLM reasoning for accurate results

* 🚫 **Hallucination Control**
  Prevents false assumptions by restricting the model to provided file structure

* 📂 **Structure-Aware Analysis**
  Identifies core modules (e.g., index files and main directories) while ignoring auxiliary folders

* ⚡ **Fast & Local Execution**
  Uses Phi-3 via Ollama for offline inference

* 📊 **Confidence Scoring**
  Provides reliability level based on available repository data

---

## 🛠️ Tech Stack
* **Frontend:** React, Vite
* **Backend:** Node.js
* **AI Model:** Phi-3 (via Ollama)
* **API Communication:** Axios
* **Data Source:** GitHub Repository File Structure

---

## ⚙️ How It Works

1. Fetch repository file structure using GitHub API
2. Apply rule-based filtering:

   * Detect languages
   * Identify core files
   * Remove noise (CI, docs, configs)
3. Generate structured prompt with strict constraints
4. Send to local LLM via Ollama
5. Refine and return final structured output

---

## 🧠 Design Principles

* **Grounded Outputs Only**
  No assumptions beyond provided file list

* **Core vs Auxiliary Separation**
  Prioritizes main implementation files over test/benchmark folders

* **Strict Prompt Engineering**
  Enforces deterministic behavior in LLM responses

* **Fail-Safe Handling**
  Provides fallback summaries for minimal or empty repositories

---

## 📌 Example Output

```
- Project Type: Utility Library

- Tech Stack: JavaScript, Node.js

- Key Modules: index.js, test/

- Confidence Level: High

- Summary: This repository implements a lightweight JavaScript utility library for string padding. It follows a standard Node.js package structure and includes test modules for validation.
```

---

## 🧪 Tested Repositories

* Hello-World repository → Minimal repo detection
* left-pad → Standard utility library
* is-number → Functional validation library

---

## Demo

Watch the demo here: https://youtu.be/R5DLEB1332c

---

## ⚠️ Limitations

* Relies on file structure (not deep code parsing)
* May require improvements for very large or complex repositories
* Accuracy depends on clarity of repository organization

---

## 🚀 Future Improvements

* ⭐ GitHub repository scoring (complexity, maintainability)
* ⭐ README semantic analysis
* ⭐ Frontend dashboard for visualization
* ⭐ Multi-language deep analysis

---

## 📦 Installation & Usage

```bash
# Clone the repository
git clone git clone https://github.com/SnV19/RepoSense-AI.git

cd reposenseai

# Install dependencies
npm install

# Run the server
node server.js
```

Make sure Ollama is running:

```bash
ollama run phi3
```

---

## 🎯 Why This Project Stands Out

This project goes beyond basic AI integration by:

* Addressing **LLM hallucination problems**
* Implementing **constraint-based AI systems**
* Combining **software engineering + AI reasoning**

---

## 👨‍💻 Author

Sneha

---
## License
This project is licensed under the MIT License.

---

## ⭐ If you like this project

Give it a star and feel free to contribute!
