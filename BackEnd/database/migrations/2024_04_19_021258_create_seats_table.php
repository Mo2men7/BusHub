<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * tickets(#id, trip_id,user_id)
     *   seats(#id,#trip_id,#bus_id,user_id)
     */
    public function up(): void
    {
        Schema::create('seats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('trip_id')->constrained();
            // $table->foreignId('bus_id')->constrained();
            // $table->foreignId('user_id')->nullable()->constrained();
            $table->integer('seat_num');
            $table->integer('reserved');
            $table->timestamps();
            // $table->unique(['trip_id','seat_num']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seats');
    }
};
