<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'timezone' => $this->timezone,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'location' => $this->location,
            'is_online' => $this->is_online,
            'participants_count' => $this->participants_count,
            'category' => [
                'id' => $this->category->id ?? null,
                'name' => $this->category->name ?? null,
                'slug' => $this->category->slug ?? null,
                'description' => $this->category->description ?? null,
            ],
            'cover_image' => [
                'id' => $this->coverImage->id ?? null,
                'file_name' => $this->coverImage->file_name ?? null,
                'file_path' => $this->coverImage->file_path ?? null,
                'file_size' => $this->coverImage->file_size ?? null,
                'mime_type' => $this->coverImage->mime_type ?? null,
            ],
            'thumbnail' => [
                'id' => $this->thumbnail->id ?? null,
                'file_name' => $this->thumbnail->file_name ?? null,
                'file_path' => $this->thumbnail->file_path ?? null,
                'file_size' => $this->thumbnail->file_size ?? null,
                'mime_type' => $this->thumbnail->mime_type ?? null,
            ],
        ];
    }
}
