<?php

declare(strict_types=1);

use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\MatterController;
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
    });

    // ユーザ一覧
    Route::get('users', [UserController::class, 'index']);
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
