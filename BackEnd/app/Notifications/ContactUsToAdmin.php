<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Auth;
use App\Models\ContactUs;

class ContactUsToAdmin extends Notification
{
    use Queueable;
    private $ContactUs;

    /**
     * Create a new notification instance.
     */
    public function __construct(ContactUs $ContactUs)
    {
        $this->ContactUs=$ContactUs;
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
    public function toDatabase($notifiable)
    {
        return[
            'id' => $this->ContactUs->id,
            'title' => 'We have a new Contact Us request by',
            'user' => Auth::user()->username,
        ];
    }
}
