<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\App;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Language Switcher Route
Route::get('/language/{locale}', function ($locale) {
    if (in_array($locale, ['en', 'de', 'fr', 'es'])) {
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
