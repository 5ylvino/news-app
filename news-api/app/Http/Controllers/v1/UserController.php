<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Resources\ErrorResource;
use App\Http\Resources\SuccessResource;
use App\Http\Resources\UserAuthResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * @register
     * Handles registering of new user
     * @param UserRegisterRequest $request
     * @return UserAuthResource
     */
    public function register(UserRegisterRequest $request)
    {

        $input = $request->validated();

        $input['password'] = Hash::make($input['password']);
        $user = User::create($input);

        $success = $user;
        $success['preferences'] = $user->preferences;
        $success['token'] =  $user->createToken($user->email)->plainTextToken;

        return SuccessResource::make((object)["data" => $success->only([
            'id',
            'first_name',
            'last_name',
            'email',
            'token',
            'preferences'
        ])]);
    }

    /**
     * @login
     * Handles logged into the application
     * @param UserLoginRequest $request
     * @return UserAuthResource
     */
    public function login(UserLoginRequest $request)
    {
        $input = $request->validated();

        if (!Auth::attempt(['email' => $input['email'], 'password' => $input['password']])) {
            return ErrorResource::make((object)['message' => 'Incorrect credential(s)']);
        }

        $user = Auth::user();
        $success = $user;
        $success['preferences'] = $user->preferences;
        $success['token'] =  $user->createToken($user->email)->plainTextToken;

        return SuccessResource::make((object)["data" => $success->only([
            'id',
            'first_name',
            'last_name',
            'email',
            'token',
            'preferences'
        ])]);
    }
}
