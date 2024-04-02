<?php declare(strict_types=1);

namespace App\UseCases\Matter;

use App\Models\Matter;
use App\Utils\StringUtil;
use Illuminate\Database\Eloquent\Builder;

/**
 * 害獣情報一覧取得アクション
 */
class ListAction
{
    /**
     * 害獣情報一覧を取得する
     * @param $entity ListEntity|null 検索情報
     * @return\MatanYadaev\EloquentSpatial\SpatialBuilder<Matter> 害獣情報一覧クエリ
     */
    public function __invoke(ListEntity $entity = null): Builder
    {
        if ($entity === null) {
            $entity = new ListEntity([
                'query' => '',
                'from' => null,
                'to' => null,
                'appear_type' => null,
                'is_damaged' => null,
                'max' => null,
                'min' => null,
            ]);
        }

        $query = Matter::select('matters.*')
            ->leftJoin('users', function ($join) {
                $join->on('matters.user_id', '=', 'users.id');
            });

        $words = StringUtil::explodeWhitespace($entity->getQuery());
        foreach ($words as $word) {
            $query->where(function ($q) use ($word) {
                $faz = '%'.addcslashes($word, '%_\\').'%';
                $q->where('users.id', '=', $word)
                    ->orwhere('users.name', 'LIKE', $faz);
            });
        }

        if ($entity->getFrom() !== null) {
            $query->whereDate('matters.applied_at', '>=', $entity->getFrom()->format('Y-m-d').' 0:00:00');
        }
        if ($entity->getTo() !== null) {
            $query->whereDate('matters.applied_at', '<=', $entity->getTo()->format('Y-m-d').' 23:59:59');
        }
        if ($entity->getAppearType() !== null) {
            $query->where('matters.appear_type', '=', $entity->getAppearType());
        }
        if ($entity->getIsDamaged() !== null) {
            $query->where('matters.is_damaged', '=', $entity->getIsDamaged() ? 1 : 0);
        }
        if ($entity->getMax() !== null) {
            $query->where('matters.animal_count', '<=', $entity->getMax());
        }
        if ($entity->getMin() !== null) {
            $query->where('matters.animal_count', '>=', $entity->getMin());
        }

        $query->orderBy('applied_at', 'desc');
        return $query;
    }
}
