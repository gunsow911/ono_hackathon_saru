<?php declare(strict_types=1);

namespace App\Http\Requests\Matter;

use App\UseCases\Matter\SaveEntity;
use Illuminate\Foundation\Http\FormRequest;

class SaveRequest extends FormRequest
{
    public function rules()
    {
        return [
            'lat' => 'present|numeric',
            'lng' => 'present|numeric',
        ];
    }

    public function attributes()
    {
        return [
            'lat' => '緯度',
            'lng' => '経度',
        ];
    }

    /**
     * 獣害情報作成データの生成
     */
    public function makeEntity(): SaveEntity
    {
        return new SaveEntity([
            'lat' => (float)$this->input('lat'),
            'lng' => (float)$this->input('lng'),
        ]);
    }
}

