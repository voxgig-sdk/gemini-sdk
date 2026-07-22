# ProjectName SDK exists test

import pytest
from gemini_sdk import GeminiSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = GeminiSDK.test(None, None)
        assert testsdk is not None
