import React from "react";

interface TestResult {
  testCase: number;
  input: any[];
  expected: any[];
  output: any[];
  passed: boolean;
}

interface Props {
  results: TestResult[];
}

const TestResultPanel: React.FC<Props> = ({ results }) => {
  return (
    <div className="space-y-3 text-sm">
      {results.map(({ testCase, input, output, expected, passed }, idx) => (
        <div
          key={idx}
          className={`p-3 rounded-md border ${
            passed ? "border-green-500" : "border-red-500"
          } bg-[#1e1e1e]`}
        >
          <div className="flex justify-between">
            <span className="font-bold">
              Test Case {testCase}
            </span>
            <span className={passed ? "text-green-400" : "text-red-400"}>
              {passed ? "✔ Passed" : "❌ Failed"}
            </span>
          </div>

          <div className="mt-2 text-gray-300">
            <div><strong>Input:</strong> {JSON.stringify(input[0])}</div>
            <div><strong>Output:</strong> {JSON.stringify(output[0])}</div>
            <div><strong>Expected:</strong> {JSON.stringify(expected[0])}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestResultPanel;
