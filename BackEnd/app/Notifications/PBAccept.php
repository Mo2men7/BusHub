<?php

namespace App\Notifications;

use App\Models\PrivateBusFrom;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Auth;

class PBAccept extends Notification
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

    /**
     * Get the mail representation of the notification.
     */

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toDatabase($notifiable){
        return[
            'id' => $this->PrivateBusFrom->id,
            'title' => 'Your request has been accepted by admin',
        ];
    }
}
