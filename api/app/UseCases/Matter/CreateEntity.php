<?php declare(strict_types=1);

namespace App\UseCases\Matter;

use Illuminate\Support\Arr;

/**
 * 獣害情報新規作成データ
 */
class CreateEntity
{
    /** @var float 緯度 */
    private $lat;
    /** @var float 経度 */
    private $lng;
    /** @var int  頭数 */
    private $animal_count;
    /** @var int 出現状況 */
    private $appear_type;
    /** @var bool 農業被害があるかどうか */
    private $is_damaged;

    public function __construct(array $data)
    {
        $this->lat = Arr::get($data, 'lat');
        $this->lng = Arr::get($data, 'lng');
        $this->animal_count = Arr::get($data, 'animal_count');
        $this->appear_type = Arr::get($data, 'appear_type');
        $this->is_damaged = Arr::get($data, 'is_damaged');
    }

    /**
     * 緯度
     * @return float
     */
    public function getLat(): float
    {
        return $this->lat;
    }

    /**
     * 経度
     * @return float
     */
    public function getLng(): float
    {
        return $this->lng;
    }

    /**
     * 頭数
     * @return int
     */
    public function getAnimalCount(): int
    {
        return $this->animal_count;
    }

    /**
     * 出現状況
     * @return int
     */
    public function getAppearType(): int
    {
        return $this->appear_type;
    }

    /**
     * 農業被害を受けたかどうか
     * @return bool
     */
    public function getIsDamaged(): bool
    {
        return $this->is_damaged;
    }
}

