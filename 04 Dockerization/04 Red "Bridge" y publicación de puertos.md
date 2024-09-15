<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->

# ***Red "Bridge" y publicación de puertos***

- *Clases de direcciones IP ya no son una parte relevante del diseño de direcciones IP desde la introducción de la Claseless Inter-Domain Routing (CIDR) a principios de la década de 1990. Sin embargo, todavía es útil comprender el concepto en términos históricos.*

- *Antes de CIDR, las direcciones IP se dividían en clases A, B y C, cada una con un rango de direcciones específico destinado a redes de diferentes tamaños.*

1. **Clase A:** *Las direcciones IP de clase A se asignaban a las redes más grandes. Estas direcciones tenían el primer bit establecido en 0 y permitían 126 redes, cada una con hasta 16,777,214 hosts.*

2. **Clase B:** *Las direcciones IP de clase B se asignaban a redes medianas. El primer bit de estas direcciones se establecía en 1 y el segundo bit en 0. Esto permitía 16,384 redes, cada una con hasta 65,534 hosts.*

3. **Clase C:** *Las direcciones IP de clase C se asignaban a redes más pequeñas. El primer bit de estas direcciones se establecía en 1, el segundo bit en 1, y el tercer bit en 0. Esto permitía 2,097,152 redes, cada una con hasta 254 hosts.*

- **Con la introducción de CIDR, se volvió posible dividir bloques de direcciones en subredes de diferentes tamaños, lo que permitió un uso más eficiente del espacio de direcciones IP.**

**En cuanto a las direcciones IP privadas y públicas, aquí hay una breve explicación:**

**Direcciones IP privadas:** *Son direcciones reservadas para su uso en redes privadas, como redes domésticas o empresariales internas. Estas direcciones no son ruteables a través de Internet público. Algunos rangos de direcciones IP privadas son:*

- **Clase A privada:** *`10.0.0.0` - `10.255.255.255`*
- **Clase B privada:** *`172.16.0.0` - `172.31.255.255`*
- **Clase C privada:** *`192.168.0.0` - `192.168.255.255`*

**Direcciones IP públicas:** *Son direcciones asignadas a dispositivos o servidores que son accesibles a través de Internet. Estas direcciones son únicas y ruteables en Internet. Las direcciones IP públicas no están reservadas, pero algunas de ellas están designadas para uso especial, como las direcciones IP utilizadas para pruebas, multicast, etc.*

- *Es importante recordar que la asignación de direcciones IP ha evolucionado con el tiempo, y actualmente hay otras consideraciones además de las clases de direcciones IP, como la subredización y la asignación de direcciones IP sin clases.*

- **El tema es la configuración de una red bridge en Docker. Las direcciones IP asignadas por la red de Docker a los contenedores son especiales porque son direcciones IP privadas de clase B.**

```bash
ip a show docker0 
5: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:5e:24:cf:09 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:5eff:fe24:cf09/64 scope link 
       valid_lft forever preferred_lft forever
```

- *La dirección IP de la interfaz de Docker es 172.17.0.1/16. La `/16` indica la máscara de subred, donde los primeros 16 bits son fijos. En este caso, `172.17` son los bits fijos. El rango de direcciones va desde `172.17.0.1` hasta `172.17.255.254`, con la dirección de broadcast `172.17.255.255`, que se utiliza para enviar paquetes a todos los dispositivos en la red.*

- *Esta red es una red privada. Implica que la dirección IP `172.17.0.1` se enruta solo en el host donde Docker está instalado. Por ejemplo, si tenemos un contenedor llamado App-00-Nodejs ejecutando un servidor de Node.js, este contenedor estaría dentro de la red privada y solo sería accesible desde el host local.*

```bash
root@a2e5334b6474:/App# node index.js 
Server running at http://172.17.0.2:3000/
```

- *Comprobemos que poniendo esa IP en nuestro navegador podemos enviar una petición al servidor porque ambos están conectados al mismo router. ¿Qué pasaría si desde un móvil u otro ordenador ponemos esto en el navegador `172.17.0.2:3000/`, estando conectado al mismo router que mi ordenador? No veríamos la respuesta. Esto se debe a que la IP `172.17.0.2` es privada y solo se enruta en nuestro ordenador con Docker.*

- *Esta situación ilustra cómo las direcciones IP privadas, como las asignadas por Docker en su red bridge, están aisladas del resto de la red y solo son accesibles localmente. Si deseamos que el servidor sea accesible desde dispositivos externos, necesitaríamos configurar Docker para que utilice una interfaz de red diferente o redirigir los puertos desde la dirección IP pública del host.*

- *Imagina que tienes un enrutador en tu casa que asigna direcciones IP a los dispositivos conectados a él. Luego, tienes un PC de sobremesa con Docker instalado. En este PC, ejecutas dos contenedores conectados a la red bridge, cuya dirección IP es `172.17.0.0`. Uno de estos contenedores, llamado App-00-Nodejs, ejecuta un servidor de Node.js en el puerto `3000`, y su dirección IP es `172.17.0.2`.*

- *Si intentamos comunicarnos directamente con el contenedor App-00-Nodejs desde un dispositivo externo, como un móvil o otro ordenador conectado al mismo router doméstico, no podremos. Esto se debe a que el router no sabe cómo enrutar la dirección IP `172.17.0.2` ya que es una IP privada y solo es conocida dentro de la red local del PC donde está ejecutando Docker. El router no está conectado a esta red bridge de Docker.*

- *Por lo tanto, si un cliente externo intenta acceder al servidor del contenedor directamente, no podrá hacerlo porque no está conectado a la red bridge donde residen los contenedores. Esto es importante en entornos de servidor, donde tenemos un servidor con una dirección IP pública (por ejemplo, `192.10.10.2`) conectada a un router (por ejemplo, `192.10.10.1`), y luego tenemos contenedores ejecutándose en ese servidor, pero no son accesibles directamente desde fuera de la red local del servidor.*

- *Para permitir que los clientes se comuniquen con nuestra aplicación en el contenedor, debemos publicar un puerto del contenedor en un puerto del host del servidor. De esta manera, los clientes pueden comunicarse solo con el host del servidor, ya que no pueden comunicarse directamente con los contenedores. Esto se hace configurando correctamente la redirección de puertos o utilizando herramientas como Docker Compose para gestionar la conectividad de red.*

*![Images para entender como hacer para que otros ordenadores se comuniquen con nuestra aplicacion](../images/Images%20para%20entender%20como%20hacer%20para%20que%20otros%20ordenadores%20se%20comuniquen%20con%20nuestra%20aplicacion.png "../images/Images para entender como hacer para que otros ordenadores se comuniquen con nuestra aplicacion.png")*

*![Images para entender por que las ip de los contenedores son privadas](../images/Images%20para%20entender%20por%20que%20las%20ip%20de%20los%20contenedores%20son%20privadas.png "../images/Images para entender por que las ip de los contenedores son privadas.png")*

- *Para permitir que otros dispositivos se comuniquen con la aplicación que se ejecuta en el puerto 3000 del contenedor, debemos publicar ese puerto en un puerto del host. Esto se puede hacer especificando el mapeo de puertos al crear el contenedor.*

```bash
docker run -itw /App --publish 5000:3000 --name App-00-Nodejs ubuntu:22.04
```

**o usando la abreviación `-p`:**

```bash
docker run -itw /App -p 5000:3000 --name App-00-Nodejs ubuntu:22.04
```

- *El `--publish` o `-p` es para publicar el puerto, donde el formato es `puerto_host:puerto_contenedor`. En este caso, el puerto del host sería `5000` y el puerto del contenedor sería `3000`.*

- *Después de crear el contenedor con el puerto publicado, tendrás que reinstalar las dependencias, binarios y utilidades necesarias dentro del contenedor. Esto se puede hacer ejecutando los comandos de instalación nuevamente dentro del contenedor.*

```bash
apt update && apt install -y curl && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh && bash nodesource_setup.sh && apt-get install -y nodejs && node -v && npm -v
```

**Para verificar que la dirección IP del contenedor siga siendo la misma después de recrearlo, puedes usar el siguiente comando:**

```bash
docker inspect -f "{{.NetworkSettings.IPAddress}}" App-00-Nodejs 
```

- *Esto te dará la dirección IP del contenedor, que en tu caso es `172.17.0.2`. Si la dirección IP sigue siendo la misma, significa que el contenedor ha sido recreado correctamente y sigue teniendo la misma configuración de red.*

**Copiamos el fichero index.js del host al contenedor:**

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

```bash
docker cp ./index.js App-00-Nodejs:/App
```

**hacer peticion:**

```bash
curl localhost:5000
Hello World
```

**Para ver los puertos publicados de los contenedores, usamos `docker ps -a`.**

```bash
docker ps -a
CONTAINER ID   IMAGE          COMMAND       CREATED          STATUS          PORTS                                       NAMES
6f68557da99b   ubuntu:22.04   "/bin/bash"   37 minutes ago   Up 37 minutes   0.0.0.0:5000->3000/tcp, :::5000->3000/tcp   App-00-Nodejs
0f3fdde42f5a   ubuntu:22.04   "/bin/bash"   30 hours ago     Up 19 seconds                                               test-client
```

**Podemos ver que la columna de puertos está de la siguiente manera:**

```bash
PORTS
0.0.0.0:5000->3000/tcp, :::5000->3000/tcp
```

- *Esto significa que el puerto `3000/tcp` del contenedor está publicado como `0.0.0.0:5000` en nuestra máquina host. La dirección IP `0.0.0.0` significa todas las IP o cualquier IP, ya que en nuestra computadora puede haber varias IP si está conectada a varios routers o tiene varios puertos Ethernet. Esto significa que podemos hacer una petición al servidor usando cualquier dirección IP de la computadora, incluyendo localhost. Si en nuestro programa de Node.js especificamos el host como `0.0.0.0`, no necesitamos preocuparnos por la dirección IP del contenedor, ya que es una IP que escucha en todas las direcciones.*

- *La dirección IPv6 correspondiente es `:::5000->3000/tcp`.*

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

```bash
docker cp ./index.js App-00-Nodejs:/App
```

**Siguiendo el tema de los puertos tambien los podemos ver mas informacion usando el subcomando inspect:**

```bash
docker inspect App-00-Nodejs
docker inspect App-00-Nodejs > App-00-Nodejs.json
```

```json
[
    {
        "Id": "6f68557da99b6bf9198670010d6953cdd005356c7d6ad251dc6b3fc20bc0e8eb",
        "Created": "2024-06-03T00:50:45.232762876Z",
        "Path": "/bin/bash",
        "Args": [],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 152076,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2024-06-03T00:50:45.632605642Z",
            "FinishedAt": "0001-01-01T00:00:00Z"
        },
        "Image": "sha256:52882761a72a60649edff9a2478835325d084fb640ea32a975e29e12a012025f",
        "ResolvConfPath": "/var/lib/docker/containers/6f68557da99b6bf9198670010d6953cdd005356c7d6ad251dc6b3fc20bc0e8eb/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/6f68557da99b6bf9198670010d6953cdd005356c7d6ad251dc6b3fc20bc0e8eb/hostname",
        "HostsPath": "/var/lib/docker/containers/6f68557da99b6bf9198670010d6953cdd005356c7d6ad251dc6b3fc20bc0e8eb/hosts",
        "LogPath": "/var/lib/docker/containers/6f68557da99b6bf9198670010d6953cdd005356c7d6ad251dc6b3fc20bc0e8eb/6f68557da99b6bf9198670010d6953cdd005356c7d6ad251dc6b3fc20bc0e8eb-json.log",
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
            "PortBindings": {
                "3000/tcp": [
                    {
                        "HostIp": "",
                        "HostPort": "5000"
                    }
                ]
            },
            "RestartPolicy": {
                "Name": "no",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "ConsoleSize": [
                7,
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
                "LowerDir": "/var/lib/docker/overlay2/9a5dd8245a5f1f60faed0b1f5d51149f4e3a4f31cbf6e59f08f0dd448f75923a-init/diff:/var/lib/docker/overlay2/043387975c35001ef7b631d7ad09d104fcb9b7970b5b3a38042167dd0c65a764/diff",
                "MergedDir": "/var/lib/docker/overlay2/9a5dd8245a5f1f60faed0b1f5d51149f4e3a4f31cbf6e59f08f0dd448f75923a/merged",
                "UpperDir": "/var/lib/docker/overlay2/9a5dd8245a5f1f60faed0b1f5d51149f4e3a4f31cbf6e59f08f0dd448f75923a/diff",
                "WorkDir": "/var/lib/docker/overlay2/9a5dd8245a5f1f60faed0b1f5d51149f4e3a4f31cbf6e59f08f0dd448f75923a/work"
            },
            "Name": "overlay2"
        },
        "Mounts": [],
        "Config": {
            "Hostname": "6f68557da99b",
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
            "SandboxID": "3e4964f76244fea511ffba9f81cec617b6ce15b5a5282cd67c50ddd184b0b329",
            "SandboxKey": "/var/run/docker/netns/3e4964f76244",
            "Ports": {
                "3000/tcp": [
                    {
                        "HostIp": "0.0.0.0",
                        "HostPort": "5000"
                    },
                    {
                        "HostIp": "::",
                        "HostPort": "5000"
                    }
                ]
            },
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "bf45a700feb1442f73ee246c470947a561abd2be1e541c47cff2f936f369150a",
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
                    "NetworkID": "7e4591f5a89bedaa8747c592236dc68998c35cbe74bb929f4ce2f3eb7de7354e",
                    "EndpointID": "bf45a700feb1442f73ee246c470947a561abd2be1e541c47cff2f936f369150a",
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

**veremos que en la seccion de `NetworkSettings`:**

```json
"NetworkSettings": {
    "Bridge": "",
    "SandboxID": "3e4964f76244fea511ffba9f81cec617b6ce15b5a5282cd67c50ddd184b0b329",
    "SandboxKey": "/var/run/docker/netns/3e4964f76244",
    "Ports": {
        "3000/tcp": [
            {
                "HostIp": "0.0.0.0",
                "HostPort": "5000"
            },
            {
                "HostIp": "::",
                "HostPort": "5000"
            }
        ]
    },
    "HairpinMode": false,
    "LinkLocalIPv6Address": "",
    "LinkLocalIPv6PrefixLen": 0,
    "SecondaryIPAddresses": null,
    "SecondaryIPv6Addresses": null,
    "EndpointID": "bf45a700feb1442f73ee246c470947a561abd2be1e541c47cff2f936f369150a",
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
            "NetworkID": "7e4591f5a89bedaa8747c592236dc68998c35cbe74bb929f4ce2f3eb7de7354e",
            "EndpointID": "bf45a700feb1442f73ee246c470947a561abd2be1e541c47cff2f936f369150a",
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

- *En la sección de `Ports` del resultado de `docker inspect`, podemos ver la configuración de los puertos publicados.*

**En este caso específico:**

```json
"Ports": {
    "3000/tcp": [
        {
            "HostIp": "0.0.0.0",
            "HostPort": "5000"
        },
        {
            "HostIp": "::",
            "HostPort": "5000"
        }
    ]
}
```

- *Se especifica que el puerto `3000/tcp` del contenedor está publicado en el host en la dirección IP `0.0.0.0`, lo que significa que está disponible en todas las interfaces de red del host. Además, está mapeado al puerto `5000` del host tanto para IPv4 como para IPv6.*

- *Este mapeo de puertos permite que el servidor de Node.js en el contenedor sea accesible desde otros contenedores o desde el host mismo. Y como mencionamos, el protocolo por defecto es TCP, pero también se pueden publicar puertos UDP de manera similar. Esto significa que, si tienes otro contenedor ejecutándose en la misma red de Docker, puedes enviar solicitudes al servidor de Node.js en este contenedor usando la dirección IP y el puerto del host donde se publicó el puerto del contenedor.*

```bash
root@0f3fdde42f5a:/# curl http://172.17.0.2:3000
Hello World
```

**Para averiguar nuestra dirección IP, podemos utilizar el siguiente comando:**

```bash
ip address show wlp6s0
ip address show wlp6s0 > interfaz_ethernet.txt
```

**El resultado podría verse así:**

```bash
3: wlp6s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether e4:02:9b:1d:40:ac brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.9/24 brd 192.168.1.255 scope global dynamic noprefixroute wlp6s0
       valid_lft 73010sec preferred_lft 73010sec
    inet6 fe80::9419:8468:6306:a88d/64 scope link noprefixroute 
       valid_lft forever preferred_lft forever
```

**También podemos usar el comando:**

```bash
hostname -I
192.168.1.9 172.18.0.1 172.17.0.1
```

- *En este caso, nuestra dirección IP sería `192.168.1.9`. Entonces, desde otro ordenador conectado al mismo router, podemos enviar una petición al servidor de Node.js usando esta dirección IP y el puerto `5000`, donde nuestra aplicación está publicada. Por ejemplo, usando curl o simplemente colocando `192.168.1.9:5000` en el navegador, enviaremos una solicitud al servidor de Node.js.*

- *Esta IP (`192.168.1.9`) es pública y corresponde a nuestro ordenador. Cuando hacemos una petición al servidor de Node.js, el host redirige la petición al servidor de Node.js, que se ejecuta en el contenedor, utilizando la IP `0.0.0.0` y el puerto `3000`, es decir, `http://0.0.0.0:3000/`.*

```bash
curl 192.168.1.9:5000
```

**Si estás en una máquina virtual, la salida será diferente:**

```bash
ip address show wlp6s0
ip address show wlp6s0 > interfaz_ethernet.txt
```

**En una máquina virtual, la IP asignada será distinta a la de tu ordenador. Será una IP privada que solo se enruta en tu ordenador.**

```bash
hostname -I
10.0.2.15 172.17.0.1
```

- *La IP asignada por la máquina virtual es `10.0.2.15`, mientras que la IP de la interfaz de Docker es `172.17.0.1`.*

*Si deseas que la aplicación sea accesible desde otro dispositivo en la misma red utilizando la IP asignada por la máquina virtual, necesitarás ajustar la configuración de red de la máquina virtual:*

1. *Apaga la máquina virtual (si está encendida).*
2. *Haz clic derecho sobre la máquina, ve a "Configuración" -> "Red". Por defecto, está configurada como NAT y puedes configurar el reenvío de puertos, pero hay un método más sencillo.*
3. *Utiliza "Adaptador de puente", que te asignará una IP para la máquina virtual que esté en tu red, como `192.168.1.9`.*
4. *Acepta los cambios y arranca la máquina virtual.*

**Ahora, puedes ver la IP asignada a esa máquina virtual:**

```bash
hostname -I
192.168.0.161 172.17.0.1
```

- *La IP asignada será similar a `192.168.1.161`, donde el tercer número probablemente sea `1`.*

*Luego, inicia el contenedor y ejecuta el script de Node:*

```bash
docker start -i App-00-Nodejs 
root@6f68557da99b:/App# node index.js 
Server running at http://0.0.0.0:3000/
```

- *Ahora, desde otro dispositivo conectado a la misma red, podrás hacer una petición utilizando curl o ingresando `192.168.0.161:5000` en el navegador.*
