<?php
declare(strict_types=1);

// Gemini SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class GeminiMakeContext
{
    public static function call(array $ctxmap, ?GeminiContext $basectx): GeminiContext
    {
        return new GeminiContext($ctxmap, $basectx);
    }
}
