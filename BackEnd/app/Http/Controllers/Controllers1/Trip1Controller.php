<?php

namespace App\Http\Controllers\Controllers1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Models1\Trip1;
use Illuminate\Support\Facades\DB;


class Trip1Controller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Trip1 ::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return  Trip1 ::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return  Trip1 ::show($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if (Trip1::where('id', $id)->exists()) {
            $trip = Trip1::find($id);
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
        if (Trip1::where('id', $id)->exists()) {
            $trip = Trip1::find($id);
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

    public function tripsjoin()
    {
        $trips = DB::table('trips')
        ->join('destinations as from_dest', 'from_dest.id', '=', 'trips.from')
        ->join('destinations as to_dest', 'to_dest.id', '=', 'trips.to')
        ->join('buses','buses.id','=','trips.bus_id')
        ->join('types','types.id','=','buses.type_id')
        ->select('trips.*', 'from_dest.name as from_location', 'to_dest.name as to_location','buses.chairs','types.type','types.id as type_id' ,'types.options',)
        ->orderBy('time', 'asc')
        ->get();
    
        return response()->json($trips);
    }

}