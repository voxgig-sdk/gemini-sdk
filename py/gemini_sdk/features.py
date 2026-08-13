# Gemini SDK feature factory

from gemini_sdk.feature.base_feature import GeminiBaseFeature
from gemini_sdk.feature.test_feature import GeminiTestFeature


def _make_feature(name):
    features = {
        "base": lambda: GeminiBaseFeature(),
        "test": lambda: GeminiTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
