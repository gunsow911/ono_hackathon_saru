<?php declare(strict_types=1);

namespace App\Http\Requests\Matter;

use App\Enums\AppearType;
use App\Models\User;
use App\UseCases\Matter\CreateEntity;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateRequest extends FormRequest
{
    public function rules()
    {
        return [
            'user_id' => 'required|uuid|exists:users,id',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            'applied_at' => 'required|date_format:Y-m-d H:i:s',
            'animal_count' => 'required|integer|min:0|max:999',
            'appear_type' => ['required', Rule::in('SEEING', 'HEARING')],
            'is_damaged' => 'required|boolean',
        ];
    }

    public function attributes()
    {
        return [
            'user_id' => 'ユーザーID',
            'lat' => '緯度',
            'lng' => '経度',
            'applied_at' => '日付',
            'animal_count' => '頭数',
            'appear_type' => '出没時情報',
            'is_damaged' => '農業被害',
        ];
    }

    /**
     * ユーザの生成
     */
    public function makeUser(): User
    {
        return User::whereId($this->input('user_id'))->firstOrFail();
    }

    /**
     * 獣害情報新規作成データの生成
     */
    public function makeEntity(): CreateEntity
    {
        return new CreateEntity([
            'lat' => (float)$this->input('lat'),
            'lng' => (float)$this->input('lng'),
            'animal_count' => (int)$this->input('animal_count'),
            'appear_type' => AppearType::fromName($this->input('appear_type')),
            'is_damaged' => (bool)$this->input('is_damaged'),
        ]);
    }
}

