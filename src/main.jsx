// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { UIProvider } from "./context/UIContext";
import { TaskProvider } from "./context/TaskContext";
import { AIProvider } from "./context/AIContext"; // ✅ FIXED: Added missing AI Context import

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 1. AuthProvider handles user account records at the root */}
    <AuthProvider>
      
      {/* 2. UIProvider sets up global layout dark/light mode themes */}
      <UIProvider>
        
        {/* 3. TaskProvider streams calendar items from Firebase */}
        <TaskProvider>
          
          {/* 4. ✅ FIXED: Wrapped inside AIProvider so the AI page can read chat state properties */}
          <AIProvider>
            
            {/* Main Application Router Chassis */}
            <App />
            
          </AIProvider>
          
        </TaskProvider>
        
      </UIProvider>
      
    </AuthProvider>
  </React.StrictMode>
);
