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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('user_name')->nullable();
            $table->unsignedBigInteger('phone_number')->nullable();
            $table->foreign('phone_number')->references('id')->on('user_otps');
            $table->string('email')->nullable();
            $table->string('city')->nullable();
            $table->string('password');
            $table->string('referral_link')->nullable();
            $table->integer('referral_count')->nullable();
            $table->enum('provider', ['google', 'facebook']);
            $table->unsignedBigInteger('language')->nullable();
            $table->foreign('language')->references('id')->on('langs');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
