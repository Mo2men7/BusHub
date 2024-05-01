<?php

namespace App\Http\Resources\Resources1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SeatResourse extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'trip_id' => $this->trip_id,
            'reserved' => $this->reserved,
            'seat_num' => $this->seat_num,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
