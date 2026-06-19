import http from 'node:http';
import fsp from 'node:fs/promises';
import path from 'node:path';


const ARCHIVO_USUARIOS = path.join(process.cwd(), 'usuarios.json');


async function obtenerYGuardarUsuarios() {
    const respuestaApi = await fetch('https://api.escuelajs.co/api/v1/users');
    
    if (!respuestaApi.ok) {
        throw new Error('No se pudo obtener respuesta de la API externa');
    }
    
    const datos = await respuestaApi.json();
    await fsp.writeFile(ARCHIVO_USUARIOS, JSON.stringify(datos, null, 2), 'utf-8');

    const contenidoArchivo = await fsp.readFile(ARCHIVO_USUARIOS, 'utf-8');
    return contenidoArchivo;
}

const app = http.createServer(async (peticion, respuesta) => {
    
 
    respuesta.setHeader('Content-Type', 'application/json; charset=utf-8');

    try {
        if (peticion.method === 'GET' && peticion.url === '/usuarios') {
            const datos = await obtenerYGuardarUsuarios();
            
            respuesta.statusCode = 200;
            return respuesta.end(datos);
        }
        respuesta.statusCode = 404;
        return respuesta.end(JSON.stringify({ mensaje: 'Recurso no encontrado' }));

    } catch (error) {
        console.error('Error:', error);
        respuesta.statusCode = 500;
        return respuesta.end(JSON.stringify({ mensaje: 'Error interno del servidor' }));
    }
});

const PUERTO = 4000;
app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});