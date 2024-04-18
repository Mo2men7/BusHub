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
        Schema::create('contact_us', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_user');
            $table->string('title',55);
            $table->text('message');
            $table->date("date_of_response");
            $table->date("date_of_request");
            $table->boolean("status")->default(0);
            $table->foreign('id_user')->references('id')->on('users');
            $table->timestamps();
                        // contact_us (#id, id_user ,title, message,date_of_response, date_of_request, status)

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_us');
    }
};
