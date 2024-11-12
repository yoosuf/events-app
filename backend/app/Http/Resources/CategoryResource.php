<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
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