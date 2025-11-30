import React from "react";
import { workflowData } from "./workflowData";
import { WorkflowStep } from "./workflowTypes";

const AIWorkflowDiagram = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 md:px-16 pt-12 pb-8 font-[Inter] flex flex-col items-center">
  {/* Centering the card for screenshot */}
  <div className="w-full max-w-[1000px]">
    {/* Header */}
    <header className="mb-12 text-center border-b border-gray-200 pb-8">
      <h1 className="text-4xl font-bold tracking-tight mb-3 text-gray-900">
        {workflowData.meta.title}
      </h1>
      <p className="text-lg text-gray-600">
        AI Orchestration Pipeline – Automated content extraction & summarization
      </p>
    </header>

    {/* Workflow Details */}
    <section className="bg-gray-50 rounded-lg border border-gray-300 p-6 mb-12">
      <div className="flex flex-wrap gap-6 text-sm">
        <div>
          <span className="text-gray-600 font-medium">Workflow ID:</span>
          <span className="font-mono ml-2 text-gray-900">{workflowData.meta.workflowId}</span>
        </div>
        <div>
          <span className="text-gray-600 font-medium">Input:</span>
          <span className="font-mono ml-2 text-gray-900">{workflowData.meta.input}</span>
        </div>
      </div>
    </section>

    {/* Steps */}
    <div className="space-y-10">
      {workflowData.steps.map((step: WorkflowStep, index: number) => (
        <div key={step.id} className="relative">
          {/* Flow Arrow */}
          {index > 0 && (
            <div className="flex justify-center mb-6">
              <div className="w-0.5 h-8 bg-gray-300"></div>
            </div>
          )}
          
          <div className="border border-gray-300 rounded-lg shadow-sm p-6 bg-white">
            {/* Step Header */}
            <div className="flex justify-between items-start mb-5 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white font-semibold text-sm">
                  {index + 1}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{step.title}</h2>
                  {step.description && (
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{step.description}</p>
                  )}
                </div>
              </div>
              <span className="text-xs font-mono bg-gray-100 px-2.5 py-1 rounded border border-gray-300 text-gray-600">
                {step.id}
              </span>
            </div>

            {/* Agent */}
            <div className="mb-5">
              <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">
                Agent
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-sm bg-gray-50 border border-gray-300 px-3 py-1.5 rounded">
                  <span className="text-gray-600 font-medium">Name:</span> <span className="text-gray-900">{step.agent}</span>
                </span>
                <span className="text-sm bg-gray-50 border border-gray-300 px-3 py-1.5 rounded">
                  <span className="text-gray-600 font-medium">ID:</span> <span className="font-mono text-gray-900">{step.agentId}</span>
                </span>
              </div>
              {step.foreach && (
                <div className="mt-2 text-xs font-mono bg-yellow-50 border border-yellow-300 px-3 py-1.5 rounded">
                  <span className="text-yellow-800 font-medium">foreach →</span> <span className="text-gray-700">{step.foreach}</span>
                </div>
              )}
            </div>

            {/* Tools */}
            <div className="mb-5">
              <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">
                Tools Used ({step.tools.length})
              </p>
              <ul className="space-y-2">
                {step.tools.map((tool) => (
                  <li key={tool.id} className="bg-gray-50 border border-gray-300 rounded px-3 py-2 text-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <span className="font-medium text-gray-900">{tool.name}</span>
                        <span className="text-gray-500 ml-2 font-mono text-xs">({tool.id})</span>
                        <p className="text-gray-600 text-xs mt-1 leading-relaxed">{tool.desc}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inputs & Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded border border-gray-300 p-3">
                <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold mb-2">
                  Input
                </p>
                <pre className="font-mono bg-white border border-gray-300 text-xs p-3 rounded whitespace-pre-wrap text-gray-900">
                  {step.input}
                </pre>
              </div>
              <div className="bg-gray-50 rounded border border-gray-300 p-3">
                <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold mb-2">
                  Output
                </p>
                <pre className="font-mono bg-white border border-gray-300 text-xs p-3 rounded whitespace-pre-wrap text-gray-900">
                  {step.output}
                </pre>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Summary Section */}
    <section className="mt-12 mb-8 bg-gray-50 rounded-lg border border-gray-300 p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Workflow Summary</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white rounded border border-gray-300 p-4">
          <div className="text-2xl font-bold text-gray-900">{workflowData.steps.length}</div>
          <div className="text-xs text-gray-600 mt-1">Steps</div>
        </div>
        <div className="bg-white rounded border border-gray-300 p-4">
          <div className="text-2xl font-bold text-gray-900">{workflowData.steps.reduce((acc, step) => acc + step.tools.length, 0)}</div>
          <div className="text-xs text-gray-600 mt-1">Tools</div>
        </div>
        <div className="bg-white rounded border border-gray-300 p-4">
          <div className="text-2xl font-bold text-gray-900">{workflowData.steps.length}</div>
          <div className="text-xs text-gray-600 mt-1">Agents</div>
        </div>
        <div className="bg-white rounded border border-gray-300 p-4">
          <div className="text-2xl font-bold text-gray-900">100%</div>
          <div className="text-xs text-gray-600 mt-1">Automated</div>
        </div>
      </div>
    </section>

    {/* Footer (should be kept out of screenshot) */}
    <footer className="text-gray-400 text-xs mt-6 pb-0 text-center">
      Built with Next.js, React & TypeScript • Mastra Framework
    </footer>
  </div>
</div>

  );
};

export default AIWorkflowDiagram;