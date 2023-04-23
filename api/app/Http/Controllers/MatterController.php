<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\Matter\CreateRequest;
use App\Http\Resources\MatterResource;
use App\UseCases\Matter\CreateAction;
use App\UseCases\Matter\ListAction;

class MatterController extends Controller
{
    /**
     * 害獣情報一覧
     */
    public function index(ListAction $action)
    {
        $list = $action();
        return MatterResource::collection($list->get());
    }

    /**
     * 害獣情報作成
     */
    public function create(CreateRequest $req, CreateAction $action)
    {
        $entity = $req->makeEntity();
        $user = $req->makeUser();
        $matter = $action($entity, $user);
        return response()->json(new MatterResource($matter), 201);
    }
}
