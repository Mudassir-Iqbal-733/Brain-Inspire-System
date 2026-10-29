<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('admission_settings', function (Blueprint $table) {
            $table->id();
            $table->string('why_title')->nullable();
            $table->text('why_desc')->nullable();
            $table->json('why_cards')->nullable();
            $table->text('rules_notice')->nullable();
            $table->json('rules_categories')->nullable();
            $table->json('process_steps')->nullable();
            $table->json('required_docs')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admission_settings');
    }
};