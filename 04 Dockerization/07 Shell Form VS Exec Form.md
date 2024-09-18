<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->

# ***Shell Form VS Exec Form***

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Las imágenes ya vienen actualizadas normalmente, por eso no es necesario poner `apt upgrade`
FROM ubuntu:22.04

# Para ejecutar comandos en el contenedor se usa la directiva `RUN`
RUN apt update \
    && apt install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt-get install -y nodejs

# Para indicar un directorio de trabajo, cabe recalcar que después de usar este comando nos encontraremos en el directorio /App
WORKDIR /App

# No es necesario poner `/App` (ruta absoluta) porque ya nos encontramos en ese directorio. Le podemos pasar la ruta relativa `./` o simplemente el punto `.`

COPY ./index.js ./

EXPOSE 3000

# Para poner en marcha el servidor HTTP lo hacemos mediante `CMD`. Normalmente es bash, pero en este caso ponemos `node ./index.js`. Recordar que ya estamos en el directorio /App.

# Shell form
CMD node ./index.js

# Exec form
# CMD ["node", "./index.js"]
```

- *`CMD ["node", "./index.js"]` es lo mismo que `CMD node ./index.js` pero tienen algunas diferencias.*

> [!CAUTION]
> *No se puede tener más de una directiva CMD en un fichero Dockerfile*

```Dockerfile
# Shell form
CMD node ./index.js
```

**Esta sintaxis se le conoce como formato array JSON:**

```Dockerfile
# Exec form
CMD ["node", "./index.js"]
```

**Cuando usamos shell form, el comando al iniciar el contenedor no es `node ./index.js`, sino que es `bash -c "node ./index.js"`. Esto lo podemos ver al hacer `docker ps -a`:**

```bash
docker ps -a
CONTAINER ID   IMAGE                   COMMAND                  CREATED       STATUS                      PORTS     NAMES
c404b9ce8667   user/node               "/bin/sh -c 'node ./…"   10 days ago   Exited (137) 45 hours ago             00-App-nodejs-v4
b064df325976   user/node:0.1.1         "/bin/sh -c 'node ./…"   10 days ago   Exited (130) 10 days ago              00-App-nodejs-v3
833b429d20c5   user/node:0.1.1         "/bin/sh -c 'node ./…"   10 days ago   Exited (130) 10 days ago              00-App-nodejs-v2
6f68557da99b   ubuntu:22.04            "/bin/bash"              2 weeks ago   Exited (137) 12 days ago              App-00-Nodejs
0f3fdde42f5a   ubuntu:22.04            "/bin/bash"              2 weeks ago   Exited (137) 2 weeks ago              test-client
```

- *Vemos que el COMMAND es `"/bin/sh -c 'node ./…'"` del contenedor `00-App-nodejs-v4` a diferencia de `"/bin/bash"` del contenedor `App-00-Nodejs`.*

- *`/bin/sh` es shell, similar a bash; de hecho, `sh` es un enlace simbólico a bash en algunos casos. Este shell tiene como opción `-c` de comando, que le permite pasar como parámetro el comando que quieres ejecutar sin necesidad de ejecutar una shell de bash y pasarle como entrada estándar los comandos.*

- *Entonces, Docker ejecuta `"/bin/sh -c 'node ./index.js'"`. Pero aquí hay algo curioso: al hacer esto `"/bin/sh -c 'node ./index.js'"` estamos ejecutando dos procesos: uno es el proceso padre `/bin/sh` y el proceso hijo es `node ./index.js`.*

**Veamos esto en la práctica ejecutando el contenedor:**

```bash
docker start -i 00-App-nodejs-v4 
Server running at http://0.0.0.0:3000/
```

**Veamos los procesos del contenedor con `docker top`:**

```bash
docker top 00-App-nodejs-v4 
UID                 PID                 PPID                C                   STIME               TTY                 TIME                CMD
root                47618               47596               0                   11:49               pts/0               00:00:00            /bin/sh -c node ./index.js
root                47643               47618               0                   11:49               pts/0               00:00:00            node ./index.js
```

- *Vemos que con Shell form los procesos son dos: el primero es `/bin/sh -c node ./index.js` y el segundo es `node ./index.js`, en el cual `node ./index.js` es hijo del de `/bin/sh -c node ./index.js`. Como el proceso del padre es un shell, controla lo que hace `node ./index.js`. Por ejemplo, si enviamos señales y hacemos `ctrl + c`:*

```bash
docker start -i 00-App-nodejs-v4 
Server running at http://0.0.0.0:3000/
^C
```

- *Esto se detiene porque `node index.js` se ejecuta dentro de un shell `/bin/sh` y para cancelar un programa en ejecución en la shell se hace `ctrl + c`. Esto envía una señal `SIGINT` al proceso de `node`, que por defecto interrumpe el proceso. Sin embargo, el `SIGINT` no va al programa de `node` sino al shell de `sh`, y como el shell `sh` es padre de `node ./index.js`, se detiene el proceso.*

- *Todo esto en el caso de shell form. En caso de exec form, la señal `SIGINT` la recibe el proceso de `node ./index.js` y no la shell.*

- *Ahora hablaremos a bajo nivel de cómo funciona `docker stop 00-App-nodejs-v4`.*

- **Por defecto, `docker stop 00-App-nodejs-v4` envía una señal `SIGTERM` al proceso principal del contenedor, que es `/bin/sh` y no `node`. Pero esa señal `SIGTERM` no la recibes en tu código:**

```javascript
// Autor: Daniel Benjamin Perez Morales
// GitHub: https://github.com/DanielPerezMoralesDev13
// Correo electrónico: danielperezdev@proton.me
const { createServer } = require('node:http');

const hostname = '0.0.0.0';
const port = 3000;

const server = createServer((req, res) => {
    console.log("Request from", req.socket.remoteAddress);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
```

- *A bajo nivel, `SIGINT` es una señal de interrupción que se utiliza en sistemas Unix y Unix-like (como Linux) para interrumpir un proceso. Aquí hay una descripción detallada de cómo funciona `SIGINT` a bajo nivel:*

---

## ***Señales en Unix***

- *En Unix, una señal es una notificación asíncrona enviada a un proceso o a un hilo en ejecución para notificarle que un evento particular ha ocurrido. Las señales son una forma de comunicación inter-proceso (IPC) que permiten a los procesos reaccionar a eventos específicos, como excepciones de hardware, eventos del sistema operativo, o interacciones de los usuarios.*

---

## ***`SIGINT` (Señal de Interrupción)***

- **Definición:** *`SIGINT` es la señal número 2 y es generada cuando el usuario presiona `Ctrl+C` en la terminal. El nombre "SIGINT" viene de "Signal Interrupt".*

- **Código de señal:** *El código de señal para `SIGINT` es 2.*

- **Propósito:** *Se utiliza para solicitar la interrupción de un proceso, típicamente por parte del usuario.*

- **Comportamiento predeterminado:** *El comportamiento predeterminado cuando un proceso recibe `SIGINT` es terminar el proceso de forma ordenada.*

---

## ***Envío de `SIGINT`***

- *Cuando el usuario presiona `Ctrl+C` en una terminal, el terminal envía la señal `SIGINT` a todos los procesos en el grupo de procesos que están asociados con esa terminal.*

---

## ***Recepción y Manejo de `SIGINT`***

**Un proceso puede recibir y manejar `SIGINT` de las siguientes maneras:**

1. **Comportamiento predeterminado:** *Terminar el proceso.*

2. **Ignorar la señal:** *Un proceso puede optar por ignorar `SIGINT` (aunque no es común hacerlo para esta señal).*

3. **Capturar la señal:** *Un proceso puede definir un manejador de señales personalizado para realizar acciones específicas cuando se recibe `SIGINT`.*

---

## ***Implementación de un Manejador de `SIGINT` en C***

**Aquí hay un ejemplo de cómo un programa en C puede manejar `SIGINT` usando la biblioteca de señales:**

```c
// Autor: Daniel Benjamin Perez Morales
// GitHub: https://github.com/DanielPerezMoralesDev13
// Correo electrónico: danielperezdev@proton.me
#include <stdio.h>
#include <stdlib.h>
#include <signal.h>
#include <unistd.h>

// Manejador de la señal SIGINT
void handle_sigint(int sig) {
    printf("Caught signal %d (SIGINT)\n", sig);
    exit(0);
}

int main() {
    // Registrar el manejador de la señal SIGINT
    signal(SIGINT, handle_sigint);

    printf("Running... Press Ctrl+C to interrupt\n");

    // Bucle infinito para mantener el programa en ejecución
    while (1) {
        sleep(1);
    }

    return 0;
}
```

---

## ***Ejecución del Código***

1. **Compila el programa:**

   ```bash
   gcc -o sigint_example sigint_example.c
   ```

2. **Ejecuta el programa:**

   ```bash
   ./sigint_example
   ```

3. **Presiona `Ctrl+C` para enviar `SIGINT` al programa y ver cómo se maneja.**

## ***Proceso Padre e Hijo con `SIGINT`***

- *Si un proceso padre crea un proceso hijo, y el hijo está ejecutando un comando en una shell (por ejemplo, `/bin/sh -c 'comando'`), `SIGINT` afecta al proceso padre. Sin embargo, en shell form, el proceso hijo (por ejemplo, `node ./index.js`) también recibe la señal `SIGINT` a través del proceso padre (`/bin/sh`).*

---

## ***Comportamiento en Docker***

- **Shell Form:** *Cuando se usa `CMD node ./index.js`, Docker ejecuta `/bin/sh -c 'node ./index.js'`, y `SIGINT` interrumpe el shell (`/bin/sh`), que a su vez interrumpe el proceso `node`.*
- **Exec Form:** *Cuando se usa `CMD ["node", "./index.js"]`, `SIGINT` se envía directamente al proceso `node`, permitiendo un manejo más directo y limpio de la señal.*

---

## ***Ejemplo de Dockerfile con Exec Form***

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me
FROM ubuntu:22.04
RUN apt update && apt install -y curl && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh && bash nodesource_setup.sh && apt-get install -y nodejs
WORKDIR /App
COPY ./index.js ./
EXPOSE 3000
# Shell form
# CMD node ./index.js

# Exec Form
CMD ["node", "./index.js"]
```

- *Al usar exec form (`CMD ["node", "./index.js"]`), las señales como `SIGINT` se manejan directamente por `node`, proporcionando un control más preciso sobre el proceso.*

- *La señal `SIGTERM` la recibe el shell `sh`, es decir, el proceso `/bin/sh`, pero el shell lo que hace es ignorarla. Si no hace nada durante 10 segundos, el comando  `docker stop 00-App-nodejs-v4` envía una señal `SIGKILL`. Por defecto son 10 segundos, pero ese valor se puede cambiar, así como la señal.*

**Ejemplo:**

- *Por defecto, la señal que se manda es `SIGTERM`, pero podemos cambiar qué señal se envía con `-s` y el tiempo de espera por defecto son 10 segundos, pero también podemos cambiar ese valor con `-t`.*

```bash
docker stop --help

Usage:  docker stop [OPTIONS] CONTAINER [CONTAINER...]

Stop one or more running containers

Aliases:
  docker container stop, docker stop

Options:
  -s, --signal string   Signal to send to the container
  -t, --time int        Seconds to wait before killing the container
```

**Iniciamos un contenedor para probar:**

```bash
docker start -i 00-App-nodejs-v4
Server running at http://0.0.0.0:3000/
```

**Enviamos una señal `SIGTERM` y si el proceso no finaliza durante 2 segundos, enviamos una señal `SIGKILL`:**

```bash
# Ejemplo 1
docker stop -t 2 00-App-nodejs-v4 
00-App-nodejs-v4
```

```bash
# Ejemplo 2
docker stop -t 3 -s "SIGKILL" 00-App-nodejs-v4 
00-App-nodejs-v4
```

```bash
# Ejemplo 3
docker stop -t 3 -s "SIGTERM" 00-App-nodejs-v4 
00-App-nodejs-v4
```

---

# ***Shell Form vs Exec Form***

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Las imágenes ya vienen actualizadas normalmente, por eso no es necesario poner `apt upgrade`
FROM ubuntu:22.04

# Para ejecutar comandos en el contenedor se usa la directiva `RUN`
RUN apt update \
    && apt install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt-get install -y nodejs

# Para indicar un directorio de trabajo cabe recalcar que después de usar este comando nos encontraremos en el directorio /App
WORKDIR /App

# No es necesario poner `/App` ruta absoluta porque ya nos encontramos en ese directorio, le podemos pasar la ruta relativa `./` o simplemente el punto `.`

COPY ./index.js ./

EXPOSE 3000

# Para poner en marcha el servidor HTTP lo hacemos mediante `CMD`. Normalmente es bash, pero en este caso ponemos `node ./index.js`. Recordar que ya estamos en el directorio /App

# Shell form
CMD node ./index.js $HOME

# Exec form
# CMD [ "node", "./index.js", "$HOME" ]
```

---

## ***Diferencias entre Shell Form y Exec Form***

- *`CMD ["node", "./index.js"]` es lo mismo que `CMD node ./index.js` pero tienen algunas diferencias.*

> [!CAUTION]
> *No se puede tener más de una directiva CMD en un fichero Dockerfile*

---

## ***Shell Form***

```Dockerfile
CMD node ./index.js
```

---

## ***Exec Form***

```Dockerfile
CMD [ "node", "./index.js" ]
```

- *Cuando usamos Shell Form, el comando al iniciar el contenedor no es `node ./index.js` sino `/bin/sh -c "node ./index.js"`. Esto lo podemos ver al hacer `docker ps -a`.*

```bash
docker ps -a
CONTAINER ID   IMAGE                   COMMAND                  CREATED       STATUS                      PORTS     NAMES
c404b9ce8667   user/node         "/bin/sh -c 'node ./…"   10 days ago   Exited (137) 45 hours ago             00-App-nodejs-v4
b064df325976   user/node:0.1.1   "/bin/sh -c 'node ./…"   10 days ago   Exited (130) 10 days ago              00-App-nodejs-v3
833b429d20c5   user/node:0.1.1   "/bin/sh -c 'node ./…"   10 days ago   Exited (130) 10 days ago              00-App-nodejs-v2
6f68557da99b   ubuntu:22.04            "/bin/bash"              2 weeks ago   Exited (137) 12 days ago              App-00-Nodejs
0f3fdde42f5a   ubuntu:22.04            "/bin/bash"              2 weeks ago   Exited (137) 2 weeks ago              test-client
```

- *Vemos que el COMMAND es "/bin/sh -c 'node ./…'" del contenedor `00-App-nodejs-v4` a diferencia de "/bin/bash" del contenedor `App-00-Nodejs`.*

- *`/bin/sh` es shell como bash, de hecho, sh es un enlace simbólico a `bash` o `dash` en algunos casos.*

- **En Linux, **Dash** es un intérprete de shell que se utiliza como un shell de inicio rápido y eficiente para sistemas Unix-like. A continuación, te explico qué es Dash y cómo se relaciona con tu consulta:**

---

### ***¿Qué es Dash?***

- *`Dash`, abreviatura de `"Debian Almquist Shell"`, es un intérprete de comandos diseñado para ser compatible con el estándar POSIX y se considera más ligero y rápido en comparación con otros shells como Bash. Se usa comúnmente como el intérprete de shell predeterminado para scripts de inicio y otras tareas de administración en distribuciones Linux, como Debian y sus derivadas.*

---

### ***Extraer mas informacion con lsd***

**En tu consulta específica:**

```bash
lsd -l /usr/bin/sh
```

**El resultado muestra que `/usr/bin/sh` está simbólicamente enlazado (`link simbólico`) a `Dash`:**

```bash
lrwxrwxrwx root root 4 B Fri Feb 16 12:25:17 2024  /usr/bin/sh ⇒ dash
```

- **`lrwxrwxrwx`:** *Indica que `/usr/bin/sh` es un enlace simbólico.*
- **`root root`:** *Especifica que el enlace simbólico pertenece al usuario `root` y al grupo `root`.*
- **`4 B`:** *Indica el tamaño del enlace simbólico en bytes.*
- **`Fri Feb 16 12:25:17 2024`:** *Es la fecha y hora en que se creó el enlace simbólico.*
- **``:** *Un carácter Unicode que indica un enlace simbólico.*
- **`dash`:** *El destino del enlace simbólico es el ejecutable `dash`.*

- *Este resultado indica que cuando se llama `/bin/sh` en tu sistema, en realidad se está ejecutando Dash. Esto es común en muchas distribuciones Linux donde `/bin/sh` apunta a un shell que cumple con el estándar POSIX para asegurar la compatibilidad y consistencia en los scripts y comandos del sistema.*

---

### ***Uso y Características de Dash***

- **Eficiencia:** *Dash está diseñado para ser rápido en la ejecución de scripts y tareas básicas de shell.*
- **Compatibilidad:** *Cumple con el estándar POSIX, lo que garantiza que los scripts escritos para Dash funcionen de manera consistente en diferentes sistemas Unix-like.*
- **Shell por Defecto:** *Aunque es ligero, no es tan interactivo o versátil como Bash, que es más comúnmente utilizado como shell interactivo por su rica funcionalidad y características adicionales.*

- *En resumen, Dash es un shell eficiente y ligero utilizado en muchos sistemas Linux, especialmente como el shell de inicio (`/bin/sh`) para scripts y tareas administrativas debido a su velocidad y conformidad con los estándares POSIX.*

- *Entonces este shell tiene como opción `-c` de comando que le puedes pasar como parámetro el comando que quieres ejecutar sin necesidad de ejecutar una shell de bash y pasarle como entrada estándar (stdin) los comandos.*

- *Entonces eso hace Docker `/bin/sh -c 'node ./index.js'`. Pero aquí hay algo curioso, al hacer esto `/bin/sh -c 'node ./index.js'` estamos ejecutando dos procesos: uno que es el proceso padre `/bin/sh` y como proceso hijo del `/bin/sh` el `node ./index.js`.*

**Entonces veamos esto en la práctica ejecutando el contenedor:**

```bash
docker start -i 00-App-nodejs-v4 
Server running at http://0.0.0.0:3000/
```

**Veamos los procesos del contenedor con `docker top`:**

```bash
docker top 00-App-nodejs-v4 
UID                 PID                 PPID                C                   STIME               TTY                 TIME                CMD
root                47618               47596               0                   11:49               pts/0               00:00:00            /bin/sh -c node ./index.js
root                47643               47618               0                   11:49               pts/0               00:00:00            node ./index.js
```

- *Vemos que los procesos son dos: el primero es `/bin/sh -c node ./index.js` y el segundo es `node ./index.js`, en el cual `node ./index.js` es hijo de `/bin/sh -c node ./index.js`.*

**Y como el proceso del padre es un shell, controla lo que hace `node ./index.js`, por ejemplo, si enviamos señales. Si quieres enviar una señal a este proceso `node ./index.js` y hacer `Ctrl + C`:**

```bash
docker start -i 00-App-nodejs-v4 
Server running at http://0.0.0.0:3000/
^C
```

- *Esto se detiene porque `node ./index.js` se ejecuta dentro de un shell `/bin/sh` y para cancelar un programa en ejecución en la shell se hace `Ctrl + C`.*

- *Lo que hace es enviar una señal SIGINT al proceso de `node`, que es una señal que se usa para interrumpir por consola. El comportamiento por defecto de SIGINT es terminar el proceso, pero el SIGINT no va al programa de `node` sino va al shell de `sh` y como el shell `sh` es padre de `node ./index.js`, se detiene el proceso.*

- *Todo esto en el caso de Shell Form. En el caso de Exec Form, la señal SIGINT la recibe el proceso de `node ./index.js`, no la shell.*

---

## ***Ejemplo de comportamiento con señales***

```javascript
// Autor: Daniel Benjamin Perez Morales
// GitHub: https://github.com/DanielPerezMoralesDev13
// Correo electrónico: danielperezdev@proton.me
const { createServer } = require('node:http');

const hostname = '0.0.0.0';
const port = 3000;

const server = createServer((req, res) => {
    console.log("Request from", req.socket.remoteAddress);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

// Ver si recibimos la señal SIGTERM
process.on("SIGTERM", () => {
    console.log("Received SIGTERM");
});

server.listen(port, hostname, () => {
    // Parámetros de consola es una lista
    console.log(process.argv);
    console.log(`Server running at http://${hostname}:${port}/`);
});
```

**Esto es un Signal Handler, es una función de código que se ejecuta al recibir una señal.**

```javascript
// Ver si recibimos la señal SIGTERM
process.on("SIGTERM", () => {
    console.log("Received SIGTERM");
});
```

- *Por el momento solo imprimimos si recibimos la señal SIGTERM (aunque ya sabemos que no la vamos a recibir porque el proceso principal es `/bin/sh`).*

**Con estos cambios, construimos la imagen:**

```bash
docker build -t d4nitrix13/node:shell ./
[+] Building 0.2s (9/9) FINISHED                                                                                                                  docker:default
 => [internal] load build definition from Dockerfile                                                                                                        0.0s
 => => transferring dockerfile: 1.09kB                                                                                                                      0.0s
 => [internal] load metadata for docker.io/library/ubuntu:22.04                                                                                             0.0s
 => [internal] load .dockerignore                                                                                                                           0.0s
 => => transferring context: 2B                                                                                                                             0.0s
 => [1/4] FROM docker.io/library/ubuntu:22.04                                                                                                               0.0s
 => [internal] load build context                                                                                                                           0.0s
 => => transferring context: 30B                                                                                                                            0.0s
 => CACHED [2/4] RUN apt update     && apt install -y curl     && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh     && bash node  0.0s
 => CACHED [3/4] WORKDIR /App                                                                                                                               0.0s
 => CACHED [4/4] COPY ./index.js ./                                                                                                                         0.0s
 => exporting to image                                                                                                                                      0.0s
 => => exporting layers                                                                                                                                     0.0s
 => => writing image sha256:2876161431439194f34e9a79335ab94818fb79619f3884782d188227a83341dd                                                                0.0s
 => => naming to docker.io/d4nitrix13/node:shell                                                                                                            0.0s
```

**Al crear el contenedor, lo que vemos es:**

```bash
docker run -it --name 00-App-nodejs-shell d4nitrix13/node:shell 
[ '/usr/bin/node', '/App/index.js', '/root' ]
Server running at http://0.0.0.0:3000/
```

- *Como observarán, `[ '/usr/bin/node', '/App/index.js', '/root' ]` es el array de comandos.*

```Dockerfile
CMD node ./index.js $HOME
```

**`$HOME` se sustituyó con `/root`, Shell Form sustituye todo esto.**

```javascript
// Parámetros de consola es una lista
console.log(process.argv);
```

- *Entonces, si hacemos un `docker stop` al contenedor `00-App-nodejs-shell`:*

```Dockerfile
docker stop -t 5 00-App-nodejs-shell 
00-App-nodejs-shell
```

**Esto se puede simplificar juntándolo:**

```Dockerfile
docker stop -t5 00-App-nodejs-shell 
00-App-nodejs-shell
```

- **La salida no muestra nada, no se imprimió "Received SIGTERM".**

```bash
docker run -it --name 00-App-nodejs-shell d4nitrix13/node:shell 
[ '/usr/bin/node', '/App/index.js', '/root' ]
Server running at http://0.0.0.0:3000/
```

- *Un **Signal Handler** (manejador de señales) es una función en un programa que se ejecuta en respuesta a una señal del sistema operativo. Las señales son una forma de comunicación entre el sistema operativo y los procesos, o entre los propios procesos, que permiten interrumpir la ejecución normal de un programa para manejar eventos asíncronos. Las señales se utilizan para notificar a un proceso sobre ciertos eventos, como interrupciones del usuario, excepciones o condiciones de error.*

---

### ***Señales en Sistemas Operativos Unix y Linux***

- **En sistemas operativos basados en Unix y Linux, las señales son identificadores numéricos que representan diferentes tipos de eventos. Algunos ejemplos comunes de señales son:**

- **`SIGINT` (2):** *Interrupción desde el teclado (usualmente Ctrl+C).*
- **`SIGTERM` (15):** *Solicitud de terminación del proceso.*
- **`SIGKILL` (9):** *Terminación forzada del proceso (no se puede capturar ni ignorar).*
- **`SIGSEGV` (11):** *Error de segmentación (acceso a memoria inválido).*

---

## ***Funcionamiento a Bajo Nivel***

1. **Generación de Señales:**

    - *Las señales pueden ser enviadas por el sistema operativo, otro proceso o por el propio proceso mediante llamadas del sistema como `kill()`, `raise()`, o comandos de terminal como `kill`.*
  
2. **Entrega de Señales:**

    - *Cuando se envía una señal a un proceso, el sistema operativo interrumpe la ejecución normal del proceso para manejar la señal. Cada señal tiene un número asociado y una acción por defecto.*

3. **Manejadores de Señales (Signal Handlers):**

    - *Un proceso puede cambiar la acción por defecto para una señal registrando un manejador de señales. Esto se hace utilizando funciones como `signal()` o `sigaction()`. Un manejador de señales es una función definida por el usuario que se ejecuta cuando el proceso recibe la señal específica.*

---

## ***Ejemplo en C***

**A continuación se muestra un ejemplo de un manejador de señales en C:**

```c
// Autor: Daniel Benjamin Perez Morales
// GitHub: https://github.com/DanielPerezMoralesDev13
// Correo electrónico: danielperezdev@proton.me
#include <stdio.h>
#include <stdlib.h>
#include <signal.h>
#include <unistd.h>

// Definición del manejador de señales
void signal_handler(int signal_number) {
    if (signal_number == SIGINT) {
        printf("Received SIGINT (Ctrl+C). Exiting gracefully...\n");
        exit(0);
    }
}

int main() {
    // Registro del manejador de señales para SIGINT
    signal(SIGINT, signal_handler);

    // Bucle infinito para mantener el programa en ejecución
    while (1) {
        printf("Running... Press Ctrl+C to stop.\n");
        sleep(1);
    }

    return 0;
}
```

---

## ***Desglose del Ejemplo***

1. **Registro del Manejador:**

    ```c
    signal(SIGINT, signal_handler);
    ```

    - *Esto registra la función `signal_handler` como el manejador para la señal `SIGINT`. Cuando se recibe `SIGINT`, la función `signal_handler` será llamada.*

2. **Manejador de Señales:**

    ```c
    void signal_handler(int signal_number) {
        if (signal_number == SIGINT) {
            printf("Received SIGINT (Ctrl+C). Exiting gracefully...\n");
            exit(0);
        }
    }
    ```

    - *Esta función imprime un mensaje y termina el programa cuando se recibe `SIGINT`.*

3. **Bucle Infinito:**

    ```c
    while (1) {
        printf("Running... Press Ctrl+C to stop.\n");
        sleep(1);
    }
    ```

    - *Esto mantiene el programa en ejecución, permitiendo que el usuario pueda enviar `SIGINT` (Ctrl+C) para probar el manejador de señales.*

---

## ***Consideraciones Importantes***

- **Seguridad del Manejador:**

  - *Los manejadores de señales deben ser simples y rápidos. Realizar operaciones complejas o llamadas no seguras en un manejador de señales puede causar comportamientos inesperados.*

- **Reentrada:**

  - *Los manejadores de señales deben ser reentrantes, lo que significa que deben poder ser interrumpidos y llamados nuevamente sin causar problemas.*

- **Acciones por Defecto:**
  
  - *Si no se registra un manejador para una señal específica, el sistema operativo realizará una acción por defecto, como terminar el proceso o ignorar la señal.*

*En resumen, un Signal Handler es una técnica crucial en programación de sistemas para manejar eventos asíncronos de manera controlada y segura, permitiendo a los programas reaccionar a condiciones externas y eventos inesperados.*

---

### ***Modificación del Dockerfile para usar la forma Exec***

***Para cambiar el Dockerfile y utilizar la forma Exec en lugar de la forma Shell, seguimos estos pasos detallados:***

---

#### ***Dockerfile***

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# La imagen base ya viene actualizada normalmente, por lo que no es necesario usar `apt upgrade`
FROM ubuntu:22.04

# Ejecutar comandos en el contenedor usando la directiva `RUN`
RUN apt update \
    && apt install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt-get install -y nodejs

# Indicar un directorio de trabajo; después de usar este comando, nos encontraremos en el directorio /App
WORKDIR /App

# No es necesario poner la ruta absoluta `/App` porque ya estamos en ese directorio; se puede usar la ruta relativa `./`
COPY ./index.js ./

EXPOSE 3000

# Shell form
# CMD node ./index.js $HOME

# Poner en marcha el servidor HTTP usando la forma Exec (formato JSON)
CMD ["node", "./index.js", "$HOME"]
```

---

#### ***Construcción de la imagen***

```bash
docker build -t d4nitrix13/node:exec ./
[+] Building 0.2s (9/9) FINISHED                                                                                                      docker:default
 => [internal] load build definition from Dockerfile                                                                                            0.0s
 => => transferring dockerfile: 1.16kB                                                                                                          0.0s
 => [internal] load metadata for docker.io/library/ubuntu:22.04                                                                                 0.0s
 => [internal] load .dockerignore                                                                                                               0.0s
 => => transferring context: 2B                                                                                                                 0.0s
 => [1/4] FROM docker.io/library/ubuntu:22.04                                                                                                   0.0s
 => [internal] load build context                                                                                                               0.0s
 => => transferring context: 30B                                                                                                                0.0s
 => CACHED [2/4] RUN apt update     && apt install -y curl     && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh       0.0s
 => CACHED [3/4] WORKDIR /App                                                                                                                   0.0s
 => CACHED [4/4] COPY ./index.js ./                                                                                                             0.0s
 => exporting to image                                                                                                                          0.0s
 => => exporting layers                                                                                                                         0.0s
 => => writing image sha256:9ef2a364bb415323f32f4864d5994e89fdb8d537c7e5a6f3750d8e1d8b548df0                                                    0.0s
 => => naming to docker.io/d4nitrix13/node:exec                                                                                                 0.0s
```

---

#### ***Crear e iniciar el contenedor***

```bash
docker run -it --name 00-App-nodejs-exec d4nitrix13/node:exec
[ '/usr/bin/node', '/App/index.js', '$HOME' ]
Server running at http://0.0.0.0:3000/
```

- **Podemos observar que `['/usr/bin/node', '/App/index.js', '$HOME']` muestra `$HOME` en lugar de `/root`, porque estos comandos no pasan por `/bin/sh`.**

---

#### ***Ver los procesos del contenedor***

```bash
docker ps
CONTAINER ID   IMAGE                  COMMAND                  CREATED              STATUS              PORTS      NAMES
9f2322ac7e45   d4nitrix13/node:exec   "node ./index.js $HO…"   About a minute ago   Up About a minute   3000/tcp   00-App-nodejs-exec
```

- *El proceso en `COMMAND` es `"node ./index.js $HO…"`. Si hacemos `Ctrl + C`, no pasará nada porque `node` no es un shell.*

```bash
docker run -it --name 00-App-nodejs-exec d4nitrix13/node:exec
[ '/usr/bin/node', '/App/index.js', '$HOME' ]
Server running at http://0.0.0.0:3000/
^C^C^C^C^C
```

---

#### ***Ver los procesos dentro del contenedor***

```bash
docker top 00-App-nodejs-exec
UID                 PID                 PPID                C                   STIME               TTY                 TIME                CMD
root                128983              128960              0                   13:21               pts/0               00:00:00            node ./index.js $HOME
```

**Solo hay un proceso. Si enviamos una señal SIGTERM al proceso de Node.js a través de `docker stop`:**

```bash
docker stop -t 3 00-App-nodejs-exec
00-App-nodejs-exec
```

**Veremos que recibe la señal, pero solo imprimimos un mensaje y no hacemos nada más:**

```bash
docker run -it --name 00-App-nodejs-exec d4nitrix13/node:exec
[ '/usr/bin/node', '/App/index.js', '$HOME' ]
Server running at http://0.0.0.0:3000/
^C^C^C^C^CReceived SIGTERM
```

- *Después de tres segundos, el sistema enviará la señal SIGKILL. Para finalizar el proceso correctamente en el código, hacemos lo siguiente:*

---

#### ***Código JavaScript***

```javascript
// Autor: Daniel Benjamin Perez Morales
// GitHub: https://github.com/DanielPerezMoralesDev13
// Correo electrónico: danielperezdev@proton.me
const { createServer } = require('node:http');

const hostname = '0.0.0.0';
const port = 3000;

const server = createServer((req, res) => {
    console.log("Request from", req.socket.remoteAddress);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

// Ver si recibimos la señal SIGTERM
process.on("SIGTERM", () => {
    console.log("Received SIGTERM");
    // Limpiar Sockets, Ficheros, Liberar memoria
    process.exit(0);
});

server.listen(port, hostname, () => {
    // Parámetros de consola es una lista
    console.log(process.argv);
    console.log(`Server running at http://${hostname}:${port}/`);
});
```

---

#### ***Reconstruir la imagen con el mismo tag***

```bash
docker build -t d4nitrix13/node:exec ./
[+] Building 0.2s (9/9) FINISHED                                                                                                      docker:default
 => [internal] load build definition from Dockerfile                                                                                            0.0s
 => => transferring dockerfile: 1.16kB                                                                                                          0.0s
 => [internal] load metadata for docker.io/library/ubuntu:22.04                                                                                 0.0s
 => [internal] load .dockerignore                                                                                                               0.0s
 => => transferring context: 2B                                                                                                                 0.0s
 => [1/4] FROM docker.io/library/ubuntu:22.04                                                                                                   0.0s
 => [internal] load build context                                                                                                               0.0s
 => => transferring context: 798B                                                                                                               0.0s
 => CACHED [2/4] RUN apt update     && apt install -y curl     && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh       0.0s
 => CACHED [3/4] WORKDIR /App                                                                                                                   0.0s
 => [4/4] COPY ./index.js ./                                                                                                                    0.0s
 => exporting to image                                                                                                                          0.0s
 => => exporting layers                                                                                                                         0.0s
 => => writing image sha256:ee87e1b066d01b94b8477c81e73fb59004c2a05fcfeeb1dc41e104e00ca83ecc                                                    0.0s
 => => naming to docker.io/d4nitrix13/node:exec                                                                                                 0.0s
```

---

#### ***Eliminar y crear el contenedor nuevamente***

```bash
docker rm 00-App-nodejs-exec
00-App-nodejs-exec
```

```bash
docker run -it --name 00-App-nodejs-exec d4nitrix13/node:exec
[ '/usr/bin/node', '/App/index.js', '$HOME' ]
Server running at http://0.0.0.0:3000/
```

---

#### ***Detener el contenedor***

```bash
docker stop -t 3 00-App-nodejs-exec
00-App-nodejs-exec
```

**El proceso termina al instante con la señal SIGTERM, no SIGKILL:**

```bash
docker run -it --name 00-App-nodejs-exec d4nitrix13/node:exec
[ '/usr/bin/node', '/App/index.js', '$HOME' ]
Server running at http://0.0.0.0:3000/
Received SIGTERM
```

- **Ahora, el proceso Node.js maneja correctamente la señal SIGTERM y termina de manera ordenada, limpiando los recursos necesarios antes de salir.**

#### ***Resumen de la sección***

---

#### ***Images de cancelacion de programa de node en un shell sh***

- *![images de cancelacion de programa de node en un shell sh](../images/images%20de%20cancelacion%20de%20programa%20de%20node%20en%20un%20shell%20sh.png "images de cancelacion de programa de node en un shell sh.png")*

---

#### ***images diferencias entre Shell Form y Exec Form***

- *![images de caracterisitica de shell form](../images/images%20de%20caracterisitica%20de%20shell%20form.png "images de caracterisitica de shell form.png")*

---

#### ***Images diferencias entre Shell Form y Exec Form***

- *![images diferencias entre Shell Form y Exec Form](../images/images%20diferencias%20entre%20Shell%20Form%20y%20Exec%20Form.png "images diferencias entre Shell Form y Exec Form.png")*
