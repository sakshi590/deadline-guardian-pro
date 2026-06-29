# 🛡️ Deadline Guardian Pro

Deadline Guardian Pro is an intelligent analytics dashboard and task-management hub powered by modern frontend architectures and AI. It analyzes workflows, predicts deadline risks, organizes daily timetables dynamically, and handles dark/light UI switching cleanly.

---

## 🚀 Key Features

* **🤖 Intelligent AI Assistant:** Built-in integration with Google Gemini AI to analyze tasks, create timetables, and detect priority constraints.
* **📈 Analytics Framework:** Interactive Recharts rendering structural charts for productivity scores, priority allocations, and category maps.
* **📅 Dynamic Calendar System:** Native drawer components and custom chip handlers to keep track of near-term deadlines.
* **🎨 Modern UI Design Layout:** Built on top of Material-UI (MUI), featuring automated text wrapping, loading skeletons, and fluid flexbox grids.

---

## 🛠️ Tech Stack

* **Frontend Library:** React.js (Vite Tooling)
* **Design Systems:** Material-UI (MUI v5)
* **Data Visualization:** Recharts
* **AI Orchestration:** Google Gemini AI API
* **Data Management:** Local State / React Context API (Production database ready)
* **Markdown Parsing:** React-Markdown

---

## ⚙️ Local Installation & Development

Follow these steps to spin up the local development ecosystem on your machine:

### 1. Clone the Codebase
```bash
git clone https://github.com
cd deadline-guardian-pro
```

### 2. Install Project Dependencies
```bash
npm install
```

### 3. Configure Environmental Keys
The codebase uses a strict `.gitignore` guard layer to keep private keys safe. To run your local instance:
1. Duplicate the `.env.example` file in the root folder.
2. Rename the duplicated file to exactly `.env`.
3. Open `.env` and fill in your private Gemini API credential:

```text
VITE_GEMINI_API_KEY=your_live_google_gemini_key
```

### 4. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to the address displayed in your terminal (usually `http://localhost:5173`).

---

## 📂 Repository Security Rules

To ensure API safety, environmental keys are kept off-grid. If you modify core environment fields, update `.env.example` accordingly.

* **Never upload `.env` configuration files.**
* Check tracked items before staging via `git status`.
