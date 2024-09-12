<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->

# ***Reto: Dockerizar App Rust con Axum***

1. **Crear un directorio para el proyecto:**

   ```bash
   mkdir "./09 Reto Dockerization App Rust Axum"
   cd "$!"
   ```

2. **Descomprimir los ficheros:**

```bash
unzip Reto-App-Axum.zip -d ./
```

```bash
unzip Reto-App-Axum.zip -d ./
Archive:  Reto-App-Axum.zip
   creating: ./src/
  inflating: ./src/main.rs           
   creating: ./.git/
  inflating: ./.git/index            
   creating: ./.git/hooks/
  inflating: ./.git/hooks/README.sample  
  inflating: ./.git/description      
  inflating: ./.git/config           
 extracting: ./.git/COMMIT_EDITMSG   
   creating: ./.git/objects/
   creating: ./.git/objects/2c/
 extracting: ./.git/objects/2c/0a09141c6d554f22b618be7d620e9bc276c9d4  
   creating: ./.git/objects/2a/
 extracting: ./.git/objects/2a/e9120d13a259ac7130fbb1c4b4e7e6f6f06e48  
   creating: ./.git/objects/59/
 extracting: ./.git/objects/59/8c9cda00a6b17b6c64cca30dffa1d5442c99a9  
   creating: ./.git/objects/b8/
 extracting: ./.git/objects/b8/b7542e3e7e33688f4a1854fe8bcf08378c82e4  
   creating: ./.git/objects/81/
 extracting: ./.git/objects/81/82104e06e72a2d7198650e37dad3f3c681a258  
   creating: ./.git/objects/76/
 extracting: ./.git/objects/76/b84f390e6c3a9531b23ffa9e04f37881c2dca5  
   creating: ./.git/objects/ea/
 extracting: ./.git/objects/ea/8c4bf7f35f6f77f75d92ad8ce8349f6e81ddba  
   creating: ./.git/objects/a1/
 extracting: ./.git/objects/a1/285a4d2751a1d92eda1656b1af0bfb67c3a579  
   creating: ./.git/objects/87/
 extracting: ./.git/objects/87/eae7ded61f9ea979d06e35b1b370d04e8d0775  
   creating: ./.git/objects/info/
   creating: ./.git/objects/pack/
 extracting: ./.git/HEAD             
   creating: ./.git/info/
  inflating: ./.git/info/exclude     
   creating: ./.git/logs/
  inflating: ./.git/logs/HEAD        
   creating: ./.git/logs/refs/
   creating: ./.git/logs/refs/heads/
  inflating: ./.git/logs/refs/heads/master  
   creating: ./.git/refs/
   creating: ./.git/refs/tags/
   creating: ./.git/refs/heads/
 extracting: ./.git/refs/heads/master  
  inflating: ./Cargo.lock            
 extracting: ./.gitignore            
  inflating: ./Cargo.toml            
```

---

## ***Listamos los ficheros en el directorio:***

```bash
lsd -lA
drwxr-xr-x d4nitrix13 d4nitrix13 4.0 KB Tue Sep 10 15:39:58 2024  .git
.rw-r--r-- d4nitrix13 d4nitrix13   8 B  Sun Apr  2 09:05:59 2023  .gitignore
.rw-rw-r-- d4nitrix13 d4nitrix13  17 KB Sun Apr  2 09:49:42 2023  Cargo.lock
.rw-rw-r-- d4nitrix13 d4nitrix13 242 B  Sun Apr  2 09:49:42 2023  Cargo.toml
.rw-rw-r-- d4nitrix13 d4nitrix13  20 KB Tue Sep 10 15:30:40 2024  Reto-App-Axum.zip
drwxrwxr-x d4nitrix13 d4nitrix13 4.0 KB Sun Apr  2 09:49:42 2023  src
```

---

### ***Creamos el contenedor de prueba utilizando diferentes formas de montar el volumen:***

- ***Primera forma:***

     ```bash
     docker container run -itw /App -p 3000:3000 --mount type=bind,source="$(pwd)",target=/App --name rust-practicas ubuntu:22.04
     ```

- ***Segunda forma:***

     ```bash
     docker container run -itw /App -p 3000:3000 --mount type=bind,source="$(pwd)",destination=/App --name rust-practicas ubuntu:22.04
     ```

- ***Tercera forma:***

     ```bash
     docker container run -itw /App -p 3000:3000 --mount type=bind,source="$(pwd)",dst=/App --name rust-practicas ubuntu:22.04
     ```

- ***Cuarta forma:***

     ```bash
     docker container run -itw /App -p 3000:3000 --mount type=bind,src="$(pwd)",dst=/App --name rust-practicas ubuntu:22.04
     ```

- ***Quinta forma:***

     ```bash
     docker container run -itw /App -p 3000:3000 --volume "$(pwd)":/App --name rust-practicas ubuntu:22.04
     ```

- ***Sexta forma:***

     ```bash
     docker container run -itw /App -p 3000:3000 -v "$(pwd)":/App --name rust-practicas ubuntu:22.04
     ```

### ***Instalamos Rust siguiendo la guía oficial:***

- *[Instalación de Rust](https://www.rust-lang.org/es/tools/install "https://www.rust-lang.org/es/tools/install")*

**Ejecutamos el siguiente comando en el contenedor:**

```bash
apt update && apt install -y curl && curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
```

---

### ***apt update***

- **apt:** *Es el administrador de paquetes en distribuciones basadas en Debian (como Ubuntu).*
- **update:** *Actualiza la lista de paquetes disponibles desde los repositorios. Este comando asegura que tienes la información más reciente sobre los paquetes disponibles para instalar o actualizar.*

---

### ***&&***

- **&&:** *Se utiliza para encadenar comandos. Si el primer comando se ejecuta correctamente, el siguiente se ejecuta. Si falla el primer comando, el siguiente no se ejecutará.*

---

### ***apt install -y curl***

- **install:** *Instala uno o más paquetes en el sistema.*
- **-y:** *Acepta automáticamente cualquier confirmación de instalación. Esto permite que el proceso sea no interactivo.*
- **curl:** *Es una herramienta de línea de comandos para transferir datos desde o hacia un servidor usando varios protocolos, en este caso para descargar el instalador de Rust.*

---

### ***curl --proto '=https' --tlsv1.2 -sSf `https://sh.rustup.rs`***

- **curl:** *Como se mencionó antes, es una herramienta para transferir datos.*
- **--proto '=https':** *Especifica el protocolo a usar. Aquí se indica que se debe utilizar el protocolo HTTPS exclusivamente.*
- **--tlsv1.2:** *Fuerza a curl a usar la versión 1.2 del protocolo de seguridad TLS (Transport Layer Security).*
- **-s:** *Modo "silencioso" (`silent`), que suprime el progreso de la descarga.*
- **-S:** *Muestra errores si ocurren, a pesar de estar en modo silencioso.*
- **-f:** *Indica que curl debe fallar si el servidor devuelve un código de estado HTTP 400 o superior.*
- **`https://sh.rustup.rs`:** *La URL desde donde se descarga el script de instalación de Rust.*

---

### ***| sh -s -- -y***

- **|:** *El operador pipe redirige la salida del comando anterior (la descarga del script) como entrada para el siguiente comando (`sh`).*
- **sh:** *Interpreta y ejecuta el script descargado.*
- **-s:** *Esta flag en `sh` pasa el script descargado a `sh` para que lo ejecute desde la entrada estándar.*
- **--:** *Marca el final de las opciones para `sh`, lo que significa que lo que sigue son argumentos que se pasan al script.*
- **-y:** *Opción pasada al script de instalación de Rust para aceptar automáticamente la instalación sin pedir confirmación.*

```bash
apt update && apt install -y curl && curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease
Hit:2 http://security.ubuntu.com/ubuntu jammy-security InRelease
Hit:3 http://archive.ubuntu.com/ubuntu jammy-updates InRelease
Hit:4 http://archive.ubuntu.com/ubuntu jammy-backports InRelease
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
9 packages can be upgraded. Run 'apt list --upgradable' to see them.
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
curl is already the newest version (7.81.0-1ubuntu1.17).
0 upgraded, 0 newly installed, 0 to remove and 9 not upgraded.
info: downloading installer
info: profile set to 'default'
info: default host triple is x86_64-unknown-linux-gnu
info: syncing channel updates for 'stable-x86_64-unknown-linux-gnu'
info: latest update on 2024-09-05, rust version 1.81.0 (eeb90cda1 2024-09-04)
info: downloading component 'cargo'
info: downloading component 'clippy'
info: downloading component 'rust-docs'
 15.9 MiB /  15.9 MiB (100 %)   9.6 MiB/s in  2s ETA:  0s
info: downloading component 'rust-std'
 26.8 MiB /  26.8 MiB (100 %)   6.2 MiB/s in  4s ETA:  0s
info: downloading component 'rustc'
 66.9 MiB /  66.9 MiB (100 %)   6.1 MiB/s in 10s ETA:  0s
info: downloading component 'rustfmt'
info: installing component 'cargo'
  8.3 MiB /   8.3 MiB (100 %)   8.3 MiB/s in  1s ETA:  0s
info: installing component 'clippy'
info: installing component 'rust-docs'
 15.9 MiB /  15.9 MiB (100 %)   4.3 MiB/s in  3s ETA:  0s
info: installing component 'rust-std'
 26.8 MiB /  26.8 MiB (100 %)   7.5 MiB/s in  3s ETA:  0s
info: installing component 'rustc'
 66.9 MiB /  66.9 MiB (100 %)   8.0 MiB/s in  8s ETA:  0s
info: installing component 'rustfmt'
info: default toolchain set to 'stable-x86_64-unknown-linux-gnu'

  stable-x86_64-unknown-linux-gnu installed - rustc 1.81.0 (eeb90cda1 2024-09-04)


Rust is installed now. Great!

To get started you may need to restart your current shell.
This would reload your PATH environment variable to include
Cargo's bin directory ($HOME/.cargo/bin).

To configure your current shell, you need to source
the corresponding env file under $HOME/.cargo.

This is usually done by running one of the following (note the leading DOT):
. "$HOME/.cargo/env"            # For sh/bash/zsh/ash/dash/pdksh
source "$HOME/.cargo/env.fish"  # For fish
```

---

### ***Modificamos el `PATH` para incluir el binario de `cargo`***

  ```bash
  echo "PATH='${HOME}/.cargo/bin:${PATH}'" >> ~/.bashrc
  source !$
  ```

- **echo "PATH='${HOME}/.cargo/bin:${PATH}'" >> ~/.bashrc:** *Este comando agrega la ruta de los binarios de **cargo** (ubicados en `~/.cargo/bin`) al **PATH** global del usuario, asegurando que los comandos de **cargo** puedan ser ejecutados desde cualquier directorio.*
- **source ~/.bashrc:** *Recarga la configuración del fichero **.bashrc** para aplicar inmediatamente los cambios en el **PATH** sin necesidad de cerrar y abrir la terminal.*

---

### ***Construimos el paquete***

```bash
cargo build
```

- *Durante la construcción, se puede recibir el siguiente error relacionado con el **linker**:*

```bash
error: linker `cc` not found
  |
  = note: No such file or directory (os error 2)

error: could not compile `quote` (build script) due to 1 previous error
warning: build failed, waiting for other jobs to finish...
error: could not compile `libc` (build script) due to 1 previous error
error: could not compile `proc-macro2` (build script) due to 1 previous error
```

```bash
cargo build
    Updating crates.io index
  Downloaded cfg-if v1.0.0
  Downloaded bitflags v1.3.2
  Downloaded try-lock v0.2.4
  Downloaded sync_wrapper v0.1.2
  Downloaded form_urlencoded v1.1.0
  Downloaded want v0.3.0
  Downloaded axum-core v0.3.3
  Downloaded tokio-macros v2.0.0
  Downloaded itoa v1.0.6
  Downloaded http-body v0.4.5
  Downloaded scopeguard v1.1.0
  Downloaded httpdate v1.0.2
  Downloaded tower-layer v0.3.2
  Downloaded tower-service v0.3.2
  Downloaded pin-utils v0.1.0
  Downloaded percent-encoding v2.2.0
  Downloaded serde_urlencoded v0.7.1
  Downloaded futures-task v0.3.28
  Downloaded fnv v1.0.7
  Downloaded autocfg v1.1.0
  Downloaded mime v0.3.17
  Downloaded futures-core v0.3.28
  Downloaded num_cpus v1.15.0
  Downloaded async-trait v0.1.68
  Downloaded serde_path_to_error v0.1.11
  Downloaded matchit v0.7.0
  Downloaded pin-project-lite v0.2.9
  Downloaded rustversion v1.0.12
  Downloaded quote v1.0.26
  Downloaded signal-hook-registry v1.4.1
  Downloaded lock_api v0.4.9
  Downloaded smallvec v1.10.0
  Downloaded httparse v1.8.0
  Downloaded pin-project-internal v1.0.12
  Downloaded once_cell v1.17.1
  Downloaded parking_lot_core v0.9.7
  Downloaded futures-channel v0.3.28
  Downloaded log v0.4.17
  Downloaded parking_lot v0.12.1
  Downloaded proc-macro2 v1.0.55
  Downloaded bytes v1.4.0
  Downloaded unicode-ident v1.0.8
  Downloaded ryu v1.0.13
  Downloaded socket2 v0.4.9
  Downloaded tracing-core v0.1.30
  Downloaded pin-project v1.0.12
  Downloaded memchr v2.5.0
  Downloaded tracing v0.1.37
  Downloaded serde v1.0.159
  Downloaded mio v0.8.6
  Downloaded tower v0.4.13
  Downloaded http v0.2.9
  Downloaded axum v0.6.12
  Downloaded hyper v0.14.25
  Downloaded serde_json v1.0.95
  Downloaded futures-util v0.3.28
  Downloaded syn v2.0.13
  Downloaded syn v1.0.109
  Downloaded tokio v1.27.0
  Downloaded libc v0.2.140
  Downloaded 60 crates (4.0 MB) in 5.05s
   Compiling proc-macro2 v1.0.55
   Compiling quote v1.0.26
   Compiling unicode-ident v1.0.8
   Compiling libc v0.2.140
   Compiling cfg-if v1.0.0
   Compiling autocfg v1.1.0
error: linker `cc` not found
  |
  = note: No such file or directory (os error 2)

error: could not compile `quote` (build script) due to 1 previous error
warning: build failed, waiting for other jobs to finish...
error: could not compile `libc` (build script) due to 1 previous error
error: could not compile `proc-macro2` (build script) due to 1 previous error
```

---

### ***Solución: Instalar el paquete necesario para compilar***

- *Para solucionar el problema del **linker**, necesitamos instalar el paquete ***build-essential*** que contiene herramientas como el compilador `gcc` y otras utilidades necesarias para compilar proyectos en Rust:*

```bash
apt install -y build-essential
```

- **build-essential:** *Es un paquete en distribuciones basadas en Debian que incluye un conjunto de herramientas básicas necesarias para compilar programas desde el código fuente, como `gcc`, `g++`, `make`, entre otros.*

---

### ***Volvemos a intentar construir el paquete***

```bash
cargo build
```

- *Después de instalar el paquete **build-essential**, la compilación del proyecto debería completarse sin problemas.*

```bash
cargo build
   Compiling proc-macro2 v1.0.55
   Compiling quote v1.0.26
   Compiling libc v0.2.140
   Compiling log v0.4.17
   Compiling futures-core v0.3.28
   Compiling pin-project-lite v0.2.9
   Compiling rustversion v1.0.12
   Compiling lock_api v0.4.9
   Compiling bytes v1.4.0
   Compiling syn v2.0.13
   Compiling futures-task v0.3.28
   Compiling itoa v1.0.6
   Compiling parking_lot_core v0.9.7
   Compiling serde v1.0.159
   Compiling scopeguard v1.1.0
   Compiling syn v1.0.109
   Compiling futures-util v0.3.28
   Compiling smallvec v1.10.0
   Compiling tokio v1.27.0
   Compiling once_cell v1.17.1
   Compiling pin-utils v0.1.0
   Compiling fnv v1.0.7
   Compiling http v0.2.9
   Compiling tracing-core v0.1.30
   Compiling parking_lot v0.12.1
   Compiling socket2 v0.4.9
   Compiling mio v0.8.6
   Compiling signal-hook-registry v1.4.1
   Compiling num_cpus v1.15.0
   Compiling tokio-macros v2.0.0
   Compiling httparse v1.8.0
   Compiling async-trait v0.1.68
   Compiling tower-service v0.3.2
   Compiling futures-channel v0.3.28
   Compiling http-body v0.4.5
   Compiling tracing v0.1.37
   Compiling axum-core v0.3.3
   Compiling memchr v2.5.0
   Compiling try-lock v0.2.4
   Compiling tower-layer v0.3.2
   Compiling ryu v1.0.13
   Compiling serde_json v1.0.95
   Compiling percent-encoding v2.2.0
   Compiling form_urlencoded v1.1.0
   Compiling want v0.3.0
   Compiling axum v0.6.12
   Compiling mime v0.3.17
   Compiling httpdate v1.0.2
   Compiling serde_urlencoded v0.7.1
   Compiling pin-project-internal v1.0.12
   Compiling pin-project v1.0.12
   Compiling serde_path_to_error v0.1.11
   Compiling sync_wrapper v0.1.2
   Compiling bitflags v1.3.2
   Compiling matchit v0.7.0
   Compiling tower v0.4.13
   Compiling hyper v0.14.25
   Compiling hello v0.1.0 (/App)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 39.89s
```

---

### ***Compilamos y ejecutamos el proyecto***

**Una vez que hemos solucionado los problemas de compilación, podemos proceder a compilar y ejecutar la aplicación:**

```bash
cargo run
```

**Al ejecutarlo, deberías ver un mensaje similar al siguiente:**

```bash
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.09s
     Running `target/debug/hello`
Listening on 0.0.0.0:3000
```

- **Esto indica que el servidor está ejecutándose y escuchando en el puerto `3000` en todas las interfaces de red (`0.0.0.0`).**

---

### ***Realizamos una petición de prueba***

**Para verificar que el servidor Axum está funcionando correctamente, realizamos una petición `curl` a la dirección IP del contenedor (en este caso, `172.17.0.2`), especificando el puerto `3000`:**

```bash
curl 172.17.0.2:3000
```

**El resultado esperado sería algo como esto:**

```html
<h1>Hello World From Axum!</h1>
```

**Esto confirma que el servidor Axum está respondiendo correctamente a las peticiones HTTP.**

---

### ***Foros de referencia***

- **Para más información o si encuentras problemas adicionales, puedes consultar los siguientes foros de referencia:**

- *[Foro sobre problemas al instalar la cadena de herramientas Rust en Docker:](https://stackoverflow.com/questions/49676490/when-installing-rust-toolchain-in-docker-bash-source-command-doesnt-work "https://stackoverflow.com/questions/49676490/when-installing-rust-toolchain-in-docker-bash-source-command-doesnt-work")*

- *[Foro sobre cómo solucionar el error de **linker `cc` not found** en Rust:](https://stackoverflow.com/questions/52445961/how-do-i-fix-the-rust-error-linker-cc-not-found-for-debian-on-windows-10 "https://stackoverflow.com/questions/52445961/how-do-i-fix-the-rust-error-linker-cc-not-found-for-debian-on-windows-10")*

---

### ***Pasos para Configuración del Dockerfile***

**1. Eliminación del directorio `.git`:**

```bash
rm -rf ./.git
```

**2. Creación de ficheros necesarios:**

```bash
touch Dockerfile .dockerignore
```

**3. Contenido del `Dockerfile`:**

```Dockerfile
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
```

**4. Contenido del `.dockerignore`:**

```bash
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

target/
Dockerfile*
.git*
*.zip
```

**5. Construcción de la imagen Docker:**

```bash
docker build -t d4nitrix13/axum:latest ./
```

**6. Problema al ejecutar el contenedor:**

> [!CAUTION]
> *Si al ejecutar el contenedor se produce un error relacionado con versiones de `GLIBC`, la salida del error puede ser:*

```bash
hello: /lib/x86_64-linux-gnu/libc.so.6: version `GLIBC_2.33' not found (required by hello)
hello: /lib/x86_64-linux-gnu/libc.so.6: version `GLIBC_2.32' not found (required by hello)
hello: /lib/x86_64-linux-gnu/libc.so.6: version `GLIBC_2.34' not found (required by hello)
```

**7. Solución al problema:**

> [!TIP]
> *Agregamos la siguiente línea al `Dockerfile` para copiar la biblioteca `libc.so.6` desde la etapa de construcción a la etapa de runtime:*

```Dockerfile
COPY --from=builder /lib/x86_64-linux-gnu/libc.so.6 /lib/x86_64-linux-gnu/libc.so.6
```

**8. `Dockerfile` con la solución aplicada:**

```Dockerfile
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
```

---

### ***Problema al Construir y Ejecutar el Contenedor***

**1. Intento de construcción y ejecución:**

> [!CAUTION]
> *Si volvemos a construir y correr el contenedor con el siguiente comando, puede aparecer un error relacionado con `GLIBC`:*

```bash
docker build -t d4nitrix13/axum:latest ./
```

**2. Error al ejecutar el contenedor:**

**El error podría ser:**

```bash
docker run -it -p 3000:3000 --rm d4nitrix13/axum:latest
hello: /lib64/ld-linux-x86-64.so.2: version `GLIBC_2.35' not found (required by /lib/x86_64-linux-gnu/libc.so.6)
```

**3. Solución al problema de `GLIBC`:**

> [!NOTE]
> *Para solucionar el problema, se debe agregar la línea siguiente en el `Dockerfile` para copiar el enlazador dinámico `ld-linux-x86-64.so.2` desde la etapa de construcción a la etapa de runtime:*

```Dockerfile
COPY --from=builder /lib64/ld-linux-x86-64.so.2 /lib64/ld-linux-x86-64.so.2
```

**4. Dockerfile completo con la solución:**

```Dockerfile
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
```

**5. Reconstrucción y ejecución del contenedor:**

- **Una vez aplicada la solución, reconstruye y corre el contenedor nuevamente:**

```bash
docker build -td4nitrix13/axum:latest ./
```

```bash
docker run -itp3000:3000 --rm d4nitrix13/axum:latest
```

**6. Verificación de funcionamiento:**

- **El contenedor debería ejecutarse correctamente, y deberías ver el siguiente mensaje indicando que la aplicación está escuchando en el puerto 3000:**

```bash
Listening on 0.0.0.0:3000
```

**7. Realización de una solicitud HTTP:**

- *Puedes verificar que la aplicación está funcionando correctamente haciendo una solicitud `curl` al contenedor:*

```bash
curl 172.17.0.2:3000
```

**La respuesta esperada es:**

```html
<h1>Hello World From Axum!</h1>
```
