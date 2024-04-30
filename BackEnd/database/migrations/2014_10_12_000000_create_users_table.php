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
            $table->string('username');
            $table->string('email')->unique();
            $table->string('google_id')->nullable();

            $table->enum('role', ['user', 'admin'])->default('user');
            $table->date('birth_date')->nullable();
            $table->enum('gender', ['Female', 'Male'])->nullable();
            $table->string('password');
            $table->string('city')->nullable();
            $table->string('phone', 12)->nullable();
            $table->rememberToken();
            $table->timestamps();
            // (#id,username,email, role, birth_date, gender,password, city, phone)

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
