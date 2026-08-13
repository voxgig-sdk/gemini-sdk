// Typed models for the Gemini SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/gemini-sdk/go/core"
)

// EmbedContent is the typed data model for the embed_content entity.
type EmbedContent struct {
	Content map[string]any `json:"content"`
	TaskType *string `json:"taskType,omitempty"`
	Title *string `json:"title,omitempty"`
	Values *[]any `json:"values,omitempty"`
}

// EmbedContentCreateData is the typed request payload for EmbedContent.CreateTyped.
type EmbedContentCreateData struct {
	Model string `json:"model"`
	Content map[string]any `json:"content"`
	TaskType *string `json:"taskType,omitempty"`
	Title *string `json:"title,omitempty"`
	Values *[]any `json:"values,omitempty"`
}

// GenerateContent is the typed data model for the generate_content entity.
type GenerateContent struct {
	Candidates *[]any `json:"candidates,omitempty"`
	Contents []any `json:"contents"`
	GenerationConfig *map[string]any `json:"generationConfig,omitempty"`
	PromptFeedback *map[string]any `json:"promptFeedback,omitempty"`
	SafetySettings *[]any `json:"safetySettings,omitempty"`
	Tools *[]any `json:"tools,omitempty"`
	UsageMetadata *map[string]any `json:"usageMetadata,omitempty"`
}

// GenerateContentCreateData is the typed request payload for GenerateContent.CreateTyped.
type GenerateContentCreateData struct {
	Model string `json:"model"`
	Candidates *[]any `json:"candidates,omitempty"`
	Contents []any `json:"contents"`
	GenerationConfig *map[string]any `json:"generationConfig,omitempty"`
	PromptFeedback *map[string]any `json:"promptFeedback,omitempty"`
	SafetySettings *[]any `json:"safetySettings,omitempty"`
	Tools *[]any `json:"tools,omitempty"`
	UsageMetadata *map[string]any `json:"usageMetadata,omitempty"`
}

// Interaction is the typed data model for the interaction entity.
type Interaction struct {
	Config *map[string]any `json:"config,omitempty"`
	Input string `json:"input"`
	Model string `json:"model"`
}

// InteractionCreateData is the typed request payload for Interaction.CreateTyped.
type InteractionCreateData struct {
	Config *map[string]any `json:"config,omitempty"`
	Input string `json:"input"`
	Model string `json:"model"`
}

// ListModel is the typed data model for the list_model entity.
type ListModel struct {
}

// Model is the typed data model for the model entity.
type Model struct {
	Description *string `json:"description,omitempty"`
	DisplayName *string `json:"displayName,omitempty"`
	InputTokenLimit *int `json:"inputTokenLimit,omitempty"`
	Name *string `json:"name,omitempty"`
	OutputTokenLimit *int `json:"outputTokenLimit,omitempty"`
	SupportedGenerationMethods *[]any `json:"supportedGenerationMethods,omitempty"`
	Version *string `json:"version,omitempty"`
}

// ModelLoadMatch is the typed request payload for Model.LoadTyped.
type ModelLoadMatch struct {
	Id string `json:"id"`
}

// ModelListMatch is the typed request payload for Model.ListTyped.
type ModelListMatch struct {
	Description *string `json:"description,omitempty"`
	DisplayName *string `json:"displayName,omitempty"`
	InputTokenLimit *int `json:"inputTokenLimit,omitempty"`
	Name *string `json:"name,omitempty"`
	OutputTokenLimit *int `json:"outputTokenLimit,omitempty"`
	SupportedGenerationMethods *[]any `json:"supportedGenerationMethods,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
