import { NextRequest, NextResponse } from "next/server";
import { MongoConnection } from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { runTests } from "@/lib/runnerTest"; // 👈 Import here

interface Problem {
  name: string;
  args: string[];
  input: any[][];
  expected: any[][];
}

export async function POST(req: NextRequest) {
  try {
    const { code, problemId } = await req.json();
    if (!code || !problemId) throw new Error("Missing code or problemId");

    const record = await getRecord(problemId);

    const problem: Problem = {
      name: record.name,
      args: record.args,
      input: record.input,
      expected: record.expected
    };

    // 🧪 Run using the test runner
    const results = runTests(problem, code);

    console.log(results)

    return NextResponse.json({ results }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function getRecord(id: string) {
  if (!id) throw new Error("Invalid ID");

  const db = await MongoConnection.connect();
  const doc = await db.collection("problems_documents").findOne({ _id: new ObjectId(id) });

  if (!doc) throw new Error("Problem document not found");
  return doc;
}
