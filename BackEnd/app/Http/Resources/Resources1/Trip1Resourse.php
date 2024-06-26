<?php

namespace App\Http\Resources\Resources1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Trip1Resourse extends JsonResource
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
            'bus_id' => $this->bus_id,
            'from_location' => $this->from_location,
            'to_location' => $this->to_location,
            'price' => $this->price,
            'date' => $this->date,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
