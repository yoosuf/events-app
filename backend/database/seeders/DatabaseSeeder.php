<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Media;
use App\Models\Event;
use App\Models\Participant;


// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        User::factory(10)->create(); 

        Media::factory(50)->create(); 

        Category::factory(10)->create();

        Event::factory(20)->create();

        Participant::factory(100)->create(); 

    }
}
