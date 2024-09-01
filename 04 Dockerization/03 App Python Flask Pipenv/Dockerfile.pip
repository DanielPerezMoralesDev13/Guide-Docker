# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Utilizamos una imagen base de Python 3.10
# Esta imagen incluye Python 3.10 y pip preinstalados, eliminando la necesidad de instalar Python por separado
# Para la versión más reciente, puedes descomentar la línea correspondiente
# FROM python:3

# Imagen base específica para Python 3.10
# Esto asegura la compatibilidad con versiones específicas de Python para evitar problemas de compatibilidad
FROM python:3.10

# Imagen base del sistema operativo Ubuntu 22.04
# La imagen base original de Ubuntu puede ser utilizada en lugar de la imagen base de Python si se requiere más control
# La línea está comentada porque estamos utilizando la imagen de Python base que ya incluye Ubuntu
# FROM ubuntu:22.04

# Actualizamos la lista de paquetes y luego instalamos Python 3 y el módulo python3-venv
# Esto nos permite crear entornos virtuales de Python
# RUN apt update && apt install -y python3 python3-venv

# Creamos el directorio de trabajo en el contenedor y lo establecemos como el directorio actual
# Todos los comandos siguientes se ejecutarán desde este directorio
WORKDIR /App

# Creamos un entorno virtual de Python dentro del directorio de trabajo
# El entorno virtual aísla las dependencias de la aplicación, evitando conflictos con otras instalaciones de Python
RUN python3 -m venv ./.venv

# Definimos la variable de entorno VIRTUAL_ENV que apunta al directorio del entorno virtual
# Esto facilita la configuración del entorno para usar las dependencias instaladas en el entorno virtual
ENV VIRTUAL_ENV=/App/.venv/

# Actualizamos la variable de entorno PATH para que el contenedor utilice los binarios del entorno virtual
# Esto asegura que los ejecutables del entorno virtual (como pip y flask) sean utilizados en lugar de los del sistema
ENV PATH="${VIRTUAL_ENV}/bin:$PATH"

# Definimos la variable de entorno FLASK_APP para indicar la ubicación del fichero de aplicación Flask
# Esto permite a Flask identificar y ejecutar la aplicación especificada
ENV FLASK_APP=./src.app

# Copiamos el fichero requirements.txt desde el host al contenedor
# El fichero requirements.txt contiene la lista de paquetes de Python necesarios para la aplicación
COPY ./requirements.txt ./

# Instalamos las dependencias listadas en requirements.txt usando pip dentro del entorno virtual
# Esto asegura que todas las dependencias necesarias estén disponibles para la aplicación
RUN pip install -r ./requirements.txt

# Exponemos el puerto 5000 para que la aplicación Flask sea accesible desde fuera del contenedor
# Esto permite que el contenedor reciba solicitudes HTTP en el puerto 5000
EXPOSE 5000

# Copiamos todos los ficheros desde el host al contenedor
# Esto incluye el código fuente de la aplicación y cualquier otro fichero necesario para su funcionamiento
COPY ./ ./

# Ejecutamos el servidor Flask usando el entorno virtual
# La opción --host 0.0.0.0 permite que la aplicación sea accesible desde cualquier dirección IP
CMD flask run --host 0.0.0.0
