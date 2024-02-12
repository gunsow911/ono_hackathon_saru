<?php declare(strict_types=1);

namespace Tests\Feature\Http\Controllers;

use Mockery;
use App\Models\Matter;
use App\Models\User;
use App\UseCases\Matter\CreateAction;
use App\UseCases\Matter\ListAction;
use Tests\ControllerTestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use MatanYadaev\EloquentSpatial\SpatialBuilder;
use Mockery\MockInterface;

class MatterControllerTest extends ControllerTestCase
{
    use RefreshDatabase;

    /**
     * 害獣情報を一覧できること
     */
    public function testIndex()
    {
        // テスト準備
        $matter1 = Matter::factory()->create();
        $matter2 = Matter::factory()->create();
        $matter3 = Matter::factory()->create();

        // アクションの戻り値をモックする
        /** @var SpatialBuilder|MockInterface */
        $builder = Mockery::mock(SpatialBuilder::class);
        $builder->shouldReceive('get')
            ->andReturn([$matter1, $matter2, $matter3]);

        $this->mockAction(ListAction::class, $builder);

        // テスト実行
        // リクエストを送信する
        $response = $this->getJson("api/matters");

        // テスト確認
        // ステータスコードの検証
        // JSONの検証
        $response->assertStatus(200) // 200 OK
            ->assertJsonCount(3); // 3件ある
    }

    /**
     * 獣害情報を作成できること
     */
    public function testCreate()
    {
        // テスト準備
        $user = User::factory()->create();
        $matter = Matter::factory()->create();
        $this->mockAction(CreateAction::class, $matter);

        $data = [
            'user_id' => $user->id,
            'lat' => "136.123",
            'lng' => "32.456",
            'applied_at' => "2023-12-20 17:00:00",
            'animal_count' => 3,
            'appear_type' => 'SEEING',
            'is_damaged' => true,
        ];

        // テスト実行
        // リクエストを送信する
        $response = $this->postJson("api/matters", $data);

        // テスト確認
        // ステータスコードの検証
        $response->assertStatus(201); // 201 Cerated
    }

    /**
     * 獣害情報を取得できること
     */
    public function testDetail()
    {
        // テスト準備
        $matter = Matter::factory()->create();

        // テスト実行
        // リクエストを送信する
        $response = $this->getJson("api/matters/{$matter->id}");

        // テスト確認
        // ステータスコードの検証
        $response->assertStatus(200);
    }
}
