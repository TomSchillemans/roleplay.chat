<?php

namespace App\Providers;

use App\Services\LocalizationService;
use Illuminate\Contracts\Support\DeferrableProvider;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider implements DeferrableProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(LocalizationService::class, concrete: fn (): LocalizationService => new LocalizationService());
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array<int, string>
     */
    public function provides(): array
    {
        return [LocalizationService::class];
    }
}
