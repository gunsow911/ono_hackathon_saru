<?php declare(strict_types=1);

namespace Tests\Feature\Http\Controllers\Console;

use App\Models\AdminUser;
use App\Models\User;
use App\UseCases\User\ListAction;
use App\UseCases\User\SaveAction;
use Illuminate\Database\Eloquent\Builder;
use Tests\ControllerTestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Pagination\LengthAwarePaginator;
use Mockery;

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

    /**
     * 登録ユーザーの一覧が取得できること
     */
    public function testIndex()
    {
        /** @var AdminUser */
        $admin = AdminUser::factory()->create();

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

        // ペジネータ作成
        // LengthAwarePaginatorで、ペジネータを手動生成できます。
        $paginator = new LengthAwarePaginator([$user1, $user2, $user3], 2, 20);

        // アクションの戻り値をモックする
        /** @var Builder|MockInterface */
        $builder = Mockery::mock(Builder::class);
        $builder->shouldReceive('paginate')
            ->withArgs([20])
            ->andReturn($paginator);

        $this->mockAction(ListAction::class, $builder);

        $response = $this->actingAs($admin, 'admin')
                         ->getJson("api/console/users");

        // テスト確認
        // ステータスコードの検証
        // JSONの検証
        $response->assertStatus(200) // 200 OK
            ->assertJsonCount(3); // 3件ある
    }
}


