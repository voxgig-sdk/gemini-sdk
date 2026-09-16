# Gemini SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module GeminiFeatures
  def self.make_feature(name)
    case name
    when "base"
      GeminiBaseFeature.new
    when "ratelimit"
      GeminiRatelimitFeature.new
    when "retry"
      GeminiRetryFeature.new
    when "test"
      GeminiTestFeature.new
    when "timeout"
      GeminiTimeoutFeature.new
    else
      GeminiBaseFeature.new
    end
  end
end
