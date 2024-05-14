<?php

// app/Http/Controllers/NotificationController.php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function adminNotifications()
    {
        $adminUserId = User::where('role', 'admin')->value('id');
        return Notification::where('type', 'App\Notifications\PBRequest')
            ->where('notifiable_id', $adminUserId)
            ->whereNull('read_at')
            ->get();
    }
    public function userNotifications()
    {
        $userID = Auth::id();
        return Notification::where('notifiable_id', $userID)
        ->whereNull('read_at')
        ->get();
    }
    public function markAllAsRead($id)
    {
        // $userID = Auth::id();
        Notification::where('notifiable_id', $id)->whereNull('read_at')->update(['read_at' => now()]);
        return response()->json(['message' => 'All notifications marked as read'], 200);
        // return auth()->user()->unreadNotifications;
        // if ($userUnreadNotifications) {
        //     $userUnreadNotifications->markAsRead();
        //     return response()->json(['message' => 'All notifications marked as read'], 200);
        // }
    }
}