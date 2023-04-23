<?php declare(strict_types=1);

namespace Tests\Unit\UseCases\Matter;

use App\Enums\AnimalKind;
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
        Carbon::setTestNow("2023-01-01");
        $entity = new CreateEntity([
            'lat' => 131.4729567,
            'lng' => 34.1880318,
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
        $this->assertEquals(new Carbon("2023-01-01"), $result->applied_at);
        $this->assertSame(AnimalKind::MONKY, $result->kind);
        $this->assertFalse($result->is_alone);
    }
}


