const fs = require('fs');
const directoryPath = `./data`;
const fileName      = '/tareas.json'


const leerArchivo = () => {

    if(fs.existsSync(directoryPath+fileName)){
        const archivo = fs.readFileSync(directoryPath+fileName);

        return JSON.parse(archivo);
    }
}

const crearArchivo = (data) => {
    if (!fs.existsSync(directoryPath)) {
        
        fs.mkdirSync(directoryPath);
    }
  
    if(data.length === 0){
        
        return;
    }else {
        fs.writeFileSync('./data/tareas.json',JSON.stringify(data),{
            encoding: 'utf-8'
        })
    }
    
   
}

module.exports = {crearArchivo,leerArchivo};