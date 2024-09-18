<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->

# ***Dockerización de apps gestionadas con pip***

---

## ***Creación y Configuración del Dockerfile***

**Para empaquetar nuestra aplicación Python en un contenedor Docker, necesitamos crear un fichero `Dockerfile` que describa cómo construir la imagen del contenedor. A continuación, se detalla el proceso de creación y configuración del `Dockerfile`:**

---

## ***1. Creación del Dockerfile***

**Primero, crea el fichero `Dockerfile` en el directorio raíz de tu proyecto:**

```bash
nano Dockerfile
```

---

### ***Contenido del Dockerfile***

**Aquí tienes un ejemplo de cómo debería verse el contenido de tu `Dockerfile`:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Imagen base del sistema operativo utilizando la versión de Ubuntu 22.04
# Más información en: https://hub.docker.com/_/ubuntu/
FROM ubuntu:22.04

# Actualizamos los paquetes y luego instalamos Python 3 y el módulo venv
RUN apt update && apt install -y python3 python3-venv

# Creamos el directorio de trabajo /App
WORKDIR /App

# Creamos un entorno virtual de Python en el directorio de trabajo
RUN python3 -m venv ./.venv

# Copiamos el fichero requirements.txt desde el host al contenedor
COPY ./requirements.txt ./

# Instalamos las dependencias listadas en requirements.txt utilizando pip
RUN pip install -r ./requirements.txt
```

---

#### ***Identificación y Corrección de un Error en el Dockerfile***

**El código anterior contiene un error específico en la línea:**

```Dockerfile
RUN pip install -r ./requirements.txt
```

- *El error se produce porque el comando `pip` no está disponible globalmente en el sistema operativo del contenedor; sólo existe dentro del entorno virtual que hemos creado en `./.venv`.*

---

##### ***Comprobación del Error en el Contenedor***

**Inicia el contenedor con la imagen que has creado para identificar el problema:**

```bash
docker start -i python-practicas
```

**Verifica la versión de `pip` instalada:**

```bash
root@08b7c877e9f3:/App# pip --version
bash: pip: command not found
```

- *Como se puede ver, `pip` no está instalado globalmente en el contenedor. En su lugar, sólo está disponible en el entorno virtual en `./.venv`.*

**Para confirmar, visualiza el contenido del fichero `pip` dentro del entorno virtual:**

```bash
root@08b7c877e9f3:/App# cat ./.venv/bin/pip
```

- *El fichero `pip` apunta a la versión de Python dentro del entorno virtual, lo que significa que `pip` sólo está disponible cuando el entorno virtual está activado.*

```python
#!/App/.venv/bin/python3
# -*- coding: utf-8 -*-
import re
import sys
from pip._internal.cli.main import main
if __name__ == '__main__':
    sys.argv[0] = re.sub(r'(-script\.pyw|\.exe)?$', '', sys.argv[0])
    sys.exit(main())
```

---

##### ***Corrección del Error***

**Para solucionar este problema, debes usar el ejecutable de `pip` que se encuentra dentro del entorno virtual. Puedes hacerlo de la siguiente manera:**

```bash
root@08b7c877e9f3:/App# ./.venv/bin/pip --version
pip 22.0.2 from /App/.venv/lib/python3.10/site-packages/pip (python 3.10)
```

**Alternativamente, puedes activar el entorno virtual antes de ejecutar `pip`:**

```bash
root@08b7c877e9f3:/App# source ./.venv/bin/activate
```

**Verifica la versión de `pip` nuevamente para asegurarte de que está funcionando dentro del entorno virtual:**

```bash
(.venv) root@08b7c877e9f3:/App# pip --version
pip 22.0.2 from /App/.venv/lib/python3.10/site-packages/pip (python 3.10)
```

**Finalmente, desactiva el entorno virtual cuando termines:**

```bash
(.venv) root@08b7c877e9f3:/App# deactivate
```

---

## ***Corrección del Dockerfile y Ejecución de Flask***

**Cuando trabajamos con entornos virtuales en un `Dockerfile`, es importante entender que no podemos usar el comando `source` para activar el entorno virtual. Esto se debe a que cada instrucción `RUN` en un `Dockerfile` se ejecuta en su propia capa y proceso, lo que significa que cualquier cambio en el entorno, como la activación de un entorno virtual, no persiste más allá de esa capa. Por lo tanto, activar el entorno virtual con `source` no es una solución viable dentro de un `Dockerfile`.**

> [!CAUTION]
> *Para entender por qué no es recomendable hacer `RUN source .venv/bin/activate` en un Dockerfile, veamos a un nivel más bajo cómo funciona el proceso de construcción de una imagen Docker y qué ocurre cuando intentas activar un entorno virtual en este contexto.*

### ***1. Capas en Docker***

- *Docker construye imágenes en capas. Cada instrucción en un Dockerfile (como `RUN`, `COPY`, `ENV`) crea una nueva capa en la imagen. Estas capas son inmutables y se apilan una sobre otra. Una vez que una capa se ha construido, cualquier cambio realizado en ella se congela y no afecta a las capas posteriores.*

---

### ***2. Instrucciones `RUN` y subshells***

- *Cada instrucción `RUN` en un Dockerfile se ejecuta en un subshell separado. Esto significa que cuando Docker procesa una instrucción `RUN`, crea un nuevo proceso de shell para ejecutar los comandos especificados en esa línea. Después de que los comandos se ejecutan, ese proceso de shell termina y cualquier modificación al entorno (como variables de entorno, alias, funciones, o en este caso, la activación de un entorno virtual) no se conserva en las capas siguientes.*

---

### ***3. Activación de un entorno virtual***

**Cuando activas un entorno virtual en Python con `source .venv/bin/activate`, lo que realmente ocurre es que el script de activación modifica el entorno del shell actual. Específicamente:**

- *Cambia la variable de entorno `PATH` para que los binarios del entorno virtual (como `python` y `pip`) se usen en lugar de los del sistema global.*
- *Establece algunas otras variables de entorno, como `VIRTUAL_ENV`, que indica que el entorno virtual está activo.*

- *Estos cambios solo afectan al proceso de shell que ejecutó el comando `source`. Una vez que ese proceso de shell termina (lo que ocurre al finalizar la instrucción `RUN`), esos cambios se pierden.*

---

### ***4. Efecto no persistente***

- *Como cada instrucción `RUN` se ejecuta en un subshell independiente, cualquier cambio en el entorno que ocurra dentro de una instrucción `RUN` no se mantendrá en las instrucciones siguientes. Por lo tanto, si haces algo como `RUN source .venv/bin/activate`, la activación del entorno virtual solo será válida dentro de ese subshell específico, y una vez que el comando termine, el subshell se destruirá y el entorno virtual no estará activo para ninguna instrucción `RUN` posterior.*

- **Resumiendo**
- **Subshells:** *Cada `RUN` crea un nuevo subshell, y cualquier cambio de entorno (como la activación de un entorno virtual) se descarta cuando ese subshell termina.*
- **Capas independientes:** *Las capas de Docker son inmutables y no comparten el entorno entre instrucciones `RUN`.*

- *Por eso, en lugar de intentar activar el entorno virtual en un `RUN`, se suele modificar el `PATH` directamente con `ENV` para asegurarse de que el entorno virtual sea utilizado en todas las capas siguientes.*

### ***Solución: Uso de la Ruta Completa al Ejecutable***

**Para garantizar que se utilicen las herramientas instaladas en el entorno virtual, como `pip` o `flask`, debemos especificar la ruta completa al ejecutable en el entorno virtual. Esto asegura que estamos usando las versiones correctas de estos programas.**

**Aquí está la solución corregida:**

```bash
RUN ./.venv/bin/pip install -r ./requirements.txt
```

### ***El comando `RUN ["source", ".venv/bin/activate"]` tampoco funcionará en un Dockerfile.***

- *El formato que estás utilizando es la forma **exec de `RUN`**, que no invoca un shell. En este formato, Docker ejecuta el comando directamente, sin pasar por un intérprete de comandos como Bash. Por lo tanto, comandos como `source`, que son específicos de Bash, no funcionarán de esta manera.*

**Además, como mencioné antes, incluso si `source` funcionara, cada comando `RUN` se ejecuta en un nuevo entorno, por lo que activar un entorno virtual en un comando `RUN` no tendría efecto en los comandos posteriores.**

**En lugar de intentar activar el entorno virtual, es más efectivo invocar los binarios del entorno virtual directamente en el Dockerfile, como se muestra en este ejemplo:**

```Dockerfile
RUN python3 -m venv ./.venv
RUN .venv/bin/pip install --upgrade pip
RUN .venv/bin/pip install -r requirements.txt
```

*Esto asegura que se utilicen los binarios dentro del entorno virtual, sin necesidad de activarlo explícitamente.*

### ***Dockerfile Corregido***

**El `Dockerfile` corregido que sigue esta práctica y garantiza que se usen las herramientas del entorno virtual es el siguiente. Además, incluye la copia de todos los ficheros desde el host al contenedor, la directiva `EXPOSE` para el puerto 5000, y la ejecución de la aplicación Flask.**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Imagen base del sistema operativo utilizando la versión de Ubuntu 22.04
# Más información en: https://hub.docker.com/_/ubuntu/
FROM ubuntu:22.04

# Actualizamos los paquetes y luego instalamos Python 3 y el módulo venv
RUN apt update && apt install -y python3 python3-venv

# Creamos el directorio de trabajo /App
WORKDIR /App

# Creamos un entorno virtual de Python en el directorio de trabajo
RUN python3 -m venv ./.venv

# Copiamos el fichero requirements.txt desde el host al contenedor
COPY ./requirements.txt ./

# Instalamos las dependencias listadas en requirements.txt utilizando pip
RUN ./.venv/bin/pip install -r ./requirements.txt

# Publicamos el puerto 5000 para la documentación
EXPOSE 5000

# Copiamos todos los ficheros del host al contenedor
COPY ./ ./

# Ejecutamos el servidor Flask utilizando el entorno virtual
CMD ./.venv/bin/flask --app ./src.app run --host 0.0.0.0

# Ejecuta el servidor Flask especificando la aplicación y permitiendo el acceso desde cualquier host
# CMD ./.venv/bin/flask --app ./src/app.py run --host 0.0.0.0
```

---

#### ***Verificación del Entorno Virtual***

**Es crucial entender que si intentas ejecutar `flask` sin activar el entorno virtual o sin especificar su ruta completa, recibirás un error porque Flask no está instalado globalmente en el contenedor. Aquí se muestra el proceso para verificarlo:**

```bash
root@08b7c877e9f3:/App# flask --version
bash: flask: command not found
```

**Sin embargo, cuando especificas la ruta completa al ejecutable de Flask dentro del entorno virtual, funciona correctamente:**

```bash
root@08b7c877e9f3:/App# ./.venv/bin/flask --version
Python 3.10.12
Flask 3.0.3
Werkzeug 3.0.4
```

---

### ***Activación del Entorno Virtual***

**Si necesitas trabajar dentro del contenedor de forma interactiva, puedes activar el entorno virtual manualmente:**

```bash
root@08b7c877e9f3:/App# source ./.venv/bin/activate
```

**Y verificar que Flask se ejecuta correctamente:**

```bash
(.venv) root@08b7c877e9f3:/App# flask --version
Python 3.10.12
Flask 3.0.3
Werkzeug 3.0.4
```

**Finalmente, puedes desactivar el entorno virtual:**

```bash
(.venv) root@08b7c877e9f3:/App# deactivate
```

**Este enfoque garantiza que todas las dependencias y herramientas del entorno virtual se utilicen correctamente al construir y ejecutar el contenedor Docker.**

---

## ***Creación de la Imagen Docker***

- **Una vez que hemos configurado el `Dockerfile`, podemos construir la imagen Docker. La imagen puede ser etiquetada de varias maneras, y si no se especifica una etiqueta, Docker asignará automáticamente la etiqueta `latest`. A continuación, se detallan las diferentes maneras de construir la imagen:**

---

### ***Comando para Construir la Imagen***

**Puedes construir la imagen Docker utilizando los siguientes comandos:**

1. **Construcción de la Imagen con Etiqueta `latest` Específica**

   ```bash
   docker build --tag d4nitrix13/flask:latest ./
   ```

   - *Este comando etiqueta la imagen como `d4nitrix13/flask` con la etiqueta `latest`. La ruta `./` indica el contexto de construcción.*

2. **Construcción de la Imagen con Etiqueta `latest` Utilizando la Forma Abreviada**

   ```bash
   docker build -t d4nitrix13/flask:latest ./
   ```

   - *Esta forma es una versión abreviada del comando anterior. También etiqueta la imagen como `d4nitrix13/flask` con la etiqueta `latest`.*

3. **Construcción de la Imagen Sin Etiqueta Específica**

   ```bash
   docker build -t d4nitrix13/flask ./
   ```

   - *Si no se especifica una etiqueta, Docker asignará automáticamente la etiqueta `latest` si no se proporciona otra etiqueta. En este caso, la imagen será etiquetada como `d4nitrix13/flask:latest` por defecto.*

**Recuerda que la ruta `./` indica el directorio donde se encuentra el `Dockerfile`, que generalmente es el directorio raíz de tu proyecto.**

```bash
docker build -t d4nitrix13/flask ./
[+] Building 34.5s (12/12) FINISHED                                                                        docker:default
 => [internal] load build definition from Dockerfile                                                                 0.0s
 => => transferring dockerfile: 1.23kB                                                                               0.0s
 => WARN: JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS sign  0.0s
 => [internal] load metadata for docker.io/library/ubuntu:22.04                                                      0.0s
 => [internal] load .dockerignore                                                                                    0.0s
 => => transferring context: 237B                                                                                    0.0s
 => [1/7] FROM docker.io/library/ubuntu:22.04                                                                        0.0s
 => [internal] load build context                                                                                    0.0s
 => => transferring context: 1.30kB                                                                                  0.0s
 => [2/7] RUN apt update && apt install -y python3 python3-venv                                                     22.1s
 => [3/7] WORKDIR /App                                                                                               0.0s
 => [4/7] RUN python3 -m venv ./.venv                                                                                6.4s
 => [5/7] COPY ./requirements.txt ./                                                                                 0.1s
 => [6/7] RUN ./.venv/bin/pip install -r ./requirements.txt                                                          4.6s
 => [7/7] COPY ./ ./                                                                                                 0.1s
 => exporting to image                                                                                               1.1s
 => => exporting layers                                                                                              1.1s
 => => writing image sha256:a68620cc2e839b95b77b717dc40edff864b16088ed0e41fdb02408a3f3928976                         0.0s
 => => naming to docker.io/d4nitrix13/flask                                                                          0.0s

 1 warning found (use docker --debug to expand):
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 31)
```

> [!WARNING]
> **El warning que ves en el mensaje de construcción de Docker, `JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals`, sugiere que es una buena práctica usar la forma JSON para el comando `CMD` en lugar de la forma de shell.**

---

### ***¿Qué significa este warning?***

**El warning indica que Docker recomienda usar la forma JSON para la instrucción `CMD` en el `Dockerfile`.**

- **Forma de shell (actualmente en uso):**

  ```Dockerfile
  CMD ./.venv/bin/flask --app ./src.app run --host 0.0.0.0
  ```

- **Forma JSON recomendada:**

  ```Dockerfile
  CMD [".", ".venv/bin/flask", "--app", "./src.app", "run", "--host", "0.0.0.0"]
  ```

---

### ***¿Por qué es importante la forma JSON?***

- **Mayor Precisión:** *La forma JSON evita que el comando sea procesado por una shell (por ejemplo, `/bin/sh -c`), lo cual puede llevar a problemas si el comando tiene caracteres especiales o espacios.*
- **Menos Problemas con Señales del Sistema Operativo:** *En la forma de shell, señales del sistema operativo pueden no ser manejadas correctamente por los procesos hijos. Usar la forma JSON ayuda a evitar estos problemas.*

---

### ***Cómo corregirlo***

**Para evitar el warning y seguir las recomendaciones, puedes actualizar tu `Dockerfile` para usar la forma JSON en la instrucción `CMD`. Aquí está el `Dockerfile` corregido:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Imagen base del sistema operativo utilizando la versión de Ubuntu 22.04
# Más información en: https://hub.docker.com/_/ubuntu/
FROM ubuntu:22.04

# Actualizamos los paquetes y luego instalamos Python 3 y el módulo venv
RUN apt update && apt install -y python3 python3-venv

# Creamos el directorio de trabajo /App
WORKDIR /App

# Creamos un entorno virtual de Python en el directorio de trabajo
RUN python3 -m venv ./.venv

# Copiamos el fichero requirements.txt desde el host al contenedor
COPY ./requirements.txt ./

# Instalamos las dependencias listadas en requirements.txt utilizando pip
RUN ./.venv/bin/pip install -r ./requirements.txt

# Publicamos para documentación el puerto 5000
EXPOSE 5000

# Copiamos todo del host al contenedor
COPY ./ ./

# Ejecutamos el servidor utilizando la forma JSON recomendada
CMD [".", ".venv/bin/flask", "--app", "./src.app", "run", "--host", "0.0.0.0"]
```

**Actualiza tu `Dockerfile` con la forma JSON para evitar el warning y seguir las mejores prácticas recomendadas por Docker.**

---

### ***Construcción de la Imagen Docker***

**Hemos creado la imagen Docker utilizando el siguiente comando:**

```bash
docker build -t d4nitrix13/flask ./
```

**Si bien el comando se ejecutó con éxito, se generó una advertencia:**

```plaintext
WARNING: JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 31)
```

---

### ***Explicación del Warning***

> [!WARNING]
> *Este warning indica que es recomendable utilizar la forma JSON para la instrucción `CMD` en el `Dockerfile` para evitar problemas relacionados con señales del sistema operativo. La forma JSON proporciona una mayor precisión y evita que el comando sea procesado por una shell, lo que puede causar problemas con caracteres especiales o espacios en el comando.*
---

### ***Ejecución del Contenedor***

**Para ejecutar el contenedor, se publicó el puerto 5000 del contenedor en el puerto 5000 del host y se utilizó la opción `--rm` para que el contenedor se elimine automáticamente al salir de él:**

```bash
docker run -it -p5000:5000 --rm d4nitrix13/flask:latest
```

**Salida del comando:**

```plaintext
 * Serving Flask app './src.app'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://172.17.0.2:5000
Press CTRL+C to quit
```

---

### ***Verificación con `curl`***

**Para verificar que el servidor Flask está funcionando, puedes utilizar `curl` tanto desde el contenedor como desde el host:**

- **Desde `localhost`:**

  ```bash
  curl 127.0.0.1:5000
  <p>Hello, World!</p>
  ```

- **Desde una dirección IPv4 local:**

  ```bash
  curl 192.168.1.17:5000
  <p>Hello, World!</p>
  ```

**Esto funciona porque el servidor Flask está configurado para escuchar en todas las direcciones (`0.0.0.0`).**

---

### ***Revisión de los Logs del Servidor***

**Para revisar los logs del servidor, puedes ejecutar el siguiente comando y observar la salida:**

```bash
docker run -it -p5000:5000 --rm d4nitrix13/flask:latest
```

**Salida del comando:**

```plaintext
 * Serving Flask app './src.app'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://172.17.0.2:5000
Press CTRL+C to quit
172.17.0.1 - - [29/Aug/2024 23:15:49] "GET / HTTP/1.1" 200 -
192.168.1.17 - - [29/Aug/2024 23:16:12] "GET / HTTP/1.1" 200 -
```

---

### ***Problema al Ejecutar Comandos en el Contenedor***

**Cuando intentamos ejecutar comandos `flask` en el contenedor en ejecución utilizando `docker exec`, encontramos el siguiente error:**

```bash
docker exec -it $(docker ps -q) flask --help
OCI runtime exec failed: exec failed: unable to start container process: exec: "flask": executable file not found in $PATH: unknown
```

**Solución:** *Utilizar la ruta completa al ejecutable del entorno virtual:*

```bash
docker exec -it $(docker ps -q) ./.venv/bin/flask --help
Error: Could not locate a Flask application. Use the 'flask --app' option, 'FLASK_APP' environment variable, or a 'wsgi.py' or 'app.py' file in the current directory.

Usage: flask [OPTIONS] COMMAND [ARGS]...

  A general utility script for Flask applications.

  An application to load must be given with the '--app' option, 'FLASK_APP'
  environment variable, or with a 'wsgi.py' or 'app.py' file in the current
  directory.

Options:
  -e, --env-file FILE   Load environment variables from this file. python-
                        dotenv must be installed.
  -A, --app IMPORT      The Flask application or factory function to load, in
                        the form 'module:name'. Module can be a dotted import
                        or file path. Name is not required if it is 'app',
                        'application', 'create_app', or 'make_app', and can be
                        'name(args)' to pass arguments.
  --debug / --no-debug  Set debug mode.
  --version             Show the Flask version.
  --help                Show this message and exit.

Commands:
  routes  Show the routes for the app.
  run     Run a development server.
  shell   Run a shell in the app context.
```

---

### ***Mejoras en el Dockerfile***

**Para simplificar el uso de comandos en el contenedor, se puede definir una variable de entorno que apunte a la ruta de los binarios del entorno virtual:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Imagen base del sistema operativo utilizando la versión de Ubuntu 22.04
# Más información en: https://hub.docker.com/_/ubuntu/
FROM ubuntu:22.04

# Actualizamos los paquetes y luego instalamos Python 3 y el módulo venv
RUN apt update && apt install -y python3 python3-venv

# Creamos el directorio de trabajo /App
WORKDIR /App

# Creamos una variable de entorno que contenga la ruta hacia los binarios del entorno virtual
ENV VIRTUAL_ENV_BIN=/App/.venv/bin

# Creamos un entorno virtual de Python en el directorio de trabajo
RUN python3 -m venv ./.venv

# Copiamos el fichero requirements.txt desde el host al contenedor
COPY ./requirements.txt ./

# Instalamos las dependencias listadas en requirements.txt utilizando pip
RUN ${VIRTUAL_ENV_BIN}/pip install -r ./requirements.txt

# Publicamos el puerto 5000 para la documentación
EXPOSE 5000

# Copiamos todos los ficheros del host al contenedor
COPY ./ ./

# Ejecutamos el servidor Flask utilizando el entorno virtual
CMD ${VIRTUAL_ENV_BIN}/flask --app ./src.app run --host 0.0.0.0

# Alternativamente, se puede especificar la aplicación directamente
# CMD ${VIRTUAL_ENV_BIN}/flask --app ./src/app.py run --host 0.0.0.0
```

**Conclusión:**

*Siguiendo estas recomendaciones y correcciones, puedes mejorar la funcionalidad y la confiabilidad de tu configuración de Docker para ejecutar una aplicación Flask. La forma JSON para `CMD`, la definición de la variable de entorno para los binarios del entorno virtual, y la correcta publicación de puertos y ejecución del servidor ayudarán a garantizar un entorno de desarrollo más robusto y flexible.*

---

### ***Variables de Entorno y Expansión en Docker***

---

#### ***1. Variables de Entorno en Docker***

- **Variables de Entorno:** *En Docker, una variable de entorno es una clave-valor que se define dentro del contenedor. Estas variables permiten la configuración dinámica de las aplicaciones sin necesidad de codificar valores fijos directamente en el código o en los comandos.*
- **Uso en Docker:** *Las variables de entorno se utilizan para proporcionar configuraciones específicas del entorno, como rutas de directorios, credenciales, configuraciones de base de datos, etc.*

**Ejemplo de Instrucción `ENV`:**

```Dockerfile
ENV VIRTUAL_ENV_BIN=/App/.venv/bin
```

---

#### ***2. Instrucción `ENV` en Docker***

- **Definición:** *La instrucción `ENV` en un `Dockerfile` define una variable de entorno que se establece dentro del contenedor durante la construcción de la imagen y en tiempo de ejecución.*
- **Sintaxis:** *La sintaxis básica es `ENV <clave>=<valor>`, donde `<clave>` es el nombre de la variable y `<valor>` es el valor que quieres asignar.*

**Ejemplo:**

```Dockerfile
ENV VIRTUAL_ENV_BIN=/App/.venv/bin
```

**Esto hace lo siguiente:**

- **Durante la Construcción de la Imagen:** *La variable de entorno `VIRTUAL_ENV_BIN` se establece en el valor `/App/.venv/bin` y está disponible para todas las instrucciones siguientes en el `Dockerfile`.*
- **En Tiempo de Ejecución del Contenedor:** *La variable `VIRTUAL_ENV_BIN` estará disponible para cualquier proceso o comando ejecutado dentro del contenedor. Esto significa que cuando el contenedor esté en funcionamiento, cualquier proceso o script puede acceder a esta variable de entorno.*

---

#### ***3. Expansión de Variables de Entorno***

- **Expansión de Variables:** *La expansión es el proceso por el cual un valor de variable se inserta en una cadena de texto cuando se ejecuta un comando o script. En el contexto de un contenedor Docker, la expansión ocurre cuando se utiliza una variable de entorno en comandos y scripts.*

**Ejemplo de Expansión:**

```Dockerfile
ENV VIRTUAL_ENV_BIN=/App/.venv/bin
RUN echo $VIRTUAL_ENV_BIN
```

- **Comportamiento:** *En este caso, durante la construcción de la imagen, el comando `RUN echo $VIRTUAL_ENV_BIN` expande la variable `VIRTUAL_ENV_BIN` y el resultado sería `/App/.venv/bin`.*

---

#### ***4. Uso de Variables de Entorno en el Contenedor***

- **Acceso en el Contenedor:** *Una vez que la imagen está construida y un contenedor está en ejecución, la variable de entorno `VIRTUAL_ENV_BIN` se puede utilizar dentro del contenedor. Puedes acceder a esta variable desde scripts, comandos, y aplicaciones que se ejecutan dentro del contenedor.*

**Ejemplo de Uso:**

```bash
docker exec -it $(docker ps -q) /bin/bash -c 'echo $VIRTUAL_ENV_BIN'
```

- **Comportamiento:** *Aquí, **`$VIRTUAL_ENV_BIN`** se expande dentro del contenedor y el comando **`echo`** imprime el valor `/App/.venv/bin`.*

---

#### ***5. Importancia y Aplicaciones***

- **Configuración Dinámica:** *Usar variables de entorno permite cambiar la configuración de la aplicación sin necesidad de modificar el código o recompilar la imagen. Solo es necesario actualizar el valor de la variable de entorno al iniciar el contenedor.*
- **Seguridad y Flexibilidad:** *Facilita el manejo de credenciales y otros datos sensibles, ya que estos pueden ser configurados externamente y no deben ser codificados directamente en la imagen.*

---

### ***Resumen***

- *La instrucción `ENV` en un `Dockerfile` se utiliza para definir variables de entorno que se establecen tanto durante la construcción de la imagen como en tiempo de ejecución del contenedor. La expansión de variables se refiere al proceso mediante el cual las variables de entorno se insertan en cadenas de texto y comandos, permitiendo que los valores de estas variables sean utilizados de manera dinámica en el contenedor. Esto proporciona flexibilidad en la configuración y gestión de aplicaciones y servicios dentro de los contenedores Docker.*

---

### ***Construcción y Ejecución del Contenedor Docker con Flask***

**Para construir y ejecutar la imagen Docker para tu aplicación Flask, sigue estos pasos detallados:**

---

#### ***Construimos la Imagen***

**Primero, construimos la imagen Docker con el siguiente comando:**

```bash
docker build -t d4nitrix13/flask:dev ./
```

**Salida esperada:**

```bash
[+] Building 11.5s (12/12) FINISHED                                                                                                   docker:default
 => [internal] load build definition from Dockerfile                                                                                            0.0s
 => => transferring dockerfile: 1.39kB                                                                                                          0.0s
 => [internal] load metadata for docker.io/library/ubuntu:22.04                                                                                 0.9s
 => [internal] load .dockerignore                                                                                                               0.0s
 => => transferring context: 237B                                                                                                               0.0s
 => [1/7] FROM docker.io/library/ubuntu:22.04@sha256:adbb90115a21969d2fe6fa7f9af4253e16d45f8d4c1e930182610c4731962658                           0.0s
 => => resolve docker.io/library/ubuntu:22.04@sha256:adbb90115a21969d2fe6fa7f9af4253e16d45f8d4c1e930182610c4731962658                           0.0s
 => [internal] load build context                                                                                                               0.0s
 => => transferring context: 275B                                                                                                               0.0s
 => CACHED [2/7] RUN apt update && apt install -y python3 python3-venv                                                                          0.0s
 => CACHED [3/7] WORKDIR /App                                                                                                                   0.0s
 => [4/7] RUN python3 -m venv ./.venv                                                                                                           5.6s
 => [5/7] COPY ./requirements.txt ./                                                                                                            0.1s
 => [6/7] RUN /App/.venv/bin/pip install -r ./requirements.txt                                                                                  4.4s
 => [7/7] COPY ./ ./                                                                                                                            0.1s
 => exporting to image                                                                                                                          0.4s
 => => exporting layers                                                                                                                         0.4s
 => => writing image sha256:31a3314b5881204edfbb2b4bb0bc7456648c9c8d7578e088f259f72c51063c82                                                    0.0s
 => => naming to docker.io/d4nitrix13/flask:dev                                                                                                 0.0s
```

---

#### ***Ejecutamos un Contenedor con la Imagen***

**A continuación, creamos y ejecutamos un contenedor usando la imagen que acabamos de construir. Esto permite que el contenedor publique el puerto `5000` en el puerto `5000` del host, y que se elimine automáticamente cuando el contenedor se detenga.**

```bash
docker run -it -p5000:5000 --rm d4nitrix13/flask:dev
 * Serving Flask app './src.app'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://172.17.0.2:5000
Press CTRL+C to quit
```

---

### ***Verificación de la Aplicación Flask***

**Para verificar que la aplicación Flask está funcionando correctamente, puedes hacer solicitudes `curl` desde el contenedor y desde el host.**

- **Desde localhost:**

```bash
curl 127.0.0.1:5000
<p>Hello, World!</p>
```

- **Desde tu dirección IPv4:**

- *Esto funciona porque la aplicación está configurada para escuchar en todas las direcciones (`0.0.0.0`).*

```bash
curl 192.168.1.17:5000
<p>Hello, World!</p>
```

---

### ***Inspección de Logs del Servidor***

**Para ver los logs del servidor Flask, ejecuta el contenedor nuevamente:**

```bash
docker run -it -p5000:5000 --rm d4nitrix13/flask:dev
 * Serving Flask app './src.app'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://172.17.0.2:5000
Press CTRL+C to quit
```

**Logs de ejemplo:**

```bash
172.17.0.1 - - [29/Aug/2024 23:15:49] "GET / HTTP/1.1" 200 -
192.168.1.17 - - [29/Aug/2024 23:16:12] "GET / HTTP/1.1" 200 -
```

---

### ***Ejecutar Comandos en el Contenedor***

- *Cuando intentamos ejecutar comandos dentro del contenedor, como con el comando `flask`, puede ser más complejo debido a la ruta del entorno virtual.*

**Ejemplo fallido:**

```bash
docker exec -it $(docker ps -q) flask --help
OCI runtime exec failed: exec failed: unable to start container process: exec: "flask": executable file not found in $PATH: unknown
```

- **Solución: Usar la Ruta Completa**

**Puedes usar la ruta completa al ejecutable de Flask en el entorno virtual:**

```bash
docker exec -it $(docker ps -q) /bin/bash -c '${VIRTUAL_ENV_BIN}/flask --help'
Error: Could not locate a Flask application. Use the 'flask --app' option, 'FLASK_APP' environment variable, or a 'wsgi.py' or 'app.py' file in the current directory.

Usage: flask [OPTIONS] COMMAND [ARGS]...

  A general utility script for Flask applications.

  An application to load must be given with the '--app' option, 'FLASK_APP'
  environment variable, or with a 'wsgi.py' or 'app.py' file in the current
  directory.

Options:
  -e, --env-file FILE   Load environment variables from this file. python-
                        dotenv must be installed.
  -A, --app IMPORT      The Flask application or factory function to load, in
                        the form 'module:name'. Module can be a dotted import
                        or file path. Name is not required if it is 'app',
                        'application', 'create_app', or 'make_app', and can be
                        'name(args)' to pass arguments.
  --debug / --no-debug  Set debug mode.
  --version             Show the Flask version.
  --help                Show this message and exit.

Commands:
  routes  Show the routes for the app.
  run     Run a development server.
  shell   Run a shell in the app context.
```

---

### ***Alternativas para Ver la Ruta de Variables***

**Para verificar la ruta de los binarios en el entorno virtual, puedes usar:**

- **Con `bash -c` para imprimir la variable de entorno:**

```bash
docker exec -it $(docker ps -q) /bin/bash -c 'echo $VIRTUAL_ENV_BIN'
/App/.venv/bin
```

- **Alternativa con `${}` para la misma tarea:**

```bash
docker exec -it $(docker ps -q) /bin/bash -c 'echo ${VIRTUAL_ENV_BIN}'
/App/.venv/bin
```

- **Nota Importante: No funciona sin `bash -c`**

```bash
docker exec -it $(docker ps -q) echo ${VIRTUAL_ENV_BIN}
```

*Este comando no funciona correctamente debido a cómo se maneja el entorno de la variable en el contexto de `docker exec`.*

---

### ***Explicación del Problema***

---

#### ***1. Contexto del Comando `docker exec`***

- **`docker exec`** *se utiliza para ejecutar comandos dentro de un contenedor que ya está en ejecución.*
- *El comando **`docker exec -it $(docker ps -q)`** selecciona el contenedor en ejecución y abre una sesión interactiva, permitiendo ejecutar comandos dentro de este contenedor.*

---

#### ***2. Evaluación de Variables de Entorno***

- *Las variables de entorno definidas en el contenedor están disponibles para los procesos que se ejecutan dentro de este contenedor.*
- *En el comando **`docker exec -it $(docker ps -q) echo ${VIRTUAL_ENV_BIN}`**, el **`docker exec`** ejecuta el comando **`echo ${VIRTUAL_ENV_BIN}`** directamente dentro del contenedor.*

---

#### ***3. Evaluación de Variables de Entorno en el Contexto de `docker exec`***

- **Problema Principal:** *Cuando usas `docker exec` con la sintaxis `echo ${VIRTUAL_ENV_BIN}`, la expansión de la variable `${VIRTUAL_ENV_BIN}` ocurre en el **shell** que ejecuta el comando `docker exec` en el host, no dentro del contenedor.*
- **Expansión en el Host:** *La variable `${VIRTUAL_ENV_BIN}` se expande en el shell del host, pero el contenedor no tiene conocimiento de esta expansión porque **`docker exec`** no interpreta las variables del host en el contexto del contenedor.*
  
**Ejemplo Detallado:**

1. **Expansión de Variables en el Host:**
    - *Si ejecutas `echo ${VIRTUAL_ENV_BIN}` en tu terminal (host), tu shell en el host intentará expandir `${VIRTUAL_ENV_BIN}` basándose en las variables definidas en el host, no en el contenedor.*

2. **Ejecución del Comando en el Contenedor:**
    - *Cuando el comando llega al contenedor, `${VIRTUAL_ENV_BIN}` ya ha sido expandido por el shell del host y, como resultado, el contenedor no sabe lo que debería hacer con el resultado expandido, ya que el comando ya no contiene una referencia válida para el contenedor.*

---

#### ***4. Uso de `bash -c` para Solucionar el Problema***

- *Para ejecutar el comando **`echo ${VIRTUAL_ENV_BIN}`** en el contenedor y asegurarte de que la variable se expanda correctamente dentro del contenedor, debes usar **`bash -c`**. Esto permite que el contenedor interprete el comando con su propio shell, lo que asegura que las variables de entorno se manejen en el contexto del contenedor.*

**Comando Corregido:**

```bash
docker exec -it $(docker ps -q) /bin/bash -c 'echo $VIRTUAL_ENV_BIN'
```

**Explicación:**

- **`/bin/bash -c`** *ejecuta el comando dentro de un shell **bash** en el contenedor.*
- *Dentro de **`bash`**, la variable `$VIRTUAL_ENV_BIN` se expande en el contexto del contenedor, donde está definida y disponible.*

> [!TIP]
> **Resumen:** *El comando **`docker exec -it $(docker ps -q) echo ${VIRTUAL_ENV_BIN}`** no funciona correctamente porque la expansión de variables se realiza en el contexto del shell del host, no del contenedor. Para resolver esto, usa **`/bin/bash -c`** para asegurar que el comando se ejecute dentro del contenedor y las variables de entorno se manejen correctamente en su contexto.*

---

### ***Formas de la Instrucción `RUN` en Docker***

---

#### ***1. Shell Form***

- **Definición:** *En el Shell Form, el comando se especifica como una sola cadena de texto. Docker usa el intérprete de comandos por defecto del contenedor (por ejemplo, `/bin/sh -c` en la mayoría de los sistemas Unix) para ejecutar el comando.*
- **Sintaxis:** *Se usa una cadena de texto única que se pasa al shell del contenedor.*

**Ejemplo de Shell Form:**

```Dockerfile
RUN echo $VIRTUAL_ENV_BIN
```

**Comportamiento:**

- **Expansión de Variables:** *En el Shell Form, Docker ejecuta el comando dentro de un shell. Por lo tanto, las variables de entorno como `$VIRTUAL_ENV_BIN` se expanden en el contexto del shell.*
- **Resultado Esperado:** *El comando `echo $VIRTUAL_ENV_BIN` imprimirá el valor de la variable de entorno `$VIRTUAL_ENV_BIN` si está definida en el entorno del shell.*

**Salida esperada si `VIRTUAL_ENV_BIN` está definida:**

```bash
/App/.venv/bin
```

**Salida esperada si `VIRTUAL_ENV_BIN` no está definida:**

```bash

```

---

#### ***2. Exec Form***

- **Definición:** *En el Exec Form, el comando se especifica como una lista de argumentos. Docker no usa un shell para ejecutar el comando. En cambio, el comando se ejecuta directamente, con el primer elemento siendo el ejecutable y los siguientes elementos siendo los argumentos.*
- **Sintaxis:** *Se usa una lista de cadenas en formato JSON.*

**Ejemplo de Exec Form:**

```Dockerfile
RUN ["echo", "$VIRTUAL_ENV_BIN"]
```

**Comportamiento:**

- **Expansión de Variables:** *En el Exec Form, Docker no expande las variables de entorno dentro de la lista de argumentos. En su lugar, las variables deben ser interpretadas directamente por el comando ejecutable.*
- **Resultado Esperado:** *El comando `echo "$VIRTUAL_ENV_BIN"` se ejecuta tal como está. Como Docker no usa un shell para ejecutar el comando, la variable `$VIRTUAL_ENV_BIN` no se expandirá y se imprimirá literalmente como `$VIRTUAL_ENV_BIN`.*

**Salida esperada:**

```bash
$VIRTUAL_ENV_BIN
```

### ***Comparación y Efecto en Variables de Entorno***

- **Shell Form:**
  - **Uso del Shell:** *Permite la expansión de variables y el uso de características del shell como redirección y tuberías.*
  - **Expansión de Variables:** *Las variables de entorno se expanden correctamente dentro del contexto del shell.*
  - **Ejemplo:**

    ```Dockerfile
    RUN echo $VIRTUAL_ENV_BIN
    ```

    *Si `$VIRTUAL_ENV_BIN` está definida, se imprimirá el valor de la variable.*

- **Exec Form:**
  - **Sin Uso de Shell:** *No permite la expansión de variables a menos que la expansión se realice dentro del comando ejecutable.*
  - **Impresión Literal:** *Si el comando no interpreta las variables de entorno, se imprimirá el nombre de la variable como texto literal.*
  - **Ejemplo:**

    ```Dockerfile
    RUN ["echo", "$VIRTUAL_ENV_BIN"]
    ```

    *El resultado será `$VIRTUAL_ENV_BIN` en lugar del valor de la variable.*

**Resumen:** *La forma en que Docker maneja las variables de entorno depende del tipo de `RUN` que uses:*

- **Shell Form** *permite la expansión de variables de entorno porque usa un shell para ejecutar el comando.*
- **Exec Form** *no permite la expansión de variables de entorno directamente, ya que el comando se ejecuta sin un shell, por lo que las variables se imprimen como texto literal a menos que el comando lo maneje específicamente.*

*Elegir entre Shell Form y Exec Form depende de si necesitas características del shell o una ejecución directa del comando.*

---

### ***1. Creación del Entorno Virtual y Variables de Entorno***

**Dockerfile:**

```Dockerfile
# Creamos un entorno virtual de Python en el directorio de trabajo
# Esto aísla las dependencias de Python en un entorno separado
RUN python3 -m venv ./.venv
```

**Explicación:**

- *`RUN python3 -m venv ./.venv` crea un entorno virtual de Python en el directorio `.venv`. Un entorno virtual aísla las dependencias del proyecto de las del sistema global, evitando conflictos entre paquetes.*

**Variable de Entorno:**

```Dockerfile
# Definimos la variable de entorno VIRTUAL_ENV que apunta al directorio del entorno virtual
ENV VIRTUAL_ENV=/App/.venv/
```

**Explicación:**

- *`ENV VIRTUAL_ENV=/App/.venv/` define una variable de entorno llamada `VIRTUAL_ENV` que apunta al directorio del entorno virtual. Esta variable facilita la referencia al entorno virtual en otros comandos y scripts dentro del contenedor.*

**Modificación del PATH:**

```Dockerfile
# Actualizamos la variable PATH para incluir el directorio 'bin' del entorno virtual
# Esto asegura que los ejecutables del entorno virtual se utilicen en lugar de los del sistema
ENV PATH="${VIRTUAL_ENV}/bin:$PATH"
```

**Explicación:**

- *`ENV PATH="${VIRTUAL_ENV}/bin:$PATH"` modifica la variable `PATH` del contenedor. El `PATH` es una variable de entorno que especifica los directorios en los que el sistema busca ejecutables.*
- **Sintaxis `${VIRTUAL_ENV}/bin:$PATH`:**
  - **`${VIRTUAL_ENV}/bin`:** *Añade el directorio `bin` dentro del entorno virtual al inicio del `PATH`. Esto asegura que los ejecutables del entorno virtual (como `pip` y `python`) se utilicen en lugar de los del sistema.*
  - *`$PATH`:** *El valor original de `PATH` se mantiene, agregando el nuevo directorio al principio. Esto permite que otros ejecutables del sistema también sean accesibles.*

**Significado de los `:` y `$`:**

- *`:`:** *Separador en la lista de directorios de `PATH`. Permite agregar múltiples directorios al `PATH`.*
- *`$`:** *Indica una variable de entorno en la shell. Cuando Docker expande la variable, sustituye `$PATH` por su valor actual.*

**Variable de Entorno para Flask:**

```Dockerfile
# Definimos la variable de entorno FLASK_APP que especifica la aplicación Flask a ejecutar
ENV FLASK_APP=./src.app
```

**Explicación:**

- *`ENV FLASK_APP=./src.app` define la variable de entorno `FLASK_APP`, que Flask utiliza para localizar la aplicación a ejecutar.*

---

### ***2. Instalación de Dependencias y Configuración***

**Instalación de Dependencias:**

```Dockerfile
# Copiamos el fichero requirements.txt desde el host al contenedor
COPY ./requirements.txt ./

# Instalamos las dependencias listadas en requirements.txt usando pip
RUN pip install -r ./requirements.txt
```

**Explicación:**

- *`COPY ./requirements.txt ./` copia el fichero `requirements.txt` del host al contenedor.*
- *`RUN pip install -r ./requirements.txt` instala las dependencias de Python especificadas en `requirements.txt`. `pip` está disponible en el `PATH` modificado anteriormente.*

**Exposición del Puerto:**

```Dockerfile
# Exponemos el puerto 5000 para permitir el acceso a la aplicación Flask
EXPOSE 5000
```

**Explicación:**

- *`EXPOSE 5000` indica que el contenedor escuchará en el puerto 5000, que es el puerto por defecto para las aplicaciones Flask.*

**Copia del Código Fuente:**

```Dockerfile
# Copiamos todos los ficheros del host al contenedor
COPY ./ ./
```

**Explicación:**

- *`COPY ./ ./` copia todos los ficheros del directorio del host al directorio de trabajo en el contenedor.*

**Ejecución del Servidor Flask:**

```Dockerfile
# Ejecutamos el servidor Flask usando el entorno virtual
# La opción --host 0.0.0.0 permite que la aplicación sea accesible desde cualquier dirección IP
CMD flask run --host 0.0.0.0
```

**Explicación:**

- *`CMD flask run --host 0.0.0.0` ejecuta el comando `flask run` al iniciar el contenedor, iniciando el servidor Flask y haciéndolo accesible desde cualquier IP.*

- **Resumen:**

1. **Creación del Entorno Virtual:** *Aísla las dependencias del proyecto.*
2. **Variables de Entorno:** *Facilitan la configuración del entorno y el uso de herramientas específicas.*
3. **Modificación del `PATH`:** *Permite que los ejecutables del entorno virtual sean accesibles sin especificar rutas completas.*
4. **Shell Form y Exec Form en `RUN`:** *En la Shell Form, las variables de entorno se expanden en el contexto de un shell. En la Exec Form, las variables deben ser interpretadas directamente.*

*Este Dockerfile configura un entorno de desarrollo para una aplicación Flask, asegurando que las dependencias se gestionen dentro de un entorno virtual y que el contenedor esté preparado para ejecutar la aplicación.*

---

### ***Explicación de los Cambios en el Dockerfile y la Configuración del PATH***

#### ***1. Binarios en el Directorio `bin`***

**Salida del Comando:**

```bash
docker exec -it $(docker ps -q) ls ./.venv/bin/ -lA
total 40
-rw-r--r-- 1 root root 9033 Aug 29 23:47 Activate.ps1
-rw-r--r-- 1 root root 1979 Aug 29 23:47 activate
-rw-r--r-- 1 root root  905 Aug 29 23:47 activate.csh
-rw-r--r-- 1 root root 2185 Aug 29 23:47 activate.fish
-rwxr-xr-x 1 root root  214 Aug 29 23:47 flask
-rwxr-xr-x 1 root root  227 Aug 29 23:47 pip
-rwxr-xr-x 1 root root  227 Aug 29 23:47 pip3
-rwxr-xr-x 1 root root  227 Aug 29 23:47 pip3.10
lrwxrwxrwx 1 root root    7 Aug 29 23:47 python -> python3
lrwxrwxrwx 1 root root   16 Aug 29 23:47 python3 -> /usr/bin/python3
lrwxrwxrwx 1 root root    7 Aug 29 23:47 python3.10 -> python3
```

**Explicación:**

- *El directorio `bin` dentro del entorno virtual contiene los ejecutables necesarios para el entorno.*
  - **Binarios comunes:**
    - **`flask`:** *Ejecutable para iniciar aplicaciones Flask.*
    - **`pip`, `pip3`, `pip3.10`:** *Herramientas para instalar paquetes de Python.*
    - **`python`, `python3`, `python3.10`:** *Enlaces a las versiones de Python.*

---

#### ***2. Modificaciones en el Dockerfile***

**Dockerfile Actual:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Imagen base del sistema operativo: Ubuntu 22.04
# La imagen base se obtiene de Docker Hub. Más información en: https://hub.docker.com/_/ubuntu/
FROM ubuntu:22.04

# Actualizamos la lista de paquetes y luego instalamos Python 3 y el módulo python3-venv
# Esto nos permite crear entornos virtuales de Python
RUN apt update && apt install -y python3 python3-venv

# Establecemos el directorio de trabajo dentro del contenedor en /App
# Todos los comandos siguientes se ejecutarán desde este directorio
WORKDIR /App

# Creamos un entorno virtual de Python en el directorio de trabajo
# Esto aísla las dependencias de Python en un entorno separado
RUN python3 -m venv ./.venv

# Definimos la variable de entorno VIRTUAL_ENV que apunta al directorio del entorno virtual
# Esto facilita la referencia al entorno virtual en comandos posteriores
ENV VIRTUAL_ENV=/App/.venv/

# Actualizamos la variable PATH para incluir el directorio 'bin' del entorno virtual
# Esto asegura que los ejecutables del entorno virtual se utilicen en lugar de los del sistema
ENV PATH="${VIRTUAL_ENV}/bin:$PATH"

# Definimos la variable de entorno FLASK_APP que especifica la aplicación Flask a ejecutar
# Esto es necesario para que Flask pueda encontrar la aplicación a ejecutar
ENV FLASK_APP=./src.app

# Copiamos el fichero requirements.txt desde el host al contenedor
# Este fichero contiene la lista de dependencias de Python necesarias
COPY ./requirements.txt ./

# Instalamos las dependencias listadas en requirements.txt usando pip
# Estas dependencias se instalarán en el entorno virtual
RUN pip install -r ./requirements.txt

# Exponemos el puerto 5000 para permitir el acceso a la aplicación Flask
# Esto es necesario para la comunicación con la aplicación desde fuera del contenedor
EXPOSE 5000

# Copiamos todos los ficheros del host al contenedor
# Esto incluye el código fuente y cualquier otro fichero necesario para la aplicación
COPY ./ ./

# Ejecutamos el servidor Flask usando el entorno virtual
# La opción --host 0.0.0.0 permite que la aplicación sea accesible desde cualquier dirección IP
CMD flask run --host 0.0.0.0
```

**Explicación de los Cambios:**

1. **Variables de Entorno:**

   - **`ENV VIRTUAL_ENV=/App/.venv/`:** *Establece la variable de entorno `VIRTUAL_ENV` que apunta al directorio del entorno virtual. Esta variable facilita la referencia al entorno virtual en comandos posteriores.*
   - **`ENV PATH="${VIRTUAL_ENV}/bin:$PATH"`:** *Modifica la variable `PATH` para incluir el directorio `bin` del entorno virtual. Esto permite que los ejecutables del entorno virtual (como `pip` y `python`) sean utilizados sin especificar la ruta completa.*

2. **Actualización del PATH:**

   - **Sintaxis `${VIRTUAL_ENV}/bin:$PATH`:**
     - **`${VIRTUAL_ENV}/bin`:** *Agrega el directorio `bin` del entorno virtual al `PATH`. Esto asegura que las versiones del entorno virtual de `pip` y `python` se usen en lugar de las del sistema.*
     - **`$PATH`:** *El valor original de `PATH` se mantiene, asegurando que otros ejecutables del sistema aún sean accesibles.*

3. **Eliminación de `VIRTUAL_ENV_BIN`:**

   - *Se ha eliminado `VIRTUAL_ENV_BIN` para simplificar la configuración. En lugar de definir una variable para cada ruta específica, se usa `VIRTUAL_ENV` para representar la ruta al entorno virtual. Esto hace que la configuración sea más limpia y flexible, permitiendo acceder a cualquier directorio dentro de `.venv` simplemente añadiendo el subdirectorio a `VIRTUAL_ENV`.*

4. **Orden de los Comandos:**

   - **Creación del Entorno Virtual:** *`RUN python3 -m venv ./.venv` debe ejecutarse antes de definir las variables de entorno que dependen de él.*
   - **Instalación de Dependencias y Configuración:** *Después de crear el entorno virtual y configurar las variables de entorno, se copian los ficheros necesarios y se instalan las dependencias usando `pip`.*

- **Resumen:**

- **Variables de Entorno:**
  - *`VIRTUAL_ENV` apunta al entorno virtual.*
  - *`PATH` se actualiza para incluir los ejecutables del entorno virtual.*

- **Sintaxis del PATH:**
  - **`${VIRTUAL_ENV}/bin:$PATH`:** *Añade el directorio `bin` del entorno virtual al inicio del `PATH`.*

- **Modificación y Eliminación:**
  - *Se ha simplificado la configuración usando `VIRTUAL_ENV` en lugar de `VIRTUAL_ENV_BIN` para mantener la flexibilidad y limpieza en el Dockerfile.*

*Esta configuración asegura que el contenedor utilice el entorno virtual para todas las operaciones relacionadas con Python, facilitando la gestión de dependencias y la ejecución de la aplicación Flask.*

---

---

#### ***Verificación del Funcionamiento del Contenedor Docker***

**Construcción de la Imagen:**

```bash
docker build -t d4nitrix13/flask:alpha ./
```

**La imagen Docker se construyó exitosamente con la etiqueta `alpha` usando el siguiente comando:**

```bash
docker build -t d4nitrix13/flask:alpha ./
[+] Building 5.8s (12/12) FINISHED                                                                                                    docker:default
 => [internal] load build definition from Dockerfile                                                                                            0.0s
 => => transferring dockerfile: 2.31kB                                                                                                          0.0s
 => [internal] load metadata for docker.io/library/ubuntu:22.04                                                                                 0.8s
 => [internal] load .dockerignore                                                                                                               0.0s
 => => transferring context: 237B                                                                                                               0.0s
 => [1/7] FROM docker.io/library/ubuntu:22.04@sha256:adbb90115a21969d2fe6fa7f9af4253e16d45f8d4c1e930182610c4731962658                           0.0s
 => => resolve docker.io/library/ubuntu:22.04@sha256:adbb90115a21969d2fe6fa7f9af4253e16d45f8d4c1e930182610c4731962658                           0.0s
 => [internal] load build context                                                                                                               0.0s
 => => transferring context: 275B                                                                                                               0.0s
 => CACHED [2/7] RUN apt update && apt install -y python3 python3-venv                                                                          0.0s
 => CACHED [3/7] WORKDIR /App                                                                                                                   0.0s
 => CACHED [4/7] RUN python3 -m venv ./.venv                                                                                                    0.0s
 => CACHED [5/7] COPY ./requirements.txt ./                                                                                                     0.0s
 => [6/7] RUN pip install -r ./requirements.txt                                                                                                 4.7s
 => [7/7] COPY ./ ./                                                                                                                            0.0s
 => exporting to image                                                                                                                          0.1s
 => => exporting layers                                                                                                                         0.1s
 => => writing image sha256:6eb51e40034d8e844b333a4bc4199c0c75536d58ed2aaa6af6baee0761f9ed02                                                    0.0s
 => => naming to docker.io/d4nitrix13/flask:alpha                                                                                               0.0s
```

- *El proceso de construcción se completó sin errores, y la imagen se etiquetó correctamente como `d4nitrix13/flask:alpha`.*

**Ejecución del Contenedor:**

**El contenedor se ejecutó con éxito usando el siguiente comando:**

```bash
docker run -it -p 5000:5000 --rm d4nitrix13/flask:alpha
```

**El servidor Flask se inició correctamente y mostró los siguientes mensajes:**

- **Dirección de la Aplicación:**
  - *`http://127.0.0.1:5000`*
  - *`http://172.17.0.2:5000`*
- **Advertencia:** *"This is a development server. Do not use it in a production deployment. Use a production WSGI server instead."*

**Verificación del PATH y Ejecutables:**

**Se verificó que el comando `flask` está disponible en el contenedor con el siguiente comando:**

```bash
docker exec -it $(docker ps -q) flask --help
```

- *El comando `flask --help` mostró que el comando `flask` está disponible y funcionando dentro del contenedor.*

**Pruebas de Conectividad:**

**Se realizaron peticiones HTTP al contenedor desde el host usando `curl`:**

```bash
curl localhost:5000
```

**La respuesta fue:**

```html
<p>Hello, World!</p>
```

**Se realizaron peticiones HTTP desde la dirección IPv4 del host:**

```bash
curl 192.168.1.17:5000
```

**La respuesta fue:**

```html
<p>Hello, World!</p>
```

**Verificación de Logs del Servidor:**

**Al ejecutar el contenedor y realizar las peticiones, los logs del servidor confirmaron que las peticiones fueron recibidas correctamente:**

```plaintext
172.17.0.1 - - [30/Aug/2024 01:12:16] "GET / HTTP/1.1" 200 -
192.168.1.17 - - [30/Aug/2024 01:13:11] "GET / HTTP/1.1" 200 -
```

- **Resumen:**
  - *La imagen Docker se construyó y etiquetó correctamente.*
  - *El contenedor se ejecutó y el servidor Flask respondió a las peticiones desde el host y la dirección IPv4.*
  - *El comando `flask` está disponible y funciona correctamente dentro del contenedor.*

*Todo está funcionando como se esperaba.*

---

### ***Uso de Imágenes Preconfiguradas y Configuración del Dockerfile***

*Para simplificar el proceso de configuración y evitar la necesidad de instalar Python manualmente, utilizaremos imágenes Docker preconfiguradas como `python:3` o `python:3.10`. Estas imágenes ya incluyen Python y las herramientas necesarias para su ejecución. Aunque estas imágenes pueden ser más grandes, ahorran tiempo al eliminar la necesidad de realizar configuraciones adicionales.*

**Nota:** *Antes de ejecutar un nuevo contenedor, asegúrate de detener cualquier contenedor que esté utilizando el puerto 5000 para evitar conflictos:*

```bash
docker stop -sSIGTERM -t3 $(docker ps -qf publish=5000)
```

---

### ****Desglose del Comando****

1. **`docker stop`**
   - *Este comando se utiliza para detener uno o más contenedores en ejecución.*

2. **`-sSIGTERM`**
   - *La opción `-s` especifica la señal que se enviará al contenedor para detenerlo. En este caso, se utiliza `SIGTERM` (Signal Terminate), que es una señal de terminación que permite a los procesos cerrar de manera ordenada. Por defecto, `docker stop` envía `SIGTERM`, por lo que esta opción es redundante si no se desea cambiar la señal.*

3. **`-t3`**
   - *La opción `-t` especifica el tiempo en segundos que Docker esperará después de enviar la señal `SIGTERM` antes de forzar el apagado del contenedor con `SIGKILL`. En este caso, el tiempo de espera es de 3 segundos. Si el contenedor no se detiene en ese tiempo, Docker enviará una señal de terminación forzosa.*

4. **`$(docker ps -qf publish=5000)`**
   - *Este es un comando dentro de una sustitución de comando (expresión entre `$()`), que se ejecuta primero y su salida se usa como argumento para el comando `docker stop`.*
   - **`docker ps`:** *Lista los contenedores en ejecución.*
   - **`-q`, `--quiet`:** *Muestra solo los IDs de los contenedores, sin información adicional.*
   - **`-f publish=5000`, `--filter publish=5000`:** *Filtra la lista de contenedores para incluir solo aquellos que tienen el puerto 5000 publicado. Es decir, solo los contenedores que están expuestos en el puerto 5000.*

---

### ***¿Qué Hace el Comando?***

1. **`docker ps -qf publish=5000`:** *Obtiene los IDs de los contenedores en ejecución que están exponiendo el puerto 5000.*

2. **`$(...)`:** *La sustitución de comando toma estos IDs y los usa como argumentos para el siguiente comando.*

3. **`docker stop -sSIGTERM -t3`:** *Detiene los contenedores cuyos IDs fueron obtenidos en el paso anterior. Envía una señal `SIGTERM` para solicitar que se detengan de manera ordenada y espera 3 segundos antes de forzar el apagado si es necesario.*

**Resumen:** *Este comando se utiliza para detener todos los contenedores que están exponiendo el puerto 5000. Envía una señal `SIGTERM` para permitir un apagado ordenado y, si los contenedores no se detienen en 3 segundos, se les forzará a detenerse. Es útil para evitar conflictos de puerto cuando se quiere iniciar un nuevo contenedor que también usa el puerto 5000.*

**Consideraciones para Imágenes de Producción:**

> [!NOTE]
> *Para entornos de producción, se recomienda usar el formato `exec` en la instrucción `CMD` para que el proceso principal sea el proceso que ejecuta tu aplicación. Esto garantiza que el contenedor maneje señales como `SIGTERM` adecuadamente. Sin embargo, el uso de un shell como intermediario puede generar problemas adicionales, especialmente en términos de seguridad. Debes evaluar si prefieres los problemas asociados con el uso de un shell o los desafíos de manejar las señales directamente en tu aplicación.*

*Para desarrollo, el formato `shell` en `CMD` suele ser suficiente y menos complejo.*

**Caché de Imágenes:**

> [!NOTE]
> *Recuerda que las imágenes Docker funcionan por capas. Si realizas cambios en las primeras capas del Dockerfile, Docker no reutiliza la caché de las capas anteriores, y la imagen se reconstruye desde el inicio. Es importante estructurar tu Dockerfile para optimizar el uso de la caché y reducir el tiempo de construcción.*

**Ejemplo de Dockerfile:**

```Dockerfile
# Utilizamos una imagen base de Python 3.10
# Esta imagen incluye Python 3.10 y pip preinstalados, eliminando la necesidad de instalar Python por separado
# Puedes cambiar a otra versión descomentando la línea correspondiente
FROM python:3.10

# Imagen base del sistema operativo Ubuntu 22.04
# La imagen base original de Ubuntu puede ser utilizada en lugar de la imagen base de Python si se requiere más control
# La línea está comentada porque estamos utilizando la imagen de Python base que ya incluye Ubuntu
# FROM ubuntu:22.04

# Actualizamos la lista de paquetes y luego instalamos Python 3 y el módulo python3-venv
# Esto nos permite crear entornos virtuales de Python
# RUN apt update && apt install -y python3 python3-venv

# Creamos el directorio de trabajo en el contenedor y lo establecemos como el directorio actual
WORKDIR /App

# Creamos un entorno virtual de Python dentro del directorio de trabajo
# El entorno virtual aísla las dependencias de la aplicación, evitando conflictos con otras instalaciones de Python
RUN python3 -m venv ./.venv

# Definimos la variable de entorno VIRTUAL_ENV que apunta al directorio del entorno virtual
ENV VIRTUAL_ENV=/App/.venv/

# Actualizamos la variable de entorno PATH para que el contenedor utilice los binarios del entorno virtual
ENV PATH="${VIRTUAL_ENV}/bin:$PATH"

# Definimos la variable de entorno FLASK_APP para indicar la ubicación del fichero de aplicación Flask
ENV FLASK_APP=./src.app

# Copiamos el fichero requirements.txt desde el host al contenedor
COPY ./requirements.txt ./

# Instalamos las dependencias listadas en requirements.txt usando pip dentro del entorno virtual
RUN pip install -r ./requirements.txt

# Exponemos el puerto 5000 para que la aplicación Flask sea accesible desde fuera del contenedor
EXPOSE 5000

# Copiamos todos los ficheros desde el host al contenedor
COPY ./ ./

# Ejecutamos el servidor Flask usando el entorno virtual
# La opción --host 0.0.0.0 permite que la aplicación sea accesible desde cualquier dirección IP
CMD flask run --host 0.0.0.0
```

- **Imagen Base:** *Utilizamos `python:3.10`, que incluye Python 3.10 y pip preinstalados.*
- **Entorno Virtual:** *Creamos y configuramos un entorno virtual para aislar las dependencias.*
- **Configuración de Entorno:** *Ajustamos las variables de entorno para el entorno virtual y Flask.*
- **Copia y Instalación:** *Copiamos los ficheros necesarios y instalamos las dependencias.*
- **Puerto Expuesto:** *Exponemos el puerto 5000 para acceder a la aplicación.*
- **Ejecución del Servidor:** *Ejecutamos el servidor Flask con el entorno virtual.*

*Este Dockerfile está diseñado para una configuración eficiente tanto para desarrollo como para producción, manejando dependencias y configuraciones de manera efectiva.*

---

### ***Creación de la Imagen Docker con Tag `beta`***

**Primero, creamos la imagen Docker con el tag `beta` utilizando el siguiente comando:**

```bash
docker build -t d4nitrix13/flask:beta ./
```

- *Este comando construye una imagen Docker a partir del `Dockerfile` en el directorio actual (`./`). El tag `d4nitrix13/flask:beta` se asigna a la imagen para facilitar su identificación y gestión.*

**Salida del Comando `docker build`:**

```bash
[+] Building 79.8s (11/11) FINISHED                                                                                                   docker:default
 => [internal] load build definition from Dockerfile                                                                                            0.0s
 => => transferring dockerfile: 2.96kB                                                                                                          0.0s
 => [internal] load metadata for docker.io/library/python:3.10                                                                                  1.8s
 => [internal] load .dockerignore                                                                                                               0.0s
 => => transferring context: 237B                                                                                                               0.0s
 => [1/6] FROM docker.io/library/python:3.10@sha256:09447073b9603858602b4a725ad92e4fd4c8f6979768cee295afae67fd997718                           64.4s
 => => resolve docker.io/library/python:3.10@sha256:09447073b9603858602b4a725ad92e4fd4c8f6979768cee295afae67fd997718                            0.0s
 => => sha256:903681d87777d28dc56866a07a2774c3fd5bf65fd734b24c9d0ecd9a13c9f636 49.55MB / 49.55MB                                               28.7s
 => => sha256:3cbbe86a28c2f6b3c3e0e8c6dcfba369e1ea656cf8daf69be789e0fe2105982b 24.05MB / 24.05MB                                               11.1s
 => => sha256:6ed93aa58a52c9abc1ee472f1ac74b73d3adcccc2c30744498fd5f14f3f5d22c 64.14MB / 64.14MB                                               18.8s
 => => sha256:09447073b9603858602b4a725ad92e4fd4c8f6979768cee295afae67fd997718 9.08kB / 9.08kB                                                  0.0s
 => => sha256:fa9d40f8c57e565b8496323b3650eeac0e55d870964bfeaa399c77565d855704 2.52kB / 2.52kB                                                  0.0s
 => => sha256:177d23d7dd98a40e68670acb8509555f74b3256d56577e63fd2723299b9e608b 7.28kB / 7.28kB                                                  0.0s
 => => sha256:787c78da43830be6d988d34c7ee091f98d828516ce5478ca10a4933d655191bf 211.24MB / 211.24MB                                             53.5s
 => => sha256:fedc1ae4a5668313ca9bc3a7dcde1efaac1b21be1a8abd65ab8ba6de2bc2f802 6.16MB / 6.16MB                                                 21.6s
 => => sha256:9c3d5faef3abb746eb2a33bfa1085a8ea5ba37d17daa259cae0409c8996c9910 17.15MB / 17.15MB                                               28.8s
 => => sha256:27c76a968f85ed9e1434931a3ffe103a1f2acefd0b1f8749825f9eb7780f0a8b 232B / 232B                                                     29.1s
 => => extracting sha256:903681d87777d28dc56866a07a2774c3fd5bf65fd734b24c9d0ecd9a13c9f636                                                       4.0s
 => => sha256:1b3529b158acff88f589cc2391ed566e0a6c5a8faa135b0c08ddace5b2817d85 3.08MB / 3.08MB                                                 30.5s
 => => extracting sha256:3cbbe86a28c2f6b3c3e0e8c6dcfba369e1ea656cf8daf69be789e0fe2105982b                                                       1.3s
 => => extracting sha256:6ed93aa58a52c9abc1ee472f1ac74b73d3adcccc2c30744498fd5f14f3f5d22c                                                       5.3s
 => => extracting sha256:787c78da43830be6d988d34c7ee091f98d828516ce5478ca10a4933d655191bf                                                       9.0s
 => => extracting sha256:fedc1ae4a5668313ca9bc3a7dcde1efaac1b21be1a8abd65ab8ba6de2bc2f802                                                       0.3s
 => => extracting sha256:9c3d5faef3abb746eb2a33bfa1085a8ea5ba37d17daa259cae0409c8996c9910                                                       0.7s
 => => extracting sha256:27c76a968f85ed9e1434931a3ffe103a1f2acefd0b1f8749825f9eb7780f0a8b                                                       0.0s
 => => extracting sha256:1b3529b158acff88f589cc2391ed566e0a6c5a8faa135b0c08ddace5b2817d85                                                       0.3s
 => [internal] load build context                                                                                                               0.0s
 => => transferring context: 275B                                                                                                               0.0s
 => [2/6] WORKDIR /App                                                                                                                          0.8s
 => [3/6] RUN python3 -m venv ./.venv                                                                                                           7.1s
 => [4/6] COPY ./requirements.txt ./                                                                                                            0.0s
 => [5/6] RUN pip install -r ./requirements.txt                                                                                                 4.9s
 => [6/6] COPY ./ ./                                                                                                                            0.1s
 => exporting to image                                                                                                                          0.6s
 => => exporting layers                                                                                                                         0.6s
 => => writing image sha256:5b87152169f2f11750708eb09987eb31f2f57a98e77ddea9b850a97e44ff58cb                                                    0.0s
 => => naming to docker.io/d4nitrix13/flask:beta                                                                                                0.0s

 1 warning found (use docker --debug to expand):
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 57)
```

---

### ***Iniciar el Contenedor***

**Para iniciar un contenedor basado en la imagen creada, usamos el siguiente comando:**

```bash
docker run -it -p5000:5000 --rm d4nitrix13/flask:beta
```

**Salida del Comando `docker run`:**

```bash
 * Serving Flask app './src.app'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://172.17.0.2:5000
Press CTRL+C to quit
```

---

### ***Verificar el Funcionamiento del Servidor***

**Para comprobar que el servidor está funcionando correctamente, podemos ejecutar un comando dentro del contenedor en ejecución:**

```bash
docker exec -it $(docker ps -q) flask --help
```

**Salida del Comando `docker exec`:**

```bash
Usage: flask [OPTIONS] COMMAND [ARGS]...

  A general utility script for Flask applications.

  An application to load must be given with the '--app' option, 'FLASK_APP'
  environment variable, or with a 'wsgi.py' or 'app.py' file in the current
  directory.

Options:
  -e, --env-file FILE   Load environment variables from this file. python-
                        dotenv must be installed.
  -A, --app IMPORT      The Flask application or factory function to load, in
                        the form 'module:name'. Module can be a dotted import
                        or file path. Name is not required if it is

 'app.py'
                        or 'wsgi.py' or if a factory function is used.
  -h, --help            Show this message and exit.

Commands:
  routes     Show the routes for the app.
  run        Run a development server.
  shell      Run a shell for the app context.
  test       Run tests for the app.
```

- **Resumen:**

1. **Construcción de la Imagen Docker:** *Utilizamos `docker build -t d4nitrix13/flask:beta ./` para crear la imagen con el tag `beta`.*
2. **Ejecución del Contenedor:** *Usamos `docker run -it -p5000:5000 --rm d4nitrix13/flask:beta` para iniciar el contenedor y exponer el puerto 5000.*
3. **Verificación del Funcionamiento:** *Ejecutamos `docker exec -it $(docker ps -q) flask --help` para verificar el estado del servidor Flask dentro del contenedor.*

---

### ***Verificación del Servidor***

---

#### ***Realización de Peticiones***

1. **Petición a `localhost:5000`:**

   ```bash
   curl localhost:5000
   ```

   **Respuesta:**

   ```html
   <p>Hello, World!</p>
   ```

2. **Petición a `192.168.1.17:5000`:**

   ```bash
   curl 192.168.1.17:5000
   ```

   **Respuesta:**

   ```html
   <p>Hello, World!</p>
   ```

---

#### ***Registros del Servidor***

**Cuando se ejecuta el contenedor, los registros del servidor muestran las peticiones recibidas:**

```bash
docker run -it -p5000:5000 --rm d4nitrix13/flask:beta
 * Serving Flask app './src.app'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://172.17.0.2:5000
Press CTRL+C to quit
172.17.0.1 - - [30/Aug/2024 01:31:35] "GET / HTTP/1.1" 200 -
192.168.1.17 - - [30/Aug/2024 01:31:55] "GET / HTTP/1.1" 200 -
```

**Detalles:**

- **Petición desde `172.17.0.1`:** *El servidor recibió una petición GET a `/` y respondió con un estado HTTP 200.*
- **Petición desde `192.168.1.17`:** *El servidor también recibió una petición GET a `/` desde una IP externa y respondió con un estado HTTP 200.*

- **Resumen:**

- **Pruebas de Conexión:** *Las peticiones realizadas a `localhost:5000` y `192.168.1.17:5000` confirmaron que el servidor está funcionando correctamente y responde con el contenido esperado (`<p>Hello, World!</p>`).*
- **Registros del Servidor:** *Los registros muestran que el servidor Flask está funcionando y manejando peticiones adecuadamente.*

---

### ***Evaluación de Imágenes Docker***

**Al comparar las imágenes Docker construidas, se observa una diferencia significativa en el tamaño de la imagen `beta` en comparación con las versiones anteriores. Aquí están los detalles:**

---

#### ***Imágenes Docker***

```bash
docker images --all
REPOSITORY         TAG       IMAGE ID       CREATED          SIZE
d4nitrix13/flask   beta      5b87152169f2   19 minutes ago   1.03GB
d4nitrix13/flask   alpha     6eb51e40034d   40 minutes ago   190MB
d4nitrix13/flask   dev       31a3314b5881   2 hours ago      190MB
d4nitrix13/flask   latest    114137beafdb   3 hours ago      190MB
```

---

#### ***Análisis***

- **Imagen `beta`:** *La imagen construida con el tag `beta` tiene un tamaño de **1.03GB**. Esta imagen incluye Python y todas las dependencias necesarias para la aplicación Flask, lo que resulta en un tamaño significativamente mayor comparado con las versiones anteriores.*
- **Imágenes Anteriores (`alpha`, `dev`, `latest`):** *Estas imágenes pesan aproximadamente **190MB** cada una. Estas versiones son más ligeras porque están basadas en una configuración más simplificada.*

---

#### ***Costo y Beneficios***

**Beneficios de la Imagen `beta`:**

- **Configuración Simplificada:** *La imagen `beta` incluye todas las dependencias necesarias en un solo contenedor, lo que simplifica la configuración y evita la necesidad de configurar el entorno Python por separado.*

**Costo Adicional:**

- **Tamaño Mayor:** *La inclusión de Python y otras dependencias en la imagen `beta` aumenta su tamaño a **1.03GB**, lo que es considerablemente mayor que las imágenes anteriores.*

- **Resumen:**

*La imagen `beta` ofrece una configuración más sencilla al incluir todas las dependencias necesarias para la aplicación, pero a costa de un tamaño de imagen significativamente mayor. Esta elección puede ser preferible en entornos de desarrollo o pruebas donde la simplicidad de configuración es prioritaria. Sin embargo, para entornos de producción, puede ser beneficioso considerar el impacto del tamaño de la imagen en términos de almacenamiento y despliegue.*
