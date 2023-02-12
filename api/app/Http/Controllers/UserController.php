<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\User\CreateRequest;
use App\UseCases\User\CreateAction;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    /**
     * ユーザ情報を作成する
     */
    public function create(CreateRequest $req, CreateAction $action)
    {
        $user = $action($req->makeEnitiy());
        return response()->json(new UserResource($user), 201);
    }

    /**
     * ユーザ情報を取得する
     */
    public function fetch()
    {
        /**  @var User */
        $user = Auth::user();
        return response()->json(new UserResource($user), 200);
    }
}
