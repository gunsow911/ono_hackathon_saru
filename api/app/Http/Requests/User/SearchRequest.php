<?php declare(strict_types=1);

namespace App\Http\Requests\User;

use App\UseCases\User\ListEntity;
use Illuminate\Foundation\Http\FormRequest;

class SearchRequest extends FormRequest
{
    public function rules()
    {
        return [
            'q' => 'string|max:255',
        ];
    }

    public function attributes()
    {
        return [
            'q' => '検索文字',
        ];
    }

    /**
     * ユーザー情報検索データの生成
     */
    public function makeEntity(): ListEntity
    {
        return new ListEntity([
            'query' =>  $this->input('q'),
        ]);
    }
}


