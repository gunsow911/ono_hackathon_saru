<?php declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Matter;
use Illuminate\Http\Resources\Json\JsonResource;

class MatterResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        /** @var Matter */
        $resource = $this->resource;
        return [
            'id' => $resource->id,
            'lat' => $resource->location->latitude,
            'lng' => $resource->location->longitude,
            'applied_at' => $resource->applied_at->format("Y-m-d"),
            'user_id' => $resource->user_id,
            'user' => new UserResource($this->whenLoaded('user')),
        ];
    }
}

