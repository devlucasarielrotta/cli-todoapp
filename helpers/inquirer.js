const inquirer = require('inquirer')
const {colors}       = require('../config/colors.js');

const preguntas = [
    {   
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: `1`,
                name: `${'1'.green}. Crear tarea`
            },
            {
                value: `2`,
                name: `${'2'.green}. Listar tareas`
            },
            {
                value: `3`,
                name: `${'3'.green}. Listar tareas completadas`
            },
            {
                value: `4`,
                name: `${'4'.green}. Listar tareas pendientes`
            },
            {
                value: `5`,
                name: `${'5'.green}. Completar tarea(s)`
            },
            {
                value: `6`,
                name: `${'6'.green}. Borrar tarea`
            },
            {
                value: `7`,
                name: `${'7'.green}. Borrar todas las tareas`
            },
            {
                value: `0`,
                name: `${'0'.red}. Salir`
            }
        ]
    }
]

const inquirerMenu = async () => {
    console.clear();
    console.log('====================='.green)
    console.log('Seleccione una opción'.white)
    console.log('=====================\n'.green)

    const {opcion} = await inquirer.prompt(preguntas)

    return opcion;
};

const pausa = async () => {
    const options = {
        type: 'input',
        name: 'opcion',
        message: `\nPresione ${'Enter'.green} para continuar`,
        
    }

    await inquirer.prompt(options)
}

const leerInput = async (message) => {
    const question = [{
        message,
        type: 'input',
        name: 'opcion',
        validate(value){
            if(value.length === 0){
                return 'Por favor ingrese un valor'
            }

            return true;
        }

        
    }]

    const {opcion} = await inquirer.prompt(question)
    return opcion;
}

const listadoBorrarTareas = async(tareas =[]) => {
    const choices = tareas.map((tarea,index) => {
        return {
            value: tarea.id,
            name: ((index+1).toString()+'. ').green + tarea.desc
        }
    })
    choices.unshift({
        value:'0',
        name:'0'.green + ' Salir'
    })
    const preguntas =[
        {
            type:'list',
            name:'id',
            message:'Borrar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas)

    return id;
}

const confirmar = async(message) => {
    const question = [
        {
            type:'confirm',
            name:'ok',
            message
        }
    ]

    const {ok} = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckList = async(tareas = []) => {
    const choices = tareas.map((tarea,index) => {
        return {
            value: tarea.id,
            name: ((index+1).toString()+'. ').green + tarea.desc,
            checked:(tarea.completadoEn) ? true:false
        }
    })
 
    const preguntas =[
        {
            type:'checkbox',
            name:'ids',
            message:'Selecciones',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(preguntas)

    return ids;
}



module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoBorrarTareas,
    confirmar,
    mostrarListadoCheckList
}