# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# ------------------------------------Stage 0 (Builder)------------------------------------

# Usamos la imagen oficial de Rust como base para la etapa de construcción.
FROM rust AS builder

# Establecemos el directorio de trabajo en el contenedor para la etapa de construcción.
WORKDIR /App

# Copiamos todos los ficheros del proyecto al directorio de trabajo en el contenedor.
# Esto incluye el código fuente y ficheros de configuración.
COPY ./ ./

# Construimos el proyecto Rust en modo release para optimizar el binario.
# La construcción en modo release incluye optimizaciones que mejoran el rendimiento.
RUN cargo build --release

# ------------------------------------End Stage 0 (Builder)--------------------------------

# ------------------------------------Stage 1 (Runtime)------------------------------------

# Usamos una imagen base de Debian para la etapa de runtime (ejecución).
# Esta imagen es más ligera y adecuada para ejecutar el binario.
FROM debian:bullseye

# Establecemos el directorio de trabajo en el contenedor para la etapa de runtime.
WORKDIR /App

# Copiamos el binario compilado desde la etapa de construcción al contenedor runtime.
# Lo colocamos en el directorio de trabajo para que sea fácilmente accesible.
COPY --from=builder /App/target/release/hello ./

# Copiamos la biblioteca libc.so.6 desde la etapa de construcción.
# Esto es necesario para que el binario funcione correctamente en la imagen runtime.
COPY --from=builder /lib/x86_64-linux-gnu/libc.so.6 /lib/x86_64-linux-gnu/libc.so.6

# Copiamos el enlazador dinámico ld-linux-x86-64.so.2 desde la etapa de construcción.
# Esto es necesario para la correcta ejecución del binario en la imagen runtime.
COPY --from=builder /lib64/ld-linux-x86-64.so.2 /lib64/ld-linux-x86-64.so.2

# Exponemos el puerto 3000 para que la aplicación sea accesible desde fuera del contenedor.
# Esto permite que el contenedor acepte conexiones en el puerto especificado.
EXPOSE 3000

# Definimos el comando por defecto para ejecutar el binario "hello" al iniciar el contenedor.
# Esto significa que el contenedor ejecutará este binario cuando se inicie.
CMD ./hello

# ------------------------------------End Stage 1 (Runtime)--------------------------------
