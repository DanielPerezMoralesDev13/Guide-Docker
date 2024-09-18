<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->
# ***Descripción de una imagen con Dockerfile***

- **Vamos a crear un fichero llamado `Dockerfile` para definir la configuración de nuestra imagen Docker.**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales -->
# GitHub: https://github.com/DanielPerezMoralesDev13 -->
# Correo electrónico: danielperezdev@proton.me -->

# Las imágenes oficiales suelen venir actualizadas, por lo que no es necesario usar `apt upgrade`
FROM ubuntu:22.04

# Para ejecutar comandos en el contenedor se usa la directiva `RUN`
RUN apt update && apt install curl

RUN curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt-get install -y nodejs

# Para indicar un directorio de trabajo, utilizamos la directiva `WORKDIR`.
# Cabe recalcar que después de usar este comando nos encontraremos en el directorio /App
WORKDIR /App

# No es necesario especificar la ruta absoluta `/App` ya que estamos en ese directorio. 
# Podemos usar una ruta relativa como `./` o incluso solo el punto `.`
COPY ./index.js ./

# Para poner en marcha el servidor HTTP utilizamos `CMD`. Normalmente es un comando de shell,
# pero en este caso especificamos `node ./index.js`. Recordar que ya estamos en el directorio /App.
CMD ["node", "./index.js"]
```

---

## ***Explicación de cada instrucción***

1. **`FROM ubuntu:22.04`:** *Esta línea especifica la imagen base que se utilizará para construir nuestra imagen Docker. En este caso, estamos utilizando la imagen oficial de Ubuntu 22.04.*

2. **`RUN apt update && apt install curl`:** *Esta línea ejecuta comandos dentro del contenedor para actualizar la lista de paquetes e instalar `curl`.*

3. **`RUN curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh && bash nodesource_setup.sh && apt-get install -y nodejs`:** *Esta línea descarga y ejecuta el script de configuración de NodeSource para añadir el repositorio de Node.js y luego instala Node.js.*

4. **`WORKDIR /App`:** *Esta línea establece el directorio de trabajo dentro del contenedor a `/App`. Todos los comandos subsiguientes se ejecutarán en este directorio.*

5. **`COPY ./index.js ./`:** *Esta línea copia el fichero `index.js` desde el directorio actual en el host al directorio de trabajo (`/App`) en el contenedor.*

6. **`CMD ["node", "./index.js"]`:** *Esta línea especifica el comando que se ejecutará cuando se inicie un contenedor creado a partir de esta imagen. En este caso, inicia la aplicación Node.js utilizando `node ./index.js`.*

- *Con este `Dockerfile`, hemos definido una imagen Docker que contiene una aplicación Node.js básica configurada para ejecutarse en un contenedor basado en Ubuntu 22.04.*

## ***Uso de Docker para Construir una Imagen***

- *Los comandos `docker image build ./` y `docker build ./` son equivalentes. Ambos comandos se utilizan para construir una imagen Docker a partir de un `Dockerfile` en el directorio actual.*

---

## ***Ejemplo de Uso de `docker image build ./`***

```bash
docker image build ./
```

---

## ***Salida de Ejemplo***

**Aquí hay un ejemplo de la salida del comando `docker image build ./`:**

```bash
[+] Building 10.0s (6/9)                                                 docker:default
 => [internal] load build definition from Dockerfile                               0.0s
 => => transferring dockerfile: 944B                                               0.0s
 => [internal] load metadata for docker.io/library/ubuntu:22.04                    0.0s
 => [internal] load .dockerignore                                                  0.0s
 => => transferring context: 2B                                                    0.0s
 => [1/5] FROM docker.io/library/ubuntu:22.04                                      0.0s
 => [internal] load build context                                                  0.0s
 => => transferring context: 595B                                                  0.0s
 => ERROR [2/5] RUN apt update && apt install curl                                 9.8s
------
 > [2/5] RUN apt update && apt install curl:
0.411 
0.411 WARNING: apt does not have a stable CLI interface. Use with caution in scripts.
0.411 
0.686 Get:1 http://archive.ubuntu.com/ubuntu jammy InRelease [270 kB]
0.686 Get:2 http://security.ubuntu.com/ubuntu jammy-security InRelease [129 kB]
1.246 Get:3 http://archive.ubuntu.com/ubuntu jammy-updates InRelease [128 kB]
1.319 Get:4 http://security.ubuntu.com/ubuntu jammy-security/universe amd64 Packages [1088 kB]
1.378 Get:5 http://archive.ubuntu.com/ubuntu jammy-backports InRelease [127 kB]
1.512 Get:6 http://archive.ubuntu.com/ubuntu jammy/restricted amd64 Packages [164 kB]
1.576 Get:7 http://archive.ubuntu.com/ubuntu jammy/main amd64 Packages [1792 kB]
1.770 Get:8 http://security.ubuntu.com/ubuntu jammy-security/restricted amd64 Packages [2439 kB]
1.887 Get:9 http://archive.ubuntu.com/ubuntu jammy/universe amd64 Packages [17.5 MB]
2.016 Get:10 http://security.ubuntu.com/ubuntu jammy-security/multiverse amd64 Packages [44.7 kB]
2.020 Get:11 http://security.ubuntu.com/ubuntu jammy-security/main amd64 Packages [1885 kB]
3.695 Get:12 http://archive.ubuntu.com/ubuntu jammy/multiverse amd64 Packages [266 kB]
3.701 Get:13 http://archive.ubuntu.com/ubuntu jammy-updates/universe amd64 Packages [1389 kB]
3.813 Get:14 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 Packages [2160 kB]
4.064 Get:15 http://archive.ubuntu.com/ubuntu jammy-updates/multiverse amd64 Packages [51.5 kB]
4.069 Get:16 http://archive.ubuntu.com/ubuntu jammy-updates/restricted amd64 Packages [2512 kB]
4.458 Get:17 http://archive.ubuntu.com/ubuntu jammy-backports/main amd64 Packages [81.0 kB]
4.469 Get:18 http://archive.ubuntu.com/ubuntu jammy-backports/universe amd64 Packages [31.8 kB]
5.622 Fetched 32.0 MB in 5s (6228 kB/s)
5.622 Reading package lists...
7.133 Building dependency tree...
7.381 Reading state information...
7.414 2 packages can be upgraded. Run 'apt list --upgradable' to see them.
7.421 
7.421 WARNING: apt does not have a stable CLI interface. Use with caution in scripts.
7.421 
7.487 Reading package lists...
8.972 Building dependency tree...
9.223 Reading state information...
9.555 The following additional packages will be installed:
9.556   ca-certificates libbrotli1 libcurl4 libldap-2.5-0 libldap-common
9.556   libnghttp2-14 libpsl5 librtmp1 libsasl2-2 libsasl2-modules
9.558   libsasl2-modules-db libssh-4 openssl publicsuffix
9.559 Suggested packages:
9.559   libsasl2-modules-gssapi-mit | libsasl2-modules-gssapi-heimdal
9.559   libsasl2-modules-ldap libsasl2-modules-otp libsasl2-modules-sql
9.629 The following NEW packages will be installed:
9.630   ca-certificates curl libbrotli1 libcurl4 libldap-2.5-0 libldap-common
9.630   libnghttp2-14 libpsl5 librtmp1 libsasl2-2 libsasl2-modules
9.631   libsasl2-modules-db libssh-4 openssl publicsuffix
9.645 0 upgraded, 15 newly installed, 0 to remove and 2 not upgraded.
9.645 Need to get 2991 kB of archives.
9.645 After this operation, 7125 kB of additional disk space will be used.
9.645 Do you want to continue? [Y/n] Abort.
------
Dockerfile:5
--------------------
   3 |     
   4 |     # para ejecutar comandos en el contenedor se usa la directiva `RUN`
   5 | >>> RUN apt update && apt install curl
   6 |     
   7 |     RUN curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh && bash nodesource_setup.sh && apt-get install -y nodejs
--------------------
ERROR: failed to solve: process "/bin/sh -c apt update && apt install curl" did not complete successfully: exit code: 1
```

---

## ***Análisis del Error***

- *El error ocurre porque el proceso de instalación de `curl` requiere una confirmación para continuar con la descarga de paquetes y dependencias. Como este proceso es automático y no interactivo, no podemos responder "Sí" manualmente.*

```bash
9.645 Do you want to continue? [Y/n] Abort.
```

---

## ***Solución***

*Para solucionar este problema, debemos agregar la opción `-y` al comando `apt install` para que automáticamente acepte la instalación de los paquetes.*

```Dockerfile
RUN apt update && apt -y install curl
```

---

## ***Dockerfile Corregido***

**Aquí está el `Dockerfile` corregido:**

```Dockerfile
# Las imágenes oficiales suelen venir actualizadas, por lo que no es necesario usar `apt upgrade`
FROM ubuntu:22.04

# Para ejecutar comandos en el contenedor se usa la directiva `RUN`
RUN apt update && apt -y install curl

RUN curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt-get install -y nodejs

# Para indicar un directorio de trabajo, utilizamos la directiva `WORKDIR`.
# Cabe recalcar que después de usar este comando nos encontraremos en el directorio /App
WORKDIR /App

# No es necesario especificar la ruta absoluta `/App` ya que estamos en ese directorio. 
# Podemos usar una ruta relativa como `./` o incluso solo el punto `.`
COPY ./index.js ./

# Para poner en marcha el servidor HTTP utilizamos `CMD`. Normalmente es un comando de shell,
# pero en este caso especificamos `node ./index.js`. Recordar que ya estamos en el directorio /App.
CMD ["node", "./index.js"]
```

---

## ***Construcción de la Imagen***

**Para construir la imagen con el `Dockerfile` corregido, simplemente ejecutamos:**

```bash
docker build ./
```

**o:**

```bash
docker image build ./
```

**Ambos comandos realizarán la misma acción y construirán la imagen Docker a partir del `Dockerfile` en el directorio actual.**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales -->
# GitHub: https://github.com/DanielPerezMoralesDev13 -->
# Correo electrónico: danielperezdev@proton.me -->

# las imagenes ya vienen actualizadas normalmente por eso no es necesario poner `apt upgrade`
FROM ubuntu:22.04

# para ejecutar comandos en el contenedor se usa la directiva `RUN`
RUN apt update && apt -y install curl

RUN curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh && bash nodesource_setup.sh && apt-get install -y nodejs

# para indicar un directorio de trabajo cabe recalcar que despues de usar este comando nos encontraremos en el directorio /App
WORKDIR /App

# No es necesario poner `/App` ruta absoluta por que ya nos econtramos en ese directorio le podemos pasar la ruta relativa `./` se puede poner solo el punto `.`

COPY ./index.js ./

# para poner en marcha el servido http lo hacemos mediante `CMD` normalmente es bash pero en este caso ponemos `node ./index.js` recordar que ya estamos en el directorio /App
CMD node ./index.js
```

**Ejecutamos el comando para la creacion de la imagen:**

```bash
docker image build ./
[+] Building 74.2s (10/10) FINISHED                                                                                            docker:default
 => [internal] load build definition from Dockerfile                                                                                     0.0s
 => => transferring dockerfile: 947B                                                                                                     0.0s
 => [internal] load metadata for docker.io/library/ubuntu:22.04                                                                          0.0s
 => [internal] load .dockerignore                                                                                                        0.0s
 => => transferring context: 2B                                                                                                          0.0s
 => CACHED [1/5] FROM docker.io/library/ubuntu:22.04                                                                                     0.0s
 => [internal] load build context                                                                                                        0.0s
 => => transferring context: 30B                                                                                                         0.0s
 => [2/5] RUN apt update && apt -y install curl                                                                                         34.4s
 => [3/5] RUN curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh && bash nodesource_setup.sh && apt-get install -  37.3s 
 => [4/5] WORKDIR /App                                                                                                                   0.0s 
 => [5/5] COPY ./index.js ./                                                                                                             0.0s 
 => exporting to image                                                                                                                   2.2s 
 => => exporting layers                                                                                                                  2.2s 
 => => writing image sha256:f398169eeb6294eab9bda5620f5e83abb5a4b347e7783967f17ea5ee07ee93cc
```

---

## ***Gestión de Imágenes en Docker***

---

## ***Listar las Imágenes Disponibles***

**Para ver las imágenes disponibles en tu sistema Docker, utiliza el comando `docker images`:**

```bash
docker images
```

---

### ***Ejemplo de Salida***

```bash
REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
<none>       <none>    f398169eeb62   3 minutes ago   346MB
ubuntu       22.04     52882761a72a   5 weeks ago     77.9MB
```

**En este ejemplo, la primera imagen no tiene un nombre ni una etiqueta y se considera una "dangling image".**

## ***Imágenes Dangling***

**Una imagen dangling es aquella que no tiene un nombre ni una etiqueta asociada:**

```bash
REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
<none>       <none>    47f5a7910666   3 minutes ago   346MB
```

---

## ***Etiquetar una Imagen***

**Para darle un nombre y una etiqueta a una imagen dangling, puedes usar el comando `docker tag`:**

```bash
docker tag <id-image> <nombre>:<tag>
```

### ***Ejemplo***

```bash
docker tag 47f5a7910666 imagen/test:0.1.0
```

- **Luego, al listar las imágenes nuevamente, verás la imagen con su nuevo nombre y etiqueta:**

```bash
docker image ls
```

---

### ***Ejemplo de Salida `docker image ls`***

```bash
REPOSITORY        TAG       IMAGE ID       CREATED             SIZE
imagen/test       0.1.0     47f5a7910666   7 minutes ago       346MB
```

---

## ***Borrar Imágenes Dangling***

- *Para eliminar imágenes dangling, puedes usar el comando `docker image prune`. Este comando elimina todas las imágenes sin nombre ni etiqueta:*

```bash
docker image prune
```

---

## ***Borrar Todas las Imágenes No Usadas***

- *Si deseas eliminar todas las imágenes que no están siendo utilizadas por ningún contenedor, incluso si tienen un nombre, usa la opción `--all`:*

```bash
docker image prune --all
```

---

## ***Crear una Imagen con Nombre y Etiqueta***

- *En lugar de etiquetar una imagen después de crearla, puedes asignar un nombre y una etiqueta directamente al construir la imagen utilizando la opción `--tag` o `-t`:*

```bash
docker build --tag <nombre>:<tag> ./
```

### ***Ejemplo `--tag`***

```bash
docker build --tag d4nitrix13/node:0.1.0 ./
```

- *Este comando asigna el nombre `d4nitrix13/node` y la etiqueta `0.1.0` a la imagen construida. Si la imagen ya existe y está en la caché, el proceso será rápido.*

---

## ***Documentación***

- *Para más información sobre la limpieza de imágenes dangling, puedes consultar la documentación oficial de Docker [aquí](https://docs.docker.com/reference/cli/docker/image/prune/ "https://docs.docker.com/reference/cli/docker/image/prune/").*

```bash
docker build --tag d4nitrix13/node:0.1.0 ./
[+] Building 0.1s (10/10) FINISHED                                                                                             docker:default
 => [internal] load build definition from Dockerfile                                                                                     0.0s
 => => transferring dockerfile: 947B                                                                                                     0.0s
 => [internal] load metadata for docker.io/library/ubuntu:22.04                                                                          0.0s
 => [internal] load .dockerignore                                                                                                        0.0s
 => => transferring context: 2B                                                                                                          0.0s
 => [1/5] FROM docker.io/library/ubuntu:22.04                                                                                            0.0s
 => [internal] load build context                                                                                                        0.0s
 => => transferring context: 30B                                                                                                         0.0s
 => CACHED [2/5] RUN apt update && apt -y install curl                                                                                   0.0s
 => CACHED [3/5] RUN curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh && bash nodesource_setup.sh && apt-get ins  0.0s
 => CACHED [4/5] WORKDIR /App                                                                                                            0.0s
 => CACHED [5/5] COPY ./index.js ./                                                                                                      0.0s
 => exporting to image                                                                                                                   0.0s
 => => exporting layers                                                                                                                  0.0s
 => => writing image sha256:f398169eeb6294eab9bda5620f5e83abb5a4b347e7783967f17ea5ee07ee93cc                                             0.0s
 => => naming to docker.io/d4nitrix13/node:0.1.0                                                                                         0.0s
```

---

## ***Gestión y Optimización de Imágenes Docker***

---

## ***Listar Imágenes Disponibles***

**Para listar las imágenes disponibles en tu sistema Docker, usa el comando `docker images`:**

```bash
docker images
```

---

### ***Ejemplo de Salida para este ejemplo***

```bash
REPOSITORY        TAG       IMAGE ID       CREATED          SIZE
d4nitrix13/node   0.1.0     f398169eeb62   14 minutes ago   346MB
ubuntu            22.04     52882761a72a   5 weeks ago      77.9MB
```

- *Cada línea en la salida representa una imagen, y cada imagen está compuesta por varias capas. Cada instrucción en el `Dockerfile` genera una capa nueva.*

---

## ***Ejemplo de Dockerfile***

**A continuación se muestra un ejemplo de `Dockerfile` con múltiples instrucciones `RUN`, cada una creando una capa nueva:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales -->
# GitHub: https://github.com/DanielPerezMoralesDev13 -->
# Correo electrónico: danielperezdev@proton.me -->

# Las imágenes oficiales suelen venir actualizadas, por lo que no es necesario usar `apt upgrade`
FROM ubuntu:22.04

# Para ejecutar comandos en el contenedor se usa la directiva `RUN`
RUN apt update && apt install -y curl

RUN curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt-get install -y nodejs

# Para indicar un directorio de trabajo, utilizamos la directiva `WORKDIR`.
# Cabe recalcar que después de usar este comando nos encontraremos en el directorio /App
WORKDIR /App

# No es necesario especificar la ruta absoluta `/App` ya que estamos en ese directorio. 
# Podemos usar una ruta relativa como `./` o incluso solo el punto `.`
COPY ./index.js ./

# Para poner en marcha el servidor HTTP utilizamos `CMD`. Normalmente es un comando de shell,
# pero en este caso especificamos `node ./index.js`. Recordar que ya estamos en el directorio /App.
CMD ["node", "./index.js"]
```

---

## ***Optimización del Dockerfile***

- *Podemos optimizar el `Dockerfile` combinando las instrucciones `RUN` en una sola instrucción. Esto reduce el número de capas y, por lo tanto, el tamaño de la imagen.*

---

### ***Dockerfile Optimizado***

```Dockerfile
# Autor: Daniel Benjamin Perez Morales -->
# GitHub: https://github.com/DanielPerezMoralesDev13 -->
# Correo electrónico: danielperezdev@proton.me -->

# Las imágenes oficiales suelen venir actualizadas, por lo que no es necesario usar `apt upgrade`
FROM ubuntu:22.04

# Para ejecutar comandos en el contenedor se usa la directiva `RUN`
RUN apt update \
    && apt install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt-get install -y nodejs

# Para indicar un directorio de trabajo, utilizamos la directiva `WORKDIR`.
# Cabe recalcar que después de usar este comando nos encontraremos en el directorio /App
WORKDIR /App

# No es necesario especificar la ruta absoluta `/App` ya que estamos en ese directorio. 
# Podemos usar una ruta relativa como `./` o incluso solo el punto `.`
COPY ./index.js ./

# Para poner en marcha el servidor HTTP utilizamos `CMD`. Normalmente es un comando de shell,
# pero en este caso especificamos `node ./index.js`. Recordar que ya estamos en el directorio /App.
CMD ["node", "./index.js"]
```

- *Al combinar todas las instalaciones y comandos en una sola instrucción `RUN`, reducimos el número de capas y optimizamos la imagen.*

---

## ***Construcción de la Imagen nuevamente***

**Para construir la imagen con el `Dockerfile` optimizado y asignarle un nombre y etiqueta, usa el siguiente comando:**

```bash
docker build --tag d4nitrix13/node:0.1.0 ./
```

---

## ***Limpiar Imágenes Dangling***

**Para eliminar imágenes dangling, que son imágenes sin nombre ni etiqueta, usa el comando `docker image prune`:**

```bash
docker image prune
```

**Para eliminar todas las imágenes que no están siendo utilizadas por ningún contenedor, incluso si tienen un nombre, usa la opción `--all`:**

```bash
docker image prune --all
```

---

## ***Nota sobre las Capas***

> [!IMPORTANT]
> *Es importante mencionar que combinar instrucciones `RUN` puede no siempre ser la mejor opción. En algunos casos, tener múltiples capas puede ser beneficioso, especialmente si algunas capas cambian con menos frecuencia que otras. Esto permite que Docker reutilice capas en caché, haciendo que la construcción de la imagen sea más rápida.*

```bash
docker build --tag d4nitrix13/node:0.1.1 ./
[+] Building 56.5s (9/9) FINISHED                                                                                              docker:default
 => [internal] load build definition from Dockerfile                                                                                     0.2s
 => => transferring dockerfile: 969B                                                                                                     0.0s
 => [internal] load metadata for docker.io/library/ubuntu:22.04                                                                          0.0s
 => [internal] load .dockerignore                                                                                                        0.3s
 => => transferring context: 2B                                                                                                          0.0s
 => CACHED [1/4] FROM docker.io/library/ubuntu:22.04                                                                                     0.1s
 => [internal] load build context                                                                                                        0.5s
 => => transferring context: 30B                                                                                                         0.0s
 => [2/4] RUN apt update     && apt install -y curl     && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh      53.1s
 => [3/4] WORKDIR /App                                                                                                                   0.0s 
 => [4/4] COPY ./index.js ./                                                                                                             0.0s 
 => exporting to image                                                                                                                   2.6s 
 => => exporting layers                                                                                                                  2.6s 
 => => writing image sha256:93755b03800855374df861e130b8a95a2b7998b0773a380f7b24d23dd885517c                                             0.0s 
 => => naming to docker.io/d4nitrix13/node:0.1.1                                                                                         0.0s 
```

---

## ***Optimización y Ejecución de Contenedores Docker***

---

## ***Listar las Imágenes Disponibles otra vez***

**Para ver las imágenes disponibles en Docker, usamos el comando `docker image list`:**

```bash
docker image list
```

---

### ***Ejemplo de Salida sobre Optimización y Ejecución de Contenedores Docker***

```bash
REPOSITORY        TAG       IMAGE ID       CREATED          SIZE
d4nitrix13/node   0.1.1     93755b038008   59 seconds ago   344MB
d4nitrix13/node   0.1.0     f398169eeb62   31 minutes ago   346MB
ubuntu            22.04     52882761a72a   5 weeks ago      77.9MB
```

- *Podemos observar que la imagen optimizada (`d4nitrix13/node:0.1.1`) es 2MB más ligera que la versión anterior (`d4nitrix13/node:0.1.0`). Aunque la diferencia no parece mucha, en proyectos más grandes, reducir el número de capas y optimizar el `Dockerfile` puede ahorrar una cantidad significativa de espacio.*

---

## ***Crear y Ejecutar un Contenedor***

**Para crear y ejecutar un contenedor con la imagen optimizada, usamos el comando `docker run`. Inicialmente, intentamos sin publicar el puerto:**

```bash
docker run -it --name 00-App-nodejs-v2 d4nitrix13/node:0.1.1
```

---

### ***Salida Esperada***

```bash
Server running at http://0.0.0.0:3000/
```

**Aunque el servidor Node.js está ejecutándose, no podremos acceder a él desde fuera del contenedor porque no hemos publicado el puerto. Intentar conectarse al servidor dará un error:**

```bash
curl http://127.0.0.1:3000/
curl: (7) Failed to connect to 127.0.0.1 port 3000 after 0 ms: Connection refused
```

---

## ***Publicar el Puerto***

**Para hacer accesible el servidor desde fuera del contenedor, necesitamos publicar el puerto. Usamos la opción `-p` para mapear el puerto 3000 del contenedor al puerto 5000 del host:**

```bash
docker run -it --name 00-App-nodejs-v3 -p 5000:3000 d4nitrix13/node:0.1.1
```

---

### ***Salida Esperada Publicar el puerto***

```bash
Server running at http://0.0.0.0:3000/
```

**Ahora el servidor está accesible en el puerto 5000 de nuestra máquina. Probamos la conexión usando `curl`:**

```bash
curl http://0.0.0.0:5000/
Hello World
curl http://127.0.0.1:5000/
Hello World
curl http://localhost:5000/
Hello World
curl http://192.168.1.9:5000/
Hello World
```

- *En cada caso, obtenemos la respuesta `Hello World`, indicando que el servidor Node.js está funcionando correctamente y accesible desde diferentes direcciones IP de nuestra red.*

---

## ***Resumen***

1. **Optimización de la Imagen Docker:** *Reducir el número de capas combinando instrucciones `RUN` en el `Dockerfile` puede ahorrar espacio, aunque la diferencia puede ser pequeña en imágenes simples.*
2. **Ejecución de Contenedores:** *Para ejecutar un contenedor y exponer su puerto a la máquina host, usamos `docker run -p <host-port>:<container-port>`.*
3. **Publicación de Puertos:** *Es crucial publicar los puertos correctamente para acceder a los servicios que corren dentro del contenedor.*

- *Esto asegura que los servicios dentro de los contenedores Docker sean accesibles y eficientes en términos de espacio y gestión.*

- *Ahora hay una directiva que podriamos poner en el Dockerfile para referirse a un puerto que sera publicado en este caso sera `EXPOSE`*

```Dockerfile
# Autor: Daniel Benjamin Perez Morales -->
# GitHub: https://github.com/DanielPerezMoralesDev13 -->
# Correo electrónico: danielperezdev@proton.me -->

# las imagenes ya vienen actualizadas normalmente por eso no es necesario poner `apt upgrade`
FROM ubuntu:22.04

# para ejecutar comandos en el contenedor se usa la directiva `RUN`
RUN apt update \
    && apt install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt-get install -y nodejs

# para indicar un directorio de trabajo cabe recalcar que despues de usar este comando nos encontraremos en el directorio /App
WORKDIR /App

# No es necesario poner `/App` ruta absoluta por que ya nos econtramos en ese directorio le podemos pasar la ruta relativa `./` se puede poner solo el punto `.`

COPY ./index.js ./

EXPOSE 3000

# para poner en marcha el servido http lo hacemos mediante `CMD` normalmente es bash pero en este caso ponemos `node ./index.js` recordar que ya estamos en el directorio /App
CMD node ./index.js
```

- **Creamos un nueva imagen para inspeccionar con `docker inspect`**

```bash
docker build -t d4nitrix13/node:0.1.2 ./
[+] Building 0.1s (9/9) FINISHED                                                                                               docker:default
 => [internal] load build definition from Dockerfile                                                                                     0.0s
 => => transferring dockerfile: 982B                                                                                                     0.0s
 => [internal] load metadata for docker.io/library/ubuntu:22.04                                                                          0.0s
 => [internal] load .dockerignore                                                                                                        0.0s
 => => transferring context: 2B                                                                                                          0.0s
 => [1/4] FROM docker.io/library/ubuntu:22.04                                                                                            0.0s
 => [internal] load build context                                                                                                        0.0s
 => => transferring context: 30B                                                                                                         0.0s
 => CACHED [2/4] RUN apt update     && apt install -y curl     && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.  0.0s
 => CACHED [3/4] WORKDIR /App                                                                                                            0.0s
 => CACHED [4/4] COPY ./index.js ./                                                                                                      0.0s
 => exporting to image                                                                                                                   0.0s
 => => exporting layers                                                                                                                  0.0s
 => => writing image sha256:146b0b14c7a8745a3e20b6faa3618b7e8d38c38557ee94eeb8720613ceed907b                                             0.0s
 => => naming to docker.io/d4nitrix13/node:0.1.2                                                                                         0.0s
```

---

## ***Inspección de Imágenes Docker***

- *Al inspeccionar las imágenes Docker, podemos obtener información detallada sobre su configuración y contenido. A continuación se presenta cómo inspeccionar las imágenes `d4nitrix13/node:0.1.2` y `d4nitrix13/node:0.1.1`, y un análisis de los resultados.*

---

## ***Inspección de la Imagen `d4nitrix13/node:0.1.2`***

**Utilizamos el siguiente comando para inspeccionar la imagen `d4nitrix13/node:0.1.2`:**

```bash
docker inspect d4nitrix13/node:0.1.2 > "informacion de la imagen d4nitrix13 de node version 0.1.2.json"
```

---

### ***Contenido del fichero JSON***

**El fichero JSON resultante proporciona información detallada sobre la imagen:**

```json
[
    {
        "Id": "sha256:146b0b14c7a8745a3e20b6faa3618b7e8d38c38557ee94eeb8720613ceed907b",
        "RepoTags": [
            "d4nitrix13/node:0.1.2"
        ],
        "RepoDigests": [],
        "Parent": "",
        "Comment": "buildkit.dockerfile.v0",
        "Created": "2024-06-07T16:19:54.902655279-06:00",
        "DockerVersion": "",
        "Author": "",
        "Config": {
            "Hostname": "",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "ExposedPorts": {
                "3000/tcp": {}
            },
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": [
                "/bin/sh",
                "-c",
                "node ./index.js"
            ],
            "ArgsEscaped": true,
            "Image": "",
            "Volumes": null,
            "WorkingDir": "/App",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": {
                "org.opencontainers.image.ref.name": "ubuntu",
                "org.opencontainers.image.version": "22.04"
            }
        },
        "Architecture": "amd64",
        "Os": "linux",
        "Size": 344215581,
        "GraphDriver": {
            "Data": {
                "LowerDir": "/var/lib/docker/overlay2/kr4i0c8ry4bsu7c6jsowwj1fr/diff:/var/lib/docker/overlay2/tqhoeimhf4l6n7zeo3pdini0n/diff:/var/lib/docker/overlay2/043387975c35001ef7b631d7ad09d104fcb9b7970b5b3a38042167dd0c65a764/diff",
                "MergedDir": "/var/lib/docker/overlay2/82xpaeggq61te9rdxufi9ckxy/merged",
                "UpperDir": "/var/lib/docker/overlay2/82xpaeggq61te9rdxufi9ckxy/diff",
                "WorkDir": "/var/lib/docker/overlay2/82xpaeggq61te9rdxufi9ckxy/work"
            },
            "Name": "overlay2"
        },
        "RootFS": {
            "Type": "layers",
            "Layers": [
                "sha256:629ca62fb7c791374ce57626d6b8b62c76378be091a0daf1a60d32700b49add7",
                "sha256:8197621881cd127928fc22a22f091e8321f4ca87ed4c319b8857adc13fbe4554",
                "sha256:0dc74222b9de5975e158e0465d380e1a651ecafd6677bf3c619b39a68f93271a",
                "sha256:3b310c2920460ab19e6f51a57b51595611baac0a3598b4b71f6e064fe135c558"
            ]
        },
        "Metadata": {
            "LastTagTime": "2024-06-07T16:45:12.332431607-06:00"
        }
    }
]
```

**En este JSON, vemos el campo `ExposedPorts`, que muestra que el puerto 3000 está expuesto:**

```json
"ExposedPorts": {
    "3000/tcp": {}
}
```

---

## ***Inspección de la Imagen `d4nitrix13/node:0.1.1`***

**Ahora inspeccionamos la imagen `d4nitrix13/node:0.1.1`:**

```bash
docker inspect d4nitrix13/node:0.1.1 > "informacion de la imagen d4nitrix13 de node version 0.1.1.json"
```

---

### ***Contenido del fichero JSON `"informacion de la imagen d4nitrix13 de node version 0.1.1.json"`***

**El fichero JSON para esta imagen es el siguiente:**

```json
[
    {
        "Id": "sha256:93755b03800855374df861e130b8a95a2b7998b0773a380f7b24d23dd885517c",
        "RepoTags": [
            "d4nitrix13/node:0.1.1"
        ],
        "RepoDigests": [],
        "Parent": "",
        "Comment": "buildkit.dockerfile.v0",
        "Created": "2024-06-07T16:19:54.902655279-06:00",
        "DockerVersion": "",
        "Author": "",
        "Config": {
            "Hostname": "",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": [
                "/bin/sh",
                "-c",
                "node ./index.js"
            ],
            "ArgsEscaped": true,
            "Image": "",
            "Volumes": null,
            "WorkingDir": "/App",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": {
                "org.opencontainers.image.ref.name": "ubuntu",
                "org.opencontainers.image.version": "22.04"
            }
        },
        "Architecture": "amd64",
        "Os": "linux",
        "Size": 344215581,
        "GraphDriver": {
            "Data": {
                "LowerDir": "/var/lib/docker/overlay2/kr4i0c8ry4bsu7c6jsowwj1fr/diff:/var/lib/docker/overlay2/tqhoeimhf4l6n7zeo3pdini0n/diff:/var/lib/docker/overlay2/043387975c35001ef7b631d7ad09d104fcb9b7970b5b3a38042167dd0c65a764/diff",
                "MergedDir": "/var/lib/docker/overlay2/82xpaeggq61te9rdxufi9ckxy/merged",
                "UpperDir": "/var/lib/docker/overlay2/82xpaeggq61te9rdxufi9ckxy/diff",
                "WorkDir": "/var/lib/docker/overlay2/82xpaeggq61te9rdxufi9ckxy/work"
            },
            "Name": "overlay2"
        },
        "RootFS": {
            "Type": "layers",
            "Layers": [
                "sha256:629ca62fb7c791374ce57626d6b8b62c76378be091a0daf1a60d32700b49add7",
                "sha256:8197621881cd127928fc22a22f091e8321f4ca87ed4c319b8857adc13fbe4554",
                "sha256:0dc74222b9de5975e158e0465d380e1a651ecafd6677bf3c619b39a68f93271a",
                "sha256:3b310c2920460ab19e6f51a57b51595611baac0a3598b4b71f6e064fe135c558"
            ]
        },
        "Metadata": {
            "LastTagTime": "2024-06-07T16:19:57.524539508-06:00"
        }
    }
]
```

**En esta versión de la imagen, no existe el campo `ExposedPorts`, lo que indica que no se especificaron puertos expuestos en el `Dockerfile`.**

---

## ***Comparación y Análisis***

- **ExposedPorts:** *En la imagen `0.1.2`, se expone el puerto 3000, mientras que en la imagen `0.1.1` no hay puertos expuestos.*
- **Capas (Layers):** *Ambas*

---

## ***Creación de Imagen Docker Latest***

**Crear una imagen con la etiqueta `latest` es sencillo y puede realizarse de la siguiente manera:**

```bash
docker build --tag d4nitrix13/node:latest ./
```

**Luego, al listar las imágenes, podemos ver que se ha creado la versión latest:**

```bash
docker images
REPOSITORY        TAG       IMAGE ID       CREATED             SIZE
d4nitrix13/node   0.1.2     146b0b14c7a8   43 minutes ago      344MB
d4nitrix13/node   latest    146b0b14c7a8   43 minutes ago      344MB
d4nitrix13/node   0.1.1     93755b038008   43 minutes ago      344MB
d4nitrix13/node   0.1.0     f398169eeb62   About an hour ago   346MB
ubuntu            22.04     52882761a72a   5 weeks ago         77.9MB
```

**Para ejecutar un contenedor utilizando la versión latest, podemos hacerlo de dos formas:**

```bash
docker run -it --name 00-App-nodejs-v4 d4nitrix13/node
```

**o:**

```bash
docker run -it --name 00-App-nodejs-v4 d4nitrix13/node:latest
```

**Luego, al listar los contenedores, podemos observar:**

```bash
docker container list --all
CONTAINER ID   IMAGE                   COMMAND                  CREATED          STATUS                        PORTS     NAMES
c404b9ce8667   d4nitrix13/node         "/bin/sh -c 'node ./…"   52 seconds ago   Exited (130) 6 seconds ago              00-App-nodejs-v4
b064df325976   d4nitrix13/node:0.1.1   "/bin/sh -c 'node ./…"   28 minutes ago   Exited (130) 22 minutes ago             00-App-nodejs-v3
833b429d20c5   d4nitrix13/node:0.1.1   "/bin/sh -c 'node ./…"   42 minutes ago   Exited (130) 29 minutes ago             00-App-nodejs-v2
6f68557da99b   ubuntu:22.04            "/bin/bash"              4 days ago       Exited (137) 2 days ago                 App-00-Nodejs
0f3fdde42f5a   ubuntu:22.04            "/bin/bash"              6 days ago       Exited (137) 4 days ago                 test-client
```

---

## ***Observaciones Finales***

- **Versión Latest:** *Tanto `d4nitrix13/node` como `d4nitrix13/node:latest` hacen referencia a la misma imagen.*
- **Puertos Publicados:** *Si dos contenedores intentan publicar el mismo puerto en la máquina host, se producirá un error debido a un conflicto de puertos.*

- *La etiqueta `latest` puede ser útil para referirse siempre a la versión más reciente de una imagen.*

- *(**Es importante tener en cuenta los posibles conflictos de puertos al ejecutar múltiples contenedores**). Al ejecutar múltiples contenedores en un mismo host, es importante considerar los posibles conflictos de puertos, ya que cada contenedor puede intentar exponer servicios en puertos específicos.*

- *Por ejemplo, si tienes dos contenedores que intentan exponer un servicio web en el puerto 80, solo uno de ellos podrá utilizar ese puerto en el host físico. Si ambos intentan hacerlo simultáneamente, se producirá un conflicto.*

**Este conflicto puede manifestarse de diversas formas:**

1. **Error de puerto en uso:** *Al intentar iniciar el segundo contenedor que trata de utilizar un puerto que ya está en uso por otro contenedor activo, Docker generará un error indicando que el puerto está ocupado.*

2. **Contenedor que no se inicia:** *El contenedor que intenta utilizar el puerto ocupado puede no iniciarse correctamente y, por lo tanto, quedará en un estado de error o no se ejecutará según lo previsto.*

3. **Rendimiento reducido o servicio no disponible:** *Incluso si ambos contenedores se inician, es posible que experimenten un rendimiento reducido o que el servicio no esté disponible de manera consistente debido a la competencia por el mismo puerto.*

- *Para evitar este tipo de conflictos, es fundamental planificar cuidadosamente la asignación de puertos y asegurarse de que cada contenedor utilice puertos únicos o, en su defecto, que los puertos utilizados por diferentes contenedores no entren en conflicto entre sí ni con otros servicios que puedan estar en ejecución en el host físico.*
