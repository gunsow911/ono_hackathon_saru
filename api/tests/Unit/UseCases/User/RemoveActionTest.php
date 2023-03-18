<?php declare(strict_types=1);

namespace Tests\Unit\UseCases\User;

use App\Models\User;
use App\UseCases\User\RemoveAction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Ramsey\Uuid\Uuid;
use Tests\TestCase;

/**
 * ユーザ削除アクションのテスト
 */
class RemoveActionTest extends TestCase
{ 
    use RefreshDatabase;

    /**
     * ユーザを削除できること
     */
    public function testRemove01()
    {
        // テスト準備
        // 適当なユーザを生成
        $user = User::factory()->create([
            'name' => 'テスト名前',
            'description' => 'テスト説明',
        ]); 

        // テスト実行
        $action = new RemoveAction();
        $action($user);

        // テスト確認
        $result = User::where('id', '=', $user->id)->first();

        // ユーザが削除されていること
        $this->assertNull($result);
    }

    /**
     * 存在しないユーザを削除しようとした場合でも、例外は発生しないこと
     */
    public function testRemove02()
    {
        // テスト準備
        // 適当なユーザを生成(DBに登録はしない)
        $user = User::factory()->make([
            'id' => Uuid::uuid4(), // 適当にUUIDを発行
            'name' => 'テスト名前',
            'description' => 'テスト説明',
        ]); 

        // テスト実行
        $action = new RemoveAction();
        $action($user);

        // テスト確認
        // 例外が発生していないこと
        $this->assertTrue(true);
    }
}

