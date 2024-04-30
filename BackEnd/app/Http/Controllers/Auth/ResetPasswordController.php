<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\ForgetPasswordRequest;
use App\Http\Requests\Auth\resetPasswordRequest;
use App\Notifications\ResetPasswordVerificationNotification;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Ichtrojan\Otp\Otp;

class ResetPasswordController extends Controller
{
    private $otp;
    public function __construct()
    {
        $this->otp = new otp;
    }

    public function verifycode(resetPasswordRequest $request)
    {

        $otp2 = $this->otp->validate($request->email, $request->otp);
        if (!$otp2->status) {
            return response()->json(["error" => $otp2], 401);
        }
        // $user = User::where("email", $request->email)->first();
        // $user->update(["password" => Hash::make($request->password)]);
        // // $user->token()->delete();
        $success["success"] = true;
        return response()->json($success, 200);
    }
    public function passwordReset(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users',
            "otp" => "required",
            'password' => 'required|string',
        ]);

        // $otp2 = $this->otp->validate($request->email, $request->otp);
        // if (!$otp2->status) {
        //     return response()->json(["error" => $otp2], 401);
        // }
        $user = User::where("email", $request->email)->first();
        $user->update(["password" => Hash::make($request->password)]);
        // $user->token()->delete();
        $success["success"] = true;
        return response()->json($success, 200);
    }
}
