<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'locale' => fn () => app()->getLocale(),
            'available_locales' => fn () => app(\App\Services\LocalizationService::class)->getAvailableLocales(),
            'translations' => function() {
                $locale = app()->getLocale();
                $phpTranslations = [];
                if (is_dir(lang_path($locale))) {
                    $phpTranslations = collect(scandir(lang_path($locale)))
                        ->filter(fn ($file) => pathinfo($file, PATHINFO_EXTENSION) === 'php')
                        ->mapWithKeys(fn ($file) => [
                            basename($file, '.php') => require lang_path($locale . '/' . $file)
                        ])
                        ->all();
                }
                $jsonTranslations = [];
                if (file_exists(lang_path($locale . '.json'))) {
                    $jsonTranslations = json_decode(file_get_contents(lang_path($locale . '.json')), true) ?? [];
                }
                return array_merge($phpTranslations, $jsonTranslations);
            },
        ];
    }
}
