# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Usa la imagen base de Ruby 3.0.2 desde Docker Hub
FROM ruby:3.0.2

# Establece el directorio de trabajo dentro del contenedor en /App
WORKDIR /App

# Copia el fichero Gemfile y, si existe, el fichero Gemfile.lock al contenedor.
# Esto permite instalar las dependencias de Ruby especificadas en el Gemfile.
COPY ./Gemfile* ./

# Instala Bundler, una herramienta para gestionar las gemas Ruby, y luego
# instala todas las gemas especificadas en el Gemfile usando Bundler.
RUN gem install bundler && bundle install

# Copia todo el contenido del directorio actual del host al contenedor.
# Esto incluye la aplicación y cualquier otro fichero necesario para la ejecución.
COPY ./ ./

# Expone el puerto 3000 del contenedor para que la aplicación web en desarrollo
# pueda ser accesible desde fuera del contenedor.
EXPOSE 3000

# Define el comando por defecto para iniciar el servidor Rails.
# El servidor escuchará en todas las interfaces de red (0.0.0.0) para permitir
# el acceso desde fuera del contenedor.
CMD rails server -b 0.0.0.0
