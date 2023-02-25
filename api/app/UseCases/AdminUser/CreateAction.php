<?php declare(strict_types=1);
namespace App\UseCases\AdminUser;

use App\Models\AdminUser;

/**
 * 管理者ユーザ追加アクション
 */
class CreateAction
{
    /**
     * 管理者ユーザを追加する
     * @param CreateEntity $entity 管理者ユーザ追加データ
     * @return AdminUser 追加された管理者ユーザ
     */
    public function __invoke(CreateEntity $entity): AdminUser
    {
        $admin = new AdminUser();
        $admin->name = $entity->getName();
        $admin->email = $entity->getEmail();
        $admin->password = $entity->getPassword();
        $admin->saveOrFail();
        return $admin;
    }
}
