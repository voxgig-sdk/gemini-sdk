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

func TestInteractionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Interaction(nil)
		if ent == nil {
			t.Fatal("expected non-nil InteractionEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := interactionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "interaction." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set GEMINI_TEST_INTERACTION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		interactionRef01Ent := client.Interaction(nil)
		interactionRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "interaction"}, setup.data), "interaction_ref01"))

		interactionRef01DataResult, err := interactionRef01Ent.Create(interactionRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		interactionRef01Data = core.ToMapAny(entityData(interactionRef01DataResult))
		if interactionRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func interactionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "interaction", "InteractionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read interaction test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse interaction test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"interaction01", "interaction02", "interaction03"},
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
	entidEnvRaw := os.Getenv("GEMINI_TEST_INTERACTION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GEMINI_TEST_INTERACTION_ENTID": idmap,
		"GEMINI_TEST_LIVE":      "FALSE",
		"GEMINI_TEST_EXPLAIN":   "FALSE",
		"GEMINI_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["GEMINI_TEST_INTERACTION_ENTID"])
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
