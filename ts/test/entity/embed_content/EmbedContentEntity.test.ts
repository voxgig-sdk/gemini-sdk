

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


describe('EmbedContentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GEMINI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GEMINI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GeminiSDK.test()
    const ent = testsdk.EmbedContent()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GEMINI_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'embed_content.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"content","req":true,"type":"`$OBJECT`","index$":0},{"active":true,"name":"taskType","req":false,"short":"Optional task type for embedding optimization","type":"`$STRING`","index$":1},{"active":true,"name":"title","req":false,"short":"Optional title for document embeddings","type":"`$STRING`","index$":2},{"active":true,"name":"values","req":false,"short":"Embedding vector values","type":"`$ARRAY`","index$":3}],"name":"embed_content","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"example":"embedding-001","kind":"param","name":"model","orig":"model","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"key","orig":"key","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"POST /models/{model}:embedContent","json":"{\"operationId\":\"embedContent\",\"parameters\":[{\"description\":\"The embedding model to use\",\"in\":\"path\",\"name\":\"model\",\"required\":true,\"schema\":{\"example\":\"embedding-001\",\"type\":\"string\"}},{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"content\":{\"properties\":{\"parts\":{\"items\":{\"properties\":{\"fileData\":{\"properties\":{\"fileUri\":{\"description\":\"URI of the file\",\"type\":\"string\"},\"mimeType\":{\"description\":\"MIME type of the file\",\"type\":\"string\"}},\"type\":\"object\"},\"functionCall\":{\"properties\":{\"args\":{\"description\":\"Function arguments\",\"type\":\"object\"},\"name\":{\"description\":\"Function name\",\"type\":\"string\"}},\"type\":\"object\"},\"functionResponse\":{\"properties\":{\"name\":{\"description\":\"Function name\",\"type\":\"string\"},\"response\":{\"description\":\"Function response data\",\"type\":\"object\"}},\"type\":\"object\"},\"inlineData\":{\"properties\":{\"data\":{\"description\":\"Base64 encoded data\",\"format\":\"byte\",\"type\":\"string\"},\"mimeType\":{\"description\":\"MIME type of the inline data\",\"type\":\"string\"}},\"type\":\"object\"},\"text\":{\"description\":\"Text content\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"role\":{\"description\":\"Role of the content sender\",\"enum\":[\"user\",\"model\"],\"type\":\"string\"}},\"type\":\"object\"},\"taskType\":{\"description\":\"Optional task type for embedding optimization\",\"enum\":[\"TASK_TYPE_UNSPECIFIED\",\"RETRIEVAL_QUERY\",\"RETRIEVAL_DOCUMENT\",\"SEMANTIC_SIMILARITY\",\"CLASSIFICATION\",\"CLUSTERING\"],\"type\":\"string\"},\"title\":{\"description\":\"Optional title for document embeddings\",\"type\":\"string\"}},\"required\":[\"content\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"embedding\":{\"properties\":{\"values\":{\"description\":\"Embedding vector values\",\"items\":{\"format\":\"float\",\"type\":\"number\"},\"type\":\"array\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Embedding generated successfully\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"Error status\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Bad request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"Error status\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Can also be passed as 'key' query parameter.\",\"in\":\"header\",\"name\":\"x-goog-api-key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/models/{model}:embedContent","segments":[{"lit":"models"},{"lit":"{model}:embedContent"}],"select":{"exist":["key","model"]},"transform":{"req":"`reqdata`","res":"`body.embedding`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"embed_content","name__orig":"embed_content","Name":"EmbedContent","name_":"embed_content","name-":"embed-content","NAME":"EMBED_CONTENT","index$":0}, {"active":true,"entity":"embed_content","key$":"BasicEmbedContentFlow","kind":"basic","name":"BasicEmbedContentFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"embed_content_ref01"},"match":{"model":"model01"},"op":"create","spec":[],"valid":[],"index$":0}]}, 'EmbedContent')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const embed_content_ref01_ent = client.EmbedContent()
    let embed_content_ref01_data = setup.data.new.embed_content['embed_content_ref01']
    embed_content_ref01_data['model'] = setup.idmap['model01']

    embed_content_ref01_data = (await embed_content_ref01_ent.create(embed_content_ref01_data)).data()
    assert(null != embed_content_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/embed_content/EmbedContentTestData.json')

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
    ['embed_content01','embed_content02','embed_content03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GEMINI_TEST_EMBED_CONTENT_ENTID': idmap,
    'GEMINI_TEST_LIVE': 'FALSE',
    'GEMINI_TEST_EXPLAIN': 'FALSE',
    'GEMINI_APIKEY': '',
  })

  idmap = env['GEMINI_TEST_EMBED_CONTENT_ENTID']

  const live = 'TRUE' === env.GEMINI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GEMINI_TEST_EMBED_CONTENT_ENTID']
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
  
