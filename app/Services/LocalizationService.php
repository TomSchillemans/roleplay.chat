<?php

namespace App\Services;

use Illuminate\Support\Facades\File;

class LocalizationService
{
    /**
     * Get the available locales by scanning the lang directory.
     *
     * @return array<int, string>
     */
    public function getAvailableLocales(): array
    {
        if (!File::exists(lang_path())) {
            return []; // Return empty array if lang path doesn't exist
        }

        $directories = File::directories(lang_path());

        return collect($directories)
            ->map(fn ($directory) => basename($directory))
            ->filter(fn ($locale) => $this->isValidLocaleFormat($locale))
            ->values()
            ->all();
    }

    /**
     * Validate the locale format (e.g., 'en', 'en_US').
     *
     * @param string $locale
     * @return bool
     */
    protected function isValidLocaleFormat(string $locale): bool
    {
        // Basic check for 'en' or 'en_US' style formats.
        // preg_match checks for two lowercase letters, optionally followed by
        // an underscore and two uppercase letters.
        return preg_match('/^[a-z]{2}(_[A-Z]{2})?$/', $locale) === 1;
    }
}
