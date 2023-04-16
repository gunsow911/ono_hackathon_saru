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
        $matter1->load([
            // 'userId',
            'location',
            'appliedAt',
            'kind',
            'isAlone',
            'deleteAt',
            'createdAt',
            'updatedAt',
        ]);
        $matter2 = Matter::factory()->create();
        $matter2->load([
            // 'userId',
            'location',
            'appliedAt',
            'kind',
            'isAlone',
            'deleteAt',
            'createdAt',
            'updatedAt',
        ]);
        $matter3 = Matter::factory()->create();
        $matter3->load([
            // 'userId',
            'location',
            'appliedAt',
            'kind',
            'isAlone',
            'deleteAt',
            'createdAt',
            'updatedAt',
        ]);

        // ペジネータ作成
        $paginator = new LengthAwarePaginator([$matter1, $matter2, $matter3], 3, 20);

        // アクションの戻り値をモックする
        /** @var SpatialBuilder|MockInterface */
        $builder = Mockery::mock(SpatialBuilder::class);
        $builder->shouldReceive('with')
            ->withArgs([[
                // 'userId',
                'location',
                'appliedAt',
                'kind',
                'isAlone',
                'deleteAt',
                'createdAt',
                'updatedAt',
            ]])
            ->andReturn($paginator);
        $builder->shouldReceive('paginate')
        ->withArgs([20])
        ->andReturn($paginator);

        $this->mockAction(ListAction::class, $builder);
        // policyができれば、ここにmockpolicyが入ることになる？

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
