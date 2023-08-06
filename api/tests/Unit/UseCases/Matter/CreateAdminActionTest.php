<?php declare(strict_types=1);

namespace Tests\Unit\UseCases\Matter;

use App\Enums\AnimalKind;
use App\Models\User;
use App\UseCases\Matter\CreateAdminAction;
use App\UseCases\Matter\CreateAdminEntity;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class CreateAdminActionTest extends TestCase
{ 
    use RefreshDatabase;

    /**
     * 害獣情報を新規作成できること
     */
    public function testCreate01()
    {
        // テスト準備
        
        $user = User::factory()->create();
        $entity = new CreateAdminEntity([
            'user_id' => $user->id,
            'lat' => 131.4729567,
            'lng' => 34.1880318,
            'applied_at' => '2023-01-01',
        ]);
        $action = new CreateAdminAction();
        // テスト実行
        $result = $action($entity);

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


