<?php

namespace App\Http\Controllers;

use App\Models\Destintaion;
use Illuminate\Http\Request;

class DestinationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Destintaion::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return Destintaion::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Destintaion::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if(Destintaion::find($id)->exists()){
            $destination = Destintaion::find($id);
            $destination->delete();
            return response()->json([
                'message'=>'Destination has been deleted',
            ], 202);
        }
        else{
            return response()->json([
                'message'=>'Destination not found',
            ], 404);
        }
    }
}
