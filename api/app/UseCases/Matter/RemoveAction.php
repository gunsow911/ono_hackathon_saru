<?php declare(strict_types=1);
namespace App\UseCases\Matter;

use App\Models\Matter;
use Illuminate\Support\Facades\DB;

/**
 * 獣害情報削除アクション
 */
class RemoveAction
{
    /**
     * 獣害情報を削除する
     * @param Matter $matter 削除する獣害情報
     * @return void
     */
    public function __invoke(Matter $matter): void
    {
        DB::transaction(function () use ($matter) {
            /** @var Matter */
            $removeMatter = Matter::where('id', '=', $matter->id)
                ->first();
            if ($removeMatter === null) return;
            $removeMatter->delete();
        });
    }
}

