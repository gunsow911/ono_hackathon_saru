<?php declare(strict_types=1);

namespace Tests\Feature\Http\Requests\User;

use App\Http\Requests\User\SearchRequest;
use Tests\FormRequestTestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Arr;
// use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

use function count;


class SearchRequestTest extends FormRequestTestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->data = [
            'q' => "テスト",
            // 'from' => "2020-04-01",
            // 'to' => "2021-04-01",
        ];
    }

    /**
     * ユーザー情報検索データの生成ができること
     */
    public function testMakeEntity01()
    {
        /** @var SearchRequest */
        $req = $this->getValidatedRequest($this->data, SearchRequest::class);
        $entity = $req->makeEntity();
        $this->assertSame('テスト', $entity->getQuery());
        // $this->assertEquals(new Carbon('2020-04-01'), $entity->getFrom());
        // $this->assertEquals(new Carbon('2021-04-01'), $entity->getTo());
    }

    /**
     * バリデーションが通ること
     */
    public function testValidation01()
    {
        $actual = $this->getValidateErrors($this->data, SearchRequest::class);
        $this->assertSame(0, count($actual));
    }

    /**
     *  検索文字は空でも良いこと
     */
    public function testQuery01()
    {
        unset($this->data['query']);
        $actual = $this->getValidateErrors($this->data, SearchRequest::class);
        $this->assertSame(0, count($actual));
    }

    /**
     *  検索文字は255文字以内であること
     */
    public function testQuery02()
    {
        // OK
        $data = array_merge($this->data, [
            'q' => Str::random(255),
        ]);
        $actual = $this->getValidateErrors($data, SearchRequest::class);
        $this->assertSame(0, count($actual));

        // NG
        $data = array_merge($this->data, [
            'q' => Str::random(256),
        ]);
        $actual = $this->getValidateErrors($data, SearchRequest::class);
        $this->assertSame(1, count($actual));
        $this->assertSame('検索文字は、255文字以下で指定してください。', Arr::get($actual, 'q.0'));
    }

    /**
     *  日付(自)は存在しなくても良いこと
     */
    // public function testFrom01()
    // {
    //     unset($this->data['from']);
    //     $actual = $this->getValidateErrors($this->data, SearchRequest::class);
    //     $this->assertSame(0, count($actual));
    // }

    /**
     *  日付(自)はY-m-dの日付フォーマットであること
     */
    // public function testFrom02()
    // {
    //     // OK
    //     $data = array_merge($this->data, [
    //         'from' => "2022-03-01",
    //     ]);
    //     $actual = $this->getValidateErrors($data, SearchRequest::class);
    //     $this->assertSame(0, count($actual));

    //     // NG
    //     $data = array_merge($this->data, [
    //         'from' => "2022/03/01",
    //     ]);
    //     $actual = $this->getValidateErrors($data, SearchRequest::class);
    //     $this->assertSame(1, count($actual));
    //     $this->assertSame('日付(自)はY-m-d形式で指定してください。', Arr::get($actual, 'from.0'));
    // }


    /**
     *  日付(至)は存在しなくても良いこと
     */
    // public function testTo01()
    // {
    //     unset($this->data['to']);
    //     $actual = $this->getValidateErrors($this->data, SearchRequest::class);
    //     $this->assertSame(0, count($actual));
    // }

    /**
     *  日付(至)はY-m-dの日付フォーマットであること
     */
    // public function testTo02()
    // {
    //     // OK
    //     $data = array_merge($this->data, [
    //         'to' => "2022-03-01",
    //     ]);
    //     $actual = $this->getValidateErrors($data, SearchRequest::class);
    //     $this->assertSame(0, count($actual));

    //     // NG
    //     $data = array_merge($this->data, [
    //         'to' => "2022/03/01",
    //     ]);
    //     $actual = $this->getValidateErrors($data, SearchRequest::class);
    //     $this->assertSame(1, count($actual));
    //     $this->assertSame('日付(至)はY-m-d形式で指定してください。', Arr::get($actual, 'to.0'));
    // }
}

