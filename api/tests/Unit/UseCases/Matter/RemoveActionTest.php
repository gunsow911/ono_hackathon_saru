<?php declare(strict_types=1);

namespace Tests\Unit\UseCases\Matter;

use App\Models\Matter;
use App\UseCases\Matter\RemoveAction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Ramsey\Uuid\Uuid;
use Tests\TestCase;

/**
 * 獣害情報削除アクションのテスト
 */
class RemoveActionTest extends TestCase
{ 
    use RefreshDatabase;

    /**
     * 獣害情報を削除できること
     */
    public function testRemove01()
    {
        // テスト準備
        // 適当な獣害情報を生成
        $matter = Matter::factory()->create(); 

        // テスト実行
        $action = new RemoveAction();
        $action($matter);

        // テスト確認
        $result = Matter::where('id', '=', $matter->id)->first();

        // ユーザが削除されていること
        $this->assertNull($result);
    }

    /**
     * 存在しないユーザを削除しようとした場合でも、例外は発生しないこと
     */
    public function testRemove02()
    {
        // テスト準備
        // 適当な獣害情報を生成(DBに登録はしない)
        $matter = Matter::factory()->make([
            'id' => Uuid::uuid4(), // 適当にUUIDを発行
        ]); 

        // テスト実行
        $action = new RemoveAction();
        $action($matter);

        // テスト確認
        // 例外が発生していないこと
        $this->assertTrue(true);
    }
}

