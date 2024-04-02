<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('matters', function (Blueprint $table) {
            $table->unsignedInteger('animal_count')->default(1);
            $table->unsignedTinyInteger('appear_type')->default(0);
            $table->boolean('is_damaged')->default(false);
            $table->dropColumn('is_alone');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::table('matters', function (Blueprint $table) {
            $table->dropColumn('animal_count');
            $table->dropColumn('appear_type');
            $table->dropColumn('is_damaged');
            $table->boolean('is_alone')->default(0);
        });
    }
};
