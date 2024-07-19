<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->
# ***Procesos Aislados en Docker***

> [!NOTE]
> *En Docker, los procesos se ejecutan en contenedores aislados, lo que proporciona un entorno seguro y consistente para ejecutar aplicaciones. Aquí hay una guía para trabajar con contenedores en Docker:*

---

## ***Descargar una Imagen***

- *Antes de crear un contenedor, es necesario descargar la imagen deseada desde Docker Hub u otro registro de imágenes. Utilice el siguiente comando para descargar una imagen:*

```bash
docker image pull <image>
```

---

## ***Crear y Ejecutar un Contenedor***

- *Para crear un nuevo contenedor y ejecutarlo en modo interactivo, utilice el comando `docker run`:*

```bash
docker run -i --tty --name <nombre-contenedor> <image>
```

**También hay formas abreviadas de ejecutar este comando:**

```bash
docker run -i -t --name <nombre-contenedor> <image>
docker run -it --name <nombre-contenedor> <image>
docker run -ti --name <nombre-contenedor> <image>
```

---

## ***Diferencia entre `run` y `start`***

- *Es importante entender la diferencia entre `docker run` y `docker start`. `docker run` crea y ejecuta un nuevo contenedor, mientras que `docker start` inicia un contenedor existente.*

---

## ***Ejemplo de `docker run`***

```bash
docker run -it --name fedora-container fedora
```

- *Este comando creará un nuevo contenedor a partir de la imagen `fedora` y lo iniciará en modo interactivo. Puede realizar cambios dentro del contenedor, como crear ficheros o instalar paquetes, sin afectar al sistema host.*

---

## ***Aislamiento entre Contenedores***

- *Los contenedores están completamente aislados entre sí. Por ejemplo, si crea un fichero dentro de un contenedor, este fichero no estará presente en otros contenedores. Además, cada contenedor debe tener un nombre único.*

---

## ***Uso Eficiente de Imágenes Descargadas***

- *Una vez que una imagen se ha descargado, Docker la almacena localmente. Por lo tanto, cuando se crea un nuevo contenedor utilizando una imagen previamente descargada, no es necesario volver a descargarla. Esto agiliza el proceso de creación de contenedores.*

## ***Acceso a Herramientas y Binarios***

- *Aunque los contenedores están aislados, pueden contener herramientas y binarios específicos. Por ejemplo, al ejecutar un contenedor Fedora, se puede acceder a las herramientas y utilidades propias de Fedora dentro del contenedor, como `dnf`.*

## ***Verificación de Contenedores***

- *Puede verificar la configuración y los metadatos de un contenedor utilizando el comando `docker container inspect`:*

```bash
docker container inspect <nombre-contenedor>
```

- *Esto proporcionará información detallada sobre el contenedor, incluidos los volúmenes montados, la configuración de red y más.*

```bash
[
    {
        "Id": "de6b2a9a4f21b92239f5ffe0d0a8e614afd864bfac9b23f9f30662892700677b",
        "Created": "2024-05-30T17:45:16.512104713Z",
        "Path": "/bin/bash",
        "Args": [],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 60566,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2024-05-30T17:54:59.209942703Z",
            "FinishedAt": "2024-05-30T17:47:50.990935257Z"
        },
        "Image": "sha256:5e22da79803c567fceb0e255f1168977259525a4279cb518016a60df025412fb",
        "ResolvConfPath": "/var/lib/docker/containers/de6b2a9a4f21b92239f5ffe0d0a8e614afd864bfac9b23f9f30662892700677b/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/de6b2a9a4f21b92239f5ffe0d0a8e614afd864bfac9b23f9f30662892700677b/hostname",
        "HostsPath": "/var/lib/docker/containers/de6b2a9a4f21b92239f5ffe0d0a8e614afd864bfac9b23f9f30662892700677b/hosts",
        "LogPath": "/var/lib/docker/containers/de6b2a9a4f21b92239f5ffe0d0a8e614afd864bfac9b23f9f30662892700677b/de6b2a9a4f21b92239f5ffe0d0a8e614afd864bfac9b23f9f30662892700677b-json.log",
        "Name": "/fedora-container",
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
                25,
                111
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
                "LowerDir": "/var/lib/docker/overlay2/5d483e229a5bba6ebf8581da7a9c7a5c6902ce1e760b2a8bbed87e7604ca7adf-init/diff:/var/lib/docker/overlay2/d6d5c6fcc0024a21dc3ca91eb0ac1237b2960dc87dc970489dd75c3158bc3b8a/diff",
                "MergedDir": "/var/lib/docker/overlay2/5d483e229a5bba6ebf8581da7a9c7a5c6902ce1e760b2a8bbed87e7604ca7adf/merged",
                "UpperDir": "/var/lib/docker/overlay2/5d483e229a5bba6ebf8581da7a9c7a5c6902ce1e760b2a8bbed87e7604ca7adf/diff",
                "WorkDir": "/var/lib/docker/overlay2/5d483e229a5bba6ebf8581da7a9c7a5c6902ce1e760b2a8bbed87e7604ca7adf/work"
            },
            "Name": "overlay2"
        },
        "Mounts": [],
        "Config": {
            "Hostname": "de6b2a9a4f21",
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
            "SandboxID": "6f5d480675db45e00f2f38d794aea8345118615898fb69eb984c4e5f170a018c",
            "SandboxKey": "/var/run/docker/netns/6f5d480675db",
            "Ports": {},
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "c1e5dd375e81991dc972b940ddac8b90b931c17b413b1e9f7fba903b8d46c8a5",
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
                    "NetworkID": "ac74806a76a3d953dfc393f7ed801408589f2d5f4a9dc510257b654b84889041",
                    "EndpointID": "c1e5dd375e81991dc972b940ddac8b90b931c17b413b1e9f7fba903b8d46c8a5",
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

## ***Aislamiento de Contenedores en Docker***

- *Los contenedores en Docker ofrecen un alto nivel de aislamiento, lo que permite ejecutar procesos de forma segura y consistente. Veamos algunos ejemplos adicionales para comprender mejor este concepto:*

---

## ***Ejemplo con Arch Linux***

---

### ***Descarga de la Imagen y Ejecución del Contenedor***

**Primero, descargamos la imagen de Arch Linux y creamos un contenedor:**

```bash
docker run -it --name arch archlinux
```

### ***Acceso a Herramientas y Binarios `pacman`***

- *Dentro del contenedor, podemos acceder a herramientas y binarios específicos de Arch Linux, como `pacman`, que se utiliza para administrar paquetes:*

```bash
pacman -Q
```

*Esto nos mostrará los paquetes instalados en el contenedor utilizando `pacman`.*

---

### ***Aislamiento de Usuarios***

- *También podemos crear usuarios dentro del contenedor. Por ejemplo, creamos un usuario llamado `neymar`:*

```bash
useradd -m neymar
```

*Este usuario existe solo dentro del contenedor y no afecta al sistema host.*

---

### ***Ejecución de Comandos en el Contenedor desde el Host***

- *Para ejecutar comandos dentro del contenedor desde el host, utilizamos el comando `docker container exec`:*

```bash
docker container exec <nombre-contenedor> <comando>
```

**Por ejemplo, para verificar la existencia del usuario `neymar` desde el host:**

```bash
docker container exec arch cat /etc/passwd | grep -iF "neymar"
```

---

## ***Conclusiones***

- *Los contenedores en Docker ofrecen un entorno aislado y seguro para ejecutar aplicaciones. El aislamiento se extiende a los usuarios, ficheros y configuraciones dentro de los contenedores. Esto permite ejecutar múltiples contenedores simultáneamente sin interferencias entre ellos ni con el sistema host.*

```txt
docker container exec fedora-container dnf list installed
Installed Packages
alternatives.x86_64                      1.26-3.fc40                @2c98ee0d5281429683938d93eb2a9aa4
audit-libs.x86_64                        4.0.1-1.fc40               @2c98ee0d5281429683938d93eb2a9aa4
authselect.x86_64                        1.5.0-5.fc40               @2c98ee0d5281429683938d93eb2a9aa4
authselect-libs.x86_64                   1.5.0-5.fc40               @2c98ee0d5281429683938d93eb2a9aa4
basesystem.noarch                        11-20.fc40                 @2c98ee0d5281429683938d93eb2a9aa4
bash.x86_64                              5.2.26-3.fc40              @2c98ee0d5281429683938d93eb2a9aa4
bzip2.x86_64                             1.0.8-18.fc40              @2c98ee0d5281429683938d93eb2a9aa4
bzip2-libs.x86_64                        1.0.8-18.fc40              @2c98ee0d5281429683938d93eb2a9aa4
ca-certificates.noarch                   2023.2.62_v7.0.401-6.fc40  @2c98ee0d5281429683938d93eb2a9aa4
coreutils.x86_64                         9.4-6.fc40                 @2c98ee0d5281429683938d93eb2a9aa4
coreutils-common.x86_64                  9.4-6.fc40                 @2c98ee0d5281429683938d93eb2a9aa4
cracklib.x86_64                          2.9.11-5.fc40              @2c98ee0d5281429683938d93eb2a9aa4
crypto-policies.noarch                   20240201-2.git9f501f3.fc40 @2c98ee0d5281429683938d93eb2a9aa4
curl.x86_64                              8.6.0-7.fc40               @2c98ee0d5281429683938d93eb2a9aa4
cyrus-sasl-lib.x86_64                    2.1.28-19.fc40             @2c98ee0d5281429683938d93eb2a9aa4
dnf.noarch                               4.19.0-1.fc40              @2c98ee0d5281429683938d93eb2a9aa4
dnf-data.noarch                          4.19.0-1.fc40              @2c98ee0d5281429683938d93eb2a9aa4
elfutils-default-yama-scope.noarch       0.191-4.fc40               @2c98ee0d5281429683938d93eb2a9aa4
elfutils-libelf.x86_64                   0.191-4.fc40               @2c98ee0d5281429683938d93eb2a9aa4
elfutils-libs.x86_64                     0.191-4.fc40               @2c98ee0d5281429683938d93eb2a9aa4
expat.x86_64                             2.6.0-1.fc40               @2c98ee0d5281429683938d93eb2a9aa4
fedora-gpg-keys.noarch                   40-1                       @2c98ee0d5281429683938d93eb2a9aa4
fedora-release-common.noarch             40-38                      @2c98ee0d5281429683938d93eb2a9aa4
fedora-release-container.noarch          40-38                      @2c98ee0d5281429683938d93eb2a9aa4
fedora-release-identity-container.noarch 40-38                      @2c98ee0d5281429683938d93eb2a9aa4
fedora-repos.noarch                      40-1                       @2c98ee0d5281429683938d93eb2a9aa4
file-libs.x86_64                         5.45-4.fc40                @2c98ee0d5281429683938d93eb2a9aa4
filesystem.x86_64                        3.18-8.fc40                @2c98ee0d5281429683938d93eb2a9aa4
findutils.x86_64                         1:4.9.0-8.fc40             @2c98ee0d5281429683938d93eb2a9aa4
gawk.x86_64                              5.3.0-3.fc40               @2c98ee0d5281429683938d93eb2a9aa4
gdbm.x86_64                              1:1.23-6.fc40              @2c98ee0d5281429683938d93eb2a9aa4
gdbm-libs.x86_64                         1:1.23-6.fc40              @2c98ee0d5281429683938d93eb2a9aa4
glib2.x86_64                             2.80.0-1.fc40              @2c98ee0d5281429683938d93eb2a9aa4
glibc.x86_64                             2.39-6.fc40                @2c98ee0d5281429683938d93eb2a9aa4
glibc-common.x86_64                      2.39-6.fc40                @2c98ee0d5281429683938d93eb2a9aa4
glibc-minimal-langpack.x86_64            2.39-6.fc40                @2c98ee0d5281429683938d93eb2a9aa4
gmp.x86_64                               1:6.2.1-8.fc40             @2c98ee0d5281429683938d93eb2a9aa4
gnupg2.x86_64                            2.4.4-1.fc40               @2c98ee0d5281429683938d93eb2a9aa4
gnutls.x86_64                            3.8.3-2.fc40               @2c98ee0d5281429683938d93eb2a9aa4
grep.x86_64                              3.11-7.fc40                @2c98ee0d5281429683938d93eb2a9aa4
gzip.x86_64                              1.13-1.fc40                @2c98ee0d5281429683938d93eb2a9aa4
ima-evm-utils.x86_64                     1.5-4.fc40                 @2c98ee0d5281429683938d93eb2a9aa4
json-c.x86_64                            0.17-3.fc40                @2c98ee0d5281429683938d93eb2a9aa4
keyutils-libs.x86_64                     1.6.3-3.fc40               @2c98ee0d5281429683938d93eb2a9aa4
krb5-libs.x86_64                         1.21.2-5.fc40              @2c98ee0d5281429683938d93eb2a9aa4
libacl.x86_64                            2.3.2-1.fc40               @2c98ee0d5281429683938d93eb2a9aa4
libarchive.x86_64                        3.7.2-3.fc40               @2c98ee0d5281429683938d93eb2a9aa4
libassuan.x86_64                         2.5.7-1.fc40               @2c98ee0d5281429683938d93eb2a9aa4
libattr.x86_64                           2.5.2-3.fc40               @2c98ee0d5281429683938d93eb2a9aa4
libb2.x86_64                             0.98.1-11.fc40             @2c98ee0d5281429683938d93eb2a9aa4
libblkid.x86_64                          2.40-0.9.rc1.fc40          @2c98ee0d5281429683938d93eb2a9aa4
libbrotli.x86_64                         1.1.0-3.fc40               @2c98ee0d5281429683938d93eb2a9aa4
libcap.x86_64                            2.69-3.fc40                @2c98ee0d5281429683938d93eb2a9aa4
libcap-ng.x86_64                         0.8.4-4.fc40               @2c98ee0d5281429683938d93eb2a9aa4
libcom_err.x86_64                        1.47.0-5.fc40              @2c98ee0d5281429683938d93eb2a9aa4
libcomps.x86_64                          0.1.20-5.fc40              @2c98ee0d5281429683938d93eb2a9aa4
libcurl.x86_64                           8.6.0-7.fc40               @2c98ee0d5281429683938d93eb2a9aa4
libdnf.x86_64                            0.73.0-1.fc40              @2c98ee0d5281429683938d93eb2a9aa4
libeconf.x86_64                          0.6.2-1.fc40               @2c98ee0d5281429683938d93eb2a9aa4
libevent.x86_64                          2.1.12-12.fc40             @2c98ee0d5281429683938d93eb2a9aa4
libffi.x86_64                            3.4.4-7.fc40               @2c98ee0d5281429683938d93eb2a9aa4
libfsverity.x86_64                       1.4-12.fc40                @2c98ee0d5281429683938d93eb2a9aa4
libgcc.x86_64                            14.0.1-0.15.fc40           @2c98ee0d5281429683938d93eb2a9aa4
libgcrypt.x86_64                         1.10.3-3.fc40              @2c98ee0d5281429683938d93eb2a9aa4
libgomp.x86_64                           14.0.1-0.15.fc40           @2c98ee0d5281429683938d93eb2a9aa4
libgpg-error.x86_64                      1.48-1.fc40                @2c98ee0d5281429683938d93eb2a9aa4
libidn2.x86_64                           2.3.7-1.fc40               @2c98ee0d5281429683938d93eb2a9aa4
libksba.x86_64                           1.6.6-1.fc40               @2c98ee0d5281429683938d93eb2a9aa4
libmodulemd.x86_64                       2.15.0-9.fc40              @2c98ee0d5281429683938d93eb2a9aa4
libmount.x86_64                          2.40-0.9.rc1.fc40          @2c98ee0d5281429683938d93eb2a9aa4
libnghttp2.x86_64                        1.59.0-2.fc40              @2c98ee0d5281429683938d93eb2a9aa4
libnsl2.x86_64                           2.0.1-1.fc40               @2c98ee0d5281429683938d93eb2a9aa4
libpsl.x86_64                            0.21.5-3.fc40              @2c98ee0d5281429683938d93eb2a9aa4
libpwquality.x86_64                      1.4.5-9.fc40               @2c98ee0d5281429683938d93eb2a9aa4
librepo.x86_64                           1.17.0-3.fc40              @2c98ee0d5281429683938d93eb2a9aa4
libreport-filesystem.noarch              2.17.15-1.fc40             @2c98ee0d5281429683938d93eb2a9aa4
libselinux.x86_64                        3.6-4.fc40                 @2c98ee0d5281429683938d93eb2a9aa4
libsemanage.x86_64                       3.6-3.fc40                 @2c98ee0d5281429683938d93eb2a9aa4
libsepol.x86_64                          3.6-3.fc40                 @2c98ee0d5281429683938d93eb2a9aa4
libsmartcols.x86_64                      2.40-0.9.rc1.fc40          @2c98ee0d5281429683938d93eb2a9aa4
libsolv.x86_64                           0.7.28-1.fc40              @2c98ee0d5281429683938d93eb2a9aa4
libssh.x86_64                            0.10.6-5.fc40              @2c98ee0d5281429683938d93eb2a9aa4
libssh-config.noarch                     0.10.6-5.fc40              @2c98ee0d5281429683938d93eb2a9aa4
libstdc++.x86_64                         14.0.1-0.15.fc40           @2c98ee0d5281429683938d93eb2a9aa4
libtasn1.x86_64                          4.19.0-6.fc40              @2c98ee0d5281429683938d93eb2a9aa4
libtirpc.x86_64                          1.3.4-1.rc3.fc40           @2c98ee0d5281429683938d93eb2a9aa4
libtool-ltdl.x86_64                      2.4.7-10.fc40              @2c98ee0d5281429683938d93eb2a9aa4
libunistring.x86_64                      1.1-7.fc40                 @2c98ee0d5281429683938d93eb2a9aa4
libuuid.x86_64                           2.40-0.9.rc1.fc40          @2c98ee0d5281429683938d93eb2a9aa4
libverto.x86_64                          0.3.2-8.fc40               @2c98ee0d5281429683938d93eb2a9aa4
libxcrypt.x86_64                         4.4.36-5.fc40              @2c98ee0d5281429683938d93eb2a9aa4
libxml2.x86_64                           2.12.5-1.fc40              @2c98ee0d5281429683938d93eb2a9aa4
libyaml.x86_64                           0.2.5-14.fc40              @2c98ee0d5281429683938d93eb2a9aa4
libzstd.x86_64                           1.5.5-5.fc40               @2c98ee0d5281429683938d93eb2a9aa4
lua-libs.x86_64                          5.4.6-5.fc40               @2c98ee0d5281429683938d93eb2a9aa4
lz4-libs.x86_64                          1.9.4-6.fc40               @2c98ee0d5281429683938d93eb2a9aa4
mpdecimal.x86_64                         2.5.1-9.fc40               @2c98ee0d5281429683938d93eb2a9aa4
mpfr.x86_64                              4.2.1-3.fc40               @2c98ee0d5281429683938d93eb2a9aa4
ncurses-base.noarch                      6.4-12.20240127.fc40       @2c98ee0d5281429683938d93eb2a9aa4
ncurses-libs.x86_64                      6.4-12.20240127.fc40       @2c98ee0d5281429683938d93eb2a9aa4
nettle.x86_64                            3.9.1-6.fc40               @2c98ee0d5281429683938d93eb2a9aa4
npth.x86_64                              1.7-1.fc40                 @2c98ee0d5281429683938d93eb2a9aa4
openldap.x86_64                          2.6.7-1.fc40               @2c98ee0d5281429683938d93eb2a9aa4
openssl-libs.x86_64                      1:3.2.1-2.fc40             @2c98ee0d5281429683938d93eb2a9aa4
p11-kit.x86_64                           0.25.3-4.fc40              @2c98ee0d5281429683938d93eb2a9aa4
p11-kit-trust.x86_64                     0.25.3-4.fc40              @2c98ee0d5281429683938d93eb2a9aa4
pam.x86_64                               1.6.0-2.fc40               @2c98ee0d5281429683938d93eb2a9aa4
pam-libs.x86_64                          1.6.0-2.fc40               @2c98ee0d5281429683938d93eb2a9aa4
pcre2.x86_64                             10.42-2.fc40.2             @2c98ee0d5281429683938d93eb2a9aa4
pcre2-syntax.noarch                      10.42-2.fc40.2             @2c98ee0d5281429683938d93eb2a9aa4
popt.x86_64                              1.19-6.fc40                @2c98ee0d5281429683938d93eb2a9aa4
publicsuffix-list-dafsa.noarch           20240107-3.fc40            @2c98ee0d5281429683938d93eb2a9aa4
python-pip-wheel.noarch                  23.3.2-1.fc40              @2c98ee0d5281429683938d93eb2a9aa4
python3.x86_64                           3.12.2-2.fc40              @2c98ee0d5281429683938d93eb2a9aa4
python3-dnf.noarch                       4.19.0-1.fc40              @2c98ee0d5281429683938d93eb2a9aa4
python3-hawkey.x86_64                    0.73.0-1.fc40              @2c98ee0d5281429683938d93eb2a9aa4
python3-libcomps.x86_64                  0.1.20-5.fc40              @2c98ee0d5281429683938d93eb2a9aa4
python3-libdnf.x86_64                    0.73.0-1.fc40              @2c98ee0d5281429683938d93eb2a9aa4
python3-libs.x86_64                      3.12.2-2.fc40              @2c98ee0d5281429683938d93eb2a9aa4
python3-rpm.x86_64                       4.19.1.1-1.fc40            @2c98ee0d5281429683938d93eb2a9aa4
readline.x86_64                          8.2-8.fc40                 @2c98ee0d5281429683938d93eb2a9aa4
rootfiles.noarch                         8.1-36.fc40                @2c98ee0d5281429683938d93eb2a9aa4
rpm.x86_64                               4.19.1.1-1.fc40            @2c98ee0d5281429683938d93eb2a9aa4
rpm-build-libs.x86_64                    4.19.1.1-1.fc40            @2c98ee0d5281429683938d93eb2a9aa4
rpm-libs.x86_64                          4.19.1.1-1.fc40            @2c98ee0d5281429683938d93eb2a9aa4
rpm-sequoia.x86_64                       1.6.0-2.fc40               @2c98ee0d5281429683938d93eb2a9aa4
rpm-sign-libs.x86_64                     4.19.1.1-1.fc40            @2c98ee0d5281429683938d93eb2a9aa4
sed.x86_64                               4.9-1.fc40                 @2c98ee0d5281429683938d93eb2a9aa4
setup.noarch                             2.14.5-2.fc40              @2c98ee0d5281429683938d93eb2a9aa4
shadow-utils.x86_64                      2:4.15.1-1.fc40            @2c98ee0d5281429683938d93eb2a9aa4
sqlite-libs.x86_64                       3.45.1-2.fc40              @2c98ee0d5281429683938d93eb2a9aa4
sudo.x86_64                              1.9.15-2.p5.fc40           @2c98ee0d5281429683938d93eb2a9aa4
tar.x86_64                               2:1.35-3.fc40              @2c98ee0d5281429683938d93eb2a9aa4
tpm2-tss.x86_64                          4.0.1-7.fc40               @2c98ee0d5281429683938d93eb2a9aa4
tzdata.noarch                            2024a-4.fc40               @2c98ee0d5281429683938d93eb2a9aa4
vim-data.noarch                          2:9.1.158-1.fc40           @2c98ee0d5281429683938d93eb2a9aa4
vim-minimal.x86_64                       2:9.1.158-1.fc40           @2c98ee0d5281429683938d93eb2a9aa4
xz.x86_64                                1:5.4.6-3.fc40             @2c98ee0d5281429683938d93eb2a9aa4
xz-libs.x86_64                           1:5.4.6-3.fc40             @2c98ee0d5281429683938d93eb2a9aa4
yum.noarch                               4.19.0-1.fc40              @2c98ee0d5281429683938d93eb2a9aa4
zchunk-libs.x86_64                       1.4.0-2.fc40               @2c98ee0d5281429683938d93eb2a9aa4
zlib-ng-compat.x86_64                    2.1.6-2.fc40               @2c98ee0d5281429683938d93eb2a9aa4
zstd.x86_64                              1.5.5-5.fc40               @2c98ee0d5281429683938d93eb2a9aa4
```

---

## ***Procesos y Aislamiento en Contenedores Docker***

- *Los contenedores en Docker ofrecen un entorno aislado para ejecutar procesos de forma segura y consistente. Veamos cómo interactuar con los procesos dentro de los contenedores y cómo se mantiene el aislamiento entre ellos.*

---

## ***Ejecución de Comandos en un Contenedor***

- *Podemos ejecutar comandos en un contenedor utilizando el comando `docker container exec`. Por ejemplo, para listar los paquetes instalados en un contenedor Fedora:*

```bash
docker container exec --tty fedora-container dnf list installed
```

- *Para ejecutar un shell interactivo dentro del contenedor, utilizamos la opción `-it` con `docker container exec`. Por ejemplo, para acceder a una shell Bash dentro del contenedor Fedora:*

```bash
docker container exec -it fedora-container bash
```

---

## ***Aislamiento de Procesos***

- *Cada contenedor en Docker ejecuta sus propios procesos de forma aislada. Los procesos que se ejecutan en un contenedor no son visibles ni afectan a otros contenedores en el mismo sistema. Esto significa que los procesos en un contenedor no pueden interferir con los procesos en otro contenedor ni con el sistema host.*

- *Por ejemplo, los comandos ejecutados dentro del contenedor Fedora no serán visibles desde otro contenedor. Cada contenedor mantiene su propio espacio de nombres de procesos y recursos, lo que garantiza un alto grado de aislamiento y seguridad.*

---

## ***Conclusiones Aislamiento de Procesos***

- *El comando `docker container top` es utilizado para mostrar información sobre los procesos que se están ejecutando dentro de un contenedor Docker. En este caso, cuando se ejecuta `docker container top fedora-container`, se obtiene una lista de los procesos que están corriendo dentro del contenedor llamado `fedora-container`.*

**Para entender en detalle lo que hace este comando, es importante desglosarlo en varias partes:**

1. **Identificación del Contenedor:**
   - *`docker container top` necesita identificar el contenedor `fedora-container`. Docker hace esto utilizando el nombre del contenedor o su ID. Docker mantiene un mapeo entre nombres de contenedores y sus IDs en su metadatos internos.*
   - *Docker invoca la API Docker Engine para obtener la información necesaria del contenedor específico.*

2. **Acceso a los Procesos:**
   - *Una vez identificado el contenedor, Docker necesita acceder a la información de los procesos que están corriendo dentro del espacio de nombres de procesos (PID namespace) del contenedor.*
   - *Los contenedores Docker, por defecto, comparten el mismo kernel del sistema operativo anfitrión, pero tienen su propio espacio de nombres para procesos. Esto significa que los procesos dentro de un contenedor están aislados de los procesos de otros contenedores y del host.*

3. **Obtención de Datos de Procesos:**
   - *Docker interactúa con el kernel del sistema operativo utilizando llamadas al sistema (syscalls) para obtener información sobre los procesos. Esto se logra mediante la lectura de los ficheros en el pseudo-sistema de ficheros `/proc` del host, que contiene información sobre todos los procesos en el sistema.*
   - *Por ejemplo, Docker puede leer `/proc/[pid]/stat`, `/proc/[pid]/status` y otros ficheros en el directorio `/proc` para obtener detalles específicos de cada proceso.*

    ```bash
    docker exec -it 00-App-nodejs-v4 ps aux
    USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
    root           1  0.0  0.0   2892  1664 pts/0    Ss+  19:59   0:00 /bin/sh -c node ./index.js
    root           7  0.0  0.5 736804 45440 pts/0    Sl+  19:59   0:00 node ./index.js
    root         103  0.0  0.0   7064  2816 pts/1    Rs+  20:06   0:00 ps aux

    docker exec -it 00-App-nodejs-v4 cat /proc/1/stat
    1 (sh) S 0 1 1 34816 1 4194560 1079 0 0 0 2 1 0 0 20 0 1 0 121773 2961408 416 18446744073709551615 96810629902336 96810629982613 140730297134176 0 0 0 0 0 65538 1 0 0 17 0 0 0 0 0 0 96810630008560 96810630013472 96810645286912 140730297134951 140730297134978 140730297134978 140730297135088 0
    ```

4. **Formato y Presentación de Datos:**
   - *La información obtenida de `/proc` es procesada y formateada por Docker para que sea legible y útil para el usuario.*
   - *Por defecto, `docker container top` mostrará una salida similar al comando `ps` de Unix/Linux, que incluye columnas como PID (Process ID), USER (el usuario que ejecuta el proceso), TIME (el tiempo de CPU consumido), COMMAND (el comando que se está ejecutando), entre otras.*

---

### ***Ejemplo de Uso***

**Supongamos que tenemos un contenedor en ejecución llamado `fedora-container`. Al ejecutar:**

```bash
docker container top fedora-container
```

**La salida puede parecerse a esto:**

```bash
UID                 PID                 PPID                C                   STIME               TTY                 TIME                CMD
root                22485               22470               0                   13:57               ?                   00:00:00            /bin/bash
root                22507               22485               0                   13:57               ?                   00:00:00            ps -ef
```

---

### ***Explicación Técnica de la Salida***

- **UID:** *El ID del usuario que está ejecutando el proceso. En muchos casos, dentro de un contenedor, los procesos son ejecutados por el usuario `root`.*
- **PID:** *El ID del proceso. Este es un identificador único dentro del espacio de nombres de procesos del contenedor.*
- **PPID:** *El ID del proceso padre. Esto muestra qué proceso inició el proceso actual.*
- **C:** *La utilización de CPU (no siempre es detallada en todas las implementaciones de `ps`).*
- **STIME:** *La hora de inicio del proceso.*
- **TTY:** *El terminal asociado con el proceso.*
- **TIME:** *El tiempo total de CPU consumido por el proceso.*
- **CMD:** *El comando que se está ejecutando.*

### ***Bajo el Capó***

**Internamente, cuando `docker container top` se ejecuta, Docker realiza los siguientes pasos:**

1. **Llamada a la API Docker:**
   - *Docker CLI se comunica con el Docker daemon (dockerd) a través de una API RESTful. La CLI envía una solicitud para obtener la lista de procesos de un contenedor específico.*
   - *Ejemplo de endpoint: `GET /containers/{id}/top`.*

2. **Recopilación de Información de Procesos:**
   - *Docker daemon utiliza las herramientas del sistema operativo, principalmente accediendo a `/proc` y utilizando herramientas como `ps`, para recolectar la información requerida.*
   - *Docker puede utilizar comandos internos o subprocesos que ejecutan comandos del sistema operativo como `ps -ef` dentro del contexto del contenedor.*

3. **Formateo y Devolución de Resultados:**
   - *La información es recopilada y formateada en un formato estructurado, generalmente JSON, y devuelta a la CLI.*
   - *La CLI, a su vez, formatea esta información para su presentación en la terminal.*

---

### ***Ejemplo con Detalles Adicionales***

**Consideremos un contenedor que ejecuta varios servicios. Al ejecutar:**

```bash
docker container top multi-service-container
```

**La salida puede incluir varias líneas, por ejemplo:**

```bash
UID        PID  PPID  C STIME TTY          TIME CMD
root         1     0  0 13:57 ?        00:00:00 /bin/sh -c /usr/sbin/apache2ctl -D FOREGROUND
www-data   34     1  0 13:57 ?        00:00:00 /usr/sbin/apache2 -D FOREGROUND
www-data   35    34  0 13:57 ?        00:00:00 /usr/sbin/apache2 -D FOREGROUND
www-data   36    34  0 13:57 ?        00:00:00 /usr/sbin/apache2 -D FOREGROUND
```

### ***Descripción***

- **Procesos Primarios y Secundarios:** *El proceso con `PID 1` es típicamente el proceso principal en un contenedor, usualmente el proceso que inició el contenedor. En este caso, es un shell que ejecuta Apache.*
- **Procesos del Servidor Web:** *Los procesos con `PID` 34, 35, y 36 son procesos del servidor web Apache ejecutándose en modo foreground (`-D FOREGROUND`).*

- *En resumen, `docker container top fedora-container` es una herramienta poderosa para inspeccionar y gestionar los procesos que corren dentro de un contenedor, proporcionando una visión detallada de la actividad interna del mismo.*

- *Los contenedores en Docker ofrecen un entorno aislado para ejecutar procesos de forma eficiente y segura. El aislamiento de procesos garantiza que los contenedores sean independientes entre sí y no afecten al sistema host ni a otros contenedores. Esto facilita la gestión de aplicaciones y servicios en entornos de producción y desarrollo.*

```bash
docker container top fedora-container
UID                 PID                 PPID                C                   STIME               TTY                 TIME                CMD
root                159392              159370              0                   14:01               pts/0               00:00:00            /bin/bash
root                164793              159370              0                   14:07               pts/1               00:00:00            bash
root                170592              164793              0                   14:13               pts/1               00:00:00            python3
```

| **UID**  | **PID**    | **PPID**   | **C** | **STIME** | **TTY**  | **TIME**      | **CMD**       |
|------|--------|--------|---|-------|-------|-----------|-----------|
| *root* | *159392* | *159370* | *0* | *14:01* | *pts/0* | *00:00:00*  | */bin/bash* |
| *root* | *164793* | *159370* | *0* | *14:07* | *pts/1* | *00:00:00*  | *bash* |
| *root* | *170592* | *164793* | *0* | *14:13* | *pts/1* | *00:00:00*  | *python3* |

**Aquí está el significado de cada campo en la tabla:**

- **UID:** *El nombre del usuario que ejecuta el proceso. En este caso, todos los procesos son ejecutados por el usuario `root`.*
- **PID:** *El ID del proceso, que es un identificador único asignado a cada proceso en el sistema. Es un número entero.*
- **PPID:** *El ID del proceso padre, es decir, el ID del proceso que creó este proceso. Es un número entero.*
- **C:** *El uso de la CPU por el proceso. En este contexto, el valor "0" indica que el proceso no está utilizando la CPU en ese momento.*
- **STIME:** *El tiempo en que se inició el proceso. En este caso, está en formato HH:MM (hora:minuto).*
- **TTY:** *La terminal asociada con el proceso. Indica en qué terminal se ejecuta el proceso.*
- **TIME:** *El tiempo de CPU consumido por el proceso desde su inicio.*
- **CMD:** *El comando que se está ejecutando en el proceso. Por ejemplo, `/bin/bash` y `python3` son los comandos que se están ejecutando en los procesos listados.*

- *Esto representará la salida del comando `docker container top fedora-container` en forma de tabla, con cada columna correspondiente a un campo diferente, como UID, PID, PPID, etc. Cada fila representa un proceso en el contenedor `fedora-container`.*

---

### ***Información sobre procesos en contenedores***

- **Los procesos de un contenedor no los podrás ver desde otro contenedor**. *Esto se debe a que están aislados entre sí.*

**Por ejemplo, para ver los procesos dentro de un contenedor:**

```bash
docker start -i debian-3
root@385d36137fef:/# apt-get update && apt-get upgrade && apt-get install procps

Ahora ejecutamos `ps -aux` o `ps aux`:

root@385d36137fef:/# ps aux
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root           1  0.0  0.0   4188  2432 pts/0    Ss   20:17   0:00 bash
root         205  0.0  0.0   8088  4096 pts/0    R+   20:22   0:00 ps aux
```

**Pero también podemos ver los procesos fuera del contenedor:**

```bash
docker top debian-3
UID                 PID                 PPID                C                   STIME               TTY                 TIME                CMD
root                174637              174614              0                   14:17               pts/0               00:00:00            bash
docker top fedora-container
UID                 PID                 PPID                C                   STIME               TTY                 TIME                CMD
root                159392              159370              0                   14:01               pts/0               00:00:00            /bin/bash
root                164793              159370              0                   14:07               pts/1               00:00:00            bash
root                170592              164793              0                   14:13               pts/1               00:00:00            python3
```

**En estos comandos:**

- **`UID`:** *El nombre del usuario que ejecuta el proceso.*
- **`PID`:** *El ID del proceso.*
- **`PPID`:** *El ID del proceso padre.*
- **`C`:** *El uso de la CPU por el proceso.*
- **`STIME`:** *El tiempo en que se inició el proceso.*
- **`TTY`:** *La terminal asociada con el proceso.*
- **`TIME`:** *El tiempo de CPU consumido por el proceso.*
- **`CMD`:** *El comando que se está ejecutando en el proceso.*
