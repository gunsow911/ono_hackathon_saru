<?php

declare(strict_types=1);

namespace App\Http\Controllers\Console;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\SaveRequest;
use App\Http\Resources\UserResource;
use App\UseCases\User\ListAction;
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
    public function edit(SaveRequest $req, SaveAction $action)
    {
        $entity = $req->makeEntity();
        $user = $action($entity, null);
        return response()->json(new UserResource($user), 201);
    }
}
