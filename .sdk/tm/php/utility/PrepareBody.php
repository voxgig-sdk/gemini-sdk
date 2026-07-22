<?php
declare(strict_types=1);

// Gemini SDK utility: prepare_body

class GeminiPrepareBody
{
    public static function call(GeminiContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
