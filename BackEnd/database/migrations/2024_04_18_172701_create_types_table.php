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
        Schema::create('types', function (Blueprint $table) {
            // $table->id();
            $table->unsignedBigInteger('id');
            $table->string('type');
            $table->unsignedBigInteger('option_id');
            $table->foreign('option_id')->references('id')->on('options');
            $table->primary(['id', 'option_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('types');
    }
};
