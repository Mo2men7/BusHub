<?php

namespace App\Models\Models1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trip1 extends Model
{
    use HasFactory;
    protected $fillable = [
        'bus_id',
        'from_location',
        'to_location',
        'price',
        'date'
    ];
    protected $table = 'trips';
}
