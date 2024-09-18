<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->

# ***Imágenes Preconfiguradas***

- *En Docker, ya existen imágenes que tienen ciertos paquetes como Node.js, curl, entre otros, ya instalados. Estas imágenes se conocen como imágenes preconfiguradas. Normalmente, estas imágenes preconfiguradas usan Debian como sistema operativo base.*

- **Este es el contenido del fichero dockerfile:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

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

# Shell form
# CMD node ./index.js $HOME

# Exec form
# CMD [ "node", "./index.js", "$HOME" ]


# ENTRYPOINT [ "ls" ]
# CMD [ "-l" ]
```

---

## ***Dockerfile***

***Este es el contenido del Dockerfile mejorado:***

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# las imagenes ya vienen actualizadas normalmente por eso no es necesario poner `apt upgrade`
FROM node:lts

# para indicar un directorio de trabajo cabe recalcar que despues de usar este comando nos encontraremos en el directorio /App
WORKDIR /App

# No es necesario poner `/App` ruta absoluta por que ya nos econtramos en ese directorio le podemos pasar la ruta relativa `./` se puede poner solo el punto `.`

COPY ./index.js ./

EXPOSE 3000

# para poner en marcha el servido http lo hacemos mediante `CMD` normalmente es bash pero en este caso ponemos `node ./index.js` recordar que ya estamos en el directorio /App
CMD node ./index.js
```

---

### ***Descripción del Proceso***

1. **FROM node:lts:** *Utiliza la imagen base de Node.js en su versión LTS.*
2. **WORKDIR /App:** *Establece el directorio de trabajo a `/App`.*
3. **COPY ./index.js ./:** *Copia el fichero `index.js` desde el contexto de construcción al directorio de trabajo en la imagen.*
4. **EXPOSE 3000:** *Expone el puerto 3000 para que la aplicación sea accesible desde el exterior.*
5. **CMD node ./index.js:** *Ejecuta la aplicación con Node.js utilizando la forma Shell.*

---

### ***Información Adicional***

- **Puedes encontrar más detalles sobre las imágenes de Node.js en el [enlace oficial](https://hub.docker.com/_/node/ "https://hub.docker.com/_/node/"). Aquí hay un ejemplo de algunos tags disponibles para la imagen de Node.js:**

```plaintext
22-alpine3.19, 22.3-alpine3.19, 22.3.0-alpine3.19, alpine3.19, current-alpine3.19
22-alpine, 22-alpine3.20, 22.3-alpine, 22.3-alpine3.20, 22.3.0-alpine, 22.3.0-alpine3.20, alpine, alpine3.20, current-alpine, current-alpine3.20
22, 22-bookworm, 22.3, 22.3-bookworm, 22.3.0, 22.3.0-bookworm, bookworm, current, current-bookworm, latest
22-bookworm-slim, 22-slim, 22.3-bookworm-slim, 22.3-slim, 22.3.0-bookworm-slim, 22.3.0-slim, bookworm-slim, current-bookworm-slim, current-slim, slim
22-bullseye, 22.3-bullseye, 22.3.0-bullseye, bullseye, current-bullseye
22-bullseye-slim, 22.3-bullseye-slim, 22.3.0-bullseye-slim, bullseye-slim, current-bullseye-slim
```

- *Si tienes la extensión oficial de Docker en Visual Studio Code (VSCode), puedes obtener un listado de todas las imágenes disponibles con el tag `lts` posicionando el cursor sobre `lts` y presionando `Ctrl + Espacio`.*

---

### ***Extensión de Docker en VSCode***

**Nombre:** *Docker*
**ID:** *ms-azuretools.vscode-docker*
**Descripción:** *Facilita la creación, gestión y depuración de aplicaciones contenedorizadas.*
**Versión:** *`1.29.1`*
**Editor:** *Microsoft*
**Vínculo de VS Marketplace:** *[https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker "https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker")*

### ***Creación de la Imagen***

**Ejecuta el siguiente comando para construir la imagen:**

```bash
docker build -t d4nitrix13/node:preconfigurado .
```

```bash
docker build -t d4nitrix13/node:preconfigurado .
[+] Building 72.9s (8/8) FINISHED                                                            docker:default
 => [internal] load build definition from Dockerfile                                                   0.0s
 => => transferring dockerfile: 819B                                                                   0.0s
 => [internal] load metadata for docker.io/library/node:lts                                            1.9s
 => [internal] load .dockerignore                                                                      0.0s
 => => transferring context: 2B                                                                        0.0s
 => [1/3] FROM docker.io/library/node:lts@sha256:b849bc4078c3e16a38d72749ab8faeacbcc6c3bdb742399b4a5  69.8s
 => => resolve docker.io/library/node:lts@sha256:b849bc4078c3e16a38d72749ab8faeacbcc6c3bdb742399b4a59  0.0s
 => => sha256:f742f6676a2cce42263ba0b64363145b548aca8d4b13d832562210620d3b09fa 2.49kB / 2.49kB         0.0s
 => => sha256:3d3ad458c4de187faac236c57693a317b3975532ed94764a82190ba6c04a2268 6.60kB / 6.60kB         0.0s
 => => sha256:5651b5803b186603909f6c77cdff7bdd4ba7ab8ca4ebccb5a6b0be9037b4e5b6 24.05MB / 24.05MB      11.1s
 => => sha256:b849bc4078c3e16a38d72749ab8faeacbcc6c3bdb742399b4a5974a89fc93261 6.41kB / 6.41kB         0.0s
 => => sha256:fea1432adf0957427b45b0ef8e37cbfe045b7cf8c15e3f43e48f2f613e214d16 49.58MB / 49.58MB      22.1s
 => => sha256:3873416e6a335157d669c6193a256dfb289331d669d87f200e4eed1f19f9ebb9 64.14MB / 64.14MB      20.6s
 => => sha256:8a142b8b0e695954ed154c13c098ede4e217dcb99aa7158e34361604191822bd 211.21MB / 211.21MB    56.9s
 => => sha256:3f02c49845cb2fd96da0dc69da34c79d3dacf9f2e7d73844f23d669044d1a84a 3.33kB / 3.33kB        21.0s
 => => sha256:844f6c465911db2f9f906a2d43281bef8085385850902335dfc8db78e8fabc24 48.02MB / 48.02MB      33.3s
 => => sha256:ba5ea3d48002d0bd8462bccdfefcda91a95d7e7cce92def1e15c0d7c9b5eac57 1.25MB / 1.25MB        22.8s
 => => extracting sha256:fea1432adf0957427b45b0ef8e37cbfe045b7cf8c15e3f43e48f2f613e214d16              3.0s
 => => sha256:929ce2e055651b9854eb01050c1f1ddf2e503f9f8664e69b9eef4faeecd7d85f 452B / 452B            23.0s
 => => extracting sha256:5651b5803b186603909f6c77cdff7bdd4ba7ab8ca4ebccb5a6b0be9037b4e5b6              0.9s
 => => extracting sha256:3873416e6a335157d669c6193a256dfb289331d669d87f200e4eed1f19f9ebb9              3.8s
 => => extracting sha256:8a142b8b0e695954ed154c13c098ede4e217dcb99aa7158e34361604191822bd              9.3s
 => => extracting sha256:3f02c49845cb2fd96da0dc69da34c79d3dacf9f2e7d73844f23d669044d1a84a              0.0s
 => => extracting sha256:844f6c465911db2f9f906a2d43281bef8085385850902335dfc8db78e8fabc24              3.0s
 => => extracting sha256:ba5ea3d48002d0bd8462bccdfefcda91a95d7e7cce92def1e15c0d7c9b5eac57              0.1s
 => => extracting sha256:929ce2e055651b9854eb01050c1f1ddf2e503f9f8664e69b9eef4faeecd7d85f              0.0s
 => [internal] load build context                                                                      0.0s
 => => transferring context: 30B                                                                       0.0s
 => [2/3] WORKDIR /App                                                                                 0.9s
 => [3/3] COPY ./index.js ./                                                                           0.1s
 => exporting to image                                                                                 0.1s
 => => exporting layers                                                                                0.0s
 => => writing image sha256:e91cd2aec686f3b580b9c4c7dacb6a001bbdde357fdb995f2f7ad51c5e86183a           0.0s
 => => naming to docker.io/d4nitrix13/node:preconfigurado                                              0.0s

 1 warning found (use --debug to expand):
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 18)
```

**El comando `docker build -t d4nitrix13/node:preconfigurado .` está construyendo una imagen de Docker utilizando el Dockerfile en el directorio actual. Aquí hay una explicación de las partes importantes del proceso y del Dockerfile:**

1. **docker build:** *Este comando construye una imagen a partir de un Dockerfile.*
2. **-t d4nitrix13/node:preconfigurado:** *Esta opción etiqueta la imagen con el nombre `d4nitrix13/node` y la etiqueta `preconfigurado`.*
3. **".":** *Este punto indica que el contexto de construcción es el directorio actual.*

---

## ***Desglose del Dockerfile***

```Dockerfile
# Las imágenes ya vienen actualizadas normalmente por eso no es necesario poner `apt upgrade`
FROM node:lts

# Para indicar un directorio de trabajo. Cabe recalcar que después de usar este comando nos encontraremos en el directorio /App
WORKDIR /App

# No es necesario poner `/App` ruta absoluta porque ya nos encontramos en ese directorio. Le podemos pasar la ruta relativa `./` se puede poner solo el punto `.`
COPY ./index.js ./

# Expone el puerto 3000 para que pueda ser accesible desde el exterior
EXPOSE 3000

# Para poner en marcha el servidor HTTP lo hacemos mediante `CMD`. Normalmente es bash, pero en este caso ponemos `node ./index.js`. Recordar que ya estamos en el directorio /App.
CMD node ./index.js
```

---

### ***Detalles del proceso de construcción***

1. **[internal] load build definition from Dockerfile:** *Carga la definición de construcción desde el Dockerfile.*
2. **[internal] load metadata for docker.io/library/node:lts:** *Carga los metadatos de la imagen base `node:lts`.*
3. **[internal] load .dockerignore:** *Carga el fichero `.dockerignore`.*
4. **[1/3] FROM docker.io/library/node:lts@sha256::** *Descarga y resuelve la imagen base de `node:lts`.*
5. **[2/3] WORKDIR /App:** *Establece el directorio de trabajo en `/App`.*
6. **[3/3] COPY ./index.js ./:** *Copia `index.js` al directorio de trabajo en la imagen.*
7. **exporting to image:** *Exporta la imagen construida.*

### ***Advertencia***

> [!WARNING]
> *La advertencia `JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 18)` sugiere que es mejor usar una forma JSON para el comando `CMD` en lugar de una cadena simple. Esto se recomienda para evitar comportamientos no deseados relacionados con las señales del sistema operativo. Para corregir esto, puedes cambiar:*

```Dockerfile
CMD node ./index.js
```

**a:**

```Dockerfile
CMD ["node", "./index.js"]
```

- *Esto asegura que Docker gestione correctamente las señales enviadas al contenedor.*

---

### ***Listar las Imágenes Disponibles***

**Para listar las imágenes disponibles, ejecuta el siguiente comando:**

```bash
docker images
```

**Ejemplo de salida del comando:**

```bash
REPOSITORY        TAG              IMAGE ID       CREATED          SIZE
d4nitrix13/node   preconfigurado   e91cd2aec686   12 minutes ago   1.1GB
```

---

### ***Crear y Ejecutar el Contenedor***

**Para crear y ejecutar el contenedor, usa el siguiente comando:**

```bash
docker run -it --rm -p 3000:3000 d4nitrix13/node:preconfigurado
```

**Salida esperada:**

```bash
[ '/usr/local/bin/node', '/App/index.js' ]
Server running at http://0.0.0.0:3000/
```

---

### ***Hacer una Petición***

**Para hacer una petición al servidor en el contenedor, utiliza `curl`:**

```bash
curl http://127.0.0.1:3000/
```

**Salida esperada:**

```plaintext
Hello World
```

---

### ***Ejecutar un Shell Interactivo***

**Para ejecutar un shell interactivo (TTY) en el único contenedor en marcha, usa el siguiente comando:**

```bash
docker exec -it $(docker ps -qf status=running) bash
```

- *Con estos pasos, podrás listar las imágenes disponibles, ejecutar el contenedor, hacer una petición al servidor y acceder a un shell interactivo en el contenedor.*

---

### ***Ver la Versión del Sistema del Contenedor***

**Para ver la versión del sistema operativo dentro del contenedor, ejecuta el siguiente comando:**

```bash
root@01b82c38db97:/App# cat /etc/os-release
```

**Salida esperada:**

```bash
PRETTY_NAME="Debian GNU/Linux 12 (bookworm)"
NAME="Debian GNU/Linux"
VERSION_ID="12"
VERSION="12 (bookworm)"
VERSION_CODENAME=bookworm
ID=debian
HOME_URL="https://www.debian.org/"
SUPPORT_URL="https://www.debian.org/support"
BUG_REPORT_URL="https://bugs.debian.org/"
```

---

### ***Verificar la Presencia de Git***

**Para verificar que Git está instalado en el contenedor, usa el siguiente comando:**

```bash
root@01b82c38db97:/App# git --version
```

**Salida esperada:**

```bash
git version 2.39.2
```

---

### ***Explicación del Tamaño de la Imagen***

- *La razón por la que la imagen es grande se debe a que, además de Node.js, incluye muchos paquetes binarios útiles para el desarrollo diario, como Git, entre otros. Esto hace que la imagen sea más pesada pero también más completa para el desarrollo.*

---

### ***Opciones para Imágenes Más Ligeras***

- *Si prefieres una imagen más minimalista, puedes utilizar las versiones con el tag `slim`. Estas imágenes contienen solo los paquetes mínimos necesarios para ejecutar Node.js, lo que las hace más ligeras.*

---

### ***Ejemplo de Tags `slim`***

**Slim** **en el contexto de las imágenes Docker significa una versión optimizada y reducida en tamaño de una imagen base. Aquí está la mejora:**

---

### ***Qué es Slim en Imágenes Docker***

**Slim** **es un término utilizado para describir versiones minimizadas de imágenes base en Docker. A continuación se detallan sus características y uso:**

- **Significado de Slim:** **El término "slim" se refiere a una versión reducida y optimizada de una imagen base en Docker, donde se eliminan componentes no esenciales para reducir el tamaño final de la imagen.**

- **Siglas:** **No tiene siglas específicas asociadas. Simplemente se refiere a una imagen con tamaño reducido.**

- **Características:**
  - **Tamaño Reducido:** **Elimina componentes innecesarios y paquetes adicionales, manteniendo solo los esenciales para ejecutar la aplicación específica.**
  - **Optimización de Recursos:** **Mejora el rendimiento al reducir el consumo de recursos del sistema.**
  - **Específico para Aplicaciones:** **Adecuado para aplicaciones donde se requiere una imagen ligera y solo se necesitan los componentes mínimos para su funcionamiento.**

- **Uso:**
  - **Desarrollo y Producción:** **Ideal para ambientes de desarrollo y producción donde se busca minimizar el espacio de almacenamiento y la superficie de ataque de la imagen.**
  - **Optimización de Despliegues:** **Ayuda a optimizar el despliegue de contenedores al reducir el tiempo de descarga y el uso de red.**

- *En resumen, las imágenes Docker etiquetadas como "slim" son una opción preferida cuando se desea reducir el tamaño y mejorar la eficiencia de las aplicaciones contenerizadas, sin comprometer la funcionalidad necesaria para ejecutar la aplicación.*

**Algunos ejemplos de tags `slim` son:**

```plaintext
22-bookworm-slim, 22-slim, 22.3-bookworm-slim, 22.3-slim, 22.3.0-bookworm-slim, 22.3.0-slim, bookworm-slim, current-bookworm-slim, current-slim, slim
22-bullseye, 22.3-bullseye, 22.3.0-bullseye, bullseye, current-bullseye
22-bullseye-slim, 22.3-bullseye-slim, 22.3.0-bullseye-slim, bullseye-slim, current-bullseye-slim
```

- *Usando estos tags, puedes reducir significativamente el tamaño de la imagen si no necesitas los paquetes adicionales.*

---

### ***Dockerfile Actualizado***

**Se ha modificado el Dockerfile para utilizar la imagen `node:lts-slim`, optimizando así el tamaño de la imagen:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Utiliza la imagen base de Node.js en su versión LTS optimizada
FROM node:lts-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /App

# Copia el fichero `index.js` desde el contexto de construcción al directorio de trabajo en la imagen
COPY ./index.js ./

# Expone el puerto 3000 para que la aplicación sea accesible desde el exterior
EXPOSE 3000

# Ejecuta la aplicación con Node.js
CMD node ./index.js
```

---

### ***Construcción de la Imagen***

**Se construye la imagen utilizando el Dockerfile actualizado:**

```bash
docker build -t d4nitrix13/node:slim .
```

```bash
[+] Building 16.2s (8/8) FINISHED                                                                    docker:default
 => [internal] load build definition from Dockerfile                                                           0.2s
 => => transferring dockerfile: 824B                                                                           0.0s
 => [internal] load metadata for docker.io/library/node:lts-slim                                               1.7s
 => [internal] load .dockerignore                                                                              0.0s
 => => transferring context: 2B                                                                                0.0s
 => [1/3] FROM docker.io/library/node:lts-slim@sha256:cf8ed52d8dc93835e5f4cda89aaa63a6157babe7dffb19227e97a8  13.6s
 => => resolve docker.io/library/node:lts-slim@sha256:cf8ed52d8dc93835e5f4cda89aaa63a6157babe7dffb19227e97a89  0.0s
 => => sha256:bc0c71ec15baa93cc6a5b6b4ba149ceea36c10286a285171338df52794bef4ab 3.31kB / 3.31kB                 0.7s
 => => sha256:b6eee747f3db87aa901200402d1b4bf55ea73e029fe18dc382888f75680e9a96 40.56MB / 40.56MB              10.3s
 => => sha256:cf8ed52d8dc93835e5f4cda89aaa63a6157babe7dffb19227e97a8989a6269ed 6.49kB / 6.49kB                 0.0s
 => => sha256:fb1ba95488bd8839f5d28ac0f6372ded3121d68850d0a0835d848cdc361efe17 1.93kB / 1.93kB                 0.0s
 => => sha256:ba03f9153c80226a3c758662f652fb081273dc4752215a8af25da659dda17143 6.88kB / 6.88kB                 0.0s
 => => sha256:2cc3ae149d28a36d28d4eefbae70aaa14a0c9eab588c3790f7979f310b893c44 29.15MB / 29.15MB               9.5s
 => => sha256:522d2fdafee1e21f8d63f31fbc2b73692142661680f6382f4fc352cde58fcd79 1.72MB / 1.72MB                 2.4s
 => => sha256:4678a4e586010ca9c8949e8dc330ca5361dbd5a0fe255adc416f891477439aad 454B / 454B                     3.4s
 => => extracting sha256:2cc3ae149d28a36d28d4eefbae70aaa14a0c9eab588c3790f7979f310b893c44                      1.7s
 => => extracting sha256:bc0c71ec15baa93cc6a5b6b4ba149ceea36c10286a285171338df52794bef4ab                      0.0s
 => => extracting sha256:b6eee747f3db87aa901200402d1b4bf55ea73e029fe18dc382888f75680e9a96                      1.9s
 => => extracting sha256:522d2fdafee1e21f8d63f31fbc2b73692142661680f6382f4fc352cde58fcd79                      0.1s
 => => extracting sha256:4678a4e586010ca9c8949e8dc330ca5361dbd5a0fe255adc416f891477439aad                      0.0s
 => [internal] load build context                                                                              0.0s
 => => transferring context: 30B                                                                               0.0s
 => [2/3] WORKDIR /App                                                                                         0.5s
 => [3/3] COPY ./index.js ./                                                                                   0.0s
 => exporting to image                                                                                         0.1s
 => => exporting layers                                                                                        0.0s
 => => writing image sha256:6534ebe4c0da64658e5b099bde411a58ad3497b363f16384a53cad7b5d81c004                   0.0s
 => => naming to docker.io/d4nitrix13/node:slim                                                                0.0s

 1 warning found (use --debug to expand):
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 18)
```

---

### ***Comparación de Tamaños de Imágenes***

**Se verifica la diferencia de tamaño entre la imagen original y la nueva imagen slim:**

```bash
docker images
```

---

### ***Resultado***

```bash
REPOSITORY        TAG              IMAGE ID       CREATED              SIZE
d4nitrix13/node   slim             6534ebe4c0da   About a minute ago   199MB
d4nitrix13/node   preconfigurado   e91cd2aec686   32 minutes ago       1.1GB
```

---

### ***Explicación***

- **Cambios en el Dockerfile:** **Se ha cambiado la base de la imagen a `node:lts-slim` para reducir el tamaño total de la imagen Docker, manteniendo la funcionalidad esencial para ejecutar la aplicación.**
  
- **Construcción y Comparación:** **Se ha construido la nueva imagen y se ha verificado que el tamaño se ha reducido significativamente, de 1.1GB a 199MB, lo cual mejora la eficiencia en términos de almacenamiento y despliegue.**

- *Esta optimización con la versión slim de la imagen Node.js es recomendable cuando se busca minimizar el tamaño de las imágenes Docker, especialmente en entornos donde se valora la eficiencia y la optimización de recursos.*

---

### ***Ejecución del Contenedor y Cambio de Comando por Defecto***

**Se ejecuta el contenedor utilizando `bash` como comando por defecto gracias a la directiva `CMD` en el Dockerfile:**

```bash
docker run -it --rm -p 3000:3000 d4nitrix13/node:slim bash
root@8158e1ce7bb6:/App#
```

---

### ***Verificación de Paquetes Instalados***

**Dentro del contenedor, se verifican las versiones de Node.js y npm disponibles:**

```bash
root@8158e1ce7bb6:/App# node --version
v20.15.0
root@8158e1ce7bb6:/App# npm --version
10.7.0
```

---

### ***Ejecución de la Aplicación***

**Se ejecuta el script `index.js` dentro del directorio `/App`:**

```bash
root@8158e1ce7bb6:/App# node index.js 
[ '/usr/local/bin/node', '/App/index.js' ]
Server running at http://0.0.0.0:3000/
```

---

### ***Explicación mas Detallada***

- **Cambio de Comando por Defecto:** **Al utilizar `bash` como comando al ejecutar el contenedor, se accede a un shell interactivo dentro del contenedor, lo cual permite realizar comprobaciones y ejecutar comandos adicionales según sea necesario.**

- **Paquetes Instalados:** **La imagen `d4nitrix13/node:slim` está configurada para contener solo los paquetes esenciales necesarios para ejecutar Node.js, optimizando así el tamaño y mejorando la eficiencia del contenedor.**

- **Ejecución de la Aplicación:** **Se verifica que la aplicación `index.js` se ejecuta correctamente en el puerto 3000 dentro del contenedor, confirmando que Node.js está configurado adecuadamente.**

- *Este enfoque garantiza que la imagen Docker sea eficiente y tenga solo los componentes necesarios para su funcionamiento, siguiendo las mejores prácticas para el desarrollo y despliegue de aplicaciones basadas en Node.js.*

---

### ***Alpine Linux como Opción Ligera***

- **Alpine Linux es una distribución Linux ligera y eficiente ampliamente utilizada en contenedores Docker debido a su tamaño reducido y su enfoque en la seguridad. Aquí están algunos puntos clave y cómo se relacionan con las imágenes de Node.js:**

- **Optimización y Tamaño Reducido:** *Alpine se centra en minimizar el tamaño de la imagen base, lo cual es ideal para aplicaciones que requieren una huella pequeña y un rápido tiempo de despliegue.*

- **Imagen Oficial de Alpine:** *En Docker Hub, puedes encontrar la imagen oficial de Alpine, que proporciona diferentes tags para distintas versiones y configuraciones, como:*

  ```plaintext
  22-alpine3.19, 22.3-alpine3.19, 22.3.0-alpine3.19, alpine3.19, current-alpine3.19
  22-alpine, 22-alpine3.20, 22.3-alpine, 22.3-alpine3.20, 22.3.0-alpine, 22.3.0-alpine3.20, alpine, alpine3.20, current-alpine, current-alpine3.20
  ```

  - *Estos tags permiten seleccionar la versión específica de Alpine que deseas usar en tus contenedores, optimizando así los recursos y manteniendo la compatibilidad con aplicaciones Node.js.*

- **Uso en Contenedores Node.js:** *Al utilizar Alpine como imagen base para Node.js en lugar de versiones más completas como Debian, reduces significativamente el tamaño de la imagen final, manteniendo al mismo tiempo la funcionalidad esencial para ejecutar aplicaciones Node.js.*

- **Enlaces de Referencia:**
  - *[Docker Hub - Alpine](https://hub.docker.com/_/alpine/ "https://hub.docker.com/_/alpine/")*
  - *[GitHub - Alpine Docker Repository](https://github.com/alpinelinux/docker-alpine "https://github.com/alpinelinux/docker-alpine")*

- *Al elegir Alpine como base para tus contenedores Docker, estás adoptando una solución optimizada y eficiente que cumple con los requisitos de muchas aplicaciones modernas centradas en la microservicios y la contenerización.*

---

### ***Alpine Linux como Opción Ligera para Contenedores Docker***

- **Alpine Linux es una distribución Linux minimalista y eficiente, ideal para usar como base en contenedores Docker debido a su tamaño reducido y su enfoque en la seguridad. A continuación, se explica por qué elegir Alpine y cómo construir una imagen de Node.js sobre esta base:**

- *[Gestor de Paquetes](https://pkgs.alpinelinux.org/packages "https://pkgs.alpinelinux.org/packages")*

- *[Alpine Linux](https://alpinelinux.org/ "https://alpinelinux.org/")*

---

#### ***Por qué Alpine***

**Alpine Linux se destaca en el mundo de Docker por su:**

- **Tamaño Reducido:** *La imagen base de Alpine para Docker es extremadamente liviana, con la versión más reciente pesando solo 5MB. Comparativamente, otras distribuciones como Ubuntu (64.2MB) y Debian (114MB) son considerablemente más grandes.*

- **Acceso a Repositorios de Paquetes:** *Aunque es pequeña, Alpine proporciona acceso a un repositorio de paquetes completo y actualizado, lo cual es crucial para aplicaciones que requieren dependencias específicas sin cargar el sistema con software innecesario.*

- **Optimización para Docker:** *Alpine está diseñado específicamente para ser una base eficiente y segura en entornos Docker, minimizando la huella de memoria y mejorando el rendimiento general de las aplicaciones contenerizadas.*

---

#### ***Dockerfile con Alpine***

**A continuación se muestra cómo modificar un Dockerfile para utilizar Alpine como base para una aplicación Node.js:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Utilizamos la imagen de Node.js LTS sobre Alpine
FROM node:lts-alpine

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /App

# Copiamos el fichero index.js al directorio de trabajo en el contenedor
COPY ./index.js ./

# Exponemos el puerto 3000 para acceder a la aplicación
EXPOSE 3000

# Comando por defecto para iniciar la aplicación Node.js
CMD node ./index.js
```

---

#### ***Construcción de la Imagen Alpine***

**Para construir la imagen Docker basada en Alpine:**

```bash
docker build -t d4nitrix13/node:alpine .
```

```bash
[+] Building 15.4s (8/8) FINISHED                                                                    docker:default
 => [internal] load build definition from Dockerfile                                                           0.0s
 => => transferring dockerfile: 826B                                                                           0.0s
 => [internal] load metadata for docker.io/library/node:lts-alpine                                             6.8s
 => [internal] load .dockerignore                                                                              0.0s
 => => transferring context: 2B                                                                                0.0s
 => [1/3] FROM docker.io/library/node:lts-alpine@sha256:df01469346db2bf1cfc1f7261aeab86b2960efa840fe2bd46d83f  8.1s
 => => resolve docker.io/library/node:lts-alpine@sha256:df01469346db2bf1cfc1f7261aeab86b2960efa840fe2bd46d83f  0.0s
 => => sha256:ec99f8b99825a742d50fb3ce173d291378a46ab54b8ef7dd75e5654e2a296e99 3.62MB / 3.62MB                 0.7s
 => => sha256:ba1057ec209ef729ee564099a0340d0b78324c97778af46879c287bc13e2ebe8 42.19MB / 42.19MB               5.7s
 => => sha256:b0691ab91e2774c9a10e06e87cd53c04d60fec055f28d158efb4768080e5beb0 1.39MB / 1.39MB                 1.2s
 => => sha256:df01469346db2bf1cfc1f7261aeab86b2960efa840fe2bd46d83ff339f463665 7.67kB / 7.67kB                 0.0s
 => => sha256:24c14a8a192a6e81d0942929a344f7a4bdf0db8e3b3c77d64a5eb8a4b0c759b7 1.72kB / 1.72kB                 0.0s
 => => sha256:fe82994959881783fd8dd4b838559f7a3da80126d2fd6aa965b905e587e114b7 6.38kB / 6.38kB                 0.0s
 => => extracting sha256:ec99f8b99825a742d50fb3ce173d291378a46ab54b8ef7dd75e5654e2a296e99                      0.1s
 => => sha256:b76f83d65b1b4ebbbf1dc6c3a171a2658ebb2d3b726dbfdd7b8bfd645698f5f9 451B / 451B                     0.9s
 => => extracting sha256:ba1057ec209ef729ee564099a0340d0b78324c97778af46879c287bc13e2ebe8                      2.0s
 => => extracting sha256:b0691ab91e2774c9a10e06e87cd53c04d60fec055f28d158efb4768080e5beb0                      0.1s
 => => extracting sha256:b76f83d65b1b4ebbbf1dc6c3a171a2658ebb2d3b726dbfdd7b8bfd645698f5f9                      0.0s
 => [internal] load build context                                                                              0.0s
 => => transferring context: 30B                                                                               0.0s
 => [2/3] WORKDIR /App                                                                                         0.3s
 => [3/3] COPY ./index.js ./                                                                                   0.0s
 => exporting to image                                                                                         0.1s
 => => exporting layers                                                                                        0.0s
 => => writing image sha256:13c6c1fc0ef97db60d8d31c9eb3bef2c6e84806e4046b372d4c7bf7a07f32a72                   0.0s
 => => naming to docker.io/d4nitrix13/node:alpine                                                              0.0s

 1 warning found (use --debug to expand):
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 18)
```

**Esto descargará las capas necesarias de Alpine y Node.js, construirá la imagen con el Dockerfile proporcionado y la etiquetará como `d4nitrix13/node:alpine`.**

---

#### ***Listado de Imágenes***

**Tras construir la imagen, puedes verificar su tamaño y otras imágenes disponibles:**

```bash
docker images
```

```bash
REPOSITORY        TAG              IMAGE ID       CREATED             SIZE
d4nitrix13/node   alpine           13c6c1fc0ef9   17 minutes ago      133MB
d4nitrix13/node   slim             6534ebe4c0da   30 minutes ago      199MB
d4nitrix13/node   preconfigurado   e91cd2aec686   About an hour ago   1.1GB
```

- *Esto mostrará la nueva imagen `d4nitrix13/node:alpine` junto con su tamaño reducido en comparación con otras versiones más completas.*

- *Al elegir Alpine como base para tus contenedores Docker, estás optando por una solución liviana y eficiente que optimiza los recursos y mantiene la funcionalidad esencial para aplicaciones Node.js modernas.*

---

### ***Ejecución y Uso del Contenedor Alpine***

**Al ejecutar un contenedor basado en Alpine, es importante tener en cuenta las particularidades de esta distribución ligera y eficiente:**

---

#### ***Ejecución del Contenedor***

```bash
docker run -it --rm -p 3000:3000 d4nitrix13/node:alpine sh
```

- *En Alpine Linux, el intérprete de comandos por defecto es `sh`, que en realidad es un enlace simbólico a `busybox`, una herramienta común en sistemas embebidos y entornos Docker minimalistas:*

```bash
/App # which sh
/bin/sh
/App # ls -l /bin/sh
lrwxrwxrwx    1 root     root            12 Jun 18 14:16 /bin/sh -> /bin/busybox
```

```bash
/App # bash --version
sh: bash: not found
```

- *Alpine Linux no incluye por defecto el shell `bash`, por lo que al intentar ejecutar `bash --version`, obtendrás un mensaje de "not found".*

---

#### ***Versiones de Software Disponibles***

- *Alpine incluye solo los componentes esenciales para funcionar, optimizando así el espacio y los recursos del contenedor. Aquí tienes algunas versiones de software clave disponibles:*

- **Node.js:** *Instalado y disponible para ejecutar aplicaciones Node.js.*

```bash
/App # node --version
v20.15.0
```

- **APK (Alpine Package Keeper):** *El gestor de paquetes de Alpine, utilizado para instalar y gestionar software adicional si es necesario.*

```bash
/App # apk --version
apk-tools 2.14.4, compiled for x86_64.
```

- *Alpine Linux es una excelente elección para contenedores Docker que requieren eficiencia y seguridad, ofreciendo un entorno mínimo pero funcional para ejecutar aplicaciones de manera efectiva.*

```bash
apk --help
apk-tools 2.14.4, compiled for x86_64.

usage: apk [<OPTIONS>...] COMMAND [<ARGUMENTS>...]

Package installation and removal:
  add        Add packages to WORLD and commit changes
  del        Remove packages from WORLD and commit changes

System maintenance:
  fix        Fix, reinstall or upgrade packages without modifying WORLD
  update     Update repository indexes
  upgrade    Install upgrades available from repositories
  cache      Manage the local package cache

Querying package information:
  info       Give detailed information about packages or repositories
  list       List packages matching a pattern or other criteria
  dot        Render dependencies as graphviz graphs
  policy     Show repository policy for packages
  search     Search for packages by name or description

Repository maintenance:
  index      Create repository index file from packages
  fetch      Download packages from repositories to a local directory
  manifest   Show checksums of package contents
  verify     Verify package integrity and signature

Miscellaneous:
  audit      Audit system for changes
  stats      Show statistics about repositories and installations
  version    Compare package versions or perform tests on version strings

This apk has coffee making abilities.
For more information: man 8 apk
```

---

### ***Creación y Ejecución de un Contenedor MySQL***

**Para configurar y ejecutar un contenedor MySQL, utilizaremos la imagen oficial disponible en Docker Hub:**

---

#### ***Imagen de MySQL en Docker Hub***

- **Puedes encontrar la imagen oficial de MySQL en [Docker Hub](https://hub.docker.com/_/mysql/ "https://hub.docker.com/_/mysql/").**

---

#### ***Comando para Ejecutar el Contenedor***

- *Ejecuta el siguiente comando para iniciar un contenedor MySQL llamado `My-DataBase`, utilizando la última versión disponible de MySQL:*

```bash
docker run --name My-DataBase -e MYSQL_ROOT_PASSWORD=1234 -d mysql:latest
```

```bash
Unable to find image 'mysql:latest' locally
latest: Pulling from library/mysql
7af76bb36546: Pull complete
24d40f69285f: Pull complete
94e5412f594e: Pull complete
e00a64de64e9: Pull complete
e3dd3d47ce6c: Pull complete
18af3efb629d: Pull complete
ba3db9dfd86e: Pull complete
787130cbc394: Pull complete
d458a2361496: Pull complete
d48f1878172c: Pull complete
Digest: sha256:dab7049abafe3a0e12cbe5e49050cf149881c0cd9665c289e5808b9dad39c9e0
Status: Downloaded newer image for mysql:latest
2024-06-28 01:41:47+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.4.0-1.el9 started.
2024-06-28 01:41:48+00:00 [Note] [Entrypoint]: Switching to dedicated user 'mysql'
2024-06-28 01:41:48+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.4.0-1.el9 started.
2024-06-28 01:41:48+00:00 [Note] [Entrypoint]: Initializing database files
2024-06-28T01:41:48.722426Z 0 [System] [MY-015017] [Server] MySQL Server Initialization - start.
2024-06-28T01:41:48.724866Z 0 [System] [MY-013169] [Server] /usr/sbin/mysqld (mysqld 8.4.0) initializing of server in progress as process 81
2024-06-28T01:41:48.734912Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2024-06-28T01:41:49.585201Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2024-06-28T01:41:55.128506Z 6 [Warning] [MY-010453] [Server] root@localhost is created with an empty password ! Please consider switching off the --initialize-insecure option.
2024-06-28T01:41:59.621469Z 0 [System] [MY-015018] [Server] MySQL Server Initialization - end.
2024-06-28 01:41:59+00:00 [Note] [Entrypoint]: Database files initialized
2024-06-28 01:41:59+00:00 [Note] [Entrypoint]: Starting temporary server
2024-06-28T01:41:59.717749Z 0 [System] [MY-015015] [Server] MySQL Server - start.
2024-06-28T01:42:00.069041Z 0 [System] [MY-010116] [Server] /usr/sbin/mysqld (mysqld 8.4.0) starting as process 122
2024-06-28T01:42:00.100311Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2024-06-28T01:42:00.489545Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2024-06-28T01:42:00.985711Z 0 [Warning] [MY-010068] [Server] CA certificate ca.pem is self signed.
2024-06-28T01:42:00.985773Z 0 [System] [MY-013602] [Server] Channel mysql_main configured to support TLS. Encrypted connections are now supported for this channel.
2024-06-28T01:42:00.996496Z 0 [Warning] [MY-011810] [Server] Insecure configuration for --pid-file: Location '/var/run/mysqld' in the path is accessible to all OS users. Consider choosing a different directory.
2024-06-28T01:42:01.035861Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '8.4.0'  socket: '/var/run/mysqld/mysqld.sock'  port: 0  MySQL Community Server - GPL.
2024-06-28 01:42:01+00:00 [Note] [Entrypoint]: Temporary server started.
'/var/lib/mysql/mysql.sock' -> '/var/run/mysqld/mysqld.sock'
2024-06-28T01:42:01.296578Z 0 [System] [MY-011323] [Server] X Plugin ready for connections. Socket: /var/run/mysqld/mysqlx.sock
Warning: Unable to load '/usr/share/zoneinfo/iso3166.tab' as time zone. Skipping it.
Warning: Unable to load '/usr/share/zoneinfo/leap-seconds.list' as time zone. Skipping it.
Warning: Unable to load '/usr/share/zoneinfo/leapseconds' as time zone. Skipping it.
Warning: Unable to load '/usr/share/zoneinfo/tzdata.zi' as time zone. Skipping it.
Warning: Unable to load '/usr/share/zoneinfo/zone.tab' as time zone. Skipping it.
Warning: Unable to load '/usr/share/zoneinfo/zone1970.tab' as time zone. Skipping it.

2024-06-28 01:42:04+00:00 [Note] [Entrypoint]: Stopping temporary server
2024-06-28T01:42:04.931349Z 11 [System] [MY-013172] [Server] Received SHUTDOWN from user root. Shutting down mysqld (Version: 8.4.0).
2024-06-28T01:42:06.272469Z 0 [System] [MY-010910] [Server] /usr/sbin/mysqld: Shutdown complete (mysqld 8.4.0)  MySQL Community Server - GPL.
2024-06-28T01:42:06.272491Z 0 [System] [MY-015016] [Server] MySQL Server - end.
2024-06-28 01:42:06+00:00 [Note] [Entrypoint]: Temporary server stopped

2024-06-28 01:42:06+00:00 [Note] [Entrypoint]: MySQL init process done. Ready for start up.

2024-06-28T01:42:06.967613Z 0 [System] [MY-015015] [Server] MySQL Server - start.
2024-06-28T01:42:07.309869Z 0 [System] [MY-010116] [Server] /usr/sbin/mysqld (mysqld 8.4.0) starting as process 1
2024-06-28T01:42:07.325093Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2024-06-28T01:42:07.754492Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2024-06-28T01:42:08.159763Z 0 [Warning] [MY-010068] [Server] CA certificate ca.pem is self signed.
2024-06-28T01:42:08.159819Z 0 [System] [MY-013602] [Server] Channel mysql_main configured to support TLS. Encrypted connections are now supported for this channel.
2024-06-28T01:42:08.169158Z 0 [Warning] [MY-011810] [Server] Insecure configuration for --pid-file: Location '/var/run/mysqld' in the path is accessible to all OS users. Consider choosing a different directory.
2024-06-28T01:42:08.215566Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '8.4.0'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL.
2024-06-28T01:42:08.479809Z 0 [System] [MY-011323] [Server] X Plugin ready for connections. Bind-address: '::' port: 33060, socket: /var/run/mysqld/mysqlx.sock
```

- **`-d` o `--detach`:** *Ejecuta el contenedor en segundo plano.*
- **`-e MYSQL_ROOT_PASSWORD=1234`:** *Configura la contraseña de root de MySQL como `1234` utilizando la variable de entorno `MYSQL_ROOT_PASSWORD`.*

**Explicación detallada de lo que hacen los parámetros `-e` y `-d` en Docker:**

1. **`-e` (Environment Variables):**
   - **Uso:** *Este parámetro se utiliza para establecer variables de entorno dentro del contenedor Docker durante su ejecución.*
   - **Formato:** *`-e VARIABLE=valor`*
   - **Ejemplo:** *`-e MYSQL_ROOT_PASSWORD=1234`*
   - **Explicación:** *En el ejemplo, `MYSQL_ROOT_PASSWORD` es una variable de entorno que se configura con el valor `1234`. En el contexto de un contenedor MySQL, esto configura la contraseña de root del servidor MySQL.*

2. **`-d` (Detach):**
   - **Uso:** *Este parámetro se utiliza para ejecutar el contenedor Docker en segundo plano, es decir, en modo detach.*
   - **Explicación:** *Cuando ejecutas un contenedor Docker sin `-d`, normalmente el terminal queda vinculado al proceso del contenedor, mostrando sus logs en tiempo real. Con `-d`, el contenedor se ejecuta en segundo plano, liberando tu terminal para que puedas seguir ejecutando otros comandos sin interrupciones por parte del contenedor.*

---

### **Ejemplo de Uso Conjunto:**

**Al combinar estos parámetros en el comando de ejecución de un contenedor MySQL:**

```bash
docker run --name My-DataBase -e MYSQL_ROOT_PASSWORD=1234 -d mysql:latest
```

- **`-e MYSQL_ROOT_PASSWORD=1234`:** *Configura la contraseña de root de MySQL como `1234` utilizando la variable de entorno `MYSQL_ROOT_PASSWORD`.*
- **`-d`:** *Ejecuta el contenedor en segundo plano, lo que permite que el servidor MySQL funcione en el contenedor sin bloquear la terminal desde la que se lanzó el comando.*

---

#### ***Acceso al Servidor MySQL***

**Una vez ejecutado el contenedor, puedes verificar si está listo para aceptar conexiones buscando el mensaje `ready for connections`:**

```bash
docker logs My-DataBase
```

```bash
2024-06-28 02:01:02+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.4.0-1.el9 started.
2024-06-28 02:01:03+00:00 [Note] [Entrypoint]: Switching to dedicated user 'mysql'
2024-06-28 02:01:03+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.4.0-1.el9 started.
2024-06-28 02:01:03+00:00 [Note] [Entrypoint]: Initializing database files
2024-06-28T02:01:03.427324Z 0 [System] [MY-015017] [Server] MySQL Server Initialization - start.
2024-06-28T02:01:03.429690Z 0 [System] [MY-013169] [Server] /usr/sbin/mysqld (mysqld 8.4.0) initializing of server in progress as process 80
2024-06-28T02:01:03.438524Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2024-06-28T02:01:03.958757Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2024-06-28T02:01:06.396925Z 6 [Warning] [MY-010453] [Server] root@localhost is created with an empty password ! Please consider switching off the --initialize-insecure option.
2024-06-28T02:01:08.869524Z 0 [System] [MY-015018] [Server] MySQL Server Initialization - end.
2024-06-28 02:01:08+00:00 [Note] [Entrypoint]: Database files initialized
2024-06-28 02:01:08+00:00 [Note] [Entrypoint]: Starting temporary server
2024-06-28T02:01:08.977297Z 0 [System] [MY-015015] [Server] MySQL Server - start.
2024-06-28T02:01:09.312634Z 0 [System] [MY-010116] [Server] /usr/sbin/mysqld (mysqld 8.4.0) starting as process 121
2024-06-28T02:01:09.342267Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2024-06-28T02:01:09.713614Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2024-06-28T02:01:10.100358Z 0 [Warning] [MY-010068] [Server] CA certificate ca.pem is self signed.
2024-06-28T02:01:10.100402Z 0 [System] [MY-013602] [Server] Channel mysql_main configured to support TLS. Encrypted connections are now supported for this channel.
2024-06-28T02:01:10.107341Z 0 [Warning] [MY-011810] [Server] Insecure configuration for --pid-file: Location '/var/run/mysqld' in the path is accessible to all OS users. Consider choosing a different directory.
2024-06-28T02:01:10.140120Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '8.4.0'  socket: '/var/run/mysqld/mysqld.sock'  port: 0  MySQL Community Server - GPL.
2024-06-28 02:01:10+00:00 [Note] [Entrypoint]: Temporary server started.
'/var/lib/mysql/mysql.sock' -> '/var/run/mysqld/mysqld.sock'
2024-06-28T02:01:10.398526Z 0 [System] [MY-011323] [Server] X Plugin ready for connections. Socket: /var/run/mysqld/mysqlx.sock
Warning: Unable to load '/usr/share/zoneinfo/iso3166.tab' as time zone. Skipping it.
Warning: Unable to load '/usr/share/zoneinfo/leap-seconds.list' as time zone. Skipping it.
Warning: Unable to load '/usr/share/zoneinfo/leapseconds' as time zone. Skipping it.
Warning: Unable to load '/usr/share/zoneinfo/tzdata.zi' as time zone. Skipping it.
Warning: Unable to load '/usr/share/zoneinfo/zone.tab' as time zone. Skipping it.
Warning: Unable to load '/usr/share/zoneinfo/zone1970.tab' as time zone. Skipping it.

2024-06-28 02:01:13+00:00 [Note] [Entrypoint]: Stopping temporary server
2024-06-28T02:01:13.411538Z 11 [System] [MY-013172] [Server] Received SHUTDOWN from user root. Shutting down mysqld (Version: 8.4.0).
2024-06-28T02:01:14.477797Z 0 [System] [MY-010910] [Server] /usr/sbin/mysqld: Shutdown complete (mysqld 8.4.0)  MySQL Community Server - GPL.
2024-06-28T02:01:14.477834Z 0 [System] [MY-015016] [Server] MySQL Server - end.
2024-06-28 02:01:15+00:00 [Note] [Entrypoint]: Temporary server stopped

2024-06-28 02:01:15+00:00 [Note] [Entrypoint]: MySQL init process done. Ready for start up.

2024-06-28T02:01:15.464871Z 0 [System] [MY-015015] [Server] MySQL Server - start.
2024-06-28T02:01:15.792248Z 0 [System] [MY-010116] [Server] /usr/sbin/mysqld (mysqld 8.4.0) starting as process 1
2024-06-28T02:01:15.806862Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2024-06-28T02:01:16.209026Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2024-06-28T02:01:16.543830Z 0 [Warning] [MY-010068] [Server] CA certificate ca.pem is self signed.
2024-06-28T02:01:16.543893Z 0 [System] [MY-013602] [Server] Channel mysql_main configured to support TLS. Encrypted connections are now supported for this channel.
2024-06-28T02:01:16.551483Z 0 [Warning] [MY-011810] [Server] Insecure configuration for --pid-file: Location '/var/run/mysqld' in the path is accessible to all OS users. Consider choosing a different directory.
2024-06-28T02:01:16.588765Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '8.4.0'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL.
2024-06-28T02:01:16.860247Z 0 [System] [MY-011323] [Server] X Plugin ready for connections. Bind-address: '::' port: 33060, socket: /var/run/mysqld/mysqlx.sock
```

- *Si ves este mensaje `ready for connections`, significa que el servidor MySQL dentro del contenedor está listo para aceptar conexiones.*

---

#### ***Conexión al Servidor MySQL desde el Contenedor***

**Puedes conectarte al servidor MySQL desde el mismo contenedor utilizando el cliente MySQL:**

```bash
docker exec -it My-DataBase mysql -uroot -p1234
```

**Esto abrirá una sesión interactiva de MySQL donde puedes ejecutar consultas y administrar la base de datos.**

---

#### ***Conexión al Servidor MySQL desde el Exterior***

- *Si has publicado el puerto del contenedor al host, también puedes conectarte al servidor MySQL desde fuera del contenedor utilizando la dirección IP del host y el puerto publicado.*

- *MySQL en Docker proporciona una manera eficiente y controlada de desplegar bases de datos para tus aplicaciones, asegurando un entorno aislado y fácil de gestionar.*

---

### ***Ejecución de MySQL en un Contenedor Docker***

1. **Iniciar sesión en MySQL desde un contenedor:**
   - **`-u` para el usuario:** *Puedes especificar el usuario de MySQL usando `-uroot` (sin espacio) o `-u root` (con espacio).*
   - **`-p` para la contraseña:** *La contraseña se especifica directamente después de `-p`, como `-p1234`. Es importante notar que no se debe dejar espacio entre `-p` y la contraseña (`-p 1234` no funcionará correctamente).*

   ```bash
   docker exec -it My-DataBase mysql -uroot -p1234
   ```

   - **Explicación:** *Aquí, `docker exec` se usa para ejecutar comandos dentro de un contenedor Docker. `-it` permite la interactividad y la asignación de una terminal pseudo-TTY. `mysql` es el comando para acceder al cliente de MySQL. `-uroot` especifica que se conectará como usuario root. `-p1234` proporciona la contraseña de root para la autenticación.*

2. **Detener un contenedor en ejecución:**
   - **Detener todos los contenedores en ejecución:**

   ```bash
   docker stop $(docker ps -qf status=running)
   ```

   - **Explicación:** *`docker stop` detiene un contenedor Docker en ejecución. `$(docker ps -qf status=running)` filtra y selecciona todos los IDs de contenedores en ejecución para ser detenidos. Esto se hace de forma segura utilizando la señal SIGTERM.*

3. **Eliminar un contenedor Docker:**

   ```bash
   docker rm My-DataBase
   ```

   - **Explicación:** *`docker rm` elimina un contenedor Docker. `My-DataBase` es el nombre del contenedor que se va a eliminar.*

4. **Crear y publicar un puerto para un nuevo contenedor MySQL:**

   - **Publicar el puerto 3306:**

   ```bash
   docker run --publish 3306:3306 --name My-DataBase -e MYSQL_ROOT_PASSWORD=1234 mysql:latest
   ```

   - **Publicar otro puerto, por ejemplo, 3305:**

   ```bash
   docker run --publish 3305:3306 --name My-DataBase -e MYSQL_ROOT_PASSWORD=1234 mysql:latest
   ```

   ```bash
   2024-06-28 02:01:02+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.4.0-1.el9 started.
   2024-06-28 02:01:03+00:00 [Note] [Entrypoint]: Switching to dedicated user 'mysql'
   2024-06-28 02:01:03+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.4.0-1.el9 started.
   2024-06-28 02:01:03+00:00 [Note] [Entrypoint]: Initializing database files
   2024-06-28T02:01:03.427324Z 0 [System] [MY-015017] [Server] MySQL Server Initialization - start.
   2024-06-28T02:01:03.429690Z 0 [System] [MY-013169] [Server] /usr/sbin/mysqld (mysqld 8.4.0) initializing of server in progress as process 80
   2024-06-28T02:01:03.438524Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
   2024-06-28T02:01:03.958757Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
   2024-06-28T02:01:06.396925Z 6 [Warning] [MY-010453] [Server] root@localhost is created with an empty password ! Please consider switching off the --initialize-insecure option.
   2024-06-28T02:01:08.869524Z 0 [System] [MY-015018] [Server] MySQL Server Initialization - end.
   2024-06-28 02:01:08+00:00 [Note] [Entrypoint]: Database files initialized
   2024-06-28 02:01:08+00:00 [Note] [Entrypoint]: Starting temporary server
   2024-06-28T02:01:08.977297Z 0 [System] [MY-015015] [Server] MySQL Server - start.
   2024-06-28T02:01:09.312634Z 0 [System] [MY-010116] [Server] /usr/sbin/mysqld (mysqld 8.4.0) starting as process 121
   2024-06-28T02:01:09.342267Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
   2024-06-28T02:01:09.713614Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
   2024-06-28T02:01:10.100358Z 0 [Warning] [MY-010068] [Server] CA certificate ca.pem is self signed.
   2024-06-28T02:01:10.100402Z 0 [System] [MY-013602] [Server] Channel mysql_main configured to support TLS. Encrypted connections are now supported for this channel.
   2024-06-28T02:01:10.107341Z 0 [Warning] [MY-011810] [Server] Insecure configuration for --pid-file: Location '/var/run/mysqld' in the path is accessible to all OS users. Consider choosing a different directory.
   2024-06-28T02:01:10.140120Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '8.4.0'  socket: '/var/run/mysqld/mysqld.sock'  port: 0  MySQL Community Server - GPL.
   2024-06-28 02:01:10+00:00 [Note] [Entrypoint]: Temporary server started.
   '/var/lib/mysql/mysql.sock' -> '/var/run/mysqld/mysqld.sock'
   2024-06-28T02:01:10.398526Z 0 [System] [MY-011323] [Server] X Plugin ready for connections. Socket: /var/run/mysqld/mysqlx.sock
   Warning: Unable to load '/usr/share/zoneinfo/iso3166.tab' as time zone. Skipping it.
   Warning: Unable to load '/usr/share/zoneinfo/leap-seconds.list' as time zone. Skipping it.
   Warning: Unable to load '/usr/share/zoneinfo/leapseconds' as time zone. Skipping it.
   Warning: Unable to load '/usr/share/zoneinfo/tzdata.zi' as time zone. Skipping it.
   Warning: Unable to load '/usr/share/zoneinfo/zone.tab' as time zone. Skipping it.
   Warning: Unable to load '/usr/share/zoneinfo/zone1970.tab' as time zone. Skipping it.
   
   2024-06-28 02:01:13+00:00 [Note] [Entrypoint]: Stopping temporary server
   2024-06-28T02:01:13.411538Z 11 [System] [MY-013172] [Server] Received SHUTDOWN from user root. Shutting down mysqld (Version: 8.4.0).
   2024-06-28T02:01:14.477797Z 0 [System] [MY-010910] [Server] /usr/sbin/mysqld: Shutdown complete (mysqld 8.4.0)  MySQL Community Server - GPL.
   2024-06-28T02:01:14.477834Z 0 [System] [MY-015016] [Server] MySQL Server - end.
   2024-06-28 02:01:15+00:00 [Note] [Entrypoint]: Temporary server stopped
   
   2024-06-28 02:01:15+00:00 [Note] [Entrypoint]: MySQL init process done. Ready for start up.
   
   2024-06-28T02:01:15.464871Z 0 [System] [MY-015015] [Server] MySQL Server - start.
   2024-06-28T02:01:15.792248Z 0 [System] [MY-010116] [Server] /usr/sbin/mysqld (mysqld 8.4.0) starting as process 1
   2024-06-28T02:01:15.806862Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
   2024-06-28T02:01:16.209026Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
   2024-06-28T02:01:16.543830Z 0 [Warning] [MY-010068] [Server] CA certificate ca.pem is self signed.
   2024-06-28T02:01:16.543893Z 0 [System] [MY-013602] [Server] Channel mysql_main configured to support TLS. Encrypted connections are now supported for this channel.
   2024-06-28T02:01:16.551483Z 0 [Warning] [MY-011810] [Server] Insecure configuration for --pid-file: Location '/var/run/mysqld' in the path is accessible to all OS users. Consider choosing a different directory.
   2024-06-28T02:01:16.588765Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '8.4.0'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL.
   2024-06-28T02:01:16.860247Z 0 [System] [MY-011323] [Server] X Plugin ready for connections. Bind-address: '::' port: 33060, socket: /var/run/mysqld/mysqlx.sock
   ```

   - **Explicación:** *`docker run --publish 3306:3306` mapea el puerto 3306 del host al puerto 3306 del contenedor, permitiendo la conexión al servidor MySQL dentro del contenedor desde fuera. `-e MYSQL_ROOT_PASSWORD=1234` establece la contraseña de root de MySQL como `1234` usando una variable de entorno. `mysql:latest` es la imagen de Docker de MySQL que se utiliza para crear el contenedor.*

**Cuando te conectas al servidor MySQL desde el contenedor listamos las base de datos con `show databases`, es posible que veas el siguiente mensaje de advertencia:**

```bash
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 9
Server version: 8.4.0 MySQL Community Server - GPL

Copyright (c) 2000, 2024, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.01 sec)
```

- *Este mensaje de advertencia indica que usar una contraseña en la línea de comandos puede ser inseguro, ya que otros usuarios en el mismo sistema pueden ver la contraseña usando herramientas como `ps`. Sin embargo, para fines de demostración o desarrollo local, esto es comúnmente aceptado. En producción, se recomienda usar métodos más seguros para proporcionar contraseñas, como ficheros de configuración o variables de entorno seguras.*

---

- **Nos conectamos al servidor MySQL en el contenedor y creamos una base de datos junto con una tabla:**

```bash
docker exec -it My-DataBase mysql -uroot -p1234
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 9
Server version: 8.4.0 MySQL Community Server - GPL

Copyright (c) 2000, 2024, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> create database test;
Query OK, 1 row affected (0.12 sec)

mysql> use test;
Database changed

mysql> create table prueba (id int, name varchar(255));
Query OK, 0 rows affected (0.92 sec)

mysql> insert into prueba (id, name) values (1, 'Daniel');
Query OK, 1 row affected (0.02 sec)

mysql> select * from prueba;
+------+--------+
| id   | name   |
+------+--------+
|    1 | Daniel |
+------+--------+
1 row in set (0.00 sec)
```

**Extensión de VS Code "MySQL" (versión 7.5.2, la cual es premium):**

**Nombre:** *MySQL*
**ID:** *cweijan.vscode-mysql-client2*
**Descripción:** *Database manager for MySQL/MariaDB, PostgreSQL, SQLite, Redis and ElasticSearch.*
**Versión:** *`7.5.2`*
**Editor:** *Weijan Chen*
**Vínculo de VS Marketplace:** *[MySQL Client](https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-mysql-client2 "https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-mysql-client2")*

- *Esto extensión requiere una licencia premium para desbloquear todas las funciones. Con la licencia gratuita, estás limitado a utilizar hasta 3 conexiones simultáneas para bases de datos y NoSQL. Si deseas utilizar más conexiones o acceder a todas las características disponibles, necesitarás adquirir una licencia premium.*

**Si nos conectamos usando la extensión de VS Code "MySQL" (versión 4.5.12, la cual es gratuita):**

**Nombre:** *MySQL*
**ID:** *cweijan.vscode-mysql-client2*
**Descripción:** *Database manager for MySQL/MariaDB, PostgreSQL, SQLite, Redis and ElasticSearch.*
**Versión:** *4.5.12*
**Editor:** *Weijan Chen*
**Vínculo de VS Marketplace:** *[MySQL Client](https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-mysql-client2 "https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-mysql-client2")*

- *Esta extensión gratuita permite hasta 3 conexiones simultáneas para bases de datos y NoSQL.*

**Para establecer la conexión:**

1. *Instala la versión gratuita desde el enlace proporcionado.*
2. *Abre la extensión y selecciona "Nueva conexión".*
3. *Usa los siguientes detalles de conexión:*
   - *Host: 127.0.0.1 (para usar TCP/IP en lugar de sockets Unix)*
   - *Puerto: 3305 (el puerto que has publicado, por defecto 3306)*
   - *Usuario: root*
   - *Contraseña: 1234*

- *Haz clic en "Conectar" y podrás ver las bases de datos y tablas creadas en el cliente gráfico de MySQL.*

### ***Explicación mejorada sobre la diferencia entre el uso de sockets Unix y TCP/IP al conectarse a una base de datos MySQL en un contenedor:***

- **En entornos de contenedorización como Docker, los contenedores actúan como máquinas virtuales ligeras y aisladas entre sí. Aquí se explica la diferencia entre usar un socket Unix y TCP/IP para la conexión a MySQL:**

1. **Socket Unix:** *Es un mecanismo de comunicación y proceso que permite la comunicación interna entre procesos en el mismo sistema operativo. Cuando te conectas a MySQL usando `localhost`, estás indicando que deseas utilizar un socket Unix. Esto es eficiente y no necesita pasar por la capa de red, ya que se comunica directamente entre procesos locales.*

2. **TCP/IP (127.0.0.1):** *Es un protocolo de red estándar que permite la comunicación a través de redes, incluso en entornos virtualizados como los contenedores Docker. Al especificar `127.0.0.1` como el host en la conexión MySQL, estás indicando que deseas utilizar TCP/IP, lo cual hace que la comunicación pase a través de la capa de red del sistema operativo.*

**En el contexto de Docker:**

- **Socket Unix:** *Usar `localhost` o no especificar un host en la configuración de conexión a MySQL dentro de un contenedor Docker, implica que se utilizará el socket Unix local. Esto es útil para comunicaciones internas rápidas y eficientes entre procesos dentro del mismo contenedor o entre contenedores en el mismo host.*

- **TCP/IP (127.0.0.1):** *Especificar `127.0.0.1` como el host indica que deseas que la conexión MySQL pase a través de la red, incluso si la base de datos MySQL está ejecutándose dentro de un contenedor. Esto es útil cuando deseas acceder a la base de datos desde fuera del contenedor o cuando necesitas simular una conexión de red estándar.*

- *En resumen, la elección entre usar un socket Unix (`localhost`) o TCP/IP (`127.0.0.1`) depende de si deseas una comunicación interna eficiente (socket Unix) o necesitas acceso a través de la red (TCP/IP) incluso dentro de un entorno contenedorizado como Docker.*
