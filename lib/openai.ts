// Placeholder for GPT prompt and fetch logic
export async function translateJournalEntry(entry: string) {
  // TODO: Implement OpenAI API call
  return {
    japanese: '[Japanese translation]',
    phrases: ['phrase 1', 'phrase 2'],
  };
}

function fixJson(jsonString: string): string {
  // Add missing commas between objects in arrays and fix common JSON issues
  let fixed = jsonString
    .replace(/}\s*{/g, '},\n{') // insert comma between }{
    .replace(/}\s*\n\s*{/g, '},\n{') // insert comma between } and { on newlines
    .replace(/,\s*([}\]])/g, '$1') // remove trailing commas before ] or }
    .replace(/([\w]+):/g, '"$1":'); // quote unquoted keys
  return fixed;
}

function extractJsonBlock(text: string): string | null {
  // Extract the first {...} or [...] block from the text
  const arrayMatch = text.match(/\[[\s\S]*?\]/);
  if (arrayMatch) return arrayMatch[0];
  const objMatch = text.match(/\{[\s\S]*?\}/);
  if (objMatch) return objMatch[0];
  return null;
}

export async function getTranslationChunks(journalInput: string) {
  const prompt = `You are a helpful Japanese tutor. Translate the user's English journal into simple Japanese.\n\nBreak the sentence into short beginner-friendly phrases.\n\nFor each phrase, return a JSON array like:\n\n[\n  {\n    \"english\": \"I went to Tokyo.\",\n    \"japanese\": \"東京に行きました。\",\n    \"romaji\": \"Tōkyō ni ikimashita.\"\n  }\n]\n\nRespond with **only valid JSON**. Do not include any explanations or formatting outside the JSON block.`;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-r1-0528:free",
      messages: [
        {
          role: "system",
          content: prompt
        },
        {
          role: "user",
          content: journalInput
        }
      ]
    })
  });

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  console.log("OpenRouter raw response:", data);
  console.log("OpenRouter message content:", content);
  try {
    return JSON.parse(content);
  } catch {
    // Try to extract the first JSON block (array or object)
    const extracted = content ? extractJsonBlock(content) : null;
    if (extracted) {
      try {
        return JSON.parse(extracted);
      } catch {
        return JSON.parse(fixJson(extracted));
      }
    }
    throw new Error("Failed to parse translation response");
  }
} 