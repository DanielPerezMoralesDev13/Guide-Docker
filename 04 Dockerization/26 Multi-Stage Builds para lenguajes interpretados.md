<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->

# ***Multi-Stage Builds para lenguajes interpretados***

- **Primero, si tenemos algún contenedor detenido, lo arrancamos nuevamente para obtener la IP adecuada (en este ejemplo, `172.17.0.2`):**

```bash
docker run -it --rm ubuntu:22.04
```

- **Después, iniciamos el contenedor de la base de datos para que utilice la IP `172.17.0.3`. Esto nos permite evitar cambios innecesarios en el Dockerfile.**

---

## ***Contenido del fichero `.env`***

- **Configura el fichero `.env` con las credenciales y la IP que se asignará al contenedor de la base de datos. Este fichero es crucial para conectar la aplicación con la base de datos MySQL.**

```bash
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=app
DB_HOST=172.17.0.3
DB_PORT=3306
```

---

### ***Iniciar el contenedor de la base de datos***

**Iniciamos el contenedor que hemos preparado previamente con el siguiente comando. Si el contenedor ya fue creado, simplemente lo arrancamos con `docker start`:**

```bash
docker start -i db-app-08
```

**Verás un log como este indicando que MySQL está listo:**

```bash
2024-09-09 21:42:00+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 9.0.1-1.el9 started.
2024-09-09 21:42:01+00:00 [Note] [Entrypoint]: Switching to dedicated user 'mysql'
2024-09-09 21:42:01+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 9.0.1-1.el9 started.
'/var/lib/mysql/mysql.sock' -> '/var/run/mysqld/mysqld.sock'
2024-09-09T21:42:02.058612Z 0 [System] [MY-015015] [Server] MySQL Server - start.
2024-09-09T21:42:02.450371Z 0 [System] [MY-010116] [Server] /usr/sbin/mysqld (mysqld 9.0.1) starting as process 1
2024-09-09T21:42:02.473327Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2024-09-09T21:42:02.985389Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2024-09-09T21:42:03.428525Z 0 [Warning] [MY-010068] [Server] CA certificate ca.pem is self signed.
2024-09-09T21:42:03.428656Z 0 [System] [MY-013602] [Server] Channel mysql_main configured to support TLS. Encrypted connections are now supported for this channel.
2024-09-09T21:42:03.438566Z 0 [Warning] [MY-011810] [Server] Insecure configuration for --pid-file: Location '/var/run/mysqld' in the path is accessible to all OS users. Consider choosing a different directory.
2024-09-09T21:42:03.503913Z 0 [System] [MY-011323] [Server] X Plugin ready for connections. Bind-address: '::' port: 33060, socket: /var/run/mysqld/mysqlx.sock
2024-09-09T21:42:03.504042Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '9.0.1'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL.
```

---

### ***Verificar la IP del contenedor***

**Para asegurarnos de que el contenedor de la base de datos tiene la IP esperada (`172.17.0.3`), usamos el siguiente comando para inspeccionar la IP del contenedor:**

```bash
docker inspect --format "{{.NetworkSettings.IPAddress}}" db-app-08
```

**Resultado esperado:**

```bash
172.17.0.3
```

---

### ***Detenemos el contenedor temporal anterior***

**Si estás utilizando un contenedor temporal y deseas detenerlo, puedes hacerlo de la siguiente manera:**

```bash
docker run -it --rm ubuntu:22.04
root@3c21f31826ba:/# exit
exit
```

---

### ***Revisión de errores comunes al construir la imagen***

- *Uno de los errores más comunes al construir una imagen de Docker para una aplicación que usa MySQL es la falta de dependencias que son necesarias para que MySQL funcione correctamente. Este problema puede surgir si utilizamos una imagen minimalista, como `python:3.10-slim`, que no incluye algunas librerías por defecto.*

- **Por ejemplo, al intentar construir la imagen, podrías recibir el siguiente error:**

```bash
docker build -t d4nitrix13/app-08:python-slim ./
```

**El error específico puede ser algo como:**

```bash
17.72 [pipenv.exceptions.InstallError]: ** /bin/sh: 1: mysql_config: not found**
```

---

### ***Causa del error***

- *Este error ocurre porque el cliente de MySQL tiene como dependencia una librería que se enlaza dinámicamente y que está escrita en C. La razón por la cual esta librería no se encuentra es porque estamos utilizando una imagen minimalista como `python:3.10-slim`, que no incluye esta dependencia necesaria.*

---

### ***Solución: Modificación del Dockerfile***

- **Para resolver este problema, debemos modificar nuestro `Dockerfile` para incluir las librerías necesarias.**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Usamos la imagen base oficial de Python 3.10-slim
# Esta imagen incluye Python y sus herramientas asociadas preinstaladas
FROM python:3.10-slim

# Actualiza la lista de paquetes disponibles e instala las dependencias necesarias
# default-libmysqlclient-dev: Bibliotecas y encabezados de MySQL para desarrollo
RUN apt update \
    && apt install -y \
    default-libmysqlclient-dev

# Instalamos Pipenv, una herramienta de gestión de entornos virtuales y dependencias para Python
RUN pip install pipenv

# Definimos la variable de entorno FLASK_APP para apuntar al fichero principal de la aplicación Flask
ENV FLASK_APP=./todos.app

# Configuramos Pipenv para crear el entorno virtual dentro del directorio del proyecto
ENV PIPENV_VENV_IN_PROJECT=1

# Creamos el directorio de trabajo dentro del contenedor
WORKDIR /App

# Copiamos los ficheros Pipfile y Pipfile.lock al directorio de trabajo del contenedor
COPY ./Pipfile* ./

# Instalamos las dependencias especificadas en Pipfile usando Pipenv
RUN pipenv install

# Copiamos el resto del proyecto
COPY ./ ./

# Exponemos el puerto 5000 para permitir el acceso externo a la aplicación Flask
EXPOSE 5000

# Iniciamos el servidor Flask usando Pipenv para activar el entorno virtual
CMD pipenv run flask run --host 0.0.0.0
```

---

### ***Detalles importantes***

- **Imagen `python:3.10-slim`:** *Esta imagen es ligera y no incluye todas las herramientas necesarias, por lo que debemos instalar las dependencias adicionales manualmente.*
  
- **Paquete `default-libmysqlclient-dev`:** *Este paquete incluye las bibliotecas de desarrollo necesarias para que el cliente de MySQL funcione correctamente con Python. Como la imagen slim no lo trae por defecto, lo instalamos en la sección `RUN` del Dockerfile.*

---

### ***Paquete faltante en imágenes slim***

- *En este caso, el paquete que falta es `default-libmysqlclient-dev`. Este paquete no está presente en la imagen slim porque es una versión minimalista que solo incluye lo esencial para ejecutar Python, por lo que debemos instalarlo explícitamente en la imagen Docker.*

---

### ***Construcción de la imagen nuevamente con el mismo tag***

**Después de haber solucionado el problema anterior con la instalación de las librerías y cabeceras de MySQL, es probable que al construir la imagen nuevamente con el siguiente comando:**

```bash
docker build -t d4nitrix13/app-08:python-slim ./
```

- *El error sera diferente. Esta vez, las librerías y cabeceras `.h` estarán presentes, pero lo que faltará serán los comandos necesarios para compilar la extensión nativa de Python. Esta extensión es un puente entre el código en C de MySQL y Python, permitiendo la comunicación entre ambos. Para que funcione, es necesario crear objetos que sean utilizables en Python, y esto se hace a través de código en C.*

- *El error común en este caso es que el compilador `gcc` no está presente, lo que impide compilar la extensión nativa. El error que puedes encontrar será similar al siguiente:*

```bash
19.64 [pipenv.exceptions.InstallError]: gcc -Wno-unused-result -Wsign-compare -DNDEBUG -g -fwrapv -O3 -Wall -fPIC -Dversion_info=(2,1,1,'final',0) -D__version__=2.1.1 -I/usr/include/mariadb -I/usr/include/mariadb/mysql -I/App/.venv/include -I/usr/local/include/python3.10 -c MySQLdb/_mysql.c -o build/temp.linux-x86_64-cpython-310/MySQLdb/_mysql.o -std=c99
19.64 [pipenv.exceptions.InstallError]: error: command 'gcc' failed: No such file or directory
```

```bash
docker build -td4nitrix13/app-08:python-slim ./
[+] Building 59.3s (10/11)                                                                                             docker:default
 => [internal] load build definition from Dockerfile                                                                             0.0s
 => => transferring dockerfile: 2.01kB                                                                                           0.0s
 => [internal] load metadata for docker.io/library/python:3.10-slim                                                              2.2s
 => [internal] load .dockerignore                                                                                                0.0s
 => => transferring context: 238B                                                                                                0.0s
 => [1/7] FROM docker.io/library/python:3.10-slim@sha256:bfe58c1b0f5cd32624417971c2a60d472f36835969f0d335d7d792774cc5b293        3.9s
 => => resolve docker.io/library/python:3.10-slim@sha256:bfe58c1b0f5cd32624417971c2a60d472f36835969f0d335d7d792774cc5b293        0.0s
 => => sha256:06031b2660e18fb8dbdeb5d6265fe89fca904df486b15ef35e3f522c40f70105 3.51MB / 3.51MB                                   0.6s
 => => sha256:608a12be06cb97b30beb100e2284292430577b6253d056dafd536a8a2c7e5b64 12.38MB / 12.38MB                                 2.3s
 => => sha256:056b23198375d898d881fa07b79898f7a0e0b0a101772d3718d0f13e2b81c75b 231B / 231B                                       0.7s
 => => sha256:bfe58c1b0f5cd32624417971c2a60d472f36835969f0d335d7d792774cc5b293 9.13kB / 9.13kB                                   0.0s
 => => sha256:a8136b36448af99dcef8b163e42e907991b8971bc9d5cb73637135003458704a 1.94kB / 1.94kB                                   0.0s
 => => sha256:4c544397d8a385f39b8d37225c150728fd917efdf41d8eff5dd7aedaa696fee9 6.93kB / 6.93kB                                   0.0s
 => => extracting sha256:06031b2660e18fb8dbdeb5d6265fe89fca904df486b15ef35e3f522c40f70105                                        0.3s
 => => sha256:bdca2c3c159a00efdc0b166edccd03565c220160b9cd2cd650c385bf11715f7f 3.16MB / 3.16MB                                   1.7s
 => => extracting sha256:608a12be06cb97b30beb100e2284292430577b6253d056dafd536a8a2c7e5b64                                        0.8s
 => => extracting sha256:056b23198375d898d881fa07b79898f7a0e0b0a101772d3718d0f13e2b81c75b                                        0.0s
 => => extracting sha256:bdca2c3c159a00efdc0b166edccd03565c220160b9cd2cd650c385bf11715f7f                                        0.4s
 => [internal] load build context                                                                                                0.0s
 => => transferring context: 653B                                                                                                0.0s
 => [2/7] RUN apt update && apt install -y default-libmysqlclient-dev                                                           18.2s
 => [3/7] RUN pip install pipenv                                                                                                14.7s
 => [4/7] WORKDIR /App                                                                                                           0.0s
 => [5/7] COPY ./Pipfile* ./                                                                                                     0.1s
 => ERROR [6/7] RUN pipenv install                                                                                              19.9s
------
 > [6/7] RUN pipenv install:
1.491 Creating a virtualenv for this project...
1.491 Pipfile: /App/Pipfile
1.518 Using /usr/local/bin/python (3.10.15) to create virtualenv...
3.189 created virtual environment CPython3.10.15.final.0-64 in 1242ms
3.189   creator CPython3Posix(dest=/App/.venv, clear=False, no_vcs_ignore=False, global=False)
3.189   seeder FromAppData(download=False, pip=bundle, setuptools=bundle, wheel=bundle, via=copy, app_data_dir=/root/.local/share/virtualenv)
3.189     added seed packages: pip==24.2, setuptools==74.1.2, wheel==0.44.0
3.189   activators BashActivator,CShellActivator,FishActivator,NushellActivator,PowerShellActivator,PythonActivator
3.189
3.191 ✔ Successfully created virtual environment!
3.283 Virtualenv location: /App/.venv
3.352 To activate this project's virtualenv, run pipenv shell.
3.352 Alternatively, run a command inside the virtualenv with pipenv run.
3.373 To activate this project's virtualenv, run pipenv shell.
3.373 Alternatively, run a command inside the virtualenv with pipenv run.
3.378 Installing dependencies from Pipfile.lock (051d81)...
19.64 [pipenv.exceptions.InstallError]: Collecting alembic==1.8.1 (from -r /tmp/pipenv-vwi3aj7v-requirements/pipenv-ylvjgo33-hashed-reqs.txt (line 1))
19.64 [pipenv.exceptions.InstallError]:   Downloading alembic-1.8.1-py3-none-any.whl (209 kB)
19.64 [pipenv.exceptions.InstallError]:      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 209.8/209.8 kB 899.8 kB/s eta 0:00:00
19.64 [pipenv.exceptions.InstallError]: Collecting click==8.1.3 (from -r /tmp/pipenv-vwi3aj7v-requirements/pipenv-ylvjgo33-hashed-reqs.txt (line 2))
19.64 [pipenv.exceptions.InstallError]:   Downloading click-8.1.3-py3-none-any.whl (96 kB)
19.64 [pipenv.exceptions.InstallError]:      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 96.6/96.6 kB 2.4 MB/s eta 0:00:00
19.64 [pipenv.exceptions.InstallError]: Collecting flask==2.2.2 (from -r /tmp/pipenv-vwi3aj7v-requirements/pipenv-ylvjgo33-hashed-reqs.txt (line 3))
19.64 [pipenv.exceptions.InstallError]:   Downloading Flask-2.2.2-py3-none-any.whl (101 kB)
19.64 [pipenv.exceptions.InstallError]:      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 101.5/101.5 kB 3.0 MB/s eta 0:00:00
19.64 [pipenv.exceptions.InstallError]: Collecting flask-migrate==3.1.0 (from -r /tmp/pipenv-vwi3aj7v-requirements/pipenv-ylvjgo33-hashed-reqs.txt (line 4))
19.64 [pipenv.exceptions.InstallError]:   Downloading Flask_Migrate-3.1.0-py3-none-any.whl (20 kB)
19.64 [pipenv.exceptions.InstallError]: Collecting flask-sqlalchemy==3.0.2 (from -r /tmp/pipenv-vwi3aj7v-requirements/pipenv-ylvjgo33-hashed-reqs.txt (line 5))
19.64 [pipenv.exceptions.InstallError]:   Downloading Flask_SQLAlchemy-3.0.2-py3-none-any.whl (24 kB)
19.64 [pipenv.exceptions.InstallError]: Collecting greenlet==2.0.0.post0 (from -r /tmp/pipenv-vwi3aj7v-requirements/pipenv-ylvjgo33-hashed-reqs.txt (line 6))
19.64 [pipenv.exceptions.InstallError]:   Downloading greenlet-2.0.0.post0-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (536 kB)
19.64 [pipenv.exceptions.InstallError]:      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 536.9/536.9 kB 4.3 MB/s eta 0:00:00
19.64 [pipenv.exceptions.InstallError]: Collecting gunicorn==20.1.0 (from -r /tmp/pipenv-vwi3aj7v-requirements/pipenv-ylvjgo33-hashed-reqs.txt (line 7))
19.64 [pipenv.exceptions.InstallError]:   Downloading gunicorn-20.1.0-py3-none-any.whl (79 kB)
19.64 [pipenv.exceptions.InstallError]:      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 79.5/79.5 kB 3.8 MB/s eta 0:00:00
19.64 [pipenv.exceptions.InstallError]: Collecting itsdangerous==2.1.2 (from -r /tmp/pipenv-vwi3aj7v-requirements/pipenv-ylvjgo33-hashed-reqs.txt (line 8))
19.64 [pipenv.exceptions.InstallError]:   Downloading itsdangerous-2.1.2-py3-none-any.whl (15 kB)
19.64 [pipenv.exceptions.InstallError]: Collecting jinja2==3.1.2 (from -r /tmp/pipenv-vwi3aj7v-requirements/pipenv-ylvjgo33-hashed-reqs.txt (line 9))
19.64 [pipenv.exceptions.InstallError]:   Downloading Jinja2-3.1.2-py3-none-any.whl (133 kB)
19.64 [pipenv.exceptions.InstallError]:      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 133.1/133.1 kB 4.4 MB/s eta 0:00:00
19.64 [pipenv.exceptions.InstallError]: Collecting mako==1.2.3 (from -r /tmp/pipenv-vwi3aj7v-requirements/pipenv-ylvjgo33-hashed-reqs.txt (line 10))
19.64 [pipenv.exceptions.InstallError]:   Downloading Mako-1.2.3-py3-none-any.whl (78 kB)
19.64 [pipenv.exceptions.InstallError]:      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 78.7/78.7 kB 3.0 MB/s eta 0:00:00
19.64 [pipenv.exceptions.InstallError]: Collecting markupsafe==2.1.1 (from -r /tmp/pipenv-vwi3aj7v-requirements/pipenv-ylvjgo33-hashed-reqs.txt (line 11))
19.64 [pipenv.exceptions.InstallError]:   Downloading MarkupSafe-2.1.1-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (25 kB)
19.64 [pipenv.exceptions.InstallError]: Collecting marshmallow==3.18.0 (from -r /tmp/pipenv-vwi3aj7v-requirements/pipenv-ylvjgo33-hashed-reqs.txt (line 12))
19.64 [pipenv.exceptions.InstallError]:   Downloading marshmallow-3.18.0-py3-none-any.whl (48 kB)
19.64 [pipenv.exceptions.InstallError]:      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 48.8/48.8 kB 1.6 MB/s eta 0:00:00
19.64 [pipenv.exceptions.InstallError]: Collecting marshmallow-sqlalchemy==0.28.1 (from -r /tmp/pipenv-vwi3aj7v-requirements/pipenv-ylvjgo33-hashed-reqs.txt (line 13))
19.64 [pipenv.exceptions.InstallError]:   Downloading marshmallow_sqlalchemy-0.28.1-py2.py3-none-any.whl (15 kB)
19.64 [pipenv.exceptions.InstallError]: Collecting mysql-connector-python==8.0.31 (from -r /tmp/pipenv-vwi3aj7v-requirements/pipenv-ylvjgo33-hashed-reqs.txt (line 14))
19.64 [pipenv.exceptions.InstallError]:   Downloading mysql_connector_python-8.0.31-cp310-cp310-manylinux1_x86_64.whl (23.5 MB)
19.64 [pipenv.exceptions.InstallError]:      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 23.5/23.5 MB 9.8 MB/s eta 0:00:00
19.64 [pipenv.exceptions.InstallError]: Collecting mysqlclient==2.1.1 (from -r /tmp/pipenv-vwi3aj7v-requirements/pipenv-ylvjgo33-hashed-reqs.txt (line 15))
19.64 [pipenv.exceptions.InstallError]:   Downloading mysqlclient-2.1.1.tar.gz (88 kB)
19.64 [pipenv.exceptions.InstallError]:      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 88.1/88.1 kB 1.9 MB/s eta 0:00:00
19.64 [pipenv.exceptions.InstallError]:   Preparing metadata (setup.py): started
19.64 [pipenv.exceptions.InstallError]:   Preparing metadata (setup.py): finished with status 'done'
19.64 [pipenv.exceptions.InstallError]: Collecting packaging==21.3 (from -r /tmp/pipenv-vwi3aj7v-requirements/pipenv-ylvjgo33-hashed-reqs.txt (line 16))
19.64 [pipenv.exceptions.InstallError]:   Downloading packaging-21.3-py3-none-any.whl (40 kB)
19.64 [pipenv.exceptions.InstallError]:      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 40.8/40.8 kB 1.0 MB/s eta 0:00:00
19.64 [pipenv.exceptions.InstallError]: Collecting protobuf==3.20.1 (from -r /tmp/pipenv-vwi3aj7v-requirements/pipenv-ylvjgo33-hashed-reqs.txt (line 17))
19.64 [pipenv.exceptions.InstallError]:   Downloading protobuf-3.20.1-cp310-cp310-manylinux_2_12_x86_64.manylinux2010_x86_64.whl (1.1 MB)
19.64 [pipenv.exceptions.InstallError]:      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1.1/1.1 MB 14.2 MB/s eta 0:00:00
19.64 [pipenv.exceptions.InstallError]: Collecting pyparsing==3.0.9 (from -r /tmp/pipenv-vwi3aj7v-requirements/pipenv-ylvjgo33-hashed-reqs.txt (line 18))
19.64 [pipenv.exceptions.InstallError]:   Downloading pyparsing-3.0.9-py3-none-any.whl (98 kB)
19.64 [pipenv.exceptions.InstallError]:      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 98.3/98.3 kB 3.0 MB/s eta 0:00:00
19.64 [pipenv.exceptions.InstallError]: Collecting python-dotenv==0.21.0 (from -r /tmp/pipenv-vwi3aj7v-requirements/pipenv-ylvjgo33-hashed-reqs.txt (line 19))
19.64 [pipenv.exceptions.InstallError]:   Downloading python_dotenv-0.21.0-py3-none-any.whl (18 kB)
19.64 [pipenv.exceptions.InstallError]: Collecting setuptools==65.5.1 (from -r /tmp/pipenv-vwi3aj7v-requirements/pipenv-ylvjgo33-hashed-reqs.txt (line 20))
19.64 [pipenv.exceptions.InstallError]:   Downloading setuptools-65.5.1-py3-none-any.whl (1.2 MB)
19.64 [pipenv.exceptions.InstallError]:      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1.2/1.2 MB 19.4 MB/s eta 0:00:00
19.64 [pipenv.exceptions.InstallError]: Collecting sqlalchemy==1.4.43 (from -r /tmp/pipenv-vwi3aj7v-requirements/pipenv-ylvjgo33-hashed-reqs.txt (line 21))
19.64 [pipenv.exceptions.InstallError]:   Downloading SQLAlchemy-1.4.43-cp310-cp310-manylinux_2_5_x86_64.manylinux1_x86_64.manylinux_2_17_x86_64.manylinux2014_x86_64.whl (1.6 MB)
19.64 [pipenv.exceptions.InstallError]:      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1.6/1.6 MB 22.7 MB/s eta 0:00:00
19.64 [pipenv.exceptions.InstallError]: Collecting werkzeug==2.2.2 (from -r /tmp/pipenv-vwi3aj7v-requirements/pipenv-ylvjgo33-hashed-reqs.txt (line 22))
19.64 [pipenv.exceptions.InstallError]:   Downloading Werkzeug-2.2.2-py3-none-any.whl (232 kB)
19.64 [pipenv.exceptions.InstallError]:      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 232.7/232.7 kB 6.7 MB/s eta 0:00:00
19.64 [pipenv.exceptions.InstallError]: Building wheels for collected packages: mysqlclient
19.64 [pipenv.exceptions.InstallError]:   Building wheel for mysqlclient (setup.py): started
19.64 [pipenv.exceptions.InstallError]:   Building wheel for mysqlclient (setup.py): finished with status 'error'
19.64 [pipenv.exceptions.InstallError]:   Running setup.py clean for mysqlclient
19.64 [pipenv.exceptions.InstallError]: Failed to build mysqlclient
19.64 [pipenv.exceptions.InstallError]: error: subprocess-exited-with-error
19.64 [pipenv.exceptions.InstallError]:
19.64 [pipenv.exceptions.InstallError]:   × python setup.py bdist_wheel did not run successfully.
19.64 [pipenv.exceptions.InstallError]:   │ exit code: 1
19.64 [pipenv.exceptions.InstallError]:   ╰─> [42 lines of output]
19.64 [pipenv.exceptions.InstallError]:       mysql_config --version
19.64 [pipenv.exceptions.InstallError]:       ['10.11.6']
19.64 [pipenv.exceptions.InstallError]:       mysql_config --libs
19.64 [pipenv.exceptions.InstallError]:       ['-L/usr/lib/x86_64-linux-gnu/', '-lmariadb']
19.64 [pipenv.exceptions.InstallError]:       mysql_config --cflags
19.64 [pipenv.exceptions.InstallError]:       ['-I/usr/include/mariadb', '-I/usr/include/mariadb/mysql']
19.64 [pipenv.exceptions.InstallError]:       ext_options:
19.64 [pipenv.exceptions.InstallError]:         library_dirs: ['/usr/lib/x86_64-linux-gnu/']
19.64 [pipenv.exceptions.InstallError]:         libraries: ['mariadb']
19.64 [pipenv.exceptions.InstallError]:         extra_compile_args: ['-std=c99']
19.64 [pipenv.exceptions.InstallError]:         extra_link_args: []
19.64 [pipenv.exceptions.InstallError]:         include_dirs: ['/usr/include/mariadb', '/usr/include/mariadb/mysql']
19.64 [pipenv.exceptions.InstallError]:         extra_objects: []
19.64 [pipenv.exceptions.InstallError]:         define_macros: [('version_info', "(2,1,1,'final',0)"), ('__version__', '2.1.1')]
19.64 [pipenv.exceptions.InstallError]:       running bdist_wheel
19.64 [pipenv.exceptions.InstallError]:       running build
19.64 [pipenv.exceptions.InstallError]:       running build_py
19.64 [pipenv.exceptions.InstallError]:       creating build
19.64 [pipenv.exceptions.InstallError]:       creating build/lib.linux-x86_64-cpython-310
19.64 [pipenv.exceptions.InstallError]:       creating build/lib.linux-x86_64-cpython-310/MySQLdb
19.64 [pipenv.exceptions.InstallError]:       copying MySQLdb/__init__.py -> build/lib.linux-x86_64-cpython-310/MySQLdb
19.64 [pipenv.exceptions.InstallError]:       copying MySQLdb/_exceptions.py -> build/lib.linux-x86_64-cpython-310/MySQLdb
19.64 [pipenv.exceptions.InstallError]:       copying MySQLdb/connections.py -> build/lib.linux-x86_64-cpython-310/MySQLdb
19.64 [pipenv.exceptions.InstallError]:       copying MySQLdb/converters.py -> build/lib.linux-x86_64-cpython-310/MySQLdb
19.64 [pipenv.exceptions.InstallError]:       copying MySQLdb/cursors.py -> build/lib.linux-x86_64-cpython-310/MySQLdb
19.64 [pipenv.exceptions.InstallError]:       copying MySQLdb/release.py -> build/lib.linux-x86_64-cpython-310/MySQLdb
19.64 [pipenv.exceptions.InstallError]:       copying MySQLdb/times.py -> build/lib.linux-x86_64-cpython-310/MySQLdb
19.64 [pipenv.exceptions.InstallError]:       creating build/lib.linux-x86_64-cpython-310/MySQLdb/constants
19.64 [pipenv.exceptions.InstallError]:       copying MySQLdb/constants/__init__.py -> build/lib.linux-x86_64-cpython-310/MySQLdb/constants
19.64 [pipenv.exceptions.InstallError]:       copying MySQLdb/constants/CLIENT.py -> build/lib.linux-x86_64-cpython-310/MySQLdb/constants
19.64 [pipenv.exceptions.InstallError]:       copying MySQLdb/constants/CR.py -> build/lib.linux-x86_64-cpython-310/MySQLdb/constants
19.64 [pipenv.exceptions.InstallError]:       copying MySQLdb/constants/ER.py -> build/lib.linux-x86_64-cpython-310/MySQLdb/constants
19.64 [pipenv.exceptions.InstallError]:       copying MySQLdb/constants/FIELD_TYPE.py -> build/lib.linux-x86_64-cpython-310/MySQLdb/constants
19.64 [pipenv.exceptions.InstallError]:       copying MySQLdb/constants/FLAG.py -> build/lib.linux-x86_64-cpython-310/MySQLdb/constants
19.64 [pipenv.exceptions.InstallError]:       warning: build_py: byte-compiling is disabled, skipping.
19.64 [pipenv.exceptions.InstallError]:
19.64 [pipenv.exceptions.InstallError]:       running build_ext
19.64 [pipenv.exceptions.InstallError]:       building 'MySQLdb._mysql' extension
19.64 [pipenv.exceptions.InstallError]:       creating build/temp.linux-x86_64-cpython-310
19.64 [pipenv.exceptions.InstallError]:       creating build/temp.linux-x86_64-cpython-310/MySQLdb
19.64 [pipenv.exceptions.InstallError]:       gcc -Wno-unused-result -Wsign-compare -DNDEBUG -g -fwrapv -O3 -Wall -fPIC -Dversion_info=(2,1,1,'final',0) -D__version__=2.1.1 -I/usr/include/mariadb -I/usr/include/mariadb/mysql -I/App/.venv/include -I/usr/local/include/python3.10 -c MySQLdb/_mysql.c -o build/temp.linux-x86_64-cpython-310/MySQLdb/_mysql.o -std=c99
19.64 [pipenv.exceptions.InstallError]:       error: command 'gcc' failed: No such file or directory
19.64 [pipenv.exceptions.InstallError]:       [end of output]
19.64 [pipenv.exceptions.InstallError]:
19.64 [pipenv.exceptions.InstallError]:   note: This error originates from a subprocess, and is likely not a problem with pip.
19.64 [pipenv.exceptions.InstallError]:   ERROR: Failed building wheel for mysqlclient
19.64 [pipenv.exceptions.InstallError]: ERROR: Could not build wheels for mysqlclient, which is required to install pyproject.toml-based projects
19.64 ERROR: Couldn't install package: {}
19.64  Package installation failed...
19.65 /usr/local/lib/python3.10/subprocess.py:1072: ResourceWarning: subprocess 30 is still running
19.65   _warn("subprocess %s is still running" % self.pid,
19.65 ResourceWarning: Enable tracemalloc to get the object allocation traceback
19.65 sys:1: ResourceWarning: unclosed file <_io.TextIOWrapper name=4 encoding='utf-8'>
19.65 ResourceWarning: Enable tracemalloc to get the object allocation traceback
19.65 sys:1: ResourceWarning: unclosed file <_io.TextIOWrapper name=7 encoding='utf-8'>
19.65 ResourceWarning: Enable tracemalloc to get the object allocation traceback
------

 1 warning found (use docker --debug to expand):
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 45)
Dockerfile:33
--------------------
  31 |     # Instalamos las dependencias especificadas en Pipfile usando Pipenv
  32 |     # Esto configura el entorno virtual con todas las bibliotecas necesarias
  33 | >>> RUN pipenv install
  34 |
  35 |     # Copiamos todos los ficheros del proyecto desde el host al contenedor
--------------------
ERROR: failed to solve: process "/bin/sh -c pipenv install" did not complete successfully: exit code: 1
```

---

### ***Solución: Modificación del Dockerfile para agregar `gcc`***

- **Para resolver este problema, debes modificar nuevamente el Dockerfile para incluir el paquete `gcc` y otras herramientas de compilación esenciales mediante el paquete `build-essential`.**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Usamos la imagen base oficial de Python 3.10-slim
# Esta imagen incluye Python y sus herramientas asociadas preinstaladas
FROM python:3.10-slim

# Actualiza la lista de paquetes disponibles
RUN apt update \
    # Instala las dependencias necesarias:
    # - default-libmysqlclient-dev: Bibliotecas y encabezados de MySQL para desarrollo.
    # - build-essential: Herramientas de compilación esenciales como gcc, make, etc.
    && apt install -y \
    default-libmysqlclient-dev \
    build-essential

# Instalamos Pipenv, una herramienta de gestión de entornos virtuales y dependencias para Python
RUN pip install pipenv

# Definimos la variable de entorno FLASK_APP para apuntar al fichero principal de la aplicación Flask
ENV FLASK_APP=./todos.app

# Configuramos Pipenv para crear el entorno virtual dentro del directorio del proyecto
ENV PIPENV_VENV_IN_PROJECT=1

# Creamos el directorio de trabajo dentro del contenedor y lo establecemos como el directorio actual
WORKDIR /App

# Copiamos los ficheros Pipfile y Pipfile.lock al directorio de trabajo del contenedor
COPY ./Pipfile* ./

# Instalamos las dependencias especificadas en Pipfile usando Pipenv
RUN pipenv install

# Copiamos el resto del proyecto al contenedor
COPY ./ ./

# Exponemos el puerto 5000 para permitir el acceso externo a la aplicación Flask
EXPOSE 5000

# Iniciamos el servidor Flask usando Pipenv para activar el entorno virtual
CMD pipenv run flask run --host 0.0.0.0
```

---

### ***Notas adicionales***

- **Paquete `build-essential`:** *Este paquete incluye `gcc` y otras herramientas de compilación esenciales, como `make`, que son necesarias para compilar extensiones de C y otras dependencias nativas.*
  
- **Paquete `default-libmysqlclient-dev`:** *Ya lo habías incluido anteriormente para proporcionar las bibliotecas necesarias para el cliente MySQL.*

### ***Construcción de la imagen con el mismo tag***

**Una vez que has hecho las modificaciones en el Dockerfile, puedes proceder a construir la imagen nuevamente utilizando el mismo tag:**

```bash
docker build -td4nitrix13/app-08:python-slim ./
```

---

## ***Construcción exitosa de la imagen***

- *Después de agregar `gcc` y otras dependencias, procedemos a construir la imagen utilizando el siguiente comando:*

```bash
docker build -td4nitrix13/app-08:python-slim ./
```

---

### ***Proceso de construcción***

```bash
[+] Building 84.7s (12/12) FINISHED                                                                                    docker:default
 => [internal] load build definition from Dockerfile                                                                             0.0s
 => => transferring dockerfile: 2.31kB                                                                                           0.0s
 => [internal] load metadata for docker.io/library/python:3.10-slim                                                              1.3s
 => [internal] load .dockerignore                                                                                                0.0s
 => => transferring context: 238B                                                                                                0.0s
 => [internal] load build context                                                                                                0.0s
 => => transferring context: 653B                                                                                                0.0s
 => CACHED [1/7] FROM docker.io/library/python:3.10-slim@sha256:bfe58c1b0f5cd32624417971c2a60d472f36835969f0d335d7d792774cc5b29  0.0s
 => [2/7] RUN apt update     && apt install -y     default-libmysqlclient-dev     build-essential                               40.2s
 => [3/7] RUN pip install pipenv                                                                                                13.0s
 => [4/7] WORKDIR /App                                                                                                           0.0s
 => [5/7] COPY ./Pipfile* ./                                                                                                     0.0s
 => [6/7] RUN pipenv install                                                                                                    24.3s
 => [7/7] COPY ./ ./                                                                                                             0.0s
 => exporting to image                                                                                                           5.8s
 => => exporting layers                                                                                                          5.8s
 => => writing image sha256:787688c7800bbd54e7772fe8b1fd55ce5ba76b72d4568e0f385ac0b33594347f                                     0.0s
 => => naming to docker.io/d4nitrix13/app-08:python-slim                                                                         0.0s
```

- **Resultado:** *El proceso de construcción fue exitoso en 84.7 segundos.*
- **Advertencia:** *Se generó una advertencia sobre el uso de argumentos JSON para `CMD`:*

```bash
1 warning found (use docker --debug to expand):
- JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 52)
```

- *Este mensaje recomienda el uso de una forma JSON para `CMD` en lugar de la forma de cadena para evitar posibles problemas con las señales del sistema operativo. Aunque es una advertencia, el contenedor sigue funcionando.*

---

## ***Ejecución del contenedor***

- **Con la imagen construida, podemos ejecutar el contenedor utilizando el siguiente comando:**

```bash
docker container run -itp5000:5000 --rm d4nitrix13/app-08:python-slim
```

---

### ***Salida del servidor Flask***

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

- *El servidor Flask está corriendo en `0.0.0.0`, lo que significa que está disponible en todas las interfaces de red del contenedor.*
- *La aplicación Flask escucha en los puertos `127.0.0.1:5000` y `172.17.0.2:5000`.*
- **Nota:** *Se advierte que este servidor es para desarrollo, por lo que no se debe usar en producción. Para producción, se recomienda un servidor WSGI como `gunicorn` o `uWSGI`.*

---

## ***Prueba del contenedor***

- **Hacemos una petición `curl` a la dirección interna del contenedor:**

```bash
curl 172.17.0.2:5000/todos
```

---

### ***Respuesta esperada***

```json
{"todos":[{"description":"Prueba","id":1,"title":"tarea 1"}]}
```

- *Esta respuesta indica que la API de la aplicación Flask está funcionando correctamente, devolviendo una lista de tareas.*

---

## ***Logs del contenedor***

**Los logs del servidor Flask dentro del contenedor son los siguientes:**

```bash
172.17.0.1 - - [09/Sep/2024 22:30:19] "GET /todos HTTP/1.1" 200 -
```

- **Aquí se puede observar que el contenedor recibió una petición `GET` en la ruta `/todos`, y la respuesta fue exitosa con un código de estado `200`.**

- **Conclusión**

- *La imagen Docker se construyó correctamente después de instalar las dependencias necesarias, como `gcc`. El contenedor se ejecuta de manera adecuada, la aplicación Flask está disponible y devuelve las respuestas correctas a las peticiones HTTP. Solo queda considerar la advertencia sobre el uso de un servidor de producción para despliegues reales y la recomendación de usar argumentos JSON en el comando `CMD` del Dockerfile.*

---

## ***Modificación del Dockerfile para Utilizar Múltiples Etapas***

- *Primero, hemos copiado el `Dockerfile` a un nuevo fichero `Dockerfile.manual` para mantener una referencia de la configuración original. Luego, modificamos el fichero `Dockerfile` principal para utilizar la técnica de "multi-stage builds". A continuación, explicamos el proceso y la razón detrás de la elección de múltiples etapas.*

---

### ***Dockerfile Original: Dividido en 2 Etapas***

**Dockerfile:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# ------------------------------------Inicio Stage 0 (Build)----------------------------------

# Usamos la imagen base oficial de Python 3.10-slim, que es una versión ligera.
# Esta imagen incluye Python y sus herramientas asociadas preinstaladas, minimizando el tamaño del contenedor.
FROM python:3.10-slim AS builder

# Actualizamos la lista de paquetes del sistema para asegurarnos de que tenemos acceso a las últimas versiones.
RUN apt update \
    # Instalamos las siguientes dependencias de compilación:
    # - default-libmysqlclient-dev: Bibliotecas y ficheros de encabezado necesarios para compilar aplicaciones que utilizan MySQL.
    # - build-essential: Incluye herramientas fundamentales de compilación como gcc, make, y bibliotecas estándar de desarrollo.
    && apt install -y \
    default-libmysqlclient-dev \
    build-essential

# Instalamos Pipenv, una herramienta popular para gestionar entornos virtuales y dependencias de Python.
RUN pip install pipenv

# Establecemos la variable de entorno FLASK_APP para que Flask sepa dónde encontrar la aplicación principal.
# Este fichero indicará a Flask qué aplicación ejecutar cuando el contenedor inicie.
ENV FLASK_APP=./todos.app

# Configuramos Pipenv para que el entorno virtual se cree dentro del directorio del proyecto.
# Esta configuración permite tener el entorno virtual en el mismo directorio que el código, facilitando su administración.
ENV PIPENV_VENV_IN_PROJECT=1

# Creamos el directorio de trabajo `/App` donde se colocará todo el código y ficheros de la aplicación.
# Todos los comandos a partir de este punto se ejecutarán dentro de este directorio.
WORKDIR /App

# Copiamos los ficheros `Pipfile` y `Pipfile.lock` que especifican las dependencias del proyecto.
# Estos ficheros permiten que Pipenv instale las versiones exactas de las dependencias requeridas.
COPY ./Pipfile* ./

# Instalamos todas las dependencias especificadas en el Pipfile mediante Pipenv.
# Esto creará un entorno virtual en el directorio de trabajo con todas las bibliotecas necesarias para la aplicación.
RUN pipenv install

# ------------------------------------Final Stage 0 (Build)-----------------------------------

# ------------------------------------Inicio Stage 1 (Runtime)----------------------------------

# Usamos nuevamente la imagen base ligera de Python 3.10-slim, esta vez para el entorno de ejecución.
# En este paso ya no necesitamos herramientas de compilación pesadas, optimizando el tamaño final del contenedor.
FROM python:3.10-slim

# Actualizamos nuevamente la lista de paquetes del sistema operativo dentro del contenedor de runtime.
RUN apt update \
    # Instalamos las mismas dependencias necesarias para ejecutar el código que interactúa con MySQL.
    # Esto asegura que la aplicación pueda conectarse y trabajar con bases de datos MySQL en el entorno de producción.
    && apt install -y \
    default-libmysqlclient-dev \
    build-essential

# Reinstalamos Pipenv, ya que se utilizará para manejar el entorno virtual en el contenedor final de producción.
RUN pip install pipenv

# Establecemos el directorio de trabajo en `/App` para garantizar que todos los siguientes comandos se ejecuten en este directorio.
WORKDIR /App

# Copiamos el entorno virtual completo creado en el Stage 0 desde el builder al contenedor final.
# Esto incluye todas las dependencias ya instaladas para evitar la reinstalación en esta etapa.
COPY --from=builder /App/.venv ./

# Copiamos todo el código fuente de la aplicación y otros ficheros del proyecto al contenedor.
# Esto incluye el código de Flask y otros recursos necesarios para ejecutar la aplicación.
COPY ./ ./

# Exponemos el puerto 5000, que es el puerto por defecto en el que Flask sirve la aplicación.
# Esto permitirá que la aplicación sea accesible externamente desde cualquier red.
EXPOSE 5000

# Ejecutamos el servidor Flask usando Pipenv para garantizar que el entorno virtual esté activado.
# La opción --host 0.0.0.0 asegura que la aplicación esté disponible para conexiones externas, no solo en localhost.
CMD pipenv run flask run --host 0.0.0.0
```

---

### ***Análisis de la Separación en 2 Etapas***

- **Dividir el Dockerfile en dos etapas tiene ventajas y desventajas:**

---

#### ***Ventajas***

1. **Optimización del Tamaño de la Imagen Final:** *La imagen final (`python:3.10-slim`) es mucho más ligera porque no incluye las herramientas de compilación ni los ficheros temporales utilizados solo para construir el entorno.*
2. **Entorno de Producción Limpio:** *Al separar las etapas de construcción y ejecución, garantizamos que la imagen de producción solo contenga lo necesario para ejecutar la aplicación.*

---

#### ***Desventajas***

1. **Duplicación de Código:** *Como has observado, la instalación de dependencias y la configuración del entorno se repite en ambas etapas (`builder` y `runtime`), lo que puede resultar en una mayor complejidad y en un incremento innecesario en el tiempo de construcción.*
2. **Complejidad en la Gestión:** *Manejar múltiples etapas puede ser más complejo, especialmente si las etapas no están bien optimizadas o si hay cambios frecuentes en los requisitos del entorno.*

---

### ***Comparación de Imágenes***

- *El tamaño de la imagen `d4nitrix13/app-08:python-slim` es de `720MB`, comparado con `1.21GB` para la imagen `d4nitrix13/app-08:python`. La optimización de la imagen reduce el tamaño considerablemente, lo cual es una ventaja significativa en términos de almacenamiento y velocidad de despliegue.*

---

### ***Verificación de Tamaño de Imágenes***

- **Para verificar el tamaño de las imágenes, usamos el siguiente comando:**

```bash
docker image ls -a
```

- *Esto muestra el tamaño de cada imagen en el sistema, permitiendo una comparación directa y una gestión efectiva del almacenamiento de imágenes.*

- **Conclusión:** *Dividir el Dockerfile en tres etapas ayuda a evitar la duplicación de código y mejora la eficiencia en la creación de imágenes. Aunque el uso de múltiples etapas puede añadir complejidad, el beneficio en términos de tamaño y limpieza de la imagen final justifica su implementación en la mayoría de los casos.*

```bash
docker image ls -a
REPOSITORY          TAG            IMAGE ID       CREATED          SIZE
d4nitrix13/app-08   python-slim    787688c7800b   21 minutes ago   720MB
d4nitrix13/app-08   python         46fcb0135922   24 hours ago     1.21GB
test/test           latest         5cdba1894d60   45 hours ago     16kB
d4nitrix13/gin      dev            e96a5cbd3bbd   46 hours ago     19MB
d4nitrix13/gin      multi-alpine   9d54b3314c80   47 hours ago     19MB
<none>              <none>         0fb0401c720f   47 hours ago     89.1MB
d4nitrix13/gin      multi          185a00984a0e   2 days ago       89MB
d4nitrix13/gin      stages         185a00984a0e   2 days ago       89MB
d4nitrix13/gin      golang         21ea1268364d   2 days ago       1.21GB
d4nitrix13/gin      latest         00382cb81ccc   2 days ago       753MB
alpine              latest         91ef0af61f39   3 days ago       7.8MB
d4nitrix13/rails    preconfig      68f5a326fdb5   3 days ago       1.02GB
d4nitrix13/rails    latest         f3940d656524   3 days ago       591MB
debian              latest         4fd3f4b75df3   5 days ago       117MB
python              3.10           bca130f2ff80   10 days ago      1GB
ubuntu              22.04          53a843653cbc   3 weeks ago      77.9MB
mysql               latest         a82a8f162e18   7 weeks ago      586MB
```

---

## ***Modificación del Dockerfile para Utilizar Múltiples Etapas Nuevamente***

---

### ***Dockerfile Optimizado en 3 Etapas***

**Dockerfile:**

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

---

### ***Explicación Detallada***

---

#### ***Reutilización de Imágenes***

1. **Imagen Base (`base`):**
   - *Esta etapa proporciona una imagen base con Python y las dependencias necesarias para compilar y ejecutar la aplicación. Al definir `base` como la imagen inicial en las siguientes etapas, garantizamos que todas las etapas compartan el mismo entorno base, minimizando inconsistencias y mejorando la coherencia.*

2. **Etapa de Construcción (`builder`):**
   - *Esta etapa se basa en la imagen `base`, lo que significa que ya tenemos Python y las bibliotecas esenciales instaladas. Solo necesitamos instalar las dependencias específicas del proyecto usando Pipenv.*
   - *No es necesario ejecutar `apt update` nuevamente aquí, ya que se realizó en la etapa `base`. Esto ahorra tiempo y reduce la redundancia.*

3. **Etapa de Ejecución (`runtime`):**
   - *Utiliza la imagen `base` para mantener un entorno consistente con la etapa de construcción. Solo se copian las dependencias y el código fuente necesarios para ejecutar la aplicación.*
   - *Esto asegura que el contenedor de producción sea ligero y contenga únicamente lo necesario para ejecutar la aplicación.*

---

#### ***Reutilización del Directorio de Trabajo***

- **Directorio de Trabajo (`/App`):**
  - *Definir el directorio de trabajo en la etapa `base` asegura que todas las etapas posteriores utilicen el mismo directorio para copiar ficheros y ejecutar comandos.*
  - *Esto proporciona una estructura organizada y evita problemas de ruta al copiar ficheros y ejecutar la aplicación.*

---

### ***Beneficios del Enfoque de Múltiples Etapas***

- **Optimización del Tamaño de la Imagen:** *La imagen final es significativamente más pequeña porque no incluye herramientas de compilación innecesarias ni ficheros temporales.*
- **Eficiencia en el Proceso de Construcción:** *Reduciendo el tamaño de la imagen final y evitando la reinstalación de dependencias, se mejora la eficiencia en el despliegue y el tiempo de construcción.*
- **Organización y Claridad:** *Dividir el Dockerfile en etapas claras y reutilizables facilita la gestión y mantenimiento del Dockerfile.*

---

### ***Construcción de la Imagen Docker***

**Para construir la imagen Docker, utilizamos el siguiente comando:**

```bash
docker image build --tag d4nitrix13/app-08:python-slim-multi ./
```

**Salida de la construcción:**

```plaintext
[+] Building 85.3s (12/12) FINISHED
 => [internal] load build definition from Dockerfile                                                                             0.0s
 => => transferring dockerfile: 4.09kB                                                                                           0.0s
 => [internal] load metadata for docker.io/library/python:3.10-slim                                                              1.3s
 => [internal] load .dockerignore                                                                                                0.0s
 => => transferring context: 238B                                                                                                0.0s
 => CACHED [base 1/3] FROM docker.io/library/python:3.10-slim@sha256:bfe58c1b0f5cd32624417971c2a60d472f36835969f0d335d7d792774c  0.0s
 => [internal] load build context                                                                                                0.0s
 => => transferring context: 653B                                                                                                0.0s
 => [base 2/3] RUN apt update     && apt install -y     default-libmysqlclient-dev     && pip install pipenv                    30.2s
 => [base 3/3] WORKDIR /App                                                                                                      0.0s
 => [builder 1/2] COPY ./Pipfile* ./                                                                                             0.0s
 => [builder 2/2] RUN apt install -y build-essential && pipenv install                                                          48.9s
 => [runtime 1/2] COPY --from=builder /App/.venv /App/.venv                                                                      0.8s
 => [runtime 2/2] COPY ./ ./                                                                                                     0.0s
 => exporting to image                                                                                                           3.0s
 => => exporting layers                                                                                                          3.0s
 => => writing image sha256:f6ce50c4f74634ddaa15b09e29583eb5d1a2f3c8b749a09c04aea395bf4a6ec0                                     0.0s
 => => naming to docker.io/d4nitrix13/app-08:python-slim-multi                                                                   0.0s
```

---

### ***Iniciar el Contenedor***

**Para ejecutar el contenedor y exponer el puerto 5000, usamos el siguiente comando:**

```bash
docker run -itp5000:5000 --rm d4nitrix13/app-08:python-slim-multi
```

**Salida al iniciar el contenedor:**

```bash
Loading .env environment variables...
 * Serving Flask app './todos.app'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://172.17.0.2:5000
Press CTRL+C to quit
172.17.0.1 - - [09/Sep/2024 23:34:52] "GET /todos HTTP/1.1" 200 -
```

---

### ***Prueba del Servicio***

**Para verificar que el servicio está funcionando, realizamos una solicitud `curl`:**

```bash
curl 172.17.0.2:5000/todos
```

**Respuesta esperada:**

```json
{"todos":[{"description":"Prueba","id":1,"title":"tarea 1"}]}
```

---

### ***Optimización de Imágenes***

- **A pesar de que comprimir el peso de una imagen que utiliza lenguajes interpretados puede ser desafiante, no es imposible. Los lenguajes interpretados suelen requerir más recursos en comparación con los lenguajes compilados, debido a la necesidad de incluir el intérprete y sus dependencias. Sin embargo, se pueden realizar varias optimizaciones para reducir el tamaño de la imagen.**

**Imagen optimizada:**

```bash
d4nitrix13/app-08   python-slim-multi   4b21adfa8455   2 minutes ago       399MB
```

**Listado de imágenes:**

```bash
docker images
REPOSITORY          TAG                 IMAGE ID       CREATED             SIZE
d4nitrix13/app-08   python-slim-multi   4b21adfa8455   2 minutes ago       399MB
d4nitrix13/app-08   python-slim         787688c7800b   About an hour ago   720MB
d4nitrix13/app-08   python              46fcb0135922   24 hours ago        1.21GB
test/test           latest              5cdba1894d60   46 hours ago        16kB
d4nitrix13/gin      dev                 e96a5cbd3bbd   47 hours ago        19MB
d4nitrix13/gin      multi-alpine        9d54b3314c80   2 days ago          19MB
<none>              <none>              0fb0401c720f   2 days ago          89.1MB
d4nitrix13/gin      multi               185a00984a0e   2 days ago          89MB
d4nitrix13/gin      stages              185a00984a0e   2 days ago          89MB
d4nitrix13/gin      golang              21ea1268364d   2 days ago          1.21GB
d4nitrix13/gin      latest              00382cb81ccc   2 days ago          753MB
alpine              latest              91ef0af61f39   3 days ago          7.8MB
d4nitrix13/rails    preconfig           68f5a326fdb5   3 days ago          1.02GB
d4nitrix13/rails    latest              f3940d656524   4 days ago          591MB
debian              latest              4fd3f4b75df3   5 days ago          117MB
python              3.10                bca130f2ff80   11 days ago         1GB
ubuntu              22.04               53a843653cbc   3 weeks ago         77.9MB
mysql               latest              a82a8f162e18   7 weeks ago         586MB
```

---

### ***Conclusión***

**Dockerizar aplicaciones efectivamente requiere un conocimiento sólido de redes, sistemas operativos, sistemas binarios y lenguajes de programación. Aunque los lenguajes interpretados pueden resultar en imágenes más grandes, con las estrategias correctas de optimización, como la construcción en múltiples etapas y la reducción de dependencias innecesarias, es posible minimizar el tamaño de la imagen y mejorar el rendimiento del contenedor.**
