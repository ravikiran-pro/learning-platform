import { PrismaClient } from "@prisma/client";

// Prisma v7 uses modern constructor (no undefined config)
const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Seeding Tracks (Prisma v7)...");

  await prisma.section.createMany({
    data: [
      //======================
      // MODULE 1 – Introduction & Fundamentals
      //======================

      // Chapter: c101-intro-js
      { id: "s101-1", chapterId: "c101-intro-js", title: "What is JavaScript?", slug: "what-is-javascript", order: 1, difficulty: "EASY", contentDocumentId: "doc-s101-1", createdBy: "system" },
      { id: "s101-2", chapterId: "c101-intro-js", title: "JavaScript History & Evolution", slug: "javascript-history", order: 2, difficulty: "EASY", contentDocumentId: "doc-s101-2", createdBy: "system" },
      { id: "s101-3", chapterId: "c101-intro-js", title: "JavaScript vs ECMAScript", slug: "javascript-vs-ecmascript", order: 3, difficulty: "MEDIUM", contentDocumentId: "doc-s101-3", createdBy: "system" },
      { id: "s101-4", chapterId: "c101-intro-js", title: "JavaScript Engines Overview", slug: "javascript-engines", order: 4, difficulty: "MEDIUM", contentDocumentId: "doc-s101-4", createdBy: "system" },
      { id: "s101-5", chapterId: "c101-intro-js", title: "JS Runtime Environments Conceptually", slug: "js-runtime-environments", order: 5, difficulty: "MEDIUM", contentDocumentId: "doc-s101-5", createdBy: "system" },

      // Chapter: c102-syntax
      { id: "s102-1", chapterId: "c102-syntax", title: "Statements vs Expressions", slug: "statements-vs-expressions", order: 1, difficulty: "EASY", contentDocumentId: "doc-s102-1", createdBy: "system" },
      { id: "s102-2", chapterId: "c102-syntax", title: "Automatic Semicolon Insertion", slug: "automatic-semicolon-insertion", order: 2, difficulty: "MEDIUM", contentDocumentId: "doc-s102-2", createdBy: "system" },
      { id: "s102-3", chapterId: "c102-syntax", title: "Tokens, Identifiers & Keywords", slug: "tokens-identifiers", order: 3, difficulty: "EASY", contentDocumentId: "doc-s102-3", createdBy: "system" },
      { id: "s102-4", chapterId: "c102-syntax", title: "Code Blocks & Nesting", slug: "code-blocks-nesting", order: 4, difficulty: "EASY", contentDocumentId: "doc-s102-4", createdBy: "system" },
      { id: "s102-5", chapterId: "c102-syntax", title: "Best Practices & Writing Clean Code", slug: "javascript-code-style", order: 5, difficulty: "EASY", contentDocumentId: "doc-s102-5", createdBy: "system" },

      // Chapter: c103-execution
      { id: "s103-1", chapterId: "c103-execution", title: "How JavaScript Executes", slug: "how-javascript-executes", order: 1, difficulty: "EASY", contentDocumentId: "doc-s103-1", createdBy: "system" },
      { id: "s103-2", chapterId: "c103-execution", title: "Execution Context", slug: "execution-context", order: 2, difficulty: "MEDIUM", contentDocumentId: "doc-s103-2", createdBy: "system" },
      { id: "s103-3", chapterId: "c103-execution", title: "Call Stack & Recursion", slug: "call-stack-recursion", order: 3, difficulty: "MEDIUM", contentDocumentId: "doc-s103-3", createdBy: "system" },
      { id: "s103-4", chapterId: "c103-execution", title: "Creation vs Execution Phase", slug: "creation-vs-execution-phase", order: 4, difficulty: "MEDIUM", contentDocumentId: "doc-s103-4", createdBy: "system" },
      { id: "s103-5", chapterId: "c103-execution", title: "Stack Overflow & Runtime Errors", slug: "stack-overflow-runtime-errors", order: 5, difficulty: "MEDIUM", contentDocumentId: "doc-s103-5", createdBy: "system" },

      // Chapter: c104-strict
      { id: "s104-1", chapterId: "c104-strict", title: "What is 'strict mode'?", slug: "what-is-strict-mode", order: 1, difficulty: "EASY", contentDocumentId: "doc-s104-1", createdBy: "system" },
      { id: "s104-2", chapterId: "c104-strict", title: "How to Enable Strict Mode", slug: "enable-strict-mode", order: 2, difficulty: "EASY", contentDocumentId: "doc-s104-2", createdBy: "system" },
      { id: "s104-3", chapterId: "c104-strict", title: "Behavioral Changes in Strict Mode", slug: "strict-mode-differences", order: 3, difficulty: "MEDIUM", contentDocumentId: "doc-s104-3", createdBy: "system" },
      { id: "s104-4", chapterId: "c104-strict", title: "Error Prevention with Strict Mode", slug: "strict-mode-error-prevention", order: 4, difficulty: "MEDIUM", contentDocumentId: "doc-s104-4", createdBy: "system" },
      { id: "s104-5", chapterId: "c104-strict", title: "Best Practices & When to Use", slug: "strict-mode-best-practices", order: 5, difficulty: "EASY", contentDocumentId: "doc-s104-5", createdBy: "system" },

      //======================
      // MODULE 2 – Remaining
      //======================

      // Chapter: c203-numbers
      { id: "s203-1", chapterId: "c203-numbers", title: "Number Basics", slug: "number-basics", order: 1, difficulty: "EASY", contentDocumentId: "doc-s203-1", createdBy: "system" },
      { id: "s203-2", chapterId: "c203-numbers", title: "Floating Point Errors", slug: "floating-point-errors", order: 2, difficulty: "MEDIUM", contentDocumentId: "doc-s203-2", createdBy: "system" },
      { id: "s203-3", chapterId: "c203-numbers", title: "BigInt Usage", slug: "bigint-usage", order: 3, difficulty: "MEDIUM", contentDocumentId: "doc-s203-3", createdBy: "system" },
      { id: "s203-4", chapterId: "c203-numbers", title: "Math Object Deep Dive", slug: "math-object-deep-dive", order: 4, difficulty: "MEDIUM", contentDocumentId: "doc-s203-4", createdBy: "system" },
      { id: "s203-5", chapterId: "c203-numbers", title: "Common Number Issues in JS", slug: "js-number-issues", order: 5, difficulty: "HARD", contentDocumentId: "doc-s203-5", createdBy: "system" },

      // Chapter: c204-strings
      { id: "s204-1", chapterId: "c204-strings", title: "String Basics", slug: "string-basics", order: 1, difficulty: "EASY", contentDocumentId: "doc-s204-1", createdBy: "system" },
      { id: "s204-2", chapterId: "c204-strings", title: "Template Literals", slug: "template-literals", order: 2, difficulty: "EASY", contentDocumentId: "doc-s204-2", createdBy: "system" },
      { id: "s204-3", chapterId: "c204-strings", title: "String Methods", slug: "string-methods", order: 3, difficulty: "MEDIUM", contentDocumentId: "doc-s204-3", createdBy: "system" },
      { id: "s204-4", chapterId: "c204-strings", title: "Unicode & Encoding Issues", slug: "unicode-issues", order: 4, difficulty: "MEDIUM", contentDocumentId: "doc-s204-4", createdBy: "system" },
      { id: "s204-5", chapterId: "c204-strings", title: "Regex with Strings", slug: "regex-strings", order: 5, difficulty: "HARD", contentDocumentId: "doc-s204-5", createdBy: "system" },

      // Chapter: c205-operators
      { id: "s205-1", chapterId: "c205-operators", title: "Operator Basics", slug: "operator-basics", order: 1, difficulty: "EASY", contentDocumentId: "doc-s205-1", createdBy: "system" },
      { id: "s205-2", chapterId: "c205-operators", title: "Short Circuiting & Logical Operators", slug: "logical-operators", order: 2, difficulty: "MEDIUM", contentDocumentId: "doc-s205-2", createdBy: "system" },
      { id: "s205-3", chapterId: "c205-operators", title: "Nullish Coalescing & Optional Chaining", slug: "nullish-optional", order: 3, difficulty: "MEDIUM", contentDocumentId: "doc-s205-3", createdBy: "system" },
      { id: "s205-4", chapterId: "c205-operators", title: "Bitwise Operators", slug: "bitwise-operators", order: 4, difficulty: "HARD", contentDocumentId: "doc-s205-4", createdBy: "system" },
      { id: "s205-5", chapterId: "c205-operators", title: "Operator Precedence (Interview)", slug: "operator-precedence", order: 5, difficulty: "HARD", contentDocumentId: "doc-s205-5", createdBy: "system" },

      //======================
      // MODULE 3 – Functions
      //======================

      // Chapter: c301-functions
      { id: "s301-1", chapterId: "c301-functions", title: "Function Declaration vs Expression", slug: "function-declaration-vs-expression", order: 1, difficulty: "EASY", contentDocumentId: "doc-s301-1", createdBy: "system" },
      { id: "s301-2", chapterId: "c301-functions", title: "Arrow Functions & Differences", slug: "arrow-functions", order: 2, difficulty: "MEDIUM", contentDocumentId: "doc-s301-2", createdBy: "system" },
      { id: "s301-3", chapterId: "c301-functions", title: "Rest & Default Parameters", slug: "rest-default-params", order: 3, difficulty: "EASY", contentDocumentId: "doc-s301-3", createdBy: "system" },
      { id: "s301-4", chapterId: "c301-functions", title: "Function Hoisting", slug: "function-hoisting", order: 4, difficulty: "MEDIUM", contentDocumentId: "doc-s301-4", createdBy: "system" },
      { id: "s301-5", chapterId: "c301-functions", title: "Higher Order Functions", slug: "higher-order-functions", order: 5, difficulty: "MEDIUM", contentDocumentId: "doc-s301-5", createdBy: "system" },

      // Chapter: c302-scope
      { id: "s302-1", chapterId: "c302-scope", title: "Global vs Local Scope", slug: "global-local-scope", order: 1, difficulty: "EASY", contentDocumentId: "doc-s302-1", createdBy: "system" },
      { id: "s302-2", chapterId: "c302-scope", title: "Function vs Block Scope", slug: "function-vs-block-scope", order: 2, difficulty: "MEDIUM", contentDocumentId: "doc-s302-2", createdBy: "system" },
      { id: "s302-3", chapterId: "c302-scope", title: "let, const vs var", slug: "var-let-const", order: 3, difficulty: "EASY", contentDocumentId: "doc-s302-3", createdBy: "system" },
      { id: "s302-4", chapterId: "c302-scope", title: "Temporal Dead Zone", slug: "temporal-dead-zone", order: 4, difficulty: "MEDIUM", contentDocumentId: "doc-s302-4", createdBy: "system" },
      { id: "s302-5", chapterId: "c302-scope", title: "Scope Chain & Shadowing", slug: "scope-chain-shadowing", order: 5, difficulty: "HARD", contentDocumentId: "doc-s302-5", createdBy: "system" },

      // Chapter: c303-closures
      { id: "s303-1", chapterId: "c303-closures", title: "What is a Closure?", slug: "what-is-closure", order: 1, difficulty: "MEDIUM", contentDocumentId: "doc-s303-1", createdBy: "system" },
      { id: "s303-2", chapterId: "c303-closures", title: "Closure Use Cases", slug: "closure-use-cases", order: 2, difficulty: "MEDIUM", contentDocumentId: "doc-s303-2", createdBy: "system" },
      { id: "s303-3", chapterId: "c303-closures", title: "Closures in Loops", slug: "closure-loops", order: 3, difficulty: "HARD", contentDocumentId: "doc-s303-3", createdBy: "system" },
      { id: "s303-4", chapterId: "c303-closures", title: "Performance & Memory Impact", slug: "closure-performance", order: 4, difficulty: "HARD", contentDocumentId: "doc-s303-4", createdBy: "system" },
      { id: "s303-5", chapterId: "c303-closures", title: "Closures Interview Problems", slug: "closure-interview", order: 5, difficulty: "HARD", contentDocumentId: "doc-s303-5", createdBy: "system" },

      // Chapter: c304-this-binding
      { id: "s304-1", chapterId: "c304-this-binding", title: "Understanding 'this'", slug: "understanding-this", order: 1, difficulty: "MEDIUM", contentDocumentId: "doc-s304-1", createdBy: "system" },
      { id: "s304-2", chapterId: "c304-this-binding", title: "'this' in Different Contexts", slug: "this-in-contexts", order: 2, difficulty: "MEDIUM", contentDocumentId: "doc-s304-2", createdBy: "system" },
      { id: "s304-3", chapterId: "c304-this-binding", title: "call(), apply(), bind()", slug: "call-apply-bind", order: 3, difficulty: "MEDIUM", contentDocumentId: "doc-s304-3", createdBy: "system" },
      { id: "s304-4", chapterId: "c304-this-binding", title: "Arrow Functions & 'this'", slug: "arrow-function-this", order: 4, difficulty: "HARD", contentDocumentId: "doc-s304-4", createdBy: "system" },
      { id: "s304-5", chapterId: "c304-this-binding", title: "Losing 'this' in Callbacks", slug: "losing-this", order: 5, difficulty: "HARD", contentDocumentId: "doc-s304-5", createdBy: "system" },
    ],
  });

  console.log("✔ Track added (Prisma v7)!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed!", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
