<?php

namespace App\Notifications;

use Ichtrojan\Otp\Otp;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;


class ResetPasswordVerificationNotification extends Notification
{
    use Queueable;
    public $message;
    public $subject;
    public $fromEmail;
    public $mailer;
    public $otp;
    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        //     $this->message = 'use the below code for resetting your password';
        //     $this->subject = 'Verification Needed';
        //     $this->fromEmail = 'momohoho2224@gmail.com';
        //     $this->mailer = "smtp";
        //     $this->otp = new Otp;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        // $otp = $this->otp->generate($notifiable->email, "numeric", 6, 30);
        $otp = (new Otp)->generate($notifiable->email, 'numeric', 6, 30);

        return (new MailMessage)
            ->mailer('smtp')
            ->subject($this->subject)

            ->markdown('reset_password_verification', [
                'subject' => 'Reset Your Password',
                'message' => 'Use the below code for resetting your password',
                'otp' => $otp->token,
            ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [];
    }
}
