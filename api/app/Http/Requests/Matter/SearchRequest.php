<?php declare(strict_types=1);

namespace App\Http\Requests\Matter;

use App\UseCases\Matter\ListEntity;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Carbon;

class SearchRequest extends FormRequest
{
    public function rules()
    {
        return [
            'q' => 'string|max:255',
            'from' => 'nullable|date_format:Y-m-d',
            'to' => 'nullable|date_format:Y-m-d',
        ];
    }

    public function attributes()
    {
        return [
            'q' => '検索文字',
            'from' => '日付(自)',
            'to' => '日付(至)',
        ];
    }

    /**
     * 獣害情報検索データの生成
     */
    public function makeEntity(): ListEntity
    {
        return new ListEntity([
            'query' =>  $this->input('q', ''),
            'from' =>  $this->input('from') ? new Carbon($this->input('from')) : null,
            'to' =>  $this->input('to') ? new Carbon($this->input('to')) : null,
        ]);
    }
}


