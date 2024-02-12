<?php declare(strict_types=1);

namespace App\Http\Requests\Matter;

use App\Enums\AppearType;
use App\UseCases\Matter\UpdateEntity;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Carbon;
use Illuminate\Validation\Rule;

class UpdateRequest extends FormRequest
{
    public function rules()
    {
        return [
            'applied_at' => 'required|date_format:Y-m-d H:i:s',
            'lat' => 'present|numeric',
            'lng' => 'present|numeric',
            'animal_count' => 'required|integer|min:0|max:999',
            'appear_type' => ['required', Rule::in('SEEING', 'HEARING')],
            'is_damaged' => 'required|boolean',
        ];
    }

    public function attributes()
    {
        return [
            'applied_at' => '日付',
            'lat' => '緯度',
            'lng' => '経度',
            'animal_count' => '頭数',
            'appear_type' => '出没時情報',
            'is_damaged' => '農業被害',
        ];
    }

    /**
     * 獣害情報更新データの生成
     */
    public function makeEntity(): UpdateEntity
    {
        return new UpdateEntity([
            'applied_at' =>  new Carbon($this->input('applied_at')),
            'lat' => (float)$this->input('lat'),
            'lng' => (float)$this->input('lng'),
            'animal_count' => (int)$this->input('animal_count'),
            'appear_type' => AppearType::fromName($this->input('appear_type')),
            'is_damaged' => (bool)$this->input('is_damaged'),
        ]);
    }
}

