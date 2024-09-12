# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# ------------------------------------Inicio Stage 0 (Base)----------------------------------

# Usamos la imagen base oficial de Python 3.10-slim, una versión optimizada y ligera de Python.
# Esta imagen incluye Python y herramientas asociadas preinstaladas, reduciendo el tamaño del contenedor y optimizando el rendimiento.
FROM python:3.10-slim AS base

# Actualizamos la lista de paquetes disponibles en el sistema operativo del contenedor.
# Esto garantiza que obtengamos las últimas versiones de los paquetes y parches de seguridad.
RUN apt update \
    # Instalamos las siguientes dependencias esenciales:
    # - default-libmysqlclient-dev: Proporciona las bibliotecas y ficheros de encabezado necesarios para compilar aplicaciones que interactúan con MySQL.
    # También instalamos Pipenv, una herramienta para gestionar entornos virtuales y dependencias en proyectos Python.
    && apt install -y \
    default-libmysqlclient-dev \
    && pip install pipenv

# Establecemos el directorio de trabajo en `/App` para organizar el código y ficheros de la aplicación.
# Todos los comandos que se ejecuten a partir de este punto se realizarán dentro de este directorio.
WORKDIR /App

# ------------------------------------Final Stage 0 (Base)-----------------------------------

# ------------------------------------Inicio Stage 1 (Builder)--------------------------------

# Usamos la imagen base definida en el Stage 0 como la base para esta etapa de construcción.
FROM base AS builder

# Configuramos Pipenv para que el entorno virtual se cree dentro del directorio del proyecto.
# Esto asegura que el entorno virtual esté contenido dentro del directorio `/App`, facilitando su gestión y evitando conflictos.
ENV PIPENV_VENV_IN_PROJECT=1

# Copiamos los ficheros `Pipfile` y `Pipfile.lock` al directorio de trabajo del contenedor.
# Estos ficheros definen las dependencias del proyecto y permiten a Pipenv instalar las versiones exactas necesarias.
COPY ./Pipfile* ./

# Instalamos las herramientas de compilación necesarias y luego usamos Pipenv para instalar las dependencias especificadas en el `Pipfile`.
# Esto configura el entorno virtual con todas las bibliotecas necesarias para la aplicación.
RUN apt install -y build-essential && pipenv install

# ------------------------------------Final Stage 1 (Builder)--------------------------------


# ------------------------------------Inicio Stage 2 (Runtime)----------------------------------

# Usamos nuevamente la imagen base del Stage 0 para el entorno de ejecución.
# Esto garantiza que el contenedor final tenga la configuración y dependencias necesarias para ejecutar la aplicación.
FROM base AS runtime

# Definimos la variable de entorno `FLASK_APP` que indica a Flask el fichero principal de la aplicación.
# Esta variable es necesaria para que Flask pueda localizar y ejecutar la aplicación cuando el contenedor se inicie.
ENV FLASK_APP=./todos.app

# Copiamos el entorno virtual creado en el Stage 1 al contenedor de runtime.
# Esto evita la reinstalación de dependencias y reduce el tamaño del contenedor final.
COPY --from=builder /App/.venv ./.venv

# Copiamos el código fuente de la aplicación y otros ficheros necesarios para ejecutar el proyecto.
# Esto incluye el código de Flask y cualquier recurso adicional requerido por la aplicación.
COPY ./ ./

# Exponemos el puerto 5000, que es el puerto por defecto en el que Flask ejecuta la aplicación.
# Esto permite que la aplicación sea accesible desde el exterior del contenedor.
EXPOSE 5000

# Ejecutamos el servidor Flask usando Pipenv para asegurarnos de que el entorno virtual esté activado.
# La opción `--host 0.0.0.0` permite que la aplicación sea accesible desde cualquier IP, no solo desde localhost.
CMD pipenv run flask run --host 0.0.0.0

# ------------------------------------Final Stage 2 (Runtime)--------------------------------
