<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;


class UserController extends Controller
{
    public function register(StoreUserRequest $request)
    {
        try {
            // Create the user
            $user = User::create([
                'email' => $request->email,
                'username' => $request->username,
                'birth_date' => $request->birth_date,
                'gender' => $request->gender,
                'city' => $request->city,
                'phone' => $request->phone,
                'password' => bcrypt($request->password),
            ]);

            // Create a token for the user
            $token = $user->createToken("usertoken")->plainTextToken;

            // Return the user and token in the response
            return response()->json([
                "user" => $user,
                'token' => $token
            ], 201);
        } catch (\Exception $e) {
            // If an error occurs during user creation, return an error response
            return response()->json([
                'message' => 'User registration failed. Please try again later.'
            ], 500);
        }
    }



    // public function login(Request $request)
    // {

    //     $request->validate([
    //         'email' => 'required|email|exists:users',
    //         'password' => 'required|string',

    //     ]);

    //     $user = User::where('email', $request->email)->first();
    //     session(["user" => "mahmoud"]);


    //     if (!$user || !Hash::check($request->password, $user->password)) {
    //         return response([
    //             'message' => 'Bad Creds'
    //         ], 401);
    //     }

    //     $token = $user->createToken("usertoken")->plainTextToken;

    //     $response = [
    //         "user" => $user,
    //         'token' => $token
    //     ];
    //     return response($response, 201);
    // }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $user = User::where('email', $request->email)->first();
            $token = $user->createToken("usertoken")->plainTextToken;

            $response = [
                "user" => $user,
                'token' => $token
            ];
            return response($response, 201);
        } else {
            return response([
                'message' => 'Bad Creds'
            ], 401);
        }
    }



    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return [
            'message' => 'Logged out'
        ];
    }

    public function profile()
    {

        $userId = Auth::id();

        $user = User::find($userId);


        return $user;
    }


    function previous()
    {
        $userId = Auth::id();

        $currentDate = Carbon::now()->toDateString();

        $trips = DB::table('tickets')
            ->select(
                'users.username as username',
                'dest_from.name as from_destination',
                'dest_to.name as to_destination',
                'trips.date as trip_date',
                'trips.price as trip_price',
                'types.type as bus_type'
            )
            ->join('users', 'tickets.user_id', '=', 'users.id')
            ->join('trips', 'tickets.trip_id', '=', 'trips.id')
            ->join('buses', 'trips.bus_id', '=', 'buses.id')
            ->join('types', 'buses.type_id', '=', 'types.id')
            ->join('destinations as dest_from', 'trips.from', '=', 'dest_from.id')
            ->join('destinations as dest_to', 'trips.to', '=', 'dest_to.id')
            ->where('tickets.user_id', $userId)
            ->whereDate('trips.date', '<', $currentDate)
            // ->where('tickets.trip_id', $tripId)
            ->get();

        return $trips;
    }
    function next()
    {
        $userId = Auth::id();

        $currentDate = Carbon::now()->toDateString();

        $trips = DB::table('tickets')
            ->select(
                'users.username as username',
                'dest_from.name as from_destination',
                'dest_to.name as to_destination',
                'trips.date as trip_date',
                'trips.price as trip_price',
                'types.type as bus_type'
            )
            ->join('users', 'tickets.user_id', '=', 'users.id')
            ->join('trips', 'tickets.trip_id', '=', 'trips.id')
            ->join('buses', 'trips.bus_id', '=', 'buses.id')
            ->join('types', 'buses.type_id', '=', 'types.id')
            ->join('destinations as dest_from', 'trips.from', '=', 'dest_from.id')
            ->join('destinations as dest_to', 'trips.to', '=', 'dest_to.id')
            ->where('tickets.user_id', $userId)
            ->whereDate('trips.date', '>', $currentDate)
            // ->where('tickets.trip_id', $tripId)
            ->get();

        return $trips;
    }


    public function update(Request $request)
    {
        $id = Auth::id();

        $user = User::where('id', $id)->update([
            'username' => $request->username,
            'email' => $request->email,
            'phone' => $request->phone
        ]);
        $user = User::find($id);
        return $user;
    }




    public function signin(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user) {

            try {
                $request->validate([
                    "email" => ["required", "email"],
                    "username" => ["required"]
                ]);
                $user = User::create([
                    'email' => $request->email,
                    'username' => $request->username,
                    'password' => bcrypt('123456momo'),
                ]);
                $token = $user->createToken("usertoken")->plainTextToken;

                return response()->json([
                    "user" => $user,
                    'token' => $token
                ], 201);
            } catch (\Exception $e) {
                // If an error occurs during user creation, return an error response
                return response()->json([
                    'message' => 'User registration failed. Please try again later.'
                ], 500);
            }
        } elseif ($user) {

            try {
                $request->validate([
                    "email" => ["required", "email", "exists:users"],

                ]);


                $token = $user->createToken("usertoken")->plainTextToken;

                $response = [
                    "user" => $user,
                    'token' => $token
                ];

                return response()->json([
                    "user" => $user,
                    'token' => $token
                ], 201);
            } catch (\Exception $e) {
                // If an error occurs during user creation, return an error response
                return response()->json([
                    'message' => 'User registration failed. Please try again later.'
                ], 500);
            }
        }
    }
}
