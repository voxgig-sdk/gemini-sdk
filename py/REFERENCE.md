# Gemini Python SDK Reference

Complete API reference for the Gemini Python SDK.


## GeminiSDK

### Constructor

```python
from gemini_sdk import GeminiSDK

client = GeminiSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `GeminiSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = GeminiSDK.test()
```


### Instance Methods

#### `EmbedContent(data=None)`

Create a new `EmbedContentEntity` instance. Pass `None` for no initial data.

#### `GenerateContent(data=None)`

Create a new `GenerateContentEntity` instance. Pass `None` for no initial data.

#### `Interaction(data=None)`

Create a new `InteractionEntity` instance. Pass `None` for no initial data.

#### `ListModel(data=None)`

Create a new `ListModelEntity` instance. Pass `None` for no initial data.

#### `Model(data=None)`

Create a new `ModelEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## EmbedContentEntity

```python
embed_content = client.EmbedContent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | `dict` | Yes |  |
| `embedding` | `dict` | No |  |
| `task_type` | `str` | No |  |
| `title` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.EmbedContent().create({
    "model": "example_model",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmbedContentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GenerateContentEntity

```python
generate_content = client.GenerateContent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `candidate` | `list` | No |  |
| `content` | `list` | Yes |  |
| `generation_config` | `dict` | No |  |
| `prompt_feedback` | `dict` | No |  |
| `safety_setting` | `list` | No |  |
| `tool` | `list` | No |  |
| `usage_metadata` | `dict` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.GenerateContent().create({
    "model": "example_model",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GenerateContentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InteractionEntity

```python
interaction = client.Interaction()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | `dict` | No |  |
| `input` | `str` | Yes |  |
| `metadata` | `dict` | No |  |
| `model` | `str` | Yes |  |
| `output_text` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Interaction().create({
    "input": "example_input",  # str
    "model": "example_model",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InteractionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ListModelEntity

```python
list_model = client.ListModel()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ListModelEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ModelEntity

```python
model = client.Model()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str` | No |  |
| `display_name` | `str` | No |  |
| `input_token_limit` | `int` | No |  |
| `name` | `str` | No |  |
| `output_token_limit` | `int` | No |  |
| `supported_generation_method` | `list` | No |  |
| `version` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Model().list()
for model in results:
    print(model)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Model().load({"id": "model_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ModelEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = GeminiSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

