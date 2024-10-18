
const {inquirerMenu,pausa,crearTarea,borrarTarea, leerInput,listadoBorrarTareas,confirmar, mostrarListadoCheckList}  = require('./helpers/inquirer.js');
const Tarea = require('./models/tarea.js');
const Tareas = require('./models/tareas.js');
const {crearArchivo, leerArchivo} = require('./config/crearArchivo.js');

const main = async() => {
    let opcion = '';
    const tareas = new Tareas();
    const tareasDB = leerArchivo()

    if(tareasDB){
        tareas.cargarTareas(tareasDB);
    }

    do{ 
        
        opcion = await  inquirerMenu();
        switch(opcion){
            case '1':
                const descripcion = await leerInput('Ingrese la descripción de la tarea: ');
                tareas.crearTarea(descripcion)
            break;

            case '2':
                console.log(tareas.listadoCompleto());
            break;
                
            case '3':
                console.log(tareas.listarTareasCompletadasOPendientes(true))
            break;
                
            case '4':
                console.log(tareas.listarTareasCompletadasOPendientes(false))
            break;

            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr)
                tareas.toggleCompletadas(ids);
            break;

            case '6':
                const id = await listadoBorrarTareas(tareas.listadoArr);
                if(id!=='0'){
                    const ok = await confirmar('¿Está seguro?')
                    if(ok){
                        tareas.borrarTarea(id);
                    }
                }
                
            break;

            case '7':
                tareas.borrarTareas();
            break;
        }
        crearArchivo(tareas.listarTareas())
        if(opcion !== '0') await pausa();
       
    }while(opcion !== '0')
        
   
}

main()