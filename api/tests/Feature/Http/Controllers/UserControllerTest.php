<?php declare(strict_types=1);

namespace Tests\Feature\Http\Controllers;

use App\Models\User;
use Tests\ControllerTestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
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

}


