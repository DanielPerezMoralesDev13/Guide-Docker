# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# ------------------------------------Stage 0 (Builder)--------------------------------

# Usamos la imagen oficial de Rust como base para la etapa de construcción.
FROM rust:latest AS builder

# Establecemos el directorio de trabajo en el contenedor.
WORKDIR /App

# Definimos un argumento de construcción para el puerto de la aplicación.
ARG APP_PORT=3000

# Copiamos los ficheros de configuración de Cargo al contenedor.
# Esto incluye Cargo.toml y Cargo.lock necesarios para la compilación.
COPY ./Cargo* ./

# Copiamos el resto de los ficheros del proyecto al contenedor.
# Esto incluye el código fuente y otros ficheros necesarios para la construcción.
COPY ./ ./

# Construimos el proyecto Rust en modo release para optimizar el binario.
# La construcción en modo release incluye optimizaciones que mejoran el rendimiento.
RUN cargo build --release

# ------------------------------------End Stage 0 (Builder)--------------------------------

# ------------------------------------Stage 1 (Runtime)--------------------------------

# Usamos una imagen base de Debian para la etapa de runtime (ejecución).
# Esta imagen es más ligera y adecuada para ejecutar el binario.
FROM debian:bullseye AS runtime

# Copiamos el binario compilado desde la etapa de construcción al contenedor runtime.
# Lo colocamos en /usr/local/bin para que sea fácilmente accesible.
COPY --from=builder ./App/target/release/hello /usr/local/bin/hello

# Copiamos la biblioteca libc.so.6 desde la etapa de construcción.
# Esto es necesario para que el binario funcione correctamente en la imagen runtime.
COPY --from=builder /lib/x86_64-linux-gnu/libc.so.6 /lib/x86_64-linux-gnu/libc.so.6

# Copiamos el enlazador dinámico ld-linux-x86-64.so.2 desde la etapa de construcción.
# Esto es necesario para la correcta ejecución del binario en la imagen runtime.
COPY --from=builder /lib64/ld-linux-x86-64.so.2 /lib64/ld-linux-x86-64.so.2

# Especificamos el signo que el contenedor debe usar para detenerse (SIGTERM).
# Esto permite que Docker envíe una señal adecuada para detener la aplicación.
STOPSIGNAL SIGTERM

# Exponemos el puerto definido por el argumento APP_PORT para que la aplicación sea accesible.
# Esto permite que el contenedor acepte conexiones en el puerto especificado.
EXPOSE ${APP_PORT}

# Definimos el punto de entrada del contenedor como el binario "hello" construido.
# Esto significa que el contenedor ejecutará este binario cuando se inicie.
ENTRYPOINT [ "hello" ]

# ------------------------------------End Stage 1 (Runtime)--------------------------------
