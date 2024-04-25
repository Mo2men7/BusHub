<?php

namespace App\Http\Controllers\Controllers1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use  App\Models\Models1\Destination1;

class Destination1Controller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Destination1 ::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return  Destination1 ::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return  Destination1 ::show($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if (Destination1::where('id', $id)->exists()) {
            $destination = Destination1::find($id);
            $destination->name = $request->name;
            $destination->save();
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
        if (Destination1::where('id', $id)->exists()) {
            $destination = Destination1::find($id);
            $destination->delete();
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

