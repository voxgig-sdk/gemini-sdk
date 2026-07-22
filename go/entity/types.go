// Typed models for the Gemini SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// EmbedContent is the typed data model for the embed_content entity.
type EmbedContent struct {
	Content map[string]any `json:"content"`
	Embedding *map[string]any `json:"embedding,omitempty"`
	TaskType *string `json:"task_type,omitempty"`
	Title *string `json:"title,omitempty"`
}

// EmbedContentCreateData is the typed request payload for EmbedContent.CreateTyped.
type EmbedContentCreateData struct {
	Model string `json:"model"`
}

// GenerateContent is the typed data model for the generate_content entity.
type GenerateContent struct {
	Candidate *[]any `json:"candidate,omitempty"`
	Content []any `json:"content"`
	GenerationConfig *map[string]any `json:"generation_config,omitempty"`
	PromptFeedback *map[string]any `json:"prompt_feedback,omitempty"`
	SafetySetting *[]any `json:"safety_setting,omitempty"`
	Tool *[]any `json:"tool,omitempty"`
	UsageMetadata *map[string]any `json:"usage_metadata,omitempty"`
}

// GenerateContentCreateData is the typed request payload for GenerateContent.CreateTyped.
type GenerateContentCreateData struct {
	Model string `json:"model"`
}

// Interaction is the typed data model for the interaction entity.
type Interaction struct {
	Config *map[string]any `json:"config,omitempty"`
	Input string `json:"input"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Model string `json:"model"`
	OutputText *string `json:"output_text,omitempty"`
}

// InteractionCreateData is the typed request payload for Interaction.CreateTyped.
type InteractionCreateData struct {
	Config *map[string]any `json:"config,omitempty"`
	Input string `json:"input"`
	Metadata *map[string]any `json:"metadata,omitempty"`
	Model string `json:"model"`
	OutputText *string `json:"output_text,omitempty"`
}

// ListModel is the typed data model for the list_model entity.
type ListModel struct {
}

// Model is the typed data model for the model entity.
type Model struct {
	Description *string `json:"description,omitempty"`
	DisplayName *string `json:"display_name,omitempty"`
	InputTokenLimit *int `json:"input_token_limit,omitempty"`
	Name *string `json:"name,omitempty"`
	OutputTokenLimit *int `json:"output_token_limit,omitempty"`
	SupportedGenerationMethod *[]any `json:"supported_generation_method,omitempty"`
	Version *string `json:"version,omitempty"`
}

// ModelLoadMatch is the typed request payload for Model.LoadTyped.
type ModelLoadMatch struct {
	Id string `json:"id"`
}

// ModelListMatch is the typed request payload for Model.ListTyped.
type ModelListMatch struct {
	Description *string `json:"description,omitempty"`
	DisplayName *string `json:"display_name,omitempty"`
	InputTokenLimit *int `json:"input_token_limit,omitempty"`
	Name *string `json:"name,omitempty"`
	OutputTokenLimit *int `json:"output_token_limit,omitempty"`
	SupportedGenerationMethod *[]any `json:"supported_generation_method,omitempty"`
	Version *string `json:"version,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
