import { MongoConnection } from "@/lib/mongo";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) throw new Error("Invalid ID");

    const db = await MongoConnection.connect();
    const doc = await db.collection("problems_documents").findOne(
      { _id: new ObjectId(id) },
      { projection: { content: 1 } }
    );
    if (!doc) throw new Error("Document not found");

    return new NextResponse(doc.content, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
