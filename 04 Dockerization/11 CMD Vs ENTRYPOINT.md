<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->

# ***CMD vs ENTRYPOINT en Docker***

---

## ***CMD***

- *El comando `CMD` se utiliza para definir el comando por defecto que se ejecutará cuando un contenedor se inicie a partir de una imagen. Este comando se puede sobrescribir al ejecutar el contenedor.*

---

### ***Ejemplo de Dockerfile con CMD***

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Las imágenes normalmente ya vienen actualizadas, por lo que no es necesario ejecutar `apt upgrade`.
FROM ubuntu:22.04

# Ejecutar comandos en el contenedor se hace mediante la directiva `RUN`.
RUN apt update \
    && apt install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt-get install -y nodejs

# Indicar un directorio de trabajo. Después de usar este comando, estaremos en el directorio /App.
WORKDIR /App

# No es necesario especificar la ruta absoluta `/App` ya que estamos en ese directorio. Podemos usar la ruta relativa `./` o simplemente el punto `.`.
COPY ./index.js ./

EXPOSE 3000

# Para iniciar el servidor HTTP usamos `CMD`. Normalmente se utilizaría bash, pero en este caso usamos `node ./index.js`.
CMD node ./index.js

# Forma Shell
# CMD node ./index.js $HOME

# Forma Exec
# CMD [ "node", "./index.js", "$HOME" ]
```

---

### ***Limpiar el Sistema Docker***

**Antes de construir la nueva imagen, podemos limpiar el sistema Docker eliminando contenedores, redes e imágenes no utilizadas:**

```bash
docker rmi $(docker images -aq)
docker system prune
```

---

### ***Construir la Imagen con CMD***

**Construimos la imagen usando la directiva `CMD` usando `shell form`:**

```bash
docker build -t d4nitrix13/node:cmd ./
```

---

### ***Crear y Ejecutar el Contenedor***

**Creamos y ejecutamos el contenedor sin especificar un comando adicional:**

```bash
docker run --interactive --tty --name 00-App-Node-CMD d4nitrix13/node:cmd
```

**La salida debería ser similar a:**

```bash
[ '/usr/bin/node', '/App/index.js' ]
Server running at http://0.0.0.0:3000/
```

**Podemos verificar los contenedores en ejecución:**

```bash
docker ps
```

**La salida mostrará que el comando del contenedor es `/bin/sh -c 'node ./...'` porque estamos usando la forma Shell:**

```bash
CONTAINER ID   IMAGE                 COMMAND                  CREATED              STATUS              PORTS      NAMES
b181515c2577   d4nitrix13/node:cmd   "/bin/sh -c 'node ./…"   About a minute ago   Up About a minute   3000/tcp   00-App-Node-CMD
```

---

### ***Sobrescribir el Comando CMD***

**Podemos sobrescribir el comando al crear un nuevo contenedor:**

```bash
docker run --interactive --tty --name 00-App-Node-CMD-bash d4nitrix13/node:cmd bash
```

**Dentro del contenedor, podemos ejecutar `node index.js`:**

```bash
root@e3ae8f1c01d4:/App# node index.js
[ '/usr/bin/node', '/App/index.js' ]
Server running at http://0.0.0.0:3000/
```

**La salida de `docker ps` mostrará que el comando es `bash`:**

```bash
CONTAINER ID   IMAGE                 COMMAND   CREATED              STATUS              PORTS      NAMES
e3ae8f1c01d4   d4nitrix13/node:cmd   "bash"    About a minute ago   Up About a minute   3000/tcp   00-App-Node-CMD-bash
```

**Podemos ejecutar cualquier comando siempre que el binario esté presente en la imagen:**

```bash
docker run --interactive --tty --name 00-App-Node-CMD-ls d4nitrix13/node:cmd ls --color=auto -l
```

**La salida será:**

```bash
total 4
-rw-rw-r-- 1 root root 811 Jun 18 19:38 index.js
```

- *Con esto, podemos ver cómo `CMD` usando `shell form` define un comando por defecto que puede ser sobrescrito al ejecutar el contenedor.*

---

## ***ENTRYPOINT***

- *El comando `ENTRYPOINT` se utiliza para configurar un contenedor para que se ejecute como un ejecutable. A diferencia de `CMD`, `ENTRYPOINT` es más rígido y no se sobrescribe fácilmente, aunque se pueden pasar argumentos adicionales.*

### ***Ejemplo de Dockerfile con ENTRYPOINT***

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Las imágenes normalmente ya vienen actualizadas, por lo que no es necesario ejecutar `apt upgrade`.
FROM ubuntu:22.04

# Ejecutar comandos en el contenedor se hace mediante la directiva `RUN`.
RUN apt update \
    && apt install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt-get install -y nodejs

# Indicar un directorio de trabajo. Después de usar este comando, estaremos en el directorio /App.
WORKDIR /App

# No es necesario especificar la ruta absoluta `/App` ya que estamos en ese directorio. Podemos usar la ruta relativa `./` o simplemente el punto `.`.
COPY ./index.js ./

EXPOSE 3000

# para poner en marcha el servido http lo hacemos mediante `CMD` normalmente es bash pero en este caso ponemos `node ./index.js` recordar que ya estamos en el directorio /App
# CMD node ./index.js

# Shell form
# CMD node ./index.js $HOME

# Exec form
# CMD [ "node", "./index.js", "$HOME" ]

# Configuramos el contenedor para que ejecute `node` como ejecutable.
ENTRYPOINT [ "node" ]
```

- *En este ejemplo, el contenedor está configurado para ejecutar `node` como su comando principal. Si `node` no está en el PATH del contenedor, debemos especificar su ruta completa, como `ENTRYPOINT [ "/usr/bin/node" ]` o un script `ENTRYPOINT [ "/root/script.sh" ]`. Obviamente, el fichero debe tener permisos de ejecución.*

---

### ***Construcción de la Imagen y Creación del Contenedor***

**Construimos la imagen y creamos un nuevo contenedor:**

```bash
docker build --tag d4nitrix13/node:entrypoint .
```

**Al iniciar el contenedor, tenemos un shell interactivo de Node.js:**

```bash
docker run -it --name 00-App-Node-Entrypoint d4nitrix13/node:entrypoint
```

**La salida debería ser similar a:**

```bash
Welcome to Node.js v22.3.0.
Type ".help" for more information.
> console.log("Hello");
Hello
undefined
> let a = 5;
undefined
> a * 3
15
> 2 + 2
4
```

**Podemos verificar los contenedores en ejecución:**

```bash
docker ps -af ancestor=d4nitrix13/node:entrypoint
```

**La salida mostrará que el comando del contenedor es `node`:**

```bash
CONTAINER ID   IMAGE                        COMMAND   CREATED         STATUS                     PORTS     NAMES
a3af6e43e89b   d4nitrix13/node:entrypoint   "node"    3 minutes ago   Exited (0) 3 minutes ago             00-App-Node-Entrypoint
```

---

### ***Sobrescribir el Comando ENTRYPOINT***

- *Intentar sobrescribir `ENTRYPOINT` no funciona de la misma manera que `CMD`. Si intentamos ejecutar el contenedor con un comando diferente, como `bash`, este se pasa como argumento al `ENTRYPOINT` configurado:*

```bash
docker run -it --name 00-App-Node-Entrypoint-bash d4nitrix13/node:entrypoint bash
```

**Esto resulta en un error porque `node` intenta ejecutar `bash` como un script:**

```bash
node:internal/modules/cjs/loader:1215
  throw err;
  ^

Error: Cannot find module '/App/bash'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1212:15)
    at Module._load (node:internal/modules/cjs/loader:1038:27)
    at wrapModuleLoad (node:internal/modules/cjs/loader:212:19)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:158:5)
    at node:internal/main/run_main_module:30:49 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}
Node.js v22.3.0
```

**Sin embargo, podemos ejecutar `index.js`, que es interpretable por `node`:**

```bash
docker run -it --name 00-App-Node-Entrypoint-Server d4nitrix13/node:entrypoint index.js
```

**La salida debería ser:**

```bash
[ '/usr/bin/node', '/App/index.js' ]
Server running at http://0.0.0.0:3000/
```

*En resumen, `ENTRYPOINT` se utiliza para configurar un contenedor como un ejecutable. Es más rígido que `CMD` y no se sobrescribe fácilmente, aunque se pueden pasar argumentos adicionales al contenedor al iniciarlo.*

---

### ***Detener el contenedor si solo hay un contenedor corriendo***

**Para detener un contenedor, si solo hay un contenedor corriendo, usa el siguiente comando:**

```bash
docker stop $(docker ps -q)
```

---

### ***Revisar el comando del contenedor `00-App-Node-Entrypoint-Server`***

**Para revisar los detalles del contenedor `00-App-Node-Entrypoint-Server`, ejecuta:**

```bash
docker ps -af name=00-App-Node-Entrypoint-Server
```

**Esto mostrará algo similar a:**

```bash
CONTAINER ID   IMAGE                        COMMAND           CREATED          STATUS          PORTS      NAMES
4f018fa68486   d4nitrix13/node:entrypoint   "node index.js"   12 minutes ago   Up 12 minutes   3000/tcp   00-App-Node-Entrypoint-Server
```

**Vemos que el comando es `node index.js` porque le pasamos `index.js` como parámetro al binario `node`, que interpreta y ejecuta su contenido.**

---

### ***Modificar el Dockerfile***

**Vamos a cambiar el contenido del Dockerfile:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Las imágenes suelen venir actualizadas, por lo que no es necesario poner `apt upgrade`
FROM ubuntu:22.04

# Para ejecutar comandos en el contenedor se usa la directiva `RUN`
RUN apt update \
    && apt install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt-get install -y nodejs

# Indicar un directorio de trabajo
WORKDIR /App

# Copiar el fichero index.js al directorio de trabajo
COPY ./index.js ./

# Exponer el puerto 3000
EXPOSE 3000

# Usar ENTRYPOINT para ejecutar `ls -l`
ENTRYPOINT [ "ls", "-l" ]
```

---

### ***Construir y ejecutar la imagen***

**Construimos la imagen:**

```bash
docker build --tag d4nitrix13/node:entrypoint-ls .
```

**La salida de la construcción será algo como:**

```bash
[+] Building 0.5s (9/9) FINISHED                                                                                                                        docker:default
 => [internal] load build definition from Dockerfile                                                                                                              0.0s
 => => transferring dockerfile: 1.21kB                                                                                                                            0.0s
 => [internal] load metadata for docker.io/library/ubuntu:22.04                                                                                                   0.4s
 => [internal] load .dockerignore                                                                                                                                 0.0s
 => => transferring context: 2B                                                                                                                                   0.0s
 => [1/4] FROM docker.io/library/ubuntu:22.04@sha256:19478ce7fc2ffbce89df29fea5725a8d12e57de52eb9ea570890dc5852aac1ac                                             0.0s
 => [internal] load build context                                                                                                                                 0.0s
 => => transferring context: 30B                                                                                                                                  0.0s
 => CACHED [2/4] RUN apt update     && apt install -y curl     && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh     && bash nodesource  0.0s
 => CACHED [3/4] WORKDIR /App                                                                                                                                     0.0s
 => CACHED [4/4] COPY ./index.js ./                                                                                                                               0.0s
 => exporting to image                                                                                                                                            0.0s
 => => exporting layers                                                                                                                                           0.0s
 => => writing image sha256:3b5caf2eaee5763ab84edd89621e3ce16854b1752805f1caff1fb9d16664bc53                                                                      0.0s
 => => naming to docker.io/d4nitrix13/node:entrypoint-ls                                                                                                          0.0s
```

**Ejecutamos el contenedor y vemos el resultado de `ls`:**

```bash
docker run -it --name 00-App-Node-Entrypoint-ls d4nitrix13/node:entrypoint-ls 
```

**La salida será:**

```bash
total 4
-rw-rw-r-- 1 root root 811 Jun 18 19:38 index.js
```

---

### ***Crear otro contenedor con el parámetro `-a`***

**Creamos un nuevo contenedor con el parámetro `-a`:**

```bash
docker run -it --name 00-App-Node-Entrypoint-ls-a d4nitrix13/node:entrypoint-ls -a
```

**La salida será:**

```bash
total 12
drwxr-xr-x 1 root root 4096 Jun 23 21:22 .
drwxr-xr-x 1 root root 4096 Jun 23 22:59 ..
-rw-rw-r-- 1 root root  811 Jun 18 19:38 index.js
```

**Revisamos los comandos de los contenedores:**

```bash
docker ps -af name=00-App-Node-Entrypoint-ls*
```

**La salida será:**

```bash
CONTAINER ID   IMAGE                           COMMAND      CREATED              STATUS                          PORTS     NAMES
d11307f0ffcf   d4nitrix13/node:entrypoint-ls   "ls -l -a"   About a minute ago   Exited (0) About a minute ago             00-App-Node-Entrypoint-ls-a
197222d5d896   d4nitrix13/node:entrypoint-ls   "ls -l"      2 minutes ago        Exited (0) 2 minutes ago                  00-App-Node-Entrypoint-ls
```

---

### ***Modificar el Dockerfile añadiendo la directiva `CMD`***

**Modificamos el Dockerfile para añadir `CMD`:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Las imágenes suelen venir actualizadas, por lo que no es necesario poner `apt upgrade`
FROM ubuntu:22.04

# Para ejecutar comandos en el contenedor se usa la directiva `RUN`
RUN apt update \
    && apt install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt-get install -y nodejs

# Indicar un directorio de trabajo
WORKDIR /App

# Copiar el fichero index.js al directorio de trabajo
COPY ./index.js ./

# Exponer el puerto 3000
EXPOSE 3000

# Usar ENTRYPOINT para ejecutar `ls`
ENTRYPOINT [ "ls" ]

# Usar CMD para especificar parámetros por defecto
CMD [ "-l" ]
```

**Construimos la imagen:**

```bash
docker build --tag d4nitrix13/node:entrypoint-mas-cmd .
```

**La salida de la construcción será algo como:**

```bash
[+] Building 0.9s (9/9) FINISHED                                                                                                                        docker:default
 => [internal] load build definition from Dockerfile                                                                                                              0.0s
 => => transferring dockerfile: 1.22kB                                                                                                                            0.0s
 => [internal] load metadata for docker.io/library/ubuntu:22.04                                                                                                   0.8s
 => [internal] load .dockerignore                                                                                                                                 0.0s
 => => transferring context: 2B                                                                                                                                   0.0s
 => [1/4] FROM docker.io/library/ubuntu:22.04@sha256:19478ce7fc2ffbce89df29fea5725a8d12e57de52eb9ea570890dc5852aac1ac                                             0.0s
 => [internal] load build context                                                                                                                                 0.0s
 => => transferring context: 30B                                                                                                                                  0.0s
 => CACHED [2/4] RUN apt update     && apt install -y curl     && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh     && bash nodesource  0.0s
 => CACHED [3/4] WORKDIR /App                                                                                                                                     0.0s
 => CACHED [4/4] COPY ./index.js ./                                                                                                                               0.0s
 => exporting to image                                                                                                                                            0.0s
 => => exporting layers                                                                                                                                           0.0s
 => => writing image sha256:d8ca9905be9882583d66fca2c31c3544e89695e4f78d772743f70cfc0a94b2df                                                                      0.0s
 => => naming to docker.io/d4nitrix13/node:entrypoint-mas-cmd                                                                                                     0.0s
```

**Creamos el contenedor sin especificar ningún parámetro:**

```bash
docker run -it --name 00-App-Node-Entrypoint-mas-cmd d4nitrix13/node:entrypoint-mas-cmd
```

**La salida será:**

```bash
total 4
-rw-rw-r-- 1 root root 811 Jun 18 19:38 index.js
```

**Creamos un nuevo contenedor con la opción `-a`:**

```bash
docker run -it --name 00-App-Node-Entrypoint-mas-cmd-a d4nitrix13/node:entrypoint-mas-cmd -a
```

**La salida será:**

```bash
.  ..  index.js
```

**Revisamos los comandos de los contenedores:**

```bash
docker ps -af name=00-App-Node-Entrypoint-mas-cmd*
```

**La salida será:**

```bash
CONTAINER ID   IMAGE                                COMMAND   CREATED              STATUS                          PORTS     NAMES
4ef5256a74a9   d4nitrix13/node:entrypoint-mas-cmd   "ls -a"   About a minute ago   Exited (0) About a minute ago             00-App-Node-Entrypoint-mas-cmd-a
5d2b16bd0e85   d4nitrix13/node:entrypoint-mas-cmd   "ls -l"   2 minutes ago        Exited (0) 2 minutes ago                  00-App-Node-Entrypoint-mas-cmd
```

---

### ***Sobrescribir el comando de `ENTRYPOINT`***

**Para cambiar el comando de `ENTRYPOINT`, usaremos como ejemplo la imagen `d4nitrix13/node:entrypoint` cuyo Dockerfile es:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Las imágenes suelen venir actualizadas, por lo que no es necesario poner `apt upgrade`
FROM ubuntu:22.04

# Para ejecutar comandos en el contenedor se usa la directiva `RUN`
RUN apt update \
    && apt install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt-get install -y nodejs

# Indicar un directorio de trabajo
WORKDIR /App

# Copiar el fichero index.js al directorio de trabajo
COPY ./index.js ./

# Exponer el puerto 3000
EXPOSE 3000

# Usar ENTRYPOINT para ejecutar `node`
ENTRYPOINT [ "node" ]
```

**Podemos usar la opción `--rm` para que el contenedor se elimine automáticamente al detenerse:**

```bash
docker run -it --rm --name test d4nitrix13/node:entrypoint
```

**La salida será:**

```bash
Welcome to Node.js v22.3.0.
Type ".help" for more information.
> console.log("Hello");
Hello
undefined
```

**Para cambiar el comando, usamos la opción `--entrypoint`. Solo podemos especificar un parámetro, pero al final podemos añadir más opciones:**

```bash
docker run -it --name 00-App-Node-Entrypoint-Cambiado --entrypoint ls d4nitrix13/node:entrypoint -l -a --color=auto
```

**La salida será:**

```bash
total 12
drwxr-xr-x 1 root root 4096 Jun 23 21:22 .
drwxr-xr-x 1 root root 4096 Jun 23 23:23 ..
-rw-rw-r-- 1 root root  811 Jun 18 19:38 index.js
```

**Revisamos el comando del contenedor:**

```bash
docker ps -af name=00-App-Node-Entrypoint-Cambiado 
```

**La salida será:**

```bash
CONTAINER ID   IMAGE                        COMMAND                  CREATED              STATUS                          PORTS     NAMES
5ad3829a5b58   d4nitrix13/node:entrypoint   "ls -l -a --color=au…"   About a minute ago   Exited (0) About a minute ago             00-App-Node-Entrypoint-Cambiado
```

- **El término "entrypoint" en Docker se refiere al punto de entrada principal de un contenedor Docker cuando se ejecuta. Especifica el comando o script que se ejecutará cuando el contenedor se inicie. Aquí te explico más sobre su significado y características:**

---

### ***Significado y Características del Entrypoint en Docker***

---

#### ***Concepto Básico***

1. **Punto de Entrada:** *El entrypoint define qué comando se ejecutará dentro del contenedor cuando se inicie. Este comando puede ser un script, una aplicación, o cualquier ejecutable que sea relevante para la función del contenedor.*

2. **Flexibilidad:** *Permite configurar cómo comienza el contenedor, lo que es fundamental para aplicaciones y servicios que necesitan arrancar con un estado específico o con configuraciones particulares.*

3. **Sustitución y Combinación:** *El entrypoint puede ser reemplazado o complementado con un comando específico al ejecutar el contenedor, lo cual ofrece flexibilidad en la gestión de diferentes configuraciones de ejecución.*

---

#### ***Ejemplos de Uso***

- **Configuración de Aplicaciones:** *Es útil para inicializar bases de datos, servidores web, o cualquier servicio que requiera configuración específica al iniciar.*

- **Manejo de Configuraciones:** *Permite la configuración externa de variables o parámetros que afecten cómo se inicia y se ejecuta el contenedor.*

---

#### ***Características Clave***

- **Configuración en Dockerfile:** *Se especifica en el Dockerfile con la directiva `ENTRYPOINT`. Por ejemplo:*

  ```Dockerfile
  ENTRYPOINT ["nginx", "-g", "daemon off;"]
  ```

  - *Aquí, `nginx` es el programa principal que se ejecutará, y `-g daemon off;` son argumentos pasados al comando principal.*

- **Sustituible por CMD:** *Si se especifica tanto `ENTRYPOINT` como `CMD`, el comando `CMD` proporcionado al ejecutar el contenedor reemplaza los argumentos pasados al `ENTRYPOINT`, permitiendo una ejecución más dinámica.*

- **Interacción con Docker Run:** *Al ejecutar `docker run`, puedes sobrescribir el entrypoint definido en el Dockerfile usando el parámetro `--entrypoint`, lo cual es útil para pruebas, depuración o configuraciones específicas.*

### ***Resumen***

- *En resumen, el entrypoint en Docker define el primer comando que se ejecuta cuando el contenedor se inicia. Proporciona flexibilidad, control y configuración específica para el inicio y la ejecución de aplicaciones dentro de entornos Docker, siendo fundamental para la gestión eficiente de contenedores en despliegues y operaciones de desarrollo.*
