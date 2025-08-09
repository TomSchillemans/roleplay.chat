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
     * Get locale display names from each locale's common.php (key: 'language_name').
     * Fallback to uppercased code when missing.
     *
     * @return array<string, string>
     */
    public function getLocaleDisplayNames(): array
    {
        $locales = $this->getAvailableLocales();
        $result = [];
        foreach ($locales as $locale) {
            $name = null;
            $commonPath = lang_path($locale . DIRECTORY_SEPARATOR . 'common.php');
            if (file_exists($commonPath)) {
                $arr = require $commonPath;
                if (is_array($arr) && isset($arr['language_name']) && is_string($arr['language_name'])) {
                    $name = $arr['language_name'];
                }
            }
            $result[$locale] = $name ?: strtoupper($locale);
        }
        return $result;
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
