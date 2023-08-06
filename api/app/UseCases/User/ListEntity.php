<?php

declare(strict_types=1);

namespace App\UseCases\User;

use Illuminate\Support\Arr;

/**
 * ユーザー情報一覧データ
 */
class ListEntity
{
    /** @var string 検索文字 */
    private $query;

    public function __construct(array $data)
    {
        $this->query = Arr::get($data, 'query');
    }

    /**
     * 検索文字
     * @return string
     */
    public function getQuery()
    {
        return $this->query;
    }
}
