<?php declare(strict_types=1);

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use MatanYadaev\EloquentSpatial\Objects\Point;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Matter>
 */
class MatterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'location' => new Point(fake()->latitude, fake()->longitude),
            'applied_at' => now(),
            'kind' => 1,
            'animal_count' => 1,
            'appear_type' => 0,
            'is_damaged' => false,
        ];
    }
}

