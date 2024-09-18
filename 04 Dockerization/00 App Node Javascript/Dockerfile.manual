# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# las imagenes ya vienen actualizadas normalmente por eso no es necesario poner `apt upgrade`
FROM ubuntu:22.04

# para ejecutar comandos en el contenedor se usa la directiva `RUN`
RUN apt update \
    && apt install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt-get install -y nodejs

# para indicar un directorio de trabajo cabe recalcar que despues de usar este comando nos encontraremos en el directorio /App
WORKDIR /App

# No es necesario poner `/App` ruta absoluta por que ya nos econtramos en ese directorio le podemos pasar la ruta relativa `./` se puede poner solo el punto `.`

COPY ./index.js ./

EXPOSE 3000

# para poner en marcha el servido http lo hacemos mediante `CMD` normalmente es bash pero en este caso ponemos `node ./index.js` recordar que ya estamos en el directorio /App
CMD node ./index.js

# Shell form
# CMD node ./index.js $HOME

# Exec form
# CMD [ "node", "./index.js", "$HOME" ]


# ENTRYPOINT [ "ls" ]
# CMD [ "-l" ]