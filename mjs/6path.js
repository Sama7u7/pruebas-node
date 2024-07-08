const path = require('node:path')

//Barra separadora de directorios según el sistema operativo
console.log(path.sep)

//Unir rutas con path
const filePath = path.join('.','content','subfolder','test.txt')
console.log(filePath)

const base = path.basename('/tmp/contras/contras.txt')
console.log(base)

const filename = path.basename('/tmp/contras/contras.txt','.txt')
console.log(filename)

const extension = path.extname('/tmp/contras/contras.txt')
console.log(extension)