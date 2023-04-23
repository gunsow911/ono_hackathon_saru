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

    public function __construct(array $data)
    {
        $this->lat = Arr::get($data, 'lat');
        $this->lng = Arr::get($data, 'lng');
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

