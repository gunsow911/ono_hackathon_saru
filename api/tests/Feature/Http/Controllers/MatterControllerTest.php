<?php

declare(strict_types=1);

namespace Tests\Feature\Http\Controllers;

use Mockery;
use App\Models\Matter;
use App\Models\User;
use App\UseCases\Matter\ListAction;
use App\UseCases\Matter\SaveAction;
use Tests\ControllerTestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Pagination\LengthAwarePaginator;
use MatanYadaev\EloquentSpatial\SpatialBuilder;

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
        $action = Mockery::mock(ListAction::class);
        $action->shouldReceive('__invoke')
        ->andReturn([$matter1, $matter2, $matter3]);

        $this->instance(ListAction::class, $action);

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
        $this->mockAction(SaveAction::class, $matter);

        $data = [
            'user_id' => $user->id,
            'lat' => "136.123",
            'lng' => "32.456",
        ];

        // テスト実行
        // リクエストを送信する
        $response = $this->postJson("api/matters", $data);

        // テスト確認
        // ステータスコードの検証
        $response->assertStatus(201); // 201 Cerated
    }
}
