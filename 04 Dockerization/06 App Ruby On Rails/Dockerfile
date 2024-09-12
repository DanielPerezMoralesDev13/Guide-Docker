# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Utiliza la imagen base de Ruby 3.0.2
FROM ruby:3.0.2

# Establece el directorio de trabajo donde se ejecutarán las siguientes instrucciones
WORKDIR /App

# Copia los ficheros de Gemfile al contenedor.
# Esto asegura que solo se vuelvan a instalar las dependencias si el Gemfile cambia.
COPY ./Gemfile* ./

# Configura Bundler para instalar las dependencias localmente en el directorio 'vendor/bundle'
# y procede con la instalación de las dependencias del proyecto.
RUN bundle config set --local path ./vendor/bundle && bundle install

# Copia el resto de los ficheros de la aplicación al contenedor.
COPY ./ ./

# Expone el puerto 3000, que es donde la aplicación Ruby on Rails escuchará.
EXPOSE 3000

# Comando por defecto para iniciar el servidor de Rails.
# Se enlaza a 0.0.0.0 para que sea accesible desde fuera del contenedor.
CMD ./bin/rails server --binding 0.0.0.0
