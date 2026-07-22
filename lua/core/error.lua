-- Gemini SDK error

local GeminiError = {}
GeminiError.__index = GeminiError


function GeminiError.new(code, msg, ctx)
  local self = setmetatable({}, GeminiError)
  self.is_sdk_error = true
  self.sdk = "Gemini"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function GeminiError:error()
  return self.msg
end


function GeminiError:__tostring()
  return self.msg
end


return GeminiError
