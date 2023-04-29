<?php declare(strict_types=1);

namespace Tests\Unit\Utils;

use App\Utils\StringUtil;
use PHPUnit\Framework\TestCase;
use function count;

/**
 * StringUtilのテスト
 */
class StringUtilTest extends TestCase
{
    /**
     * startsWithが正しく動作すること
     */
    public function testStartsWith01()
    {
        $this->assertTrue(StringUtil::startsWith('teststrings', 'test'));
        $this->assertFalse(StringUtil::startsWith('teststrings', 'strings'));
        $this->assertFalse(StringUtil::startsWith('test', 'teststrings'));
        $this->assertTrue(StringUtil::startsWith('テスト文字列', 'テスト'));
        $this->assertFalse(StringUtil::startsWith('テスト文字列', '文字列'));
        $this->assertFalse(StringUtil::startsWith('テスト', 'テスト文字列'));
        $this->assertTrue(StringUtil::startsWith('teststrings', ''));
    }

    /**
     * endsWithが正しく動作すること
     */
    public function testEndsWith01()
    {
        $this->assertFalse(StringUtil::endsWith('teststrings', 'test'));
        $this->assertTrue(StringUtil::endsWith('teststrings', 'strings'));
        $this->assertFalse(StringUtil::endsWith('test', 'teststrings'));
        $this->assertFalse(StringUtil::endsWith('テスト文字列', 'テスト'));
        $this->assertTrue(StringUtil::endsWith('テスト文字列', '文字列'));
        $this->assertFalse(StringUtil::endsWith('テスト', 'テスト文字列'));
        $this->assertTrue(StringUtil::endsWith('teststrings', ''));
    }

    /**
     * 半角・全角で区切られた文字列を配列化して返却できること
     */
    public function testExplodeWhitespace01()
    {
        $test = " 半角 全角　スペース  区切り　";
        $result = StringUtil::explodeWhitespace($test);

        $this->assertSame(4, count($result));
        $this->assertSame('半角', $result[0]);
        $this->assertSame('全角', $result[1]);
        $this->assertSame('スペース', $result[2]);
        $this->assertSame('区切り', $result[3]);
    }

    /**
     * 重複した文字列がある場合それらは1つに統合されること
     */
    public function testExplodeWhitespace02()
    {
        $test = "A a B b A b c";
        $result = StringUtil::explodeWhitespace($test);

        $this->assertSame(5, count($result));
        $this->assertSame('A', $result[0]);
        $this->assertSame('a', $result[1]);
        $this->assertSame('B', $result[2]);
        $this->assertSame('b', $result[3]);
        $this->assertSame('c', $result[4]);
    }
}
