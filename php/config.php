<?php
declare(strict_types=1);

// Gemini SDK configuration

class GeminiConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Gemini",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://generativelanguage.googleapis.com/v1beta",
                "auth" => [
                    "prefix" => "",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "embed_content" => [],
                    "generate_content" => [],
                    "interaction" => [],
                    "list_model" => [],
                    "model" => [],
                ],
            ],
            "entity" => [
        'embed_content' => [
          'fields' => [
            [
              'name' => 'content',
              'req' => true,
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'taskType',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'title',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'values',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'embed_content',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'embedding-001',
                        'kind' => 'param',
                        'name' => 'model',
                        'orig' => 'model',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'key',
                        'orig' => 'key',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/models/{model}:embedContent',
                  'parts' => [
                    'models',
                    '{model}:embedContent',
                  ],
                  'select' => [
                    'exist' => [
                      'key',
                      'model',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.embedding`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'model',
              ],
            ],
          ],
        ],
        'generate_content' => [
          'fields' => [
            [
              'name' => 'candidates',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'contents',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'generationConfig',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'promptFeedback',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'safetySettings',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'tools',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'usageMetadata',
              'type' => '`$OBJECT`',
            ],
          ],
          'name' => 'generate_content',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'gemini-2.5-flash',
                        'kind' => 'param',
                        'name' => 'model',
                        'orig' => 'model',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'key',
                        'orig' => 'key',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/models/{model}:generateContent',
                  'parts' => [
                    'models',
                    '{model}:generateContent',
                  ],
                  'select' => [
                    'exist' => [
                      'key',
                      'model',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'gemini-3.6-flash',
                        'kind' => 'param',
                        'name' => 'model',
                        'orig' => 'model',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'key',
                        'orig' => 'key',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/models/{model}:streamGenerateContent',
                  'parts' => [
                    'models',
                    '{model}:streamGenerateContent',
                  ],
                  'select' => [
                    'exist' => [
                      'key',
                      'model',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'model',
              ],
            ],
          ],
        ],
        'interaction' => [
          'fields' => [
            [
              'name' => 'config',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'input',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'model',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'interaction',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/interactions',
                  'parts' => [
                    'interactions',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.metadata`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'list_model' => [
          'fields' => [],
          'name' => 'list_model',
          'op' => [],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'model' => [
          'fields' => [
            [
              'name' => 'description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'displayName',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'inputTokenLimit',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'outputTokenLimit',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'supportedGenerationMethods',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'version',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'model',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'key',
                        'orig' => 'key',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 50,
                        'kind' => 'query',
                        'name' => 'page_size',
                        'orig' => 'page_size',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'page_token',
                        'orig' => 'page_token',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/models',
                  'parts' => [
                    'models',
                  ],
                  'select' => [
                    'exist' => [
                      'key',
                      'page_size',
                      'page_token',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.models`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'gemini-3.6-flash',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'model',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'key',
                        'orig' => 'key',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/models/{model}',
                  'parts' => [
                    'models',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'model' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                      'key',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return GeminiFeatures::make_feature($name);
    }
}
