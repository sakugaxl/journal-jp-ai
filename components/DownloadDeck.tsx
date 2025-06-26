import React from "react";

type Chunk = {
  english: string;
  japanese: string;
  romaji: string;
};

type Props = {
  chunks: Chunk[];
  japanese: string;
  english: string;
};

export default function DownloadDeck({ chunks, japanese, english }: Props) {
  if (!chunks.length) return null;

  function createCsv() {
    let csv = 'English,Japanese,Romaji\n';
    for (const chunk of chunks) {
      csv += `"${chunk.english}","${chunk.japanese}","${chunk.romaji}"
`;
    }
    return csv;
  }

  async function handleDownload() {
    const csv = createCsv();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "anki_deck.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <button className="btn btn-accent mt-2" onClick={handleDownload}>
      Download Anki Deck (CSV)
    </button>
  );
} 