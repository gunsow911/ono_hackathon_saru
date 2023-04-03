<?php declare(strict_types=1);

namespace App\Http\Requests\AdminUser;

use App\UseCases\AdminUser\CreateEntity;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Http\FormRequest;

class CreateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users|max:255',
            'password' => 'required|between:6,255|confirmed',
            'password_confirmation' => 'required',
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'ユーザー名',
            'email' => 'メールアドレス',
            'password' => 'パスワード',
            'password_confirmation' => 'パスワード確認',
        ];
    }

    /**
     * ユーザ追加データの生成
     */
    public function makeEnitiy(): CreateEntity
    {
        return new CreateEntity([
            'name' => $this->input('name'),
            'email' => $this->input('email'),
            'password' => Hash::make($this->input('password')),
        ]);
    }
}

