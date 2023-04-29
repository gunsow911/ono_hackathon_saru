<?php declare(strict_types=1);

namespace App\UseCases\User;

use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;

/**
 * ユーザー情報更新データ
 */
class UpdateEntity
{
    /** @var Carbon 日付 */
    private $applied_at;
    /** @var float 緯度 */
    private $lat;
    /** @var float 経度 */
    private $lng;

    public function __construct(array $data)
    {
        $this->applied_at = Arr::get($data, 'applied_at');
        $this->lat = Arr::get($data, 'lat');
        $this->lng = Arr::get($data, 'lng');
    }

    /**
     * 日付
     * @return Carbon
     */
    public function getAppliedAt()
    {
        return $this->applied_at;
    }

    /**
     * 緯度
     * @return float
     */
    public function getLat()
    {
        return $this->lat;
    }

    /**
     * 経度
     * @return float
     */
    public function getLng()
    {
        return $this->lng;
    }
}

