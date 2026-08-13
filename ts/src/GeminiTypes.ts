// Typed models for the Gemini SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface EmbedContent {
  content: Record<string, any>
  taskType?: string
  title?: string
  values?: any[]
}

export interface EmbedContentCreateData {
  model: string
  content: Record<string, any>
  taskType?: string
  title?: string
  values?: any[]
}

export interface GenerateContent {
  candidates?: any[]
  contents: any[]
  generationConfig?: Record<string, any>
  promptFeedback?: Record<string, any>
  safetySettings?: any[]
  tools?: any[]
  usageMetadata?: Record<string, any>
}

export interface GenerateContentCreateData {
  model: string
  candidates?: any[]
  contents: any[]
  generationConfig?: Record<string, any>
  promptFeedback?: Record<string, any>
  safetySettings?: any[]
  tools?: any[]
  usageMetadata?: Record<string, any>
}

export interface Interaction {
  config?: Record<string, any>
  input: string
  model: string
}

export interface InteractionCreateData {
  config?: Record<string, any>
  input: string
  model: string
}

export interface ListModel {
}

export interface Model {
  description?: string
  displayName?: string
  inputTokenLimit?: number
  name?: string
  outputTokenLimit?: number
  supportedGenerationMethods?: any[]
  version?: string
}

export interface ModelLoadMatch {
  id: string
}

export interface ModelListMatch {
  description?: string
  displayName?: string
  inputTokenLimit?: number
  name?: string
  outputTokenLimit?: number
  supportedGenerationMethods?: any[]
  version?: string
}

