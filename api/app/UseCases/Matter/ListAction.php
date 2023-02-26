<?php declare(strict_types=1);
namespace App\UseCases\Matter;

use App\Models\Matter;

/**
 * 害獣情報一覧取得アクション
 */
class ListAction
{
    /**
     * 害獣情報一覧を取得する
     */
    public function __invoke()
    {
        // とりあえずすべて取得
        // TODO: 違和感のない程度で絞り込みなどをして、データ数が大きすぎないようにする必要がある
        $list = Matter::orderBy('applied_at', 'asc');
        return $list;
    }
}

