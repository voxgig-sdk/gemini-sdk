# frozen_string_literal: true

# Typed models for the Gemini SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# EmbedContent entity data model.
#
# @!attribute [rw] content
#   @return [Hash]
#
# @!attribute [rw] taskType
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] values
#   @return [Array, nil]
EmbedContent = Struct.new(
  :content,
  :taskType,
  :title,
  :values,
  keyword_init: true
)

# Request payload for EmbedContent#create.
#
# @!attribute [rw] model
#   @return [String]
#
# @!attribute [rw] content
#   @return [Hash]
#
# @!attribute [rw] taskType
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] values
#   @return [Array, nil]
EmbedContentCreateData = Struct.new(
  :model,
  :content,
  :taskType,
  :title,
  :values,
  keyword_init: true
)

# GenerateContent entity data model.
#
# @!attribute [rw] candidates
#   @return [Array, nil]
#
# @!attribute [rw] contents
#   @return [Array]
#
# @!attribute [rw] generationConfig
#   @return [Hash, nil]
#
# @!attribute [rw] promptFeedback
#   @return [Hash, nil]
#
# @!attribute [rw] safetySettings
#   @return [Array, nil]
#
# @!attribute [rw] tools
#   @return [Array, nil]
#
# @!attribute [rw] usageMetadata
#   @return [Hash, nil]
GenerateContent = Struct.new(
  :candidates,
  :contents,
  :generationConfig,
  :promptFeedback,
  :safetySettings,
  :tools,
  :usageMetadata,
  keyword_init: true
)

# Request payload for GenerateContent#create.
#
# @!attribute [rw] model
#   @return [String]
#
# @!attribute [rw] candidates
#   @return [Array, nil]
#
# @!attribute [rw] contents
#   @return [Array]
#
# @!attribute [rw] generationConfig
#   @return [Hash, nil]
#
# @!attribute [rw] promptFeedback
#   @return [Hash, nil]
#
# @!attribute [rw] safetySettings
#   @return [Array, nil]
#
# @!attribute [rw] tools
#   @return [Array, nil]
#
# @!attribute [rw] usageMetadata
#   @return [Hash, nil]
GenerateContentCreateData = Struct.new(
  :model,
  :candidates,
  :contents,
  :generationConfig,
  :promptFeedback,
  :safetySettings,
  :tools,
  :usageMetadata,
  keyword_init: true
)

# Interaction entity data model.
#
# @!attribute [rw] config
#   @return [Hash, nil]
#
# @!attribute [rw] input
#   @return [String]
#
# @!attribute [rw] model
#   @return [String]
Interaction = Struct.new(
  :config,
  :input,
  :model,
  keyword_init: true
)

# Request payload for Interaction#create.
#
# @!attribute [rw] config
#   @return [Hash, nil]
#
# @!attribute [rw] input
#   @return [String]
#
# @!attribute [rw] model
#   @return [String]
InteractionCreateData = Struct.new(
  :config,
  :input,
  :model,
  keyword_init: true
)

# ListModel entity data model.
class ListModel
end

# Model entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] displayName
#   @return [String, nil]
#
# @!attribute [rw] inputTokenLimit
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] outputTokenLimit
#   @return [Integer, nil]
#
# @!attribute [rw] supportedGenerationMethods
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
Model = Struct.new(
  :description,
  :displayName,
  :inputTokenLimit,
  :name,
  :outputTokenLimit,
  :supportedGenerationMethods,
  :version,
  keyword_init: true
)

# Request payload for Model#load.
#
# @!attribute [rw] id
#   @return [String]
ModelLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Model#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] displayName
#   @return [String, nil]
#
# @!attribute [rw] inputTokenLimit
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] outputTokenLimit
#   @return [Integer, nil]
#
# @!attribute [rw] supportedGenerationMethods
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
ModelListMatch = Struct.new(
  :description,
  :displayName,
  :inputTokenLimit,
  :name,
  :outputTokenLimit,
  :supportedGenerationMethods,
  :version,
  keyword_init: true
)

