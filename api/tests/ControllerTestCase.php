<?php declare(strict_types=1);

namespace Tests;

use Mockery;
use Mockery\MockInterface;

class ControllerTestCase extends TestCase
{
    /**
     * アクションをモックする
     *
     * @param string $action アクションクラス名
     * @param mixed|null $return アクションの戻り値
     * @return void
     */
    protected function mockAction(string $action, $return = null): void
    {
        /** @var MockInterface */
        $mock = Mockery::mock($action);
        $mock->shouldReceive('__invoke')
            ->once()
            ->andReturns($return);
        $this->instance($action, $mock);
    }

    /**
     * 例外が発生するアクションをモックする
     *
     * @param string $action アクションクラス名
     * @param string $return 例外クラス名
     * @return void
     */
    protected function mockActionWithException(string $action, string $exception): void
    {
        /** @var MockInterface */
        $mock = Mockery::mock($action);
        $mock->shouldReceive('__invoke')
            ->once()
            ->andThrow($exception);
        $this->instance($action, $mock);
    }

    /**
     * ポリシーをモックする
     * ポリシーメソッドが必ず認可される
     *
     * @param string $policy 対象ポリシークラス名
     * @param string $expectedAbility ポリシーメソッド
     * @return void
     */
    protected function mockPolicy(string $policy, string $expectedAbility): void
    {
        // 意図したポリシーが呼び出されているか確認
        /** @var MockInterface */
        $mock = Mockery::mock($policy);
        if (method_exists($policy, 'before')) {
            $expectation = $mock->shouldReceive('before')
                ->withArgs(function ($user, $ability) use ($expectedAbility) {
                    return $ability === $expectedAbility;
                });
        } else {
            $expectation = $mock->shouldReceive($expectedAbility);
        }
        $expectation->once()
            ->andReturnTrue();
        $this->instance($policy, $mock);
    }
}

