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
    private $user;
    private $data;

    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->data = [
            'user_id' => $this->user->id,
            'lat' => "130.23",
            'lng' => "40.34",
            'applied_at' => "2023-01-01 17:00:00",
            'animal_count' => 3,
            'appear_type' => 'SEEING',
            'is_damaged' => true,
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
        $this->assertSame('緯度は必ず指定してください。', Arr::get($actual, 'lat.0'));
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
        $this->assertSame('経度は必ず指定してください。', Arr::get($actual, 'lng.0'));
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

    /**
     * 日付は必須入力であること
     */
    public function testAppliedAt01()
    {
        unset($this->data['applied_at']);
        $actual = $this->getValidateErrors($this->data, CreateRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('日付は必ず指定してください。', Arr::get($actual, 'applied_at.0'));
    }

    /**
     *  日付(至)はY-m-dの日付フォーマットであること
     */
    public function testAppliedAt02()
    {
        // OK
        $data = array_merge($this->data, [
            'applied_at' => "2023-01-01 17:00:00",
        ]);
        $actual = $this->getValidateErrors($data, CreateRequest::class);
        $this->assertSame(0, count($actual));

        // NG
        $data = array_merge($this->data, [
            'applied_at' => "2023/01/01 17:00:00",
        ]);
        $actual = $this->getValidateErrors($data, CreateRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('日付はY-m-d H:i:s形式で指定してください。', Arr::get($actual, 'applied_at.0'));
    }

    /**
     * 頭数は必須入力であること
     */
    public function testAnimalCount01()
    {
        unset($this->data['animal_count']);
        $actual = $this->getValidateErrors($this->data, CreateRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('頭数は必ず指定してください。', Arr::get($actual, 'animal_count.0'));
    }

    /**
     * 頭数は0以上であること
     */
    public function testAnimalCount02()
    {
        // OK
        $data = array_merge($this->data, [
            'animal_count' => 0,
        ]);
        $actual = $this->getValidateErrors($data, CreateRequest::class);
        $this->assertSame(0, count($actual));

        // NG
        $data = array_merge($this->data, [
            'animal_count' => -1,
        ]);
        $actual = $this->getValidateErrors($data, CreateRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('頭数には、0以上の数字を指定してください。', Arr::get($actual, 'animal_count.0'));
    }

    /**
     * 頭数は999以下であること
     */
    public function testAnimalCount03()
    {
        // OK
        $data = array_merge($this->data, [
            'animal_count' => 999,
        ]);
        $actual = $this->getValidateErrors($data, CreateRequest::class);
        $this->assertSame(0, count($actual));

        // NG
        $data = array_merge($this->data, [
            'animal_count' => 1000,
        ]);
        $actual = $this->getValidateErrors($data, CreateRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('頭数には、999以下の数字を指定してください。', Arr::get($actual, 'animal_count.0'));
    }

    /**
     * 頭数は整数であること
     */
    public function testAnimalCount04()
    {
        $data = array_merge($this->data, [
            'animal_count' => 100.5,
        ]);
        $actual = $this->getValidateErrors($data, CreateRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('頭数は整数で指定してください。', Arr::get($actual, 'animal_count.0'));
    }

    /**
     * 出没時情報は必須入力であること
     */
    public function testAppearType01()
    {
        unset($this->data['appear_type']);
        $actual = $this->getValidateErrors($this->data, CreateRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('出没時情報は必ず指定してください。', Arr::get($actual, 'appear_type.0'));
    }

    /**
     * 出没時情報はSEEING、HEARINGのどちらかであること
     */
    public function testAppearType02()
    {
        $data = array_merge($this->data, [
            'appear_type' => 'SEEING',
        ]);
        $actual = $this->getValidateErrors($data, CreateRequest::class);
        $this->assertSame(0, count($actual));

        $data = array_merge($this->data, [
            'appear_type' => 'HEARING',
        ]);
        $actual = $this->getValidateErrors($data, CreateRequest::class);
        $this->assertSame(0, count($actual));

        $data = array_merge($this->data, [
            'appear_type' => 'UNKNOWN',
        ]);
        $actual = $this->getValidateErrors($data, CreateRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('選択された出没時情報は正しくありません。', Arr::get($actual, 'appear_type.0'));
    }

    /**
     * 農業被害は必須入力であること
     */
    public function testIsDamaged01()
    {
        unset($this->data['is_damaged']);
        $actual = $this->getValidateErrors($this->data, CreateRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('農業被害は必ず指定してください。', Arr::get($actual, 'is_damaged.0'));
    }

    /**
     * 農業被害は真偽値であること
     */
    public function testIsDamaged02()
    {
        $data = array_merge($this->data, [
            'is_damaged' => true,
        ]);
        $actual = $this->getValidateErrors($data, CreateRequest::class);
        $this->assertSame(0, count($actual));

        $data = array_merge($this->data, [
            'is_damaged' => false,
        ]);
        $actual = $this->getValidateErrors($data, CreateRequest::class);
        $this->assertSame(0, count($actual));

        $data = array_merge($this->data, [
            'is_damaged' => "hogehoge",
        ]);
        $actual = $this->getValidateErrors($data, CreateRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('農業被害は、trueかfalseを指定してください。', Arr::get($actual, 'is_damaged.0'));
    }
}

