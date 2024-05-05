<?php

// app/Http/Controllers/NotificationController.php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NotificationController extends Controller
{
    public function index()
    {
        return Notification::whereNull('read_at')->get();
        // return [Notification::all(), auth()->user()->unreadNotifications->count()];
    }
    public function markAllAsRead()
    {
        Notification::whereNull('read_at')->update(['read_at' => now()]);
        return response()->json(['message' => 'All notifications marked as read'], 200);
    }
}