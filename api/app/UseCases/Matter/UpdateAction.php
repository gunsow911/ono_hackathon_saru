<?php declare(strict_types=1);
namespace App\UseCases\Matter;

use App\Enums\AnimalKind;
use App\Models\Matter;
use Illuminate\Support\Facades\DB;
use MatanYadaev\EloquentSpatial\Objects\Point;

/**
 * 獣害情報更新アクション
 */
class UpdateAction
{
    /**
     * 害獣情報を更新する
     * @param UpdateEntity $enitiy 獣害更新データ
     * @param Matter $matter 更新する獣害情報
     * @return Matter 獣害情報
     */
    public function __invoke(UpdateEntity $entity, Matter $matter): Matter
    {
        return DB::transaction(function () use ($entity, $matter) {
            /** @var Matter */
            $saveMatter = Matter::where('id', '=', $matter->id)
                ->firstOrFail();
            $saveMatter->location = new Point($entity->getLat(), $entity->getLng());
            $saveMatter->applied_at = $entity->getAppliedAt();
            // 現状はサル固定
            $saveMatter->kind = AnimalKind::MONKY;
            // 現状は複数いることにする
            $saveMatter->is_alone = false;
            $saveMatter->saveOrFail();
            return $saveMatter;
        });
    }
}
