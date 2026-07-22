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
# @!attribute [rw] embedding
#   @return [Hash, nil]
#
# @!attribute [rw] task_type
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
EmbedContent = Struct.new(
  :content,
  :embedding,
  :task_type,
  :title,
  keyword_init: true
)

# Request payload for EmbedContent#create.
#
# @!attribute [rw] model
#   @return [String]
EmbedContentCreateData = Struct.new(
  :model,
  keyword_init: true
)

# GenerateContent entity data model.
#
# @!attribute [rw] candidate
#   @return [Array, nil]
#
# @!attribute [rw] content
#   @return [Array]
#
# @!attribute [rw] generation_config
#   @return [Hash, nil]
#
# @!attribute [rw] prompt_feedback
#   @return [Hash, nil]
#
# @!attribute [rw] safety_setting
#   @return [Array, nil]
#
# @!attribute [rw] tool
#   @return [Array, nil]
#
# @!attribute [rw] usage_metadata
#   @return [Hash, nil]
GenerateContent = Struct.new(
  :candidate,
  :content,
  :generation_config,
  :prompt_feedback,
  :safety_setting,
  :tool,
  :usage_metadata,
  keyword_init: true
)

# Request payload for GenerateContent#create.
#
# @!attribute [rw] model
#   @return [String]
GenerateContentCreateData = Struct.new(
  :model,
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
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] model
#   @return [String]
#
# @!attribute [rw] output_text
#   @return [String, nil]
Interaction = Struct.new(
  :config,
  :input,
  :metadata,
  :model,
  :output_text,
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
# @!attribute [rw] metadata
#   @return [Hash, nil]
#
# @!attribute [rw] model
#   @return [String]
#
# @!attribute [rw] output_text
#   @return [String, nil]
InteractionCreateData = Struct.new(
  :config,
  :input,
  :metadata,
  :model,
  :output_text,
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
# @!attribute [rw] display_name
#   @return [String, nil]
#
# @!attribute [rw] input_token_limit
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] output_token_limit
#   @return [Integer, nil]
#
# @!attribute [rw] supported_generation_method
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
Model = Struct.new(
  :description,
  :display_name,
  :input_token_limit,
  :name,
  :output_token_limit,
  :supported_generation_method,
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
# @!attribute [rw] display_name
#   @return [String, nil]
#
# @!attribute [rw] input_token_limit
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] output_token_limit
#   @return [Integer, nil]
#
# @!attribute [rw] supported_generation_method
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
ModelListMatch = Struct.new(
  :description,
  :display_name,
  :input_token_limit,
  :name,
  :output_token_limit,
  :supported_generation_method,
  :version,
  keyword_init: true
)

