<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->
# ***Guía Docker***

*Esta guía proporciona una descripción general del uso de Docker con la imagen de Debian. Incluye ejemplos y explicaciones detalladas de comandos y opciones para ayudar a entender su funcionalidad.*

## ***Enlace a la imagen de Docker de Debian***

*Para obtener más información sobre la imagen oficial de Debian en Docker, visita el siguiente enlace: [Debian Docker Image](https://hub.docker.com/_/debian "https://hub.docker.com/_/debian").*

## ***Comandos Docker***

### ***Descargar una imagen de Docker***

```bash
docker image pull debian
```

> [!NOTE]
> *Este comando descarga la imagen oficial de Debian especificamente la **latest** desde Docker Hub.*

### ***Listar imágenes descargadas***

```bash
docker image list
docker image ls
docker images
```

*Estos comandos muestran una lista de todas las imágenes de Docker descargadas en tu sistema.*

**Alias:**

- *`docker image list` y `docker image ls` son alias de `docker images`.*

### ***Crear un contenedor***

```bash
docker container create --name debian-test debian
```

*Este comando crea un nuevo contenedor basado en la imagen de Debian y le asigna el nombre `debian-test`. El identificador generado es un hash SHA-256.*

### ***Listar contenedores***

```bash
docker container list
docker container list --all
docker container list -a
docker container ls -a
docker container ps -a
docker ps -a
```

*Estos comandos listan los contenedores de Docker en tu sistema. La opción `-a` o `--all` muestra todos los contenedores, incluidos los que están detenidos. El comando `ps` se deriva del comando Unix `ps`, que lista procesos, ya que los contenedores de Docker se ejecutan como procesos.*

**Alias:**

- *`docker container list --all`, `docker container list -a`, `docker container ls -a`, `docker container ps -a`, y `docker ps -a` son alias de `docker container list -a`.*

#### ***Ejemplo de salida***

```plaintext
CONTAINER ID   IMAGE         COMMAND   CREATED         STATUS                     PORTS     NAMES
87028a8008d1   debian        "bash"    4 minutes ago   Created                              debian-test
6010fb1763fd   hello-world   "/hello"  23 hours ago    Exited (0) 23 hours ago               competent_proskuriakova
7d774cb77e8a   hello-world   "/hello"  5 days ago      Exited (0) 5 days ago                 infallible_blackburn
```

### ***Desglose de la Salida de `docker ps -a`***

*La salida del comando `docker ps -a` proporciona información detallada sobre los contenedores de Docker en tu sistema. A continuación se explica el significado de cada columna:*

```plaintext
CONTAINER ID   IMAGE         COMMAND   CREATED         STATUS                     PORTS     NAMES
87028a8008d1   debian        "bash"    4 minutes ago   Created                              debian-test
```

- **CONTAINER ID:**  
  *Un identificador único (ID) para cada contenedor. En este ejemplo, `87028a8008d1` es el ID del contenedor. Este ID puede ser utilizado para referenciar y manipular el contenedor en comandos posteriores.*

- **IMAGE:**  
  *El nombre de la imagen de Docker a partir de la cual se creó el contenedor. En este caso, `debian` indica que la imagen utilizada es Debian.*

- **COMMAND:**  
  *El comando que se ejecutó al iniciar el contenedor. Aquí, `"bash"` indica que el contenedor se inicia con el shell Bash.*

- **CREATED:**  
  *El tiempo transcurrido desde que se creó el contenedor. En el ejemplo, `4 minutes ago` significa que el contenedor fue creado hace 4 minutos.*

- **STATUS:**  
  *El estado actual del contenedor. Los posibles estados incluyen:*
  - *`Created`: El contenedor ha sido creado pero no ha sido iniciado.*
  - *`Up`: El contenedor está en ejecución.*
  - *`Exited`: El contenedor se ha detenido.*
  - *`Paused`: El contenedor está en pausa.*
  - *`Restarting`: El contenedor se está reiniciando.*
  
  *En este caso, `Created` indica que el contenedor ha sido creado pero aún no ha sido iniciado.*

- **PORTS:**  
  *Los puertos que están expuestos por el contenedor y mapeados a puertos en el host. En el ejemplo proporcionado, esta columna está vacía, lo que indica que no se han mapeado puertos.*

- **NAMES:**  
  *El nombre asignado al contenedor. En este caso, `debian-test` es el nombre del contenedor.*

### ***Ejemplo de Salida con Múltiples Contenedores***

```plaintext
CONTAINER ID   IMAGE         COMMAND   CREATED         STATUS                     PORTS     NAMES
87028a8008d1   debian        "bash"    4 minutes ago   Created                              debian-test
6010fb1763fd   hello-world   "/hello"  23 hours ago    Exited (0) 23 hours ago               competent_proskuriakova
7d774cb77e8a   hello-world   "/hello"  5 days ago      Exited (0) 5 days ago                 infallible_blackburn
```

**En esta salida, podemos ver varios contenedores:**

- **CONTAINER ID:**  
  *`87028a8008d1`, `6010fb1763fd`, `7d774cb77e8a` son los IDs únicos de los contenedores.*

- **IMAGE:**  
  *`debian`, `hello-world` son las imágenes de las que se crearon los contenedores.*

- **COMMAND:**  
  *`"bash"`, `"/hello"` son los comandos que se ejecutaron al iniciar los contenedores.*

- **CREATED:**  
  *`4 minutes ago`, `23 hours ago`, `5 days ago` indican cuándo se crearon los contenedores.*

- **STATUS:**  
  *`Created`, `Exited (0) 23 hours ago`, `Exited (0) 5 days ago` muestran el estado actual de los contenedores. `Exited (0)` indica que los contenedores se detuvieron normalmente sin errores.*

- **PORTS:**  
  *Vacío en estos ejemplos, lo que significa que no hay puertos mapeados.*

- **NAMES:**  
  *`debian-test`, `competent_proskuriakova`, `infallible_blackburn` son los nombres de los contenedores, algunos de los cuales se generan automáticamente si no se especifican.*

*Esta explicación te ayudará a entender mejor la salida de los comandos de Docker y a interpretar la información mostrada sobre los contenedores en tu sistema.*

### ***Iniciar un contenedor***

```bash
docker container start debian-test
```

*Este comando inicia el contenedor `debian-test`.*

### ***Verificar los contenedores***

```bash
docker ps -a
```

*Este comando lista todos los contenedores. Si el comando `bash` no está corriendo, no habrá salida significativa.*

### ***Crear un contenedor con una terminal interactiva***

```bash
docker container create --interactive --tty --name debian-console debian
```

*Este comando crea un contenedor llamado `debian-console` con una terminal interactiva (TTY).*

*El comando `docker container create --interactive --tty --name debian-console debian` se utiliza para crear un nuevo contenedor de Docker a partir de la imagen de Debian con opciones específicas. A continuación se explica el significado de cada parámetro y opción:*

### ***Desglose del Comando***

```bash
docker container create --interactive --tty --name debian-console debian
```

- **docker container create:**  
  *Este es el comando principal de Docker para crear un nuevo contenedor. No inicia el contenedor, solo lo configura.*

- **--interactive (-i):**  
  *Esta opción mantiene abierta la entrada estándar (STDIN) del contenedor, incluso si no está adjunta. Es útil para permitir la entrada de usuario, como en una terminal interactiva.*

- **--tty (-t):**  
  *Esta opción asigna un pseudo-terminal (TTY) al contenedor, lo que le permite comportarse como si estuviera ejecutándose en una terminal. Esto es esencial para la interactividad y para programas que esperan una terminal (como Bash).*

- **--name debian-console:**  
  *Esta opción asigna un nombre específico (`debian-console`) al contenedor. Esto es útil para referenciar el contenedor fácilmente en comandos futuros sin tener que recordar o usar el ID del contenedor.*

- **debian:**  
  *Este es el nombre de la imagen a partir de la cual se creará el contenedor. En este caso, se está utilizando la imagen oficial de Debian.*

### ***Ejemplo de uso***

```bash
docker container create --interactive --tty --name debian-console debian
```

*Este comando crea un contenedor llamado `debian-console` basado en la imagen de Debian, con una configuración que permite la interactividad a través de un TTY. Aunque el contenedor se crea con este comando, no se inicia automáticamente.*

### ***Explicación detallada de cada parámetro***

- **docker container create:**  
  *Utilizado para definir un nuevo contenedor sin iniciar su ejecución.*

- **--interactive (-i):**  

  - **Significado:** *Mantiene STDIN abierto, permitiendo la entrada interactiva.*
  - **Uso común:** *Necesario para operaciones interactivas como shell, aplicaciones que requieren entrada del usuario.*

- **--tty (-t):**  
  - **Significado:** *Asigna un TTY al contenedor.*
  - **Uso común:** *Facilita la ejecución de comandos que necesitan un terminal, mejora la interacción y salida formateada en la terminal.*

- **--name debian-console:**  
  - **Significado:** *Proporciona un nombre legible y fácil de recordar al contenedor.*
  - **Uso común:** *Simplifica la referencia y gestión del contenedor en comandos subsecuentes.*

- **debian:**  
  - **Significado:** *Especifica la imagen base para el contenedor.*
  - **Uso común:** *Determina el entorno y las herramientas disponibles dentro del contenedor.*

### ***Ejemplo de flujo completo***

1. **Crear el contenedor:**

   ```bash
   docker container create --interactive --tty --name debian-console debian
   ```

   *Esto crea el contenedor `debian-console` pero no lo inicia.*

2. **Iniciar el contenedor:**

   ```bash
   docker container start -i debian-console
   ```

   *Esto inicia el contenedor y adjunta la entrada estándar, permitiendo la interacción en tiempo real.*

3. **Salir del contenedor:**

   *Dentro del contenedor, puedes usar el comando `exit` para detener el contenedor y salir de la sesión interactiva.*

```plaintext
root@bd601214bedd:/# exit
```

*Este flujo permite crear, iniciar y trabajar interactivamente con el contenedor, facilitando tareas como pruebas, desarrollo y administración del sistema dentro del contenedor de Docker.*

### ***Iniciar un contenedor con una terminal interactiva***

```bash
docker container start -i debian-console
```

*Este comando inicia el contenedor `debian-console` y adjunta la entrada estándar (STDIN).*

#### ***Salida esperada***

```plaintext
root@bd601214bedd:/#
```

*Para salir de la terminal del contenedor, usa el comando `exit`.*

### ***Explicación de opciones y conceptos técnicos***

- **SHA-256:** *Es una función de hash que genera una representación única de los datos.*
- **STDIN:** *Entrada estándar, que se refiere a la entrada de datos que un programa puede recibir.*
- **TTY (teletipo):** *Dispositivo que muestra la salida estándar de un programa.*

### ***Uso de TTY y salida estándar***

*En sistemas Unix, los comandos como `ls` detectan si la salida es a un TTY (una terminal) y ajustan su formato. Por ejemplo:*

```bash
ls --color=auto
```

*Muestra ficheros con color en una terminal. Si redirigimos la salida a un fichero, el color se omite.*

```bash
/usr/bin/ls --color=auto > ./fichero.txt
cat ./fichero.txt
```

**Salida esperada:**

```plaintext
Descargas
Desktop
Documentos
fichero.txt
font
fonts
--help
Imágenes
Música
Plantillas
Público
raylib
snap
Vídeos
```

**Buscar un fichero específico:**

```bash
/usr/bin/ls --color=auto ./ | grep Desktop
```

**Salida esperada:**

```plaintext
Desktop
```

### ***Listar imágenes de Docker***

```bash
docker images
```

**Alias:**

- *`docker images` es un alias de `docker image list`.*

**Ejemplo de salida:**

```plaintext
REPOSITORY        TAG       IMAGE ID       CREATED         SIZE
debian            latest    5027089adc4c   2 weeks ago     117MB
hello-world       latest    d2c94e258dcb   13 months ago   13.3kB
```

### ***Desglose de la Salida de `docker images`***

*La salida del comando `docker images` proporciona información sobre las imágenes de Docker disponibles en tu sistema. A continuación se explica el significado de cada columna:*

```plaintext
REPOSITORY        TAG       IMAGE ID       CREATED         SIZE
debian            latest    5027089adc4c   2 weeks ago     117MB
hello-world       latest    d2c94e258dcb   13 months ago   13.3kB
```

- **REPOSITORY:**  
  *El nombre del repositorio de la imagen. Este nombre suele ser el nombre del software o del sistema operativo. En el ejemplo, `debian` y `hello-world` son los nombres de los repositorios.*

- **TAG:**  
  *La etiqueta asignada a la imagen, que generalmente especifica una versión o variante de la imagen. En este caso, `latest` indica la versión más reciente de la imagen.*

- **IMAGE ID:**  
  *El identificador único de la imagen. En este ejemplo, `5027089adc4c` y `d2c94e258dcb` son los IDs de las imágenes de Debian y Hello World, respectivamente. Este ID puede ser utilizado para referenciar y manipular la imagen en comandos posteriores.*

- **CREATED:**  
  *La fecha en que la imagen fue creada. Esto puede indicar cuándo se construyó la imagen o cuándo se publicó en Docker Hub. En este caso, `2 weeks ago` y `13 months ago` muestran cuándo se crearon estas imágenes específicas.*

- **SIZE:**  
  *El tamaño de la imagen en disco. Esto indica cuánto espacio ocupará la imagen una vez descargada. En el ejemplo, `117MB` y `13.3kB` son los tamaños de las imágenes de Debian y Hello World, respectivamente.*

- **Ejemplo de salida**

```plaintext
REPOSITORY        TAG       IMAGE ID       CREATED         SIZE
debian            latest    5027089adc4c   2 weeks ago     117MB
hello-world       latest    d2c94e258dcb   13 months ago   13.3kB
```

- **debian:**  
  - **TAG:** *`latest` (la versión más reciente de Debian disponible en Docker Hub).*
  - **IMAGE ID:** *`5027089adc4c` (identificador único de la imagen).*
  - **CREATED:** *`2 weeks ago` (imagen creada hace 2 semanas).*
  - **SIZE:** *`117MB` (tamaño de la imagen).*

- **hello-world:**  
  - **TAG:** *`latest` (la versión más reciente de Hello World).*
  - **IMAGE ID:** *`d2c94e258dcb` (identificador único de la imagen).*
  - **CREATED:** *`13 months ago` (imagen creada hace 13 meses).*
  - **SIZE:** *`13.3kB` (tamaño de la imagen).*

*Esta información es útil para gestionar y limpiar imágenes en tu sistema, asegurándote de que tienes las versiones correctas y entendiendo el espacio que ocupan.*
