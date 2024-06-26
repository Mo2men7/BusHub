<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\admin\Bus;
use Illuminate\Support\Facades\DB;

class BusAdminController extends Controller
{
    public function index()
    {
        //     DB::table('leagues')
        // ->select('league_name')
        // ->join('countries', 'countries.country_id', '=', 'leagues.country_id')
        // ->where('countries.country_name', $country)
        // ->get();
        $chairs = DB::table('buses')->select('chairs')->distinct()->get();

        // dd($allBuses);
        foreach ($chairs as $k => $val) {
            $allBuses = DB::table('buses')->select()->where('chairs',$val->chairs)->get();

        foreach ($allBuses as $key => $value) {
            $types = DB::table('types')->select()->where('id', $value->type_id)->get();
            $trips = DB::table('trips')->select()->where('date', '>=', date('Y-m-d'))->where('bus_id', $value->id)->orderBy('date', 'asc')->get();
            // $options= DB::table('options')->find($types->option_id, ['*']);
            // $options = [];
            // foreach ($types as  $type) {
            //     // dd($type);
            // $allBuses[$key]->options= 
            // }
            // // dd($options);
            
            $allBuses[$key]->type = $types[0]->type;
            $allBuses[$key]->options =$types[0]->options;
            $allBuses[$key]->trips =$trips;
            
            }
            $types = DB::table('types')->select()->get();
            foreach ($types as $keytype => $type) {
                $no_type=DB::table('buses')->select()->where('type_id', $type->id)->where('chairs', $val->chairs)->get();
                $chairs[$k]->{"$type->id"}=count($no_type->toArray());
            }

        $chairs[$k]->allBuses=$allBuses;

    }

        // dd($allBuses);
        // exit();
        return $chairs;
    }

    public function getForTrips()
    {
        //     DB::table('leagues')
        // ->select('league_name')
        // ->join('countries', 'countries.country_id', '=', 'leagues.country_id')
        // ->where('countries.country_name', $country)
        // ->get();
        $allBuses = DB::table('buses')->select()->get();
        // dd($allBuses);
        foreach ($allBuses as $key => $value) {
            $types = DB::table('types')->select()->where('id', $value->type_id)->get();
            // $options= DB::table('options')->find($types->option_id, ['*']);
            // $options = [];
            // foreach ($types as  $type) {
            //     // dd($type);
            // $allBuses[$key]->options= 
            // }
            // // dd($options);
            $allBuses[$key]->type = $types[0]->type;
            $allBuses[$key]->options =$types[0]->options;
            
            
        }
        // dd($allBuses);
        // exit();
        return $allBuses;
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
