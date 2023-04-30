<?php

declare(strict_types=1);

namespace App\Http\Controllers\Console;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\SaveRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\UseCases\User\ListAction;
use App\UseCases\User\RemoveAction;
use App\UseCases\User\SaveAction;

/**
 * 管理者用コンソールユーザコントローラ
 */
class UserController extends Controller
{
    /**
     * ユーザ情報一覧
     */
    public function index(ListAction $action)
    {
        $list = $action();
        return UserResource::collection($list->paginate(20));
    }

    /**
     * ユーザ情報詳細
     */
    public function detail(User $user)
    {
        return response()->json(new UserResource($user), 200);
    }

    /**
     * ユーザ情報作成
     */
    public function create(SaveRequest $req, SaveAction $action)
    {
        $entity = $req->makeEntity();
        $user = $action($entity, null);
        return response()->json(new UserResource($user), 201);
    }

    /**
     * ユーザ情報編集
     */
    public function update(User $user, SaveRequest $req, SaveAction $action)
    {
        $entity = $req->makeEntity();
        $user = $action($entity, null);
        return response()->json(new UserResource($user), 200);
    }

    /**
     * ユーザ情報削除
     */
    public function remove(RemoveAction $action, User $user)
    {
        $action($user);
        return response()->json(['message' => 'OK'], 200);
    }
}
