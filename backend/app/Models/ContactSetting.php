<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'address',
        'phone',
        'email',
        'map_url',
        'seo_title',
         'seo_description', 
         'seo_keywords'
    ];
}