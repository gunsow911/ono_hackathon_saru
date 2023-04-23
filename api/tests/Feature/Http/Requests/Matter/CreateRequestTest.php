<?php declare(strict_types=1);

namespace Tests\Feature\Http\Requests\Matter;

use Tests\FormRequestTestCase;
use App\Http\Requests\Matter\CreateRequest;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Arr;

use function count;


class CreateRequestTest extends FormRequestTestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->data = [
            'user_id' => $this->user->id,
            'lat' => "130.23",
            'lng' => "40.34",
        ];
    }

    /**
     * ユーザの生成できること
     */
    public function testMakeUser01()
    {
        /** @var CreateRequest */
        $req = $this->getValidatedRequest($this->data, CreateRequest::class);
        $user = $req->makeUser();
        $this->assertSame($this->user->id, $user->id);
    }

    /**
     * 獣害情報新規作成データの生成できること
     */
    public function testMakeEntity01()
    {
        /** @var CreateRequest */
        $req = $this->getValidatedRequest($this->data, CreateRequest::class);
        $entity = $req->makeEntity();
        $this->assertSame(130.23, $entity->getLat());
        $this->assertSame(40.34, $entity->getLng());
    }

    /**
     * バリデーションが通ること
     */
    public function testValidation01()
    {
        $actual = $this->getValidateErrors($this->data, CreateRequest::class);
        $this->assertSame([], $actual);
    }

    /**
     * 緯度は必須入力であること
     */
    public function testLat01()
    {
        unset($this->data['lat']);
        $actual = $this->getValidateErrors($this->data, CreateRequest::class);
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
        $actual = $this->getValidateErrors($data, CreateRequest::class);
        $this->assertSame(0, count($actual));

        $data = array_merge($this->data, [
            'lat' => 'test',
        ]);
        $actual = $this->getValidateErrors($data, CreateRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('緯度には、数字を指定してください。', Arr::get($actual, 'lat.0'));
    }

    /**
     * 経度は必須入力であること
     */
    public function testLng01()
    {
        unset($this->data['lng']);
        $actual = $this->getValidateErrors($this->data, CreateRequest::class);
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
        $actual = $this->getValidateErrors($data, CreateRequest::class);
        $this->assertSame(0, count($actual));

        $data = array_merge($this->data, [
            'lng' => 'test',
        ]);
        $actual = $this->getValidateErrors($data, CreateRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('経度には、数字を指定してください。', Arr::get($actual, 'lng.0'));
    }
}

