<?php declare(strict_types=1);

namespace App\Http\Requests\Matter;

use App\Models\User;
use App\UseCases\Matter\CreateAdminEntity;
use Illuminate\Foundation\Http\FormRequest;

class CreateAdminRequest extends FormRequest
{
    public function rules()
    {
        return [
            'user_id' => 'required|uuid|exists:users,id',
            'lat' => 'present|numeric',
            'lng' => 'present|numeric',
            'applied_at' => 'required|date_format:Y-m-d',
        ];
    }

    public function attributes()
    {
        return [
            'user_id' => 'ユーザーID',
            'lat' => '緯度',
            'lng' => '経度',
            'applied_at' => '日付',
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
    public function makeEntity(): CreateAdminEntity
    {
        return new CreateAdminEntity([
            'user_id' => $this->input('user_id'),
            'lat' => (float)$this->input('lat'),
            'lng' => (float)$this->input('lng'),
            'applied_at' => $this->input('applied_at'),
        ]);
    }
}


