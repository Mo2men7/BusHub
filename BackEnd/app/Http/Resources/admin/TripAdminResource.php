<?php

namespace App\Http\Resources\admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TripAdminResource extends JsonResource
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
            'from' => $this->from,
            'to' => $this->to,
            'price' => $this->price,
            'date' => $this->date,         
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
