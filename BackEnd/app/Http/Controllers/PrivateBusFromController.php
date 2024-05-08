<?php

namespace App\Http\Controllers;

use App\Models\PrivateBusFrom;
use App\Notifications\PBAccept;
use App\Notifications\PBRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Notification;
// use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class PrivateBusFromController extends Controller
{
    public function index()
    {
        // return PrivateBusFrom::all();
        return DB::table('private_bus_froms')
            ->join('users', 'private_bus_froms.user_id', '=', 'users.id')
            ->join('destinations as fromDestinations', 'private_bus_froms.from', '=', 'fromDestinations.id')
            ->join('destinations as toDestinations', 'private_bus_froms.to', '=', 'toDestinations.id')
            ->join('types', 'private_bus_froms.bus_type_id', '=', 'types.id')
            ->select('private_bus_froms.*', 'users.username', 'fromDestinations.name as originName', 'toDestinations.name as destinationName', 'types.type as typeName')
            ->get();
    }

    public function store(Request $request)
    {
        $privateBus = new PrivateBusFrom();
        $privateBus->user_id = Auth::user()->id; //virtual
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
        /////////////// Start notification storing ///////////////
        // $user = \App\Models\User::get(); //to send to all users, (sending users number times where)
        $user = \App\Models\User::where('role', 'admin')->first(); //to send to user with role admin
        $PrivateBusFrom = PrivateBusFrom::latest()->first();
        Notification::send($user, new PBRequest($PrivateBusFrom));
        /////////////// End notification storing ///////////////
        return response()->json([
            "message" => "Form Data Saved Successfully",
        ], 201);
    }

    public function show($id)
    {
        return PrivateBusFrom::find($id);
    }

    public function update(Request $request, $id)
    {
        if (PrivateBusFrom::find($id)->exists()) {
            $req = PrivateBusFrom::find($id);
            $req->update($request->all());
            // $req->update(['status'=>$request]);
            return response()->json([
                'message' => 'Request updates successfully',
            ], 202);
        } else {
            return response()->json([
                'message' => 'Request not found',
            ], 404);
        }
    }

    public function acceptRequest($id)
    {
        $reqest = PrivateBusFrom::findOrFail($id);
        $reqest->update(["status" => "Accepted"]);
        $reqest->save();
        /////////////// Start notification storing ///////////////
        $user = \App\Models\User::find($reqest->user_id);
        $PrivateBusFrom = $reqest;
        Notification::send($user, new PBAccept($PrivateBusFrom));
        /////////////// End notification storing ///////////////
        return response()->json(['message' => 'Request has been accepted successfully', 200]);
    }

    public function declineRequest($id)
    {
        $reqest = PrivateBusFrom::findOrFail($id);
        $reqest->update(["status" => "Rejected"]);
        $reqest->save();
        return response()->json(['message' => 'Request has been declined successfully', 200]);
    }

    public function destroy($id)
    {
        if (PrivateBusFrom::find($id)->exists()) {
            $req = PrivateBusFrom::find($id);
            $req->delete();
            return response()->json([
                'message' => 'Request has been deleted',
            ], 202);
        } else {
            return response()->json([
                'message' => 'Request not found',
            ], 404);
        }
    }
}
