<?php declare(strict_types=1);

namespace Tests;

use Illuminate\Validation\ValidationException;

class FormRequestTestCase extends TestCase
{
    /**
     * バリデーションを行う
     *
     * @param array $data データ
     * @param string $clazz 対象フォームリクエストクラス名
     * @return array バリデーション結果 エラーがない場合は空の配列が返る
     */
    protected function getValidateErrors(array $data, string $clazz): array
    {
        $this->app->resolving($clazz, function ($resolved) use ($data) {
            $resolved->merge($data);
        });
        try {
            app($clazz);
            return [];
        } catch (ValidationException $e) {
            return $e->validator->errors()->messages();
        }
    }

    /**
     * バリデーション済みのリクエストを取得する
     * @param array $data データ
     * @param string $clazz 対象フォームリクエストクラス名
     * @return mixed フォームリクエスト
     */
    protected function getValidatedRequest(array $data, string $clazz)
    {
        $request = $clazz::create('', 'POST', $data)
            ->setContainer($this->app);
        $request->validateResolved();
        return $request;
    }
}

