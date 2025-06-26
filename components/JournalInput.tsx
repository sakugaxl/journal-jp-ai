import React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  loading?: boolean;
};

export default function JournalInput({ value, onChange, onSubmit, loading }: Props) {
  return (
    <form
      className="p-4 border rounded mb-4 w-full max-w-xl flex flex-col gap-2"
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <textarea
        className="border p-2 rounded w-full min-h-[80px]"
        placeholder="Write your English journal entry here..."
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        className="btn btn-primary self-end"
        disabled={loading || !value.trim()}
      >
        {loading ? "Translating..." : "Translate"}
      </button>
    </form>
  );
} 