<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
{
    /**
     * ユーザが存在するかどうか確認する
     */
    public function verify(User $user)
    {
        return response()->json("OK", 200);
    }
}

