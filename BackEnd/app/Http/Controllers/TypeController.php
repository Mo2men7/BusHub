<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Type;
class TypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Type ::all();    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return  Type ::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return  Type ::show($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if (Type::where('id', $id)->exists()) {
            $type = Type::find($id);
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
        if (Type::where('id', $id)->exists()) {
            $type = Type::find($id);
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
