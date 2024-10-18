const Tarea = require('./tarea.js');
const {colors}       = require('../config/colors.js');
class Tareas {

    _listado = {};
    
    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea)
        })

        return listado;
    }

    constructor(){
        this._listado = {};
    }

    cargarTareas (tareas = [])  {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc='') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listarTareas(){
        
        return Object.values(this._listado)
        
    }

    listarTareasCompletadasOPendientes(completadas = true){
   
        let salida = '';
        let contador = 0;

        this.listarTareas().forEach((tarea,index) => {
          
            if(completadas){
                if(tarea.completadoEn){
                    salida+=`${colors.green((contador+=1) + ':')} ${colors.bold(tarea.desc)  }  ::  Completedada el: ${tarea.completadoEn.toString().green}\n`
                }
            }else{
                if(!tarea.completadoEn){

                    salida+=`${colors.green((contador+=1) + ':')} ${colors.bold(tarea.desc)  }  ::  ${"Pendiente".red}\n`
                }
            }
            
        })

        return(salida);
    }

    borrarTarea(id){
        try {
            if(!this._listado[id]){
                throw Error( `La tarea con id ${id} no existe `)
            }
    
            delete this._listado[id];
        }catch(error){
            
            throw error
        }
      
        
    }

    borrarTareas(){
        this._listado = {};
    }

    listadoCompleto(){
        let salida = '';
        this.listarTareas().forEach((tarea,index) => {
            salida+=`${colors.green((index+1) + ':')} ${colors.bold(tarea.desc)  }  ::  ${tarea.completadoEn ? "Completada".green:"Pendiente".red}\n`
        })

        return(salida);
    }

    toggleCompletadas (ids= []){
        ids.forEach(id => {
            const tarea = this._listado[id]
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }

        })

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                
                this._listado[tarea.id].compleadoEn = null;
            }
        })
    }
}

module.exports = Tareas