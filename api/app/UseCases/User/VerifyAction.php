<?php declare(strict_types=1);
namespace App\UseCases\User;

use App\Models\User;

/**
 * ユーザ確認アクション
 */
class VerifyAction
{
    /**
     * ユーザの存在を確認する
     * @param string $userId ユーザid
     * @return bool 存在する/存在しない
     */
    public function __invoke(string $userId): bool
    {
        $user = User::whereId($userId)->first();
        return $user !== null;
    }
}

