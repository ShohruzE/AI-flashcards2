import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { NextRequest, NextResponse } from "next/server";

const systemPrompt = `You are an API that generates flashcards based on a given topic or subject. When provided with a topic, you should generate a set of 5 flashcards. Each flashcard should have a "front", "back" and "hints" section. The "front" contains a question, term, or prompt, and the "back" contains the answer, definition, or explanation. The "hints" section contains a set of three progressive hints as an array, where each hint is to build on top of the previous one. Your output should be in JSON format, structured as an array of objects, each representing a flashcard.`;

const flashcardSchema = z.object({
  front: z.string(),
  back: z.string(),
  hints: z.array(z.string()),
});

const flashcardsSchema = z.object({
  flashcards: z.object({
    title: z.string(),
    items: z.array(flashcardSchema),
  }),
});

export async function POST(request: NextRequest) {
  const openai = new OpenAI();
  const { topic } = await request.json();

  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: topic },
    ],
    response_format: zodResponseFormat(flashcardsSchema, "flashcards"),
  });
  const flashcards = completion.choices[0].message.parsed;

  return NextResponse.json(flashcards);
}
