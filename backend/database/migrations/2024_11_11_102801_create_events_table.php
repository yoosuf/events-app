<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255);
            $table->text('description');
            $table->string('timezone', 50);
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->string('location', 255)->nullable();
            $table->boolean('is_online')->default(0);
            $table->foreignId('cover_image_id')->nullable()->constrained('media');
            $table->integer('capacity');
            $table->foreignId('categories_id')->nullable()->constrained('categories');
            $table->foreignId('thumbnail_id')->nullable()->constrained('media');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
