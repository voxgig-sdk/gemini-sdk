<?php
declare(strict_types=1);

// Gemini SDK base feature

class GeminiBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(GeminiContext $ctx, array $options): void {}
    public function PostConstruct(GeminiContext $ctx): void {}
    public function PostConstructEntity(GeminiContext $ctx): void {}
    public function SetData(GeminiContext $ctx): void {}
    public function GetData(GeminiContext $ctx): void {}
    public function GetMatch(GeminiContext $ctx): void {}
    public function SetMatch(GeminiContext $ctx): void {}
    public function PrePoint(GeminiContext $ctx): void {}
    public function PreSpec(GeminiContext $ctx): void {}
    public function PreRequest(GeminiContext $ctx): void {}
    public function PreResponse(GeminiContext $ctx): void {}
    public function PreResult(GeminiContext $ctx): void {}
    public function PreDone(GeminiContext $ctx): void {}
    public function PreUnexpected(GeminiContext $ctx): void {}
}
