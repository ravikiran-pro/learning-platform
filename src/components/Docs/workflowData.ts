import { WorkflowData } from "./workflowTypes";

export const workflowData: WorkflowData = {
  meta: {
    title: "Content Extraction & Summarization for Course Section",
    workflowId: "wf_content_extraction_for_section",
    input: "{ trackId, moduleId, chapterId, sectionId }",
  },
  steps: [
    {
      title: "Step 1 · Resource Discovery",
      id: "step1_resource_discovery",
      agent: "ResourceDiscoveryAgent",
      agentId: "agent_resource_discovery",
      tools: [
        {
          name: "sectionContextFetchTool",
          id: "tool_section_context_fetch",
          desc: "Fetch section metadata for contextual enrichment."
        },
        {
          name: "queryConstructionTool",
          id: "tool_query_construction",
          desc: "Generate multiple optimized search queries."
        },
        {
          name: "webSearchTool",
          id: "tool_web_search",
          desc: "Perform web search and retrieve resource candidates."
        },
      ],
      input: "userInput",
      output: "candidateResources[]",
    },
    {
      title: "Step 2 · Resource Validation",
      id: "step2_resource_validation",
      agent: "ResourceValidationAgent",
      agentId: "agent_resource_validation",
      foreach: "candidateResources (concurrency = 2)",
      tools: [
        {
          name: "resourceDeduplicationTool",
          id: "tool_resource_deduplication",
          desc: "Remove duplicate or similar resource entries."
        },
        {
          name: "resourceScrapeValidationTool",
          id: "tool_resource_scrape_validation",
          desc: "Scrape webpage, validate accessibility & content quality."
        },
        {
          name: "resourceDatabaseUpdateTool",
          id: "tool_resource_database_update",
          desc: "Save verified resource metadata to database (MongoDB)."
        },
      ],
      input: "candidateResources[]",
      output: "validatedResources[]",
    },
    {
      title: "Step 3 · Content Extraction",
      id: "step3_content_extraction",
      agent: "ContentExtractionAgent",
      agentId: "agent_content_extraction",
      foreach: "validatedResources (isValid)",
      tools: [
        {
          name: "scrapedDocumentRetrievalTool",
          id: "tool_scraped_document_retrieval",
          desc: "Retrieve stored scraped document using resourceId."
        },
        {
          name: "semanticContentExtractionTool",
          id: "tool_semantic_content_extraction",
          desc: "Extract topic-relevant insights using contextual LLM filtering."
        },
        {
          name: "rawTextCleaningTool",
          id: "tool_raw_text_cleaning",
          desc: "Clean and extract raw content for reference (non-filtered)."
        },
      ],
      input: "validatedResources[] (isValid)",
      output: "extractedContents[]",
    },
    {
      title: "Step 4 · Content Synthesis",
      id: "step4_content_synthesis",
      agent: "ContentSynthesisAgent",
      agentId: "agent_content_synthesis",
      tools: [
        {
          name: "existingContentFetchTool",
          id: "tool_existing_content_fetch",
          desc: "Retrieve previous section content & vector embeddings."
        },
        {
          name: "summaryContextBuilderTool",
          id: "tool_summary_context_builder",
          desc: "Combine extracted + existing content and structure prompts."
        },
        {
          name: "markdownSummaryGenerationTool",
          id: "tool_markdown_summary_generation",
          desc: "Generate LLM-based structured markdown summary."
        },
      ],
      input: "sectionContext + extractedContents + existingSection",
      output: "sectionSummaryDraft",
    },
    {
      title: "Step 5 · Human Review",
      id: "step5_human_review",
      agent: "ReviewAgent",
      agentId: "agent_review",
      tools: [
        {
          name: "sectionContentPersistenceTool",
          id: "tool_section_content_persistence",
          desc: "Persist final approved content to course section record."
        },
      ],
      input: "sectionSummaryDraft + extractedContents",
      output: "humanReviewResult",
    },
  ],
};
