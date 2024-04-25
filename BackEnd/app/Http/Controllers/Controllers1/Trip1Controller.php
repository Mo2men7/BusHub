<?php

namespace App\Http\Controllers\Controllers1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Models1\Trip;
use Illuminate\Support\Facades\DB;

class Trip1Controller extends Controller
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

    public function tripsjoin()
    {
        $trips = DB::table('trips')
            ->join('destinations as from_dest', 'from_dest.id', '=', 'trips.from_location')
            ->join('destinations as to_dest', 'to_dest.id', '=', 'trips.to_location')
            ->join('buses','buses.id','=','trips.bus_id')
            ->join('types','types.id','=','buses.type_id')
            ->select('trips.*', 'from_dest.name as from', 'to_dest.name as to','buses.chairs','types.type','types.id as type_id' ,'types.options',)
            ->get();
    
        return response()->json($trips);
    }

}
