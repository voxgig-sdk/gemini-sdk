# Typed models for the Gemini SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class EmbedContentRequired(TypedDict):
    content: dict


class EmbedContent(EmbedContentRequired, total=False):
    taskType: str
    title: str
    values: list


class EmbedContentCreateDataRequired(TypedDict):
    model: str
    content: dict


class EmbedContentCreateData(EmbedContentCreateDataRequired, total=False):
    taskType: str
    title: str
    values: list


class GenerateContentRequired(TypedDict):
    contents: list


class GenerateContent(GenerateContentRequired, total=False):
    candidates: list
    generationConfig: dict
    promptFeedback: dict
    safetySettings: list
    tools: list
    usageMetadata: dict


class GenerateContentCreateDataRequired(TypedDict):
    model: str
    contents: list


class GenerateContentCreateData(GenerateContentCreateDataRequired, total=False):
    candidates: list
    generationConfig: dict
    promptFeedback: dict
    safetySettings: list
    tools: list
    usageMetadata: dict


class InteractionRequired(TypedDict):
    input: str
    model: str


class Interaction(InteractionRequired, total=False):
    config: dict


class InteractionCreateDataRequired(TypedDict):
    input: str
    model: str


class InteractionCreateData(InteractionCreateDataRequired, total=False):
    config: dict


class ListModel(TypedDict):
    pass


class Model(TypedDict, total=False):
    description: str
    displayName: str
    inputTokenLimit: int
    name: str
    outputTokenLimit: int
    supportedGenerationMethods: list
    version: str


class ModelLoadMatch(TypedDict):
    id: str


class ModelListMatch(TypedDict, total=False):
    description: str
    displayName: str
    inputTokenLimit: int
    name: str
    outputTokenLimit: int
    supportedGenerationMethods: list
    version: str
