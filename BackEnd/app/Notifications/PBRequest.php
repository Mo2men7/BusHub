<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
// use Illuminate\Contracts\Queue\ShouldQueue;
// use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Auth;

use App\Models\PrivateBusFrom;


class PBRequest extends Notification
{
    use Queueable;
    private $PrivateBusFrom;
    
    /**
     * Create a new notification instance.
     */
    public function __construct(PrivateBusFrom $PrivateBusFrom)
    {
        $this->PrivateBusFrom = $PrivateBusFrom;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }
    
     public function toDatabase($notifiable){
        return[
            'id' => $this->PrivateBusFrom->id,
            'title' => 'A new PBR has been added by ',
            'user' => Auth::user()->username,
        ];
     }
}
