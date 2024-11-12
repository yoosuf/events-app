<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\Category;
use App\Models\Media;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    protected $model = Event::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'timezone' => $this->faker->timezone,
            'start_date' => $this->faker->dateTimeBetween('+1 week', '+2 weeks'),
            'end_date' => $this->faker->dateTimeBetween('+2 weeks', '+3 weeks'),
            'location' => $this->faker->address,
            'is_online' => $this->faker->boolean,
            'cover_image_id' => Media::factory(),
            'capacity' => $this->faker->numberBetween(50, 500),
            'categories_id' => Category::factory(),
            'thumbnail_id' => Media::factory(),
        ];
    }
}
