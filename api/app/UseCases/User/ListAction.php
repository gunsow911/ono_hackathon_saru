<?php declare(strict_types=1);
namespace App\UseCases\User;

use App\Models\User;

/**
 * ユーザー情報一覧取得アクション
 */
class ListAction
{
    /**
     * ユーザー情報一覧を取得する
     * @return \MatanYadaev\EloquentSpatial\SpatialBuilder ユーザー情報一覧クエリ
     */
    public function __invoke()
    {
        // とりあえずすべて取得
        // id順に並べる
        $list = User::orderBy('id');
        return $list;
    }
}
