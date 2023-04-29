<?php declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LatLngResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        /** @var \MatanYadaev\EloquentSpatial\Objects\Point */
        $resource = $this->resource;
        return [
            'lat' => $resource->latitude,
            'lng' => $resource->longitude,
        ];
    }
}


