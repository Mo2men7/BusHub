<?php

namespace App\Http\Controllers;

use App\Models\Bus;
use Illuminate\Http\Request;

class BusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Bus::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return Bus::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Bus::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if (Bus::where('id', $id)->exists()) {
            $bus = Bus::find($id);
            $bus->chairs = $request->chairs;
            $bus->type_id = $request->type_id;
            $bus->save();
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
        if (Bus::where('id', $id)->exists()) {
            $bus = Bus::find($id);
            $bus->delete();
            return response()->json([
                "message" => "record deleted"
            ], 202);
        } else {
            return response()->json(["message" => "record not found"], 404);
        }
    }
}
