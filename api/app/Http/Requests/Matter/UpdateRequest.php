<?php declare(strict_types=1);

namespace App\Http\Requests\Matter;

use App\UseCases\Matter\UpdateEntity;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Carbon;

class UpdateRequest extends FormRequest
{
    public function rules()
    {
        return [
            'applied_at' => 'required|date_format:Y-m-d',
            'lat' => 'present|numeric',
            'lng' => 'present|numeric',
        ];
    }

    public function attributes()
    {
        return [
            'applied_at' => '日付',
            'lat' => '緯度',
            'lng' => '経度',
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
        ]);
    }
}

