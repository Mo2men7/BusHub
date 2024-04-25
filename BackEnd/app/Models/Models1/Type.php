<?php

namespace App\Models\Models1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    use HasFactory;
    protected $fillable=[
        'type',
        'option_id'
    ];
    protected $table ='types';
}
