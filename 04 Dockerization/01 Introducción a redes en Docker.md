<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->
# ***Introducción a Redes en Docker***

- *En Docker, los contenedores están aislados entre sí, lo que significa que también los puertos están aislados. Si ejecutamos `index.js` en el contenedor App-00-Nodejs, el programa se pone a escuchar en el puerto 3000 (`localhost:3000`, `127.0.0.1:3000`).*

```bash
root@a2e5334b6474:/App# node index.js 
Server running at http://127.0.0.1:3000/
```

- *Si intentamos acceder a esta dirección en nuestro localhost, dará error porque no hay nada ejecutándose en el puerto 3000 en nuestro localhost ya que `index.js` se ejecutó en el contenedor.*

```bash
curl localhost:3000
curl: (7) Failed to connect to localhost port 3000 after 0 ms: Connection refused
```

**Para hacer una petición en el localhost del contenedor, lo haríamos de la siguiente manera:**

```bash
docker container exec -it App-00-Nodejs bash
root@a2e5334b6474:/App# curl localhost:3000
Hello World
```

**Ahora, para el siguiente ejemplo, crearemos un nuevo contenedor para hacer peticiones al servidor de Node.js que está ejecutándose en el contenedor:**

```bash
docker run -it --name test-client ubuntu:22.04
root@0f3fdde42f5a:/# apt-get update
root@0f3fdde42f5a:/# apt-get -y upgrade
root@0f3fdde42f5a:/# apt-get install -y curl
root@0f3fdde42f5a:/# curl localhost:3000
curl: (7) Failed to connect to localhost port 3000 after 0 ms: Connection refused
```

- *Para que el contenedor `test-client` pueda acceder al servidor de Node.js en el contenedor `App-00-Nodejs`, es necesario configurar una red de Docker o utilizar enlaces entre contenedores, ya que por defecto los contenedores no pueden comunicarse entre sí a través de `localhost`.*

- *Para inspeccionar los detalles de red de un contenedor en Docker, puedes usar el comando `docker inspect`. Aquí te mostramos cómo hacerlo con el contenedor `App-00-Nodejs`.*

```bash
docker inspect App-00-Nodejs
docker inspect App-00-Nodejs > ./App-00-Nodejs.json
```

```json
[
    {
        "Id": "a2e5334b647454f8f315a64edc0e0289e2bc3d640b7657685ce0859f435316d2",
        "Created": "2024-06-01T16:42:51.972628292Z",
        "Path": "/bin/bash",
        "Args": [],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 194479,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2024-06-01T19:08:08.907836975Z",
            "FinishedAt": "2024-06-01T16:56:24.04645272Z"
        },
        "Image": "sha256:52882761a72a60649edff9a2478835325d084fb640ea32a975e29e12a012025f",
        "ResolvConfPath": "/var/lib/docker/containers/a2e5334b647454f8f315a64edc0e0289e2bc3d640b7657685ce0859f435316d2/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/a2e5334b647454f8f315a64edc0e0289e2bc3d640b7657685ce0859f435316d2/hostname",
        "HostsPath": "/var/lib/docker/containers/a2e5334b647454f8f315a64edc0e0289e2bc3d640b7657685ce0859f435316d2/hosts",
        "LogPath": "/var/lib/docker/containers/a2e5334b647454f8f315a64edc0e0289e2bc3d640b7657685ce0859f435316d2/a2e5334b647454f8f315a64edc0e0289e2bc3d640b7657685ce0859f435316d2-json.log",
        "Name": "/App-00-Nodejs",
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
                28,
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
                "LowerDir": "/var/lib/docker/overlay2/f24afe3481f126b12da342ef9a2fd98edaa7951c3853344f1400dd259890a5fa-init/diff:/var/lib/docker/overlay2/043387975c35001ef7b631d7ad09d104fcb9b7970b5b3a38042167dd0c65a764/diff",
                "MergedDir": "/var/lib/docker/overlay2/f24afe3481f126b12da342ef9a2fd98edaa7951c3853344f1400dd259890a5fa/merged",
                "UpperDir": "/var/lib/docker/overlay2/f24afe3481f126b12da342ef9a2fd98edaa7951c3853344f1400dd259890a5fa/diff",
                "WorkDir": "/var/lib/docker/overlay2/f24afe3481f126b12da342ef9a2fd98edaa7951c3853344f1400dd259890a5fa/work"
            },
            "Name": "overlay2"
        },
        "Mounts": [],
        "Config": {
            "Hostname": "a2e5334b6474",
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
                "/bin/bash"
            ],
            "Image": "ubuntu:22.04",
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
            "SandboxID": "25a842ebc52b8792824ab38216ac2f5df14144a56aa3b3f8daecfa4ae248637d",
            "SandboxKey": "/var/run/docker/netns/25a842ebc52b",
            "Ports": {},
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "e33952ac12d993128687d047a4fc936402f22123ed7727e5daa85d7404f86b9d",
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
                    "NetworkID": "ffd5ab9b6b007d6a19bd356abea544173321fb3a1e000177ba40890b73f19ad1",
                    "EndpointID": "e33952ac12d993128687d047a4fc936402f22123ed7727e5daa85d7404f86b9d",
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

**Si revisamos la sección de `NetworkSettings`, encontraremos información clave sobre la configuración de red del contenedor:**

```json
"NetworkSettings": {
    "Bridge": "",
    "SandboxID": "25a842ebc52b8792824ab38216ac2f5df14144a56aa3b3f8daecfa4ae248637d",
    "SandboxKey": "/var/run/docker/netns/25a842ebc52b",
    "Ports": {},
    "HairpinMode": false,
    "LinkLocalIPv6Address": "",
    "LinkLocalIPv6PrefixLen": 0,
    "SecondaryIPAddresses": null,
    "SecondaryIPv6Addresses": null,
    "EndpointID": "e33952ac12d993128687d047a4fc936402f22123ed7727e5daa85d7404f86b9d",
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
            "NetworkID": "ffd5ab9b6b007d6a19bd356abea544173321fb3a1e000177ba40890b73f19ad1",
            "EndpointID": "e33952ac12d993128687d047a4fc936402f22123ed7727e5daa85d7404f86b9d",
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
```

---

## ***Detalles Clave***

- **Gateway:** *`172.17.0.1`*
- **IPAddress:** *`172.17.0.2`*

- *Estos valores indican que el contenedor tiene su propia IP asignada (`172.17.0.2`) y una puerta de enlace predeterminada (`172.17.0.1`). Esta información es esencial para la configuración y solución de problemas de red entre contenedores.*

**Para inspeccionar los detalles de red del otro contenedor (`test-client`), ejecuta el siguiente comando:**

```bash
docker inspect test-client > ./test-client.json
```

```json
[
    {
        "Id": "0f3fdde42f5aeceba6dba396146b4683ddfac21679eb77c3099be885fecb8519",
        "Created": "2024-06-01T19:36:00.392309636Z",
        "Path": "/bin/bash",
        "Args": [],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 220584,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2024-06-01T19:37:36.786411567Z",
            "FinishedAt": "2024-06-01T19:37:23.579914094Z"
        },
        "Image": "sha256:52882761a72a60649edff9a2478835325d084fb640ea32a975e29e12a012025f",
        "ResolvConfPath": "/var/lib/docker/containers/0f3fdde42f5aeceba6dba396146b4683ddfac21679eb77c3099be885fecb8519/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/0f3fdde42f5aeceba6dba396146b4683ddfac21679eb77c3099be885fecb8519/hostname",
        "HostsPath": "/var/lib/docker/containers/0f3fdde42f5aeceba6dba396146b4683ddfac21679eb77c3099be885fecb8519/hosts",
        "LogPath": "/var/lib/docker/containers/0f3fdde42f5aeceba6dba396146b4683ddfac21679eb77c3099be885fecb8519/0f3fdde42f5aeceba6dba396146b4683ddfac21679eb77c3099be885fecb8519-json.log",
        "Name": "/test-client",
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
                "LowerDir": "/var/lib/docker/overlay2/3b774ab964a0afd76ecedc9054d5736405f17b5c7b223678d3e1e306c3cea1e6-init/diff:/var/lib/docker/overlay2/043387975c35001ef7b631d7ad09d104fcb9b7970b5b3a38042167dd0c65a764/diff",
                "MergedDir": "/var/lib/docker/overlay2/3b774ab964a0afd76ecedc9054d5736405f17b5c7b223678d3e1e306c3cea1e6/merged",
                "UpperDir": "/var/lib/docker/overlay2/3b774ab964a0afd76ecedc9054d5736405f17b5c7b223678d3e1e306c3cea1e6/diff",
                "WorkDir": "/var/lib/docker/overlay2/3b774ab964a0afd76ecedc9054d5736405f17b5c7b223678d3e1e306c3cea1e6/work"
            },
            "Name": "overlay2"
        },
        "Mounts": [],
        "Config": {
            "Hostname": "0f3fdde42f5a",
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
                "/bin/bash"
            ],
            "Image": "ubuntu:22.04",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": {
                "org.opencontainers.image.ref.name": "ubuntu",
                "org.opencontainers.image.version": "22.04"
            }
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "35b74898856babfdd48e999000aa1600e6f5ff56a95f053620b8c22b5094121e",
            "SandboxKey": "/var/run/docker/netns/35b74898856b",
            "Ports": {},
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "9a070a964bec39b693b4f84dd316fb5b20347b378647c63467e2e33843c96c47",
            "Gateway": "172.17.0.1",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "172.17.0.3",
            "IPPrefixLen": 16,
            "IPv6Gateway": "",
            "MacAddress": "02:42:ac:11:00:03",
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "MacAddress": "02:42:ac:11:00:03",
                    "NetworkID": "ffd5ab9b6b007d6a19bd356abea544173321fb3a1e000177ba40890b73f19ad1",
                    "EndpointID": "9a070a964bec39b693b4f84dd316fb5b20347b378647c63467e2e33843c96c47",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.3",
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

**Si revisamos la sección de `NetworkSettings`, encontraremos la siguiente información:**

```json
"NetworkSettings": {
    "Bridge": "",
    "SandboxID": "35b74898856babfdd48e999000aa1600e6f5ff56a95f053620b8c22b5094121e",
    "SandboxKey": "/var/run/docker/netns/35b74898856b",
    "Ports": {},
    "HairpinMode": false,
    "LinkLocalIPv6Address": "",
    "LinkLocalIPv6PrefixLen": 0,
    "SecondaryIPAddresses": null,
    "SecondaryIPv6Addresses": null,
    "EndpointID": "9a070a964bec39b693b4f84dd316fb5b20347b378647c63467e2e33843c96c47",
    "Gateway": "172.17.0.1",
    "GlobalIPv6Address": "",
    "GlobalIPv6PrefixLen": 0,
    "IPAddress": "172.17.0.3",
    "IPPrefixLen": 16,
    "IPv6Gateway": "",
    "MacAddress": "02:42:ac:11:00:03",
    "Networks": {
        "bridge": {
            "IPAMConfig": null,
            "Links": null,
            "Aliases": null,
            "MacAddress": "02:42:ac:11:00:03",
            "NetworkID": "ffd5ab9b6b007d6a19bd356abea544173321fb3a1e000177ba40890b73f19ad1",
            "EndpointID": "9a070a964bec39b693b4f84dd316fb5b20347b378647c63467e2e33843c96c47",
            "Gateway": "172.17.0.1",
            "IPAddress": "172.17.0.3",
            "IPPrefixLen": 16,
            "IPv6Gateway": "",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "DriverOpts": null,
            "DNSNames": null
        }
    }
}
```

---

### ***Detalles Clave del contenedor `test-client`***

- **Gateway:** `172.17.0.1`
- **IPAddress:** `172.17.0.3`

- *Al igual que el primer contenedor, `test-client` tiene su propia IP asignada (`172.17.0.3`) y utiliza la misma puerta de enlace predeterminada (`172.17.0.1`).*

*Esto muestra que ambos contenedores están conectados a la misma red. Por defecto, Docker conecta los contenedores a una red llamada `bridge`, que es la red común usada por Docker si no se especifica otra red al iniciar un contenedor. Esto permite que los contenedores puedan comunicarse entre sí usando sus direcciones IP asignadas dentro de esta red.*

### ***La Red `bridge` en Docker***

- *La red `bridge` es la red por defecto que Docker usa cuando no se especifica una red al crear un contenedor. Es una red virtual que permite la comunicación entre contenedores en el mismo host de Docker y también entre contenedores y el host.*

#### ***Características de la Red `bridge`***

1. **Aislamiento de Contenedores:** *Los contenedores en una red `bridge` pueden comunicarse entre sí usando sus direcciones IP internas. Sin embargo, están aislados de otros contenedores en diferentes redes a menos que se configuren de otra manera.*

2. **Puerta de Enlace:** *Cada contenedor en la red `bridge` obtiene una dirección IP y se le asigna una puerta de enlace predeterminada (generalmente `172.17.0.1`). Esto permite a los contenedores comunicarse con el host y viceversa.*

3. **DNS Interno:** *Docker proporciona un servicio DNS para los contenedores en la red `bridge` que permite que los contenedores se resuelvan entre sí por nombre.*

4. **Configuración Automática:** *Docker configura automáticamente la red `bridge` al iniciar el daemon de Docker. No se requiere configuración adicional para que funcione con contenedores básicos.*

5. **Enrutamiento de Puertos:** *Permite mapear puertos del host a los puertos del contenedor para acceder a servicios dentro de los contenedores desde fuera del host.*

---

#### ***Ejemplo de Uso de la Red `bridge`***

- *Cuando inicias un contenedor sin especificar una red, Docker lo conecta automáticamente a la red `bridge`.*

```bash
docker run -it --name my-container ubuntu:22.04
```

---

### ***Inspección de la Red `bridge`***

**Puedes inspeccionar la configuración de la red `bridge` utilizando el siguiente comando:**

```bash
docker network inspect bridge
```

*Esto proporcionará detalles sobre la red `bridge`, incluyendo información sobre contenedores conectados, configuraciones de IP, y más.*

---

### ***Ejemplo de Salida de `docker network inspect bridge`***

```json
[
    {
        "Name": "bridge",
        "Id": "ffd5ab9b6b007d6a19bd356abea544173321fb3a1e000177ba40890b73f19ad1",
        "Created": "2024-06-01T09:01:51.649817732-06:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.17.0.0/16",
                    "Gateway": "172.17.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "0f3fdde42f5aeceba6dba396146b4683ddfac21679eb77c3099be885fecb8519": {
                "Name": "test-client",
                "EndpointID": "f863d9c85ff68b12236ab08f471a84c2a01ea1088c99a0df124090fbaecc2e0e",
                "MacAddress": "02:42:ac:11:00:03",
                "IPv4Address": "172.17.0.3/16",
                "IPv6Address": ""
            },
            "a2e5334b647454f8f315a64edc0e0289e2bc3d640b7657685ce0859f435316d2": {
                "Name": "App-00-Nodejs",
                "EndpointID": "105366d8d4b9efd2dccb5d8977d6498e7b66bc3b8d8246ae059ee36b1e11f1b2",
                "MacAddress": "02:42:ac:11:00:02",
                "IPv4Address": "172.17.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {
            "com.docker.network.bridge.default_bridge": "true",
            "com.docker.network.bridge.enable_icc": "true",
            "com.docker.network.bridge.enable_ip_masquerade": "true",
            "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
            "com.docker.network.bridge.name": "docker0",
            "com.docker.network.driver.mtu": "1500"
        },
        "Labels": {}
    }
]
```

- *Esta salida muestra que ambos contenedores (`App-00-Nodejs` y `test-client`) están conectados a la red `bridge` y tienen sus respectivas direcciones IP (`172.17.0.2` y `172.17.0.3`).*

---

### ***Conclusión***

- *La red `bridge` en Docker es una herramienta fundamental para la comunicación y el aislamiento de contenedores. Permite a los desarrolladores configurar fácilmente entornos de contenedores que puedan comunicarse entre sí y con el host, sin necesidad de configuraciones complejas.*

- *![Images docker bridge](../images/images%20de%20red%20bridge.png "../images/images de red bridge.png")*

- *Para entender mejor cómo funciona la red `bridge` en Docker, podemos compararla con un router. Cuando inicias un contenedor, por ejemplo, `App-00-Nodejs`, este se conecta a la red `bridge`, que actúa como un router, y la red `bridge` le asigna una dirección IP. Esto explica por qué los contenedores tienen direcciones IP propias.*

- *Si iniciamos otro contenedor, por ejemplo, `test-client`, también se conectará a la red `bridge` y se le asignará una dirección IP. Como ambos contenedores (`App-00-Nodejs` y `test-client`) están conectados a la misma red, pueden comunicarse entre sí. Esto es similar a cómo los dispositivos en casa conectados al mismo router pueden comunicarse entre sí.*

---

### ***Ver la Interfaz de Red `docker0`***

- *Docker crea una interfaz de red llamada `docker0`, que es una interfaz de software y no un puerto Ethernet de hardware en nuestras máquinas. Esta interfaz es usada por Docker para enrutar paquetes entre contenedores.*

**Para ver la interfaz `docker0`, ejecuta el siguiente comando:**

```bash
ip address
```

**La salida será algo como esto:**

```bash
4: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:0f:3e:97:59 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:fff:fe3e:9759/64 scope link 
       valid_lft forever preferred_lft forever
```

---

### ***Reglas de Enrutamiento de Docker***

*Docker también crea sus propias reglas de enrutamiento para manejar el tráfico de red de los contenedores y proporcionar aislamiento entre ellos. Puedes ver estas reglas con el siguiente comando:*

```bash
sudo iptables --list-rules
```

**La salida puede ser algo similar a esto:**

```bash
-P INPUT ACCEPT
-P FORWARD DROP
-P OUTPUT ACCEPT
-N DOCKER
-N DOCKER-ISOLATION-STAGE-1
-N DOCKER-ISOLATION-STAGE-2
-N DOCKER-USER
-A FORWARD -j DOCKER-USER
-A FORWARD -j DOCKER-ISOLATION-STAGE-1
-A FORWARD -o docker0 -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
-A FORWARD -o docker0 -j DOCKER
-A FORWARD -i docker0 ! -o docker0 -j ACCEPT
-A FORWARD -i docker0 -o docker0 -j ACCEPT
-A FORWARD -o br-c918807b7706 -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
-A FORWARD -o br-c918807b7706 -j DOCKER
-A FORWARD -i br-c918807b7706 ! -o br-c918807b7706 -j ACCEPT
-A FORWARD -i br-c918807b7706 -o br-c918807b7706 -j ACCEPT
-A DOCKER-ISOLATION-STAGE-1 -i docker0 ! -o docker0 -j DOCKER-ISOLATION-STAGE-2
-A DOCKER-ISOLATION-STAGE-1 -i br-c918807b7706 ! -o br-c918807b7706 -j DOCKER-ISOLATION-STAGE-2
-A DOCKER-ISOLATION-STAGE-1 -j RETURN
-A DOCKER-ISOLATION-STAGE-2 -o docker0 -j DROP
-A DOCKER-ISOLATION-STAGE-2 -o br-c918807b7706 -j DROP
-A DOCKER-ISOLATION-STAGE-2 -j RETURN
-A DOCKER-USER -j RETURN
```

- *Estas reglas permiten enrutar paquetes a través de la interfaz `docker0` y también proporcionar aislamiento de red entre contenedores.*

---

### ***Creación de Redes Personalizadas en Docker***

- *También podemos crear nuestras propias redes para tener una red específica por aplicación. Esto se puede hacer para asegurar que solo los contenedores dentro de la misma red puedan comunicarse entre sí, aislando así las aplicaciones.*

- *Por ejemplo, podemos crear dos redes diferentes (`Red App 1` y `Red App 2`) y conectar contenedores a estas redes:*

```txt
___________
|         |-----> Contenedor 1
| Red App 1 |-----> Contenedor 2
|         |-----> Contenedor 3
-----------
        
No se comunican

___________
|         |-----> Contenedor 1
| Red App 2 |-----> Contenedor 2
|         |-----> Contenedor 3
-----------
```

- *Esto es similar a tener más de un router en casa y conectar diferentes dispositivos a cada uno. Cada red está aislada, evitando que los dispositivos conectados a un router específico se comuniquen con dispositivos en otro router.*

---

### ***Ejemplo de Creación de Redes Personalizadas***

1. **Crear una red personalizada:**

    ```bash
    docker network create RedApp1
    docker network create RedApp2
    ```

2. **Iniciar contenedores en las redes personalizadas:**

    ```bash
    docker run -it --name contenedor1 --network RedApp1 ubuntu:22.04
    docker run -it --name contenedor2 --network RedApp1 ubuntu:22.04
    docker run -it --name contenedor3 --network RedApp2 ubuntu:22.04
    ```

- *En este ejemplo, `contenedor1` y `contenedor2` pueden comunicarse entre sí, pero no pueden comunicarse con `contenedor3`, ya que están en diferentes redes.*

- *La red `bridge` de Docker es una herramienta poderosa para manejar la comunicación y el aislamiento de contenedores, proporcionando una forma sencilla y flexible de configurar redes para aplicaciones.*

- *Para realizar una inspección específica de un contenedor en Docker y obtener solo una clave particular, se puede usar la opción `-f` o `--format`. Esto permite extraer información específica del contenedor. Por ejemplo, para obtener la dirección IP de un contenedor, se puede usar la siguiente sintaxis:*

```bash
docker inspect --format "{{.NetworkSettings.IPAddress}}" App-00-Nodejs
# O de manera abreviada
docker inspect -f "{{.NetworkSettings.IPAddress}}" App-00-Nodejs
```

**Este comando devolverá la dirección IP del contenedor `App-00-Nodejs`:**

```bash
172.17.0.2
```

**Podemos usar esta IP `172.17.0.2` en nuestro programa `index.js` y agregar una línea para registrar la IP del solicitante `console.log("Request from", req.socket.remoteAddress);`:**

```javascript
// Autor: Daniel Benjamin Perez Morales
// GitHub: https://github.com/DanielPerezMoralesDev13
// Correo electrónico: danielperezdev@proton.me

const { createServer } = require('node:http');

const hostname = '172.17.0.2';
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

**Para ejecutar el programa:**

```bash
node index.js
```

**Si aún no lo has iniciado, conecta el contenedor `test-client`:**

```bash
docker attach test-client
root@0f3fdde42f5a:/# curl 172.17.0.2:3000
Hello World
```

**En el contenedor `App-00-Nodejs`, la salida sería:**

```bash
root@a2e5334b6474:/App# node index.js 
Server running at http://172.17.0.2:3000/
Request from 172.17.0.3
```

- *Como vemos, los contenedores están conectados en la misma red y pueden comunicarse entre sí.*

- *También se puede comunicar desde el localhost de nuestra máquina host si está bajo la misma red. Usando `curl` o un navegador web, podemos acceder al servidor:*

```bash
curl 172.17.0.2:3000/
Hello World
```

**La salida del contenedor donde se está ejecutando el servidor sería:**

```bash
root@a2e5334b6474:/App# node index.js 
Server running at http://172.17.0.2:3000/
Request from 172.17.0.3
Request from 172.17.0.1
Request from 172.17.0.1
```

- *La dirección IP `172.17.0.1` es la IP que corresponde a la interfaz `bridge` de Docker, que actúa como un router. Y como la interfaz `bridge` esta en nuestra host las peticiones parecen venir del router, confirmando que están en la misma red y pueden comunicarse entre sí.*
