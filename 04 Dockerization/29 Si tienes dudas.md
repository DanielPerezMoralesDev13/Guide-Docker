<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->

# ***Si tienes dudas***

---

## ***Descomprimimos el fichero***

```bash
unzip Reto-App-Axum.zip -d "./10 Reto Dockerization App Rust Axum Solucion"
cd !$
rm -rf ./.git
```

---

### ***Compilación en un contenedor Docker***

- **El problema con `cargo` es que no se pueden cachear las dependencias; se deben descargar y compilar todas a la vez. Para evitar problemas de caché, es necesario seguir el siguiente proceso.**

1. **Ejecutamos el contenedor Rust:**

   ```bash
   docker run -it -w /App -v "$(pwd)":/App -p 3000:3000 --name practicas-rust rust bash
   ```

   - **`-it`:** *Ejecuta el contenedor en modo interactivo.*
   - **`-w /App`:** *Establece el directorio de trabajo en el contenedor.*
   - **`-v "$(pwd)":/App`:** *Monta el directorio actual (`$(pwd)`) en `/App` en el contenedor.*
   - **`-p 3000:3000`:** *Mapea el puerto 3000 del contenedor al puerto 3000 del host.*
   - **`--name practicas-rust`:** *Asigna un nombre al contenedor.*
   - **`rust`:** *Usa la imagen de Rust.*
   - **`bash`:** *Inicia una sesión de Bash dentro del contenedor.*

2. **Dentro del contenedor, compila las dependencias y el código fuente:**

   ```bash
   cargo build
   ```

   **O para una versión optimizada:**

   ```bash
   cargo build --release
   ```

   - **`cargo build`:** *Compila el binario en modo debug, disponible en `./target/debug/hello`.*
   - **`cargo build --release`:** *Compila el binario en modo release, disponible en `./target/release/hello`.*

---

### ***Creamos el Dockerfile***

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# ------------------------------------Stage 0 (Builder)------------------------------------

# Usamos la imagen oficial de Rust como base para la etapa de construcción.
FROM rust:latest AS builder

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
```

---

### ***`.dockerignore`***

```bash
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Excluimos la carpeta target que contiene los ficheros de construcción.
target/

# Excluimos el Dockerfile y ficheros relacionados.
Dockerfile*

# Excluimos la carpeta .git y ficheros de configuración de git.
.git*

# Excluimos ficheros comprimidos para evitar incluirlos en la imagen.
*.zip
```

---

### ***Construimos y ejecutamos el contenedor***

1. **Construimos la imagen Docker:**

   ```bash
   docker build -td4nitrix13/app-10 ./
   ```

    ```bash
    docker build -td4nitrix13/app-10 ./
    [+] Building 3.6s (15/15) FINISHED                                                                                     docker:default
     => [internal] load build definition from Dockerfile                                                                             0.0s
     => => transferring dockerfile: 2.43kB                                                                                           0.0s
     => [internal] load metadata for docker.io/library/debian:bullseye                                                               3.2s
     => [internal] load metadata for docker.io/library/rust:latest                                                                   0.0s
     => [internal] load .dockerignore                                                                                                0.0s
     => => transferring context: 214B                                                                                                0.0s
     => [builder 1/4] FROM docker.io/library/rust:latest                                                                             0.0s
     => [stage-1 1/5] FROM docker.io/library/debian:bullseye@sha256:8ccc486c29a3ad02ad5af7f1156e2152dff3ba5634eec9be375269ef123457d  0.0s
     => [internal] load build context                                                                                                0.0s
     => => transferring context: 150B                                                                                                0.0s
     => CACHED [stage-1 2/5] WORKDIR /App                                                                                            0.0s
     => CACHED [stage-1 3/5] COPY --from=builder /App/target/release/hello ./                                                        0.0s
     => CACHED [builder 2/4] WORKDIR /App                                                                                            0.0s
     => CACHED [builder 3/4] COPY ./ ./                                                                                              0.0s
     => CACHED [builder 4/4] RUN cargo build --release                                                                               0.0s
     => [stage-1 4/5] COPY --from=builder /lib/x86_64-linux-gnu/libc.so.6 /lib/x86_64-linux-gnu/libc.so.6                            0.0s
     => [stage-1 5/5] COPY --from=builder /lib64/ld-linux-x86-64.so.2 /lib64/ld-linux-x86-64.so.2                                    0.0s
     => exporting to image                                                                                                           0.1s
     => => exporting layers                                                                                                          0.0s
     => => writing image sha256:0833757788e2531c78898a48777134ec593a1f693beac4933f86353a4c93e4c2                                     0.0s
     => => naming to docker.io/d4nitrix13/app-10                                                                                     0.0s
    
     1 warning found (use docker --debug to expand):
     - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 50)
    ```

   - **`-t d4nitrix13/app-10`:** *Etiqueta la imagen como `d4nitrix13/app-10`.*

2. **Ejecutamos el contenedor:**

   ```bash
   docker run -itp3000:3000 --rm d4nitrix13/app-10
   ```

   - **`-it`:** *Ejecuta el contenedor en modo interactivo.*
   - **`-p 3000:3000`:** *Mapea el puerto 3000 del contenedor al puerto 3000 del host.*
   - **`--rm`:** *Elimina el contenedor después de detenerlo.*

---

### ***Verificación de la aplicación***

**Realiza una solicitud `curl` para verificar que la aplicación esté funcionando correctamente:**

```bash
curl 172.17.0.2:3000
```

**Deberías recibir una respuesta similar a:**

```html
<h1>Hello World From Axum!</h1>
```
