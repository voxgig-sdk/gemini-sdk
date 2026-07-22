package core

type GeminiError struct {
	IsGeminiError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewGeminiError(code string, msg string, ctx *Context) *GeminiError {
	return &GeminiError{
		IsGeminiError: true,
		Sdk:              "Gemini",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *GeminiError) Error() string {
	return e.Msg
}
