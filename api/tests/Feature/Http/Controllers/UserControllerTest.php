<?php

declare(strict_types=1);

namespace Tests\Feature\Http\Controllers;

use App\Models\User;
use App\UseCases\User\ListAction;
use Tests\ControllerTestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;
use Ramsey\Uuid\Uuid;

class UserControllerTest extends ControllerTestCase
{
    use RefreshDatabase;

    /**
     * ユーザが存在する場合、ステータスコード200が返却されること
     */
    public function testVerifySuccess()
    {
        // テスト準備
        // ユーザを作成する
        /** @var User */
        $user = User::factory()->create([
            'name' => 'テストユーザ1',
            'description' => 'テストユーザの説明',
        ]);

        // テスト実行
        // リクエストを送信する
        $response = $this->getJson("api/users/{$user->id}/verify");

        // テスト確認
        // ステータスコードの検証
        // JSONの検証
        $response->assertStatus(200) // 200 OK
                ->assertJson(['message' => 'OK']);
    }

    /**
     * ユーザが存在しない場合、ステータスコード404が返却されること
     */
    public function testVerifyFail()
    {
        // テスト準備
        // 適当なUUIDを作成する
        $uuid =  Uuid::uuid4();

        // テスト実行
        // リクエストを送信する
        $response = $this->getJson("api/users/{$uuid}/verify");

        // テスト確認
        // ステータスコードの検証
        // JSONの検証
        $response->assertStatus(404) // 404 NotFound
                ->assertJson(['message' => '指定されたユーザは存在しません。']);
    }

    /**
     * 登録ユーザーの一覧が取得できること
     */
    public function testIndex()
    {
        // テスト準備
        // ユーザを作成する
        /** @var User */
        $user1 = User::factory()->create([
            'name' => 'テストユーザ1',
            'description' => 'テストユーザ1の説明',
        ]);
        $user2 = User::factory()->create([
            'name' => 'テストユーザ2',
            'description' => 'テストユーザ2の説明',
        ]);
        $user3 = User::factory()->create([
            'name' => 'テストユーザ3',
            'description' => 'テストユーザ3の説明',
        ]);

        // アクションの戻り値をモックする
        /** @var SpatialBuilder|MockInterface */
        $builder = Mockery::mock(SpatialBuilder::class);
        $builder->shouldReceive('get')
            ->andReturn([$user1, $user2, $user3]);

        $this->mockAction(ListAction::class, $builder);

        $response = $this->getJson("api/console/users");

        // テスト確認
        // ステータスコードの検証
        // JSONの検証
        $response->assertStatus(200) // 200 OK
            ->assertJsonCount(3); // 3件ある
    }
}
