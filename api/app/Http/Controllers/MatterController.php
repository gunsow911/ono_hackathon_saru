<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\Matter\CreateRequest;
use App\Http\Requests\Matter\SearchRequest;
use App\Http\Resources\MatterResource;
use App\Models\Matter;
use App\UseCases\Matter\CreateAction;
use App\UseCases\Matter\ListAction;

class MatterController extends Controller
{
    /**
     * 害獣情報一覧
     */
    public function index(SearchRequest $req, ListAction $action)
    {
        $list = $action($req->makeEntity());
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

    /**
     * 害獣情報詳細
     */
    public function detail(Matter $matter)
    {
        $matter->load(['user']);
        return response()->json(new MatterResource($matter), 200);
    }
}
