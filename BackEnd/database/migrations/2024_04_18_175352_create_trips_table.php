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
            $table->foreign('bus_id')->references('id')->on('buses')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('from');
            $table->foreign('from')->references('id')->on('destinations')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('to');
            $table->foreign('to')->references('id')->on('destinations')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger("price");
            $table->date("date");
            $table->time("time");
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
