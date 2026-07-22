# Gemini SDK configuration


def make_config():
    return {
        "main": {
            "name": "Gemini",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "active": True,
            "name": "content",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "embedding",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "task_type",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "title",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
        ],
        "name": "embed_content",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "embedding-001",
                      "kind": "param",
                      "name": "model",
                      "orig": "model",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "key",
                      "orig": "key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "create",
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
            "active": True,
            "name": "candidate",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "content",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "generation_config",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "prompt_feedback",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "safety_setting",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "tool",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "usage_metadata",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 6,
          },
        ],
        "name": "generate_content",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "gemini-2.5-flash",
                      "kind": "param",
                      "name": "model",
                      "orig": "model",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "key",
                      "orig": "key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "gemini-3.6-flash",
                      "kind": "param",
                      "name": "model",
                      "orig": "model",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "key",
                      "orig": "key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "index$": 1,
              },
            ],
            "key$": "create",
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
            "active": True,
            "name": "config",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "input",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "metadata",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "model",
            "req": True,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "output_text",
            "req": False,
            "type": "`$STRING`",
            "index$": 4,
          },
        ],
        "name": "interaction",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "POST",
                "orig": "/interactions",
                "parts": [
                  "interactions",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "create",
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
            "active": True,
            "name": "description",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "display_name",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "input_token_limit",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "output_token_limit",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "supported_generation_method",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "version",
            "req": False,
            "type": "`$STRING`",
            "index$": 6,
          },
        ],
        "name": "model",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "key",
                      "orig": "key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": 50,
                      "kind": "query",
                      "name": "page_size",
                      "orig": "page_size",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "page_token",
                      "orig": "page_token",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "gemini-3.6-flash",
                      "kind": "param",
                      "name": "id",
                      "orig": "model",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "key",
                      "orig": "key",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
