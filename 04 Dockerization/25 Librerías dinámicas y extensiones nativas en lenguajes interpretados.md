<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->

# **Librerías Dinámicas y Extensiones Nativas en Lenguajes Interpretados**

*Las **multi-stage builds** no solo son útiles para lenguajes compilados, sino también para lenguajes interpretados. Aunque no sea tan evidente, hay elementos en lenguajes interpretados que requieren ser compilados, como librerías dinámicas o extensiones nativas.*

---

## ***Creación de Directorio***

**Primero, creamos el directorio donde vamos a trabajar:**

```bash
mkdir "./08 App Flask MySQL"
cd !$  # El comando !$ reutiliza el último argumento del comando anterior, en este caso "./08 App Flask MySQL".
```

---

## ***Descompresión de Ficheros***

**Descomprimimos el fichero ZIP que contiene nuestra aplicación:**

```bash
unzip App-Flask-Mysql.zip
```

---

## ***Listar Ficheros***

- **Para asegurarnos de que todo esté en su lugar, listamos el contenido del directorio de la siguiente forma:**

```bash
tree -C ./
```

- **El resultado debe ser algo similar a esto:**

```bash
[01;34m.[0m
├── [01;31mApp-Flask-Mysql.zip[0m
├── [01;34mmigrations[0m
│   ├── alembic.ini
│   ├── env.py
│   ├── README
│   ├── script.py.mako
│   └── [01;34mversions[0m
│       └── 68d55b0b30e6_initial_migration.py
├── Pipfile
├── Pipfile.lock
├── README.md
└── [01;34mtodos[0m
    ├── app.py
    ├── config.py
    ├── database.py
    ├── __init__.py
    └── models.py

4 directorios, 14 ficheros.
```

---

### ***Eliminamos el directorio de Git ya que no es necesario para la construcción de la imagen:***

```bash
rm -rf ./.git
```

---

## ***Creación de Contenedor de Prueba***

**Creamos un contenedor de prueba en el directorio actual, y sobreescribimos el comando predeterminado para que se inicie con un *shell* de Bash en lugar del *shell* de Python. Este paso es útil para poder interactuar directamente con el entorno dentro del contenedor:**

```bash
docker container run --interactive --tty --workdir /App --volume "$(pwd)":/App --name practicas-app-08 python:3.10 bash
```

- **`--interactive` (`-i`):** *Mantiene la STDIN abierta para poder interactuar con el contenedor.*
- **`--tty` (`-t`):** *Asigna un pseudo-TTY (terminal) que permite la interacción con la consola.*
- **`--workdir`:** *Define el directorio de trabajo dentro del contenedor.*
- **`--volume`:** *Monta el directorio actual (`$(pwd)`) dentro del contenedor, permitiendo que los cambios en tu host se reflejen en el contenedor.*
- **`--name`:** *Asigna un nombre al contenedor (`practicas-app-08`).*
- **`python:3.10`:** *Utiliza la imagen base de Python 3.10.*
- **`bash`:** *El comando que se ejecuta al iniciar el contenedor (en este caso, la shell Bash).*

---

## ***Uso de Imágenes Base y Dependencias Dinámicas***

- **Partimos de la imagen base de Python `3.10` porque incluye muchas librerías y dependencias dinámicas que facilitan el desarrollo de aplicaciones en general, como es el caso de aquellas que utilizan el cliente de MySQL. Sin embargo, cuando intentamos reducir el tamaño de la imagen usando `python:3.10-slim`, podemos encontrar ciertos problemas relacionados con las dependencias, que resolveremos más adelante.**

---

## ***Ejecución del Contenedor con Imagen Python 3.10***

**Para ejecutar el contenedor utilizando la imagen `python:3.10`, corremos el siguiente comando:**

```bash
docker container run --interactive --tty --workdir /App --volume "$(pwd)":/App --name practicas-app-08 python:3.10 bash
```

- **Durante la ejecución, si la imagen no está disponible localmente, Docker la descargará. El proceso de descarga muestra mensajes similares a los siguientes:**

```bash
Unable to find image 'python:3.10' locally
3.10:** *Pulling from library/python*
8cd46d290033:** *Already exists*
2e6afa3f266c:** *Already exists*
2e66a70da0be:** *Already exists*
1c8ff076d818:** *Pull complete*
35c32d99ea0a:** *Pull complete*
a096358acc3d:** *Pull complete*
62fcc761cda6:** *Pull complete*
8cfecd7fda2f:** *Pull complete*
Digest:** *sha256:9c0e621579faf384d982986f2e0ba86bf09619076842cd0fbd2f24a3bf09f0bc*
Status:** *Downloaded newer image for python:3.10*
```

- **Una vez finalizado, el contenedor estará listo, y te encontrarás en el entorno del contenedor con un shell de Bash disponible:**

```bash
root@911c7012b5aa:/App#
```

---

## ***Instalación de Dependencias con `pipenv`***

- **Este proyecto utiliza `Pipfile` para la gestión de dependencias, lo que implica el uso de `pipenv`. Si no tienes instalado `pipenv` en tu contenedor, lo puedes instalar de la siguiente forma:**

```bash
pip install pipenv
```

---

### ***¿Por qué usar `pipenv`?***

- ***Pipenv** es una herramienta que combina la gestión de dependencias y la creación de entornos virtuales, todo en uno.*
- *Usa un fichero `Pipfile` para definir las dependencias y un fichero `Pipfile.lock` para asegurar que las versiones de las dependencias sean reproducibles.*

**Una vez instalado, puedes instalar las dependencias del proyecto que están listadas en el `Pipfile` con:**

```bash
pipenv install
```

```bash
pip install pipenv
Collecting pipenv
  Downloading pipenv-2024.0.1-py3-none-any.whl (3.2 MB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 3.2/3.2 MB 7.0 MB/s eta 0:00:00
Collecting certifi
  Downloading certifi-2024.8.30-py3-none-any.whl (167 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 167.3/167.3 kB 11.5 MB/s eta 0:00:00
Collecting setuptools>=67
  Downloading setuptools-74.1.2-py3-none-any.whl (1.3 MB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1.3/1.3 MB 9.8 MB/s eta 0:00:00
Collecting virtualenv>=20.24.2
  Downloading virtualenv-20.26.4-py3-none-any.whl (6.0 MB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 6.0/6.0 MB 13.6 MB/s eta 0:00:00
Collecting platformdirs<5,>=3.9.1
  Downloading platformdirs-4.3.2-py3-none-any.whl (18 kB)
Collecting filelock<4,>=3.12.2
  Downloading filelock-3.16.0-py3-none-any.whl (16 kB)
Collecting distlib<1,>=0.3.7
  Downloading distlib-0.3.8-py2.py3-none-any.whl (468 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 468.9/468.9 kB 6.4 MB/s eta 0:00:00
Installing collected packages:** *distlib, setuptools, platformdirs, filelock, certifi, virtualenv, pipenv*
  Attempting uninstall:** *setuptools*
    Found existing installation:** *setuptools 65.5.1*
    Uninstalling setuptools-65.5.1:
      Successfully uninstalled setuptools-65.5.1
Successfully installed certifi-2024.8.30 distlib-0.3.8 filelock-3.16.0 pipenv-2024.0.1 platformdirs-4.3.2 setuptools-74.1.2 virtualenv-20.26.4
WARNING:** *Running pip as the 'root' user can result in broken permissions and conflicting behaviour with the system package manager. It is recommended to use a virtual environment instead:** https://pip.pypa.io/warnings/venv*

[notice] A new release of pip is available:** *23.0.1 -> 24.2*
[notice] To update, run:** *pip install --upgrade pip*
```

- **Esto instalará todas las dependencias necesarias para que el proyecto funcione correctamente dentro del contenedor.**

---

## ***Instalación de Dependencias en el Directorio Actual***

- **Para asegurarnos de que las dependencias de Python se instalen en el directorio del proyecto en lugar de un entorno global, utilizamos la variable de entorno `PIPENV_VENV_IN_PROJECT`. Esto creará el entorno virtual directamente dentro de nuestro directorio de trabajo, lo cual es útil cuando queremos mantener todas las dependencias y el entorno de desarrollo organizados dentro del proyecto.**

*Primero, exportamos la variable de entorno y luego instalamos las dependencias:*

```bash
export PIPENV_VENV_IN_PROJECT=1
pipenv install
```

```bash
pipenv install
Loading .env environment variables...
Creating a virtualenv for this project...
Pipfile:** */App/Pipfile*
Using /usr/local/bin/python (3.10.14) to create virtualenv...
⠏ Creating virtual environment...created virtual environment CPython3.10.14.final.0-64 in 1262ms
  creator CPython3Posix(dest=/App/.venv, clear=False, no_vcs_ignore=False, global=False)
  seeder FromAppData(download=False, pip=bundle, setuptools=bundle, wheel=bundle, via=copy, app_data_dir=/root/.local/share/virtualenv)
    added seed packages:** *pip==24.2, setuptools==74.1.2, wheel==0.44.0*
  activators BashActivator,CShellActivator,FishActivator,NushellActivator,PowerShellActivator,PythonActivator

✔ Successfully created virtual environment!
Virtualenv location:** */App/.venv*
To activate this project's virtualenv, run pipenv shell.
Alternatively, run a command inside the virtualenv with pipenv run.
To activate this project's virtualenv, run pipenv shell.
Alternatively, run a command inside the virtualenv with pipenv run.
Installing dependencies from Pipfile.lock (051d81)...
```

---

### ***¿Qué hace este comando?***

- **`export PIPENV_VENV_IN_PROJECT=1`:** *Define que el entorno virtual que crea `pipenv` se guarde dentro del directorio actual del proyecto. Esto es útil para mantener el entorno virtual junto con el código fuente, lo que facilita su traslado o versionado.*
- **`pipenv install`:** *Instala las dependencias listadas en el `Pipfile`. Si no hay un `Pipfile.lock`, `pipenv` lo genera en función de las dependencias declaradas, y asegura que las versiones de las dependencias sean consistentes en cada instalación.*

---

### ***Estructura después de la instalación***

- **Al ejecutar este comando, `pipenv` creará un directorio `.venv` dentro del proyecto, donde almacenará el entorno virtual. La estructura de ficheros será algo similar a esto:**

```bash
.
├── .venv/                  # Directorio donde se aloja el entorno virtual
├── Pipfile                 # Fichero de configuración de dependencias
├── Pipfile.lock            # Fichero que bloquea las versiones de dependencias
├── migrations/             # Migraciones de la base de datos
├── todos/                  # Código fuente de la aplicación
└── README.md
```

---

### ***¿Por qué usar `PIPENV_VENV_IN_PROJECT`?***

- **Portabilidad:** *Al tener el entorno virtual dentro del proyecto, es más fácil compartir o mover el proyecto completo, ya que las dependencias están contenidas en el mismo lugar.*
- **Aislamiento:** *Permite aislar las dependencias de cada proyecto, evitando conflictos con otras instalaciones de Python en el sistema.*

---

## ***Funcionamiento del Cliente de MySQL en Python***

- *Cuando trabajamos con MySQL en aplicaciones Python, es importante entender cómo se integran las librerías dinámicas y las extensiones nativas. El cliente de MySQL incluye una librería hecha en C que se enlaza dinámicamente, y también existe una extensión nativa de Python escrita en C que facilita la interacción entre Python y MySQL. Esto se debe a que Python está desarrollado en C, lo que permite la creación de extensiones nativas como el cliente de MySQL para Python.*

### Compilación de la Extensión Nativa

- **Durante la instalación de dependencias con `pipenv install`, algunas librerías, como la de MySQL, deben ser compiladas. Si estás utilizando una imagen completa como `python:3.10`, esta imagen incluye las librerías dinámicas necesarias para MySQL, lo que facilita el proceso de compilación sin errores. Sin embargo, si estas librerías no estuvieran presentes, podrías encontrar errores durante la instalación de las dependencias, debido a la falta de componentes para compilar correctamente la extensión nativa de MySQL en Python.**

### ***Problemas al Usar Imágenes Ligeras***

- **Si intentas utilizar una imagen más ligera, como `python:3.10-slim`, podrías enfrentar problemas debido a la falta de librerías necesarias para la compilación. Esto es algo que abordaremos en los pasos posteriores para optimizar el tamaño de la imagen sin comprometer el funcionamiento.**

## ***Iniciando la Aplicación con una Base de Datos MySQL***

- **Para iniciar la aplicación, necesitamos una instancia de MySQL, pero instalar MySQL directamente dentro del contenedor de Python (que está basado en Debian) no es recomendable. Configurar MySQL en el mismo contenedor implicaría:**

- *Configurar el usuario `root` y la contraseña.*
- *Ejecutar el daemon de MySQL.*
- *Realizar diversas configuraciones que aumentan la complejidad.*

---

### ***Verificación del Sistema Operativo del Contenedor***

- **El siguiente comando te permite verificar el sistema operativo del contenedor (en este caso, es Debian):**

```bash
cat /etc/os-release
```

**El resultado debería ser algo similar a:**

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

### ***Crear un Contenedor de MySQL***

**En lugar de instalar MySQL dentro del contenedor actual, vamos a crear un contenedor separado que servirá como base de datos MySQL. Los detalles de conexión a la base de datos estarán definidos en el fichero `.env` de la aplicación. Este fichero `.env` contiene variables de entorno esenciales como las credenciales y el puerto de MySQL:**

```bash
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=app
DB_HOST=127.0.0.1
DB_PORT=3306
```

---

### ***Creación del Contenedor MySQL***

- **Para crear el contenedor de MySQL, usaremos la opción `-e` o `--env` que permite pasar variables de entorno, como la contraseña del usuario root, definida en el fichero `.env`. Aquí tienes tres formas de crear el contenedor de MySQL:**

---

#### ***Primera Forma***

```bash
docker run -ite MYSQL_ROOT_PASSWORD=root --name db-app-08 mysql
```

---

#### ***Segunda Forma***

```bash
docker run -ite MYSQL_ROOT_PASSWORD=root --name db-app-08 mysql
```

---

#### ***Tercera Forma***

```bash
docker run -it --env MYSQL_ROOT_PASSWORD=root --name db-app-08 mysql
```

---

### ***Explicación de los Comandos***

- **`docker run`:** *Crea y ejecuta un contenedor.*
- **`-it`:** *Ejecuta el contenedor en modo interactivo con un terminal adjunto.*
- **`-e` o `--env`:** *Establece variables de entorno dentro del contenedor, en este caso `MYSQL_ROOT_PASSWORD=root`.*
- **`--name db-app-08`:** *Asigna el nombre `db-app-08` al contenedor.*
- **`mysql`:** *Utiliza la imagen oficial de MySQL.*

**Estas configuraciones permiten iniciar un contenedor MySQL listo para ser utilizado por la aplicación Flask que estamos desarrollando.**

```bash
docker run -iteMYSQL_ROOT_PASSWORD=root --name db-app-08 mysql
Unable to find image 'mysql:latest' locally
latest:** *Pulling from library/mysql*
6e839ac3722d:** *Pull complete*
ad912193ad5f:** *Pull complete*
25d13d87fd8d:** *Pull complete*
004d383c75ef:** *Pull complete*
6d9bbc82a0b8:** *Pull complete*
81fec07ea550:** *Pull complete*
83357cb2d3a5:** *Pull complete*
8ffe968b82c1:** *Pull complete*
30dfd9a7ed57:** *Pull complete*
35844ae33cbe:** *Pull complete*
Digest:** *sha256:86cdfe832c81e39a89cfb63c3fde1683c41cc00ef91e67653c9c1df0ba80f454*
Status:** *Downloaded newer image for mysql:latest*
2024-09-08 21:45:48+00:00 [Note] [Entrypoint]:** *Entrypoint script for MySQL Server 9.0.1-1.el9 started.*
2024-09-08 21:45:48+00:00 [Note] [Entrypoint]:** *Switching to dedicated user 'mysql'*
2024-09-08 21:45:48+00:00 [Note] [Entrypoint]:** *Entrypoint script for MySQL Server 9.0.1-1.el9 started.*
2024-09-08 21:45:49+00:00 [Note] [Entrypoint]:** *Initializing database files*
2024-09-08T21:45:49.186116Z 0 [System] [MY-015017] [Server] MySQL Server Initialization - start.
2024-09-08T21:45:49.188757Z 0 [System] [MY-013169] [Server] /usr/sbin/mysqld (mysqld 9.0.1) initializing of server in progress as process 80
2024-09-08T21:45:49.203739Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2024-09-08T21:45:49.774719Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2024-09-08T21:45:52.164184Z 6 [Warning] [MY-010453] [Server] root@localhost is created with an empty password ! Please consider switching off the --initialize-insecure option.
2024-09-08T21:45:54.720283Z 0 [System] [MY-015018] [Server] MySQL Server Initialization - end.
2024-09-08 21:45:54+00:00 [Note] [Entrypoint]:** *Database files initialized*
2024-09-08 21:45:54+00:00 [Note] [Entrypoint]:** *Starting temporary server*
mysqld will log errors to /var/lib/mysql/93bfc94b79d6.err
mysqld is running as pid 123
2024-09-08 21:45:56+00:00 [Note] [Entrypoint]:** *Temporary server started.*
'/var/lib/mysql/mysql.sock' -> '/var/run/mysqld/mysqld.sock'
Warning:** *Unable to load '/usr/share/zoneinfo/iso3166.tab' as time zone. Skipping it.*
Warning:** *Unable to load '/usr/share/zoneinfo/leap-seconds.list' as time zone. Skipping it.*
Warning:** *Unable to load '/usr/share/zoneinfo/leapseconds' as time zone. Skipping it.*
Warning:** *Unable to load '/usr/share/zoneinfo/tzdata.zi' as time zone. Skipping it.*
Warning:** *Unable to load '/usr/share/zoneinfo/zone.tab' as time zone. Skipping it.*
Warning:** *Unable to load '/usr/share/zoneinfo/zone1970.tab' as time zone. Skipping it.*

2024-09-08 21:45:59+00:00 [Note] [Entrypoint]:** *Stopping temporary server*
2024-09-08 21:46:01+00:00 [Note] [Entrypoint]:** *Temporary server stopped*

2024-09-08 21:46:01+00:00 [Note] [Entrypoint]:** *MySQL init process done. Ready for start up.*

2024-09-08T21:46:01.369144Z 0 [System] [MY-015015] [Server] MySQL Server - start.
2024-09-08T21:46:01.712105Z 0 [System] [MY-010116] [Server] /usr/sbin/mysqld (mysqld 9.0.1) starting as process 1
2024-09-08T21:46:01.727891Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2024-09-08T21:46:02.192696Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2024-09-08T21:46:02.578047Z 0 [Warning] [MY-010068] [Server] CA certificate ca.pem is self signed.
2024-09-08T21:46:02.578122Z 0 [System] [MY-013602] [Server] Channel mysql_main configured to support TLS. Encrypted connections are now supported for this channel.
2024-09-08T21:46:02.588209Z 0 [Warning] [MY-011810] [Server] Insecure configuration for --pid-file:** *Location '/var/run/mysqld' in the path is accessible to all OS users. Consider choosing a different directory.*
2024-09-08T21:46:02.632939Z 0 [System] [MY-011323] [Server] X Plugin ready for connections. Bind-address:** *'::' port:** 33060, socket:** /var/run/mysqld/mysqlx.sock*
2024-09-08T21:46:02.633437Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld:** *ready for connections. Version:** '9.0.1'  socket:** '/var/run/mysqld/mysqld.sock'  port:** 3306  MySQL Community Server - GPL.*
```

---

## ***Verificación del Estado de la Base de Datos MySQL***

- *Cuando el mensaje `ready for connections. Version: '9.0.1'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL` aparece en los logs del contenedor, significa que MySQL está listo para aceptar conexiones. Esto indica que la base de datos está completamente configurada y operativa.*

- *Este paso nos lleva a la siguiente fase, donde es esencial entender cómo los contenedores de una misma aplicación, que tienen propósitos distintos (como una aplicación y su base de datos), pueden comunicarse entre sí utilizando **Docker Compose**.*

---

### ***Iniciar Sesión en MySQL desde el Contenedor***

- **Para conectarnos a MySQL dentro del contenedor, utilizamos el comando `docker exec`, que nos permite ejecutar comandos en un contenedor en ejecución. En este caso, iniciamos sesión en MySQL con el usuario `root` y la contraseña `root`:**

```bash
docker exec -it db-app-08 mysql -uroot -proot
```

- **Esto te llevará al monitor de MySQL, y verás un mensaje como este:**

```bash
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 9.0.1 MySQL Community Server - GPL

Oracle is a registered trademark of Oracle Corporation and/or its affiliates. Other names may be trademarks of their respective owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
mysql>
```

- **Este aviso nos recuerda que utilizar contraseñas en la línea de comandos puede ser inseguro, pero en un entorno de desarrollo suele ser aceptable.**

---

### ***Crear la Base de Datos `app`***

- **Conectados a MySQL, procedemos a crear la base de datos necesaria para nuestra aplicación. Usamos los siguientes comandos para crear la base de datos `app`, seleccionarla, y verificar que no tiene tablas inicialmente:**

```bash
mysql> create database app;
Query OK, 1 row affected (0.01 sec)

mysql> use app;
Database changed

mysql> show tables;
Empty set (0.01 sec)
```

- *Con esto, tenemos la base de datos `app` lista para ser utilizada por la aplicación.*

---

### ***Obteniendo la Dirección IP del Contenedor de MySQL***

- *Para que la aplicación pueda conectarse a la base de datos MySQL, necesitamos la dirección IPv4 del contenedor que ejecuta MySQL. Como recordamos, el contenedor de Python también está corriendo, por lo que necesitaremos la dirección IP de MySQL para que la aplicación pueda comunicarse con la base de datos.*

**Podemos obtener la dirección IP del contenedor `db-app-08` con el siguiente comando:**

```bash
docker inspect --format "{{.NetworkSettings.IPAddress}}" db-app-08
```

**Esto devolverá algo similar a:**

```bash
172.17.0.3
```

---

## ***Configuración del Entorno y Ejecución de la Aplicación Flask***

---

### ***Modificación del Fichero `.env`***

- **Para que la aplicación Flask pueda conectarse al contenedor de MySQL, debemos actualizar el fichero `.env` con la dirección IP del contenedor de MySQL:**

```bash
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=app
DB_HOST=172.17.0.3
DB_PORT=3306
```

- **En este caso, `DB_HOST` se establece en `172.17.0.3`, que es la dirección IP del contenedor de MySQL obtenida previamente.**

---

### ***Estructura del Proyecto en Python***

- **En aplicaciones Python, es común organizar el código fuente en un directorio con el nombre de la aplicación en lugar de usar un directorio genérico como `src`. Esto ayuda a mantener una estructura más clara y específica.**

---

### ***Realización de Migraciones con Flask***

- **Para aplicar las migraciones a la base de datos, configuramos la variable de entorno `FLASK_APP` y luego ejecutamos la actualización de la base de datos con `pipenv`:**

```bash
export FLASK_APP=todos/app.py
pipenv run flask db upgrade
```

**Salida esperada:**

```bash
run flask db upgrade
Loading .env environment variables...
INFO  [alembic.runtime.migration] Context impl MySQLImpl.
INFO  [alembic.runtime.migration] Will assume non-transactional DDL.
INFO  [alembic.runtime.migration] Running upgrade  -> 68d55b0b30e6, Initial migration
```

- *Esto indica que la migración inicial se ha aplicado correctamente.*

---

### ***Verificación de la Migración***

- **Para confirmar que las migraciones se han aplicado correctamente, revisamos las tablas en la base de datos:**

```bash
mysql> show tables;
+-----------------+
| Tables_in_app   |
+-----------------+
| alembic_version |
| todo            |
+-----------------+
2 rows in set (0.00 sec)

mysql> describe todo;
+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| id          | int          | NO   | PRI | NULL    | auto_increment |
| title       | varchar(255) | NO   |     | NULL    |                |
| description | varchar(255) | NO   |     | NULL    |                |
+-------------+--------------+------+-----+---------+----------------+
3 rows in set (0.01 sec)
```

- **Aquí, `alembic_version` y `todo` son las tablas que se han creado.**

---

### ***Ejecución de la Aplicación Flask***

- **Para iniciar la aplicación Flask, usamos el siguiente comando:**

```bash
pipenv run flask run --host 0.0.0.0
```

**Salida esperada:**

```bash
pipenv run flask run --host 0.0.0.0
Loading .env environment variables...
 * Serving Flask app 'todos/app.py'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://172.17.0.2:5000
Press CTRL+C to quit
```

- *El servidor Flask está corriendo en `http://172.17.0.2:5000`, y está disponible en todas las interfaces de red.*

---

### ***Realización de Peticiones HTTP***

- **Desde el host, podemos hacer peticiones HTTP para interactuar con la API de la aplicación Flask:**

- **Obtener todos los `todos`:**

```bash
curl 172.17.0.2:5000/todos
{"todos":[]}
```

- **Enviar un nuevo `todo`:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"title": "tarea 1", "description": "Prueba"}' 172.17.0.2:5000/todos
```

---

### ***Desglose del Comando***

- **`curl`:** *Es una herramienta de línea de comandos utilizada para realizar solicitudes HTTP a un servidor.*

- **`-X POST`:** *Especifica el método HTTP que se usará para la solicitud. En este caso, `-X POST` indica que la solicitud será de tipo POST. El método POST se usa comúnmente para enviar datos al servidor para que sean procesados, como la creación de un nuevo recurso.*

- **`-H "Content-Type: application/json"`:** *Especifica un encabezado HTTP. El encabezado `Content-Type` indica el tipo de datos que se está enviando en el cuerpo de la solicitud. En este caso, `application/json` indica que el cuerpo de la solicitud está en formato JSON.*

- **`-d '{"title": "tarea 1", "description": "Prueba"}'`:** *Define los datos que se enviarán en el cuerpo de la solicitud. En este caso, `-d` se usa para enviar datos en el formato especificado por `Content-Type`. Los datos están en formato JSON, que es un formato común para intercambiar datos entre el cliente y el servidor. El JSON contiene dos claves:*
  - **`"title": "tarea 1"`:** *Define el título del nuevo recurso (en este caso, una tarea) como "tarea 1".*
  - **`"description": "Prueba"`:** *Define la descripción del recurso como "Prueba".*

- **`172.17.0.2:5000/todos`:** *Es la URL a la que se envía la solicitud. En este caso, `172.17.0.2` es la dirección IP del contenedor de Docker que está ejecutando la aplicación Flask, `5000` es el puerto en el que la aplicación está escuchando, y `/todos` es el endpoint del API al que se envía la solicitud. El endpoint `/todos` es el recurso que se está manipulando con la solicitud POST.*

- **Resumen**

- *El comando `curl` en cuestión realiza una solicitud HTTP POST al endpoint `/todos` de la aplicación Flask que está corriendo en el contenedor de Docker. Envía datos en formato JSON con un título y una descripción para crear un nuevo recurso (una tarea, en este caso) en el servidor. El encabezado `Content-Type` indica que los datos están en formato JSON, y el cuerpo de la solicitud contiene los datos específicos para la tarea a crear.*

- **Verificar los `todos` después de enviar datos:**

```bash
curl 172.17.0.2:5000/todos
{"todos":[{"description":"Prueba","id":1,"title":"tarea 1"}]}
```

---

### ***Logs del Servidor***

**Los logs del servidor Flask mostrarán las solicitudes que se han realizado:**

```bash
pipenv run flask run --host 0.0.0.0
Loading .env environment variables...
 * Serving Flask app 'todos/app.py'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://172.17.0.2:5000
Press CTRL+C to quit
172.17.0.1 - - [08/Sep/2024 22:58:52] "GET /todos HTTP/1.1" 200 -
172.17.0.1 - - [08/Sep/2024 23:01:25] "POST /todos HTTP/1.1" 201 -
172.17.0.1 - - [08/Sep/2024 23:02:00] "GET /todos HTTP/1.1" 200 -
```

**Esto muestra las peticiones realizadas y sus respuestas correspondientes.**

---

### ***Creación del Dockerfile y .dockerignore***

1. **Creación de los Ficheros:**

   **Primero, creamos los ficheros necesarios:**

   ```bash
   touch Dockerfile .dockerignore
   ```

2. **Contenido del Dockerfile:**

   **Aquí está el contenido del `Dockerfile` con comentarios mejorados:**

   ```Dockerfile
   # Autor: Daniel Benjamin Perez Morales
   # GitHub: https://github.com/DanielPerezMoralesDev13
   # Correo electrónico: danielperezdev@proton.me

   # Usamos la imagen base oficial de Python 3.10
   # Esta imagen incluye Python y sus herramientas asociadas preinstaladas
   FROM python:3.10

   # Instalamos Pipenv, una herramienta de gestión de entornos virtuales y dependencias para Python
   RUN pip install pipenv

   # Definimos la variable de entorno FLASK_APP para apuntar al fichero principal de la aplicación Flask
   # Esto indica a Flask dónde encontrar la aplicación cuando se ejecute
   ENV FLASK_APP=./todos.app

   # Configuramos Pipenv para crear el entorno virtual dentro del directorio del proyecto
   # Esto asegura que el entorno virtual se almacene en el directorio del proyecto en lugar de en el directorio de usuario
   ENV PIPENV_VENV_IN_PROJECT=1

   # Creamos el directorio de trabajo dentro del contenedor y lo establecemos como el directorio actual
   # Todos los comandos subsiguientes se ejecutarán desde este directorio
   WORKDIR /App

   # Copiamos los ficheros Pipfile y Pipfile.lock al directorio de trabajo del contenedor
   # Estos ficheros contienen las dependencias necesarias para la aplicación
   COPY ./Pipfile* ./

   # Instalamos las dependencias especificadas en Pipfile usando Pipenv
   # Esto configura el entorno virtual con todas las bibliotecas necesarias
   RUN pipenv install

   # Copiamos todos los ficheros del proyecto desde el host al contenedor
   # Esto incluye el código fuente de la aplicación y cualquier otro recurso necesario
   COPY ./ ./

   # Exponemos el puerto 5000 para permitir el acceso externo a la aplicación Flask
   # Este es el puerto por defecto en el que Flask escucha
   EXPOSE 5000

   # Iniciamos el servidor Flask usando Pipenv para activar el entorno virtual
   # La opción --host 0.0.0.0 permite que la aplicación sea accesible desde cualquier dirección IP
   CMD pipenv run flask run --host 0.0.0.0
   ```

3. **Contenido del .dockerignore:**

   - **El fichero `.dockerignore` ayuda a excluir ficheros y directorios que no se deben copiar al contenedor. Su contenido es:**

   ```bash
   # Autor: Daniel Benjamin Perez Morales
   # GitHub: https://github.com/DanielPerezMoralesDev13
   # Correo electrónico: danielperezdev@proton.me

   Dockerfile*
   .venv
   .gitignore
   .dockerignore
   __pycache__
   ```

   **Esto evita que se copien ficheros innecesarios y que aumenten el tamaño de la imagen.**

---

### ***Construcción y Ejecución de la Imagen***

1. **Construcción de la Imagen:**

   **Construimos la imagen usando el comando:**

   ```bash
   docker image build --tag d4nitrix13/app-08:python ./
   ```

   **Salida del Comando:**

   ```bash
   [+] Building 40.7s (11/11) FINISHED
    => [internal] load build definition from Dockerfile 0.0s
    => => transferring dockerfile: 1.95kB 0.0s
    => WARN: JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 43)
    => [internal] load metadata for docker.io/library/python:3.10 0.0s
    => [internal] load .dockerignore 0.0s
    => => transferring context: 238B 0.0s
    => [1/6] FROM docker.io/library/python:3.10 0.1s
    => [internal] load build context 0.1s
    => => transferring context: 136.09kB 0.0s
    => [2/6] RUN pip install pipenv 13.6s
    => [3/6] WORKDIR /App 0.0s
    => [4/6] COPY ./Pipfile* ./ 0.0s
    => [5/6] RUN pipenv install 24.7s
    => [6/6] COPY ./ ./ 0.1s
    => exporting to image 2.1s
    => => exporting layers 2.1s
    => => writing image sha256:46fcb01359228b782c7085afa1e3c9592adb2a80ab6c41863dc356ed8ba54224 0.0s
    => => naming to docker.io/d4nitrix13/app-08:python 0.0s
   ```

   - *La advertencia `JSONArgsRecommended` sugiere usar JSON para el `CMD` en lugar de la forma shell para evitar problemas con las señales del sistema operativo.*

2. **Verificación del Tamaño de la Imagen:**

   **Comprobamos el tamaño de la imagen creada:**

   ```bash
   docker image list -a
   ```

   **Salida del Comando:**

   ```bash
   REPOSITORY          TAG            IMAGE ID       CREATED              SIZE
   d4nitrix13/app-08   python         46fcb0135922   About a minute ago   1.21GB
   test/test           latest         5cdba1894d60   21 hours ago         16kB
   d4nitrix13/gin      dev            e96a5cbd3bbd   23 hours ago         19MB
   d4nitrix13/gin      multi-alpine   9d54b3314c80   23 hours ago         19MB
   <none>              <none>         0fb0401c720f   23 hours ago         89.1MB
   d4nitrix13/gin      multi          185a00984a0e   27 hours ago         89MB
   d4nitrix13/gin      stages         185a00984a0e   27 hours ago         89MB
   d4nitrix13/gin      golang         21ea1268364d   28 hours ago         1.21GB
   d4nitrix13/gin      latest         00382cb81ccc   45 hours ago         753MB
   alpine              latest         91ef0af61f39   2 days ago           7.8MB
   d4nitrix13/rails    preconfig      68f5a326fdb5   2 days ago           1.02GB
   d4nitrix13/rails    latest         f3940d656524   3 days ago           591MB
   debian              latest         4fd3f4b75df3   4 days ago           117MB
   python              3.10           bca130f2ff80   10 days ago          1GB
   ubuntu              22.04          53a843653cbc   3 weeks ago          77.9MB
   mysql               latest         a82a8f162e18   6 weeks ago          586MB
   ```

   **La imagen `d4nitrix13/app-08:python` tiene un tamaño de 1.21GB.**

3. **Inicio del Contenedor:**

   **Ejecutamos el contenedor a partir de la imagen creada:**

   ```bash
   docker run -it -p 5000:5000 --rm d4nitrix13/app-08:python
   ```

   **Salida del Comando:**

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

   **El contenedor está corriendo y la aplicación Flask está disponible en `http://172.17.0.2:5000`.**

---

### ***Verificación de la Aplicación***

1. **Realización de Peticiones:**

   **Hacemos una solicitud para verificar la respuesta de la API:**

   ```bash
   curl 172.17.0.2:5000/todos
   ```

   **Salida del Comando:**

   ```bash
   {"todos":[{"description":"Prueba","id":1,"title":"tarea 1"}]}
   ```

2. **Logs del Servidor:**

   **Comprobamos los logs del servidor para asegurar que todo funciona correctamente:**

   ```bash
   docker run -it -p 5000:5000 --rm d4nitrix13/app-08:python
   ```

   **Salida de los Logs:**

   ```bash
   Loading .env environment variables...
    * Serving Flask app './todos.app'
    * Debug mode: off
   WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
    * Running on all addresses (0.0.0.0)
    * Running on http://127.0.0.1:5000
    * Running on http://172.17.0.2:5000
   Press CTRL+C to quit
   172.17.0.1 - - [08/Sep/2024 23:12:06] "GET /todos HTTP/1.1" 200 -
   ```

   **El servidor está funcionando y procesando las solicitudes correctamente.**

---

### ***Ahora, actualicemos el `Dockerfile` para usar una versión más ligera de la imagen base de Python, conocida como `slim`. Esto ayudará a reducir el tamaño de la imagen final del contenedor.***

```Dockerfile
# Autor:** *Daniel Benjamin Perez Morales*
# GitHub:** *https://github.com/DanielPerezMoralesDev13*
# Correo electrónico:** *danielperezdev@proton.me*

# Usamos la imagen base oficial de Python 3.10
# Esta imagen incluye Python y sus herramientas asociadas preinstaladas
FROM python:3.10-slim

# Instalamos Pipenv, una herramienta de gestión de entornos virtuales y dependencias para Python
RUN pip install pipenv

# Definimos la variable de entorno FLASK_APP para apuntar al fichero principal de la aplicación Flask
# Esto indica a Flask dónde encontrar la aplicación cuando se ejecute
ENV FLASK_APP=./todos.app

# Configuramos Pipenv para crear el entorno virtual dentro del directorio del proyecto
# Esto asegura que el entorno virtual se almacene en el directorio del proyecto en lugar de en el directorio de usuario
ENV PIPENV_VENV_IN_PROJECT=1


# Creamos el directorio de trabajo dentro del contenedor y lo establecemos como el directorio actual
# Todos los comandos subsiguientes se ejecutarán desde este directorio
WORKDIR /App

# Copiamos los ficheros Pipfile y Pipfile.lock al directorio de trabajo del contenedor
# Estos ficheros contienen las dependencias necesarias para la aplicación
COPY ./Pipfile* ./

# Instalamos las dependencias especificadas en Pipfile usando Pipenv
# Esto configura el entorno virtual con todas las bibliotecas necesarias
RUN pipenv install

# Copiamos todos los ficheros del proyecto desde el host al contenedor
# Esto incluye el código fuente de la aplicación y cualquier otro recurso necesario
COPY ./ ./

# Exponemos el puerto 5000 para permitir el acceso externo a la aplicación Flask
# Este es el puerto por defecto en el que Flask escucha
EXPOSE 5000

# Iniciamos el servidor Flask usando Pipenv para activar el entorno virtual
# La opción --host 0.0.0.0 permite que la aplicación sea accesible desde cualquier dirección IP
CMD pipenv run flask run --host 0.0.0.0
```

---

#### ***Al construir la imagen, es posible que se produzca un error debido a la falta de librerías dinámicamente vinculadas que el cliente MySQL requiere durante la compilación, así como a la ausencia de extensiones nativas. Abordaremos estos problemas más adelante.***

```bash
docker build -td4nitrix13/app-08:python-slim ./
```

```bash
  29 |     # Instalamos las dependencias especificadas en Pipfile usando Pipenv
  30 |     # Esto configura el entorno virtual con todas las bibliotecas necesarias
  31 | >>> RUN pipenv install
  32 |
  33 |     # Copiamos todos los ficheros del proyecto desde el host al contenedor
--------------------
ERROR: **failed to solve:** process "/bin/sh -c pipenv install" did not complete successfully: **exit code:** 1
```

```bash
docker build -td4nitrix13/app-08:python-slim ./
[+] Building 48.0s (9/10)                                                                                              docker:default
 => [internal] load build definition from Dockerfile                                                                             0.0s
 => => transferring dockerfile:** *1.95kB                                                                                           0.0s*
 => [internal] load metadata for docker.io/library/python:3.10-slim                                                              6.5s
 => [internal] load .dockerignore                                                                                                0.0s
 => => transferring context:** *238B                                                                                                0.0s*
 => [internal] load build context                                                                                                0.0s
 => => transferring context:** *4.23kB                                                                                              0.0s*
 => [1/6] FROM docker.io/library/python:3.10-slim@sha256:2407c61b1a18067393fecd8a22cf6fceede893b6aaca817bf9fbfe65e33614a3        9.0s
 => => resolve docker.io/library/python:3.10-slim@sha256:2407c61b1a18067393fecd8a22cf6fceede893b6aaca817bf9fbfe65e33614a3        0.0s
 => => sha256:c7cce4b47466ce261eef7580051e8a159e55458a2bf91aa24ef5a238ea6600a4 12.38MB / 12.38MB                                 7.3s
 => => sha256:2407c61b1a18067393fecd8a22cf6fceede893b6aaca817bf9fbfe65e33614a3 9.13kB / 9.13kB                                   0.0s
 => => sha256:45360d9eb0ff89a954085c2b36883b65b08d1549aa9ede50e48bdcadf34d2f3f 1.94kB / 1.94kB                                   0.0s
 => => sha256:fbbf892218b1c5e9d6abd20c2a7a72bcb701ba1b6bdfa31bae7851976d4bd3b5 6.91kB / 6.91kB                                   0.0s
 => => sha256:a2318d6c47ec9cac5acc500c47c79602bcf953cec711a18bc898911a0984365b 29.13MB / 29.13MB                                 3.8s
 => => sha256:8e5ea4b05e7847d7d427d0c198e447f15046bbd1bb05c0cf5e5910a57a10e74a 3.51MB / 3.51MB                                   4.0s
 => => sha256:552394845013add00a23f1fed75ac2e8146f19bbebacf6a0c223805da2272ee8 231B / 231B                                       4.0s
 => => extracting sha256:a2318d6c47ec9cac5acc500c47c79602bcf953cec711a18bc898911a0984365b                                        2.1s
 => => sha256:23283c2309fa3f1cf954a9ab58647a2458301eb2c41db3fc0920bbfb1856c1fc 3.16MB / 3.16MB                                   5.4s
 => => extracting sha256:8e5ea4b05e7847d7d427d0c198e447f15046bbd1bb05c0cf5e5910a57a10e74a                                        0.2s
 => => extracting sha256:c7cce4b47466ce261eef7580051e8a159e55458a2bf91aa24ef5a238ea6600a4                                        0.7s
 => => extracting sha256:552394845013add00a23f1fed75ac2e8146f19bbebacf6a0c223805da2272ee8                                        0.0s
 => => extracting sha256:23283c2309fa3f1cf954a9ab58647a2458301eb2c41db3fc0920bbfb1856c1fc                                        0.6s
 => [2/6] RUN pip install pipenv                                                                                                14.3s
 => [3/6] WORKDIR /App                                                                                                           0.0s
 => [4/6] COPY ./Pipfile* ./                                                                                                     0.0s
 => ERROR [5/6] RUN pipenv install                                                                                              18.2s
------
 > [5/6] RUN pipenv install:
1.175 Creating a virtualenv for this project...
1.175 Pipfile:** */App/Pipfile*
1.202 Using /usr/local/bin/python (3.10.14) to create virtualenv...
2.856 created virtual environment CPython3.10.14.final.0-64 in 1238ms
2.856   creator CPython3Posix(dest=/App/.venv, clear=False, no_vcs_ignore=False, global=False)
2.856   seeder FromAppData(download=False, pip=bundle, setuptools=bundle, wheel=bundle, via=copy, app_data_dir=/root/.local/share/virtualenv)
2.856     added seed packages:** *pip==24.2, setuptools==74.1.2, wheel==0.44.0*
2.856   activators BashActivator,CShellActivator,FishActivator,NushellActivator,PowerShellActivator,PythonActivator
2.856
2.857 ✔ Successfully created virtual environment!
2.949 Virtualenv location:** */App/.venv*
3.026 To activate this project's virtualenv, run pipenv shell.
3.026 Alternatively, run a command inside the virtualenv with pipenv run.
3.049 To activate this project's virtualenv, run pipenv shell.
3.049 Alternatively, run a command inside the virtualenv with pipenv run.
3.053 Installing dependencies from Pipfile.lock (051d81)...
17.72 [pipenv.exceptions.InstallError]:** *Collecting alembic==1.8.1 (from -r /tmp/pipenv-79ub6vmn-requirements/pipenv-5rv_9eu4-hashed-reqs.txt (line 1))*
17.72 [pipenv.exceptions.InstallError]:** *  Downloading alembic-1.8.1-py3-none-any.whl (209 kB)*
17.72 [pipenv.exceptions.InstallError]:** *     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 209.8/209.8 kB 822.5 kB/s eta 0:00:00*
17.72 [pipenv.exceptions.InstallError]:** *Collecting click==8.1.3 (from -r /tmp/pipenv-79ub6vmn-requirements/pipenv-5rv_9eu4-hashed-reqs.txt (line 2))*
17.72 [pipenv.exceptions.InstallError]:** *  Downloading click-8.1.3-py3-none-any.whl (96 kB)*
17.72 [pipenv.exceptions.InstallError]:** *     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 96.6/96.6 kB 2.9 MB/s eta 0:00:00*
17.72 [pipenv.exceptions.InstallError]:** *Collecting flask==2.2.2 (from -r /tmp/pipenv-79ub6vmn-requirements/pipenv-5rv_9eu4-hashed-reqs.txt (line 3))*
17.72 [pipenv.exceptions.InstallError]:** *  Downloading Flask-2.2.2-py3-none-any.whl (101 kB)*
17.72 [pipenv.exceptions.InstallError]:** *     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 101.5/101.5 kB 3.3 MB/s eta 0:00:00*
17.72 [pipenv.exceptions.InstallError]:** *Collecting flask-migrate==3.1.0 (from -r /tmp/pipenv-79ub6vmn-requirements/pipenv-5rv_9eu4-hashed-reqs.txt (line 4))*
17.72 [pipenv.exceptions.InstallError]:** *  Downloading Flask_Migrate-3.1.0-py3-none-any.whl (20 kB)*
17.72 [pipenv.exceptions.InstallError]:** *Collecting flask-sqlalchemy==3.0.2 (from -r /tmp/pipenv-79ub6vmn-requirements/pipenv-5rv_9eu4-hashed-reqs.txt (line 5))*
17.72 [pipenv.exceptions.InstallError]:** *  Downloading Flask_SQLAlchemy-3.0.2-py3-none-any.whl (24 kB)*
17.72 [pipenv.exceptions.InstallError]:** *Collecting greenlet==2.0.0.post0 (from -r /tmp/pipenv-79ub6vmn-requirements/pipenv-5rv_9eu4-hashed-reqs.txt (line 6))*
17.72 [pipenv.exceptions.InstallError]:** *  Downloading greenlet-2.0.0.post0-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (536 kB)*
17.72 [pipenv.exceptions.InstallError]:** *     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 536.9/536.9 kB 4.3 MB/s eta 0:00:00*
17.72 [pipenv.exceptions.InstallError]:** *Collecting gunicorn==20.1.0 (from -r /tmp/pipenv-79ub6vmn-requirements/pipenv-5rv_9eu4-hashed-reqs.txt (line 7))*
17.72 [pipenv.exceptions.InstallError]:** *  Downloading gunicorn-20.1.0-py3-none-any.whl (79 kB)*
17.72 [pipenv.exceptions.InstallError]:** *     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 79.5/79.5 kB 5.3 MB/s eta 0:00:00*
17.72 [pipenv.exceptions.InstallError]:** *Collecting itsdangerous==2.1.2 (from -r /tmp/pipenv-79ub6vmn-requirements/pipenv-5rv_9eu4-hashed-reqs.txt (line 8))*
17.72 [pipenv.exceptions.InstallError]:** *  Downloading itsdangerous-2.1.2-py3-none-any.whl (15 kB)*
17.72 [pipenv.exceptions.InstallError]:** *Collecting jinja2==3.1.2 (from -r /tmp/pipenv-79ub6vmn-requirements/pipenv-5rv_9eu4-hashed-reqs.txt (line 9))*
17.72 [pipenv.exceptions.InstallError]:** *  Downloading Jinja2-3.1.2-py3-none-any.whl (133 kB)*
17.72 [pipenv.exceptions.InstallError]:** *     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 133.1/133.1 kB 7.7 MB/s eta 0:00:00*
17.72 [pipenv.exceptions.InstallError]:** *Collecting mako==1.2.3 (from -r /tmp/pipenv-79ub6vmn-requirements/pipenv-5rv_9eu4-hashed-reqs.txt (line 10))*
17.72 [pipenv.exceptions.InstallError]:** *  Downloading Mako-1.2.3-py3-none-any.whl (78 kB)*
17.72 [pipenv.exceptions.InstallError]:** *     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 78.7/78.7 kB 4.7 MB/s eta 0:00:00*
17.72 [pipenv.exceptions.InstallError]:** *Collecting markupsafe==2.1.1 (from -r /tmp/pipenv-79ub6vmn-requirements/pipenv-5rv_9eu4-hashed-reqs.txt (line 11))*
17.72 [pipenv.exceptions.InstallError]:** *  Downloading MarkupSafe-2.1.1-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (25 kB)*
17.72 [pipenv.exceptions.InstallError]:** *Collecting marshmallow==3.18.0 (from -r /tmp/pipenv-79ub6vmn-requirements/pipenv-5rv_9eu4-hashed-reqs.txt (line 12))*
17.72 [pipenv.exceptions.InstallError]:** *  Downloading marshmallow-3.18.0-py3-none-any.whl (48 kB)*
17.72 [pipenv.exceptions.InstallError]:** *     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 48.8/48.8 kB 4.0 MB/s eta 0:00:00*
17.72 [pipenv.exceptions.InstallError]:** *Collecting marshmallow-sqlalchemy==0.28.1 (from -r /tmp/pipenv-79ub6vmn-requirements/pipenv-5rv_9eu4-hashed-reqs.txt (line 13))*
17.72 [pipenv.exceptions.InstallError]:** *  Downloading marshmallow_sqlalchemy-0.28.1-py2.py3-none-any.whl (15 kB)*
17.72 [pipenv.exceptions.InstallError]:** *Collecting mysql-connector-python==8.0.31 (from -r /tmp/pipenv-79ub6vmn-requirements/pipenv-5rv_9eu4-hashed-reqs.txt (line 14))*
17.72 [pipenv.exceptions.InstallError]:** *  Downloading mysql_connector_python-8.0.31-cp310-cp310-manylinux1_x86_64.whl (23.5 MB)*
17.72 [pipenv.exceptions.InstallError]:** *     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 23.5/23.5 MB 8.8 MB/s eta 0:00:00*
17.72 [pipenv.exceptions.InstallError]:** *Collecting mysqlclient==2.1.1 (from -r /tmp/pipenv-79ub6vmn-requirements/pipenv-5rv_9eu4-hashed-reqs.txt (line 15))*
17.72 [pipenv.exceptions.InstallError]:** *  Downloading mysqlclient-2.1.1.tar.gz (88 kB)*
17.72 [pipenv.exceptions.InstallError]:** *     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 88.1/88.1 kB 2.8 MB/s eta 0:00:00*
17.72 [pipenv.exceptions.InstallError]:** *  Preparing metadata (setup.py):** started*
17.72 [pipenv.exceptions.InstallError]:** *  Preparing metadata (setup.py):** finished with status 'error'*
17.72 [pipenv.exceptions.InstallError]:** *error:** subprocess-exited-with-error*
17.72 [pipenv.exceptions.InstallError]:
17.72 [pipenv.exceptions.InstallError]:** *  × python setup.py egg_info did not run successfully.*
17.72 [pipenv.exceptions.InstallError]:** *  │ exit code:** 1*
17.72 [pipenv.exceptions.InstallError]:** *  ╰─> [16 lines of output]*
17.72 [pipenv.exceptions.InstallError]:** *      /bin/sh:** 1:** mysql_config:** not found*
17.72 [pipenv.exceptions.InstallError]:** *      /bin/sh:** 1:** mariadb_config:** not found*
17.72 [pipenv.exceptions.InstallError]:** *      /bin/sh:** 1:** mysql_config:** not found*
17.72 [pipenv.exceptions.InstallError]:** *      Traceback (most recent call last):*
17.72 [pipenv.exceptions.InstallError]:** *        File "<string>", line 2, in <module>*
17.72 [pipenv.exceptions.InstallError]:** *        File "<pip-setuptools-caller>", line 34, in <module>*
17.72 [pipenv.exceptions.InstallError]:** *        File "/tmp/pip-install-l5n3ivsl/mysqlclient_53a03e80e2c44d9ba6eb653b02a4d9da/setup.py", line 15, in <module>*
17.72 [pipenv.exceptions.InstallError]:** *          metadata, options = get_config()*
17.72 [pipenv.exceptions.InstallError]:** *        File "/tmp/pip-install-l5n3ivsl/mysqlclient_53a03e80e2c44d9ba6eb653b02a4d9da/setup_posix.py", line 70, in get_config*
17.72 [pipenv.exceptions.InstallError]:** *          libs = mysql_config("libs")*
17.72 [pipenv.exceptions.InstallError]:** *        File "/tmp/pip-install-l5n3ivsl/mysqlclient_53a03e80e2c44d9ba6eb653b02a4d9da/setup_posix.py", line 31, in mysql_config*
17.72 [pipenv.exceptions.InstallError]:** *          raise OSError("{} not found".format(_mysql_config_path))*
17.72 [pipenv.exceptions.InstallError]:** *      OSError:** mysql_config not found*
17.72 [pipenv.exceptions.InstallError]:** *      mysql_config --version*
17.72 [pipenv.exceptions.InstallError]:** *      mariadb_config --version*
17.72 [pipenv.exceptions.InstallError]:** *      mysql_config --libs*
17.72 [pipenv.exceptions.InstallError]:** *      [end of output]*
17.72 [pipenv.exceptions.InstallError]:
17.72 [pipenv.exceptions.InstallError]:** *  note:** This error originates from a subprocess, and is likely not a problem with pip.*
17.72 [pipenv.exceptions.InstallError]:** *error:** metadata-generation-failed*
17.72 [pipenv.exceptions.InstallError]:
17.72 [pipenv.exceptions.InstallError]:** *× Encountered error while generating package metadata.*
17.72 [pipenv.exceptions.InstallError]:** *╰─> See above for output.*
17.72 [pipenv.exceptions.InstallError]:
17.72 [pipenv.exceptions.InstallError]:** *note:** This is an issue with the package mentioned above, not pip.*
17.72 [pipenv.exceptions.InstallError]:** *hint:** See above for details.*
17.72 ERROR:** *Couldn't install package:** {}*
17.72  Package installation failed...
17.74 /usr/local/lib/python3.10/subprocess.py:1072:** *ResourceWarning:** subprocess 30 is still running*
17.74   _warn("subprocess %s is still running" % self.pid,
17.74 ResourceWarning:** *Enable tracemalloc to get the object allocation traceback*
17.74 sys:1:** *ResourceWarning:** unclosed file <_io.TextIOWrapper name=4 encoding='utf-8'>*
17.74 ResourceWarning:** *Enable tracemalloc to get the object allocation traceback*
17.75 sys:1:** *ResourceWarning:** unclosed file <_io.TextIOWrapper name=7 encoding='utf-8'>*
17.75 ResourceWarning:** *Enable tracemalloc to get the object allocation traceback*
------

 1 warning found (use docker --debug to expand):
 - JSONArgsRecommended:** *JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 43)*
Dockerfile:31
--------------------
  29 |     # Instalamos las dependencias especificadas en Pipfile usando Pipenv
  30 |     # Esto configura el entorno virtual con todas las bibliotecas necesarias
  31 | >>> RUN pipenv install
  32 |
  33 |     # Copiamos todos los ficheros del proyecto desde el host al contenedor
--------------------
ERROR:** *failed to solve:** process "/bin/sh -c pipenv install" did not complete successfully:** exit code:** 1*
```
