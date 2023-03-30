<?php declare(strict_types=1);

namespace App\UseCases\User;

use Illuminate\Support\Arr;

/**
 * ユーザデータ
 */
class SaveEntity
{
    /** @var string 名前 */
    private $name;
    /** @var string 概要 */
    private $description;

    public function __construct(array $data)
    {
        $this->name = Arr::get($data, 'name');
        $this->description = Arr::get($data, 'description');
    }

    /**
     * 名前
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * 概要
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }
}

