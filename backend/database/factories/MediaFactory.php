<?php
namespace Database\Factories;

use App\Models\Media;
use Illuminate\Database\Eloquent\Factories\Factory;

class MediaFactory extends Factory
{
    protected $model = Media::class;

    public function definition()
    {
        return [
            'file_name' => $this->faker->word . '.jpg',
            'file_path' => 'https://abh.ai/nature/400/200?random=' . $this->faker->unique()->randomNumber(5),
            'file_size' => $this->faker->numberBetween(100, 1000) . ' KB',
            'mime_type' => 'image/jpeg',
        ];
    }
}
