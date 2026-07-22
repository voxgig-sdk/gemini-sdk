# Gemini SDK utility: make_context
require_relative '../core/context'
module GeminiUtilities
  MakeContext = ->(ctxmap, basectx) {
    GeminiContext.new(ctxmap, basectx)
  }
end
