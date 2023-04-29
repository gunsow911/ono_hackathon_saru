<?php

declare(strict_types=1);

use App\Http\Controllers\Console\AdminUserController;
use App\Http\Controllers\MatterController;
// ユーザ用のMatterControllerで名前がかぶるので、as で別名を付けています。
use App\Http\Controllers\Console\MatterController as ConsoleMatterController;
use App\Http\Controllers\Console\UserController as ConsoleUserController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/**
 * 管理者用
 */
// 管理者機能
Route::prefix('console')->group(function () {
    // ログイン
    Route::post('login', [AdminUserController::class, 'login']);

    // 認証が必要なルート
    Route::middleware('auth:admin')->group(function () {
        // ログアウト
        Route::delete('logout', [AdminUserController::class, 'logout']);

        // 管理者情報取得
        Route::get('admin-users/me', [AdminUserController::class, 'me']);

        // 害獣情報一覧
        Route::get('matters', [ConsoleMatterController::class, 'index']);
        // 害獣情報詳細
        Route::get('matters/{matter}', [ConsoleMatterController::class, 'detail'])
            ->whereUlid('matter');
        // 害獣情報更新
        Route::put('matters/{matter}', [ConsoleMatterController::class, 'update'])
            ->whereUlid('matter');
        // 害獣情報削除
        Route::delete('matters/{matter}', [ConsoleMatterController::class, 'remove'])
            ->whereUlid('matter');

        // ユーザ情報一覧
        Route::get('users', [ConsoleUserController::class, 'index']);
        // ユーザ情報作成
        Route::post('users', [ConsoleUserController::class, 'create']);
        // ユーザ情報編集
        Route::put('users/{user}', [ConsoleUserController::class, 'update']);
        // ユーザ情報削除
        Route::delete('users/{user}', [ConsoleUserController::class, 'delete']);
    });
});

/**
 * 一般ユーザー用
 */
// 害獣情報一覧
Route::get('matters', [MatterController::class, 'index']);
// 害獣情報作成
Route::post('matters', [MatterController::class, 'create']);

// ユーザ確認
Route::get('users/{userId}/verify', [UserController::class, 'verify'])
    ->whereUuid('user');
