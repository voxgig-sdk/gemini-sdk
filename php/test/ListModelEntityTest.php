<?php
declare(strict_types=1);

// ListModel entity test

require_once __DIR__ . '/../gemini_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ListModelEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = GeminiSDK::test(null, null);
        $ent = $testsdk->ListModel(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = list_model_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach ([] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "list_model." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set GEMINI_TEST_LIST_MODEL_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $list_model_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.list_model")));
        $list_model_ref01_data = null;
        if (count($list_model_ref01_data_raw) > 0) {
            $list_model_ref01_data = Helpers::to_map($list_model_ref01_data_raw[0][1]);
        }

    }
}

function list_model_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/list_model/ListModelTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = GeminiSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["list_model01", "list_model02", "list_model03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("GEMINI_TEST_LIST_MODEL_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "GEMINI_TEST_LIST_MODEL_ENTID" => $idmap,
        "GEMINI_TEST_LIVE" => "FALSE",
        "GEMINI_TEST_EXPLAIN" => "FALSE",
        "GEMINI_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["GEMINI_TEST_LIST_MODEL_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["GEMINI_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["GEMINI_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new GeminiSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["GEMINI_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["GEMINI_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
