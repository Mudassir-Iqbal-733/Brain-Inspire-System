<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('header_settings', function (Blueprint $table) {
            if (!Schema::hasColumn('header_settings', 'logo_image')) {
                $table->string('logo_image')->nullable()->after('logo_text');
            }
        });
    }

    public function down(): void
    {
        Schema::table('header_settings', function (Blueprint $table) {
            $table->dropColumn('logo_image');
        });
    }
};