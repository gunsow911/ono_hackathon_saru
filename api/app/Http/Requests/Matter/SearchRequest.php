<?php declare(strict_types=1);

namespace App\Http\Requests\Matter;

use App\Enums\AppearType;
use App\UseCases\Matter\ListEntity;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Carbon;
use Illuminate\Validation\Rule;

class SearchRequest extends FormRequest
{
    public function rules()
    {
        return [
            'q' => 'string|max:255',
            'from' => 'nullable|date_format:Y-m-d',
            'to' => 'nullable|date_format:Y-m-d',
            'appear_type' => ['nullable', Rule::in('SEEING', 'HEARING')],
            'is_damaged' => 'nullable|boolean',
            'min' => 'nullable|integer|min:0|max:999',
            'max' => 'nullable|integer|min:0|max:999',
        ];
    }

    public function attributes()
    {
        return [
            'q' => '検索文字',
            'from' => '日付(自)',
            'to' => '日付(至)',
            'appear_type' => '出没時の状況',
            'is_damaged' => '農業被害',
            'min' => '頭数(最小)',
            'max' => '頭数(最大)',
        ];
    }

    /**
     * 獣害情報検索データの生成
     */
    public function makeEntity(): ListEntity
    {
        return new ListEntity([
            'query' =>  $this->input('q', ''),
            'from' =>  $this->input('from') !== null ? new Carbon($this->input('from')) : null,
            'to' =>  $this->input('to') !== null ? new Carbon($this->input('to')) : null,
            'appear_type' =>  $this->input('appear_type') !== null ? AppearType::fromName($this->input('appear_type')) : null,
            'is_damaged' =>  $this->input('is_damaged') !== null ? (bool)$this->input('is_damaged') : null,
            'min' =>  $this->input('min') !== null ? (int)$this->input('min') : null,
            'max' =>  $this->input('max') !== null ? (int)$this->input('max') : null,
        ]);
    }
}


