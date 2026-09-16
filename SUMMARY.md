# Gemini API

The Gemini API provides developers with tools to leverage advanced AI models for content generation, including text, images, audio, and more. It enables seamless integration for creating applications that utilize state-of-the-art multimodal capabilities.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 5 entities and 6 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### EmbedContent

Results: Embedding generated successfully.

SDK operations: `create`.

Key fields to recognise:

- `taskType`: Optional task type for embedding optimization
- `title`: Optional title for document embeddings
- `values`: Embedding vector values

### GenerateContent

Results: Successfully generated content; Streaming content generation initiated.

SDK operations: `create`.

Key fields to recognise:

- `contents`: Array of content parts for generation
- `safetySettings`: Safety settings for content filtering
- `tools`: Tools available for function calling

### Interaction

Results: Successful interaction creation.

SDK operations: `create`.

Key fields to recognise:

- `config`: Optional configuration parameters for the interaction
- `input`: The input prompt or query
- `model`: The model to use for the interaction

### ListModel

SDK operations: .

### Model

Results: List of available models; Model details.

SDK operations: `list`, `load`.

Key fields to recognise:

- `description`: Model description
- `displayName`: Human-readable model name
- `inputTokenLimit`: Maximum input tokens
- `name`: Model resource name
- `outputTokenLimit`: Maximum output tokens

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| EmbedContent | `create` | `POST /models/{model}:embedContent` | Required |
| GenerateContent | `create` | `POST /models/{model}:generateContent` | Required |
| GenerateContent | `create` | `POST /models/{model}:streamGenerateContent` | Required |
| Interaction | `create` | `POST /interactions` | Required |
| Model | `list` | `GET /models` | Required |
| Model | `load` | `GET /models/{model}` | Required |

## Connect to the API

- Gemini API Production Server: `https://generativelanguage.googleapis.com/v1beta`

The default credential is sent in the `x-goog-api-key` header.

API key for authentication. Can also be passed as &#39;key&#39; query parameter.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `gemini_list`: List records for an entity. Supported entities: `model`.
- `gemini_load`: Load one record for an entity. Supported entities: `model`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

