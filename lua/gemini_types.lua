-- Typed models for the Gemini SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class EmbedContent
---@field content table
---@field embedding? table
---@field task_type? string
---@field title? string

---@class EmbedContentCreateData
---@field model string

---@class GenerateContent
---@field candidate? table
---@field content table
---@field generation_config? table
---@field prompt_feedback? table
---@field safety_setting? table
---@field tool? table
---@field usage_metadata? table

---@class GenerateContentCreateData
---@field model string

---@class Interaction
---@field config? table
---@field input string
---@field metadata? table
---@field model string
---@field output_text? string

---@class InteractionCreateData
---@field config? table
---@field input string
---@field metadata? table
---@field model string
---@field output_text? string

---@class ListModel

---@class Model
---@field description? string
---@field display_name? string
---@field input_token_limit? number
---@field name? string
---@field output_token_limit? number
---@field supported_generation_method? table
---@field version? string

---@class ModelLoadMatch
---@field id string

---@class ModelListMatch
---@field description? string
---@field display_name? string
---@field input_token_limit? number
---@field name? string
---@field output_token_limit? number
---@field supported_generation_method? table
---@field version? string

local M = {}

return M
