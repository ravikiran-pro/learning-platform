import { MongoConnection } from "@/lib/mongo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        if (!file) throw new Error("Markdown file not provided");

        const content = await file.text();
        if (!content.trim()) throw new Error("File is empty");

        const parseJson = (key: string) => {
            const value = formData.get(key) as string;
            if (!value) return undefined;
            try {
                return JSON.parse((value));
            } catch {
                throw new Error(`Invalid JSON in ${key}`);
            }
        };

        const _input = parseJson("_input");
        const _output = parseJson("_output");

        const db = await MongoConnection.connect();
        const result = await db.collection("problems_documents").insertOne({
            content,
            _input,
            _output,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return NextResponse.json({ success: true, id: result.insertedId });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
