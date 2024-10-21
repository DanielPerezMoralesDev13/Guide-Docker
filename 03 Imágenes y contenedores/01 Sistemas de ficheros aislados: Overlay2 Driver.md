<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->
# ***Sistemas de Ficheros Aislados: Overlay2 Driver***

---

## ***Contenedor***

```bash
root@bd601214bedd:/# echo "fichero ubicado en el contenedor de debian-console" > ./fichero_contenedor.txt
root@bd601214bedd:/# ls --color=auto
bin   dev  fichero_contenedor.txt  lib    media  opt   root  sbin  sys  usr
boot  etc  home                    lib64  mnt    proc  run   srv   tmp  var
```

---

## ***Host de la Máquina***

```bash
Perez / ls --color=auto
bin   dev  home  lib32  libx32  media  opt  root  sbin  srv  sys  usr
boot  etc  lib   lib64  lost+found  mnt  proc  run  snap  swapfile  tmp  var

sudo bash -c 'echo "fichero ubicado dentro del host" > /fichero_host.txt'
```

*Esta solución funciona porque el comando `echo` se ejecuta en un subshell que tiene permisos de superusuario, permitiéndole escribir en el directorio raíz.*

```bash
Perez / ls --color=auto
bin   dev  fichero_host.txt  lib    lib64   lost+found  mnt  proc  run   snap  swapfile  tmp  var
boot  etc  home              lib32  libx32  media       opt  root  sbin  srv   sys       usr
```

---

## ***Copiar ficheros del Host al Contenedor***

```bash
docker cp ./fichero_host.txt debian-console:/
Successfully copied 2.05kB to debian-console:/

root@bd601214bedd:/# ls --color=auto
bin   dev  fichero_contenedor.txt  home  lib64  mnt  proc  run   srv  tmp  var
boot  etc  fichero_host.txt        lib   media  opt  root  sbin  sys  usr
```

---

## ***Copiar ficheros del Contenedor al Host***

```bash
Perez / docker cp debian-console:/fichero_contenedor.txt /home/Perez/
Successfully copied 2.05kB to /home/Perez/
```

---

## ***Aislamiento a Nivel de Usuario***

**En el host, existe el usuario Perez:**

```bash
Perez / sudo cat /etc/passwd | grep -iF "Perez"
Perez:x:1000:1000:Perez:/home/Perez:/bin/bash
Perez / echo $?
0
```

*En el contenedor, no existe el usuario Perez, ya que está aislado:*

```bash
root@bd601214bedd:/# cat /etc/passwd | grep "Perez"
root@bd601214bedd:/# echo $?
1
```

---

## ***Explicación del Aislamiento***

- *Este aislamiento sucede porque el contenedor no es más que un directorio ubicado en nuestro host. Para verificar esto mientras el contenedor está en marcha (ya que si no está en marcha, el directorio no se monta en una ruta de nuestro host), podemos usar:*

```bash
docker container inspect debian-console
docker container inspect debian-console > "metadatos_del_contenedor.json"
```

*Este comando nos proporciona información detallada sobre el contenedor y su configuración en el host.*

```json
[
    {
        "Id": "bd601214bedd5b1b1252650d5fd44ec703254c0663f9ab27c562b7d4e48507a7",
        "Created": "2024-05-29T03:43:13.936316147Z",
        "Path": "bash",
        "Args": [],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 34852,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2024-05-29T22:20:42.344071524Z",
            "FinishedAt": "2024-05-29T03:49:15.204349505Z"
        },
        "Image": "sha256:5027089adc4ce4ec3058d84ce51db1cd2f3eac5675e5aadfcf1f585f62fec9ed",
        "ResolvConfPath": "/var/lib/docker/containers/bd601214bedd5b1b1252650d5fd44ec703254c0663f9ab27c562b7d4e48507a7/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/bd601214bedd5b1b1252650d5fd44ec703254c0663f9ab27c562b7d4e48507a7/hostname",
        "HostsPath": "/var/lib/docker/containers/bd601214bedd5b1b1252650d5fd44ec703254c0663f9ab27c562b7d4e48507a7/hosts",
        "LogPath": "/var/lib/docker/containers/bd601214bedd5b1b1252650d5fd44ec703254c0663f9ab27c562b7d4e48507a7/bd601214bedd5b1b1252650d5fd44ec703254c0663f9ab27c562b7d4e48507a7-json.log",
        "Name": "/debian-console",
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
                15,
                114
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
            "PereznsMode": "",
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
                "LowerDir": "/var/lib/docker/overlay2/fc9c74a8947c33f98c49bba68aee83c85de51c8e6f97160f20c747eee5874685-init/diff:/var/lib/docker/overlay2/cc109319a5c88e90713cff9890a0a7ae15c13670de189da85ecde4a28e1294e8/diff",
                "MergedDir": "/var/lib/docker/overlay2/fc9c74a8947c33f98c49bba68aee83c85de51c8e6f97160f20c747eee5874685/merged",
                "UpperDir": "/var/lib/docker/overlay2/fc9c74a8947c33f98c49bba68aee83c85de51c8e6f97160f20c747eee5874685/diff",
                "WorkDir": "/var/lib/docker/overlay2/fc9c74a8947c33f98c49bba68aee83c85de51c8e6f97160f20c747eee5874685/work"
            },
            "Name": "overlay2"
        },
        "Mounts": [],
        "Config": {
            "Hostname": "bd601214bedd",
            "Domainname": "",
            "Perez": "",
            "AttachStdin": true,
            "AttachStdout": true,
            "AttachStderr": true,
            "Tty": true,
            "OpenStdin": true,
            "StdinOnce": true,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": [
                "bash"
            ],
            "Image": "debian",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": {}
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "ba2842c9f3d887de2d91b366063517b0d02e13f68984147b1c4df119f232a246",
            "SandboxKey": "/var/run/docker/netns/ba2842c9f3d8",
            "Ports": {},
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "58d3ffb87e33b301afda59ee3d8b6de40a8172cf6037f8bfbedfb4ce9cb0b370",
            "Gateway": "172.17.0.1",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "172.17.0.2",
            "IPPrefixLen": 16,
            "IPv6Gateway": "",
            "MacAddress": "02:42:ac:11:00:02",
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "MacAddress": "02:42:ac:11:00:02",
                    "NetworkID": "4ec5e2beb285ecd7e5ba16c5932fa8b050d3ea8b70c4d4b4848969faf00ee44e",
                    "EndpointID": "58d3ffb87e33b301afda59ee3d8b6de40a8172cf6037f8bfbedfb4ce9cb0b370",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.2",
                    "IPPrefixLen": 16,
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

---

## ***Información Específica del GraphDriver***

- *El `GraphDriver` es el controlador de sistemas de ficheros de imágenes y contenedores en Docker. Actualmente, el controlador utilizado es `overlay2`, y en el JSON podemos ver una serie de directorios ubicados en `/var/lib/docker/overlay2/`.*

```json
"GraphDriver": {
    "Data": {
        "LowerDir": "/var/lib/docker/overlay2/fc9c74a8947c33f98c49bba68aee83c85de51c8e6f97160f20c747eee5874685-init/diff:/var/lib/docker/overlay2/cc109319a5c88e90713cff9890a0a7ae15c13670de189da85ecde4a28e1294e8/diff",
        "MergedDir": "/var/lib/docker/overlay2/fc9c74a8947c33f98c49bba68aee83c85de51c8e6f97160f20c747eee5874685/merged",
        "UpperDir": "/var/lib/docker/overlay2/fc9c74a8947c33f98c49bba68aee83c85de51c8e6f97160f20c747eee5874685/diff",
        "WorkDir": "/var/lib/docker/overlay2/fc9c74a8947c33f98c49bba68aee83c85de51c8e6f97160f20c747eee5874685/work"
    },
    "Name": "overlay2"
}
```

---

## ***Explorando los Directorios de Docker***

```bash
Perez / sudo ls --color=auto /var/lib/docker/overlay2
0b7e0cc9e50beef006a157669cf892242059a7de5c1f036ff1943f49dd7f86d8
0b7e0cc9e50beef006a157669cf892242059a7de5c1f036ff1943f49dd7f86d8-init
4d959d3d91d5ed9bf1187f728c12794b71613f15c32562125a826b7855296d3f
646adcb1ac5992c52bb704c7d14106f70f22ea4b9c94859fe9b953a77de8fd6d
646adcb1ac5992c52bb704c7d14106f70f22ea4b9c94859fe9b953a77de8fd6d-init
6c6544362c28f61aefeab411d810b058b1b49b32d3de28ec6876cb7b7fef4577
6ce8a982006cb4f5ce9941e63a18c328037c44c68f89a6a43617eae15f2f40c3
6ce8a982006cb4f5ce9941e63a18c328037c44c68f89a6a43617eae15f2f40c3-init
a3f82decf65d5b4ef704e7142673dbdae38c31abc2cfeb4a44f90a4e058adb6f
cc109319a5c88e90713cff9890a0a7ae15c13670de189da85ecde4a28e1294e8
d1f98b86692b19060af847ae9c52f377182a5df5d79e0d4c1e020d4e53e26324
d1f98b86692b19060af847ae9c52f377182a5df5d79e0d4c1e020d4e53e26324-init
e700edf02396e95e3c41adbe1fa10f9324c2ef70369f0e41d99c8e111fe1881b
e700edf02396e95e3c41adbe1fa10f9324c2ef70369f0e41d99c8e111fe1881b-init
fc9c74a8947c33f98c49bba68aee83c85de51c8e6f97160f20c747eee5874685
fc9c74a8947c33f98c49bba68aee83c85de51c8e6f97160f20c747eee5874685-init
```

*La salida muestra una serie de directorios, cada uno correspondiente a un sistema de ficheros de Docker usado por un contenedor o por una imagen, cada uno con su identificador (ID).*

---

## ***Funcionamiento de los Directorios por Capas***

- *Los directorios `"LowerDir"`, `"MergedDir"`, `"UpperDir"`, y `"WorkDir"` funcionan por capas, de manera similar a los commits de Git.*

### ***Ejemplo con Git***

- *Al crear un commit y añadir un fichero:*

```plaintext
Commit 1:
Directorio1
  ├── Fichero1
```

**Al crear otro commit y añadir un fichero más:**

```plaintext
Commit 2:
Directorio1
  ├── Fichero1
  ├── Fichero2
```

**Estos dos commits tendrán una diferencia, conocida en Git como `diff`:**

```plaintext
Commit 1                    Diff                    Commit 2
Directorio1               + Fichero2              Directorio1
  ├── Fichero1                                    ├── Fichero1
                                                  ├── Fichero2
```

*![imagen de referencia de commits de git](../images/images%20commits%20de%20git.png "../images/images commits de git.png")*

---

### ***Capas en Docker***

- *Las capas funcionan de la misma manera. Las imágenes están definidas por capas, y cada capa es como un commit. La capa final de una imagen representa el sistema de ficheros completo definido por esa imagen. Por ejemplo, la imagen de Debian tendría su última capa como un commit con todo su contenido. Al trabajar con nuestro contenedor, generamos una diferencia respecto al sistema de ficheros base de la imagen, añadiendo ficheros, binarios, directorios, configuraciones, etc. Si combinamos la diferencia generada con el sistema base de la imagen, obtenemos el sistema completo del contenedor.*

*![imagen de referencia de capas de docker](../images/images%20capas%20de%20docker.png "../images/images capas de docker.png")*

---

## ***Información Específica del `GraphDriver`***

- *El `GraphDriver` es el controlador de sistemas de ficheros de imágenes y contenedores en Docker. Actualmente, el controlador utilizado es `overlay2`, y en el JSON podemos ver una serie de directorios ubicados en `/var/lib/docker/overlay2/`.*

```json
"GraphDriver": {
    "Data": {
        "LowerDir": "/var/lib/docker/overlay2/fc9c74a8947c33f98c49bba68aee83c85de51c8e6f97160f20c747eee5874685-init/diff:/var/lib/docker/overlay2/cc109319a5c88e90713cff9890a0a7ae15c13670de189da85ecde4a28e1294e8/diff",
        "MergedDir": "/var/lib/docker/overlay2/fc9c74a8947c33f98c49bba68aee83c85de51c8e6f97160f20c747eee5874685/merged",
        "UpperDir": "/var/lib/docker/overlay2/fc9c74a8947c33f98c49bba68aee83c85de51c8e6f97160f20c747eee5874685/diff",
        "WorkDir": "/var/lib/docker/overlay2/fc9c74a8947c33f98c49bba68aee83c85de51c8e6f97160f20c747eee5874685/work"
    },
    "Name": "overlay2"
}
```

---

## ***Explorando los Directorios de Docker LowerDir***

- *El directorio `"LowerDir"` está separado por el carácter `:`. Si analizamos la última ruta y ejecutamos:*

```bash
sudo ls --color=auto /var/lib/docker/overlay2/cc109319a5c88e90713cff9890a0a7ae15c13670de189da85ecde4a28e1294e8/diff
```

**Obtendremos una lista similar a la siguiente:**

```plaintext
bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
```

*Esto es lo que había en el contenedor cuando se arrancó por primera vez. Si creamos ficheros o directorios, aparecerán en el directorio `"UpperDir"`:*

```bash
sudo ls --color=auto /var/lib/docker/overlay2/fc9c74a8947c33f98c49bba68aee83c85de51c8e6f97160f20c747eee5874685/diff
```

**Esto dará una salida similar a:**

```plaintext
user.txt  fichero_contenedor.txt  fichero_host.txt  root  tmp  var
```

*Aquí encontrarás cualquier fichero, directorio, binario modificado o creado. Por ejemplo, es probable que veas el directorio `home` del `root` porque se habrá editado un fichero oculto o algo similar. Además, como hicimos un `apt-get update`, se habrá modificado algo en los directorios `tmp` y `var`.*

*El contenido de este `diff` es la diferencia con respecto al sistema base de la imagen. Estas diferencias se han generado dentro del contenedor.*

---

## ***Combinando Diferencias con el Sistema Base***

**Para combinar las diferencias con el sistema base, usamos:**

```plaintext
"MergedDir": "/var/lib/docker/overlay2/fc9c74a8947c33f98c49bba68aee83c85de51c8e6f97160f20c747eee5874685/merged"
```

*El `MergedDir` es similar a `UpperDir`, solo cambia `diff` por `merged`, ya que los hashes coinciden. Podemos navegar a este directorio, pero debemos ser usuarios `root`:*

```bash
cd /var/lib/docker/overlay2/fc9c74a8947c33f98c49bba68aee83c85de51c8e6f97160f20c747eee5874685/merged
sudo ls
```

**Obtendremos:**

```plaintext
bin        etc                                                                       home   mnt   run   tmp
boot       fichero_contenedor.txt                                                    lib    opt   sbin  usr
user.txt  fichero_creado_desde_el_host_en_el_directorio_aislado_del_contenedor.txt  lib64  proc  srv   var
dev        fichero_host.txt                                                          media  root  sys
```

**Todo esto no es más que un directorio que se interpreta como el directorio raíz en el kernel.**

```bash
cd /
pwd
# /
cd ..
# /
```

*No podemos ir hacia atrás porque ya estamos en la raíz del contenedor. En el host, sin embargo, sí podemos:*

```bash
cd ..
# /var/lib/docker/overlay2/fc9c74a8947c33f98c49bba68aee83c85de51c8e6f97160f20c747eee5874685
```

- *El contenedor está aislado, lo que es beneficioso para la seguridad. Si tenemos un backend, una API o un servicio dentro de un contenedor Docker y alguien lo hackea con acceso `root`, será más complicado que comprometan la máquina anfitriona. Aunque no es imposible, es más difícil, proporcionando una capa adicional de seguridad solo por usar Docker.*

---

## ***Cada Contenedor Tiene su Propio Sistema de Ficheros Aislado***

```bash
docker container create --interactive --tty --name debian-3 debian
docker container start --interactive debian-3
root@385d36137fef:/# ls --color=auto
bin   dev  home  lib64  mnt  proc  run   srv  tmp  var
boot  etc  lib   media  opt  root  sbin  sys  usr
```

*Como vemos, los ficheros creados en el contenedor anterior no están presentes porque los contenedores están aislados entre sí. Podemos comprobarlo con:*

```bash
docker inspect debian-3
docker inspect debian-3 > "./metadatos_del_nuevo_contenedor.json"
```

```json
[
    {
        "Id": "385d36137fef02ab8239587be5c8cfde0ede40e36f525c687c4f0d9d621409b4",
        "Created": "2024-05-30T02:40:08.704196304Z",
        "Path": "bash",
        "Args": [],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 215313,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2024-05-30T02:41:17.588709181Z",
            "FinishedAt": "0001-01-01T00:00:00Z"
        },
        "Image": "sha256:5027089adc4ce4ec3058d84ce51db1cd2f3eac5675e5aadfcf1f585f62fec9ed",
        "ResolvConfPath": "/var/lib/docker/containers/385d36137fef02ab8239587be5c8cfde0ede40e36f525c687c4f0d9d621409b4/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/385d36137fef02ab8239587be5c8cfde0ede40e36f525c687c4f0d9d621409b4/hostname",
        "HostsPath": "/var/lib/docker/containers/385d36137fef02ab8239587be5c8cfde0ede40e36f525c687c4f0d9d621409b4/hosts",
        "LogPath": "/var/lib/docker/containers/385d36137fef02ab8239587be5c8cfde0ede40e36f525c687c4f0d9d621409b4/385d36137fef02ab8239587be5c8cfde0ede40e36f525c687c4f0d9d621409b4-json.log",
        "Name": "/debian-3",
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
                12,
                89
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
                "LowerDir": "/var/lib/docker/overlay2/142ae4e1f3ac5b885b6e1d49bd64c72c4761d035230dfef8b2b6e9c0a666a0c0-init/diff:/var/lib/docker/overlay2/cc109319a5c88e90713cff9890a0a7ae15c13670de189da85ecde4a28e1294e8/diff",
                "MergedDir": "/var/lib/docker/overlay2/142ae4e1f3ac5b885b6e1d49bd64c72c4761d035230dfef8b2b6e9c0a666a0c0/merged",
                "UpperDir": "/var/lib/docker/overlay2/142ae4e1f3ac5b885b6e1d49bd64c72c4761d035230dfef8b2b6e9c0a666a0c0/diff",
                "WorkDir": "/var/lib/docker/overlay2/142ae4e1f3ac5b885b6e1d49bd64c72c4761d035230dfef8b2b6e9c0a666a0c0/work"
            },
            "Name": "overlay2"
        },
        "Mounts": [],
        "Config": {
            "Hostname": "385d36137fef",
            "Domainname": "",
            "User": "",
            "AttachStdin": true,
            "AttachStdout": true,
            "AttachStderr": true,
            "Tty": true,
            "OpenStdin": true,
            "StdinOnce": true,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": [
                "bash"
            ],
            "Image": "debian",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": {}
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "bec96648543987fba83616a3497ff84d6327e4bdb8b2e0780efa0a8229be4c3c",
            "SandboxKey": "/var/run/docker/netns/bec966485439",
            "Ports": {},
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "0516cde459b3150f0c49290e94834aa7907691b7fc39928575821b739c79a2a4",
            "Gateway": "172.17.0.1",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "172.17.0.2",
            "IPPrefixLen": 16,
            "IPv6Gateway": "",
            "MacAddress": "02:42:ac:11:00:02",
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "MacAddress": "02:42:ac:11:00:02",
                    "NetworkID": "4ec5e2beb285ecd7e5ba16c5932fa8b050d3ea8b70c4d4b4848969faf00ee44e",
                    "EndpointID": "0516cde459b3150f0c49290e94834aa7907691b7fc39928575821b739c79a2a4",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.2",
                    "IPPrefixLen": 16,
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

---

## ***Aislamiento de Sistemas de ficheros en Docker***

---

### ***`GraphDriver` y sus Directorios***

- *El `GraphDriver` en Docker maneja los sistemas de ficheros de imágenes y contenedores. En el ejemplo siguiente, observamos que el controlador utilizado es `overlay2`:*

```json
"GraphDriver": {
    "Data": {
        "LowerDir": "/var/lib/docker/overlay2/142ae4e1f3ac5b885b6e1d49bd64c72c4761d035230dfef8b2b6e9c0a666a0c0-init/diff:/var/lib/docker/overlay2/cc109319a5c88e90713cff9890a0a7ae15c13670de189da85ecde4a28e1294e8/diff",
        "MergedDir": "/var/lib/docker/overlay2/142ae4e1f3ac5b885b6e1d49bd64c72c4761d035230dfef8b2b6e9c0a666a0c0/merged",
        "UpperDir": "/var/lib/docker/overlay2/142ae4e1f3ac5b885b6e1d49bd64c72c4761d035230dfef8b2b6e9c0a666a0c0/diff",
        "WorkDir": "/var/lib/docker/overlay2/142ae4e1f3ac5b885b6e1d49bd64c72c4761d035230dfef8b2b6e9c0a666a0c0/work"
    },
    "Name": "overlay2"
}
```

---

### ***Función de los Directorios***

- **LowerDir:** *Contiene las capas de imagen base.*
- **MergedDir:** *Directorio donde se montan todas las capas combinadas, sólo visible cuando el contenedor está en ejecución.*
- **UpperDir:** *Contiene los cambios realizados en el contenedor (diferencias).*
- **WorkDir:** *Directorio de trabajo usado internamente por el driver `overlay2`.*

### ***Función de los Directorios en el Driver Overlay2***

- *Docker utiliza un sistema de ficheros en capas para gestionar las imágenes y contenedores. Este enfoque se realiza a través de drivers de almacenamiento, siendo `overlay2` uno de los más eficientes y comunes. A continuación, se detallan las funciones de los directorios clave utilizados por el driver `overlay2`:*

- **LowerDir:**
  - **Función:** *Contiene las capas de las imágenes base. Estas capas son de solo lectura y forman la base sobre la cual se construyen los contenedores. Cada capa contiene los ficheros y directorios que fueron añadidos o modificados en cada paso de la construcción de la imagen.*
  - **Detalles Técnicos:** *En `overlay2`, `LowerDir` puede contener múltiples capas, apiladas unas sobre otras. Estas capas son referenciadas por el sistema de ficheros del contenedor pero no pueden ser modificadas directamente. Cuando se crea una imagen nueva, se añade una nueva capa a la parte superior de `LowerDir`.*

- **MergedDir:**
  - **Función:** *Este es el directorio donde se montan todas las capas combinadas. Aquí es donde se ve el sistema de ficheros del contenedor como una única entidad unificada, combinando las capas de `LowerDir` y cualquier cambio en `UpperDir`.*
  - **Detalles Técnicos:** *El `MergedDir` sólo es visible cuando el contenedor está en ejecución. El sistema de ficheros del contenedor, visto por el usuario o las aplicaciones dentro del contenedor, es en realidad una vista de `MergedDir`, que es el resultado de la combinación de las capas inferiores y la capa superior.*

- **UpperDir:**
  - **Función:** *Este directorio contiene los cambios realizados en el contenedor, conocidos como diferencias (diffs). Cualquier modificación que se haga dentro del contenedor, como la creación, modificación o eliminación de ficheros, se almacena aquí.*
  - **Detalles Técnicos:** *`UpperDir` es una capa de lectura-escritura. Cuando un contenedor modifica un fichero que está en una capa inferior, el fichero se copia primero a `UpperDir` y luego se modifica. Este proceso se conoce como "copy-on-write". Los cambios son persistentes mientras el contenedor está en ejecución, pero pueden perderse si el contenedor se elimina sin realizar un commit a una nueva imagen.*

- **WorkDir:**
  - **Función:** *Este es un directorio de trabajo usado internamente por el driver `overlay2` durante operaciones de fusión y mantenimiento de capas.*
  - **Detalles Técnicos:** *`WorkDir` es utilizado para tareas temporales y de gestión de capas. Por ejemplo, cuando se aplican cambios de `UpperDir` a `MergedDir`, `WorkDir` proporciona un espacio de trabajo temporal para estas operaciones. Aunque el usuario generalmente no interactúa directamente con este directorio, es crucial para el funcionamiento eficiente del sistema de ficheros en capas.*

### ***Consideraciones Adicionales***

- **Eficiencia del Sistema de Ficheros en Capas:**
  - *El uso de un sistema de ficheros en capas permite a Docker gestionar imágenes y contenedores de manera eficiente. Las capas pueden ser reutilizadas entre múltiples contenedores, ahorrando espacio y reduciendo tiempos de construcción.*
  - *Las capas inferiores, al ser de solo lectura, proporcionan una base sólida y consistente sobre la cual se pueden construir múltiples contenedores, asegurando que las aplicaciones tengan una base común y confiable.*

- **Persistencia de Datos:**
  - *Los cambios en `UpperDir` son específicos del contenedor y no se persisten en la imagen base a menos que se realice un commit de los cambios. Esto permite mantener la integridad de la imagen base mientras se experimenta o se realizan desarrollos en los contenedores.*
  - *Para asegurar la persistencia de datos críticos, se recomienda utilizar volúmenes de Docker, que son independientes del ciclo de vida de los contenedores y proporcionan almacenamiento persistente.*

*Esta estructura de directorios y el manejo de capas subyacen al poder y flexibilidad de Docker, permitiendo una gestión eficiente y modular de aplicaciones en contenedores.*

---

### ***Explorando los Directorios***

*El directorio `LowerDir` se especifica con varias rutas separadas por `:`. Al listar su contenido, se observa la estructura de ficheros y directorios del contenedor:*

```bash
sudo ls --color=auto /var/lib/docker/overlay2/cc109319a5c88e90713cff9890a0a7ae15c13670de189da85ecde4a28e1294e8/diff
```

**Salida:**

```plaintext
bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
```

- *Esto refleja el contenido original del contenedor al iniciarse por primera vez.*

---

### ***Directorio `UpperDir`***

- *Los cambios realizados en el contenedor se reflejan en `UpperDir`:*

```bash
sudo ls --color=auto /var/lib/docker/overlay2/142ae4e1f3ac5b885b6e1d49bd64c72c4761d035230dfef8b2b6e9c0a666a0c0/diff
```

**Salida:**

```plaintext
user.txt  fichero_contenedor.txt  fichero_host.txt  root  tmp  var
```

**Este directorio contiene los ficheros y directorios modificados o creados en el contenedor.**

---

### ***Directorio `MergedDir`***

- *El directorio `MergedDir` combina las capas base y los cambios, pero sólo está montado mientras el contenedor está en ejecución:*

```bash
cd /var/lib/docker/overlay2/142ae4e1f3ac5b885b6e1d49bd64c72c4761d035230dfef8b2b6e9c0a666a0c0/merged
ls
```

**Salida:**

```plaintext
bin        etc                                                                       home   mnt   run   tmp
boot       fichero_contenedor.txt                                                    lib    opt   sbin  usr
user.txt  fichero_creado_desde_el_host_en_el_directorio_aislado_del_contenedor.txt  lib64  proc  srv   var
dev        fichero_host.txt                                                          media  root  sys
```

---

### ***Aislamiento de Contenedores***

- *Cada contenedor tiene un sistema de ficheros aislado, lo que significa que los cambios en un contenedor no afectan a otros. Esto se refleja en los distintos hashes de los directorios:*

```bash
➜  root ~ ls /var/lib/docker/overlay2/
0b7e0cc9e50beef006a157669cf892242059a7de5c1f036ff1943f49dd7f86d8
0b7e0cc9e50beef006a157669cf892242059a7de5c1f036ff1943f49dd7f86d8-init
142ae4e1f3ac5b885b6e1d49bd64c72c4761d035230dfef8b2b6e9c0a666a0c0
142ae4e1f3ac5b885b6e1d49bd64c72c4761d035230dfef8b2b6e9c0a666a0c0-init
...
fc9c74a8947c33f98c49bba68aee83c85de51c8e6f97160f20c747eee5874685
fc9c74a8947c33f98c49bba68aee83c85de51c8e6f97160f20c747eee5874685-init
```

---

### ***Creación y Aislamiento de Contenedores***

**Cada contenedor nuevo tiene su propio sistema de ficheros:**

```bash
docker container create --interactive --tty --name debian-3 debian
docker container start --interactive debian-3
root@385d36137fef:/# ls --color=auto
bin   dev  home  lib64  mnt  proc  run   srv  tmp  var
boot  etc  lib   media  opt  root  sbin  sys  usr
```

**Estos ficheros son diferentes de los de otros contenedores, como se puede verificar con:**

```bash
docker inspect debian-3
docker inspect debian-3 > "./metadatos_del_nuevo_contenedor.json"
```

*La diferencia en los hashes de los directorios asegura que los cambios en un contenedor no se reflejen en otro, manteniendo así su aislamiento.*

---

#### ***`docker container cp`***

> [!NOTE]
> *El comando `docker container cp` no acepta expresiones regulares directamente. Este comando se utiliza para copiar files y directorios entre el sistema de files del host y un contenedor de Docker, pero los nombres de los files o directorios deben especificarse de manera exacta.*

*Si deseas copiar varios files que coincidan con un patrón, una solución es usar un script o un comando que genere la lista de files que deseas copiar y luego ejecutar `docker container cp` para cada uno de ellos. Por ejemplo, podrías usar un comando como `find` en combinación con un bucle para copiar múltiples files que coincidan con un patrón específico.*

---

### ***Paso a Paso***

1. **Identifica tu contenedor:** *Asegúrate de saber el nombre o ID del contenedor al que deseas copiar los files.*

2. **Define el directorio y patrón:** *Define el directorio en el host desde el cual deseas copiar los files y el patrón de files (por ejemplo, `*.json`).*

3. **Usa un script de bash:** *Puedes crear un script sencillo para hacer la copia. Aquí hay un ejemplo:*

    ```bash
    #!/usr/bin/env bash

    # Variables
    DIRECTORIO_ORIGEN="/home/d4nitrix13/Escritorio/Csv" # Cambia esto a tu directorio
    PATRON="*.csv"  # Cambia esto al patrón que necesites
    CONTENEDOR="DeveloperContainer"  # Cambia esto al nombre o ID de tu contenedor
    DIRECTORIO_DESTINO="/home/vscode"  # Cambia esto a tu destino en el contenedor

    # Copiar files
    for file in $DIRECTORIO_ORIGEN/$PATRON; do
        if [ -e "$file" ]; then  # Verifica si el file existe
            docker container cp "$file" "$CONTENEDOR:$DIRECTORIO_DESTINO"
            echo "Copiado: $file a $CONTENEDOR:$DIRECTORIO_DESTINO"
        fi
    done
    ```

4. **Guarda y ejecuta el script:**
   - *Guarda el script en un file, por ejemplo, `script.sh`.*
   - *Asegúrate de darle permisos de ejecución: `chmod +x script.sh`.*
   - *Luego, ejecuta el script: `./script.sh`.*

```bash
./script.sh
Successfully copied 2.05kB to DeveloperContainer:/home/vscode
Copiado: /home/d4nitrix13/Escritorio/Csv/Categories.csv a DeveloperContainer:/home/vscode
Successfully copied 9.22kB to DeveloperContainer:/home/vscode
Copiado: /home/d4nitrix13/Escritorio/Csv/Customers.csv a DeveloperContainer:/home/vscode
Successfully copied 4.61kB to DeveloperContainer:/home/vscode
Copiado: /home/d4nitrix13/Escritorio/Csv/Employees.csv a DeveloperContainer:/home/vscode
Successfully copied 9.73kB to DeveloperContainer:/home/vscode
Copiado: /home/d4nitrix13/Escritorio/Csv/OrderDetails.csv a DeveloperContainer:/home/vscode
Successfully copied 6.66kB to DeveloperContainer:/home/vscode
Copiado: /home/d4nitrix13/Escritorio/Csv/Orders.csv a DeveloperContainer:/home/vscode
Successfully copied 5.63kB to DeveloperContainer:/home/vscode
Copiado: /home/d4nitrix13/Escritorio/Csv/Products.csv a DeveloperContainer:/home/vscode
Successfully copied 2.05kB to DeveloperContainer:/home/vscode
Copiado: /home/d4nitrix13/Escritorio/Csv/Shippers.csv a DeveloperContainer:/home/vscode
Successfully copied 4.61kB to DeveloperContainer:/home/vscode
Copiado: /home/d4nitrix13/Escritorio/Csv/Suppliers.csv a DeveloperContainer:/home/vscode
```

---

### ***Entrar al directorio `/home/vscode` dentro de tu contenedor***

> [!TIP]
> *Si deseas entrar al directorio `/home/vscode` dentro de tu contenedor `container-sqlite3-practicas`, puedes hacerlo con el siguiente comando:*

```bash
docker exec -it container-sqlite3-practicas bash -c "cd /home/vscode && exec bash"
```

*Este comando te coloca en el directorio `/home/vscode` dentro del contenedor. Aquí tienes un desglose:*

- **`docker exec -it container-sqlite3-practicas`:** *Esto inicia un nuevo proceso en el contenedor.*
- **`bash -c "cd /home/vscode && exec bash"`:** *Esto cambia al directorio deseado y luego inicia una nueva sesión de bash en ese directorio.*

```bash
root ➜ /home/vscode $ ls -l *.csv
-rw-rw-r-- 1 vscode vscode  393 Oct 21 22:39 Categories.csv
-rw-rw-r-- 1 vscode vscode 7418 Oct 21 22:39 Customers.csv
-rw-rw-r-- 1 vscode vscode 2709 Oct 21 22:39 Employees.csv
-rw-rw-r-- 1 vscode vscode 8098 Oct 21 22:39 OrderDetails.csv
-rw-rw-r-- 1 vscode vscode 4739 Oct 21 22:39 Orders.csv
-rw-rw-r-- 1 vscode vscode 3594 Oct 21 22:39 Products.csv
-rw-rw-r-- 1 vscode vscode  126 Oct 21 22:39 Shippers.csv
-rw-rw-r-- 1 vscode vscode 2831 Oct 21 22:39 Suppliers.csv
```

---

### ***Notas***

- *Asegúrate de tener los permisos necesarios para acceder a los files en el directorio de origen y para realizar operaciones en el contenedor.*
- *Modifica las variables al inicio del script según tus necesidades específicas.*
