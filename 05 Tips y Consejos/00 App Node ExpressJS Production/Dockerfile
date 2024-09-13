# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# ------------------------------------Stage 0 (Builder)--------------------------------

# Definimos argumentos para la versión de Node.js y el puerto de la aplicación
ARG VERSION=18.15.0-alpine
ARG APP_PORT=8080

# Base de la imagen que utilizaremos: Node.js versión LTS en Alpine para menor tamaño de la imagen
FROM node:${VERSION} AS builder

# apk es el gestor de paquetes de Alpine Linux. 
# El comando "add" instala paquetes, y la opción "--no-cache" evita que los ficheros de caché queden en la imagen, 
# lo que reduce el tamaño final. Aquí instalamos "tini", una herramienta que ayuda a gestionar correctamente procesos 
# en contenedores.
RUN apk add --no-cache tini

# Configuramos la variable de entorno NODE_ENV para producción, 
# lo que permite optimizar el comportamiento de Node.js en este entorno.
ENV NODE_ENV=production

# Establecemos el usuario "node" (predefinido en la imagen de Node.js) para ejecutar los siguientes comandos.
USER node

# Definimos el directorio de trabajo dentro del contenedor como "/App"
WORKDIR /App

# Copiamos los ficheros package*.json al directorio de trabajo en el contenedor,
# y ajustamos el propietario y el grupo de los ficheros para que sean "node".
COPY --chown=node:node ./package*.json ./

# Instalamos solo las dependencias de producción para optimizar el entorno y reducir el tamaño de la imagen
RUN npm ci --omit=dev

# Copiamos todo el contenido del directorio actual al directorio de trabajo "/App" del contenedor,
# manteniendo la propiedad del usuario "node".
COPY --chown=node:node ./ ./

# ------------------------------------End Stage 0 (Builder)--------------------------------

# ------------------------------------Stage 1 (Runtime)--------------------------------

# Utilizamos la imagen construida en la etapa anterior (builder) como base para la ejecución de la aplicación
FROM builder

# Especificamos el signo que el contenedor debe usar para detenerse (SIGTERM).
# Esto permite que Docker envíe una señal adecuada para detener la aplicación.
STOPSIGNAL SIGTERM

# Exponemos el puerto definido en la variable APP_PORT para permitir el acceso externo a la aplicación
EXPOSE ${APP_PORT}

# tini es un init system para manejar correctamente señales y procesos en contenedores. 
# Aquí se usa tini como punto de entrada para asegurarse de que cualquier señal enviada al contenedor 
# sea correctamente gestionada.
ENTRYPOINT [ "tini", "--" ]

# Ejecutamos el fichero principal de la aplicación (src/index.js) utilizando Node.js.
CMD [ "node", "./src/index.js" ]

# ------------------------------------End Stage 1 (Runtime)--------------------------------
