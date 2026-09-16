

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


describe('ModelEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GEMINI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GEMINI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GeminiSDK.test()
    const ent = testsdk.Model()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GEMINI_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'model.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"description","req":false,"short":"Model description","type":"`$STRING`","index$":0},{"active":true,"name":"displayName","req":false,"short":"Human-readable model name","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"inputTokenLimit","req":false,"short":"Maximum input tokens","type":"`$INTEGER`","index$":3},{"active":true,"name":"name","req":false,"short":"Model resource name","type":"`$STRING`","index$":4},{"active":true,"name":"outputTokenLimit","req":false,"short":"Maximum output tokens","type":"`$INTEGER`","index$":5},{"active":true,"name":"supportedGenerationMethods","req":false,"short":"Supported generation methods","type":"`$ARRAY`","index$":6},{"active":true,"name":"version","req":false,"short":"Model version","type":"`$STRING`","index$":7}],"id":{"field":"id","name":"id"},"name":"model","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"key","orig":"key","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"example":50,"kind":"query","name":"page_size","orig":"page_size","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"kind":"query","name":"page_token","orig":"page_token","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /models","json":"{\"operationId\":\"listModels\",\"parameters\":[{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Maximum number of models to return\",\"in\":\"query\",\"name\":\"pageSize\",\"required\":false,\"schema\":{\"default\":50,\"type\":\"integer\"}},{\"description\":\"Token for pagination\",\"in\":\"query\",\"name\":\"pageToken\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"models\":{\"items\":{\"properties\":{\"description\":{\"description\":\"Model description\",\"type\":\"string\"},\"displayName\":{\"description\":\"Human-readable model name\",\"type\":\"string\"},\"inputTokenLimit\":{\"description\":\"Maximum input tokens\",\"type\":\"integer\"},\"name\":{\"description\":\"Model resource name\",\"type\":\"string\"},\"outputTokenLimit\":{\"description\":\"Maximum output tokens\",\"type\":\"integer\"},\"supportedGenerationMethods\":{\"description\":\"Supported generation methods\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"version\":{\"description\":\"Model version\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"nextPageToken\":{\"description\":\"Token for next page of results\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"List of available models\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"Error status\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Can also be passed as 'key' query parameter.\",\"in\":\"header\",\"name\":\"x-goog-api-key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/models","segments":[{"lit":"models"}],"select":{"exist":["key","page_size","page_token"]},"transform":{"req":"`reqdata`","res":"`body.models`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"gemini-3.6-flash","kind":"param","name":"id","orig":"model","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"key","orig":"key","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /models/{model}","json":"{\"operationId\":\"getModel\",\"parameters\":[{\"description\":\"The model identifier\",\"in\":\"path\",\"name\":\"model\",\"required\":true,\"schema\":{\"example\":\"gemini-3.6-flash\",\"type\":\"string\"}},{\"description\":\"API key for authentication\",\"in\":\"query\",\"name\":\"key\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"description\":{\"description\":\"Model description\",\"type\":\"string\"},\"displayName\":{\"description\":\"Human-readable model name\",\"type\":\"string\"},\"inputTokenLimit\":{\"description\":\"Maximum input tokens\",\"type\":\"integer\"},\"name\":{\"description\":\"Model resource name\",\"type\":\"string\"},\"outputTokenLimit\":{\"description\":\"Maximum output tokens\",\"type\":\"integer\"},\"supportedGenerationMethods\":{\"description\":\"Supported generation methods\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"version\":{\"description\":\"Model version\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Model details\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"Error status\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"Error status\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Model not found\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Can also be passed as 'key' query parameter.\",\"in\":\"header\",\"name\":\"x-goog-api-key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/models/{model}","rename":{"param":{"model":"id"}},"segments":[{"lit":"models"},{"var":"id"}],"select":{"exist":["id","key"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"model","name__orig":"model","Name":"Model","name_":"model","name-":"model","NAME":"MODEL","index$":4}, {"active":true,"entity":"model","key$":"BasicModelFlow","kind":"basic","name":"BasicModelFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"model_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"model_ref01","srcdatavar":"model_ref01_data","suffix":"_dt0"},"match":{"id":"model01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-model_ref01"}}],"index$":1}]}, 'Model')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let model_ref01_data = Object.values(setup.data.existing.model)[0] as any

    // LIST
    const model_ref01_ent = client.Model()
    const model_ref01_match: any = {}

    const model_ref01_list = (await model_ref01_ent.list(model_ref01_match)).map((e: any) => e.data())


    // LOAD
    const model_ref01_match_dt0: any = {}
    model_ref01_match_dt0.id = model_ref01_data.id
    const model_ref01_data_dt0 = (await model_ref01_ent.load(model_ref01_match_dt0)).data()
    assert(model_ref01_data_dt0.id === model_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/model/ModelTestData.json')

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
    ['model01','model02','model03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GEMINI_TEST_MODEL_ENTID': idmap,
    'GEMINI_TEST_LIVE': 'FALSE',
    'GEMINI_TEST_EXPLAIN': 'FALSE',
    'GEMINI_APIKEY': '',
  })

  idmap = env['GEMINI_TEST_MODEL_ENTID']

  const live = 'TRUE' === env.GEMINI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GEMINI_TEST_MODEL_ENTID']
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
  
