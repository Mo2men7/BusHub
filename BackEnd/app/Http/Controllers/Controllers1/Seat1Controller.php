<?php

namespace App\Http\Controllers\Controllers1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Models1\Seat;
class Seat1Controller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Seat ::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return  Seat ::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return  Seat ::show($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if (Seat::where('id', $id)->exists()) {
            $Seat1 = Seat::find($id);
            $Seat1->trip_id = $request->trip_id;
            $Seat1->seat_num = $request->seat_num;
            $Seat1->reserved = $request->reserved;
            $Seat1->save();

            return response()->json([
                "message" => "record updated"
            ], 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (Seat::where('id', $id)->exists()) {
            $Seat1 = Seat::find($id);
            $Seat1->delete();
            return response()->json([
                "message" => "record deleted"
            ], 200);
        } 
        else {
            return response()->json([
                "message" => "not found"
            ], 404);
        }
    }
}
