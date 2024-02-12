<?php declare(strict_types=1);

namespace Tests\Unit\UseCases\Matter;

use App\Enums\AnimalKind;
use App\Enums\AppearType;
use App\Models\User;
use App\UseCases\Matter\CreateAction;
use App\UseCases\Matter\CreateEntity;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class CreateActionTest extends TestCase
{
    use RefreshDatabase;

    /**
     * 害獣情報を新規作成できること
     */
    public function testCreate01()
    {
        // テスト準備
        // 時間を固定
        Carbon::setTestNow("2023-01-01 17:00:00");
        $entity = new CreateEntity([
            'lat' => 131.4729567,
            'lng' => 34.1880318,
            'animal_count' => 1,
            'appear_type' => AppearType::SEEING->value,
            'is_damaged' => true,
        ]);
        /** @var User */
        $user = User::factory()->create();

        $action = new CreateAction();

        // テスト実行
        $result = $action($entity, $user);

        // テスト確認
        $this->assertNotNull($result->id);
        $this->assertSame(131.4729567, $result->location->latitude);
        $this->assertSame(34.1880318, $result->location->longitude);
        $this->assertSame($user->id, $result->user_id);
        $this->assertEquals(new Carbon("2023-01-01 17:00:00"), $result->applied_at);
        $this->assertSame(AnimalKind::MONKY, $result->kind);
        $this->assertSame(1, $result->animal_count);
        $this->assertSame(AppearType::SEEING, $result->appear_type);
        $this->assertTrue($result->is_damaged);
    }
}


