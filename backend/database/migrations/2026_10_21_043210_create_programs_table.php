<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('code');
            $table->string('duration');
            $table->string('image')->nullable();
            $table->json('course_content')->nullable(); 
            $table->json('what_will_learn')->nullable(); 
            $table->decimal('registration_fee', 10, 2)->default(0);
            $table->decimal('misc_fee', 10, 2)->default(0);
            $table->decimal('course_fee', 10, 2)->default(0);
            $table->decimal('certificate_fee', 10, 2)->default(0);
            $table->decimal('total_fee', 10, 2)->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('programs');
    }
};