// Autor: Daniel Benjamin Perez Morales
// GitHub: https://github.com/DanielPerezMoralesDev13
// Correo electrónico: danielperezdev@proton.me

// Por defecto, la aplicación escucha en todas las interfaces (0.0.0.0)

const express = require('express')
const app = express()
const port = 8080

// Definimos una ruta GET en la raíz ("/") que responde con "Hello World!"
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.listen devuelve una instancia del servidor HTTP, que está escuchando en el puerto especificado
const server = app.listen(port, () => {
  console.log(`Aplicación de ejemplo escuchando en el puerto ${port}`)
})

// Manejo de la señal SIGTERM (generalmente enviada para detener procesos en entornos como Kubernetes)
// server.close() deja de aceptar nuevas conexiones, pero sigue procesando las conexiones existentes
// Es un cierre ordenado (graceful shutdown): los clientes nuevos no podrán conectarse, pero los que ya están conectados
// pueden seguir enviando y recibiendo datos. Una vez que todas las conexiones terminan, se emite el evento 'close'.
// El callback opcional se ejecuta cuando el servidor se cierra completamente, emitiendo 'SIGTERM' en la consola.
process.once("SIGTERM", () => {
  server.close(() => {
    console.log("SIGTERM")
  })
})

// Manejo de la señal SIGINT (por ejemplo, cuando se presiona Ctrl+C en la terminal para interrumpir el proceso)
// Al igual que con SIGTERM, se realiza un cierre ordenado donde no se aceptan nuevas conexiones, 
// pero las existentes continúan hasta que se completan. El callback se ejecuta al finalizar, emitiendo 'SIGINT'.
process.once("SIGINT", () => {
  server.close(() => {
    console.log("SIGINT")
  })
})
