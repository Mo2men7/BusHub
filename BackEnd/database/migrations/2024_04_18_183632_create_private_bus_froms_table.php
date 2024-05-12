<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('private_bus_froms', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id");
            $table->string("name", 55);
            $table->string("phone", 12);
            $table->unsignedBigInteger("bus_type_id");
            $table->integer("passenger_number");
            $table->unsignedBigInteger("from");
            $table->unsignedBigInteger("to");
            $table->date("departure_date");
            $table->boolean("return");
            $table->dateTime("date_of_request");
            $table->date("date_of_response");
            $table->enum('status', ['Accepted', "Rejected", "Pending"])->default('Pending');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('bus_type_id')->references('id')->on('types')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('from')->references('id')->on('destinations')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('to')->references('id')->on('destinations')->onDelete('cascade')->onUpdate('cascade');

            // private_bus_form(#id,user_id, name, phone,bus_type_id,passenger_number,from,to,departure_date,return,date_of_request, date_of_response, status)

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('private_bus_froms');
    }
};
