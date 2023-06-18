<?php

declare(strict_types=1);

namespace App\Http\Requests\Matter;

use App\UseCases\Matter\CreateRemoveSelectedEntity;
use Illuminate\Foundation\Http\FormRequest;

class CreateRemoveSelectedRequest extends FormRequest
{
    public function rules()
    {
        return [
            'ids' => 'present|array',
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
     * （管理者が実行）
     * 選択された獣害情報（複数）のidのリストの生成
     */
    public function makeEntity(): CreateRemoveSelectedEntity
    {
        return new CreateRemoveSelectedEntity([
            'ids' => $this->input('ids')
        ]);
    }
}
