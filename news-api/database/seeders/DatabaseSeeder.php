<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(5)->create();

        // User::factory(10)->create([
        //     'first_name' => 'Tester',
        //     'last_name' => 'test',
        //     'email' => 'test@example.com',
        // ]);
    }
}
