<?php declare(strict_types=1);
namespace App\UseCases\User;

use App\Models\User;

/**
 * ユーザ追加アクション
 */
class CreateAction
{
    /**
     * ユーザを追加する
     * @param CreateEntity $entity ユーザ追加データ
     * @return User 追加されたユーザ
     */
    public function __invoke(CreateEntity $entity): User
    {
        $user = new User();
        $user->name = $entity->getName();
        $user->email = $entity->getEmail();
        $user->password = $entity->getPassword();
        $user->saveOrFail();
        return $user;
    }
}
