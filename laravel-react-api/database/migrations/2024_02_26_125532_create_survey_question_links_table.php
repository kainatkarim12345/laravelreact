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
        Schema::create('survey_question_links', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('questions_id');
            $table->foreign('questions_id')->references('id')->on('questions')->onDelete('cascade');
            $table->unsignedBigInteger('survey_id');
            $table->foreign('survey_id')->references('id')->on('surveys')->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('survey_question_links');
    }
};
