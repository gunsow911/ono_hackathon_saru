<?php declare(strict_types=1);

namespace Tests\Feature\Http\Controllers\Console;

use App\Models\AdminUser;
use Mockery;
use App\Models\Matter;
use App\Models\User;
use App\UseCases\Matter\ListAction;
use App\UseCases\Matter\SaveAction;
use Tests\ControllerTestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
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

        // アクションの戻り値をモックする
        /** @var SpatialBuilder|MockInterface */
        $builder = Mockery::mock(SpatialBuilder::class);
        $builder->shouldReceive('get')
            ->andReturn([$matter1, $matter2, $matter3]);

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
     * 獣害情報を作成できること
     */
    public function testCreate()
    {
        // 管理者ユーザを用意
        /** @var AdminUser */
        $admin = AdminUser::factory()->create();

        // テスト準備
        $user = User::factory()->create();
        $matter = Matter::factory()->create();
        $this->mockAction(SaveAction::class, $matter);

        $data = [
            'user_id' => $user->id,
            'lat' => "136.123",
            'lng' => "32.456",
        ];

        // テスト実行
        // リクエストを送信する
        // actingAsは、第1引数のユーザでログインしたことにするテスト用のメソッドです。
        // 通常、第2引数を使うことはありませんが、ログインする「ユーザ」が複数ある場合は設定が必要です。
        // これは、今後の開発で、通常ユーザのログインが必要になることを見越しています
        $response = $this->actingAs($admin, 'admin')
            ->postJson("api/console/matters", $data);

        // テスト確認
        // ステータスコードの検証
        $response->assertStatus(201); // 201 Cerated
    }
}

