// src/context/SettingsContext.jsx

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const SettingsContext = createContext();

const DEFAULT_SETTINGS = {
  /* ================= Appearance ================= */

  // light | dark | system
  theme: "system",

  /* ================= Notifications ================= */

  notifications: true,
  emailNotifications: true,
  browserNotifications: true,
  reminderNotifications: true,

  /* ================= AI ================= */

  aiSuggestions: true,
  aiPersonality: "Balanced",
  aiResponseLength: "Medium",

  /* ================= Voice ================= */

  autoSpeak: true,
  autoListen: false,
  voiceSpeed: 1,
  voicePitch: 1,

  /* ================= Calendar ================= */

  defaultView: "month",
  weekStart: "Monday",
  timeFormat: "12h",

  /* ================= Language ================= */

  language: "English",
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("appSettings");

      return saved
        ? JSON.parse(saved)
        : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "appSettings",
      JSON.stringify(settings)
    );
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateSettings = (values) => {
    setSettings((prev) => ({
      ...prev,
      ...values,
    }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSetting,
        updateSettings,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettings must be used within SettingsProvider."
    );
  }

  return context;
};