<?php

namespace App\Http\Controllers\Controllers1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Models1\Type1;

class Type1Controller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Type1 ::all();    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return  Type1 ::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return  Type1 ::show($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if (Type1::where('id', $id)->exists()) {
            $type = Type1::find($id);
            $type->type = $request->type;
            $type->option_id = $request->option_id;
            $type->save();
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
        if (Type1::where('id', $id)->exists()) {
            $type = Type1::find($id);
            $type->delete();
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
