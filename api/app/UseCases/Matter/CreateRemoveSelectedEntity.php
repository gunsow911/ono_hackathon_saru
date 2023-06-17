<?php declare(strict_types=1);

namespace App\UseCases\Matter;

use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;

/**
 * 獣害情報(管理者)複数削除データ
 */
class CreateRemoveSelectedEntity
{
    /** @var string ユーザid */
    private $userId;
    /** @var float 緯度 */
    private $lat;
    /** @var float 経度 */
    private $lng;
    /** @var Carbon 日付 */
    private $appliedAt;

    public function __construct(array $data)
    {
        $this->userId = Arr::get($data, 'user_id');
        $this->lat = Arr::get($data, 'lat');
        $this->lng = Arr::get($data, 'lng');
        $this->appliedAt = new Carbon(Arr::get($data, 'applied_at'));
    }

    /**
     * ユーザid
     * @return string
     */
    public function getUserId()
    {
        return $this->userId;
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

    /**
     * 日付
     * @return Carbon
     */
    public function getAppliedAt()
    {
        return $this->appliedAt;
    }
}

