# Gemini Ruby SDK Reference

Complete API reference for the Gemini Ruby SDK.


## GeminiSDK

### Constructor

```ruby
require_relative 'Gemini_sdk'

client = GeminiSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GeminiSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = GeminiSDK.test
```


### Instance Methods

#### `EmbedContent(data = nil)`

Create a new `EmbedContent` entity instance. Pass `nil` for no initial data.

#### `GenerateContent(data = nil)`

Create a new `GenerateContent` entity instance. Pass `nil` for no initial data.

#### `Interaction(data = nil)`

Create a new `Interaction` entity instance. Pass `nil` for no initial data.

#### `ListModel(data = nil)`

Create a new `ListModel` entity instance. Pass `nil` for no initial data.

#### `Model(data = nil)`

Create a new `Model` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## EmbedContentEntity

```ruby
embed_content = client.EmbedContent
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | `Hash` | Yes |  |
| `taskType` | `String` | No |  |
| `title` | `String` | No |  |
| `values` | `Array` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.EmbedContent.create({
  "model" => "example_model", # String
  "content" => {}, # Hash
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EmbedContentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GenerateContentEntity

```ruby
generate_content = client.GenerateContent
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `candidates` | `Array` | No |  |
| `contents` | `Array` | Yes |  |
| `generationConfig` | `Hash` | No |  |
| `promptFeedback` | `Hash` | No |  |
| `safetySettings` | `Array` | No |  |
| `tools` | `Array` | No |  |
| `usageMetadata` | `Hash` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.GenerateContent.create({
  "model" => "example_model", # String
  "contents" => [], # Array
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GenerateContentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## InteractionEntity

```ruby
interaction = client.Interaction
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `Hash` | No |  |
| `input` | `String` | Yes |  |
| `model` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Interaction.create({
  "input" => "example_input", # String
  "model" => "example_model", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `InteractionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ListModelEntity

```ruby
list_model = client.ListModel
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ListModelEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ModelEntity

```ruby
model = client.Model
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No |  |
| `displayName` | `String` | No |  |
| `inputTokenLimit` | `Integer` | No |  |
| `name` | `String` | No |  |
| `outputTokenLimit` | `Integer` | No |  |
| `supportedGenerationMethods` | `Array` | No |  |
| `version` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Model.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Model.load({ "id" => "model_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ModelEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = GeminiSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

