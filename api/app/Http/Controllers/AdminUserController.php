<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\AdminUser\LoginRequest;
use App\Http\Requests\User\CreateRequest;
use App\Http\Resources\AdminUserResource;
use Illuminate\Support\Facades\Auth;
use App\Models\AdminUser;
use App\UseCases\AdminUser\CreateAction;

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
        $admin = Auth::guard('admin')->user();
        return response()->json(new AdminUserResource($admin), 200);
    }

    /**
     * 管理者ログイン
     */
    public function login(LoginRequest $req) {
        if (Auth::guard('admin')->attempt(['name' => $req->input('username'), 'password' => $req->input('password')])) {
            return response()->json(['message' => 'OK'], 200);
        }
        return response()->json(['message' => 'メールアドレスかパスワードが違います。'], 401);
    }

    /**
     * 管理者ログアウト
     */
    public function logout() {
        Auth::guard('admin')->logout();
        return response()->json(['message' => 'OK'], 200);
    }

    /**
     * 管理者ユーザ情報を作成する
     */
    public function create(CreateRequest $req, CreateAction $action)
    {
        $admin = $action($req->makeEnitiy());
        return response()->json(new AdminUserResource($admin), 201);
    }

    /**
     * 管理者ユーザ情報を取得する
     */
    public function fetch()
    {
        /**  @var AdminUser */
        $admin = Auth::user();
        return response()->json(new AdminUserResource($admin), 200);
    }
}
