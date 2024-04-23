<?php

namespace App\Http\Controllers;

use App\Models\Trip;
use Illuminate\Http\Request;

class TripController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Trip::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return Trip::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Trip::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if (Trip::where('id', $id)->exists()) {
            $trip = Trip::find($id);
            $trip->bus_id = $request->bus_id;
            $trip->from = $request->from;
            $trip->to = $request->to;
            $trip->price = $request->price;
            $trip->date = $request->date;
            $trip->save();
            return response()->json([
                "message" => "record updated successfully"
            ], 200);
        } else {
            return response()->json(["message" => "record not found"], 404);
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
                "message" => "record deleted successfully"
            ], 202);
        } else {
            return response()->json(["message" => "record not found"], 404);
        }
    }
}
