<?php

declare(strict_types=1);

namespace Tests\Unit\UseCases\User;

use App\Models\User;
use App\UseCases\User\ListAction;
use App\UseCases\User\ListEntity;
use Illuminate\Foundation\Testing\RefreshDatabase;
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

        // 検索条件
        $entity = new ListEntity([
            'query' => '',
            // 'from' => null,
            // 'to' => null,
        ]);

        $action = new ListAction();

        // テスト実行
        /** @var User[] */
        $results = $action($entity)->get();

        // テスト確認
        $this->assertSame(3, count($results));
        $this->assertSame($user1->id, $results[0]->id);
        $this->assertSame($user2->id, $results[1]->id);
        $this->assertSame($user3->id, $results[2]->id);
    }


    /**
     * 部分一致検索で検索したユーザー情報一覧を取得できること
     */
    public function testSearchUser()
    {
        // テスト準備
        // ユーザを作成する
        /** @var User */
        $user1 = User::factory()->create([
            'name' => 'テスト一郎',
            // 'description' => 'テストユーザ1の説明',
        ]);
        $user2 = User::factory()->create([
            'name' => 'テスト次郎',
            // 'description' => 'テストユーザ2の説明',
        ]);
        $user3 = User::factory()->create([
            'name' => 'てすと三郎',
            // 'description' => 'テストユーザ3の説明',
        ]);
        $user4 = User::factory()->create([
            'name' => '架空四郎',
            // 'description' => 'テストユーザ4の説明',
        ]);
        $user5 = User::factory()->create([
            'name' => '架空五郎',
            // 'description' => 'テストユーザ5の説明',
        ]);

        $action = new ListAction();

        // 検索条件
        $entity = new ListEntity([
            'query' => 'テスト',
            // 'from' => null,
            // 'to' => null,
        ]);
        // ※ひらがなとカタカナの区別はないことに注意


        // テスト実行
        /** @var User[] */
        $results = $action($entity)->get();

        // 「テスト」で3件ヒット
        $this->assertSame(3, count($results));
        $this->assertSame($user1->id, $results[0]->id);
        $this->assertSame($user2->id, $results[1]->id);
        $this->assertSame($user3->id, $results[2]->id);

        // 検索条件
        $entity = new ListEntity([
            'query' => '架空',
            // 'from' => null,
            // 'to' => null,
        ]);

        // テスト実行
        /** @var User[] */
        $results = $action($entity)->get();

        // テスト確認
        // 「架空」で2件ヒット
        $this->assertSame(2, count($results));
        $this->assertSame($user4->id, $results[0]->id);
        $this->assertSame($user5->id, $results[1]->id);
    }
}
