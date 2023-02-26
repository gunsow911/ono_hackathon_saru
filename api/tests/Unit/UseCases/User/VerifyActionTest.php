<?php declare(strict_types=1);

namespace Tests\Unit\UseCases\User;

use App\Models\User;
use App\UseCases\User\VerifyAction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Ramsey\Uuid\Uuid;
use Tests\TestCase;

class VerifyActionTest extends TestCase
{ 
    use RefreshDatabase;

    /**
     * ユーザテーブル内該当するUserIdがある場合、
     * ユーザの存在を確認できること
     */
    public function testVerify01()
    {
        // テスト準備
        /** @var User */
        $user = User::factory()->create();
        $action = new VerifyAction();

        // テスト実行
        $result = $action($user->id);

        // テスト確認
        // ユーザが確認できること
        $this->assertTrue($result);
    }

    /**
     * ユーザテーブル内該当するUserIdが無い場合、
     * ユーザの存在を確認できないこと
     */
    public function testVerify02()
    {
        // 適当なUUIDを生成
        $userId = Uuid::uuid4()->toString(); 
        $action = new VerifyAction();

        // テスト実行
        $result = $action($userId);

        // テスト確認
        // ユーザが確認できないこと
        $this->assertFalse($result);
    }
}

