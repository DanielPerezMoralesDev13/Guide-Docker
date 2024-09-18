<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->
# ***Formas de borrar contenedores e imágenes en Docker***

---

## ***Borrar contenedores detenidos***

- *El subcomando `remove` acepta más de un parámetro, lo que permite eliminar múltiples contenedores usando sus IDs o nombres.*

**Para eliminar contenedores específicos:**

```bash
docker container remove <id-contenedor>
docker container remove <nombre-contenedor>
```

**Por ejemplo, si queremos eliminar contenedores cuya imagen es `hello-world`, el comando sería:**

```bash
docker container remove 6010fb1763fd infallible_blackburn
```

**Salida esperada:**

```bash
6010fb1763fd
infallible_blackburn
```

- *Eliminar un contenedor usando el subcomando `remove` es irreversible, similar al comando `rm` en Linux.*

**Alias del subcomando `remove`:**

```bash
docker container remove
# alias
docker container rm
# alias
docker rm
```

**Para borrar todos los contenedores detenidos:**

```bash
docker rm $(docker ps -aq)
```

---

## ***Ejemplo práctico***

1. *Crear varios contenedores con diferentes imágenes:*

    ```bash
    docker create -it --name debian-1 debian
    docker create -it --name debian-2 debian
    docker create -it --name fedora-1 fedora
    docker create -it --name fedora-2 fedora
    docker create -it --name arch archlinux
    ```

2. *Listar todos los contenedores creados:*

    ```bash
    docker ps -a
    ```

    Salida esperada:

    ```bash
    CONTAINER ID   IMAGE       COMMAND           CREATED         STATUS    PORTS     NAMES
    0ca04bcc3a9e   archlinux   "/usr/bin/bash"   3 minutes ago   Created             arch
    a98390bca508   fedora      "/bin/bash"       3 minutes ago   Created             fedora-2
    19bab41fe933   fedora      "/bin/bash"       3 minutes ago   Created             fedora-1
    81e4817e25a9   debian      "bash"            3 minutes ago   Created             debian-2
    e71af5e0018b   debian      "bash"            3 minutes ago   Created             debian-1
    ```

3. *Para borrar contenedores con nombre que contenga "debian":*

    ```bash
    docker rm $(docker ps -aqf "name=debian-*")
    ```

4. *Para borrar contenedores creados a partir de la imagen `fedora`:*

    ```bash
    docker rm $(docker ps -aqf "ancestor=fedora")
    ```

**Es importante recalcar que el estado de un contenedor detenido puede variar. Por ejemplo:**

```bash
docker ps -a
CONTAINER ID   IMAGE       COMMAND           CREATED          STATUS    PORTS     NAMES
0ca04bcc3a9e   archlinux   "/usr/bin/bash"   33 minutes ago   Created             arch
```

- *Aquí, el contenedor `arch` está en estado `Created`, lo que significa que ha sido creado pero no utilizado.*

**Si iniciamos y detenemos el contenedor, su estado cambia a `Exited`:**

```bash
docker start -i arch
[root@0ca04bcc3a9e /]# exit
exit

docker ps -a
CONTAINER ID   IMAGE       COMMAND           CREATED          STATUS                    PORTS     NAMES
0ca04bcc3a9e   archlinux   "/usr/bin/bash"   34 minutes ago   Exited (0) 1 second ago             arch
```

**En resumen:**

- **Created:** *El contenedor ha sido creado pero no se ha iniciado.*
- **Exited:** *El contenedor se ha iniciado y detenido posteriormente.*

**Creamos nuevos contenedores para los siguientes ejemplos:**

```bash
docker ps -a
CONTAINER ID   IMAGE       COMMAND           CREATED          STATUS                     PORTS     NAMES
02f6df2c1b1a   debian      "bash"            4 seconds ago    Created                              debian-2
b8fc3040a239   debian      "bash"            7 seconds ago    Created                              debian-1
0ca04bcc3a9e   archlinux   "/usr/bin/bash"   36 minutes ago   Exited (0) 2 minutes ago             arch
```

---

### ***Filtrar contenedores por estado***

**Para filtrar todos los contenedores con estado `Exited`:**

```bash
docker ps -aqf "status=exited"
```

**Para filtrar contenedores con estado `Created`:**

```bash
docker ps -aqf "status=created"
```

**Para el siguiente ejemplo, creamos un nuevo contenedor usando la imagen de Fedora e iniciamos el contenedor:**

```bash
docker container create --interactive --tty --name fedora-1 fedora
03f7c4ec261b64ae23bb50ccfbbf9673f4cdf252d9c99b83e83af677e2889252

docker container start -i fedora-1
[root@03f7c4ec261b /]#
```

**Entonces, al listar todos los contenedores, la salida sería:**

```bash
docker container list --all
CONTAINER ID   IMAGE       COMMAND           CREATED          STATUS                      PORTS     NAMES
03f7c4ec261b   fedora      "/bin/bash"       3 minutes ago    Up 2 minutes                          fedora-1
02f6df2c1b1a   debian      "bash"            9 minutes ago    Created                               debian-2
b8fc3040a239   debian      "bash"            9 minutes ago    Created                               debian-1
0ca04bcc3a9e   archlinux   "/usr/bin/bash"   45 minutes ago   Exited (0) 11 minutes ago             arch
```

**Para borrar todos los contenedores detenidos con estado `Created` o `Exited`, podemos utilizar el siguiente comando:**

```bash
docker container prune --help

Usage:  docker container prune [OPTIONS]

Remove all stopped containers

Options:
      --filter filter   Provide filter values (e.g. "until=<timestamp>")
  -f, --force           Do not prompt for confirmation
```

**Como pueden ver, este comando no tiene un alias a `docker prune`.**

**Al ejecutar el comando `docker container prune`, la salida sería algo así:**

```bash
docker container prune
WARNING! This will remove all stopped containers.
Are you sure you want to continue? [y/N] y
Deleted Containers:
02f6df2c1b1a29f88d7330a8ae88cecc0b688b5e729591a2115cf8242ae0f2a6
b8fc3040a239c2fc63ae5afcfbb3bced4db0f2016a4482f9e328aa671138018d
0ca04bcc3a9ee30903cd3a6be107d4c0100d42c1abce25c83bc44df5a0f3b671

Total reclaimed space: 5B
docker ps -a
CONTAINER ID   IMAGE     COMMAND       CREATED          STATUS          PORTS     NAMES
03f7c4ec261b   fedora    "/bin/bash"   10 minutes ago   Up 10 minutes             fedora-1
```

- *Como pueden ver, al ejecutar el comando, se solicita confirmación y para confirmar se utiliza la letra `y`, después de lo cual se eliminan todos los contenedores detenidos.*

- *Para borrar contenedores que están en ejecución, no podemos usar el comando `docker rm` directamente, ya que nos arrojará un error indicando que el contenedor está en ejecución. En cambio, debemos forzar la eliminación del contenedor. Veamos cómo hacerlo:*

> [!CAUTION]
> *para borrar los contenedores que estan inicializado no podemos hacerlo de la siguiente manera ya que dara error*

```bash
docker rm fedora-1
Error response from daemon: cannot remove container "/fedora-1": container is running: stop the container before removing or force remove
```

**la manera correcta seria:**

```bash
docker rm -f fedora-1
fedora-1
docker ps -a
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

- *Al agregar la opción `-f` o `--force` al comando `docker rm`, forzamos la eliminación del contenedor, incluso si está en ejecución. Esto detendrá el contenedor y luego lo eliminará correctamente.*

---

## **Borrar Imágenes**

---

### ***Ver imágenes disponibles***

**Para visualizar las imágenes disponibles en tu sistema, puedes utilizar el siguiente comando:**

```bash
docker images
```

- *Este comando mostrará una lista de las imágenes disponibles, incluyendo detalles como el repositorio, la etiqueta, el ID de la imagen, la fecha de creación y el tamaño.*

---

### ***Comando para borrar imágenes***

- *Para borrar imágenes, puedes utilizar el comando `docker image remove` o su alias `docker rmi`, seguido del ID de la imagen o su nombre y etiqueta. El subcomando `remove` acepta más de un parámetro, ya sea el ID o el nombre de la imagen.*

```bash
docker image remove <id-image>
docker image remove <nombre-image>
```

**Alias:**

```bash
docker image rm
docker rmi
```

*Es importante destacar que `docker rm` no es lo mismo que `docker rmi`. `docker rm` se utiliza para borrar contenedores, mientras que `docker rmi` se utiliza para borrar imágenes.*

### **Ejemplo**

```bash
docker rmi hello-world archlinux
```

**La salida del comando será similar a:**

```bash
Untagged: hello-world:latest
Untagged: hello-world@sha256:266b191e926f65542fa8daaec01a192c4d292bff79426f47300a046e1bc576fd
Deleted: sha256:d2c94e258dcb3c5ac2798d32e1249e42ef01cba4841c2234249495f87264ac5a
Deleted: sha256:ac28800ec8bb38d5c35b49d45a6ac4777544941199075dff8c4eb63e093aa81e
Untagged: archlinux:latest
Untagged: archlinux@sha256:e0cdf8208d276f77eaba78e1ef0e94f7a70c15090cfc09299be5521ceb4a0705
Deleted: sha256:350179b164059944a654dfab989fddbb68a8e857dacc97777e3b625aa418155b
Deleted: sha256:c3b9f5ec2183548055a0edb32fad556192385e775ef8bd06d68ee47455b11c95
Deleted: sha256:2cb9be2e57ad3f1c499b5509dc32bc13df8521e451785a016a12200ef4093602
```

---

### ***Borrar todas las imágenes***

**Para borrar todas las imágenes de tu sistema, puedes utilizar el siguiente comando:**

```bash
docker rmi $(docker images -aq)
```

**Comúnmente, en la mayoría de los casos, la opción `-a, --all` no siempre se usa en este contexto. Comúnmente, el comando sería:**

```bash
docker rmi $(docker images -q)
```

---

## ***Comandos de filtrado en imagenes***

- *Puedes utilizar la bandera `--filter` para delimitar tus comandos. Al filtrar, los comandos solo incluyen las entradas que coinciden con el patrón que especifiques.*

- **Uso de filtros**

*La bandera --filter espera un par clave-valor separado por un operador.*

```bash
docker COMANDO --filter "CLAVE=VALOR"
```

*La clave representa el campo por el que deseas filtrar. El valor es el patrón que el campo especificado debe coincidir. El operador puede ser igual (=) o no igual (!=).*

*Por ejemplo, el comando docker images `--filter reference=alpine` filtra la salida del comando docker images para imprimir solo las imágenes de alpine.*

```bash
docker images
REPOSITORY    TAG        IMAGE ID          CREATED           SIZE
ubuntu        20.04      33a5cc25d22c      Hace 36 minutos   101MB
ubuntu        18.04      152dc042452c      Hace 36 minutos   88.1MB
alpine        3.16       a8cbb8c69ee7      Hace 40 minutos   8.67MB
alpine        latest     7144f7bab3d4      Hace 40 minutos   11.7MB
busybox       uclibc     3e516f71d880      Hace 48 minutos   2.4MB
busybox       glibc      7338d0c72c65      Hace 48 minutos   6.09MB

docker images --filter reference=alpine
REPOSITORY    TAG        IMAGE ID          CREATED           SIZE
alpine        3.16       a8cbb8c69ee7      Hace 40 minutos   8.67MB
alpine        latest     7144f7bab3d4      Hace 40 minutos   11.7MB
```

- *Los campos disponibles (como referencia en este caso) dependen del comando que ejecutes. Algunos filtros esperan una coincidencia exacta. Otros manejan coincidencias parciales. Algunos filtros te permiten usar expresiones regulares.*

- **Combinación de filtros**

- *Puedes combinar múltiples filtros pasando múltiples banderas `--filter`. El siguiente ejemplo muestra cómo imprimir todas las imágenes que coinciden con alpine:latest o busybox - un OR lógico.*

```bash
docker images
REPOSITORY    TAG        IMAGE ID          CREATED        SIZE
ubuntu        20.04      33a5cc25d22c      Hace 2 horas   101MB
ubuntu        18.04      152dc042452c      Hace 2 horas   88.1MB
alpine        3.16       a8cbb8c69ee7      Hace 2 horas   8.67MB
alpine        latest     7144f7bab3d4      Hace 2 horas   11.7MB
busybox       uclibc     3e516f71d880      Hace 2 horas   2.4MB
busybox       glibc      7338d0c72c65      Hace 2 horas   6.09MB

docker images --filter reference=alpine:latest --filter=reference=busybox
REPOSITORY    TAG        IMAGE ID          CREATED        SIZE
alpine        latest     7144f7bab3d4      Hace 2 horas   11.7MB
busybox       uclibc     3e516f71d880      Hace 2 horas   2.4MB
busybox       glibc      7338d0c72c65      Hace 2 horas   6.09MB
```

- *Para entender cómo borrar una imagen que está siendo utilizada por un contenedor en ejecución, considera este escenario:*

**Primero, para propósitos de demostración, vamos a ejecutar un nuevo contenedor utilizando la imagen de Debian con el siguiente comando:**

```bash
docker run --interactive --tty --name debian-1 debian
```

**Una vez que tenemos el contenedor en marcha, podemos listar las imágenes instaladas en nuestro sistema utilizando el comando `docker images`:**

```bash
docker images
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
debian       latest    5027089adc4c   2 weeks ago   117MB
```

**Supongamos que intentamos eliminar la imagen de Debian que acabamos de utilizar:**

```bash
docker rmi debian:latest
Error response from daemon: conflict: unable to remove repository reference "debian:latest" (must force) - container ef209aeeecc6 is using its referenced image 5027089adc4c
```

**Sin embargo, dado que la imagen está siendo utilizada por un contenedor en ejecución, recibiremos un mensaje de error indicando que la imagen no puede ser eliminada sin forzar la acción. Para forzar la eliminación, utilizamos la opción `--force` o `-f`:**

```bash
docker rmi -f debian:latest
```

**Una vez que eliminamos la imagen, si volvemos a listar las imágenes disponibles, notaremos algo inusual:**

```bash
docker images
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
<none>       <none>    5027089adc4c   2 weeks ago   117MB
```

- *La imagen de Debian ya no está presente, y en su lugar vemos una entrada `<none>`. Esto se conoce como "dangling images". Ocurre cuando un contenedor que utiliza una imagen se encuentra en ejecución al intentar borrar dicha imagen. Docker etiqueta la imagen como `<none>` para indicar que no está asociada a ningún nombre o etiqueta.*

**Para evitar este escenario, es recomendable detener el contenedor antes de intentar eliminar la imagen asociada:**

```bash
docker stop debian-1
```

**Luego de detener el contenedor, podemos eliminar la imagen sin la necesidad de forzarla:**

```bash
docker rmi debian:latest
```

*De esta manera, evitamos la creación de "dangling images" y mantenemos un entorno Docker más limpio y eficiente.*

- *Las "dangling images" (imágenes colgantes o imágenes huérfanas) son imágenes de Docker que no están asociadas a ningún contenedor en ejecución ni a ninguna otra imagen. Estas imágenes suelen generarse cuando se construyen nuevas imágenes o se eliminan contenedores, dejando atrás capas de imágenes que ya no están en uso por ningún contenedor existente.*

- *Cuando construyes una nueva imagen en Docker, cada paso de la construcción, definido en tu fichero Dockerfile, genera una nueva capa de imagen. Si cambias el fichero Dockerfile y vuelves a construir la imagen, las capas anteriores que ya no se necesitan pueden convertirse en imágenes colgantes.*

- *Del mismo modo, cuando eliminas un contenedor que está basado en una imagen específica, Docker no elimina automáticamente esa imagen, especialmente si otras imágenes o contenedores dependen de ella. Esto puede llevar a la existencia de imágenes colgantes.*

- *Estas imágenes ocupan espacio de almacenamiento en tu sistema, pero no tienen ninguna utilidad práctica ya que no están asociadas a ningún contenedor en ejecución. Por lo tanto, es recomendable eliminar estas imágenes colgantes para liberar espacio en disco y mantener un entorno Docker más limpio y eficiente.*

- *Para identificar y eliminar imágenes colgantes, puedes utilizar el comando `docker images` con la opción `-f` o `--filter` para filtrar las imágenes por su estado, y luego utilizar `docker rmi` para eliminarlas. Por ejemplo:*

**para listar todas las imagenes dangling:**

```bash
docker images -f dangling=true
```

**para borrarlas:**

```bash
docker images -f dangling=true
docker rmi $(docker images -qf dangling=true)
```

- *Esto mostrará las imágenes colgantes y luego las eliminará.*

---

## ***Imágenes Dangling***

- *Una situación interesante con las imágenes "dangling" es que no se generan cuando el estado del contenedor es "Exited" o "Created". Para ilustrar este punto, considera el siguiente ejemplo:*

**Primero, creamos dos nuevos contenedores utilizando la imagen Fedora, uno de los cuales lo iniciamos uno y luego lo detenemos para tener dos contenedores con estados diferentes:**

```bash
docker create -it fedora-1 fedora
docker create -it fedora-2 fedora
docker start fedora-1
docker stop fedora-1
```

**Al listar los contenedores, veremos que uno está en estado "Exited" y el otro en estado "Created":**

```bash
docker ps -a
CONTAINER ID   IMAGE     COMMAND       CREATED              STATUS                     PORTS     NAMES
5aaa91b9c2e6   fedora    "/bin/bash"   54 seconds ago       Created                              fedora-2
9e86a09c0b44   fedora    "/bin/bash"   About a minute ago   Exited (0) 4 seconds ago             fedora-1
```

**Luego, intentamos eliminar la imagen de Fedora, pero recibimos un error porque está siendo utilizada por un contenedor. Es importante destacar que esto sucede independientemente del estado del contenedor:**

```bash
docker rmi fedora:latest
Error response from daemon: conflict: unable to remove repository reference "fedora:latest" (must force) - container 9e86a09c0b44 is using its referenced image 5e22da79803c
```

**Para forzar la eliminación y evitar el error, usamos la opción `-f`:**

```bash
docker rmi -f fedora:latest
```

**Al listar las imágenes nuevamente, notamos que no se generó ninguna imagen "dangling":**

```bash
docker images
REPOSITORY   TAG       IMAGE ID   CREATED   SIZE
```

- *Este comportamiento es peculiar y es importante tener en cuenta que las imágenes "dangling" no se generan cuando la imagen está siendo utilizada por un contenedor en estado "Exited" o "Created". Esto contrasta con la situación donde la imagen está siendo utilizada por un contenedor en estado "Running", donde sí se genera una imagen "dangling" al eliminarla. Esto puede ayudarte a comprender mejor cómo funcionan las imágenes "dangling" en Docker y cómo evitar su generación en ciertas situaciones.*

- *Aprovechando la situación anterior, surge la pregunta: ¿qué pasa con el contenedor que usaba la imagen de Fedora? Docker crea una especie de copia local en el sistema para que el contenedor pueda seguir funcionando. Esto se puede ver con más detalle al inspeccionar el contenedor.*

**Primero, inspeccionamos el contenedor `fedora-1` y guardamos la salida en un fichero JSON para una revisión más detallada:**

```bash
docker container inspect fedora-1
docker container inspect fedora-1 > ./fichero.json
```

```json
[
    {
        "Id": "9e86a09c0b44f1c7a9f9eeb450a144dbed6a5e08f2279a5dc83fac9d3fc6408c",
        "Created": "2024-06-01T04:23:00.557247784Z",
        "Path": "/bin/bash",
        "Args": [],
        "State": {
            "Status": "exited",
            "Running": false,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 0,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2024-06-01T04:23:35.428351411Z",
            "FinishedAt": "2024-06-01T04:23:58.735589461Z"
        },
        "Image": "sha256:5e22da79803c567fceb0e255f1168977259525a4279cb518016a60df025412fb",
        "ResolvConfPath": "/var/lib/docker/containers/9e86a09c0b44f1c7a9f9eeb450a144dbed6a5e08f2279a5dc83fac9d3fc6408c/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/9e86a09c0b44f1c7a9f9eeb450a144dbed6a5e08f2279a5dc83fac9d3fc6408c/hostname",
        "HostsPath": "/var/lib/docker/containers/9e86a09c0b44f1c7a9f9eeb450a144dbed6a5e08f2279a5dc83fac9d3fc6408c/hosts",
        "LogPath": "/var/lib/docker/containers/9e86a09c0b44f1c7a9f9eeb450a144dbed6a5e08f2279a5dc83fac9d3fc6408c/9e86a09c0b44f1c7a9f9eeb450a144dbed6a5e08f2279a5dc83fac9d3fc6408c-json.log",
        "Name": "/fedora-1",
        "RestartCount": 0,
        "Driver": "overlay2",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "docker-default",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": null,
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "bridge",
            "PortBindings": {},
            "RestartPolicy": {
                "Name": "no",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "ConsoleSize": [
                19,
                134
            ],
            "CapAdd": null,
            "CapDrop": null,
            "CgroupnsMode": "private",
            "Dns": [],
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "private",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "runc",
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": [],
            "BlkioDeviceReadBps": [],
            "BlkioDeviceWriteBps": [],
            "BlkioDeviceReadIOps": [],
            "BlkioDeviceWriteIOps": [],
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": [],
            "DeviceCgroupRules": null,
            "DeviceRequests": null,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": null,
            "OomKillDisable": null,
            "PidsLimit": null,
            "Ulimits": [],
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0,
            "MaskedPaths": [
                "/proc/asound",
                "/proc/acpi",
                "/proc/kcore",
                "/proc/keys",
                "/proc/latency_stats",
                "/proc/timer_list",
                "/proc/timer_stats",
                "/proc/sched_debug",
                "/proc/scsi",
                "/sys/firmware",
                "/sys/devices/virtual/powercap"
            ],
            "ReadonlyPaths": [
                "/proc/bus",
                "/proc/fs",
                "/proc/irq",
                "/proc/sys",
                "/proc/sysrq-trigger"
            ]
        },
        "GraphDriver": {
            "Data": {
                "LowerDir": "/var/lib/docker/overlay2/1350b04fc20756dd75919f2530b377155d9aea28a545fee567240e68273bb9d4-init/diff:/var/lib/docker/overlay2/fcd0486309a610bb40090d2b4d958ddd4d63c7f871e931bc4f6d506958c50704/diff",
                "MergedDir": "/var/lib/docker/overlay2/1350b04fc20756dd75919f2530b377155d9aea28a545fee567240e68273bb9d4/merged",
                "UpperDir": "/var/lib/docker/overlay2/1350b04fc20756dd75919f2530b377155d9aea28a545fee567240e68273bb9d4/diff",
                "WorkDir": "/var/lib/docker/overlay2/1350b04fc20756dd75919f2530b377155d9aea28a545fee567240e68273bb9d4/work"
            },
            "Name": "overlay2"
        },
        "Mounts": [],
        "Config": {
            "Hostname": "9e86a09c0b44",
            "Domainname": "",
            "User": "",
            "AttachStdin": true,
            "AttachStdout": true,
            "AttachStderr": true,
            "Tty": true,
            "OpenStdin": true,
            "StdinOnce": true,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                "DISTTAG=f40container",
                "FGC=f40",
                "FBR=f40"
            ],
            "Cmd": [
                "/bin/bash"
            ],
            "Image": "fedora",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": {
                "maintainer": "Clement Verna <cverna@fedoraproject.org>"
            }
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "433f028ca627deb2740f75294e1d0ae3280b699ee119d479a329691d1c38f5ee",
            "SandboxKey": "/var/run/docker/netns/433f028ca627",
            "Ports": {},
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "",
            "Gateway": "",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "",
            "IPPrefixLen": 0,
            "IPv6Gateway": "",
            "MacAddress": "",
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "MacAddress": "",
                    "NetworkID": "94a0ad85586f6af9010bcde5bc123ec6201b1492aa7ddc41c1e36cd089d51f6e",
                    "EndpointID": "",
                    "Gateway": "",
                    "IPAddress": "",
                    "IPPrefixLen": 0,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "DriverOpts": null,
                    "DNSNames": null
                }
            }
        }
    }
]
```

**En el fichero JSON, buscamos la sección `"GraphDriver"`:**

```json
"GraphDriver": {
    "Data": {
        "LowerDir": "/var/lib/docker/overlay2/1350b04fc20756dd75919f2530b377155d9aea28a545fee567240e68273bb9d4-init/diff:/var/lib/docker/overlay2/fcd0486309a610bb40090d2b4d958ddd4d63c7f871e931bc4f6d506958c50704/diff",
        "MergedDir": "/var/lib/docker/overlay2/1350b04fc20756dd75919f2530b377155d9aea28a545fee567240e68273bb9d4/merged",
        "UpperDir": "/var/lib/docker/overlay2/1350b04fc20756dd75919f2530b377155d9aea28a545fee567240e68273bb9d4/diff",
        "WorkDir": "/var/lib/docker/overlay2/1350b04fc20756dd75919f2530b377155d9aea28a545fee567240e68273bb9d4/work"
    },
    "Name": "overlay2"
}
```

**Vemos que hay un directorio en `LowerDir`, el cual exploramos este `/var/lib/docker/overlay2/fcd0486309a610bb40090d2b4d958ddd4d63c7f871e931bc4f6d506958c50704/diff` para ver su contenido:**

```bash
sudo ls --color=auto /var/lib/docker/overlay2/fcd0486309a610bb40090d2b4d958ddd4d63c7f871e931bc4f6d506958c50704/diff
```

**El resultado muestra la estructura de ficheros típica de un sistema de ficheros de Linux:**

```bash
afs  bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
```

**Podemos verificar que el contenedor sigue funcionando correctamente iniciándolo nuevamente:**

```bash
docker start -i fedora-1
```

**Dentro del contenedor, listamos los ficheros para confirmar que todo está en su lugar:**

```bash
[root@d7f145f83d44 /]# ls --color=auto -al
total 60
drwxr-xr-x   1 root root 4096 Jun  1 04:45 .
drwxr-xr-x   1 root root 4096 Jun  1 04:45 ..
-rwxr-xr-x   1 root root    0 Jun  1 04:45 .dockerenv
dr-xr-xr-x   2 root root 4096 Jan 24 00:00 afs
lrwxrwxrwx   1 root root    7 Jan 24 00:00 bin -> usr/bin
dr-xr-xr-x   2 root root 4096 Jan 24 00:00 boot
drwxr-xr-x   5 root root  360 Jun  1 04:45 dev
drwxr-xr-x   1 root root 4096 Jun  1 04:45 etc
drwxr-xr-x   2 root root 4096 Jan 24 00:00 home
lrwxrwxrwx   1 root root    7 Jan 24 00:00 lib -> usr/lib
lrwxrwxrwx   1 root root    9 Jan 24 00:00 lib64 -> usr/lib64
drwxr-xr-x   2 root root 4096 Jan 24 00:00 media
drwxr-xr-x   2 root root 4096 Jan 24 00:00 mnt
drwxr-xr-x   2 root root 4096 Jan 24 00:00 opt
dr-xr-xr-x 311 root root    0 Jun  1 04:45 proc
dr-xr-x---   1 root root 4096 Jun  1 04:45 root
drwxr-xr-x   2 root root 4096 Apr 14 22:54 run
lrwxrwxrwx   1 root root    8 Jan 24 00:00 sbin -> usr/sbin
drwxr-xr-x   2 root root 4096 Jan 24 00:00 srv
dr-xr-xr-x  13 root root    0 Jun  1 04:45 sys
drwxrwxrwt   2 root root 4096 Jan 24 00:00 tmp
drwxr-xr-x  12 root root 4096 Apr 14 22:54 usr
drwxr-xr-x  18 root root 4096 Apr 14 22:54 var
```

**El contenido confirma que el contenedor está utilizando la copia local creada por Docker.**

**Para profundizar más, listamos los directorios en `/var/lib/docker/overlay2/`:**

```bash
sudo ls --color=auto /var/lib/docker/overlay2/
```

**Podemos observar que el directorio correspondiente al contenedor `fedora-1` que es `/var/lib/docker/overlay2/fcd0486309a610bb40090d2b4d958ddd4d63c7f871e931bc4f6d506958c50704/diff` existe:**

```bash
1350b04fc20756dd75919f2530b377155d9aea28a545fee567240e68273bb9d4
1350b04fc20756dd75919f2530b377155d9aea28a545fee567240e68273bb9d4-init
13b1b76e5d79cdae2e792cb585026410e6672bb3d01383de5bd6c8020b56cd09
13b1b76e5d79cdae2e792cb585026410e6672bb3d01383de5bd6c8020b56cd09-init
fcd0486309a610bb40090d2b4d958ddd4d63c7f871e931bc4f6d506958c50704
l
```

**Esto muestra que Docker ha creado una copia de la imagen de Fedora para que el contenedor pueda seguir funcionando. Si eliminamos el contenedor y revisamos la ruta nuevamente, veremos que el directorio correspondiente ha desaparecido:**

```bash
docker container remove fedora-1
sudo ls --color=auto /var/lib/docker/overlay2/
```

**La salida confirmará que el directorio ya no está presente:**

```bash
13b1b76e5d79cdae2e792cb585026410e6672bb3d01383de5bd6c8020b56cd09
13b1b76e5d79cdae2e792cb585026410e6672bb3d01383de5bd6c8020b56cd09-init
fcd0486309a610bb40090d2b4d958ddd4d63c7f871e931bc4f6d506958c50704
l
```

- *Esto ocurre porque el contenedor ha sido eliminado y, por lo tanto, la copia de la imagen de Fedora también ha sido eliminada. Esta copia no es reutilizable; es una especie de copia temporal para el contenedor.*
