# 🛡️ Deadline Guardian Pro

Deadline Guardian Pro is an intelligent, full-stack analytics dashboard and real-time task-management hub powered by modern serverless architectures and AI orchestration. It actively watches workflows, predicts deadline risks, organizes daily timetables dynamically, and handles layout view-states cleanly.

---

## 🚀 Core Production Features

* **🤖 Intelligent AI Orchestration:** Integrated natively with the Google Gemini AI API to dynamically analyze complex task descriptions, compute custom priority structures, and generate structured daily timetables.
* **⚡ Client-Side Real-Time Notification Engine:** Built an event-driven background thread clock that evaluates task datasets at 60-second intervals. Dispatches immediate UI toast injections and audio alert hooks on the exact day a milestone is due—running 100% free with zero backend infrastructure costs.
* **📈 Data Analytics Framework:** Implemented an interactive dashboard canvas utilizing Recharts to map real-time performance scores, category density allocations, and active priority distributions.
* **🔒 Cloud Database Synchronization:** Secured asynchronous data pooling and live state tracking by binding application components to active Firebase Firestore sub-collection snapshot streams.
* **🎨 Modern Responsive Interface:** Designed with Material-UI (MUI v5), featuring fluid layout flexbox grids, automated string truncation, and custom global dark/light appearance tokens.

---

## 🛠️ Architecture Tech Stack

* **Frontend Framework UI:** React.js (Compiled via Vite Tooling)
* **Cloud Database & Auth:** Firebase Firestore & Firebase Authentication
* **Design Engineering Systems:** Material-UI (MUI v5)
* **Asynchronous Date Arithmetic:** Day.js (Timezone-safe midnight tracking)
* **Data Visualizations:** Recharts (SVG-driven responsive charting vectors)
* **Generative AI Core:** Google Gemini AI API Interface Node

---

## 📂 System Architecture Overview

```text
[ React.js Frontend (Vite) ] ──( Snapshot Subscription )──> [ Firebase Firestore Cloud ]
            │                                                      ▲
   (60s Clock Loop Check)                                          │
            ▼                                                      │
[ Real-Time Toast Alerts & Audio ]                         [ Firebase Auth Tokens ]
```

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

### 3. Configure Local Environment Profiles
The repository enforces a strict `.gitignore` shield layer to prevent sensitive cloud credentials from leaking into public Git logs. 

1. Create a file named exactly `.env` inside your project's main root folder directory.
2. Open `.env` and fill out your public Firebase client configurations and Gemini API keys:

```text
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_://firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_://appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GEMINI_API_KEY=your_live_google_gemini_key_here
```

### 4. Run the Local Development Port
```bash
npm run dev
```
Open your web browser and navigate to the address displayed in your terminal (usually `http://localhost:5173`).

---

## 🔒 Repository Safety Protocols

To comply with enterprise security architectures, environmental key files must never be checked into remote version control. 

* **Never stage or push your `.env` configuration file.**
* Verify tracked file parameters before executing commits via `git status`.
