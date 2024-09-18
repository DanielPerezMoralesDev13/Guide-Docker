# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Utiliza la imagen base de Php 8.1
FROM php:8.1

# Establece la zona horaria a América/Managua
ENV TZ=America/Managua

# Establece el directorio de trabajo en el contenedor a /App
WORKDIR /App

# Actualiza la lista de paquetes disponibles e instala la herramienta unzip.
# La opción -y asegura que la instalación se realice sin solicitar confirmación.
RUN apt update && apt install -y unzip

# Copia el ejecutable Composer desde una imagen anterior (denominada "composer").
# Esto asume que existe una etapa de construcción previa en el Dockerfile que usa una imagen base
# con Composer instalado, como una imagen oficial de Composer.
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Copia los ficheros composer.json y composer.lock al directorio de trabajo
COPY ./composer.* ./

# Instala las dependencias del proyecto PHP utilizando Composer
RUN composer install --no-scripts

# Copia el resto de los ficheros del proyecto al directorio de trabajo
COPY ./ ./

# Expone el puerto 8000 para que el contenedor pueda aceptar conexiones externas
EXPOSE 8000

# Comando predeterminado que se ejecutará al iniciar el contenedor
# Inicia el servidor PHP integrado y lo configura para escuchar en todas las interfaces
CMD php artisan serve --host 0.0.0.0

