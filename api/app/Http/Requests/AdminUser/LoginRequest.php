<?php declare(strict_types=1);

namespace App\Http\Requests\AdminUser;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function rules()
    {
        return [
            'username' => 'required',
            'password' => 'required',
        ];
    }

    public function attributes()
    {
        return [
            'username' => 'ユーザー名',
            'password' => 'パスワード',
        ];
    }
}


