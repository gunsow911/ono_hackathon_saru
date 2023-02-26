<?php declare(strict_types=1);

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

Route::middleware('auth:sanctum')->group(function () {
    // 認証が必要なルーティングの場合ここに記述する
});

Route::get('matters', [MatterController::class, 'index']);
Route::post('matters', [MatterController::class, 'create']);

// ユーザ確認
Route::get('users/{user}/verify', [UserController::class, 'verify'])
    ->whereUuid('user');
