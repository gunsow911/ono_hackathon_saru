<?php declare(strict_types=1);

namespace Tests\Feature\Http\Controllers;

use App\Models\AdminUser;
use Tests\ControllerTestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AdminUserControllerTest extends ControllerTestCase
{
    use RefreshDatabase;

    /**
     * 管理者情報を取得できること
     */
    public function testMe()
    {
        // テスト準備
        // 管理者ユーザを作成する
        /** @var AdminUser */
        $admin = AdminUser::factory()->create([
            'name' => 'test_admin_user',
        ]);

        // テスト実行
        // リクエストを送信する
        // actingAsでログインしていることをシミュレートできる
        // 第2引数で、ガードを選択可能
        $response = $this->actingAs($admin, 'admin')
            ->getJson("api/console/admin-users/me");

        // テスト確認
        // ステータスコードの検証
        // JSONの検証
        $response->assertStatus(200) // 200 OK
                 ->assertJson([
                     'id' => $admin->id,
                     'name' => 'test_admin_user',
                 ]);
    }

    /**
     * 管理者の名前とパスワードが正しい場合、管理者ログインができること
     */
    public function testLoginSuccess() 
    {
        // テスト準備
        // 管理者ユーザを作成する
        // factoryで作成された管理者ユーザのパスワードは"password"
        /** @var AdminUser */
        $admin = AdminUser::factory()->create([
            'name' => 'test_admin_user',
        ]);

        // テスト実行
        // リクエストを送信する
        $response = $this
            ->postJson("api/console/login", [
                'username' => 'test_admin_user',
                'password' => 'password',
            ]);

        // テスト確認
        // ステータスコードの検証
        // JSONの検証
        $response->assertStatus(200) // 200 OK
                 ->assertJson(['message' => 'OK']);

        // ログインしているかどうか検証
        $this->assertAuthenticatedAs($admin, 'admin');
    }

    /**
     * 管理者の名前とパスワードが正しくない場合、管理者ログインができないこと
     */
    public function testLoginFail() 
    {
        // テスト準備
        // 管理者ユーザを作成する
        // factoryで作成された管理者ユーザのパスワードは"password"
        /** @var AdminUser */
        AdminUser::factory()->create([
            'name' => 'test_admin_user',
        ]);

        // テスト実行
        // リクエストを送信する
        $response = $this
            ->postJson("api/console/login", [
                'username' => 'test_admin_user',
                'password' => 'wrong_password', // パスワードが違う
            ]);

        // テスト確認
        // ステータスコードの検証
        // JSONの検証
        $response->assertStatus(401) // 401 Unauthorized
                 ->assertJson(['message' => 'メールアドレスかパスワードが違います。']);
        
        // ログインしていないかどうか検証
        $this->assertGuest('admin');
    }

    /**
     * 管理者ログアウトできること
     */
    public function testLogout() 
    {
        // テスト準備
        // 管理者ユーザを作成する
        // factoryで作成された管理者ユーザのパスワードは"password"
        /** @var AdminUser */
        $admin = AdminUser::factory()->create([
            'name' => 'test_admin_user',
        ]);

        // テスト実行
        // リクエストを送信する
        $response = $this->actingAs($admin, 'admin')
            ->deleteJson("api/console/logout");

        // テスト確認
        // ステータスコードの検証
        // JSONの検証
        $response->assertStatus(200) // 200 OK
                 ->assertJson(['message' => 'OK']);

        // ログインしていないかどうか検証
        $this->assertGuest('admin');
    }
}


