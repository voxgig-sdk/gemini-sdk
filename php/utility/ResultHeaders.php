<?php
declare(strict_types=1);

// Gemini SDK utility: result_headers

class GeminiResultHeaders
{
    public static function call(GeminiContext $ctx): ?GeminiResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
