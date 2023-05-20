<?php

declare(strict_types=1);

namespace App\Http\Controllers\Console;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\SaveRequest;
use App\Http\Requests\User\SearchRequest;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserSelectResource;
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
    public function index(SearchRequest $req, ListAction $action)
    {
        $list = $action($req->makeEntity());
        $select = $req->query('select', '');
        if (mb_strtolower($select) === 'list') {
            return UserSelectResource::collection($list->get());
        } 
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
        $user = $action($entity, $user);
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
