<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\App;
use App\Services\LocalizationService;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Language Switcher Route
Route::get('/language/{locale}', function ($locale) {
    $localizationService = new LocalizationService();
    $availableLocales = $localizationService->getAvailableLocales();
    
    if (in_array($locale, $availableLocales)) {
        session(['locale' => $locale]);
        App::setLocale($locale); // Set locale for the current request
    }
    return redirect()->back();
})->name('language.switch');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
