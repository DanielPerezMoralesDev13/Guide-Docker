<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->

# ***Copias de directorios completos de un stage a otro***

- *Un **stage** es una imagen temporal que se utiliza en un Dockerfile para construir una imagen final. A menudo, se utilizan múltiples stages para optimizar el proceso de construcción, especialmente cuando se necesitan herramientas de construcción en una etapa y sólo el resultado final en otra.*

**Si recordamos el ejemplo del Dockerfile anterior:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# ------------------------------------Inicio Stage 0 (Base)----------------------------------

# Usamos la imagen base oficial de Python 3.10-slim, una versión optimizada y ligera de Python.
# Esta imagen incluye Python y herramientas asociadas preinstaladas, reduciendo el tamaño del contenedor y optimizando el rendimiento.
FROM python:3.10-slim AS base

# Actualizamos la lista de paquetes disponibles en el sistema operativo del contenedor.
# Esto garantiza que obtengamos las últimas versiones de los paquetes y parches de seguridad.
RUN apt update \
    # Instalamos las siguientes dependencias esenciales:
    # - default-libmysqlclient-dev: Proporciona las bibliotecas y ficheros de encabezado necesarios para compilar aplicaciones que interactúan con MySQL.
    # También instalamos Pipenv, una herramienta para gestionar entornos virtuales y dependencias en proyectos Python.
    && apt install -y \
    default-libmysqlclient-dev \
    && pip install pipenv

# Establecemos el directorio de trabajo en `/App` para organizar el código y ficheros de la aplicación.
# Todos los comandos que se ejecuten a partir de este punto se realizarán dentro de este directorio.
WORKDIR /App

# ------------------------------------Final Stage 0 (Base)-----------------------------------

# ------------------------------------Inicio Stage 1 (Builder)--------------------------------

# Usamos la imagen base definida en el Stage 0 como la base para esta etapa de construcción.
FROM base AS builder

# Configuramos Pipenv para que el entorno virtual se cree dentro del directorio del proyecto.
# Esto asegura que el entorno virtual esté contenido dentro del directorio `/App`, facilitando su gestión y evitando conflictos.
ENV PIPENV_VENV_IN_PROJECT=1

# Copiamos los ficheros `Pipfile` y `Pipfile.lock` al directorio de trabajo del contenedor.
# Estos ficheros definen las dependencias del proyecto y permiten a Pipenv instalar las versiones exactas necesarias.
COPY ./Pipfile* ./

# Instalamos las herramientas de compilación necesarias y luego usamos Pipenv para instalar las dependencias especificadas en el `Pipfile`.
# Esto configura el entorno virtual con todas las bibliotecas necesarias para la aplicación.
RUN apt install -y build-essential && pipenv install

# ------------------------------------Final Stage 1 (Builder)--------------------------------


# ------------------------------------Inicio Stage 2 (Runtime)----------------------------------

# Usamos nuevamente la imagen base del Stage 0 para el entorno de ejecución.
# Esto garantiza que el contenedor final tenga la configuración y dependencias necesarias para ejecutar la aplicación.
FROM base AS runtime

# Definimos la variable de entorno `FLASK_APP` que indica a Flask el fichero principal de la aplicación.
# Esta variable es necesaria para que Flask pueda localizar y ejecutar la aplicación cuando el contenedor se inicie.
ENV FLASK_APP=./todos.app

# Copiamos el entorno virtual creado en el Stage 1 al contenedor de runtime.
# Esto evita la reinstalación de dependencias y reduce el tamaño del contenedor final.
COPY --from=builder /App/.venv /App/.venv

# Copiamos el código fuente de la aplicación y otros ficheros necesarios para ejecutar el proyecto.
# Esto incluye el código de Flask y cualquier recurso adicional requerido por la aplicación.
COPY ./ ./

# Exponemos el puerto 5000, que es el puerto por defecto en el que Flask ejecuta la aplicación.
# Esto permite que la aplicación sea accesible desde el exterior del contenedor.
EXPOSE 5000

# Ejecutamos el servidor Flask usando Pipenv para asegurarnos de que el entorno virtual esté activado.
# La opción `--host 0.0.0.0` permite que la aplicación sea accesible desde cualquier IP, no solo desde localhost.
CMD pipenv run flask run --host 0.0.0.0

# ------------------------------------Final Stage 2 (Runtime)--------------------------------
```

**En el Dockerfile proporcionado, si reemplazamos la línea:**

```Dockerfile
COPY --from=builder /App/.venv /App/.venv
```

**por:**

```Dockerfile
COPY --from=builder /App/.venv ./
```

- *Esto daría lugar a un error diciendo que `pipenv` no encuentra el `.venv`, ya que la estructura del directorio y el contenido no se copiarían correctamente. El comando `COPY --from=builder /App/.venv ./` copiaría el contenido del directorio `.venv` en el directorio actual, pero no preservaría la estructura completa del directorio `.venv`.*

**Para ilustrar, si el contenido de `.venv` se organiza de la siguiente manera:**

```bash
tree -fCL 1 ./.venv/
.venv
├── .venv/bin
├── .venv/include
├── .venv/lib
├── .venv/pyvenv.cfg
└── .venv/src

5 directories, 1 file
```

El comando `COPY --from=builder /App/.venv ./` copiaría:

```plaintext
bin
include
lib
pyvenv.cfg
src
```

- *lo cual no es lo mismo que copiar el directorio `.venv` entero. Esto es importante porque `pipenv` busca el directorio `.venv` en la ruta especificada, y al copiar solo el contenido, el entorno virtual no sería detectado correctamente. Por eso es necesario usar la ruta completa o relativa para asegurar que el entorno virtual se copie correctamente:*

- **Ruta completa:** *`COPY --from=builder /App/.venv /App/.venv`*
- **Ruta relativa:** *`COPY --from=builder /App/.venv ./.venv`*

*Ambos métodos garantizarán que el entorno virtual se copie en el lugar correcto, permitiendo que `pipenv` lo detecte adecuadamente y evitando la reinstalación de dependencias.*

---

## ***Ejemplo del Dockerfile donde no se copia toda la estructura del `.env` solo el contenido***

- **En este ejemplo, creamos un Dockerfile incorrecto que servirá como ejemplo de cómo **no** copiar toda la estructura del `.env`, sino solo su contenido. Luego, construiremos la imagen para ver el error que se produce.**

### ***Dockerfile (Ejemplo Incorrecto)***

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# ------------------------------------Inicio Stage 0 (Base)----------------------------------

# Usamos la imagen base oficial de Python 3.10-slim, una versión optimizada y ligera de Python.
# Esta imagen incluye Python y herramientas asociadas preinstaladas, reduciendo el tamaño del contenedor y optimizando el rendimiento.
FROM python:3.10-slim AS base

# Actualizamos la lista de paquetes disponibles en el sistema operativo del contenedor.
# Esto garantiza que obtengamos las últimas versiones de los paquetes y parches de seguridad.
RUN apt update \
    # Instalamos las siguientes dependencias esenciales:
    # - default-libmysqlclient-dev: Proporciona las bibliotecas y ficheros de encabezado necesarios para compilar aplicaciones que interactúan con MySQL.
    # También instalamos Pipenv, una herramienta para gestionar entornos virtuales y dependencias en proyectos Python.
    && apt install -y \
    default-libmysqlclient-dev \
    && pip install pipenv

# Establecemos el directorio de trabajo en `/App` para organizar el código y ficheros de la aplicación.
# Todos los comandos que se ejecuten a partir de este punto se realizarán dentro de este directorio.
WORKDIR /App

# ------------------------------------Final Stage 0 (Base)-----------------------------------

# ------------------------------------Inicio Stage 1 (Builder)--------------------------------

# Usamos la imagen base definida en el Stage 0 como la base para esta etapa de construcción.
FROM base AS builder

# Configuramos Pipenv para que el entorno virtual se cree dentro del directorio del proyecto.
# Esto asegura que el entorno virtual esté contenido dentro del directorio `/App`, facilitando su gestión y evitando conflictos.
ENV PIPENV_VENV_IN_PROJECT=1

# Copiamos los ficheros `Pipfile` y `Pipfile.lock` al directorio de trabajo del contenedor.
# Estos ficheros definen las dependencias del proyecto y permiten a Pipenv instalar las versiones exactas necesarias.
COPY ./Pipfile* ./

# Instalamos las herramientas de compilación necesarias y luego usamos Pipenv para instalar las dependencias especificadas en el `Pipfile`.
# Esto configura el entorno virtual con todas las bibliotecas necesarias para la aplicación.
RUN apt install -y build-essential && pipenv install

# ------------------------------------Final Stage 1 (Builder)--------------------------------

# ------------------------------------Inicio Stage 2 (Runtime)----------------------------------

# Usamos nuevamente la imagen base del Stage 0 para el entorno de ejecución.
# Esto garantiza que el contenedor final tenga la configuración y dependencias necesarias para ejecutar la aplicación.
FROM base AS runtime

# Definimos la variable de entorno `FLASK_APP` que indica a Flask el fichero principal de la aplicación.
# Esta variable es necesaria para que Flask pueda localizar y ejecutar la aplicación cuando el contenedor se inicie.
ENV FLASK_APP=./todos.app

# Copiamos el entorno virtual creado en el Stage 1 al contenedor de runtime.
# Esto evita la reinstalación de dependencias y reduce el tamaño del contenedor final.
COPY --from=builder /App/.venv ./

# Copiamos el código fuente de la aplicación y otros ficheros necesarios para ejecutar el proyecto.
# Esto incluye el código de Flask y cualquier recurso adicional requerido por la aplicación.
COPY ./ ./

# Exponemos el puerto 5000, que es el puerto por defecto en el que Flask ejecuta la aplicación.
# Esto permite que la aplicación sea accesible desde el exterior del contenedor.
EXPOSE 5000

# Ejecutamos el servidor Flask usando Pipenv para asegurarnos de que el entorno virtual esté activado.
# La opción `--host 0.0.0.0` permite que la aplicación sea accesible desde cualquier IP, no solo desde localhost.
CMD pipenv run flask run --host 0.0.0.0

# ------------------------------------Final Stage 2 (Runtime)--------------------------------
```

---

#### ***Construcción de la Imagen y Error***

**Construimos la imagen utilizando el Dockerfile incorrecto:**

```bash
docker image build --tag d4nitrix13/app-08:fail ./
```

**Salida del comando `docker image build`:**

```bash
[+] Building 4.0s (12/12) FINISHED                                                                                     docker:default
 => [internal] load build definition from Dockerfile                                                                             0.0s
 => => transferring dockerfile: 4.08kB                                                                                           0.0s
 => [internal] load metadata for docker.io/library/python:3.10-slim                                                              3.9s
 => [internal] load .dockerignore                                                                                                0.0s
 => => transferring context: 238B                                                                                                0.0s
 => [base 1/3] FROM docker.io/library/python:3.10-slim@sha256:bfe58c1b0f5cd32624417971c2a60d472f36835969f0d335d7d792774cc5b293   0.0s
 => [internal] load build context                                                                                                0.0s
 => => transferring context: 653B                                                                                                0.0s
 => CACHED [base 2/3] RUN apt update     && apt install -y     default-libmysqlclient-dev     && pip install pipenv              0.0s
 => CACHED [base 3/3] WORKDIR /App                                                                                               0.0s
 => CACHED [builder 1/2] COPY ./Pipfile* ./                                                                                      0.0s
 => CACHED [builder 2/2] RUN apt install -y build-essential && pipenv install                                                    0.0s
 => CACHED [runtime 1/2] COPY --from=builder /App/.venv ./                                                                       0.0s
 => CACHED [runtime 2/2] COPY ./ ./                                                                                              0.0s
 => exporting to image                                                                                                           0.0s
 => => exporting layers                                                                                                          0.0s
 => => writing image sha256:2f45fc40b89981122b0c7d0281115297a30a74799d89d66c85a684a338974a5b                                     0.0s
 => => naming to docker.io/d4nitrix13/app-08:fail                                                                                0.0s

 1 warning found (use docker --debug to expand):
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 71)
```

---

#### ***Ejecución y Error Relacionado con el Entorno Virtual***

**Al ejecutar el contenedor con el comando:**

```bash
docker run -itp5000:5000 --rm d4nitrix13/app-08:fail ls -lA
```

**Salida:**

```bash
Loading .env environment variables...
Creating a virtualenv for this project...
Pipfile: /App/Pipfile
Using /usr/local/bin/python (3.10.15) to create virtualenv...
⠏ Creating virtual environment...created virtual environment CPython3.10.15.final.0-64 in 1220ms
  creator CPython3Posix(dest=/root/.local/share/virtualenvs/App-LKE3ViPB, clear=False, no_vcs_ignore=False, global=False)
  seeder FromAppData(download=False, pip=bundle, setuptools=bundle, wheel=bundle, via=copy, app_data_dir=/root/.local/share/virtualenv)
    added seed packages: pip==24.2, setuptools==74.1.2, wheel==0.44.0
  activators BashActivator,CShellActivator,FishActivator,NushellActivator,PowerShellActivator,PythonActivator

✔ Successfully created virtual environment!
Virtualenv location: /root/.local/share/virtualenvs/App-LKE3ViPB
Error: the command flask could not be found within PATH or Pipfile's [scripts].
```

- *Como se puede observar, el entorno virtual se crea correctamente, pero el comando `flask` no se encuentra, ya que el contenido del `.venv` no se copió correctamente al contenedor de ejecución. El contenedor busca el entorno virtual en `/root/.local/share/virtualenvs/App-LKE3ViPB`, mientras que en el Dockerfile se espera que esté en `/App/.venv`.*

---

#### ***Ejecución con Comando Alternativo para Listar Contenidos***

- **Para comprobar la estructura del directorio y los ficheros presentes, puedes usar el siguiente comando:**

```bash
docker run -itp5000:5000 --rm d4nitrix13/app-08:fail ls -lA
```

**Salida:**

```bash
docker run -itp5000:5000 --rm d4nitrix13/app-08:fail ls -lA
total 136
-rw-rw-r-- 1 root root    78 Sep  8 22:50 .env
-rw-r--r-- 1 root root    40 Sep  9 23:41 .gitignore
-rw-r--r-- 1 root root     4 Sep  9 23:41 .project
-rw-rw-r-- 1 root root 57640 Sep  8 18:15 App-Flask-Mysql.zip
-rw-rw-r-- 1 root root   276 Apr  2  2023 Pipfile
-rw-rw-r-- 1 root root 24967 Apr  2  2023 Pipfile.lock
-rw-rw-r-- 1 root root   272 Sep  8 21:29 README.md
drwxr-xr-x 2 root root  4096 Sep  9 23:41 bin
drwxr-xr-x 3 root root  4096 Sep  9 23:41 include
drwxr-xr-x 3 root root  4096 Sep  9 23:41 lib
drwxrwxr-x 3 root root  4096 Apr  2  2023 migrations
-rw-r--r-- 1 root root   248 Sep  9 23:41 pyvenv.cfg
drwxr-xr-x 2 root root  4096 Sep  9 23:41 src
drwxrwxr-x 2 root root  4096 Apr  2  2023 todos
```

- **El entorno virtual `.venv` no está presente, lo que confirma que no se copió correctamente.**

---

#### ***Uso de Rutas Relativas en Dockerfile y Verificación de Entorno Virtual***

- *En la configuración del `Dockerfile`, utilizaremos una ruta relativa para copiar el entorno virtual `.venv` desde el contenedor de construcción al contenedor de tiempo de ejecución. La ruta relativa en el comando `COPY` es una práctica válida y útil para mantener la organización dentro del contenedor. Aquí están los detalles y resultados de la prueba para verificar el correcto funcionamiento del entorno y el servidor Flask:*

### ***Configuración Actual del Dockerfile***

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# ------------------------------------Inicio Stage 0 (Base)----------------------------------

# Usamos la imagen base oficial de Python 3.10-slim, una versión optimizada y ligera de Python.
# Esta imagen incluye Python y herramientas asociadas preinstaladas, reduciendo el tamaño del contenedor y optimizando el rendimiento.
FROM python:3.10-slim AS base

# Actualizamos la lista de paquetes disponibles en el sistema operativo del contenedor.
# Esto garantiza que obtengamos las últimas versiones de los paquetes y parches de seguridad.
RUN apt update \
    # Instalamos las siguientes dependencias esenciales:
    # - default-libmysqlclient-dev: Proporciona las bibliotecas y ficheros de encabezado necesarios para compilar aplicaciones que interactúan con MySQL.
    # También instalamos Pipenv, una herramienta para gestionar entornos virtuales y dependencias en proyectos Python.
    && apt install -y \
    default-libmysqlclient-dev \
    && pip install pipenv

# Establecemos el directorio de trabajo en `/App` para organizar el código y ficheros de la aplicación.
# Todos los comandos que se ejecuten a partir de este punto se realizarán dentro de este directorio.
WORKDIR /App

# ------------------------------------Final Stage 0 (Base)-----------------------------------

# ------------------------------------Inicio Stage 1 (Builder)--------------------------------

# Usamos la imagen base definida en el Stage 0 como la base para esta etapa de construcción.
FROM base AS builder

# Configuramos Pipenv para que el entorno virtual se cree dentro del directorio del proyecto.
# Esto asegura que el entorno virtual esté contenido dentro del directorio `/App`, facilitando su gestión y evitando conflictos.
ENV PIPENV_VENV_IN_PROJECT=1

# Copiamos los ficheros `Pipfile` y `Pipfile.lock` al directorio de trabajo del contenedor.
# Estos ficheros definen las dependencias del proyecto y permiten a Pipenv instalar las versiones exactas necesarias.
COPY ./Pipfile* ./

# Instalamos las herramientas de compilación necesarias y luego usamos Pipenv para instalar las dependencias especificadas en el `Pipfile`.
# Esto configura el entorno virtual con todas las bibliotecas necesarias para la aplicación.
RUN apt install -y build-essential && pipenv install

# ------------------------------------Final Stage 1 (Builder)--------------------------------


# ------------------------------------Inicio Stage 2 (Runtime)----------------------------------

# Usamos nuevamente la imagen base del Stage 0 para el entorno de ejecución.
# Esto garantiza que el contenedor final tenga la configuración y dependencias necesarias para ejecutar la aplicación.
FROM base AS runtime

# Definimos la variable de entorno `FLASK_APP` que indica a Flask el fichero principal de la aplicación.
# Esta variable es necesaria para que Flask pueda localizar y ejecutar la aplicación cuando el contenedor se inicie.
ENV FLASK_APP=./todos.app

# Copiamos el entorno virtual creado en el Stage 1 al contenedor de runtime.
# Esto evita la reinstalación de dependencias y reduce el tamaño del contenedor final.
COPY --from=builder /App/.venv ./.venv

# Copiamos el código fuente de la aplicación y otros ficheros necesarios para ejecutar el proyecto.
# Esto incluye el código de Flask y cualquier recurso adicional requerido por la aplicación.
COPY ./ ./

# Exponemos el puerto 5000, que es el puerto por defecto en el que Flask ejecuta la aplicación.
# Esto permite que la aplicación sea accesible desde el exterior del contenedor.
EXPOSE 5000

# Ejecutamos el servidor Flask usando Pipenv para asegurarnos de que el entorno virtual esté activado.
# La opción `--host 0.0.0.0` permite que la aplicación sea accesible desde cualquier IP, no solo desde localhost.
CMD pipenv run flask run --host 0.0.0.0

# ------------------------------------Final Stage 2 (Runtime)--------------------------------
```

---

### ***Construcción de la Imagen***

**El comando para construir la imagen es:**

```bash
docker image build --tag d4nitrix13/app-08:python-slim-multistage ./
```

**Resultado de la construcción:**

```bash
[+] Building 1.4s (12/12) FINISHED
 => [internal] load build definition from Dockerfile 0.0s
 => => transferring dockerfile: 4.09kB 0.0s
 => [internal] load metadata for docker.io/library/python:3.10-slim 1.3s
 => [internal] load .dockerignore 0.0s
 => => transferring context: 238B 0.0s
 => [internal] load build context 0.0s
 => => transferring context: 653B 0.0s
 => [base 1/3] FROM docker.io/library/python:3.10-slim@sha256:bfe58c1b0f5cd32624417971c2a60d472f36835969f0d335d7d792774cc5b293 0.0s
 => CACHED [base 2/3] RUN apt update && apt install -y default-libmysqlclient-dev && pip install pipenv 0.0s
 => CACHED [base 3/3] WORKDIR /App 0.0s
 => CACHED [builder 1/2] COPY ./Pipfile* ./ 0.0s
 => CACHED [builder 2/2] RUN apt install -y build-essential && pipenv install 0.0s
 => CACHED [runtime 1/2] COPY --from=builder /App/.venv ./.venv 0.0s
 => CACHED [runtime 2/2] COPY ./ ./ 0.0s
 => exporting to image 0.0s
 => => exporting layers 0.0s
 => => writing image sha256:a461a278c460064a8b02cd33bf10a89b7f9c714ce56635c034a839547a5e6b97 0.0s
 => => naming to docker.io/d4nitrix13/app-08:python-slim-multistage 0.0s

 1 warning found (use docker --debug to expand):
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 71)
```

### ***Verificación del Contenido del Contenedor***

**Para verificar el contenido del contenedor, se ejecuta:**

```bash
docker run -itp5000:5000 --rm d4nitrix13/app-08:python-slim-multistage ls -lA
```

**Resultado:**

```bash
total 112
-rw-rw-r-- 1 root root    78 Sep  8 22:50 .env
drwxr-xr-x 6 root root  4096 Sep  9 23:41 .venv
-rw-rw-r-- 1 root root 57640 Sep  8 18:15 App-Flask-Mysql.zip
-rw-rw-r-- 1 root root   276 Apr  2  2023 Pipfile
-rw-rw-r-- 1 root root 24967 Apr  2  2023 Pipfile.lock
-rw-rw-r-- 1 root root   272 Sep  8 21:29 README.md
drwxrwxr-x 3 root root  4096 Apr  2  2023 migrations
drwxrwxr-x 2 root root  4096 Apr  2  2023 todos
```

---

### ***Verificación del Funcionamiento del Servidor***

**Para iniciar el contenedor y verificar el funcionamiento del servidor Flask, se ejecuta:**

```bash
docker run -itp5000:5000 --rm d4nitrix13/app-08:python-slim-multistage
```

**Resultado esperado:**

```bash
Loading .env environment variables...
 * Serving Flask app './todos.app'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://172.17.0.2:5000
Press CTRL+C to quit
```

**Realizando una solicitud `curl` para verificar la respuesta del servidor:**

```bash
curl 172.17.0.2:5000/todos
```

**Resultado:**

```json
{"todos":[{"description":"Prueba","id":1,"title":"tarea 1"}]}
```

---

### ***Logs del Servidor***

**Los logs del servidor confirman que la aplicación Flask está funcionando correctamente:**

```bash
Loading .env environment variables...
 * Serving Flask app './todos.app'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://172.17.0.2:5000
Press CTRL+C to quit
172.17.0.1 - - [10/Sep/2024 00:07:15] "GET /todos HTTP/1.1" 200 -
```

---

### ***Observaciones y Recomendaciones***

- *La advertencia `JSONArgsRecommended` sugiere el uso de JSON para el comando `CMD` en lugar de una cadena de texto. Esto se puede ajustar para evitar comportamientos no deseados relacionados con señales del sistema operativo.*
- *La ruta relativa utilizada para copiar el entorno virtual `.venv` ha funcionado correctamente, y el entorno virtual se ha copiado con éxito al contenedor de tiempo de ejecución.*
