<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class Article extends Model
{
    use HasUlids;

    protected $fillable = [
        'title',
        'content',
        'author',
        'source',
        'category',
        'publish_date',
    ];

    static function scopeFilter($query, $filters)
    {
        if (!empty($filters['category'])) {
            $query->where('category', $filters['category']);
        }
        if (!empty($filters['source'])) {
            $query->where('source', $filters['source']);
        }
        if (!empty($filters['author'])) {
            $query->where('author', $filters['author']);
        }
        if (!empty($filters['category'])) {
            $query->where('category', $filters['category']);
        }
        if (!empty($filters['date'])) {
            $query->whereDate('publish_date', date("Y-m-d", strtotime($filters['date'])));
        }
        return $query;
    }
}
