import { MongoConnection } from "@/lib/mongo";
import { prisma } from "@/lib/prisma";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from 'next/server';


export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string, lDocId: string }> }) {
    try {

        const { id: trackId, lDocId } = await params;
        console.log(lDocId)
        console.log(trackId)

        if (!lDocId || !trackId) throw new Error("Invalid ID");

        const db = await MongoConnection.connect();
        const doc = await db.collection(`${trackId}-documents`).findOne(
            { document_id: lDocId },
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
