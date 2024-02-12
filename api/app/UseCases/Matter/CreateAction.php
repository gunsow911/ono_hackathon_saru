<?php declare(strict_types=1);
namespace App\UseCases\Matter;

use App\Enums\AnimalKind;
use App\Models\Matter;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use MatanYadaev\EloquentSpatial\Objects\Point;

/**
 * 獣害情報新規作成アクション
 */
class CreateAction
{
    /**
     * 獣害情報を新規作成する
     * @param CreateEntity $enitiy 害獣新規作成データ
     * @param User $user 実行ユーザ
     * @return Matter 獣害情報
     */
    public function __invoke(CreateEntity $entity, User $user): Matter
    {
        return DB::transaction(function () use ($entity, $user) {
            $date = new Carbon();
            $saveMatter = new Matter();
            $saveMatter->applied_at = $date;
            $saveMatter->location = new Point($entity->getLat(), $entity->getLng());
            $saveMatter->user_id = $user->id;
            // 現状はサル固定
            $saveMatter->kind = AnimalKind::MONKY;
            $saveMatter->animal_count = $entity->getAnimalCount();
            $saveMatter->appear_type = $entity->getAppearType();
            $saveMatter->is_damaged = $entity->getIsDamaged();
            $saveMatter->saveOrFail();
            return $saveMatter;
        });
    }
}
