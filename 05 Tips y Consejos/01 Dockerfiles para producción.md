<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->

# ***Dockerfiles para Producción***

- **Dockerizar una aplicación para producción puede variar según el entorno y las necesidades específicas. A continuación, revisaremos cómo adaptar el Dockerfile para un entorno de producción, tomando como ejemplo una aplicación Node.js con Express.**

## ***Estructura del Proyecto***

**El proyecto tiene la siguiente estructura:**

```bash
tree -fCL 1 ./00\ App\ Node\ ExpressJS\ Production/
./00 App Node ExpressJS Production
├── ./00 App Node ExpressJS Production/Dockerfile
├── ./00 App Node ExpressJS Production/node_modules
├── ./00 App Node ExpressJS Production/package.json
├── ./00 App Node ExpressJS Production/package-lock.json
└── ./00 App Node ExpressJS Production/src
```

---

### ***Dockerfile Básico***

**Primero, creamos una copia del Dockerfile básico para empezar a personalizarlo para producción:**

```bash
cp Dockerfile Dockerfile.basic
```

**Revisamos el contenido del Dockerfile básico:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Imagen base de Node.js LTS
FROM node:lts

# Establecemos el directorio de trabajo en el contenedor
WORKDIR /App

# Copiamos los ficheros package*.json al directorio de trabajo del contenedor
COPY ./package*.json ./

# Instalamos las dependencias necesarias
RUN npm install

# Copiamos todo el contenido del proyecto al directorio de trabajo del contenedor
COPY ./ ./

# Exponemos el puerto 3000 para acceder a la aplicación
EXPOSE 3000

# Usamos la forma Shell para ejecutar "npm start"
CMD npm start
```

---

### ***Mejoras para Producción***

---

#### ***Uso de un Usuario No Privilegiado***

- *Por defecto, el usuario en el contenedor es `root`, lo cual representa un riesgo de seguridad. Si un atacante obtiene acceso al contenedor, podría tener acceso completo al sistema, ya que `root` es un usuario privilegiado. Para mitigar este riesgo, es recomendable ejecutar la aplicación con un usuario no privilegiado.*

- **Para ello, primero creamos un nuevo usuario y cambiamos el contexto de usuario en el contenedor:**

```Dockerfile
# Base de la imagen que utilizaremos (Node.js en su versión LTS)
FROM node:lts

# Creación de un nuevo usuario llamado "d4nitrix13"
RUN useradd -m d4nitrix13

# Establecemos al usuario "d4nitrix13" para ejecutar los comandos siguientes
USER d4nitrix13

# Definimos el directorio de trabajo dentro del contenedor como "/App"
WORKDIR /App

# Copiamos los ficheros package*.json al directorio de trabajo en el contenedor,
# asegurándonos de que el propietario y grupo sean "d4nitrix13"
COPY --chown=d4nitrix13:d4nitrix13 ./package*.json ./

# Instalamos las dependencias necesarias para que la aplicación web funcione correctamente
RUN npm install

# Copiamos todo el contenido del directorio actual al directorio de trabajo "/App" del contenedor
# Manteniendo la propiedad del usuario "d4nitrix13"
COPY --chown=d4nitrix13:d4nitrix13 ./ ./

# Exponemos el puerto 3000 para acceder a la aplicación desde fuera del contenedor
EXPOSE 3000

# Usamos la forma Shell para ejecutar "npm start" y levantar la aplicación
CMD npm start
```

---

### ***Mejoras con Usuarios No Privilegiados***

- *En algunos casos, no es necesario crear un usuario personalizado para la aplicación, ya que algunas imágenes base de Docker ya incluyen usuarios no privilegiados. En el caso de la imagen `node:lts`, esta imagen ya tiene un usuario llamado `node` que podemos utilizar para evitar ejecutar el contenedor como `root`.*

- **Para adaptar el Dockerfile a esta configuración, primero hacemos una copia del Dockerfile existente para modificarlo sin afectar el original:**

```bash
cp Dockerfile Dockerfile.user
```

**Luego, sobrescribimos el Dockerfile con la siguiente configuración:**

```Dockerfile
# Base de la imagen que utilizaremos (Node.js en su versión LTS)
FROM node:lts

# Establecemos al usuario "node" para ejecutar los comandos siguientes
USER node

# Definimos el directorio de trabajo dentro del contenedor como "/App"
WORKDIR /App

# Copiamos los ficheros package*.json al directorio de trabajo en el contenedor,
# asegurándonos de que el propietario y grupo sean "node"
COPY --chown=node:node ./package*.json ./

# Instalamos las dependencias necesarias para que la aplicación web funcione correctamente
RUN npm install

# Copiamos todo el contenido del directorio actual al directorio de trabajo "/App" del contenedor
# Manteniendo la propiedad del usuario "node"
COPY --chown=node:node ./ ./

# Exponemos el puerto 3000 para acceder a la aplicación desde fuera del contenedor
EXPOSE 3000

# Usamos la forma Shell para ejecutar "npm start" y levantar la aplicación
CMD npm start
```

---

### ***Explicación de los Cambios***

1. **Uso del Usuario `node`:** *En lugar de crear un usuario personalizado, utilizamos el usuario `node` que ya está presente en la imagen base. Esto simplifica la configuración y sigue las mejores prácticas de seguridad.*

2. **Propiedad de Ficheros y Directorios:** *Al usar la opción `--chown=node:node`, nos aseguramos de que todos los ficheros copiados al contenedor sean propiedad del usuario `node`, lo que evita problemas de permisos y mejora la seguridad.*

3. **Directorio de Trabajo:** *Definimos el directorio de trabajo en `/App`, que es donde se copiarán todos los ficheros de la aplicación y se ejecutará el servidor.*

4. **Exposición del Puerto:** *Exponemos el puerto 3000 para permitir el acceso a la aplicación desde fuera del contenedor.*

5. **Comando de Inicio:** *Utilizamos la forma Shell para ejecutar el comando `npm start`, que inicia la aplicación Node.js.*

---

### ***Uso del `.dockerignore`***

**Para mantener la imagen del contenedor limpia y evitar copiar ficheros innecesarios, es crucial configurar el fichero `.dockerignore` correctamente. Evitamos incluir directorios y ficheros que no son necesarios en el contenedor, como el directorio `.git`, que contiene información de versiones y puede ser bastante grande.**

**El fichero `.dockerignore` debería tener el siguiente contenido:**

```bash
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Ignorar el directorio node_modules para evitar incluir dependencias locales
node_modules

# Ignorar el Dockerfile y el fichero .dockerignore para evitar copiar ficheros de configuración
Dockerfile
.dockerignore

# Ignorar el directorio .git, que contiene información de versiones del proyecto
.git*
```

---

### ***Configuración para Producción***

- **Node.js, por defecto, ejecuta el servidor en modo desarrollo. Para configurarlo en modo producción, debemos establecer la variable de entorno `NODE_ENV` a `production`. Esto permite que Node.js optimice el servidor, cachee vistas y reduzca la información que se muestra, como los detalles de los call stacks y las pilas de llamadas, que no son necesarios en producción. En modo desarrollo, se proporciona más información útil para depuración, pero en producción, esta información adicional puede ser un riesgo de seguridad si un atacante obtiene acceso al servidor.**

**Para establecer el entorno de producción, agregamos la siguiente línea en el Dockerfile:**

```Dockerfile
# Establecemos el entorno de Node.js a producción
ENV NODE_ENV=production
```

---

#### ***Instalación de Dependencias***

- *Para instalar las dependencias en modo producción, tenemos varias opciones. Aunque podríamos usar `npm install --only=production`, esta opción no es recomendada debido a su falta de flexibilidad en comparación con otras opciones más modernas.*

```Dockerfile
RUN npm install --only=production
```

**Una mejor práctica es usar `npm ci` en lugar de `npm install`. Aquí está la diferencia:**

- **`npm install --only=production`:** *Instala solo las dependencias necesarias para la producción, omitiendo las dependencias de desarrollo. Sin embargo, esta opción puede no ser tan eficiente en términos de consistencia y rendimiento en comparación con `npm ci`.*

- **`npm ci --only=production` o `npm ci --omit=dev`:**
  - *`npm ci` es más adecuado para entornos de integración continua y proporciona una instalación más rápida y consistente de las dependencias. La opción `--omit=dev` elimina las dependencias de desarrollo, similar a `--only=production`, pero con las ventajas adicionales de `npm ci`, como la instalación más rápida y la limpieza previa del directorio `node_modules`.*

```Dockerfile
RUN npm ci --omit=dev
```

```Dockerfile
RUN npm ci --only=production
```

- *La opción `npm ci` asegura que las dependencias se instalen exactamente como están definidas en el fichero `package-lock.json`, lo que proporciona una mayor certeza en la instalación de dependencias y evita problemas relacionados con versiones de paquetes.*

- *Para obtener más información sobre las diferencias entre `npm install` y `npm ci`, consulta este [foro](https://stackoverflow.com/questions/52499617/what-is-the-difference-between-npm-install-and-npm-ci "https://stackoverflow.com/questions/52499617/what-is-the-difference-between-npm-install-and-npm-ci").*

---

#### ***Nuevo Dockerfile Mejorado***

**Aquí está el Dockerfile mejorado para producción:**

```Dockerfile
# Base de la imagen que utilizaremos (Node.js en su versión LTS)
FROM node:lts

# Establecemos al usuario "node" para ejecutar los comandos siguientes
USER node

# Definimos el directorio de trabajo dentro del contenedor como "/App"
WORKDIR /App

# Establecemos el entorno de Node.js a producción
ENV NODE_ENV=production

# Copiamos los ficheros package*.json al directorio de trabajo en el contenedor,
# asegurándonos de que el propietario y grupo sean "node"
COPY --chown=node:node ./package*.json ./

# Instalamos las dependencias necesarias para la producción usando npm ci
RUN npm ci --omit=dev

# Copiamos todo el contenido del directorio actual al directorio de trabajo "/App" del contenedor
# Manteniendo la propiedad del usuario "node"
COPY --chown=node:node ./ ./

# Exponemos el puerto 3000 para acceder a la aplicación desde fuera del contenedor
EXPOSE 3000

# Usamos la forma Shell para ejecutar "npm start" y levantar la aplicación
CMD npm start
```

---

Aquí tienes la información mejorada sin borrar nada:

---

### ***Especificación de la Versión de la Imagen***

> [!NOTE]
> *Es importante especificar la versión exacta de la imagen de Docker que deseas utilizar, en lugar de usar etiquetas como `lts` o `latest`. Las etiquetas como `latest` y `lts` pueden cambiar con el tiempo; por ejemplo, `latest` puede ser `20.17.0` en un momento y `22.10.2` en otro. Esto puede causar inconsistencias en tu entorno de producción si no se controla cuidadosamente. Además, utilizar una versión derivada, como `alpine`, puede ayudar a reducir el tamaño de la imagen, ya que Alpine es una distribución minimalista de Linux.*

- **Para especificar la versión exacta y optimizar el tamaño de la imagen, usa una imagen base como `node:18.15.0-alpine` en lugar de `node:lts`:**

```Dockerfile
ARG VERSION=18.15.0-alpine

# Base de la imagen que utilizaremos: Node.js versión LTS en Alpine para menor tamaño de la imagen
FROM node:${VERSION} AS builder
```

---

### ***Uso de Formato Exec en el Comando del Contenedor***

**Es recomendable usar el formato exec para el comando del contenedor en lugar del formato shell.**

---

#### ***Formato Shell***

- *Si usas el formato shell, como `CMD npm start`, Docker ejecuta el comando a través de un shell. Este shell luego ejecuta el comando especificado. El flujo es el siguiente:*

- *`sh` ejecuta `npm start`*
- *`npm start` ejecuta otro shell que ejecuta `node ./src/index.js`*

- **En este caso, el proceso final (`node ./src/index.js`) no es el proceso principal del contenedor. El shell y `npm start` son procesos intermedios.**

---

#### ***Formato Exec***

- **Usar el formato exec asegura que el proceso especificado sea el proceso principal del contenedor, lo que mejora la gestión de señales y la eficiencia. Por ejemplo, en lugar de:**

```Dockerfile
CMD npm start
```

**Debes usar:**

```Dockerfile
CMD [ "node", "./src/index.js" ]
```

- *Esto garantiza que `node` sea el proceso principal y evita problemas relacionados con la gestión de señales.*

---

### ***Manejo de Señales del Kernel***

- *Cuando un proceso Docker se ejecuta como PID 1, se comporta de manera especial. En particular, un proceso con PID 1 no maneja señales de la misma manera que otros procesos. Si `node` está ejecutándose como PID 1, no manejará señales como `SIGINT` (Ctrl-C) adecuadamente a menos que se configure un handler para esas señales.*

- *Un proceso que no es el proceso principal del contenedor (PID 1) generalmente maneja señales de manera estándar. Si no se configura un manejador específico para una señal, el proceso normalmente termina al recibir esa señal.*

- *Sin embargo, cuando un proceso es el proceso principal del contenedor (PID 1), su comportamiento con respecto a las señales es diferente. Si un proceso con PID 1 no tiene un manejador específico para una señal, esa señal puede ser ignorada. Esto se debe a que los procesos con PID 1 tienen un tratamiento especial en el sistema operativo. Por ejemplo, señales como `SIGTERM` o `SIGINT` no son manejadas de la misma manera que en otros procesos, lo que puede resultar en un comportamiento inesperado si no se configura adecuadamente un manejador de señales.*

- *Para asegurar que el proceso principal del contenedor maneje las señales correctamente, es importante utilizar herramientas o enfoques que permitan una gestión adecuada de señales, como incluir un init system ligero como Tini en el Dockerfile.*

*Para abordar este problema, puedes usar la opción `--init` de Docker para envolver tu proceso Node.js con un sistema init liviano que maneje las señales correctamente. Por ejemplo:*

```bash
docker run -it --init node
```

- **Otra opción es incluir Tini directamente en tu Dockerfile. Tini es un pequeño init system para manejar la señalización y la recolección de procesos zombis:**

---

### ***Referencias Adicionales***

- *Para más detalles sobre el manejo de señales en Node.js y Docker, puedes consultar el [foro de GitHub](https://github.com/nodejs/docker-node/issues/1620 "https://github.com/nodejs/docker-node/issues/1620").*

---

### ***Manejo de Señales en Contenedores Docker***

- *Cuando un contenedor está configurado para ejecutar un proceso como PID 1, es esencial manejar adecuadamente las señales del sistema para garantizar un cierre ordenado. A continuación, se explica cómo manejar las señales en tu código y otras prácticas recomendadas.*

---

#### ***Manejo de Señales en el Código***

- *Debido a que el proceso principal del contenedor (PID 1) puede no manejar señales de manera predeterminada, es crucial implementar el manejo de señales en tu código. Por ejemplo, puedes manejar señales como `SIGTERM`, que Docker utiliza para detener los contenedores. Ten en cuenta que Docker envía la señal `SIGTERM` y espera hasta 10 segundos para cerrar el contenedor antes de enviar una señal de terminación más forzada (`SIGKILL`). Por lo tanto, tu aplicación debe cerrar adecuadamente todas las conexiones a bases de datos, sockets y demás recursos durante este tiempo.*

**Aquí tienes un ejemplo en Node.js para manejar las señales `SIGTERM` y `SIGINT`:**

```javascript
const express = require('express');
const app = express();
const port = 3000;

// Definimos una ruta GET en la raíz ("/") que responde con "Hello World!"
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.listen devuelve una instancia del servidor HTTP, que está escuchando en el puerto especificado
const server = app.listen(port, () => {
  console.log(`Aplicación de ejemplo escuchando en el puerto ${port}`);
});

// Manejo de la señal SIGTERM (generalmente enviada para detener procesos en entornos como Kubernetes)
// server.close() deja de aceptar nuevas conexiones, pero sigue procesando las conexiones existentes
// Es un cierre ordenado (graceful shutdown): los clientes nuevos no podrán conectarse, 
// pero los que ya están conectados pueden seguir enviando y recibiendo datos. Una vez que todas las conexiones terminan, 
// se emite el evento 'close'. El callback opcional se ejecuta cuando el servidor se cierra completamente, 
// emitiendo 'SIGTERM' en la consola.
process.once("SIGTERM", () => {
  server.close(() => {
    console.log("SIGTERM");
  });
});

// Manejo de la señal SIGINT (por ejemplo, cuando se presiona Ctrl+C en la terminal para interrumpir el proceso)
// Al igual que con SIGTERM, se realiza un cierre ordenado donde no se aceptan nuevas conexiones, 
// pero las existentes continúan hasta que se completan. El callback se ejecuta al finalizar, emitiendo 'SIGINT'.
process.once("SIGINT", () => {
  server.close(() => {
    console.log("SIGINT");
  });
});
```

#### ***Uso de un Sistema Init***

- **Otra opción para manejar señales y cerrar procesos correctamente es usar un sistema init ligero como Tini o Dumb Init, que está diseñado para ser el proceso PID 1. Estos sistemas init manejan las señales adecuadamente y permiten que el proceso principal funcione sin problemas.**

- **[Tini](https://github.com/krallin/tini "https://github.com/krallin/tini"):** *Puedes usar Tini como init system. Añade Tini a tu Dockerfile y configúralo como `ENTRYPOINT` para que siempre se ejecute como PID 1. La configuración del Dockerfile sería:*

  ```Dockerfile
  # Usamos Tini como init system para manejar señales correctamente
  ENTRYPOINT [ "tini", "--" ]
  CMD [ "node", "./src/index.js" ]
  ```

- **Dumb Init:** *Alternativamente, puedes usar [Dumb Init](https://github.com/Yelp/dumb-init "https://github.com/Yelp/dumb-init") si prefieres otra opción.*

- *Cuando ejecutas `docker run --init`, Docker utiliza un init system como Tini por defecto. Para incluirlo en la imagen, puedes agregarlo al Dockerfile o ejecutar el contenedor con `--init`.*

---

#### ***Manejo de Procesos Hijos y Procesos Zombie***

- *Si el proceso principal ejecuta otros procesos y estos procesos no notifican correctamente su estado de cierre, puedes enfrentar problemas con procesos zombie. Un proceso zombie es un proceso que ha terminado su ejecución, pero su entrada en la tabla de procesos aún no ha sido limpiada. Puedes leer más sobre los procesos zombie en el [documento de IBM](https://www.ibm.com/docs/es/aix/7.3?topic=processes- "https://www.ibm.com/docs/es/aix/7.3?topic=processes-").*

---

#### ***No Instalar Dependencias de Desarrollo***

- *Es importante no instalar dependencias de desarrollo en la imagen de producción. Utiliza comandos como `npm ci --omit=dev` para instalar solo las dependencias necesarias en producción. También, en el caso de aplicaciones en otros lenguajes como Python, usa herramientas específicas como `uvicorn` para producción, y en PHP, asegúrate de utilizar servidores web adecuados como `Nginx` o `Apache`.*

---

#### ***Dividir la Imagen en Varios Stages***

- **Una práctica recomendada es dividir la construcción de la imagen en varios stages (multi-stage builds). Esto ayuda a reducir el tamaño de la imagen final y evita incluir herramientas y dependencias innecesarias en la imagen de producción.**

---

#### ***Dockerfile Final***

```Dockerfile
# ------------------------------------Dockerfile Final--------------------------------

# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# ------------------------------------Stage 0 (Builder)--------------------------------

# Definimos argumentos para la versión de Node.js y el puerto de la aplicación
# VERSION especifica la versión de Node.js y APP_PORT define el puerto en el que la aplicación escuchará.
ARG VERSION=18.15.0-alpine
ARG APP_PORT=3000

# Base de la imagen que utilizaremos: Node.js versión LTS sobre Alpine para obtener una imagen más ligera
FROM node:${VERSION} AS builder

# Instalamos "tini" utilizando apk, el gestor de paquetes de Alpine Linux.
# La opción "--no-cache" evita la creación de ficheros de caché que pueden aumentar el tamaño de la imagen.
RUN apk add --no-cache tini

# Configuramos la variable de entorno NODE_ENV a "production" para optimizar el comportamiento de Node.js en el entorno de producción.
ENV NODE_ENV=production

# Cambiamos el usuario a "node" (predefinido en la imagen base) para ejecutar los comandos siguientes.
USER node

# Establecemos el directorio de trabajo en el contenedor a "/App"
WORKDIR /App

# Copiamos los ficheros package*.json al directorio de trabajo del contenedor.
# La opción --chown=node:node asegura que los ficheros sean propiedad del usuario "node".
COPY --chown=node:node ./package*.json ./

# Instalamos las dependencias necesarias para la aplicación utilizando npm ci.
# La opción --omit=dev evita la instalación de dependencias de desarrollo, reduciendo el tamaño de la imagen.
RUN npm ci --omit=dev

# Copiamos el resto del contenido del directorio actual al directorio de trabajo "/App" en el contenedor.
# Mantenemos la propiedad de los ficheros para el usuario "node".
COPY --chown=node:node ./ ./

# ------------------------------------End Stage 0 (Builder)--------------------------------

# ------------------------------------Stage 1 (Runtime)--------------------------------

# Utilizamos la imagen construida en la etapa anterior como base para la ejecución de la aplicación
FROM builder

# Especificamos el signo que el contenedor debe usar para detenerse (SIGTERM).
# Esto permite que Docker envíe una señal adecuada para detener la aplicación y permitir un apagado limpio.
STOPSIGNAL SIGTERM

# Exponemos el puerto definido en la variable APP_PORT para que el contenedor pueda recibir tráfico en ese puerto desde el exterior.
EXPOSE ${APP_PORT}

# tini es una herramienta para manejar señales y procesos en contenedores Docker.
# La usamos como punto de entrada para garantizar un manejo adecuado de las señales de terminación.
ENTRYPOINT [ "tini", "--" ]

# Ejecutamos la aplicación principal usando Node.js, especificando el fichero principal que inicia la aplicación.
CMD [ "node", "./src/index.js" ]

# ------------------------------------End Stage 1 (Runtime)--------------------------------
```

---

### ***Construcción de la Imagen Docker***

```bash
# Construcción de la imagen Docker utilizando el Dockerfile en el directorio actual.
docker build -t d4nitrix13/express:prod ./
```

```bash
docker build -t d4nitrix13/express:prod ./
[+] Building 21.8s (11/11) FINISHED                                                                                                   docker:default
 => [internal] load build definition from Dockerfile                                                                                            0.0s
 => => transferring dockerfile: 2.83kB                                                                                                          0.0s
 => [internal] load metadata for docker.io/library/node:18.15.0-alpine                                                                          3.2s
 => [internal] load .dockerignore                                                                                                               0.0s
 => => transferring context: 220B                                                                                                               0.0s
 => [builder 1/6] FROM docker.io/library/node:18.15.0-alpine@sha256:47d97b93629d9461d64197773966cc49081cf4463b1b07de5a38b6bd5acfbe9d           12.8s
 => => resolve docker.io/library/node:18.15.0-alpine@sha256:47d97b93629d9461d64197773966cc49081cf4463b1b07de5a38b6bd5acfbe9d                    0.0s
 => => sha256:305c985a481fc143f40c3a5c1cb398756057851f3ab748e381c76fd1ce5b0177 6.48kB / 6.48kB                                                  0.0s
 => => sha256:f56be85fc22e46face30e2c3de3f7fe7c15f8fd7c4e5add29d7f64b87abdaa09 3.37MB / 3.37MB                                                  1.2s
 => => sha256:51fa4270e0ccb40f31d39a195bac1ff5d1070909c60d8341690748af6abee321 47.54MB / 47.54MB                                                9.6s
 => => sha256:a89e758f145e81ebe13f42f7831a348f212dcb3c17bc269201752bb76a9e52cf 2.35MB / 2.35MB                                                  1.3s
 => => sha256:47d97b93629d9461d64197773966cc49081cf4463b1b07de5a38b6bd5acfbe9d 1.43kB / 1.43kB                                                  0.0s
 => => sha256:a3f2350bd3eb48525f801b57934300c11aa3610086b708854ab1c1045c018519 1.16kB / 1.16kB                                                  0.0s
 => => extracting sha256:f56be85fc22e46face30e2c3de3f7fe7c15f8fd7c4e5add29d7f64b87abdaa09                                                       0.1s
 => => sha256:d3f921cbf16e91105a848c0cf6c365c0d7530152d264ce4bdd914a0a3ee00f82 453B / 453B                                                      1.4s
 => => extracting sha256:51fa4270e0ccb40f31d39a195bac1ff5d1070909c60d8341690748af6abee321                                                       2.8s
 => => extracting sha256:a89e758f145e81ebe13f42f7831a348f212dcb3c17bc269201752bb76a9e52cf                                                       0.1s
 => => extracting sha256:d3f921cbf16e91105a848c0cf6c365c0d7530152d264ce4bdd914a0a3ee00f82                                                       0.0s
 => [internal] load build context                                                                                                               0.0s
 => => transferring context: 29.54kB                                                                                                            0.0s
 => [builder 2/6] RUN apk add --no-cache tini                                                                                                   2.1s
 => [builder 3/6] WORKDIR /App                                                                                                                  0.0s
 => [builder 4/6] COPY --chown=node:node ./package*.json ./                                                                                     0.0s
 => [builder 5/6] RUN npm ci --omit=dev                                                                                                         3.2s
 => [builder 6/6] COPY --chown=node:node ./ ./                                                                                                  0.0s
 => exporting to image                                                                                                                          0.2s
 => => exporting layers                                                                                                                         0.2s
 => => writing image sha256:5d947e70f5f87e1d9e4716ea62e91a3f0488e4605eda1999632ec38be260a3d6                                                    0.0s
 => => naming to docker.io/d4nitrix13/express:prod                                                                                              0.0s
```

---

### ***Verificación del Manejo de Señales en Docker***

- *Para verificar que tu aplicación maneja correctamente las señales, como la interrupción de proceso (`SIGINT`) al presionar `Ctrl+C`, puedes ejecutar tu contenedor Docker y probarlo. A continuación se muestra un ejemplo de cómo realizar esta prueba:*

1. **Ejecuta el Contenedor Docker:**

   - *Ejecuta tu contenedor Docker en modo interactivo y asigna el puerto 3000 del contenedor al puerto 3000 en tu máquina host. Usa el comando `docker run` con las opciones necesarias:*

   ```bash
   docker run -it -p 3000:3000 --rm d4nitrix13/express:prod
   ```

   - *Aquí, `-it` permite la interacción con el contenedor en modo terminal, `-p 3000:3000` mapea el puerto 3000 del contenedor al puerto 3000 en el host, y `--rm` elimina el contenedor cuando se detiene.*

2. **Verifica el Funcionamiento de la Aplicación:**

   - *Una vez que el contenedor esté en ejecución, deberías ver un mensaje en la terminal indicando que la aplicación está escuchando en el puerto 3000:*

   ```plaintext
   Aplicación de ejemplo escuchando en el puerto 3000
   ```

3. **Prueba la Interrupción del Contenedor:**

   - *Para verificar que la señal `SIGINT` (generada al presionar `Ctrl+C`) es manejada correctamente por tu aplicación, presiona `Ctrl+C` en la terminal donde se está ejecutando el contenedor. Deberías ver la señal `SIGINT` manejada y registrada en la salida:*

   ```plaintext
   ^CSIGINT
   ```

   - *En este ejemplo, el `^C` indica que `Ctrl+C` fue presionado, y `SIGINT` es el mensaje de log generado por el manejador de señales en tu código.*

*Este proceso asegura que tu aplicación maneja adecuadamente la señal de interrupción y realiza un cierre ordenado. Asegúrate de que tu código está configurado para cerrar conexiones y limpiar recursos antes de finalizar.*

---

### ***Verificación del Contenedor en Ejecución***

```bash
# Muestra los procesos en ejecución dentro del contenedor. Verifica que "tini" y "node" estén corriendo.
docker top $(docker ps -q)
UID                 PID                 PPID                C                   STIME               TTY                 TIME                CMD
d4nitri+            81597               81576               0                   17:02               pts/0               00:00:00            tini -- node ./src/index.js
d4nitri+            81617               81597               2                   17:02               pts/0               00:00:00            node ./src/index.js
```

---

### ***Ejecución del Contenedor***

```bash
# Ejecuta el contenedor, mapeando el puerto 3000 del contenedor al puerto 3000 del host. 
# La opción --rm elimina el contenedor cuando se detiene.
docker run -itp3000:3000 --rm d4nitrix13/express:prod
Aplicación de ejemplo escuchando en el puerto 3000
# La salida esperada indica que la aplicación está escuchando en el puerto 3000.
```

---

### ***Envío de Señales al Contenedor***

```bash
# Detiene el contenedor enviando la señal SIGINT (interrupción).
docker container stop $(docker ps -q)
e0319d82d844

# Ejecuta el contenedor y envía la señal SIGINT para probar el apagado de la aplicación.
docker run -itp3000:3000 --rm d4nitrix13/express:prod
Aplicación de ejemplo escuchando en el puerto 3000
SIGTERM

# Detiene el contenedor enviando la señal SIGHUP (cierre de conexión).
docker container stop --signal SIGHUP $(docker ps -q)
0bd039eca2fa

# Ejecuta el contenedor y envía la señal SIGHUP para probar el comportamiento de la aplicación.
docker run -itp3000:3000 --rm d4nitrix13/express:prod
Aplicación de ejemplo escuchando en el puerto 3000
```

---

### ***Verificación de Imágenes***

```bash
# Muestra todas las imágenes no colgantes (dangling) en el sistema, incluyendo la imagen recientemente construida.
docker images -afdangling=false
REPOSITORY           TAG       IMAGE ID       CREATED          SIZE
d4nitrix13/express   prod      5d947e70f5f8   42 minutes ago   181MB
```

---

### ***Uso de Tini en Docker para Manejo de Señales***

**Tini** *es una herramienta diseñada para actuar como el proceso principal (PID 1) dentro de un contenedor Docker. Aunque no es un shell en sí mismo, Tini se encarga de manejar las señales de manera eficiente y de gestionar el proceso principal. A continuación, se explica cómo Tini maneja las señales y qué aspectos debes considerar:*

1. **Manejo de Señales con Tini:**

   - *Tini está diseñado para funcionar como el proceso PID 1 dentro del contenedor. Esto es importante porque el proceso con PID 1 tiene el deber de manejar señales y puede gestionar adecuadamente los procesos secundarios que se ejecutan en el contenedor. Aunque Tini no es un shell, actúa de manera similar en cuanto al manejo de señales:*

   - **Ctrl+C:** *Cuando presionas `Ctrl+C` en la terminal, se envía una señal `SIGINT` al proceso en primer plano. Tini captura esta señal y la envía al proceso principal de tu aplicación (por ejemplo, `node` en tu caso). Esto permite que tu aplicación reciba la señal y realice un cierre ordenado (graceful shutdown) si está programado para manejarla.*

2. **Manejo de Señales con `docker stop`:**

   - *Cuando ejecutas `docker stop` para detener un contenedor, Docker envía una señal `SIGTERM` al proceso principal del contenedor. Tini se encarga de recibir esta señal y la pasa al proceso principal de tu aplicación. Esto permite que tu aplicación cierre conexiones y limpie recursos de manera adecuada antes de finalizar.*

   - *Si tu aplicación no está configurada para manejar una señal específica, Tini, por defecto, terminará el proceso después del período de gracia definido (generalmente 10 segundos).*

3. **Señales no Manejadas:**

   - *Si tu aplicación no trata una señal específica que se envía a Tini, el comportamiento por defecto de Tini es terminar el proceso principal. Esto significa que tu aplicación debería estar programada para manejar al menos las señales `SIGTERM` y `SIGINT` para garantizar un cierre ordenado.*

4. **Señal SIGHUP:**

   - *La señal `SIGHUP` (Hangup) es una señal que generalmente indica que el terminal del proceso se ha desconectado. En algunos contextos, puede utilizarse para solicitar a una aplicación que recargue su configuración o termine. En Docker, puedes enviar esta señal a un contenedor con:*

   ```bash
   docker stop --signal SIGHUP $(docker ps -q)
   ```

   - *Si tu aplicación necesita manejar `SIGHUP`, asegúrate de que esté programada para reaccionar adecuadamente a esta señal.*

- *En resumen, Tini ayuda a gestionar las señales de manera efectiva en contenedores Docker, garantizando que las señales sean transmitidas correctamente al proceso principal. Sin embargo, es crucial que tu aplicación esté configurada para manejar estas señales adecuadamente para evitar cierres abruptos y problemas relacionados.*
