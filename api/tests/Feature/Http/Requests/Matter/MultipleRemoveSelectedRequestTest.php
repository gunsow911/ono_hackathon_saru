<?php declare(strict_types=1);

namespace Tests\Feature\Http\Requests\Matter;

use Tests\FormRequestTestCase;
use App\Http\Requests\Matter\MultipleRemoveSelectedRequest;
use App\Models\Matter;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Arr;
use function count;

class MultipleRemoveSelectedRequestTest extends FormRequestTestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
    }

    /**
     * 獣害情報リストが取得できること
     */
    public function testMakeEntity01()
    {
        /** @var Matter */
        $matter1 = Matter::factory()->create();
        /** @var Matter */
        $matter2 = Matter::factory()->create();
        /** @var Matter */
        $matter3 = Matter::factory()->create();
        $data = [
            "ids" => [$matter1->id, $matter2->id, $matter3->id]
        ];
        /** @var MultipleRemoveSelectedRequest */
        $req = $this->getValidatedRequest($data, MultipleRemoveSelectedRequest::class);
        $entity = $req->makeEntity();
        $expects = [$matter1->id, $matter2->id, $matter3->id];
        $this->assertSame($expects, $entity->getIds());
    }

    /**
     * 獣害情報リストが配列以外の場合バリデーションエラーになること
     */
    public function testValidateIds01()
    {
        $data = [
            "ids" => "wrong_data"
        ];
        $actual = $this->getValidateErrors($data, MultipleRemoveSelectedRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('IDリストは配列でなくてはなりません。', Arr::get($actual, 'ids.0'));
    }

    /**
     * 獣害情報リストが空の場合バリデーションエラーになること
     */
    public function testValidateIds02()
    {
        $data = [
            "ids" => [],
        ];
        $actual = $this->getValidateErrors($data, MultipleRemoveSelectedRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('IDリストは必ず指定してください。', Arr::get($actual, 'ids.0'));
    }

    /**
     * 獣害情報リストがない場合バリデーションエラーになること
     */
    public function testValidateIds03()
    {
        $data = [];
        $actual = $this->getValidateErrors($data, MultipleRemoveSelectedRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('IDリストは必ず指定してください。', Arr::get($actual, 'ids.0'));
    }
    
    /**
     * 獣害情報がulidではない場合バリデーションエラーになること
     */
    public function testValidateId01()
    {
        $data = [
            "ids" => ["wrong_id"],
        ];
        $actual = $this->getValidateErrors($data, MultipleRemoveSelectedRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('獣害情報IDに有効なULIDを指定してください。', Arr::get($actual, 'ids.0')[0]);
    }

    /**
     * 獣害情報がDB上に存在しない場合バリデーションエラーになること
     */
    public function testValidateId02()
    {
        // DB上に存在しないULIDを生成
        $data = [
            "ids" => ["01h4dxxmwbaxz5682hx9cdwrey"],
        ];
        $actual = $this->getValidateErrors($data, MultipleRemoveSelectedRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('選択された獣害情報IDは正しくありません。', Arr::get($actual, 'ids.0')[0]);
    }
}

