<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Models\Models1\Trip1;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

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
        if (!$user->gender | $user->gender == "") {
            $user->gener = "_";
        }
        if (!$user->city | $user->city == "") {
            $user->city = "_";
        }


        return $user;
    }


    // function previous()
    // {
    //     $userId = Auth::id();

    //     $currentDate = Carbon::now()->toDateString();

    //     $trips = DB::table('tickets')
    //         ->select(
    //             'users.username as username',
    //             'dest_from.name as from_destination',
    //             'dest_to.name as to_destination',
    //             'trips.date as trip_date',
    //             'trips.price as trip_price',
    //             'types.type as bus_type'
    //         )
    //         ->join('users', 'tickets.user_id', '=', 'users.id')
    //         ->join('trips', 'tickets.trip_id', '=', 'trips.id')
    //         ->join('buses', 'trips.bus_id', '=', 'buses.id')
    //         ->join('types', 'buses.type_id', '=', 'types.id')
    //         ->join('destinations as dest_from', 'trips.from', '=', 'dest_from.id')
    //         ->join('destinations as dest_to', 'trips.to', '=', 'dest_to.id')
    //         ->where('tickets.user_id', $userId)
    //         ->whereDate('trips.date', '<', $currentDate)
    //         // ->where('tickets.trip_id', $tripId)
    //         ->get();

    //     return $trips;
    // }
    // function next()
    // {
    //     $userId = Auth::id();

    //     $currentDate = Carbon::now()->toDateString();


    //     $trips = DB::table('tickets')
    //         ->select(
    //             'trips.id as trip_id', // Include the id column from the trips table
    //             'users.username as username',
    //             'dest_from.name as from_destination',
    //             'dest_to.name as to_destination',
    //             'trips.date as trip_date',
    //             'trips.price as trip_price',
    //             'types.type as bus_type'
    //         )
    //         ->join('users', 'tickets.user_id', '=', 'users.id')
    //         ->join('trips', 'tickets.trip_id', '=', 'trips.id')
    //         ->join('buses', 'trips.bus_id', '=', 'buses.id')
    //         ->join('types', 'buses.type_id', '=', 'types.id')
    //         ->join('destinations as dest_from', 'trips.from', '=', 'dest_from.id')
    //         ->join('destinations as dest_to', 'trips.to', '=', 'dest_to.id')
    //         ->where('tickets.user_id', $userId)
    //         ->whereDate('trips.date', '>', $currentDate)
    //         ->get();
    //     return $trips;
    // }


    // public function update(Request $request)
    // {
    //     $id = Auth::id();

    //     $imageName = $request->file("pic")->hashName();
    //     $destinationPath = config('app.picDestinationPath') . "/pic/" . $imageName;

    //     Storage::disk("local")->put($destinationPath, file_get_contents($request->file('pic')));



    //     $user = User::where('id', $id)->update([
    //         'username' => $request->username,
    //         'email' => $request->email,
    //         'phone' => $request->phone,
    //         'city' => $request->city,
    //         'profile_photo_path' => $destinationPath

    //     ]);
    //     $user = User::find($id);
    //     return $user;
    // }


    public function update(Request $request)
    {
        $id = Auth::id();

        // Check if a file was uploaded
        if ($request->hasFile("pic")) {
            $imageName = $request->file("pic")->hashName();
            $destinationPath = config('app.picDestinationPath') . "/pic/" . $imageName;

            // Store the uploaded file
            Storage::disk("local")->put($destinationPath, file_get_contents($request->file('pic')));

            // Update user record with the new profile photo path
            $user = User::where('id', $id)->update([
                'username' => $request->username,
                'email' => $request->email,
                'phone' => $request->phone,
                'city' => $request->city,
                'gender' => $request->gender,
                'profile_photo_path' => $destinationPath
            ]);
        } else {
            // If no file was uploaded, update user record without changing the profile photo path
            $user = User::where('id', $id)->update([
                'username' => $request->username,
                'email' => $request->email,
                'phone' => $request->phone,
                'gender' => $request->gender,
                'city' => $request->city,
            ]);
        }

        // Retrieve and return the updated user record
        $user = User::find($id);
        return $user;
    }




    public function imageUploadPost(Request $request)
    {

        if ($request->pic == null) {
            return response()->json("{'error':'please provide an image'}", $request);
        }
        try {
            $imageName = $request->file("pic")->hashName();
            $destinationPath = config('app.picDestinationPath') . "/pic/" . $imageName;

            Storage::disk("local")->put($destinationPath, file_get_contents($request->file('pic')));
            $id = Auth::id();

            $user = User::where('id', $id)->update([

                'profile_photo_path' => $destinationPath
            ]);
            return response()->json($id);
        } catch (\Exception $e) {
            return response()->json($e);
        }
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

    public function tripsjoin($trip_id)
    {
        $user_id = Auth::id();
        $today = Carbon::today();
        $user_name = Auth::user()->username;

        $trips = Trip1::join('destinations as from_dest', 'from_dest.id', '=', 'trips.from')
            ->join('destinations as to_dest', 'to_dest.id', '=', 'trips.to')
            ->join('buses', 'buses.id', '=', 'trips.bus_id')
            ->join('types', 'types.id', '=', 'buses.type_id')
            ->join('seats', 'seats.trip_id', '=', 'trips.id')
            ->select(
                'trips.*',
                'from_dest.name as from_location',
                'to_dest.name as to_location',
                'buses.chairs',
                'types.type',
                'types.id as type_id',
                'types.options',
                'seats.seat_num',
                'seats.reserved'
            )
            ->orderBy('time', 'asc')
            ->where('seats.reserved', $user_id)
            ->whereDate('trips.date', '>=', $today)
            ->where('trips.id', $trip_id) // Add condition for trip_id

            ->get();

        return response()->json([
            'trips' => $trips,
            'username' => $user_name
        ]);
    }
    public function next()
    {
        // Carbon::setTimezone('Africa/Cairo');
        date_default_timezone_set('Africa/Cairo');

        $user_id = Auth::id();
        $today = Carbon::today();
        $user_name = Auth::user()->username;
        $now = Carbon::now()->toTimeString();; // Get the current time
        // $now->tz('Africa/Cairo');

        $trips = Trip1::join('destinations as from_dest', 'from_dest.id', '=', 'trips.from')
            ->join('destinations as to_dest', 'to_dest.id', '=', 'trips.to')
            ->join('buses', 'buses.id', '=', 'trips.bus_id')
            ->join('types', 'types.id', '=', 'buses.type_id')
            ->join('seats', 'seats.trip_id', '=', 'trips.id')
            ->select(
                'trips.*',
                'from_dest.name as from_location',
                'to_dest.name as to_location',
                'buses.chairs',
                'types.type',
                'types.id as type_id',
                'types.options',
                'seats.seat_num',
                'seats.reserved'
            )
            ->orderBy('time', 'asc')
            ->where('seats.reserved', $user_id)
            ->where('trips.date', '>=', date('Y-m-d'))
            ->where('trips.time', '>', date("H:i:s"))


            ->get();

        return response()->json($trips);
        // return response()->json([
        //     'trips' => date("H:i:s"),
        //     'username' => date('Y-m-d')
        // ]);
    }

    public function previous()
    {

        date_default_timezone_set('Africa/Cairo');


        $user_id = Auth::id();
        $today = Carbon::today();
        $user_name = Auth::user()->username;
        $now = Carbon::now()->toTimeString();; // Get the current time


        $trips = Trip1::join('destinations as from_dest', 'from_dest.id', '=', 'trips.from')
            ->join('destinations as to_dest', 'to_dest.id', '=', 'trips.to')
            ->join('buses', 'buses.id', '=', 'trips.bus_id')
            ->join('types', 'types.id', '=', 'buses.type_id')
            ->join('seats', 'seats.trip_id', '=', 'trips.id')
            ->select(
                'trips.*',
                'from_dest.name as from_location',
                'to_dest.name as to_location',
                'buses.chairs',
                'types.type',
                'types.id as type_id',
                'types.options',
                'seats.seat_num',
                'seats.reserved'
            )
            ->orderBy('time', 'asc')
            ->where('seats.reserved', $user_id)
            ->where('trips.date', '<=', date('Y-m-d'))
            ->where('trips.time', '<', date("H:i:s"))


            ->get();

        return response()->json($trips);
    }
}
