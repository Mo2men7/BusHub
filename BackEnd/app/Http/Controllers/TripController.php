<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Trip;

class TripController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Trip ::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return  Trip ::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return  Trip ::show($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if (Trip::where('id', $id)->exists()) {
            $trip = Trip::find($id);
            $trip->bus_id = $request->bus_id;
            $trip->from_location = $request->from_location;
            $trip->to_location = $request->to_location;
            $trip->price = $request->price;
            $trip->date = $request->date;
            $trip->save();
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
        if (Trip::where('id', $id)->exists()) {
            $trip = Trip::find($id);
            $trip->delete();
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
