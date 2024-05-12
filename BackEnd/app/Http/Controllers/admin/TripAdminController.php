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
        // $fixallDestinations=[];
        $allDestinations = DB::table('destinations')->get();
        foreach ($allDestinations as $key => $value) {
            $fixallDestinations[$value->id] = $value;
        }
        $allTrips = DB::table('trips')->join('destinations', 'destinations.id', '=', 'trips.from')->select("from", "to")->where('date','>=',date('Y-m-d'))->distinct()->get();
        foreach ($allTrips as $key => $trip) {
            $from_name = DB::table('destinations')->select("name")->where("id", "=", $trip->from)->get();
            // dd($from_name);
            $to_name = DB::table('destinations')->select("name")->where("id", "=", $trip->to)->get();
            // dd($to_name);
            $allTrips[$key]->from_name = $from_name[0]->name;
            $allTrips[$key]->to_name = $to_name[0]->name;
            $details = DB::table('trips')->join('buses', 'trips.bus_id', '=', 'buses.id')->join('types', 'buses.type_id', '=', 'types.id')->select(['trips.*', 'buses.id as bus_id','buses.chairs', 'buses.type_id','types.type','types.options'])
                ->where('to', '=', $trip->to)
                ->where('date','>=',date('Y-m-d'))
                ->where('from', '=', $trip->from)->get()->toArray();
            // dd($destTrips);
            foreach ($details as $key1 => $trip_id)
            {
                $numofreserved= DB::table('seats')->select("reserved")->where('reserved','<>', '0')->where('trip_id',$trip_id->id)->count();
                $details[$key1]->reserved=$numofreserved;
            }
            $allTrips[$key]->details = ($details);
            // dd($allTrips);

        }
        $fixallTrips = [];
        foreach ($allTrips->toArray() as $key => $val) {
            $fixallTrips[$val->from][$key] = $val;
        }
        foreach ($fixallDestinations as $key => $val) {
            if (isset($fixallTrips[$key])) {
                $fixallDestinations[$key]->allTrips = array_values($fixallTrips[$key]);
            } else {
                $fixallDestinations[$key]->allTrips = array();
            }
        }
        // dd( $allTrips);
        // dd($fixallTrips);
        // dd($fixallDestinations);
        // return $allTrips;

        return array_values($fixallDestinations);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $check=DB::table('trips')->select()->
        where('bus_id',$request->bus_id)->
        where('date',$request->date)->
        where('time',$request->time)->
        where('to',$request->to)->
        where('from',$request->from)->get()->toArray();
        if (count($check)>0)
        {
            return response()->json(["error" =>"this Trip is already exists"],402);
        }
        $chairs = DB::table('buses')->select("chairs")->find($request->bus_id);
        $intChairs= $chairs->chairs;
        $result = Trip::create($request->all());
        for ($i = 1; $i <= $intChairs; $i++) {
            DB::table('seats')->insert([
                [
                    'trip_id' => $result->id,
                    'seat_num' => $i,
                    'reserved' => '0'
                ],
            ]);
        }

        // return $result->id;
        return $result;
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
