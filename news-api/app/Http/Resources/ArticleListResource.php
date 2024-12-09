<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'title'=> $this->title,
            'content'=> $this->content,
            'author'=> $this->author,
            'source'=> $this->source,
            'category'=> $this->category,
            'publish_date'=> $this->publish_date,
            'image_url'=> $this->image_url,
        ];
    }
}
