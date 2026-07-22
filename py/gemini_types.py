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
    embedding: dict
    task_type: str
    title: str


class EmbedContentCreateData(TypedDict):
    model: str


class GenerateContentRequired(TypedDict):
    content: list


class GenerateContent(GenerateContentRequired, total=False):
    candidate: list
    generation_config: dict
    prompt_feedback: dict
    safety_setting: list
    tool: list
    usage_metadata: dict


class GenerateContentCreateData(TypedDict):
    model: str


class InteractionRequired(TypedDict):
    input: str
    model: str


class Interaction(InteractionRequired, total=False):
    config: dict
    metadata: dict
    output_text: str


class InteractionCreateDataRequired(TypedDict):
    input: str
    model: str


class InteractionCreateData(InteractionCreateDataRequired, total=False):
    config: dict
    metadata: dict
    output_text: str


class ListModel(TypedDict):
    pass


class Model(TypedDict, total=False):
    description: str
    display_name: str
    input_token_limit: int
    name: str
    output_token_limit: int
    supported_generation_method: list
    version: str


class ModelLoadMatch(TypedDict):
    id: str


class ModelListMatch(TypedDict, total=False):
    description: str
    display_name: str
    input_token_limit: int
    name: str
    output_token_limit: int
    supported_generation_method: list
    version: str
