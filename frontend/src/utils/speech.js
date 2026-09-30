/**
 * Web Speech API helper for farmer voice accessibility
 */
export const speakResult = (text, lang = 'en') => {
  if (!('speechSynthesis' in window)) {
    console.warn("Speech synthesis not supported in this browser");
    return;
  }
  
  window.speechSynthesis.cancel(); // stop any ongoing speech
  
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set language code
  if (lang === 'ta') {
    utterance.lang = 'ta-IN';
  } else if (lang === 'hi') {
    utterance.lang = 'hi-IN';
  } else {
    utterance.lang = 'en-IN';
  }
  
  utterance.rate = 0.95; // slightly slower for clear farmer understanding
  utterance.pitch = 1.0;
  
  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
