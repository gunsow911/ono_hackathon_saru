<?php declare(strict_types=1);

namespace App\UseCases\Matter;

use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;

/**
 * 獣害情報一覧データ
 */
class ListEntity
{
    /** @var string 検索文字 */
    private $query;
    /** @var Carbon|null 日付(自) */
    private $from;
    /** @var Carbon|null 日付(至) */
    private $to;

    public function __construct(array $data)
    {
        $this->query = Arr::get($data, 'query');
        $this->from = Arr::get($data, 'from');
        $this->to = Arr::get($data, 'to');
    }

    /**
     * 検索文字
     * @return string
     */
    public function getQuery()
    {
        return $this->query;
    }

    /**
     * 日付(自)
     * @return Carbon|null
     */
    public function getFrom()
    {
        return $this->from;
    }

    /**
     * 日付(至)
     * @return Carbon|null
     */
    public function getTo()
    {
        return $this->to;
    }
}


