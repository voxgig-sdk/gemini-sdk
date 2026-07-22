# Gemini SDK utility: make_context

from core.context import GeminiContext


def make_context_util(ctxmap, basectx):
    return GeminiContext(ctxmap, basectx)
