<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\ForgetPasswordRequest;
use App\Notifications\ResetPasswordVerificationNotification;
use App\Models\User;

class ForgetPasswordController extends Controller
{
    public function forgotPassword(ForgetPasswordRequest $request)
    {
        $input = $request->email;

        $user = User::where("email", $input)->first();
        $user->notify(new ResetPasswordVerificationNotification());
        $success["success"] = true;
        return response()->json($success, 200);
    }
}
