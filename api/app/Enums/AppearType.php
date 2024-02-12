<?php declare(strict_types=1);

namespace App\Enums;
use ValueError;

enum AppearType: int
{
    case SEEING = 0;
    case HEARING = 1;

    public static function fromName(string $name): int
    {
        foreach (self::cases() as $case) {
            if( $name === $case->name ){
                return $case->value;
            }
        }
        throw new ValueError($name."のような列挙名はありません。");
    }
}
