import React, { useState } from "react";

type Chunk = {
  english: string;
  japanese: string;
  romaji: string;
};

type Props = {
  chunks: Chunk[];
  onComplete?: () => void;
};

export default function PhrasePlayer({ chunks, onComplete }: Props) {
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState<number | null>(null);

  async function playChunks() {
    if (!chunks.length) return;
    setPlaying(true);
    for (let i = 0; i < chunks.length; i++) {
      setCurrent(i);
      await speakChunk(chunks[i].japanese);
    }
    setCurrent(null);
    setPlaying(false);
    if (onComplete) onComplete();
  }

  function speakChunk(text: string) {
    return new Promise<void>(resolve => {
      const utter = new window.SpeechSynthesisUtterance(`Repeat after me: ${text}`);
      utter.lang = "ja-JP";
      utter.onend = () => setTimeout(resolve, 500);
      window.speechSynthesis.speak(utter);
    });
  }

  if (!chunks.length) return null;
  return (
    <div className="p-4 border rounded w-full max-w-xl mb-4">
      <button
        className="btn btn-secondary mb-2"
        onClick={playChunks}
        disabled={playing}
      >
        {playing ? "Playing..." : "Play Chunks (TTS)"}
      </button>
      {current !== null && (
        <div className="mt-2 p-2 bg-gray-50 rounded">
          <div><b>English:</b> {chunks[current].english}</div>
          <div><b>Japanese:</b> {chunks[current].japanese}</div>
          <div><b>Romaji:</b> {chunks[current].romaji}</div>
        </div>
      )}
    </div>
  );
} 