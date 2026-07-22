# ListModel entity test

require "minitest/autorun"
require "json"
require_relative "../Gemini_sdk"
require_relative "runner"

class ListModelEntityTest < Minitest::Test
  def test_create_instance
    testsdk = GeminiSDK.test(nil, nil)
    ent = testsdk.ListModel(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = list_model_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    [].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "list_model." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set GEMINI_TEST_LIST_MODEL_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    list_model_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.list_model")))
    list_model_ref01_data = nil
    if list_model_ref01_data_raw.length > 0
      list_model_ref01_data = Helpers.to_map(list_model_ref01_data_raw[0][1])
    end

  end
end

def list_model_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "list_model", "ListModelTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = GeminiSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["list_model01", "list_model02", "list_model03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["GEMINI_TEST_LIST_MODEL_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "GEMINI_TEST_LIST_MODEL_ENTID" => idmap,
    "GEMINI_TEST_LIVE" => "FALSE",
    "GEMINI_TEST_EXPLAIN" => "FALSE",
    "GEMINI_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["GEMINI_TEST_LIST_MODEL_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["GEMINI_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["GEMINI_APIKEY"],
      },
      extra || {},
    ])
    client = GeminiSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["GEMINI_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["GEMINI_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
