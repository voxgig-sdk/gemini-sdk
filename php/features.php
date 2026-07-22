<?php
declare(strict_types=1);

// Gemini SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class GeminiFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new GeminiBaseFeature();
            case "test":
                return new GeminiTestFeature();
            default:
                return new GeminiBaseFeature();
        }
    }
}
