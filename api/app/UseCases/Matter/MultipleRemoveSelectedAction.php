<?php

declare(strict_types=1);

namespace App\UseCases\Matter;

use App\Models\Matter;
use Illuminate\Support\Facades\DB;
// use MatanYadaev\EloquentSpatial\Objects\Point;

/**
 * (管理者による)複数獣害情報一括削除アクション
 */
class MultipleRemoveSelectedAction
{
    /** @var RemoveAction */
    private $action;

    public function __construct(RemoveAction $action)
    {
        $this->action = $action;
    }

    /**
     * (管理者による)複数獣害情報一括削除をする
     * @param MultipleRemoveSelectedEntity $entity 複数害獣情報一斉削除データ
     * @return Matter 獣害情報
     */
    public function __invoke(MultipleRemoveSelectedEntity $entity)
    {
        $matters = Matter::whereIn('id', $entity->getIds())->get();

        return DB::transaction(function () use ($matters) {
            /** @var Matter */
            foreach ($matters as $matter) {
                ($this->action)($matter);
            }
        });
    }
}
