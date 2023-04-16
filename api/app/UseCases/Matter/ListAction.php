<?php

declare(strict_types=1);

namespace App\UseCases\Matter;

use App\Models\Matter;

/**
 * 害獣情報一覧取得アクション
 */
class ListAction
{
    /**
     * 害獣情報一覧を取得する
     * @return \MatanYadaev\EloquentSpatial\SpatialBuilder 害獣情報一覧クエリ
     */
    // public function __invoke()
    // {
    //     // とりあえずすべて取得
    //     // TODO: 違和感のない程度で絞り込みなどをして、データ数が大きすぎないようにする必要がある
    //     $list = Matter::orderBy('applied_at', 'asc');
    //     return $list;
    // }

    // 全部のデータを取得すると多すぎて見にくいし、処理が重くなる原因になるので、取得するデータを制限して取得する（N＋１問題も避ける）
    public function __invoke()
    {
        $query = Matter::select('matters.*')
        ->orderBy('applied_at', 'asc');
        return $query;

    }
}
