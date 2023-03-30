<?php declare(strict_types=1);

namespace Tests\Unit\UseCases\User;

use App\Models\User;
use App\UseCases\User\SaveAction;
use App\UseCases\User\SaveEntity;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * ユーザ保存アクションのテスト
 */
class SaveActionTest extends TestCase
{ 
    use RefreshDatabase;

    /**
     * ユーザを作成できること
     */
    public function testCreate01()
    {
        // テスト準備
        $entity =  new SaveEntity([
            'name' => 'テスト山田太郎',
            'description' => 'テスト説明',
        ]);

        // テスト実行
        $action = new SaveAction();
        $result = $action($entity, null); // 新規作成

        // テスト確認
        // ユーザが新規作成されていること
        $this->assertNotNull($result->id);
        $this->assertSame('テスト山田太郎', $result->name);
        $this->assertSame('テスト説明', $result->description);
    }

    /**
     * ユーザを編集できること
     */
    public function testUpdate01()
    {
        // 適当なユーザを生成
        $user = User::factory()->create([
            'name' => 'テスト名前変更前',
            'description' => 'テスト説明変更前',
        ]); 
        $entity =  new SaveEntity([
            'name' => 'テスト名前変更後',
            'description' => 'テスト説明変更後',
        ]);

        // テスト実行
        $action = new SaveAction();
        $result = $action($entity, $user); // ユーザ新規作成

        // テスト確認
        // ユーザが編集されていること
        $this->assertNotNull($result->id);
        $this->assertSame($user->id, $result->id);
        $this->assertSame('テスト名前変更後', $result->name);
        $this->assertSame('テスト説明変更後', $result->description);
    }
}

