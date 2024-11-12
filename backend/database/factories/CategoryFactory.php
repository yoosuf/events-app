<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Media;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'slug' => Str::slug($this->faker->unique()->word),
            'description' => $this->faker->sentence,
            'cover_image_id' => Media::factory(),
            'thumbnail_id' => Media::factory(),
        ];
    }
}
