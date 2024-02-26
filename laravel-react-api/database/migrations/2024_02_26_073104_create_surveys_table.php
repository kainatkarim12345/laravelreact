<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('surveys', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('added_by');
            $table->string('survey_name');
            $table->enum('survey_type', ['profile', 'survey']);
            $table->integer('price_within_timer');
            $table->integer('price_without_timer');
            $table->timestamp('timer_duration')->nullable();
            $table->timestamp('expire_at')->nullable();
            $table->boolean('is_active');
            $table->timestamp('published_at')->nullable();
            $table->timestamps();

            $table->foreign('added_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surveys');
    }
};
