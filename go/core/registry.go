package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewEmbedContentEntityFunc func(client *GeminiSDK, entopts map[string]any) GeminiEntity

var NewGenerateContentEntityFunc func(client *GeminiSDK, entopts map[string]any) GeminiEntity

var NewInteractionEntityFunc func(client *GeminiSDK, entopts map[string]any) GeminiEntity

var NewListModelEntityFunc func(client *GeminiSDK, entopts map[string]any) GeminiEntity

var NewModelEntityFunc func(client *GeminiSDK, entopts map[string]any) GeminiEntity

