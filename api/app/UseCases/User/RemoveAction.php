<?php declare(strict_types=1);
namespace App\UseCases\User;

use App\Models\User;
use Illuminate\Support\Facades\DB;

/**
 * ユーザ削除アクション
 */
class RemoveAction
{
    /**
     * ユーザを削除する
     * @param User $user ユーザ削除する
     * @return void
     */
    public function __invoke(User $user): void
    {
        return DB::transaction(function () use ($user) {
            /** @var User */
            $removeUser = User::where('id', '=', $user->id)
                ->first();
            if ($removeUser === null) return;
            $removeUser->delete();
        });
    }
}

