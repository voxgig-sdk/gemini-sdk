# Gemini SDK exists test

require "minitest/autorun"
require_relative "../Gemini_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = GeminiSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
