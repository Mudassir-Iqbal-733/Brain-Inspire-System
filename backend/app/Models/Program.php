<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'code', 'duration', 'image', 
        'course_content', 'what_will_learn', 
        'registration_fee', 'misc_fee', 'course_fee', 'certificate_fee', 'total_fee',
        'seo_title', 'seo_description', 'seo_keywords'
    ];

    protected $casts = [
        'course_content' => 'array',
        'what_will_learn' => 'array',
    ];
}