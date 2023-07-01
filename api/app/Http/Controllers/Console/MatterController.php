<?php

declare(strict_types=1);

// 名前空間を変えることで、同名のクラスを作成することができます。
// 通常、名前空間はフォルダの階層と一致させる(Controllers/Console)ほうが望ましいです。

namespace App\Http\Controllers\Console;

use App\Http\Controllers\Controller;
use App\Http\Requests\Matter\CreateAdminRequest;
use App\Http\Requests\Matter\MultipleRemoveSelectedRequest;
use App\Http\Requests\Matter\SearchRequest;
use App\Http\Requests\Matter\UpdateRequest;
use App\Http\Resources\MatterResource;
use App\Models\Matter;
use App\UseCases\Matter\CreateAdminAction;
use App\UseCases\Matter\MultipleRemoveSelectedAction;
use App\UseCases\Matter\ListAction;
use App\UseCases\Matter\RemoveAction;
use App\UseCases\Matter\UpdateAction;

/**
 * 管理者用コンソール獣害コントローラ
 */
class MatterController extends Controller
{
    /**
     * 害獣情報一覧
     */
    public function index(SearchRequest $req, ListAction $action)
    {
        $list = $action($req->makeEntity());
        $list->with(['user']);
        return MatterResource::collection($list->paginate(20));
    }

    /**
     * 害獣情報詳細
     */
    public function detail(Matter $matter)
    {
        // withもloadもリレーションをEagerLoadすることを自体は変わらないのですが、使い分けが必要です。
        // クエリに対して使うのがwith
        // Eloquentのオブジェクトに対して使うのがloadです。
        // 今回のケースではすでに$matterはEloquentのオブジェクトなので、loadを使います。
        $matter->load(['user']);
        return response()->json(new MatterResource($matter), 200);
    }

    /**
     * 害獣情報作成
     */
    public function create(CreateAdminRequest $req, CreateAdminAction $action)
    {
        $entity = $req->makeEntity();
        $matter = $action($entity);
        return response()->json(new MatterResource($matter), 201);
    }

    /**
     * 害獣情報編集
     */
    public function update(UpdateRequest $req, UpdateAction $action, Matter $matter)
    {
        $entity = $req->makeEntity();
        $action($entity, $matter);
        return response()->json(new MatterResource($matter), 200);
    }

    /**
     * 害獣情報削除
     */
    public function remove(RemoveAction $action, Matter $matter)
    {
        $action($matter);
        return response()->json(['message' => 'OK'], 200);
    }

    /**
     * 害獣情報複数一括削除
     */
    public function removeSelected(Matter $matter, MultipleRemoveSelectedRequest $req, MultipleRemoveSelectedAction $action)
    {
        $action($matter, $req->makeEntity());
        return response()->json(['message' => 'OK'], 200);
    }
}
