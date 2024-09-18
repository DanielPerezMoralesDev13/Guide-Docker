<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->

# ***Imágenes Dangling***

**Después de seguir esta guía, es posible que te encuentres con algunas imágenes dangling (sin etiqueta) generadas.**

---

## ***Ver todas las imágenes, incluidas las dangling:***

```bash
docker images -a
REPOSITORY           TAG       IMAGE ID       CREATED             SIZE
d4nitrix13/node      exec      ee87e1b066d0   About an hour ago   344MB
d4nitrix13/node      shell     287616143143   2 hours ago         344MB
<none>               <none>    9ef2a364bb41   2 hours ago         344MB  # Imagen dangling
d4nitrix13/node      0.1.1     93755b038008   10 days ago         344MB
d4nitrix13/node      0.1.0     146b0b14c7a8   10 days ago         344MB
d4nitrix13/node      0.1.2     146b0b14c7a8   10 days ago         344MB
d4nitrix13/node      latest    146b0b14c7a8   10 days ago         344MB
ubuntu               22.04     52882761a72a   7 weeks ago         77.9MB
```

---

## ***Filtrar y mostrar solo las imágenes dangling:***

```bash
docker images -af dangling=true
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
<none>       <none>    9ef2a364bb41   2 hours ago   344MB
```

---

## ***Obtener solo los IDs de las imágenes dangling:***

```bash
docker images -aqf dangling=true
9ef2a364bb41
```

---

### ***Nota: La imagen `<none>:<none>` se generó porque modificamos el Dockerfile.***

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me
FROM ubuntu:22.04

RUN apt update \
    && apt install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt-get install -y nodejs

WORKDIR /App

COPY ./index.js ./

EXPOSE 3000

CMD node ./index.js

# Shell form
# CMD node ./index.js $HOME

# Exec form
# CMD [ "node", "./index.js", "$HOME" ]
```

**Para construir la imagen y ejecutar el contenedor :**

```bash
docker build -t d4nitrix13/node:exec ./
docker run -it --name 00-App-nodejs-exec d4nitrix13/node:exec
```

- *Luego detenimos el contenedor `00-App-nodejs-exec`, por lo tanto teníamos un contenedor que no estaba en ejecución y que estaba usando la imagen `d4nitrix13/node`.*

- *Después de modificamos el Dockerfile y el fichero `./index.js`, reconstruimos la imagen utilizando el mismo tag `d4nitrix13/node:exec`. Esto resultó en un cambio en el contenido de la imagen, lo cual es importante tener en cuenta ya que reemplazó la imagen anterior con el mismo tag.*

---

### ***Ejemplo de modificación en `./index.js`***

```javascript
// Autor: Daniel Benjamin Perez Morales
// GitHub: https://github.com/DanielPerezMoralesDev13
// Correo electrónico: danielperezdev@proton.me
const { createServer } = require('node:http');

const hostname = '0.0.0.0';
const port = 3000;

const server = createServer((req, res) => {
    console.log("Request from", req.socket.remoteAddress);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

// Ver si recibimos la señal SIGTERM
process.on("SIGTERM", () => {
    console.log("Received SIGTERM");
    // Limpiar Sockets, Ficheros, Liberar memoria
    process.exit(0);
});

server.listen(port, hostname, () => {
    // Paramtros de consola es una lista
    console.log(process.argv);
    console.log(`Server running at http://${hostname}:${port}/`);
});
```

**La linea que agregamos fue:**

```javascript
// Paramtros de consola es una lista
console.log(process.argv);
```

---

### ***Reconstrucción de la imagen con el mismo tag:***

```bash
docker build -t d4nitrix13/node:exec ./
```

- *Después de esto, la imagen anteriormente etiquetada como `d4nitrix13/node:exec` con ID `9ef2a364bb41` se convirtió en dangling porque el tag fue reasignado a la nueva imagen con ID `ee87e1b066d0`.*

---

### ***Estado de las imágenes:***

```bash
docker images
REPOSITORY        TAG       IMAGE ID       CREATED         SIZE
d4nitrix13/node   exec      ee87e1b066d0   3 hours ago     344MB   # Nueva imagen con las modificaciones
d4nitrix13/node   shell     287616143143   4 hours ago     344MB
<none>            <none>    9ef2a364bb41   4 hours ago     344MB   # Imagen dangling debido a la reetiquetación
d4nitrix13/node   0.1.0     146b0b14c7a8   11 days ago     344MB
d4nitrix13/node   0.1.2     146b0b14c7a8   11 days ago     344MB
d4nitrix13/node   latest    146b0b14c7a8   11 days ago     344MB
d4nitrix13/node   0.1.1     93755b038008   11 days ago     344MB
ubuntu            22.04     52882761a72a   7 weeks ago     77.9MB
```

> [!NOTE]
> **Consideraciones:** *Es crucial gestionar adecuadamente las imágenes Docker y evitar reetiquetar imágenes existentes si no se tiene la intención de eliminar completamente la imagen anterior. Esto puede conducir a la creación involuntaria de imágenes dangling, lo cual puede ser potencialmente problemático.*

**Si has modificado el Dockerfile y el fichero `./index.js`, es posible que te encuentres con imágenes dangling después de reetiquetar una imagen existente.**

## ***Dockerfile Modificado***

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# las imágenes ya vienen actualizadas normalmente, por eso no es necesario poner `apt upgrade`
FROM ubuntu:22.04

# para ejecutar comandos en el contenedor se usa la directiva `RUN`
RUN apt update \
    && apt install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt-get install -y nodejs

# para indicar un directorio de trabajo, es importante tener en cuenta que después de usar este comando nos encontraremos en el directorio /Directory
WORKDIR /Directory

# No es necesario usar `/Directory`, ya que nos encontramos en ese directorio; podemos usar la ruta relativa `./` o incluso solo el punto `.`
COPY ./index.js ./

EXPOSE 3000

# para iniciar el servidor HTTP, lo hacemos mediante `CMD`. Normalmente sería bash, pero en este caso ponemos `node ./index.js`. Recuerda que ya estamos en el directorio /Directory
CMD node ./index.js

# Forma Shell
# CMD node ./index.js $HOME

# Forma Exec
# CMD [ "node", "./index.js", "$HOME" ]
```

---

### ***Construcción de la Imagen***

**Para aplicar los cambios y reetiquetar la imagen, ejecuta el siguiente comando en el directorio donde se encuentra el Dockerfile:**

```bash
docker build -t d4nitrix13/node:retags .
[+] Building 0.5s (9/9) FINISHED                                                                                                      docker:default
 => [internal] load build definition from Dockerfile                                                                                            0.0s
 => => transferring dockerfile: 1.19kB                                                                                                          0.0s
 => [internal] load metadata for docker.io/library/ubuntu:22.04                                                                                 0.0s
 => [internal] load .dockerignore                                                                                                               0.0s
 => => transferring context: 2B                                                                                                                 0.0s
 => [1/4] FROM docker.io/library/ubuntu:22.04                                                                                                   0.0s
 => [internal] load build context                                                                                                               0.1s
 => => transferring context: 848B                                                                                                               0.0s
 => CACHED [2/4] RUN apt update     && apt install -y curl     && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh       0.0s
 => [3/4] WORKDIR /Directory                                                                                                                    0.1s
 => [4/4] COPY ./index.js ./                                                                                                                    0.1s
 => exporting to image                                                                                                                          0.1s
 => => exporting layers                                                                                                                         0.1s
 => => writing image sha256:8422c7d5dbfeb358bb399f3a48846f07c197d2d87d3bf897000a89b42d1f6a88                                                    0.0s
 => => naming to docker.io/d4nitrix13/node:retags                                                                                               0.0s
```

---

### ***Ejecución del Contenedor y Detención***

**Una vez construida la imagen con el nuevo tag `d4nitrix13/node:retags`, puedes ejecutar un contenedor basado en esta imagen y luego lo detenemos:**

```bash
docker run -it --name App-nodejs-v4 d4nitrix13/node:retags 
[ '/usr/bin/node', '/Directory/index.js' ]
Server running at http://0.0.0.0:3000/
^C
```

---

### ***Estado de las Imágenes***

**Después de la reconstrucción y ejecución del contenedor:**

```bash
docker images
REPOSITORY         TAG       IMAGE ID       CREATED         SIZE
d4nitrix13/node    retags    8422c7d5dbfe   1 minute ago    344MB   # Imagen reetiquetada con cambios en el código
<none>             <none>    f2b09fe8a09d   5 minutes ago   344MB   # Imagen anterior, ahora dangling
d4nitrix13/node    exec      ee87e1b066d0   3 hours ago     344MB
d4nitrix13/node    shell     287616143143   4 hours ago     344MB
d4nitrix13/node    0.1.0     146b0b14c7a8   11 days ago     344MB
d4nitrix13/node    0.1.2     146b0b14c7a8   11 days ago     344MB
d4nitrix13/node    latest    146b0b14c7a8   11 days ago     344MB
d4nitrix13/node    0.1.1     93755b038008   11 days ago     344MB
ubuntu             22.04     52882761a72a   7 weeks ago     77.9MB
```

---

### ***Consideraciones Importantes***

- *Al reetiquetar una imagen existente (`d4nitrix13/node:exec` a `d4nitrix13/node:retags` en este caso), la imagen anterior con el tag `d4nitrix13/node:exec` se convierte en dangling (`<none>:<none>`). Es crucial gestionar adecuadamente las imágenes para evitar acumulaciones innecesarias de imágenes dangling, lo cual puede ocupar espacio y complicar la administración de Docker.*

---

### ***Estado Actual de Imágenes y Contenedores***

---

#### ***Imágenes Docker***

```bash
docker images -a
REPOSITORY        TAG       IMAGE ID       CREATED         SIZE
d4nitrix13/node   retags    8422c7d5dbfe   8 minutes ago   344MB
d4nitrix13/node   exec      ee87e1b066d0   3 hours ago     344MB
d4nitrix13/node   shell     287616143143   4 hours ago     344MB
<none>            <none>    9ef2a364bb41   4 hours ago     344MB
d4nitrix13/node   0.1.0     146b0b14c7a8   11 days ago     344MB
d4nitrix13/node   0.1.2     146b0b14c7a8   11 days ago     344MB
d4nitrix13/node   latest    146b0b14c7a8   11 days ago     344MB
d4nitrix13/node   0.1.1     93755b038008   11 days ago     344MB
ubuntu            22.04     52882761a72a   7 weeks ago     77.9MB
```

---

#### ***Contenedores Docker***

```bash
docker ps -a
CONTAINER ID   IMAGE                    COMMAND                  CREATED          STATUS                        PORTS     NAMES
ede0894c8915   8422c7d5dbfe             "/bin/sh -c 'node ./…"   3 minutes ago    Exited (130) 3 minutes ago              App-nodejs-v4-retags
e0040176c8ab   d4nitrix13/node:exec     "node ./index.js $HO…"   3 hours ago      Exited (0) 3 hours ago                   00-App-nodejs-exec
fc8ccfa3d487   d4nitrix13/node:shell    "/bin/sh -c 'node ./…"   4 hours ago      Exited (137) 4 hours ago                 00-App-nodejs-shell
c404b9ce8667   d4nitrix13/node          "/bin/sh -c 'node ./…"   11 days ago      Exited (137) 4 hours ago                 00-App-nodejs-v4
b064df325976   d4nitrix13/node:0.1.1    "/bin/sh -c 'node ./…"   11 days ago      Exited (130) 11 days ago                 00-App-nodejs-v3
833b429d20c5   d4nitrix13/node:0.1.1    "/bin/sh -c 'node ./…"   11 days ago      Exited (130) 11 days ago                 00-App-nodejs-v2
6f68557da99b   ubuntu:22.04             "/bin/bash"              2 weeks ago      Exited (137) 13 days ago                 App-00-Nodejs
0f3fdde42f5a   ubuntu:22.04             "/bin/bash"              2 weeks ago      Exited (137) 2 weeks ago                 test-client
```

---

### ***Modificación del Dockerfile y Reconstrucción de la Imagen***

---

### ***Dockerfile Modificado:***

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Las imágenes ya vienen actualizadas normalmente, por lo que no es necesario poner `apt upgrade`
FROM ubuntu:22.04

# Para ejecutar comandos en el contenedor se usa la directiva `RUN`
RUN apt update \
    && apt install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt-get install -y nodejs

# Para indicar un directorio de trabajo, usamos `/Code` en lugar de `/App` como en la versión anterior
WORKDIR /Code

# No es necesario usar `/Code` como ruta absoluta, ya que nos encontramos en ese directorio; podemos usar la ruta relativa `./` o incluso solo el punto `.`
COPY ./index.js ./

EXPOSE 3000

# Para iniciar el servidor HTTP, lo hacemos mediante `CMD`. Normalmente sería bash, pero en este caso ponemos `node ./index.js`. Recuerda que ya estamos en el directorio /Code
CMD node ./index.js

# Forma Shell
# CMD node ./index.js $HOME

# Forma Exec
# CMD [ "node", "./index.js", "$HOME" ]
```

---

#### ***Reconstrucción de la Imagen***

```bash
docker build -t d4nitrix13/node:retags .
[+] Building 0.2s (9/9) FINISHED                                                                                                      docker:default
 => [internal] load build definition from Dockerfile                                                                                            0.0s
 => => transferring dockerfile: 1.18kB                                                                                                          0.0s
 => [internal] load metadata for docker.io/library/ubuntu:22.04                                                                                 0.0s
 => [internal] load .dockerignore                                                                                                               0.0s
 => => transferring context: 2B                                                                                                                 0.0s
 => [1/4] FROM docker.io/library/ubuntu:22.04                                                                                                   0.0s
 => [internal] load build context                                                                                                               0.0s
 => => transferring context: 30B                                                                                                                0.0s
 => CACHED [2/4] RUN apt update     && apt install -y curl     && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh       0.0s
 => [3/4] WORKDIR /Code                                                                                                                         0.0s
 => [4/4] COPY ./index.js ./                                                                                                                    0.0s
 => exporting to image                                                                                                                          0.1s
 => => exporting layers                                                                                                                         0.0s
 => => writing image sha256:827973465e31401bc8c1dea7d0edce85bd728db6e52bd20d84c3f4bb74d8105e                                                    0.0s
 => => naming to docker.io/d4nitrix13/node:retags                                                                                               0.0s
```

---

### ***Análisis Después de la Reconstrucción***

---

#### ***Estado Actual de Imágenes***

```bash
docker images -a
REPOSITORY        TAG       IMAGE ID       CREATED          SIZE
d4nitrix13/node   retags    827973465e31   3 seconds ago    344MB   # Nueva imagen construida con los cambios en el Dockerfile
<none>             <none>    8422c7d5dbfe   8 minutes ago    344MB   # Imagen anterior con el mismo tag, ahora dangling
d4nitrix13/node   exec      ee87e1b066d0   3 hours ago      344MB
d4nitrix13/node   shell     287616143143   4 hours ago      344MB
<none>             <none>    9ef2a364bb41   4 hours ago      344MB
d4nitrix13/node   0.1.0     146b0b14c7a8   11 days ago      344MB
d4nitrix13/node   0.1.2     146b0b14c7a8   11 days ago      344MB
d4nitrix13/node   latest    146b0b14c7a8   11 days ago      344MB
d4nitrix13/node   0.1.1     93755b038008   11 days ago      344MB
ubuntu            22.04     52882761a72a   7 weeks ago      77.9MB
```

---

#### ***Contenedores Actuales***

---

### ***Contenedores:***

```bash
docker ps -a
CONTAINER ID   IMAGE                   COMMAND                  CREATED          STATUS                        PORTS     NAMES
ede0894c8915   8422c7d5dbfe            "/bin/sh -c 'node ./…"   3 minutes ago    Exited (130) 3 minutes ago              App-nodejs-v4-retags
e0040176c8ab   d4nitrix13/node:exec    "node ./index.js $HO…"   3 hours ago      Exited (0) 3 hours ago                   00-App-nodejs-exec
fc8ccfa3d487   d4nitrix13/node:shell   "/bin/sh -c 'node ./…"   4 hours ago      Exited (137) 4 hours ago                 00-App-nodejs-shell
c404b9ce8667   d4nitrix13/node         "/bin/sh -c 'node ./…"   11 days ago      Exited (137) 4 hours ago                 00-App-nodejs-v4
b064df325976   d4nitrix13/node:0.1.1   "/bin/sh -c 'node ./…"   11 days ago      Exited (130) 11 days ago                 00-App-nodejs-v3
833b429d20c5   d4nitrix13/node:0.1.1   "/bin/sh -c 'node ./…"   11 days ago      Exited (130) 11 days ago                 00-App-nodejs-v2
6f68557da99b   ubuntu:22.04            "/bin/bash"              2 weeks ago      Exited (137) 13 days ago                 App-00-Nodejs
0f3fdde42f5a   ubuntu:22.04            "/bin/bash"              2 weeks ago      Exited (137) 2 weeks ago                 test-client
```

---

### ***Situación de la imagen "dangling":***

- *Después de reconstruir la imagen `d4nitrix13/node:retags`, la cual tenía el `IMAGE ID` `8422c7d5dbfe`, se convirtió en una imagen "dangling" porque fue reemplazada por una nueva versión con el mismo tag `d4nitrix13/node:retags`. Esto ocurre porque las imágenes en Docker se identifican por su `IMAGE ID` y no por su nombre o tag solamente.*

---

### ***Explicación adicional:***

> [!TIP]
> *Cuando se sobrescribe una imagen con el mismo tag, la imagen anterior con ese tag se convierte en "dangling" porque ya no está asociada a ningún tag específico. En Docker, esto es normal y es un comportamiento esperado cuando se reutilizan los mismos tags para imágenes nuevas.*
