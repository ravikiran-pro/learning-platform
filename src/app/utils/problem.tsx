const PROBLEM = `
# Longest Valid Path in Grid

You are given...

---

## Input Format
\`\`\`
{
  "grid": [[1,3,1], [1,5,1], [4,2,1]],
  "start": [0,0],
  "end": [2,2],
  "config": { "k": 9, "blocked": [[1,1]] }
}
\`\`\`

## Output Format
\`\`\`text
4
\`\`\`

## Explanation
\`\`\`text
(0,0) → (1,0) → (2,0) → (2,1) → (2,2)
Cost = 9 (<= k)
Moves = 4
\`\`\`

## Constraints
- 1 ≤ grid.length, grid[0].length ≤ 20
- 1 ≤ grid[i][j] ≤ 100
- 0 ≤ k ≤ 1000
- 0 ≤ blocked.length ≤ 50

---
`;

export default PROBLEM


export function generateStarterCode(problem:any) {
  const { name, args, input, expected } = problem;
  const params = args.join(", ");

  return `
/**
 * ${problem.content?.split("\n")[0].replace("###", "").trim() || `Solve the ${name} problem.`}
 *
 * Example:
 * Input: ${JSON.stringify(input[0])}
 * Expected Output: ${JSON.stringify(expected[0])}
 *
 * @param {any} ${args.join(" - Input parameter\n * @param {any} ")} 
 * @returns {any}  // TODO: specify proper return type
 */
function ${name}(${params}) {
  // TODO: Implement your solution here

  return null; // Replace this
}
`;
}
