<?php declare(strict_types=1);
namespace App\UseCases\Matter;

use App\Enums\AnimalKind;
use App\Models\Matter;
use Illuminate\Support\Facades\DB;
use MatanYadaev\EloquentSpatial\Objects\Point;

/**
 * 獣害情報(管理者作成)新規作成アクション
 */
class CreateAdminAction
{
    /**
     * 獣害情報(管理者作成)を新規作成する
     * @param CreateAdminEntity $enitiy 害獣新規作成データ
     * @return Matter 獣害情報
     */
    public function __invoke(CreateAdminEntity $entity): Matter
    {
        return DB::transaction(function () use ($entity) {
            $saveMatter = new Matter();
            $saveMatter->applied_at = $entity->getAppliedAt();
            $saveMatter->location = new Point($entity->getLat(), $entity->getLng());
            $saveMatter->user_id = $entity->getUserId();
            // 現状はサル固定
            $saveMatter->kind = AnimalKind::MONKY;
            // 現状は複数いることにする
            $saveMatter->is_alone = false;
            $saveMatter->saveOrFail();
            return $saveMatter;
        });
    }
}
