<?php declare(strict_types=1);

// 名前空間を変えることで、同名のクラスを作成することができます。
// 通常、名前空間はフォルダの階層と一致させる(Controllers/Console)ほうが望ましいです。
namespace App\Http\Controllers\Console;

use App\Http\Controllers\Controller;
use App\Http\Requests\Matter\SaveRequest;
use App\Http\Resources\MatterResource;
use App\UseCases\Matter\ListAction;
use App\UseCases\Matter\SaveAction;

/**
 * 管理者用コンソール獣害コントローラ
 */
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
