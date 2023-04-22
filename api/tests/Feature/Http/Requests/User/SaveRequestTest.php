<?php declare(strict_types=1);

namespace Tests\Feature\Http\Requests\User;

use Tests\FormRequestTestCase;
use App\Http\Requests\User\SaveRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

use function count;

/**
 * ユーザ保存リクエストのテスト
 */
class SaveRequestTest extends FormRequestTestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->data = [
            'name' => 'テスト太郎',
            'description' => 'ユーザ説明',
        ];
    }

    /**
     * ユーザデータの生成ができること
     */
    public function testMakeEntity01()
    {
        /** @var SaveRequest */
        $req = $this->getValidatedRequest($this->data, SaveRequest::class);
        $entity = $req->makeEntity();
        $this->assertSame('テスト太郎', $entity->getName());
        $this->assertSame('ユーザ説明', $entity->getDescription());
    }

    /**
     * バリデーションが通ること
     */
    public function testValidation01()
    {
        $actual = $this->getValidateErrors($this->data, SaveRequest::class);
        $this->assertSame([], $actual);
    }

    /**
     * 名前は必須入力であること
     */
    public function testName01()
    {
        unset($this->data['name']);
        $actual = $this->getValidateErrors($this->data, SaveRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('名前は必ず指定してください。', Arr::get($actual, 'name.0'));
    }

    /**
     * 名前は255文字以内であること
     */
    public function testName02()
    {
        $data = array_merge($this->data, [
            'name' => Str::random(255), // 255文字以内
        ]);
        $actual = $this->getValidateErrors($data, SaveRequest::class);
        $this->assertSame([], $actual);

        $data = array_merge($this->data, [
            'name' => Str::random(256), // NG
        ]);
        $actual = $this->getValidateErrors($data, SaveRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('名前は、255文字以下で指定してください。', Arr::get($actual, 'name.0'));
    }

    /**
     * 概要は必須入力であること
     */
    public function testDescription01()
    {
        unset($this->data['description']);
        $actual = $this->getValidateErrors($this->data, SaveRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('概要が存在していません。', Arr::get($actual, 'description.0'));
    }

    /**
     * 概要は10000文字以内であること
     */
    public function testDescription02()
    {
        $data = array_merge($this->data, [
            'description' => Str::random(10000), // 10000文字以内
        ]);
        $actual = $this->getValidateErrors($data, SaveRequest::class);
        $this->assertSame([], $actual);

        $data = array_merge($this->data, [
            'description' => Str::random(10001), // NG
        ]);
        $actual = $this->getValidateErrors($data, SaveRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('概要は、10000文字以下で指定してください。', Arr::get($actual, 'description.0'));
    }

    /**
     * 概要は空でも良いこと
     */
    public function testDescription03()
    {
        $data = array_merge($this->data, [
            'description' => "", 
        ]);
        $actual = $this->getValidateErrors($this->data, SaveRequest::class);
        $this->assertSame(0, count($actual));
    }
}


