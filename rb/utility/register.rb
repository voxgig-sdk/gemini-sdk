# Gemini SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

GeminiUtility.registrar = ->(u) {
  u.clean = GeminiUtilities::Clean
  u.done = GeminiUtilities::Done
  u.make_error = GeminiUtilities::MakeError
  u.feature_add = GeminiUtilities::FeatureAdd
  u.feature_hook = GeminiUtilities::FeatureHook
  u.feature_init = GeminiUtilities::FeatureInit
  u.fetcher = GeminiUtilities::Fetcher
  u.make_fetch_def = GeminiUtilities::MakeFetchDef
  u.make_context = GeminiUtilities::MakeContext
  u.make_options = GeminiUtilities::MakeOptions
  u.make_request = GeminiUtilities::MakeRequest
  u.make_response = GeminiUtilities::MakeResponse
  u.make_result = GeminiUtilities::MakeResult
  u.make_point = GeminiUtilities::MakePoint
  u.make_spec = GeminiUtilities::MakeSpec
  u.make_url = GeminiUtilities::MakeUrl
  u.param = GeminiUtilities::Param
  u.prepare_auth = GeminiUtilities::PrepareAuth
  u.prepare_body = GeminiUtilities::PrepareBody
  u.prepare_headers = GeminiUtilities::PrepareHeaders
  u.prepare_method = GeminiUtilities::PrepareMethod
  u.prepare_params = GeminiUtilities::PrepareParams
  u.prepare_path = GeminiUtilities::PreparePath
  u.prepare_query = GeminiUtilities::PrepareQuery
  u.graphql_body = GeminiUtilities::GraphqlBody
  u.graphql_errors = GeminiUtilities::GraphqlErrors
  u.result_basic = GeminiUtilities::ResultBasic
  u.result_body = GeminiUtilities::ResultBody
  u.result_headers = GeminiUtilities::ResultHeaders
  u.transform_request = GeminiUtilities::TransformRequest
  u.transform_response = GeminiUtilities::TransformResponse
}
