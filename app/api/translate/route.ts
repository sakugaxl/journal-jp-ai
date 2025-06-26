import { NextRequest, NextResponse } from 'next/server';
import { getTranslationChunks } from '@/lib/openai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const journal = body?.journal;
    if (!journal) {
      console.error("Missing journal input", body);
      return NextResponse.json({ error: "Missing journal input" }, { status: 400 });
    }
    try {
      const result = await getTranslationChunks(journal);
      return NextResponse.json(result);
    } catch (err) {
      console.error("Translation parse error:", err);
      return NextResponse.json({ error: "Translation failed" }, { status: 500 });
    }
  } catch (error: any) {
    console.error("/api/translate error:", error);
    return NextResponse.json({ error: "Server Error: " + (error.message || error) }, { status: 500 });
  }
} 