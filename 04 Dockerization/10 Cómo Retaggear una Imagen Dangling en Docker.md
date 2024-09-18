<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->

# ***Cómo Retaggear una Imagen Dangling en Docker***

```bash
docker images -a
REPOSITORY        TAG       IMAGE ID       CREATED       SIZE
<none>            <none>    8422c7d5dbfe   4 days ago    344MB
d4nitrix13/node   exec      ee87e1b066d0   5 days ago    344MB
d4nitrix13/node   shell     287616143143   5 days ago    344MB
d4nitrix13/node   0.1.1     93755b038008   2 weeks ago   344MB
d4nitrix13/node   latest    146b0b14c7a8   2 weeks ago   344MB
ubuntu            22.04     52882761a72a   8 weeks ago   77.9MB
```

**A veces, al trabajar con Docker, puedes encontrarte con imágenes "dangling" (sin etiqueta). Puedes volver a etiquetar una imagen dangling utilizando el comando `docker tag`. Por ejemplo, para etiquetar una imagen con el ID `8422c7d5dbfe`, puedes ejecutar:**

```bash
docker tag 8422c7d5dbfe Application:One
```

---

## ***Recuperar el Tag de una Imagen Dangling***

- *Una imagen puede volverse dangling si se retaggea con el mismo nombre, lo que deja la primera imagen con ese tag en estado dangling. Puedes revertir esta situación reconstruyendo la imagen a partir del Dockerfile original y etiquetándola de nuevo.*

---

### ***Dockerfile Original de la Imagen `8422c7d5dbfe`***

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

### ***Retaggear la Imagen***

**Primero, reconstruye la imagen utilizando el Dockerfile y dale el tag deseado. Por ejemplo:**

```bash
docker build --tag d4nitrix13/node:retags .
```

**La salida de la construcción debería ser similar a:**

```bash
[+] Building 0.1s (9/9) FINISHED
 => [internal] load build definition from Dockerfile                                                                             0.0s
 => => transferring dockerfile: 1.20kB                                                                                           0.0s
 => [internal] load metadata for docker.io/library/ubuntu:22.04                                                                  0.0s
 => [internal] load .dockerignore                                                                                                0.0s
 => => transferring context: 2B                                                                                                  0.0s
 => [1/4] FROM docker.io/library/ubuntu:22.04                                                                                    0.0s
 => [internal] load build context                                                                                                0.0s
 => => transferring context: 30B                                                                                                 0.0s
 => CACHED [2/4] RUN apt update     && apt install -y curl     && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesourc  0.0s
 => CACHED [3/4] WORKDIR /Directory                                                                                              0.0s
 => CACHED [4/4] COPY ./index.js ./                                                                                              0.0s
 => exporting to image                                                                                                           0.0s
 => => exporting layers                                                                                                          0.0s
 => => writing image sha256:8422c7d5dbfeb358bb399f3a48846f07c197d2d87d3bf897000a89b42d1f6a88                                     0.0s
 => => naming to docker.io/d4nitrix13/node:retags                                                                                0.0s
```

---

### ***Verificar las Imágenes***

**Después de reconstruir y etiquetar la imagen, puedes verificar el estado de las imágenes con:**

```bash
docker images -a
```

**La salida debería mostrar que la imagen dangling ahora tiene un tag:**

```bash
REPOSITORY        TAG       IMAGE ID       CREATED       SIZE
d4nitrix13/node   retags    8422c7d5dbfe   4 days ago    344MB
d4nitrix13/node   exec      ee87e1b066d0   5 days ago    344MB
d4nitrix13/node   shell     287616143143   5 days ago    344MB
d4nitrix13/node   0.1.1     93755b038008   2 weeks ago   344MB
d4nitrix13/node   latest    146b0b14c7a8   2 weeks ago   344MB
ubuntu            22.04     52882761a72a   8 weeks ago   77.9MB
```

- *Con estos pasos, puedes retaggear y recuperar imágenes dangling en Docker de manera efectiva.*
