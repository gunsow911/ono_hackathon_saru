<?php declare(strict_types=1);

namespace Tests\Feature\Http\Controllers\Console;

use App\Models\AdminUser;
use App\Models\User;
use App\UseCases\User\SaveAction;
use Tests\ControllerTestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

/**
 * 管理者コンソールのユーザコントローラテスト
 */
class UserControllerTest extends ControllerTestCase
{
    use RefreshDatabase;

    /**
     * ユーザ情報を作成できること
     */
    public function testCreate()
    {
        /** @var AdminUser */
        $admin = AdminUser::factory()->create();

        // テスト準備
        $user = User::factory()->create();
        $this->mockAction(SaveAction::class, $user);

        $data = [
            'name' => 'テスト太郎',
            'description' => "テスト説明j",
        ];

        // テスト実行
        // リクエストを送信する
        $response = $this->actingAs($admin, 'admin')
            ->postJson("api/console/users", $data);

        // テスト確認
        // ステータスコードの検証
        $response->assertStatus(201); // 201 Cerated
    }
}


