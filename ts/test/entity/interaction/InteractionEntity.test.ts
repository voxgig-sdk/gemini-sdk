

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


describe('InteractionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GEMINI_TEST_LIVE=TRUE.
  afterEach(liveDelay('GEMINI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GeminiSDK.test()
    const ent = testsdk.Interaction()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GEMINI_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'interaction.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"config","req":false,"short":"Optional configuration parameters for the interaction","type":"`$OBJECT`","index$":0},{"active":true,"name":"input","req":true,"short":"The input prompt or query","type":"`$STRING`","index$":1},{"active":true,"name":"model","req":true,"short":"The model to use for the interaction","type":"`$STRING`","index$":2}],"name":"interaction","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /interactions","json":"{\"operationId\":\"createInteraction\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"textGeneration\":{\"summary\":\"Simple text generation\",\"value\":{\"input\":\"Explain how AI works in a few words\",\"model\":\"gemini-3.6-flash\"}}},\"schema\":{\"properties\":{\"config\":{\"description\":\"Optional configuration parameters for the interaction\",\"type\":\"object\"},\"input\":{\"description\":\"The input prompt or query\",\"example\":\"Explain how AI works in a few words\",\"type\":\"string\"},\"model\":{\"description\":\"The model to use for the interaction\",\"example\":\"gemini-3.6-flash\",\"type\":\"string\"}},\"required\":[\"model\",\"input\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"metadata\":{\"description\":\"Additional metadata about the interaction\",\"type\":\"object\"},\"output_text\":{\"description\":\"The generated text output from the model\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful interaction creation\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"Error status\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid input parameters\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"Error status\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - Invalid or missing API key\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"Error status\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"type\":\"integer\"},\"details\":{\"description\":\"Additional error details\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"Error status\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Can also be passed as 'key' query parameter.\",\"in\":\"header\",\"name\":\"x-goog-api-key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/interactions","segments":[{"lit":"interactions"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.metadata`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"interaction","name__orig":"interaction","Name":"Interaction","name_":"interaction","name-":"interaction","NAME":"INTERACTION","index$":2}, {"active":true,"entity":"interaction","key$":"BasicInteractionFlow","kind":"basic","name":"BasicInteractionFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"interaction_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Interaction')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const interaction_ref01_ent = client.Interaction()
    let interaction_ref01_data = setup.data.new.interaction['interaction_ref01']

    interaction_ref01_data = (await interaction_ref01_ent.create(interaction_ref01_data)).data()
    assert(null != interaction_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/interaction/InteractionTestData.json')

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
    ['interaction01','interaction02','interaction03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GEMINI_TEST_INTERACTION_ENTID': idmap,
    'GEMINI_TEST_LIVE': 'FALSE',
    'GEMINI_TEST_EXPLAIN': 'FALSE',
    'GEMINI_APIKEY': '',
  })

  idmap = env['GEMINI_TEST_INTERACTION_ENTID']

  const live = 'TRUE' === env.GEMINI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GEMINI_TEST_INTERACTION_ENTID']
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
  
