<?php

namespace App\Http\Controllers\admin;

use App\Models\admin\Trip;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class TripAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // DB::table('users')
        //     ->join('contacts', 'users.id', '=', 'contacts.user_id')
        //     ->join('orders', 'users.id', '=', 'orders.user_id')
        //     ->select('users.*', 'contacts.phone', 'orders.price')
        //     ->get();
        $allTrips = DB::table('trips')->
        join('destinations','destinations.id','=','trips.from')->
        select("from","to")->distinct()->get();
        foreach ($allTrips as $key => $trip) {
            $from_name = DB::table('destinations')->
            select("name")->where("id","=",$trip->from)->get();
            // dd($from_name);
            $to_name = DB::table('destinations')->
            select("name")->where("id","=",$trip->to)->get();
            // dd($to_name);
            $allTrips[$key]->from_name=$from_name[0]->name;
            $allTrips[$key]->to_name=$to_name[0]->name;
            $details=DB::table('trips')->join('buses','trips.bus_id','=','buses.id')->
            join('types','buses.type_id','=','types.id')->
            select(['trips.*','buses.*','types.*'])
            ->where('to','=',$trip->to)
            ->where('from','=',$trip->from)->get()->toArray();
            // dd($destTrips);
            $allTrips[$key]->details=($details);
            // dd($allTrips);

        }
       return $allTrips;

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
