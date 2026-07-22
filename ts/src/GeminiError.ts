
import { Context } from './Context'


class GeminiError extends Error {

  isGeminiError = true

  sdk = 'Gemini'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  GeminiError
}

