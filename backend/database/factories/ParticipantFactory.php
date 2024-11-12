<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\Participant;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ParticipantFactory extends Factory
{
    protected $model = Participant::class;

    public function definition()
    {
        return [
            'event_id' => Event::factory(),
            'user_id' => User::factory(),
            'status' => $this->faker->randomElement(['pending', 'confirmed', 'cancelled']),
            'is_confirmed' => $this->faker->boolean,
            'hashToken' => Str::random(64),
            'confirmed_at' => $this->faker->optional()->dateTime,
        ];
    }
}
