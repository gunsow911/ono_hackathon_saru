<?php declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\AdminUser;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminUserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        /** @var AdminUser */
        $resource = $this->resource;
        return [
            'id' => $resource->id,
            'name' => $resource->name,
        ];
    }
}

