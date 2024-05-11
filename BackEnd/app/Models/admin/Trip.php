<?php

namespace App\Models\admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    use HasFactory;
    protected $fillable=[
        'bus_id',
        'from',
        'to',
        'price',
        'date',
        'time'
    ];
}
