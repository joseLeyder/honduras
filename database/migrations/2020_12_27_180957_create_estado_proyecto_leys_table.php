<?php

use App\Models\EstadoProyectoLey;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

    class CreateEstadoProyectoLeysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('estado_proyecto_leys', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->smallInteger('id')->unsigned()->autoIncrement();
            $table->string('nombre', 50)->nullable();
            $table->boolean('activo')->default(1)->nullable();
            $table->string('usercreated', 250)->nullable();
            $table->string('usermodifed', 250)->nullable();
            $table->timestamps();
        });
        $this->setDataToTable();
    }

    /**
     * Set data to table.
     *
     * @return void
     */
    public function setDataToTable()
    : void
    {
        // File upload location
        $location = 'database';
        $file_name = 'tbl_estado_proyecto_leys.csv';

        // Import CSV to Database
        $filepath = public_path($location."/".$file_name);

        // Reading file
        $file = fopen($filepath,"r");

        $import_data_array = array();
        $i = 0;

        while (($data = fgetcsv($file)) !== FALSE) {
            // Skip first row (Remove below comment if you want to skip the first row)
            $data = array_map("utf8_encode", $data); //added
            if($i === 0){
                $i++;
                continue;
            }
            foreach ($data as $cell_value)
            {
                $import_data_array[$i][] = $cell_value;
            }
            $i++;
        }
        fclose($file);

        // Insert to MySQL database
        foreach($import_data_array as $import_data){
            $created_at = $import_data[5] === 'NA'
                ? null
                : DateTime::createFromFormat(
                    'd/m/Y G:i',
                    $import_data[5]
                );

            $created_at = $created_at
                ? $created_at->format('Y-m-d G:i')
                : null;

            $updated_at = $import_data[6] === 'NA'
                ? null
                : DateTime::createFromFormat(
                    'd/m/Y G:i',
                    $import_data[6]
                );

            $updated_at = $updated_at
                ? $updated_at->format('Y-m-d G:i')
                : null;

            $insertData = [
                "id"=>$import_data[0] === 'NA' ? null : $import_data[0],
                "nombre"=>$import_data[1] === 'NA' ? null : $import_data[1],
                "activo"=>$import_data[2] === 'NA' ? null : $import_data[2],
                "created_at"=>$created_at,
                "updated_at"=>$updated_at,
            ];

            EstadoProyectoLey::insert($insertData);

        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('estado_proyecto_leys');
    }
}
