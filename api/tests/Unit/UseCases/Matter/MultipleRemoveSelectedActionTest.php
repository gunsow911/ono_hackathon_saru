<?php

declare(strict_types=1);

namespace Tests\Unit\UseCases\Matter;

use App\Models\Matter;
use App\UseCases\Matter\MultipleRemoveSelectedAction;
use App\UseCases\Matter\MultipleRemoveSelectedEntity;
use App\UseCases\Matter\RemoveAction;
use Illuminate\Foundation\Testing\RefreshDatabase;
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
     * idのリストが空だった場合に何も起こらない
     */
    public function testMultipleRemoveSelected02()
    {
        $entity = new MultipleRemoveSelectedEntity([
            'ids' => []
        ]);

        $action = new MultipleRemoveSelectedAction(new RemoveAction());
        $action($entity);

        $this -> assertTrue(true);
    }
}
