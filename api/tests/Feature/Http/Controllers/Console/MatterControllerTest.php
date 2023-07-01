<?php

declare(strict_types=1);

namespace Tests\Feature\Http\Controllers\Console;

use App\Models\AdminUser;
use Mockery;
use App\Models\Matter;
use App\UseCases\Matter\MultipleRemoveSelectedAction;
use App\UseCases\Matter\ListAction;
use App\UseCases\Matter\RemoveAction;
use App\UseCases\Matter\UpdateAction;
use Tests\ControllerTestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Pagination\LengthAwarePaginator;
use MatanYadaev\EloquentSpatial\SpatialBuilder;

/**
 * 管理者コンソールの獣害コントローラテスト
 */
class MatterControllerTest extends ControllerTestCase
{
    use RefreshDatabase;

    /**
     * 害獣情報を一覧できること
     */
    public function testIndex()
    {
        // 管理者ユーザを用意
        /** @var AdminUser */
        $admin = AdminUser::factory()->create();
        // テスト準備
        $matter1 = Matter::factory()->create();
        $matter2 = Matter::factory()->create();
        $matter3 = Matter::factory()->create();

        // ペジネータ作成
        // LengthAwarePaginatorで、ペジネータを手動生成できます。
        $paginator = new LengthAwarePaginator([$matter1, $matter2, $matter3], 2, 20);

        // アクションの戻り値をモックする
        /** @var SpatialBuilder|MockInterface */
        $builder = Mockery::mock(SpatialBuilder::class);
        $builder->shouldReceive('with')
            ->withArgs([['user']]);
        $builder->shouldReceive('paginate')
            ->withArgs([20])
            ->andReturn($paginator);

        $this->mockAction(ListAction::class, $builder);

        // テスト実行
        // リクエストを送信する
        // actingAsは、第1引数のユーザでログインしたことにするテスト用のメソッドです。
        // 通常、第2引数を使うことはありませんが、ログインする「ユーザ」が複数ある場合は設定が必要です。
        // これは、今後の開発で、通常ユーザのログインが必要になることを見越しています
        $response = $this->actingAs($admin, 'admin')
            ->getJson("api/console/matters");

        // テスト確認
        // ステータスコードの検証
        // JSONの検証
        $response->assertStatus(200) // 200 OK
            ->assertJsonCount(3); // 3件ある
    }

    /**
     * 獣害情報を取得できること
     */
    public function testDetail()
    {
        // 管理者ユーザを用意
        /** @var AdminUser */
        $admin = AdminUser::factory()->create();

        // テスト準備
        /** @var Matter */
        $matter = Matter::factory()->create();

        // テスト実行
        // リクエストを送信する
        // actingAsは、第1引数のユーザでログインしたことにするテスト用のメソッドです。
        // 通常、第2引数を使うことはありませんが、ログインする「ユーザ」が複数ある場合は設定が必要です。
        // これは、今後の開発で、通常ユーザのログインが必要になることを見越しています
        $response = $this->actingAs($admin, 'admin')
            ->getJson("api/console/matters/{$matter->id}");

        // テスト確認
        // ステータスコードの検証
        $response->assertStatus(200);
    }

    /**
     * 獣害情報を更新できること
     */
    public function testUpdate()
    {
        // 管理者ユーザを用意
        /** @var AdminUser */
        $admin = AdminUser::factory()->create();

        // テスト準備
        /** @var Matter */
        $matter = Matter::factory()->create();
        $this->mockAction(UpdateAction::class, $matter);

        $data = [
            'applied_at' => "2023-04-01",
            'lat' => "136.123",
            'lng' => "32.456",
        ];

        // テスト実行
        // リクエストを送信する
        // actingAsは、第1引数のユーザでログインしたことにするテスト用のメソッドです。
        // 通常、第2引数を使うことはありませんが、ログインする「ユーザ」が複数ある場合は設定が必要です。
        // これは、今後の開発で、通常ユーザのログインが必要になることを見越しています
        $response = $this->actingAs($admin, 'admin')
            ->putJson("api/console/matters/{$matter->id}", $data);

        // テスト確認
        // ステータスコードの検証
        $response->assertStatus(200);
    }

    /**
     * 獣害情報を削除できること
     */
    public function testRemove()
    {
        // 管理者ユーザを用意
        /** @var AdminUser */
        $admin = AdminUser::factory()->create();

        // テスト準備
        /** @var Matter */
        $matter = Matter::factory()->create();
        $this->mockAction(RemoveAction::class);

        // テスト実行
        // リクエストを送信する
        // actingAsは、第1引数のユーザでログインしたことにするテスト用のメソッドです。
        // 通常、第2引数を使うことはありませんが、ログインする「ユーザ」が複数ある場合は設定が必要です。
        // これは、今後の開発で、通常ユーザのログインが必要になることを見越しています
        $response = $this->actingAs($admin, 'admin')
            ->deleteJson("api/console/matters/{$matter->id}");

        // テスト確認
        // ステータスコードの検証
        $response->assertStatus(200);
    }

    /**
     * 複数の獣害情報を一括で削除できること
     */
    public function testRemoveSelected()
    {
        // 管理者ユーザを用意
        /** @var AdminUser */
        $admin = AdminUser::factory()->create();

        // テスト用の架空の入力値準備
        /** @var Matter */
        $matter1 = Matter::factory()->create();
        $this->mockAction(MultipleRemoveSelectedAction::class, $matter1);
        $matter2 = Matter::factory()->create();
        $this->mockAction(MultipleRemoveSelectedAction::class, $matter2);


        $data = [
            // 'ids' => ['01gzkj3p3zemwpbvfw7yp79kyp', '01h1e8fpfry3hk23qsd0mnv2xm']
            'ids' => [$matter1->id, $matter2->id]
        ];


        $response = $this->actingAs($admin, 'admin')
            ->postJson("api/console/matters", $data);

        // テスト確認
        // ステータスコードの検証及びjsonの検証
        $response->assertStatus(200);
            // ->assertJsonStructure([
            //     'message'
            // ]);
    }
}
