<?php declare(strict_types=1);
namespace App\UseCases\User;

use App\Models\User;
use Illuminate\Contracts\Database\Eloquent\Builder;

/**
 * ユーザー情報一覧取得アクション
 */
class ListAction
{
    /**
     * ユーザー情報一覧を取得する
     * @return Builder<User> ユーザー情報一覧クエリ
     */
    public function __invoke(): Builder
    {
        // とりあえずすべて取得
        // id順に並べる
        $list = User::orderBy('id');
        return $list;
    }
}

