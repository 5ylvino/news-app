<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Preference extends Model
{
    use HasUlids;


    protected $fillable = [
        'user_id',
        'source',
        'category',
        'author',
    ];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
