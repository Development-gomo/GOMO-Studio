import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const MODEL = "claude-opus-5";

export async function POST(request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI content generation isn't configured. Set ANTHROPIC_API_KEY." },
      { status: 503 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { prompt, content, pageLabel } = body ?? {};
  if (typeof prompt !== "string" || !prompt.trim()) {
    return NextResponse.json({ error: "A prompt is required." }, { status: 400 });
  }
  if (!content || typeof content !== "object" || Array.isArray(content)) {
    return NextResponse.json({ error: "Current content is required." }, { status: 400 });
  }

  const client = new Anthropic({ apiKey });
  const isEmpty = Object.keys(content).length === 0;

  const systemPrompt = [
    "You are the AI content assistant inside GOMO Studio, an AI-powered website editor and quick CMS.",
    `You are editing the "${pageLabel || "current"}" page/section of a GOMO Studio marketing site.`,
    "You are given the CURRENT JSON content overrides for that page and an instruction.",
    "Return ONLY a JSON object of the fields you are setting or changing — do not return fields you aren't touching.",
    isEmpty
      ? "The current content is empty, meaning nothing is overridden yet — invent clear, short camelCase field names for whatever the instruction asks for (e.g. heroTitle, ctaLabel, faqItems) and set their values."
      : "Reuse the exact field names and value types already present when you are updating an existing field (string stays string, array stays array, object stays object). You may add new camelCase fields if the instruction calls for something not yet present.",
    "Keep copy on-brand for GOMO Studio (an AI website editor / quick CMS product) unless the instruction says otherwise.",
    "Do not add commentary, markdown formatting, or code fences — return raw JSON only.",
  ].join(" ");

  const userMessage = `Current content overrides:\n${JSON.stringify(content, null, 2)}\n\nInstruction: ${prompt}`;

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 4096,
      thinking: { type: "disabled" },
      output_config: { effort: "low" },
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    if (response.stop_reason === "refusal") {
      return NextResponse.json({ error: "The AI declined this request." }, { status: 422 });
    }

    const textBlock = response.content.find((block) => block.type === "text");
    if (!textBlock) {
      return NextResponse.json({ error: "The AI did not return any content." }, { status: 502 });
    }

    const raw = textBlock.text
      .trim()
      .replace(/^```(?:json)?/i, "")
      .replace(/```$/, "")
      .trim();

    let suggestion;
    try {
      suggestion = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: "The AI response wasn't valid JSON. Try rephrasing your request." },
        { status: 502 },
      );
    }

    return NextResponse.json({ suggestion });
  } catch (error) {
    return NextResponse.json({ error: error.message || "AI request failed." }, { status: 502 });
  }
}
