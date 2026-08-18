-- Gemini SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Gemini",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://generativelanguage.googleapis.com/v1beta",
      auth = {
        prefix = "",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["embed_content"] = {},
        ["generate_content"] = {},
        ["interaction"] = {},
        ["list_model"] = {},
        ["model"] = {},
      },
    },
    entity = {
      ["embed_content"] = {
        ["fields"] = {
          {
            ["name"] = "content",
            ["req"] = true,
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "taskType",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "title",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "values",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "embed_content",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "embedding-001",
                      ["kind"] = "param",
                      ["name"] = "model",
                      ["orig"] = "model",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "key",
                      ["orig"] = "key",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/models/{model}:embedContent",
                ["parts"] = {
                  "models",
                  "{model}:embedContent",
                },
                ["select"] = {
                  ["exist"] = {
                    "key",
                    "model",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.embedding`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "model",
            },
          },
        },
      },
      ["generate_content"] = {
        ["fields"] = {
          {
            ["name"] = "candidates",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "contents",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "generationConfig",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "promptFeedback",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "safetySettings",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "tools",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "usageMetadata",
            ["type"] = "`$OBJECT`",
          },
        },
        ["name"] = "generate_content",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "gemini-2.5-flash",
                      ["kind"] = "param",
                      ["name"] = "model",
                      ["orig"] = "model",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "key",
                      ["orig"] = "key",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/models/{model}:generateContent",
                ["parts"] = {
                  "models",
                  "{model}:generateContent",
                },
                ["select"] = {
                  ["exist"] = {
                    "key",
                    "model",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "gemini-3.6-flash",
                      ["kind"] = "param",
                      ["name"] = "model",
                      ["orig"] = "model",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "key",
                      ["orig"] = "key",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/models/{model}:streamGenerateContent",
                ["parts"] = {
                  "models",
                  "{model}:streamGenerateContent",
                },
                ["select"] = {
                  ["exist"] = {
                    "key",
                    "model",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "model",
            },
          },
        },
      },
      ["interaction"] = {
        ["fields"] = {
          {
            ["name"] = "config",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "input",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "model",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "interaction",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/interactions",
                ["parts"] = {
                  "interactions",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.metadata`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["list_model"] = {
        ["fields"] = {},
        ["name"] = "list_model",
        ["op"] = {},
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["model"] = {
        ["fields"] = {
          {
            ["name"] = "description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "displayName",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "inputTokenLimit",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "outputTokenLimit",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "supportedGenerationMethods",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "version",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "model",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "key",
                      ["orig"] = "key",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 50,
                      ["kind"] = "query",
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "page_token",
                      ["orig"] = "page_token",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/models",
                ["parts"] = {
                  "models",
                },
                ["select"] = {
                  ["exist"] = {
                    "key",
                    "page_size",
                    "page_token",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.models`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "gemini-3.6-flash",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "model",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "key",
                      ["orig"] = "key",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/models/{model}",
                ["parts"] = {
                  "models",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["model"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "key",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
