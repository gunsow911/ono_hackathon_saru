<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\UseCases\User\VerifyAction;

class UserController extends Controller
{
    /**
     * ユーザが存在するかどうか確認する
     */
    public function verify(string $userId, VerifyAction $action)
    {
        $result = $action($userId);
        if ($result) {
            return response()->json(['message' => 'OK'], 200);
        }
        return response()->json(['message' => '指定されたユーザは存在しません。'], 404);
    }
}
