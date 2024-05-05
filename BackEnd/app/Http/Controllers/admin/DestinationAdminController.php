<?php

namespace App\Http\Controllers\admin;

use App\Models\admin\Destination;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class DestinationAdminController extends Controller
{
    public function index()
    {
        return Destination::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $req = $request->all();
        // Store the file in storage\app\public folder
        $imageName = $request->file('pic')->hashName();
        $imageEx = $request->file('pic')->getClientOriginalExtension();
        $fileName = $imageName;
        $destinationPath = config('app.picDestinationPath') . "/pic/" . $fileName;
        Storage::disk('local')->put($destinationPath, file_get_contents($request->file('pic')->getRealPath()));
        $req["pic"] = $destinationPath;
        
        //!  
        $flagName = $request->file('flag')->hashName();
        $flagEx = $request->file('flag')->getClientOriginalExtension();
        $fileName = $flagName;
        $destinationPath = config('app.flagDestinationPath') . "/flag/" . $fileName;
        Storage::disk('local')->put($destinationPath, file_get_contents($request->file('flag')->getRealPath()));
        $req["flag"] = $destinationPath;

        return   Destination::create($req);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Destination::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if (Destination::where('id', $id)->exists()) {
            $dest = Destination::find($id);
            $dest->name = $request->name;
            // $dest->type_id = $request->type_id;
            $dest->save();
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
        if (Destination::where('id', $id)->exists()) {
            $dest = Destination::find($id);
            $dest->delete();
            return response()->json([
                "message" => "record deleted"
            ], 202);
        } else {
            return response()->json(["message" => "record not found"], 404);
        }
    }
}
