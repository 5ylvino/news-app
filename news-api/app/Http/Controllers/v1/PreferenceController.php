<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\PreferenceRequest;
use App\Http\Resources\SuccessResource;
use App\Models\Preference;

class PreferenceController extends Controller
{
    /**
     * @savePreferenceUpdate
     * Handles saving of preferences
     * @param PreferenceRequest $request
     * @return PreferenceResource
     */
    public function savePreferenceUpdate(PreferenceRequest $request)
    {
        $preference = Preference::create($request->all());

        return SuccessResource::make((object)["data" => $preference->only([
            'source',
            'category',
            'author',
        ]), "message" => "Added to preference"]);
    }

    /**
     * @listOfPreferences
     * Show all preferences from the user
     * @param PreferenceRequest $request
     * @return SuccessResource
     */
    public function listOfPreferences(PreferenceRequest $request)
    {
        $preferences = Preference::where('user_id', $request->user_id)
            ->select([
                'source',
                'category',
                'author',
            ])
            ->orderBy('created_at', 'desc')
            ->get();

        return SuccessResource::make((object)["data" => $preferences]);
    }
}
