# Gemini SDK utility: make_context

from gemini_sdk.core.context import GeminiContext


def make_context_util(ctxmap, basectx):
    return GeminiContext(ctxmap, basectx)
