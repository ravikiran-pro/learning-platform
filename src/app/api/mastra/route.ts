import { mastraClient } from "@/lib/mastra-client";
import { MongoConnection } from "@/lib/mongo";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs"; // 🔧 FIXED (was "edge")

export async function POST(req: NextRequest) {
  try {
    const inputData = await req.json();

    if (!inputData?.documentId) {
      return NextResponse.json({ error: "documentId missing" }, { status: 400 });
    }

    const lDocId = inputData.documentId;
    const trackId = "d4414b20-6c1a-43e9-9ee8-716d2b3d8de2"; // keep hardcoded

    // 1️⃣ Mongo check
    const db = await MongoConnection.connect();
    const existingDoc = await db
      .collection(`${trackId}-documents`)
      .findOne({ document_id: lDocId }, { projection: { content: 1 } });

    if (existingDoc?.content) {
      console.log(`📌 Using cached result for ${lDocId}`);
      return NextResponse.json({ output: existingDoc.content });
    }

    // 2️⃣ Extractor fallback
    const workflow = mastraClient.getWorkflow("extractorWorkflow");
    const run = await workflow.createRunAsync();
    const result: any = await run.startAsync({ inputData });

    if (!result.fullStream) {
      await db.collection(`${trackId}-documents`).updateOne(
        { document_id: lDocId },
        { $set: { content: result.result, updatedAt: new Date() } },
        { upsert: true }
      );
      return NextResponse.json({ output: result.result });
    }

    // 3️⃣ Streaming logic
    let fullContent = "";

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.fullStream) {
            const text = typeof chunk === "string" ? chunk : JSON.stringify(chunk);
            fullContent += text + "\n";
            controller.enqueue(new TextEncoder().encode(text + "\n"));
          }

          await db.collection(`${trackId}-documents`).updateOne(
            { document_id: lDocId },
            { $set: { content: fullContent.trim(), updatedAt: new Date() } },
            { upsert: true }
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (err: any) {
    console.error("❌ API /mastra failed:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
