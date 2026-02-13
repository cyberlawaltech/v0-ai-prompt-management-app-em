# Agent Types and Web Scraping Integration Guide

## Overview

The agent creation system now supports multiple agent types, with specialized support for web scraping agents. Each scraping provider has its own advanced configuration options.

## Agent Types

### 1. General Purpose Agent
- Versatile AI agent for various tasks
- Supports standard capabilities (web browsing, file access, code execution, API access)
- Can use different reasoning frameworks (ReAct, Reflexion, Chain of Thought)
- Configurable memory and advanced settings

### 2. Web Scraping Agent
- Specialized agent for web data extraction
- Choose from three scraping providers with independent configurations
- Advanced settings specific to each provider
- Built-in data extraction capabilities

## Web Scraping Providers

### OpenClaw
**Description**: High-performance web scraping with intelligent parsing

**Key Features**:
- Fast parsing engine
- JavaScript rendering support
- Proxy support for anonymity
- Custom header configuration
- Robots.txt compliance

**Advanced Settings**:
- **API Key**: Your OpenClaw API key (required)
- **Timeout**: Request timeout in seconds (5-120s, default: 30s)
- **Retry Attempts**: Number of retry attempts (0-10, default: 3)
- **Respect robots.txt**: Follow website crawling restrictions (default: true)
- **JavaScript Rendering**: Execute JavaScript on pages (default: false)
- **Custom User Agent**: Custom user agent string
- **Proxy URL**: Proxy server for requests
- **Custom Headers**: JSON object with custom HTTP headers

**Use Cases**:
- Fast content extraction
- JavaScript-heavy websites
- High-volume scraping with retries
- Privacy-focused scraping via proxies

---

### Firecrawl
**Description**: Enterprise-grade web crawling with advanced filtering

**Key Features**:
- Smart URL filtering
- CSS and JavaScript removal
- Screenshot capture
- Multi-page crawling
- Resource blocking

**Advanced Settings**:
- **API Key**: Your Firecrawl API key (required)
- **Timeout**: Request timeout in seconds (5-180s, default: 30s)
- **Max Pages**: Maximum pages to crawl (1-1000, default: 100)
- **Crawl Subpages**: Follow links to subpages (default: true)
- **Remove CSS**: Strip CSS from content (default: true)
- **Remove JavaScript**: Remove scripts from content (default: true)
- **Block Resources**: Block images and media files (default: false)
- **Take Screenshots**: Capture page screenshots (default: false)
- **Wait For Selector**: CSS selector to wait for before crawling
- **URL Exclude Patterns**: Patterns to exclude from crawling
- **URL Include Patterns**: Patterns to include in crawling

**Use Cases**:
- Enterprise web crawling
- Content-focused extraction
- Multi-page site crawling
- Advanced URL filtering

---

### SpiderCreator
**Description**: Visual web scraping with custom extraction rules

**Key Features**:
- Visual builder interface
- Deep crawling capabilities
- Custom CSS and JavaScript injection
- Structured data extraction
- Multiple browser types

**Advanced Settings**:
- **API Key**: Your SpiderCreator API key (required)
- **Timeout**: Request timeout in seconds (10-300s, default: 60s)
- **Max Depth**: Maximum crawl depth (1-10, default: 3)
- **Browser Type**: Chrome, Firefox, or Safari (default: Chrome)
- **Enable JavaScript**: Execute JavaScript on pages (default: true)
- **Follow External Links**: Crawl outside main domain (default: false)

**Custom Scripts Tab**:
- **Custom CSS Selectors**: Define CSS selectors for element extraction
- **Custom JavaScript**: JavaScript code to run on each page
- **Data Extraction Rules**: JSON object mapping field names to CSS selectors

**Data Extraction Settings**:
- Enable/disable structured data extraction
- Define extraction rules using JSON format
- Example:
  ```json
  {
    "title": ".product-title",
    "price": ".product-price",
    "description": ".product-desc",
    "rating": ".product-rating"
  }
  ```

**Use Cases**:
- Complex data extraction
- Structured data scraping
- Deep site crawling
- Custom transformation rules

---

## Agent Creation Flow

### Step 1: Basic Information
- Agent Name
- Description
- Category

### Step 2: Agent Type Selection
- Choose between General Purpose or Web Scraping Agent
- If Web Scraping selected: Choose scraping provider
- Provider selection shows features and tier information

### Step 3: Provider Configuration (Web Scraping Only)
- Configure selected provider's advanced settings
- Validate API keys and credentials
- Customize extraction rules and patterns

### Step 4: Capabilities (General) or Framework
- For General Agents: Select capabilities and framework
- Framework options: ReAct, Reflexion, Chain of Thought

### Step 5: Final Configuration
- Temperature, Max Tokens, Autonomous Mode
- Memory type and window size
- System prompt and advanced parameters
- Debug mode toggle

## Adding New Agent Types

To add a new agent type in the future:

1. **Update Types** (`lib/types/agent.ts`):
   ```typescript
   export type AgentType = "general" | "web-scraping" | "your-new-type"
   ```

2. **Create Type Configuration Interface**:
   ```typescript
   export interface YourTypeConfig {
     // Your configuration fields
   }
   ```

3. **Create Settings Component** (`components/scraper-settings/`):
   - Follow the pattern of existing providers
   - Use `Card`, `Input`, `Switch`, `Slider` from shadcn/ui

4. **Update Agent Type Selector** (`components/agent-type-selector.tsx`):
   - Add new type to the `agentTypes` array

5. **Update Create Agent Page** (`app/create-agent/page.tsx`):
   - Add new state variables for configuration
   - Add conditional rendering for new type
   - Update step logic

6. **Add Validation** (`lib/utils/agent-utils.ts`):
   - Create validation function for new type
   - Ensure required fields are present

## Configuration Persistence

Agents are saved with the following structure:
```json
{
  "id": "timestamp",
  "name": "Agent Name",
  "description": "Description",
  "category": "Category",
  "agentType": "web-scraping",
  "capabilities": {...},
  "scrapingConfig": {
    "provider": "openclaw",
    "providerSettings": {...}
  },
  "createdAt": "ISO8601 timestamp"
}
```

## Best Practices

### For Web Scraping Agents:
1. **Start with conservative settings** - Test with defaults before customizing
2. **Respect robots.txt** - Always enable `respectRobotsTxt` when appropriate
3. **Use proxies** - For high-volume scraping or to avoid IP blocking
4. **Set appropriate timeouts** - Balance between reliability and performance
5. **Test extraction rules** - Validate CSS selectors and data extraction rules before deployment

### For All Agents:
1. **Use descriptive names** - Make agent purpose clear
2. **Document intentions** - Use description field effectively
3. **Configure appropriately** - Match settings to intended use case
4. **Monitor performance** - Track response times and success rates

## Troubleshooting

### Web Scraping Issues:
- **Timeouts**: Increase timeout duration
- **Empty results**: Verify CSS selectors and JavaScript execution settings
- **IP blocking**: Enable proxy and rotate user agents
- **Missing data**: Check if resource blocking is enabled

### Configuration Issues:
- **API key errors**: Verify API keys are correct and active
- **Settings not saving**: Ensure all required fields are filled
- **Validation errors**: Check extraction rules and patterns for syntax

## Future Enhancements

Planned improvements for agent types:
- [ ] Email agent type (automated email handling)
- [ ] Data processing agent type (ETL workflows)
- [ ] API integration agent type (REST/GraphQL operations)
- [ ] Custom LLM provider support
- [ ] Agent templates and presets
- [ ] Provider failover/redundancy
- [ ] Cost tracking per agent type
