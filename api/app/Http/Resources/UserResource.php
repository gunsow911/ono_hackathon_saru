<?php declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        /** @var User */
        $resource = $this->resource;
        return [
            'id' => $resource->id,
            'email' => $resource->email,
            'name' => $resource->name,
            'phone_number' => $resource->phone_number,
            'notification_method' => $resource->notification_method,
            'created_at' => $resource->created_at,
            'updated_at' => $resource->updated_at,
        ];
    }
}

