# Gemini SDK feature factory

from gemini_sdk.feature.base_feature import GeminiBaseFeature
from gemini_sdk.feature.ratelimit_feature import GeminiRatelimitFeature
from gemini_sdk.feature.retry_feature import GeminiRetryFeature
from gemini_sdk.feature.test_feature import GeminiTestFeature
from gemini_sdk.feature.timeout_feature import GeminiTimeoutFeature


_FEATURES = {
    "base": lambda: GeminiBaseFeature(),
    "ratelimit": lambda: GeminiRatelimitFeature(),
    "retry": lambda: GeminiRetryFeature(),
    "test": lambda: GeminiTestFeature(),
    "timeout": lambda: GeminiTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
