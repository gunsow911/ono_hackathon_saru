<?php declare(strict_types=1);
namespace App\UseCases\Matter;

use App\Models\Matter;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use App\UseCases\Account\CreateEntity;
use DateTime;
use MatanYadaev\EloquentSpatial\Objects\Point;

/**
 * 害獣情報保存アクション
 */
class SaveAction
{
    /**
     * 害獣情報を保存する
     * @param CreateEntity $enitiy 取引先データ
     * @param User $user 実行ユーザ
     * @param Matter $matter 獣害情報 nullの場合は新規作成
     * @return Matter 害獣情報
     */
    public function __invoke(SaveEntity $entity, User $user, Matter $matter = null): Matter
    {
        return DB::transaction(function () use ($entity, $user, $matter) {
            $date = new DateTime();
            if ($matter === null) {
                $saveMatter = new Matter();
                $saveMatter->applied_at = $date;
            } else {
                /** @var Matter */
                $saveMatter = Matter::where('id', '=', $matter->id)
                    ->firstOrFail();
            }
            $saveMatter->location = new Point($entity->getLat(), $entity->getLng());
            $saveMatter->user_id = $user->id;
            $saveMatter->saveOrFail();
            return $saveMatter;
        });
    }
}
