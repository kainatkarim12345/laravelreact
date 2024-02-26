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
        Schema::create('survey_attempts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('attempt_by');
            $table->unsignedBigInteger('survey_id');
            $table->unsignedBigInteger('questions_id');
            $table->unsignedBigInteger('option_id');
            $table->string('option_text')->nullable();
            $table->timestamps();

            $table->foreign('attempt_by')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('survey_id')->references('id')->on('surveys')->onDelete('cascade');
            $table->foreign('questions_id')->references('id')->on('questions')->onDelete('cascade');
            $table->foreign('option_id')->references('id')->on('options')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('survey_attempts');
    }
};
