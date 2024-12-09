<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\PreferenceRequest;
use App\Http\Resources\SuccessResource;
use App\Models\Preference;
use Illuminate\Support\Facades\Request;

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
     * Show all preferences for the user
     * @param PreferenceRequest $request
     * @return SuccessResource
     */
    public function listOfPreferences(PreferenceRequest $request)
    {
        $preferences = Preference::where('user_id', $request->user_id)
            ->select([
                'id',
                'source',
                'category',
                'author',
            ])
            ->orderBy('created_at', 'desc')
            ->get();

        return SuccessResource::make((object)["data" => $preferences]);
    }

    /**
     * @removePreference
     * Remove a preference for the user
     * @param Request $request
     * @return SuccessResource
     */
    public function removePreference(Request $request, $id)
    {
        $preference = Preference::where('id', $id)
            ->delete();

        return SuccessResource::make((object)["data" => isset($preference), 'message' => 'Removed successfully']);
    }
}
