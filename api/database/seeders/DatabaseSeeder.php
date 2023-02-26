<?php declare(strict_types=1);

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory()->create([
            'id' => '3752b6b1-ae04-4076-8907-49fce7b945eb',
            'name' => 'テストユーザ',
            'description' => 'テスト用のユーザです',
        ]);
    }
}
