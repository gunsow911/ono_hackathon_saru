<?php

declare(strict_types=1);

namespace App\Http\Requests\Matter;

use App\UseCases\Matter\MultipleRemoveSelectedEntity;
use Illuminate\Foundation\Http\FormRequest;

class MultipleRemoveSelectedRequest extends FormRequest
{
    public function rules()
    {
        return [
            'ids' => 'required|array',
            'ids.*' => 'ulid|exists:matters,id'
        ];
    }

    public function attributes()
    {
        return [
            'ids' => 'IDリスト',
            'ids.*' => '獣害情報ID'
        ];
    }

    /**
     * 選択された獣害情報（複数）のidのリストの生成
     */
    public function makeEntity(): MultipleRemoveSelectedEntity
    {
        return new MultipleRemoveSelectedEntity([
            'ids' => $this->input('ids')
        ]);
    }
}
