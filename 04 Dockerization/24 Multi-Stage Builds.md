<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->

# ***Multi-Stage Builds***

---

## ***Paso 1: Copia del Dockerfile***

- *Primero, haremos una copia de nuestro `Dockerfile` actual para que podamos editarlo sin perder la versión original. Ejecutamos el siguiente comando para copiar el fichero:*

```bash
cp Dockerfile Dockerfile.ubuntu
```

---

### ***Paso 2: Edición del Dockerfile***

**Editamos el `Dockerfile` original, manteniendo `Dockerfile.ubuntu` intacto. A continuación se muestra el contenido actualizado del `Dockerfile`:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Imagen base de Go utilizando Ubuntu, ideal para aplicaciones en Go.
FROM golang

# Definir el directorio de trabajo dentro del contenedor.
WORKDIR /App

# Copiar los ficheros de dependencias go.mod y go.sum.
COPY go.* ./

# Descargar las dependencias del proyecto Go.
RUN go mod download

# Copiar el código fuente de la aplicación al directorio de trabajo.
COPY ./ ./

# Exponer el puerto 8080 para que la aplicación Go esté disponible.
EXPOSE 8080

# Compilar la aplicación Go.
RUN go build

# Ejecutar la aplicación Go.
CMD ./App-Go
```

---

### ***Paso 3: Construcción de la Imagen***

**Para construir la nueva imagen, utilizamos el comando `docker image build` con la etiqueta `golang`:**

```bash
docker image build --tag d4nitrix13/gin:golang ./
```

- **Este comando crea la imagen basándose en las instrucciones del `Dockerfile`. Aquí puedes ver un ejemplo del resultado del proceso de construcción:**

```bash
[+] Building 0.7s (11/11) FINISHED                                                                                     docker:default
 => [internal] load build definition from Dockerfile                                                                             0.0s
 => => transferring dockerfile: 1.04kB                                                                                           0.0s
 => [internal] load metadata for docker.io/library/golang:latest                                                                 0.6s
 => [internal] load .dockerignore                                                                                                0.0s
 => => transferring context: 221B                                                                                                0.0s
 => [internal] load build context                                                                                                0.0s
 => => transferring context: 81B                                                                                                 0.0s
 => [1/6] FROM docker.io/library/golang:latest@sha256:4a3c2bcd243d3dbb7b15237eecb0792db3614900037998c2cd6a579c46888c1e           0.0s
 => CACHED [2/6] WORKDIR /App                                                                                                    0.0s
 => CACHED [3/6] COPY go.* ./                                                                                                    0.0s
 => CACHED [4/6] RUN go mod download                                                                                             0.0s
 => CACHED [5/6] COPY ./ ./                                                                                                      0.0s
 => CACHED [6/6] RUN go build                                                                                                    0.0s
 => exporting to image                                                                                                           0.0s
 => => exporting layers                                                                                                          0.0s
 => => writing image sha256:21ea1268364d728f6e3e8d624e7fb7c643061242646e70b251fa66ef78d427a7                                     0.0s
 => => naming to docker.io/d4nitrix13/gin:golang                                                                                 0.0s
```

---

### ***Advertencia***

- **Es importante notar que se generó una advertencia relacionada con los argumentos de JSON en la instrucción `CMD`. Docker recomienda usar JSON para evitar comportamientos inesperados con las señales del sistema operativo:**

```bash
1 warning found (use docker --debug to expand):
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 27)
```

---

### ***Paso 4: Verificación del Tamaño de la Imagen***

**Una vez creada la imagen, podemos verificar su tamaño usando el siguiente comando:**

```bash
docker image list -af reference=d4nitrix13/gin*
```

**Ejemplo de salida:**

```bash
REPOSITORY       TAG       IMAGE ID       CREATED         SIZE
d4nitrix13/gin   golang    21ea1268364d   5 minutes ago   1.21GB
d4nitrix13/gin   latest    00382cb81ccc   17 hours ago    753MB
```

**Observamos que la imagen etiquetada como `golang` tiene un tamaño de **1.21 GB**, mientras que la versión `latest` (más optimizada) pesa **753 MB**.**

### ***Paso 5: Verificación del Sistema Operativo Base***

**La mayoría de las imágenes oficiales de lenguajes de programación, como `golang`, utilizan **Debian** como sistema base. Podemos verificar esto ejecutando un contenedor y revisando el fichero `/etc/os-release`:**

```bash
docker container run --interactive --tty --publish 8080:8080 --rm d4nitrix13/gin:golang cat /etc/os-release
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

- *Esto confirma que la imagen `golang` está basada en **Debian GNU/Linux 12 (bookworm)**.*

---

## ***Comparación de Tamaños de Imágenes de Docker***

- *Cuando trabajamos con Docker, uno de los factores importantes a considerar es el **tamaño de las imágenes**. Esto impacta el tiempo de descarga y el almacenamiento. A continuación, se muestra un ejemplo práctico de la diferencia de tamaños entre varias imágenes populares, como **Debian**, **Ubuntu** y una imagen de **Golang** basada en Debian.*

---

### ***Pull de la Imagen Debian***

- **Primero, descargamos la imagen de Debian desde el repositorio oficial:**

```bash
docker image pull debian
Using default tag: latest
latest: Pulling from library/debian
8cd46d290033: Already exists
Digest: sha256:b8084b1a576c5504a031936e1132574f4ce1d6cc7130bbcc25a28f074539ae6b
Status: Downloaded newer image for debian:latest
docker.io/library/debian:latest
```

---

### ***Verificación del Tamaño de las Imágenes***

- **Ahora, al listar todas las imágenes descargadas y generadas, podemos observar el peso de cada una:**

```bash
docker images -a
REPOSITORY         TAG         IMAGE ID       CREATED          SIZE
d4nitrix13/gin     golang      21ea1268364d   12 minutes ago   1.21GB
d4nitrix13/gin     latest      00382cb81ccc   17 hours ago     753MB
d4nitrix13/rails   preconfig   68f5a326fdb5   43 hours ago     1.02GB
d4nitrix13/rails   latest      f3940d656524   44 hours ago     591MB
debian             latest      4fd3f4b75df3   2 days ago       117MB
ubuntu             22.04       53a843653cbc   3 weeks ago      77.9MB
```

---

### ***Análisis de los Tamaños***

- **Imagen Debian:** *El tamaño es de **117MB**, lo cual es razonable para una imagen base que no incluye muchos extras.*
- **Imagen Ubuntu:** *Sorprendentemente, la imagen de Ubuntu 22.04 pesa **77.9MB**, siendo más liviana que la de Debian. Esto la convierte en una opción atractiva para construir aplicaciones más ligeras.*
- **Imagen Golang (basada en Debian):** *Las imágenes de Go suelen ser mucho más pesadas debido a que incluyen herramientas adicionales para desarrollo. Por ejemplo:*
  - **`d4nitrix13/gin:golang`** *pesa **1.21GB**.*
  - **`d4nitrix13/gin:latest`** *pesa **753MB**.*

### ***¿Por Qué la Imagen de Golang es Tan Grande?***

- *El motivo del gran tamaño de las imágenes de Go es que la imagen oficial de **Golang** incluye no solo el compilador de Go, sino también varias **herramientas y bibliotecas estándar** que pueden ser útiles para el desarrollo de aplicaciones en Go. Además, la imagen está basada en Debian, que aunque es confiable, **no es la distribución más minimalista**, lo cual añade tamaño adicional.*

---

### ***Comparación entre Debian y Ubuntu***

- *La imagen de **Debian** pesa **117MB**, mientras que la de **Ubuntu 22.04** pesa solo **77.9MB**. Si optamos por construir una imagen basada en Ubuntu, podemos reducir significativamente el tamaño de la imagen final.*

- *Por lo tanto, para crear imágenes más ligeras, es recomendable utilizar **imágenes minimalistas** como las versiones `slim` o imágenes basadas en **Alpine Linux**, que son mucho más pequeñas en comparación con Debian y Ubuntu. Esto puede reducir el tamaño de las imágenes de Go a menos de **300MB** si se utiliza una configuración minimalista.*

---

### ***Solución: Usar Imágenes Minimalistas***

- *Si tu objetivo es reducir el tamaño de las imágenes Docker para aplicaciones en Go, podrías optar por una imagen basada en **Alpine**, que es significativamente más ligera.*

- **Por ejemplo, puedes usar:**

```Dockerfile
FROM golang:alpine
```

- *La imagen de Go basada en **Alpine** pesa mucho menos, ya que **Alpine** es una distribución diseñada específicamente para ser lo más pequeña posible (menos de 10MB en su versión base).*

---

## ***Optimización de Imágenes Docker con Multi-Stage Builds***

- *En Docker, una **multi-stage build** permite reducir el tamaño final de la imagen al separar el proceso de construcción en múltiples etapas o *stages*. Esto es útil especialmente para lenguajes como **Go**, donde el proceso de compilación puede requerir una imagen base más pesada con todas las herramientas necesarias, pero el binario resultante puede ejecutarse en una imagen mucho más ligera.*

---

### ***Copiar y Modificar el `Dockerfile`***

- **Primero, copiamos el fichero `Dockerfile` actual para preservarlo como referencia:**

```bash
cp Dockerfile Dockerfile.golang
```

- *Dejamos **intacto** el fichero `Dockerfile.golang` como respaldo y procedemos a modificar el nuevo `Dockerfile` para implementar una **construcción multi-stage**. El objetivo es que la primera etapa compile el binario de Go, y la segunda etapa utilice una imagen base más ligera para ejecutar dicho binario.*

---

### ***Dockerfile con Multi-Stage Build***

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# ------------------------------------Inicio Stage 0----------------------------------

# Stage 0: Se utiliza la imagen base de Ubuntu 22.04 para compilar la aplicación Go.
FROM ubuntu:22.04 AS builder

# Actualizamos los paquetes disponibles e instalamos curl para descargar Go.
# Luego descargamos e instalamos Go 1.23.1 en /usr/local.
RUN apt update \
    && apt install -y curl \
    && curl -L https://go.dev/dl/go1.23.1.linux-amd64.tar.gz --output - \
    | tar -zxvC /usr/local/

# Establecemos el directorio de trabajo donde se ejecutará la aplicación Go.
WORKDIR /App

# Añadimos la ruta de Go al PATH.
ENV PATH="$PATH:/usr/local/go/bin"

# Copiamos los ficheros go.mod y go.sum, que contienen las dependencias de Go.
COPY go.* ./

# Descargamos las dependencias del proyecto Go.
RUN go mod download

# Copiamos el código fuente de la aplicación.
COPY ./ ./

# Compilamos el código fuente de Go, generando el binario llamado 'App-Go'.
RUN go build -o App-Go

# ------------------------------------Final Stage 0-----------------------------------

# ------------------------------------Inicio Stage 1----------------------------------

# Stage 1: Usamos una nueva imagen de Ubuntu 22.04 para ejecutar la aplicación compilada.
FROM ubuntu:22.04

# Establecemos el directorio de trabajo.
WORKDIR /App

# Copiamos el binario 'App-Go' generado en el stage 0.
COPY --from=builder /App/App-Go ./

# Exponemos el puerto 8080, que será el puerto de escucha de la aplicación.
EXPOSE 8080

# Definimos el comando por defecto que ejecutará la aplicación Go.
CMD ./App-Go

# ------------------------------------Final Stage 1-----------------------------------
```

---

### ***¿Cómo Funciona?***

- **Stage 0 (builder):** *En esta primera etapa se utiliza una imagen de **Ubuntu 22.04** para instalar Go, descargar las dependencias y compilar el código fuente. Este proceso genera el binario de la aplicación **App-Go**.*
  
- **Stage 1:** *En esta segunda etapa, se utiliza nuevamente **Ubuntu 22.04**, pero esta vez solo se copia el binario ya compilado desde el **stage** anterior. No es necesario instalar Go ni las dependencias, lo que reduce considerablemente el tamaño de la imagen final.*

---

### ***Beneficios de Multi-Stage Builds***

1. **Optimización del Tamaño de la Imagen:** *Al separar la fase de compilación de la fase de ejecución, evitamos incluir herramientas y dependencias innecesarias en la imagen final. Esto reduce drásticamente el tamaño de la imagen de producción.*

2. **Imágenes Más Ligeras:** *En lugar de tener una imagen grande que contiene el compilador y herramientas de desarrollo, la imagen final solo contiene el binario de la aplicación y la base necesaria para ejecutarlo.*

---

### ***Explicación de los Stages***

- *Cada vez que se declara una nueva imagen con `FROM` en un Dockerfile, se crea un **nuevo stage**. El primer `FROM` inicia el **Stage 0**, el siguiente `FROM` inicia el **Stage 1**, y así sucesivamente. En este caso, tenemos dos stages:*

- **Stage 0:** *Usa la imagen base de **Ubuntu 22.04** para compilar la aplicación Go. Aquí se instalan las herramientas necesarias, se descarga Go y se compila el binario.*
  
- **Stage 1:** *Usa una imagen de **Ubuntu 22.04** limpia, sin herramientas adicionales. Solo se copia el binario ya compilado desde el Stage 0, optimizando el tamaño final de la imagen.*

---

#### ***Comando `COPY --from=0`***

- *El comando `COPY --from=0` o `COPY --from=builder` se utiliza para copiar ficheros generados en un **stage** anterior. En este caso, se copia el binario `App-Go` desde el **stage 0** (builder) al **stage 1** para ser ejecutado.*

---

### ***Ejemplo Visual de los Stages***

- **Stage 0:**

  ```Dockerfile
  # Autor: Daniel Benjamin Perez Morales
  # GitHub: https://github.com/DanielPerezMoralesDev13
  # Correo electrónico: danielperezdev@proton.me
  
  # ------------------------------------Inicio Stage 0----------------------------------
  
  # Se utiliza la imagen base de Ubuntu 22.04, ideal para ejecutar aplicaciones con Go.
  FROM ubuntu:22.04
  
  # Actualiza los paquetes disponibles y luego instala curl para realizar la descarga de Go.
  # Posteriormente, descarga e instala Go 1.23.1 directamente en /usr/local.
  RUN apt update \
      && apt install -y curl \
      && curl -L https://go.dev/dl/go1.23.1.linux-amd64.tar.gz --output - \
      | tar -zxvC /usr/local/
  
  # Define el directorio de trabajo dentro del contenedor, que es donde se ejecutará la aplicación Go.
  WORKDIR /App
  
  # Añade la ruta de Go al PATH para permitir el acceso a los comandos de Go globalmente dentro del contenedor.
  ENV PATH="$PATH:/usr/local/go/bin"
  
  # Copia los ficheros go.mod y go.sum al directorio de trabajo. Estos ficheros contienen las dependencias del proyecto Go.
  COPY go.* ./
  
  # Ejecuta la descarga de todas las dependencias necesarias especificadas en go.mod.
  RUN go mod download
  
  # Copia todo el código fuente de la aplicación al directorio de trabajo del contenedor.
  COPY ./ ./
  
  # Compila el código fuente de Go, generando el binario de la aplicación.
  RUN go build
  
  # ------------------------------------Final Stage 0-----------------------------------
  ```

  *En este **stage** se instala Go, se descargan las dependencias y se compila la aplicación.*

- **Stage 1:**

  ```Dockerfile
  # Usamos la imagen base de Ubuntu 22.04
  FROM ubuntu:22.04
  
  # Establecemos el directorio de trabajo en /App
  WORKDIR /App
  
  # Copiamos los ficheros desde la primera fase (etapa 0) al directorio actual
  # en el contenedor. Esto asume que en la primera etapa (multi-stage build),
  # los ficheros de la aplicación Go se construyeron en /App/App-Go.
  COPY --from=0 /App/App-Go ./
  
  # Expone el puerto 8080, que es el puerto en el que la aplicación Go estará escuchando.
  EXPOSE 8080
  
  # Define el comando por defecto que ejecutará la aplicación Go cuando se inicie el contenedor.
  CMD ./App-Go
  
  # ------------------------------------Final Stage 1-----------------------------------
  ```

- **En este *stage* se usa una imagen limpia y solo se copia el binario generado en el Stage 0.**

- **Conclusión**

- *Al usar **multi-stage builds**, no solo reducimos el tamaño de nuestras imágenes Docker, sino que también simplificamos el proceso de despliegue al separar las fases de compilación y ejecución. Esto mejora la eficiencia de nuestras imágenes y el tiempo de descarga.El problema que resuelven los multi stage builds en que por ejemplo en un lenguage compilado lo unico que necesita es el binario no necesita mas paquetes ejemplo*

---

### ***Primero, listamos las imágenes disponibles con el comando:***

```bash
docker images -a
REPOSITORY         TAG         IMAGE ID       CREATED          SIZE
d4nitrix13/gin     golang      21ea1268364d   31 minutes ago   1.21GB
d4nitrix13/gin     latest      00382cb81ccc   18 hours ago     753MB
d4nitrix13/rails   preconfig   68f5a326fdb5   43 hours ago     1.02GB
d4nitrix13/rails   latest      f3940d656524   44 hours ago     591MB
debian             latest      4fd3f4b75df3   2 days ago       117MB
ubuntu             22.04       53a843653cbc   3 weeks ago      77.9MB
```

**Vemos que la imagen de Ubuntu tiene un tamaño de `77.9 MB`, pero no contiene los paquetes necesarios para compilar aplicaciones con Go. Para solucionar esto, se instaló `curl` y se descargó e instaló Go de la siguiente manera:**

```Dockerfile
RUN apt update \
    && apt install -y curl \
    && curl -L https://go.dev/dl/go1.23.1.linux-amd64.tar.gz --output - \
    | tar -zxvC /usr/local/
```

- **Esto aumentó significativamente el tamaño de la imagen, resultando en:**

```bash
d4nitrix13/gin     latest      00382cb81ccc   18 hours ago     753MB
```

- **El problema radica en que ahora la imagen contiene tanto el compilador de Go como `curl`, lo cual no es necesario para ejecutar la aplicación. Aquí es donde entran en juego las construcciones multi-stage. La idea es separar el proceso de compilación (que requiere el compilador de Go) del proceso de ejecución (donde solo necesitas el binario). Esto se logra usando dos imágenes, y la imagen que contiene el binario no incluye nada adicional, reduciendo su tamaño.**

---

### ***Construcción Multi-Stage***

- **Usamos el siguiente Dockerfile para construir y ejecutar:**

```bash
docker image build -t d4nitrix13/gin:multi ./
```

---

### ***Resultado del Build***

```bash
[+] Building 0.4s (14/14) FINISHED                                                                                                    docker:default
 => [internal] load build definition from Dockerfile                                                                                            0.0s
 => => transferring dockerfile: 2.23kB                                                                                                          0.0s
 => WARN: JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 54)                0.0s
 => [internal] load metadata for docker.io/library/ubuntu:22.04                                                                                 0.0s
 => [internal] load .dockerignore                                                                                                               0.0s
 => => transferring context: 221B                                                                                                               0.0s
 => [internal] load build context                                                                                                               0.0s
 => => transferring context: 81B                                                                                                                0.0s
 => CACHED [stage-0 1/7] FROM docker.io/library/ubuntu:22.04                                                                                    0.0s
 => [stage-1 2/3] WORKDIR /App                                                                                                                  0.0s
 => CACHED [stage-0 2/7] RUN apt update     && apt install -y curl     && curl -L https://go.dev/dl/go1.23.1.linux-amd64.tar.gz --output -      0.0s
 => CACHED [stage-0 3/7] WORKDIR /App                                                                                                           0.0s
 => CACHED [stage-0 4/7] COPY go.* ./                                                                                                           0.0s
 => CACHED [stage-0 5/7] RUN go mod download                                                                                                    0.0s
 => CACHED [stage-0 6/7] COPY ./ ./                                                                                                             0.0s
 => CACHED [stage-0 7/7] RUN go build                                                                                                           0.0s
 => [stage-1 3/3] COPY --from=0 /App/App-Go ./                                                                                                  0.1s
 => exporting to image                                                                                                                          0.1s
 => => exporting layers                                                                                                                         0.1s
 => => writing image sha256:185a00984a0e6c33d7a73a1170cf587cb2b4664cef2d9b671baf92310ead9b52                                                    0.0s
 => => naming to docker.io/d4nitrix13/gin:multi                                                                                                 0.0s

1 warning found (use docker --debug to expand):
- JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 54)
```

- *Este proceso permite que la imagen final que ejecuta el binario sea mucho más ligera, ya que no incluye las herramientas y dependencias de compilación, como `curl` o el compilador de Go.*

---

### ***Ejecución e Inicio del Contenedor***

**Una vez que construimos la imagen, ejecutamos el contenedor con el siguiente comando:**

```bash
docker container run -itp8080:8080 --rm d4nitrix13/gin:multi
```

**Esto genera el siguiente log del servidor:**

```bash
[GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.

[GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
 - using env:   export GIN_MODE=release
 - using code:  gin.SetMode(gin.ReleaseMode)

[GIN-debug] GET    /ping                     --> main.main.func1 (3 handlers)
[GIN-debug] [WARNING] You trusted all proxies, this is NOT safe. We recommend you to set a value.
Please check https://pkg.go.dev/github.com/gin-gonic/gin#readme-don-t-trust-all-proxies for details.
[GIN-debug] Environment variable PORT is undefined. Using port :8080 by default
[GIN-debug] Listening and serving HTTP on :8080
```

---

### ***Verificación de la Petición***

- **Hacemos una petición a `localhost:8080/ping`, y el servidor responde con el siguiente log:**

```bash
[GIN] 2024/09/07 - 20:14:18 | 200 |      87.038µs |      172.17.0.1 | GET      "/ping"
```

- **Esto confirma que el servidor está funcionando correctamente.**

---

### ***Tamaño de la Imagen Final***

**Después de la ejecución, verificamos el tamaño de la imagen resultante:**

```bash
docker images -a
REPOSITORY         TAG         IMAGE ID       CREATED          SIZE
d4nitrix13/gin     multi       185a00984a0e   6 minutes ago    89MB
d4nitrix13/gin     golang      21ea1268364d   56 minutes ago   1.21GB
d4nitrix13/gin     latest      00382cb81ccc   18 hours ago     753MB
d4nitrix13/rails   preconfig   68f5a326fdb5   43 hours ago     1.02GB
d4nitrix13/rails   latest      f3940d656524   45 hours ago     591MB
debian             latest      4fd3f4b75df3   2 days ago       117MB
ubuntu             22.04       53a843653cbc   3 weeks ago      77.9MB
```

- **La imagen final tiene un tamaño de **89MB**, lo que representa una reducción significativa en comparación con la imagen original de **753MB**. Dado que partimos de una imagen base de Ubuntu que pesa **77.9MB**, logramos optimizar el tamaño al mínimo necesario, eliminando el compilador de Go y otros paquetes no requeridos para la ejecución.**

```bash
d4nitrix13/gin     multi       185a00984a0e   6 minutes ago    89MB
```

- **Conclusión**

- **Este ejemplo demuestra la ventaja de usar **multistage builds** en Docker. Con esta técnica:**

1. **Primera Etapa (Build Stage):** *Incluimos herramientas como el compilador de Go y `curl` solo para la compilación del binario.*
2. **Segunda Etapa (Runtime Stage):** *Ejecutamos la aplicación usando una imagen base mínima, reduciendo el tamaño final del contenedor.*

*Esto permite que la imagen final sea liviana y eficiente, ideal para entornos de producción donde cada MB cuenta. La diferencia es notable: de **753MB** a **89MB** gracias a la eliminación de herramientas innecesarias después de la compilación.*

---

### ***Mejoras en el Dockerfile y Pruebas***

---

#### ***Copia del Dockerfile***

- **Para mantener una copia del Dockerfile original mientras trabajas en la versión multistage, puedes copiar el Dockerfile actual a un nuevo fichero:**

```bash
cp Dockerfile Dockerfile.multistages
```

- *Esto preserva el Dockerfile original y permite modificar el nuevo fichero sin perder la versión anterior.*

---

#### ***1. Entendiendo los Stages en Docker***

- *En un **Dockerfile** con múltiples etapas, el stage final es el que marca el tamaño de la imagen resultante. Las etapas intermedias son temporales y se eliminan después de construir la imagen final. Este enfoque permite reducir el tamaño de la imagen final al incluir solo los ficheros y herramientas necesarias para ejecutar la aplicación, y eliminar las herramientas y ficheros de construcción.*

---

#### ***2. Dockerfile Multistage Modificado***

- **Para simplificar el manejo de los stages en el Dockerfile, puedes asignar nombres descriptivos a cada etapa. Esto facilita la referencia a cada etapa y mejora la legibilidad del Dockerfile. Aquí está el Dockerfile modificado:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# ------------------------------------Inicio Stage Builder----------------------------------

# Utiliza la imagen base de Ubuntu 22.04, ideal para compilar aplicaciones con Go.
FROM ubuntu:22.04 AS Builder

# Actualiza los paquetes disponibles y luego instala curl para descargar Go.
# Después, descarga e instala Go 1.23.1 en /usr/local.
RUN apt update \
    && apt install -y curl \
    && curl -L https://go.dev/dl/go1.23.1.linux-amd64.tar.gz --output - \
    | tar -zxvC /usr/local/

# Define el directorio de trabajo en el contenedor.
WORKDIR /App

# Añade la ruta de Go al PATH para usar los comandos de Go.
ENV PATH="$PATH:/usr/local/go/bin"

# Copia los ficheros de dependencias del proyecto Go.
COPY go.* ./

# Descarga las dependencias necesarias.
RUN go mod download

# Copia el código fuente de la aplicación al directorio de trabajo.
COPY ./ ./

# Compila el código fuente de Go para generar el binario de la aplicación.
RUN go build

# ------------------------------------Final Stage Builder-----------------------------------

# ------------------------------------Inicio Stage Execution----------------------------------

# Utiliza la imagen base de Ubuntu 22.04 para la ejecución.
FROM ubuntu:22.04 AS Execution

# Establece el directorio de trabajo en /App.
WORKDIR /App

# Copia el binario de la aplicación desde el stage Builder.
COPY --from=Builder /App/App-Go ./

# Expone el puerto 8080 para la aplicación.
EXPOSE 8080

# Define el comando por defecto para ejecutar la aplicación.
CMD ./App-Go

# ------------------------------------Final Stage Execution-----------------------------------
```

#### ***3. Explicación de la Directiva `AS`***

- *La directiva `AS` en Dockerfile se usa para asignar un nombre a un stage específico. Esto permite que otros stages se refieran a él por su nombre en lugar de por su índice numérico. Por ejemplo, en el Dockerfile anterior, `FROM ubuntu:22.04 AS Builder` crea un stage llamado `Builder`, y `FROM ubuntu:22.04 AS Execution` crea un stage llamado `Execution`.*

- **`AS Builder`:** *Se refiere a la etapa donde se compila la aplicación.*
- **`AS Execution`:** *Se refiere a la etapa donde se prepara la imagen final para ejecutar la aplicación.*

- *Renombrar el último stage no es obligatorio, pero puede ser útil para mejorar la claridad y facilitar la gestión del Dockerfile.*

#### ***4. Construcción de la Imagen***

- **Para construir la imagen usando el Dockerfile modificado, ejecutamos:**

```bash
docker build -td4nitrix13/gin:stages ./
```

- **Durante el proceso de construcción, pueden aparecer advertencias, como:**

```bash
 => WARN: StageNameCasing: Stage name 'Builder' should be lowercase (line 8)
 => WARN: StageNameCasing: Stage name 'Execution' should be lowercase (line 40)
 => WARN: JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 54)
```

- *Estas advertencias indican que los nombres de los stages deberían estar en minúsculas y que es recomendable usar argumentos JSON para el comando `CMD`.*

#### ***5. Ejecución del Contenedor***

- **Iniciamos el contenedor con:**

```bash
docker container run -itp8080:8080 --rm d4nitrix13/gin:stages
```

**El log del servidor indica que la aplicación está en ejecución:**

```bash
[GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.

[GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
 - using env:   export GIN_MODE=release
 - using code:  gin.SetMode(gin.ReleaseMode)

[GIN-debug] GET    /ping                     --> main.main.func1 (3 handlers)
[GIN-debug] [WARNING] You trusted all proxies, this is NOT safe. We recommend you to set a value.
Please check https://pkg.go.dev/github.com/gin-gonic/gin#readme-don-t-trust-all-proxies for details.
[GIN-debug] Environment variable PORT is undefined. Using port :8080 by default
[GIN-debug] Listening and serving HTTP on :8080
```

---

#### ***6. Verificación de la Petición***

**Realizamos una petición a `127.0.0.1:8080/ping`:**

```bash
[GIN] 2024/09/07 - 20:48:31 | 200 |     503.723µs |      172.17.0.1 | GET      "/ping"
[GIN] 2024/09/07 - 20:48:31 | 404 |       1.048µs |      172.17.0.1 | GET      "/favicon.ico"
```

- **Esto confirma que la aplicación responde correctamente a las solicitudes.**

---

### ***Mejoras en el Dockerfile Multistage con Alpine***

- **1. Introducción a la Construcción Multistage**

- *El uso de multistage en Dockerfiles permite optimizar las imágenes dividiendo el proceso de construcción en varias etapas. Esto reduce el tamaño de la imagen final al copiar solo los componentes necesarios para la ejecución, como el binario compilado, y dejar atrás las herramientas de compilación. Para más información, puedes consultar la documentación oficial de Docker sobre [multistage builds](https://docs.docker.com/build/building/multi-stage/ "https://docs.docker.com/build/building/multi-stage/").*

- **2. Dockerfile Modificado Usando Alpine**

- *Ahora vamos a optimizar el Dockerfile utilizando Alpine, una distribución minimalista, en la etapa de ejecución. Sin embargo, **Alpine no siempre es compatible con binarios generados en otras distribuciones**, como Debian, debido a diferencias en las **librerías dinámicas enlazadas**.*

---

### ***¿Qué son las Librerías Dinámicas Enlazadas?***

- *Las librerías dinámicas son componentes de software que no se incluyen directamente en el binario ejecutable, sino que se cargan cuando el binario es ejecutado. Cuando un binario se enlaza dinámicamente, no contiene todo el código de las librerías que utiliza, sino que establece una referencia para que el sistema operativo cargue las librerías necesarias en tiempo de ejecución. Esto permite que varios programas utilicen la misma librería, ahorrando espacio en disco y memoria.*

- *Sin embargo, esto introduce una dependencia del sistema: **si el sistema donde se ejecuta el binario no tiene la librería requerida, o tiene una versión incompatible, el binario fallará**. Esto es especialmente relevante en distribuciones minimalistas como Alpine, que no incluyen muchas de las librerías dinámicas comunes que podrías encontrar en Debian.*

- *Por otro lado, existen **librerías enlazada estáticamente**, donde todo el código de las librerías se incluye directamente en el binario durante la compilación. Esto produce un binario más grande, pero sin dependencia de las librerías del sistema, lo que lo hace más portable.*

> [!IMPORTANT]
> *Cuando un binario se enlaza dinámicamente y no incluye todo el código de las librerías que utiliza, sino que establece una referencia para que el sistema operativo cargue las librerías necesarias en tiempo de ejecución, se llama **enlazado dinámico** (**dynamic linking** en inglés).*

- *En un sistema operativo, el **dynamic linker** (o cargador dinámico) es el responsable de resolver las referencias a las librerías en el momento en que el programa se ejecuta, cargando las **librerías compartidas** o **librerías dinámicas** (**shared libraries** o **dynamic libraries**) desde su ubicación en el sistema.*

- **El proceso se puede dividir en dos partes:**

1. **Enlazado dinámico:** *El binario no contiene el código de las librerías, pero incluye referencias a ellas, especificando que deben cargarse en tiempo de ejecución.*
2. **Carga dinámica:** *El **dynamic linker/loader** carga las librerías compartidas en memoria cuando el programa se inicia y enlaza sus funciones al binario en ejecución.*

> [!TIP]
> *Estas librerías dinámicas suelen ser ficheros como `.so` (en sistemas Linux) o `.dll` (en Windows).*

---

### ***Compilación de Go y Librerías Enlazadas***

*El lenguaje **Go** por defecto genera binarios estáticos, lo que significa que no depende de librerías dinámicas externas al sistema en el que se ejecute, lo que lo hace ideal para contenedores minimalistas como Alpine. Sin embargo, si el binario Go se compila con algunas opciones o dependencias que requieren enlazado dinámico, puede encontrarse con problemas al ejecutarse en Alpine, ya que esta distribución no incluye muchas librerías que otras distros como Debian sí tienen.*

---

### ***Creación de un Dockerfile multi-stage con Alpine***

- *Primero, duplicamos el fichero `Dockerfile` para crear una nueva versión llamada `Dockerfile.stages`, pero no lo editaremos. En su lugar, modificaremos el Dockerfile original para implementar un enfoque de compilación multi-stage, utilizando imágenes ligeras como Alpine para optimizar el tamaño final de la imagen.*

---

#### ***Paso 1: Copiar el fichero `Dockerfile`***

```bash
cp Dockerfile Dockerfile.stages
```

**Ahora, editamos el fichero `Dockerfile` para configurar las etapas de construcción.**

---

### ***Paso 2: Editar el `Dockerfile` multi-stage***

- *Agregamos las siguientes instrucciones para dividir el proceso de compilación en dos etapas: **compilación** y **ejecución**.*

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# ------------------------------------Inicio Stage 0----------------------------------

# Se utiliza la imagen base de golang, ideal para compilar aplicaciones con Go.
FROM golang AS builder

# Establecemos el directorio de trabajo dentro del contenedor.
WORKDIR /App

# Añade la ruta de Go al PATH.
ENV PATH="$PATH:/usr/local/go/bin"

# Copia los ficheros go.mod y go.sum al directorio de trabajo.
COPY go.* ./

# Ejecuta la descarga de todas las dependencias necesarias especificadas en go.mod.
RUN go mod download

# Copia todo el código fuente de la aplicación al directorio de trabajo del contenedor.
COPY ./ ./

# Compila el código fuente de Go, generando el binario de la aplicación.
RUN go build

# ------------------------------------Final Stage 0-----------------------------------

# ------------------------------------Inicio Stage 1----------------------------------

# Usamos la imagen base de alpine:latest, una distribución minimalista.
FROM alpine:latest

# Establecemos el directorio de trabajo en /App.
WORKDIR /App

# Copiamos los ficheros desde la primera fase (etapa 0) al directorio actual.
COPY --from=builder /App/App-Go ./

# Exponemos el puerto 8080, donde la aplicación Go estará escuchando.
EXPOSE 8080

# Define el comando por defecto que ejecutará la aplicación Go.
CMD ./App-Go

# ------------------------------------Final Stage 1-----------------------------------
```

---

### ***Paso 3: Construcción de la imagen***

**Construimos la imagen Docker multi-stage con el siguiente comando:**

```bash
docker image build -t d4nitrix13/gin:multi-alpine ./
```

- *Este comando compilará el código Go en una imagen basada en **golang**, y luego moverá el binario compilado a una imagen más ligera basada en **alpine**, reduciendo el tamaño final de la imagen.*

---

#### ***Ejemplo de salida del comando `docker image build`***

```bash
docker image build -td4nitrix13/gin:multi-alpine ./
[+] Building 3.5s (15/15) FINISHED                                                                                     docker:default
 => [internal] load build definition from Dockerfile                                                                             0.0s
 => => transferring dockerfile: 1.92kB                                                                                           0.0s
 => [internal] load metadata for docker.io/library/alpine:latest                                                                 2.2s
 => [internal] load metadata for docker.io/library/golang:latest                                                                 1.2s
 => [internal] load .dockerignore                                                                                                0.0s
 => => transferring context: 221B                                                                                                0.0s
 => [builder 1/6] FROM docker.io/library/golang:latest@sha256:4a3c2bcd243d3dbb7b15237eecb0792db3614900037998c2cd6a579c46888c1e   0.0s
 => [stage-1 1/3] FROM docker.io/library/alpine:latest@sha256:beefdbd8a1da6d2915566fde36db9db0b524eb737fc57cd1367effd16dc0d06d   0.8s
 => => resolve docker.io/library/alpine:latest@sha256:beefdbd8a1da6d2915566fde36db9db0b524eb737fc57cd1367effd16dc0d06d           0.0s
 => => sha256:beefdbd8a1da6d2915566fde36db9db0b524eb737fc57cd1367effd16dc0d06d 1.85kB / 1.85kB                                   0.0s
 => => sha256:33735bd63cf84d7e388d9f6d297d348c523c044410f553bd878c6d7829612735 528B / 528B                                       0.0s
 => => sha256:91ef0af61f39ece4d6710e465df5ed6ca12112358344fd51ae6a3b886634148b 1.47kB / 1.47kB                                   0.0s
 => => sha256:43c4264eed91be63b206e17d93e75256a6097070ce643c5e8f0379998b44f170 3.62MB / 3.62MB                                   0.6s
 => => extracting sha256:43c4264eed91be63b206e17d93e75256a6097070ce643c5e8f0379998b44f170                                        0.1s
 => [internal] load build context                                                                                                0.0s
 => => transferring context: 81B                                                                                                 0.0s
 => CACHED [builder 2/6] WORKDIR /App                                                                                            0.0s
 => CACHED [builder 3/6] COPY go.* ./                                                                                            0.0s
 => CACHED [builder 4/6] RUN go mod download                                                                                     0.0s
 => CACHED [builder 5/6] COPY ./ ./                                                                                              0.0s
 => CACHED [builder 6/6] RUN go build                                                                                            0.0s
 => [stage-1 2/3] WORKDIR /App                                                                                                   0.1s
 => [stage-1 3/3] COPY --from=builder /App/App-Go ./                                                                             0.1s
 => exporting to image                                                                                                           0.2s
 => => exporting layers                                                                                                          0.2s
 => => writing image sha256:9d54b3314c80e32244a98dce77e9b2604a5d0444c1ea5ba953d831c85dba1673                                     0.0s
 => => naming to docker.io/d4nitrix13/gin:multi-alpine                                                                           0.0s

 1 warning found (use docker --debug to expand):
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 47)
```

---

### ***Enlazado dinámico y sus implicaciones***

- *Cuando se construyen binarios, estos pueden enlazarse de dos formas: **enlazado dinámico** y **enlazado estático**. En este proyecto, hemos utilizado **Alpine**, una imagen minimalista, lo que plantea algunas consideraciones sobre el tipo de enlace que usamos.*

---

#### ***Enlazado dinámico***

- *Un binario enlazado dinámicamente no incluye todo el código de las librerías que necesita. En su lugar, establece referencias a las **librerías dinámicas** o **compartidas** (generalmente ficheros `.so` en Linux), que serán cargadas en **tiempo de ejecución** por el **dynamic linker** del sistema operativo. Esto significa que el binario necesita esas librerías presentes en el entorno de ejecución para funcionar.*

- **Ventaja:** *Disminuye el tamaño del binario.*
- **Desventaja:** *Si faltan librerías en el entorno de ejecución (por ejemplo, en **Alpine**), el binario no funcionará.*

---

#### ***Enlazado estático***

- **Por otro lado, un binario enlazado estáticamente incluye todo el código de las librerías que necesita, dentro del propio binario. Esto lo hace independiente de las librerías del sistema.**

- **Ventaja:** *No necesita dependencias externas en tiempo de ejecución.*
- **Desventaja:** *Aumenta el tamaño del binario.*

---

#### ***Problemas comunes con Alpine***

- *Alpine es una **distro minimalista** que no incluye muchas de las librerías compartidas que las distribuciones más completas como **Debian** sí tienen. Por lo tanto, si compilas tu aplicación en **Debian** y luego intentas ejecutarla en **Alpine** (sin librerías compartidas), es posible que el binario no funcione.*

- *En este caso, **Go** crea binarios que, por defecto, están enlazados dinámicamente, lo que puede causar problemas en entornos como **Alpine**.*

---

### ***Mejora de la Información y Continuación***

---

#### ***Ejecución del Contenedor y Problemas Encontrados***

- **Después de construir la imagen con Alpine, intentamos ejecutar el contenedor:**

```bash
docker container run -itp8080:8080 --rm d4nitrix13/gin:multi-alpine
```

- **Sin embargo, obtenemos el siguiente error:**

```bash
/bin/sh: ./App-Go: not found
```

- *Este mensaje indica que el binario `App-Go` no puede ser encontrado o ejecutado. Para investigar más, sobrescribimos el comando por defecto y listamos los ficheros en el directorio de trabajo:*

```bash
docker container run -itp8080:8080 d4nitrix13/gin:multi-alpine ls -lA
```

**Salida:**

```bash
total 10980
-rwxr-xr-x    1 root     root      11240812 Sep  7 23:53 App-Go
```

- *El binario `App-Go` está presente y tiene permisos de ejecución, lo que sugiere que el problema no es su ausencia.*

---

#### ***Causa del Problema***

- *La razón más probable es que el binario está **enlazado dinámicamente** a librerías que no existen en la imagen de **Alpine**. Como Alpine es una distribución minimalista, carece de muchas librerías que están presentes en distribuciones como Debian o Ubuntu.*

- *Cuando un binario se **enlaza dinámicamente**, no contiene todo el código de las librerías que utiliza, sino que establece una referencia para que el sistema operativo cargue las librerías necesarias en tiempo de ejecución. Esto requiere que dichas librerías estén presentes en el entorno donde se ejecuta el binario.*

---

#### ***Solución: Enlazado Estático del Binario***

- *Para resolver este problema, podemos compilar el binario con **enlazado estático**, de modo que todas las librerías necesarias se incluyan dentro del propio binario. Esto elimina la dependencia de librerías externas en tiempo de ejecución.*

---

#### ***Modificación del Dockerfile***

- **Editamos la línea de compilación en el Dockerfile para añadir las opciones necesarias para el enlazado estático:**

```Dockerfile
RUN CGO_ENABLED=0 go build -a -installsuffix cgo -o App-Go
```

---

##### ***Explicación de los Flags:***

- **`CGO_ENABLED=0`:** *Deshabilita el uso de CGO, forzando a Go a compilar sin soporte para código C, lo que permite generar un binario completamente estático.*
- **`-a`:** *Fuerza la recompilación de todos los paquetes, incluso si ya están actualizados.*
- **`-installsuffix cgo`:** *Cambia el sufijo de instalación para diferenciar las compilaciones que tienen CGO deshabilitado.*
- **`-o App-Go`:** *Especifica el nombre del fichero binario de salida.*

---

#### ***Dockerfile Actualizado***

- **El Dockerfile completo queda de la siguiente manera:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# ------------------------------------Inicio Stage 0----------------------------------

# Se utiliza la imagen base de golang para compilar la aplicación.
FROM golang AS builder

# Define el directorio de trabajo.
WORKDIR /App

# Copia los ficheros de dependencias.
COPY go.* ./

# Descarga las dependencias.
RUN go mod download

# Copia el código fuente.
COPY ./ ./

# Compila el binario con enlazado estático.
RUN CGO_ENABLED=0 go build -a -installsuffix cgo -o App-Go

# ------------------------------------Final Stage 0-----------------------------------

# ------------------------------------Inicio Stage 1----------------------------------

# Utiliza la imagen minimalista de Alpine para la ejecución.
FROM alpine:latest

# Establece el directorio de trabajo.
WORKDIR /App

# Copia el binario desde el stage anterior.
COPY --from=builder /App/App-Go ./

# Expone el puerto 8080.
EXPOSE 8080

# Ejecuta el binario.
CMD ./App-Go

# ------------------------------------Final Stage 1-----------------------------------
```

- *La imagen tiene un tamaño de aproximadamente **14MB**, lo cual es significativamente menor que las imágenes anteriores.*

- **Conclusión**

- *Al compilar el binario con enlazado estático, hemos resuelto el problema de las librerías faltantes en Alpine y hemos obtenido una imagen Docker muy ligera. Esto es ideal para despliegues en producción, ya que reduce el tiempo de despliegue y el consumo de recursos.*

**Notas Adicionales:**

- **Importancia de CGO_ENABLED=0:** *Deshabilitar CGO es crucial para asegurar que el binario sea completamente estático y no dependa de librerías C externas.*

- **Compatibilidad entre Distribuciones:** *Al generar binarios estáticos, aumentamos la portabilidad de nuestra aplicación entre diferentes distribuciones de Linux.*

- **Optimización de Imágenes Docker:** *Usar imágenes base minimalistas como Alpine, combinadas con binarios estáticos, es una práctica recomendada para optimizar el tamaño y eficiencia de las imágenes Docker.*

---

### ***Construcción de la imagen con el tag `dev`***

- **Utilizamos el siguiente comando para construir la imagen con la etiqueta `dev`:**

```bash
docker image build -t d4nitrix13/gin:dev ./
```

**Resultado esperado:**

```bash
[+] Building 9.8s (15/15) FINISHED                                                                                     
 => [internal] load build definition from Dockerfile                                                                             0.0s
 => => transferring dockerfile: 1.97kB                                                                                           0.0s
 => [internal] load metadata for docker.io/library/alpine:latest                                                                 9.7s
 => [internal] load metadata for docker.io/library/golang:latest                                                                 9.7s
 => [internal] load .dockerignore                                                                                                0.0s
 => => transferring context: 221B                                                                                                0.0s
 => [builder 1/6] FROM docker.io/library/golang:latest@sha256:4a3c2bcd243d3dbb7b15237eecb0792db3614900037998c2cd6a579c46888c1e   0.0s
 => [internal] load build context                                                                                                0.0s
 => => transferring context: 81B                                                                                                 0.0s
 => [stage-1 1/3] FROM docker.io/library/alpine:latest@sha256:beefdbd8a1da6d2915566fde36db9db0b524eb737fc57cd1367effd16dc0d06d   0.0s
 => CACHED [stage-1 2/3] WORKDIR /App                                                                                            0.0s
 => CACHED [builder 2/6] WORKDIR /App                                                                                            0.0s
 => CACHED [builder 3/6] COPY go.* ./                                                                                            0.0s
 => CACHED [builder 4/6] RUN go mod download                                                                                     0.0s
 => CACHED [builder 5/6] COPY ./ ./                                                                                              0.0s
 => CACHED [builder 6/6] RUN CGO_ENABLED=0 go build -a -installsuffix cgo -o App-Go                                              0.0s
 => CACHED [stage-1 3/3] COPY --from=builder /App/App-Go ./                                                                      0.0s
 => exporting to image                                                                                                           0.0s
 => => exporting layers                                                                                                          0.0s
 => => writing image sha256:e96a5cbd3bbd4fa30b6c0a39248f272ee1420fae0555a6fc896308c3348971c7                                     0.0s
 => => naming to docker.io/d4nitrix13/gin:dev                                                                                    0.0s

1 warning found (use docker --debug to expand):
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 47)
```

---

### ***Ejecución del contenedor***

- **Ejecutamos el contenedor para iniciar la aplicación Go con Gin utilizando el siguiente comando:**

```bash
docker run -itp 8080:8080 --rm d4nitrix13/gin:dev
```

- **La salida será algo similar a:**

```bash
[GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.

[GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
 - using env:   export GIN_MODE=release
 - using code:  gin.SetMode(gin.ReleaseMode)

[GIN-debug] GET    /ping                     --> main.main.func1 (3 handlers)
[GIN-debug] [WARNING] You trusted all proxies, this is NOT safe. We recommend you to set a value.
Please check https://pkg.go.dev/github.com/gin-gonic/gin#readme-don-t-trust-all-proxies for details.
[GIN-debug] Environment variable PORT is undefined. Using port :8080 by default
[GIN-debug] Listening and serving HTTP on :8080
```

---

### ***Probando el endpoint***

- **Para verificar que la aplicación esté corriendo correctamente, podemos hacer una solicitud HTTP al endpoint `/ping` de la aplicación:**

```bash
curl localhost:8080/ping
```

---

### ***Logs del contenedor***

- **Si revisamos los logs del contenedor, veremos algo como lo siguiente:**

```bash
docker run -itp 8080:8080 --rm d4nitrix13/gin:dev
[GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.

[GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
 - using env:   export GIN_MODE=release
 - using code:  gin.SetMode(gin.ReleaseMode)

[GIN-debug] GET    /ping                     --> main.main.func1 (3 handlers)
[GIN-debug] [WARNING] You trusted all proxies, this is NOT safe. We recommend you to set a value.
Please check https://pkg.go.dev/github.com/gin-gonic/gin#readme-don-t-trust-all-proxies for details.
[GIN-debug] Environment variable PORT is undefined. Using port :8080 by default
[GIN-debug] Listening and serving HTTP on :8080
[GIN] 2024/09/08 - 00:29:04 | 200 |      44.627µs |      172.17.0.1 | GET      "/ping"
```

---

### ***Consideraciones sobre imágenes base más ligeras***

- *Existe una imagen más ligera que `alpine`, conocida como `scratch`, la cual no tiene un sistema operativo completo, por lo que su uso es más avanzado. Para utilizar `scratch`, necesitarás saber exactamente qué incluir en tu imagen, ya que no cuenta con las herramientas y librerías habituales. En algunos casos, es posible que necesites instalar bibliotecas adicionales en la imagen de `alpine`, pero estos casos son más raros.*

- *Una alternativa a `alpine` es `debian:bullseye`, que ofrece más soporte y compatibilidad para bibliotecas, aunque a costa de un tamaño de imagen más grande.*

---

### ***Mejora de la compilación para reducir dependencias***

*En el caso de usar `alpine`, si tu aplicación Go no encuentra algunas dependencias dinámicas al ejecutar el binario, como ocurrió con el error:*

```bash
/bin/sh: ./App-Go: not found
```

- *Una solución es asegurarte de que el binario tenga todas las librerías enlazadas de forma estática. Esto se logra configurando la compilación de Go para que no dependa de las bibliotecas C dinámicas. Se recomienda agregar la línea de compilación siguiente en el Dockerfile para habilitar esta opción:*

```Dockerfile
RUN CGO_ENABLED=0 go build -a -installsuffix cgo -o App-Go
```

- *Esto asegura que el ejecutable será auto-contenido y no dependerá de bibliotecas del sistema en tiempo de ejecución.*

---

### ***Verificación del Peso de las Imágenes***

- **Para verificar el tamaño de las imágenes, primero descargamos la imagen base de `alpine` para tener una referencia del peso inicial. Puedes encontrar más información sobre la imagen de Alpine en [Docker Hub](https://hub.docker.com/_/alpine "https://hub.docker.com/_/alpine").**

**Descargamos la imagen de Alpine con el siguiente comando:**

```bash
docker pull alpine
```

**Resultado esperado:**

```bash
Using default tag: latest
latest: Pulling from library/alpine
43c4264eed91: Already exists
Digest: sha256:beefdbd8a1da6d2915566fde36db9db0b524eb737fc57cd1367effd16dc0d06d
Status: Downloaded newer image for alpine:latest
docker.io/library/alpine:latest
```

**Luego, para ver el tamaño de las imágenes en tu sistema, utiliza:**

```bash
docker images -a
```

**Salida esperada:**

```bash
REPOSITORY         TAG            IMAGE ID       CREATED             SIZE
d4nitrix13/gin     dev            e96a5cbd3bbd   33 minutes ago      19MB
d4nitrix13/gin     multi-alpine   9d54b3314c80   52 minutes ago      19MB
<none>             <none>         0fb0401c720f   About an hour ago   89.1MB
d4nitrix13/gin     multi          185a00984a0e   5 hours ago         89MB
d4nitrix13/gin     stages         185a00984a0e   5 hours ago         89MB
d4nitrix13/gin     golang         21ea1268364d   6 hours ago         1.21GB
d4nitrix13/gin     latest         00382cb81ccc   23 hours ago        753MB
alpine             latest         91ef0af61f39   27 hours ago        7.8MB
d4nitrix13/rails   preconfig      68f5a326fdb5   2 days ago          1.02GB
d4nitrix13/rails   latest         f3940d656524   2 days ago          591MB
debian             latest         4fd3f4b75df3   3 days ago          117MB
ubuntu             22.04          53a843653cbc   3 weeks ago         77.9MB
```

---

### ***Análisis del Tamaño de las Imágenes***

**Como se puede observar:**

- *La imagen base de `alpine` tiene un tamaño de **7.8MB**, lo que la convierte en una de las imágenes más ligeras disponibles.*
- *La última imagen que construimos (`d4nitrix13/gin:dev`) tiene un tamaño de **19MB**. Este tamaño es relativamente pequeño y muestra que hemos optimizado la imagen al final.*

- *El tamaño de la imagen final puede parecer mayor que el de Alpine, pero si comparamos con la imagen base de Go (`d4nitrix13/gin:golang`), que pesa **1.21GB**, la optimización es notable.*

---

### ***Enlazadores y su Uso***

- **Los enlazadores (linkers) son herramientas esenciales en el proceso de compilación de software. En C y otros lenguajes, su propósito principal es combinar varios ficheros de objeto en un único fichero ejecutable. Este proceso incluye:**

1. **Resolución de Símbolos:** *El enlazador resuelve las referencias entre diferentes partes del código y las bibliotecas. Por ejemplo, si un fichero de objeto usa una función definida en otro fichero de objeto, el enlazador se asegura de que la referencia sea correcta.*

2. **Asignación de Direcciones de Memoria:** *El enlazador asigna direcciones de memoria a cada módulo y a las funciones y variables dentro de ellos.*

3. **Creación del Ejecutable Final:** *Finalmente, el enlazador genera el fichero ejecutable que se puede ejecutar en un sistema operativo.*

- **En el contexto de Docker y las imágenes base:**

- **Alpine:** *Al usar Alpine, que es una distribución mínima, los ficheros binarios generados pueden requerir menos espacio. Sin embargo, Alpine usa la biblioteca `musl` en lugar de `glibc`, lo que puede llevar a incompatibilidades con algunas aplicaciones.*

- **Scratch:** *La imagen `scratch` es la imagen base más ligera posible, pero no incluye un sistema operativo ni bibliotecas básicas, por lo que es más difícil de usar a menos que se tenga un control total sobre las dependencias del programa.*

---

#### ***`musl` y `glibc` son bibliotecas estándar de C utilizadas en sistemas Unix y Linux para proporcionar funciones básicas del sistema a los programas de usuario. Aquí tienes una explicación detallada de cada una:***

---

### ***`musl`***

- **Qué es:** *`musl` es una biblioteca estándar de C ligera y eficiente diseñada para sistemas Linux. Proporciona una implementación completa de la interfaz estándar de C y está optimizada para ser pequeña y rápida.*
- **Características**:
  - **Ligereza:** *`musl` tiene un tamaño de binario más pequeño en comparación con `glibc`, lo que la hace ideal para sistemas con recursos limitados o para construir imágenes Docker pequeñas.*
  - **Compatibilidad:** *Aunque `musl` es compatible con la mayoría de los programas que usan `glibc`, algunas aplicaciones pueden tener problemas si están especialmente ligadas a características específicas de `glibc`.*
  - **Eficiencia:** *`musl` está diseñada para ser rápida y utilizar menos memoria.*
  - **Simplicidad:** *La implementación de `musl` es menos compleja en comparación con `glibc`, lo que facilita su mantenimiento y mejora la seguridad.*

- **Uso:** *`musl` se utiliza comúnmente en distribuciones ligeras de Linux como Alpine Linux, que se centra en ofrecer un sistema operativo minimalista con un tamaño reducido.*

- **Origen del Nombre**
  - *`musl:` El nombre "musl" se elige para evocar un sentido de ligereza y simplicidad. El creador del proyecto, `Rich Felker`, ha mencionado en ocasiones que el nombre se escogió por ser corto y fácil de recordar.*

---

### ***`glibc` (GNU C Library)***

- **Qué es:** *`glibc` es la biblioteca estándar de C más utilizada en sistemas Linux. Es una implementación completa de la interfaz estándar de C y es muy conocida por su robustez y amplia compatibilidad.*
- **Características**:
  - **Compatibilidad:** *`glibc` ofrece un amplio soporte para características del sistema y extensiones específicas de GNU, lo que la hace adecuada para una gran variedad de aplicaciones y entornos.*
  - **Funcionalidades avanzadas:** *Incluye soporte para muchas características avanzadas del sistema, como la localización, el manejo de hilos, y extensiones específicas de GNU.*
  - **Tamaño y complejidad:** *`glibc` tiende a ser más grande y compleja en comparación con `musl`, lo que puede resultar en imágenes de Docker más grandes y un mayor uso de memoria.*

- **Uso:** *`glibc` es la biblioteca estándar en muchas distribuciones de Linux, como Ubuntu, Debian, y Fedora, debido a su amplio soporte y compatibilidad con la mayoría de las aplicaciones y programas.*

---

### ***Comparación***

- **Tamaño:** *`musl` generalmente produce binarios más pequeños que `glibc`, lo que resulta en imágenes Docker más ligeras y tiempos de inicio más rápidos.*
- **Compatibilidad:** *`glibc` tiene una compatibilidad más amplia con aplicaciones debido a su mayor soporte para características y extensiones del sistema.*
- **Uso en Docker:** *`musl` se prefiere en contextos donde el tamaño de la imagen es una preocupación importante, como en imágenes Docker basadas en Alpine. `glibc` es común en imágenes más grandes que buscan una mayor compatibilidad y funcionalidad.*

---

### ***Ejemplo de Uso en Docker***

- **Alpine Linux** *usa `musl` y es conocido por su tamaño reducido, lo que hace que sea una opción popular para construir imágenes Docker ligeras.*
- **Debian/Ubuntu** *usa `glibc` y puede ser preferido en escenarios donde la compatibilidad con una amplia gama de aplicaciones es esencial.*

- **Conclusión**

- **Ambas bibliotecas cumplen el mismo propósito fundamental, pero su elección puede depender de los requisitos específicos de compatibilidad, tamaño y eficiencia para tu aplicación o entorno de desarrollo.**

---

#### ***No es posible descargar la imagen `scratch` directamente usando `docker pull scratch`, ya que es una imagen reservada y vacía utilizada como base para construir contenedores mínimos.***

```bash
docker pull scratch
```

```bash
docker pull scratch
Using default tag: latest
Error response from daemon: 'scratch' is a reserved name
```

- **El error que ves, *`'scratch' is a reserved name`*, se debe a que `scratch` es una imagen especial en Docker, no es una imagen descargable del registro. `scratch` es una imagen vacía que se utiliza como base para construir otras imágenes, generalmente en contenedores donde se quiere tener un entorno mínimo sin ningún sistema operativo adicional.**

- **No puedes hacer `docker pull scratch` porque no está disponible en el registro de Docker para ser descargada. En su lugar, se usa directamente como base en un `Dockerfile`, por ejemplo:**

```Dockerfile
FROM scratch
```

- *Este tipo de contenedores se utiliza típicamente para aplicaciones que incluyen todo lo necesario en un solo binario, como Go, que no necesitan bibliotecas adicionales para ejecutarse.*
