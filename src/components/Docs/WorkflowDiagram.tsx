import React from "react";
import { workflowData } from "./workflowData";
import { WorkflowStep } from "./workflowTypes";

const AIWorkflowDiagram = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 md:px-16 py-12 font-[Inter] flex flex-col items-center">
  {/* Centering the card for screenshot */}
  <div className="w-full max-w-[900px]">
    {/* Header */}
    <header className="mb-16">
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        {workflowData.meta.title}
      </h1>
      <p className="text-xl text-gray-600">
        AI Orchestration Pipeline – Automated content extraction & summarization
      </p>
    </header>

    {/* Workflow Details */}
    <section className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-12 text-lg">
      <p><strong>Workflow ID:</strong> <span className="font-mono">{workflowData.meta.workflowId}</span></p>
      <p className="mt-2"><strong>Input:</strong> <span className="font-mono">{workflowData.meta.input}</span></p>
    </section>

    {/* Steps */}
    <div className="space-y-16">
      {workflowData.steps.map((step: WorkflowStep) => (
        <div key={step.id} className="relative">
          <div className="border border-gray-200 rounded-2xl shadow-lg p-8">
            {/* Step Header */}
            <div className="flex justify-between items-start mb-6 pb-4 border-b border-gray-100">
              <h2 className="text-2xl font-semibold">{step.title}</h2>
              <span className="text-sm font-medium font-mono bg-gray-100 px-3 py-1 rounded-full">
                {step.id}
              </span>
            </div>

            {/* Agent */}
            <div className="mb-6">
              <p className="text-sm uppercase tracking-wide text-gray-500 font-semibold mb-2">
                Agent
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-sm bg-gray-50 border border-gray-200 px-3 py-2 rounded">
                  <strong>Name:</strong> {step.agent}
                </span>
                <span className="text-sm bg-gray-50 border border-gray-200 px-3 py-2 rounded">
                  <strong>ID:</strong> {step.agentId}
                </span>
              </div>
              {step.foreach && (
                <div className="mt-3 text-sm font-mono bg-amber-50 border border-amber-200 px-3 py-2 rounded">
                  foreach → {step.foreach}
                </div>
              )}
            </div>

            {/* Tools */}
            <div className="mb-6">
              <p className="text-sm uppercase tracking-wide text-gray-500 font-semibold mb-3">
                Tools Used
              </p>
              <ul className="space-y-3">
                {step.tools.map((tool) => (
                  <li key={tool.id} className="bg-gray-50 hover:bg-gray-100 transition rounded px-4 py-3 border border-gray-200 text-sm">
                    <span className="font-medium">{tool.name}</span>
                    <span className="text-gray-500 ml-2 font-mono text-xs">({tool.id})</span>
                    <p className="text-gray-600 text-xs mt-1">{tool.desc}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inputs & Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">
                  Input
                </p>
                <pre className="font-mono bg-gray-50 border border-gray-200 text-sm p-4 rounded whitespace-pre-wrap">
                  {step.input}
                </pre>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">
                  Output
                </p>
                <pre className="font-mono bg-gray-50 border border-gray-200 text-sm p-4 rounded whitespace-pre-wrap">
                  {step.output}
                </pre>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Footer (should be kept out of screenshot) */}
    <footer className="text-gray-500 text-sm mt-16 pb-10 text-center">
      Generated with AI • Tailwind UI v2 • Screenshot Optimized
    </footer>
  </div>
</div>

  );
};

export default AIWorkflowDiagram;