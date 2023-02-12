<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\Matter\SaveRequest;
use App\Http\Resources\MatterResource;
use App\UseCases\Matter\SaveAction;
use Illuminate\Support\Facades\Auth;

class MatterController extends Controller
{
    /**
     * 害獣情報一覧
     */
    public function index()
    {
        return [];
    }

    /**
     * 害獣情報作成
     */
    public function create(SaveRequest $req, SaveAction $action)
    {
        $entity = $req->makeEntity();
        /**  @var User */
        $user = Auth::user();
        $matter = $action($entity, $user, null);
        return response()->json(new MatterResource($matter), 201);
    }
}
