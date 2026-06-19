import http from 'node:http'
import fsp from 'node:fs/promises'
import path from 'node:path'

const app = http.createServer((peticion, respuesta) => {
    if (peticion.method === 'GET') {
        if (peticion.url === '/usuarios') {

            


            respuesta.statusCode = 200
            return respuesta.end('Estas en la ruta usuarios')
        }
    }

    respuesta.statusCode = 404
    respuesta.end('Ruta no encontrada')
})

app.listen(3000, () => {
    console.log('servidor corriendo en http://localhost:4000')
})