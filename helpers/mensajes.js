const {colors}       = require('../config/colors.js');

const mostrarMenu =  () => {
    return new Promise(resolve => {
        console.clear();
        
        console.log('====================='.green)
        console.log('Seleccione una opción'.white)
        console.log('====================='.green)
    
        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Cpmpletar tarea(s)`);
        console.log(`${'6.'.green} Borrar tarea`);
        console.log(`${'0.'.red} Salir \n`);
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question('Seleccione una opcion: ', (opt) => {
            
            readline.close();
            resolve(opt);
            
        })
       
    })
   

}

const pausa = () => {
    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`Presione ${'Enter'.green} para continuar `, (opt) => {
        
            readline.close();
            resolve();
        })
    })
    
}
module.exports = {
    mostrarMenu,
    pausa,
}