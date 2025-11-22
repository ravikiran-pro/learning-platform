import vm from "vm";

export interface Problem {
  name: string;
  args: string[];
  input: any[][];
  expected: any[][];
}

export interface TestResult {
  testCase: number;
  input: any[];
  expected: any[];
  output: any[];
  passed: boolean;
  error?: string | null;
  status: string;
  consoleLogs: string[]; // 👈 captured logs for this test
}

export function runTests(problem: Problem, userCode: string): TestResult[] {
  // This array will be reused for each test case
  const logs: string[] = [];

  // Custom console that pushes into logs[]
  const sandboxConsole = {
    log: (...args: any[]) => {
      logs.push(args.map(String).join(" "));
    },
    error: (...args: any[]) => {
      logs.push("[error] " + args.map(String).join(" "));
    },
    warn: (...args: any[]) => {
      logs.push("[warn] " + args.map(String).join(" "));
    }
  };

  const sandbox: Record<string, any> = {
    console: sandboxConsole,
  };

  vm.createContext(sandbox);

  // Compile user code
  try {
    vm.runInContext(userCode + "\n", sandbox, { timeout: 2000 });
  } catch (err: any) {
    return [
      {
        testCase: 0,
        input: [],
        expected: [],
        output: [],
        passed: false,
        error: "Code compilation failed: " + err.message,
        status: "❌ Compilation Error",
        consoleLogs: [...logs]
      },
    ];
  }

  const results: TestResult[] = [];

  for (let i = 0; i < problem.input.length; i++) {
    const inputCase = problem.input[i];
    const expectedCase = problem.expected[i];
    let output: any;
    let error: string | null = null;

    // 🔄 reset logs for this test
    logs.length = 0;

    try {
      // user function call
      output = sandbox[problem.name](...inputCase);
    } catch (err: any) {
      error = `Runtime Error: ${err.message}`;
      output = null;
    }

    const passed = JSON.stringify(output) === JSON.stringify(expectedCase[0]);

    results.push({
      testCase: i + 1,
      input: inputCase,
      expected: expectedCase,
      output: [output],
      passed,
      error,
      status: passed ? "✔ Passed" : "❌ Failed",
      consoleLogs: [...logs], // 👈 capture current test logs
    });
  }

  return results;
}
