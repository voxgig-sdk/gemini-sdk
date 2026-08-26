# Gemini SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Gemini",
            "slug": "gemini",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://generativelanguage.googleapis.com/v1beta",
            "auth": {
                "prefix": "",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "embed_content": {},
                "generate_content": {},
                "interaction": {},
                "list_model": {},
                "model": {},
            },
        },
        "entity": {
      "embed_content": {
        "fields": [
          {
            "name": "content",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "taskType",
            "short": "Optional task type for embedding optimization",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "short": "Optional title for document embeddings",
            "type": "`$STRING`",
          },
          {
            "name": "values",
            "short": "Embedding vector values",
            "type": "`$ARRAY`",
          },
        ],
        "name": "embed_content",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "embedding-001",
                      "kind": "param",
                      "name": "model",
                      "orig": "model",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "key",
                      "orig": "key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/models/{model}:embedContent",
                "parts": [
                  "models",
                  "{model}:embedContent",
                ],
                "select": {
                  "exist": [
                    "key",
                    "model",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.embedding`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "model",
            ],
          ],
        },
      },
      "generate_content": {
        "fields": [
          {
            "name": "candidates",
            "type": "`$ARRAY`",
          },
          {
            "name": "contents",
            "req": True,
            "short": "Array of content parts for generation",
            "type": "`$ARRAY`",
          },
          {
            "name": "generationConfig",
            "type": "`$OBJECT`",
          },
          {
            "name": "promptFeedback",
            "type": "`$OBJECT`",
          },
          {
            "name": "safetySettings",
            "short": "Safety settings for content filtering",
            "type": "`$ARRAY`",
          },
          {
            "name": "tools",
            "short": "Tools available for function calling",
            "type": "`$ARRAY`",
          },
          {
            "name": "usageMetadata",
            "type": "`$OBJECT`",
          },
        ],
        "name": "generate_content",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "gemini-2.5-flash",
                      "kind": "param",
                      "name": "model",
                      "orig": "model",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "key",
                      "orig": "key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/models/{model}:generateContent",
                "parts": [
                  "models",
                  "{model}:generateContent",
                ],
                "select": {
                  "exist": [
                    "key",
                    "model",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "example": "gemini-3.6-flash",
                      "kind": "param",
                      "name": "model",
                      "orig": "model",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "key",
                      "orig": "key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/models/{model}:streamGenerateContent",
                "parts": [
                  "models",
                  "{model}:streamGenerateContent",
                ],
                "select": {
                  "exist": [
                    "key",
                    "model",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "model",
            ],
          ],
        },
      },
      "interaction": {
        "fields": [
          {
            "name": "config",
            "short": "Optional configuration parameters for the interaction",
            "type": "`$OBJECT`",
          },
          {
            "name": "input",
            "req": True,
            "short": "The input prompt or query",
            "type": "`$STRING`",
          },
          {
            "name": "model",
            "req": True,
            "short": "The model to use for the interaction",
            "type": "`$STRING`",
          },
        ],
        "name": "interaction",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/interactions",
                "parts": [
                  "interactions",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.metadata`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "list_model": {
        "fields": [],
        "name": "list_model",
        "op": {},
        "relations": {
          "ancestors": [],
        },
      },
      "model": {
        "fields": [
          {
            "name": "description",
            "short": "Model description",
            "type": "`$STRING`",
          },
          {
            "name": "displayName",
            "short": "Human-readable model name",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "inputTokenLimit",
            "short": "Maximum input tokens",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "Model resource name",
            "type": "`$STRING`",
          },
          {
            "name": "outputTokenLimit",
            "short": "Maximum output tokens",
            "type": "`$INTEGER`",
          },
          {
            "name": "supportedGenerationMethods",
            "short": "Supported generation methods",
            "type": "`$ARRAY`",
          },
          {
            "name": "version",
            "short": "Model version",
            "type": "`$STRING`",
          },
        ],
        "name": "model",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "key",
                      "orig": "key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": 50,
                      "kind": "query",
                      "name": "page_size",
                      "orig": "page_size",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "page_token",
                      "orig": "page_token",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/models",
                "parts": [
                  "models",
                ],
                "select": {
                  "exist": [
                    "key",
                    "page_size",
                    "page_token",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.models`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "gemini-3.6-flash",
                      "kind": "param",
                      "name": "id",
                      "orig": "model",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "key",
                      "orig": "key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/models/{model}",
                "parts": [
                  "models",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "model": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                    "key",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
