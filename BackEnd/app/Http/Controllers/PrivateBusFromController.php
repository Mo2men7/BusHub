<?php

namespace App\Http\Controllers;
use App\Models\PrivateBusFrom;
use Illuminate\Http\Request;

class PrivateBusFromController extends Controller
{
    public function store(Request $request){
        $privateBus = new PrivateBusFrom();
        $privateBus->user_id = "1"; //virtual
        $privateBus->date_of_request = "2024-1-2"; //virtual
        $privateBus->date_of_response = "2024-1-2"; //virtual
        $privateBus->name = $request->input('name');
        $privateBus->phone = $request->input('phone');
        $privateBus->from = $request->input('from');
        $privateBus->to = $request->input('to');
        $privateBus->bus_type_id = $request->input('bus_type_id');
        $privateBus->passenger_number = $request->input('passenger_number');
        $privateBus->departure_date = $request->input('departure_date');
        $privateBus->return = $request->input('return');
        $privateBus->save();
        return response()->json([
            "message" => "Form Data Saved Successfully",
        ], 201);
    }
}
