<?php

namespace App\Http\Resources\admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DestinationAdminResource extends JsonResource
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
            'name' => $this->name,
            'flag' => $this->flag,
            'pic' => $this->pic,
            'info' => $this->info,
            'map' => $this->map,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
