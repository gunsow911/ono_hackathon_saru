<?php declare(strict_types=1);

namespace Tests\Unit\UseCases\Matter;

use App\Models\Matter;
use App\Models\User;
use App\UseCases\Matter\ListAction;
use App\UseCases\Matter\ListEntity;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use MatanYadaev\EloquentSpatial\Objects\Point;
use Tests\TestCase;
use function count;

class ListActionTest extends TestCase
{ 
    use RefreshDatabase;

    /**
     * 害獣情報一覧を取得できること
     * applied_atの降順になっていること
     */
    public function testList01()
    {
        // テスト準備
        /** @var Matter */
        $matter1 = Matter::factory()->create([
            'location' => new Point(131.0, 34.0),
            'applied_at' => "2023-02-01",
        ]);
        $matter2 = Matter::factory()->create([
            'location' => new Point(132.0, 35.0),
            'applied_at' => "2023-03-01",
        ]);
        $matter3 = Matter::factory()->create([
            'location' => new Point(130.0, 34.0),
            'applied_at' => "2023-01-01",
        ]);

        // 検索条件
        $entity = new ListEntity([
            'query' => '',
            'from' => null, 
            'to' => null,
        ]);

        $action = new ListAction();

        // テスト実行
        /** @var Matter[] */
        $results = $action($entity)->get();

        // テスト確認
        $this->assertSame(3, count($results));
        $this->assertSame($matter2->id, $results[0]->id);
        $this->assertSame($matter1->id, $results[1]->id);
        $this->assertSame($matter3->id, $results[2]->id);
    }

    /**
     * 害獣情報一覧を取得できること
     * ユーザ名を部分一致検索で検索できること
     */
    public function testUser01()
    {
        // テスト準備
        /** @var Matter */
        $matter1 = Matter::factory()
            ->for(User::factory()->state([
                'name' => 'テスト太郎'
            ]))
            ->create([
                'location' => new Point(131.0, 34.0),
                'applied_at' => "2023-02-01",
            ]);
        /** @var Matter */
        $matter2 = Matter::factory()
            ->for(User::factory()->state([
                'name' => 'ほげほげ次郎'
            ]))
            ->create([
                'location' => new Point(131.0, 34.0),
                'applied_at' => "2023-02-01",
            ]);
        /** @var Matter */
        $matter3 = Matter::factory()
            ->for(User::factory()->state([
                'name' => 'テスト花子'
            ]))
            ->create([
                'location' => new Point(131.0, 34.0),
                'applied_at' => "2023-02-01",
            ]);

        $action = new ListAction();

        // 検索条件
        $entity = new ListEntity([
            'query' => '郎',
            'from' => null, 
            'to' => null,
        ]);

        // テスト実行
        /** @var Matter[] */
        $results = $action($entity)->get();

        // テスト確認
        // 「郎」で2件ヒット
        $this->assertSame(2, count($results));
        $this->assertSame($matter1->id, $results[0]->id);
        $this->assertSame($matter2->id, $results[1]->id);

        // 検索条件
        $entity = new ListEntity([
            'query' => 'テスト',
            'from' => null, 
            'to' => null,
        ]);

        // テスト実行
        /** @var Matter[] */
        $results = $action($entity)->get();

        // テスト確認
        // 「テスト」で2件ヒット
        $this->assertSame(2, count($results));
        $this->assertSame($matter1->id, $results[0]->id);
        $this->assertSame($matter3->id, $results[1]->id);
    }

    /**
     * 害獣情報一覧を取得できること
     * ユーザIDを完全一致検索で検索できること
     */
    public function testUser02()
    {
        // テスト準備
        /** @var Matter */
        $matter = Matter::factory()
            ->for(User::factory()->state([
                'name' => 'ほげほげ次郎'
            ]))
            ->create([
                'location' => new Point(131.0, 34.0),
                'applied_at' => "2023-02-01",
            ]);

        $action = new ListAction();

        // 検索条件
        $entity = new ListEntity([
            'query' => $matter->user_id,
            'from' => null, 
            'to' => null,
        ]);

        // テスト実行
        /** @var Matter[] */
        $results = $action($entity)->get();

        // テスト確認
        // 1件ヒット
        $this->assertSame(1, count($results));
        $this->assertSame($matter->id, $results[0]->id);

        // 検索条件
        $entity = new ListEntity([
            'query' => substr($matter->user_id, 0, 5), // 部分文字列にする
            'from' => null, 
            'to' => null,
        ]);

        // テスト実行
        /** @var Matter[] */
        $results = $action($entity)->get();

        // テスト確認
        // 0件ヒット
        $this->assertSame(0, count($results));
    }

    /**
     * 害獣情報一覧を取得できること
     * 日付(自)を指定するとその日付を含んだ以降の獣害情報が取得できること
     */
    public function testFrom01() {
        // テスト準備
        /** @var Matter */
        $matter1 = Matter::factory()->create([
            'location' => new Point(131.0, 34.0),
            'applied_at' => "2023-02-01",
        ]);
        $matter2 = Matter::factory()->create([
            'location' => new Point(132.0, 35.0),
            'applied_at' => "2023-03-01",
        ]);
        $matter3 = Matter::factory()->create([
            'location' => new Point(130.0, 34.0),
            'applied_at' => "2023-01-01",
        ]);

        // 検索条件
        $entity = new ListEntity([
            'query' => '',
            'from' => new Carbon('2023-02-01'), 
            'to' => null,
        ]);

        $action = new ListAction();

        // テスト実行
        /** @var Matter[] */
        $results = $action($entity)->get();

        // テスト確認
        $this->assertSame(2, count($results));
        $this->assertSame($matter2->id, $results[0]->id);
        $this->assertSame($matter1->id, $results[1]->id);
    }

    /**
     * 害獣情報一覧を取得できること
     * 日付(至)を指定するとその日付を含んだ以前の獣害情報が取得できること
     */
    public function testTo01() {
        // テスト準備
        /** @var Matter */
        $matter1 = Matter::factory()->create([
            'location' => new Point(131.0, 34.0),
            'applied_at' => "2023-02-01",
        ]);
        $matter2 = Matter::factory()->create([
            'location' => new Point(132.0, 35.0),
            'applied_at' => "2023-03-01",
        ]);
        $matter3 = Matter::factory()->create([
            'location' => new Point(130.0, 34.0),
            'applied_at' => "2023-01-01",
        ]);

        // 検索条件
        $entity = new ListEntity([
            'query' => '',
            'from' => null, 
            'to' => new Carbon('2023-02-01'),
        ]);

        $action = new ListAction();

        // テスト実行
        /** @var Matter[] */
        $results = $action($entity)->get();

        // テスト確認
        $this->assertSame(2, count($results));
        $this->assertSame($matter1->id, $results[0]->id);
        $this->assertSame($matter3->id, $results[1]->id);
    }
}


