<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->

# ***Dockerización de apps con dependencias***

---

## ***Pasos para crear una aplicación Node.js con Express.js***

---

### ***1. Crear y configurar el proyecto***

- *Primero, vamos a crear una nueva directorio para nuestro proyecto y dentro de ella una subdirectorio llamada `src` para nuestro código fuente.*

```bash
# Crear la directorio del proyecto
mkdir "01 App Node ExpressJS"

# Cambiar al directorio del proyecto
cd "01 App Node ExpressJS"

# Crear una subdirectorio para el código fuente
mkdir src

# Cambiar al directorio 'src'
cd src

# Crear el fichero 'index.js'
touch index.js
```

---

### ***2. Inicializar el proyecto con npm***

- *Ahora, inicializamos el proyecto con npm para crear un fichero `package.json` que manejará las dependencias y scripts del proyecto.*

```bash
# Volver al directorio raíz del proyecto
cd ..

# Inicializar el proyecto con npm
npm init -y
```

**Este comando generará automáticamente un fichero `package.json` con la siguiente estructura:**

```json
{
  "name": "01-app-node-expressjs",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}
```

---

### ***3. Instalar Express.js***

**A continuación, instalamos Express.js, que es un framework para aplicaciones web para Node.js.**

```bash
# Instalar Express.js
npm install express

# Salida esperada
added 64 packages, and audited 65 packages in 6s

12 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

---

### ***4. Crear el fichero de servidor***

- *[hello world](https://expressjs.com/en/starter/hello-world.html "https://expressjs.com/en/starter/hello-world.html")*

**Finalmente, vamos a editar el fichero `index.js` para crear un servidor básico con Express.js. Abre el fichero `index.js` en tu editor de texto favorito y añade el siguiente código:**

### ***Fichero `index.js`***

```javascript
// Por defecto, Express escucha en todas las interfaces disponibles (0.0.0.0)

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

```javascript
// Por defecto, Express escucha en todas las interfaces disponibles (0.0.0.0)
```

*Este comentario explica de manera más precisa que Express está configurado para escuchar en todas las interfaces disponibles, representadas por `0.0.0.0`.*

---

### ***Ejecución y prueba***

1. **Ejecuta el servidor:**

   ```bash
   node ./src/index.js
   ```

   **Esto debería mostrar en la terminal:**

   ```txt
   Example app listening on port 3000
   ```

2. **Realiza una petición con curl:**

   ```bash
   curl 127.0.0.1:3000
   ```

   **Deberías recibir la respuesta:**

   ```txt
   Hello World!
   ```

*Estos pasos te permiten ejecutar y probar una aplicación básica de Express.js que responde con "Hello World!" en la ruta raíz (`/`).*

---

### ***5. Ejecutar la aplicación***

***Para ejecutar tu aplicación, usa el siguiente comando:***

```bash
node src/index.js
```

- *Ahora deberías ver un mensaje en la terminal que dice `App listening at http://localhost:3000`. Puedes abrir tu navegador y navegar a `http://localhost:3000` para ver tu aplicación en funcionamiento.*

---

### ***Recursos adicionales***

- *Para más detalles sobre Express.js, puedes visitar su [página oficial](https://expressjs.com/ "https://expressjs.com/") y seguir la guía de [instalación](https://expressjs.com/en/starter/installing.html "https://expressjs.com/en/starter/installing.html").*

---

**Aquí está el fichero `package.json` actualizado con la dependencia de Express.js añadida:**

```json
{
  "name": "01-app-node-expressjs",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "express": "^4.19.2"
  }
}
```

- *Este fichero ahora incluye la dependencia de Express.js con la versión específica `^4.19.2`, que permite que tu proyecto utilice Express.js para crear aplicaciones web en Node.js.*

**Fichero `package.json`:**

```json
{
  "name": "01-app-node-expressjs",
  "version": "1.0.0",
  "main": "./src/index.js",
  "scripts": {
    "start": "node ./src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "express": "^4.19.2"
  }
}
```

**Los cambios realizados son:**

- *Se ha actualizado la propiedad `"main"` para apuntar al fichero `index.js` dentro de la directorio `src`: `"main": "./src/index.js"`.*
- *Se ha actualizado el script `"start"` para ejecutar el fichero `index.js` ubicado en la directorio `src`: `"start": "node ./src/index.js"`.*

**Explicar la ejecución con `npm start` y la petición con curl:**

```bash
npm start

> 01-app-node-expressjs@1.0.0 start
> node ./src/index.js

Example app listening on port 3000
```

- *Al ejecutar `npm start`, se realiza internamente `sh -c "node ./src/index.js"`, lo cual ejecuta otro shell, lo que puede afectar el manejo de señales.*

```bash
sh -c "node ./src/index.js"
Example app listening on port 3000
```

**Luego, al realizar una petición:**

```bash
curl 127.0.0.1:3000
Hello World!
```

- *Esto muestra la respuesta esperada "Hello World!" desde el servidor Express configurado.*

---

### ***Docker y Dockerfile***

> [!TIP]
> *"Bullseye" es el nombre en clave de la versión 11 de Debian, que es una distribución de sistema operativo Linux ampliamente utilizada.*

**Primero, creamos un Dockerfile en la raíz del proyecto:**

```bash
touch Dockerfile
```

**Contenido del Dockerfile:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Imagen base que utilizaremos
FROM node:lts

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /App

# Copiamos todos los ficheros del proyecto al directorio /App del contenedor
COPY ./ ./

# Exponemos el puerto 3000 para que pueda ser accesible desde fuera del contenedor
EXPOSE 3000

# CMD usando la forma Shell
CMD npm start
```

---

### ***Construcción de la imagen Docker***

- **Construimos la imagen Docker usando el tag `d4nitrix13/express`:**

- **El comando `docker build` se utiliza para construir una imagen Docker a partir de un Dockerfile y el contexto especificado. Aquí está la mejora del texto:**

- *El comando `docker build -t d4nitrix13/express:latest .` y `docker build -t d4nitrix13/express .` son equivalentes en función. Ambos comandos construyen una imagen Docker con el nombre `d4nitrix13/express` y opcionalmente con el tag `latest`, utilizando el contexto actual (representado por `.`) que incluye el Dockerfile y todos los ficheros necesarios para la construcción de la imagen.*

- *Esto clarifica que ambos comandos tienen el mismo efecto de construir la imagen Docker con el nombre `d4nitrix13/express`, con o sin la especificación explícita del tag `latest`.*

```bash
docker build -t d4nitrix13/express .
```

**La salida esperada:**

```bash
[+] Building 6.9s (8/8) FINISHED                                                                     docker:default
 => [internal] load build definition from Dockerfile                                                           0.0s
 => => transferring dockerfile: 265B                                                                           0.0s
 => [internal] load metadata for docker.io/library/node:lts                                                    6.3s
 => [internal] load .dockerignore                                                                              0.0s
 => => transferring context: 2B                                                                                0.0s
 => [1/3] FROM docker.io/library/node:lts@sha256:b849bc4078c3e16a38d72749ab8faeacbcc6c3bdb742399b4a5974a89fc9  0.0s
 => [internal] load build context                                                                              0.2s
 => => transferring context: 2.21MB                                                                            0.2s
 => CACHED [2/3] WORKDIR /App                                                                                  0.0s
 => [3/3] COPY ./ ./                                                                                           0.2s
 => exporting to image                                                                                         0.1s
 => => exporting layers                                                                                        0.1s
 => => writing image sha256:813977b17cfcc197f4273c131aeb87570ea010cd8e2b0ef393b81729e5079259                   0.0s
 => => naming to docker.io/d4nitrix13/express                                                                  0.0s

 1 warning found (use --debug to expand):
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 14)
```

---

### ***Creación y ejecución del contenedor***

**Creamos y ejecutamos el contenedor a partir de la imagen recién creada:**

```bash
docker run -it -p 3000:3000 --rm d4nitrix13/express

> 01-app-node-expressjs@1.0.0 start
> node ./src/index.js

Example app listening on port 3000
```

- *Esto inicia el contenedor basado en la imagen `d4nitrix13/express`, ejecuta el comando `npm start` dentro del contenedor, y muestra el mensaje `Example app listening on port 3000`, indicando que el servidor Express está escuchando en el puerto 3000 dentro del contenedor Docker.*

---

### ***Uso de `docker exec` y errores comunes***

**Ejecutamos un shell dentro de un contenedor en ejecución utilizando `exec`:**

```bash
docker exec -it $(docker ps -q) bash
```

**Realizamos un listado detallado de ficheros (`ls -la`):**

```bash
root@256c5814351e:/App# ls -la
total 52
drwxr-xr-x  1 root root  4096 Jun 28 19:15 .
drwxr-xr-x  1 root root  4096 Jun 28 19:20 ..
-rw-rw-r--  1 root root   226 Jun 28 19:13 Dockerfile
drwxrwxr-x 66 root root  4096 Jun 28 18:25 node_modules
-rw-rw-r--  1 root root 25517 Jun 28 18:25 package-lock.json
-rw-rw-r--  1 root root   327 Jun 28 18:36 package.json
drwxrwxr-x  2 root root  4096 Jun 28 18:28 src
```

**Observamos que se copiaron incluso ficheros y directorios que no son necesarios, lo cual afecta el rendimiento:**

```bash
root@256c5814351e:/App# cat Dockerfile
# Imagen que usaremos
FROM node:lts

# Creamos el directorio /App
WORKDIR /App

# Copiamos todo el directorio a el directorio /App del contenedor
COPY ./ ./

# Escucha por el puerto 3000
EXPOSE 3000

# Shell Form
CMD npm start
```

---

### ***Solución propuesta***

**Para evitar estos problemas, primero creamos un fichero `.dockerignore` que funcione de manera similar a `.gitignore`:**

```bash
touch ./.dockerignore
```

**Contenido de `.dockerignore`:**

```bash
node_modules
Dockerfile
.dockerignore
```

**Luego, ajustamos el Dockerfile para optimizar la construcción de la imagen Docker:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Imagen base que utilizaremos
FROM node:lts

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /App

# Copiamos solo los ficheros necesarios para la aplicación
COPY ./ ./

# Instalamos las dependencias necesarias para nuestra aplicación web en este caso express
RUN npm install

# Exponemos el puerto 3000 para que sea accesible desde fuera del contenedor
EXPOSE 3000

# CMD usando la forma Shell
CMD npm start
```

---

### ***Explicación***

1. **`.dockerignore`:** *Evita que Docker copie ficheros y directorios innecesarios como `node_modules` y los propios ficheros de configuración (`Dockerfile`, `.dockerignore`).*

2. **Dockerfile optimizado:** *Instala las dependencias necesarias (`express`) dentro de la imagen Docker durante la construcción (`RUN npm install`), en lugar de copiar `node_modules` desde el host. Esto asegura que la imagen sea independiente del entorno de desarrollo del host y está lista para ejecutarse de manera consistente en cualquier máquina Docker.*

- *Este enfoque mejora la eficiencia y la portabilidad de las imágenes Docker para aplicaciones Node.js con Express.js.*

---

### ***Reconstrucción de la imagen Docker***

**Volviendo a construir la imagen con el mismo tag, lo que hace que la imagen anterior con ese tag se vuelva dangling:**

```bash
docker build -t d4nitrix13/express .
[+] Building 3.3s (9/9) FINISHED
 => [internal] load build definition from Dockerfile                                                           0.0s
 => => transferring dockerfile: 494B                                                                           0.0s
 => [internal] load metadata for docker.io/library/node:lts                                                    0.4s
 => [internal] load .dockerignore                                                                              0.0s
 => => transferring context: 77B                                                                               0.0s
 => [1/4] FROM docker.io/library/node:lts@sha256:b849bc4078c3e16a38d72749ab8faeacbcc6c3bdb742399b4a5974a89fc9  0.0s
 => [internal] load build context                                                                              0.0s
 => => transferring context: 127B                                                                              0.0s
 => CACHED [2/4] WORKDIR /App                                                                                  0.0s
 => [3/4] COPY ./ ./                                                                                           0.0s
 => [4/4] RUN npm install                                                                                      2.5s
 => exporting to image                                                                                         0.2s
 => => exporting layers                                                                                        0.2s
 => => writing image sha256:fc399e098831198ede281b667255a880fb704d3aaa9651cfc2b33d9efcedf84a                   0.0s
 => => naming to docker.io/d4nitrix13/express                                                                  0.0s

 1 warning found (use --debug to expand):
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 21)
```

---

### ***Ejecución del contenedor***

**Ejecutamos el contenedor basado en la imagen recién construida:**

```bash
docker run -it -p 3000:3000 --rm d4nitrix13/express:latest

> 01-app-node-expressjs@1.0.0 start
> node ./src/index.js

Example app listening on port 3000
```

**Realizamos una petición con curl para verificar que la aplicación está funcionando correctamente:**

```bash
curl 127.0.0.1:3000
Hello World!
```

- *Estos pasos demuestran cómo reconstruir una imagen Docker con un tag existente, manejar imágenes dangling y ejecutar un contenedor para verificar el funcionamiento de una aplicación Node.js con Express.js dentro de Docker.*

---

### ***Evitando Reconstrucciones Innecesarias de Capas en Imágenes Docker***

- *Cuando realizamos cambios simples en ficheros como `./src/index.js`, como por ejemplo modificar un mensaje de registro, esto afecta directamente a la capa de copia en nuestro Dockerfile. Aquí está el fichero `./src/index.js` antes y después del cambio:*

**Antes:**

```javascript
// Autor: Daniel Benjamin Perez Morales
// GitHub: https://github.com/DanielPerezMoralesDev13
// Correo electrónico: danielperezdev@proton.me

// Por defecto escucha en 0.0.0.0

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

**Después:**

```javascript
// Autor: Daniel Benjamin Perez Morales
// GitHub: https://github.com/DanielPerezMoralesDev13
// Correo electrónico: danielperezdev@proton.me

// Por defecto escucha en 0.0.0.0

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`) // Cambio realizado aquí
})
```

---

### ***Problema en el Dockerfile***

- *En el Dockerfile original, la instrucción `COPY ./ ./` copia todos los ficheros y directorios cada vez que se realiza una reconstrucción, lo cual es ineficiente, especialmente cuando solo se han realizado cambios menores en ficheros específicos como `./src/index.js`.*

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Imagen base que utilizaremos
FROM node:lts

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /App

# Copiamos todo los ficheros package*.json a el directorio /App del contenedor
COPY ./package*.json ./

# Instalamos las dependencias para nuestra aplicación web
RUN npm install

# Copiamos todo el directorio a el directorio /App del contenedor
COPY ./ ./


# Escucha por el puerto 3000
EXPOSE 3000

# Shell Form
CMD npm start
```

---

### ***Solución Propuesta***

- *Para evitar la reconstrucción innecesaria de capas, podemos optimizar el Dockerfile. Primero, copiamos solo los ficheros `package*.json` y ejecutamos `npm install` para instalar las dependencias. Luego, copiamos el resto de los ficheros y directorios. Esto asegura que las capas de instalación de dependencias no se reconstruyan cada vez que se realicen cambios en ficheros no relacionados con las dependencias.*

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Imagen que usaremos
FROM node:lts

# Creamos el directorio /App
WORKDIR /App

# Copiamos solo los ficheros package*.json a el directorio /App del contenedor
COPY ./package*.json ./

# Instalamos las dependencias para que funcione nuestra aplicacion web
RUN npm install

# Copiamos todo el directorio a el directorio /App del contenedor
COPY ./ ./


# Escucha por el puerto 3000
EXPOSE 3000

# Shell Form
CMD npm start
```

---

### ***Reconstrucción de la Imagen***

**Al reconstruir la imagen con estos cambios, observamos que las capas se manejan de manera más eficiente:**

```bash
docker build -t d4nitrix13/express .
[+] Building 3.7s (10/10) FINISHED                                                                   docker:default
 => [internal] load build definition from Dockerfile                                                           0.0s
 => => transferring dockerfile: 599B                                                                           0.0s
 => [internal] load metadata for docker.io/library/node:lts                                                    0.7s
 => [internal] load .dockerignore                                                                              0.0s
 => => transferring context: 77B                                                                               0.0s
 => [1/5] FROM docker.io/library/node:lts@sha256:b849bc4078c3e16a38d72749ab8faeacbcc6c3bdb742399b4a5974a89fc9  0.0s
 => [internal] load build context                                                                              0.0s
 => => transferring context: 127B                                                                              0.0s
 => CACHED [2/5] WORKDIR /App                                                                                  0.0s
 => [3/5] COPY ./package*.json ./                                                                              0.0s
 => [4/5] RUN npm install                                                                                      2.6s
 => [5/5] COPY ./ ./                                                                                           0.1s
 => exporting to image                                                                                         0.2s
 => => exporting layers                                                                                        0.2s
 => => writing image sha256:68cf3b08c5fe8f1cc626d5b1fe87949c2621304daa7f70e87f5b88214de43e48                   0.0s
 => => naming to docker.io/d4nitrix13/express                                                                  0.0s

 1 warning found (use --debug to expand):
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 25)
```

- *Este enfoque garantiza una construcción eficiente de imágenes Docker, minimizando la sobrecarga causada por cambios mínimos en ficheros no relacionados con las dependencias de la aplicación.*

---

### ***Optimización de Construcción de Imágenes Docker con Cambios Mínimos***

- *Cuando realizamos cambios en ficheros específicos como `src/index.js`, por ejemplo, modificando el mensaje de registro a `console.log(`Example App Listening on Port ${port}`);`, Docker optimiza la construcción de la imagen reutilizando capas previamente cachadas siempre que sea posible.*

**Cambio en `src/index.js`:**

```javascript
// Autor: Daniel Benjamin Perez Morales
// GitHub: https://github.com/DanielPerezMoralesDev13
// Correo electrónico: danielperezdev@proton.me

// Por defecto escucha en 0.0.0.0

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example App Listening on Port ${port}`); // Cambio realizado aquí
})
```

---

### ***Comportamiento al Construir la Imagen Docker***

- *Cuando construimos la imagen después de este cambio, Docker reconoce que no ha habido modificaciones en `package*.json`, por lo tanto, la fase de instalación de dependencias (`RUN npm install`) está cacheada y no se ejecuta nuevamente. La construcción de la imagen comienza desde la capa de copia de los ficheros de la aplicación (`COPY ./ ./`), lo que acelera significativamente el proceso.*

---

### ***Ejemplo de Construcción de Imagen***

**Al ejecutar `docker build -t d4nitrix13/express .`, observamos cómo Docker optimiza la construcción:**

```bash
docker build -t d4nitrix13/express .
[+] Building 1.0s (10/10) FINISHED                                                                   docker:default
 => [internal] load build definition from Dockerfile                                                           0.0s
 => => transferring dockerfile: 599B                                                                           0.0s
 => [internal] load metadata for docker.io/library/node:lts                                                    0.8s
 => [internal] load .dockerignore                                                                              0.0s
 => => transferring context: 77B                                                                               0.0s
 => [1/5] FROM docker.io/library/node:lts@sha256:b849bc4078c3e16a38d72749ab8faeacbcc6c3bdb742399b4a5974a89fc9  0.0s
 => [internal] load build context                                                                              0.0s
 => => transferring context: 539B                                                                              0.0s
 => CACHED [2/5] WORKDIR /App                                                                                  0.0s
 => CACHED [3/5] COPY ./package*.json ./                                                                       0.0s
 => CACHED [4/5] RUN npm install                                                                               0.0s
 => [5/5] COPY ./ ./                                                                                           0.0s
 => exporting to image                                                                                         0.0s
 => => exporting layers                                                                                        0.0s
 => => writing image sha256:6f6a2113fc15b708371c0ed67a42f914651054710075cf395d2627d7d41bb556                   0.0s
 => => naming to docker.io/d4nitrix13/express                                                                  0.0s

 1 warning found (use --debug to expand):
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 25)
```

---

### ***Ejecución del Contenedor***

**Para verificar que la aplicación funciona correctamente, ejecutamos el contenedor:**

```bash
docker run -it -p 3000:3000 --rm d4nitrix13/express

> 01-app-node-expressjs@1.0.0 start
> node ./src/index.js

Example App Listening on Port 3000
```

- *La optimización de Docker al utilizar capas cachadas reduce significativamente el tiempo de construcción de la imagen, lo cual es crucial en entornos de desarrollo y despliegue continuos.*

---

### ***Gestión de Imágenes Dangling en Docker***

> [!NOTE]
> *En Docker, es común acumular imágenes "dangling" cuando etiquetamos varias veces con el mismo tag. Estas imágenes no están asociadas con ninguna etiqueta y pueden ocupar espacio innecesario en el sistema.*

---

#### ***Listar Imágenes Dangling***

```bash
docker images
REPOSITORY           TAG              IMAGE ID       CREATED             SIZE
d4nitrix13/express   latest           6f6a2113fc15   7 minutes ago       1.1GB
<none>               <none>           68cf3b08c5fe   11 minutes ago      1.1GB
<none>               <none>           86a93a0599b0   19 minutes ago      1.1GB
<none>               <none>           fc399e098831   30 minutes ago      1.1GB
<none>               <none>           813977b17cfc   About an hour ago   1.1GB
d4nitrix13/node      alpine           13c6c1fc0ef9   19 hours ago        133MB
d4nitrix13/node      slim             6534ebe4c0da   20 hours ago        199MB
d4nitrix13/node      preconfigurado   e91cd2aec686   20 hours ago        1.1GB
d4nitrix13/node      borrar           3ebd8c5808d3   4 days ago          345MB
mysql                latest           05247af91864   10 days ago         578MB
```

---

#### ***Eliminar Imágenes Dangling***

**Para eliminar estas imágenes y liberar espacio:**

```bash
docker image prune
WARNING! This will remove all dangling images.
Are you sure you want to continue? [y/N] y
Deleted Images:
deleted: sha256:68cf3b08c5fe8f1cc626d5b1fe87949c2621304daa7f70e87f5b88214de43e48
deleted: sha256:fc399e098831198ede281b667255a880fb704d3aaa9651cfc2b33d9efcedf84a
deleted: sha256:813977b17cfcc197f4273c131aeb87570ea010cd8e2b0ef393b81729e5079259
deleted: sha256:86a93a0599b0cf3865017a5349df1c24a17120ce726faa1c142d7f671887a56f

Total reclaimed space: 0B
```

#### ***Verificar Imágenes Actualizadas***

**Después de eliminar las imágenes dangling, el resultado sería:**

```bash
docker images
REPOSITORY           TAG              IMAGE ID       CREATED         SIZE
d4nitrix13/express   latest           6f6a2113fc15   7 minutes ago   1.1GB
d4nitrix13/node      alpine           13c6c1fc0ef9   19 hours ago    133MB
d4nitrix13/node      slim             6534ebe4c0da   20 hours ago    199MB
d4nitrix13/node      preconfigurado   e91cd2aec686   20 hours ago    1.1GB
d4nitrix13/node      borrar           3ebd8c5808d3   4 days ago      345MB
mysql                latest           05247af91864   10 days ago     578MB
```

- *Este proceso ayuda a mantener limpio el entorno Docker al eliminar imágenes que ya no se utilizan, optimizando el uso del espacio en disco.*

**La estructura de directorios y ficheros seria la siguiente:**

```bash
lsd -la
drwxrwxr-x d4nitrix13 d4nitrix13 4.0 KB Fri Jun 28 12:50:11 2024  .
drwxrwxr-x d4nitrix13 d4nitrix13 4.0 KB Fri Jun 28 12:22:38 2024  ..
.rw-rw-r-- d4nitrix13 d4nitrix13 184 B  Fri Jun 28 12:51:53 2024  Dockerfile
drwxrwxr-x d4nitrix13 d4nitrix13 4.0 KB Fri Jun 28 12:25:29 2024  node_modules
.rw-rw-r-- d4nitrix13 d4nitrix13  25 KB Fri Jun 28 12:25:29 2024  package-lock.json
.rw-rw-r-- d4nitrix13 d4nitrix13 327 B  Fri Jun 28 12:36:34 2024  package.json
drwxrwxr-x d4nitrix13 d4nitrix13 4.0 KB Fri Jun 28 12:28:35 2024 󱧼 src
```

```bash
tree -C .
[01;34m./[0m
├── Dockerfile
├── [01;34mnode_modules[0m
│   ├── [01;34maccepts[0m
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34marray-flatten[0m
│   │   ├── array-flatten.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34mbody-parser[0m
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── [01;34mlib[0m
│   │   │   ├── read.js
│   │   │   └── [01;34mtypes[0m
│   │   │       ├── json.js
│   │   │       ├── raw.js
│   │   │       ├── text.js
│   │   │       └── urlencoded.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   ├── README.md
│   │   └── SECURITY.md
│   ├── [01;34mbytes[0m
│   │   ├── History.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── Readme.md
│   ├── [01;34mcall-bind[0m
│   │   ├── callBound.js
│   │   ├── CHANGELOG.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   ├── README.md
│   │   └── [01;34mtest[0m
│   │       ├── callBound.js
│   │       └── index.js
│   ├── [01;34mcontent-disposition[0m
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34mcontent-type[0m
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34mcookie[0m
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   ├── README.md
│   │   └── SECURITY.md
│   ├── [01;34mcookie-signature[0m
│   │   ├── History.md
│   │   ├── index.js
│   │   ├── package.json
│   │   └── Readme.md
│   ├── [01;34mdebug[0m
│   │   ├── CHANGELOG.md
│   │   ├── component.json
│   │   ├── karma.conf.js
│   │   ├── LICENSE
│   │   ├── Makefile
│   │   ├── node.js
│   │   ├── package.json
│   │   ├── README.md
│   │   └── [01;34msrc[0m
│   │       ├── browser.js
│   │       ├── debug.js
│   │       ├── index.js
│   │       ├── inspector-log.js
│   │       └── node.js
│   ├── [01;34mdefine-data-property[0m
│   │   ├── CHANGELOG.md
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── [01;34mtest[0m
│   │   │   └── index.js
│   │   └── tsconfig.json
│   ├── [01;34mdepd[0m
│   │   ├── History.md
│   │   ├── index.js
│   │   ├── [01;34mlib[0m
│   │   │   └── [01;34mbrowser[0m
│   │   │       └── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── Readme.md
│   ├── [01;34mdestroy[0m
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34mee-first[0m
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34mencodeurl[0m
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34mescape-html[0m
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── Readme.md
│   ├── [01;34mes-define-property[0m
│   │   ├── CHANGELOG.md
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── [01;34mtest[0m
│   │   │   └── index.js
│   │   └── tsconfig.json
│   ├── [01;34mes-errors[0m
│   │   ├── CHANGELOG.md
│   │   ├── eval.d.ts
│   │   ├── eval.js
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   ├── range.d.ts
│   │   ├── range.js
│   │   ├── README.md
│   │   ├── ref.d.ts
│   │   ├── ref.js
│   │   ├── syntax.d.ts
│   │   ├── syntax.js
│   │   ├── [01;34mtest[0m
│   │   │   └── index.js
│   │   ├── tsconfig.json
│   │   ├── type.d.ts
│   │   ├── type.js
│   │   ├── uri.d.ts
│   │   └── uri.js
│   ├── [01;34metag[0m
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34mexpress[0m
│   │   ├── History.md
│   │   ├── index.js
│   │   ├── [01;34mlib[0m
│   │   │   ├── application.js
│   │   │   ├── express.js
│   │   │   ├── [01;34mmiddleware[0m
│   │   │   │   ├── init.js
│   │   │   │   └── query.js
│   │   │   ├── request.js
│   │   │   ├── response.js
│   │   │   ├── [01;34mrouter[0m
│   │   │   │   ├── index.js
│   │   │   │   ├── layer.js
│   │   │   │   └── route.js
│   │   │   ├── utils.js
│   │   │   └── view.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── Readme.md
│   ├── [01;34mfinalhandler[0m
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   ├── README.md
│   │   └── SECURITY.md
│   ├── [01;34mforwarded[0m
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34mfresh[0m
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34mfunction-bind[0m
│   │   ├── CHANGELOG.md
│   │   ├── implementation.js
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   ├── README.md
│   │   └── [01;34mtest[0m
│   │       └── index.js
│   ├── [01;34mget-intrinsic[0m
│   │   ├── CHANGELOG.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   ├── README.md
│   │   └── [01;34mtest[0m
│   │       └── GetIntrinsic.js
│   ├── [01;34mgopd[0m
│   │   ├── CHANGELOG.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   ├── README.md
│   │   └── [01;34mtest[0m
│   │       └── index.js
│   ├── [01;34mhasown[0m
│   │   ├── CHANGELOG.md
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   ├── README.md
│   │   └── tsconfig.json
│   ├── [01;34mhas-property-descriptors[0m
│   │   ├── CHANGELOG.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   ├── README.md
│   │   └── [01;34mtest[0m
│   │       └── index.js
│   ├── [01;34mhas-proto[0m
│   │   ├── CHANGELOG.md
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── [01;34mtest[0m
│   │   │   └── index.js
│   │   └── tsconfig.json
│   ├── [01;34mhas-symbols[0m
│   │   ├── CHANGELOG.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── shams.js
│   │   └── [01;34mtest[0m
│   │       ├── index.js
│   │       ├── [01;34mshams[0m
│   │       │   ├── core-js.js
│   │       │   └── get-own-property-symbols.js
│   │       └── tests.js
│   ├── [01;34mhttp-errors[0m
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34miconv-lite[0m
│   │   ├── Changelog.md
│   │   ├── [01;34mencodings[0m
│   │   │   ├── dbcs-codec.js
│   │   │   ├── dbcs-data.js
│   │   │   ├── index.js
│   │   │   ├── internal.js
│   │   │   ├── sbcs-codec.js
│   │   │   ├── sbcs-data-generated.js
│   │   │   ├── sbcs-data.js
│   │   │   ├── [01;34mtables[0m
│   │   │   │   ├── big5-added.json
│   │   │   │   ├── cp936.json
│   │   │   │   ├── cp949.json
│   │   │   │   ├── cp950.json
│   │   │   │   ├── eucjp.json
│   │   │   │   ├── gb18030-ranges.json
│   │   │   │   ├── gbk-added.json
│   │   │   │   └── shiftjis.json
│   │   │   ├── utf16.js
│   │   │   └── utf7.js
│   │   ├── [01;34mlib[0m
│   │   │   ├── bom-handling.js
│   │   │   ├── extend-node.js
│   │   │   ├── index.d.ts
│   │   │   ├── index.js
│   │   │   └── streams.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34minherits[0m
│   │   ├── inherits_browser.js
│   │   ├── inherits.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34mipaddr.js[0m
│   │   ├── ipaddr.min.js
│   │   ├── [01;34mlib[0m
│   │   │   ├── ipaddr.js
│   │   │   └── ipaddr.js.d.ts
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34mmedia-typer[0m
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34mmerge-descriptors[0m
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34mmethods[0m
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34mmime[0m
│   │   ├── CHANGELOG.md
│   │   ├── [01;32mcli.js[0m
│   │   ├── LICENSE
│   │   ├── mime.js
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── [01;34msrc[0m
│   │   │   ├── [01;32mbuild.js[0m
│   │   │   └── test.js
│   │   └── types.json
│   ├── [01;34mmime-db[0m
│   │   ├── db.json
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34mmime-types[0m
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34mms[0m
│   │   ├── index.js
│   │   ├── license.md
│   │   ├── package.json
│   │   └── readme.md
│   ├── [01;34mnegotiator[0m
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── [01;34mlib[0m
│   │   │   ├── charset.js
│   │   │   ├── encoding.js
│   │   │   ├── language.js
│   │   │   └── mediaType.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34mobject-inspect[0m
│   │   ├── CHANGELOG.md
│   │   ├── [01;34mexample[0m
│   │   │   ├── all.js
│   │   │   ├── circular.js
│   │   │   ├── fn.js
│   │   │   └── inspect.js
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   ├── package-support.json
│   │   ├── readme.markdown
│   │   ├── [01;34mtest[0m
│   │   │   ├── bigint.js
│   │   │   ├── [01;34mbrowser[0m
│   │   │   │   └── dom.js
│   │   │   ├── circular.js
│   │   │   ├── deep.js
│   │   │   ├── element.js
│   │   │   ├── err.js
│   │   │   ├── fakes.js
│   │   │   ├── fn.js
│   │   │   ├── global.js
│   │   │   ├── has.js
│   │   │   ├── holes.js
│   │   │   ├── indent-option.js
│   │   │   ├── inspect.js
│   │   │   ├── lowbyte.js
│   │   │   ├── number.js
│   │   │   ├── quoteStyle.js
│   │   │   ├── toStringTag.js
│   │   │   ├── undef.js
│   │   │   └── values.js
│   │   ├── test-core-js.js
│   │   └── util.inspect.js
│   ├── [01;34mon-finished[0m
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34mparseurl[0m
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34mpath-to-regexp[0m
│   │   ├── History.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── Readme.md
│   ├── [01;34mproxy-addr[0m
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34mqs[0m
│   │   ├── CHANGELOG.md
│   │   ├── [01;34mdist[0m
│   │   │   └── qs.js
│   │   ├── [01;34mlib[0m
│   │   │   ├── formats.js
│   │   │   ├── index.js
│   │   │   ├── parse.js
│   │   │   ├── stringify.js
│   │   │   └── utils.js
│   │   ├── LICENSE.md
│   │   ├── package.json
│   │   ├── README.md
│   │   └── [01;34mtest[0m
│   │       ├── parse.js
│   │       ├── stringify.js
│   │       └── utils.js
│   ├── [01;34mrange-parser[0m
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34mraw-body[0m
│   │   ├── HISTORY.md
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   ├── README.md
│   │   └── SECURITY.md
│   ├── [01;34msafe-buffer[0m
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34msafer-buffer[0m
│   │   ├── dangerous.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   ├── Porting-Buffer.md
│   │   ├── Readme.md
│   │   ├── safer.js
│   │   └── tests.js
│   ├── [01;34msend[0m
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── [01;34mnode_modules[0m
│   │   │   └── [01;34mms[0m
│   │   │       ├── index.js
│   │   │       ├── license.md
│   │   │       ├── package.json
│   │   │       └── readme.md
│   │   ├── package.json
│   │   ├── README.md
│   │   └── SECURITY.md
│   ├── [01;34mserve-static[0m
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34mset-function-length[0m
│   │   ├── CHANGELOG.md
│   │   ├── env.d.ts
│   │   ├── env.js
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   ├── README.md
│   │   └── tsconfig.json
│   ├── [01;34msetprototypeof[0m
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   ├── README.md
│   │   └── [01;34mtest[0m
│   │       └── index.js
│   ├── [01;34mside-channel[0m
│   │   ├── CHANGELOG.md
│   │   ├── index.d.ts
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── [01;34mtest[0m
│   │   │   └── index.js
│   │   └── tsconfig.json
│   ├── [01;34mstatuses[0m
│   │   ├── codes.json
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34mtoidentifier[0m
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34mtype-is[0m
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34munpipe[0m
│   │   ├── HISTORY.md
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   ├── [01;34mutils-merge[0m
│   │   ├── index.js
│   │   ├── LICENSE
│   │   ├── package.json
│   │   └── README.md
│   └── [01;34mvary[0m
│       ├── HISTORY.md
│       ├── index.js
│       ├── LICENSE
│       ├── package.json
│       └── README.md
├── null
├── package.json
├── package-lock.json
└── [01;34msrc[0m
    └── index.js

100 directories, 463 files
```
