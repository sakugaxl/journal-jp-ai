"use client";
import React, { useState } from "react";
import JournalInput from "@/components/JournalInput";
import TranslationCard from "@/components/TranslationCard";
import PhrasePlayer from "@/components/PhrasePlayer";
import DownloadDeck from "@/components/DownloadDeck";
import MonetizationPrompt from "@/components/MonetizationPrompt";

type Chunk = {
  english: string;
  japanese: string;
  romaji: string;
};

export default function Home() {
  const [journal, setJournal] = useState("");
  const [translation, setTranslation] = useState<Chunk[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [showMonetization, setShowMonetization] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setLoading(true);
    setShowMonetization(false);
    setTranslation(null);
    setError(null);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ journal }),
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server responded with ${res.status}: ${errorText}`);
      }
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setTranslation(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setTranslation(null);
    } finally {
      setLoading(false);
    }
  }

  function handleAudioComplete() {
    setShowMonetization(true);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Japanese Journal AI</h1>
      <JournalInput
        value={journal}
        onChange={setJournal}
        onSubmit={handleSubmit}
        loading={loading}
      />
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4 w-full max-w-xl text-center">
          {error}
        </div>
      )}
      <TranslationCard translation={translation} />
      <PhrasePlayer
        chunks={translation || []}
        onComplete={handleAudioComplete}
      />
      <DownloadDeck
        chunks={translation || []}
        japanese={translation?.map(chunk => chunk.japanese).join(" ") || ""}
        english={journal}
      />
      {showMonetization && <MonetizationPrompt />}
    </main>
  );
} 