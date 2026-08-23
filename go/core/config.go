package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Gemini",
			"slug": "gemini",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://generativelanguage.googleapis.com/v1beta",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"embed_content": map[string]any{},
				"generate_content": map[string]any{},
				"interaction": map[string]any{},
				"list_model": map[string]any{},
				"model": map[string]any{},
			},
		},
		"entity": map[string]any{
			"embed_content": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "content",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "taskType",
						"short": "Optional task type for embedding optimization",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"short": "Optional title for document embeddings",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "values",
						"short": "Embedding vector values",
						"type": "`$ARRAY`",
					},
				},
				"name": "embed_content",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "embedding-001",
											"kind": "param",
											"name": "model",
											"orig": "model",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/models/{model}:embedContent",
								"parts": []any{
									"models",
									"{model}:embedContent",
								},
								"select": map[string]any{
									"exist": []any{
										"key",
										"model",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.embedding`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"model",
						},
					},
				},
			},
			"generate_content": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "candidates",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "contents",
						"req": true,
						"short": "Array of content parts for generation",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "generationConfig",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "promptFeedback",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "safetySettings",
						"short": "Safety settings for content filtering",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "tools",
						"short": "Tools available for function calling",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "usageMetadata",
						"type": "`$OBJECT`",
					},
				},
				"name": "generate_content",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "gemini-2.5-flash",
											"kind": "param",
											"name": "model",
											"orig": "model",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/models/{model}:generateContent",
								"parts": []any{
									"models",
									"{model}:generateContent",
								},
								"select": map[string]any{
									"exist": []any{
										"key",
										"model",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "gemini-3.6-flash",
											"kind": "param",
											"name": "model",
											"orig": "model",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/models/{model}:streamGenerateContent",
								"parts": []any{
									"models",
									"{model}:streamGenerateContent",
								},
								"select": map[string]any{
									"exist": []any{
										"key",
										"model",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"model",
						},
					},
				},
			},
			"interaction": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "config",
						"short": "Optional configuration parameters for the interaction",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "input",
						"req": true,
						"short": "The input prompt or query",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "model",
						"req": true,
						"short": "The model to use for the interaction",
						"type": "`$STRING`",
					},
				},
				"name": "interaction",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/interactions",
								"parts": []any{
									"interactions",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.metadata`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"list_model": map[string]any{
				"fields": []any{},
				"name": "list_model",
				"op": map[string]any{},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"model": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "Model description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "displayName",
						"short": "Human-readable model name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "inputTokenLimit",
						"short": "Maximum input tokens",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Model resource name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "outputTokenLimit",
						"short": "Maximum output tokens",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "supportedGenerationMethods",
						"short": "Supported generation methods",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "version",
						"short": "Model version",
						"type": "`$STRING`",
					},
				},
				"name": "model",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "page_token",
											"orig": "page_token",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/models",
								"parts": []any{
									"models",
								},
								"select": map[string]any{
									"exist": []any{
										"key",
										"page_size",
										"page_token",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.models`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "gemini-3.6-flash",
											"kind": "param",
											"name": "id",
											"orig": "model",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "key",
											"orig": "key",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/models/{model}",
								"parts": []any{
									"models",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"model": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"key",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
