export function pronounceWord(wordToSpeetch) {
  const utterance = new SpeechSynthesisUtterance(wordToSpeetch);
  utterance.lang = "ja-JP"; // Japanese
  window.speechSynthesis.speak(utterance);
}
