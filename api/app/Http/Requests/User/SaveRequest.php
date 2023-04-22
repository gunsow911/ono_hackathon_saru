<?php declare(strict_types=1);

namespace App\Http\Requests\User;

use App\UseCases\User\SaveEntity;
use Illuminate\Foundation\Http\FormRequest;

/**
 * ユーザ保存リクエスト
 */
class SaveRequest extends FormRequest
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
            'description' => 'present|max:10000', // DB的にはTEXT型なので文字制限は無いが、とりあえず上限を10000字とする
        ];
    }

    public function attributes()
    {
        return [
            'name' => '名前',
            'description' => '概要',
        ];
    }

    /**
     * ユーザ追加データの生成
     */
    public function makeEntity(): SaveEntity
    {
        return new SaveEntity([
            'name' => $this->input('name'),
            'description' => $this->input('description'),
        ]);
    }
}


