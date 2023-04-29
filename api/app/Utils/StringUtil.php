<?php declare(strict_types=1);

namespace App\Utils;

use Illuminate\Support\Collection;
use function strlen;
use function in_array;

/**
 * 文字列関連の汎用関数群
 */
class StringUtil
{

    /**
     * 文字列が、指定された接頭辞で始まるかどうかを判定する
     *
     * @param string $haystack 対象文字列
     * @param string $needle 接頭辞
     * @return bool 始まっている/始まっていない
     */
    public static function startsWith(string $haystack, string $needle): bool
    {
        $length = strlen($needle);
        return (substr($haystack, 0, $length) === $needle);
    }

    /**
     * 文字列が、指定された接尾辞で終わるかどうかを判定する
     *
     * @param string $haystack 対象文字列
     * @param string $needle 接尾辞
     * @return bool 終わっている/終わっていない
     */
    public static function endsWith(string $haystack, string $needle): bool
    {
        $length = strlen($needle);
        if ($length === 0) {
            return true;
        }
        return (substr($haystack, -$length) === $needle);
    }

    /**
     * 文字列を半角・全角スペースで区切り、コレクションで返却する
     * また、重複した文字列がある場合は1つにまとめる
     * @param string $text 文字列
     * @return Collection<string> 区切られた文字列コレクション
     */
    public static function explodeWhitespace(string $text): Collection
    {
        $words = mb_convert_kana($text, 's');
        $words = preg_split('/[\s]+/', $words, -1, PREG_SPLIT_NO_EMPTY);
        $unique = [];
        foreach ($words as $w) {
            if (!in_array($w, $unique, true)) {
                $unique[] = $w;
            }
        }
        return collect($unique);
    }
}

