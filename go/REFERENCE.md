# Gemini Golang SDK Reference

Complete API reference for the Gemini Golang SDK.


## GeminiSDK

### Constructor

```go
func NewGeminiSDK(options map[string]any) *GeminiSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *GeminiSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *GeminiSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `EmbedContent(data map[string]any) GeminiEntity`

Create a new `EmbedContent` entity instance. Pass `nil` for no initial data.

#### `GenerateContent(data map[string]any) GeminiEntity`

Create a new `GenerateContent` entity instance. Pass `nil` for no initial data.

#### `Interaction(data map[string]any) GeminiEntity`

Create a new `Interaction` entity instance. Pass `nil` for no initial data.

#### `ListModel(data map[string]any) GeminiEntity`

Create a new `ListModel` entity instance. Pass `nil` for no initial data.

#### `Model(data map[string]any) GeminiEntity`

Create a new `Model` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## EmbedContentEntity

```go
embedContent := client.EmbedContent(nil)
fmt.Println(embedContent.GetName()) // "embed_content"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | `map[string]any` | Yes |  |
| `taskType` | `string` | No |  |
| `title` | `string` | No |  |
| `values` | `[]any` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.EmbedContent(nil).Create(map[string]any{
    "model": "example_model",
    "content": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EmbedContentEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GenerateContentEntity

```go
generateContent := client.GenerateContent(nil)
fmt.Println(generateContent.GetName()) // "generate_content"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `candidates` | `[]any` | No |  |
| `contents` | `[]any` | Yes |  |
| `generationConfig` | `map[string]any` | No |  |
| `promptFeedback` | `map[string]any` | No |  |
| `safetySettings` | `[]any` | No |  |
| `tools` | `[]any` | No |  |
| `usageMetadata` | `map[string]any` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.GenerateContent(nil).Create(map[string]any{
    "model": "example_model",
    "contents": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GenerateContentEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## InteractionEntity

```go
interaction := client.Interaction(nil)
fmt.Println(interaction.GetName()) // "interaction"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `map[string]any` | No |  |
| `input` | `string` | Yes |  |
| `model` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Interaction(nil).Create(map[string]any{
    "input": "example_input",
    "model": "example_model",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `InteractionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ListModelEntity

```go
listModel := client.ListModel(nil)
fmt.Println(listModel.GetName()) // "list_model"
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ListModelEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ModelEntity

```go
model := client.Model(nil)
fmt.Println(model.GetName()) // "model"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `displayName` | `string` | No |  |
| `inputTokenLimit` | `int` | No |  |
| `name` | `string` | No |  |
| `outputTokenLimit` | `int` | No |  |
| `supportedGenerationMethods` | `[]any` | No |  |
| `version` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Model(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Model(nil).Load(map[string]any{"id": "model_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ModelEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewGeminiSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

