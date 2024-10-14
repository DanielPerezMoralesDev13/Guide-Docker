<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->

# ***Imágenes de varias capas***

- *Para entender cómo funcionan las imágenes de Docker con varias capas, es esencial analizar el Dockerfile proporcionado y el resultado obtenido al inspeccionar un contenedor específico.*

## ***Dockerfile Detallado***

**Analizaremos el Dockerfile:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# las imagenes ya vienen actualizadas normalmente por eso no es necesario poner `apt upgrade`
FROM ubuntu:22.04

# para ejecutar comandos en el contenedor se usa la directiva `RUN`
RUN apt update \
    && apt install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt-get install -y nodejs

# para indicar un directorio de trabajo cabe recalcar que despues de usar este comando nos encontraremos en el directorio /App
WORKDIR /App

# No es necesario poner `/App` ruta absoluta por que ya nos econtramos en ese directorio le podemos pasar la ruta relativa `./` se puede poner solo el punto `.`

COPY ./index.js ./

EXPOSE 3000

# para poner en marcha el servido http lo hacemos mediante `CMD` normalmente es bash pero en este caso ponemos `node ./index.js` recordar que ya estamos en el directorio /App
CMD node ./index.js
```

**En este Dockerfile:**

- **FROM:** *Especifica la imagen base (`ubuntu:22.04` en este caso). Esta es la primera capa de la imagen.*
- **RUN:** *Instala `curl` y `node.js`, lo cual agrega capas adicionales encima de la imagen base.*
- **WORKDIR:** *Define `/App` como directorio de trabajo, estableciéndolo como contexto para comandos futuros.*
- **COPY:** *Copia `index.js` desde el contexto local al contenedor, añadiendo otra capa.*
- **EXPOSE:** *Expone el puerto 3000 del contenedor.*
- **CMD:** *Define el comando por defecto que se ejecutará cuando el contenedor se inicie.*

**Listamos los contenedores en nuestro maquina:**

```bash
docker ps -a
CONTAINER ID   IMAGE                   COMMAND                  CREATED       STATUS                     PORTS     NAMES
c404b9ce8667   d4nitrix13/node         "/bin/sh -c 'node ./…"   9 days ago    Exited (137) 3 hours ago             00-App-nodejs-v4
b064df325976   d4nitrix13/node:0.1.1   "/bin/sh -c 'node ./…"   9 days ago    Exited (130) 9 days ago              00-App-nodejs-v3
833b429d20c5   d4nitrix13/node:0.1.1   "/bin/sh -c 'node ./…"   9 days ago    Exited (130) 9 days ago              00-App-nodejs-v2
6f68557da99b   ubuntu:22.04            "/bin/bash"              13 days ago   Exited (137) 11 days ago             App-00-Nodejs
0f3fdde42f5a   ubuntu:22.04            "/bin/bash"              2 weeks ago   Exited (137) 13 days ago             test-client
```

**Inspeccionaremos el contenedor `00-App-nodejs-v4`:**

```bash
docker inspect 00-App-nodejs-v4 > "00-App-nodejs-v4 metadatos.md"
```

```json
[
    {
        "Id": "c404b9ce8667e25a34ad33e7a11b11b571e5e2d1bf69ec8d589287b3a51efbd2",
        "Created": "2024-06-07T23:05:59.412976121Z",
        "Path": "/bin/sh",
        "Args": [
            "-c",
            "node ./index.js"
        ],
        "State": {
            "Status": "exited",
            "Running": false,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 0,
            "ExitCode": 137,
            "Error": "",
            "StartedAt": "2024-06-16T20:17:00.036362886Z",
            "FinishedAt": "2024-06-16T20:17:06.050599529Z"
        },
        "Image": "sha256:146b0b14c7a8745a3e20b6faa3618b7e8d38c38557ee94eeb8720613ceed907b",
        "ResolvConfPath": "/var/lib/docker/containers/c404b9ce8667e25a34ad33e7a11b11b571e5e2d1bf69ec8d589287b3a51efbd2/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/c404b9ce8667e25a34ad33e7a11b11b571e5e2d1bf69ec8d589287b3a51efbd2/hostname",
        "HostsPath": "/var/lib/docker/containers/c404b9ce8667e25a34ad33e7a11b11b571e5e2d1bf69ec8d589287b3a51efbd2/hosts",
        "LogPath": "/var/lib/docker/containers/c404b9ce8667e25a34ad33e7a11b11b571e5e2d1bf69ec8d589287b3a51efbd2/c404b9ce8667e25a34ad33e7a11b11b571e5e2d1bf69ec8d589287b3a51efbd2-json.log",
        "Name": "/00-App-nodejs-v4",
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
                17,
                142
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
                "LowerDir": "/var/lib/docker/overlay2/1ebd3e876321c23d898bc4d71c8a8b9e5ce535c34ffeb8ee6d05f8a058039d99-init/diff:/var/lib/docker/overlay2/82xpaeggq61te9rdxufi9ckxy/diff:/var/lib/docker/overlay2/kr4i0c8ry4bsu7c6jsowwj1fr/diff:/var/lib/docker/overlay2/tqhoeimhf4l6n7zeo3pdini0n/diff:/var/lib/docker/overlay2/043387975c35001ef7b631d7ad09d104fcb9b7970b5b3a38042167dd0c65a764/diff",
                "MergedDir": "/var/lib/docker/overlay2/1ebd3e876321c23d898bc4d71c8a8b9e5ce535c34ffeb8ee6d05f8a058039d99/merged",
                "UpperDir": "/var/lib/docker/overlay2/1ebd3e876321c23d898bc4d71c8a8b9e5ce535c34ffeb8ee6d05f8a058039d99/diff",
                "WorkDir": "/var/lib/docker/overlay2/1ebd3e876321c23d898bc4d71c8a8b9e5ce535c34ffeb8ee6d05f8a058039d99/work"
            },
            "Name": "overlay2"
        },
        "Mounts": [],
        "Config": {
            "Hostname": "c404b9ce8667",
            "Domainname": "",
            "User": "",
            "AttachStdin": true,
            "AttachStdout": true,
            "AttachStderr": true,
            "ExposedPorts": {
                "3000/tcp": {}
            },
            "Tty": true,
            "OpenStdin": true,
            "StdinOnce": true,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": [
                "/bin/sh",
                "-c",
                "node ./index.js"
            ],
            "Image": "d4nitrix13/node",
            "Volumes": null,
            "WorkingDir": "/App",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": {
                "org.opencontainers.image.ref.name": "ubuntu",
                "org.opencontainers.image.version": "22.04"
            }
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "35d1476ed71f546c9b856860e0329606d72ead7de3e250363cf0bc69b82d1376",
            "SandboxKey": "/var/run/docker/netns/35d1476ed71f",
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
                    "NetworkID": "edcf6e4dee146b674a9ee5b068c8128a8db758639f75349f02a8abdc33ee9379",
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

## ***Inspección del Contenedor***

- *Al inspeccionar el contenedor `00-App-nodejs-v4`, se obtienen detalles sobre cómo se han construido las capas de la imagen buscamos la seccion `GraphDriver`:*

```json
{
    "GraphDriver": {
        "Data": {
            "LowerDir": "/var/lib/docker/overlay2/1ebd3e876321c23d898bc4d71c8a8b9e5ce535c34ffeb8ee6d05f8a058039d99-init/diff:/var/lib/docker/overlay2/82xpaeggq61te9rdxufi9ckxy/diff:/var/lib/docker/overlay2/kr4i0c8ry4bsu7c6jsowwj1fr/diff:/var/lib/docker/overlay2/tqhoeimhf4l6n7zeo3pdini0n/diff:/var/lib/docker/overlay2/043387975c35001ef7b631d7ad09d104fcb9b7970b5b3a38042167dd0c65a764/diff",
            "MergedDir": "/var/lib/docker/overlay2/1ebd3e876321c23d898bc4d71c8a8b9e5ce535c34ffeb8ee6d05f8a058039d99/merged",
            "UpperDir": "/var/lib/docker/overlay2/1ebd3e876321c23d898bc4d71c8a8b9e5ce535c34ffeb8ee6d05f8a058039d99/diff",
            "WorkDir": "/var/lib/docker/overlay2/1ebd3e876321c23d898bc4d71c8a8b9e5ce535c34ffeb8ee6d05f8a058039d99/work"
        },
        "Name": "overlay2"
    }
}
```

- *En `LowerDir`, encontramos una lista de directorios separados por `:`. Estos representan las capas individuales que componen la imagen Docker, enumeradas desde la más reciente hasta la más antigua. Cada capa contiene cambios incrementales sobre la anterior, facilitando la reutilización y la eficiencia en el almacenamiento y distribución de imágenes.*

**Si filtramos solo por las configuracion de `GraphDriver -> Data -> LowerDir`:**

```bash
docker inspect -f "{{.GraphDriver.Data.LowerDir}}" 00-App-nodejs-v4
```

**Recordar que los directorios estan separados por dos puntos y las primeras capas van a hacer las ultimas:**

```bash
/var/lib/docker/overlay2/1ebd3e876321c23d898bc4d71c8a8b9e5ce535c34ffeb8ee6d05f8a058039d99-init/diff:/var/lib/docker/overlay2/82xpaeggq61te9rdxufi9ckxy/diff:/var/lib/docker/overlay2/kr4i0c8ry4bsu7c6jsowwj1fr/diff:/var/lib/docker/overlay2/tqhoeimhf4l6n7zeo3pdini0n/diff:/var/lib/docker/overlay2/043387975c35001ef7b631d7ad09d104fcb9b7970b5b3a38042167dd0c65a764/diff
```

## **Interpretación de los Directorios LowerDir**

- **Primer Directorio (última capa):** *`/var/lib/docker/overlay2/1ebd3e876321c23d898bc4d71c8a8b9e5ce535c34ffeb8ee6d05f8a058039d99-init/diff`*
- **Segundo Directorio (penúltima capa):** *`/var/lib/docker/overlay2/82xpaeggq61te9rdxufi9ckxy/diff`*
- **Tercer Directorio (antepenúltima capa):** *`/var/lib/docker/overlay2/kr4i0c8ry4bsu7c6jsowwj1fr/diff`*
- **Cuarto Directorio (segunda capa):** *`/var/lib/docker/overlay2/tqhoeimhf4l6n7zeo3pdini0n/diff`*
- **Quinto Directorio (primera capa):** *`/var/lib/docker/overlay2/043387975c35001ef7b631d7ad09d104fcb9b7970b5b3a38042167dd0c65a764/diff`*

- *Cada directorio `diff` representa una capa específica de la imagen Docker, contribuyendo a la configuración y funcionalidad del contenedor final.*

- *Este enfoque por capas permite a Docker mantener la eficiencia y facilitar la gestión de imágenes y contenedores, soportando la creación de imágenes personalizadas y la distribución eficiente de aplicaciones.*

- *Para explorar el contenido del primer directorio (`/var/lib/docker/overlay2/1ebd3e876321c23d898bc4d71c8a8b9e5ce535c34ffeb8ee6d05f8a058039d99-init/diff`), que representa la última capa de la imagen Docker `00-App-nodejs-v4`, vamos a revisar su estructura y contenido utilizando comandos específicos en la línea de comandos. A continuación, detallo cómo hacerlo:*

> [!WARNING]
> *Estas directivas de la ultima capa no generan diferencias*

```Dockerfile
EXPOSE 3000

# para poner en marcha el servido http lo hacemos mediante `CMD` normalmente es bash pero en este caso ponemos `node ./index.js` recordar que ya estamos en el directorio /App
CMD node ./index.js
```

```bash
su root
```

**Acceder al directorio de la última capa:**

```bash
cd /var/lib/docker/overlay2/1ebd3e876321c23d898bc4d71c8a8b9e5ce535c34ffeb8ee6d05f8a058039d99-init/diff
```

**Listar el contenido del directorio detalladamente:**

- *Este comando mostrará todos los ficheros y directorios presentes en la última capa de la imagen Docker. Los permisos, el propietario y la fecha de modificación de cada fichero se mostrarán.*

```bash
lsd -la
drwxr-xr-x root root 4.0 KB Fri Jun  7 17:05:59 2024  .
drwx--x--- root root 4.0 KB Fri Jun  7 17:05:59 2024  ..
.rwxr-xr-x root root   0 B  Fri Jun  7 17:05:59 2024  .dockerenv
drwxr-xr-x root root 4.0 KB Fri Jun  7 17:05:59 2024  dev
drwxr-xr-x root root 4.0 KB Fri Jun  7 17:05:59 2024  etc
```

**Mostrar la estructura del directorio de manera más visual:**

- *Para visualizar la estructura de directorios de forma más clara y jerárquica, utilizaremos el comando tree. Asegúrate de tenerlo instalado, ya que no viene por defecto en todas las distribuciones Linux.*

- *Este comando desplegará la estructura de directorios comenzando desde el directorio actual (`.`), mostrando ficheros y subdirectorios de manera indentada.*

```bash
tree -C .
.
├── dev
│   ├── console
│   ├── pts
│   └── shm
└── etc
    ├── hostname
    ├── hosts
    ├── mtab -> /proc/mounts
    └── resolv.conf

4 directories, 5 files
```

- *Para explorar el contenido del segundo directorio (`/var/lib/docker/overlay2/82xpaeggq61te9rdxufi9ckxy/diff`), que representa la penúltima capa de la imagen Docker `00-App-nodejs-v4`, vamos a revisar su estructura y contenido utilizando comandos específicos en la línea de comandos. A continuación, detallo cómo hacerlo:*

**Que seria esto:**

```Dockerfile
# No es necesario poner `/App` ruta absoluta por que ya nos econtramos en ese directorio le podemos pasar la ruta relativa `./` se puede poner solo el punto `.`

COPY ./index.js ./
```

```bash
su root
```

**Acceder al directorio de la penúltima capa:**

```bash
cd /var/lib/docker/overlay2/82xpaeggq61te9rdxufi9ckxy/diff
```

**Listar el contenido del directorio detalladamente:**

- *Este comando mostrará todos los ficheros y directorios presentes en la penúltima capa de la imagen Docker. Los permisos, el propietario y la fecha de modificación de cada fichero se mostrarán.*

```bash
lsd -la
drwxr-xr-x root root 4.0 KB Fri Jun  7 16:19:54 2024  .
drwx--x--- root root 4.0 KB Fri Jun  7 17:05:59 2024  ..
drwxr-xr-x root root 4.0 KB Fri Jun  7 16:19:54 2024  App
```

**Mostrar la estructura del directorio de manera más visual:**

- *Para visualizar la estructura de directorios de forma más clara y jerárquica, utilizaremos el comando tree. Asegúrate de tenerlo instalado, ya que no viene por defecto en todas las distribuciones Linux.*

- *Este comando desplegará la estructura de directorios comenzando desde el directorio actual (`.`), mostrando ficheros y subdirectorios de manera indentada.*

```bash
tree -C .
.
└── App
    └── index.js

1 directory, 1 file
```

- *Para explorar el contenido del tercer directorio (`/var/lib/docker/overlay2/kr4i0c8ry4bsu7c6jsowwj1fr/diff`), que representa la antepenúltima capa de la imagen Docker `00-App-nodejs-v4`, vamos a revisar su estructura y contenido utilizando comandos específicos en la línea de comandos. A continuación, detallo cómo hacerlo:*

**Que seria esto:**

```Dockerfile
# para indicar un directorio de trabajo cabe recalcar que despues de usar este comando nos encontraremos en el directorio /App
WORKDIR /App
```

```bash
su root
```

**Acceder al directorio de la antepenúltima capa:**

```bash
cd /var/lib/docker/overlay2/kr4i0c8ry4bsu7c6jsowwj1fr/diff
```

**Listar el contenido del directorio detalladamente vemos que estan los binarios `node`, `curl`:**

- *Este comando mostrará todos los ficheros y directorios presentes en el directorio especificado (`/var/lib/docker/overlay2/kr4i0c8ry4bsu7c6jsowwj1fr/diff`), con detalles como permisos, propietario, tamaño y fecha de modificación.*

```bash
lsd --color=auto -la /var/lib/docker/overlay2/tqhoeimhf4l6n7zeo3pdini0n/diff/usr/bin
drwxr-xr-x root root 4.0 KB Fri Jun  7 16:19:54 2024  .
drwxr-xr-x root root 4.0 KB Fri Apr 26 20:02:35 2024  ..
.rwxr-xr-x root root 6.8 KB Fri Feb 16 02:51:30 2024  c_rehash
lrwxrwxrwx root root  45 B  Wed May 15 14:00:17 2024  corepack ⇒ ../lib/node_modules/corepack/dist/corepack.js
.rwxr-xr-x root root 254 KB Tue Mar 19 06:16:19 2024  curl
.rwxr-xr-x root root 433 KB Mon Jul  4 10:17:43 2022  dirmngr
.rwxr-xr-x root root  55 KB Mon Jul  4 10:17:43 2022  dirmngr-client
.rwxr-xr-x root root 1.0 MB Mon Jul  4 10:17:43 2022  gpg
.rwxr-xr-x root root 313 KB Mon Jul  4 10:17:43 2022  gpg-agent
.rwxr-xr-x root root  83 KB Mon Jul  4 10:17:43 2022  gpg-connect-agent
.rwxr-xr-x root root 115 KB Mon Jul  4 10:17:43 2022  gpg-wks-server
.rwxr-xr-x root root 3.4 KB Mon Jul  4 10:17:43 2022  gpg-zip
.rwxr-xr-x root root 496 KB Mon Jul  4 10:17:43 2022  gpgcompose
.rwxr-xr-x root root 127 KB Mon Jul  4 10:17:43 2022  gpgconf
.rwxr-xr-x root root  34 KB Mon Jul  4 10:17:43 2022  gpgparsemail
.rwxr-xr-x root root 419 KB Mon Jul  4 10:17:43 2022  gpgsm
.rwxr-xr-x root root  26 KB Mon Jul  4 10:17:43 2022  gpgsplit
.rwxr-xr-x root root  63 KB Mon Jul  4 10:17:43 2022  gpgtar
.rwxr-xr-x root root  63 KB Mon Jul  4 10:17:43 2022  kbxutil
.rwxr-xr-x root root 1.1 KB Mon Aug 28 04:22:54 2017  lspgpot
.rwxr-xr-x root root 3.0 KB Sat Dec 18 15:45:14 2021  migrate-pubring-from-classic-gpg
.rwxr-xr-x root root 106 MB Wed May 15 06:29:26 2024  node
lrwxrwxrwx root root  24 B  Fri Jun  7 16:19:54 2024  nodejs ⇒ /etc/alternatives/nodejs
lrwxrwxrwx root root  38 B  Wed May 15 14:00:17 2024  npm ⇒ ../lib/node_modules/npm/bin/npm-cli.js
lrwxrwxrwx root root  38 B  Wed May 15 14:00:17 2024  npx ⇒ ../lib/node_modules/npm/bin/npx-cli.js
.rwxr-xr-x root root 978 KB Fri Feb 16 02:51:30 2024  openssl
lrwxrwxrwx root root   7 B  Thu Aug 18 04:39:04 2022  pdb3 ⇒ pdb3.10
lrwxrwxrwx root root  24 B  Mon Nov 20 09:14:05 2023  pdb3.10 ⇒ ../lib/python3.10/pdb.py
lrwxrwxrwx root root  26 B  Fri Jun  7 16:19:32 2024  pinentry ⇒ /etc/alternatives/pinentry
.rwxr-xr-x root root  59 KB Thu Mar 24 10:31:21 2022  pinentry-curses
.rwxr-xr-x root root 7.6 KB Thu Aug 18 04:39:04 2022  py3clean
.rwxr-xr-x root root  13 KB Thu Aug 18 04:39:04 2022  py3compile
lrwxrwxrwx root root  31 B  Thu Aug 18 04:39:04 2022  py3versions ⇒ ../share/python3/py3versions.py
lrwxrwxrwx root root   9 B  Thu Aug 18 04:39:04 2022  pydoc3 ⇒ pydoc3.10
.rwxr-xr-x root root  79 B  Mon Nov 20 09:14:05 2023  pydoc3.10
lrwxrwxrwx root root  13 B  Thu Aug 18 04:39:04 2022  pygettext3 ⇒ pygettext3.10
.rwxr-xr-x root root  24 KB Tue Jun  6 16:30:33 2023  pygettext3.10
lrwxrwxrwx root root  10 B  Thu Aug 18 04:39:04 2022  python3 ⇒ python3.10
.rwxr-xr-x root root 5.6 MB Mon Nov 20 09:14:05 2023  python3.10
.rwxr-xr-x root root  18 KB Mon Jul  4 10:17:43 2022  watchgnupg
```

```bash
lsd -la
drwxr-xr-x root root 4.0 KB Fri Jun  7 16:19:54 2024  .
drwx--x--- root root 4.0 KB Fri Jun  7 16:19:54 2024  ..
drwxr-xr-x root root 4.0 KB Fri Jun  7 16:19:54 2024  App
```

**Mostrar la estructura del directorio de manera más visual:**

- *Para visualizar la estructura de directorios de forma más clara y jerárquica, utilizaremos el comando tree. Asegúrate de tenerlo instalado, ya que no viene por defecto en todas las distribuciones Linux.*

- *Este comando desplegará la estructura de directorios comenzando desde el directorio actual (`.`), mostrando ficheros y subdirectorios de manera indentada y organizada.*

```bash
tree -C .
.
└── App
1 directory, 0 files
```

- *Para explorar el contenido del cuarto directorio (`/var/lib/docker/overlay2/tqhoeimhf4l6n7zeo3pdini0n/diff`), que representa la segunda capa de la imagen Docker `00-App-nodejs-v4`, vamos a revisar su estructura y contenido utilizando comandos específicos en la línea de comandos. A continuación, detallo cómo hacerlo:*

**Que seria esto:**

```Dockerfile
# para ejecutar comandos en el contenedor se usa la directiva `RUN`
RUN apt update \
    && apt install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && apt-get install -y nodejs
```

```bash
su root
```

**Acceder al directorio de la segunda capa:**

```bash
cd /var/lib/docker/overlay2/tqhoeimhf4l6n7zeo3pdini0n/diff
```

**Listar el contenido del directorio detalladamente:**

- *Este comando mostrará todos los ficheros y directorios presentes en el directorio especificado (`/var/lib/docker/overlay2/tqhoeimhf4l6n7zeo3pdini0n/diff`), con detalles como permisos, propietario, tamaño y fecha de modificación.*

```bash
lsd -la
drwxr-xr-x root root 4.0 KB Fri Jun  7 16:19:19 2024  .
drwx--x--- root root 4.0 KB Fri Jun  7 16:19:54 2024  ..
drwxr-xr-x root root 4.0 KB Fri Jun  7 16:19:54 2024  etc
.rw-r--r-- root root 3.1 KB Fri Jun  7 16:19:19 2024  nodesource_setup.sh
drwxrwxrwt root root 4.0 KB Fri Jun  7 16:19:46 2024  tmp
drwxr-xr-x root root 4.0 KB Fri Apr 26 20:02:35 2024  usr
drwxr-xr-x root root 4.0 KB Fri Apr 26 20:05:54 2024  var
```

**Mostrar la estructura del directorio de manera más visual:**

- *Para visualizar la estructura de directorios de forma más clara y jerárquica, utilizaremos el comando tree. Asegúrate de tenerlo instalado, ya que no viene por defecto en todas las distribuciones Linux.*

- *Este comando desplegará la estructura de directorios comenzando desde el directorio actual (`.`), mostrando ficheros y subdirectorios de manera indentada y organizada.*

```bash
tree -C .
[01;34m.[0m
├── [01;34metc[0m
│   ├── [01;34malternatives[0m
│   │   ├── [01;36mnodejs[0m -> [01;32m/usr/bin/node[0m
│   │   └── [40;31;01mpinentry[0m -> [00m/usr/bin/pinentry-curses[0m
│   ├── [01;34mapt[0m
│   │   ├── [01;34mpreferences.d[0m
│   │   │   ├── nodejs
│   │   │   └── nsolid
│   │   └── [01;34msources.list.d[0m
│   │       └── nodesource.list
│   ├── [01;34mca-certificates[0m
│   │   └── [01;34mupdate.d[0m
│   ├── ca-certificates.conf
│   ├── inputrc
│   ├── [01;34mldap[0m
│   │   └── ldap.conf
│   ├── ld.so.cache
│   ├── [01;34mlogcheck[0m
│   │   └── [01;34mignore.d.server[0m
│   │       ├── gpg-agent
│   │       └── libsasl2-modules
│   ├── mime.types
│   ├── [01;34mpython3[0m
│   │   └── debian_config
│   ├── [01;34mpython3.10[0m
│   │   └── sitecustomize.py
│   ├── [01;34mssl[0m
│   │   ├── [01;34mcerts[0m
│   │   │   ├── [01;36m002c0b4f.0[0m -> GlobalSign_Root_R46.pem
│   │   │   ├── [01;36m02265526.0[0m -> Entrust_Root_Certification_Authority_-_G2.pem
│   │   │   ├── [01;36m062cdee6.0[0m -> GlobalSign_Root_CA_-_R3.pem
│   │   │   ├── [01;36m064e0aa9.0[0m -> QuoVadis_Root_CA_2_G3.pem
│   │   │   ├── [01;36m06dc52d5.0[0m -> SSL.com_EV_Root_Certification_Authority_RSA_R2.pem
│   │   │   ├── [01;36m08063a00.0[0m -> Security_Communication_RootCA3.pem
│   │   │   ├── [01;36m09789157.0[0m -> Starfield_Services_Root_Certificate_Authority_-_G2.pem
│   │   │   ├── [01;36m0a775a30.0[0m -> GTS_Root_R3.pem
│   │   │   ├── [01;36m0b1b94ef.0[0m -> CFCA_EV_ROOT.pem
│   │   │   ├── [01;36m0b9bc432.0[0m -> ISRG_Root_X2.pem
│   │   │   ├── [01;36m0bf05006.0[0m -> SSL.com_Root_Certification_Authority_ECC.pem
│   │   │   ├── [01;36m0f5dc4f3.0[0m -> UCA_Extended_Validation_Root.pem
│   │   │   ├── [01;36m0f6fa695.0[0m -> GDCA_TrustAUTH_R5_ROOT.pem
│   │   │   ├── [01;36m1001acf7.0[0m -> GTS_Root_R1.pem
│   │   │   ├── [01;36m106f3e4d.0[0m -> Entrust_Root_Certification_Authority_-_EC1.pem
│   │   │   ├── [01;36m14bc7599.0[0m -> emSign_ECC_Root_CA_-_G3.pem
│   │   │   ├── [01;36m18856ac4.0[0m -> SecureSign_RootCA11.pem
│   │   │   ├── [01;36m1d3472b9.0[0m -> GlobalSign_ECC_Root_CA_-_R5.pem
│   │   │   ├── [01;36m1e08bfd1.0[0m -> IdenTrust_Public_Sector_Root_CA_1.pem
│   │   │   ├── [01;36m1e09d511.0[0m -> T-TeleSec_GlobalRoot_Class_2.pem
│   │   │   ├── [01;36m244b5494.0[0m -> DigiCert_High_Assurance_EV_Root_CA.pem
│   │   │   ├── [01;36m2923b3f9.0[0m -> emSign_Root_CA_-_G1.pem
│   │   │   ├── [01;36m2ae6433e.0[0m -> CA_Disig_Root_R2.pem
│   │   │   ├── [01;36m2b349938.0[0m -> AffirmTrust_Commercial.pem
│   │   │   ├── [01;36m32888f65.0[0m -> Hellenic_Academic_and_Research_Institutions_RootCA_2015.pem
│   │   │   ├── [01;36m3513523f.0[0m -> DigiCert_Global_Root_CA.pem
│   │   │   ├── [01;36m3bde41ac.0[0m -> Autoridad_de_Certificacion_Firmaprofesional_CIF_A62634068.pem
│   │   │   ├── [01;36m3bde41ac.1[0m -> Autoridad_de_Certificacion_Firmaprofesional_CIF_A62634068_2.pem
│   │   │   ├── [01;36m3e45d192.0[0m -> Hongkong_Post_Root_CA_1.pem
│   │   │   ├── [01;36m3fb36b73.0[0m -> NAVER_Global_Root_Certification_Authority.pem
│   │   │   ├── [01;36m40193066.0[0m -> Certum_Trusted_Network_CA_2.pem
│   │   │   ├── [01;36m4042bcee.0[0m -> ISRG_Root_X1.pem
│   │   │   ├── [01;36m40547a79.0[0m -> COMODO_Certification_Authority.pem
│   │   │   ├── [01;36m406c9bb1.0[0m -> emSign_Root_CA_-_C1.pem
│   │   │   ├── [01;36m48bec511.0[0m -> Certum_Trusted_Network_CA.pem
│   │   │   ├── [01;36m4b718d9b.0[0m -> emSign_ECC_Root_CA_-_C3.pem
│   │   │   ├── [01;36m4bfab552.0[0m -> Starfield_Root_Certificate_Authority_-_G2.pem
│   │   │   ├── [01;36m4f316efb.0[0m -> SwissSign_Gold_CA_-_G2.pem
│   │   │   ├── [01;36m5273a94c.0[0m -> E-Tugra_Certification_Authority.pem
│   │   │   ├── [01;36m5443e9e3.0[0m -> T-TeleSec_GlobalRoot_Class_3.pem
│   │   │   ├── [01;36m54657681.0[0m -> Buypass_Class_2_Root_CA.pem
│   │   │   ├── [01;36m57bcb2da.0[0m -> SwissSign_Silver_CA_-_G2.pem
│   │   │   ├── [01;36m5860aaa6.0[0m -> Security_Communication_ECC_RootCA1.pem
│   │   │   ├── [01;36m5931b5bc.0[0m -> D-TRUST_EV_Root_CA_1_2020.pem
│   │   │   ├── [01;36m5a7722fb.0[0m -> E-Tugra_Global_Root_CA_ECC_v3.pem
│   │   │   ├── [01;36m5ad8a5d6.0[0m -> GlobalSign_Root_CA.pem
│   │   │   ├── [01;36m5cd81ad7.0[0m -> TeliaSonera_Root_CA_v1.pem
│   │   │   ├── [01;36m5e98733a.0[0m -> Entrust_Root_Certification_Authority_-_G4.pem
│   │   │   ├── [01;36m5f15c80c.0[0m -> TWCA_Global_Root_CA.pem
│   │   │   ├── [01;36m5f618aec.0[0m -> certSIGN_Root_CA_G2.pem
│   │   │   ├── [01;36m607986c7.0[0m -> DigiCert_Global_Root_G2.pem
│   │   │   ├── [01;36m626dceaf.0[0m -> GTS_Root_R2.pem
│   │   │   ├── [01;36m653b494a.0[0m -> Baltimore_CyberTrust_Root.pem
│   │   │   ├── [01;36m66445960.0[0m -> E-Tugra_Global_Root_CA_RSA_v3.pem
│   │   │   ├── [01;36m68dd7389.0[0m -> Hongkong_Post_Root_CA_3.pem
│   │   │   ├── [01;36m6b99d060.0[0m -> Entrust_Root_Certification_Authority.pem
│   │   │   ├── [01;36m6d41d539.0[0m -> Amazon_Root_CA_2.pem
│   │   │   ├── [01;36m6fa5da56.0[0m -> SSL.com_Root_Certification_Authority_RSA.pem
│   │   │   ├── [01;36m706f604c.0[0m -> XRamp_Global_CA_Root.pem
│   │   │   ├── [01;36m749e9e03.0[0m -> QuoVadis_Root_CA_1_G3.pem
│   │   │   ├── [01;36m75d1b2ed.0[0m -> DigiCert_Trusted_Root_G4.pem
│   │   │   ├── [01;36m76faf6c0.0[0m -> QuoVadis_Root_CA_3.pem
│   │   │   ├── [01;36m7719f463.0[0m -> Hellenic_Academic_and_Research_Institutions_ECC_RootCA_2015.pem
│   │   │   ├── [01;36m773e07ad.0[0m -> OISTE_WISeKey_Global_Root_GC_CA.pem
│   │   │   ├── [01;36m7a3adc42.0[0m -> vTrus_Root_CA.pem
│   │   │   ├── [01;36m7a780d93.0[0m -> Certainly_Root_R1.pem
│   │   │   ├── [01;36m7f3d5d1d.0[0m -> DigiCert_Assured_ID_Root_G3.pem
│   │   │   ├── [01;36m8160b96c.0[0m -> Microsec_e-Szigno_Root_CA_2009.pem
│   │   │   ├── [01;36m8508e720.0[0m -> Certainly_Root_E1.pem
│   │   │   ├── [01;36m8cb5ee0f.0[0m -> Amazon_Root_CA_3.pem
│   │   │   ├── [01;36m8d86cdd1.0[0m -> certSIGN_ROOT_CA.pem
│   │   │   ├── [01;36m8d89cda1.0[0m -> Microsoft_ECC_Root_Certificate_Authority_2017.pem
│   │   │   ├── [01;36m8f103249.0[0m -> Telia_Root_CA_v2.pem
│   │   │   ├── [01;36m90c5a3c8.0[0m -> HiPKI_Root_CA_-_G1.pem
│   │   │   ├── [01;36m930ac5d2.0[0m -> Actalis_Authentication_Root_CA.pem
│   │   │   ├── [01;36m93bc0acc.0[0m -> AffirmTrust_Networking.pem
│   │   │   ├── [01;36m9482e63a.0[0m -> Certum_EC-384_CA.pem
│   │   │   ├── [01;36m9846683b.0[0m -> DigiCert_TLS_ECC_P384_Root_G5.pem
│   │   │   ├── [01;36m988a38cb.0[0m -> NetLock_Arany_=Class_Gold=_Főtanúsítvány.pem
│   │   │   ├── [01;36m9b5697b0.0[0m -> Trustwave_Global_ECC_P256_Certification_Authority.pem
│   │   │   ├── [01;36m9c8dfbd4.0[0m -> AffirmTrust_Premium_ECC.pem
│   │   │   ├── [01;36m9d04f354.0[0m -> DigiCert_Assured_ID_Root_G2.pem
│   │   │   ├── [01;36m9ef4a08a.0[0m -> D-TRUST_BR_Root_CA_1_2020.pem
│   │   │   ├── [01;36m9f727ac7.0[0m -> HARICA_TLS_RSA_Root_CA_2021.pem
│   │   │   ├── [01;36ma3418fda.0[0m -> GTS_Root_R4.pem
│   │   │   ├── [01;36ma94d09e5.0[0m -> ACCVRAIZ1.pem
│   │   │   ├── [01;36mACCVRAIZ1.pem[0m -> /usr/share/ca-certificates/mozilla/ACCVRAIZ1.crt
│   │   │   ├── [01;36mAC_RAIZ_FNMT-RCM.pem[0m -> /usr/share/ca-certificates/mozilla/AC_RAIZ_FNMT-RCM.crt
│   │   │   ├── [01;36mAC_RAIZ_FNMT-RCM_SERVIDORES_SEGUROS.pem[0m -> /usr/share/ca-certificates/mozilla/AC_RAIZ_FNMT-RCM_SERVIDORES_SEGUROS.crt
│   │   │   ├── [01;36mActalis_Authentication_Root_CA.pem[0m -> /usr/share/ca-certificates/mozilla/Actalis_Authentication_Root_CA.crt
│   │   │   ├── [01;36maee5f10d.0[0m -> Entrust.net_Premium_2048_Secure_Server_CA.pem
│   │   │   ├── [01;36mAffirmTrust_Commercial.pem[0m -> /usr/share/ca-certificates/mozilla/AffirmTrust_Commercial.crt
│   │   │   ├── [01;36mAffirmTrust_Networking.pem[0m -> /usr/share/ca-certificates/mozilla/AffirmTrust_Networking.crt
│   │   │   ├── [01;36mAffirmTrust_Premium_ECC.pem[0m -> /usr/share/ca-certificates/mozilla/AffirmTrust_Premium_ECC.crt
│   │   │   ├── [01;36mAffirmTrust_Premium.pem[0m -> /usr/share/ca-certificates/mozilla/AffirmTrust_Premium.crt
│   │   │   ├── [01;36mAmazon_Root_CA_1.pem[0m -> /usr/share/ca-certificates/mozilla/Amazon_Root_CA_1.crt
│   │   │   ├── [01;36mAmazon_Root_CA_2.pem[0m -> /usr/share/ca-certificates/mozilla/Amazon_Root_CA_2.crt
│   │   │   ├── [01;36mAmazon_Root_CA_3.pem[0m -> /usr/share/ca-certificates/mozilla/Amazon_Root_CA_3.crt
│   │   │   ├── [01;36mAmazon_Root_CA_4.pem[0m -> /usr/share/ca-certificates/mozilla/Amazon_Root_CA_4.crt
│   │   │   ├── [01;36mANF_Secure_Server_Root_CA.pem[0m -> /usr/share/ca-certificates/mozilla/ANF_Secure_Server_Root_CA.crt
│   │   │   ├── [01;36mAtos_TrustedRoot_2011.pem[0m -> /usr/share/ca-certificates/mozilla/Atos_TrustedRoot_2011.crt
│   │   │   ├── [01;36mAutoridad_de_Certificacion_Firmaprofesional_CIF_A62634068_2.pem[0m -> /usr/share/ca-certificates/mozilla/Autoridad_de_Certificacion_Firmaprofesional_CIF_A62634068_2.crt
│   │   │   ├── [01;36mAutoridad_de_Certificacion_Firmaprofesional_CIF_A62634068.pem[0m -> /usr/share/ca-certificates/mozilla/Autoridad_de_Certificacion_Firmaprofesional_CIF_A62634068.crt
│   │   │   ├── [01;36mb0e59380.0[0m -> GlobalSign_ECC_Root_CA_-_R4.pem
│   │   │   ├── [01;36mb1159c4c.0[0m -> DigiCert_Assured_ID_Root_CA.pem
│   │   │   ├── [01;36mb433981b.0[0m -> ANF_Secure_Server_Root_CA.pem
│   │   │   ├── [01;36mb66938e9.0[0m -> Secure_Global_CA.pem
│   │   │   ├── [01;36mb727005e.0[0m -> AffirmTrust_Premium.pem
│   │   │   ├── [01;36mb7a5b843.0[0m -> TWCA_Root_Certification_Authority.pem
│   │   │   ├── [01;36mb81b93f0.0[0m -> AC_RAIZ_FNMT-RCM_SERVIDORES_SEGUROS.pem
│   │   │   ├── [01;36mBaltimore_CyberTrust_Root.pem[0m -> /usr/share/ca-certificates/mozilla/Baltimore_CyberTrust_Root.crt
│   │   │   ├── [01;36mbf53fb88.0[0m -> Microsoft_RSA_Root_Certificate_Authority_2017.pem
│   │   │   ├── [01;36mBuypass_Class_2_Root_CA.pem[0m -> /usr/share/ca-certificates/mozilla/Buypass_Class_2_Root_CA.crt
│   │   │   ├── [01;36mBuypass_Class_3_Root_CA.pem[0m -> /usr/share/ca-certificates/mozilla/Buypass_Class_3_Root_CA.crt
│   │   │   ├── [01;36mc01eb047.0[0m -> UCA_Global_G2_Root.pem
│   │   │   ├── [01;36mc28a8a30.0[0m -> D-TRUST_Root_Class_3_CA_2_2009.pem
│   │   │   ├── [01;36mca6e4ad9.0[0m -> ePKI_Root_Certification_Authority.pem
│   │   │   ├── ca-certificates.crt
│   │   │   ├── [01;36mCA_Disig_Root_R2.pem[0m -> /usr/share/ca-certificates/mozilla/CA_Disig_Root_R2.crt
│   │   │   ├── [01;36mcbf06781.0[0m -> Go_Daddy_Root_Certificate_Authority_-_G2.pem
│   │   │   ├── [01;36mcc450945.0[0m -> Izenpe.com.pem
│   │   │   ├── [01;36mcd58d51e.0[0m -> Security_Communication_RootCA2.pem
│   │   │   ├── [01;36mcd8c0d63.0[0m -> AC_RAIZ_FNMT-RCM.pem
│   │   │   ├── [01;36mce5e74ef.0[0m -> Amazon_Root_CA_1.pem
│   │   │   ├── [01;36mCertainly_Root_E1.pem[0m -> /usr/share/ca-certificates/mozilla/Certainly_Root_E1.crt
│   │   │   ├── [01;36mCertainly_Root_R1.pem[0m -> /usr/share/ca-certificates/mozilla/Certainly_Root_R1.crt
│   │   │   ├── [01;36mCertigna.pem[0m -> /usr/share/ca-certificates/mozilla/Certigna.crt
│   │   │   ├── [01;36mCertigna_Root_CA.pem[0m -> /usr/share/ca-certificates/mozilla/Certigna_Root_CA.crt
│   │   │   ├── [01;36mcertSIGN_Root_CA_G2.pem[0m -> /usr/share/ca-certificates/mozilla/certSIGN_Root_CA_G2.crt
│   │   │   ├── [01;36mcertSIGN_ROOT_CA.pem[0m -> /usr/share/ca-certificates/mozilla/certSIGN_ROOT_CA.crt
│   │   │   ├── [01;36mCertum_EC-384_CA.pem[0m -> /usr/share/ca-certificates/mozilla/Certum_EC-384_CA.crt
│   │   │   ├── [01;36mCertum_Trusted_Network_CA_2.pem[0m -> /usr/share/ca-certificates/mozilla/Certum_Trusted_Network_CA_2.crt
│   │   │   ├── [01;36mCertum_Trusted_Network_CA.pem[0m -> /usr/share/ca-certificates/mozilla/Certum_Trusted_Network_CA.crt
│   │   │   ├── [01;36mCertum_Trusted_Root_CA.pem[0m -> /usr/share/ca-certificates/mozilla/Certum_Trusted_Root_CA.crt
│   │   │   ├── [01;36mCFCA_EV_ROOT.pem[0m -> /usr/share/ca-certificates/mozilla/CFCA_EV_ROOT.crt
│   │   │   ├── [01;36mComodo_AAA_Services_root.pem[0m -> /usr/share/ca-certificates/mozilla/Comodo_AAA_Services_root.crt
│   │   │   ├── [01;36mCOMODO_Certification_Authority.pem[0m -> /usr/share/ca-certificates/mozilla/COMODO_Certification_Authority.crt
│   │   │   ├── [01;36mCOMODO_ECC_Certification_Authority.pem[0m -> /usr/share/ca-certificates/mozilla/COMODO_ECC_Certification_Authority.crt
│   │   │   ├── [01;36mCOMODO_RSA_Certification_Authority.pem[0m -> /usr/share/ca-certificates/mozilla/COMODO_RSA_Certification_Authority.crt
│   │   │   ├── [01;36md4dae3dd.0[0m -> D-TRUST_Root_Class_3_CA_2_EV_2009.pem
│   │   │   ├── [01;36md52c538d.0[0m -> DigiCert_TLS_RSA4096_Root_G5.pem
│   │   │   ├── [01;36md6325660.0[0m -> COMODO_RSA_Certification_Authority.pem
│   │   │   ├── [01;36md7e8dc79.0[0m -> QuoVadis_Root_CA_2.pem
│   │   │   ├── [01;36md887a5bb.0[0m -> Trustwave_Global_ECC_P384_Certification_Authority.pem
│   │   │   ├── [01;36mdc4d6a89.0[0m -> GlobalSign_Root_CA_-_R6.pem
│   │   │   ├── [01;36mdd8e9d41.0[0m -> DigiCert_Global_Root_G3.pem
│   │   │   ├── [01;36mde6d66f3.0[0m -> Amazon_Root_CA_4.pem
│   │   │   ├── [01;36mDigiCert_Assured_ID_Root_CA.pem[0m -> /usr/share/ca-certificates/mozilla/DigiCert_Assured_ID_Root_CA.crt
│   │   │   ├── [01;36mDigiCert_Assured_ID_Root_G2.pem[0m -> /usr/share/ca-certificates/mozilla/DigiCert_Assured_ID_Root_G2.crt
│   │   │   ├── [01;36mDigiCert_Assured_ID_Root_G3.pem[0m -> /usr/share/ca-certificates/mozilla/DigiCert_Assured_ID_Root_G3.crt
│   │   │   ├── [01;36mDigiCert_Global_Root_CA.pem[0m -> /usr/share/ca-certificates/mozilla/DigiCert_Global_Root_CA.crt
│   │   │   ├── [01;36mDigiCert_Global_Root_G2.pem[0m -> /usr/share/ca-certificates/mozilla/DigiCert_Global_Root_G2.crt
│   │   │   ├── [01;36mDigiCert_Global_Root_G3.pem[0m -> /usr/share/ca-certificates/mozilla/DigiCert_Global_Root_G3.crt
│   │   │   ├── [01;36mDigiCert_High_Assurance_EV_Root_CA.pem[0m -> /usr/share/ca-certificates/mozilla/DigiCert_High_Assurance_EV_Root_CA.crt
│   │   │   ├── [01;36mDigiCert_TLS_ECC_P384_Root_G5.pem[0m -> /usr/share/ca-certificates/mozilla/DigiCert_TLS_ECC_P384_Root_G5.crt
│   │   │   ├── [01;36mDigiCert_TLS_RSA4096_Root_G5.pem[0m -> /usr/share/ca-certificates/mozilla/DigiCert_TLS_RSA4096_Root_G5.crt
│   │   │   ├── [01;36mDigiCert_Trusted_Root_G4.pem[0m -> /usr/share/ca-certificates/mozilla/DigiCert_Trusted_Root_G4.crt
│   │   │   ├── [01;36mD-TRUST_BR_Root_CA_1_2020.pem[0m -> /usr/share/ca-certificates/mozilla/D-TRUST_BR_Root_CA_1_2020.crt
│   │   │   ├── [01;36mD-TRUST_EV_Root_CA_1_2020.pem[0m -> /usr/share/ca-certificates/mozilla/D-TRUST_EV_Root_CA_1_2020.crt
│   │   │   ├── [01;36mD-TRUST_Root_Class_3_CA_2_2009.pem[0m -> /usr/share/ca-certificates/mozilla/D-TRUST_Root_Class_3_CA_2_2009.crt
│   │   │   ├── [01;36mD-TRUST_Root_Class_3_CA_2_EV_2009.pem[0m -> /usr/share/ca-certificates/mozilla/D-TRUST_Root_Class_3_CA_2_EV_2009.crt
│   │   │   ├── [01;36me113c810.0[0m -> Certigna.pem
│   │   │   ├── [01;36me18bfb83.0[0m -> QuoVadis_Root_CA_3_G3.pem
│   │   │   ├── [01;36me35234b1.0[0m -> Certum_Trusted_Root_CA.pem
│   │   │   ├── [01;36me36a6752.0[0m -> Atos_TrustedRoot_2011.pem
│   │   │   ├── [01;36me73d606e.0[0m -> OISTE_WISeKey_Global_Root_GB_CA.pem
│   │   │   ├── [01;36me868b802.0[0m -> e-Szigno_Root_CA_2017.pem
│   │   │   ├── [01;36me8de2f56.0[0m -> Buypass_Class_3_Root_CA.pem
│   │   │   ├── [01;36mecccd8db.0[0m -> HARICA_TLS_ECC_Root_CA_2021.pem
│   │   │   ├── [01;36med858448.0[0m -> vTrus_ECC_Root_CA.pem
│   │   │   ├── [01;36mee64a828.0[0m -> Comodo_AAA_Services_root.pem
│   │   │   ├── [01;36meed8c118.0[0m -> COMODO_ECC_Certification_Authority.pem
│   │   │   ├── [01;36mef954a4e.0[0m -> IdenTrust_Commercial_Root_CA_1.pem
│   │   │   ├── [01;36memSign_ECC_Root_CA_-_C3.pem[0m -> /usr/share/ca-certificates/mozilla/emSign_ECC_Root_CA_-_C3.crt
│   │   │   ├── [01;36memSign_ECC_Root_CA_-_G3.pem[0m -> /usr/share/ca-certificates/mozilla/emSign_ECC_Root_CA_-_G3.crt
│   │   │   ├── [01;36memSign_Root_CA_-_C1.pem[0m -> /usr/share/ca-certificates/mozilla/emSign_Root_CA_-_C1.crt
│   │   │   ├── [01;36memSign_Root_CA_-_G1.pem[0m -> /usr/share/ca-certificates/mozilla/emSign_Root_CA_-_G1.crt
│   │   │   ├── [01;36mEntrust.net_Premium_2048_Secure_Server_CA.pem[0m -> /usr/share/ca-certificates/mozilla/Entrust.net_Premium_2048_Secure_Server_CA.crt
│   │   │   ├── [01;36mEntrust_Root_Certification_Authority_-_EC1.pem[0m -> /usr/share/ca-certificates/mozilla/Entrust_Root_Certification_Authority_-_EC1.crt
│   │   │   ├── [01;36mEntrust_Root_Certification_Authority_-_G2.pem[0m -> /usr/share/ca-certificates/mozilla/Entrust_Root_Certification_Authority_-_G2.crt
│   │   │   ├── [01;36mEntrust_Root_Certification_Authority_-_G4.pem[0m -> /usr/share/ca-certificates/mozilla/Entrust_Root_Certification_Authority_-_G4.crt
│   │   │   ├── [01;36mEntrust_Root_Certification_Authority.pem[0m -> /usr/share/ca-certificates/mozilla/Entrust_Root_Certification_Authority.crt
│   │   │   ├── [01;36mePKI_Root_Certification_Authority.pem[0m -> /usr/share/ca-certificates/mozilla/ePKI_Root_Certification_Authority.crt
│   │   │   ├── [01;36me-Szigno_Root_CA_2017.pem[0m -> /usr/share/ca-certificates/mozilla/e-Szigno_Root_CA_2017.crt
│   │   │   ├── [01;36mE-Tugra_Certification_Authority.pem[0m -> /usr/share/ca-certificates/mozilla/E-Tugra_Certification_Authority.crt
│   │   │   ├── [01;36mE-Tugra_Global_Root_CA_ECC_v3.pem[0m -> /usr/share/ca-certificates/mozilla/E-Tugra_Global_Root_CA_ECC_v3.crt
│   │   │   ├── [01;36mE-Tugra_Global_Root_CA_RSA_v3.pem[0m -> /usr/share/ca-certificates/mozilla/E-Tugra_Global_Root_CA_RSA_v3.crt
│   │   │   ├── [01;36mf081611a.0[0m -> Go_Daddy_Class_2_CA.pem
│   │   │   ├── [01;36mf0c70a8d.0[0m -> SSL.com_EV_Root_Certification_Authority_ECC.pem
│   │   │   ├── [01;36mf249de83.0[0m -> Trustwave_Global_Certification_Authority.pem
│   │   │   ├── [01;36mf30dd6ad.0[0m -> USERTrust_ECC_Certification_Authority.pem
│   │   │   ├── [01;36mf3377b1b.0[0m -> Security_Communication_Root_CA.pem
│   │   │   ├── [01;36mf387163d.0[0m -> Starfield_Class_2_CA.pem
│   │   │   ├── [01;36mf39fc864.0[0m -> SecureTrust_CA.pem
│   │   │   ├── [01;36mf51bb24c.0[0m -> Certigna_Root_CA.pem
│   │   │   ├── [01;36mfa5da96b.0[0m -> GLOBALTRUST_2020.pem
│   │   │   ├── [01;36mfc5a8f99.0[0m -> USERTrust_RSA_Certification_Authority.pem
│   │   │   ├── [01;36mfd64f3fc.0[0m -> TunTrust_Root_CA.pem
│   │   │   ├── [01;36mfe8a2cd8.0[0m -> SZAFIR_ROOT_CA2.pem
│   │   │   ├── [01;36mfeffd413.0[0m -> GlobalSign_Root_E46.pem
│   │   │   ├── [01;36mff34af3f.0[0m -> TUBITAK_Kamu_SM_SSL_Kok_Sertifikasi_-_Surum_1.pem
│   │   │   ├── [01;36mGDCA_TrustAUTH_R5_ROOT.pem[0m -> /usr/share/ca-certificates/mozilla/GDCA_TrustAUTH_R5_ROOT.crt
│   │   │   ├── [01;36mGlobalSign_ECC_Root_CA_-_R4.pem[0m -> /usr/share/ca-certificates/mozilla/GlobalSign_ECC_Root_CA_-_R4.crt
│   │   │   ├── [01;36mGlobalSign_ECC_Root_CA_-_R5.pem[0m -> /usr/share/ca-certificates/mozilla/GlobalSign_ECC_Root_CA_-_R5.crt
│   │   │   ├── [01;36mGlobalSign_Root_CA.pem[0m -> /usr/share/ca-certificates/mozilla/GlobalSign_Root_CA.crt
│   │   │   ├── [01;36mGlobalSign_Root_CA_-_R3.pem[0m -> /usr/share/ca-certificates/mozilla/GlobalSign_Root_CA_-_R3.crt
│   │   │   ├── [01;36mGlobalSign_Root_CA_-_R6.pem[0m -> /usr/share/ca-certificates/mozilla/GlobalSign_Root_CA_-_R6.crt
│   │   │   ├── [01;36mGlobalSign_Root_E46.pem[0m -> /usr/share/ca-certificates/mozilla/GlobalSign_Root_E46.crt
│   │   │   ├── [01;36mGlobalSign_Root_R46.pem[0m -> /usr/share/ca-certificates/mozilla/GlobalSign_Root_R46.crt
│   │   │   ├── [01;36mGLOBALTRUST_2020.pem[0m -> /usr/share/ca-certificates/mozilla/GLOBALTRUST_2020.crt
│   │   │   ├── [01;36mGo_Daddy_Class_2_CA.pem[0m -> /usr/share/ca-certificates/mozilla/Go_Daddy_Class_2_CA.crt
│   │   │   ├── [01;36mGo_Daddy_Root_Certificate_Authority_-_G2.pem[0m -> /usr/share/ca-certificates/mozilla/Go_Daddy_Root_Certificate_Authority_-_G2.crt
│   │   │   ├── [01;36mGTS_Root_R1.pem[0m -> /usr/share/ca-certificates/mozilla/GTS_Root_R1.crt
│   │   │   ├── [01;36mGTS_Root_R2.pem[0m -> /usr/share/ca-certificates/mozilla/GTS_Root_R2.crt
│   │   │   ├── [01;36mGTS_Root_R3.pem[0m -> /usr/share/ca-certificates/mozilla/GTS_Root_R3.crt
│   │   │   ├── [01;36mGTS_Root_R4.pem[0m -> /usr/share/ca-certificates/mozilla/GTS_Root_R4.crt
│   │   │   ├── [01;36mHARICA_TLS_ECC_Root_CA_2021.pem[0m -> /usr/share/ca-certificates/mozilla/HARICA_TLS_ECC_Root_CA_2021.crt
│   │   │   ├── [01;36mHARICA_TLS_RSA_Root_CA_2021.pem[0m -> /usr/share/ca-certificates/mozilla/HARICA_TLS_RSA_Root_CA_2021.crt
│   │   │   ├── [01;36mHellenic_Academic_and_Research_Institutions_ECC_RootCA_2015.pem[0m -> /usr/share/ca-certificates/mozilla/Hellenic_Academic_and_Research_Institutions_ECC_RootCA_2015.crt
│   │   │   ├── [01;36mHellenic_Academic_and_Research_Institutions_RootCA_2015.pem[0m -> /usr/share/ca-certificates/mozilla/Hellenic_Academic_and_Research_Institutions_RootCA_2015.crt
│   │   │   ├── [01;36mHiPKI_Root_CA_-_G1.pem[0m -> /usr/share/ca-certificates/mozilla/HiPKI_Root_CA_-_G1.crt
│   │   │   ├── [01;36mHongkong_Post_Root_CA_1.pem[0m -> /usr/share/ca-certificates/mozilla/Hongkong_Post_Root_CA_1.crt
│   │   │   ├── [01;36mHongkong_Post_Root_CA_3.pem[0m -> /usr/share/ca-certificates/mozilla/Hongkong_Post_Root_CA_3.crt
│   │   │   ├── [01;36mIdenTrust_Commercial_Root_CA_1.pem[0m -> /usr/share/ca-certificates/mozilla/IdenTrust_Commercial_Root_CA_1.crt
│   │   │   ├── [01;36mIdenTrust_Public_Sector_Root_CA_1.pem[0m -> /usr/share/ca-certificates/mozilla/IdenTrust_Public_Sector_Root_CA_1.crt
│   │   │   ├── [01;36mISRG_Root_X1.pem[0m -> /usr/share/ca-certificates/mozilla/ISRG_Root_X1.crt
│   │   │   ├── [01;36mISRG_Root_X2.pem[0m -> /usr/share/ca-certificates/mozilla/ISRG_Root_X2.crt
│   │   │   ├── [01;36mIzenpe.com.pem[0m -> /usr/share/ca-certificates/mozilla/Izenpe.com.crt
│   │   │   ├── [01;36mMicrosec_e-Szigno_Root_CA_2009.pem[0m -> /usr/share/ca-certificates/mozilla/Microsec_e-Szigno_Root_CA_2009.crt
│   │   │   ├── [01;36mMicrosoft_ECC_Root_Certificate_Authority_2017.pem[0m -> /usr/share/ca-certificates/mozilla/Microsoft_ECC_Root_Certificate_Authority_2017.crt
│   │   │   ├── [01;36mMicrosoft_RSA_Root_Certificate_Authority_2017.pem[0m -> /usr/share/ca-certificates/mozilla/Microsoft_RSA_Root_Certificate_Authority_2017.crt
│   │   │   ├── [01;36mNAVER_Global_Root_Certification_Authority.pem[0m -> /usr/share/ca-certificates/mozilla/NAVER_Global_Root_Certification_Authority.crt
│   │   │   ├── [01;36mNetLock_Arany_=Class_Gold=_Főtanúsítvány.pem[0m -> /usr/share/ca-certificates/mozilla/NetLock_Arany_=Class_Gold=_Főtanúsítvány.crt
│   │   │   ├── [01;36mOISTE_WISeKey_Global_Root_GB_CA.pem[0m -> /usr/share/ca-certificates/mozilla/OISTE_WISeKey_Global_Root_GB_CA.crt
│   │   │   ├── [01;36mOISTE_WISeKey_Global_Root_GC_CA.pem[0m -> /usr/share/ca-certificates/mozilla/OISTE_WISeKey_Global_Root_GC_CA.crt
│   │   │   ├── [01;36mQuoVadis_Root_CA_1_G3.pem[0m -> /usr/share/ca-certificates/mozilla/QuoVadis_Root_CA_1_G3.crt
│   │   │   ├── [01;36mQuoVadis_Root_CA_2_G3.pem[0m -> /usr/share/ca-certificates/mozilla/QuoVadis_Root_CA_2_G3.crt
│   │   │   ├── [01;36mQuoVadis_Root_CA_2.pem[0m -> /usr/share/ca-certificates/mozilla/QuoVadis_Root_CA_2.crt
│   │   │   ├── [01;36mQuoVadis_Root_CA_3_G3.pem[0m -> /usr/share/ca-certificates/mozilla/QuoVadis_Root_CA_3_G3.crt
│   │   │   ├── [01;36mQuoVadis_Root_CA_3.pem[0m -> /usr/share/ca-certificates/mozilla/QuoVadis_Root_CA_3.crt
│   │   │   ├── [01;36mSecure_Global_CA.pem[0m -> /usr/share/ca-certificates/mozilla/Secure_Global_CA.crt
│   │   │   ├── [01;36mSecureSign_RootCA11.pem[0m -> /usr/share/ca-certificates/mozilla/SecureSign_RootCA11.crt
│   │   │   ├── [01;36mSecureTrust_CA.pem[0m -> /usr/share/ca-certificates/mozilla/SecureTrust_CA.crt
│   │   │   ├── [01;36mSecurity_Communication_ECC_RootCA1.pem[0m -> /usr/share/ca-certificates/mozilla/Security_Communication_ECC_RootCA1.crt
│   │   │   ├── [01;36mSecurity_Communication_RootCA2.pem[0m -> /usr/share/ca-certificates/mozilla/Security_Communication_RootCA2.crt
│   │   │   ├── [01;36mSecurity_Communication_RootCA3.pem[0m -> /usr/share/ca-certificates/mozilla/Security_Communication_RootCA3.crt
│   │   │   ├── [01;36mSecurity_Communication_Root_CA.pem[0m -> /usr/share/ca-certificates/mozilla/Security_Communication_Root_CA.crt
│   │   │   ├── [01;36mSSL.com_EV_Root_Certification_Authority_ECC.pem[0m -> /usr/share/ca-certificates/mozilla/SSL.com_EV_Root_Certification_Authority_ECC.crt
│   │   │   ├── [01;36mSSL.com_EV_Root_Certification_Authority_RSA_R2.pem[0m -> /usr/share/ca-certificates/mozilla/SSL.com_EV_Root_Certification_Authority_RSA_R2.crt
│   │   │   ├── [01;36mSSL.com_Root_Certification_Authority_ECC.pem[0m -> /usr/share/ca-certificates/mozilla/SSL.com_Root_Certification_Authority_ECC.crt
│   │   │   ├── [01;36mSSL.com_Root_Certification_Authority_RSA.pem[0m -> /usr/share/ca-certificates/mozilla/SSL.com_Root_Certification_Authority_RSA.crt
│   │   │   ├── [01;36mStarfield_Class_2_CA.pem[0m -> /usr/share/ca-certificates/mozilla/Starfield_Class_2_CA.crt
│   │   │   ├── [01;36mStarfield_Root_Certificate_Authority_-_G2.pem[0m -> /usr/share/ca-certificates/mozilla/Starfield_Root_Certificate_Authority_-_G2.crt
│   │   │   ├── [01;36mStarfield_Services_Root_Certificate_Authority_-_G2.pem[0m -> /usr/share/ca-certificates/mozilla/Starfield_Services_Root_Certificate_Authority_-_G2.crt
│   │   │   ├── [01;36mSwissSign_Gold_CA_-_G2.pem[0m -> /usr/share/ca-certificates/mozilla/SwissSign_Gold_CA_-_G2.crt
│   │   │   ├── [01;36mSwissSign_Silver_CA_-_G2.pem[0m -> /usr/share/ca-certificates/mozilla/SwissSign_Silver_CA_-_G2.crt
│   │   │   ├── [01;36mSZAFIR_ROOT_CA2.pem[0m -> /usr/share/ca-certificates/mozilla/SZAFIR_ROOT_CA2.crt
│   │   │   ├── [01;36mTelia_Root_CA_v2.pem[0m -> /usr/share/ca-certificates/mozilla/Telia_Root_CA_v2.crt
│   │   │   ├── [01;36mTeliaSonera_Root_CA_v1.pem[0m -> /usr/share/ca-certificates/mozilla/TeliaSonera_Root_CA_v1.crt
│   │   │   ├── [01;36mTrustwave_Global_Certification_Authority.pem[0m -> /usr/share/ca-certificates/mozilla/Trustwave_Global_Certification_Authority.crt
│   │   │   ├── [01;36mTrustwave_Global_ECC_P256_Certification_Authority.pem[0m -> /usr/share/ca-certificates/mozilla/Trustwave_Global_ECC_P256_Certification_Authority.crt
│   │   │   ├── [01;36mTrustwave_Global_ECC_P384_Certification_Authority.pem[0m -> /usr/share/ca-certificates/mozilla/Trustwave_Global_ECC_P384_Certification_Authority.crt
│   │   │   ├── [01;36mT-TeleSec_GlobalRoot_Class_2.pem[0m -> /usr/share/ca-certificates/mozilla/T-TeleSec_GlobalRoot_Class_2.crt
│   │   │   ├── [01;36mT-TeleSec_GlobalRoot_Class_3.pem[0m -> /usr/share/ca-certificates/mozilla/T-TeleSec_GlobalRoot_Class_3.crt
│   │   │   ├── [01;36mTUBITAK_Kamu_SM_SSL_Kok_Sertifikasi_-_Surum_1.pem[0m -> /usr/share/ca-certificates/mozilla/TUBITAK_Kamu_SM_SSL_Kok_Sertifikasi_-_Surum_1.crt
│   │   │   ├── [01;36mTunTrust_Root_CA.pem[0m -> /usr/share/ca-certificates/mozilla/TunTrust_Root_CA.crt
│   │   │   ├── [01;36mTWCA_Global_Root_CA.pem[0m -> /usr/share/ca-certificates/mozilla/TWCA_Global_Root_CA.crt
│   │   │   ├── [01;36mTWCA_Root_Certification_Authority.pem[0m -> /usr/share/ca-certificates/mozilla/TWCA_Root_Certification_Authority.crt
│   │   │   ├── [01;36mUCA_Extended_Validation_Root.pem[0m -> /usr/share/ca-certificates/mozilla/UCA_Extended_Validation_Root.crt
│   │   │   ├── [01;36mUCA_Global_G2_Root.pem[0m -> /usr/share/ca-certificates/mozilla/UCA_Global_G2_Root.crt
│   │   │   ├── [01;36mUSERTrust_ECC_Certification_Authority.pem[0m -> /usr/share/ca-certificates/mozilla/USERTrust_ECC_Certification_Authority.crt
│   │   │   ├── [01;36mUSERTrust_RSA_Certification_Authority.pem[0m -> /usr/share/ca-certificates/mozilla/USERTrust_RSA_Certification_Authority.crt
│   │   │   ├── [01;36mvTrus_ECC_Root_CA.pem[0m -> /usr/share/ca-certificates/mozilla/vTrus_ECC_Root_CA.crt
│   │   │   ├── [01;36mvTrus_Root_CA.pem[0m -> /usr/share/ca-certificates/mozilla/vTrus_Root_CA.crt
│   │   │   └── [01;36mXRamp_Global_CA_Root.pem[0m -> /usr/share/ca-certificates/mozilla/XRamp_Global_CA_Root.crt
│   │   ├── openssl.cnf
│   │   └── [01;34mprivate[0m
│   ├── [01;34msystemd[0m
│   │   └── [01;34muser[0m
│   │       └── [01;34msockets.target.wants[0m
│   │           ├── [01;36mdirmngr.socket[0m -> /lib/systemd/user/dirmngr.socket
│   │           ├── [01;36mgpg-agent-browser.socket[0m -> /lib/systemd/user/gpg-agent-browser.socket
│   │           ├── [01;36mgpg-agent-extra.socket[0m -> /lib/systemd/user/gpg-agent-extra.socket
│   │           ├── [01;36mgpg-agent.socket[0m -> /lib/systemd/user/gpg-agent.socket
│   │           └── [01;36mgpg-agent-ssh.socket[0m -> /lib/systemd/user/gpg-agent-ssh.socket
│   └── [01;34mX11[0m
│       └── [01;34mXsession.d[0m
│           └── 90gpg-agent
├── nodesource_setup.sh
├── [30;42mtmp[0m
├── [01;34musr[0m
│   ├── [01;34mbin[0m
│   │   ├── [01;36mcorepack[0m -> [01;32m../lib/node_modules/corepack/dist/corepack.js[0m
│   │   ├── [01;32mc_rehash[0m
│   │   ├── [01;32mcurl[0m
│   │   ├── [01;32mdirmngr[0m
│   │   ├── [01;32mdirmngr-client[0m
│   │   ├── [01;32mgpg[0m
│   │   ├── [01;32mgpg-agent[0m
│   │   ├── [01;32mgpgcompose[0m
│   │   ├── [01;32mgpgconf[0m
│   │   ├── [01;32mgpg-connect-agent[0m
│   │   ├── [01;32mgpgparsemail[0m
│   │   ├── [01;32mgpgsm[0m
│   │   ├── [01;32mgpgsplit[0m
│   │   ├── [01;32mgpgtar[0m
│   │   ├── [01;32mgpg-wks-server[0m
│   │   ├── [01;32mgpg-zip[0m
│   │   ├── [01;32mkbxutil[0m
│   │   ├── [01;32mlspgpot[0m
│   │   ├── [01;32mmigrate-pubring-from-classic-gpg[0m
│   │   ├── [01;32mnode[0m
│   │   ├── [01;36mnodejs[0m -> [01;32m/etc/alternatives/nodejs[0m
│   │   ├── [01;36mnpm[0m -> [01;32m../lib/node_modules/npm/bin/npm-cli.js[0m
│   │   ├── [01;36mnpx[0m -> [01;32m../lib/node_modules/npm/bin/npx-cli.js[0m
│   │   ├── [01;32mopenssl[0m
│   │   ├── [01;36mpdb3[0m -> [01;32mpdb3.10[0m
│   │   ├── [01;36mpdb3.10[0m -> [01;32m../lib/python3.10/pdb.py[0m
│   │   ├── [01;36mpinentry[0m -> [01;32m/etc/alternatives/pinentry[0m
│   │   ├── [01;32mpinentry-curses[0m
│   │   ├── [01;32mpy3clean[0m
│   │   ├── [01;32mpy3compile[0m
│   │   ├── [01;36mpy3versions[0m -> [01;32m../share/python3/py3versions.py[0m
│   │   ├── [01;36mpydoc3[0m -> [01;32mpydoc3.10[0m
│   │   ├── [01;32mpydoc3.10[0m
│   │   ├── [01;36mpygettext3[0m -> [01;32mpygettext3.10[0m
│   │   ├── [01;32mpygettext3.10[0m
│   │   ├── [01;36mpython3[0m -> [01;32mpython3.10[0m
│   │   ├── [01;32mpython3.10[0m
│   │   └── [01;32mwatchgnupg[0m
│   ├── [01;34minclude[0m
│   │   └── [01;34mnode[0m
│   │       ├── common.gypi
│   │       ├── config.gypi
│   │       ├── [01;34mcppgc[0m
│   │       │   ├── allocation.h
│   │       │   ├── common.h
│   │       │   ├── cross-thread-persistent.h
│   │       │   ├── custom-space.h
│   │       │   ├── default-platform.h
│   │       │   ├── ephemeron-pair.h
│   │       │   ├── explicit-management.h
│   │       │   ├── garbage-collected.h
│   │       │   ├── heap-consistency.h
│   │       │   ├── heap.h
│   │       │   ├── heap-handle.h
│   │       │   ├── heap-state.h
│   │       │   ├── heap-statistics.h
│   │       │   ├── [01;34minternal[0m
│   │       │   │   ├── api-constants.h
│   │       │   │   ├── atomic-entry-flag.h
│   │       │   │   ├── base-page-handle.h
│   │       │   │   ├── caged-heap.h
│   │       │   │   ├── caged-heap-local-data.h
│   │       │   │   ├── compiler-specific.h
│   │       │   │   ├── finalizer-trait.h
│   │       │   │   ├── gc-info.h
│   │       │   │   ├── logging.h
│   │       │   │   ├── member-storage.h
│   │       │   │   ├── name-trait.h
│   │       │   │   ├── persistent-node.h
│   │       │   │   ├── pointer-policies.h
│   │       │   │   └── write-barrier.h
│   │       │   ├── liveness-broker.h
│   │       │   ├── macros.h
│   │       │   ├── member.h
│   │       │   ├── name-provider.h
│   │       │   ├── object-size-trait.h
│   │       │   ├── persistent.h
│   │       │   ├── platform.h
│   │       │   ├── prefinalizer.h
│   │       │   ├── process-heap-statistics.h
│   │       │   ├── sentinel-pointer.h
│   │       │   ├── source-location.h
│   │       │   ├── testing.h
│   │       │   ├── trace-trait.h
│   │       │   ├── type-traits.h
│   │       │   └── visitor.h
│   │       ├── js_native_api.h
│   │       ├── js_native_api_types.h
│   │       ├── [01;34mlibplatform[0m
│   │       │   ├── libplatform-export.h
│   │       │   ├── libplatform.h
│   │       │   └── v8-tracing.h
│   │       ├── node_api.h
│   │       ├── node_api_types.h
│   │       ├── node_buffer.h
│   │       ├── node.h
│   │       ├── node_object_wrap.h
│   │       ├── node_version.h
│   │       ├── [01;34mopenssl[0m
│   │       │   ├── aes.h
│   │       │   ├── [01;34marchs[0m
│   │       │   │   ├── [01;34maix64-gcc-as[0m
│   │       │   │   │   ├── [01;34masm[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   ├── [01;34masm_avx2[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   └── [01;34mno-asm[0m
│   │       │   │   │       ├── [01;34mcrypto[0m
│   │       │   │   │       │   └── buildinf.h
│   │       │   │   │       ├── [01;34minclude[0m
│   │       │   │   │       │   ├── [01;34mcrypto[0m
│   │       │   │   │       │   │   ├── bn_conf.h
│   │       │   │   │       │   │   └── dso_conf.h
│   │       │   │   │       │   ├── [01;34mopenssl[0m
│   │       │   │   │       │   │   ├── asn1.h
│   │       │   │   │       │   │   ├── asn1t.h
│   │       │   │   │       │   │   ├── bio.h
│   │       │   │   │       │   │   ├── cmp.h
│   │       │   │   │       │   │   ├── cms.h
│   │       │   │   │       │   │   ├── conf.h
│   │       │   │   │       │   │   ├── configuration.h
│   │       │   │   │       │   │   ├── crmf.h
│   │       │   │   │       │   │   ├── crypto.h
│   │       │   │   │       │   │   ├── ct.h
│   │       │   │   │       │   │   ├── err.h
│   │       │   │   │       │   │   ├── ess.h
│   │       │   │   │       │   │   ├── fipskey.h
│   │       │   │   │       │   │   ├── lhash.h
│   │       │   │   │       │   │   ├── ocsp.h
│   │       │   │   │       │   │   ├── opensslv.h
│   │       │   │   │       │   │   ├── pkcs12.h
│   │       │   │   │       │   │   ├── pkcs7.h
│   │       │   │   │       │   │   ├── safestack.h
│   │       │   │   │       │   │   ├── srp.h
│   │       │   │   │       │   │   ├── ssl.h
│   │       │   │   │       │   │   ├── ui.h
│   │       │   │   │       │   │   ├── x509.h
│   │       │   │   │       │   │   ├── x509v3.h
│   │       │   │   │       │   │   └── x509_vfy.h
│   │       │   │   │       │   └── progs.h
│   │       │   │   │       └── [01;34mproviders[0m
│   │       │   │   │           └── [01;34mcommon[0m
│   │       │   │   │               └── [01;34minclude[0m
│   │       │   │   │                   └── [01;34mprov[0m
│   │       │   │   │                       ├── der_digests.h
│   │       │   │   │                       ├── der_dsa.h
│   │       │   │   │                       ├── der_ec.h
│   │       │   │   │                       ├── der_ecx.h
│   │       │   │   │                       ├── der_rsa.h
│   │       │   │   │                       ├── der_sm2.h
│   │       │   │   │                       └── der_wrap.h
│   │       │   │   ├── [01;34mBSD-x86[0m
│   │       │   │   │   ├── [01;34masm[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   ├── [01;34masm_avx2[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   └── [01;34mno-asm[0m
│   │       │   │   │       ├── [01;34mcrypto[0m
│   │       │   │   │       │   └── buildinf.h
│   │       │   │   │       ├── [01;34minclude[0m
│   │       │   │   │       │   ├── [01;34mcrypto[0m
│   │       │   │   │       │   │   ├── bn_conf.h
│   │       │   │   │       │   │   └── dso_conf.h
│   │       │   │   │       │   ├── [01;34mopenssl[0m
│   │       │   │   │       │   │   ├── asn1.h
│   │       │   │   │       │   │   ├── asn1t.h
│   │       │   │   │       │   │   ├── bio.h
│   │       │   │   │       │   │   ├── cmp.h
│   │       │   │   │       │   │   ├── cms.h
│   │       │   │   │       │   │   ├── conf.h
│   │       │   │   │       │   │   ├── configuration.h
│   │       │   │   │       │   │   ├── crmf.h
│   │       │   │   │       │   │   ├── crypto.h
│   │       │   │   │       │   │   ├── ct.h
│   │       │   │   │       │   │   ├── err.h
│   │       │   │   │       │   │   ├── ess.h
│   │       │   │   │       │   │   ├── fipskey.h
│   │       │   │   │       │   │   ├── lhash.h
│   │       │   │   │       │   │   ├── ocsp.h
│   │       │   │   │       │   │   ├── opensslv.h
│   │       │   │   │       │   │   ├── pkcs12.h
│   │       │   │   │       │   │   ├── pkcs7.h
│   │       │   │   │       │   │   ├── safestack.h
│   │       │   │   │       │   │   ├── srp.h
│   │       │   │   │       │   │   ├── ssl.h
│   │       │   │   │       │   │   ├── ui.h
│   │       │   │   │       │   │   ├── x509.h
│   │       │   │   │       │   │   ├── x509v3.h
│   │       │   │   │       │   │   └── x509_vfy.h
│   │       │   │   │       │   └── progs.h
│   │       │   │   │       └── [01;34mproviders[0m
│   │       │   │   │           └── [01;34mcommon[0m
│   │       │   │   │               └── [01;34minclude[0m
│   │       │   │   │                   └── [01;34mprov[0m
│   │       │   │   │                       ├── der_digests.h
│   │       │   │   │                       ├── der_dsa.h
│   │       │   │   │                       ├── der_ec.h
│   │       │   │   │                       ├── der_ecx.h
│   │       │   │   │                       ├── der_rsa.h
│   │       │   │   │                       ├── der_sm2.h
│   │       │   │   │                       └── der_wrap.h
│   │       │   │   ├── [01;34mBSD-x86_64[0m
│   │       │   │   │   ├── [01;34masm[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   ├── [01;34masm_avx2[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   └── [01;34mno-asm[0m
│   │       │   │   │       ├── [01;34mcrypto[0m
│   │       │   │   │       │   └── buildinf.h
│   │       │   │   │       ├── [01;34minclude[0m
│   │       │   │   │       │   ├── [01;34mcrypto[0m
│   │       │   │   │       │   │   ├── bn_conf.h
│   │       │   │   │       │   │   └── dso_conf.h
│   │       │   │   │       │   ├── [01;34mopenssl[0m
│   │       │   │   │       │   │   ├── asn1.h
│   │       │   │   │       │   │   ├── asn1t.h
│   │       │   │   │       │   │   ├── bio.h
│   │       │   │   │       │   │   ├── cmp.h
│   │       │   │   │       │   │   ├── cms.h
│   │       │   │   │       │   │   ├── conf.h
│   │       │   │   │       │   │   ├── configuration.h
│   │       │   │   │       │   │   ├── crmf.h
│   │       │   │   │       │   │   ├── crypto.h
│   │       │   │   │       │   │   ├── ct.h
│   │       │   │   │       │   │   ├── err.h
│   │       │   │   │       │   │   ├── ess.h
│   │       │   │   │       │   │   ├── fipskey.h
│   │       │   │   │       │   │   ├── lhash.h
│   │       │   │   │       │   │   ├── ocsp.h
│   │       │   │   │       │   │   ├── opensslv.h
│   │       │   │   │       │   │   ├── pkcs12.h
│   │       │   │   │       │   │   ├── pkcs7.h
│   │       │   │   │       │   │   ├── safestack.h
│   │       │   │   │       │   │   ├── srp.h
│   │       │   │   │       │   │   ├── ssl.h
│   │       │   │   │       │   │   ├── ui.h
│   │       │   │   │       │   │   ├── x509.h
│   │       │   │   │       │   │   ├── x509v3.h
│   │       │   │   │       │   │   └── x509_vfy.h
│   │       │   │   │       │   └── progs.h
│   │       │   │   │       └── [01;34mproviders[0m
│   │       │   │   │           └── [01;34mcommon[0m
│   │       │   │   │               └── [01;34minclude[0m
│   │       │   │   │                   └── [01;34mprov[0m
│   │       │   │   │                       ├── der_digests.h
│   │       │   │   │                       ├── der_dsa.h
│   │       │   │   │                       ├── der_ec.h
│   │       │   │   │                       ├── der_ecx.h
│   │       │   │   │                       ├── der_rsa.h
│   │       │   │   │                       ├── der_sm2.h
│   │       │   │   │                       └── der_wrap.h
│   │       │   │   ├── [01;34mdarwin64-arm64-cc[0m
│   │       │   │   │   ├── [01;34masm[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   ├── [01;34masm_avx2[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   └── [01;34mno-asm[0m
│   │       │   │   │       ├── [01;34mcrypto[0m
│   │       │   │   │       │   └── buildinf.h
│   │       │   │   │       ├── [01;34minclude[0m
│   │       │   │   │       │   ├── [01;34mcrypto[0m
│   │       │   │   │       │   │   ├── bn_conf.h
│   │       │   │   │       │   │   └── dso_conf.h
│   │       │   │   │       │   ├── [01;34mopenssl[0m
│   │       │   │   │       │   │   ├── asn1.h
│   │       │   │   │       │   │   ├── asn1t.h
│   │       │   │   │       │   │   ├── bio.h
│   │       │   │   │       │   │   ├── cmp.h
│   │       │   │   │       │   │   ├── cms.h
│   │       │   │   │       │   │   ├── conf.h
│   │       │   │   │       │   │   ├── configuration.h
│   │       │   │   │       │   │   ├── crmf.h
│   │       │   │   │       │   │   ├── crypto.h
│   │       │   │   │       │   │   ├── ct.h
│   │       │   │   │       │   │   ├── err.h
│   │       │   │   │       │   │   ├── ess.h
│   │       │   │   │       │   │   ├── fipskey.h
│   │       │   │   │       │   │   ├── lhash.h
│   │       │   │   │       │   │   ├── ocsp.h
│   │       │   │   │       │   │   ├── opensslv.h
│   │       │   │   │       │   │   ├── pkcs12.h
│   │       │   │   │       │   │   ├── pkcs7.h
│   │       │   │   │       │   │   ├── safestack.h
│   │       │   │   │       │   │   ├── srp.h
│   │       │   │   │       │   │   ├── ssl.h
│   │       │   │   │       │   │   ├── ui.h
│   │       │   │   │       │   │   ├── x509.h
│   │       │   │   │       │   │   ├── x509v3.h
│   │       │   │   │       │   │   └── x509_vfy.h
│   │       │   │   │       │   └── progs.h
│   │       │   │   │       └── [01;34mproviders[0m
│   │       │   │   │           └── [01;34mcommon[0m
│   │       │   │   │               └── [01;34minclude[0m
│   │       │   │   │                   └── [01;34mprov[0m
│   │       │   │   │                       ├── der_digests.h
│   │       │   │   │                       ├── der_dsa.h
│   │       │   │   │                       ├── der_ec.h
│   │       │   │   │                       ├── der_ecx.h
│   │       │   │   │                       ├── der_rsa.h
│   │       │   │   │                       ├── der_sm2.h
│   │       │   │   │                       └── der_wrap.h
│   │       │   │   ├── [01;34mdarwin64-x86_64-cc[0m
│   │       │   │   │   ├── [01;34masm[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   ├── [01;34masm_avx2[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   └── [01;34mno-asm[0m
│   │       │   │   │       ├── [01;34mcrypto[0m
│   │       │   │   │       │   └── buildinf.h
│   │       │   │   │       ├── [01;34minclude[0m
│   │       │   │   │       │   ├── [01;34mcrypto[0m
│   │       │   │   │       │   │   ├── bn_conf.h
│   │       │   │   │       │   │   └── dso_conf.h
│   │       │   │   │       │   ├── [01;34mopenssl[0m
│   │       │   │   │       │   │   ├── asn1.h
│   │       │   │   │       │   │   ├── asn1t.h
│   │       │   │   │       │   │   ├── bio.h
│   │       │   │   │       │   │   ├── cmp.h
│   │       │   │   │       │   │   ├── cms.h
│   │       │   │   │       │   │   ├── conf.h
│   │       │   │   │       │   │   ├── configuration.h
│   │       │   │   │       │   │   ├── crmf.h
│   │       │   │   │       │   │   ├── crypto.h
│   │       │   │   │       │   │   ├── ct.h
│   │       │   │   │       │   │   ├── err.h
│   │       │   │   │       │   │   ├── ess.h
│   │       │   │   │       │   │   ├── fipskey.h
│   │       │   │   │       │   │   ├── lhash.h
│   │       │   │   │       │   │   ├── ocsp.h
│   │       │   │   │       │   │   ├── opensslv.h
│   │       │   │   │       │   │   ├── pkcs12.h
│   │       │   │   │       │   │   ├── pkcs7.h
│   │       │   │   │       │   │   ├── safestack.h
│   │       │   │   │       │   │   ├── srp.h
│   │       │   │   │       │   │   ├── ssl.h
│   │       │   │   │       │   │   ├── ui.h
│   │       │   │   │       │   │   ├── x509.h
│   │       │   │   │       │   │   ├── x509v3.h
│   │       │   │   │       │   │   └── x509_vfy.h
│   │       │   │   │       │   └── progs.h
│   │       │   │   │       └── [01;34mproviders[0m
│   │       │   │   │           └── [01;34mcommon[0m
│   │       │   │   │               └── [01;34minclude[0m
│   │       │   │   │                   └── [01;34mprov[0m
│   │       │   │   │                       ├── der_digests.h
│   │       │   │   │                       ├── der_dsa.h
│   │       │   │   │                       ├── der_ec.h
│   │       │   │   │                       ├── der_ecx.h
│   │       │   │   │                       ├── der_rsa.h
│   │       │   │   │                       ├── der_sm2.h
│   │       │   │   │                       └── der_wrap.h
│   │       │   │   ├── [01;34mdarwin-i386-cc[0m
│   │       │   │   │   ├── [01;34masm[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   ├── [01;34masm_avx2[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   └── [01;34mno-asm[0m
│   │       │   │   │       ├── [01;34mcrypto[0m
│   │       │   │   │       │   └── buildinf.h
│   │       │   │   │       ├── [01;34minclude[0m
│   │       │   │   │       │   ├── [01;34mcrypto[0m
│   │       │   │   │       │   │   ├── bn_conf.h
│   │       │   │   │       │   │   └── dso_conf.h
│   │       │   │   │       │   ├── [01;34mopenssl[0m
│   │       │   │   │       │   │   ├── asn1.h
│   │       │   │   │       │   │   ├── asn1t.h
│   │       │   │   │       │   │   ├── bio.h
│   │       │   │   │       │   │   ├── cmp.h
│   │       │   │   │       │   │   ├── cms.h
│   │       │   │   │       │   │   ├── conf.h
│   │       │   │   │       │   │   ├── configuration.h
│   │       │   │   │       │   │   ├── crmf.h
│   │       │   │   │       │   │   ├── crypto.h
│   │       │   │   │       │   │   ├── ct.h
│   │       │   │   │       │   │   ├── err.h
│   │       │   │   │       │   │   ├── ess.h
│   │       │   │   │       │   │   ├── fipskey.h
│   │       │   │   │       │   │   ├── lhash.h
│   │       │   │   │       │   │   ├── ocsp.h
│   │       │   │   │       │   │   ├── opensslv.h
│   │       │   │   │       │   │   ├── pkcs12.h
│   │       │   │   │       │   │   ├── pkcs7.h
│   │       │   │   │       │   │   ├── safestack.h
│   │       │   │   │       │   │   ├── srp.h
│   │       │   │   │       │   │   ├── ssl.h
│   │       │   │   │       │   │   ├── ui.h
│   │       │   │   │       │   │   ├── x509.h
│   │       │   │   │       │   │   ├── x509v3.h
│   │       │   │   │       │   │   └── x509_vfy.h
│   │       │   │   │       │   └── progs.h
│   │       │   │   │       └── [01;34mproviders[0m
│   │       │   │   │           └── [01;34mcommon[0m
│   │       │   │   │               └── [01;34minclude[0m
│   │       │   │   │                   └── [01;34mprov[0m
│   │       │   │   │                       ├── der_digests.h
│   │       │   │   │                       ├── der_dsa.h
│   │       │   │   │                       ├── der_ec.h
│   │       │   │   │                       ├── der_ecx.h
│   │       │   │   │                       ├── der_rsa.h
│   │       │   │   │                       ├── der_sm2.h
│   │       │   │   │                       └── der_wrap.h
│   │       │   │   ├── [01;34mlinux32-s390x[0m
│   │       │   │   │   ├── [01;34masm[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   ├── [01;34masm_avx2[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   └── [01;34mno-asm[0m
│   │       │   │   │       ├── [01;34mcrypto[0m
│   │       │   │   │       │   └── buildinf.h
│   │       │   │   │       ├── [01;34minclude[0m
│   │       │   │   │       │   ├── [01;34mcrypto[0m
│   │       │   │   │       │   │   ├── bn_conf.h
│   │       │   │   │       │   │   └── dso_conf.h
│   │       │   │   │       │   ├── [01;34mopenssl[0m
│   │       │   │   │       │   │   ├── asn1.h
│   │       │   │   │       │   │   ├── asn1t.h
│   │       │   │   │       │   │   ├── bio.h
│   │       │   │   │       │   │   ├── cmp.h
│   │       │   │   │       │   │   ├── cms.h
│   │       │   │   │       │   │   ├── conf.h
│   │       │   │   │       │   │   ├── configuration.h
│   │       │   │   │       │   │   ├── crmf.h
│   │       │   │   │       │   │   ├── crypto.h
│   │       │   │   │       │   │   ├── ct.h
│   │       │   │   │       │   │   ├── err.h
│   │       │   │   │       │   │   ├── ess.h
│   │       │   │   │       │   │   ├── fipskey.h
│   │       │   │   │       │   │   ├── lhash.h
│   │       │   │   │       │   │   ├── ocsp.h
│   │       │   │   │       │   │   ├── opensslv.h
│   │       │   │   │       │   │   ├── pkcs12.h
│   │       │   │   │       │   │   ├── pkcs7.h
│   │       │   │   │       │   │   ├── safestack.h
│   │       │   │   │       │   │   ├── srp.h
│   │       │   │   │       │   │   ├── ssl.h
│   │       │   │   │       │   │   ├── ui.h
│   │       │   │   │       │   │   ├── x509.h
│   │       │   │   │       │   │   ├── x509v3.h
│   │       │   │   │       │   │   └── x509_vfy.h
│   │       │   │   │       │   └── progs.h
│   │       │   │   │       └── [01;34mproviders[0m
│   │       │   │   │           └── [01;34mcommon[0m
│   │       │   │   │               └── [01;34minclude[0m
│   │       │   │   │                   └── [01;34mprov[0m
│   │       │   │   │                       ├── der_digests.h
│   │       │   │   │                       ├── der_dsa.h
│   │       │   │   │                       ├── der_ec.h
│   │       │   │   │                       ├── der_ecx.h
│   │       │   │   │                       ├── der_rsa.h
│   │       │   │   │                       ├── der_sm2.h
│   │       │   │   │                       └── der_wrap.h
│   │       │   │   ├── [01;34mlinux64-loongarch64[0m
│   │       │   │   │   └── [01;34mno-asm[0m
│   │       │   │   │       ├── [01;34mcrypto[0m
│   │       │   │   │       │   └── buildinf.h
│   │       │   │   │       ├── [01;34minclude[0m
│   │       │   │   │       │   ├── [01;34mcrypto[0m
│   │       │   │   │       │   │   ├── bn_conf.h
│   │       │   │   │       │   │   └── dso_conf.h
│   │       │   │   │       │   ├── [01;34mopenssl[0m
│   │       │   │   │       │   │   ├── asn1.h
│   │       │   │   │       │   │   ├── asn1t.h
│   │       │   │   │       │   │   ├── bio.h
│   │       │   │   │       │   │   ├── cmp.h
│   │       │   │   │       │   │   ├── cms.h
│   │       │   │   │       │   │   ├── conf.h
│   │       │   │   │       │   │   ├── configuration.h
│   │       │   │   │       │   │   ├── crmf.h
│   │       │   │   │       │   │   ├── crypto.h
│   │       │   │   │       │   │   ├── ct.h
│   │       │   │   │       │   │   ├── err.h
│   │       │   │   │       │   │   ├── ess.h
│   │       │   │   │       │   │   ├── fipskey.h
│   │       │   │   │       │   │   ├── lhash.h
│   │       │   │   │       │   │   ├── ocsp.h
│   │       │   │   │       │   │   ├── opensslv.h
│   │       │   │   │       │   │   ├── pkcs12.h
│   │       │   │   │       │   │   ├── pkcs7.h
│   │       │   │   │       │   │   ├── safestack.h
│   │       │   │   │       │   │   ├── srp.h
│   │       │   │   │       │   │   ├── ssl.h
│   │       │   │   │       │   │   ├── ui.h
│   │       │   │   │       │   │   ├── x509.h
│   │       │   │   │       │   │   ├── x509v3.h
│   │       │   │   │       │   │   └── x509_vfy.h
│   │       │   │   │       │   └── progs.h
│   │       │   │   │       └── [01;34mproviders[0m
│   │       │   │   │           └── [01;34mcommon[0m
│   │       │   │   │               └── [01;34minclude[0m
│   │       │   │   │                   └── [01;34mprov[0m
│   │       │   │   │                       ├── der_digests.h
│   │       │   │   │                       ├── der_dsa.h
│   │       │   │   │                       ├── der_ec.h
│   │       │   │   │                       ├── der_ecx.h
│   │       │   │   │                       ├── der_rsa.h
│   │       │   │   │                       ├── der_sm2.h
│   │       │   │   │                       └── der_wrap.h
│   │       │   │   ├── [01;34mlinux64-mips64[0m
│   │       │   │   │   ├── [01;34masm[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   ├── [01;34masm_avx2[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   └── [01;34mno-asm[0m
│   │       │   │   │       ├── [01;34mcrypto[0m
│   │       │   │   │       │   └── buildinf.h
│   │       │   │   │       ├── [01;34minclude[0m
│   │       │   │   │       │   ├── [01;34mcrypto[0m
│   │       │   │   │       │   │   ├── bn_conf.h
│   │       │   │   │       │   │   └── dso_conf.h
│   │       │   │   │       │   ├── [01;34mopenssl[0m
│   │       │   │   │       │   │   ├── asn1.h
│   │       │   │   │       │   │   ├── asn1t.h
│   │       │   │   │       │   │   ├── bio.h
│   │       │   │   │       │   │   ├── cmp.h
│   │       │   │   │       │   │   ├── cms.h
│   │       │   │   │       │   │   ├── conf.h
│   │       │   │   │       │   │   ├── configuration.h
│   │       │   │   │       │   │   ├── crmf.h
│   │       │   │   │       │   │   ├── crypto.h
│   │       │   │   │       │   │   ├── ct.h
│   │       │   │   │       │   │   ├── err.h
│   │       │   │   │       │   │   ├── ess.h
│   │       │   │   │       │   │   ├── fipskey.h
│   │       │   │   │       │   │   ├── lhash.h
│   │       │   │   │       │   │   ├── ocsp.h
│   │       │   │   │       │   │   ├── opensslv.h
│   │       │   │   │       │   │   ├── pkcs12.h
│   │       │   │   │       │   │   ├── pkcs7.h
│   │       │   │   │       │   │   ├── safestack.h
│   │       │   │   │       │   │   ├── srp.h
│   │       │   │   │       │   │   ├── ssl.h
│   │       │   │   │       │   │   ├── ui.h
│   │       │   │   │       │   │   ├── x509.h
│   │       │   │   │       │   │   ├── x509v3.h
│   │       │   │   │       │   │   └── x509_vfy.h
│   │       │   │   │       │   └── progs.h
│   │       │   │   │       └── [01;34mproviders[0m
│   │       │   │   │           └── [01;34mcommon[0m
│   │       │   │   │               └── [01;34minclude[0m
│   │       │   │   │                   └── [01;34mprov[0m
│   │       │   │   │                       ├── der_digests.h
│   │       │   │   │                       ├── der_dsa.h
│   │       │   │   │                       ├── der_ec.h
│   │       │   │   │                       ├── der_ecx.h
│   │       │   │   │                       ├── der_rsa.h
│   │       │   │   │                       ├── der_sm2.h
│   │       │   │   │                       └── der_wrap.h
│   │       │   │   ├── [01;34mlinux64-riscv64[0m
│   │       │   │   │   └── [01;34mno-asm[0m
│   │       │   │   │       ├── [01;34mcrypto[0m
│   │       │   │   │       │   └── buildinf.h
│   │       │   │   │       ├── [01;34minclude[0m
│   │       │   │   │       │   ├── [01;34mcrypto[0m
│   │       │   │   │       │   │   ├── bn_conf.h
│   │       │   │   │       │   │   └── dso_conf.h
│   │       │   │   │       │   ├── [01;34mopenssl[0m
│   │       │   │   │       │   │   ├── asn1.h
│   │       │   │   │       │   │   ├── asn1t.h
│   │       │   │   │       │   │   ├── bio.h
│   │       │   │   │       │   │   ├── cmp.h
│   │       │   │   │       │   │   ├── cms.h
│   │       │   │   │       │   │   ├── conf.h
│   │       │   │   │       │   │   ├── configuration.h
│   │       │   │   │       │   │   ├── crmf.h
│   │       │   │   │       │   │   ├── crypto.h
│   │       │   │   │       │   │   ├── ct.h
│   │       │   │   │       │   │   ├── err.h
│   │       │   │   │       │   │   ├── ess.h
│   │       │   │   │       │   │   ├── fipskey.h
│   │       │   │   │       │   │   ├── lhash.h
│   │       │   │   │       │   │   ├── ocsp.h
│   │       │   │   │       │   │   ├── opensslv.h
│   │       │   │   │       │   │   ├── pkcs12.h
│   │       │   │   │       │   │   ├── pkcs7.h
│   │       │   │   │       │   │   ├── safestack.h
│   │       │   │   │       │   │   ├── srp.h
│   │       │   │   │       │   │   ├── ssl.h
│   │       │   │   │       │   │   ├── ui.h
│   │       │   │   │       │   │   ├── x509.h
│   │       │   │   │       │   │   ├── x509v3.h
│   │       │   │   │       │   │   └── x509_vfy.h
│   │       │   │   │       │   └── progs.h
│   │       │   │   │       └── [01;34mproviders[0m
│   │       │   │   │           └── [01;34mcommon[0m
│   │       │   │   │               └── [01;34minclude[0m
│   │       │   │   │                   └── [01;34mprov[0m
│   │       │   │   │                       ├── der_digests.h
│   │       │   │   │                       ├── der_dsa.h
│   │       │   │   │                       ├── der_ec.h
│   │       │   │   │                       ├── der_ecx.h
│   │       │   │   │                       ├── der_rsa.h
│   │       │   │   │                       ├── der_sm2.h
│   │       │   │   │                       └── der_wrap.h
│   │       │   │   ├── [01;34mlinux64-s390x[0m
│   │       │   │   │   ├── [01;34masm[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   ├── [01;34masm_avx2[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   └── [01;34mno-asm[0m
│   │       │   │   │       ├── [01;34mcrypto[0m
│   │       │   │   │       │   └── buildinf.h
│   │       │   │   │       ├── [01;34minclude[0m
│   │       │   │   │       │   ├── [01;34mcrypto[0m
│   │       │   │   │       │   │   ├── bn_conf.h
│   │       │   │   │       │   │   └── dso_conf.h
│   │       │   │   │       │   ├── [01;34mopenssl[0m
│   │       │   │   │       │   │   ├── asn1.h
│   │       │   │   │       │   │   ├── asn1t.h
│   │       │   │   │       │   │   ├── bio.h
│   │       │   │   │       │   │   ├── cmp.h
│   │       │   │   │       │   │   ├── cms.h
│   │       │   │   │       │   │   ├── conf.h
│   │       │   │   │       │   │   ├── configuration.h
│   │       │   │   │       │   │   ├── crmf.h
│   │       │   │   │       │   │   ├── crypto.h
│   │       │   │   │       │   │   ├── ct.h
│   │       │   │   │       │   │   ├── err.h
│   │       │   │   │       │   │   ├── ess.h
│   │       │   │   │       │   │   ├── fipskey.h
│   │       │   │   │       │   │   ├── lhash.h
│   │       │   │   │       │   │   ├── ocsp.h
│   │       │   │   │       │   │   ├── opensslv.h
│   │       │   │   │       │   │   ├── pkcs12.h
│   │       │   │   │       │   │   ├── pkcs7.h
│   │       │   │   │       │   │   ├── safestack.h
│   │       │   │   │       │   │   ├── srp.h
│   │       │   │   │       │   │   ├── ssl.h
│   │       │   │   │       │   │   ├── ui.h
│   │       │   │   │       │   │   ├── x509.h
│   │       │   │   │       │   │   ├── x509v3.h
│   │       │   │   │       │   │   └── x509_vfy.h
│   │       │   │   │       │   └── progs.h
│   │       │   │   │       └── [01;34mproviders[0m
│   │       │   │   │           └── [01;34mcommon[0m
│   │       │   │   │               └── [01;34minclude[0m
│   │       │   │   │                   └── [01;34mprov[0m
│   │       │   │   │                       ├── der_digests.h
│   │       │   │   │                       ├── der_dsa.h
│   │       │   │   │                       ├── der_ec.h
│   │       │   │   │                       ├── der_ecx.h
│   │       │   │   │                       ├── der_rsa.h
│   │       │   │   │                       ├── der_sm2.h
│   │       │   │   │                       └── der_wrap.h
│   │       │   │   ├── [01;34mlinux-aarch64[0m
│   │       │   │   │   ├── [01;34masm[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   ├── [01;34masm_avx2[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   └── [01;34mno-asm[0m
│   │       │   │   │       ├── [01;34mcrypto[0m
│   │       │   │   │       │   └── buildinf.h
│   │       │   │   │       ├── [01;34minclude[0m
│   │       │   │   │       │   ├── [01;34mcrypto[0m
│   │       │   │   │       │   │   ├── bn_conf.h
│   │       │   │   │       │   │   └── dso_conf.h
│   │       │   │   │       │   ├── [01;34mopenssl[0m
│   │       │   │   │       │   │   ├── asn1.h
│   │       │   │   │       │   │   ├── asn1t.h
│   │       │   │   │       │   │   ├── bio.h
│   │       │   │   │       │   │   ├── cmp.h
│   │       │   │   │       │   │   ├── cms.h
│   │       │   │   │       │   │   ├── conf.h
│   │       │   │   │       │   │   ├── configuration.h
│   │       │   │   │       │   │   ├── crmf.h
│   │       │   │   │       │   │   ├── crypto.h
│   │       │   │   │       │   │   ├── ct.h
│   │       │   │   │       │   │   ├── err.h
│   │       │   │   │       │   │   ├── ess.h
│   │       │   │   │       │   │   ├── fipskey.h
│   │       │   │   │       │   │   ├── lhash.h
│   │       │   │   │       │   │   ├── ocsp.h
│   │       │   │   │       │   │   ├── opensslv.h
│   │       │   │   │       │   │   ├── pkcs12.h
│   │       │   │   │       │   │   ├── pkcs7.h
│   │       │   │   │       │   │   ├── safestack.h
│   │       │   │   │       │   │   ├── srp.h
│   │       │   │   │       │   │   ├── ssl.h
│   │       │   │   │       │   │   ├── ui.h
│   │       │   │   │       │   │   ├── x509.h
│   │       │   │   │       │   │   ├── x509v3.h
│   │       │   │   │       │   │   └── x509_vfy.h
│   │       │   │   │       │   └── progs.h
│   │       │   │   │       └── [01;34mproviders[0m
│   │       │   │   │           └── [01;34mcommon[0m
│   │       │   │   │               └── [01;34minclude[0m
│   │       │   │   │                   └── [01;34mprov[0m
│   │       │   │   │                       ├── der_digests.h
│   │       │   │   │                       ├── der_dsa.h
│   │       │   │   │                       ├── der_ec.h
│   │       │   │   │                       ├── der_ecx.h
│   │       │   │   │                       ├── der_rsa.h
│   │       │   │   │                       ├── der_sm2.h
│   │       │   │   │                       └── der_wrap.h
│   │       │   │   ├── [01;34mlinux-armv4[0m
│   │       │   │   │   ├── [01;34masm[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   ├── [01;34masm_avx2[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   └── [01;34mno-asm[0m
│   │       │   │   │       ├── [01;34mcrypto[0m
│   │       │   │   │       │   └── buildinf.h
│   │       │   │   │       ├── [01;34minclude[0m
│   │       │   │   │       │   ├── [01;34mcrypto[0m
│   │       │   │   │       │   │   ├── bn_conf.h
│   │       │   │   │       │   │   └── dso_conf.h
│   │       │   │   │       │   ├── [01;34mopenssl[0m
│   │       │   │   │       │   │   ├── asn1.h
│   │       │   │   │       │   │   ├── asn1t.h
│   │       │   │   │       │   │   ├── bio.h
│   │       │   │   │       │   │   ├── cmp.h
│   │       │   │   │       │   │   ├── cms.h
│   │       │   │   │       │   │   ├── conf.h
│   │       │   │   │       │   │   ├── configuration.h
│   │       │   │   │       │   │   ├── crmf.h
│   │       │   │   │       │   │   ├── crypto.h
│   │       │   │   │       │   │   ├── ct.h
│   │       │   │   │       │   │   ├── err.h
│   │       │   │   │       │   │   ├── ess.h
│   │       │   │   │       │   │   ├── fipskey.h
│   │       │   │   │       │   │   ├── lhash.h
│   │       │   │   │       │   │   ├── ocsp.h
│   │       │   │   │       │   │   ├── opensslv.h
│   │       │   │   │       │   │   ├── pkcs12.h
│   │       │   │   │       │   │   ├── pkcs7.h
│   │       │   │   │       │   │   ├── safestack.h
│   │       │   │   │       │   │   ├── srp.h
│   │       │   │   │       │   │   ├── ssl.h
│   │       │   │   │       │   │   ├── ui.h
│   │       │   │   │       │   │   ├── x509.h
│   │       │   │   │       │   │   ├── x509v3.h
│   │       │   │   │       │   │   └── x509_vfy.h
│   │       │   │   │       │   └── progs.h
│   │       │   │   │       └── [01;34mproviders[0m
│   │       │   │   │           └── [01;34mcommon[0m
│   │       │   │   │               └── [01;34minclude[0m
│   │       │   │   │                   └── [01;34mprov[0m
│   │       │   │   │                       ├── der_digests.h
│   │       │   │   │                       ├── der_dsa.h
│   │       │   │   │                       ├── der_ec.h
│   │       │   │   │                       ├── der_ecx.h
│   │       │   │   │                       ├── der_rsa.h
│   │       │   │   │                       ├── der_sm2.h
│   │       │   │   │                       └── der_wrap.h
│   │       │   │   ├── [01;34mlinux-elf[0m
│   │       │   │   │   ├── [01;34masm[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   ├── [01;34masm_avx2[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   └── [01;34mno-asm[0m
│   │       │   │   │       ├── [01;34mcrypto[0m
│   │       │   │   │       │   └── buildinf.h
│   │       │   │   │       ├── [01;34minclude[0m
│   │       │   │   │       │   ├── [01;34mcrypto[0m
│   │       │   │   │       │   │   ├── bn_conf.h
│   │       │   │   │       │   │   └── dso_conf.h
│   │       │   │   │       │   ├── [01;34mopenssl[0m
│   │       │   │   │       │   │   ├── asn1.h
│   │       │   │   │       │   │   ├── asn1t.h
│   │       │   │   │       │   │   ├── bio.h
│   │       │   │   │       │   │   ├── cmp.h
│   │       │   │   │       │   │   ├── cms.h
│   │       │   │   │       │   │   ├── conf.h
│   │       │   │   │       │   │   ├── configuration.h
│   │       │   │   │       │   │   ├── crmf.h
│   │       │   │   │       │   │   ├── crypto.h
│   │       │   │   │       │   │   ├── ct.h
│   │       │   │   │       │   │   ├── err.h
│   │       │   │   │       │   │   ├── ess.h
│   │       │   │   │       │   │   ├── fipskey.h
│   │       │   │   │       │   │   ├── lhash.h
│   │       │   │   │       │   │   ├── ocsp.h
│   │       │   │   │       │   │   ├── opensslv.h
│   │       │   │   │       │   │   ├── pkcs12.h
│   │       │   │   │       │   │   ├── pkcs7.h
│   │       │   │   │       │   │   ├── safestack.h
│   │       │   │   │       │   │   ├── srp.h
│   │       │   │   │       │   │   ├── ssl.h
│   │       │   │   │       │   │   ├── ui.h
│   │       │   │   │       │   │   ├── x509.h
│   │       │   │   │       │   │   ├── x509v3.h
│   │       │   │   │       │   │   └── x509_vfy.h
│   │       │   │   │       │   └── progs.h
│   │       │   │   │       └── [01;34mproviders[0m
│   │       │   │   │           └── [01;34mcommon[0m
│   │       │   │   │               └── [01;34minclude[0m
│   │       │   │   │                   └── [01;34mprov[0m
│   │       │   │   │                       ├── der_digests.h
│   │       │   │   │                       ├── der_dsa.h
│   │       │   │   │                       ├── der_ec.h
│   │       │   │   │                       ├── der_ecx.h
│   │       │   │   │                       ├── der_rsa.h
│   │       │   │   │                       ├── der_sm2.h
│   │       │   │   │                       └── der_wrap.h
│   │       │   │   ├── [01;34mlinux-ppc64le[0m
│   │       │   │   │   ├── [01;34masm[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   ├── [01;34masm_avx2[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   └── [01;34mno-asm[0m
│   │       │   │   │       ├── [01;34mcrypto[0m
│   │       │   │   │       │   └── buildinf.h
│   │       │   │   │       ├── [01;34minclude[0m
│   │       │   │   │       │   ├── [01;34mcrypto[0m
│   │       │   │   │       │   │   ├── bn_conf.h
│   │       │   │   │       │   │   └── dso_conf.h
│   │       │   │   │       │   ├── [01;34mopenssl[0m
│   │       │   │   │       │   │   ├── asn1.h
│   │       │   │   │       │   │   ├── asn1t.h
│   │       │   │   │       │   │   ├── bio.h
│   │       │   │   │       │   │   ├── cmp.h
│   │       │   │   │       │   │   ├── cms.h
│   │       │   │   │       │   │   ├── conf.h
│   │       │   │   │       │   │   ├── configuration.h
│   │       │   │   │       │   │   ├── crmf.h
│   │       │   │   │       │   │   ├── crypto.h
│   │       │   │   │       │   │   ├── ct.h
│   │       │   │   │       │   │   ├── err.h
│   │       │   │   │       │   │   ├── ess.h
│   │       │   │   │       │   │   ├── fipskey.h
│   │       │   │   │       │   │   ├── lhash.h
│   │       │   │   │       │   │   ├── ocsp.h
│   │       │   │   │       │   │   ├── opensslv.h
│   │       │   │   │       │   │   ├── pkcs12.h
│   │       │   │   │       │   │   ├── pkcs7.h
│   │       │   │   │       │   │   ├── safestack.h
│   │       │   │   │       │   │   ├── srp.h
│   │       │   │   │       │   │   ├── ssl.h
│   │       │   │   │       │   │   ├── ui.h
│   │       │   │   │       │   │   ├── x509.h
│   │       │   │   │       │   │   ├── x509v3.h
│   │       │   │   │       │   │   └── x509_vfy.h
│   │       │   │   │       │   └── progs.h
│   │       │   │   │       └── [01;34mproviders[0m
│   │       │   │   │           └── [01;34mcommon[0m
│   │       │   │   │               └── [01;34minclude[0m
│   │       │   │   │                   └── [01;34mprov[0m
│   │       │   │   │                       ├── der_digests.h
│   │       │   │   │                       ├── der_dsa.h
│   │       │   │   │                       ├── der_ec.h
│   │       │   │   │                       ├── der_ecx.h
│   │       │   │   │                       ├── der_rsa.h
│   │       │   │   │                       ├── der_sm2.h
│   │       │   │   │                       └── der_wrap.h
│   │       │   │   ├── [01;34mlinux-x86_64[0m
│   │       │   │   │   ├── [01;34masm[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   ├── [01;34masm_avx2[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   └── [01;34mno-asm[0m
│   │       │   │   │       ├── [01;34mcrypto[0m
│   │       │   │   │       │   └── buildinf.h
│   │       │   │   │       ├── [01;34minclude[0m
│   │       │   │   │       │   ├── [01;34mcrypto[0m
│   │       │   │   │       │   │   ├── bn_conf.h
│   │       │   │   │       │   │   └── dso_conf.h
│   │       │   │   │       │   ├── [01;34mopenssl[0m
│   │       │   │   │       │   │   ├── asn1.h
│   │       │   │   │       │   │   ├── asn1t.h
│   │       │   │   │       │   │   ├── bio.h
│   │       │   │   │       │   │   ├── cmp.h
│   │       │   │   │       │   │   ├── cms.h
│   │       │   │   │       │   │   ├── conf.h
│   │       │   │   │       │   │   ├── configuration.h
│   │       │   │   │       │   │   ├── crmf.h
│   │       │   │   │       │   │   ├── crypto.h
│   │       │   │   │       │   │   ├── ct.h
│   │       │   │   │       │   │   ├── err.h
│   │       │   │   │       │   │   ├── ess.h
│   │       │   │   │       │   │   ├── fipskey.h
│   │       │   │   │       │   │   ├── lhash.h
│   │       │   │   │       │   │   ├── ocsp.h
│   │       │   │   │       │   │   ├── opensslv.h
│   │       │   │   │       │   │   ├── pkcs12.h
│   │       │   │   │       │   │   ├── pkcs7.h
│   │       │   │   │       │   │   ├── safestack.h
│   │       │   │   │       │   │   ├── srp.h
│   │       │   │   │       │   │   ├── ssl.h
│   │       │   │   │       │   │   ├── ui.h
│   │       │   │   │       │   │   ├── x509.h
│   │       │   │   │       │   │   ├── x509v3.h
│   │       │   │   │       │   │   └── x509_vfy.h
│   │       │   │   │       │   └── progs.h
│   │       │   │   │       └── [01;34mproviders[0m
│   │       │   │   │           └── [01;34mcommon[0m
│   │       │   │   │               └── [01;34minclude[0m
│   │       │   │   │                   └── [01;34mprov[0m
│   │       │   │   │                       ├── der_digests.h
│   │       │   │   │                       ├── der_dsa.h
│   │       │   │   │                       ├── der_ec.h
│   │       │   │   │                       ├── der_ecx.h
│   │       │   │   │                       ├── der_rsa.h
│   │       │   │   │                       ├── der_sm2.h
│   │       │   │   │                       └── der_wrap.h
│   │       │   │   ├── [01;34msolaris64-x86_64-gcc[0m
│   │       │   │   │   ├── [01;34masm[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   ├── [01;34masm_avx2[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   └── [01;34mno-asm[0m
│   │       │   │   │       ├── [01;34mcrypto[0m
│   │       │   │   │       │   └── buildinf.h
│   │       │   │   │       ├── [01;34minclude[0m
│   │       │   │   │       │   ├── [01;34mcrypto[0m
│   │       │   │   │       │   │   ├── bn_conf.h
│   │       │   │   │       │   │   └── dso_conf.h
│   │       │   │   │       │   ├── [01;34mopenssl[0m
│   │       │   │   │       │   │   ├── asn1.h
│   │       │   │   │       │   │   ├── asn1t.h
│   │       │   │   │       │   │   ├── bio.h
│   │       │   │   │       │   │   ├── cmp.h
│   │       │   │   │       │   │   ├── cms.h
│   │       │   │   │       │   │   ├── conf.h
│   │       │   │   │       │   │   ├── configuration.h
│   │       │   │   │       │   │   ├── crmf.h
│   │       │   │   │       │   │   ├── crypto.h
│   │       │   │   │       │   │   ├── ct.h
│   │       │   │   │       │   │   ├── err.h
│   │       │   │   │       │   │   ├── ess.h
│   │       │   │   │       │   │   ├── fipskey.h
│   │       │   │   │       │   │   ├── lhash.h
│   │       │   │   │       │   │   ├── ocsp.h
│   │       │   │   │       │   │   ├── opensslv.h
│   │       │   │   │       │   │   ├── pkcs12.h
│   │       │   │   │       │   │   ├── pkcs7.h
│   │       │   │   │       │   │   ├── safestack.h
│   │       │   │   │       │   │   ├── srp.h
│   │       │   │   │       │   │   ├── ssl.h
│   │       │   │   │       │   │   ├── ui.h
│   │       │   │   │       │   │   ├── x509.h
│   │       │   │   │       │   │   ├── x509v3.h
│   │       │   │   │       │   │   └── x509_vfy.h
│   │       │   │   │       │   └── progs.h
│   │       │   │   │       └── [01;34mproviders[0m
│   │       │   │   │           └── [01;34mcommon[0m
│   │       │   │   │               └── [01;34minclude[0m
│   │       │   │   │                   └── [01;34mprov[0m
│   │       │   │   │                       ├── der_digests.h
│   │       │   │   │                       ├── der_dsa.h
│   │       │   │   │                       ├── der_ec.h
│   │       │   │   │                       ├── der_ecx.h
│   │       │   │   │                       ├── der_rsa.h
│   │       │   │   │                       ├── der_sm2.h
│   │       │   │   │                       └── der_wrap.h
│   │       │   │   ├── [01;34msolaris-x86-gcc[0m
│   │       │   │   │   ├── [01;34masm[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   ├── [01;34masm_avx2[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   └── [01;34mno-asm[0m
│   │       │   │   │       ├── [01;34mcrypto[0m
│   │       │   │   │       │   └── buildinf.h
│   │       │   │   │       ├── [01;34minclude[0m
│   │       │   │   │       │   ├── [01;34mcrypto[0m
│   │       │   │   │       │   │   ├── bn_conf.h
│   │       │   │   │       │   │   └── dso_conf.h
│   │       │   │   │       │   ├── [01;34mopenssl[0m
│   │       │   │   │       │   │   ├── asn1.h
│   │       │   │   │       │   │   ├── asn1t.h
│   │       │   │   │       │   │   ├── bio.h
│   │       │   │   │       │   │   ├── cmp.h
│   │       │   │   │       │   │   ├── cms.h
│   │       │   │   │       │   │   ├── conf.h
│   │       │   │   │       │   │   ├── configuration.h
│   │       │   │   │       │   │   ├── crmf.h
│   │       │   │   │       │   │   ├── crypto.h
│   │       │   │   │       │   │   ├── ct.h
│   │       │   │   │       │   │   ├── err.h
│   │       │   │   │       │   │   ├── ess.h
│   │       │   │   │       │   │   ├── fipskey.h
│   │       │   │   │       │   │   ├── lhash.h
│   │       │   │   │       │   │   ├── ocsp.h
│   │       │   │   │       │   │   ├── opensslv.h
│   │       │   │   │       │   │   ├── pkcs12.h
│   │       │   │   │       │   │   ├── pkcs7.h
│   │       │   │   │       │   │   ├── safestack.h
│   │       │   │   │       │   │   ├── srp.h
│   │       │   │   │       │   │   ├── ssl.h
│   │       │   │   │       │   │   ├── ui.h
│   │       │   │   │       │   │   ├── x509.h
│   │       │   │   │       │   │   ├── x509v3.h
│   │       │   │   │       │   │   └── x509_vfy.h
│   │       │   │   │       │   └── progs.h
│   │       │   │   │       └── [01;34mproviders[0m
│   │       │   │   │           └── [01;34mcommon[0m
│   │       │   │   │               └── [01;34minclude[0m
│   │       │   │   │                   └── [01;34mprov[0m
│   │       │   │   │                       ├── der_digests.h
│   │       │   │   │                       ├── der_dsa.h
│   │       │   │   │                       ├── der_ec.h
│   │       │   │   │                       ├── der_ecx.h
│   │       │   │   │                       ├── der_rsa.h
│   │       │   │   │                       ├── der_sm2.h
│   │       │   │   │                       └── der_wrap.h
│   │       │   │   ├── [01;34mVC-WIN32[0m
│   │       │   │   │   ├── [01;34masm[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   ├── [01;34masm_avx2[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   └── [01;34mno-asm[0m
│   │       │   │   │       ├── [01;34mcrypto[0m
│   │       │   │   │       │   └── buildinf.h
│   │       │   │   │       ├── [01;34minclude[0m
│   │       │   │   │       │   ├── [01;34mcrypto[0m
│   │       │   │   │       │   │   ├── bn_conf.h
│   │       │   │   │       │   │   └── dso_conf.h
│   │       │   │   │       │   ├── [01;34mopenssl[0m
│   │       │   │   │       │   │   ├── asn1.h
│   │       │   │   │       │   │   ├── asn1t.h
│   │       │   │   │       │   │   ├── bio.h
│   │       │   │   │       │   │   ├── cmp.h
│   │       │   │   │       │   │   ├── cms.h
│   │       │   │   │       │   │   ├── conf.h
│   │       │   │   │       │   │   ├── configuration.h
│   │       │   │   │       │   │   ├── crmf.h
│   │       │   │   │       │   │   ├── crypto.h
│   │       │   │   │       │   │   ├── ct.h
│   │       │   │   │       │   │   ├── err.h
│   │       │   │   │       │   │   ├── ess.h
│   │       │   │   │       │   │   ├── fipskey.h
│   │       │   │   │       │   │   ├── lhash.h
│   │       │   │   │       │   │   ├── ocsp.h
│   │       │   │   │       │   │   ├── opensslv.h
│   │       │   │   │       │   │   ├── pkcs12.h
│   │       │   │   │       │   │   ├── pkcs7.h
│   │       │   │   │       │   │   ├── safestack.h
│   │       │   │   │       │   │   ├── srp.h
│   │       │   │   │       │   │   ├── ssl.h
│   │       │   │   │       │   │   ├── ui.h
│   │       │   │   │       │   │   ├── x509.h
│   │       │   │   │       │   │   ├── x509v3.h
│   │       │   │   │       │   │   └── x509_vfy.h
│   │       │   │   │       │   └── progs.h
│   │       │   │   │       └── [01;34mproviders[0m
│   │       │   │   │           └── [01;34mcommon[0m
│   │       │   │   │               └── [01;34minclude[0m
│   │       │   │   │                   └── [01;34mprov[0m
│   │       │   │   │                       ├── der_digests.h
│   │       │   │   │                       ├── der_dsa.h
│   │       │   │   │                       ├── der_ec.h
│   │       │   │   │                       ├── der_ecx.h
│   │       │   │   │                       ├── der_rsa.h
│   │       │   │   │                       ├── der_sm2.h
│   │       │   │   │                       └── der_wrap.h
│   │       │   │   ├── [01;34mVC-WIN64A[0m
│   │       │   │   │   ├── [01;34masm[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   ├── [01;34masm_avx2[0m
│   │       │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   └── buildinf.h
│   │       │   │   │   │   ├── [01;34minclude[0m
│   │       │   │   │   │   │   ├── [01;34mcrypto[0m
│   │       │   │   │   │   │   │   ├── bn_conf.h
│   │       │   │   │   │   │   │   └── dso_conf.h
│   │       │   │   │   │   │   ├── [01;34mopenssl[0m
│   │       │   │   │   │   │   │   ├── asn1.h
│   │       │   │   │   │   │   │   ├── asn1t.h
│   │       │   │   │   │   │   │   ├── bio.h
│   │       │   │   │   │   │   │   ├── cmp.h
│   │       │   │   │   │   │   │   ├── cms.h
│   │       │   │   │   │   │   │   ├── conf.h
│   │       │   │   │   │   │   │   ├── configuration.h
│   │       │   │   │   │   │   │   ├── crmf.h
│   │       │   │   │   │   │   │   ├── crypto.h
│   │       │   │   │   │   │   │   ├── ct.h
│   │       │   │   │   │   │   │   ├── err.h
│   │       │   │   │   │   │   │   ├── ess.h
│   │       │   │   │   │   │   │   ├── fipskey.h
│   │       │   │   │   │   │   │   ├── lhash.h
│   │       │   │   │   │   │   │   ├── ocsp.h
│   │       │   │   │   │   │   │   ├── opensslv.h
│   │       │   │   │   │   │   │   ├── pkcs12.h
│   │       │   │   │   │   │   │   ├── pkcs7.h
│   │       │   │   │   │   │   │   ├── safestack.h
│   │       │   │   │   │   │   │   ├── srp.h
│   │       │   │   │   │   │   │   ├── ssl.h
│   │       │   │   │   │   │   │   ├── ui.h
│   │       │   │   │   │   │   │   ├── x509.h
│   │       │   │   │   │   │   │   ├── x509v3.h
│   │       │   │   │   │   │   │   └── x509_vfy.h
│   │       │   │   │   │   │   └── progs.h
│   │       │   │   │   │   └── [01;34mproviders[0m
│   │       │   │   │   │       └── [01;34mcommon[0m
│   │       │   │   │   │           └── [01;34minclude[0m
│   │       │   │   │   │               └── [01;34mprov[0m
│   │       │   │   │   │                   ├── der_digests.h
│   │       │   │   │   │                   ├── der_dsa.h
│   │       │   │   │   │                   ├── der_ec.h
│   │       │   │   │   │                   ├── der_ecx.h
│   │       │   │   │   │                   ├── der_rsa.h
│   │       │   │   │   │                   ├── der_sm2.h
│   │       │   │   │   │                   └── der_wrap.h
│   │       │   │   │   └── [01;34mno-asm[0m
│   │       │   │   │       ├── [01;34mcrypto[0m
│   │       │   │   │       │   └── buildinf.h
│   │       │   │   │       ├── [01;34minclude[0m
│   │       │   │   │       │   ├── [01;34mcrypto[0m
│   │       │   │   │       │   │   ├── bn_conf.h
│   │       │   │   │       │   │   └── dso_conf.h
│   │       │   │   │       │   ├── [01;34mopenssl[0m
│   │       │   │   │       │   │   ├── asn1.h
│   │       │   │   │       │   │   ├── asn1t.h
│   │       │   │   │       │   │   ├── bio.h
│   │       │   │   │       │   │   ├── cmp.h
│   │       │   │   │       │   │   ├── cms.h
│   │       │   │   │       │   │   ├── conf.h
│   │       │   │   │       │   │   ├── configuration.h
│   │       │   │   │       │   │   ├── crmf.h
│   │       │   │   │       │   │   ├── crypto.h
│   │       │   │   │       │   │   ├── ct.h
│   │       │   │   │       │   │   ├── err.h
│   │       │   │   │       │   │   ├── ess.h
│   │       │   │   │       │   │   ├── fipskey.h
│   │       │   │   │       │   │   ├── lhash.h
│   │       │   │   │       │   │   ├── ocsp.h
│   │       │   │   │       │   │   ├── opensslv.h
│   │       │   │   │       │   │   ├── pkcs12.h
│   │       │   │   │       │   │   ├── pkcs7.h
│   │       │   │   │       │   │   ├── safestack.h
│   │       │   │   │       │   │   ├── srp.h
│   │       │   │   │       │   │   ├── ssl.h
│   │       │   │   │       │   │   ├── ui.h
│   │       │   │   │       │   │   ├── x509.h
│   │       │   │   │       │   │   ├── x509v3.h
│   │       │   │   │       │   │   └── x509_vfy.h
│   │       │   │   │       │   └── progs.h
│   │       │   │   │       └── [01;34mproviders[0m
│   │       │   │   │           └── [01;34mcommon[0m
│   │       │   │   │               └── [01;34minclude[0m
│   │       │   │   │                   └── [01;34mprov[0m
│   │       │   │   │                       ├── der_digests.h
│   │       │   │   │                       ├── der_dsa.h
│   │       │   │   │                       ├── der_ec.h
│   │       │   │   │                       ├── der_ecx.h
│   │       │   │   │                       ├── der_rsa.h
│   │       │   │   │                       ├── der_sm2.h
│   │       │   │   │                       └── der_wrap.h
│   │       │   │   └── [01;34mVC-WIN64-ARM[0m
│   │       │   │       └── [01;34mno-asm[0m
│   │       │   │           ├── [01;34mcrypto[0m
│   │       │   │           │   └── buildinf.h
│   │       │   │           ├── [01;34minclude[0m
│   │       │   │           │   ├── [01;34mcrypto[0m
│   │       │   │           │   │   ├── bn_conf.h
│   │       │   │           │   │   └── dso_conf.h
│   │       │   │           │   ├── [01;34mopenssl[0m
│   │       │   │           │   │   ├── asn1.h
│   │       │   │           │   │   ├── asn1t.h
│   │       │   │           │   │   ├── bio.h
│   │       │   │           │   │   ├── cmp.h
│   │       │   │           │   │   ├── cms.h
│   │       │   │           │   │   ├── conf.h
│   │       │   │           │   │   ├── configuration.h
│   │       │   │           │   │   ├── crmf.h
│   │       │   │           │   │   ├── crypto.h
│   │       │   │           │   │   ├── ct.h
│   │       │   │           │   │   ├── err.h
│   │       │   │           │   │   ├── ess.h
│   │       │   │           │   │   ├── fipskey.h
│   │       │   │           │   │   ├── lhash.h
│   │       │   │           │   │   ├── ocsp.h
│   │       │   │           │   │   ├── opensslv.h
│   │       │   │           │   │   ├── pkcs12.h
│   │       │   │           │   │   ├── pkcs7.h
│   │       │   │           │   │   ├── safestack.h
│   │       │   │           │   │   ├── srp.h
│   │       │   │           │   │   ├── ssl.h
│   │       │   │           │   │   ├── ui.h
│   │       │   │           │   │   ├── x509.h
│   │       │   │           │   │   ├── x509v3.h
│   │       │   │           │   │   └── x509_vfy.h
│   │       │   │           │   └── progs.h
│   │       │   │           └── [01;34mproviders[0m
│   │       │   │               └── [01;34mcommon[0m
│   │       │   │                   └── [01;34minclude[0m
│   │       │   │                       └── [01;34mprov[0m
│   │       │   │                           ├── der_digests.h
│   │       │   │                           ├── der_dsa.h
│   │       │   │                           ├── der_ec.h
│   │       │   │                           ├── der_ecx.h
│   │       │   │                           ├── der_rsa.h
│   │       │   │                           ├── der_sm2.h
│   │       │   │                           └── der_wrap.h
│   │       │   ├── asn1_asm.h
│   │       │   ├── asn1err.h
│   │       │   ├── asn1.h
│   │       │   ├── asn1_mac.h
│   │       │   ├── asn1_no-asm.h
│   │       │   ├── asn1t_asm.h
│   │       │   ├── asn1t.h
│   │       │   ├── asn1t_no-asm.h
│   │       │   ├── asyncerr.h
│   │       │   ├── async.h
│   │       │   ├── bio_asm.h
│   │       │   ├── bioerr.h
│   │       │   ├── bio.h
│   │       │   ├── bio_no-asm.h
│   │       │   ├── blowfish.h
│   │       │   ├── bn_conf_asm.h
│   │       │   ├── bn_conf.h
│   │       │   ├── bn_conf_no-asm.h
│   │       │   ├── bnerr.h
│   │       │   ├── bn.h
│   │       │   ├── buffererr.h
│   │       │   ├── buffer.h
│   │       │   ├── camellia.h
│   │       │   ├── cast.h
│   │       │   ├── cmac.h
│   │       │   ├── cmp_asm.h
│   │       │   ├── cmperr.h
│   │       │   ├── cmp.h
│   │       │   ├── cmp_no-asm.h
│   │       │   ├── cmp_util.h
│   │       │   ├── cms_asm.h
│   │       │   ├── cmserr.h
│   │       │   ├── cms.h
│   │       │   ├── cms_no-asm.h
│   │       │   ├── comperr.h
│   │       │   ├── comp.h
│   │       │   ├── conf_api.h
│   │       │   ├── conf_asm.h
│   │       │   ├── conferr.h
│   │       │   ├── conf.h
│   │       │   ├── configuration_asm.h
│   │       │   ├── configuration.h
│   │       │   ├── configuration_no-asm.h
│   │       │   ├── conf_no-asm.h
│   │       │   ├── conftypes.h
│   │       │   ├── core_dispatch.h
│   │       │   ├── core.h
│   │       │   ├── core_names.h
│   │       │   ├── core_object.h
│   │       │   ├── crmf_asm.h
│   │       │   ├── crmferr.h
│   │       │   ├── crmf.h
│   │       │   ├── crmf_no-asm.h
│   │       │   ├── crypto_asm.h
│   │       │   ├── cryptoerr.h
│   │       │   ├── cryptoerr_legacy.h
│   │       │   ├── crypto.h
│   │       │   ├── crypto_no-asm.h
│   │       │   ├── ct_asm.h
│   │       │   ├── cterr.h
│   │       │   ├── ct.h
│   │       │   ├── ct_no-asm.h
│   │       │   ├── decodererr.h
│   │       │   ├── decoder.h
│   │       │   ├── des.h
│   │       │   ├── dherr.h
│   │       │   ├── dh.h
│   │       │   ├── dsaerr.h
│   │       │   ├── dsa.h
│   │       │   ├── dso_conf_asm.h
│   │       │   ├── dso_conf.h
│   │       │   ├── dso_conf_no-asm.h
│   │       │   ├── dtls1.h
│   │       │   ├── ebcdic.h
│   │       │   ├── ecdh.h
│   │       │   ├── ecdsa.h
│   │       │   ├── ecerr.h
│   │       │   ├── ec.h
│   │       │   ├── encodererr.h
│   │       │   ├── encoder.h
│   │       │   ├── engineerr.h
│   │       │   ├── engine.h
│   │       │   ├── e_os2.h
│   │       │   ├── err_asm.h
│   │       │   ├── err.h
│   │       │   ├── err_no-asm.h
│   │       │   ├── ess_asm.h
│   │       │   ├── esserr.h
│   │       │   ├── ess.h
│   │       │   ├── ess_no-asm.h
│   │       │   ├── evperr.h
│   │       │   ├── evp.h
│   │       │   ├── fipskey_asm.h
│   │       │   ├── fipskey.h
│   │       │   ├── fipskey_no-asm.h
│   │       │   ├── fips_names.h
│   │       │   ├── hmac.h
│   │       │   ├── httperr.h
│   │       │   ├── http.h
│   │       │   ├── idea.h
│   │       │   ├── kdferr.h
│   │       │   ├── kdf.h
│   │       │   ├── lhash_asm.h
│   │       │   ├── lhash.h
│   │       │   ├── lhash_no-asm.h
│   │       │   ├── macros.h
│   │       │   ├── md2.h
│   │       │   ├── md4.h
│   │       │   ├── md5.h
│   │       │   ├── mdc2.h
│   │       │   ├── modes.h
│   │       │   ├── objectserr.h
│   │       │   ├── objects.h
│   │       │   ├── obj_mac.h
│   │       │   ├── ocsp_asm.h
│   │       │   ├── ocsperr.h
│   │       │   ├── ocsp.h
│   │       │   ├── ocsp_no-asm.h
│   │       │   ├── opensslconf_asm.h
│   │       │   ├── opensslconf.h
│   │       │   ├── opensslv_asm.h
│   │       │   ├── opensslv.h
│   │       │   ├── opensslv_no-asm.h
│   │       │   ├── ossl_typ.h
│   │       │   ├── param_build.h
│   │       │   ├── params.h
│   │       │   ├── pem2.h
│   │       │   ├── pemerr.h
│   │       │   ├── pem.h
│   │       │   ├── pkcs12_asm.h
│   │       │   ├── pkcs12err.h
│   │       │   ├── pkcs12.h
│   │       │   ├── pkcs12_no-asm.h
│   │       │   ├── pkcs7_asm.h
│   │       │   ├── pkcs7err.h
│   │       │   ├── pkcs7.h
│   │       │   ├── pkcs7_no-asm.h
│   │       │   ├── proverr.h
│   │       │   ├── provider.h
│   │       │   ├── prov_ssl.h
│   │       │   ├── quic.h
│   │       │   ├── randerr.h
│   │       │   ├── rand.h
│   │       │   ├── rc2.h
│   │       │   ├── rc4.h
│   │       │   ├── rc5.h
│   │       │   ├── ripemd.h
│   │       │   ├── rsaerr.h
│   │       │   ├── rsa.h
│   │       │   ├── safestack_asm.h
│   │       │   ├── safestack.h
│   │       │   ├── safestack_no-asm.h
│   │       │   ├── seed.h
│   │       │   ├── self_test.h
│   │       │   ├── sha.h
│   │       │   ├── srp_asm.h
│   │       │   ├── srp.h
│   │       │   ├── srp_no-asm.h
│   │       │   ├── srtp.h
│   │       │   ├── ssl2.h
│   │       │   ├── ssl3.h
│   │       │   ├── ssl_asm.h
│   │       │   ├── sslerr.h
│   │       │   ├── sslerr_legacy.h
│   │       │   ├── ssl.h
│   │       │   ├── ssl_no-asm.h
│   │       │   ├── stack.h
│   │       │   ├── storeerr.h
│   │       │   ├── store.h
│   │       │   ├── symhacks.h
│   │       │   ├── tls1.h
│   │       │   ├── trace.h
│   │       │   ├── tserr.h
│   │       │   ├── ts.h
│   │       │   ├── txt_db.h
│   │       │   ├── types.h
│   │       │   ├── ui_asm.h
│   │       │   ├── uierr.h
│   │       │   ├── ui.h
│   │       │   ├── ui_no-asm.h
│   │       │   ├── whrlpool.h
│   │       │   ├── x509_asm.h
│   │       │   ├── x509err.h
│   │       │   ├── x509.h
│   │       │   ├── x509_no-asm.h
│   │       │   ├── x509v3_asm.h
│   │       │   ├── x509v3err.h
│   │       │   ├── x509v3.h
│   │       │   ├── x509v3_no-asm.h
│   │       │   ├── x509_vfy_asm.h
│   │       │   ├── x509_vfy.h
│   │       │   └── x509_vfy_no-asm.h
│   │       ├── [01;34muv[0m
│   │       │   ├── aix.h
│   │       │   ├── bsd.h
│   │       │   ├── darwin.h
│   │       │   ├── errno.h
│   │       │   ├── linux.h
│   │       │   ├── os390.h
│   │       │   ├── posix.h
│   │       │   ├── sunos.h
│   │       │   ├── threadpool.h
│   │       │   ├── tree.h
│   │       │   ├── unix.h
│   │       │   ├── version.h
│   │       │   └── win.h
│   │       ├── uv.h
│   │       ├── v8-array-buffer.h
│   │       ├── v8-callbacks.h
│   │       ├── v8config.h
│   │       ├── v8-container.h
│   │       ├── v8-context.h
│   │       ├── v8-cppgc.h
│   │       ├── v8-data.h
│   │       ├── v8-date.h
│   │       ├── v8-debug.h
│   │       ├── v8-embedder-heap.h
│   │       ├── v8-embedder-state-scope.h
│   │       ├── v8-exception.h
│   │       ├── v8-extension.h
│   │       ├── v8-external.h
│   │       ├── v8-forward.h
│   │       ├── v8-function-callback.h
│   │       ├── v8-function.h
│   │       ├── v8.h
│   │       ├── v8-handle-base.h
│   │       ├── v8-initialization.h
│   │       ├── v8-internal.h
│   │       ├── v8-isolate.h
│   │       ├── v8-json.h
│   │       ├── v8-local-handle.h
│   │       ├── v8-locker.h
│   │       ├── v8-maybe.h
│   │       ├── v8-memory-span.h
│   │       ├── v8-message.h
│   │       ├── v8-microtask.h
│   │       ├── v8-microtask-queue.h
│   │       ├── v8-object.h
│   │       ├── v8-persistent-handle.h
│   │       ├── v8-platform.h
│   │       ├── v8-primitive.h
│   │       ├── v8-primitive-object.h
│   │       ├── v8-profiler.h
│   │       ├── v8-promise.h
│   │       ├── v8-proxy.h
│   │       ├── v8-regexp.h
│   │       ├── v8-script.h
│   │       ├── v8-snapshot.h
│   │       ├── v8-source-location.h
│   │       ├── v8-statistics.h
│   │       ├── v8-template.h
│   │       ├── v8-traced-handle.h
│   │       ├── v8-typed-array.h
│   │       ├── v8-unwinder.h
│   │       ├── v8-value.h
│   │       ├── v8-value-serializer.h
│   │       ├── v8-version.h
│   │       ├── v8-wasm.h
│   │       ├── v8-weak-callback-info.h
│   │       ├── zconf.h
│   │       └── zlib.h
│   ├── [01;34mlib[0m
│   │   ├── [01;34mbinfmt.d[0m
│   │   │   └── python3.10.conf
│   │   ├── [01;34mgnupg[0m
│   │   │   ├── [01;32mdirmngr_ldap[0m
│   │   │   ├── [01;32mgpg-check-pattern[0m
│   │   │   ├── [01;32mgpg-preset-passphrase[0m
│   │   │   ├── [01;32mgpg-protect-tool[0m
│   │   │   └── [01;32mgpg-wks-client[0m
│   │   ├── [01;34mgnupg2[0m
│   │   │   ├── [01;36mgpg-preset-passphrase[0m -> [01;32m../gnupg/gpg-preset-passphrase[0m
│   │   │   └── [01;36mgpg-protect-tool[0m -> [01;32m../gnupg/gpg-protect-tool[0m
│   │   ├── [01;34mnode_modules[0m
│   │   │   ├── [01;34mcorepack[0m
│   │   │   │   ├── [01;34mdist[0m
│   │   │   │   │   ├── [01;32mcorepack.js[0m
│   │   │   │   │   ├── [01;34mlib[0m
│   │   │   │   │   │   └── corepack.cjs
│   │   │   │   │   ├── [01;32mnpm.js[0m
│   │   │   │   │   ├── [01;32mnpx.js[0m
│   │   │   │   │   ├── [01;32mpnpm.js[0m
│   │   │   │   │   ├── [01;32mpnpx.js[0m
│   │   │   │   │   ├── [01;32myarn.js[0m
│   │   │   │   │   └── [01;32myarnpkg.js[0m
│   │   │   │   ├── package.json
│   │   │   │   └── [01;34mshims[0m
│   │   │   │       ├── [01;32mcorepack[0m
│   │   │   │       ├── [01;32mcorepack.cmd[0m
│   │   │   │       ├── [01;32mcorepack.ps1[0m
│   │   │   │       ├── [01;34mnodewin[0m
│   │   │   │       │   ├── corepack
│   │   │   │       │   ├── corepack.cmd
│   │   │   │       │   ├── corepack.ps1
│   │   │   │       │   ├── npm
│   │   │   │       │   ├── npm.cmd
│   │   │   │       │   ├── npm.ps1
│   │   │   │       │   ├── npx
│   │   │   │       │   ├── npx.cmd
│   │   │   │       │   ├── npx.ps1
│   │   │   │       │   ├── pnpm
│   │   │   │       │   ├── pnpm.cmd
│   │   │   │       │   ├── pnpm.ps1
│   │   │   │       │   ├── pnpx
│   │   │   │       │   ├── pnpx.cmd
│   │   │   │       │   ├── pnpx.ps1
│   │   │   │       │   ├── yarn
│   │   │   │       │   ├── yarn.cmd
│   │   │   │       │   ├── yarnpkg
│   │   │   │       │   ├── yarnpkg.cmd
│   │   │   │       │   ├── yarnpkg.ps1
│   │   │   │       │   └── yarn.ps1
│   │   │   │       ├── [01;32mnpm[0m
│   │   │   │       ├── [01;32mnpm.cmd[0m
│   │   │   │       ├── [01;32mnpm.ps1[0m
│   │   │   │       ├── [01;32mnpx[0m
│   │   │   │       ├── [01;32mnpx.cmd[0m
│   │   │   │       ├── [01;32mnpx.ps1[0m
│   │   │   │       ├── [01;32mpnpm[0m
│   │   │   │       ├── [01;32mpnpm.cmd[0m
│   │   │   │       ├── [01;32mpnpm.ps1[0m
│   │   │   │       ├── [01;32mpnpx[0m
│   │   │   │       ├── [01;32mpnpx.cmd[0m
│   │   │   │       ├── [01;32mpnpx.ps1[0m
│   │   │   │       ├── [01;32myarn[0m
│   │   │   │       ├── [01;32myarn.cmd[0m
│   │   │   │       ├── [01;32myarnpkg[0m
│   │   │   │       ├── [01;32myarnpkg.cmd[0m
│   │   │   │       ├── [01;32myarnpkg.ps1[0m
│   │   │   │       └── [01;32myarn.ps1[0m
│   │   │   └── [01;34mnpm[0m
│   │   │       ├── [01;34mbin[0m
│   │   │       │   ├── [01;34mnode-gyp-bin[0m
│   │   │       │   │   ├── [01;32mnode-gyp[0m
│   │   │       │   │   └── [01;32mnode-gyp.cmd[0m
│   │   │       │   ├── [01;32mnpm[0m
│   │   │       │   ├── [01;32mnpm-cli.js[0m
│   │   │       │   ├── [01;32mnpm.cmd[0m
│   │   │       │   ├── [01;32mnpm-prefix.js[0m
│   │   │       │   ├── npm.ps1
│   │   │       │   ├── [01;32mnpx[0m
│   │   │       │   ├── [01;32mnpx-cli.js[0m
│   │   │       │   ├── [01;32mnpx.cmd[0m
│   │   │       │   └── npx.ps1
│   │   │       ├── [01;34mdocs[0m
│   │   │       │   ├── [01;34mlib[0m
│   │   │       │   │   └── index.js
│   │   │       │   └── [01;34moutput[0m
│   │   │       │       ├── [01;34mcommands[0m
│   │   │       │       │   ├── npm-access.html
│   │   │       │       │   ├── npm-adduser.html
│   │   │       │       │   ├── npm-audit.html
│   │   │       │       │   ├── npm-bugs.html
│   │   │       │       │   ├── npm-cache.html
│   │   │       │       │   ├── npm-ci.html
│   │   │       │       │   ├── npm-completion.html
│   │   │       │       │   ├── npm-config.html
│   │   │       │       │   ├── npm-dedupe.html
│   │   │       │       │   ├── npm-deprecate.html
│   │   │       │       │   ├── npm-diff.html
│   │   │       │       │   ├── npm-dist-tag.html
│   │   │       │       │   ├── npm-docs.html
│   │   │       │       │   ├── npm-doctor.html
│   │   │       │       │   ├── npm-edit.html
│   │   │       │       │   ├── npm-exec.html
│   │   │       │       │   ├── npm-explain.html
│   │   │       │       │   ├── npm-explore.html
│   │   │       │       │   ├── npm-find-dupes.html
│   │   │       │       │   ├── npm-fund.html
│   │   │       │       │   ├── npm-help.html
│   │   │       │       │   ├── npm-help-search.html
│   │   │       │       │   ├── npm-hook.html
│   │   │       │       │   ├── npm.html
│   │   │       │       │   ├── npm-init.html
│   │   │       │       │   ├── npm-install-ci-test.html
│   │   │       │       │   ├── npm-install.html
│   │   │       │       │   ├── npm-install-test.html
│   │   │       │       │   ├── npm-link.html
│   │   │       │       │   ├── npm-login.html
│   │   │       │       │   ├── npm-logout.html
│   │   │       │       │   ├── npm-ls.html
│   │   │       │       │   ├── npm-org.html
│   │   │       │       │   ├── npm-outdated.html
│   │   │       │       │   ├── npm-owner.html
│   │   │       │       │   ├── npm-pack.html
│   │   │       │       │   ├── npm-ping.html
│   │   │       │       │   ├── npm-pkg.html
│   │   │       │       │   ├── npm-prefix.html
│   │   │       │       │   ├── npm-profile.html
│   │   │       │       │   ├── npm-prune.html
│   │   │       │       │   ├── npm-publish.html
│   │   │       │       │   ├── npm-query.html
│   │   │       │       │   ├── npm-rebuild.html
│   │   │       │       │   ├── npm-repo.html
│   │   │       │       │   ├── npm-restart.html
│   │   │       │       │   ├── npm-root.html
│   │   │       │       │   ├── npm-run-script.html
│   │   │       │       │   ├── npm-sbom.html
│   │   │       │       │   ├── npm-search.html
│   │   │       │       │   ├── npm-shrinkwrap.html
│   │   │       │       │   ├── npm-star.html
│   │   │       │       │   ├── npm-stars.html
│   │   │       │       │   ├── npm-start.html
│   │   │       │       │   ├── npm-stop.html
│   │   │       │       │   ├── npm-team.html
│   │   │       │       │   ├── npm-test.html
│   │   │       │       │   ├── npm-token.html
│   │   │       │       │   ├── npm-uninstall.html
│   │   │       │       │   ├── npm-unpublish.html
│   │   │       │       │   ├── npm-unstar.html
│   │   │       │       │   ├── npm-update.html
│   │   │       │       │   ├── npm-version.html
│   │   │       │       │   ├── npm-view.html
│   │   │       │       │   ├── npm-whoami.html
│   │   │       │       │   └── npx.html
│   │   │       │       ├── [01;34mconfiguring-npm[0m
│   │   │       │       │   ├── folders.html
│   │   │       │       │   ├── install.html
│   │   │       │       │   ├── npmrc.html
│   │   │       │       │   ├── npm-shrinkwrap-json.html
│   │   │       │       │   ├── package-json.html
│   │   │       │       │   └── package-lock-json.html
│   │   │       │       └── [01;34musing-npm[0m
│   │   │       │           ├── config.html
│   │   │       │           ├── dependency-selectors.html
│   │   │       │           ├── developers.html
│   │   │       │           ├── logging.html
│   │   │       │           ├── orgs.html
│   │   │       │           ├── package-spec.html
│   │   │       │           ├── registry.html
│   │   │       │           ├── removal.html
│   │   │       │           ├── scope.html
│   │   │       │           ├── scripts.html
│   │   │       │           └── workspaces.html
│   │   │       ├── index.js
│   │   │       ├── [01;34mlib[0m
│   │   │       │   ├── arborist-cmd.js
│   │   │       │   ├── base-cmd.js
│   │   │       │   ├── [01;34mcli[0m
│   │   │       │   │   ├── entry.js
│   │   │       │   │   ├── exit-handler.js
│   │   │       │   │   ├── update-notifier.js
│   │   │       │   │   └── validate-engines.js
│   │   │       │   ├── cli.js
│   │   │       │   ├── [01;34mcommands[0m
│   │   │       │   │   ├── access.js
│   │   │       │   │   ├── adduser.js
│   │   │       │   │   ├── audit.js
│   │   │       │   │   ├── bugs.js
│   │   │       │   │   ├── cache.js
│   │   │       │   │   ├── ci.js
│   │   │       │   │   ├── completion.js
│   │   │       │   │   ├── config.js
│   │   │       │   │   ├── dedupe.js
│   │   │       │   │   ├── deprecate.js
│   │   │       │   │   ├── diff.js
│   │   │       │   │   ├── dist-tag.js
│   │   │       │   │   ├── docs.js
│   │   │       │   │   ├── doctor.js
│   │   │       │   │   ├── edit.js
│   │   │       │   │   ├── exec.js
│   │   │       │   │   ├── explain.js
│   │   │       │   │   ├── explore.js
│   │   │       │   │   ├── find-dupes.js
│   │   │       │   │   ├── fund.js
│   │   │       │   │   ├── get.js
│   │   │       │   │   ├── help.js
│   │   │       │   │   ├── help-search.js
│   │   │       │   │   ├── hook.js
│   │   │       │   │   ├── init.js
│   │   │       │   │   ├── install-ci-test.js
│   │   │       │   │   ├── install.js
│   │   │       │   │   ├── install-test.js
│   │   │       │   │   ├── link.js
│   │   │       │   │   ├── ll.js
│   │   │       │   │   ├── login.js
│   │   │       │   │   ├── logout.js
│   │   │       │   │   ├── ls.js
│   │   │       │   │   ├── org.js
│   │   │       │   │   ├── outdated.js
│   │   │       │   │   ├── owner.js
│   │   │       │   │   ├── pack.js
│   │   │       │   │   ├── ping.js
│   │   │       │   │   ├── pkg.js
│   │   │       │   │   ├── prefix.js
│   │   │       │   │   ├── profile.js
│   │   │       │   │   ├── prune.js
│   │   │       │   │   ├── publish.js
│   │   │       │   │   ├── query.js
│   │   │       │   │   ├── rebuild.js
│   │   │       │   │   ├── repo.js
│   │   │       │   │   ├── restart.js
│   │   │       │   │   ├── root.js
│   │   │       │   │   ├── run-script.js
│   │   │       │   │   ├── sbom.js
│   │   │       │   │   ├── search.js
│   │   │       │   │   ├── set.js
│   │   │       │   │   ├── shrinkwrap.js
│   │   │       │   │   ├── star.js
│   │   │       │   │   ├── stars.js
│   │   │       │   │   ├── start.js
│   │   │       │   │   ├── stop.js
│   │   │       │   │   ├── team.js
│   │   │       │   │   ├── test.js
│   │   │       │   │   ├── token.js
│   │   │       │   │   ├── uninstall.js
│   │   │       │   │   ├── unpublish.js
│   │   │       │   │   ├── unstar.js
│   │   │       │   │   ├── update.js
│   │   │       │   │   ├── version.js
│   │   │       │   │   ├── view.js
│   │   │       │   │   └── whoami.js
│   │   │       │   ├── lifecycle-cmd.js
│   │   │       │   ├── npm.js
│   │   │       │   ├── package-url-cmd.js
│   │   │       │   └── [01;34mutils[0m
│   │   │       │       ├── audit-error.js
│   │   │       │       ├── auth.js
│   │   │       │       ├── cmd-list.js
│   │   │       │       ├── completion.fish
│   │   │       │       ├── [01;32mcompletion.sh[0m
│   │   │       │       ├── did-you-mean.js
│   │   │       │       ├── display.js
│   │   │       │       ├── error-message.js
│   │   │       │       ├── explain-dep.js
│   │   │       │       ├── explain-eresolve.js
│   │   │       │       ├── format-bytes.js
│   │   │       │       ├── format.js
│   │   │       │       ├── format-search-stream.js
│   │   │       │       ├── get-identity.js
│   │   │       │       ├── get-workspaces.js
│   │   │       │       ├── installed-deep.js
│   │   │       │       ├── installed-shallow.js
│   │   │       │       ├── is-windows.js
│   │   │       │       ├── log-file.js
│   │   │       │       ├── npm-usage.js
│   │   │       │       ├── open-url.js
│   │   │       │       ├── open-url-prompt.js
│   │   │       │       ├── otplease.js
│   │   │       │       ├── ping.js
│   │   │       │       ├── queryable.js
│   │   │       │       ├── read-user-info.js
│   │   │       │       ├── reify-finish.js
│   │   │       │       ├── reify-output.js
│   │   │       │       ├── sbom-cyclonedx.js
│   │   │       │       ├── sbom-spdx.js
│   │   │       │       ├── tar.js
│   │   │       │       ├── timers.js
│   │   │       │       ├── update-workspaces.js
│   │   │       │       ├── validate-lockfile.js
│   │   │       │       ├── verify-signatures.js
│   │   │       │       └── web-auth.js
│   │   │       ├── [01;34mman[0m
│   │   │       │   ├── [01;34mman1[0m
│   │   │       │   │   ├── npm.1
│   │   │       │   │   ├── npm-access.1
│   │   │       │   │   ├── npm-adduser.1
│   │   │       │   │   ├── npm-audit.1
│   │   │       │   │   ├── npm-bugs.1
│   │   │       │   │   ├── npm-cache.1
│   │   │       │   │   ├── npm-ci.1
│   │   │       │   │   ├── npm-completion.1
│   │   │       │   │   ├── npm-config.1
│   │   │       │   │   ├── npm-dedupe.1
│   │   │       │   │   ├── npm-deprecate.1
│   │   │       │   │   ├── npm-diff.1
│   │   │       │   │   ├── npm-dist-tag.1
│   │   │       │   │   ├── npm-docs.1
│   │   │       │   │   ├── npm-doctor.1
│   │   │       │   │   ├── npm-edit.1
│   │   │       │   │   ├── npm-exec.1
│   │   │       │   │   ├── npm-explain.1
│   │   │       │   │   ├── npm-explore.1
│   │   │       │   │   ├── npm-find-dupes.1
│   │   │       │   │   ├── npm-fund.1
│   │   │       │   │   ├── npm-help.1
│   │   │       │   │   ├── npm-help-search.1
│   │   │       │   │   ├── npm-hook.1
│   │   │       │   │   ├── npm-init.1
│   │   │       │   │   ├── npm-install.1
│   │   │       │   │   ├── npm-install-ci-test.1
│   │   │       │   │   ├── npm-install-test.1
│   │   │       │   │   ├── npm-link.1
│   │   │       │   │   ├── npm-login.1
│   │   │       │   │   ├── npm-logout.1
│   │   │       │   │   ├── npm-ls.1
│   │   │       │   │   ├── npm-org.1
│   │   │       │   │   ├── npm-outdated.1
│   │   │       │   │   ├── npm-owner.1
│   │   │       │   │   ├── npm-pack.1
│   │   │       │   │   ├── npm-ping.1
│   │   │       │   │   ├── npm-pkg.1
│   │   │       │   │   ├── npm-prefix.1
│   │   │       │   │   ├── npm-profile.1
│   │   │       │   │   ├── npm-prune.1
│   │   │       │   │   ├── npm-publish.1
│   │   │       │   │   ├── npm-query.1
│   │   │       │   │   ├── npm-rebuild.1
│   │   │       │   │   ├── npm-repo.1
│   │   │       │   │   ├── npm-restart.1
│   │   │       │   │   ├── npm-root.1
│   │   │       │   │   ├── npm-run-script.1
│   │   │       │   │   ├── npm-sbom.1
│   │   │       │   │   ├── npm-search.1
│   │   │       │   │   ├── npm-shrinkwrap.1
│   │   │       │   │   ├── npm-star.1
│   │   │       │   │   ├── npm-stars.1
│   │   │       │   │   ├── npm-start.1
│   │   │       │   │   ├── npm-stop.1
│   │   │       │   │   ├── npm-team.1
│   │   │       │   │   ├── npm-test.1
│   │   │       │   │   ├── npm-token.1
│   │   │       │   │   ├── npm-uninstall.1
│   │   │       │   │   ├── npm-unpublish.1
│   │   │       │   │   ├── npm-unstar.1
│   │   │       │   │   ├── npm-update.1
│   │   │       │   │   ├── npm-version.1
│   │   │       │   │   ├── npm-view.1
│   │   │       │   │   ├── npm-whoami.1
│   │   │       │   │   └── npx.1
│   │   │       │   ├── [01;34mman5[0m
│   │   │       │   │   ├── folders.5
│   │   │       │   │   ├── install.5
│   │   │       │   │   ├── npm-global.5
│   │   │       │   │   ├── npm-json.5
│   │   │       │   │   ├── npmrc.5
│   │   │       │   │   ├── npm-shrinkwrap-json.5
│   │   │       │   │   ├── package-json.5
│   │   │       │   │   └── package-lock-json.5
│   │   │       │   └── [01;34mman7[0m
│   │   │       │       ├── config.7
│   │   │       │       ├── dependency-selectors.7
│   │   │       │       ├── developers.7
│   │   │       │       ├── logging.7
│   │   │       │       ├── orgs.7
│   │   │       │       ├── package-spec.7
│   │   │       │       ├── registry.7
│   │   │       │       ├── removal.7
│   │   │       │       ├── scope.7
│   │   │       │       ├── scripts.7
│   │   │       │       └── workspaces.7
│   │   │       ├── [01;34mnode_modules[0m
│   │   │       │   ├── [01;34mabbrev[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34magent-base[0m
│   │   │       │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   ├── helpers.js
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34maggregate-error[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── license
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mansi-regex[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── license
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mansi-styles[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── license
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34maproba[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34marchy[0m
│   │   │       │   │   ├── [01;34mexamples[0m
│   │   │       │   │   │   ├── beep.js
│   │   │       │   │   │   └── multi_line.js
│   │   │       │   │   ├── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mbalanced-match[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mbinary-extensions[0m
│   │   │       │   │   ├── binary-extensions.json
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── license
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mbin-links[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── bin-target.js
│   │   │       │   │   │   ├── check-bin.js
│   │   │       │   │   │   ├── check-bins.js
│   │   │       │   │   │   ├── fix-bin.js
│   │   │       │   │   │   ├── get-node-modules.js
│   │   │       │   │   │   ├── get-paths.js
│   │   │       │   │   │   ├── get-prefix.js
│   │   │       │   │   │   ├── index.js
│   │   │       │   │   │   ├── is-windows.js
│   │   │       │   │   │   ├── link-bin.js
│   │   │       │   │   │   ├── link-bins.js
│   │   │       │   │   │   ├── link-gently.js
│   │   │       │   │   │   ├── link-mans.js
│   │   │       │   │   │   ├── man-target.js
│   │   │       │   │   │   └── shim-bin.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mbrace-expansion[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mbuiltins[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── License
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mcacache[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── [01;34mcontent[0m
│   │   │       │   │   │   │   ├── path.js
│   │   │       │   │   │   │   ├── read.js
│   │   │       │   │   │   │   ├── rm.js
│   │   │       │   │   │   │   └── write.js
│   │   │       │   │   │   ├── entry-index.js
│   │   │       │   │   │   ├── get.js
│   │   │       │   │   │   ├── index.js
│   │   │       │   │   │   ├── memoization.js
│   │   │       │   │   │   ├── put.js
│   │   │       │   │   │   ├── rm.js
│   │   │       │   │   │   ├── [01;34mutil[0m
│   │   │       │   │   │   │   ├── glob.js
│   │   │       │   │   │   │   ├── hash-to-segments.js
│   │   │       │   │   │   │   └── tmp.js
│   │   │       │   │   │   └── verify.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mchalk[0m
│   │   │       │   │   ├── license
│   │   │       │   │   ├── package.json
│   │   │       │   │   └── [01;34msource[0m
│   │   │       │   │       ├── index.js
│   │   │       │   │       ├── utilities.js
│   │   │       │   │       └── [01;34mvendor[0m
│   │   │       │   │           ├── [01;34mansi-styles[0m
│   │   │       │   │           │   └── index.js
│   │   │       │   │           └── [01;34msupports-color[0m
│   │   │       │   │               ├── browser.js
│   │   │       │   │               └── index.js
│   │   │       │   ├── [01;34mchownr[0m
│   │   │       │   │   ├── chownr.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mcidr-regex[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mci-info[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── package.json
│   │   │       │   │   └── vendors.json
│   │   │       │   ├── [01;34mclean-stack[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── license
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mcli-columns[0m
│   │   │       │   │   ├── color.js
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── license
│   │   │       │   │   ├── package.json
│   │   │       │   │   └── test.js
│   │   │       │   ├── [01;34mcmd-shim[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── index.js
│   │   │       │   │   │   └── to-batch-syntax.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mcolor-convert[0m
│   │   │       │   │   ├── conversions.js
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── package.json
│   │   │       │   │   └── route.js
│   │   │       │   ├── [01;34mcolor-name[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mcommon-ancestor-path[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mcross-spawn[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── enoent.js
│   │   │       │   │   │   ├── parse.js
│   │   │       │   │   │   └── [01;34mutil[0m
│   │   │       │   │   │       ├── escape.js
│   │   │       │   │   │       ├── readShebang.js
│   │   │       │   │   │       └── resolveCommand.js
│   │   │       │   │   ├── [01;34mnode_modules[0m
│   │   │       │   │   │   └── [01;34mwhich[0m
│   │   │       │   │   │       ├── [01;34mbin[0m
│   │   │       │   │   │       │   └── [01;32mnode-which[0m
│   │   │       │   │   │       ├── package.json
│   │   │       │   │   │       └── which.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mcssesc[0m
│   │   │       │   │   ├── [01;34mbin[0m
│   │   │       │   │   │   └── [01;32mcssesc[0m
│   │   │       │   │   ├── cssesc.js
│   │   │       │   │   ├── [01;34mman[0m
│   │   │       │   │   │   └── cssesc.1
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mdebug[0m
│   │   │       │   │   ├── [01;34mnode_modules[0m
│   │   │       │   │   │   └── [01;34mms[0m
│   │   │       │   │   │       ├── index.js
│   │   │       │   │   │       └── package.json
│   │   │       │   │   ├── package.json
│   │   │       │   │   └── [01;34msrc[0m
│   │   │       │   │       ├── browser.js
│   │   │       │   │       ├── common.js
│   │   │       │   │       ├── index.js
│   │   │       │   │       └── node.js
│   │   │       │   ├── [01;34mdiff[0m
│   │   │       │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   ├── diff.js
│   │   │       │   │   │   └── diff.min.js
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── [01;34mconvert[0m
│   │   │       │   │   │   │   ├── dmp.js
│   │   │       │   │   │   │   └── xml.js
│   │   │       │   │   │   ├── [01;34mdiff[0m
│   │   │       │   │   │   │   ├── array.js
│   │   │       │   │   │   │   ├── base.js
│   │   │       │   │   │   │   ├── character.js
│   │   │       │   │   │   │   ├── css.js
│   │   │       │   │   │   │   ├── json.js
│   │   │       │   │   │   │   ├── line.js
│   │   │       │   │   │   │   ├── sentence.js
│   │   │       │   │   │   │   └── word.js
│   │   │       │   │   │   ├── index.es6.js
│   │   │       │   │   │   ├── index.js
│   │   │       │   │   │   ├── index.mjs
│   │   │       │   │   │   ├── [01;34mpatch[0m
│   │   │       │   │   │   │   ├── apply.js
│   │   │       │   │   │   │   ├── create.js
│   │   │       │   │   │   │   ├── merge.js
│   │   │       │   │   │   │   ├── parse.js
│   │   │       │   │   │   │   └── reverse.js
│   │   │       │   │   │   └── [01;34mutil[0m
│   │   │       │   │   │       ├── array.js
│   │   │       │   │   │       ├── distance-iterator.js
│   │   │       │   │   │       └── params.js
│   │   │       │   │   ├── package.json
│   │   │       │   │   └── runtime.js
│   │   │       │   ├── [01;34meastasianwidth[0m
│   │   │       │   │   ├── eastasianwidth.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34memoji-regex[0m
│   │   │       │   │   ├── [01;34mes2015[0m
│   │   │       │   │   │   ├── index.js
│   │   │       │   │   │   └── text.js
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── package.json
│   │   │       │   │   └── text.js
│   │   │       │   ├── [01;34mencoding[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── encoding.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34menv-paths[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── license
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34merr-code[0m
│   │   │       │   │   ├── bower.json
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── index.umd.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mexponential-backoff[0m
│   │   │       │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   ├── backoff.js
│   │   │       │   │   │   ├── [01;34mdelay[0m
│   │   │       │   │   │   │   ├── [01;34malways[0m
│   │   │       │   │   │   │   │   └── always.delay.js
│   │   │       │   │   │   │   ├── delay.base.js
│   │   │       │   │   │   │   ├── delay.factory.js
│   │   │       │   │   │   │   ├── delay.interface.js
│   │   │       │   │   │   │   └── [01;34mskip-first[0m
│   │   │       │   │   │   │       └── skip-first.delay.js
│   │   │       │   │   │   ├── [01;34mjitter[0m
│   │   │       │   │   │   │   ├── [01;34mfull[0m
│   │   │       │   │   │   │   │   └── full.jitter.js
│   │   │       │   │   │   │   ├── jitter.factory.js
│   │   │       │   │   │   │   └── [01;34mno[0m
│   │   │       │   │   │   │       └── no.jitter.js
│   │   │       │   │   │   └── options.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mfastest-levenshtein[0m
│   │   │       │   │   ├── bench.js
│   │   │       │   │   ├── [01;34mesm[0m
│   │   │       │   │   │   └── mod.js
│   │   │       │   │   ├── mod.js
│   │   │       │   │   ├── package.json
│   │   │       │   │   └── test.js
│   │   │       │   ├── [01;34mforeground-child[0m
│   │   │       │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   ├── [01;34mcjs[0m
│   │   │       │   │   │   │   ├── all-signals.js
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   ├── package.json
│   │   │       │   │   │   │   └── watchdog.js
│   │   │       │   │   │   └── [01;34mmjs[0m
│   │   │       │   │   │       ├── all-signals.js
│   │   │       │   │   │       ├── index.js
│   │   │       │   │   │       ├── package.json
│   │   │       │   │   │       └── watchdog.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mfs-minipass[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mfunction-bind[0m
│   │   │       │   │   ├── implementation.js
│   │   │       │   │   ├── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mglob[0m
│   │   │       │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   ├── [01;34mcommonjs[0m
│   │   │       │   │   │   │   ├── glob.d.ts
│   │   │       │   │   │   │   ├── glob.d.ts.map
│   │   │       │   │   │   │   ├── glob.js
│   │   │       │   │   │   │   ├── glob.js.map
│   │   │       │   │   │   │   ├── has-magic.d.ts
│   │   │       │   │   │   │   ├── has-magic.d.ts.map
│   │   │       │   │   │   │   ├── has-magic.js
│   │   │       │   │   │   │   ├── has-magic.js.map
│   │   │       │   │   │   │   ├── ignore.d.ts
│   │   │       │   │   │   │   ├── ignore.d.ts.map
│   │   │       │   │   │   │   ├── ignore.js
│   │   │       │   │   │   │   ├── ignore.js.map
│   │   │       │   │   │   │   ├── index.d.ts
│   │   │       │   │   │   │   ├── index.d.ts.map
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   ├── index.js.map
│   │   │       │   │   │   │   ├── package.json
│   │   │       │   │   │   │   ├── pattern.d.ts
│   │   │       │   │   │   │   ├── pattern.d.ts.map
│   │   │       │   │   │   │   ├── pattern.js
│   │   │       │   │   │   │   ├── pattern.js.map
│   │   │       │   │   │   │   ├── processor.d.ts
│   │   │       │   │   │   │   ├── processor.d.ts.map
│   │   │       │   │   │   │   ├── processor.js
│   │   │       │   │   │   │   ├── processor.js.map
│   │   │       │   │   │   │   ├── walker.d.ts
│   │   │       │   │   │   │   ├── walker.d.ts.map
│   │   │       │   │   │   │   ├── walker.js
│   │   │       │   │   │   │   └── walker.js.map
│   │   │       │   │   │   └── [01;34mesm[0m
│   │   │       │   │   │       ├── bin.d.mts
│   │   │       │   │   │       ├── bin.d.mts.map
│   │   │       │   │   │       ├── [01;32mbin.mjs[0m
│   │   │       │   │   │       ├── bin.mjs.map
│   │   │       │   │   │       ├── glob.d.ts
│   │   │       │   │   │       ├── glob.d.ts.map
│   │   │       │   │   │       ├── glob.js
│   │   │       │   │   │       ├── glob.js.map
│   │   │       │   │   │       ├── has-magic.d.ts
│   │   │       │   │   │       ├── has-magic.d.ts.map
│   │   │       │   │   │       ├── has-magic.js
│   │   │       │   │   │       ├── has-magic.js.map
│   │   │       │   │   │       ├── ignore.d.ts
│   │   │       │   │   │       ├── ignore.d.ts.map
│   │   │       │   │   │       ├── ignore.js
│   │   │       │   │   │       ├── ignore.js.map
│   │   │       │   │   │       ├── index.d.ts
│   │   │       │   │   │       ├── index.d.ts.map
│   │   │       │   │   │       ├── index.js
│   │   │       │   │   │       ├── index.js.map
│   │   │       │   │   │       ├── package.json
│   │   │       │   │   │       ├── pattern.d.ts
│   │   │       │   │   │       ├── pattern.d.ts.map
│   │   │       │   │   │       ├── pattern.js
│   │   │       │   │   │       ├── pattern.js.map
│   │   │       │   │   │       ├── processor.d.ts
│   │   │       │   │   │       ├── processor.d.ts.map
│   │   │       │   │   │       ├── processor.js
│   │   │       │   │   │       ├── processor.js.map
│   │   │       │   │   │       ├── walker.d.ts
│   │   │       │   │   │       ├── walker.d.ts.map
│   │   │       │   │   │       ├── walker.js
│   │   │       │   │   │       └── walker.js.map
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mgraceful-fs[0m
│   │   │       │   │   ├── clone.js
│   │   │       │   │   ├── graceful-fs.js
│   │   │       │   │   ├── legacy-streams.js
│   │   │       │   │   ├── package.json
│   │   │       │   │   └── polyfills.js
│   │   │       │   ├── [01;34mhasown[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── package.json
│   │   │       │   │   └── tsconfig.json
│   │   │       │   ├── [01;34mhosted-git-info[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── from-url.js
│   │   │       │   │   │   ├── hosts.js
│   │   │       │   │   │   ├── index.js
│   │   │       │   │   │   └── parse-url.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mhttp-cache-semantics[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mhttp-proxy-agent[0m
│   │   │       │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mhttps-proxy-agent[0m
│   │   │       │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   ├── index.js
│   │   │       │   │   │   └── parse-proxy-response.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34miconv-lite[0m
│   │   │       │   │   ├── [01;34mencodings[0m
│   │   │       │   │   │   ├── dbcs-codec.js
│   │   │       │   │   │   ├── dbcs-data.js
│   │   │       │   │   │   ├── index.js
│   │   │       │   │   │   ├── internal.js
│   │   │       │   │   │   ├── sbcs-codec.js
│   │   │       │   │   │   ├── sbcs-data-generated.js
│   │   │       │   │   │   ├── sbcs-data.js
│   │   │       │   │   │   ├── [01;34mtables[0m
│   │   │       │   │   │   │   ├── big5-added.json
│   │   │       │   │   │   │   ├── cp936.json
│   │   │       │   │   │   │   ├── cp949.json
│   │   │       │   │   │   │   ├── cp950.json
│   │   │       │   │   │   │   ├── eucjp.json
│   │   │       │   │   │   │   ├── gb18030-ranges.json
│   │   │       │   │   │   │   ├── gbk-added.json
│   │   │       │   │   │   │   └── shiftjis.json
│   │   │       │   │   │   ├── utf16.js
│   │   │       │   │   │   ├── utf32.js
│   │   │       │   │   │   └── utf7.js
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── bom-handling.js
│   │   │       │   │   │   ├── index.js
│   │   │       │   │   │   └── streams.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mignore-walk[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mimurmurhash[0m
│   │   │       │   │   ├── imurmurhash.js
│   │   │       │   │   ├── imurmurhash.min.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mindent-string[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── license
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mini[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── ini.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34minit-package-json[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── default-input.js
│   │   │       │   │   │   └── init-package-json.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mip-address[0m
│   │   │       │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   ├── address-error.js
│   │   │       │   │   │   ├── common.js
│   │   │       │   │   │   ├── ip-address.js
│   │   │       │   │   │   ├── ipv4.js
│   │   │       │   │   │   ├── ipv6.js
│   │   │       │   │   │   ├── [01;34mv4[0m
│   │   │       │   │   │   │   └── constants.js
│   │   │       │   │   │   └── [01;34mv6[0m
│   │   │       │   │   │       ├── constants.js
│   │   │       │   │   │       ├── helpers.js
│   │   │       │   │   │       └── regular-expressions.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mip-regex[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── license
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34m@isaacs[0m
│   │   │       │   │   ├── [01;34mcliui[0m
│   │   │       │   │   │   ├── [01;34mbuild[0m
│   │   │       │   │   │   │   ├── index.cjs
│   │   │       │   │   │   │   ├── index.d.cts
│   │   │       │   │   │   │   └── [01;34mlib[0m
│   │   │       │   │   │   │       └── index.js
│   │   │       │   │   │   ├── index.mjs
│   │   │       │   │   │   ├── [01;34mnode_modules[0m
│   │   │       │   │   │   │   ├── [01;34mansi-regex[0m
│   │   │       │   │   │   │   │   ├── index.js
│   │   │       │   │   │   │   │   ├── license
│   │   │       │   │   │   │   │   └── package.json
│   │   │       │   │   │   │   ├── [01;34memoji-regex[0m
│   │   │       │   │   │   │   │   ├── [01;34mes2015[0m
│   │   │       │   │   │   │   │   │   ├── index.js
│   │   │       │   │   │   │   │   │   ├── RGI_Emoji.js
│   │   │       │   │   │   │   │   │   └── text.js
│   │   │       │   │   │   │   │   ├── index.js
│   │   │       │   │   │   │   │   ├── package.json
│   │   │       │   │   │   │   │   ├── RGI_Emoji.js
│   │   │       │   │   │   │   │   └── text.js
│   │   │       │   │   │   │   ├── [01;34mstring-width[0m
│   │   │       │   │   │   │   │   ├── index.js
│   │   │       │   │   │   │   │   ├── license
│   │   │       │   │   │   │   │   └── package.json
│   │   │       │   │   │   │   └── [01;34mstrip-ansi[0m
│   │   │       │   │   │   │       ├── index.js
│   │   │       │   │   │   │       ├── license
│   │   │       │   │   │   │       └── package.json
│   │   │       │   │   │   └── package.json
│   │   │       │   │   └── [01;34mstring-locale-compare[0m
│   │   │       │   │       ├── index.js
│   │   │       │   │       └── package.json
│   │   │       │   ├── [01;34mis-cidr[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mis-core-module[0m
│   │   │       │   │   ├── core.json
│   │   │       │   │   ├── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34misexe[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── mode.js
│   │   │       │   │   ├── package.json
│   │   │       │   │   └── windows.js
│   │   │       │   ├── [01;34mis-fullwidth-code-point[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── license
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mis-lambda[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── package.json
│   │   │       │   │   └── test.js
│   │   │       │   ├── [01;34mjackspeak[0m
│   │   │       │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   ├── [01;34mcommonjs[0m
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   ├── package.json
│   │   │       │   │   │   │   └── parse-args.js
│   │   │       │   │   │   └── [01;34mesm[0m
│   │   │       │   │   │       ├── index.js
│   │   │       │   │   │       ├── package.json
│   │   │       │   │   │       └── parse-args.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mjsbn[0m
│   │   │       │   │   ├── example.html
│   │   │       │   │   ├── example.js
│   │   │       │   │   ├── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mjsonparse[0m
│   │   │       │   │   ├── bench.js
│   │   │       │   │   ├── [01;34mexamples[0m
│   │   │       │   │   │   └── twitterfeed.js
│   │   │       │   │   ├── jsonparse.js
│   │   │       │   │   ├── package.json
│   │   │       │   │   └── [01;34msamplejson[0m
│   │   │       │   │       ├── basic2.json
│   │   │       │   │       └── basic.json
│   │   │       │   ├── [01;34mjson-parse-even-better-errors[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mjson-stringify-nice[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mjust-diff[0m
│   │   │       │   │   ├── index.cjs
│   │   │       │   │   ├── index.mjs
│   │   │       │   │   ├── package.json
│   │   │       │   │   └── rollup.config.js
│   │   │       │   ├── [01;34mjust-diff-apply[0m
│   │   │       │   │   ├── index.cjs
│   │   │       │   │   ├── index.mjs
│   │   │       │   │   ├── package.json
│   │   │       │   │   └── rollup.config.js
│   │   │       │   ├── [01;34mlibnpmaccess[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mlibnpmdiff[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── format-diff.js
│   │   │       │   │   │   ├── index.js
│   │   │       │   │   │   ├── should-print-patch.js
│   │   │       │   │   │   ├── tarball.js
│   │   │       │   │   │   └── untar.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mlibnpmexec[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── file-exists.js
│   │   │       │   │   │   ├── get-bin-from-manifest.js
│   │   │       │   │   │   ├── index.js
│   │   │       │   │   │   ├── is-windows.js
│   │   │       │   │   │   ├── no-tty.js
│   │   │       │   │   │   └── run-script.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mlibnpmfund[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mlibnpmhook[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mlibnpmorg[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mlibnpmpack[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mlibnpmpublish[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── index.js
│   │   │       │   │   │   ├── provenance.js
│   │   │       │   │   │   ├── publish.js
│   │   │       │   │   │   └── unpublish.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mlibnpmsearch[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mlibnpmteam[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mlibnpmversion[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── commit.js
│   │   │       │   │   │   ├── enforce-clean.js
│   │   │       │   │   │   ├── index.js
│   │   │       │   │   │   ├── read-json.js
│   │   │       │   │   │   ├── retrieve-tag.js
│   │   │       │   │   │   ├── tag.js
│   │   │       │   │   │   ├── version.js
│   │   │       │   │   │   └── write-json.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mlru-cache[0m
│   │   │       │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   ├── [01;34mcommonjs[0m
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   ├── index.min.js
│   │   │       │   │   │   │   └── package.json
│   │   │       │   │   │   └── [01;34mesm[0m
│   │   │       │   │   │       ├── index.js
│   │   │       │   │   │       ├── index.min.js
│   │   │       │   │   │       └── package.json
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mmake-fetch-happen[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── [01;34mcache[0m
│   │   │       │   │   │   │   ├── entry.js
│   │   │       │   │   │   │   ├── errors.js
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   ├── key.js
│   │   │       │   │   │   │   └── policy.js
│   │   │       │   │   │   ├── fetch.js
│   │   │       │   │   │   ├── index.js
│   │   │       │   │   │   ├── options.js
│   │   │       │   │   │   ├── pipeline.js
│   │   │       │   │   │   └── remote.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mminimatch[0m
│   │   │       │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   ├── [01;34mcommonjs[0m
│   │   │       │   │   │   │   ├── assert-valid-pattern.js
│   │   │       │   │   │   │   ├── ast.js
│   │   │       │   │   │   │   ├── brace-expressions.js
│   │   │       │   │   │   │   ├── escape.js
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   ├── package.json
│   │   │       │   │   │   │   └── unescape.js
│   │   │       │   │   │   └── [01;34mesm[0m
│   │   │       │   │   │       ├── assert-valid-pattern.js
│   │   │       │   │   │       ├── ast.js
│   │   │       │   │   │       ├── brace-expressions.js
│   │   │       │   │   │       ├── escape.js
│   │   │       │   │   │       ├── index.js
│   │   │       │   │   │       ├── package.json
│   │   │       │   │   │       └── unescape.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mminipass[0m
│   │   │       │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   ├── [01;34mcommonjs[0m
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   └── package.json
│   │   │       │   │   │   └── [01;34mesm[0m
│   │   │       │   │   │       ├── index.js
│   │   │       │   │   │       └── package.json
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mminipass-collect[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mminipass-fetch[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── abort-error.js
│   │   │       │   │   │   ├── blob.js
│   │   │       │   │   │   ├── body.js
│   │   │       │   │   │   ├── fetch-error.js
│   │   │       │   │   │   ├── headers.js
│   │   │       │   │   │   ├── index.js
│   │   │       │   │   │   ├── request.js
│   │   │       │   │   │   └── response.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mminipass-flush[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── [01;34mnode_modules[0m
│   │   │       │   │   │   └── [01;34mminipass[0m
│   │   │       │   │   │       ├── index.js
│   │   │       │   │   │       └── package.json
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mminipass-json-stream[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── [01;34mnode_modules[0m
│   │   │       │   │   │   └── [01;34mminipass[0m
│   │   │       │   │   │       ├── index.js
│   │   │       │   │   │       └── package.json
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mminipass-pipeline[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── [01;34mnode_modules[0m
│   │   │       │   │   │   └── [01;34mminipass[0m
│   │   │       │   │   │       ├── index.js
│   │   │       │   │   │       └── package.json
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mminipass-sized[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── [01;34mnode_modules[0m
│   │   │       │   │   │   └── [01;34mminipass[0m
│   │   │       │   │   │       ├── index.js
│   │   │       │   │   │       └── package.json
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mminizlib[0m
│   │   │       │   │   ├── constants.js
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── [01;34mnode_modules[0m
│   │   │       │   │   │   └── [01;34mminipass[0m
│   │   │       │   │   │       ├── index.js
│   │   │       │   │   │       └── package.json
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mmkdirp[0m
│   │   │       │   │   ├── [01;34mbin[0m
│   │   │       │   │   │   └── [01;32mcmd.js[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── find-made.js
│   │   │       │   │   │   ├── mkdirp-manual.js
│   │   │       │   │   │   ├── mkdirp-native.js
│   │   │       │   │   │   ├── opts-arg.js
│   │   │       │   │   │   ├── path-arg.js
│   │   │       │   │   │   └── use-native.js
│   │   │       │   │   ├── package.json
│   │   │       │   │   └── readme.markdown
│   │   │       │   ├── [01;34mms[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mmute-stream[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mnegotiator[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── charset.js
│   │   │       │   │   │   ├── encoding.js
│   │   │       │   │   │   ├── language.js
│   │   │       │   │   │   └── mediaType.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mnode-gyp[0m
│   │   │       │   │   ├── addon.gypi
│   │   │       │   │   ├── [01;34mbin[0m
│   │   │       │   │   │   └── [01;32mnode-gyp.js[0m
│   │   │       │   │   ├── [01;34mgyp[0m
│   │   │       │   │   │   ├── [01;34mdata[0m
│   │   │       │   │   │   │   └── [01;34mwin[0m
│   │   │       │   │   │   │       └── large-pdb-shim.cc
│   │   │       │   │   │   ├── [01;32mgyp[0m
│   │   │       │   │   │   ├── [01;32mgyp.bat[0m
│   │   │       │   │   │   ├── [01;32mgyp_main.py[0m
│   │   │       │   │   │   ├── [01;34mpylib[0m
│   │   │       │   │   │   │   ├── [01;34mgyp[0m
│   │   │       │   │   │   │   │   ├── common.py
│   │   │       │   │   │   │   │   ├── [01;32mcommon_test.py[0m
│   │   │       │   │   │   │   │   ├── easy_xml.py
│   │   │       │   │   │   │   │   ├── [01;32measy_xml_test.py[0m
│   │   │       │   │   │   │   │   ├── [01;32mflock_tool.py[0m
│   │   │       │   │   │   │   │   ├── [01;34mgenerator[0m
│   │   │       │   │   │   │   │   │   ├── analyzer.py
│   │   │       │   │   │   │   │   │   ├── android.py
│   │   │       │   │   │   │   │   │   ├── cmake.py
│   │   │       │   │   │   │   │   │   ├── compile_commands_json.py
│   │   │       │   │   │   │   │   │   ├── dump_dependency_json.py
│   │   │       │   │   │   │   │   │   ├── eclipse.py
│   │   │       │   │   │   │   │   │   ├── gypd.py
│   │   │       │   │   │   │   │   │   ├── gypsh.py
│   │   │       │   │   │   │   │   │   ├── __init__.py
│   │   │       │   │   │   │   │   │   ├── make.py
│   │   │       │   │   │   │   │   │   ├── msvs.py
│   │   │       │   │   │   │   │   │   ├── [01;32mmsvs_test.py[0m
│   │   │       │   │   │   │   │   │   ├── ninja.py
│   │   │       │   │   │   │   │   │   ├── ninja_test.py
│   │   │       │   │   │   │   │   │   ├── xcode.py
│   │   │       │   │   │   │   │   │   └── xcode_test.py
│   │   │       │   │   │   │   │   ├── [01;32m__init__.py[0m
│   │   │       │   │   │   │   │   ├── input.py
│   │   │       │   │   │   │   │   ├── [01;32minput_test.py[0m
│   │   │       │   │   │   │   │   ├── [01;32mmac_tool.py[0m
│   │   │       │   │   │   │   │   ├── msvs_emulation.py
│   │   │       │   │   │   │   │   ├── MSVSNew.py
│   │   │       │   │   │   │   │   ├── MSVSProject.py
│   │   │       │   │   │   │   │   ├── MSVSSettings.py
│   │   │       │   │   │   │   │   ├── [01;32mMSVSSettings_test.py[0m
│   │   │       │   │   │   │   │   ├── MSVSToolFile.py
│   │   │       │   │   │   │   │   ├── MSVSUserFile.py
│   │   │       │   │   │   │   │   ├── MSVSUtil.py
│   │   │       │   │   │   │   │   ├── MSVSVersion.py
│   │   │       │   │   │   │   │   ├── ninja_syntax.py
│   │   │       │   │   │   │   │   ├── simple_copy.py
│   │   │       │   │   │   │   │   ├── [01;32mwin_tool.py[0m
│   │   │       │   │   │   │   │   ├── xcode_emulation.py
│   │   │       │   │   │   │   │   ├── xcode_ninja.py
│   │   │       │   │   │   │   │   ├── xcodeproj_file.py
│   │   │       │   │   │   │   │   └── xml_fix.py
│   │   │       │   │   │   │   └── [01;34mpackaging[0m
│   │   │       │   │   │   │       ├── _elffile.py
│   │   │       │   │   │   │       ├── __init__.py
│   │   │       │   │   │   │       ├── _manylinux.py
│   │   │       │   │   │   │       ├── markers.py
│   │   │       │   │   │   │       ├── metadata.py
│   │   │       │   │   │   │       ├── _musllinux.py
│   │   │       │   │   │   │       ├── _parser.py
│   │   │       │   │   │   │       ├── py.typed
│   │   │       │   │   │   │       ├── requirements.py
│   │   │       │   │   │   │       ├── specifiers.py
│   │   │       │   │   │   │       ├── _structures.py
│   │   │       │   │   │   │       ├── tags.py
│   │   │       │   │   │   │       ├── _tokenizer.py
│   │   │       │   │   │   │       ├── utils.py
│   │   │       │   │   │   │       └── version.py
│   │   │       │   │   │   ├── pyproject.toml
│   │   │       │   │   │   └── [01;32mtest_gyp.py[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── build.js
│   │   │       │   │   │   ├── clean.js
│   │   │       │   │   │   ├── configure.js
│   │   │       │   │   │   ├── create-config-gypi.js
│   │   │       │   │   │   ├── download.js
│   │   │       │   │   │   ├── find-node-directory.js
│   │   │       │   │   │   ├── find-python.js
│   │   │       │   │   │   ├── Find-VisualStudio.cs
│   │   │       │   │   │   ├── find-visualstudio.js
│   │   │       │   │   │   ├── install.js
│   │   │       │   │   │   ├── list.js
│   │   │       │   │   │   ├── log.js
│   │   │       │   │   │   ├── node-gyp.js
│   │   │       │   │   │   ├── process-release.js
│   │   │       │   │   │   ├── rebuild.js
│   │   │       │   │   │   ├── remove.js
│   │   │       │   │   │   └── util.js
│   │   │       │   │   ├── macOS_Catalina_acid_test.sh
│   │   │       │   │   ├── [01;34mnode_modules[0m
│   │   │       │   │   │   └── [01;34mproc-log[0m
│   │   │       │   │   │       ├── [01;34mlib[0m
│   │   │       │   │   │       │   └── index.js
│   │   │       │   │   │       └── package.json
│   │   │       │   │   ├── package.json
│   │   │       │   │   ├── release-please-config.json
│   │   │       │   │   └── [01;34msrc[0m
│   │   │       │   │       └── win_delay_load_hook.cc
│   │   │       │   ├── [01;34mnopt[0m
│   │   │       │   │   ├── [01;34mbin[0m
│   │   │       │   │   │   └── [01;32mnopt.js[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── debug.js
│   │   │       │   │   │   ├── nopt.js
│   │   │       │   │   │   ├── nopt-lib.js
│   │   │       │   │   │   └── type-defs.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mnormalize-package-data[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── extract_description.js
│   │   │       │   │   │   ├── fixer.js
│   │   │       │   │   │   ├── make_warning.js
│   │   │       │   │   │   ├── normalize.js
│   │   │       │   │   │   ├── safe_format.js
│   │   │       │   │   │   ├── typos.json
│   │   │       │   │   │   └── warning_messages.json
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mnpm-audit-report[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── colors.js
│   │   │       │   │   │   ├── exit-code.js
│   │   │       │   │   │   ├── index.js
│   │   │       │   │   │   └── [01;34mreporters[0m
│   │   │       │   │   │       ├── detail.js
│   │   │       │   │   │       ├── install.js
│   │   │       │   │   │       ├── json.js
│   │   │       │   │   │       └── quiet.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mnpm-bundled[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34m@npmcli[0m
│   │   │       │   │   ├── [01;34magent[0m
│   │   │       │   │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   │   ├── agents.js
│   │   │       │   │   │   │   ├── dns.js
│   │   │       │   │   │   │   ├── errors.js
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   ├── options.js
│   │   │       │   │   │   │   └── proxy.js
│   │   │       │   │   │   └── package.json
│   │   │       │   │   ├── [01;34marborist[0m
│   │   │       │   │   │   ├── [01;34mbin[0m
│   │   │       │   │   │   │   ├── actual.js
│   │   │       │   │   │   │   ├── audit.js
│   │   │       │   │   │   │   ├── funding.js
│   │   │       │   │   │   │   ├── ideal.js
│   │   │       │   │   │   │   ├── [01;32mindex.js[0m
│   │   │       │   │   │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   │   │   ├── logging.js
│   │   │       │   │   │   │   │   ├── options.js
│   │   │       │   │   │   │   │   ├── print-tree.js
│   │   │       │   │   │   │   │   └── timers.js
│   │   │       │   │   │   │   ├── license.js
│   │   │       │   │   │   │   ├── prune.js
│   │   │       │   │   │   │   ├── reify.js
│   │   │       │   │   │   │   ├── shrinkwrap.js
│   │   │       │   │   │   │   └── virtual.js
│   │   │       │   │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   │   ├── add-rm-pkg-deps.js
│   │   │       │   │   │   │   ├── [01;34marborist[0m
│   │   │       │   │   │   │   │   ├── build-ideal-tree.js
│   │   │       │   │   │   │   │   ├── index.js
│   │   │       │   │   │   │   │   ├── isolated-reifier.js
│   │   │       │   │   │   │   │   ├── load-actual.js
│   │   │       │   │   │   │   │   ├── load-virtual.js
│   │   │       │   │   │   │   │   ├── rebuild.js
│   │   │       │   │   │   │   │   └── reify.js
│   │   │       │   │   │   │   ├── audit-report.js
│   │   │       │   │   │   │   ├── calc-dep-flags.js
│   │   │       │   │   │   │   ├── can-place-dep.js
│   │   │       │   │   │   │   ├── case-insensitive-map.js
│   │   │       │   │   │   │   ├── consistent-resolve.js
│   │   │       │   │   │   │   ├── debug.js
│   │   │       │   │   │   │   ├── deepest-nesting-target.js
│   │   │       │   │   │   │   ├── dep-valid.js
│   │   │       │   │   │   │   ├── diff.js
│   │   │       │   │   │   │   ├── edge.js
│   │   │       │   │   │   │   ├── from-path.js
│   │   │       │   │   │   │   ├── gather-dep-set.js
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   ├── inventory.js
│   │   │       │   │   │   │   ├── link.js
│   │   │       │   │   │   │   ├── node.js
│   │   │       │   │   │   │   ├── optional-set.js
│   │   │       │   │   │   │   ├── override-resolves.js
│   │   │       │   │   │   │   ├── override-set.js
│   │   │       │   │   │   │   ├── peer-entry-sets.js
│   │   │       │   │   │   │   ├── place-dep.js
│   │   │       │   │   │   │   ├── printable.js
│   │   │       │   │   │   │   ├── query-selector-all.js
│   │   │       │   │   │   │   ├── realpath.js
│   │   │       │   │   │   │   ├── relpath.js
│   │   │       │   │   │   │   ├── reset-dep-flags.js
│   │   │       │   │   │   │   ├── retire-path.js
│   │   │       │   │   │   │   ├── shrinkwrap.js
│   │   │       │   │   │   │   ├── signal-handling.js
│   │   │       │   │   │   │   ├── signals.js
│   │   │       │   │   │   │   ├── spec-from-lock.js
│   │   │       │   │   │   │   ├── tracker.js
│   │   │       │   │   │   │   ├── tree-check.js
│   │   │       │   │   │   │   ├── version-from-tgz.js
│   │   │       │   │   │   │   ├── vuln.js
│   │   │       │   │   │   │   └── yarn-lock.js
│   │   │       │   │   │   └── package.json
│   │   │       │   │   ├── [01;34mconfig[0m
│   │   │       │   │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   │   ├── [01;34mdefinitions[0m
│   │   │       │   │   │   │   │   ├── definition.js
│   │   │       │   │   │   │   │   ├── definitions.js
│   │   │       │   │   │   │   │   └── index.js
│   │   │       │   │   │   │   ├── env-replace.js
│   │   │       │   │   │   │   ├── errors.js
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   ├── nerf-dart.js
│   │   │       │   │   │   │   ├── parse-field.js
│   │   │       │   │   │   │   ├── set-envs.js
│   │   │       │   │   │   │   ├── type-defs.js
│   │   │       │   │   │   │   ├── type-description.js
│   │   │       │   │   │   │   └── umask.js
│   │   │       │   │   │   └── package.json
│   │   │       │   │   ├── [01;34mfs[0m
│   │   │       │   │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   │   ├── [01;34mcommon[0m
│   │   │       │   │   │   │   │   ├── get-options.js
│   │   │       │   │   │   │   │   └── node.js
│   │   │       │   │   │   │   ├── [01;34mcp[0m
│   │   │       │   │   │   │   │   ├── errors.js
│   │   │       │   │   │   │   │   ├── index.js
│   │   │       │   │   │   │   │   └── polyfill.js
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   ├── move-file.js
│   │   │       │   │   │   │   ├── readdir-scoped.js
│   │   │       │   │   │   │   └── with-temp-dir.js
│   │   │       │   │   │   └── package.json
│   │   │       │   │   ├── [01;34mgit[0m
│   │   │       │   │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   │   ├── clone.js
│   │   │       │   │   │   │   ├── errors.js
│   │   │       │   │   │   │   ├── find.js
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   ├── is-clean.js
│   │   │       │   │   │   │   ├── is.js
│   │   │       │   │   │   │   ├── lines-to-revs.js
│   │   │       │   │   │   │   ├── make-error.js
│   │   │       │   │   │   │   ├── opts.js
│   │   │       │   │   │   │   ├── revs.js
│   │   │       │   │   │   │   ├── spawn.js
│   │   │       │   │   │   │   ├── utils.js
│   │   │       │   │   │   │   └── which.js
│   │   │       │   │   │   └── package.json
│   │   │       │   │   ├── [01;34minstalled-package-contents[0m
│   │   │       │   │   │   ├── [01;34mbin[0m
│   │   │       │   │   │   │   └── [01;32mindex.js[0m
│   │   │       │   │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   │   └── index.js
│   │   │       │   │   │   └── package.json
│   │   │       │   │   ├── [01;34mmap-workspaces[0m
│   │   │       │   │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   │   └── index.js
│   │   │       │   │   │   └── package.json
│   │   │       │   │   ├── [01;34mmetavuln-calculator[0m
│   │   │       │   │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   │   ├── advisory.js
│   │   │       │   │   │   │   ├── get-dep-spec.js
│   │   │       │   │   │   │   ├── hash.js
│   │   │       │   │   │   │   └── index.js
│   │   │       │   │   │   └── package.json
│   │   │       │   │   ├── [01;34mname-from-folder[0m
│   │   │       │   │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   │   └── index.js
│   │   │       │   │   │   └── package.json
│   │   │       │   │   ├── [01;34mnode-gyp[0m
│   │   │       │   │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   │   └── index.js
│   │   │       │   │   │   └── package.json
│   │   │       │   │   ├── [01;34mpackage-json[0m
│   │   │       │   │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   ├── normalize.js
│   │   │       │   │   │   │   ├── update-dependencies.js
│   │   │       │   │   │   │   ├── update-scripts.js
│   │   │       │   │   │   │   └── update-workspaces.js
│   │   │       │   │   │   └── package.json
│   │   │       │   │   ├── [01;34mpromise-spawn[0m
│   │   │       │   │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   │   ├── escape.js
│   │   │       │   │   │   │   └── index.js
│   │   │       │   │   │   └── package.json
│   │   │       │   │   ├── [01;34mquery[0m
│   │   │       │   │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   │   └── index.js
│   │   │       │   │   │   └── package.json
│   │   │       │   │   ├── [01;34mredact[0m
│   │   │       │   │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   │   ├── deep-map.js
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   ├── matchers.js
│   │   │       │   │   │   │   ├── server.js
│   │   │       │   │   │   │   └── utils.js
│   │   │       │   │   │   └── package.json
│   │   │       │   │   └── [01;34mrun-script[0m
│   │   │       │   │       ├── [01;34mlib[0m
│   │   │       │   │       │   ├── is-server-package.js
│   │   │       │   │       │   ├── make-spawn-args.js
│   │   │       │   │       │   ├── [01;34mnode-gyp-bin[0m
│   │   │       │   │       │   │   ├── [01;32mnode-gyp[0m
│   │   │       │   │       │   │   └── [01;32mnode-gyp.cmd[0m
│   │   │       │   │       │   ├── package-envs.js
│   │   │       │   │       │   ├── run-script.js
│   │   │       │   │       │   ├── run-script-pkg.js
│   │   │       │   │       │   ├── set-path.js
│   │   │       │   │       │   ├── signal-manager.js
│   │   │       │   │       │   └── validate-options.js
│   │   │       │   │       └── package.json
│   │   │       │   ├── [01;34mnpm-install-checks[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mnpm-normalize-package-bin[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mnpm-package-arg[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── npa.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mnpm-packlist[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mnpm-pick-manifest[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mnpm-profile[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mnpm-registry-fetch[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── auth.js
│   │   │       │   │   │   ├── check-response.js
│   │   │       │   │   │   ├── default-opts.js
│   │   │       │   │   │   ├── errors.js
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mnpm-user-validate[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mpacote[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── [01;32mbin.js[0m
│   │   │       │   │   │   ├── dir.js
│   │   │       │   │   │   ├── fetcher.js
│   │   │       │   │   │   ├── file.js
│   │   │       │   │   │   ├── git.js
│   │   │       │   │   │   ├── index.js
│   │   │       │   │   │   ├── registry.js
│   │   │       │   │   │   ├── remote.js
│   │   │       │   │   │   └── [01;34mutil[0m
│   │   │       │   │   │       ├── add-git-sha.js
│   │   │       │   │   │       ├── cache-dir.js
│   │   │       │   │   │       ├── is-package-bin.js
│   │   │       │   │   │       ├── npm.js
│   │   │       │   │   │       ├── tar-create-options.js
│   │   │       │   │   │       └── trailing-slashes.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mparse-conflict-json[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mpath-key[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── license
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mpath-scurry[0m
│   │   │       │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   ├── [01;34mcommonjs[0m
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   └── package.json
│   │   │       │   │   │   └── [01;34mesm[0m
│   │   │       │   │   │       ├── index.js
│   │   │       │   │   │       └── package.json
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34m@pkgjs[0m
│   │   │       │   │   └── [01;34mparseargs[0m
│   │   │       │   │       ├── [01;34mexamples[0m
│   │   │       │   │       │   ├── is-default-value.js
│   │   │       │   │       │   ├── limit-long-syntax.js
│   │   │       │   │       │   ├── negate.js
│   │   │       │   │       │   ├── no-repeated-options.js
│   │   │       │   │       │   ├── ordered-options.mjs
│   │   │       │   │       │   └── simple-hard-coded.js
│   │   │       │   │       ├── index.js
│   │   │       │   │       ├── [01;34minternal[0m
│   │   │       │   │       │   ├── errors.js
│   │   │       │   │       │   ├── primordials.js
│   │   │       │   │       │   ├── util.js
│   │   │       │   │       │   └── validators.js
│   │   │       │   │       ├── package.json
│   │   │       │   │       └── utils.js
│   │   │       │   ├── [01;34mp-map[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── license
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mpostcss-selector-parser[0m
│   │   │       │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   ├── index.js
│   │   │       │   │   │   ├── parser.js
│   │   │       │   │   │   ├── processor.js
│   │   │       │   │   │   ├── [01;34mselectors[0m
│   │   │       │   │   │   │   ├── attribute.js
│   │   │       │   │   │   │   ├── className.js
│   │   │       │   │   │   │   ├── combinator.js
│   │   │       │   │   │   │   ├── comment.js
│   │   │       │   │   │   │   ├── constructors.js
│   │   │       │   │   │   │   ├── container.js
│   │   │       │   │   │   │   ├── guards.js
│   │   │       │   │   │   │   ├── id.js
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   ├── namespace.js
│   │   │       │   │   │   │   ├── nesting.js
│   │   │       │   │   │   │   ├── node.js
│   │   │       │   │   │   │   ├── pseudo.js
│   │   │       │   │   │   │   ├── root.js
│   │   │       │   │   │   │   ├── selector.js
│   │   │       │   │   │   │   ├── string.js
│   │   │       │   │   │   │   ├── tag.js
│   │   │       │   │   │   │   ├── types.js
│   │   │       │   │   │   │   └── universal.js
│   │   │       │   │   │   ├── sortAscending.js
│   │   │       │   │   │   ├── tokenize.js
│   │   │       │   │   │   ├── tokenTypes.js
│   │   │       │   │   │   └── [01;34mutil[0m
│   │   │       │   │   │       ├── ensureObject.js
│   │   │       │   │   │       ├── getProp.js
│   │   │       │   │   │       ├── index.js
│   │   │       │   │   │       ├── stripComments.js
│   │   │       │   │   │       └── unesc.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mproc-log[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mproggy[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── client.js
│   │   │       │   │   │   ├── index.js
│   │   │       │   │   │   └── tracker.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mpromise-all-reject-late[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mpromise-call-limit[0m
│   │   │       │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   ├── [01;34mcommonjs[0m
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   └── package.json
│   │   │       │   │   │   └── [01;34mesm[0m
│   │   │       │   │   │       ├── index.js
│   │   │       │   │   │       └── package.json
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mpromise-inflight[0m
│   │   │       │   │   ├── inflight.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mpromise-retry[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mpromzard[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mqrcode-terminal[0m
│   │   │       │   │   ├── [01;34mbin[0m
│   │   │       │   │   │   └── [01;32mqrcode-terminal.js[0m
│   │   │       │   │   ├── [01;34mexample[0m
│   │   │       │   │   │   ├── basic.js
│   │   │       │   │   │   ├── [01;35mbasic.png[0m
│   │   │       │   │   │   ├── callback.js
│   │   │       │   │   │   └── small-qrcode.js
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── main.js
│   │   │       │   │   ├── package.json
│   │   │       │   │   └── [01;34mvendor[0m
│   │   │       │   │       └── [01;34mQRCode[0m
│   │   │       │   │           ├── index.js
│   │   │       │   │           ├── QR8bitByte.js
│   │   │       │   │           ├── QRBitBuffer.js
│   │   │       │   │           ├── QRErrorCorrectLevel.js
│   │   │       │   │           ├── QRMaskPattern.js
│   │   │       │   │           ├── QRMath.js
│   │   │       │   │           ├── QRMode.js
│   │   │       │   │           ├── QRPolynomial.js
│   │   │       │   │           ├── QRRSBlock.js
│   │   │       │   │           └── QRUtil.js
│   │   │       │   ├── [01;34mread[0m
│   │   │       │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   ├── [01;34mcommonjs[0m
│   │   │       │   │   │   │   ├── package.json
│   │   │       │   │   │   │   └── read.js
│   │   │       │   │   │   └── [01;34mesm[0m
│   │   │       │   │   │       ├── package.json
│   │   │       │   │   │       └── read.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mread-cmd-shim[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mread-package-json-fast[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mretry[0m
│   │   │       │   │   ├── [01;35mequation.gif[0m
│   │   │       │   │   ├── [01;34mexample[0m
│   │   │       │   │   │   ├── dns.js
│   │   │       │   │   │   └── stop.js
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── retry.js
│   │   │       │   │   │   └── retry_operation.js
│   │   │       │   │   ├── License
│   │   │       │   │   ├── Makefile
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34msafer-buffer[0m
│   │   │       │   │   ├── dangerous.js
│   │   │       │   │   ├── package.json
│   │   │       │   │   ├── safer.js
│   │   │       │   │   └── tests.js
│   │   │       │   ├── [01;34msemver[0m
│   │   │       │   │   ├── [01;34mbin[0m
│   │   │       │   │   │   └── [01;32msemver.js[0m
│   │   │       │   │   ├── [01;34mclasses[0m
│   │   │       │   │   │   ├── comparator.js
│   │   │       │   │   │   ├── index.js
│   │   │       │   │   │   ├── range.js
│   │   │       │   │   │   └── semver.js
│   │   │       │   │   ├── [01;34mfunctions[0m
│   │   │       │   │   │   ├── clean.js
│   │   │       │   │   │   ├── cmp.js
│   │   │       │   │   │   ├── coerce.js
│   │   │       │   │   │   ├── compare-build.js
│   │   │       │   │   │   ├── compare.js
│   │   │       │   │   │   ├── compare-loose.js
│   │   │       │   │   │   ├── diff.js
│   │   │       │   │   │   ├── eq.js
│   │   │       │   │   │   ├── gte.js
│   │   │       │   │   │   ├── gt.js
│   │   │       │   │   │   ├── inc.js
│   │   │       │   │   │   ├── lte.js
│   │   │       │   │   │   ├── lt.js
│   │   │       │   │   │   ├── major.js
│   │   │       │   │   │   ├── minor.js
│   │   │       │   │   │   ├── neq.js
│   │   │       │   │   │   ├── parse.js
│   │   │       │   │   │   ├── patch.js
│   │   │       │   │   │   ├── prerelease.js
│   │   │       │   │   │   ├── rcompare.js
│   │   │       │   │   │   ├── rsort.js
│   │   │       │   │   │   ├── satisfies.js
│   │   │       │   │   │   ├── sort.js
│   │   │       │   │   │   └── valid.js
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── [01;34minternal[0m
│   │   │       │   │   │   ├── constants.js
│   │   │       │   │   │   ├── debug.js
│   │   │       │   │   │   ├── identifiers.js
│   │   │       │   │   │   ├── parse-options.js
│   │   │       │   │   │   └── re.js
│   │   │       │   │   ├── [01;34mnode_modules[0m
│   │   │       │   │   │   └── [01;34mlru-cache[0m
│   │   │       │   │   │       ├── index.js
│   │   │       │   │   │       └── package.json
│   │   │       │   │   ├── package.json
│   │   │       │   │   ├── preload.js
│   │   │       │   │   ├── range.bnf
│   │   │       │   │   └── [01;34mranges[0m
│   │   │       │   │       ├── gtr.js
│   │   │       │   │       ├── intersects.js
│   │   │       │   │       ├── ltr.js
│   │   │       │   │       ├── max-satisfying.js
│   │   │       │   │       ├── min-satisfying.js
│   │   │       │   │       ├── min-version.js
│   │   │       │   │       ├── outside.js
│   │   │       │   │       ├── simplify.js
│   │   │       │   │       ├── subset.js
│   │   │       │   │       ├── to-comparators.js
│   │   │       │   │       └── valid.js
│   │   │       │   ├── [01;34mshebang-command[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── license
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mshebang-regex[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── license
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34msignal-exit[0m
│   │   │       │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   ├── [01;34mcjs[0m
│   │   │       │   │   │   │   ├── browser.js
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   ├── package.json
│   │   │       │   │   │   │   └── signals.js
│   │   │       │   │   │   └── [01;34mmjs[0m
│   │   │       │   │   │       ├── browser.js
│   │   │       │   │   │       ├── index.js
│   │   │       │   │   │       ├── package.json
│   │   │       │   │   │       └── signals.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34m@sigstore[0m
│   │   │       │   │   ├── [01;34mbundle[0m
│   │   │       │   │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   │   ├── build.js
│   │   │       │   │   │   │   ├── bundle.js
│   │   │       │   │   │   │   ├── error.js
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   ├── serialized.js
│   │   │       │   │   │   │   ├── utility.js
│   │   │       │   │   │   │   └── validate.js
│   │   │       │   │   │   └── package.json
│   │   │       │   │   ├── [01;34mcore[0m
│   │   │       │   │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   │   ├── [01;34masn1[0m
│   │   │       │   │   │   │   │   ├── error.js
│   │   │       │   │   │   │   │   ├── index.js
│   │   │       │   │   │   │   │   ├── length.js
│   │   │       │   │   │   │   │   ├── obj.js
│   │   │       │   │   │   │   │   ├── parse.js
│   │   │       │   │   │   │   │   └── tag.js
│   │   │       │   │   │   │   ├── crypto.js
│   │   │       │   │   │   │   ├── dsse.js
│   │   │       │   │   │   │   ├── encoding.js
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   ├── json.js
│   │   │       │   │   │   │   ├── oid.js
│   │   │       │   │   │   │   ├── pem.js
│   │   │       │   │   │   │   ├── [01;34mrfc3161[0m
│   │   │       │   │   │   │   │   ├── error.js
│   │   │       │   │   │   │   │   ├── index.js
│   │   │       │   │   │   │   │   ├── timestamp.js
│   │   │       │   │   │   │   │   └── tstinfo.js
│   │   │       │   │   │   │   ├── stream.js
│   │   │       │   │   │   │   └── [01;34mx509[0m
│   │   │       │   │   │   │       ├── cert.js
│   │   │       │   │   │   │       ├── ext.js
│   │   │       │   │   │   │       ├── index.js
│   │   │       │   │   │   │       └── sct.js
│   │   │       │   │   │   └── package.json
│   │   │       │   │   ├── [01;34mprotobuf-specs[0m
│   │   │       │   │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   │   ├── [01;34m__generated__[0m
│   │   │       │   │   │   │   │   ├── envelope.js
│   │   │       │   │   │   │   │   ├── events.js
│   │   │       │   │   │   │   │   ├── [01;34mgoogle[0m
│   │   │       │   │   │   │   │   │   ├── [01;34mapi[0m
│   │   │       │   │   │   │   │   │   │   └── field_behavior.js
│   │   │       │   │   │   │   │   │   └── [01;34mprotobuf[0m
│   │   │       │   │   │   │   │   │       ├── any.js
│   │   │       │   │   │   │   │   │       ├── descriptor.js
│   │   │       │   │   │   │   │   │       └── timestamp.js
│   │   │       │   │   │   │   │   ├── sigstore_bundle.js
│   │   │       │   │   │   │   │   ├── sigstore_common.js
│   │   │       │   │   │   │   │   ├── sigstore_rekor.js
│   │   │       │   │   │   │   │   ├── sigstore_trustroot.js
│   │   │       │   │   │   │   │   └── sigstore_verification.js
│   │   │       │   │   │   │   └── index.js
│   │   │       │   │   │   └── package.json
│   │   │       │   │   ├── [01;34msign[0m
│   │   │       │   │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   │   ├── [01;34mbundler[0m
│   │   │       │   │   │   │   │   ├── base.js
│   │   │       │   │   │   │   │   ├── bundle.js
│   │   │       │   │   │   │   │   ├── dsse.js
│   │   │       │   │   │   │   │   ├── index.js
│   │   │       │   │   │   │   │   └── message.js
│   │   │       │   │   │   │   ├── error.js
│   │   │       │   │   │   │   ├── [01;34mexternal[0m
│   │   │       │   │   │   │   │   ├── error.js
│   │   │       │   │   │   │   │   ├── fulcio.js
│   │   │       │   │   │   │   │   ├── rekor.js
│   │   │       │   │   │   │   │   └── tsa.js
│   │   │       │   │   │   │   ├── [01;34midentity[0m
│   │   │       │   │   │   │   │   ├── ci.js
│   │   │       │   │   │   │   │   ├── index.js
│   │   │       │   │   │   │   │   └── provider.js
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   ├── [01;34msigner[0m
│   │   │       │   │   │   │   │   ├── [01;34mfulcio[0m
│   │   │       │   │   │   │   │   │   ├── ca.js
│   │   │       │   │   │   │   │   │   ├── ephemeral.js
│   │   │       │   │   │   │   │   │   └── index.js
│   │   │       │   │   │   │   │   ├── index.js
│   │   │       │   │   │   │   │   └── signer.js
│   │   │       │   │   │   │   ├── [01;34mtypes[0m
│   │   │       │   │   │   │   │   └── fetch.js
│   │   │       │   │   │   │   ├── [01;34mutil[0m
│   │   │       │   │   │   │   │   ├── index.js
│   │   │       │   │   │   │   │   ├── oidc.js
│   │   │       │   │   │   │   │   └── ua.js
│   │   │       │   │   │   │   └── [01;34mwitness[0m
│   │   │       │   │   │   │       ├── index.js
│   │   │       │   │   │   │       ├── [01;34mtlog[0m
│   │   │       │   │   │   │       │   ├── client.js
│   │   │       │   │   │   │       │   ├── entry.js
│   │   │       │   │   │   │       │   └── index.js
│   │   │       │   │   │   │       ├── [01;34mtsa[0m
│   │   │       │   │   │   │       │   ├── client.js
│   │   │       │   │   │   │       │   └── index.js
│   │   │       │   │   │   │       └── witness.js
│   │   │       │   │   │   └── package.json
│   │   │       │   │   ├── [01;34mtuf[0m
│   │   │       │   │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   │   ├── appdata.js
│   │   │       │   │   │   │   ├── client.js
│   │   │       │   │   │   │   ├── error.js
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   └── target.js
│   │   │       │   │   │   ├── package.json
│   │   │       │   │   │   └── seeds.json
│   │   │       │   │   └── [01;34mverify[0m
│   │   │       │   │       ├── [01;34mdist[0m
│   │   │       │   │       │   ├── [01;34mbundle[0m
│   │   │       │   │       │   │   ├── dsse.js
│   │   │       │   │       │   │   ├── index.js
│   │   │       │   │       │   │   └── message.js
│   │   │       │   │       │   ├── error.js
│   │   │       │   │       │   ├── index.js
│   │   │       │   │       │   ├── [01;34mkey[0m
│   │   │       │   │       │   │   ├── certificate.js
│   │   │       │   │       │   │   ├── index.js
│   │   │       │   │       │   │   └── sct.js
│   │   │       │   │       │   ├── policy.js
│   │   │       │   │       │   ├── shared.types.js
│   │   │       │   │       │   ├── [01;34mtimestamp[0m
│   │   │       │   │       │   │   ├── checkpoint.js
│   │   │       │   │       │   │   ├── index.js
│   │   │       │   │       │   │   ├── merkle.js
│   │   │       │   │       │   │   ├── set.js
│   │   │       │   │       │   │   └── tsa.js
│   │   │       │   │       │   ├── [01;34mtlog[0m
│   │   │       │   │       │   │   ├── dsse.js
│   │   │       │   │       │   │   ├── hashedrekord.js
│   │   │       │   │       │   │   ├── index.js
│   │   │       │   │       │   │   └── intoto.js
│   │   │       │   │       │   ├── [01;34mtrust[0m
│   │   │       │   │       │   │   ├── filter.js
│   │   │       │   │       │   │   ├── index.js
│   │   │       │   │       │   │   └── trust.types.js
│   │   │       │   │       │   └── verifier.js
│   │   │       │   │       └── package.json
│   │   │       │   ├── [01;34msigstore[0m
│   │   │       │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   ├── config.js
│   │   │       │   │   │   ├── index.js
│   │   │       │   │   │   └── sigstore.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34msmart-buffer[0m
│   │   │       │   │   ├── [01;34mbuild[0m
│   │   │       │   │   │   ├── smartbuffer.js
│   │   │       │   │   │   └── utils.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34msocks[0m
│   │   │       │   │   ├── [01;34mbuild[0m
│   │   │       │   │   │   ├── [01;34mclient[0m
│   │   │       │   │   │   │   └── socksclient.js
│   │   │       │   │   │   ├── [01;34mcommon[0m
│   │   │       │   │   │   │   ├── constants.js
│   │   │       │   │   │   │   ├── helpers.js
│   │   │       │   │   │   │   ├── receivebuffer.js
│   │   │       │   │   │   │   └── util.js
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34msocks-proxy-agent[0m
│   │   │       │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mspdx-correct[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── [01;34mnode_modules[0m
│   │   │       │   │   │   └── [01;34mspdx-expression-parse[0m
│   │   │       │   │   │       ├── AUTHORS
│   │   │       │   │   │       ├── index.js
│   │   │       │   │   │       ├── package.json
│   │   │       │   │   │       ├── parse.js
│   │   │       │   │   │       └── scan.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mspdx-exceptions[0m
│   │   │       │   │   ├── deprecated.json
│   │   │       │   │   ├── index.json
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mspdx-expression-parse[0m
│   │   │       │   │   ├── AUTHORS
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── package.json
│   │   │       │   │   ├── parse.js
│   │   │       │   │   └── scan.js
│   │   │       │   ├── [01;34mspdx-license-ids[0m
│   │   │       │   │   ├── deprecated.json
│   │   │       │   │   ├── index.json
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34msprintf-js[0m
│   │   │       │   │   ├── bower.json
│   │   │       │   │   ├── [01;34mdemo[0m
│   │   │       │   │   │   └── angular.html
│   │   │       │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   ├── angular-sprintf.min.js
│   │   │       │   │   │   └── sprintf.min.js
│   │   │       │   │   ├── gruntfile.js
│   │   │       │   │   ├── package.json
│   │   │       │   │   └── [01;34msrc[0m
│   │   │       │   │       ├── angular-sprintf.js
│   │   │       │   │       └── sprintf.js
│   │   │       │   ├── [01;34mssri[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mstring-width[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── license
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mstring-width-cjs[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── license
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mstrip-ansi[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── license
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mstrip-ansi-cjs[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── license
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34msupports-color[0m
│   │   │       │   │   ├── browser.js
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── license
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mtar[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── create.js
│   │   │       │   │   │   ├── extract.js
│   │   │       │   │   │   ├── get-write-flag.js
│   │   │       │   │   │   ├── header.js
│   │   │       │   │   │   ├── high-level-opt.js
│   │   │       │   │   │   ├── large-numbers.js
│   │   │       │   │   │   ├── list.js
│   │   │       │   │   │   ├── mkdir.js
│   │   │       │   │   │   ├── mode-fix.js
│   │   │       │   │   │   ├── normalize-unicode.js
│   │   │       │   │   │   ├── normalize-windows-path.js
│   │   │       │   │   │   ├── pack.js
│   │   │       │   │   │   ├── parse.js
│   │   │       │   │   │   ├── path-reservations.js
│   │   │       │   │   │   ├── pax.js
│   │   │       │   │   │   ├── read-entry.js
│   │   │       │   │   │   ├── replace.js
│   │   │       │   │   │   ├── strip-absolute-path.js
│   │   │       │   │   │   ├── strip-trailing-slashes.js
│   │   │       │   │   │   ├── types.js
│   │   │       │   │   │   ├── unpack.js
│   │   │       │   │   │   ├── update.js
│   │   │       │   │   │   ├── warn-mixin.js
│   │   │       │   │   │   ├── winchars.js
│   │   │       │   │   │   └── write-entry.js
│   │   │       │   │   ├── [01;34mnode_modules[0m
│   │   │       │   │   │   ├── [01;34mfs-minipass[0m
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   ├── [01;34mnode_modules[0m
│   │   │       │   │   │   │   │   └── [01;34mminipass[0m
│   │   │       │   │   │   │   │       ├── index.js
│   │   │       │   │   │   │   │       └── package.json
│   │   │       │   │   │   │   └── package.json
│   │   │       │   │   │   └── [01;34mminipass[0m
│   │   │       │   │   │       ├── index.js
│   │   │       │   │   │       ├── index.mjs
│   │   │       │   │   │       └── package.json
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mtext-table[0m
│   │   │       │   │   ├── [01;34mexample[0m
│   │   │       │   │   │   ├── align.js
│   │   │       │   │   │   ├── center.js
│   │   │       │   │   │   ├── dotalign.js
│   │   │       │   │   │   ├── doubledot.js
│   │   │       │   │   │   └── table.js
│   │   │       │   │   ├── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mtiny-relative-date[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── factory.js
│   │   │       │   │   │   └── index.js
│   │   │       │   │   ├── package.json
│   │   │       │   │   ├── [01;34msrc[0m
│   │   │       │   │   │   ├── factory.js
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── [01;34mtranslations[0m
│   │   │       │   │       ├── da.js
│   │   │       │   │       ├── de.js
│   │   │       │   │       ├── en.js
│   │   │       │   │       ├── en-short.js
│   │   │       │   │       └── es.js
│   │   │       │   ├── [01;34mtreeverse[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   ├── breadth.js
│   │   │       │   │   │   ├── depth-descent.js
│   │   │       │   │   │   ├── depth.js
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34m@tufjs[0m
│   │   │       │   │   ├── [01;34mcanonical-json[0m
│   │   │       │   │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   │   └── index.js
│   │   │       │   │   │   └── package.json
│   │   │       │   │   └── [01;34mmodels[0m
│   │   │       │   │       ├── [01;34mdist[0m
│   │   │       │   │       │   ├── base.js
│   │   │       │   │       │   ├── delegations.js
│   │   │       │   │       │   ├── error.js
│   │   │       │   │       │   ├── file.js
│   │   │       │   │       │   ├── index.js
│   │   │       │   │       │   ├── key.js
│   │   │       │   │       │   ├── metadata.js
│   │   │       │   │       │   ├── role.js
│   │   │       │   │       │   ├── root.js
│   │   │       │   │       │   ├── signature.js
│   │   │       │   │       │   ├── snapshot.js
│   │   │       │   │       │   ├── targets.js
│   │   │       │   │       │   ├── timestamp.js
│   │   │       │   │       │   └── [01;34mutils[0m
│   │   │       │   │       │       ├── guard.js
│   │   │       │   │       │       ├── index.js
│   │   │       │   │       │       ├── key.js
│   │   │       │   │       │       ├── oid.js
│   │   │       │   │       │       ├── types.js
│   │   │       │   │       │       └── verify.js
│   │   │       │   │       └── package.json
│   │   │       │   ├── [01;34mtuf-js[0m
│   │   │       │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   ├── config.js
│   │   │       │   │   │   ├── error.js
│   │   │       │   │   │   ├── fetcher.js
│   │   │       │   │   │   ├── index.js
│   │   │       │   │   │   ├── store.js
│   │   │       │   │   │   ├── updater.js
│   │   │       │   │   │   └── [01;34mutils[0m
│   │   │       │   │   │       ├── tmpfile.js
│   │   │       │   │   │       └── url.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34munique-filename[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34munique-slug[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mutil-deprecate[0m
│   │   │       │   │   ├── browser.js
│   │   │       │   │   ├── node.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mvalidate-npm-package-license[0m
│   │   │       │   │   ├── index.js
│   │   │       │   │   ├── [01;34mnode_modules[0m
│   │   │       │   │   │   └── [01;34mspdx-expression-parse[0m
│   │   │       │   │   │       ├── AUTHORS
│   │   │       │   │   │       ├── index.js
│   │   │       │   │   │       ├── package.json
│   │   │       │   │   │       ├── parse.js
│   │   │       │   │   │       └── scan.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mvalidate-npm-package-name[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mwalk-up-path[0m
│   │   │       │   │   ├── [01;34mdist[0m
│   │   │       │   │   │   ├── [01;34mcjs[0m
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   └── package.json
│   │   │       │   │   │   └── [01;34mmjs[0m
│   │   │       │   │   │       ├── index.js
│   │   │       │   │   │       └── package.json
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mwhich[0m
│   │   │       │   │   ├── [01;34mbin[0m
│   │   │       │   │   │   └── [01;32mwhich.js[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   ├── [01;34mnode_modules[0m
│   │   │       │   │   │   └── [01;34misexe[0m
│   │   │       │   │   │       ├── [01;34mdist[0m
│   │   │       │   │   │       │   ├── [01;34mcjs[0m
│   │   │       │   │   │       │   │   ├── index.js
│   │   │       │   │   │       │   │   ├── options.js
│   │   │       │   │   │       │   │   ├── package.json
│   │   │       │   │   │       │   │   ├── posix.js
│   │   │       │   │   │       │   │   └── win32.js
│   │   │       │   │   │       │   └── [01;34mmjs[0m
│   │   │       │   │   │       │       ├── index.js
│   │   │       │   │   │       │       ├── options.js
│   │   │       │   │   │       │       ├── package.json
│   │   │       │   │   │       │       ├── posix.js
│   │   │       │   │   │       │       └── win32.js
│   │   │       │   │   │       └── package.json
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mwrap-ansi[0m
│   │   │       │   │   ├── [01;32mindex.js[0m
│   │   │       │   │   ├── license
│   │   │       │   │   ├── [01;34mnode_modules[0m
│   │   │       │   │   │   ├── [01;34mansi-regex[0m
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   ├── license
│   │   │       │   │   │   │   └── package.json
│   │   │       │   │   │   ├── [01;34memoji-regex[0m
│   │   │       │   │   │   │   ├── [01;34mes2015[0m
│   │   │       │   │   │   │   │   ├── index.js
│   │   │       │   │   │   │   │   ├── RGI_Emoji.js
│   │   │       │   │   │   │   │   └── text.js
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   ├── package.json
│   │   │       │   │   │   │   ├── RGI_Emoji.js
│   │   │       │   │   │   │   └── text.js
│   │   │       │   │   │   ├── [01;34mstring-width[0m
│   │   │       │   │   │   │   ├── index.js
│   │   │       │   │   │   │   ├── license
│   │   │       │   │   │   │   └── package.json
│   │   │       │   │   │   └── [01;34mstrip-ansi[0m
│   │   │       │   │   │       ├── index.js
│   │   │       │   │   │       ├── license
│   │   │       │   │   │       └── package.json
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mwrap-ansi-cjs[0m
│   │   │       │   │   ├── [01;32mindex.js[0m
│   │   │       │   │   ├── license
│   │   │       │   │   ├── [01;34mnode_modules[0m
│   │   │       │   │   │   └── [01;34mansi-styles[0m
│   │   │       │   │   │       ├── index.js
│   │   │       │   │   │       ├── license
│   │   │       │   │   │       └── package.json
│   │   │       │   │   └── package.json
│   │   │       │   ├── [01;34mwrite-file-atomic[0m
│   │   │       │   │   ├── [01;34mlib[0m
│   │   │       │   │   │   └── index.js
│   │   │       │   │   └── package.json
│   │   │       │   └── [01;34myallist[0m
│   │   │       │       ├── iterator.js
│   │   │       │       ├── package.json
│   │   │       │       └── yallist.js
│   │   │       └── package.json
│   │   ├── [01;34mpython3[0m
│   │   │   └── [01;34mdist-packages[0m
│   │   ├── [01;34mpython3.10[0m
│   │   │   ├── abc.py
│   │   │   ├── aifc.py
│   │   │   ├── _aix_support.py
│   │   │   ├── antigravity.py
│   │   │   ├── argparse.py
│   │   │   ├── ast.py
│   │   │   ├── asynchat.py
│   │   │   ├── [01;34masyncio[0m
│   │   │   │   ├── base_events.py
│   │   │   │   ├── base_futures.py
│   │   │   │   ├── base_subprocess.py
│   │   │   │   ├── base_tasks.py
│   │   │   │   ├── constants.py
│   │   │   │   ├── coroutines.py
│   │   │   │   ├── events.py
│   │   │   │   ├── exceptions.py
│   │   │   │   ├── format_helpers.py
│   │   │   │   ├── futures.py
│   │   │   │   ├── __init__.py
│   │   │   │   ├── locks.py
│   │   │   │   ├── log.py
│   │   │   │   ├── __main__.py
│   │   │   │   ├── mixins.py
│   │   │   │   ├── proactor_events.py
│   │   │   │   ├── protocols.py
│   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   ├── base_events.cpython-310.pyc
│   │   │   │   │   ├── base_futures.cpython-310.pyc
│   │   │   │   │   ├── base_subprocess.cpython-310.pyc
│   │   │   │   │   ├── base_tasks.cpython-310.pyc
│   │   │   │   │   ├── constants.cpython-310.pyc
│   │   │   │   │   ├── coroutines.cpython-310.pyc
│   │   │   │   │   ├── events.cpython-310.pyc
│   │   │   │   │   ├── exceptions.cpython-310.pyc
│   │   │   │   │   ├── format_helpers.cpython-310.pyc
│   │   │   │   │   ├── futures.cpython-310.pyc
│   │   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   │   ├── locks.cpython-310.pyc
│   │   │   │   │   ├── log.cpython-310.pyc
│   │   │   │   │   ├── __main__.cpython-310.pyc
│   │   │   │   │   ├── mixins.cpython-310.pyc
│   │   │   │   │   ├── proactor_events.cpython-310.pyc
│   │   │   │   │   ├── protocols.cpython-310.pyc
│   │   │   │   │   ├── queues.cpython-310.pyc
│   │   │   │   │   ├── runners.cpython-310.pyc
│   │   │   │   │   ├── selector_events.cpython-310.pyc
│   │   │   │   │   ├── sslproto.cpython-310.pyc
│   │   │   │   │   ├── staggered.cpython-310.pyc
│   │   │   │   │   ├── streams.cpython-310.pyc
│   │   │   │   │   ├── subprocess.cpython-310.pyc
│   │   │   │   │   ├── tasks.cpython-310.pyc
│   │   │   │   │   ├── threads.cpython-310.pyc
│   │   │   │   │   ├── transports.cpython-310.pyc
│   │   │   │   │   ├── trsock.cpython-310.pyc
│   │   │   │   │   ├── unix_events.cpython-310.pyc
│   │   │   │   │   ├── windows_events.cpython-310.pyc
│   │   │   │   │   └── windows_utils.cpython-310.pyc
│   │   │   │   ├── queues.py
│   │   │   │   ├── runners.py
│   │   │   │   ├── selector_events.py
│   │   │   │   ├── sslproto.py
│   │   │   │   ├── staggered.py
│   │   │   │   ├── streams.py
│   │   │   │   ├── subprocess.py
│   │   │   │   ├── tasks.py
│   │   │   │   ├── threads.py
│   │   │   │   ├── transports.py
│   │   │   │   ├── trsock.py
│   │   │   │   ├── unix_events.py
│   │   │   │   ├── windows_events.py
│   │   │   │   └── windows_utils.py
│   │   │   ├── asyncore.py
│   │   │   ├── [01;32mbase64.py[0m
│   │   │   ├── bdb.py
│   │   │   ├── binhex.py
│   │   │   ├── bisect.py
│   │   │   ├── _bootsubprocess.py
│   │   │   ├── bz2.py
│   │   │   ├── calendar.py
│   │   │   ├── [01;32mcgi.py[0m
│   │   │   ├── cgitb.py
│   │   │   ├── chunk.py
│   │   │   ├── cmd.py
│   │   │   ├── codecs.py
│   │   │   ├── codeop.py
│   │   │   ├── code.py
│   │   │   ├── [01;34mcollections[0m
│   │   │   │   ├── abc.py
│   │   │   │   ├── __init__.py
│   │   │   │   └── [01;34m__pycache__[0m
│   │   │   │       ├── abc.cpython-310.pyc
│   │   │   │       └── __init__.cpython-310.pyc
│   │   │   ├── _collections_abc.py
│   │   │   ├── colorsys.py
│   │   │   ├── _compat_pickle.py
│   │   │   ├── compileall.py
│   │   │   ├── _compression.py
│   │   │   ├── [01;34mconcurrent[0m
│   │   │   │   ├── [01;34mfutures[0m
│   │   │   │   │   ├── _base.py
│   │   │   │   │   ├── __init__.py
│   │   │   │   │   ├── process.py
│   │   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   │   ├── _base.cpython-310.pyc
│   │   │   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   │   │   ├── process.cpython-310.pyc
│   │   │   │   │   │   └── thread.cpython-310.pyc
│   │   │   │   │   └── thread.py
│   │   │   │   ├── __init__.py
│   │   │   │   └── [01;34m__pycache__[0m
│   │   │   │       └── __init__.cpython-310.pyc
│   │   │   ├── configparser.py
│   │   │   ├── contextlib.py
│   │   │   ├── contextvars.py
│   │   │   ├── copy.py
│   │   │   ├── copyreg.py
│   │   │   ├── [01;32mcProfile.py[0m
│   │   │   ├── crypt.py
│   │   │   ├── csv.py
│   │   │   ├── [01;34mctypes[0m
│   │   │   │   ├── _aix.py
│   │   │   │   ├── _endian.py
│   │   │   │   ├── __init__.py
│   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   ├── _aix.cpython-310.pyc
│   │   │   │   │   ├── _endian.cpython-310.pyc
│   │   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   │   ├── util.cpython-310.pyc
│   │   │   │   │   └── wintypes.cpython-310.pyc
│   │   │   │   ├── util.py
│   │   │   │   └── wintypes.py
│   │   │   ├── [01;34mcurses[0m
│   │   │   │   ├── ascii.py
│   │   │   │   ├── has_key.py
│   │   │   │   ├── __init__.py
│   │   │   │   ├── panel.py
│   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   ├── ascii.cpython-310.pyc
│   │   │   │   │   ├── has_key.cpython-310.pyc
│   │   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   │   ├── panel.cpython-310.pyc
│   │   │   │   │   └── textpad.cpython-310.pyc
│   │   │   │   └── textpad.py
│   │   │   ├── dataclasses.py
│   │   │   ├── datetime.py
│   │   │   ├── [01;34mdbm[0m
│   │   │   │   ├── dumb.py
│   │   │   │   ├── gnu.py
│   │   │   │   ├── __init__.py
│   │   │   │   ├── ndbm.py
│   │   │   │   └── [01;34m__pycache__[0m
│   │   │   │       ├── dumb.cpython-310.pyc
│   │   │   │       ├── gnu.cpython-310.pyc
│   │   │   │       ├── __init__.cpython-310.pyc
│   │   │   │       └── ndbm.cpython-310.pyc
│   │   │   ├── decimal.py
│   │   │   ├── difflib.py
│   │   │   ├── dis.py
│   │   │   ├── [01;34mdistutils[0m
│   │   │   │   ├── __init__.py
│   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   │   └── version.cpython-310.pyc
│   │   │   │   └── version.py
│   │   │   ├── _distutils_system_mod.py
│   │   │   ├── doctest.py
│   │   │   ├── [01;34memail[0m
│   │   │   │   ├── architecture.rst
│   │   │   │   ├── base64mime.py
│   │   │   │   ├── charset.py
│   │   │   │   ├── contentmanager.py
│   │   │   │   ├── _encoded_words.py
│   │   │   │   ├── encoders.py
│   │   │   │   ├── errors.py
│   │   │   │   ├── feedparser.py
│   │   │   │   ├── generator.py
│   │   │   │   ├── header.py
│   │   │   │   ├── headerregistry.py
│   │   │   │   ├── _header_value_parser.py
│   │   │   │   ├── __init__.py
│   │   │   │   ├── iterators.py
│   │   │   │   ├── message.py
│   │   │   │   ├── [01;34mmime[0m
│   │   │   │   │   ├── application.py
│   │   │   │   │   ├── audio.py
│   │   │   │   │   ├── base.py
│   │   │   │   │   ├── image.py
│   │   │   │   │   ├── __init__.py
│   │   │   │   │   ├── message.py
│   │   │   │   │   ├── multipart.py
│   │   │   │   │   ├── nonmultipart.py
│   │   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   │   ├── application.cpython-310.pyc
│   │   │   │   │   │   ├── audio.cpython-310.pyc
│   │   │   │   │   │   ├── base.cpython-310.pyc
│   │   │   │   │   │   ├── image.cpython-310.pyc
│   │   │   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   │   │   ├── message.cpython-310.pyc
│   │   │   │   │   │   ├── multipart.cpython-310.pyc
│   │   │   │   │   │   ├── nonmultipart.cpython-310.pyc
│   │   │   │   │   │   └── text.cpython-310.pyc
│   │   │   │   │   └── text.py
│   │   │   │   ├── _parseaddr.py
│   │   │   │   ├── parser.py
│   │   │   │   ├── _policybase.py
│   │   │   │   ├── policy.py
│   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   ├── base64mime.cpython-310.pyc
│   │   │   │   │   ├── charset.cpython-310.pyc
│   │   │   │   │   ├── contentmanager.cpython-310.pyc
│   │   │   │   │   ├── _encoded_words.cpython-310.pyc
│   │   │   │   │   ├── encoders.cpython-310.pyc
│   │   │   │   │   ├── errors.cpython-310.pyc
│   │   │   │   │   ├── feedparser.cpython-310.pyc
│   │   │   │   │   ├── generator.cpython-310.pyc
│   │   │   │   │   ├── header.cpython-310.pyc
│   │   │   │   │   ├── headerregistry.cpython-310.pyc
│   │   │   │   │   ├── _header_value_parser.cpython-310.pyc
│   │   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   │   ├── iterators.cpython-310.pyc
│   │   │   │   │   ├── message.cpython-310.pyc
│   │   │   │   │   ├── _parseaddr.cpython-310.pyc
│   │   │   │   │   ├── parser.cpython-310.pyc
│   │   │   │   │   ├── _policybase.cpython-310.pyc
│   │   │   │   │   ├── policy.cpython-310.pyc
│   │   │   │   │   ├── quoprimime.cpython-310.pyc
│   │   │   │   │   └── utils.cpython-310.pyc
│   │   │   │   ├── quoprimime.py
│   │   │   │   └── utils.py
│   │   │   ├── [01;34mencodings[0m
│   │   │   │   ├── aliases.py
│   │   │   │   ├── ascii.py
│   │   │   │   ├── base64_codec.py
│   │   │   │   ├── big5hkscs.py
│   │   │   │   ├── big5.py
│   │   │   │   ├── bz2_codec.py
│   │   │   │   ├── charmap.py
│   │   │   │   ├── cp037.py
│   │   │   │   ├── cp1006.py
│   │   │   │   ├── cp1026.py
│   │   │   │   ├── cp1125.py
│   │   │   │   ├── cp1140.py
│   │   │   │   ├── cp1250.py
│   │   │   │   ├── cp1251.py
│   │   │   │   ├── cp1252.py
│   │   │   │   ├── cp1253.py
│   │   │   │   ├── cp1254.py
│   │   │   │   ├── cp1255.py
│   │   │   │   ├── cp1256.py
│   │   │   │   ├── cp1257.py
│   │   │   │   ├── cp1258.py
│   │   │   │   ├── cp273.py
│   │   │   │   ├── cp424.py
│   │   │   │   ├── cp437.py
│   │   │   │   ├── cp500.py
│   │   │   │   ├── cp720.py
│   │   │   │   ├── cp737.py
│   │   │   │   ├── cp775.py
│   │   │   │   ├── cp850.py
│   │   │   │   ├── cp852.py
│   │   │   │   ├── cp855.py
│   │   │   │   ├── cp856.py
│   │   │   │   ├── cp857.py
│   │   │   │   ├── cp858.py
│   │   │   │   ├── cp860.py
│   │   │   │   ├── cp861.py
│   │   │   │   ├── cp862.py
│   │   │   │   ├── cp863.py
│   │   │   │   ├── cp864.py
│   │   │   │   ├── cp865.py
│   │   │   │   ├── cp866.py
│   │   │   │   ├── cp869.py
│   │   │   │   ├── cp874.py
│   │   │   │   ├── cp875.py
│   │   │   │   ├── cp932.py
│   │   │   │   ├── cp949.py
│   │   │   │   ├── cp950.py
│   │   │   │   ├── euc_jis_2004.py
│   │   │   │   ├── euc_jisx0213.py
│   │   │   │   ├── euc_jp.py
│   │   │   │   ├── euc_kr.py
│   │   │   │   ├── gb18030.py
│   │   │   │   ├── gb2312.py
│   │   │   │   ├── gbk.py
│   │   │   │   ├── hex_codec.py
│   │   │   │   ├── hp_roman8.py
│   │   │   │   ├── hz.py
│   │   │   │   ├── idna.py
│   │   │   │   ├── __init__.py
│   │   │   │   ├── iso2022_jp_1.py
│   │   │   │   ├── iso2022_jp_2004.py
│   │   │   │   ├── iso2022_jp_2.py
│   │   │   │   ├── iso2022_jp_3.py
│   │   │   │   ├── iso2022_jp_ext.py
│   │   │   │   ├── iso2022_jp.py
│   │   │   │   ├── iso2022_kr.py
│   │   │   │   ├── iso8859_10.py
│   │   │   │   ├── iso8859_11.py
│   │   │   │   ├── iso8859_13.py
│   │   │   │   ├── iso8859_14.py
│   │   │   │   ├── iso8859_15.py
│   │   │   │   ├── iso8859_16.py
│   │   │   │   ├── iso8859_1.py
│   │   │   │   ├── iso8859_2.py
│   │   │   │   ├── iso8859_3.py
│   │   │   │   ├── iso8859_4.py
│   │   │   │   ├── iso8859_5.py
│   │   │   │   ├── iso8859_6.py
│   │   │   │   ├── iso8859_7.py
│   │   │   │   ├── iso8859_8.py
│   │   │   │   ├── iso8859_9.py
│   │   │   │   ├── johab.py
│   │   │   │   ├── koi8_r.py
│   │   │   │   ├── koi8_t.py
│   │   │   │   ├── koi8_u.py
│   │   │   │   ├── kz1048.py
│   │   │   │   ├── latin_1.py
│   │   │   │   ├── mac_arabic.py
│   │   │   │   ├── mac_croatian.py
│   │   │   │   ├── mac_cyrillic.py
│   │   │   │   ├── mac_farsi.py
│   │   │   │   ├── mac_greek.py
│   │   │   │   ├── mac_iceland.py
│   │   │   │   ├── mac_latin2.py
│   │   │   │   ├── mac_romanian.py
│   │   │   │   ├── mac_roman.py
│   │   │   │   ├── mac_turkish.py
│   │   │   │   ├── mbcs.py
│   │   │   │   ├── oem.py
│   │   │   │   ├── palmos.py
│   │   │   │   ├── ptcp154.py
│   │   │   │   ├── punycode.py
│   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   ├── aliases.cpython-310.pyc
│   │   │   │   │   ├── ascii.cpython-310.pyc
│   │   │   │   │   ├── base64_codec.cpython-310.pyc
│   │   │   │   │   ├── big5.cpython-310.pyc
│   │   │   │   │   ├── big5hkscs.cpython-310.pyc
│   │   │   │   │   ├── bz2_codec.cpython-310.pyc
│   │   │   │   │   ├── charmap.cpython-310.pyc
│   │   │   │   │   ├── cp037.cpython-310.pyc
│   │   │   │   │   ├── cp1006.cpython-310.pyc
│   │   │   │   │   ├── cp1026.cpython-310.pyc
│   │   │   │   │   ├── cp1125.cpython-310.pyc
│   │   │   │   │   ├── cp1140.cpython-310.pyc
│   │   │   │   │   ├── cp1250.cpython-310.pyc
│   │   │   │   │   ├── cp1251.cpython-310.pyc
│   │   │   │   │   ├── cp1252.cpython-310.pyc
│   │   │   │   │   ├── cp1253.cpython-310.pyc
│   │   │   │   │   ├── cp1254.cpython-310.pyc
│   │   │   │   │   ├── cp1255.cpython-310.pyc
│   │   │   │   │   ├── cp1256.cpython-310.pyc
│   │   │   │   │   ├── cp1257.cpython-310.pyc
│   │   │   │   │   ├── cp1258.cpython-310.pyc
│   │   │   │   │   ├── cp273.cpython-310.pyc
│   │   │   │   │   ├── cp424.cpython-310.pyc
│   │   │   │   │   ├── cp437.cpython-310.pyc
│   │   │   │   │   ├── cp500.cpython-310.pyc
│   │   │   │   │   ├── cp720.cpython-310.pyc
│   │   │   │   │   ├── cp737.cpython-310.pyc
│   │   │   │   │   ├── cp775.cpython-310.pyc
│   │   │   │   │   ├── cp850.cpython-310.pyc
│   │   │   │   │   ├── cp852.cpython-310.pyc
│   │   │   │   │   ├── cp855.cpython-310.pyc
│   │   │   │   │   ├── cp856.cpython-310.pyc
│   │   │   │   │   ├── cp857.cpython-310.pyc
│   │   │   │   │   ├── cp858.cpython-310.pyc
│   │   │   │   │   ├── cp860.cpython-310.pyc
│   │   │   │   │   ├── cp861.cpython-310.pyc
│   │   │   │   │   ├── cp862.cpython-310.pyc
│   │   │   │   │   ├── cp863.cpython-310.pyc
│   │   │   │   │   ├── cp864.cpython-310.pyc
│   │   │   │   │   ├── cp865.cpython-310.pyc
│   │   │   │   │   ├── cp866.cpython-310.pyc
│   │   │   │   │   ├── cp869.cpython-310.pyc
│   │   │   │   │   ├── cp874.cpython-310.pyc
│   │   │   │   │   ├── cp875.cpython-310.pyc
│   │   │   │   │   ├── cp932.cpython-310.pyc
│   │   │   │   │   ├── cp949.cpython-310.pyc
│   │   │   │   │   ├── cp950.cpython-310.pyc
│   │   │   │   │   ├── euc_jis_2004.cpython-310.pyc
│   │   │   │   │   ├── euc_jisx0213.cpython-310.pyc
│   │   │   │   │   ├── euc_jp.cpython-310.pyc
│   │   │   │   │   ├── euc_kr.cpython-310.pyc
│   │   │   │   │   ├── gb18030.cpython-310.pyc
│   │   │   │   │   ├── gb2312.cpython-310.pyc
│   │   │   │   │   ├── gbk.cpython-310.pyc
│   │   │   │   │   ├── hex_codec.cpython-310.pyc
│   │   │   │   │   ├── hp_roman8.cpython-310.pyc
│   │   │   │   │   ├── hz.cpython-310.pyc
│   │   │   │   │   ├── idna.cpython-310.pyc
│   │   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   │   ├── iso2022_jp_1.cpython-310.pyc
│   │   │   │   │   ├── iso2022_jp_2004.cpython-310.pyc
│   │   │   │   │   ├── iso2022_jp_2.cpython-310.pyc
│   │   │   │   │   ├── iso2022_jp_3.cpython-310.pyc
│   │   │   │   │   ├── iso2022_jp.cpython-310.pyc
│   │   │   │   │   ├── iso2022_jp_ext.cpython-310.pyc
│   │   │   │   │   ├── iso2022_kr.cpython-310.pyc
│   │   │   │   │   ├── iso8859_10.cpython-310.pyc
│   │   │   │   │   ├── iso8859_11.cpython-310.pyc
│   │   │   │   │   ├── iso8859_13.cpython-310.pyc
│   │   │   │   │   ├── iso8859_14.cpython-310.pyc
│   │   │   │   │   ├── iso8859_15.cpython-310.pyc
│   │   │   │   │   ├── iso8859_16.cpython-310.pyc
│   │   │   │   │   ├── iso8859_1.cpython-310.pyc
│   │   │   │   │   ├── iso8859_2.cpython-310.pyc
│   │   │   │   │   ├── iso8859_3.cpython-310.pyc
│   │   │   │   │   ├── iso8859_4.cpython-310.pyc
│   │   │   │   │   ├── iso8859_5.cpython-310.pyc
│   │   │   │   │   ├── iso8859_6.cpython-310.pyc
│   │   │   │   │   ├── iso8859_7.cpython-310.pyc
│   │   │   │   │   ├── iso8859_8.cpython-310.pyc
│   │   │   │   │   ├── iso8859_9.cpython-310.pyc
│   │   │   │   │   ├── johab.cpython-310.pyc
│   │   │   │   │   ├── koi8_r.cpython-310.pyc
│   │   │   │   │   ├── koi8_t.cpython-310.pyc
│   │   │   │   │   ├── koi8_u.cpython-310.pyc
│   │   │   │   │   ├── kz1048.cpython-310.pyc
│   │   │   │   │   ├── latin_1.cpython-310.pyc
│   │   │   │   │   ├── mac_arabic.cpython-310.pyc
│   │   │   │   │   ├── mac_croatian.cpython-310.pyc
│   │   │   │   │   ├── mac_cyrillic.cpython-310.pyc
│   │   │   │   │   ├── mac_farsi.cpython-310.pyc
│   │   │   │   │   ├── mac_greek.cpython-310.pyc
│   │   │   │   │   ├── mac_iceland.cpython-310.pyc
│   │   │   │   │   ├── mac_latin2.cpython-310.pyc
│   │   │   │   │   ├── mac_roman.cpython-310.pyc
│   │   │   │   │   ├── mac_romanian.cpython-310.pyc
│   │   │   │   │   ├── mac_turkish.cpython-310.pyc
│   │   │   │   │   ├── mbcs.cpython-310.pyc
│   │   │   │   │   ├── oem.cpython-310.pyc
│   │   │   │   │   ├── palmos.cpython-310.pyc
│   │   │   │   │   ├── ptcp154.cpython-310.pyc
│   │   │   │   │   ├── punycode.cpython-310.pyc
│   │   │   │   │   ├── quopri_codec.cpython-310.pyc
│   │   │   │   │   ├── raw_unicode_escape.cpython-310.pyc
│   │   │   │   │   ├── rot_13.cpython-310.pyc
│   │   │   │   │   ├── shift_jis_2004.cpython-310.pyc
│   │   │   │   │   ├── shift_jis.cpython-310.pyc
│   │   │   │   │   ├── shift_jisx0213.cpython-310.pyc
│   │   │   │   │   ├── tis_620.cpython-310.pyc
│   │   │   │   │   ├── undefined.cpython-310.pyc
│   │   │   │   │   ├── unicode_escape.cpython-310.pyc
│   │   │   │   │   ├── utf_16_be.cpython-310.pyc
│   │   │   │   │   ├── utf_16.cpython-310.pyc
│   │   │   │   │   ├── utf_16_le.cpython-310.pyc
│   │   │   │   │   ├── utf_32_be.cpython-310.pyc
│   │   │   │   │   ├── utf_32.cpython-310.pyc
│   │   │   │   │   ├── utf_32_le.cpython-310.pyc
│   │   │   │   │   ├── utf_7.cpython-310.pyc
│   │   │   │   │   ├── utf_8.cpython-310.pyc
│   │   │   │   │   ├── utf_8_sig.cpython-310.pyc
│   │   │   │   │   ├── uu_codec.cpython-310.pyc
│   │   │   │   │   └── zlib_codec.cpython-310.pyc
│   │   │   │   ├── quopri_codec.py
│   │   │   │   ├── raw_unicode_escape.py
│   │   │   │   ├── [01;32mrot_13.py[0m
│   │   │   │   ├── shift_jis_2004.py
│   │   │   │   ├── shift_jis.py
│   │   │   │   ├── shift_jisx0213.py
│   │   │   │   ├── tis_620.py
│   │   │   │   ├── undefined.py
│   │   │   │   ├── unicode_escape.py
│   │   │   │   ├── utf_16_be.py
│   │   │   │   ├── utf_16_le.py
│   │   │   │   ├── utf_16.py
│   │   │   │   ├── utf_32_be.py
│   │   │   │   ├── utf_32_le.py
│   │   │   │   ├── utf_32.py
│   │   │   │   ├── utf_7.py
│   │   │   │   ├── utf_8.py
│   │   │   │   ├── utf_8_sig.py
│   │   │   │   ├── uu_codec.py
│   │   │   │   └── zlib_codec.py
│   │   │   ├── enum.py
│   │   │   ├── filecmp.py
│   │   │   ├── fileinput.py
│   │   │   ├── fnmatch.py
│   │   │   ├── fractions.py
│   │   │   ├── ftplib.py
│   │   │   ├── functools.py
│   │   │   ├── __future__.py
│   │   │   ├── genericpath.py
│   │   │   ├── getopt.py
│   │   │   ├── getpass.py
│   │   │   ├── gettext.py
│   │   │   ├── glob.py
│   │   │   ├── graphlib.py
│   │   │   ├── gzip.py
│   │   │   ├── hashlib.py
│   │   │   ├── heapq.py
│   │   │   ├── hmac.py
│   │   │   ├── [01;34mhtml[0m
│   │   │   │   ├── entities.py
│   │   │   │   ├── __init__.py
│   │   │   │   ├── parser.py
│   │   │   │   └── [01;34m__pycache__[0m
│   │   │   │       ├── entities.cpython-310.pyc
│   │   │   │       ├── __init__.cpython-310.pyc
│   │   │   │       └── parser.cpython-310.pyc
│   │   │   ├── [01;34mhttp[0m
│   │   │   │   ├── client.py
│   │   │   │   ├── cookiejar.py
│   │   │   │   ├── cookies.py
│   │   │   │   ├── __init__.py
│   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   ├── client.cpython-310.pyc
│   │   │   │   │   ├── cookiejar.cpython-310.pyc
│   │   │   │   │   ├── cookies.cpython-310.pyc
│   │   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   │   └── server.cpython-310.pyc
│   │   │   │   └── server.py
│   │   │   ├── imaplib.py
│   │   │   ├── imghdr.py
│   │   │   ├── [01;34mimportlib[0m
│   │   │   │   ├── _abc.py
│   │   │   │   ├── abc.py
│   │   │   │   ├── _adapters.py
│   │   │   │   ├── _bootstrap_external.py
│   │   │   │   ├── _bootstrap.py
│   │   │   │   ├── _common.py
│   │   │   │   ├── __init__.py
│   │   │   │   ├── machinery.py
│   │   │   │   ├── [01;34mmetadata[0m
│   │   │   │   │   ├── _adapters.py
│   │   │   │   │   ├── _collections.py
│   │   │   │   │   ├── _functools.py
│   │   │   │   │   ├── __init__.py
│   │   │   │   │   ├── _itertools.py
│   │   │   │   │   ├── _meta.py
│   │   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   │   ├── _adapters.cpython-310.pyc
│   │   │   │   │   │   ├── _collections.cpython-310.pyc
│   │   │   │   │   │   ├── _functools.cpython-310.pyc
│   │   │   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   │   │   ├── _itertools.cpython-310.pyc
│   │   │   │   │   │   ├── _meta.cpython-310.pyc
│   │   │   │   │   │   └── _text.cpython-310.pyc
│   │   │   │   │   └── _text.py
│   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   ├── _abc.cpython-310.pyc
│   │   │   │   │   ├── abc.cpython-310.pyc
│   │   │   │   │   ├── _adapters.cpython-310.pyc
│   │   │   │   │   ├── _bootstrap.cpython-310.pyc
│   │   │   │   │   ├── _bootstrap_external.cpython-310.pyc
│   │   │   │   │   ├── _common.cpython-310.pyc
│   │   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   │   ├── machinery.cpython-310.pyc
│   │   │   │   │   ├── readers.cpython-310.pyc
│   │   │   │   │   ├── resources.cpython-310.pyc
│   │   │   │   │   └── util.cpython-310.pyc
│   │   │   │   ├── readers.py
│   │   │   │   ├── resources.py
│   │   │   │   └── util.py
│   │   │   ├── imp.py
│   │   │   ├── inspect.py
│   │   │   ├── io.py
│   │   │   ├── ipaddress.py
│   │   │   ├── [01;34mjson[0m
│   │   │   │   ├── decoder.py
│   │   │   │   ├── encoder.py
│   │   │   │   ├── __init__.py
│   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   ├── decoder.cpython-310.pyc
│   │   │   │   │   ├── encoder.cpython-310.pyc
│   │   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   │   ├── scanner.cpython-310.pyc
│   │   │   │   │   └── tool.cpython-310.pyc
│   │   │   │   ├── scanner.py
│   │   │   │   └── tool.py
│   │   │   ├── keyword.py
│   │   │   ├── [01;34mlib-dynload[0m
│   │   │   │   ├── _asyncio.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── audioop.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _bz2.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _codecs_cn.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _codecs_hk.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _codecs_iso2022.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _codecs_jp.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _codecs_kr.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _codecs_tw.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _contextvars.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _crypt.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _ctypes.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _ctypes_test.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _curses.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _curses_panel.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _dbm.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _decimal.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _hashlib.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _json.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _lsprof.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _lzma.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── mmap.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _multibytecodec.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _multiprocessing.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── nis.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _opcode.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── ossaudiodev.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _posixshmem.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _queue.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── readline.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── resource.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _sqlite3.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _ssl.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── termios.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _testbuffer.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _testcapi.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _testclinic.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _testimportmultiple.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _testinternalcapi.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _testmultiphase.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _uuid.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── xxlimited_35.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── xxlimited.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _xxsubinterpreters.cpython-310-x86_64-linux-gnu.so
│   │   │   │   ├── _xxtestfuzz.cpython-310-x86_64-linux-gnu.so
│   │   │   │   └── _zoneinfo.cpython-310-x86_64-linux-gnu.so
│   │   │   ├── LICENSE.txt
│   │   │   ├── linecache.py
│   │   │   ├── locale.py
│   │   │   ├── [01;34mlogging[0m
│   │   │   │   ├── config.py
│   │   │   │   ├── handlers.py
│   │   │   │   ├── __init__.py
│   │   │   │   └── [01;34m__pycache__[0m
│   │   │   │       ├── config.cpython-310.pyc
│   │   │   │       ├── handlers.cpython-310.pyc
│   │   │   │       └── __init__.cpython-310.pyc
│   │   │   ├── lzma.py
│   │   │   ├── mailbox.py
│   │   │   ├── mailcap.py
│   │   │   ├── _markupbase.py
│   │   │   ├── mimetypes.py
│   │   │   ├── modulefinder.py
│   │   │   ├── [01;34mmultiprocessing[0m
│   │   │   │   ├── connection.py
│   │   │   │   ├── context.py
│   │   │   │   ├── [01;34mdummy[0m
│   │   │   │   │   ├── connection.py
│   │   │   │   │   ├── __init__.py
│   │   │   │   │   └── [01;34m__pycache__[0m
│   │   │   │   │       ├── connection.cpython-310.pyc
│   │   │   │   │       └── __init__.cpython-310.pyc
│   │   │   │   ├── forkserver.py
│   │   │   │   ├── heap.py
│   │   │   │   ├── __init__.py
│   │   │   │   ├── managers.py
│   │   │   │   ├── pool.py
│   │   │   │   ├── popen_fork.py
│   │   │   │   ├── popen_forkserver.py
│   │   │   │   ├── popen_spawn_posix.py
│   │   │   │   ├── popen_spawn_win32.py
│   │   │   │   ├── process.py
│   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   ├── connection.cpython-310.pyc
│   │   │   │   │   ├── context.cpython-310.pyc
│   │   │   │   │   ├── forkserver.cpython-310.pyc
│   │   │   │   │   ├── heap.cpython-310.pyc
│   │   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   │   ├── managers.cpython-310.pyc
│   │   │   │   │   ├── pool.cpython-310.pyc
│   │   │   │   │   ├── popen_fork.cpython-310.pyc
│   │   │   │   │   ├── popen_forkserver.cpython-310.pyc
│   │   │   │   │   ├── popen_spawn_posix.cpython-310.pyc
│   │   │   │   │   ├── popen_spawn_win32.cpython-310.pyc
│   │   │   │   │   ├── process.cpython-310.pyc
│   │   │   │   │   ├── queues.cpython-310.pyc
│   │   │   │   │   ├── reduction.cpython-310.pyc
│   │   │   │   │   ├── resource_sharer.cpython-310.pyc
│   │   │   │   │   ├── resource_tracker.cpython-310.pyc
│   │   │   │   │   ├── sharedctypes.cpython-310.pyc
│   │   │   │   │   ├── shared_memory.cpython-310.pyc
│   │   │   │   │   ├── spawn.cpython-310.pyc
│   │   │   │   │   ├── synchronize.cpython-310.pyc
│   │   │   │   │   └── util.cpython-310.pyc
│   │   │   │   ├── queues.py
│   │   │   │   ├── reduction.py
│   │   │   │   ├── resource_sharer.py
│   │   │   │   ├── resource_tracker.py
│   │   │   │   ├── sharedctypes.py
│   │   │   │   ├── shared_memory.py
│   │   │   │   ├── spawn.py
│   │   │   │   ├── synchronize.py
│   │   │   │   └── util.py
│   │   │   ├── netrc.py
│   │   │   ├── nntplib.py
│   │   │   ├── ntpath.py
│   │   │   ├── nturl2path.py
│   │   │   ├── numbers.py
│   │   │   ├── opcode.py
│   │   │   ├── operator.py
│   │   │   ├── optparse.py
│   │   │   ├── os.py
│   │   │   ├── _osx_support.py
│   │   │   ├── pathlib.py
│   │   │   ├── [01;32mpdb.py[0m
│   │   │   ├── __phello__.foo.py
│   │   │   ├── pickle.py
│   │   │   ├── pickletools.py
│   │   │   ├── pipes.py
│   │   │   ├── pkgutil.py
│   │   │   ├── [01;32mplatform.py[0m
│   │   │   ├── plistlib.py
│   │   │   ├── poplib.py
│   │   │   ├── posixpath.py
│   │   │   ├── pprint.py
│   │   │   ├── [01;32mprofile.py[0m
│   │   │   ├── pstats.py
│   │   │   ├── pty.py
│   │   │   ├── _py_abc.py
│   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   ├── abc.cpython-310.pyc
│   │   │   │   ├── aifc.cpython-310.pyc
│   │   │   │   ├── _aix_support.cpython-310.pyc
│   │   │   │   ├── antigravity.cpython-310.pyc
│   │   │   │   ├── argparse.cpython-310.pyc
│   │   │   │   ├── ast.cpython-310.pyc
│   │   │   │   ├── asynchat.cpython-310.pyc
│   │   │   │   ├── asyncore.cpython-310.pyc
│   │   │   │   ├── base64.cpython-310.pyc
│   │   │   │   ├── bdb.cpython-310.pyc
│   │   │   │   ├── binhex.cpython-310.pyc
│   │   │   │   ├── bisect.cpython-310.pyc
│   │   │   │   ├── _bootsubprocess.cpython-310.pyc
│   │   │   │   ├── bz2.cpython-310.pyc
│   │   │   │   ├── calendar.cpython-310.pyc
│   │   │   │   ├── cgi.cpython-310.pyc
│   │   │   │   ├── cgitb.cpython-310.pyc
│   │   │   │   ├── chunk.cpython-310.pyc
│   │   │   │   ├── cmd.cpython-310.pyc
│   │   │   │   ├── code.cpython-310.pyc
│   │   │   │   ├── codecs.cpython-310.pyc
│   │   │   │   ├── codeop.cpython-310.pyc
│   │   │   │   ├── _collections_abc.cpython-310.pyc
│   │   │   │   ├── colorsys.cpython-310.pyc
│   │   │   │   ├── _compat_pickle.cpython-310.pyc
│   │   │   │   ├── compileall.cpython-310.pyc
│   │   │   │   ├── _compression.cpython-310.pyc
│   │   │   │   ├── configparser.cpython-310.pyc
│   │   │   │   ├── contextlib.cpython-310.pyc
│   │   │   │   ├── contextvars.cpython-310.pyc
│   │   │   │   ├── copy.cpython-310.pyc
│   │   │   │   ├── copyreg.cpython-310.pyc
│   │   │   │   ├── cProfile.cpython-310.pyc
│   │   │   │   ├── crypt.cpython-310.pyc
│   │   │   │   ├── csv.cpython-310.pyc
│   │   │   │   ├── dataclasses.cpython-310.pyc
│   │   │   │   ├── datetime.cpython-310.pyc
│   │   │   │   ├── decimal.cpython-310.pyc
│   │   │   │   ├── difflib.cpython-310.pyc
│   │   │   │   ├── dis.cpython-310.pyc
│   │   │   │   ├── _distutils_system_mod.cpython-310.pyc
│   │   │   │   ├── doctest.cpython-310.pyc
│   │   │   │   ├── enum.cpython-310.pyc
│   │   │   │   ├── filecmp.cpython-310.pyc
│   │   │   │   ├── fileinput.cpython-310.pyc
│   │   │   │   ├── fnmatch.cpython-310.pyc
│   │   │   │   ├── fractions.cpython-310.pyc
│   │   │   │   ├── ftplib.cpython-310.pyc
│   │   │   │   ├── functools.cpython-310.pyc
│   │   │   │   ├── __future__.cpython-310.pyc
│   │   │   │   ├── genericpath.cpython-310.pyc
│   │   │   │   ├── getopt.cpython-310.pyc
│   │   │   │   ├── getpass.cpython-310.pyc
│   │   │   │   ├── gettext.cpython-310.pyc
│   │   │   │   ├── glob.cpython-310.pyc
│   │   │   │   ├── graphlib.cpython-310.pyc
│   │   │   │   ├── gzip.cpython-310.pyc
│   │   │   │   ├── hashlib.cpython-310.pyc
│   │   │   │   ├── heapq.cpython-310.pyc
│   │   │   │   ├── hmac.cpython-310.pyc
│   │   │   │   ├── imaplib.cpython-310.pyc
│   │   │   │   ├── imghdr.cpython-310.pyc
│   │   │   │   ├── imp.cpython-310.pyc
│   │   │   │   ├── inspect.cpython-310.pyc
│   │   │   │   ├── io.cpython-310.pyc
│   │   │   │   ├── ipaddress.cpython-310.pyc
│   │   │   │   ├── keyword.cpython-310.pyc
│   │   │   │   ├── linecache.cpython-310.pyc
│   │   │   │   ├── locale.cpython-310.pyc
│   │   │   │   ├── lzma.cpython-310.pyc
│   │   │   │   ├── mailbox.cpython-310.pyc
│   │   │   │   ├── mailcap.cpython-310.pyc
│   │   │   │   ├── _markupbase.cpython-310.pyc
│   │   │   │   ├── mimetypes.cpython-310.pyc
│   │   │   │   ├── modulefinder.cpython-310.pyc
│   │   │   │   ├── netrc.cpython-310.pyc
│   │   │   │   ├── nntplib.cpython-310.pyc
│   │   │   │   ├── ntpath.cpython-310.pyc
│   │   │   │   ├── nturl2path.cpython-310.pyc
│   │   │   │   ├── numbers.cpython-310.pyc
│   │   │   │   ├── opcode.cpython-310.pyc
│   │   │   │   ├── operator.cpython-310.pyc
│   │   │   │   ├── optparse.cpython-310.pyc
│   │   │   │   ├── os.cpython-310.pyc
│   │   │   │   ├── _osx_support.cpython-310.pyc
│   │   │   │   ├── pathlib.cpython-310.pyc
│   │   │   │   ├── pdb.cpython-310.pyc
│   │   │   │   ├── __phello__.foo.cpython-310.pyc
│   │   │   │   ├── pickle.cpython-310.pyc
│   │   │   │   ├── pickletools.cpython-310.pyc
│   │   │   │   ├── pipes.cpython-310.pyc
│   │   │   │   ├── pkgutil.cpython-310.pyc
│   │   │   │   ├── platform.cpython-310.pyc
│   │   │   │   ├── plistlib.cpython-310.pyc
│   │   │   │   ├── poplib.cpython-310.pyc
│   │   │   │   ├── posixpath.cpython-310.pyc
│   │   │   │   ├── pprint.cpython-310.pyc
│   │   │   │   ├── profile.cpython-310.pyc
│   │   │   │   ├── pstats.cpython-310.pyc
│   │   │   │   ├── pty.cpython-310.pyc
│   │   │   │   ├── _py_abc.cpython-310.pyc
│   │   │   │   ├── pyclbr.cpython-310.pyc
│   │   │   │   ├── py_compile.cpython-310.pyc
│   │   │   │   ├── _pydecimal.cpython-310.pyc
│   │   │   │   ├── pydoc.cpython-310.pyc
│   │   │   │   ├── _pyio.cpython-310.pyc
│   │   │   │   ├── queue.cpython-310.pyc
│   │   │   │   ├── quopri.cpython-310.pyc
│   │   │   │   ├── random.cpython-310.pyc
│   │   │   │   ├── re.cpython-310.pyc
│   │   │   │   ├── reprlib.cpython-310.pyc
│   │   │   │   ├── rlcompleter.cpython-310.pyc
│   │   │   │   ├── runpy.cpython-310.pyc
│   │   │   │   ├── sched.cpython-310.pyc
│   │   │   │   ├── secrets.cpython-310.pyc
│   │   │   │   ├── selectors.cpython-310.pyc
│   │   │   │   ├── shelve.cpython-310.pyc
│   │   │   │   ├── shlex.cpython-310.pyc
│   │   │   │   ├── shutil.cpython-310.pyc
│   │   │   │   ├── signal.cpython-310.pyc
│   │   │   │   ├── _sitebuiltins.cpython-310.pyc
│   │   │   │   ├── site.cpython-310.pyc
│   │   │   │   ├── sitecustomize.cpython-310.pyc
│   │   │   │   ├── smtpd.cpython-310.pyc
│   │   │   │   ├── smtplib.cpython-310.pyc
│   │   │   │   ├── sndhdr.cpython-310.pyc
│   │   │   │   ├── socket.cpython-310.pyc
│   │   │   │   ├── socketserver.cpython-310.pyc
│   │   │   │   ├── sre_compile.cpython-310.pyc
│   │   │   │   ├── sre_constants.cpython-310.pyc
│   │   │   │   ├── sre_parse.cpython-310.pyc
│   │   │   │   ├── ssl.cpython-310.pyc
│   │   │   │   ├── stat.cpython-310.pyc
│   │   │   │   ├── statistics.cpython-310.pyc
│   │   │   │   ├── string.cpython-310.pyc
│   │   │   │   ├── stringprep.cpython-310.pyc
│   │   │   │   ├── _strptime.cpython-310.pyc
│   │   │   │   ├── struct.cpython-310.pyc
│   │   │   │   ├── subprocess.cpython-310.pyc
│   │   │   │   ├── sunau.cpython-310.pyc
│   │   │   │   ├── symtable.cpython-310.pyc
│   │   │   │   ├── sysconfig.cpython-310.pyc
│   │   │   │   ├── _sysconfigdata__linux_x86_64-linux-gnu.cpython-310.pyc
│   │   │   │   ├── _sysconfigdata__x86_64-linux-gnu.cpython-310.pyc
│   │   │   │   ├── tabnanny.cpython-310.pyc
│   │   │   │   ├── tarfile.cpython-310.pyc
│   │   │   │   ├── telnetlib.cpython-310.pyc
│   │   │   │   ├── tempfile.cpython-310.pyc
│   │   │   │   ├── textwrap.cpython-310.pyc
│   │   │   │   ├── this.cpython-310.pyc
│   │   │   │   ├── threading.cpython-310.pyc
│   │   │   │   ├── _threading_local.cpython-310.pyc
│   │   │   │   ├── timeit.cpython-310.pyc
│   │   │   │   ├── token.cpython-310.pyc
│   │   │   │   ├── tokenize.cpython-310.pyc
│   │   │   │   ├── traceback.cpython-310.pyc
│   │   │   │   ├── trace.cpython-310.pyc
│   │   │   │   ├── tracemalloc.cpython-310.pyc
│   │   │   │   ├── tty.cpython-310.pyc
│   │   │   │   ├── turtle.cpython-310.pyc
│   │   │   │   ├── types.cpython-310.pyc
│   │   │   │   ├── typing.cpython-310.pyc
│   │   │   │   ├── uu.cpython-310.pyc
│   │   │   │   ├── uuid.cpython-310.pyc
│   │   │   │   ├── warnings.cpython-310.pyc
│   │   │   │   ├── wave.cpython-310.pyc
│   │   │   │   ├── weakref.cpython-310.pyc
│   │   │   │   ├── _weakrefset.cpython-310.pyc
│   │   │   │   ├── webbrowser.cpython-310.pyc
│   │   │   │   ├── xdrlib.cpython-310.pyc
│   │   │   │   ├── zipapp.cpython-310.pyc
│   │   │   │   ├── zipfile.cpython-310.pyc
│   │   │   │   └── zipimport.cpython-310.pyc
│   │   │   ├── pyclbr.py
│   │   │   ├── py_compile.py
│   │   │   ├── _pydecimal.py
│   │   │   ├── [01;34mpydoc_data[0m
│   │   │   │   ├── __init__.py
│   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   │   └── topics.cpython-310.pyc
│   │   │   │   ├── _pydoc.css
│   │   │   │   └── topics.py
│   │   │   ├── [01;32mpydoc.py[0m
│   │   │   ├── _pyio.py
│   │   │   ├── queue.py
│   │   │   ├── [01;32mquopri.py[0m
│   │   │   ├── random.py
│   │   │   ├── reprlib.py
│   │   │   ├── re.py
│   │   │   ├── rlcompleter.py
│   │   │   ├── runpy.py
│   │   │   ├── sched.py
│   │   │   ├── secrets.py
│   │   │   ├── selectors.py
│   │   │   ├── shelve.py
│   │   │   ├── shlex.py
│   │   │   ├── shutil.py
│   │   │   ├── signal.py
│   │   │   ├── _sitebuiltins.py
│   │   │   ├── [01;36msitecustomize.py[0m -> /etc/python3.10/sitecustomize.py
│   │   │   ├── site.py
│   │   │   ├── [01;32msmtpd.py[0m
│   │   │   ├── [01;32msmtplib.py[0m
│   │   │   ├── sndhdr.py
│   │   │   ├── socket.py
│   │   │   ├── socketserver.py
│   │   │   ├── [01;34msqlite3[0m
│   │   │   │   ├── dbapi2.py
│   │   │   │   ├── dump.py
│   │   │   │   ├── __init__.py
│   │   │   │   └── [01;34m__pycache__[0m
│   │   │   │       ├── dbapi2.cpython-310.pyc
│   │   │   │       ├── dump.cpython-310.pyc
│   │   │   │       └── __init__.cpython-310.pyc
│   │   │   ├── sre_compile.py
│   │   │   ├── sre_constants.py
│   │   │   ├── sre_parse.py
│   │   │   ├── ssl.py
│   │   │   ├── statistics.py
│   │   │   ├── stat.py
│   │   │   ├── stringprep.py
│   │   │   ├── string.py
│   │   │   ├── _strptime.py
│   │   │   ├── struct.py
│   │   │   ├── subprocess.py
│   │   │   ├── sunau.py
│   │   │   ├── symtable.py
│   │   │   ├── [01;36m_sysconfigdata__linux_x86_64-linux-gnu.py[0m -> _sysconfigdata__x86_64-linux-gnu.py
│   │   │   ├── _sysconfigdata__x86_64-linux-gnu.py
│   │   │   ├── sysconfig.py
│   │   │   ├── [01;32mtabnanny.py[0m
│   │   │   ├── [01;32mtarfile.py[0m
│   │   │   ├── telnetlib.py
│   │   │   ├── tempfile.py
│   │   │   ├── [01;34mtest[0m
│   │   │   │   ├── ann_module2.py
│   │   │   │   ├── ann_module3.py
│   │   │   │   ├── ann_module.py
│   │   │   │   ├── __init__.py
│   │   │   │   ├── [01;34mlibregrtest[0m
│   │   │   │   │   ├── cmdline.py
│   │   │   │   │   ├── __init__.py
│   │   │   │   │   ├── main.py
│   │   │   │   │   ├── pgo.py
│   │   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   │   ├── cmdline.cpython-310.pyc
│   │   │   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   │   │   ├── main.cpython-310.pyc
│   │   │   │   │   │   ├── pgo.cpython-310.pyc
│   │   │   │   │   │   ├── refleak.cpython-310.pyc
│   │   │   │   │   │   ├── runtest.cpython-310.pyc
│   │   │   │   │   │   ├── runtest_mp.cpython-310.pyc
│   │   │   │   │   │   ├── save_env.cpython-310.pyc
│   │   │   │   │   │   ├── setup.cpython-310.pyc
│   │   │   │   │   │   ├── utils.cpython-310.pyc
│   │   │   │   │   │   └── win_utils.cpython-310.pyc
│   │   │   │   │   ├── refleak.py
│   │   │   │   │   ├── runtest_mp.py
│   │   │   │   │   ├── runtest.py
│   │   │   │   │   ├── save_env.py
│   │   │   │   │   ├── setup.py
│   │   │   │   │   ├── utils.py
│   │   │   │   │   └── win_utils.py
│   │   │   │   ├── __main__.py
│   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   ├── ann_module2.cpython-310.pyc
│   │   │   │   │   ├── ann_module3.cpython-310.pyc
│   │   │   │   │   ├── ann_module.cpython-310.pyc
│   │   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   │   ├── __main__.cpython-310.pyc
│   │   │   │   │   ├── regrtest.cpython-310.pyc
│   │   │   │   │   └── test_support.cpython-310.pyc
│   │   │   │   ├── [01;32mregrtest.py[0m
│   │   │   │   ├── [01;34msupport[0m
│   │   │   │   │   ├── bytecode_helper.py
│   │   │   │   │   ├── hashlib_helper.py
│   │   │   │   │   ├── import_helper.py
│   │   │   │   │   ├── __init__.py
│   │   │   │   │   ├── interpreters.py
│   │   │   │   │   ├── logging_helper.py
│   │   │   │   │   ├── os_helper.py
│   │   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   │   ├── bytecode_helper.cpython-310.pyc
│   │   │   │   │   │   ├── hashlib_helper.cpython-310.pyc
│   │   │   │   │   │   ├── import_helper.cpython-310.pyc
│   │   │   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   │   │   ├── interpreters.cpython-310.pyc
│   │   │   │   │   │   ├── logging_helper.cpython-310.pyc
│   │   │   │   │   │   ├── os_helper.cpython-310.pyc
│   │   │   │   │   │   ├── script_helper.cpython-310.pyc
│   │   │   │   │   │   ├── socket_helper.cpython-310.pyc
│   │   │   │   │   │   ├── testresult.cpython-310.pyc
│   │   │   │   │   │   ├── threading_helper.cpython-310.pyc
│   │   │   │   │   │   └── warnings_helper.cpython-310.pyc
│   │   │   │   │   ├── script_helper.py
│   │   │   │   │   ├── socket_helper.py
│   │   │   │   │   ├── testresult.py
│   │   │   │   │   ├── threading_helper.py
│   │   │   │   │   └── warnings_helper.py
│   │   │   │   └── test_support.py
│   │   │   ├── textwrap.py
│   │   │   ├── this.py
│   │   │   ├── _threading_local.py
│   │   │   ├── threading.py
│   │   │   ├── [01;32mtimeit.py[0m
│   │   │   ├── tokenize.py
│   │   │   ├── token.py
│   │   │   ├── traceback.py
│   │   │   ├── tracemalloc.py
│   │   │   ├── [01;32mtrace.py[0m
│   │   │   ├── tty.py
│   │   │   ├── turtle.py
│   │   │   ├── types.py
│   │   │   ├── typing.py
│   │   │   ├── [01;34munittest[0m
│   │   │   │   ├── async_case.py
│   │   │   │   ├── case.py
│   │   │   │   ├── __init__.py
│   │   │   │   ├── loader.py
│   │   │   │   ├── _log.py
│   │   │   │   ├── __main__.py
│   │   │   │   ├── main.py
│   │   │   │   ├── mock.py
│   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   ├── async_case.cpython-310.pyc
│   │   │   │   │   ├── case.cpython-310.pyc
│   │   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   │   ├── loader.cpython-310.pyc
│   │   │   │   │   ├── _log.cpython-310.pyc
│   │   │   │   │   ├── __main__.cpython-310.pyc
│   │   │   │   │   ├── main.cpython-310.pyc
│   │   │   │   │   ├── mock.cpython-310.pyc
│   │   │   │   │   ├── result.cpython-310.pyc
│   │   │   │   │   ├── runner.cpython-310.pyc
│   │   │   │   │   ├── signals.cpython-310.pyc
│   │   │   │   │   ├── suite.cpython-310.pyc
│   │   │   │   │   └── util.cpython-310.pyc
│   │   │   │   ├── result.py
│   │   │   │   ├── runner.py
│   │   │   │   ├── signals.py
│   │   │   │   ├── suite.py
│   │   │   │   └── util.py
│   │   │   ├── [01;34murllib[0m
│   │   │   │   ├── error.py
│   │   │   │   ├── __init__.py
│   │   │   │   ├── parse.py
│   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   ├── error.cpython-310.pyc
│   │   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   │   ├── parse.cpython-310.pyc
│   │   │   │   │   ├── request.cpython-310.pyc
│   │   │   │   │   ├── response.cpython-310.pyc
│   │   │   │   │   └── robotparser.cpython-310.pyc
│   │   │   │   ├── request.py
│   │   │   │   ├── response.py
│   │   │   │   └── robotparser.py
│   │   │   ├── uuid.py
│   │   │   ├── [01;32muu.py[0m
│   │   │   ├── [01;34mvenv[0m
│   │   │   │   ├── __init__.py
│   │   │   │   ├── __main__.py
│   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   │   └── __main__.cpython-310.pyc
│   │   │   │   └── [01;34mscripts[0m
│   │   │   │       ├── [01;34mcommon[0m
│   │   │   │       │   ├── activate
│   │   │   │       │   └── Activate.ps1
│   │   │   │       └── [01;34mposix[0m
│   │   │   │           ├── activate.csh
│   │   │   │           └── activate.fish
│   │   │   ├── warnings.py
│   │   │   ├── wave.py
│   │   │   ├── weakref.py
│   │   │   ├── _weakrefset.py
│   │   │   ├── [01;32mwebbrowser.py[0m
│   │   │   ├── [01;34mwsgiref[0m
│   │   │   │   ├── handlers.py
│   │   │   │   ├── headers.py
│   │   │   │   ├── __init__.py
│   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   ├── handlers.cpython-310.pyc
│   │   │   │   │   ├── headers.cpython-310.pyc
│   │   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   │   ├── simple_server.cpython-310.pyc
│   │   │   │   │   ├── util.cpython-310.pyc
│   │   │   │   │   └── validate.cpython-310.pyc
│   │   │   │   ├── simple_server.py
│   │   │   │   ├── util.py
│   │   │   │   └── validate.py
│   │   │   ├── xdrlib.py
│   │   │   ├── [01;34mxml[0m
│   │   │   │   ├── [01;34mdom[0m
│   │   │   │   │   ├── domreg.py
│   │   │   │   │   ├── expatbuilder.py
│   │   │   │   │   ├── __init__.py
│   │   │   │   │   ├── minicompat.py
│   │   │   │   │   ├── minidom.py
│   │   │   │   │   ├── NodeFilter.py
│   │   │   │   │   ├── pulldom.py
│   │   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   │   ├── domreg.cpython-310.pyc
│   │   │   │   │   │   ├── expatbuilder.cpython-310.pyc
│   │   │   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   │   │   ├── minicompat.cpython-310.pyc
│   │   │   │   │   │   ├── minidom.cpython-310.pyc
│   │   │   │   │   │   ├── NodeFilter.cpython-310.pyc
│   │   │   │   │   │   ├── pulldom.cpython-310.pyc
│   │   │   │   │   │   └── xmlbuilder.cpython-310.pyc
│   │   │   │   │   └── xmlbuilder.py
│   │   │   │   ├── [01;34metree[0m
│   │   │   │   │   ├── cElementTree.py
│   │   │   │   │   ├── ElementInclude.py
│   │   │   │   │   ├── ElementPath.py
│   │   │   │   │   ├── ElementTree.py
│   │   │   │   │   ├── __init__.py
│   │   │   │   │   └── [01;34m__pycache__[0m
│   │   │   │   │       ├── cElementTree.cpython-310.pyc
│   │   │   │   │       ├── ElementInclude.cpython-310.pyc
│   │   │   │   │       ├── ElementPath.cpython-310.pyc
│   │   │   │   │       ├── ElementTree.cpython-310.pyc
│   │   │   │   │       └── __init__.cpython-310.pyc
│   │   │   │   ├── __init__.py
│   │   │   │   ├── [01;34mparsers[0m
│   │   │   │   │   ├── expat.py
│   │   │   │   │   ├── __init__.py
│   │   │   │   │   └── [01;34m__pycache__[0m
│   │   │   │   │       ├── expat.cpython-310.pyc
│   │   │   │   │       └── __init__.cpython-310.pyc
│   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   └── __init__.cpython-310.pyc
│   │   │   │   └── [01;34msax[0m
│   │   │   │       ├── _exceptions.py
│   │   │   │       ├── expatreader.py
│   │   │   │       ├── handler.py
│   │   │   │       ├── __init__.py
│   │   │   │       ├── [01;34m__pycache__[0m
│   │   │   │       │   ├── _exceptions.cpython-310.pyc
│   │   │   │       │   ├── expatreader.cpython-310.pyc
│   │   │   │       │   ├── handler.cpython-310.pyc
│   │   │   │       │   ├── __init__.cpython-310.pyc
│   │   │   │       │   ├── saxutils.cpython-310.pyc
│   │   │   │       │   └── xmlreader.cpython-310.pyc
│   │   │   │       ├── saxutils.py
│   │   │   │       └── xmlreader.py
│   │   │   ├── [01;34mxmlrpc[0m
│   │   │   │   ├── client.py
│   │   │   │   ├── __init__.py
│   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   ├── client.cpython-310.pyc
│   │   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   │   └── server.cpython-310.pyc
│   │   │   │   └── server.py
│   │   │   ├── zipapp.py
│   │   │   ├── zipfile.py
│   │   │   ├── zipimport.py
│   │   │   └── [01;34mzoneinfo[0m
│   │   │       ├── _common.py
│   │   │       ├── __init__.py
│   │   │       ├── [01;34m__pycache__[0m
│   │   │       │   ├── _common.cpython-310.pyc
│   │   │       │   ├── __init__.cpython-310.pyc
│   │   │       │   ├── _tzpath.cpython-310.pyc
│   │   │       │   └── _zoneinfo.cpython-310.pyc
│   │   │       ├── _tzpath.py
│   │   │       └── _zoneinfo.py
│   │   ├── [01;34msasl2[0m
│   │   ├── [01;34mssl[0m
│   │   │   ├── [01;36mcerts[0m -> [01;34m/etc/ssl/certs[0m
│   │   │   ├── [01;34mmisc[0m
│   │   │   │   ├── [01;32mCA.pl[0m
│   │   │   │   ├── [01;36mtsget[0m -> [01;32mtsget.pl[0m
│   │   │   │   └── [01;32mtsget.pl[0m
│   │   │   ├── [01;36mopenssl.cnf[0m -> /etc/ssl/openssl.cnf
│   │   │   └── [01;36mprivate[0m -> [01;34m/etc/ssl/private[0m
│   │   ├── [01;34msystemd[0m
│   │   │   ├── [01;34muser[0m
│   │   │   │   ├── dirmngr.service
│   │   │   │   ├── dirmngr.socket
│   │   │   │   ├── gpg-agent-browser.socket
│   │   │   │   ├── gpg-agent-extra.socket
│   │   │   │   ├── gpg-agent.service
│   │   │   │   ├── gpg-agent.socket
│   │   │   │   └── gpg-agent-ssh.socket
│   │   │   └── [01;34muser-environment-generators[0m
│   │   │       └── 90gpg-agent
│   │   ├── [01;34mvalgrind[0m
│   │   │   └── python3.supp
│   │   └── [01;34mx86_64-linux-gnu[0m
│   │       ├── [01;36mlibassuan.so.0[0m -> libassuan.so.0.8.5
│   │       ├── libassuan.so.0.8.5
│   │       ├── [01;36mlibbrotlicommon.so.1[0m -> libbrotlicommon.so.1.0.9
│   │       ├── libbrotlicommon.so.1.0.9
│   │       ├── [01;36mlibbrotlidec.so.1[0m -> libbrotlidec.so.1.0.9
│   │       ├── libbrotlidec.so.1.0.9
│   │       ├── [01;36mlibbrotlienc.so.1[0m -> libbrotlienc.so.1.0.9
│   │       ├── libbrotlienc.so.1.0.9
│   │       ├── [01;36mlibcurl.so.4[0m -> libcurl.so.4.7.0
│   │       ├── libcurl.so.4.7.0
│   │       ├── [01;36mlibexpat.so.1[0m -> libexpat.so.1.8.7
│   │       ├── libexpat.so.1.8.7
│   │       ├── [01;36mlibexpatw.so.1[0m -> libexpatw.so.1.8.7
│   │       ├── libexpatw.so.1.8.7
│   │       ├── [01;36mlibhistory.so.8[0m -> libhistory.so.8.1
│   │       ├── libhistory.so.8.1
│   │       ├── [01;36mlibksba.so.8[0m -> libksba.so.8.14.0
│   │       ├── libksba.so.8.14.0
│   │       ├── [01;36mliblber-2.5.so.0[0m -> liblber-2.5.so.0.1.12
│   │       ├── liblber-2.5.so.0.1.12
│   │       ├── [01;36mlibldap-2.5.so.0[0m -> libldap-2.5.so.0.1.12
│   │       ├── libldap-2.5.so.0.1.12
│   │       ├── libmpdec++.so.2.5.1
│   │       ├── libmpdec.so.2.5.1
│   │       ├── [01;36mlibmpdec++.so.3[0m -> libmpdec++.so.2.5.1
│   │       ├── [01;36mlibmpdec.so.3[0m -> libmpdec.so.2.5.1
│   │       ├── [01;36mlibnghttp2.so.14[0m -> libnghttp2.so.14.20.1
│   │       ├── libnghttp2.so.14.20.1
│   │       ├── [01;36mlibnpth.so.0[0m -> libnpth.so.0.1.2
│   │       ├── libnpth.so.0.1.2
│   │       ├── [01;36mlibpsl.so.5[0m -> libpsl.so.5.3.2
│   │       ├── libpsl.so.5.3.2
│   │       ├── [01;36mlibreadline.so.8[0m -> libreadline.so.8.1
│   │       ├── libreadline.so.8.1
│   │       ├── librtmp.so.1
│   │       ├── [01;36mlibsasl2.so.2[0m -> libsasl2.so.2.0.25
│   │       ├── libsasl2.so.2.0.25
│   │       ├── [01;36mlibsqlite3.so.0[0m -> libsqlite3.so.0.8.6
│   │       ├── libsqlite3.so.0.8.6
│   │       ├── [01;36mlibssh.so.4[0m -> libssh.so.4.8.7
│   │       ├── libssh.so.4.8.7
│   │       └── [01;34msasl2[0m
│   │           ├── [01;36mlibanonymous.so[0m -> libanonymous.so.2.0.25
│   │           ├── [01;36mlibanonymous.so.2[0m -> libanonymous.so.2.0.25
│   │           ├── libanonymous.so.2.0.25
│   │           ├── [01;36mlibcrammd5.so[0m -> libcrammd5.so.2.0.25
│   │           ├── [01;36mlibcrammd5.so.2[0m -> libcrammd5.so.2.0.25
│   │           ├── libcrammd5.so.2.0.25
│   │           ├── [01;36mlibdigestmd5.so[0m -> libdigestmd5.so.2.0.25
│   │           ├── [01;36mlibdigestmd5.so.2[0m -> libdigestmd5.so.2.0.25
│   │           ├── libdigestmd5.so.2.0.25
│   │           ├── [01;36mliblogin.so[0m -> liblogin.so.2.0.25
│   │           ├── [01;36mliblogin.so.2[0m -> liblogin.so.2.0.25
│   │           ├── liblogin.so.2.0.25
│   │           ├── [01;36mlibntlm.so[0m -> libntlm.so.2.0.25
│   │           ├── [01;36mlibntlm.so.2[0m -> libntlm.so.2.0.25
│   │           ├── libntlm.so.2.0.25
│   │           ├── [01;36mlibplain.so[0m -> libplain.so.2.0.25
│   │           ├── [01;36mlibplain.so.2[0m -> libplain.so.2.0.25
│   │           ├── libplain.so.2.0.25
│   │           ├── [01;36mlibsasldb.so[0m -> libsasldb.so.2.0.25
│   │           ├── [01;36mlibsasldb.so.2[0m -> libsasldb.so.2.0.25
│   │           ├── libsasldb.so.2.0.25
│   │           ├── [01;36mlibscram.so[0m -> libscram.so.2.0.25
│   │           ├── [01;36mlibscram.so.2[0m -> libscram.so.2.0.25
│   │           └── libscram.so.2.0.25
│   ├── [01;34mlocal[0m
│   │   ├── [01;34mlib[0m
│   │   │   └── [01;34mpython3.10[0m
│   │   │       └── [01;34mdist-packages[0m
│   │   └── [01;34mshare[0m
│   │       └── [01;34mca-certificates[0m
│   ├── [01;34msbin[0m
│   │   ├── [01;32maddgnupghome[0m
│   │   ├── [01;32mapplygnupgdefaults[0m
│   │   └── [01;32mupdate-ca-certificates[0m
│   └── [01;34mshare[0m
│       ├── [01;34mapplications[0m
│       │   └── python3.10.desktop
│       ├── [01;34mbinfmts[0m
│       │   └── python3.10
│       ├── [01;34mbug[0m
│       │   └── [01;34mmedia-types[0m
│       │       └── presubj
│       ├── [01;34mca-certificates[0m
│       │   └── [01;34mmozilla[0m
│       │       ├── ACCVRAIZ1.crt
│       │       ├── AC_RAIZ_FNMT-RCM.crt
│       │       ├── AC_RAIZ_FNMT-RCM_SERVIDORES_SEGUROS.crt
│       │       ├── Actalis_Authentication_Root_CA.crt
│       │       ├── AffirmTrust_Commercial.crt
│       │       ├── AffirmTrust_Networking.crt
│       │       ├── AffirmTrust_Premium.crt
│       │       ├── AffirmTrust_Premium_ECC.crt
│       │       ├── Amazon_Root_CA_1.crt
│       │       ├── Amazon_Root_CA_2.crt
│       │       ├── Amazon_Root_CA_3.crt
│       │       ├── Amazon_Root_CA_4.crt
│       │       ├── ANF_Secure_Server_Root_CA.crt
│       │       ├── Atos_TrustedRoot_2011.crt
│       │       ├── Autoridad_de_Certificacion_Firmaprofesional_CIF_A62634068_2.crt
│       │       ├── Autoridad_de_Certificacion_Firmaprofesional_CIF_A62634068.crt
│       │       ├── Baltimore_CyberTrust_Root.crt
│       │       ├── Buypass_Class_2_Root_CA.crt
│       │       ├── Buypass_Class_3_Root_CA.crt
│       │       ├── CA_Disig_Root_R2.crt
│       │       ├── Certainly_Root_E1.crt
│       │       ├── Certainly_Root_R1.crt
│       │       ├── Certigna.crt
│       │       ├── Certigna_Root_CA.crt
│       │       ├── certSIGN_ROOT_CA.crt
│       │       ├── certSIGN_Root_CA_G2.crt
│       │       ├── Certum_EC-384_CA.crt
│       │       ├── Certum_Trusted_Network_CA_2.crt
│       │       ├── Certum_Trusted_Network_CA.crt
│       │       ├── Certum_Trusted_Root_CA.crt
│       │       ├── CFCA_EV_ROOT.crt
│       │       ├── Comodo_AAA_Services_root.crt
│       │       ├── COMODO_Certification_Authority.crt
│       │       ├── COMODO_ECC_Certification_Authority.crt
│       │       ├── COMODO_RSA_Certification_Authority.crt
│       │       ├── DigiCert_Assured_ID_Root_CA.crt
│       │       ├── DigiCert_Assured_ID_Root_G2.crt
│       │       ├── DigiCert_Assured_ID_Root_G3.crt
│       │       ├── DigiCert_Global_Root_CA.crt
│       │       ├── DigiCert_Global_Root_G2.crt
│       │       ├── DigiCert_Global_Root_G3.crt
│       │       ├── DigiCert_High_Assurance_EV_Root_CA.crt
│       │       ├── DigiCert_TLS_ECC_P384_Root_G5.crt
│       │       ├── DigiCert_TLS_RSA4096_Root_G5.crt
│       │       ├── DigiCert_Trusted_Root_G4.crt
│       │       ├── D-TRUST_BR_Root_CA_1_2020.crt
│       │       ├── D-TRUST_EV_Root_CA_1_2020.crt
│       │       ├── D-TRUST_Root_Class_3_CA_2_2009.crt
│       │       ├── D-TRUST_Root_Class_3_CA_2_EV_2009.crt
│       │       ├── emSign_ECC_Root_CA_-_C3.crt
│       │       ├── emSign_ECC_Root_CA_-_G3.crt
│       │       ├── emSign_Root_CA_-_C1.crt
│       │       ├── emSign_Root_CA_-_G1.crt
│       │       ├── Entrust.net_Premium_2048_Secure_Server_CA.crt
│       │       ├── Entrust_Root_Certification_Authority.crt
│       │       ├── Entrust_Root_Certification_Authority_-_EC1.crt
│       │       ├── Entrust_Root_Certification_Authority_-_G2.crt
│       │       ├── Entrust_Root_Certification_Authority_-_G4.crt
│       │       ├── ePKI_Root_Certification_Authority.crt
│       │       ├── e-Szigno_Root_CA_2017.crt
│       │       ├── E-Tugra_Certification_Authority.crt
│       │       ├── E-Tugra_Global_Root_CA_ECC_v3.crt
│       │       ├── E-Tugra_Global_Root_CA_RSA_v3.crt
│       │       ├── GDCA_TrustAUTH_R5_ROOT.crt
│       │       ├── GlobalSign_ECC_Root_CA_-_R4.crt
│       │       ├── GlobalSign_ECC_Root_CA_-_R5.crt
│       │       ├── GlobalSign_Root_CA.crt
│       │       ├── GlobalSign_Root_CA_-_R3.crt
│       │       ├── GlobalSign_Root_CA_-_R6.crt
│       │       ├── GlobalSign_Root_E46.crt
│       │       ├── GlobalSign_Root_R46.crt
│       │       ├── GLOBALTRUST_2020.crt
│       │       ├── Go_Daddy_Class_2_CA.crt
│       │       ├── Go_Daddy_Root_Certificate_Authority_-_G2.crt
│       │       ├── GTS_Root_R1.crt
│       │       ├── GTS_Root_R2.crt
│       │       ├── GTS_Root_R3.crt
│       │       ├── GTS_Root_R4.crt
│       │       ├── HARICA_TLS_ECC_Root_CA_2021.crt
│       │       ├── HARICA_TLS_RSA_Root_CA_2021.crt
│       │       ├── Hellenic_Academic_and_Research_Institutions_ECC_RootCA_2015.crt
│       │       ├── Hellenic_Academic_and_Research_Institutions_RootCA_2015.crt
│       │       ├── HiPKI_Root_CA_-_G1.crt
│       │       ├── Hongkong_Post_Root_CA_1.crt
│       │       ├── Hongkong_Post_Root_CA_3.crt
│       │       ├── IdenTrust_Commercial_Root_CA_1.crt
│       │       ├── IdenTrust_Public_Sector_Root_CA_1.crt
│       │       ├── ISRG_Root_X1.crt
│       │       ├── ISRG_Root_X2.crt
│       │       ├── Izenpe.com.crt
│       │       ├── Microsec_e-Szigno_Root_CA_2009.crt
│       │       ├── Microsoft_ECC_Root_Certificate_Authority_2017.crt
│       │       ├── Microsoft_RSA_Root_Certificate_Authority_2017.crt
│       │       ├── NAVER_Global_Root_Certification_Authority.crt
│       │       ├── NetLock_Arany_=Class_Gold=_Főtanúsítvány.crt
│       │       ├── OISTE_WISeKey_Global_Root_GB_CA.crt
│       │       ├── OISTE_WISeKey_Global_Root_GC_CA.crt
│       │       ├── QuoVadis_Root_CA_1_G3.crt
│       │       ├── QuoVadis_Root_CA_2.crt
│       │       ├── QuoVadis_Root_CA_2_G3.crt
│       │       ├── QuoVadis_Root_CA_3.crt
│       │       ├── QuoVadis_Root_CA_3_G3.crt
│       │       ├── Secure_Global_CA.crt
│       │       ├── SecureSign_RootCA11.crt
│       │       ├── SecureTrust_CA.crt
│       │       ├── Security_Communication_ECC_RootCA1.crt
│       │       ├── Security_Communication_RootCA2.crt
│       │       ├── Security_Communication_RootCA3.crt
│       │       ├── Security_Communication_Root_CA.crt
│       │       ├── SSL.com_EV_Root_Certification_Authority_ECC.crt
│       │       ├── SSL.com_EV_Root_Certification_Authority_RSA_R2.crt
│       │       ├── SSL.com_Root_Certification_Authority_ECC.crt
│       │       ├── SSL.com_Root_Certification_Authority_RSA.crt
│       │       ├── Starfield_Class_2_CA.crt
│       │       ├── Starfield_Root_Certificate_Authority_-_G2.crt
│       │       ├── Starfield_Services_Root_Certificate_Authority_-_G2.crt
│       │       ├── SwissSign_Gold_CA_-_G2.crt
│       │       ├── SwissSign_Silver_CA_-_G2.crt
│       │       ├── SZAFIR_ROOT_CA2.crt
│       │       ├── Telia_Root_CA_v2.crt
│       │       ├── TeliaSonera_Root_CA_v1.crt
│       │       ├── Trustwave_Global_Certification_Authority.crt
│       │       ├── Trustwave_Global_ECC_P256_Certification_Authority.crt
│       │       ├── Trustwave_Global_ECC_P384_Certification_Authority.crt
│       │       ├── T-TeleSec_GlobalRoot_Class_2.crt
│       │       ├── T-TeleSec_GlobalRoot_Class_3.crt
│       │       ├── TUBITAK_Kamu_SM_SSL_Kok_Sertifikasi_-_Surum_1.crt
│       │       ├── TunTrust_Root_CA.crt
│       │       ├── TWCA_Global_Root_CA.crt
│       │       ├── TWCA_Root_Certification_Authority.crt
│       │       ├── UCA_Extended_Validation_Root.crt
│       │       ├── UCA_Global_G2_Root.crt
│       │       ├── USERTrust_ECC_Certification_Authority.crt
│       │       ├── USERTrust_RSA_Certification_Authority.crt
│       │       ├── vTrus_ECC_Root_CA.crt
│       │       ├── vTrus_Root_CA.crt
│       │       └── XRamp_Global_CA_Root.crt
│       ├── [01;34mdoc[0m
│       │   ├── [01;34mapt-transport-https[0m
│       │   │   ├── [40;31;01mchangelog.gz[0m -> [00m../libapt-pkg6.0/changelog.gz[0m
│       │   │   ├── copyright
│       │   │   └── [40;31;01mNEWS.Debian.gz[0m -> [00m../libapt-pkg6.0/NEWS.Debian.gz[0m
│       │   ├── [01;34mca-certificates[0m
│       │   │   ├── [01;31mchangelog.gz[0m
│       │   │   ├── copyright
│       │   │   └── [01;34mexamples[0m
│       │   │       └── [01;34mca-certificates-local[0m
│       │   │           ├── [01;34mdebian[0m
│       │   │           │   ├── copyright
│       │   │           │   └── [01;34msource[0m
│       │   │           └── [01;34mlocal[0m
│       │   ├── [01;34mcurl[0m
│       │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../libcurl4/changelog.Debian.gz[0m
│       │   │   ├── copyright
│       │   │   └── [40;31;01mNEWS.Debian.gz[0m -> [00m../libcurl4/NEWS.Debian.gz[0m
│       │   ├── [01;34mdirmngr[0m
│       │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../gpgconf/changelog.Debian.gz[0m
│       │   │   └── copyright
│       │   ├── [01;34mgnupg[0m
│       │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../dirmngr/changelog.Debian.gz[0m
│       │   │   ├── copyright
│       │   │   ├── [01;34mexamples[0m
│       │   │   │   ├── [40;31;01mpwpattern.list[0m -> [00m../../gpg-agent/examples/pwpattern.list[0m
│       │   │   │   ├── [01;34msystemd-user[0m
│       │   │   │   └── [40;31;01mtrustlist.txt[0m -> [00m../../gpg-agent/examples/trustlist.txt[0m
│       │   │   ├── [40;31;01mKEYSERVER[0m -> [00m../dirmngr/KEYSERVER[0m
│       │   │   ├── [40;31;01mNEWS.Debian.gz[0m -> [00m../gnupg-l10n/NEWS.Debian.gz[0m
│       │   │   ├── [40;31;01mNEWS.gz[0m -> [00m../dirmngr/NEWS.gz[0m
│       │   │   ├── [40;31;01mTHANKS.gz[0m -> [00m../dirmngr/THANKS.gz[0m
│       │   │   └── [40;31;01mTODO[0m -> [00m../dirmngr/TODO[0m
│       │   ├── [01;34mgnupg-l10n[0m
│       │   │   ├── [01;31mchangelog.Debian.gz[0m
│       │   │   └── copyright
│       │   ├── [01;34mgnupg-utils[0m
│       │   │   ├── [01;31mchangelog.Debian.gz[0m
│       │   │   └── copyright
│       │   ├── [01;34mgpg[0m
│       │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../gpgconf/changelog.Debian.gz[0m
│       │   │   ├── copyright
│       │   │   └── [40;31;01mNEWS.Debian.gz[0m -> [00m../gpgconf/NEWS.Debian.gz[0m
│       │   ├── [01;34mgpg-agent[0m
│       │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../gpgconf/changelog.Debian.gz[0m
│       │   │   ├── copyright
│       │   │   └── [01;34mexamples[0m
│       │   ├── [01;34mgpgconf[0m
│       │   │   ├── [01;31mchangelog.Debian.gz[0m
│       │   │   ├── copyright
│       │   │   └── [01;34mexamples[0m
│       │   ├── [01;34mgpgsm[0m
│       │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../gpgconf/changelog.Debian.gz[0m
│       │   │   ├── copyright
│       │   │   └── [40;31;01mNEWS.Debian.gz[0m -> [00m../gpgconf/NEWS.Debian.gz[0m
│       │   ├── [01;34mgpg-wks-client[0m
│       │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../dirmngr/changelog.Debian.gz[0m
│       │   │   ├── copyright
│       │   │   └── [40;31;01mNEWS.Debian.gz[0m -> [00m../gpg/NEWS.Debian.gz[0m
│       │   ├── [01;34mgpg-wks-server[0m
│       │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../gpg/changelog.Debian.gz[0m
│       │   │   ├── copyright
│       │   │   └── [40;31;01mNEWS.Debian.gz[0m -> [00m../gpg/NEWS.Debian.gz[0m
│       │   ├── [01;34mlibassuan0[0m
│       │   │   ├── [01;31mchangelog.Debian.gz[0m
│       │   │   └── copyright
│       │   ├── [01;34mlibbrotli1[0m
│       │   │   ├── [01;31mchangelog.Debian.gz[0m
│       │   │   └── copyright
│       │   ├── [01;34mlibcurl4[0m
│       │   │   ├── [01;31mchangelog.Debian.gz[0m
│       │   │   └── copyright
│       │   ├── [01;34mlibexpat1[0m
│       │   │   ├── [01;31mchangelog.Debian.gz[0m
│       │   │   └── copyright
│       │   ├── [01;34mlibksba8[0m
│       │   │   ├── [01;31mchangelog.Debian.gz[0m
│       │   │   └── copyright
│       │   ├── [01;34mlibldap-2.5-0[0m
│       │   │   ├── [01;31mchangelog.Debian.gz[0m
│       │   │   └── copyright
│       │   ├── [01;34mlibldap-common[0m
│       │   │   ├── [01;31mchangelog.Debian.gz[0m
│       │   │   └── copyright
│       │   ├── [01;34mlibmpdec3[0m
│       │   │   ├── [01;31mchangelog.Debian.gz[0m
│       │   │   └── copyright
│       │   ├── [01;34mlibnghttp2-14[0m
│       │   │   ├── [01;31mchangelog.Debian.gz[0m
│       │   │   └── copyright
│       │   ├── [01;34mlibnpth0[0m
│       │   │   ├── [01;31mchangelog.Debian.gz[0m
│       │   │   └── copyright
│       │   ├── [01;34mlibpsl5[0m
│       │   │   ├── [01;31mchangelog.Debian.gz[0m
│       │   │   └── copyright
│       │   ├── [01;34mlibpython3.10-minimal[0m
│       │   │   ├── [01;31mchangelog.Debian.gz[0m
│       │   │   └── copyright
│       │   ├── [01;36mlibpython3.10-stdlib[0m -> [01;34mlibpython3.10-minimal[0m
│       │   ├── [01;34mlibpython3-stdlib[0m
│       │   │   ├── [01;31mchangelog.Debian.gz[0m
│       │   │   └── copyright
│       │   ├── [01;34mlibreadline8[0m
│       │   │   ├── [01;31mchangelog.Debian.gz[0m
│       │   │   ├── copyright
│       │   │   └── [01;34mexamples[0m
│       │   ├── [01;34mlibrtmp1[0m
│       │   │   ├── [01;31mchangelog.Debian.gz[0m
│       │   │   └── copyright
│       │   ├── [01;34mlibsasl2-2[0m
│       │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../libsasl2-modules-db/changelog.Debian.gz[0m
│       │   │   ├── copyright
│       │   │   └── [40;31;01mNEWS.Debian.gz[0m -> [00m../libsasl2-modules-db/NEWS.Debian.gz[0m
│       │   ├── [01;34mlibsasl2-modules[0m
│       │   │   ├── [01;31mchangelog.Debian.gz[0m
│       │   │   └── copyright
│       │   ├── [01;34mlibsasl2-modules-db[0m
│       │   │   ├── [01;31mchangelog.Debian.gz[0m
│       │   │   └── copyright
│       │   ├── [01;34mlibsqlite3-0[0m
│       │   │   ├── [01;31mchangelog.Debian.gz[0m
│       │   │   └── copyright
│       │   ├── [01;34mlibssh-4[0m
│       │   │   ├── [01;31mchangelog.Debian.gz[0m
│       │   │   └── copyright
│       │   ├── [01;34mmedia-types[0m
│       │   │   ├── [01;31mchangelog.gz[0m
│       │   │   └── copyright
│       │   ├── [01;34mnode[0m
│       │   ├── [01;34mnodejs[0m
│       │   │   ├── [01;34mapi[0m
│       │   │   │   └── [01;34massets[0m
│       │   │   ├── [01;34mapi_assets[0m
│       │   │   ├── [01;31mchangelog.Debian.gz[0m
│       │   │   ├── [01;34mchangelogs[0m
│       │   │   ├── [01;34mcontributing[0m
│       │   │   │   ├── [01;34mdoc_img[0m
│       │   │   │   └── [01;34mmaintaining[0m
│       │   │   └── copyright
│       │   ├── [01;34mopenssl[0m
│       │   │   ├── [40;31;01mchangelog.Debian.gz[0m -> [00m../libssl3/changelog.Debian.gz[0m
│       │   │   ├── [40;31;01mchangelog.gz[0m -> [00m../libssl3/changelog.gz[0m
│       │   │   ├── [40;31;01mcopyright[0m -> [00m../libssl3/copyright[0m
│       │   │   └── [01;34mHOWTO[0m
│       │   ├── [01;34mpinentry-curses[0m
│       │   │   ├── [01;31mchangelog.Debian.gz[0m
│       │   │   └── copyright
│       │   ├── [01;34mpublicsuffix[0m
│       │   │   ├── [01;31mchangelog.Debian.gz[0m
│       │   │   ├── copyright
│       │   │   └── [01;34mexamples[0m
│       │   ├── [01;34mpython3[0m
│       │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../libpython3-stdlib/changelog.Debian.gz[0m
│       │   │   ├── copyright
│       │   │   └── [40;31;01mREADME.Debian[0m -> [00m../libpython3-stdlib/README.Debian[0m
│       │   ├── [01;34mpython3.10[0m
│       │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../python3.10-minimal/changelog.Debian.gz[0m
│       │   │   ├── [40;31;01mchangelog.gz[0m -> [00mNEWS.gz[0m
│       │   │   ├── copyright
│       │   │   └── [40;31;01mpython-policy.txt.gz[0m -> [00m../python3/python-policy.txt.gz[0m
│       │   ├── [01;34mpython3.10-minimal[0m
│       │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../libpython3.10-minimal/changelog.Debian.gz[0m
│       │   │   └── copyright
│       │   ├── [01;34mpython3-minimal[0m
│       │   │   ├── [01;31mchangelog.Debian.gz[0m
│       │   │   └── copyright
│       │   └── [01;34mreadline-common[0m
│       │       ├── [01;31mchangelog.Debian.gz[0m
│       │       └── copyright
│       ├── [01;34mgnupg[0m
│       │   ├── distsigkey.gpg
│       │   ├── help.be.txt
│       │   ├── help.ca.txt
│       │   ├── help.cs.txt
│       │   ├── help.da.txt
│       │   ├── help.de.txt
│       │   ├── help.el.txt
│       │   ├── help.eo.txt
│       │   ├── help.es.txt
│       │   ├── help.et.txt
│       │   ├── help.fi.txt
│       │   ├── help.fr.txt
│       │   ├── help.gl.txt
│       │   ├── help.hu.txt
│       │   ├── help.id.txt
│       │   ├── help.it.txt
│       │   ├── help.ja.txt
│       │   ├── help.nb.txt
│       │   ├── help.pl.txt
│       │   ├── help.pt_BR.txt
│       │   ├── help.pt.txt
│       │   ├── help.ro.txt
│       │   ├── help.ru.txt
│       │   ├── help.sk.txt
│       │   ├── help.sv.txt
│       │   ├── help.tr.txt
│       │   ├── help.txt
│       │   ├── help.zh_CN.txt
│       │   ├── help.zh_TW.txt
│       │   └── sks-keyservers.netCA.pem
│       ├── [01;34minfo[0m
│       │   ├── [01;35mgnupg-card-architecture.png[0m
│       │   ├── [01;31mgnupg.info-1.gz[0m
│       │   ├── [01;31mgnupg.info-2.gz[0m
│       │   ├── [01;31mgnupg.info.gz[0m
│       │   ├── [01;35mgnupg-module-overview.png[0m
│       │   └── [01;31mrluserman.info.gz[0m
│       ├── [01;34mkeyrings[0m
│       │   └── nodesource.gpg
│       ├── [01;34mlintian[0m
│       │   └── [01;34moverrides[0m
│       │       ├── gnupg-l10n
│       │       ├── gpg-agent
│       │       ├── gpg-wks-client
│       │       ├── libbrotli1
│       │       ├── libldap-2.5-0
│       │       ├── libpython3.10-minimal
│       │       ├── libpython3.10-stdlib
│       │       ├── libsasl2-modules
│       │       ├── libssh-4
│       │       ├── openssl
│       │       ├── python3
│       │       ├── python3.10
│       │       ├── python3.10-minimal
│       │       └── readline-common
│       ├── [01;34mpixmaps[0m
│       │   ├── [01;35mpython3.10.xpm[0m
│       │   └── [01;36mpython3.xpm[0m -> [01;35mpython3.10.xpm[0m
│       ├── [01;34mpublicsuffix[0m
│       │   ├── [01;36meffective_tld_names.dat[0m -> public_suffix_list.dat
│       │   ├── public_suffix_list.dafsa
│       │   └── public_suffix_list.dat
│       ├── [01;34mpython3[0m
│       │   ├── debian_defaults
│       │   ├── [01;34mdebpython[0m
│       │   │   ├── files.py
│       │   │   ├── __init__.py
│       │   │   ├── interpreter.py
│       │   │   ├── option.py
│       │   │   ├── [01;34m__pycache__[0m
│       │   │   │   ├── files.cpython-310.pyc
│       │   │   │   ├── __init__.cpython-310.pyc
│       │   │   │   ├── interpreter.cpython-310.pyc
│       │   │   │   ├── option.cpython-310.pyc
│       │   │   │   └── version.cpython-310.pyc
│       │   │   └── version.py
│       │   ├── [01;32mpy3versions.py[0m
│       │   ├── [01;34m__pycache__[0m
│       │   │   └── py3versions.cpython-310.pyc
│       │   ├── python.mk
│       │   └── [01;34mruntime.d[0m
│       │       ├── [01;32mpublic_modules.rtinstall[0m
│       │       └── [01;32mpublic_modules.rtremove[0m
│       ├── [01;34mreadline[0m
│       │   └── inputrc
│       └── [01;34mzsh[0m
│           └── [01;34mvendor-completions[0m
│               └── _curl
└── [01;34mvar[0m
    ├── [01;34mcache[0m
    │   ├── [01;34mapt[0m
    │   │   └── [01;34marchives[0m
    │   │       ├── lock
    │   │       └── [01;34mpartial[0m
    │   ├── [01;34mdebconf[0m
    │   │   ├── config.dat
    │   │   ├── config.dat-old
    │   │   ├── passwords.dat
    │   │   ├── templates.dat
    │   │   └── templates.dat-old
    │   └── [01;34mldconfig[0m
    │       └── aux-cache
    ├── [01;34mlib[0m
    │   ├── [01;34mapt[0m
    │   │   ├── extended_states
    │   │   └── [01;34mlists[0m
    │   │       ├── archive.ubuntu.com_ubuntu_dists_jammy-backports_InRelease
    │   │       ├── [01;31marchive.ubuntu.com_ubuntu_dists_jammy-backports_main_binary-amd64_Packages.lz4[0m
    │   │       ├── [01;31marchive.ubuntu.com_ubuntu_dists_jammy-backports_universe_binary-amd64_Packages.lz4[0m
    │   │       ├── archive.ubuntu.com_ubuntu_dists_jammy_InRelease
    │   │       ├── [01;31marchive.ubuntu.com_ubuntu_dists_jammy_main_binary-amd64_Packages.lz4[0m
    │   │       ├── [01;31marchive.ubuntu.com_ubuntu_dists_jammy_multiverse_binary-amd64_Packages.lz4[0m
    │   │       ├── [01;31marchive.ubuntu.com_ubuntu_dists_jammy_restricted_binary-amd64_Packages.lz4[0m
    │   │       ├── [01;31marchive.ubuntu.com_ubuntu_dists_jammy_universe_binary-amd64_Packages.lz4[0m
    │   │       ├── archive.ubuntu.com_ubuntu_dists_jammy-updates_InRelease
    │   │       ├── [01;31marchive.ubuntu.com_ubuntu_dists_jammy-updates_main_binary-amd64_Packages.lz4[0m
    │   │       ├── [01;31marchive.ubuntu.com_ubuntu_dists_jammy-updates_multiverse_binary-amd64_Packages.lz4[0m
    │   │       ├── [01;31marchive.ubuntu.com_ubuntu_dists_jammy-updates_restricted_binary-amd64_Packages.lz4[0m
    │   │       ├── [01;31marchive.ubuntu.com_ubuntu_dists_jammy-updates_universe_binary-amd64_Packages.lz4[0m
    │   │       ├── [01;34mauxfiles[0m
    │   │       ├── deb.nodesource.com_node%5f22.x_dists_nodistro_InRelease
    │   │       ├── [01;31mdeb.nodesource.com_node%5f22.x_dists_nodistro_main_binary-amd64_Packages.lz4[0m
    │   │       ├── lock
    │   │       ├── [01;34mpartial[0m
    │   │       ├── security.ubuntu.com_ubuntu_dists_jammy-security_InRelease
    │   │       ├── [01;31msecurity.ubuntu.com_ubuntu_dists_jammy-security_main_binary-amd64_Packages.lz4[0m
    │   │       ├── [01;31msecurity.ubuntu.com_ubuntu_dists_jammy-security_multiverse_binary-amd64_Packages.lz4[0m
    │   │       ├── [01;31msecurity.ubuntu.com_ubuntu_dists_jammy-security_restricted_binary-amd64_Packages.lz4[0m
    │   │       └── [01;31msecurity.ubuntu.com_ubuntu_dists_jammy-security_universe_binary-amd64_Packages.lz4[0m
    │   ├── [01;34mdpkg[0m
    │   │   ├── [01;34malternatives[0m
    │   │   │   ├── nodejs
    │   │   │   └── pinentry
    │   │   ├── [01;34minfo[0m
    │   │   │   ├── apt-transport-https.list
    │   │   │   ├── apt-transport-https.md5sums
    │   │   │   ├── [01;32mca-certificates.config[0m
    │   │   │   ├── ca-certificates.list
    │   │   │   ├── ca-certificates.md5sums
    │   │   │   ├── [01;32mca-certificates.postinst[0m
    │   │   │   ├── [01;32mca-certificates.postrm[0m
    │   │   │   ├── ca-certificates.templates
    │   │   │   ├── ca-certificates.triggers
    │   │   │   ├── curl.list
    │   │   │   ├── curl.md5sums
    │   │   │   ├── dirmngr.list
    │   │   │   ├── dirmngr.md5sums
    │   │   │   ├── [01;32mdirmngr.postinst[0m
    │   │   │   ├── [01;32mdirmngr.postrm[0m
    │   │   │   ├── [01;32mdirmngr.preinst[0m
    │   │   │   ├── [01;32mdirmngr.prerm[0m
    │   │   │   ├── gnupg-l10n.list
    │   │   │   ├── gnupg-l10n.md5sums
    │   │   │   ├── gnupg.list
    │   │   │   ├── gnupg.md5sums
    │   │   │   ├── gnupg-utils.list
    │   │   │   ├── gnupg-utils.md5sums
    │   │   │   ├── gpg-agent.conffiles
    │   │   │   ├── gpg-agent.list
    │   │   │   ├── gpg-agent.md5sums
    │   │   │   ├── [01;32mgpg-agent.postinst[0m
    │   │   │   ├── [01;32mgpg-agent.postrm[0m
    │   │   │   ├── gpgconf.list
    │   │   │   ├── gpgconf.md5sums
    │   │   │   ├── gpg.list
    │   │   │   ├── gpg.md5sums
    │   │   │   ├── gpgsm.list
    │   │   │   ├── gpgsm.md5sums
    │   │   │   ├── gpg-wks-client.list
    │   │   │   ├── gpg-wks-client.md5sums
    │   │   │   ├── gpg-wks-server.list
    │   │   │   ├── gpg-wks-server.md5sums
    │   │   │   ├── libassuan0:amd64.list
    │   │   │   ├── libassuan0:amd64.md5sums
    │   │   │   ├── libassuan0:amd64.shlibs
    │   │   │   ├── libassuan0:amd64.symbols
    │   │   │   ├── libassuan0:amd64.triggers
    │   │   │   ├── libbrotli1:amd64.list
    │   │   │   ├── libbrotli1:amd64.md5sums
    │   │   │   ├── libbrotli1:amd64.shlibs
    │   │   │   ├── libbrotli1:amd64.symbols
    │   │   │   ├── libbrotli1:amd64.triggers
    │   │   │   ├── libcurl4:amd64.list
    │   │   │   ├── libcurl4:amd64.md5sums
    │   │   │   ├── libcurl4:amd64.shlibs
    │   │   │   ├── libcurl4:amd64.symbols
    │   │   │   ├── libcurl4:amd64.triggers
    │   │   │   ├── libexpat1:amd64.list
    │   │   │   ├── libexpat1:amd64.md5sums
    │   │   │   ├── libexpat1:amd64.shlibs
    │   │   │   ├── libexpat1:amd64.symbols
    │   │   │   ├── libexpat1:amd64.triggers
    │   │   │   ├── libksba8:amd64.list
    │   │   │   ├── libksba8:amd64.md5sums
    │   │   │   ├── libksba8:amd64.shlibs
    │   │   │   ├── libksba8:amd64.symbols
    │   │   │   ├── libksba8:amd64.triggers
    │   │   │   ├── libldap-2.5-0:amd64.list
    │   │   │   ├── libldap-2.5-0:amd64.md5sums
    │   │   │   ├── libldap-2.5-0:amd64.shlibs
    │   │   │   ├── libldap-2.5-0:amd64.symbols
    │   │   │   ├── libldap-2.5-0:amd64.triggers
    │   │   │   ├── libldap-common.conffiles
    │   │   │   ├── libldap-common.list
    │   │   │   ├── libldap-common.md5sums
    │   │   │   ├── libmpdec3:amd64.list
    │   │   │   ├── libmpdec3:amd64.md5sums
    │   │   │   ├── libmpdec3:amd64.shlibs
    │   │   │   ├── libmpdec3:amd64.symbols
    │   │   │   ├── libmpdec3:amd64.triggers
    │   │   │   ├── libnghttp2-14:amd64.list
    │   │   │   ├── libnghttp2-14:amd64.md5sums
    │   │   │   ├── libnghttp2-14:amd64.shlibs
    │   │   │   ├── libnghttp2-14:amd64.symbols
    │   │   │   ├── libnghttp2-14:amd64.triggers
    │   │   │   ├── libnpth0:amd64.list
    │   │   │   ├── libnpth0:amd64.md5sums
    │   │   │   ├── libnpth0:amd64.shlibs
    │   │   │   ├── libnpth0:amd64.symbols
    │   │   │   ├── libnpth0:amd64.triggers
    │   │   │   ├── libpsl5:amd64.list
    │   │   │   ├── libpsl5:amd64.md5sums
    │   │   │   ├── libpsl5:amd64.shlibs
    │   │   │   ├── libpsl5:amd64.symbols
    │   │   │   ├── libpsl5:amd64.triggers
    │   │   │   ├── libpython3.10-minimal:amd64.conffiles
    │   │   │   ├── libpython3.10-minimal:amd64.list
    │   │   │   ├── libpython3.10-minimal:amd64.md5sums
    │   │   │   ├── [01;32mlibpython3.10-minimal:amd64.postinst[0m
    │   │   │   ├── [01;32mlibpython3.10-minimal:amd64.postrm[0m
    │   │   │   ├── [01;32mlibpython3.10-minimal:amd64.prerm[0m
    │   │   │   ├── libpython3.10-stdlib:amd64.list
    │   │   │   ├── libpython3.10-stdlib:amd64.md5sums
    │   │   │   ├── [01;32mlibpython3.10-stdlib:amd64.prerm[0m
    │   │   │   ├── libpython3-stdlib:amd64.list
    │   │   │   ├── libpython3-stdlib:amd64.md5sums
    │   │   │   ├── libreadline8:amd64.list
    │   │   │   ├── libreadline8:amd64.md5sums
    │   │   │   ├── libreadline8:amd64.shlibs
    │   │   │   ├── libreadline8:amd64.symbols
    │   │   │   ├── libreadline8:amd64.triggers
    │   │   │   ├── librtmp1:amd64.list
    │   │   │   ├── librtmp1:amd64.md5sums
    │   │   │   ├── librtmp1:amd64.shlibs
    │   │   │   ├── librtmp1:amd64.symbols
    │   │   │   ├── librtmp1:amd64.triggers
    │   │   │   ├── libsasl2-2:amd64.list
    │   │   │   ├── libsasl2-2:amd64.md5sums
    │   │   │   ├── libsasl2-2:amd64.shlibs
    │   │   │   ├── libsasl2-2:amd64.triggers
    │   │   │   ├── libsasl2-modules:amd64.conffiles
    │   │   │   ├── libsasl2-modules:amd64.list
    │   │   │   ├── libsasl2-modules:amd64.md5sums
    │   │   │   ├── [01;32mlibsasl2-modules:amd64.postinst[0m
    │   │   │   ├── libsasl2-modules-db:amd64.list
    │   │   │   ├── libsasl2-modules-db:amd64.md5sums
    │   │   │   ├── libsqlite3-0:amd64.list
    │   │   │   ├── libsqlite3-0:amd64.md5sums
    │   │   │   ├── libsqlite3-0:amd64.shlibs
    │   │   │   ├── libsqlite3-0:amd64.symbols
    │   │   │   ├── libsqlite3-0:amd64.triggers
    │   │   │   ├── libssh-4:amd64.list
    │   │   │   ├── libssh-4:amd64.md5sums
    │   │   │   ├── libssh-4:amd64.shlibs
    │   │   │   ├── libssh-4:amd64.symbols
    │   │   │   ├── libssh-4:amd64.triggers
    │   │   │   ├── media-types.conffiles
    │   │   │   ├── media-types.list
    │   │   │   ├── media-types.md5sums
    │   │   │   ├── nodejs.list
    │   │   │   ├── nodejs.md5sums
    │   │   │   ├── [01;32mnodejs.postinst[0m
    │   │   │   ├── [01;32mnodejs.preinst[0m
    │   │   │   ├── [01;32mnodejs.prerm[0m
    │   │   │   ├── openssl.conffiles
    │   │   │   ├── openssl.list
    │   │   │   ├── openssl.md5sums
    │   │   │   ├── [01;32mopenssl.postinst[0m
    │   │   │   ├── pinentry-curses.list
    │   │   │   ├── pinentry-curses.md5sums
    │   │   │   ├── [01;32mpinentry-curses.postinst[0m
    │   │   │   ├── [01;32mpinentry-curses.prerm[0m
    │   │   │   ├── publicsuffix.list
    │   │   │   ├── publicsuffix.md5sums
    │   │   │   ├── python3.10.list
    │   │   │   ├── python3.10.md5sums
    │   │   │   ├── python3.10-minimal.list
    │   │   │   ├── python3.10-minimal.md5sums
    │   │   │   ├── [01;32mpython3.10-minimal.postinst[0m
    │   │   │   ├── [01;32mpython3.10-minimal.postrm[0m
    │   │   │   ├── [01;32mpython3.10-minimal.preinst[0m
    │   │   │   ├── [01;32mpython3.10-minimal.prerm[0m
    │   │   │   ├── [01;32mpython3.10.postinst[0m
    │   │   │   ├── [01;32mpython3.10.prerm[0m
    │   │   │   ├── python3.list
    │   │   │   ├── python3.md5sums
    │   │   │   ├── python3-minimal.list
    │   │   │   ├── python3-minimal.md5sums
    │   │   │   ├── [01;32mpython3-minimal.postinst[0m
    │   │   │   ├── [01;32mpython3-minimal.prerm[0m
    │   │   │   ├── [01;32mpython3.postinst[0m
    │   │   │   ├── [01;32mpython3.postrm[0m
    │   │   │   ├── [01;32mpython3.preinst[0m
    │   │   │   ├── [01;32mpython3.prerm[0m
    │   │   │   ├── readline-common.list
    │   │   │   ├── readline-common.md5sums
    │   │   │   ├── [01;32mreadline-common.postinst[0m
    │   │   │   └── [01;32mreadline-common.postrm[0m
    │   │   ├── lock
    │   │   ├── lock-frontend
    │   │   ├── status
    │   │   ├── status-old
    │   │   ├── [01;34mtriggers[0m
    │   │   │   ├── Lock
    │   │   │   ├── Unincorp
    │   │   │   ├── update-ca-certificates
    │   │   │   └── update-ca-certificates-fresh
    │   │   └── [01;34mupdates[0m
    │   ├── [01;34mpython[0m
    │   │   └── python3.10_installed
    │   └── [01;34msystemd[0m
    │       └── [01;34mdeb-systemd-user-helper-enabled[0m
    │           ├── dirmngr.socket.dsh-also
    │           ├── gpg-agent-browser.socket.dsh-also
    │           ├── gpg-agent-extra.socket.dsh-also
    │           ├── gpg-agent.socket.dsh-also
    │           ├── gpg-agent-ssh.socket.dsh-also
    │           └── [01;34msockets.target.wants[0m
    │               ├── dirmngr.socket
    │               ├── gpg-agent-browser.socket
    │               ├── gpg-agent-extra.socket
    │               ├── gpg-agent.socket
    │               └── gpg-agent-ssh.socket
    └── [01;34mlog[0m
        ├── alternatives.log
        ├── [01;34mapt[0m
        │   ├── [01;31meipp.log.xz[0m
        │   ├── history.log
        │   └── term.log
        └── dpkg.log

1264 directories, 6097 files
```

- *Para explorar el contenido del cuarto directorio (`/var/lib/docker/overlay2/043387975c35001ef7b631d7ad09d104fcb9b7970b5b3a38042167dd0c65a764/diff`), que representa la primera capa de la imagen Docker `00-App-nodejs-v4`, vamos a revisar su estructura y contenido utilizando comandos específicos en la línea de comandos. A continuación, detallo cómo hacerlo:*

**Que seria esto:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# las imagenes ya vienen actualizadas normalmente por eso no es necesario poner `apt upgrade`
FROM ubuntu:22.04
```

```bash
su root
```

**Acceder al directorio de la primera capa:**

```bash
cd /var/lib/docker/overlay2/043387975c35001ef7b631d7ad09d104fcb9b7970b5b3a38042167dd0c65a764/diff
```

**Listar el contenido del directorio detalladamente:**

- *Este comando mostrará todos los ficheros y directorios presentes en el directorio especificado (`/var/lib/docker/overlay2/043387975c35001ef7b631d7ad09d104fcb9b7970b5b3a38042167dd0c65a764/diff`), con detalles como permisos, propietario, tamaño y fecha de modificación.*

```bash
lsd -la
drwxr-xr-x root root 4.0 KB Sat Jun  1 10:42:51 2024  .
drwx--x--- root root 4.0 KB Fri Jun  7 16:19:02 2024  ..
lrwxrwxrwx root root   7 B  Fri Apr 26 20:02:34 2024  bin ⇒ usr/bin
drwxr-xr-x root root 4.0 KB Mon Apr 18 04:28:59 2022  boot
drwxr-xr-x root root 4.0 KB Fri Apr 26 20:05:59 2024  dev
drwxr-xr-x root root 4.0 KB Fri Apr 26 20:05:59 2024  etc
drwxr-xr-x root root 4.0 KB Mon Apr 18 04:28:59 2022  home
lrwxrwxrwx root root   7 B  Fri Apr 26 20:02:34 2024  lib ⇒ usr/lib
lrwxrwxrwx root root   9 B  Fri Apr 26 20:02:34 2024  lib32 ⇒ usr/lib32
lrwxrwxrwx root root   9 B  Fri Apr 26 20:02:34 2024  lib64 ⇒ usr/lib64
lrwxrwxrwx root root  10 B  Fri Apr 26 20:02:34 2024  libx32 ⇒ usr/libx32
drwxr-xr-x root root 4.0 KB Fri Apr 26 20:02:35 2024  media
drwxr-xr-x root root 4.0 KB Fri Apr 26 20:02:35 2024  mnt
drwxr-xr-x root root 4.0 KB Fri Apr 26 20:02:35 2024  opt
drwxr-xr-x root root 4.0 KB Mon Apr 18 04:28:59 2022  proc
drwx------ root root 4.0 KB Fri Apr 26 20:05:54 2024 󰉐 root
drwxr-xr-x root root 4.0 KB Fri Apr 26 20:05:59 2024  run
lrwxrwxrwx root root   8 B  Fri Apr 26 20:02:34 2024  sbin ⇒ usr/sbin
drwxr-xr-x root root 4.0 KB Fri Apr 26 20:02:35 2024  srv
drwxr-xr-x root root 4.0 KB Mon Apr 18 04:28:59 2022  sys
drwxrwxrwt root root 4.0 KB Fri Apr 26 20:05:55 2024  tmp
drwxr-xr-x root root 4.0 KB Fri Apr 26 20:02:35 2024  usr
drwxr-xr-x root root 4.0 KB Fri Apr 26 20:05:54 2024  var
```

**Mostrar la estructura del directorio de manera más visual:**

- *Para visualizar la estructura de directorios de forma más clara y jerárquica, utilizaremos el comando tree. Asegúrate de tenerlo instalado, ya que no viene por defecto en todas las distribuciones Linux.*

- *Este comando desplegará la estructura de directorios comenzando desde el directorio actual (`.`), mostrando ficheros y subdirectorios de manera indentada y organizada.*

```bash
tree -C .
[01;34m.[0m
├── [01;36mbin[0m -> [01;34musr/bin[0m
├── [01;34mboot[0m
├── [01;34mdev[0m
├── [01;34metc[0m
│   ├── adduser.conf
│   ├── [01;34malternatives[0m
│   │   ├── [01;36mawk[0m -> [01;32m/usr/bin/mawk[0m
│   │   ├── [01;36mnawk[0m -> [01;32m/usr/bin/mawk[0m
│   │   ├── [01;36mpager[0m -> [01;32m/bin/more[0m
│   │   ├── README
│   │   ├── [01;36mrmt[0m -> [01;32m/usr/sbin/rmt-tar[0m
│   │   └── [01;36mwhich[0m -> [01;32m/usr/bin/which.debianutils[0m
│   ├── [01;34mapt[0m
│   │   ├── [01;34mapt.conf.d[0m
│   │   │   ├── 01autoremove
│   │   │   ├── 01-vendor-ubuntu
│   │   │   ├── 70debconf
│   │   │   ├── docker-autoremove-suggests
│   │   │   ├── docker-clean
│   │   │   ├── docker-disable-periodic-update
│   │   │   ├── docker-gzip-indexes
│   │   │   └── docker-no-languages
│   │   ├── [01;34mauth.conf.d[0m
│   │   ├── [01;34mkeyrings[0m
│   │   ├── [01;34mpreferences.d[0m
│   │   ├── sources.list
│   │   ├── [01;34msources.list.d[0m
│   │   └── [01;34mtrusted.gpg.d[0m
│   │       ├── ubuntu-keyring-2012-cdimage.gpg
│   │       └── ubuntu-keyring-2018-archive.gpg
│   ├── bash.bashrc
│   ├── bindresvport.blacklist
│   ├── [01;34mcloud[0m
│   │   └── build.info
│   ├── [01;34mcron.d[0m
│   │   └── e2scrub_all
│   ├── [01;34mcron.daily[0m
│   │   ├── [01;32mapt-compat[0m
│   │   └── [01;32mdpkg[0m
│   ├── debconf.conf
│   ├── debian_version
│   ├── [01;34mdefault[0m
│   │   └── useradd
│   ├── deluser.conf
│   ├── [01;34mdpkg[0m
│   │   ├── dpkg.cfg
│   │   ├── [01;34mdpkg.cfg.d[0m
│   │   │   ├── docker-apt-speedup
│   │   │   └── excludes
│   │   └── [01;34morigins[0m
│   │       ├── debian
│   │       ├── [01;36mdefault[0m -> ubuntu
│   │       └── ubuntu
│   ├── e2scrub.conf
│   ├── environment
│   ├── fstab
│   ├── gai.conf
│   ├── group
│   ├── gshadow
│   ├── [01;34mgss[0m
│   │   └── [01;34mmech.d[0m
│   ├── host.conf
│   ├── hostname
│   ├── hosts
│   ├── [01;34minit.d[0m
│   │   ├── [01;32mhwclock.sh[0m
│   │   └── [01;32mprocps[0m
│   ├── issue
│   ├── issue.net
│   ├── [01;34mkernel[0m
│   │   └── [01;34mpostinst.d[0m
│   ├── ld.so.cache
│   ├── ld.so.conf
│   ├── [01;34mld.so.conf.d[0m
│   │   ├── libc.conf
│   │   └── x86_64-linux-gnu.conf
│   ├── legal
│   ├── libaudit.conf
│   ├── login.defs
│   ├── [01;34mlogrotate.d[0m
│   │   ├── alternatives
│   │   ├── apt
│   │   └── dpkg
│   ├── lsb-release
│   ├── machine-id
│   ├── mke2fs.conf
│   ├── netconfig
│   ├── networks
│   ├── nsswitch.conf
│   ├── [01;34mopt[0m
│   ├── [01;36mos-release[0m -> ../usr/lib/os-release
│   ├── pam.conf
│   ├── [01;34mpam.d[0m
│   │   ├── chfn
│   │   ├── chpasswd
│   │   ├── chsh
│   │   ├── common-account
│   │   ├── common-auth
│   │   ├── common-password
│   │   ├── common-session
│   │   ├── common-session-noninteractive
│   │   ├── login
│   │   ├── newusers
│   │   ├── other
│   │   ├── passwd
│   │   ├── runuser
│   │   ├── runuser-l
│   │   ├── su
│   │   └── su-l
│   ├── passwd
│   ├── profile
│   ├── [01;34mprofile.d[0m
│   │   └── 01-locale-fix.sh
│   ├── [01;34mrc0.d[0m
│   ├── [01;34mrc1.d[0m
│   ├── [01;34mrc2.d[0m
│   ├── [01;34mrc3.d[0m
│   ├── [01;34mrc4.d[0m
│   ├── [01;34mrc5.d[0m
│   ├── [01;34mrc6.d[0m
│   ├── [01;34mrcS.d[0m
│   │   └── [01;36mS01procps[0m -> [01;32m../init.d/procps[0m
│   ├── resolv.conf
│   ├── [01;36mrmt[0m -> [01;32m/usr/sbin/rmt[0m
│   ├── [01;34msecurity[0m
│   │   ├── access.conf
│   │   ├── faillock.conf
│   │   ├── group.conf
│   │   ├── limits.conf
│   │   ├── [01;34mlimits.d[0m
│   │   ├── namespace.conf
│   │   ├── [01;34mnamespace.d[0m
│   │   ├── [01;32mnamespace.init[0m
│   │   ├── opasswd
│   │   ├── pam_env.conf
│   │   ├── sepermit.conf
│   │   └── time.conf
│   ├── [01;34mselinux[0m
│   │   └── semanage.conf
│   ├── shadow
│   ├── shells
│   ├── [01;34mskel[0m
│   ├── subgid
│   ├── subuid
│   ├── sysctl.conf
│   ├── [01;34msysctl.d[0m
│   │   ├── 10-console-messages.conf
│   │   ├── 10-ipv6-privacy.conf
│   │   ├── 10-kernel-hardening.conf
│   │   ├── 10-magic-sysrq.conf
│   │   ├── 10-network-security.conf
│   │   ├── 10-ptrace.conf
│   │   ├── 10-zeropage.conf
│   │   └── README.sysctl
│   ├── [01;34msystemd[0m
│   │   ├── [01;34msystem[0m
│   │   │   ├── [01;34mmulti-user.target.wants[0m
│   │   │   │   └── [01;36me2scrub_reap.service[0m -> /lib/systemd/system/e2scrub_reap.service
│   │   │   └── [01;34mtimers.target.wants[0m
│   │   │       ├── [01;36mapt-daily.timer[0m -> /lib/systemd/system/apt-daily.timer
│   │   │       ├── [01;36mapt-daily-upgrade.timer[0m -> /lib/systemd/system/apt-daily-upgrade.timer
│   │   │       ├── [01;36mdpkg-db-backup.timer[0m -> /lib/systemd/system/dpkg-db-backup.timer
│   │   │       ├── [01;36me2scrub_all.timer[0m -> /lib/systemd/system/e2scrub_all.timer
│   │   │       ├── [01;36mfstrim.timer[0m -> /lib/systemd/system/fstrim.timer
│   │   │       └── [01;36mmotd-news.timer[0m -> /lib/systemd/system/motd-news.timer
│   │   └── [01;34muser[0m
│   ├── [01;34mterminfo[0m
│   │   └── README
│   ├── [01;34mupdate-motd.d[0m
│   │   ├── [01;32m00-header[0m
│   │   ├── [01;32m10-help-text[0m
│   │   ├── [01;32m50-motd-news[0m
│   │   └── [01;32m60-unminimize[0m
│   └── xattr.conf
├── [01;34mhome[0m
├── [01;36mlib[0m -> [01;34musr/lib[0m
├── [01;36mlib32[0m -> [01;34musr/lib32[0m
├── [01;36mlib64[0m -> [01;34musr/lib64[0m
├── [01;36mlibx32[0m -> [01;34musr/libx32[0m
├── [01;34mmedia[0m
├── [01;34mmnt[0m
├── [01;34mopt[0m
├── [01;34mproc[0m
├── [01;34mroot[0m
├── [01;34mrun[0m
│   ├── [30;42mlock[0m
│   ├── [01;34mmount[0m
│   └── [01;34msystemd[0m
│       └── container
├── [01;36msbin[0m -> [01;34musr/sbin[0m
├── [01;34msrv[0m
├── [01;34msys[0m
├── [30;42mtmp[0m
├── [01;34musr[0m
│   ├── [01;34mbin[0m
│   │   ├── [01;32m[[0m
│   │   ├── [01;32maddpart[0m
│   │   ├── [01;32mapt[0m
│   │   ├── [01;32mapt-cache[0m
│   │   ├── [01;32mapt-cdrom[0m
│   │   ├── [01;32mapt-config[0m
│   │   ├── [01;32mapt-get[0m
│   │   ├── [01;32mapt-key[0m
│   │   ├── [01;32mapt-mark[0m
│   │   ├── [01;32march[0m
│   │   ├── [01;36mawk[0m -> [01;32m/etc/alternatives/awk[0m
│   │   ├── [01;32mb2sum[0m
│   │   ├── [01;32mbase32[0m
│   │   ├── [01;32mbase64[0m
│   │   ├── [01;32mbasename[0m
│   │   ├── [01;32mbasenc[0m
│   │   ├── [01;32mbash[0m
│   │   ├── [01;32mbashbug[0m
│   │   ├── [01;36mcaptoinfo[0m -> [01;32mtic[0m
│   │   ├── [01;32mcat[0m
│   │   ├── [30;43mchage[0m
│   │   ├── [01;32mchattr[0m
│   │   ├── [01;32mchcon[0m
│   │   ├── [37;41mchfn[0m
│   │   ├── [01;32mchgrp[0m
│   │   ├── [01;32mchmod[0m
│   │   ├── [01;32mchoom[0m
│   │   ├── [01;32mchown[0m
│   │   ├── [01;32mchrt[0m
│   │   ├── [37;41mchsh[0m
│   │   ├── [01;32mcksum[0m
│   │   ├── [01;32mclear[0m
│   │   ├── [01;32mclear_console[0m
│   │   ├── [01;32mcmp[0m
│   │   ├── [01;32mcomm[0m
│   │   ├── [01;32mcp[0m
│   │   ├── [01;32mcsplit[0m
│   │   ├── [01;32mcut[0m
│   │   ├── [01;32mdash[0m
│   │   ├── [01;32mdate[0m
│   │   ├── [01;32mdd[0m
│   │   ├── [01;32mdebconf[0m
│   │   ├── [01;32mdebconf-apt-progress[0m
│   │   ├── [01;32mdebconf-communicate[0m
│   │   ├── [01;32mdebconf-copydb[0m
│   │   ├── [01;32mdebconf-escape[0m
│   │   ├── [01;32mdebconf-set-selections[0m
│   │   ├── [01;32mdebconf-show[0m
│   │   ├── [01;32mdeb-systemd-helper[0m
│   │   ├── [01;32mdeb-systemd-invoke[0m
│   │   ├── [01;32mdelpart[0m
│   │   ├── [01;32mdf[0m
│   │   ├── [01;32mdiff[0m
│   │   ├── [01;32mdiff3[0m
│   │   ├── [01;32mdir[0m
│   │   ├── [01;32mdircolors[0m
│   │   ├── [01;32mdirname[0m
│   │   ├── [01;32mdmesg[0m
│   │   ├── [01;36mdnsdomainname[0m -> [01;32mhostname[0m
│   │   ├── [01;36mdomainname[0m -> [01;32mhostname[0m
│   │   ├── [01;32mdpkg[0m
│   │   ├── [01;32mdpkg-deb[0m
│   │   ├── [01;32mdpkg-divert[0m
│   │   ├── [01;32mdpkg-maintscript-helper[0m
│   │   ├── [01;32mdpkg-query[0m
│   │   ├── [01;32mdpkg-realpath[0m
│   │   ├── [01;32mdpkg-split[0m
│   │   ├── [01;32mdpkg-statoverride[0m
│   │   ├── [01;32mdpkg-trigger[0m
│   │   ├── [01;32mdu[0m
│   │   ├── [01;32mecho[0m
│   │   ├── [01;32megrep[0m
│   │   ├── [01;32menv[0m
│   │   ├── [01;32mexpand[0m
│   │   ├── [30;43mexpiry[0m
│   │   ├── [01;32mexpr[0m
│   │   ├── [01;32mfactor[0m
│   │   ├── [01;32mfaillog[0m
│   │   ├── [01;32mfallocate[0m
│   │   ├── [01;32mfalse[0m
│   │   ├── [01;32mfgrep[0m
│   │   ├── [01;32mfincore[0m
│   │   ├── [01;32mfind[0m
│   │   ├── [01;32mfindmnt[0m
│   │   ├── [01;32mflock[0m
│   │   ├── [01;32mfmt[0m
│   │   ├── [01;32mfold[0m
│   │   ├── [01;32mfree[0m
│   │   ├── [01;32mgetconf[0m
│   │   ├── [01;32mgetent[0m
│   │   ├── [01;32mgetopt[0m
│   │   ├── [37;41mgpasswd[0m
│   │   ├── [01;32mgpgv[0m
│   │   ├── [01;32mgrep[0m
│   │   ├── [01;32mgroups[0m
│   │   ├── [01;32mgunzip[0m
│   │   ├── [01;32mgzexe[0m
│   │   ├── [01;32mgzip[0m
│   │   ├── [01;32mhardlink[0m
│   │   ├── [01;32mhead[0m
│   │   ├── [01;32mhostid[0m
│   │   ├── [01;32mhostname[0m
│   │   ├── [01;36mi386[0m -> [01;32msetarch[0m
│   │   ├── [01;32miconv[0m
│   │   ├── [01;32mid[0m
│   │   ├── [01;32minfocmp[0m
│   │   ├── [01;36minfotocap[0m -> [01;32mtic[0m
│   │   ├── [01;32minstall[0m
│   │   ├── [01;32mionice[0m
│   │   ├── [01;32mipcmk[0m
│   │   ├── [01;32mipcrm[0m
│   │   ├── [01;32mipcs[0m
│   │   ├── [01;32mischroot[0m
│   │   ├── [01;32mjoin[0m
│   │   ├── [01;32mkill[0m
│   │   ├── [01;32mlast[0m
│   │   ├── [01;36mlastb[0m -> [01;32mlast[0m
│   │   ├── [01;32mlastlog[0m
│   │   ├── [01;32mldd[0m
│   │   ├── [01;32mlink[0m
│   │   ├── [01;36mlinux32[0m -> [01;32msetarch[0m
│   │   ├── [01;36mlinux64[0m -> [01;32msetarch[0m
│   │   ├── [01;32mln[0m
│   │   ├── [01;32mlocale[0m
│   │   ├── [01;32mlocale-check[0m
│   │   ├── [01;32mlocaledef[0m
│   │   ├── [01;32mlogger[0m
│   │   ├── [01;32mlogin[0m
│   │   ├── [01;32mlogname[0m
│   │   ├── [01;32mls[0m
│   │   ├── [01;32mlsattr[0m
│   │   ├── [01;32mlsblk[0m
│   │   ├── [01;32mlscpu[0m
│   │   ├── [01;32mlsipc[0m
│   │   ├── [01;32mlslocks[0m
│   │   ├── [01;32mlslogins[0m
│   │   ├── [01;32mlsmem[0m
│   │   ├── [01;32mlsns[0m
│   │   ├── [01;32mman[0m
│   │   ├── [01;32mmawk[0m
│   │   ├── [01;32mmcookie[0m
│   │   ├── [01;32mmd5sum[0m
│   │   ├── [01;36mmd5sum.textutils[0m -> [01;32mmd5sum[0m
│   │   ├── [01;32mmesg[0m
│   │   ├── [01;32mmkdir[0m
│   │   ├── [01;32mmkfifo[0m
│   │   ├── [01;32mmknod[0m
│   │   ├── [01;32mmktemp[0m
│   │   ├── [01;32mmore[0m
│   │   ├── [37;41mmount[0m
│   │   ├── [01;32mmountpoint[0m
│   │   ├── [01;32mmv[0m
│   │   ├── [01;32mnamei[0m
│   │   ├── [01;36mnawk[0m -> [01;32m/etc/alternatives/nawk[0m
│   │   ├── [37;41mnewgrp[0m
│   │   ├── [01;32mnice[0m
│   │   ├── [01;36mnisdomainname[0m -> [01;32mhostname[0m
│   │   ├── [01;32mnl[0m
│   │   ├── [01;32mnohup[0m
│   │   ├── [01;32mnproc[0m
│   │   ├── [01;32mnsenter[0m
│   │   ├── [01;32mnumfmt[0m
│   │   ├── [01;32mod[0m
│   │   ├── [01;36mpager[0m -> [01;32m/etc/alternatives/pager[0m
│   │   ├── [01;32mpartx[0m
│   │   ├── [37;41mpasswd[0m
│   │   ├── [01;32mpaste[0m
│   │   ├── [01;32mpathchk[0m
│   │   ├── [01;32mperl[0m
│   │   ├── [01;32mperl5.34.0[0m
│   │   ├── [01;32mpgrep[0m
│   │   ├── [01;36mpidof[0m -> [01;32m/sbin/killall5[0m
│   │   ├── [01;32mpidwait[0m
│   │   ├── [01;32mpinky[0m
│   │   ├── [01;36mpkill[0m -> [01;32mpgrep[0m
│   │   ├── [01;32mpldd[0m
│   │   ├── [01;32mpmap[0m
│   │   ├── [01;32mpr[0m
│   │   ├── [01;32mprintenv[0m
│   │   ├── [01;32mprintf[0m
│   │   ├── [01;32mprlimit[0m
│   │   ├── [01;32mps[0m
│   │   ├── [01;32mptx[0m
│   │   ├── [01;32mpwd[0m
│   │   ├── [01;32mpwdx[0m
│   │   ├── [01;36mrbash[0m -> [01;32mbash[0m
│   │   ├── [01;32mreadlink[0m
│   │   ├── [01;32mrealpath[0m
│   │   ├── [01;32mrenice[0m
│   │   ├── [01;36mreset[0m -> [01;32mtset[0m
│   │   ├── [01;32mresizepart[0m
│   │   ├── [01;32mrev[0m
│   │   ├── [01;32mrgrep[0m
│   │   ├── [01;32mrm[0m
│   │   ├── [01;32mrmdir[0m
│   │   ├── [01;32mruncon[0m
│   │   ├── [01;32mrun-parts[0m
│   │   ├── [01;32msavelog[0m
│   │   ├── [01;32mscript[0m
│   │   ├── [01;32mscriptlive[0m
│   │   ├── [01;32mscriptreplay[0m
│   │   ├── [01;32msdiff[0m
│   │   ├── [01;32msed[0m
│   │   ├── [01;32mselect-editor[0m
│   │   ├── [01;32msensible-browser[0m
│   │   ├── [01;32msensible-editor[0m
│   │   ├── [01;32msensible-pager[0m
│   │   ├── [01;32mseq[0m
│   │   ├── [01;32msetarch[0m
│   │   ├── [01;32msetpriv[0m
│   │   ├── [01;32msetsid[0m
│   │   ├── [01;32msetterm[0m
│   │   ├── [01;36msg[0m -> [37;41mnewgrp[0m
│   │   ├── [01;36msh[0m -> [01;32mdash[0m
│   │   ├── [01;32msha1sum[0m
│   │   ├── [01;32msha224sum[0m
│   │   ├── [01;32msha256sum[0m
│   │   ├── [01;32msha384sum[0m
│   │   ├── [01;32msha512sum[0m
│   │   ├── [01;32mshred[0m
│   │   ├── [01;32mshuf[0m
│   │   ├── [01;32mskill[0m
│   │   ├── [01;32mslabtop[0m
│   │   ├── [01;32msleep[0m
│   │   ├── [01;36msnice[0m -> [01;32mskill[0m
│   │   ├── [01;32msort[0m
│   │   ├── [01;32msplit[0m
│   │   ├── [01;32mstat[0m
│   │   ├── [01;32mstdbuf[0m
│   │   ├── [01;32mstty[0m
│   │   ├── [37;41msu[0m
│   │   ├── [01;32msum[0m
│   │   ├── [01;32msync[0m
│   │   ├── [01;32mtabs[0m
│   │   ├── [01;32mtac[0m
│   │   ├── [01;32mtail[0m
│   │   ├── [01;32mtar[0m
│   │   ├── [01;32mtaskset[0m
│   │   ├── [01;32mtee[0m
│   │   ├── [01;32mtempfile[0m
│   │   ├── [01;32mtest[0m
│   │   ├── [01;32mtic[0m
│   │   ├── [01;32mtimeout[0m
│   │   ├── [01;32mtload[0m
│   │   ├── [01;32mtoe[0m
│   │   ├── [01;32mtop[0m
│   │   ├── [01;32mtouch[0m
│   │   ├── [01;32mtput[0m
│   │   ├── [01;32mtr[0m
│   │   ├── [01;32mtrue[0m
│   │   ├── [01;32mtruncate[0m
│   │   ├── [01;32mtset[0m
│   │   ├── [01;32mtsort[0m
│   │   ├── [01;32mtty[0m
│   │   ├── [01;32mtzselect[0m
│   │   ├── [01;32muclampset[0m
│   │   ├── [37;41mumount[0m
│   │   ├── [01;32muname[0m
│   │   ├── [01;32muncompress[0m
│   │   ├── [01;32munexpand[0m
│   │   ├── [01;32muniq[0m
│   │   ├── [01;32munlink[0m
│   │   ├── [01;32munshare[0m
│   │   ├── [01;32mupdate-alternatives[0m
│   │   ├── [01;32muptime[0m
│   │   ├── [01;32musers[0m
│   │   ├── [01;32mutmpdump[0m
│   │   ├── [01;32mvdir[0m
│   │   ├── [01;32mvmstat[0m
│   │   ├── [01;32mw[0m
│   │   ├── [01;32mwall[0m
│   │   ├── [01;32mwatch[0m
│   │   ├── [01;32mwc[0m
│   │   ├── [01;32mwdctl[0m
│   │   ├── [01;32mwhereis[0m
│   │   ├── [01;36mwhich[0m -> [01;32m/etc/alternatives/which[0m
│   │   ├── [01;32mwhich.debianutils[0m
│   │   ├── [01;32mwho[0m
│   │   ├── [01;32mwhoami[0m
│   │   ├── [01;36mx86_64[0m -> [01;32msetarch[0m
│   │   ├── [01;32mxargs[0m
│   │   ├── [01;32myes[0m
│   │   ├── [01;36mypdomainname[0m -> [01;32mhostname[0m
│   │   ├── [01;32mzcat[0m
│   │   ├── [01;32mzcmp[0m
│   │   ├── [01;32mzdiff[0m
│   │   ├── [01;32mzdump[0m
│   │   ├── [01;32mzegrep[0m
│   │   ├── [01;32mzfgrep[0m
│   │   ├── [01;32mzforce[0m
│   │   ├── [01;32mzgrep[0m
│   │   ├── [01;32mzless[0m
│   │   ├── [01;32mzmore[0m
│   │   └── [01;32mznew[0m
│   ├── [01;34mgames[0m
│   ├── [01;34minclude[0m
│   ├── [01;34mlib[0m
│   │   ├── [01;34mapt[0m
│   │   │   ├── [01;32mapt-helper[0m
│   │   │   ├── [01;32mapt.systemd.daily[0m
│   │   │   ├── [01;34mmethods[0m
│   │   │   │   ├── [01;32mcdrom[0m
│   │   │   │   ├── [01;32mcopy[0m
│   │   │   │   ├── [01;32mfile[0m
│   │   │   │   ├── [01;32mftp[0m
│   │   │   │   ├── [01;32mgpgv[0m
│   │   │   │   ├── [01;32mhttp[0m
│   │   │   │   ├── [01;36mhttps[0m -> [01;32mhttp[0m
│   │   │   │   ├── [01;32mmirror[0m
│   │   │   │   ├── [01;36mmirror+copy[0m -> [01;32mmirror[0m
│   │   │   │   ├── [01;36mmirror+file[0m -> [01;32mmirror[0m
│   │   │   │   ├── [01;36mmirror+ftp[0m -> [01;32mmirror[0m
│   │   │   │   ├── [01;36mmirror+http[0m -> [01;32mmirror[0m
│   │   │   │   ├── [01;36mmirror+https[0m -> [01;32mmirror[0m
│   │   │   │   ├── [01;32mrred[0m
│   │   │   │   ├── [01;32mrsh[0m
│   │   │   │   ├── [01;36mssh[0m -> [01;32mrsh[0m
│   │   │   │   └── [01;32mstore[0m
│   │   │   ├── [01;34mplanners[0m
│   │   │   │   └── [01;36mdump[0m -> [01;32m../solvers/dump[0m
│   │   │   └── [01;34msolvers[0m
│   │   │       └── [01;32mdump[0m
│   │   ├── [01;34mdpkg[0m
│   │   │   └── [01;34mmethods[0m
│   │   │       └── [01;34mapt[0m
│   │   │           ├── desc.apt
│   │   │           ├── [01;32minstall[0m
│   │   │           ├── names
│   │   │           ├── [01;32msetup[0m
│   │   │           └── [01;32mupdate[0m
│   │   ├── [01;34minit[0m
│   │   │   ├── [01;32minit-d-script[0m
│   │   │   └── vars.sh
│   │   ├── [01;34mlocale[0m
│   │   │   └── [01;34mC.utf8[0m
│   │   │       ├── LC_ADDRESS
│   │   │       ├── LC_COLLATE
│   │   │       ├── LC_CTYPE
│   │   │       ├── LC_IDENTIFICATION
│   │   │       ├── LC_MEASUREMENT
│   │   │       ├── [01;34mLC_MESSAGES[0m
│   │   │       │   └── SYS_LC_MESSAGES
│   │   │       ├── LC_MONETARY
│   │   │       ├── LC_NAME
│   │   │       ├── LC_NUMERIC
│   │   │       ├── LC_PAPER
│   │   │       ├── LC_TELEPHONE
│   │   │       └── LC_TIME
│   │   ├── [01;34mlsb[0m
│   │   │   ├── init-functions
│   │   │   └── [01;34minit-functions.d[0m
│   │   │       ├── 00-verbose
│   │   │       └── 50-ubuntu-logging
│   │   ├── [01;34mmime[0m
│   │   │   └── [01;34mpackages[0m
│   │   │       ├── sensible-utils
│   │   │       ├── tar
│   │   │       └── util-linux
│   │   ├── os-release
│   │   ├── [01;34msysctl.d[0m
│   │   │   └── 99-protect-links.conf
│   │   ├── [01;34msystemd[0m
│   │   │   └── [01;34msystem[0m
│   │   │       ├── apt-daily.service
│   │   │       ├── apt-daily.timer
│   │   │       ├── apt-daily-upgrade.service
│   │   │       ├── apt-daily-upgrade.timer
│   │   │       ├── dpkg-db-backup.service
│   │   │       ├── dpkg-db-backup.timer
│   │   │       ├── e2scrub_all.service
│   │   │       ├── e2scrub_all.timer
│   │   │       ├── e2scrub_fail@.service
│   │   │       ├── e2scrub_reap.service
│   │   │       ├── e2scrub@.service
│   │   │       ├── fstrim.service
│   │   │       ├── fstrim.timer
│   │   │       ├── motd-news.service
│   │   │       └── motd-news.timer
│   │   ├── [01;34mterminfo[0m
│   │   │   ├── [01;34ma[0m
│   │   │   │   └── ansi
│   │   │   ├── [01;34mc[0m
│   │   │   │   ├── cons25
│   │   │   │   ├── cons25-debian
│   │   │   │   └── cygwin
│   │   │   ├── [01;34md[0m
│   │   │   │   └── dumb
│   │   │   ├── [01;34mE[0m
│   │   │   │   ├── Eterm
│   │   │   │   └── [01;36mEterm-color[0m -> Eterm
│   │   │   ├── [01;34mh[0m
│   │   │   │   └── hurd
│   │   │   ├── [01;34ml[0m
│   │   │   │   └── linux
│   │   │   ├── [01;34mm[0m
│   │   │   │   ├── mach
│   │   │   │   ├── mach-bold
│   │   │   │   ├── mach-color
│   │   │   │   ├── mach-gnu
│   │   │   │   └── mach-gnu-color
│   │   │   ├── [01;34mp[0m
│   │   │   │   └── pcansi
│   │   │   ├── [01;34mr[0m
│   │   │   │   ├── rxvt
│   │   │   │   ├── rxvt-basic
│   │   │   │   ├── [01;36mrxvt-m[0m -> rxvt-basic
│   │   │   │   ├── rxvt-unicode
│   │   │   │   └── rxvt-unicode-256color
│   │   │   ├── [01;34ms[0m
│   │   │   │   ├── screen
│   │   │   │   ├── screen-256color
│   │   │   │   ├── screen-256color-bce
│   │   │   │   ├── screen-bce
│   │   │   │   ├── screen-s
│   │   │   │   ├── screen-w
│   │   │   │   ├── screen.xterm-256color
│   │   │   │   └── sun
│   │   │   ├── [01;34mt[0m
│   │   │   │   ├── tmux
│   │   │   │   └── tmux-256color
│   │   │   ├── [01;34mv[0m
│   │   │   │   ├── vt100
│   │   │   │   ├── vt102
│   │   │   │   ├── vt220
│   │   │   │   └── vt52
│   │   │   ├── [01;34mw[0m
│   │   │   │   ├── wsvt25
│   │   │   │   └── wsvt25m
│   │   │   └── [01;34mx[0m
│   │   │       ├── xterm
│   │   │       ├── xterm-256color
│   │   │       ├── xterm-color
│   │   │       ├── [01;36mxterm-debian[0m -> xterm
│   │   │       ├── xterm-mono
│   │   │       ├── xterm-r5
│   │   │       ├── xterm-r6
│   │   │       ├── xterm-vt220
│   │   │       └── xterm-xfree86
│   │   ├── [01;34mtmpfiles.d[0m
│   │   │   └── passwd.conf
│   │   ├── [01;34mudev[0m
│   │   │   ├── [01;32mhwclock-set[0m
│   │   │   └── [01;34mrules.d[0m
│   │   │       └── 96-e2scrub.rules
│   │   ├── [01;34musrmerge[0m
│   │   │   ├── [01;32mconvert-etc-shells[0m
│   │   │   ├── [01;32mconvert-usrmerge[0m
│   │   │   └── [01;34mlib[0m
│   │   │       ├── [01;34mautodie[0m
│   │   │       │   ├── [01;34mScope[0m
│   │   │       │   │   ├── Guard.pm
│   │   │       │   │   └── GuardStack.pm
│   │   │       │   └── Util.pm
│   │   │       ├── autodie.pm
│   │   │       ├── Fatal.pm
│   │   │       ├── [01;34mFile[0m
│   │   │       │   ├── [01;34mFind[0m
│   │   │       │   │   └── Rule.pm
│   │   │       │   └── Find.pm
│   │   │       ├── if.pm
│   │   │       ├── [01;34mNumber[0m
│   │   │       │   └── Compare.pm
│   │   │       ├── [01;34mText[0m
│   │   │       │   └── Glob.pm
│   │   │       └── [01;34mTie[0m
│   │   │           └── RefHash.pm
│   │   └── [01;34mx86_64-linux-gnu[0m
│   │       ├── [01;34maudit[0m
│   │       │   └── sotruss-lib.so
│   │       ├── [01;34me2fsprogs[0m
│   │       │   ├── [01;32me2scrub_all_cron[0m
│   │       │   └── [01;32me2scrub_fail[0m
│   │       ├── [01;34mengines-3[0m
│   │       │   ├── afalg.so
│   │       │   ├── loader_attic.so
│   │       │   └── padlock.so
│   │       ├── [01;34mgconv[0m
│   │       │   ├── ANSI_X3.110.so
│   │       │   ├── ARMSCII-8.so
│   │       │   ├── ASMO_449.so
│   │       │   ├── BIG5HKSCS.so
│   │       │   ├── BIG5.so
│   │       │   ├── BRF.so
│   │       │   ├── CP10007.so
│   │       │   ├── CP1125.so
│   │       │   ├── CP1250.so
│   │       │   ├── CP1251.so
│   │       │   ├── CP1252.so
│   │       │   ├── CP1253.so
│   │       │   ├── CP1254.so
│   │       │   ├── CP1255.so
│   │       │   ├── CP1256.so
│   │       │   ├── CP1257.so
│   │       │   ├── CP1258.so
│   │       │   ├── CP737.so
│   │       │   ├── CP770.so
│   │       │   ├── CP771.so
│   │       │   ├── CP772.so
│   │       │   ├── CP773.so
│   │       │   ├── CP774.so
│   │       │   ├── CP775.so
│   │       │   ├── CP932.so
│   │       │   ├── CSN_369103.so
│   │       │   ├── CWI.so
│   │       │   ├── DEC-MCS.so
│   │       │   ├── EBCDIC-AT-DE-A.so
│   │       │   ├── EBCDIC-AT-DE.so
│   │       │   ├── EBCDIC-CA-FR.so
│   │       │   ├── EBCDIC-DK-NO-A.so
│   │       │   ├── EBCDIC-DK-NO.so
│   │       │   ├── EBCDIC-ES-A.so
│   │       │   ├── EBCDIC-ES.so
│   │       │   ├── EBCDIC-ES-S.so
│   │       │   ├── EBCDIC-FI-SE-A.so
│   │       │   ├── EBCDIC-FI-SE.so
│   │       │   ├── EBCDIC-FR.so
│   │       │   ├── EBCDIC-IS-FRISS.so
│   │       │   ├── EBCDIC-IT.so
│   │       │   ├── EBCDIC-PT.so
│   │       │   ├── EBCDIC-UK.so
│   │       │   ├── EBCDIC-US.so
│   │       │   ├── ECMA-CYRILLIC.so
│   │       │   ├── EUC-CN.so
│   │       │   ├── EUC-JISX0213.so
│   │       │   ├── EUC-JP-MS.so
│   │       │   ├── EUC-JP.so
│   │       │   ├── EUC-KR.so
│   │       │   ├── EUC-TW.so
│   │       │   ├── GB18030.so
│   │       │   ├── GBBIG5.so
│   │       │   ├── GBGBK.so
│   │       │   ├── GBK.so
│   │       │   ├── gconv-modules
│   │       │   ├── gconv-modules.cache
│   │       │   ├── [01;34mgconv-modules.d[0m
│   │       │   │   └── gconv-modules-extra.conf
│   │       │   ├── GEORGIAN-ACADEMY.so
│   │       │   ├── GEORGIAN-PS.so
│   │       │   ├── GOST_19768-74.so
│   │       │   ├── GREEK7-OLD.so
│   │       │   ├── GREEK7.so
│   │       │   ├── GREEK-CCITT.so
│   │       │   ├── HP-GREEK8.so
│   │       │   ├── HP-ROMAN8.so
│   │       │   ├── HP-ROMAN9.so
│   │       │   ├── HP-THAI8.so
│   │       │   ├── HP-TURKISH8.so
│   │       │   ├── IBM037.so
│   │       │   ├── IBM038.so
│   │       │   ├── IBM1004.so
│   │       │   ├── IBM1008_420.so
│   │       │   ├── IBM1008.so
│   │       │   ├── IBM1025.so
│   │       │   ├── IBM1026.so
│   │       │   ├── IBM1046.so
│   │       │   ├── IBM1047.so
│   │       │   ├── IBM1097.so
│   │       │   ├── IBM1112.so
│   │       │   ├── IBM1122.so
│   │       │   ├── IBM1123.so
│   │       │   ├── IBM1124.so
│   │       │   ├── IBM1129.so
│   │       │   ├── IBM1130.so
│   │       │   ├── IBM1132.so
│   │       │   ├── IBM1133.so
│   │       │   ├── IBM1137.so
│   │       │   ├── IBM1140.so
│   │       │   ├── IBM1141.so
│   │       │   ├── IBM1142.so
│   │       │   ├── IBM1143.so
│   │       │   ├── IBM1144.so
│   │       │   ├── IBM1145.so
│   │       │   ├── IBM1146.so
│   │       │   ├── IBM1147.so
│   │       │   ├── IBM1148.so
│   │       │   ├── IBM1149.so
│   │       │   ├── IBM1153.so
│   │       │   ├── IBM1154.so
│   │       │   ├── IBM1155.so
│   │       │   ├── IBM1156.so
│   │       │   ├── IBM1157.so
│   │       │   ├── IBM1158.so
│   │       │   ├── IBM1160.so
│   │       │   ├── IBM1161.so
│   │       │   ├── IBM1162.so
│   │       │   ├── IBM1163.so
│   │       │   ├── IBM1164.so
│   │       │   ├── IBM1166.so
│   │       │   ├── IBM1167.so
│   │       │   ├── IBM12712.so
│   │       │   ├── IBM1364.so
│   │       │   ├── IBM1371.so
│   │       │   ├── IBM1388.so
│   │       │   ├── IBM1390.so
│   │       │   ├── IBM1399.so
│   │       │   ├── IBM16804.so
│   │       │   ├── IBM256.so
│   │       │   ├── IBM273.so
│   │       │   ├── IBM274.so
│   │       │   ├── IBM275.so
│   │       │   ├── IBM277.so
│   │       │   ├── IBM278.so
│   │       │   ├── IBM280.so
│   │       │   ├── IBM281.so
│   │       │   ├── IBM284.so
│   │       │   ├── IBM285.so
│   │       │   ├── IBM290.so
│   │       │   ├── IBM297.so
│   │       │   ├── IBM420.so
│   │       │   ├── IBM423.so
│   │       │   ├── IBM424.so
│   │       │   ├── IBM437.so
│   │       │   ├── IBM4517.so
│   │       │   ├── IBM4899.so
│   │       │   ├── IBM4909.so
│   │       │   ├── IBM4971.so
│   │       │   ├── IBM500.so
│   │       │   ├── IBM5347.so
│   │       │   ├── IBM803.so
│   │       │   ├── IBM850.so
│   │       │   ├── IBM851.so
│   │       │   ├── IBM852.so
│   │       │   ├── IBM855.so
│   │       │   ├── IBM856.so
│   │       │   ├── IBM857.so
│   │       │   ├── IBM858.so
│   │       │   ├── IBM860.so
│   │       │   ├── IBM861.so
│   │       │   ├── IBM862.so
│   │       │   ├── IBM863.so
│   │       │   ├── IBM864.so
│   │       │   ├── IBM865.so
│   │       │   ├── IBM866NAV.so
│   │       │   ├── IBM866.so
│   │       │   ├── IBM868.so
│   │       │   ├── IBM869.so
│   │       │   ├── IBM870.so
│   │       │   ├── IBM871.so
│   │       │   ├── IBM874.so
│   │       │   ├── IBM875.so
│   │       │   ├── IBM880.so
│   │       │   ├── IBM891.so
│   │       │   ├── IBM901.so
│   │       │   ├── IBM902.so
│   │       │   ├── IBM9030.so
│   │       │   ├── IBM903.so
│   │       │   ├── IBM904.so
│   │       │   ├── IBM905.so
│   │       │   ├── IBM9066.so
│   │       │   ├── IBM918.so
│   │       │   ├── IBM921.so
│   │       │   ├── IBM922.so
│   │       │   ├── IBM930.so
│   │       │   ├── IBM932.so
│   │       │   ├── IBM933.so
│   │       │   ├── IBM935.so
│   │       │   ├── IBM937.so
│   │       │   ├── IBM939.so
│   │       │   ├── IBM943.so
│   │       │   ├── IBM9448.so
│   │       │   ├── IEC_P27-1.so
│   │       │   ├── INIS-8.so
│   │       │   ├── INIS-CYRILLIC.so
│   │       │   ├── INIS.so
│   │       │   ├── ISIRI-3342.so
│   │       │   ├── ISO_10367-BOX.so
│   │       │   ├── ISO_11548-1.so
│   │       │   ├── ISO-2022-CN-EXT.so
│   │       │   ├── ISO-2022-CN.so
│   │       │   ├── ISO-2022-JP-3.so
│   │       │   ├── ISO-2022-JP.so
│   │       │   ├── ISO-2022-KR.so
│   │       │   ├── ISO_2033.so
│   │       │   ├── ISO_5427-EXT.so
│   │       │   ├── ISO_5427.so
│   │       │   ├── ISO_5428.so
│   │       │   ├── ISO646.so
│   │       │   ├── ISO_6937-2.so
│   │       │   ├── ISO_6937.so
│   │       │   ├── ISO8859-10.so
│   │       │   ├── ISO8859-11.so
│   │       │   ├── ISO8859-13.so
│   │       │   ├── ISO8859-14.so
│   │       │   ├── ISO8859-15.so
│   │       │   ├── ISO8859-16.so
│   │       │   ├── ISO8859-1.so
│   │       │   ├── ISO8859-2.so
│   │       │   ├── ISO8859-3.so
│   │       │   ├── ISO8859-4.so
│   │       │   ├── ISO8859-5.so
│   │       │   ├── ISO8859-6.so
│   │       │   ├── ISO8859-7.so
│   │       │   ├── ISO8859-8.so
│   │       │   ├── ISO8859-9E.so
│   │       │   ├── ISO8859-9.so
│   │       │   ├── ISO-IR-197.so
│   │       │   ├── ISO-IR-209.so
│   │       │   ├── JOHAB.so
│   │       │   ├── KOI8-R.so
│   │       │   ├── KOI8-RU.so
│   │       │   ├── KOI-8.so
│   │       │   ├── KOI8-T.so
│   │       │   ├── KOI8-U.so
│   │       │   ├── LATIN-GREEK-1.so
│   │       │   ├── LATIN-GREEK.so
│   │       │   ├── libCNS.so
│   │       │   ├── libGB.so
│   │       │   ├── libISOIR165.so
│   │       │   ├── libJIS.so
│   │       │   ├── libJISX0213.so
│   │       │   ├── libKSC.so
│   │       │   ├── MAC-CENTRALEUROPE.so
│   │       │   ├── MACINTOSH.so
│   │       │   ├── MAC-IS.so
│   │       │   ├── MAC-SAMI.so
│   │       │   ├── MAC-UK.so
│   │       │   ├── MIK.so
│   │       │   ├── NATS-DANO.so
│   │       │   ├── NATS-SEFI.so
│   │       │   ├── PT154.so
│   │       │   ├── RK1048.so
│   │       │   ├── SAMI-WS2.so
│   │       │   ├── SHIFT_JISX0213.so
│   │       │   ├── SJIS.so
│   │       │   ├── T.61.so
│   │       │   ├── TCVN5712-1.so
│   │       │   ├── TIS-620.so
│   │       │   ├── TSCII.so
│   │       │   ├── UHC.so
│   │       │   ├── UNICODE.so
│   │       │   ├── UTF-16.so
│   │       │   ├── UTF-32.so
│   │       │   ├── UTF-7.so
│   │       │   └── VISCII.so
│   │       ├── [01;34mkrb5[0m
│   │       │   └── [01;34mplugins[0m
│   │       │       ├── [01;34mlibkrb5[0m
│   │       │       └── [01;34mpreauth[0m
│   │       │           └── spake.so
│   │       ├── [01;32mld-linux-x86-64.so.2[0m
│   │       ├── [01;36mlibacl.so.1[0m -> libacl.so.1.1.2301
│   │       ├── libacl.so.1.1.2301
│   │       ├── libanl.so.1
│   │       ├── [01;36mlibapt-pkg.so.6.0[0m -> libapt-pkg.so.6.0.0
│   │       ├── libapt-pkg.so.6.0.0
│   │       ├── [01;36mlibapt-private.so.0.0[0m -> libapt-private.so.0.0.0
│   │       ├── libapt-private.so.0.0.0
│   │       ├── [01;36mlibattr.so.1[0m -> libattr.so.1.1.2501
│   │       ├── libattr.so.1.1.2501
│   │       ├── [01;36mlibaudit.so.1[0m -> libaudit.so.1.0.0
│   │       ├── libaudit.so.1.0.0
│   │       ├── [01;36mlibblkid.so.1[0m -> libblkid.so.1.1.0
│   │       ├── libblkid.so.1.1.0
│   │       ├── libBrokenLocale.so.1
│   │       ├── [01;36mlibbz2.so.1[0m -> libbz2.so.1.0.4
│   │       ├── [01;36mlibbz2.so.1.0[0m -> libbz2.so.1.0.4
│   │       ├── libbz2.so.1.0.4
│   │       ├── [01;36mlibcap-ng.so.0[0m -> libcap-ng.so.0.0.0
│   │       ├── libcap-ng.so.0.0.0
│   │       ├── [01;36mlibcap.so.2[0m -> libcap.so.2.44
│   │       ├── libcap.so.2.44
│   │       ├── libc_malloc_debug.so.0
│   │       ├── [01;36mlibcom_err.so.2[0m -> libcom_err.so.2.1
│   │       ├── libcom_err.so.2.1
│   │       ├── libcrypto.so.3
│   │       ├── [01;36mlibcrypt.so.1[0m -> libcrypt.so.1.1.0
│   │       ├── libcrypt.so.1.1.0
│   │       ├── [01;32mlibc.so.6[0m
│   │       ├── libdb-5.3.so
│   │       ├── [01;36mlibdebconfclient.so.0[0m -> libdebconfclient.so.0.0.0
│   │       ├── libdebconfclient.so.0.0.0
│   │       ├── libdl.so.2
│   │       ├── [01;36mlibe2p.so.2[0m -> libe2p.so.2.3
│   │       ├── libe2p.so.2.3
│   │       ├── [01;36mlibext2fs.so.2[0m -> libext2fs.so.2.4
│   │       ├── libext2fs.so.2.4
│   │       ├── [01;36mlibffi.so.8[0m -> libffi.so.8.1.0
│   │       ├── libffi.so.8.1.0
│   │       ├── [01;36mlibform.so.6[0m -> libform.so.6.3
│   │       ├── libform.so.6.3
│   │       ├── [01;36mlibformw.so.6[0m -> libformw.so.6.3
│   │       ├── libformw.so.6.3
│   │       ├── libgcc_s.so.1
│   │       ├── [01;36mlibgcrypt.so.20[0m -> libgcrypt.so.20.3.4
│   │       ├── libgcrypt.so.20.3.4
│   │       ├── [01;36mlibgmp.so.10[0m -> libgmp.so.10.4.1
│   │       ├── libgmp.so.10.4.1
│   │       ├── [01;36mlibgnutls.so.30[0m -> libgnutls.so.30.31.0
│   │       ├── libgnutls.so.30.31.0
│   │       ├── [01;36mlibgpg-error.so.0[0m -> libgpg-error.so.0.32.1
│   │       ├── libgpg-error.so.0.32.1
│   │       ├── [01;36mlibgssapi_krb5.so.2[0m -> libgssapi_krb5.so.2.2
│   │       ├── libgssapi_krb5.so.2.2
│   │       ├── [01;36mlibhogweed.so.6[0m -> libhogweed.so.6.4
│   │       ├── libhogweed.so.6.4
│   │       ├── [01;36mlibidn2.so.0[0m -> libidn2.so.0.3.7
│   │       ├── libidn2.so.0.3.7
│   │       ├── [01;36mlibk5crypto.so.3[0m -> libk5crypto.so.3.1
│   │       ├── libk5crypto.so.3.1
│   │       ├── [01;36mlibkeyutils.so.1[0m -> libkeyutils.so.1.9
│   │       ├── libkeyutils.so.1.9
│   │       ├── [01;36mlibkrb5.so.3[0m -> libkrb5.so.3.3
│   │       ├── libkrb5.so.3.3
│   │       ├── [01;36mlibkrb5support.so.0[0m -> libkrb5support.so.0.1
│   │       ├── libkrb5support.so.0.1
│   │       ├── [01;36mliblz4.so.1[0m -> liblz4.so.1.9.3
│   │       ├── liblz4.so.1.9.3
│   │       ├── [01;36mliblzma.so.5[0m -> liblzma.so.5.2.5
│   │       ├── liblzma.so.5.2.5
│   │       ├── libmemusage.so
│   │       ├── [01;36mlibmenu.so.6[0m -> libmenu.so.6.3
│   │       ├── libmenu.so.6.3
│   │       ├── [01;36mlibmenuw.so.6[0m -> libmenuw.so.6.3
│   │       ├── libmenuw.so.6.3
│   │       ├── [01;36mlibmount.so.1[0m -> libmount.so.1.1.0
│   │       ├── libmount.so.1.1.0
│   │       ├── libm.so.6
│   │       ├── libmvec.so.1
│   │       ├── [01;36mlibncurses.so.6[0m -> libncurses.so.6.3
│   │       ├── libncurses.so.6.3
│   │       ├── [01;36mlibncursesw.so.6[0m -> libncursesw.so.6.3
│   │       ├── libncursesw.so.6.3
│   │       ├── [01;36mlibnettle.so.8[0m -> libnettle.so.8.4
│   │       ├── libnettle.so.8.4
│   │       ├── libnsl.so.1
│   │       ├── [01;36mlibnsl.so.2[0m -> libnsl.so.2.0.1
│   │       ├── libnsl.so.2.0.1
│   │       ├── libnss_compat.so.2
│   │       ├── libnss_dns.so.2
│   │       ├── libnss_files.so.2
│   │       ├── libnss_hesiod.so.2
│   │       ├── [01;36mlibp11-kit.so.0[0m -> libp11-kit.so.0.3.0
│   │       ├── libp11-kit.so.0.3.0
│   │       ├── [01;36mlibpamc.so.0[0m -> libpamc.so.0.82.1
│   │       ├── libpamc.so.0.82.1
│   │       ├── [01;36mlibpam_misc.so.0[0m -> libpam_misc.so.0.82.1
│   │       ├── libpam_misc.so.0.82.1
│   │       ├── [01;36mlibpam.so.0[0m -> libpam.so.0.85.1
│   │       ├── libpam.so.0.85.1
│   │       ├── [01;36mlibpanel.so.6[0m -> libpanel.so.6.3
│   │       ├── libpanel.so.6.3
│   │       ├── [01;36mlibpanelw.so.6[0m -> libpanelw.so.6.3
│   │       ├── libpanelw.so.6.3
│   │       ├── libpcprofile.so
│   │       ├── [01;36mlibpcre2-8.so.0[0m -> libpcre2-8.so.0.10.4
│   │       ├── libpcre2-8.so.0.10.4
│   │       ├── [01;36mlibpcreposix.so.3[0m -> libpcreposix.so.3.13.3
│   │       ├── libpcreposix.so.3.13.3
│   │       ├── [01;36mlibpcre.so.3[0m -> libpcre.so.3.13.3
│   │       ├── libpcre.so.3.13.3
│   │       ├── [01;36mlibprocps.so.8[0m -> libprocps.so.8.0.3
│   │       ├── libprocps.so.8.0.3
│   │       ├── libpthread.so.0
│   │       ├── libresolv.so.2
│   │       ├── librt.so.1
│   │       ├── [01;36mlibseccomp.so.2[0m -> libseccomp.so.2.5.3
│   │       ├── libseccomp.so.2.5.3
│   │       ├── libselinux.so.1
│   │       ├── libsemanage.so.2
│   │       ├── libsepol.so.2
│   │       ├── [01;36mlibsmartcols.so.1[0m -> libsmartcols.so.1.1.0
│   │       ├── libsmartcols.so.1.1.0
│   │       ├── libssl.so.3
│   │       ├── [01;36mlibss.so.2[0m -> libss.so.2.0
│   │       ├── libss.so.2.0
│   │       ├── [01;36mlibstdc++.so.6[0m -> libstdc++.so.6.0.30
│   │       ├── libstdc++.so.6.0.30
│   │       ├── [01;36mlibsystemd.so.0[0m -> libsystemd.so.0.32.0
│   │       ├── libsystemd.so.0.32.0
│   │       ├── [01;36mlibtasn1.so.6[0m -> libtasn1.so.6.6.2
│   │       ├── libtasn1.so.6.6.2
│   │       ├── libthread_db.so.1
│   │       ├── [01;36mlibtic.so.6[0m -> libtic.so.6.3
│   │       ├── libtic.so.6.3
│   │       ├── [01;36mlibtinfo.so.6[0m -> libtinfo.so.6.3
│   │       ├── libtinfo.so.6.3
│   │       ├── [01;36mlibtirpc.so.3[0m -> libtirpc.so.3.0.0
│   │       ├── libtirpc.so.3.0.0
│   │       ├── [01;36mlibudev.so.1[0m -> libudev.so.1.7.2
│   │       ├── libudev.so.1.7.2
│   │       ├── [01;36mlibunistring.so.2[0m -> libunistring.so.2.2.0
│   │       ├── libunistring.so.2.2.0
│   │       ├── libutil.so.1
│   │       ├── [01;36mlibuuid.so.1[0m -> libuuid.so.1.3.0
│   │       ├── libuuid.so.1.3.0
│   │       ├── [01;36mlibxxhash.so.0[0m -> libxxhash.so.0.8.1
│   │       ├── libxxhash.so.0.8.1
│   │       ├── [01;36mlibz.so.1[0m -> libz.so.1.2.11
│   │       ├── libz.so.1.2.11
│   │       ├── [01;36mlibzstd.so.1[0m -> libzstd.so.1.4.8
│   │       ├── libzstd.so.1.4.8
│   │       ├── [01;34mossl-modules[0m
│   │       │   └── legacy.so
│   │       ├── [01;34mperl-base[0m
│   │       │   ├── attributes.pm
│   │       │   ├── [01;34mauto[0m
│   │       │   │   ├── [01;34mattributes[0m
│   │       │   │   │   └── attributes.so
│   │       │   │   ├── [01;34mCwd[0m
│   │       │   │   │   └── Cwd.so
│   │       │   │   ├── [01;34mFcntl[0m
│   │       │   │   │   └── Fcntl.so
│   │       │   │   ├── [01;34mFile[0m
│   │       │   │   │   └── [01;34mGlob[0m
│   │       │   │   │       └── Glob.so
│   │       │   │   ├── [01;34mHash[0m
│   │       │   │   │   └── [01;34mUtil[0m
│   │       │   │   │       └── Util.so
│   │       │   │   ├── [01;34mIO[0m
│   │       │   │   │   └── IO.so
│   │       │   │   ├── [01;34mList[0m
│   │       │   │   │   └── [01;34mUtil[0m
│   │       │   │   │       └── Util.so
│   │       │   │   ├── [01;34mPOSIX[0m
│   │       │   │   │   └── POSIX.so
│   │       │   │   ├── [01;34mre[0m
│   │       │   │   │   └── re.so
│   │       │   │   └── [01;34mSocket[0m
│   │       │   │       └── Socket.so
│   │       │   ├── AutoLoader.pm
│   │       │   ├── base.pm
│   │       │   ├── bytes_heavy.pl
│   │       │   ├── bytes.pm
│   │       │   ├── [01;34mCarp[0m
│   │       │   │   └── Heavy.pm
│   │       │   ├── Carp.pm
│   │       │   ├── Config_git.pl
│   │       │   ├── Config_heavy.pl
│   │       │   ├── Config.pm
│   │       │   ├── constant.pm
│   │       │   ├── Cwd.pm
│   │       │   ├── DynaLoader.pm
│   │       │   ├── Errno.pm
│   │       │   ├── [01;34mExporter[0m
│   │       │   │   └── Heavy.pm
│   │       │   ├── Exporter.pm
│   │       │   ├── Fcntl.pm
│   │       │   ├── feature.pm
│   │       │   ├── fields.pm
│   │       │   ├── [01;34mFile[0m
│   │       │   │   ├── Basename.pm
│   │       │   │   ├── Glob.pm
│   │       │   │   ├── Path.pm
│   │       │   │   ├── [01;34mSpec[0m
│   │       │   │   │   └── Unix.pm
│   │       │   │   ├── Spec.pm
│   │       │   │   └── Temp.pm
│   │       │   ├── FileHandle.pm
│   │       │   ├── [01;34mGetopt[0m
│   │       │   │   └── Long.pm
│   │       │   ├── [01;34mHash[0m
│   │       │   │   └── Util.pm
│   │       │   ├── integer.pm
│   │       │   ├── [01;34mIO[0m
│   │       │   │   ├── File.pm
│   │       │   │   ├── Handle.pm
│   │       │   │   ├── Pipe.pm
│   │       │   │   ├── Seekable.pm
│   │       │   │   ├── Select.pm
│   │       │   │   ├── [01;34mSocket[0m
│   │       │   │   │   ├── INET.pm
│   │       │   │   │   ├── IP.pm
│   │       │   │   │   └── UNIX.pm
│   │       │   │   └── Socket.pm
│   │       │   ├── IO.pm
│   │       │   ├── [01;34mIPC[0m
│   │       │   │   ├── Open2.pm
│   │       │   │   └── Open3.pm
│   │       │   ├── lib.pm
│   │       │   ├── [01;34mList[0m
│   │       │   │   └── Util.pm
│   │       │   ├── locale.pm
│   │       │   ├── overloading.pm
│   │       │   ├── overload.pm
│   │       │   ├── parent.pm
│   │       │   ├── POSIX.pm
│   │       │   ├── re.pm
│   │       │   ├── [01;34mScalar[0m
│   │       │   │   └── Util.pm
│   │       │   ├── SelectSaver.pm
│   │       │   ├── Socket.pm
│   │       │   ├── strict.pm
│   │       │   ├── Symbol.pm
│   │       │   ├── [01;34mText[0m
│   │       │   │   ├── ParseWords.pm
│   │       │   │   ├── Tabs.pm
│   │       │   │   └── Wrap.pm
│   │       │   ├── [01;34mTie[0m
│   │       │   │   └── Hash.pm
│   │       │   ├── [01;34municore[0m
│   │       │   │   ├── [01;34mlib[0m
│   │       │   │   │   ├── [01;34mAge[0m
│   │       │   │   │   │   ├── NA.pl
│   │       │   │   │   │   ├── V100.pl
│   │       │   │   │   │   ├── V110.pl
│   │       │   │   │   │   ├── V11.pl
│   │       │   │   │   │   ├── V120.pl
│   │       │   │   │   │   ├── V130.pl
│   │       │   │   │   │   ├── V20.pl
│   │       │   │   │   │   ├── V30.pl
│   │       │   │   │   │   ├── V31.pl
│   │       │   │   │   │   ├── V32.pl
│   │       │   │   │   │   ├── V40.pl
│   │       │   │   │   │   ├── V41.pl
│   │       │   │   │   │   ├── V50.pl
│   │       │   │   │   │   ├── V51.pl
│   │       │   │   │   │   ├── V52.pl
│   │       │   │   │   │   ├── V60.pl
│   │       │   │   │   │   ├── V61.pl
│   │       │   │   │   │   ├── V70.pl
│   │       │   │   │   │   ├── V80.pl
│   │       │   │   │   │   └── V90.pl
│   │       │   │   │   ├── [01;34mAlpha[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mBc[0m
│   │       │   │   │   │   ├── AL.pl
│   │       │   │   │   │   ├── AN.pl
│   │       │   │   │   │   ├── BN.pl
│   │       │   │   │   │   ├── B.pl
│   │       │   │   │   │   ├── CS.pl
│   │       │   │   │   │   ├── EN.pl
│   │       │   │   │   │   ├── ES.pl
│   │       │   │   │   │   ├── ET.pl
│   │       │   │   │   │   ├── L.pl
│   │       │   │   │   │   ├── NSM.pl
│   │       │   │   │   │   ├── ON.pl
│   │       │   │   │   │   ├── R.pl
│   │       │   │   │   │   └── WS.pl
│   │       │   │   │   ├── [01;34mBidiC[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mBidiM[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mBlk[0m
│   │       │   │   │   │   └── NB.pl
│   │       │   │   │   ├── [01;34mBpt[0m
│   │       │   │   │   │   ├── C.pl
│   │       │   │   │   │   ├── N.pl
│   │       │   │   │   │   └── O.pl
│   │       │   │   │   ├── [01;34mCased[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mCcc[0m
│   │       │   │   │   │   ├── AL.pl
│   │       │   │   │   │   ├── A.pl
│   │       │   │   │   │   ├── AR.pl
│   │       │   │   │   │   ├── ATAR.pl
│   │       │   │   │   │   ├── B.pl
│   │       │   │   │   │   ├── BR.pl
│   │       │   │   │   │   ├── DB.pl
│   │       │   │   │   │   ├── NK.pl
│   │       │   │   │   │   ├── NR.pl
│   │       │   │   │   │   ├── OV.pl
│   │       │   │   │   │   └── VR.pl
│   │       │   │   │   ├── [01;34mCE[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mCI[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mCompEx[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mCWCF[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mCWCM[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mCWKCF[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mCWL[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mCWT[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mCWU[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mDash[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mDep[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mDI[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mDia[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mDt[0m
│   │       │   │   │   │   ├── Com.pl
│   │       │   │   │   │   ├── Enc.pl
│   │       │   │   │   │   ├── Fin.pl
│   │       │   │   │   │   ├── Font.pl
│   │       │   │   │   │   ├── Init.pl
│   │       │   │   │   │   ├── Iso.pl
│   │       │   │   │   │   ├── Med.pl
│   │       │   │   │   │   ├── Nar.pl
│   │       │   │   │   │   ├── Nb.pl
│   │       │   │   │   │   ├── NonCanon.pl
│   │       │   │   │   │   ├── Sqr.pl
│   │       │   │   │   │   ├── Sub.pl
│   │       │   │   │   │   ├── Sup.pl
│   │       │   │   │   │   └── Vert.pl
│   │       │   │   │   ├── [01;34mEa[0m
│   │       │   │   │   │   ├── A.pl
│   │       │   │   │   │   ├── H.pl
│   │       │   │   │   │   ├── Na.pl
│   │       │   │   │   │   ├── N.pl
│   │       │   │   │   │   └── W.pl
│   │       │   │   │   ├── [01;34mEBase[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mEComp[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mEmoji[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mEPres[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mExt[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mExtPict[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mGc[0m
│   │       │   │   │   │   ├── Cf.pl
│   │       │   │   │   │   ├── Cn.pl
│   │       │   │   │   │   ├── C.pl
│   │       │   │   │   │   ├── LC.pl
│   │       │   │   │   │   ├── Ll.pl
│   │       │   │   │   │   ├── Lm.pl
│   │       │   │   │   │   ├── Lo.pl
│   │       │   │   │   │   ├── L.pl
│   │       │   │   │   │   ├── Lu.pl
│   │       │   │   │   │   ├── Mc.pl
│   │       │   │   │   │   ├── Me.pl
│   │       │   │   │   │   ├── Mn.pl
│   │       │   │   │   │   ├── M.pl
│   │       │   │   │   │   ├── Nd.pl
│   │       │   │   │   │   ├── Nl.pl
│   │       │   │   │   │   ├── No.pl
│   │       │   │   │   │   ├── N.pl
│   │       │   │   │   │   ├── Pc.pl
│   │       │   │   │   │   ├── Pd.pl
│   │       │   │   │   │   ├── Pe.pl
│   │       │   │   │   │   ├── Pf.pl
│   │       │   │   │   │   ├── Pi.pl
│   │       │   │   │   │   ├── Po.pl
│   │       │   │   │   │   ├── P.pl
│   │       │   │   │   │   ├── Ps.pl
│   │       │   │   │   │   ├── Sc.pl
│   │       │   │   │   │   ├── Sk.pl
│   │       │   │   │   │   ├── Sm.pl
│   │       │   │   │   │   ├── So.pl
│   │       │   │   │   │   ├── S.pl
│   │       │   │   │   │   ├── Z.pl
│   │       │   │   │   │   └── Zs.pl
│   │       │   │   │   ├── [01;34mGCB[0m
│   │       │   │   │   │   ├── CN.pl
│   │       │   │   │   │   ├── EX.pl
│   │       │   │   │   │   ├── LV.pl
│   │       │   │   │   │   ├── LVT.pl
│   │       │   │   │   │   ├── PP.pl
│   │       │   │   │   │   ├── SM.pl
│   │       │   │   │   │   └── XX.pl
│   │       │   │   │   ├── [01;34mGrBase[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mGrExt[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mHex[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mHst[0m
│   │       │   │   │   │   └── NA.pl
│   │       │   │   │   ├── [01;34mHyphen[0m
│   │       │   │   │   │   └── T.pl
│   │       │   │   │   ├── [01;34mIDC[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mIdeo[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mIDS[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mIdStatus[0m
│   │       │   │   │   │   ├── Allowed.pl
│   │       │   │   │   │   └── Restrict.pl
│   │       │   │   │   ├── [01;34mIdType[0m
│   │       │   │   │   │   ├── DefaultI.pl
│   │       │   │   │   │   ├── Exclusio.pl
│   │       │   │   │   │   ├── Inclusio.pl
│   │       │   │   │   │   ├── LimitedU.pl
│   │       │   │   │   │   ├── NotChara.pl
│   │       │   │   │   │   ├── NotNFKC.pl
│   │       │   │   │   │   ├── NotXID.pl
│   │       │   │   │   │   ├── Obsolete.pl
│   │       │   │   │   │   ├── Recommen.pl
│   │       │   │   │   │   ├── Technica.pl
│   │       │   │   │   │   └── Uncommon.pl
│   │       │   │   │   ├── [01;34mIn[0m
│   │       │   │   │   │   ├── 10_0.pl
│   │       │   │   │   │   ├── 11_0.pl
│   │       │   │   │   │   ├── 12_0.pl
│   │       │   │   │   │   ├── 12_1.pl
│   │       │   │   │   │   ├── 13_0.pl
│   │       │   │   │   │   ├── 2_0.pl
│   │       │   │   │   │   ├── 2_1.pl
│   │       │   │   │   │   ├── 3_0.pl
│   │       │   │   │   │   ├── 3_1.pl
│   │       │   │   │   │   ├── 3_2.pl
│   │       │   │   │   │   ├── 4_0.pl
│   │       │   │   │   │   ├── 4_1.pl
│   │       │   │   │   │   ├── 5_0.pl
│   │       │   │   │   │   ├── 5_1.pl
│   │       │   │   │   │   ├── 5_2.pl
│   │       │   │   │   │   ├── 6_0.pl
│   │       │   │   │   │   ├── 6_1.pl
│   │       │   │   │   │   ├── 6_2.pl
│   │       │   │   │   │   ├── 6_3.pl
│   │       │   │   │   │   ├── 7_0.pl
│   │       │   │   │   │   ├── 8_0.pl
│   │       │   │   │   │   └── 9_0.pl
│   │       │   │   │   ├── [01;34mInPC[0m
│   │       │   │   │   │   ├── BottomAn.pl
│   │       │   │   │   │   ├── Bottom.pl
│   │       │   │   │   │   ├── LeftAndR.pl
│   │       │   │   │   │   ├── Left.pl
│   │       │   │   │   │   ├── NA.pl
│   │       │   │   │   │   ├── Overstru.pl
│   │       │   │   │   │   ├── Right.pl
│   │       │   │   │   │   ├── TopAndBo.pl
│   │       │   │   │   │   ├── TopAndL2.pl
│   │       │   │   │   │   ├── TopAndLe.pl
│   │       │   │   │   │   ├── TopAndRi.pl
│   │       │   │   │   │   ├── Top.pl
│   │       │   │   │   │   └── VisualOr.pl
│   │       │   │   │   ├── [01;34mInSC[0m
│   │       │   │   │   │   ├── Avagraha.pl
│   │       │   │   │   │   ├── Bindu.pl
│   │       │   │   │   │   ├── Cantilla.pl
│   │       │   │   │   │   ├── Consona2.pl
│   │       │   │   │   │   ├── Consona3.pl
│   │       │   │   │   │   ├── Consona4.pl
│   │       │   │   │   │   ├── Consona5.pl
│   │       │   │   │   │   ├── Consona6.pl
│   │       │   │   │   │   ├── Consona7.pl
│   │       │   │   │   │   ├── Consona8.pl
│   │       │   │   │   │   ├── Consona9.pl
│   │       │   │   │   │   ├── Consonan.pl
│   │       │   │   │   │   ├── Invisibl.pl
│   │       │   │   │   │   ├── Nukta.pl
│   │       │   │   │   │   ├── Number.pl
│   │       │   │   │   │   ├── Other.pl
│   │       │   │   │   │   ├── PureKill.pl
│   │       │   │   │   │   ├── Syllable.pl
│   │       │   │   │   │   ├── ToneMark.pl
│   │       │   │   │   │   ├── Virama.pl
│   │       │   │   │   │   ├── Visarga.pl
│   │       │   │   │   │   ├── VowelDep.pl
│   │       │   │   │   │   ├── VowelInd.pl
│   │       │   │   │   │   └── Vowel.pl
│   │       │   │   │   ├── [01;34mJg[0m
│   │       │   │   │   │   ├── Ain.pl
│   │       │   │   │   │   ├── Alef.pl
│   │       │   │   │   │   ├── Beh.pl
│   │       │   │   │   │   ├── Dal.pl
│   │       │   │   │   │   ├── FarsiYeh.pl
│   │       │   │   │   │   ├── Feh.pl
│   │       │   │   │   │   ├── Gaf.pl
│   │       │   │   │   │   ├── Hah.pl
│   │       │   │   │   │   ├── HanifiRo.pl
│   │       │   │   │   │   ├── Kaf.pl
│   │       │   │   │   │   ├── Lam.pl
│   │       │   │   │   │   ├── NoJoinin.pl
│   │       │   │   │   │   ├── Qaf.pl
│   │       │   │   │   │   ├── Reh.pl
│   │       │   │   │   │   ├── Sad.pl
│   │       │   │   │   │   ├── Seen.pl
│   │       │   │   │   │   ├── Waw.pl
│   │       │   │   │   │   └── Yeh.pl
│   │       │   │   │   ├── [01;34mJt[0m
│   │       │   │   │   │   ├── C.pl
│   │       │   │   │   │   ├── D.pl
│   │       │   │   │   │   ├── L.pl
│   │       │   │   │   │   ├── R.pl
│   │       │   │   │   │   ├── T.pl
│   │       │   │   │   │   └── U.pl
│   │       │   │   │   ├── [01;34mLb[0m
│   │       │   │   │   │   ├── AI.pl
│   │       │   │   │   │   ├── AL.pl
│   │       │   │   │   │   ├── BA.pl
│   │       │   │   │   │   ├── BB.pl
│   │       │   │   │   │   ├── CJ.pl
│   │       │   │   │   │   ├── CL.pl
│   │       │   │   │   │   ├── CM.pl
│   │       │   │   │   │   ├── EX.pl
│   │       │   │   │   │   ├── GL.pl
│   │       │   │   │   │   ├── ID.pl
│   │       │   │   │   │   ├── IN.pl
│   │       │   │   │   │   ├── IS.pl
│   │       │   │   │   │   ├── NS.pl
│   │       │   │   │   │   ├── NU.pl
│   │       │   │   │   │   ├── OP.pl
│   │       │   │   │   │   ├── PO.pl
│   │       │   │   │   │   ├── PR.pl
│   │       │   │   │   │   ├── QU.pl
│   │       │   │   │   │   ├── SA.pl
│   │       │   │   │   │   └── XX.pl
│   │       │   │   │   ├── [01;34mLower[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mMath[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mNFCQC[0m
│   │       │   │   │   │   ├── M.pl
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mNFDQC[0m
│   │       │   │   │   │   ├── N.pl
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mNFKCQC[0m
│   │       │   │   │   │   ├── N.pl
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mNFKDQC[0m
│   │       │   │   │   │   ├── N.pl
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mNt[0m
│   │       │   │   │   │   ├── Di.pl
│   │       │   │   │   │   ├── None.pl
│   │       │   │   │   │   └── Nu.pl
│   │       │   │   │   ├── [01;34mNv[0m
│   │       │   │   │   │   ├── 0.pl
│   │       │   │   │   │   ├── 100000.pl
│   │       │   │   │   │   ├── 10000.pl
│   │       │   │   │   │   ├── 1000.pl
│   │       │   │   │   │   ├── 100.pl
│   │       │   │   │   │   ├── 10.pl
│   │       │   │   │   │   ├── 1_16.pl
│   │       │   │   │   │   ├── 11.pl
│   │       │   │   │   │   ├── 1_2.pl
│   │       │   │   │   │   ├── 12.pl
│   │       │   │   │   │   ├── 1_3.pl
│   │       │   │   │   │   ├── 13.pl
│   │       │   │   │   │   ├── 1_4.pl
│   │       │   │   │   │   ├── 14.pl
│   │       │   │   │   │   ├── 15.pl
│   │       │   │   │   │   ├── 1_6.pl
│   │       │   │   │   │   ├── 16.pl
│   │       │   │   │   │   ├── 17.pl
│   │       │   │   │   │   ├── 1_8.pl
│   │       │   │   │   │   ├── 18.pl
│   │       │   │   │   │   ├── 19.pl
│   │       │   │   │   │   ├── 1.pl
│   │       │   │   │   │   ├── 20000.pl
│   │       │   │   │   │   ├── 2000.pl
│   │       │   │   │   │   ├── 200.pl
│   │       │   │   │   │   ├── 20.pl
│   │       │   │   │   │   ├── 2_3.pl
│   │       │   │   │   │   ├── 2.pl
│   │       │   │   │   │   ├── 30000.pl
│   │       │   │   │   │   ├── 3000.pl
│   │       │   │   │   │   ├── 300.pl
│   │       │   │   │   │   ├── 30.pl
│   │       │   │   │   │   ├── 3_16.pl
│   │       │   │   │   │   ├── 3_4.pl
│   │       │   │   │   │   ├── 3.pl
│   │       │   │   │   │   ├── 40000.pl
│   │       │   │   │   │   ├── 4000.pl
│   │       │   │   │   │   ├── 400.pl
│   │       │   │   │   │   ├── 40.pl
│   │       │   │   │   │   ├── 4.pl
│   │       │   │   │   │   ├── 50000.pl
│   │       │   │   │   │   ├── 5000.pl
│   │       │   │   │   │   ├── 500.pl
│   │       │   │   │   │   ├── 50.pl
│   │       │   │   │   │   ├── 5.pl
│   │       │   │   │   │   ├── 60000.pl
│   │       │   │   │   │   ├── 6000.pl
│   │       │   │   │   │   ├── 600.pl
│   │       │   │   │   │   ├── 60.pl
│   │       │   │   │   │   ├── 6.pl
│   │       │   │   │   │   ├── 70000.pl
│   │       │   │   │   │   ├── 7000.pl
│   │       │   │   │   │   ├── 700.pl
│   │       │   │   │   │   ├── 70.pl
│   │       │   │   │   │   ├── 7.pl
│   │       │   │   │   │   ├── 80000.pl
│   │       │   │   │   │   ├── 8000.pl
│   │       │   │   │   │   ├── 800.pl
│   │       │   │   │   │   ├── 80.pl
│   │       │   │   │   │   ├── 8.pl
│   │       │   │   │   │   ├── 90000.pl
│   │       │   │   │   │   ├── 9000.pl
│   │       │   │   │   │   ├── 900.pl
│   │       │   │   │   │   ├── 90.pl
│   │       │   │   │   │   └── 9.pl
│   │       │   │   │   ├── [01;34mPatSyn[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mPCM[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mPerl[0m
│   │       │   │   │   │   ├── Alnum.pl
│   │       │   │   │   │   ├── Assigned.pl
│   │       │   │   │   │   ├── Blank.pl
│   │       │   │   │   │   ├── Graph.pl
│   │       │   │   │   │   ├── _PerlAny.pl
│   │       │   │   │   │   ├── _PerlCh2.pl
│   │       │   │   │   │   ├── _PerlCha.pl
│   │       │   │   │   │   ├── _PerlFol.pl
│   │       │   │   │   │   ├── _PerlIDC.pl
│   │       │   │   │   │   ├── _PerlIDS.pl
│   │       │   │   │   │   ├── _PerlIsI.pl
│   │       │   │   │   │   ├── _PerlNch.pl
│   │       │   │   │   │   ├── _PerlPat.pl
│   │       │   │   │   │   ├── _PerlPr2.pl
│   │       │   │   │   │   ├── _PerlPro.pl
│   │       │   │   │   │   ├── _PerlQuo.pl
│   │       │   │   │   │   ├── PerlWord.pl
│   │       │   │   │   │   ├── PosixPun.pl
│   │       │   │   │   │   ├── Print.pl
│   │       │   │   │   │   ├── SpacePer.pl
│   │       │   │   │   │   ├── Title.pl
│   │       │   │   │   │   ├── Word.pl
│   │       │   │   │   │   └── XPosixPu.pl
│   │       │   │   │   ├── [01;34mQMark[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mSB[0m
│   │       │   │   │   │   ├── AT.pl
│   │       │   │   │   │   ├── CL.pl
│   │       │   │   │   │   ├── EX.pl
│   │       │   │   │   │   ├── FO.pl
│   │       │   │   │   │   ├── LE.pl
│   │       │   │   │   │   ├── LO.pl
│   │       │   │   │   │   ├── NU.pl
│   │       │   │   │   │   ├── SC.pl
│   │       │   │   │   │   ├── Sp.pl
│   │       │   │   │   │   ├── ST.pl
│   │       │   │   │   │   ├── UP.pl
│   │       │   │   │   │   └── XX.pl
│   │       │   │   │   ├── [01;34mSc[0m
│   │       │   │   │   │   ├── Arab.pl
│   │       │   │   │   │   ├── Beng.pl
│   │       │   │   │   │   ├── Cprt.pl
│   │       │   │   │   │   ├── Cyrl.pl
│   │       │   │   │   │   ├── Deva.pl
│   │       │   │   │   │   ├── Dupl.pl
│   │       │   │   │   │   ├── Geor.pl
│   │       │   │   │   │   ├── Glag.pl
│   │       │   │   │   │   ├── Gong.pl
│   │       │   │   │   │   ├── Gonm.pl
│   │       │   │   │   │   ├── Gran.pl
│   │       │   │   │   │   ├── Grek.pl
│   │       │   │   │   │   ├── Gujr.pl
│   │       │   │   │   │   ├── Guru.pl
│   │       │   │   │   │   ├── Hang.pl
│   │       │   │   │   │   ├── Han.pl
│   │       │   │   │   │   ├── Hira.pl
│   │       │   │   │   │   ├── Kana.pl
│   │       │   │   │   │   ├── Knda.pl
│   │       │   │   │   │   ├── Latn.pl
│   │       │   │   │   │   ├── Limb.pl
│   │       │   │   │   │   ├── Linb.pl
│   │       │   │   │   │   ├── Mlym.pl
│   │       │   │   │   │   ├── Mong.pl
│   │       │   │   │   │   ├── Mult.pl
│   │       │   │   │   │   ├── Orya.pl
│   │       │   │   │   │   ├── Sinh.pl
│   │       │   │   │   │   ├── Syrc.pl
│   │       │   │   │   │   ├── Taml.pl
│   │       │   │   │   │   ├── Telu.pl
│   │       │   │   │   │   ├── Zinh.pl
│   │       │   │   │   │   └── Zyyy.pl
│   │       │   │   │   ├── [01;34mScx[0m
│   │       │   │   │   │   ├── Adlm.pl
│   │       │   │   │   │   ├── Arab.pl
│   │       │   │   │   │   ├── Armn.pl
│   │       │   │   │   │   ├── Beng.pl
│   │       │   │   │   │   ├── Bhks.pl
│   │       │   │   │   │   ├── Bopo.pl
│   │       │   │   │   │   ├── Cakm.pl
│   │       │   │   │   │   ├── Cham.pl
│   │       │   │   │   │   ├── Copt.pl
│   │       │   │   │   │   ├── Cprt.pl
│   │       │   │   │   │   ├── Cyrl.pl
│   │       │   │   │   │   ├── Deva.pl
│   │       │   │   │   │   ├── Diak.pl
│   │       │   │   │   │   ├── Dupl.pl
│   │       │   │   │   │   ├── Ethi.pl
│   │       │   │   │   │   ├── Geor.pl
│   │       │   │   │   │   ├── Glag.pl
│   │       │   │   │   │   ├── Gong.pl
│   │       │   │   │   │   ├── Gonm.pl
│   │       │   │   │   │   ├── Gran.pl
│   │       │   │   │   │   ├── Grek.pl
│   │       │   │   │   │   ├── Gujr.pl
│   │       │   │   │   │   ├── Guru.pl
│   │       │   │   │   │   ├── Hang.pl
│   │       │   │   │   │   ├── Han.pl
│   │       │   │   │   │   ├── Hebr.pl
│   │       │   │   │   │   ├── Hira.pl
│   │       │   │   │   │   ├── Hmng.pl
│   │       │   │   │   │   ├── Hmnp.pl
│   │       │   │   │   │   ├── Kana.pl
│   │       │   │   │   │   ├── Khar.pl
│   │       │   │   │   │   ├── Khmr.pl
│   │       │   │   │   │   ├── Khoj.pl
│   │       │   │   │   │   ├── Knda.pl
│   │       │   │   │   │   ├── Kthi.pl
│   │       │   │   │   │   ├── Lana.pl
│   │       │   │   │   │   ├── Lao.pl
│   │       │   │   │   │   ├── Latn.pl
│   │       │   │   │   │   ├── Limb.pl
│   │       │   │   │   │   ├── Lina.pl
│   │       │   │   │   │   ├── Linb.pl
│   │       │   │   │   │   ├── Mlym.pl
│   │       │   │   │   │   ├── Mong.pl
│   │       │   │   │   │   ├── Mult.pl
│   │       │   │   │   │   ├── Mymr.pl
│   │       │   │   │   │   ├── Nand.pl
│   │       │   │   │   │   ├── Orya.pl
│   │       │   │   │   │   ├── Phlp.pl
│   │       │   │   │   │   ├── Rohg.pl
│   │       │   │   │   │   ├── Shrd.pl
│   │       │   │   │   │   ├── Sind.pl
│   │       │   │   │   │   ├── Sinh.pl
│   │       │   │   │   │   ├── Syrc.pl
│   │       │   │   │   │   ├── Tagb.pl
│   │       │   │   │   │   ├── Takr.pl
│   │       │   │   │   │   ├── Talu.pl
│   │       │   │   │   │   ├── Taml.pl
│   │       │   │   │   │   ├── Tang.pl
│   │       │   │   │   │   ├── Telu.pl
│   │       │   │   │   │   ├── Thaa.pl
│   │       │   │   │   │   ├── Tibt.pl
│   │       │   │   │   │   ├── Tirh.pl
│   │       │   │   │   │   ├── Xsux.pl
│   │       │   │   │   │   ├── Yezi.pl
│   │       │   │   │   │   ├── Yi.pl
│   │       │   │   │   │   ├── Zinh.pl
│   │       │   │   │   │   ├── Zyyy.pl
│   │       │   │   │   │   └── Zzzz.pl
│   │       │   │   │   ├── [01;34mSD[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mSTerm[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mTerm[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mUIdeo[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mUpper[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   ├── [01;34mVo[0m
│   │       │   │   │   │   ├── R.pl
│   │       │   │   │   │   ├── Tr.pl
│   │       │   │   │   │   ├── Tu.pl
│   │       │   │   │   │   └── U.pl
│   │       │   │   │   ├── [01;34mWB[0m
│   │       │   │   │   │   ├── EX.pl
│   │       │   │   │   │   ├── Extend.pl
│   │       │   │   │   │   ├── FO.pl
│   │       │   │   │   │   ├── HL.pl
│   │       │   │   │   │   ├── KA.pl
│   │       │   │   │   │   ├── LE.pl
│   │       │   │   │   │   ├── MB.pl
│   │       │   │   │   │   ├── ML.pl
│   │       │   │   │   │   ├── MN.pl
│   │       │   │   │   │   ├── NU.pl
│   │       │   │   │   │   ├── WSegSpac.pl
│   │       │   │   │   │   └── XX.pl
│   │       │   │   │   ├── [01;34mXIDC[0m
│   │       │   │   │   │   └── Y.pl
│   │       │   │   │   └── [01;34mXIDS[0m
│   │       │   │   │       └── Y.pl
│   │       │   │   └── [01;34mTo[0m
│   │       │   │       ├── Age.pl
│   │       │   │       ├── Bc.pl
│   │       │   │       ├── Bmg.pl
│   │       │   │       ├── Bpb.pl
│   │       │   │       ├── Bpt.pl
│   │       │   │       ├── Cf.pl
│   │       │   │       ├── Digit.pl
│   │       │   │       ├── Ea.pl
│   │       │   │       ├── EqUIdeo.pl
│   │       │   │       ├── Fold.pl
│   │       │   │       ├── GCB.pl
│   │       │   │       ├── Gc.pl
│   │       │   │       ├── Hst.pl
│   │       │   │       ├── Identif2.pl
│   │       │   │       ├── Identifi.pl
│   │       │   │       ├── InPC.pl
│   │       │   │       ├── InSC.pl
│   │       │   │       ├── Isc.pl
│   │       │   │       ├── Jg.pl
│   │       │   │       ├── Jt.pl
│   │       │   │       ├── Lb.pl
│   │       │   │       ├── Lc.pl
│   │       │   │       ├── Lower.pl
│   │       │   │       ├── Na1.pl
│   │       │   │       ├── NameAlia.pl
│   │       │   │       ├── NFCQC.pl
│   │       │   │       ├── NFDQC.pl
│   │       │   │       ├── NFKCCF.pl
│   │       │   │       ├── NFKCQC.pl
│   │       │   │       ├── NFKDQC.pl
│   │       │   │       ├── Nt.pl
│   │       │   │       ├── Nv.pl
│   │       │   │       ├── PerlDeci.pl
│   │       │   │       ├── _PerlLB.pl
│   │       │   │       ├── _PerlSCX.pl
│   │       │   │       ├── SB.pl
│   │       │   │       ├── Sc.pl
│   │       │   │       ├── Scx.pl
│   │       │   │       ├── Tc.pl
│   │       │   │       ├── Title.pl
│   │       │   │       ├── Uc.pl
│   │       │   │       ├── Upper.pl
│   │       │   │       ├── Vo.pl
│   │       │   │       └── WB.pl
│   │       │   ├── utf8.pm
│   │       │   ├── vars.pm
│   │       │   ├── [01;34mwarnings[0m
│   │       │   │   └── register.pm
│   │       │   ├── warnings.pm
│   │       │   └── XSLoader.pm
│   │       └── [01;34msecurity[0m
│   │           ├── pam_access.so
│   │           ├── pam_debug.so
│   │           ├── pam_deny.so
│   │           ├── pam_echo.so
│   │           ├── pam_env.so
│   │           ├── pam_exec.so
│   │           ├── pam_extrausers.so
│   │           ├── pam_faildelay.so
│   │           ├── pam_faillock.so
│   │           ├── pam_filter.so
│   │           ├── pam_ftp.so
│   │           ├── pam_group.so
│   │           ├── pam_issue.so
│   │           ├── pam_keyinit.so
│   │           ├── pam_lastlog.so
│   │           ├── pam_limits.so
│   │           ├── pam_listfile.so
│   │           ├── pam_localuser.so
│   │           ├── pam_loginuid.so
│   │           ├── pam_mail.so
│   │           ├── pam_mkhomedir.so
│   │           ├── pam_motd.so
│   │           ├── pam_namespace.so
│   │           ├── pam_nologin.so
│   │           ├── pam_permit.so
│   │           ├── pam_pwhistory.so
│   │           ├── pam_rhosts.so
│   │           ├── pam_rootok.so
│   │           ├── pam_securetty.so
│   │           ├── pam_selinux.so
│   │           ├── pam_sepermit.so
│   │           ├── pam_setquota.so
│   │           ├── pam_shells.so
│   │           ├── pam_stress.so
│   │           ├── pam_succeed_if.so
│   │           ├── pam_time.so
│   │           ├── pam_timestamp.so
│   │           ├── pam_tty_audit.so
│   │           ├── pam_umask.so
│   │           ├── pam_unix.so
│   │           ├── pam_userdb.so
│   │           ├── pam_usertype.so
│   │           ├── pam_warn.so
│   │           ├── pam_wheel.so
│   │           └── pam_xauth.so
│   ├── [01;34mlib32[0m
│   ├── [01;34mlib64[0m
│   │   └── [01;36mld-linux-x86-64.so.2[0m -> [01;32m/lib/x86_64-linux-gnu/ld-linux-x86-64.so.2[0m
│   ├── [01;34mlibexec[0m
│   │   ├── [01;34mcoreutils[0m
│   │   │   └── [01;32mlibstdbuf.so[0m
│   │   └── [01;34mdpkg[0m
│   │       └── [01;32mdpkg-db-backup[0m
│   ├── [01;34mlibx32[0m
│   ├── [01;34mlocal[0m
│   │   ├── [01;34mbin[0m
│   │   ├── [01;34metc[0m
│   │   ├── [01;34mgames[0m
│   │   ├── [01;34minclude[0m
│   │   ├── [01;34mlib[0m
│   │   ├── [01;36mman[0m -> [01;34mshare/man[0m
│   │   ├── [01;34msbin[0m
│   │   │   └── [01;32munminimize[0m
│   │   ├── [01;34mshare[0m
│   │   │   └── [01;34mman[0m
│   │   └── [01;34msrc[0m
│   ├── [01;34msbin[0m
│   │   ├── [01;36maddgroup[0m -> [01;32madduser[0m
│   │   ├── [01;32madd-shell[0m
│   │   ├── [01;32madduser[0m
│   │   ├── [01;32magetty[0m
│   │   ├── [01;32mbadblocks[0m
│   │   ├── [01;32mblkdiscard[0m
│   │   ├── [01;32mblkid[0m
│   │   ├── [01;32mblkzone[0m
│   │   ├── [01;32mblockdev[0m
│   │   ├── [01;32mchcpu[0m
│   │   ├── [01;32mchgpasswd[0m
│   │   ├── [01;32mchmem[0m
│   │   ├── [01;32mchpasswd[0m
│   │   ├── [01;32mchroot[0m
│   │   ├── [01;36mcpgr[0m -> [01;32mcppw[0m
│   │   ├── [01;32mcppw[0m
│   │   ├── [01;32mctrlaltdel[0m
│   │   ├── [01;32mdebugfs[0m
│   │   ├── [01;36mdelgroup[0m -> [01;32mdeluser[0m
│   │   ├── [01;32mdeluser[0m
│   │   ├── [01;32mdpkg-preconfigure[0m
│   │   ├── [01;32mdpkg-reconfigure[0m
│   │   ├── [01;32mdumpe2fs[0m
│   │   ├── [01;32me2freefrag[0m
│   │   ├── [01;32me2fsck[0m
│   │   ├── [01;32me2image[0m
│   │   ├── [01;36me2label[0m -> [01;32mtune2fs[0m
│   │   ├── [01;36me2mmpstatus[0m -> [01;32mdumpe2fs[0m
│   │   ├── [01;32me2scrub[0m
│   │   ├── [01;32me2scrub_all[0m
│   │   ├── [01;32me2undo[0m
│   │   ├── [01;32me4crypt[0m
│   │   ├── [01;32me4defrag[0m
│   │   ├── [01;32mfaillock[0m
│   │   ├── [01;32mfilefrag[0m
│   │   ├── [01;32mfindfs[0m
│   │   ├── [01;32mfsck[0m
│   │   ├── [01;32mfsck.cramfs[0m
│   │   ├── [01;36mfsck.ext2[0m -> [01;32me2fsck[0m
│   │   ├── [01;36mfsck.ext3[0m -> [01;32me2fsck[0m
│   │   ├── [01;36mfsck.ext4[0m -> [01;32me2fsck[0m
│   │   ├── [01;32mfsck.minix[0m
│   │   ├── [01;32mfsfreeze[0m
│   │   ├── [01;32mfstab-decode[0m
│   │   ├── [01;32mfstrim[0m
│   │   ├── [01;36mgetty[0m -> [01;32magetty[0m
│   │   ├── [01;32mgroupadd[0m
│   │   ├── [01;32mgroupdel[0m
│   │   ├── [01;32mgroupmems[0m
│   │   ├── [01;32mgroupmod[0m
│   │   ├── [01;32mgrpck[0m
│   │   ├── [01;32mgrpconv[0m
│   │   ├── [01;32mgrpunconv[0m
│   │   ├── [01;32mhwclock[0m
│   │   ├── [01;32miconvconfig[0m
│   │   ├── [01;32minitctl[0m
│   │   ├── [01;32minstallkernel[0m
│   │   ├── [01;32minvoke-rc.d[0m
│   │   ├── [01;32misosize[0m
│   │   ├── [01;32mkillall5[0m
│   │   ├── [01;32mldattach[0m
│   │   ├── [01;32mldconfig[0m
│   │   ├── [01;32mldconfig.real[0m
│   │   ├── [01;32mlogsave[0m
│   │   ├── [01;32mlosetup[0m
│   │   ├── [01;32mmke2fs[0m
│   │   ├── [01;32mmkfs[0m
│   │   ├── [01;32mmkfs.bfs[0m
│   │   ├── [01;32mmkfs.cramfs[0m
│   │   ├── [01;36mmkfs.ext2[0m -> [01;32mmke2fs[0m
│   │   ├── [01;36mmkfs.ext3[0m -> [01;32mmke2fs[0m
│   │   ├── [01;36mmkfs.ext4[0m -> [01;32mmke2fs[0m
│   │   ├── [01;32mmkfs.minix[0m
│   │   ├── [01;32mmkhomedir_helper[0m
│   │   ├── [01;32mmklost+found[0m
│   │   ├── [01;32mmkswap[0m
│   │   ├── [01;32mnewusers[0m
│   │   ├── [01;32mnologin[0m
│   │   ├── [01;32mpam-auth-update[0m
│   │   ├── [30;43mpam_extrausers_chkpwd[0m
│   │   ├── [01;32mpam_extrausers_update[0m
│   │   ├── [01;32mpam_getenv[0m
│   │   ├── [01;32mpam_timestamp_check[0m
│   │   ├── [01;32mpivot_root[0m
│   │   ├── [01;32mpolicy-rc.d[0m
│   │   ├── [01;32mpwck[0m
│   │   ├── [01;32mpwconv[0m
│   │   ├── [01;32mpwunconv[0m
│   │   ├── [01;32mreadprofile[0m
│   │   ├── [01;32mremove-shell[0m
│   │   ├── [01;32mresize2fs[0m
│   │   ├── [01;36mrmt[0m -> [01;32m/etc/alternatives/rmt[0m
│   │   ├── [01;32mrmt-tar[0m
│   │   ├── [01;32mrtcwake[0m
│   │   ├── [01;32mrunuser[0m
│   │   ├── [01;32mservice[0m
│   │   ├── [01;32mshadowconfig[0m
│   │   ├── [01;32mstart-stop-daemon[0m
│   │   ├── [01;32msulogin[0m
│   │   ├── [01;32mswaplabel[0m
│   │   ├── [01;32mswapoff[0m
│   │   ├── [01;32mswapon[0m
│   │   ├── [01;32mswitch_root[0m
│   │   ├── [01;32msysctl[0m
│   │   ├── [01;32mtarcat[0m
│   │   ├── [01;32mtune2fs[0m
│   │   ├── [30;43munix_chkpwd[0m
│   │   ├── [01;32munix_update[0m
│   │   ├── [01;32mupdate-passwd[0m
│   │   ├── [01;32mupdate-rc.d[0m
│   │   ├── [01;32mupdate-shells[0m
│   │   ├── [01;32museradd[0m
│   │   ├── [01;32muserdel[0m
│   │   ├── [01;32musermod[0m
│   │   ├── [01;36mvigr[0m -> [01;32mvipw[0m
│   │   ├── [01;32mvipw[0m
│   │   ├── [01;32mwipefs[0m
│   │   ├── [01;32mzic[0m
│   │   └── [01;32mzramctl[0m
│   ├── [01;34mshare[0m
│   │   ├── [01;34madduser[0m
│   │   │   └── adduser.conf
│   │   ├── [01;34mapport[0m
│   │   │   └── [01;34mpackage-hooks[0m
│   │   │       └── source_shadow.py
│   │   ├── [01;34mbase-files[0m
│   │   │   ├── dot.bashrc
│   │   │   ├── dot.profile
│   │   │   ├── dot.profile.md5sums
│   │   │   ├── info.dir
│   │   │   ├── motd
│   │   │   ├── networks
│   │   │   ├── profile
│   │   │   ├── profile.md5sums
│   │   │   └── staff-group-for-usr-local
│   │   ├── [01;34mbase-passwd[0m
│   │   │   ├── group.master
│   │   │   └── passwd.master
│   │   ├── [01;34mbash-completion[0m
│   │   │   └── [01;34mcompletions[0m
│   │   │       ├── addpart
│   │   │       ├── apt
│   │   │       ├── blkdiscard
│   │   │       ├── blkid
│   │   │       ├── blkzone
│   │   │       ├── blockdev
│   │   │       ├── chcpu
│   │   │       ├── chmem
│   │   │       ├── chrt
│   │   │       ├── ctrlaltdel
│   │   │       ├── debconf
│   │   │       ├── [01;36mdebconf-show[0m -> debconf
│   │   │       ├── delpart
│   │   │       ├── dmesg
│   │   │       ├── fallocate
│   │   │       ├── fincore
│   │   │       ├── findfs
│   │   │       ├── findmnt
│   │   │       ├── flock
│   │   │       ├── fsck
│   │   │       ├── fsck.cramfs
│   │   │       ├── fsck.minix
│   │   │       ├── fsfreeze
│   │   │       ├── fstrim
│   │   │       ├── getopt
│   │   │       ├── hardlink
│   │   │       ├── hwclock
│   │   │       ├── ionice
│   │   │       ├── ipcmk
│   │   │       ├── ipcrm
│   │   │       ├── ipcs
│   │   │       ├── isosize
│   │   │       ├── last
│   │   │       ├── ldattach
│   │   │       ├── logger
│   │   │       ├── losetup
│   │   │       ├── lsblk
│   │   │       ├── lscpu
│   │   │       ├── lsipc
│   │   │       ├── lslocks
│   │   │       ├── lslogins
│   │   │       ├── lsmem
│   │   │       ├── lsns
│   │   │       ├── mcookie
│   │   │       ├── mesg
│   │   │       ├── mkfs
│   │   │       ├── mkfs.bfs
│   │   │       ├── mkfs.cramfs
│   │   │       ├── mkfs.minix
│   │   │       ├── mkswap
│   │   │       ├── more
│   │   │       ├── mount
│   │   │       ├── mountpoint
│   │   │       ├── namei
│   │   │       ├── nsenter
│   │   │       ├── partx
│   │   │       ├── pivot_root
│   │   │       ├── prlimit
│   │   │       ├── readprofile
│   │   │       ├── renice
│   │   │       ├── resizepart
│   │   │       ├── rev
│   │   │       ├── rtcwake
│   │   │       ├── [01;36mrunuser[0m -> su
│   │   │       ├── script
│   │   │       ├── scriptlive
│   │   │       ├── scriptreplay
│   │   │       ├── setarch
│   │   │       ├── setpriv
│   │   │       ├── setsid
│   │   │       ├── setterm
│   │   │       ├── su
│   │   │       ├── swaplabel
│   │   │       ├── swapoff
│   │   │       ├── swapon
│   │   │       ├── taskset
│   │   │       ├── uclampset
│   │   │       ├── umount
│   │   │       ├── unshare
│   │   │       ├── utmpdump
│   │   │       ├── wall
│   │   │       ├── wdctl
│   │   │       ├── whereis
│   │   │       ├── wipefs
│   │   │       └── zramctl
│   │   ├── [01;34mbug[0m
│   │   │   ├── [01;34mapt[0m
│   │   │   │   └── [01;32mscript[0m
│   │   │   ├── [01;32mdpkg[0m
│   │   │   ├── [01;34minit-system-helpers[0m
│   │   │   │   └── control
│   │   │   └── [01;34mprocps[0m
│   │   │       └── presubj
│   │   ├── [01;34mcommon-licenses[0m
│   │   │   ├── Apache-2.0
│   │   │   ├── Artistic
│   │   │   ├── BSD
│   │   │   ├── CC0-1.0
│   │   │   ├── [01;36mGFDL[0m -> GFDL-1.3
│   │   │   ├── GFDL-1.2
│   │   │   ├── GFDL-1.3
│   │   │   ├── [01;36mGPL[0m -> GPL-3
│   │   │   ├── GPL-1
│   │   │   ├── GPL-2
│   │   │   ├── GPL-3
│   │   │   ├── [01;36mLGPL[0m -> LGPL-3
│   │   │   ├── LGPL-2
│   │   │   ├── LGPL-2.1
│   │   │   ├── LGPL-3
│   │   │   ├── MPL-1.1
│   │   │   └── MPL-2.0
│   │   ├── [01;34mdebconf[0m
│   │   │   ├── confmodule
│   │   │   ├── confmodule.sh
│   │   │   ├── debconf.conf
│   │   │   ├── [01;32mfix_db.pl[0m
│   │   │   └── [01;32mfrontend[0m
│   │   ├── [01;34mdebianutils[0m
│   │   │   ├── shells
│   │   │   └── [01;34mshells.d[0m
│   │   ├── [01;34mdict[0m
│   │   ├── [01;34mdoc[0m
│   │   │   ├── [01;34madduser[0m
│   │   │   │   ├── [01;31mchangelog.gz[0m
│   │   │   │   ├── copyright
│   │   │   │   └── [01;34mexamples[0m
│   │   │   │       └── [01;34madduser.local.conf.examples[0m
│   │   │   │           ├── [01;34mskel[0m
│   │   │   │           └── [01;34mskel.other[0m
│   │   │   ├── [01;34mapt[0m
│   │   │   │   ├── [01;36mchangelog.gz[0m -> [01;31m../libapt-pkg6.0/changelog.gz[0m
│   │   │   │   ├── copyright
│   │   │   │   ├── [01;34mexamples[0m
│   │   │   │   └── [40;31;01mNEWS.Debian.gz[0m -> [00m../libapt-pkg6.0/NEWS.Debian.gz[0m
│   │   │   ├── [01;34mbase-files[0m
│   │   │   │   ├── [01;31mchangelog.gz[0m
│   │   │   │   ├── copyright
│   │   │   │   └── [40;31;01mFAQ[0m -> [00mREADME[0m
│   │   │   ├── [01;34mbase-passwd[0m
│   │   │   │   ├── [01;31mchangelog.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mbash[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mbsdutils[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mcoreutils[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mdash[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mdebconf[0m
│   │   │   │   ├── [01;31mchangelog.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mdebianutils[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   ├── [01;31mchangelog.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mdiffutils[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mdpkg[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34me2fsprogs[0m
│   │   │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../libcom-err2/changelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mfindutils[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mgcc-12-base[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mgpgv[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mgrep[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mgzip[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mhostname[0m
│   │   │   │   ├── [01;31mchangelog.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34minit-system-helpers[0m
│   │   │   │   ├── [01;31mchangelog.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibacl1[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibapt-pkg6.0[0m
│   │   │   │   ├── [01;31mchangelog.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibattr1[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibaudit1[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibaudit-common[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibblkid1[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibbz2-1.0[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibc6[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibcap2[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibcap-ng0[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibc-bin[0m
│   │   │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../libc6/changelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibcom-err2[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibcrypt1[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibdb5.3[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibdebconfclient0[0m
│   │   │   │   ├── [01;31mchangelog.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibext2fs2[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibffi8[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;36mlibgcc-s1[0m -> [01;34mgcc-12-base[0m
│   │   │   ├── [01;34mlibgcrypt20[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibgmp10[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibgnutls30[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibgpg-error0[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibgssapi-krb5-2[0m
│   │   │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../libk5crypto3/changelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibhogweed6[0m
│   │   │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../libnettle8/changelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibidn2-0[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibk5crypto3[0m
│   │   │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../libkrb5support0/changelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibkeyutils1[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibkrb5-3[0m
│   │   │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../libk5crypto3/changelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibkrb5support0[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mliblz4-1[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mliblzma5[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibmount1[0m
│   │   │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../libblkid1/changelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;36mlibncurses6[0m -> [01;34mlibtinfo6[0m
│   │   │   ├── [01;36mlibncursesw6[0m -> [01;34mlibtinfo6[0m
│   │   │   ├── [01;34mlibnettle8[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibnsl2[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibp11-kit0[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   ├── copyright
│   │   │   │   └── [01;34mexamples[0m
│   │   │   ├── [01;34mlibpam0g[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibpam-modules[0m
│   │   │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../libpam0g/changelog.Debian.gz[0m
│   │   │   │   ├── copyright
│   │   │   │   ├── [01;34mexamples[0m
│   │   │   │   └── [40;31;01mNEWS.Debian.gz[0m -> [00m../libpam0g/NEWS.Debian.gz[0m
│   │   │   ├── [01;34mlibpam-modules-bin[0m
│   │   │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../libpam0g/changelog.Debian.gz[0m
│   │   │   │   ├── copyright
│   │   │   │   └── [40;31;01mNEWS.Debian.gz[0m -> [00m../libpam0g/NEWS.Debian.gz[0m
│   │   │   ├── [01;34mlibpam-runtime[0m
│   │   │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../libpam0g/changelog.Debian.gz[0m
│   │   │   │   ├── copyright
│   │   │   │   └── [40;31;01mNEWS.Debian.gz[0m -> [00m../libpam0g/NEWS.Debian.gz[0m
│   │   │   ├── [01;34mlibpcre2-8-0[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibpcre3[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibprocps8[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibseccomp2[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibselinux1[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibsemanage2[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibsemanage-common[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibsepol2[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibsmartcols1[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibss2[0m
│   │   │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../libcom-err2/changelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibssl3[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;36mlibstdc++6[0m -> [01;34mgcc-12-base[0m
│   │   │   ├── [01;34mlibsystemd0[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibtasn1-6[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibtinfo6[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibtirpc3[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibtirpc-common[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibudev1[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibunistring2[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibuuid1[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibxxhash0[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlibzstd1[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlogin[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlogsave[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mlsb-base[0m
│   │   │   │   ├── [01;31mchangelog.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mmawk[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   ├── copyright
│   │   │   │   └── [01;34mexamples[0m
│   │   │   ├── [01;34mmount[0m
│   │   │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../libmount1/changelog.Debian.gz[0m
│   │   │   │   ├── copyright
│   │   │   │   └── [01;34mexamples[0m
│   │   │   ├── [01;34mncurses-base[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mncurses-bin[0m
│   │   │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../libtinfo6/changelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mpasswd[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   ├── copyright
│   │   │   │   └── [01;34mexamples[0m
│   │   │   ├── [01;34mperl[0m
│   │   │   ├── [01;34mperl-base[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mprocps[0m
│   │   │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../libprocps8/changelog.Debian.gz[0m
│   │   │   │   ├── copyright
│   │   │   │   ├── [01;34mexamples[0m
│   │   │   │   └── [40;31;01mNEWS.Debian.gz[0m -> [00m../libprocps8/NEWS.Debian.gz[0m
│   │   │   ├── [01;34msed[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   ├── copyright
│   │   │   │   └── [01;34mexamples[0m
│   │   │   ├── [01;34msensible-utils[0m
│   │   │   │   ├── [01;31mchangelog.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34msysvinit-utils[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mtar[0m
│   │   │   │   ├── [01;31mchangelog.Debian.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mubuntu-keyring[0m
│   │   │   │   ├── [01;31mchangelog.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34musrmerge[0m
│   │   │   │   ├── [01;31mchangelog.gz[0m
│   │   │   │   └── copyright
│   │   │   ├── [01;34mutil-linux[0m
│   │   │   │   ├── [01;36mchangelog.Debian.gz[0m -> [01;31m../libblkid1/changelog.Debian.gz[0m
│   │   │   │   ├── copyright
│   │   │   │   ├── [01;34mexamples[0m
│   │   │   │   └── [01;34mreleases[0m
│   │   │   └── [01;34mzlib1g[0m
│   │   │       ├── [01;31mchangelog.Debian.gz[0m
│   │   │       └── copyright
│   │   ├── [01;34mdoc-base[0m
│   │   │   ├── base-passwd.users-and-groups
│   │   │   └── findutils.findutils
│   │   ├── [01;34mdpkg[0m
│   │   │   ├── abitable
│   │   │   ├── cputable
│   │   │   ├── ostable
│   │   │   ├── [01;34msh[0m
│   │   │   │   └── dpkg-error.sh
│   │   │   └── tupletable
│   │   ├── [01;34mgcc[0m
│   │   │   └── [01;34mpython[0m
│   │   │       └── [01;34mlibstdcxx[0m
│   │   │           ├── __init__.py
│   │   │           └── [01;34mv6[0m
│   │   │               ├── __init__.py
│   │   │               ├── printers.py
│   │   │               └── xmethods.py
│   │   ├── [01;34mgdb[0m
│   │   │   └── [01;34mauto-load[0m
│   │   │       └── [01;34musr[0m
│   │   │           └── [01;34mlib[0m
│   │   │               └── [01;34mx86_64-linux-gnu[0m
│   │   │                   └── libstdc++.so.6.0.30-gdb.py
│   │   ├── [01;34minfo[0m
│   │   │   ├── [01;31mcoreutils.info.gz[0m
│   │   │   ├── [01;31mdiffutils.info.gz[0m
│   │   │   ├── dir
│   │   │   ├── [01;31mfind.info-1.gz[0m
│   │   │   ├── [01;31mfind.info-2.gz[0m
│   │   │   ├── [01;31mfind.info.gz[0m
│   │   │   ├── [01;31mfind-maint.info.gz[0m
│   │   │   ├── [01;31mgrep.info.gz[0m
│   │   │   ├── [01;31mgzip.info.gz[0m
│   │   │   └── [01;31msed.info.gz[0m
│   │   ├── [01;34mkeyrings[0m
│   │   │   ├── ubuntu-archive-keyring.gpg
│   │   │   ├── ubuntu-archive-removed-keys.gpg
│   │   │   ├── ubuntu-cloudimage-keyring.gpg
│   │   │   ├── ubuntu-cloudimage-removed-keys.gpg
│   │   │   └── ubuntu-master-keyring.gpg
│   │   ├── [01;34mlibc-bin[0m
│   │   │   └── nsswitch.conf
│   │   ├── [01;34mlintian[0m
│   │   │   ├── [01;34moverrides[0m
│   │   │   │   ├── apt
│   │   │   │   ├── base-files
│   │   │   │   ├── base-passwd
│   │   │   │   ├── bash
│   │   │   │   ├── bsdutils
│   │   │   │   ├── dash
│   │   │   │   ├── debconf
│   │   │   │   ├── dpkg
│   │   │   │   ├── e2fsprogs
│   │   │   │   ├── libc6
│   │   │   │   ├── libc-bin
│   │   │   │   ├── libdb5.3
│   │   │   │   ├── libgcc-s1
│   │   │   │   ├── libgssapi-krb5-2
│   │   │   │   ├── libidn2-0
│   │   │   │   ├── libkrb5-3
│   │   │   │   ├── libpam0g
│   │   │   │   ├── libpam-modules
│   │   │   │   ├── libpam-modules-bin
│   │   │   │   ├── libpam-runtime
│   │   │   │   ├── login
│   │   │   │   ├── mount
│   │   │   │   ├── ncurses-base
│   │   │   │   ├── passwd
│   │   │   │   ├── perl-base
│   │   │   │   ├── procps
│   │   │   │   └── util-linux
│   │   │   └── [01;34mprofiles[0m
│   │   │       └── [01;34mdpkg[0m
│   │   │           └── main.profile
│   │   ├── [01;34mlocale[0m
│   │   │   ├── [01;34maf[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mar[0m
│   │   │   │   └── [01;34mLC_MESSAGES[0m
│   │   │   ├── [01;34mast[0m
│   │   │   │   └── [01;34mLC_MESSAGES[0m
│   │   │   ├── [01;34mbe[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mbg[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mbs[0m
│   │   │   │   └── [01;34mLC_MESSAGES[0m
│   │   │   ├── [01;34mca[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mcs[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mcy[0m
│   │   │   │   └── [01;34mLC_MESSAGES[0m
│   │   │   ├── [01;34mda[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mde[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mdz[0m
│   │   │   │   └── [01;34mLC_MESSAGES[0m
│   │   │   ├── [01;34mel[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34meo[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mes[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34met[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34meu[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mfi[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mfr[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mga[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mgl[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mhr[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mhu[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mia[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mid[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mit[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mja[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mkk[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mkm[0m
│   │   │   │   └── [01;34mLC_MESSAGES[0m
│   │   │   ├── [01;34mko[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mku[0m
│   │   │   │   └── [01;34mLC_MESSAGES[0m
│   │   │   ├── [01;34mlg[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mlt[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mmr[0m
│   │   │   │   └── [01;34mLC_MESSAGES[0m
│   │   │   ├── [01;34mms[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mnb[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mne[0m
│   │   │   │   └── [01;34mLC_MESSAGES[0m
│   │   │   ├── [01;34mnl[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mnn[0m
│   │   │   │   └── [01;34mLC_MESSAGES[0m
│   │   │   ├── [01;34moc[0m
│   │   │   │   └── [01;34mLC_MESSAGES[0m
│   │   │   ├── [01;34mpa[0m
│   │   │   │   └── [01;34mLC_MESSAGES[0m
│   │   │   ├── [01;34mpl[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mpt[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mpt_BR[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mro[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mru[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34msk[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34msl[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34msr[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34msv[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mth[0m
│   │   │   │   └── [01;34mLC_MESSAGES[0m
│   │   │   ├── [01;34mtl[0m
│   │   │   │   └── [01;34mLC_MESSAGES[0m
│   │   │   ├── [01;34mtr[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34muk[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mvi[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   ├── [01;34mzh_CN[0m
│   │   │   │   ├── [01;34mLC_MESSAGES[0m
│   │   │   │   └── [01;34mLC_TIME[0m
│   │   │   │       └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   │   └── [01;34mzh_TW[0m
│   │   │       ├── [01;34mLC_MESSAGES[0m
│   │   │       └── [01;34mLC_TIME[0m
│   │   │           └── [40;31;01mcoreutils.mo[0m -> [00m../LC_MESSAGES/coreutils.mo[0m
│   │   ├── [01;34mman[0m
│   │   │   ├── [01;34mcs[0m
│   │   │   │   ├── [01;34mman5[0m
│   │   │   │   └── [01;34mman8[0m
│   │   │   ├── [01;34mda[0m
│   │   │   │   ├── [01;34mman1[0m
│   │   │   │   ├── [01;34mman5[0m
│   │   │   │   └── [01;34mman8[0m
│   │   │   ├── [01;34mde[0m
│   │   │   │   ├── [01;34mman1[0m
│   │   │   │   ├── [01;34mman5[0m
│   │   │   │   └── [01;34mman8[0m
│   │   │   ├── [01;34mes[0m
│   │   │   │   ├── [01;34mman1[0m
│   │   │   │   ├── [01;34mman5[0m
│   │   │   │   └── [01;34mman8[0m
│   │   │   ├── [01;34mfr[0m
│   │   │   │   ├── [01;34mman1[0m
│   │   │   │   ├── [01;34mman5[0m
│   │   │   │   └── [01;34mman8[0m
│   │   │   ├── [01;34mhu[0m
│   │   │   │   ├── [01;34mman1[0m
│   │   │   │   └── [01;34mman5[0m
│   │   │   ├── [01;34mid[0m
│   │   │   │   └── [01;34mman1[0m
│   │   │   ├── [01;34mit[0m
│   │   │   │   ├── [01;34mman1[0m
│   │   │   │   ├── [01;34mman5[0m
│   │   │   │   └── [01;34mman8[0m
│   │   │   ├── [01;34mja[0m
│   │   │   │   ├── [01;34mman1[0m
│   │   │   │   ├── [01;34mman5[0m
│   │   │   │   └── [01;34mman8[0m
│   │   │   ├── [01;34mko[0m
│   │   │   │   └── [01;34mman1[0m
│   │   │   ├── [01;34mman1[0m
│   │   │   ├── [01;34mman3[0m
│   │   │   ├── [01;34mman5[0m
│   │   │   ├── [01;34mman7[0m
│   │   │   ├── [01;34mman8[0m
│   │   │   ├── [01;34mnl[0m
│   │   │   │   ├── [01;34mman1[0m
│   │   │   │   ├── [01;34mman5[0m
│   │   │   │   └── [01;34mman8[0m
│   │   │   ├── [01;34mpl[0m
│   │   │   │   ├── [01;34mman1[0m
│   │   │   │   ├── [01;34mman5[0m
│   │   │   │   └── [01;34mman8[0m
│   │   │   ├── [01;34mpt[0m
│   │   │   │   ├── [01;34mman1[0m
│   │   │   │   ├── [01;34mman5[0m
│   │   │   │   └── [01;34mman8[0m
│   │   │   ├── [01;34mpt_BR[0m
│   │   │   │   ├── [01;34mman1[0m
│   │   │   │   └── [01;34mman8[0m
│   │   │   ├── [01;34mru[0m
│   │   │   │   ├── [01;34mman1[0m
│   │   │   │   ├── [01;34mman5[0m
│   │   │   │   └── [01;34mman8[0m
│   │   │   ├── [01;34msl[0m
│   │   │   │   └── [01;34mman1[0m
│   │   │   ├── [01;34msv[0m
│   │   │   │   ├── [01;34mman1[0m
│   │   │   │   ├── [01;34mman5[0m
│   │   │   │   └── [01;34mman8[0m
│   │   │   ├── [01;34mtr[0m
│   │   │   │   └── [01;34mman1[0m
│   │   │   ├── [01;34mzh_CN[0m
│   │   │   │   ├── [01;34mman1[0m
│   │   │   │   ├── [01;34mman5[0m
│   │   │   │   └── [01;34mman8[0m
│   │   │   └── [01;34mzh_TW[0m
│   │   │       └── [01;34mman1[0m
│   │   ├── [01;34mmenu[0m
│   │   │   ├── bash
│   │   │   ├── dash
│   │   │   └── procps
│   │   ├── [01;34mmisc[0m
│   │   ├── [01;34mpam[0m
│   │   │   ├── common-account
│   │   │   ├── common-account.md5sums
│   │   │   ├── common-auth
│   │   │   ├── common-auth.md5sums
│   │   │   ├── common-password
│   │   │   ├── common-password.md5sums
│   │   │   ├── common-session
│   │   │   ├── common-session.md5sums
│   │   │   ├── common-session-noninteractive
│   │   │   └── common-session-noninteractive.md5sums
│   │   ├── [01;34mpam-configs[0m
│   │   │   ├── mkhomedir
│   │   │   └── unix
│   │   ├── [01;34mperl5[0m
│   │   │   ├── [01;34mDebconf[0m
│   │   │   │   ├── AutoSelect.pm
│   │   │   │   ├── Base.pm
│   │   │   │   ├── [01;34mClient[0m
│   │   │   │   │   └── ConfModule.pm
│   │   │   │   ├── Config.pm
│   │   │   │   ├── ConfModule.pm
│   │   │   │   ├── [01;34mDbDriver[0m
│   │   │   │   │   ├── Backup.pm
│   │   │   │   │   ├── Cache.pm
│   │   │   │   │   ├── Copy.pm
│   │   │   │   │   ├── Debug.pm
│   │   │   │   │   ├── Directory.pm
│   │   │   │   │   ├── DirTree.pm
│   │   │   │   │   ├── File.pm
│   │   │   │   │   ├── LDAP.pm
│   │   │   │   │   ├── PackageDir.pm
│   │   │   │   │   ├── Pipe.pm
│   │   │   │   │   └── Stack.pm
│   │   │   │   ├── DbDriver.pm
│   │   │   │   ├── Db.pm
│   │   │   │   ├── [01;34mElement[0m
│   │   │   │   │   ├── [01;34mDialog[0m
│   │   │   │   │   │   ├── Boolean.pm
│   │   │   │   │   │   ├── Error.pm
│   │   │   │   │   │   ├── Multiselect.pm
│   │   │   │   │   │   ├── Note.pm
│   │   │   │   │   │   ├── Password.pm
│   │   │   │   │   │   ├── Progress.pm
│   │   │   │   │   │   ├── Select.pm
│   │   │   │   │   │   ├── String.pm
│   │   │   │   │   │   └── Text.pm
│   │   │   │   │   ├── [01;34mEditor[0m
│   │   │   │   │   │   ├── Boolean.pm
│   │   │   │   │   │   ├── Error.pm
│   │   │   │   │   │   ├── Multiselect.pm
│   │   │   │   │   │   ├── Note.pm
│   │   │   │   │   │   ├── Password.pm
│   │   │   │   │   │   ├── Progress.pm
│   │   │   │   │   │   ├── Select.pm
│   │   │   │   │   │   ├── String.pm
│   │   │   │   │   │   └── Text.pm
│   │   │   │   │   ├── [01;34mGnome[0m
│   │   │   │   │   │   ├── Boolean.pm
│   │   │   │   │   │   ├── Error.pm
│   │   │   │   │   │   ├── Multiselect.pm
│   │   │   │   │   │   ├── Note.pm
│   │   │   │   │   │   ├── Password.pm
│   │   │   │   │   │   ├── Progress.pm
│   │   │   │   │   │   ├── Select.pm
│   │   │   │   │   │   ├── String.pm
│   │   │   │   │   │   └── Text.pm
│   │   │   │   │   ├── Gnome.pm
│   │   │   │   │   ├── Multiselect.pm
│   │   │   │   │   ├── [01;34mNoninteractive[0m
│   │   │   │   │   │   ├── Boolean.pm
│   │   │   │   │   │   ├── Error.pm
│   │   │   │   │   │   ├── Multiselect.pm
│   │   │   │   │   │   ├── Note.pm
│   │   │   │   │   │   ├── Password.pm
│   │   │   │   │   │   ├── Progress.pm
│   │   │   │   │   │   ├── Select.pm
│   │   │   │   │   │   ├── String.pm
│   │   │   │   │   │   └── Text.pm
│   │   │   │   │   ├── Noninteractive.pm
│   │   │   │   │   ├── Select.pm
│   │   │   │   │   ├── [01;34mTeletype[0m
│   │   │   │   │   │   ├── Boolean.pm
│   │   │   │   │   │   ├── Error.pm
│   │   │   │   │   │   ├── Multiselect.pm
│   │   │   │   │   │   ├── Note.pm
│   │   │   │   │   │   ├── Password.pm
│   │   │   │   │   │   ├── Progress.pm
│   │   │   │   │   │   ├── Select.pm
│   │   │   │   │   │   ├── String.pm
│   │   │   │   │   │   └── Text.pm
│   │   │   │   │   └── [01;34mWeb[0m
│   │   │   │   │       ├── Boolean.pm
│   │   │   │   │       ├── Error.pm
│   │   │   │   │       ├── Multiselect.pm
│   │   │   │   │       ├── Note.pm
│   │   │   │   │       ├── Password.pm
│   │   │   │   │       ├── Progress.pm
│   │   │   │   │       ├── Select.pm
│   │   │   │   │       ├── String.pm
│   │   │   │   │       └── Text.pm
│   │   │   │   ├── Element.pm
│   │   │   │   ├── Encoding.pm
│   │   │   │   ├── [01;34mFormat[0m
│   │   │   │   │   └── 822.pm
│   │   │   │   ├── Format.pm
│   │   │   │   ├── [01;34mFrontEnd[0m
│   │   │   │   │   ├── Dialog.pm
│   │   │   │   │   ├── Editor.pm
│   │   │   │   │   ├── Gnome.pm
│   │   │   │   │   ├── Kde.pm
│   │   │   │   │   ├── Noninteractive.pm
│   │   │   │   │   ├── Passthrough.pm
│   │   │   │   │   ├── Readline.pm
│   │   │   │   │   ├── ScreenSize.pm
│   │   │   │   │   ├── Teletype.pm
│   │   │   │   │   ├── Text.pm
│   │   │   │   │   └── Web.pm
│   │   │   │   ├── FrontEnd.pm
│   │   │   │   ├── Gettext.pm
│   │   │   │   ├── Iterator.pm
│   │   │   │   ├── Log.pm
│   │   │   │   ├── Path.pm
│   │   │   │   ├── Priority.pm
│   │   │   │   ├── Question.pm
│   │   │   │   ├── [01;34mTemplate[0m
│   │   │   │   │   └── Transient.pm
│   │   │   │   ├── Template.pm
│   │   │   │   └── TmpFile.pm
│   │   │   └── [01;34mDebian[0m
│   │   │       ├── AdduserCommon.pm
│   │   │       └── [01;34mDebConf[0m
│   │   │           └── [01;34mClient[0m
│   │   │               └── ConfModule.pm
│   │   ├── [01;34mpixmaps[0m
│   │   │   └── [01;35mdebian-logo.png[0m
│   │   ├── [01;34mpolkit-1[0m
│   │   │   └── [01;34mactions[0m
│   │   │       └── org.dpkg.pkexec.update-alternatives.policy
│   │   ├── [01;34msensible-utils[0m
│   │   │   └── [01;34mbin[0m
│   │   │       └── [01;32mgettext[0m
│   │   ├── [01;34mtabset[0m
│   │   │   ├── std
│   │   │   ├── stdcrt
│   │   │   ├── vt100
│   │   │   └── vt300
│   │   └── [01;34mterminfo[0m
│   └── [01;34msrc[0m
└── [01;34mvar[0m
    ├── [01;34mbackups[0m
    ├── [01;34mcache[0m
    │   ├── [01;34mapt[0m
    │   │   └── [01;34marchives[0m
    │   │       ├── lock
    │   │       └── [01;34mpartial[0m
    │   ├── [01;34mdebconf[0m
    │   │   ├── config.dat
    │   │   ├── passwords.dat
    │   │   └── templates.dat
    │   └── [01;34mldconfig[0m
    │       └── aux-cache
    ├── [01;34mlib[0m
    │   ├── [01;34mapt[0m
    │   │   ├── extended_states
    │   │   ├── [01;34mlists[0m
    │   │   ├── [01;34mmirrors[0m
    │   │   │   └── [01;34mpartial[0m
    │   │   └── [01;34mperiodic[0m
    │   ├── [01;34mdpkg[0m
    │   │   ├── [01;34malternatives[0m
    │   │   │   ├── awk
    │   │   │   ├── pager
    │   │   │   ├── rmt
    │   │   │   └── which
    │   │   ├── available
    │   │   ├── cmethopt
    │   │   ├── diversions
    │   │   ├── [01;34minfo[0m
    │   │   │   ├── adduser.conffiles
    │   │   │   ├── [01;32madduser.config[0m
    │   │   │   ├── adduser.list
    │   │   │   ├── adduser.md5sums
    │   │   │   ├── [01;32madduser.postinst[0m
    │   │   │   ├── [01;32madduser.postrm[0m
    │   │   │   ├── adduser.templates
    │   │   │   ├── apt.conffiles
    │   │   │   ├── apt.list
    │   │   │   ├── apt.md5sums
    │   │   │   ├── [01;32mapt.postinst[0m
    │   │   │   ├── [01;32mapt.postrm[0m
    │   │   │   ├── [01;32mapt.preinst[0m
    │   │   │   ├── [01;32mapt.prerm[0m
    │   │   │   ├── apt.shlibs
    │   │   │   ├── apt.triggers
    │   │   │   ├── base-files.conffiles
    │   │   │   ├── base-files.list
    │   │   │   ├── base-files.md5sums
    │   │   │   ├── [01;32mbase-files.postinst[0m
    │   │   │   ├── [01;32mbase-files.postrm[0m
    │   │   │   ├── [01;32mbase-files.preinst[0m
    │   │   │   ├── [01;32mbase-files.prerm[0m
    │   │   │   ├── base-passwd.list
    │   │   │   ├── base-passwd.md5sums
    │   │   │   ├── [01;32mbase-passwd.postinst[0m
    │   │   │   ├── [01;32mbase-passwd.postrm[0m
    │   │   │   ├── [01;32mbase-passwd.preinst[0m
    │   │   │   ├── base-passwd.templates
    │   │   │   ├── bash.conffiles
    │   │   │   ├── bash.list
    │   │   │   ├── bash.md5sums
    │   │   │   ├── [01;32mbash.postinst[0m
    │   │   │   ├── [01;32mbash.postrm[0m
    │   │   │   ├── [01;32mbash.prerm[0m
    │   │   │   ├── bsdutils.list
    │   │   │   ├── bsdutils.md5sums
    │   │   │   ├── coreutils.list
    │   │   │   ├── coreutils.md5sums
    │   │   │   ├── [01;32mcoreutils.postinst[0m
    │   │   │   ├── [01;32mcoreutils.postrm[0m
    │   │   │   ├── [01;32mdash.config[0m
    │   │   │   ├── dash.list
    │   │   │   ├── dash.md5sums
    │   │   │   ├── [01;32mdash.postinst[0m
    │   │   │   ├── [01;32mdash.postrm[0m
    │   │   │   ├── [01;32mdash.prerm[0m
    │   │   │   ├── dash.templates
    │   │   │   ├── debconf.conffiles
    │   │   │   ├── [01;32mdebconf.config[0m
    │   │   │   ├── debconf.list
    │   │   │   ├── debconf.md5sums
    │   │   │   ├── [01;32mdebconf.postinst[0m
    │   │   │   ├── debconf.templates
    │   │   │   ├── debianutils.list
    │   │   │   ├── debianutils.md5sums
    │   │   │   ├── [01;32mdebianutils.postinst[0m
    │   │   │   ├── [01;32mdebianutils.postrm[0m
    │   │   │   ├── [01;32mdebianutils.prerm[0m
    │   │   │   ├── debianutils.triggers
    │   │   │   ├── diffutils.list
    │   │   │   ├── diffutils.md5sums
    │   │   │   ├── dpkg.conffiles
    │   │   │   ├── dpkg.list
    │   │   │   ├── dpkg.md5sums
    │   │   │   ├── [01;32mdpkg.postinst[0m
    │   │   │   ├── [01;32mdpkg.postrm[0m
    │   │   │   ├── [01;32mdpkg.prerm[0m
    │   │   │   ├── e2fsprogs.conffiles
    │   │   │   ├── e2fsprogs.list
    │   │   │   ├── e2fsprogs.md5sums
    │   │   │   ├── [01;32me2fsprogs.postinst[0m
    │   │   │   ├── [01;32me2fsprogs.postrm[0m
    │   │   │   ├── [01;32me2fsprogs.preinst[0m
    │   │   │   ├── [01;32me2fsprogs.prerm[0m
    │   │   │   ├── findutils.list
    │   │   │   ├── findutils.md5sums
    │   │   │   ├── format
    │   │   │   ├── gcc-12-base:amd64.list
    │   │   │   ├── gcc-12-base:amd64.md5sums
    │   │   │   ├── gpgv.list
    │   │   │   ├── gpgv.md5sums
    │   │   │   ├── grep.list
    │   │   │   ├── grep.md5sums
    │   │   │   ├── gzip.list
    │   │   │   ├── gzip.md5sums
    │   │   │   ├── hostname.list
    │   │   │   ├── hostname.md5sums
    │   │   │   ├── init-system-helpers.list
    │   │   │   ├── init-system-helpers.md5sums
    │   │   │   ├── libacl1:amd64.list
    │   │   │   ├── libacl1:amd64.md5sums
    │   │   │   ├── libacl1:amd64.shlibs
    │   │   │   ├── libacl1:amd64.symbols
    │   │   │   ├── libacl1:amd64.triggers
    │   │   │   ├── libapt-pkg6.0:amd64.list
    │   │   │   ├── libapt-pkg6.0:amd64.md5sums
    │   │   │   ├── libapt-pkg6.0:amd64.shlibs
    │   │   │   ├── libapt-pkg6.0:amd64.symbols
    │   │   │   ├── libapt-pkg6.0:amd64.triggers
    │   │   │   ├── libattr1:amd64.conffiles
    │   │   │   ├── libattr1:amd64.list
    │   │   │   ├── libattr1:amd64.md5sums
    │   │   │   ├── libattr1:amd64.shlibs
    │   │   │   ├── libattr1:amd64.symbols
    │   │   │   ├── libattr1:amd64.triggers
    │   │   │   ├── libaudit1:amd64.list
    │   │   │   ├── libaudit1:amd64.md5sums
    │   │   │   ├── libaudit1:amd64.shlibs
    │   │   │   ├── libaudit1:amd64.symbols
    │   │   │   ├── libaudit1:amd64.triggers
    │   │   │   ├── libaudit-common.conffiles
    │   │   │   ├── libaudit-common.list
    │   │   │   ├── libaudit-common.md5sums
    │   │   │   ├── libblkid1:amd64.list
    │   │   │   ├── libblkid1:amd64.md5sums
    │   │   │   ├── libblkid1:amd64.shlibs
    │   │   │   ├── libblkid1:amd64.symbols
    │   │   │   ├── libblkid1:amd64.triggers
    │   │   │   ├── libbz2-1.0:amd64.list
    │   │   │   ├── libbz2-1.0:amd64.md5sums
    │   │   │   ├── libbz2-1.0:amd64.shlibs
    │   │   │   ├── libbz2-1.0:amd64.triggers
    │   │   │   ├── libc6:amd64.conffiles
    │   │   │   ├── libc6:amd64.list
    │   │   │   ├── libc6:amd64.md5sums
    │   │   │   ├── [01;32mlibc6:amd64.postinst[0m
    │   │   │   ├── [01;32mlibc6:amd64.postrm[0m
    │   │   │   ├── [01;32mlibc6:amd64.preinst[0m
    │   │   │   ├── libc6:amd64.shlibs
    │   │   │   ├── libc6:amd64.symbols
    │   │   │   ├── libc6:amd64.templates
    │   │   │   ├── libc6:amd64.triggers
    │   │   │   ├── libcap2:amd64.list
    │   │   │   ├── libcap2:amd64.md5sums
    │   │   │   ├── libcap2:amd64.shlibs
    │   │   │   ├── libcap2:amd64.symbols
    │   │   │   ├── libcap2:amd64.triggers
    │   │   │   ├── libcap-ng0:amd64.list
    │   │   │   ├── libcap-ng0:amd64.md5sums
    │   │   │   ├── libcap-ng0:amd64.shlibs
    │   │   │   ├── libcap-ng0:amd64.symbols
    │   │   │   ├── libcap-ng0:amd64.triggers
    │   │   │   ├── libc-bin.conffiles
    │   │   │   ├── libc-bin.list
    │   │   │   ├── libc-bin.md5sums
    │   │   │   ├── [01;32mlibc-bin.postinst[0m
    │   │   │   ├── libc-bin.triggers
    │   │   │   ├── libcom-err2:amd64.list
    │   │   │   ├── libcom-err2:amd64.md5sums
    │   │   │   ├── libcom-err2:amd64.shlibs
    │   │   │   ├── libcom-err2:amd64.symbols
    │   │   │   ├── libcom-err2:amd64.triggers
    │   │   │   ├── libcrypt1:amd64.list
    │   │   │   ├── libcrypt1:amd64.md5sums
    │   │   │   ├── libcrypt1:amd64.shlibs
    │   │   │   ├── libcrypt1:amd64.symbols
    │   │   │   ├── libcrypt1:amd64.triggers
    │   │   │   ├── libdb5.3:amd64.list
    │   │   │   ├── libdb5.3:amd64.md5sums
    │   │   │   ├── libdb5.3:amd64.shlibs
    │   │   │   ├── libdb5.3:amd64.triggers
    │   │   │   ├── libdebconfclient0:amd64.list
    │   │   │   ├── libdebconfclient0:amd64.md5sums
    │   │   │   ├── libdebconfclient0:amd64.shlibs
    │   │   │   ├── libdebconfclient0:amd64.symbols
    │   │   │   ├── libdebconfclient0:amd64.triggers
    │   │   │   ├── libext2fs2:amd64.list
    │   │   │   ├── libext2fs2:amd64.md5sums
    │   │   │   ├── libext2fs2:amd64.shlibs
    │   │   │   ├── libext2fs2:amd64.symbols
    │   │   │   ├── libext2fs2:amd64.triggers
    │   │   │   ├── libffi8:amd64.list
    │   │   │   ├── libffi8:amd64.md5sums
    │   │   │   ├── libffi8:amd64.shlibs
    │   │   │   ├── libffi8:amd64.symbols
    │   │   │   ├── libffi8:amd64.triggers
    │   │   │   ├── libgcc-s1:amd64.list
    │   │   │   ├── libgcc-s1:amd64.md5sums
    │   │   │   ├── libgcc-s1:amd64.shlibs
    │   │   │   ├── libgcc-s1:amd64.symbols
    │   │   │   ├── libgcc-s1:amd64.triggers
    │   │   │   ├── libgcrypt20:amd64.list
    │   │   │   ├── libgcrypt20:amd64.md5sums
    │   │   │   ├── libgcrypt20:amd64.shlibs
    │   │   │   ├── libgcrypt20:amd64.symbols
    │   │   │   ├── libgcrypt20:amd64.triggers
    │   │   │   ├── libgmp10:amd64.list
    │   │   │   ├── libgmp10:amd64.md5sums
    │   │   │   ├── libgmp10:amd64.shlibs
    │   │   │   ├── libgmp10:amd64.triggers
    │   │   │   ├── libgnutls30:amd64.list
    │   │   │   ├── libgnutls30:amd64.md5sums
    │   │   │   ├── libgnutls30:amd64.shlibs
    │   │   │   ├── libgnutls30:amd64.symbols
    │   │   │   ├── libgnutls30:amd64.triggers
    │   │   │   ├── libgpg-error0:amd64.list
    │   │   │   ├── libgpg-error0:amd64.md5sums
    │   │   │   ├── libgpg-error0:amd64.shlibs
    │   │   │   ├── libgpg-error0:amd64.symbols
    │   │   │   ├── libgpg-error0:amd64.triggers
    │   │   │   ├── libgssapi-krb5-2:amd64.list
    │   │   │   ├── libgssapi-krb5-2:amd64.md5sums
    │   │   │   ├── [01;32mlibgssapi-krb5-2:amd64.postinst[0m
    │   │   │   ├── [01;32mlibgssapi-krb5-2:amd64.postrm[0m
    │   │   │   ├── libgssapi-krb5-2:amd64.shlibs
    │   │   │   ├── libgssapi-krb5-2:amd64.symbols
    │   │   │   ├── libgssapi-krb5-2:amd64.triggers
    │   │   │   ├── libhogweed6:amd64.list
    │   │   │   ├── libhogweed6:amd64.md5sums
    │   │   │   ├── libhogweed6:amd64.shlibs
    │   │   │   ├── libhogweed6:amd64.symbols
    │   │   │   ├── libhogweed6:amd64.triggers
    │   │   │   ├── libidn2-0:amd64.list
    │   │   │   ├── libidn2-0:amd64.md5sums
    │   │   │   ├── libidn2-0:amd64.shlibs
    │   │   │   ├── libidn2-0:amd64.symbols
    │   │   │   ├── libidn2-0:amd64.triggers
    │   │   │   ├── libk5crypto3:amd64.list
    │   │   │   ├── libk5crypto3:amd64.md5sums
    │   │   │   ├── libk5crypto3:amd64.shlibs
    │   │   │   ├── libk5crypto3:amd64.symbols
    │   │   │   ├── libk5crypto3:amd64.triggers
    │   │   │   ├── libkeyutils1:amd64.list
    │   │   │   ├── libkeyutils1:amd64.md5sums
    │   │   │   ├── libkeyutils1:amd64.shlibs
    │   │   │   ├── libkeyutils1:amd64.symbols
    │   │   │   ├── libkeyutils1:amd64.triggers
    │   │   │   ├── libkrb5-3:amd64.list
    │   │   │   ├── libkrb5-3:amd64.md5sums
    │   │   │   ├── libkrb5-3:amd64.shlibs
    │   │   │   ├── libkrb5-3:amd64.symbols
    │   │   │   ├── libkrb5-3:amd64.triggers
    │   │   │   ├── libkrb5support0:amd64.list
    │   │   │   ├── libkrb5support0:amd64.md5sums
    │   │   │   ├── libkrb5support0:amd64.shlibs
    │   │   │   ├── libkrb5support0:amd64.symbols
    │   │   │   ├── libkrb5support0:amd64.triggers
    │   │   │   ├── liblz4-1:amd64.list
    │   │   │   ├── liblz4-1:amd64.md5sums
    │   │   │   ├── liblz4-1:amd64.shlibs
    │   │   │   ├── liblz4-1:amd64.symbols
    │   │   │   ├── liblz4-1:amd64.triggers
    │   │   │   ├── liblzma5:amd64.list
    │   │   │   ├── liblzma5:amd64.md5sums
    │   │   │   ├── liblzma5:amd64.shlibs
    │   │   │   ├── liblzma5:amd64.symbols
    │   │   │   ├── liblzma5:amd64.triggers
    │   │   │   ├── libmount1:amd64.list
    │   │   │   ├── libmount1:amd64.md5sums
    │   │   │   ├── libmount1:amd64.shlibs
    │   │   │   ├── libmount1:amd64.symbols
    │   │   │   ├── libmount1:amd64.triggers
    │   │   │   ├── libncurses6:amd64.list
    │   │   │   ├── libncurses6:amd64.md5sums
    │   │   │   ├── libncurses6:amd64.shlibs
    │   │   │   ├── libncurses6:amd64.symbols
    │   │   │   ├── libncurses6:amd64.triggers
    │   │   │   ├── libncursesw6:amd64.list
    │   │   │   ├── libncursesw6:amd64.md5sums
    │   │   │   ├── libncursesw6:amd64.shlibs
    │   │   │   ├── libncursesw6:amd64.symbols
    │   │   │   ├── libncursesw6:amd64.triggers
    │   │   │   ├── libnettle8:amd64.list
    │   │   │   ├── libnettle8:amd64.md5sums
    │   │   │   ├── libnettle8:amd64.shlibs
    │   │   │   ├── libnettle8:amd64.symbols
    │   │   │   ├── libnettle8:amd64.triggers
    │   │   │   ├── libnsl2:amd64.list
    │   │   │   ├── libnsl2:amd64.md5sums
    │   │   │   ├── libnsl2:amd64.shlibs
    │   │   │   ├── libnsl2:amd64.symbols
    │   │   │   ├── libnsl2:amd64.triggers
    │   │   │   ├── libp11-kit0:amd64.list
    │   │   │   ├── libp11-kit0:amd64.md5sums
    │   │   │   ├── libp11-kit0:amd64.shlibs
    │   │   │   ├── libp11-kit0:amd64.symbols
    │   │   │   ├── libp11-kit0:amd64.triggers
    │   │   │   ├── libpam0g:amd64.list
    │   │   │   ├── libpam0g:amd64.md5sums
    │   │   │   ├── [01;32mlibpam0g:amd64.postinst[0m
    │   │   │   ├── [01;32mlibpam0g:amd64.postrm[0m
    │   │   │   ├── libpam0g:amd64.shlibs
    │   │   │   ├── libpam0g:amd64.symbols
    │   │   │   ├── libpam0g:amd64.templates
    │   │   │   ├── libpam0g:amd64.triggers
    │   │   │   ├── libpam-modules:amd64.conffiles
    │   │   │   ├── libpam-modules:amd64.list
    │   │   │   ├── libpam-modules:amd64.md5sums
    │   │   │   ├── [01;32mlibpam-modules:amd64.postinst[0m
    │   │   │   ├── [01;32mlibpam-modules:amd64.postrm[0m
    │   │   │   ├── [01;32mlibpam-modules:amd64.preinst[0m
    │   │   │   ├── libpam-modules:amd64.templates
    │   │   │   ├── libpam-modules-bin.list
    │   │   │   ├── libpam-modules-bin.md5sums
    │   │   │   ├── libpam-runtime.conffiles
    │   │   │   ├── libpam-runtime.list
    │   │   │   ├── libpam-runtime.md5sums
    │   │   │   ├── [01;32mlibpam-runtime.postinst[0m
    │   │   │   ├── [01;32mlibpam-runtime.postrm[0m
    │   │   │   ├── [01;32mlibpam-runtime.prerm[0m
    │   │   │   ├── libpam-runtime.templates
    │   │   │   ├── libpcre2-8-0:amd64.list
    │   │   │   ├── libpcre2-8-0:amd64.md5sums
    │   │   │   ├── libpcre2-8-0:amd64.shlibs
    │   │   │   ├── libpcre2-8-0:amd64.symbols
    │   │   │   ├── libpcre2-8-0:amd64.triggers
    │   │   │   ├── libpcre3:amd64.list
    │   │   │   ├── libpcre3:amd64.md5sums
    │   │   │   ├── libpcre3:amd64.shlibs
    │   │   │   ├── libpcre3:amd64.symbols
    │   │   │   ├── libpcre3:amd64.triggers
    │   │   │   ├── libprocps8:amd64.list
    │   │   │   ├── libprocps8:amd64.md5sums
    │   │   │   ├── libprocps8:amd64.shlibs
    │   │   │   ├── libprocps8:amd64.triggers
    │   │   │   ├── libseccomp2:amd64.list
    │   │   │   ├── libseccomp2:amd64.md5sums
    │   │   │   ├── libseccomp2:amd64.shlibs
    │   │   │   ├── libseccomp2:amd64.symbols
    │   │   │   ├── libseccomp2:amd64.triggers
    │   │   │   ├── libselinux1:amd64.list
    │   │   │   ├── libselinux1:amd64.md5sums
    │   │   │   ├── libselinux1:amd64.shlibs
    │   │   │   ├── libselinux1:amd64.symbols
    │   │   │   ├── libselinux1:amd64.triggers
    │   │   │   ├── libsemanage2:amd64.list
    │   │   │   ├── libsemanage2:amd64.md5sums
    │   │   │   ├── libsemanage2:amd64.shlibs
    │   │   │   ├── libsemanage2:amd64.symbols
    │   │   │   ├── libsemanage2:amd64.triggers
    │   │   │   ├── libsemanage-common.conffiles
    │   │   │   ├── libsemanage-common.list
    │   │   │   ├── libsemanage-common.md5sums
    │   │   │   ├── libsepol2:amd64.list
    │   │   │   ├── libsepol2:amd64.md5sums
    │   │   │   ├── libsepol2:amd64.shlibs
    │   │   │   ├── libsepol2:amd64.symbols
    │   │   │   ├── libsepol2:amd64.triggers
    │   │   │   ├── libsmartcols1:amd64.list
    │   │   │   ├── libsmartcols1:amd64.md5sums
    │   │   │   ├── libsmartcols1:amd64.shlibs
    │   │   │   ├── libsmartcols1:amd64.symbols
    │   │   │   ├── libsmartcols1:amd64.triggers
    │   │   │   ├── libss2:amd64.list
    │   │   │   ├── libss2:amd64.md5sums
    │   │   │   ├── libss2:amd64.shlibs
    │   │   │   ├── libss2:amd64.symbols
    │   │   │   ├── libss2:amd64.triggers
    │   │   │   ├── libssl3:amd64.list
    │   │   │   ├── libssl3:amd64.md5sums
    │   │   │   ├── [01;32mlibssl3:amd64.postinst[0m
    │   │   │   ├── [01;32mlibssl3:amd64.postrm[0m
    │   │   │   ├── libssl3:amd64.shlibs
    │   │   │   ├── libssl3:amd64.symbols
    │   │   │   ├── libssl3:amd64.templates
    │   │   │   ├── libssl3:amd64.triggers
    │   │   │   ├── libstdc++6:amd64.list
    │   │   │   ├── libstdc++6:amd64.md5sums
    │   │   │   ├── [01;32mlibstdc++6:amd64.prerm[0m
    │   │   │   ├── libstdc++6:amd64.shlibs
    │   │   │   ├── libstdc++6:amd64.symbols
    │   │   │   ├── libstdc++6:amd64.triggers
    │   │   │   ├── libsystemd0:amd64.list
    │   │   │   ├── libsystemd0:amd64.md5sums
    │   │   │   ├── libsystemd0:amd64.shlibs
    │   │   │   ├── libsystemd0:amd64.symbols
    │   │   │   ├── libsystemd0:amd64.triggers
    │   │   │   ├── libtasn1-6:amd64.list
    │   │   │   ├── libtasn1-6:amd64.md5sums
    │   │   │   ├── libtasn1-6:amd64.shlibs
    │   │   │   ├── libtasn1-6:amd64.symbols
    │   │   │   ├── libtasn1-6:amd64.triggers
    │   │   │   ├── libtinfo6:amd64.list
    │   │   │   ├── libtinfo6:amd64.md5sums
    │   │   │   ├── libtinfo6:amd64.shlibs
    │   │   │   ├── libtinfo6:amd64.symbols
    │   │   │   ├── libtinfo6:amd64.triggers
    │   │   │   ├── libtirpc3:amd64.list
    │   │   │   ├── libtirpc3:amd64.md5sums
    │   │   │   ├── libtirpc3:amd64.shlibs
    │   │   │   ├── libtirpc3:amd64.symbols
    │   │   │   ├── libtirpc3:amd64.triggers
    │   │   │   ├── libtirpc-common.conffiles
    │   │   │   ├── libtirpc-common.list
    │   │   │   ├── libtirpc-common.md5sums
    │   │   │   ├── libudev1:amd64.list
    │   │   │   ├── libudev1:amd64.md5sums
    │   │   │   ├── libudev1:amd64.shlibs
    │   │   │   ├── libudev1:amd64.symbols
    │   │   │   ├── libudev1:amd64.triggers
    │   │   │   ├── libunistring2:amd64.list
    │   │   │   ├── libunistring2:amd64.md5sums
    │   │   │   ├── libunistring2:amd64.shlibs
    │   │   │   ├── libunistring2:amd64.symbols
    │   │   │   ├── libunistring2:amd64.triggers
    │   │   │   ├── libuuid1:amd64.list
    │   │   │   ├── libuuid1:amd64.md5sums
    │   │   │   ├── libuuid1:amd64.shlibs
    │   │   │   ├── libuuid1:amd64.symbols
    │   │   │   ├── libuuid1:amd64.triggers
    │   │   │   ├── libxxhash0:amd64.list
    │   │   │   ├── libxxhash0:amd64.md5sums
    │   │   │   ├── libxxhash0:amd64.shlibs
    │   │   │   ├── libxxhash0:amd64.symbols
    │   │   │   ├── libxxhash0:amd64.triggers
    │   │   │   ├── libzstd1:amd64.list
    │   │   │   ├── libzstd1:amd64.md5sums
    │   │   │   ├── libzstd1:amd64.shlibs
    │   │   │   ├── libzstd1:amd64.triggers
    │   │   │   ├── login.conffiles
    │   │   │   ├── login.list
    │   │   │   ├── login.md5sums
    │   │   │   ├── [01;32mlogin.postinst[0m
    │   │   │   ├── [01;32mlogin.postrm[0m
    │   │   │   ├── [01;32mlogin.preinst[0m
    │   │   │   ├── [01;32mlogin.prerm[0m
    │   │   │   ├── logsave.list
    │   │   │   ├── logsave.md5sums
    │   │   │   ├── lsb-base.list
    │   │   │   ├── lsb-base.md5sums
    │   │   │   ├── [01;32mlsb-base.postinst[0m
    │   │   │   ├── [01;32mlsb-base.postrm[0m
    │   │   │   ├── [01;32mlsb-base.preinst[0m
    │   │   │   ├── [01;32mlsb-base.prerm[0m
    │   │   │   ├── mawk.list
    │   │   │   ├── mawk.md5sums
    │   │   │   ├── [01;32mmawk.postinst[0m
    │   │   │   ├── [01;32mmawk.prerm[0m
    │   │   │   ├── mount.list
    │   │   │   ├── mount.md5sums
    │   │   │   ├── ncurses-base.conffiles
    │   │   │   ├── ncurses-base.list
    │   │   │   ├── ncurses-base.md5sums
    │   │   │   ├── ncurses-bin.list
    │   │   │   ├── ncurses-bin.md5sums
    │   │   │   ├── passwd.conffiles
    │   │   │   ├── passwd.list
    │   │   │   ├── passwd.md5sums
    │   │   │   ├── [01;32mpasswd.postinst[0m
    │   │   │   ├── [01;32mpasswd.postrm[0m
    │   │   │   ├── [01;32mpasswd.preinst[0m
    │   │   │   ├── [01;32mpasswd.prerm[0m
    │   │   │   ├── perl-base.list
    │   │   │   ├── perl-base.md5sums
    │   │   │   ├── [01;32mperl-base.postinst[0m
    │   │   │   ├── [01;32mperl-base.postrm[0m
    │   │   │   ├── [01;32mperl-base.preinst[0m
    │   │   │   ├── [01;32mperl-base.prerm[0m
    │   │   │   ├── procps.conffiles
    │   │   │   ├── procps.list
    │   │   │   ├── procps.md5sums
    │   │   │   ├── [01;32mprocps.postinst[0m
    │   │   │   ├── [01;32mprocps.postrm[0m
    │   │   │   ├── [01;32mprocps.preinst[0m
    │   │   │   ├── [01;32mprocps.prerm[0m
    │   │   │   ├── sed.list
    │   │   │   ├── sed.md5sums
    │   │   │   ├── sensible-utils.list
    │   │   │   ├── sensible-utils.md5sums
    │   │   │   ├── sysvinit-utils.list
    │   │   │   ├── sysvinit-utils.md5sums
    │   │   │   ├── tar.list
    │   │   │   ├── tar.md5sums
    │   │   │   ├── [01;32mtar.postinst[0m
    │   │   │   ├── [01;32mtar.prerm[0m
    │   │   │   ├── ubuntu-keyring.list
    │   │   │   ├── ubuntu-keyring.md5sums
    │   │   │   ├── [01;32mubuntu-keyring.postinst[0m
    │   │   │   ├── usrmerge.list
    │   │   │   ├── usrmerge.md5sums
    │   │   │   ├── [01;32musrmerge.postinst[0m
    │   │   │   ├── [01;32musrmerge.preinst[0m
    │   │   │   ├── util-linux.conffiles
    │   │   │   ├── util-linux.list
    │   │   │   ├── util-linux.md5sums
    │   │   │   ├── [01;32mutil-linux.postinst[0m
    │   │   │   ├── [01;32mutil-linux.postrm[0m
    │   │   │   ├── [01;32mutil-linux.preinst[0m
    │   │   │   ├── [01;32mutil-linux.prerm[0m
    │   │   │   ├── zlib1g:amd64.list
    │   │   │   ├── zlib1g:amd64.md5sums
    │   │   │   ├── zlib1g:amd64.shlibs
    │   │   │   ├── zlib1g:amd64.symbols
    │   │   │   └── zlib1g:amd64.triggers
    │   │   ├── lock
    │   │   ├── lock-frontend
    │   │   ├── [01;34mparts[0m
    │   │   ├── status
    │   │   ├── [01;34mtriggers[0m
    │   │   │   ├── File
    │   │   │   ├── ldconfig
    │   │   │   ├── Lock
    │   │   │   └── Unincorp
    │   │   └── [01;34mupdates[0m
    │   ├── [01;34mmisc[0m
    │   ├── [01;34mpam[0m
    │   │   ├── account
    │   │   ├── auth
    │   │   ├── password
    │   │   ├── seen
    │   │   ├── session
    │   │   └── session-noninteractive
    │   ├── shells.state
    │   └── [01;34msystemd[0m
    │       └── [01;34mdeb-systemd-helper-enabled[0m
    │           ├── apt-daily.timer.dsh-also
    │           ├── apt-daily-upgrade.timer.dsh-also
    │           ├── dpkg-db-backup.timer.dsh-also
    │           ├── e2scrub_all.timer.dsh-also
    │           ├── e2scrub_reap.service.dsh-also
    │           ├── fstrim.timer.dsh-also
    │           ├── motd-news.timer.dsh-also
    │           ├── [01;34mmulti-user.target.wants[0m
    │           │   └── e2scrub_reap.service
    │           └── [01;34mtimers.target.wants[0m
    │               ├── apt-daily.timer
    │               ├── apt-daily-upgrade.timer
    │               ├── dpkg-db-backup.timer
    │               ├── e2scrub_all.timer
    │               ├── fstrim.timer
    │               └── motd-news.timer
    ├── [01;34mlocal[0m
    ├── [01;36mlock[0m -> [30;42m/run/lock[0m
    ├── [01;34mlog[0m
    │   ├── alternatives.log
    │   ├── [01;34mapt[0m
    │   │   ├── [01;31meipp.log.xz[0m
    │   │   └── history.log
    │   ├── bootstrap.log
    │   ├── btmp
    │   ├── dpkg.log
    │   ├── faillog
    │   ├── lastlog
    │   └── wtmp
    ├── [01;34mmail[0m
    ├── [01;34mopt[0m
    ├── [01;36mrun[0m -> [01;34m/run[0m
    ├── [01;34mspool[0m
    │   └── [01;36mmail[0m -> [01;34m../mail[0m
    └── [30;42mtmp[0m

692 directories, 2820 files
```

- *Para explorar el contenido del directorio correspondiente a la primera capa de la imagen Docker `00-App-nodejs-v4`, ubicada en `/var/lib/docker/overlay2/043387975c35001ef7b631d7ad09d104fcb9b7970b5b3a38042167dd0c65a764/diff`, procedemos con los siguientes pasos. Asegúrate de tener acceso adecuado al entorno Docker para ejecutar estos comandos correctamente.*

1. **Acceder al directorio de la primera capa:**

   ```bash
   cd /var/lib/docker/overlay2/043387975c35001ef7b631d7ad09d104fcb9b7970b5b3a38042167dd0c65a764/diff
   ```

   **Este comando cambia el directorio actual al directorio que contiene los ficheros y configuraciones de la primera capa de la imagen Docker.**

2. **Aclaración sobre la ruta en un contenedor Docker:**

   - *En un entorno Docker, cuando referenciamos rutas como `~/Desktop` dentro de un contenedor, estamos haciendo referencia al directorio home del usuario dentro del contenedor, no al de la máquina host. Para acceder al directorio `Desktop` del usuario en la máquina host desde un contenedor, usaríamos una ruta absoluta como `/home/user/Desktop`.*

   > [!NOTE]
   > *La imagen de Ubuntu mencionada en este contexto tiene una única capa, lo que significa que toda su estructura de ficheros y configuraciones está contenida en esa única capa.*

**Para entender por qué las imágenes de sistemas operativos a menudo tienen una sola capa, revisemos ejemplos de imágenes base como Debian:**

- *[`Debian`](https://hub.docker.com/_/debian "https://hub.docker.com/_/debian")*

- *Para Debian "bullseye", podemos ver su Dockerfile y cómo se construye a partir de [`scratch`](https://github.com/debuerreotype/docker-debian-artifacts/blob/8d227a7d1f698c702d82e7de764ed0a7df65fb7c/bullseye/Dockerfile "https://github.com/debuerreotype/docker-debian-artifacts/blob/8d227a7d1f698c702d82e7de764ed0a7df65fb7c/bullseye/Dockerfile").*

```Dockerfile
FROM scratch
ADD rootfs.tar.xz /
CMD ["bash"]
```

- *La imagen `scratch` en Docker es útil para crear imágenes base extremadamente minimalistas, como se describe en [`https://hub.docker.com/_/scratch`](https://hub.docker.com/_/scratch "https://hub.docker.com/_/scratch"). Desde Docker 1.5.0, `FROM scratch` no añade una capa extra a la imagen, lo que puede resultar en imágenes de una sola capa incluso si previamente tenían dos capas.*

**A continuación, un ejemplo de uso de `scratch` en un Dockerfile para crear una imagen mínima:**

```Dockerfile
FROM scratch
COPY hello /
CMD ["/hello"]
```

- *Este ejemplo utiliza `scratch` como base y luego copia un único fichero `hello` al sistema de ficheros del contenedor, definiendo `hello` como el comando a ejecutar al iniciar el contenedor.*
