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
        Schema::create('question_translations', function (Blueprint $table) {
            $table->unsignedBigInteger('questions_id');
            $table->unsignedBigInteger('language');
            $table->string('text');
            $table->timestamps();

            $table->foreign('questions_id')->references('id')->on('questions')->onDelete('cascade');
            $table->foreign('language')->references('id')->on('langs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('question_translations');
    }
};
