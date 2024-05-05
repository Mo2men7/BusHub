<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    public $table = 'notifications';

    public $fillable = [
        'id',
        'type',
        'notifiable',
        'data',
        'read_at',
        'created_at',
        'updated_at',
    ];
}