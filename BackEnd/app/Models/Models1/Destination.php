<?php

namespace App\Models\Models1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    use HasFactory;
    protected $fillable=[
        'name'
    ];
    protected $table ='destinations';
}
