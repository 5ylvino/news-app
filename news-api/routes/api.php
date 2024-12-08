<?php

use App\Http\Controllers\v1\ArticleController;
use App\Http\Controllers\v1\PreferenceController;
use App\Http\Controllers\v1\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->middleware('throttle:api')->group(function () {
    Route::controller(UserController::class)->group(function () {
        Route::post('/register', 'register');
        Route::post('/login', 'login');
    });

    Route::middleware('auth:sanctum')->group(function () {
        Route::controller(PreferenceController::class)->group(function () {
            Route::post('/preference', 'savePreferenceUpdate');
            Route::get('/{user_id}/preferences', 'listOfPreferences');
        });

        Route::get('/articles', [ArticleController::class, 'listOfArticles']);
    });
});
