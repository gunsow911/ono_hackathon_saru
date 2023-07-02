<?php

declare(strict_types=1);

namespace Tests\Unit\UseCases\Matter;

use App\Models\AdminUser;
use App\Models\Matter;
use App\UseCases\Matter\MultipleRemoveSelectedAction;
use App\UseCases\Matter\MultipleRemoveSelectedEntity;
use App\UseCases\Matter\RemoveAction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Ramsey\Uuid\Uuid;
use Tests\TestCase;

/**
 * (管理者による)複数獣害情報削除アクションのテスト
 */
class MultipleRemoveSelectedActionTest extends TestCase
{
    use RefreshDatabase;

    /**
     * idのリストを指定するとそのid全てが削除されること
     */
    public function testMultipleRemoveSelected01()
    {

        $matter1 = Matter::factory()->create();
        $matter2 = Matter::factory()->create();

        $entity = new MultipleRemoveSelectedEntity([
            'ids' => [$matter1->id, $matter2->id]
        ]);

        $action = new MultipleRemoveSelectedAction(new RemoveAction());
        $action($entity);

        /** @var Matter */
        $result1 = Matter::find($matter1->id);
        $result2 = Matter::find($matter2->id);

        // 対象の獣害情報がなくなっていることを確認
        $this->assertNull($result1);
        $this->assertNull($result2);
    }


    /**
     * 獣害情報を削除できること
     */
    // public function testRemove01()
    // {
    //     // テスト準備
    //     // 適当な獣害情報を生成
    //     $matter = Matter::factory()->create();

    //     // テスト実行
    //     $action = new RemoveAction();
    //     $action($matter);

    //     // テスト確認
    //     $result = Matter::where('id', '=', $matter->id)->first();

    //     // ユーザが削除されていること
    //     $this->assertNull($result);
    // }

    /**
     * 存在しないユーザを削除しようとした場合でも、例外は発生しないこと
     */
    // public function testRemove02()
    // {
    //     // テスト準備
    //     // 適当な獣害情報を生成(DBに登録はしない)
    //     $matter = Matter::factory()->make([
    //         'id' => Uuid::uuid4(), // 適当にUUIDを発行
    //     ]);

    //     // テスト実行
    //     $action = new RemoveAction();
    //     $action($matter);

    //     // テスト確認
    //     // 例外が発生していないこと
    //     $this->assertTrue(true);
    // }
}
