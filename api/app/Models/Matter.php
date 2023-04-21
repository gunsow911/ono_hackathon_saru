<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\AnimalKind;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use MatanYadaev\EloquentSpatial\Objects\Point;
use MatanYadaev\EloquentSpatial\Traits\HasSpatial;

/**
 * App\Models\Matter
 *
 * @property string $id
 * @property string $user_id
 * @property \MatanYadaev\EloquentSpatial\Objects\Point|null $location
 * @property \Illuminate\Support\Carbon $applied_at
 * @property AnimalKind $kind
 * @property bool $is_alone
 * @property string|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User|null $user
 * @method static \Database\Factories\MatterFactory factory($count = null, $state = [])
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter newModelQuery()
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter newQuery()
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter orderByDistance(string $column, \MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn, string $direction = 'asc')
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter orderByDistanceSphere(string $column, \MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn, string $direction = 'asc')
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter query()
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter whereAppliedAt($value)
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter whereContains(string $column, \MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter whereCreatedAt($value)
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter whereCrosses(string $column, \MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter whereDeletedAt($value)
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter whereDisjoint(string $column, \MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter whereDistance(string $column, \MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn, string $operator, int|float $value)
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter whereDistanceSphere(string $column, \MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn, string $operator, int|float $value)
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter whereEquals(string $column, \MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter whereId($value)
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter whereIntersects(string $column, \MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter whereIsAlone($value)
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter whereKind($value)
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter whereLocation($value)
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter whereNotContains(string $column, \MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter whereNotWithin(string $column, \MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter whereOverlaps(string $column, \MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter whereSrid(string $column, string $operator, int|float $value)
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter whereTouches(string $column, \MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter whereUpdatedAt($value)
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter whereUserId($value)
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter whereWithin(string $column, \MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter withDistance(string $column, \MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn, string $alias = 'distance')
 * @method static \MatanYadaev\EloquentSpatial\SpatialBuilder|Matter withDistanceSphere(string $column, \MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn, string $alias = 'distance')
 * @mixin \Eloquent
 */
class Matter extends Model
{
    use HasFactory;
    use HasSpatial;
    use HasUlids;

    protected $casts = [
        'applied_at' => 'datetime',
        'location' => Point::class,
        'kind' => AnimalKind::class,
        'is_alone' => 'boolean',
    ];

    /**
     * ユーザ
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
