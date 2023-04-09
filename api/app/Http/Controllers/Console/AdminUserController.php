<?php declare(strict_types=1);

namespace App\Http\Controllers\Console;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminUser\LoginRequest;
use App\Http\Resources\AdminUserResource;
use Illuminate\Support\Facades\Auth;


class AdminUserController extends Controller
{
    public function username()
    {
        return 'name';
    }

    /**
     * 管理者情報取得
     */
    public function me() {
        // 管理者を取得
        $admin = Auth::guard('admin')->user();
        return response()->json(new AdminUserResource($admin), 200);
    }

    /**
     * 管理者ログイン
     */
    public function login(LoginRequest $req) {
        // 管理者認証
        if (Auth::guard('admin')->attempt(['name' => $req->input('username'), 'password' => $req->input('password')])) {
            return response()->json(['message' => 'OK'], 200);
        }
        return response()->json(['message' => 'メールアドレスかパスワードが違います。'], 401);
    }

    /**
     * 管理者ログアウト
     */
    public function logout() {
        // 管理者ログアウト
        Auth::guard('admin')->logout();
        return response()->json(['message' => 'OK'], 200);
    }
}
