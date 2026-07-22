# Gemini Ruby SDK



The Ruby SDK for the Gemini API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.EmbedContent` — with named operations (`list`/`load`/`create`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/gemini-sdk/releases](https://github.com/voxgig-sdk/gemini-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Gemini_sdk"

client = GeminiSDK.new({
  "apikey" => ENV["GEMINI_APIKEY"],
})
```

### 4. Create, update, and remove

```ruby
# create returns the bare created EmbedContent record.
created = client.EmbedContent.create({ "model" => "example_model" })

```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  models = client.Model.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = GeminiSDK.test({
  "entity" => { "model" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the bare mock record (raises on error).
model = client.Model.list()
puts model
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = GeminiSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
GEMINI_TEST_LIVE=TRUE
GEMINI_APIKEY=<your-key>
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### GeminiSDK

```ruby
require_relative "Gemini_sdk"
client = GeminiSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = GeminiSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### GeminiSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `EmbedContent` | `(data) -> EmbedContentEntity` | Create an EmbedContent entity instance. |
| `GenerateContent` | `(data) -> GenerateContentEntity` | Create a GenerateContent entity instance. |
| `Interaction` | `(data) -> InteractionEntity` | Create an Interaction entity instance. |
| `ListModel` | `(data) -> ListModelEntity` | Create a ListModel entity instance. |
| `Model` | `(data) -> ModelEntity` | Create a Model entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `GeminiError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### EmbedContent

| Field | Description |
| --- | --- |
| `content` |  |
| `embedding` |  |
| `task_type` |  |
| `title` |  |

Operations: Create.

API path: `/models/{model}:embedContent`

#### GenerateContent

| Field | Description |
| --- | --- |
| `candidate` |  |
| `content` |  |
| `generation_config` |  |
| `prompt_feedback` |  |
| `safety_setting` |  |
| `tool` |  |
| `usage_metadata` |  |

Operations: Create.

API path: `/models/{model}:generateContent`

#### Interaction

| Field | Description |
| --- | --- |
| `config` |  |
| `input` |  |
| `metadata` |  |
| `model` |  |
| `output_text` |  |

Operations: Create.

API path: `/interactions`

#### ListModel

| Field | Description |
| --- | --- |

Operations: .

API path: ``

#### Model

| Field | Description |
| --- | --- |
| `description` |  |
| `display_name` |  |
| `input_token_limit` |  |
| `name` |  |
| `output_token_limit` |  |
| `supported_generation_method` |  |
| `version` |  |

Operations: List, Load.

API path: `/models`



## Entities


### EmbedContent

Create an instance: `embed_content = client.EmbedContent`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `content` | `Hash` |  |
| `embedding` | `Hash` |  |
| `task_type` | `String` |  |
| `title` | `String` |  |

#### Example: Create

```ruby
embed_content = client.EmbedContent.create({
  "model" => "example_model", # String
})
```


### GenerateContent

Create an instance: `generate_content = client.GenerateContent`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `candidate` | `Array` |  |
| `content` | `Array` |  |
| `generation_config` | `Hash` |  |
| `prompt_feedback` | `Hash` |  |
| `safety_setting` | `Array` |  |
| `tool` | `Array` |  |
| `usage_metadata` | `Hash` |  |

#### Example: Create

```ruby
generate_content = client.GenerateContent.create({
  "model" => "example_model", # String
})
```


### Interaction

Create an instance: `interaction = client.Interaction`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `config` | `Hash` |  |
| `input` | `String` |  |
| `metadata` | `Hash` |  |
| `model` | `String` |  |
| `output_text` | `String` |  |

#### Example: Create

```ruby
interaction = client.Interaction.create({
  "input" => "example_input", # String
  "model" => "example_model", # String
})
```


### ListModel

Create an instance: `list_model = client.ListModel`


### Model

Create an instance: `model = client.Model`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` |  |
| `display_name` | `String` |  |
| `input_token_limit` | `Integer` |  |
| `name` | `String` |  |
| `output_token_limit` | `Integer` |  |
| `supported_generation_method` | `Array` |  |
| `version` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Model record (raises on error).
model = client.Model.load({ "id" => "model_id" })
```

#### Example: List

```ruby
# list returns an Array of Model records (raises on error).
models = client.Model.list
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Gemini_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Gemini_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
model = client.Model
model.list()

# model.data_get now returns the model data from the last list
# model.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
