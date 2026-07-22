
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { GeminiSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await GeminiSDK.test()
    equal(null !== testsdk, true)
  })

})
