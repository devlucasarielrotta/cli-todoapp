const { uuidv4: v4 } = require('../helpers/uuid.js')

class Tarea {
    id = '';
    desc = '';
    completadoEn = null;

    constructor(desc){
        this.desc = desc?.toUpperCase();
        this.id = v4();
        this.completadoEn = null;
    }

}

module.exports = Tarea;