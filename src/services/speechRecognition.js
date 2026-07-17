// src/services/speechRecognition.js

let recognition = null;
let isCurrentlyListeningState = false; // ✅ FIXED: Track the operational lifecycle state of the native microphone thread

export const isSpeechRecognitionSupported = () => {
  return (
    "SpeechRecognition" in window ||
    "webkitSpeechRecognition" in window
  );
};

export const createSpeechRecognition = () => {
  if (!isSpeechRecognitionSupported()) {
    return null;
  }

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = "en-US";
  recognition.maxAlternatives = 1;

  return recognition;
};

export const startListening = (
  onResult,
  onEnd,
  onError
) => {
  if (!recognition) {
    recognition = createSpeechRecognition();
  }

  if (!recognition) return;

  // ✅ FIXED: Hardened State Guard. Aborts any existing stuck voice capture threads 
  // before starting a clean loop to completely prevent native 'InvalidStateError' browser crashes.
  if (isCurrentlyListeningState) {
    try {
      recognition.abort();
    } catch (e) {
      console.debug("Silent cleanup of active microphone stream:", e);
    }
  }

  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join("");

    onResult(transcript);
  };

  recognition.onerror = (event) => {
    console.error("Native Speech Recognition Error:", event);
    // Suppress secondary noise warnings from triggering fatal crash alerts to the UI
    if (event.error !== "no-speech") {
      onError?.(event.error);
    }
  };

  recognition.onend = () => {
    isCurrentlyListeningState = false; // Reset boundary on termination
    onEnd?.();
  };

  try {
    isCurrentlyListeningState = true;
    recognition.start();
  } catch (startError) {
    console.warn("Speech recognition initialization capture recovered safely:", startError);
    isCurrentlyListeningState = false;
    // Auto-retry once if browser thread experiences transient network latency shifts
    try {
      recognition.abort();
      setTimeout(() => {
        isCurrentlyListeningState = true;
        recognition.start();
      }, 100);
    } catch (retryErr) {
      onError?.("Unable to access microphone audio lanes.");
    }
  }
};

export const stopListening = () => {
  if (recognition) {
    try {
      recognition.stop();
    } catch (e) {
      console.debug("Microphone stream already stopped:", e);
    } finally {
      isCurrentlyListeningState = false;
    }
  }
};
