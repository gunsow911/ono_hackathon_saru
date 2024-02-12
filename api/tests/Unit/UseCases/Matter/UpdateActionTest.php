<?php declare(strict_types=1);

namespace Tests\Unit\UseCases\Matter;

use App\Enums\AnimalKind;
use App\Enums\AppearType;
use App\Models\Matter;
use App\Models\User;
use App\UseCases\Matter\UpdateAction;
use App\UseCases\Matter\UpdateEntity;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use MatanYadaev\EloquentSpatial\Objects\Point;
use Tests\TestCase;

class UpdateActionTest extends TestCase
{
    use RefreshDatabase;

    /**
     * 害獣情報の更新ができること
     */
    public function testUpdate01()
    {
        // テスト準備
        $entity = new UpdateEntity([
            'lat' => 131.4729567,
            'lng' => 34.1880318,
            'applied_at' => new Carbon("2023-04-01 17:00:00"),
            'animal_count' => 10,
            'appear_type' => AppearType::HEARING->value,
            'is_damaged' => true,
        ]);
        /** @var User */
        $user = User::factory()->create();
        /** @var Matter */
        $matter = Matter::factory()->create([
            'user_id' => $user->id,
            'location' => new Point(131.0, 34.0),
            'applied_at' => new Carbon("2023-03-01 17:00:00"),
            'animal_count' => 1,
            'appear_type' => AppearType::SEEING,
            'is_damaged' => false,
        ]);

        $action = new UpdateAction();

        // テスト実行
        $result = $action($entity, $matter);

        // テスト確認
        $this->assertSame($matter->id, $result->id);
        $this->assertSame(131.4729567, $result->location->latitude);
        $this->assertSame(34.1880318, $result->location->longitude);
        $this->assertSame($user->id, $result->user_id);
        $this->assertEquals(new Carbon("2023-04-01 17:00:00"), $result->applied_at);
        $this->assertSame(AnimalKind::MONKY, $result->kind);
        $this->assertSame(10, $result->animal_count);
        $this->assertSame(AppearType::HEARING, $result->appear_type);
        $this->assertTrue($result->is_damaged);
    }
}


