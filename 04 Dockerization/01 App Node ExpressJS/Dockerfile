# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Imagen que usaremos
FROM node:lts

# Creamos el directorio /App
WORKDIR /App

# Copiamos todo los ficheros package*.json a el directorio /App del contenedor
COPY ./package*.json ./

# Instalamos las dependencias para que funcione nuestra aplicacion web
RUN npm install

# Copiamos todo el directorio a el directorio /App del contenedor
COPY ./ ./


# Escucha por el puerto 3000
EXPOSE 3000

# Shell Form
CMD npm start