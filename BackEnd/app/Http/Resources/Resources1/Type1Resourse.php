<?php

namespace App\Http\Resources\Resources1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Type1Resourse extends JsonResource
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
            'type' => $this->type,
            'option_id' => $this->option_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
