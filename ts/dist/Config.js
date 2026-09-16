"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Gemini',
        slug: "gemini",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://generativelanguage.googleapis.com/v1beta",
        auth: {
            prefix: '',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            embed_content: {},
            generate_content: {},
            interaction: {},
            list_model: {},
            model: {},
        }
    };
    entity = {
        "embed_content": {
            "fields": [
                {
                    "name": "content",
                    "req": true,
                    "type": "`$OBJECT`"
                },
                {
                    "name": "taskType",
                    "short": "Optional task type for embedding optimization",
                    "type": "`$STRING`"
                },
                {
                    "name": "title",
                    "short": "Optional title for document embeddings",
                    "type": "`$STRING`"
                },
                {
                    "name": "values",
                    "short": "Embedding vector values",
                    "type": "`$ARRAY`"
                }
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/models/{model}:embedContent",
                            "segments": [
                                {
                                    "lit": "models"
                                },
                                {
                                    "lit": "{model}:embedContent"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "key",
                                    "model"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.embedding`"
                            },
                            "parts": [
                                "models",
                                "{model}:embedContent"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "generate_content": {
            "fields": [
                {
                    "name": "candidates",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "contents",
                    "req": true,
                    "short": "Array of content parts for generation",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "generationConfig",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "promptFeedback",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "safetySettings",
                    "short": "Safety settings for content filtering",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "tools",
                    "short": "Tools available for function calling",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "usageMetadata",
                    "type": "`$OBJECT`"
                }
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/models/{model}:generateContent",
                            "segments": [
                                {
                                    "lit": "models"
                                },
                                {
                                    "lit": "{model}:generateContent"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "key",
                                    "model"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "models",
                                "{model}:generateContent"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "gemini-3.6-flash",
                                        "kind": "param",
                                        "name": "model",
                                        "orig": "model",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "POST",
                            "orig": "/models/{model}:streamGenerateContent",
                            "segments": [
                                {
                                    "lit": "models"
                                },
                                {
                                    "lit": "{model}:streamGenerateContent"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "key",
                                    "model"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "models",
                                "{model}:streamGenerateContent"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "interaction": {
            "fields": [
                {
                    "name": "config",
                    "short": "Optional configuration parameters for the interaction",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "input",
                    "req": true,
                    "short": "The input prompt or query",
                    "type": "`$STRING`"
                },
                {
                    "name": "model",
                    "req": true,
                    "short": "The model to use for the interaction",
                    "type": "`$STRING`"
                }
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
                            "segments": [
                                {
                                    "lit": "interactions"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.metadata`"
                            },
                            "parts": [
                                "interactions"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "list_model": {
            "fields": [],
            "name": "list_model",
            "op": {},
            "relations": {
                "ancestors": []
            }
        },
        "model": {
            "fields": [
                {
                    "name": "description",
                    "short": "Model description",
                    "type": "`$STRING`"
                },
                {
                    "name": "displayName",
                    "short": "Human-readable model name",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "inputTokenLimit",
                    "short": "Maximum input tokens",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "name",
                    "short": "Model resource name",
                    "type": "`$STRING`"
                },
                {
                    "name": "outputTokenLimit",
                    "short": "Maximum output tokens",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "supportedGenerationMethods",
                    "short": "Supported generation methods",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "version",
                    "short": "Model version",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 50,
                                        "kind": "query",
                                        "name": "page_size",
                                        "orig": "page_size",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "page_token",
                                        "orig": "page_token",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/models",
                            "segments": [
                                {
                                    "lit": "models"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "key",
                                    "page_size",
                                    "page_token"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.models`"
                            },
                            "parts": [
                                "models"
                            ]
                        }
                    ]
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
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "key",
                                        "orig": "key",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/models/{model}",
                            "rename": {
                                "param": {
                                    "model": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "models"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id",
                                    "key"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "models",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map