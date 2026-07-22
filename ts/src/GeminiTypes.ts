// Typed models for the Gemini SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface EmbedContent {
  content: Record<string, any>
  embedding?: Record<string, any>
  task_type?: string
  title?: string
}

export interface EmbedContentCreateData {
  model: string
}

export interface GenerateContent {
  candidate?: any[]
  content: any[]
  generation_config?: Record<string, any>
  prompt_feedback?: Record<string, any>
  safety_setting?: any[]
  tool?: any[]
  usage_metadata?: Record<string, any>
}

export interface GenerateContentCreateData {
  model: string
}

export interface Interaction {
  config?: Record<string, any>
  input: string
  metadata?: Record<string, any>
  model: string
  output_text?: string
}

export interface InteractionCreateData {
  config?: Record<string, any>
  input: string
  metadata?: Record<string, any>
  model: string
  output_text?: string
}

export interface ListModel {
}

export interface Model {
  description?: string
  display_name?: string
  input_token_limit?: number
  name?: string
  output_token_limit?: number
  supported_generation_method?: any[]
  version?: string
}

export interface ModelLoadMatch {
  id: string
}

export interface ModelListMatch {
  description?: string
  display_name?: string
  input_token_limit?: number
  name?: string
  output_token_limit?: number
  supported_generation_method?: any[]
  version?: string
}

