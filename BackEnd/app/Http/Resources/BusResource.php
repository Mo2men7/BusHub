<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BusResource extends JsonResource
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
            'chairs' => $this->chairs,
            'type_id' => $this->type_id,   
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
