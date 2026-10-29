<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Blog extends Model
{
    protected $fillable = [
        'title',
        'shortDesc',
        'description',
        'image',
        'descImg',
        'author',
        'views_count',
        'keywords',
        'category_id',
        'seo_title',
        'seo_description',
        'seo_keywords',
    ];

    protected $casts = [
        'keywords' => 'array',
        'views_count' => 'integer',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}