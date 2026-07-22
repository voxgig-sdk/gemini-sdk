package voxgiggeminisdk

import (
	"github.com/voxgig-sdk/gemini-sdk/go/core"
	"github.com/voxgig-sdk/gemini-sdk/go/entity"
	"github.com/voxgig-sdk/gemini-sdk/go/feature"
	_ "github.com/voxgig-sdk/gemini-sdk/go/utility"
)

// Type aliases preserve external API.
type GeminiSDK = core.GeminiSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type GeminiEntity = core.GeminiEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type GeminiError = core.GeminiError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewEmbedContentEntityFunc = func(client *core.GeminiSDK, entopts map[string]any) core.GeminiEntity {
		return entity.NewEmbedContentEntity(client, entopts)
	}
	core.NewGenerateContentEntityFunc = func(client *core.GeminiSDK, entopts map[string]any) core.GeminiEntity {
		return entity.NewGenerateContentEntity(client, entopts)
	}
	core.NewInteractionEntityFunc = func(client *core.GeminiSDK, entopts map[string]any) core.GeminiEntity {
		return entity.NewInteractionEntity(client, entopts)
	}
	core.NewListModelEntityFunc = func(client *core.GeminiSDK, entopts map[string]any) core.GeminiEntity {
		return entity.NewListModelEntity(client, entopts)
	}
	core.NewModelEntityFunc = func(client *core.GeminiSDK, entopts map[string]any) core.GeminiEntity {
		return entity.NewModelEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewGeminiSDK = core.NewGeminiSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewGeminiSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *GeminiSDK  { return NewGeminiSDK(nil) }
func Test() *GeminiSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
