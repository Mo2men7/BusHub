<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrivateBusFrom extends Model
{
    use HasFactory;
    public $fillable = [
        // "user_id",
        "name",
        "phone",
        "bus_type_id",
        "passenger_number",
        "from",
        "to",
        "departure_date",
        "return",
    ];
    public $table = "private_bus_froms";
    public function user(){
        return $this->belongsTo(User::class);
    }
}
