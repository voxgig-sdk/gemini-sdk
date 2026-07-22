# Gemini PHP SDK Reference

Complete API reference for the Gemini PHP SDK.


## GeminiSDK

### Constructor

```php
require_once __DIR__ . '/gemini_sdk.php';

$client = new GeminiSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GeminiSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = GeminiSDK::test();
```


### Instance Methods

#### `EmbedContent($data = null)`

Create a new `EmbedContentEntity` instance. Pass `null` for no initial data.

#### `GenerateContent($data = null)`

Create a new `GenerateContentEntity` instance. Pass `null` for no initial data.

#### `Interaction($data = null)`

Create a new `InteractionEntity` instance. Pass `null` for no initial data.

#### `ListModel($data = null)`

Create a new `ListModelEntity` instance. Pass `null` for no initial data.

#### `Model($data = null)`

Create a new `ModelEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): GeminiUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## EmbedContentEntity

```php
$embed_content = $client->EmbedContent();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | `array` | Yes |  |
| `embedding` | `array` | No |  |
| `task_type` | `string` | No |  |
| `title` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->EmbedContent()->create([
  "model" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EmbedContentEntity`

Create a new `EmbedContentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GenerateContentEntity

```php
$generate_content = $client->GenerateContent();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `candidate` | `array` | No |  |
| `content` | `array` | Yes |  |
| `generation_config` | `array` | No |  |
| `prompt_feedback` | `array` | No |  |
| `safety_setting` | `array` | No |  |
| `tool` | `array` | No |  |
| `usage_metadata` | `array` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->GenerateContent()->create([
  "model" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GenerateContentEntity`

Create a new `GenerateContentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## InteractionEntity

```php
$interaction = $client->Interaction();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `array` | No |  |
| `input` | `string` | Yes |  |
| `metadata` | `array` | No |  |
| `model` | `string` | Yes |  |
| `output_text` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Interaction()->create([
  "input" => null, // string
  "model" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): InteractionEntity`

Create a new `InteractionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ListModelEntity

```php
$list_model = $client->ListModel();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ListModelEntity`

Create a new `ListModelEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ModelEntity

```php
$model = $client->Model();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `display_name` | `string` | No |  |
| `input_token_limit` | `int` | No |  |
| `name` | `string` | No |  |
| `output_token_limit` | `int` | No |  |
| `supported_generation_method` | `array` | No |  |
| `version` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Model()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Model()->load(["id" => "model_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ModelEntity`

Create a new `ModelEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new GeminiSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

