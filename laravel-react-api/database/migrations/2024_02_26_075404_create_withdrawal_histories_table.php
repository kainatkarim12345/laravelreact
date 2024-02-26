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
        Schema::create('withdrawal_histories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('withdrawal_request_id');
            $table->unsignedBigInteger('editor_id');
            $table->enum('status', ['pending', 'approved', 'rejected', 'completed', 'failed']);
            $table->timestamps();

            $table->foreign('withdrawal_request_id')->references('id')->on('withdrawal_requests');
            $table->foreign('editor_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('withdrawal_histories');
    }
};
