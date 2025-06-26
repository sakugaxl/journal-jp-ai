import { NextRequest, NextResponse } from 'next/server';
import { getTranslationChunks } from '@/lib/openai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const journal = body?.journal;
    if (!journal) {
      return NextResponse.json({ error: "Missing journal input" }, { status: 400 });
    }
    const result = await getTranslationChunks(journal);
    console.log("OpenAI result:", result);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("/api/translate error:", error);
    return NextResponse.json({ error: "Server Error: " + (error?.message || error) }, { status: 500 });
  }
} 