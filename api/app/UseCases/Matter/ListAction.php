<?php declare(strict_types=1);

namespace App\UseCases\Matter;

use App\Models\Matter;
use Illuminate\Database\Eloquent\Builder;

/**
 * 害獣情報一覧取得アクション
 */
class ListAction
{
    /**
     * 害獣情報一覧を取得する
     * @return \MatanYadaev\EloquentSpatial\SpatialBuilder 害獣情報一覧クエリ
     * @return Builder<Matter>
     */
    public function __invoke(): Builder
    {
        // とりあえずすべて取得
        // TODO: 違和感のない程度で絞り込みなどをして、データ数が大きすぎないようにする必要がある
        $list = Matter::orderBy('applied_at', 'asc');
        return $list;
    }
}
