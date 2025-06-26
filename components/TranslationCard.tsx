import React from "react";

type Chunk = {
  english: string;
  japanese: string;
  romaji: string;
};

type Props = {
  translation: Chunk[] | null;
};

export default function TranslationCard({ translation }: Props) {
  if (!translation || !Array.isArray(translation) || translation.length === 0) return null;
  return (
    <div className="p-4 border rounded mb-4 w-full max-w-xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">English</th>
            <th className="border-b p-2">Japanese</th>
            <th className="border-b p-2">Romaji</th>
          </tr>
        </thead>
        <tbody>
          {translation.map((chunk, i) => (
            <tr key={i}>
              <td className="p-2 align-top">{chunk.english}</td>
              <td className="p-2 align-top">{chunk.japanese}</td>
              <td className="p-2 align-top">{chunk.romaji}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 