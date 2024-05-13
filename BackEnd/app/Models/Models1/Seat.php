<?php

namespace App\Models\Models1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    use HasFactory;

    use HasFactory;
   protected $fillable=[
        'trip_id',
        'bus_id',
        'user_id',
        'seat_num',
        'reserved'
    ];
    protected $table ='seats';
}
