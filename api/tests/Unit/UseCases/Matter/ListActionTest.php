<?php declare(strict_types=1);

namespace Tests\Unit\UseCases\Matter;

use App\Models\Matter;
use App\UseCases\Matter\ListAction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use MatanYadaev\EloquentSpatial\Objects\Point;
use Tests\TestCase;
use function count;

class ListActionTest extends TestCase
{ 
    use RefreshDatabase;

    /**
     * 害獣情報一覧を取得できること
     * applied_atの昇順になっていること
     */
    public function testLest01()
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

        $action = new ListAction();

        // テスト実行
        /** @var Matter[] */
        $results = $action()->get();

        // テスト確認
        $this->assertSame(3, count($results));
        $this->assertSame($matter3->id, $results[0]->id);
        $this->assertSame($matter1->id, $results[1]->id);
        $this->assertSame($matter2->id, $results[2]->id);
    }
}


