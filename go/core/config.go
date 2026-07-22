package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Gemini",
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
						"active": true,
						"name": "content",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "embedding",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "task_type",
						"req": false,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "title",
						"req": false,
						"type": "`$STRING`",
						"index$": 3,
					},
				},
				"name": "embed_content",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "embedding-001",
											"kind": "param",
											"name": "model",
											"orig": "model",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "key",
											"orig": "key",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "create",
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
						"active": true,
						"name": "candidate",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "content",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "generation_config",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "prompt_feedback",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "safety_setting",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "tool",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "usage_metadata",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 6,
					},
				},
				"name": "generate_content",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "gemini-2.5-flash",
											"kind": "param",
											"name": "model",
											"orig": "model",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "key",
											"orig": "key",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "gemini-3.6-flash",
											"kind": "param",
											"name": "model",
											"orig": "model",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "key",
											"orig": "key",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 1,
							},
						},
						"key$": "create",
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
						"active": true,
						"name": "config",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "input",
						"req": true,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "metadata",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "model",
						"req": true,
						"type": "`$STRING`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "output_text",
						"req": false,
						"type": "`$STRING`",
						"index$": 4,
					},
				},
				"name": "interaction",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{},
								"method": "POST",
								"orig": "/interactions",
								"parts": []any{
									"interactions",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "create",
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
						"active": true,
						"name": "description",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "display_name",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "input_token_limit",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "output_token_limit",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "supported_generation_method",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "version",
						"req": false,
						"type": "`$STRING`",
						"index$": 6,
					},
				},
				"name": "model",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "key",
											"orig": "key",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": 50,
											"kind": "query",
											"name": "page_size",
											"orig": "page_size",
											"reqd": false,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "page_token",
											"orig": "page_token",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "list",
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "gemini-3.6-flash",
											"kind": "param",
											"name": "id",
											"orig": "model",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "key",
											"orig": "key",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
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
