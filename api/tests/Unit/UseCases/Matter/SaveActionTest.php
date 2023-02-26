<?php declare(strict_types=1);

namespace Tests\Unit\UseCases\Matter;

use App\Enums\AnimalKind;
use App\Models\Matter;
use App\Models\User;
use App\UseCases\Matter\SaveAction;
use App\UseCases\Matter\SaveEntity;
use Illuminate\Foundation\Testing\RefreshDatabase;
use MatanYadaev\EloquentSpatial\Objects\Point;
use Tests\TestCase;

class SaveActionTest extends TestCase
{ 
    use RefreshDatabase;

    /**
     * 害獣情報を新規作成できること
     */
    public function testSave01()
    {
        // テスト準備
        $entity = new SaveEntity([
            'lat' => 131.4729567,
            'lng' => 34.1880318,
        ]);
        /** @var User */
        $user = User::factory()->create();

        $action = new SaveAction();

        // テスト実行
        $result = $action($entity, $user, null);

        // テスト確認
        $this->assertNotNull($result->id);
        $this->assertSame(131.4729567, $result->location->latitude);
        $this->assertSame(34.1880318, $result->location->longitude);
        $this->assertSame($user->id, $result->user_id);
        $this->assertSame(AnimalKind::MONKY, $result->kind);
        $this->assertFalse($result->is_alone);
    }

    /**
     * 既に害獣情報がある場合 害獣情報を上書きできること
     */
    public function testSave02()
    {
        // テスト準備
        $entity = new SaveEntity([
            'lat' => 131.4729567,
            'lng' => 34.1880318,
        ]);
        /** @var User */
        $user = User::factory()->create();
        /** @var Matter */
        $matter = Matter::factory()->create([
            'user_id' => $user->id,
            'location' => new Point(131.0, 34.0)
        ]);

        $action = new SaveAction();

        // テスト実行
        $result = $action($entity, $user, $matter);

        // テスト確認
        $this->assertSame($matter->id, $result->id);
        $this->assertSame(131.4729567, $result->location->latitude);
        $this->assertSame(34.1880318, $result->location->longitude);
        $this->assertSame($user->id, $result->user_id);
        $this->assertSame(AnimalKind::MONKY, $result->kind);
        $this->assertFalse($result->is_alone);
    }
}


