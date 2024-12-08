<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

        if (config('app.env') === 'production') {
            URL::forceScheme('https');
        }

        RateLimiter::for('api', function (Request $request) {
            if (!$request->bearerToken()) {
                return Limit::perMinute(20)->by($request->ip());
            }

            return [
                Limit::perMinute(100)->by('minute:' . $request->bearerToken()),
                Limit::perDay(1000)->by('day:' . $request->bearerToken()),
            ];
        });
    }
}
