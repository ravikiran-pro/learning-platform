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
      // { projection: { _id: 1, args: 1, tags: 1, input: 1, expected: 1, createdAt: 1, updatedAt: 1, filename: 1 } } // Exclude markdown
    );
    if (!doc) throw new Error("Document not found");

    return NextResponse.json({ success: true, data: doc });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
