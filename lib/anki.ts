// Placeholder for Anki deck export logic
export function generateAnkiCSV(phrases: string[], translations: string[]): string {
  let csv = 'Phrase,Translation\n';
  for (let i = 0; i < phrases.length; i++) {
    csv += `"${phrases[i]}","${translations[i] || ''}"
`;
  }
  return csv;
} 