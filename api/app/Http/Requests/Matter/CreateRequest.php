<?php declare(strict_types=1);

namespace App\Http\Requests\Matter;

use App\Models\User;
use App\UseCases\Matter\CreateEntity;
use Illuminate\Foundation\Http\FormRequest;

class CreateRequest extends FormRequest
{
    public function rules()
    {
        return [
            'user_id' => 'required|uuid|exists:users,id',
            'lat' => 'present|numeric',
            'lng' => 'present|numeric',
        ];
    }

    public function attributes()
    {
        return [
            'user_id' => 'ユーザーID',
            'lat' => '緯度',
            'lng' => '経度',
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
        ]);
    }
}

