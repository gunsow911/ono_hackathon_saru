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
    /** @var int|null 出現時情報 */
    private $appearType;
    /** @var bool|null 農業被害があるかどうか */
    private $isDamaged;
    /** @var int|null 頭数(最大) */
    private $max;
    /** @var int|null 頭数(最小) */
    private $min;

    public function __construct(array $data)
    {
        $this->query = Arr::get($data, 'query');
        $this->from = Arr::get($data, 'from');
        $this->to = Arr::get($data, 'to');
        $this->appearType = Arr::get($data, 'appear_type');
        $this->isDamaged = Arr::get($data, 'is_damaged');
        $this->max = Arr::get($data, 'max');
        $this->min = Arr::get($data, 'min');
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

    /**
     * 出現時の状況
     * @return int|null
     */
    public function getAppearType()
    {
        return $this->appearType;
    }

    /**
     * 農業被害があるかどうか
     * @return bool|null
     */
    public function getIsDamaged()
    {
        return $this->isDamaged;
    }

    /**
     * 頭数(最大)
     * @return int|null
     */
    public function getMax()
    {
        return $this->max;
    }

    /**
     * 頭数(最小)
     * @return int|null
     */
    public function getMin()
    {
        return $this->min;
    }
}


