<?php

declare(strict_types=1);

namespace Tests\Unit\UseCases\User;

use App\Models\User;
use App\UseCases\User\ListAction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use MatanYadaev\EloquentSpatial\Objects\Point;
use Tests\TestCase;

use function count;

class ListActionTest extends TestCase
{
    use RefreshDatabase;

    /**
     * ユーザー情報一覧を取得できること
     * idの昇順になっていること
     */
    public function testList01()
    {
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

        $action = new ListAction();

        // テスト実行
        /** @var User[] */
        $results = $action()->get();

        // テスト確認
        $this->assertSame(3, count($results));
        $this->assertSame($user1->id, $results[0]->id);
        $this->assertSame($user2->id, $results[1]->id);
        $this->assertSame($user3->id, $results[2]->id);
    }
}
