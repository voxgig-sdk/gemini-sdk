-- Typed models for the Gemini SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class EmbedContent
---@field content table
---@field taskType? string
---@field title? string
---@field values? table

---@class EmbedContentCreateData
---@field model string
---@field key string
---@field content table
---@field taskType? string
---@field title? string
---@field values? table

---@class GenerateContent
---@field candidates? table
---@field contents table
---@field generationConfig? table
---@field promptFeedback? table
---@field safetySettings? table
---@field tools? table
---@field usageMetadata? table

---@class GenerateContentCreateData
---@field model string
---@field key string
---@field candidates? table
---@field contents table
---@field generationConfig? table
---@field promptFeedback? table
---@field safetySettings? table
---@field tools? table
---@field usageMetadata? table

---@class Interaction
---@field config? table
---@field input string
---@field model string

---@class InteractionCreateData
---@field config? table
---@field input string
---@field model string

---@class ListModel

---@class Model
---@field description? string
---@field displayName? string
---@field id? string
---@field inputTokenLimit? number
---@field name? string
---@field outputTokenLimit? number
---@field supportedGenerationMethods? table
---@field version? string

---@class ModelLoadMatch
---@field id string
---@field key string

---@class ModelListMatch
---@field key string
---@field page_size? number
---@field page_token? string

local M = {}

return M
