<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->
# ***Formas de Detener Contenedores en Docker***

- *Para detener contenedores en Docker, es importante conocer las diferentes opciones y comandos disponibles. Aquí te mostramos varias formas de hacerlo, basándonos en la [documentación oficial](https://docs.docker.com/reference/cli/docker/container/ls/ "https://docs.docker.com/reference/cli/docker/container/ls/").*

## ***Salir y Detener Contenedores con `exit`***

- *Normalmente, usamos `exit` para salir y detener un contenedor. Sin embargo, si cerramos la terminal donde se está ejecutando el proceso del contenedor sin usar el comando `exit`, el proceso del contenedor continuará ejecutándose en segundo plano.*

## ***Iniciar un Contenedor sin la Opción `-i` (`--interactive`)***

- *Al iniciar un contenedor sin la opción `-i`, no obtendremos la shell del contenedor, ya que la entrada estándar (stdin) no estará abierta. Aquí hay un ejemplo:*

```bash
docker start debian-3
```

*Al ejecutar `docker ps`, podemos ver que el contenedor está en ejecución pero no tenemos acceso a la shell:*

```bash
docker ps
```

```txt
CONTAINER ID   IMAGE     COMMAND   CREATED        STATUS         PORTS     NAMES
385d36137fef   debian    "bash"    19 hours ago   Up 8 seconds             debian-3
```

*Esto ocurre porque no usamos `-i` al iniciar el contenedor.*

## ***Detener un Contenedor desde el Host***

**Podemos detener un contenedor utilizando el siguiente comando:**

```bash
docker container stop <nombre-contenedor> <id-contenedor>
```

**Es posible usar una porción del ID del contenedor en lugar del nombre completo. Por ejemplo:**

```bash
docker container stop 385d36137fef
```

- *Ahora, `385d36137fef` es una porción del ID del contenedor `debian-3`. No es necesario proporcionar todo el ID; con pasarle los primeros 3 caracteres es suficiente. Es muy poco probable que las primeras 3 letras coincidan, a menos que tengas una cantidad extremadamente alta de contenedores. En el caso improbable de que coincidan los primeros 3 caracteres, puedes simplemente agregar un carácter más para asegurar la unicidad.*

```bash
docker container stop 385
```

- *Este comando realiza un apagado controlado (graceful shutdown), lo que permite que el contenedor finalice sus operaciones y libere recursos adecuadamente.*

- *En Linux, un "graceful shutdown" se refiere a un proceso de apagado del sistema o cierre de un servicio que se lleva a cabo de manera ordenada y controlada. En contraste con un apagado brusco o forzado, un "graceful shutdown" permite que los servicios o procesos finalicen correctamente y que los recursos se liberen adecuadamente antes de que el sistema o el servicio se detengan por completo.*

- *Cuando se realiza un "graceful shutdown", los procesos y servicios activos reciben una señal para detenerse de manera ordenada. Estos procesos tienen la oportunidad de guardar su estado, cerrar ficheros abiertos, liberar recursos y realizar cualquier otra tarea necesaria para asegurar una terminación adecuada.*

- *Un "graceful shutdown" es importante porque ayuda a evitar la corrupción de datos y otros problemas que pueden surgir cuando los procesos o servicios se detienen abruptamente. Además, permite que el sistema o el servicio mantenga la integridad de sus datos y pueda reanudar sus operaciones de manera más eficiente cuando se reinicie.*

- *En resumen, un "graceful shutdown" en Linux es un procedimiento controlado y ordenado para detener servicios o procesos, garantizando que se realicen todas las tareas necesarias para una terminación adecuada antes de apagar completamente el sistema o el servicio.*

### ***Apagado Controlado (Graceful Shutdown)***

- *Un apagado controlado en Linux es un proceso de cierre ordenado que permite a los servicios finalizar correctamente, evitando la corrupción de datos y otros problemas.*

### ***Señal SIGTERM***

- *La señal SIGTERM solicita a un proceso que termine de manera controlada, permitiendo tareas de limpieza y liberación de recursos antes de finalizar.*

- *SIGTERM es una señal en los sistemas operativos basados en Unix, incluido Linux, que se utiliza para solicitar que un proceso se termine de manera controlada. SIGTERM, que es el acrónimo de "signal termination" (señal de terminación), es una señal de finalización suave que indica al proceso que debe finalizar sus operaciones y cerrarse de manera ordenada.*

- *Cuando un proceso recibe la señal SIGTERM, tiene la oportunidad de realizar tareas de limpieza y liberar recursos antes de finalizar. Por ejemplo, puede guardar ficheros, cerrar conexiones de red, liberar memoria y realizar otras acciones necesarias para asegurar una terminación adecuada.*

- *Es importante destacar que SIGTERM es una señal de terminación suave. A diferencia de señales más fuertes como SIGKILL, que termina un proceso de manera inmediata sin permitirle realizar ninguna tarea de limpieza, SIGTERM brinda al proceso la oportunidad de cerrarse correctamente.*

- *Los usuarios y administradores del sistema suelen enviar la señal SIGTERM a los procesos para solicitar su finalización de manera controlada. Esto se puede hacer utilizando comandos como `kill` en la línea de comandos de Unix o mediante herramientas específicas para el manejo de procesos.*

- *En resumen, SIGTERM es una señal en sistemas Unix que solicita a un proceso que termine de manera controlada, permitiéndole realizar tareas de limpieza y liberar recursos antes de finalizar.*

## ***Detener Inmediatamente un Contenedor***

- **Para detener un contenedor de inmediato, se utiliza SIGKILL:**

```bash
docker container kill 385
```

### ***Señal SIGKILL***

- *La señal SIGKILL termina un proceso de manera inmediata y sin permitir tareas de limpieza, lo que puede provocar pérdida de datos o dejar recursos en un estado inconsistente.*

- *SIGKILL es una señal en los sistemas operativos basados en Unix, incluido Linux, que se utiliza para terminar un proceso de manera inmediata y sin oportunidad de realizar acciones de limpieza o liberar recursos de manera ordenada. SIGKILL, que es el acrónimo de "signal kill" (señal de terminación), es una señal de terminación brusca que detiene el proceso de manera abrupta.*

- *Cuando un proceso recibe la señal SIGKILL, se termina de inmediato y no tiene la oportunidad de realizar tareas de limpieza o liberar recursos. Esto puede provocar la pérdida de datos o dejar recursos del sistema en un estado inconsistente, por lo que el uso de SIGKILL debe hacerse con precaución.*

- *Los usuarios y administradores del sistema a menudo recurren a SIGKILL cuando un proceso se ha vuelto no respondiente o está consumiendo demasiados recursos y no responde a las señales de terminación suave, como SIGTERM. Al enviar la señal SIGKILL a un proceso, se garantiza que se detendrá de inmediato, pero puede dejar ficheros temporales sin eliminar o bases de datos en un estado no consistente.*

- *Es importante tener en cuenta que SIGKILL es una medida extrema y no debe ser la primera opción para detener un proceso, ya que puede provocar pérdida de datos o corrupción del sistema. Se recomienda intentar primero una terminación suave utilizando la señal SIGTERM antes de recurrir a SIGKILL.*

## ***Detener un Contenedor desde el Contenedor Mismo***

- *Si cerramos la ventana donde se está ejecutando el proceso del contenedor o no iniciamos el contenedor con la opción `-i`, podemos usar:*

```bash
docker container attach <id-contenedor>
```

```bash
docker attach bd6
root@bd601214bedd:/# exit
exit
```

**Esto nos permite acoplarnos al contenedor en ejecución y ejecutar `exit` para detenerlo.**

## ***Iniciar y Adjuntar Múltiples Contenedores***

- *Para iniciar y adjuntar múltiples contenedores uno por uno en Docker, no se pueden iniciar y adjuntar varios contenedores en un solo comando. En su lugar, necesitas iniciar y adjuntar cada contenedor individualmente. A continuación, se muestra cómo puedes hacerlo usando sintaxis de Markdown y ejemplos de comandos:*

## ***Iniciar y adjuntar múltiples contenedores en Docker***

- *No es posible iniciar y adjuntar múltiples contenedores en un solo comando usando la opcion -i de --interactive. Debes hacerlo individualmente:*

```bash
docker container start -i debian-console debian-3 fedora-container fedora-2 arch 
you cannot start and attach multiple containers at once
```

**Para iniciar y adjuntar varios contenedores, debes hacerlo uno por uno. Aquí te mostramos cómo:**

### ***Iniciar y adjuntar contenedor Debian***

```bash
docker container start -i debian-console
```

### ***Iniciar y adjuntar contenedor Fedora***

```bash
docker container start -i fedora-container
```

### ***Iniciar y adjuntar otro contenedor Debian***

```bash
docker container start -i debian-3
```

### ***Iniciar y adjuntar otro contenedor Fedora***

```bash
docker container start -i fedora-2
```

### ***Iniciar y adjuntar contenedor Arch***

```bash
docker container start -i arch
```

```bash
docker container start -i debian-console
debian-console
docker container start -i fedora-container
fedora-container
docker container start -i debian-3
debian-3
docker container start -i fedora-2
fedora-2
docker container start -i arch
arch
```

## ***Detener Múltiples Contenedores***

**El subcomando `stop` acepta múltiples parámetros que pueden ser el id o el nombre del contenedor:**

```bash
docker stop arch fedora-2 fedora-container debian-3 debian-console
arch
fedora-2
fedora-container
debian-3
debian-console
```

### ***Detener Todos los Contenedores***

**Para detener todos los contenedores en ejecución:**

```bash
docker ps --help

Usage:  docker ps [OPTIONS]

List containers

Aliases:
  docker container ls, docker container list, docker container ps, docker ps

Options:
  -a, --all             Show all containers (default shows just running)
  -f, --filter filter   Filter output based on conditions provided
      --format string   Format output using a custom template:
                        'table':            Print output in table format with column headers (default)
                        'table TEMPLATE':   Print output in table format using the given Go template
                        'json':             Print in JSON format
                        'TEMPLATE':         Print output using the given Go template.
                        Refer to <https://docs.docker.com/go/formatting/> for more information about
                        formatting output with templates
  -n, --last int        Show n last created containers (includes all states) (default -1)
  -l, --latest          Show the latest created container (includes all states)
      --no-trunc        Don't truncate output
  -q, --quiet           Only display container IDs
  -s, --size            Display total file sizes
```

- **`docker ps -q`**

```bash
# $(docker ps -q) esto se lo podemos pasar como entrada a docker stop
docker ps -q
59542582c82c
f7fcead147f3
de6b2a9a4f21
385d36137fef
bd601214bedd
```

```bash
echo $(docker ps -q)
59542582c82c f7fcead147f3 de6b2a9a4f21 385d36137fef bd601214bedd
```

```bash
docker container stop $(docker ps -q)
```

```bash
docker container stop $(docker ps --quiet)
```

### ***Detener Contenedores por Nombre***

**Usa el filtro `--filter` para seleccionar contenedores por nombre:**

- *Ahora, podemos pasarle el parámetro `-q` o `--quiet` para ver solo los IDs de los contenedores:*

```bash
docker ps --filter "name=debian-*" --quiet
```

**El resultado será algo así:**

```txt
385d36137fef
bd601214bedd
```

## ***Formas de Acortar el Comando***

**Podemos acortar el comando de varias maneras. Por ejemplo:**

```bash
docker ps -f "name=debian-*" -q
```

- *También podemos hacerlo de la siguiente manera. Observa que la opción `-f` espera un parámetro, mientras que `-q` no. Por lo tanto, la forma correcta de combinar estas opciones es:*

```bash
docker ps -qf "name=debian-*"
```

**Si invertimos las opciones, el comando fallará porque `-f` interpretará `q` como su parámetro:**

### ***Forma Incorrecta***

```bash
docker ps -fq "name=debian-*"
```

```txt
invalid argument "q" for "-f, --filter" flag: bad format of filter (expected name=value)
See 'docker ps --help'.
```

### ***Forma Correcta***

```bash
docker ps -qf "name=debian-*"
```

**El resultado será:**

```txt
385d36137fef
bd601214bedd
```

**Para ver solo los IDs:**

```bash
docker ps --filter "name=debian-*" --quiet
```

**Detener estos contenedores:**

```bash
docker stop $(docker ps -qf "name=debian-*")
```

### ***Detener Contenedores por Imagen***

**Para detener contenedores que utilizan la misma imagen se usa `anecestor`:**

```bash
docker ps -f "ancestor=fedora"
docker stop $(!!)
docker stop $(docker ps -qf "ancestor=fedora")
```

*Recuerda que `!!` se sustituye por el último comando ejecutado, lo que facilita repetir comandos.*
