// Placeholder for TTS logic using Web Speech API
export function playText(text: string) {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    const utterance = new window.SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }
} 