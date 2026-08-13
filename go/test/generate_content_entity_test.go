package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/gemini-sdk/go"
	"github.com/voxgig-sdk/gemini-sdk/go/core"

	vs "github.com/voxgig-sdk/gemini-sdk/go/utility/struct"
)

func TestGenerateContentEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GenerateContent(nil)
		if ent == nil {
			t.Fatal("expected non-nil GenerateContentEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := generate_contentBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "generate_content." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set GEMINI_TEST_GENERATE_CONTENT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		generateContentRef01Ent := client.GenerateContent(nil)
		generateContentRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "generate_content"}, setup.data), "generate_content_ref01"))
		generateContentRef01Data["model"] = setup.idmap["model01"]

		generateContentRef01DataResult, err := generateContentRef01Ent.Create(generateContentRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		generateContentRef01Data = core.ToMapAny(entityData(generateContentRef01DataResult))
		if generateContentRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func generate_contentBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "generate_content", "GenerateContentTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read generate_content test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse generate_content test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"generate_content01", "generate_content02", "generate_content03", "model01", "model02", "model03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("GEMINI_TEST_GENERATE_CONTENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GEMINI_TEST_GENERATE_CONTENT_ENTID": idmap,
		"GEMINI_TEST_LIVE":      "FALSE",
		"GEMINI_TEST_EXPLAIN":   "FALSE",
		"GEMINI_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["GEMINI_TEST_GENERATE_CONTENT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["GEMINI_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["GEMINI_APIKEY"],
			},
			extra,
		})
		client = sdk.NewGeminiSDK(core.ToMapAny(mergedOpts))
	}

	live := env["GEMINI_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["GEMINI_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
