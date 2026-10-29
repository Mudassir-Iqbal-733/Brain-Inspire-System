<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdmissionSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'why_title', 'why_desc', 'why_cards',
        'rules_notice', 'rules_categories',
        'process_steps', 'required_docs',
        'seo_title', 'seo_description', 'seo_keywords' 
    ];

    protected $casts = [
        'why_cards' => 'array',
        'rules_categories' => 'array',
        'process_steps' => 'array',
        'required_docs' => 'array',
    ];
}