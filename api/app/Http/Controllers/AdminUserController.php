<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\User\CreateRequest;
use App\Http\Resources\AdminUserResource;
use App\UseCases\User\CreateAction;
use Illuminate\Support\Facades\Auth;
use App\Models\AdminUser;

class AdminUserController extends Controller
{
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
