<?php

declare(strict_types=1);

namespace App\UseCases\Matter;

use Illuminate\Support\Arr;

/**
 * 獣害情報複数削除データ
 */
class MultipleRemoveSelectedEntity
{
    /** @var array<string> */
    private $ids;

    public function __construct(array $data)
    {
        $this->ids = Arr::get($data, 'ids');
    }

    /**
     * IDリスト
     * @return array<string>
     */
    public function getIds(): array
    {
        return $this->ids;
    }
}
