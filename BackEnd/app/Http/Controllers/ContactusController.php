<?php

namespace App\Http\Controllers;

use App\Models\ContactUs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ContactusController extends Controller
{
    public function index()
    {
        return ContactUs::all();
    }
    public function show($id)
    {
        return ContactUs::findOrFail($id);
    }
    public function destroy($id)
    {
        ContactUs::findOrFail($id)->delete();
        return response()->json([
            "message" => "Item has been successfully deleted",
        ]);
    }
    public function update($id)
    {
        ContactUs::findOrFail($id)->update(['status' => 1]);
        return response()->json([
            "message" => "Item has been successfully updated"
        ]);
    }
    public function contactus(Request $request)
    {

        $request->validate(
            [
                "title" => "required|string",
                "username" => "required|string",
                'email' => 'required|email',
                'message' => 'required|string',
            ]
        );
        $userId = Auth::id();

        $data = [

            "id_user" => $userId,
            "title" => $request->title,
            'username' => $request->username, // Assuming the user ID you want to associate with the contact
            'email' => $request->email,
            'message' => $request->message,
            'status' => 0, // Assuming the initial status is 0
            'created_at' => now(), // You can set the created_at timestamp if needed
            // 'updated_at' => now(), // You can set the updated_at timestamp if needed
        ];


        // Insert the new row into the contact_us table
        DB::table('contact_us')->insert($data);
        return $data;
    }
}
