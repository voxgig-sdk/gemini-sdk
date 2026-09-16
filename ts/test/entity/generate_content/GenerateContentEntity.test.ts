

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { GeminiSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('GenerateContentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GEMINI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GEMINI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GeminiSDK.test()
    const ent = testsdk.GenerateContent()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GEMINI_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'generate_content.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"candidates","req":false,"type":"`$ARRAY`","index$":0},{"active":true,"name":"contents","req":true,"short":"Array of content parts for generation","type":"`$ARRAY`","index$":1},{"active":true,"name":"generationConfig","req":false,"type":"`$OBJECT`","index$":2},{"active":true,"name":"promptFeedback","req":false,"type":"`$OBJECT`","index$":3},{"active":true,"name":"safetySettings","req":false,"short":"Safety settings for content filtering","type":"`$ARRAY`","index$":4},{"active":true,"name":"tools","req":false,"short":"Tools available for function calling","type":"`$ARRAY`","index$":5},{"active":true,"name":"usageMetadata","req":false,"type":"`$OBJECT`","index$":6}],"name":"generate_content","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"example":"gemini-2.5-flash","kind":"param","name":"model","orig":"model","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"key","orig":"key","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"POST /models/{model}:generateContent","json":"{\"operationId\":\"generateContent\",\"parameters\":[{\"description\":\"The model to use for content generation (e.g., gemini-2.5-flash, gemini-3.6-flash, gemini-3.1-pro)\",\"in\":\"path\",\"name\":\"model\",\"required\":true,\"schema\":{\"example\":\"gemini-2.5-flash\",\"type\":\"string\"}},{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"textGeneration\":{\"summary\":\"Text generation example\",\"value\":{\"contents\":[{\"parts\":[{\"text\":\"Write a story about a magic backpack.\"}]}]}}},\"schema\":{\"properties\":{\"contents\":{\"description\":\"Array of content parts for generation\",\"items\":{\"properties\":{\"parts\":{\"items\":{\"properties\":{\"fileData\":{\"properties\":{\"fileUri\":{\"description\":\"URI of the file\",\"type\":\"string\"},\"mimeType\":{\"description\":\"MIME type of the file\",\"type\":\"string\"}},\"type\":\"object\"},\"functionCall\":{\"properties\":{\"args\":{\"description\":\"Function arguments\",\"type\":\"object\"},\"name\":{\"description\":\"Function name\",\"type\":\"string\"}},\"type\":\"object\"},\"functionResponse\":{\"properties\":{\"name\":{\"description\":\"Function name\",\"type\":\"string\"},\"response\":{\"description\":\"Function response data\",\"type\":\"object\"}},\"type\":\"object\"},\"inlineData\":{\"properties\":{\"data\":{\"description\":\"Base64 encoded data\",\"format\":\"byte\",\"type\":\"string\"},\"mimeType\":{\"description\":\"MIME type of the inline data\",\"type\":\"string\"}},\"type\":\"object\"},\"text\":{\"description\":\"Text content\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"role\":{\"description\":\"Role of the content sender\",\"enum\":[\"user\",\"model\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"generationConfig\":{\"properties\":{\"candidateCount\":{\"description\":\"Number of response candidates to generate\",\"type\":\"integer\"},\"maxOutputTokens\":{\"description\":\"Maximum number of tokens to generate\",\"type\":\"integer\"},\"responseMimeType\":{\"description\":\"MIME type for structured output (e.g., application/json)\",\"type\":\"string\"},\"responseSchema\":{\"description\":\"JSON schema for structured output\",\"type\":\"object\"},\"stopSequences\":{\"description\":\"Sequences where generation should stop\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"temperature\":{\"description\":\"Controls randomness of the output (0.0 to 2.0)\",\"format\":\"float\",\"maximum\":2,\"minimum\":0,\"type\":\"number\"},\"topK\":{\"description\":\"Top-k sampling parameter\",\"type\":\"integer\"},\"topP\":{\"description\":\"Nucleus sampling threshold\",\"format\":\"float\",\"maximum\":1,\"minimum\":0,\"type\":\"number\"}},\"type\":\"object\"},\"safetySettings\":{\"description\":\"Safety settings for content filtering\",\"items\":{\"properties\":{\"category\":{\"description\":\"Harm category\",\"enum\":[\"HARM_CATEGORY_HARASSMENT\",\"HARM_CATEGORY_HATE_SPEECH\",\"HARM_CATEGORY_SEXUALLY_EXPLICIT\",\"HARM_CATEGORY_DANGEROUS_CONTENT\"],\"type\":\"string\"},\"threshold\":{\"description\":\"Threshold for blocking content\",\"enum\":[\"BLOCK_NONE\",\"BLOCK_LOW_AND_ABOVE\",\"BLOCK_MEDIUM_AND_ABOVE\",\"BLOCK_ONLY_HIGH\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"tools\":{\"description\":\"Tools available for function calling\",\"items\":{\"properties\":{\"codeExecution\":{\"description\":\"Enable code execution tool\",\"type\":\"object\"},\"functionDeclarations\":{\"items\":{\"properties\":{\"description\":{\"description\":\"Function description\",\"type\":\"string\"},\"name\":{\"description\":\"Function name\",\"type\":\"string\"},\"parameters\":{\"description\":\"JSON schema of function parameters\",\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"},\"googleSearch\":{\"description\":\"Enable Google Search tool\",\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"contents\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"candidates\":{\"items\":{\"properties\":{\"content\":{\"properties\":{\"parts\":{\"items\":{\"properties\":{\"fileData\":{\"properties\":{\"fileUri\":{\"description\":\"URI of the file\",\"type\":\"string\"},\"mimeType\":{\"description\":\"MIME type of the file\",\"type\":\"string\"}},\"type\":\"object\"},\"functionCall\":{\"properties\":{\"args\":{\"description\":\"Function arguments\",\"type\":\"object\"},\"name\":{\"description\":\"Function name\",\"type\":\"string\"}},\"type\":\"object\"},\"functionResponse\":{\"properties\":{\"name\":{\"description\":\"Function name\",\"type\":\"string\"},\"response\":{\"description\":\"Function response data\",\"type\":\"object\"}},\"type\":\"object\"},\"inlineData\":{\"properties\":{\"data\":{\"description\":\"Base64 encoded data\",\"format\":\"byte\",\"type\":\"string\"},\"mimeType\":{\"description\":\"MIME type of the inline data\",\"type\":\"string\"}},\"type\":\"object\"},\"text\":{\"description\":\"Text content\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"role\":{\"description\":\"Role of the content sender\",\"enum\":[\"user\",\"model\"],\"type\":\"string\"}},\"type\":\"object\"},\"finishReason\":{\"enum\":[\"FINISH_REASON_UNSPECIFIED\",\"STOP\",\"MAX_TOKENS\",\"SAFETY\",\"RECITATION\",\"OTHER\"],\"type\":\"string\"},\"index\":{\"type\":\"integer\"},\"safetyRatings\":{\"items\":{\"properties\":{\"category\":{\"description\":\"Harm category\",\"type\":\"string\"},\"probability\":{\"enum\":[\"NEGLIGIBLE\",\"LOW\",\"MEDIUM\",\"HIGH\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"},\"promptFeedback\":{\"properties\":{\"blockReason\":{\"description\":\"Reason if prompt was blocked\",\"type\":\"string\"},\"safetyRatings\":{\"items\":{\"properties\":{\"category\":{\"description\":\"Harm category\",\"type\":\"string\"},\"probability\":{\"enum\":[\"NEGLIGIBLE\",\"LOW\",\"MEDIUM\",\"HIGH\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"usageMetadata\":{\"properties\":{\"candidatesTokenCount\":{\"description\":\"Number of tokens in generated candidates\",\"type\":\"integer\"},\"promptTokenCount\":{\"description\":\"Number of tokens in the prompt\",\"type\":\"integer\"},\"totalTokenCount\":{\"description\":\"Total token count\",\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successfully generated content\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"Error status\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"Error status\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - Invalid API key\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"Error status\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"Error status\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Can also be passed as 'key' query parameter.\",\"in\":\"header\",\"name\":\"x-goog-api-key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/models/{model}:generateContent","segments":[{"lit":"models"},{"lit":"{model}:generateContent"}],"select":{"exist":["key","model"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"example":"gemini-3.6-flash","kind":"param","name":"model","orig":"model","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"key","orig":"key","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"POST /models/{model}:streamGenerateContent","json":"{\"operationId\":\"streamGenerateContent\",\"parameters\":[{\"description\":\"The model to use for streaming content generation\",\"in\":\"path\",\"name\":\"model\",\"required\":true,\"schema\":{\"example\":\"gemini-3.6-flash\",\"type\":\"string\"}},{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"contents\":{\"description\":\"Array of content parts for generation\",\"items\":{\"properties\":{\"parts\":{\"items\":{\"properties\":{\"fileData\":{\"properties\":{\"fileUri\":{\"description\":\"URI of the file\",\"type\":\"string\"},\"mimeType\":{\"description\":\"MIME type of the file\",\"type\":\"string\"}},\"type\":\"object\"},\"functionCall\":{\"properties\":{\"args\":{\"description\":\"Function arguments\",\"type\":\"object\"},\"name\":{\"description\":\"Function name\",\"type\":\"string\"}},\"type\":\"object\"},\"functionResponse\":{\"properties\":{\"name\":{\"description\":\"Function name\",\"type\":\"string\"},\"response\":{\"description\":\"Function response data\",\"type\":\"object\"}},\"type\":\"object\"},\"inlineData\":{\"properties\":{\"data\":{\"description\":\"Base64 encoded data\",\"format\":\"byte\",\"type\":\"string\"},\"mimeType\":{\"description\":\"MIME type of the inline data\",\"type\":\"string\"}},\"type\":\"object\"},\"text\":{\"description\":\"Text content\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"role\":{\"description\":\"Role of the content sender\",\"enum\":[\"user\",\"model\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"generationConfig\":{\"properties\":{\"candidateCount\":{\"description\":\"Number of response candidates to generate\",\"type\":\"integer\"},\"maxOutputTokens\":{\"description\":\"Maximum number of tokens to generate\",\"type\":\"integer\"},\"responseMimeType\":{\"description\":\"MIME type for structured output (e.g., application/json)\",\"type\":\"string\"},\"responseSchema\":{\"description\":\"JSON schema for structured output\",\"type\":\"object\"},\"stopSequences\":{\"description\":\"Sequences where generation should stop\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"temperature\":{\"description\":\"Controls randomness of the output (0.0 to 2.0)\",\"format\":\"float\",\"maximum\":2,\"minimum\":0,\"type\":\"number\"},\"topK\":{\"description\":\"Top-k sampling parameter\",\"type\":\"integer\"},\"topP\":{\"description\":\"Nucleus sampling threshold\",\"format\":\"float\",\"maximum\":1,\"minimum\":0,\"type\":\"number\"}},\"type\":\"object\"},\"safetySettings\":{\"description\":\"Safety settings for content filtering\",\"items\":{\"properties\":{\"category\":{\"description\":\"Harm category\",\"enum\":[\"HARM_CATEGORY_HARASSMENT\",\"HARM_CATEGORY_HATE_SPEECH\",\"HARM_CATEGORY_SEXUALLY_EXPLICIT\",\"HARM_CATEGORY_DANGEROUS_CONTENT\"],\"type\":\"string\"},\"threshold\":{\"description\":\"Threshold for blocking content\",\"enum\":[\"BLOCK_NONE\",\"BLOCK_LOW_AND_ABOVE\",\"BLOCK_MEDIUM_AND_ABOVE\",\"BLOCK_ONLY_HIGH\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"tools\":{\"description\":\"Tools available for function calling\",\"items\":{\"properties\":{\"codeExecution\":{\"description\":\"Enable code execution tool\",\"type\":\"object\"},\"functionDeclarations\":{\"items\":{\"properties\":{\"description\":{\"description\":\"Function description\",\"type\":\"string\"},\"name\":{\"description\":\"Function name\",\"type\":\"string\"},\"parameters\":{\"description\":\"JSON schema of function parameters\",\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"},\"googleSearch\":{\"description\":\"Enable Google Search tool\",\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"contents\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"candidates\":{\"items\":{\"properties\":{\"content\":{\"properties\":{\"parts\":{\"items\":{\"properties\":{\"fileData\":{\"properties\":{\"fileUri\":{\"description\":\"URI of the file\",\"type\":\"string\"},\"mimeType\":{\"description\":\"MIME type of the file\",\"type\":\"string\"}},\"type\":\"object\"},\"functionCall\":{\"properties\":{\"args\":{\"description\":\"Function arguments\",\"type\":\"object\"},\"name\":{\"description\":\"Function name\",\"type\":\"string\"}},\"type\":\"object\"},\"functionResponse\":{\"properties\":{\"name\":{\"description\":\"Function name\",\"type\":\"string\"},\"response\":{\"description\":\"Function response data\",\"type\":\"object\"}},\"type\":\"object\"},\"inlineData\":{\"properties\":{\"data\":{\"description\":\"Base64 encoded data\",\"format\":\"byte\",\"type\":\"string\"},\"mimeType\":{\"description\":\"MIME type of the inline data\",\"type\":\"string\"}},\"type\":\"object\"},\"text\":{\"description\":\"Text content\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"role\":{\"description\":\"Role of the content sender\",\"enum\":[\"user\",\"model\"],\"type\":\"string\"}},\"type\":\"object\"},\"finishReason\":{\"enum\":[\"FINISH_REASON_UNSPECIFIED\",\"STOP\",\"MAX_TOKENS\",\"SAFETY\",\"RECITATION\",\"OTHER\"],\"type\":\"string\"},\"index\":{\"type\":\"integer\"},\"safetyRatings\":{\"items\":{\"properties\":{\"category\":{\"description\":\"Harm category\",\"type\":\"string\"},\"probability\":{\"enum\":[\"NEGLIGIBLE\",\"LOW\",\"MEDIUM\",\"HIGH\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"},\"promptFeedback\":{\"properties\":{\"blockReason\":{\"description\":\"Reason if prompt was blocked\",\"type\":\"string\"},\"safetyRatings\":{\"items\":{\"properties\":{\"category\":{\"description\":\"Harm category\",\"type\":\"string\"},\"probability\":{\"enum\":[\"NEGLIGIBLE\",\"LOW\",\"MEDIUM\",\"HIGH\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"usageMetadata\":{\"properties\":{\"candidatesTokenCount\":{\"description\":\"Number of tokens in generated candidates\",\"type\":\"integer\"},\"promptTokenCount\":{\"description\":\"Number of tokens in the prompt\",\"type\":\"integer\"},\"totalTokenCount\":{\"description\":\"Total token count\",\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Streaming content generation initiated\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"Error status\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Bad request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"Error status\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Can also be passed as 'key' query parameter.\",\"in\":\"header\",\"name\":\"x-goog-api-key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/models/{model}:streamGenerateContent","segments":[{"lit":"models"},{"lit":"{model}:streamGenerateContent"}],"select":{"exist":["key","model"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"generate_content","name__orig":"generate_content","Name":"GenerateContent","name_":"generate_content","name-":"generate-content","NAME":"GENERATE_CONTENT","index$":1}, {"active":true,"entity":"generate_content","key$":"BasicGenerateContentFlow","kind":"basic","name":"BasicGenerateContentFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"generate_content_ref01"},"match":{"model":"model01"},"op":"create","spec":[],"valid":[],"index$":0}]}, 'GenerateContent')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const generate_content_ref01_ent = client.GenerateContent()
    let generate_content_ref01_data = setup.data.new.generate_content['generate_content_ref01']
    generate_content_ref01_data['model'] = setup.idmap['model01']

    generate_content_ref01_data = (await generate_content_ref01_ent.create(generate_content_ref01_data)).data()
    assert(null != generate_content_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/generate_content/GenerateContentTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = GeminiSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['generate_content01','generate_content02','generate_content03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GEMINI_TEST_GENERATE_CONTENT_ENTID': idmap,
    'GEMINI_TEST_LIVE': 'FALSE',
    'GEMINI_TEST_EXPLAIN': 'FALSE',
    'GEMINI_APIKEY': '',
  })

  idmap = env['GEMINI_TEST_GENERATE_CONTENT_ENTID']

  const live = 'TRUE' === env.GEMINI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GEMINI_TEST_GENERATE_CONTENT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new GeminiSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.GEMINI_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.GEMINI_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
