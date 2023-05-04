<?php

declare(strict_types=1);

namespace App\UseCases\User;

use App\Models\User;
use App\Utils\StringUtil;
use Illuminate\Database\Eloquent\Builder;

/**
 * ユーザー情報一覧取得アクション
 */
class ListAction
{
    /**
     * ユーザー情報一覧を取得する
     * @param $entity ListEntity|null 検索情報
     * @return Builder<User> ユーザー情報一覧クエリ
     */
    public function __invoke(ListEntity $entity = null): Builder
    {

        if ($entity === null) {
            $entity = new ListEntity([
                'query' => '',
            ]);
        }

        // まずすべて取得
        $query = User::select('users.*');

        $words = StringUtil::explodeWhitespace($entity->getQuery());

        foreach ($words as $word) {
            $query->where(function ($q) use ($word) {
                $faz = '%'.addcslashes($word, '%_\\').'%';
                $q->where('id', '=', $word)
                    ->orwhere('name', 'LIKE', $faz);
            });
        }

        // id順に並べる
        $query->orderBy('id');
        return $query;
    }
}
