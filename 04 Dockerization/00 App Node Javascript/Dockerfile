# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# las imagenes ya vienen actualizadas normalmente por eso no es necesario poner `apt upgrade`
FROM node:lts-alpine

# para indicar un directorio de trabajo cabe recalcar que despues de usar este comando nos encontraremos en el directorio /App
WORKDIR /App

# No es necesario poner `/App` ruta absoluta por que ya nos econtramos en ese directorio le podemos pasar la ruta relativa `./` se puede poner solo el punto `.`

COPY ./index.js ./

EXPOSE 3000

# para poner en marcha el servido http lo hacemos mediante `CMD` normalmente es bash pero en este caso ponemos `node ./index.js` recordar que ya estamos en el directorio /App
CMD node ./index.js