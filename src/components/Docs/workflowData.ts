import { WorkflowData } from "./workflowTypes";

export const workflowData: WorkflowData = {
  meta: {
    title: "Content Extraction & Synthesis for Course Section",
    workflowId: "wf_content_extraction_for_section",
    input: "{ trackId, moduleId, chapterId, sectionId }",
  },
  steps: [
    {
      title: "Step 1 · Keyword Extraction",
      id: "search-keyword-extractor",
      agent: "ResourceDiscoveryAgentInstance",
      agentId: "ws_keyword_extractor",
      description: "Extract and construct optimized search keywords from section context for web content discovery.",
      tools: [
        {
          name: "sectionContextFetchTool",
          id: "tool_section_context_fetch",
          desc: "Fetch section metadata for contextual enrichment (track, module, chapter, section details)."
        },
        {
          name: "queryConstructionTool",
          id: "tool_query_construction",
          desc: "Clean and validate AI-generated search keywords (removes duplicates, filters short keywords)."
        },
      ],
      input: "{ trackId, moduleId, chapterId, sectionId }",
      output: "{ sectionContext, queryConstructed }",
    },
    {
      title: "Step 2 · Resource Search & Validation",
      id: "resource-search-validator",
      agent: "WebSearchAgentInstance",
      agentId: "web-search-agent",
      description: "Search, validate, and consolidate authoritative educational resources by scraping and quality-checking URLs.",
      tools: [
        {
          name: "webSearch",
          id: "openai-web-search",
          desc: "OpenAI web search tool to find educational resources using keywords and context."
        },
        {
          name: "resourceValidationTool",
          id: "resource-validation-tool",
          desc: "Scrapes and validates content from URLs. Returns validation status, scrap_content_id, and stores in MongoDB."
        },
        {
          name: "resourceConsolidateTool",
          id: "result-consolidation-tool",
          desc: "Filters and consolidates validated resources (keeps only resources where validate === true)."
        },
      ],
      input: "{ sectionContext, queryConstructed }",
      output: "{ sectionContext, resources[] }",
    },
    {
      title: "Step 3 · Content Extraction",
      id: "content-extractor",
      agent: "ContentExtractorAgentInstance",
      agentId: "content-extraction-agent",
      description: "Extract and process relevant content from validated scraped resources using AI filtering and structuring.",
      tools: [
        {
          name: "getScrapedContentTool",
          id: "get-scrapped-content",
          desc: "Retrieve scraped content from database using scrap_content_id from validated resources."
        },
        {
          name: "storeExtractedDocumentTool",
          id: "store-extracted-document-tool",
          desc: "Store (or update) extracted JSON content into extract_documents collection for a given document_id."
        },
        {
          name: "webSearch",
          id: "openai-web-search-optional",
          desc: "Optional web search for complementing missing parts if scraped content is insufficient."
        },
      ],
      input: "{ sectionContext, resources[] }",
      output: "{ sectionContext, resources[], dump }",
    },
    {
      title: "Step 4 · Content Synthesis & Iterative Review",
      id: "synthesis-content",
      agent: "ContentWriterAgentInstance + contentReviewerAgent",
      agentId: "content-writer-agent, content-reviewer-agent",
      description: "Synthesize educational content from extracted data and perform iterative AI review with writer and reviewer agents.",
      tools: [
        {
          name: "fetchTrackDetailsTool",
          id: "tool_query_construction",
          desc: "Fetch complete track hierarchy structure (all modules, chapters, sections) to understand course context."
        },
        {
          name: "fetchAllRelevantEmbeddings",
          id: "get-relevant-embeddings-documents",
          desc: "Retrieve relevant embeddings from track-specific documents collection to prevent content duplication."
        },
        {
          name: "webSearch",
          id: "openai-web-search-optional",
          desc: "Optional web search for reference when writing content for learning platform."
        },
      ],
      input: "{ sectionContext, resources[], dump }",
      output: "{ syntheses }",
    },
  ],
};
