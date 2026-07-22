<?php
declare(strict_types=1);

// Typed models for the Gemini SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** EmbedContent entity data model. */
class EmbedContent
{
    public array $content;
    public ?array $embedding = null;
    public ?string $task_type = null;
    public ?string $title = null;
}

/** Request payload for EmbedContent#create. */
class EmbedContentCreateData
{
    public string $model;
}

/** GenerateContent entity data model. */
class GenerateContent
{
    public ?array $candidate = null;
    public array $content;
    public ?array $generation_config = null;
    public ?array $prompt_feedback = null;
    public ?array $safety_setting = null;
    public ?array $tool = null;
    public ?array $usage_metadata = null;
}

/** Request payload for GenerateContent#create. */
class GenerateContentCreateData
{
    public string $model;
}

/** Interaction entity data model. */
class Interaction
{
    public ?array $config = null;
    public string $input;
    public ?array $metadata = null;
    public string $model;
    public ?string $output_text = null;
}

/** Request payload for Interaction#create. */
class InteractionCreateData
{
    public ?array $config = null;
    public string $input;
    public ?array $metadata = null;
    public string $model;
    public ?string $output_text = null;
}

/** ListModel entity data model. */
class ListModel
{
}

/** Model entity data model. */
class Model
{
    public ?string $description = null;
    public ?string $display_name = null;
    public ?int $input_token_limit = null;
    public ?string $name = null;
    public ?int $output_token_limit = null;
    public ?array $supported_generation_method = null;
    public ?string $version = null;
}

/** Request payload for Model#load. */
class ModelLoadMatch
{
    public string $id;
}

/** Request payload for Model#list. */
class ModelListMatch
{
    public ?string $description = null;
    public ?string $display_name = null;
    public ?int $input_token_limit = null;
    public ?string $name = null;
    public ?int $output_token_limit = null;
    public ?array $supported_generation_method = null;
    public ?string $version = null;
}

