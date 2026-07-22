# Gemini SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module GeminiFeatures
  def self.make_feature(name)
    case name
    when "base"
      GeminiBaseFeature.new
    when "test"
      GeminiTestFeature.new
    else
      GeminiBaseFeature.new
    end
  end
end
