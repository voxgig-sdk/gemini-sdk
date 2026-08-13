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
    public ?string $taskType = null;
    public ?string $title = null;
    public ?array $values = null;
}

/** Request payload for EmbedContent#create. */
class EmbedContentCreateData
{
    public string $model;
    public array $content;
    public ?string $taskType = null;
    public ?string $title = null;
    public ?array $values = null;
}

/** GenerateContent entity data model. */
class GenerateContent
{
    public ?array $candidates = null;
    public array $contents;
    public ?array $generationConfig = null;
    public ?array $promptFeedback = null;
    public ?array $safetySettings = null;
    public ?array $tools = null;
    public ?array $usageMetadata = null;
}

/** Request payload for GenerateContent#create. */
class GenerateContentCreateData
{
    public string $model;
    public ?array $candidates = null;
    public array $contents;
    public ?array $generationConfig = null;
    public ?array $promptFeedback = null;
    public ?array $safetySettings = null;
    public ?array $tools = null;
    public ?array $usageMetadata = null;
}

/** Interaction entity data model. */
class Interaction
{
    public ?array $config = null;
    public string $input;
    public string $model;
}

/** Request payload for Interaction#create. */
class InteractionCreateData
{
    public ?array $config = null;
    public string $input;
    public string $model;
}

/** ListModel entity data model. */
class ListModel
{
}

/** Model entity data model. */
class Model
{
    public ?string $description = null;
    public ?string $displayName = null;
    public ?int $inputTokenLimit = null;
    public ?string $name = null;
    public ?int $outputTokenLimit = null;
    public ?array $supportedGenerationMethods = null;
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
    public ?string $displayName = null;
    public ?int $inputTokenLimit = null;
    public ?string $name = null;
    public ?int $outputTokenLimit = null;
    public ?array $supportedGenerationMethods = null;
    public ?string $version = null;
}

