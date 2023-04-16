<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\Matter\SaveRequest;
use App\Http\Resources\MatterResource;
use App\UseCases\Matter\ListAction;
use App\UseCases\Matter\SaveAction;

class MatterController extends Controller
{
    /**
     * 害獣情報一覧
     */
    public function index(ListAction $action)
    {
        $list = $action();
        $list->with([
            'userId',
            'location',
            'appliedAt',
            'kind',
            'isAlone',
            'deleteAt',
            'createdAt',
            'updatedAt',
        ]);
        return MatterResource::collection($list->paginate(20));
    }

    /**
     * 害獣情報作成
     */
    public function create(SaveRequest $req, SaveAction $action)
    {
        $entity = $req->makeEntity();
        $user = $req->makeUser();
        $matter = $action($entity, $user, null);
        return response()->json(new MatterResource($matter), 201);
    }
}
