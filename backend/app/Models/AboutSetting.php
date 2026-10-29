<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'introduction_para',
        'core_values',
        'mission_para',
        'vision_para',
        'future_plans',
        'seo_title', 
        'seo_description',
         'seo_keywords'
    ];

    protected $casts = [
        'core_values' => 'array',
        'future_plans' => 'array',
    ];
}