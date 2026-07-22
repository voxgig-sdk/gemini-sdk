<?php
declare(strict_types=1);

// Gemini SDK utility: result_body

class GeminiResultBody
{
    public static function call(GeminiContext $ctx): ?GeminiResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
