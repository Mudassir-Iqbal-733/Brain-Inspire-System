<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('admissions', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('father_name');
            $table->string('cnic')->nullable();
            $table->string('dob')->nullable();
            $table->string('gender')->nullable();
            $table->string('email')->nullable();
            $table->string('phone');
            $table->string('whatsapp')->nullable();
            $table->text('address')->nullable();
            $table->string('city')->nullable();
            $table->string('province')->nullable();
            $table->string('last_qualification')->nullable();
            $table->string('last_institute')->nullable();
            $table->string('passing_year')->nullable();
            $table->string('marks_grade')->nullable();
            $table->string('course');
            $table->string('preferred_duration')->nullable();
            $table->string('source')->nullable();
            $table->text('additional_notes')->nullable();
            $table->string('status')->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admissions');
    }
};