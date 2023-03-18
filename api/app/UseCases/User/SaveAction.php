<?php declare(strict_types=1);
namespace App\UseCases\User;

use App\Models\User;
use Illuminate\Support\Facades\DB;

/**
 * ユーザ保存アクション
 */
class SaveAction
{
    /**
     * ユーザを保存する
     * @param SaveEntity $enitiy ユーザデータ
     * @param User $user ユーザ nullの場合は新規作成
     * @return User ユーザ
     */
    public function __invoke(SaveEntity $entity, User $user = null): User
    {
        return DB::transaction(function () use ($entity, $user) {
            if ($user === null) {
                $saveUser = new User();
            } else {
                /** @var User */
                $saveUser = User::where('id', '=', $user->id)
                    ->firstOrFail();
            }
            $saveUser->name = $entity->getName();
            $saveUser->description = $entity->getDescription();
            $saveUser->saveOrFail();
            return $saveUser;
        });
    }
}
