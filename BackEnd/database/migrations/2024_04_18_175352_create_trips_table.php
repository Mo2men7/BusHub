<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // trips (#id,bus_id, from , to, date, price)
    public function up(): void
    {
        Schema::create('trips', function (Blueprint $table) {
            $table->id();
            // $table->foreignId("bus_id")->constrained();
            $table->unsignedBigInteger('bus_id');
            $table->foreign('bus_id')->references('id')->on('buses')->onDelete('cascade');
            $table->unsignedBigInteger('from_location');
            $table->foreign('from_location')->references('id')->on('destinations')->onDelete('cascade');
            $table->unsignedBigInteger('to_location');
            $table->foreign('to_location')->references('id')->on('destinations')->onDelete('cascade');
            $table->unsignedBigInteger("price");
            $table->time("time");
            $table->date("date");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trips');
    }
};
