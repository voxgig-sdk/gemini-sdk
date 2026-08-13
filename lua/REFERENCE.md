# Gemini Lua SDK Reference

Complete API reference for the Gemini Lua SDK.


## GeminiSDK

### Constructor

```lua
local sdk = require("gemini_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `EmbedContent(data)`

Create a new `EmbedContent` entity instance. Pass `nil` for no initial data.

#### `GenerateContent(data)`

Create a new `GenerateContent` entity instance. Pass `nil` for no initial data.

#### `Interaction(data)`

Create a new `Interaction` entity instance. Pass `nil` for no initial data.

#### `ListModel(data)`

Create a new `ListModel` entity instance. Pass `nil` for no initial data.

#### `Model(data)`

Create a new `Model` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## EmbedContentEntity

```lua
local embed_content = client:EmbedContent(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | `table` | Yes |  |
| `taskType` | `string` | No |  |
| `title` | `string` | No |  |
| `values` | `table` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:EmbedContent():create({
  model = --[[ string ]],
  content = --[[ table ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmbedContentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GenerateContentEntity

```lua
local generate_content = client:GenerateContent(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `candidates` | `table` | No |  |
| `contents` | `table` | Yes |  |
| `generationConfig` | `table` | No |  |
| `promptFeedback` | `table` | No |  |
| `safetySettings` | `table` | No |  |
| `tools` | `table` | No |  |
| `usageMetadata` | `table` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:GenerateContent():create({
  model = --[[ string ]],
  contents = --[[ table ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GenerateContentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## InteractionEntity

```lua
local interaction = client:Interaction(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `table` | No |  |
| `input` | `string` | Yes |  |
| `model` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Interaction():create({
  input = --[[ string ]],
  model = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InteractionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ListModelEntity

```lua
local list_model = client:ListModel(nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ListModelEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ModelEntity

```lua
local model = client:Model(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `displayName` | `string` | No |  |
| `inputTokenLimit` | `number` | No |  |
| `name` | `string` | No |  |
| `outputTokenLimit` | `number` | No |  |
| `supportedGenerationMethods` | `table` | No |  |
| `version` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Model():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Model():load({ id = "model_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ModelEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

