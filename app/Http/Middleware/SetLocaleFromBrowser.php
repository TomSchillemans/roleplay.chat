<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class SetLocaleFromBrowser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next)
    {
        $supportedLocales = ['en', 'de', 'fr', 'es'];
        $defaultLocale = 'en'; // Your default locale

        if (Session::has('locale') && in_array(Session::get('locale'), $supportedLocales)) {
            App::setLocale(Session::get('locale'));
        } else {
            // Parse HTTP_ACCEPT_LANGUAGE, take the first preferred language
            $browserLocaleFull = $request->server('HTTP_ACCEPT_LANGUAGE', $defaultLocale);
            $browserLocale = substr($browserLocaleFull, 0, 2);
            
            if (in_array($browserLocale, $supportedLocales)) {
                App::setLocale($browserLocale);
                Session::put('locale', $browserLocale);
            } else {
                App::setLocale($defaultLocale);
                Session::put('locale', $defaultLocale);
            }
        }

        return $next($request);
    }
}
