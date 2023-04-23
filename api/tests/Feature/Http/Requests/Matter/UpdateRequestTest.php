<?php declare(strict_types=1);

namespace Tests\Feature\Http\Requests\Matter;

use Tests\FormRequestTestCase;
use App\Http\Requests\Matter\UpdateRequest;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Arr;

use function count;


class UpdateRequestTest extends FormRequestTestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->data = [
            'applied_at' => "2023-01-01",
            'lat' => "130.23",
            'lng' => "40.34",
        ];
    }

    /**
     * 獣害情報更新データの生成できること
     */
    public function testMakeEntity01()
    {
        /** @var UpdateRequest */
        $req = $this->getValidatedRequest($this->data, UpdateRequest::class);
        $entity = $req->makeEntity();
        $this->assertSame(130.23, $entity->getLat());
        $this->assertSame(40.34, $entity->getLng());
    }

    /**
     * バリデーションが通ること
     */
    public function testValidation01()
    {
        $actual = $this->getValidateErrors($this->data, UpdateRequest::class);
        $this->assertSame([], $actual);
    }

    /**
     *  日付は必須入力であること
     */
    public function testAppliedAt01()
    {
        unset($this->data['applied_at']);
        $actual = $this->getValidateErrors($this->data, UpdateRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('日付は必ず指定してください。', Arr::get($actual, 'applied_at.0'));
    }

    /**
     *  日付は日付形式であること
     */
    public function testAppliedAt02()
    {
        $data = array_merge($this->data, [
            'applied_at' => 130,
        ]);
        $actual = $this->getValidateErrors($data, UpdateRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('日付はY-m-d形式で指定してください。', Arr::get($actual, 'applied_at.0'));
    }

    /**
     * 緯度は必須入力であること
     */
    public function testLat01()
    {
        unset($this->data['lat']);
        $actual = $this->getValidateErrors($this->data, UpdateRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('緯度が存在していません。', Arr::get($actual, 'lat.0'));
    }

    /**
     * 緯度は数値であること
     */
    public function testLat02()
    {
        $data = array_merge($this->data, [
            'lat' => 130,
        ]);
        $actual = $this->getValidateErrors($data, UpdateRequest::class);
        $this->assertSame(0, count($actual));

        $data = array_merge($this->data, [
            'lat' => 'test',
        ]);
        $actual = $this->getValidateErrors($data, UpdateRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('緯度には、数字を指定してください。', Arr::get($actual, 'lat.0'));
    }

    /**
     * 経度は必須入力であること
     */
    public function testLng01()
    {
        unset($this->data['lng']);
        $actual = $this->getValidateErrors($this->data, UpdateRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('経度が存在していません。', Arr::get($actual, 'lng.0'));
    }

    /**
     * 経度は数値であること
     */
    public function testLng02()
    {
        $data = array_merge($this->data, [
            'lng' => 36,
        ]);
        $actual = $this->getValidateErrors($data, UpdateRequest::class);
        $this->assertSame(0, count($actual));

        $data = array_merge($this->data, [
            'lng' => 'test',
        ]);
        $actual = $this->getValidateErrors($data, UpdateRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('経度には、数字を指定してください。', Arr::get($actual, 'lng.0'));
    }
}

