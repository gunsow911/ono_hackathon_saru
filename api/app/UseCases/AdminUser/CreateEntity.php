<?php declare(strict_types=1);

namespace App\UseCases\AdminUser;

use Illuminate\Support\Arr;

class CreateEntity
{
    /** @var string */
    private $name;
    /** @var string */
    private $email;
    /** @var string */
    private $password;

    public function __construct(array $data)
    {
        $this->name = Arr::get($data, 'name');
        $this->email = Arr::get($data, 'email');
        $this->password = Arr::get($data, 'password');
    }

    /**
     * ユーザ名
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * メールアドレス
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * ハッシュ済パスワード
     * @return string
     */
    public function getPassword(): string
    {
        return $this->password;
    }
}
