# Gemini TypeScript SDK Reference

Complete API reference for the Gemini TypeScript SDK.


## GeminiSDK

### Constructor

```ts
new GeminiSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GeminiSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = GeminiSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `GeminiSDK` instance in test mode.


### Instance Methods

#### `EmbedContent(data?: object)`

Create a new `EmbedContent` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EmbedContentEntity` instance.

#### `GenerateContent(data?: object)`

Create a new `GenerateContent` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GenerateContentEntity` instance.

#### `Interaction(data?: object)`

Create a new `Interaction` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InteractionEntity` instance.

#### `ListModel(data?: object)`

Create a new `ListModel` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ListModelEntity` instance.

#### `Model(data?: object)`

Create a new `Model` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ModelEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `GeminiSDK.test()`.

**Returns:** `GeminiSDK` instance in test mode.


---

## EmbedContentEntity

```ts
const embed_content = client.EmbedContent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | `Record<string, any>` | Yes |  |
| `embedding` | `Record<string, any>` | No |  |
| `task_type` | `string` | No |  |
| `title` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.EmbedContent().create({
  model: 'example_model',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EmbedContentEntity` instance with the same client and
options.

#### `client()`

Return the parent `GeminiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GenerateContentEntity

```ts
const generate_content = client.GenerateContent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `candidate` | `any[]` | No |  |
| `content` | `any[]` | Yes |  |
| `generation_config` | `Record<string, any>` | No |  |
| `prompt_feedback` | `Record<string, any>` | No |  |
| `safety_setting` | `any[]` | No |  |
| `tool` | `any[]` | No |  |
| `usage_metadata` | `Record<string, any>` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.GenerateContent().create({
  model: 'example_model',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GenerateContentEntity` instance with the same client and
options.

#### `client()`

Return the parent `GeminiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InteractionEntity

```ts
const interaction = client.Interaction()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `Record<string, any>` | No |  |
| `input` | `string` | Yes |  |
| `metadata` | `Record<string, any>` | No |  |
| `model` | `string` | Yes |  |
| `output_text` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Interaction().create({
  input: 'example_input',
  model: 'example_model',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InteractionEntity` instance with the same client and
options.

#### `client()`

Return the parent `GeminiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ListModelEntity

```ts
const list_model = client.ListModel()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ListModelEntity` instance with the same client and
options.

#### `client()`

Return the parent `GeminiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ModelEntity

```ts
const model = client.Model()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `display_name` | `string` | No |  |
| `input_token_limit` | `number` | No |  |
| `name` | `string` | No |  |
| `output_token_limit` | `number` | No |  |
| `supported_generation_method` | `any[]` | No |  |
| `version` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Model().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Model().load({ id: 'model_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ModelEntity` instance with the same client and
options.

#### `client()`

Return the parent `GeminiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new GeminiSDK({
  feature: {
    test: { active: true },
  }
})
```

