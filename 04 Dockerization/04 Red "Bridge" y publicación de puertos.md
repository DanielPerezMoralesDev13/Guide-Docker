<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me  -->

# ***Red "Bridge" y publicación de puertos***

- *Clases de direcciones IP ya no son una parte relevante del diseño de direcciones IP desde la introducción de la Claseless Inter-Domain Routing (CIDR) a principios de la década de 1990. Sin embargo, todavía es útil comprender el concepto en términos históricos.*

- *Antes de CIDR, las direcciones IP se dividían en clases A, B y C, cada una con un rango de direcciones específico destinado a redes de diferentes tamaños.*

1. **Clase A:** *Las direcciones IP de clase A se asignaban a las redes más grandes. Estas direcciones tenían el primer bit establecido en 0 y permitían 126 redes, cada una con hasta 16,777,214 hosts.*

2. **Clase B:** *Las direcciones IP de clase B se asignaban a redes medianas. El primer bit de estas direcciones se establecía en 1 y el segundo bit en 0. Esto permitía 16,384 redes, cada una con hasta 65,534 hosts.*

3. **Clase C:** *Las direcciones IP de clase C se asignaban a redes más pequeñas. El primer bit de estas direcciones se establecía en 1, el segundo bit en 1, y el tercer bit en 0. Esto permitía 2,097,152 redes, cada una con hasta 254 hosts.*

- **Con la introducción de CIDR, se volvió posible dividir bloques de direcciones en subredes de diferentes tamaños, lo que permitió un uso más eficiente del espacio de direcciones IP.**

**En cuanto a las direcciones IP privadas y públicas, aquí hay una breve explicación:**

**Direcciones IP privadas:** *Son direcciones reservadas para su uso en redes privadas, como redes domésticas o empresariales internas. Estas direcciones no son ruteables a través de Internet público. Algunos rangos de direcciones IP privadas son:*

- **Clase A privada:** `10.0.0.0` - `10.255.255.255`
- **Clase B privada:** `172.16.0.0` - `172.31.255.255`
- **Clase C privada:** `192.168.0.0` - `192.168.255.255`

**Direcciones IP públicas:** *Son direcciones asignadas a dispositivos o servidores que son accesibles a través de Internet. Estas direcciones son únicas y ruteables en Internet. Las direcciones IP públicas no están reservadas, pero algunas de ellas están designadas para uso especial, como las direcciones IP utilizadas para pruebas, multicast, etc.*

- *Es importante recordar que la asignación de direcciones IP ha evolucionado con el tiempo, y actualmente hay otras consideraciones además de las clases de direcciones IP, como la subredización y la asignación de direcciones IP sin clases.*

```bash
ip a show docker0 
5: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:5e:24:cf:09 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:5eff:fe24:cf09/64 scope link 
       valid_lft forever preferred_lft forever
```

 ip de la interfaz de docker 172.17.0.1/16 y la /16 indica la mascara /16 indica que los primeres 16 bits son fijos y como cada `<172>.<17>.<0>.<1>` numero de esto son 8 bits o 1 byte significa que `172.17` son fijos la red empieza por `172.17` y el resto puede ir variando desde todos 0 que serian 172.17.`<0>.<1>` hasta todos 1 que seria 172.17.`255`.`255` esa es la direccion de broadcast `brd 172.17.255.255` que sirve para mandar paquetes a todos los dispositivos que estan en esa red y `172.17.0.1` la toma el router y la `172.17.0.2` hasta la `172.17.255.254` son ip que se le pueden asignar a contenedores

esta red es una red privada `172.17.0.1` que implicaciones tiene que sea privada implicaciones que tiene es que esta ip `172.17.0.1`  se enruta sola en tu pc y nada mas solo se enruta desde el host donde esta docker instalado, por ejemplo nosotros tenemos un contenedor llamado App-00-Nodejs ejecutandose un servidor de node.

```bash
root@a2e5334b6474:/App# node index.js 
Server running at http://172.17.0.2:3000/
```

y he comprobado que poniendo eas ip en nuestro navegador podemas mandar una peticion al servidor por que ambos estan conectados al mismo route que pasaria si yo con un movil u otro ordenador ponemos esto en el navegador 172.17.0.2:3000/ que esta conectado al mismo route que mi ordenador ¿voy haber la respuesta? no. ya que esta ip `172.17.0.2` es privada y solo se enruta en nuestro ordenador con docker.

ejemplo

si tienes en tu casa un route despues tiene un pc de sobremesa con docker instalado donde 2 contenedores ejecutados conectados ala red bridge que es la `172.17.0.0` y un de esos contenedores `llamado App-00-Nodejs` este ejecutando un servidor de node por el puerto `3000` la direccion ip de ese contenedor es `172.17.0.2` bueno si queremo comunicarnos con el contenedor `App-00-Nodejs` de forma directa desde nuestro movil o desde cualquier otro ordenador conectado al mismo route de casa ¡No puedes! por que si le das la ip del contenedor que es `172.17.0.2` al route de casa el route no sabra de donde viene esa ip `172.17.0.2` que es la del contenedor, la cual el route no la puede enrutar por que es una ip privada la cual tu route no esta conectado, por que solo tu ordenador donde tienes docker esta conectada esa red, y si entonces si un cliente que no esta conectada ala red bridge no puede mandar una peticion al servidor de manera directa por que no esta conectado ala red de bridge que se le asigna alos contenedores. Y eso es importante a nivel de servidores por que si tienes un servidor con su ip publica `192.10.10.2` conectado a su route `192.10.10.1` y luego tienes contenedores que se estan ejecutando en ese servidor conectados ala red bridge y uno de ellos tiene un servidor de node, pues un cliente que esta fuera del servidor que esta en su casa conectado a su route `192.168.1.1` y con su ordenador `192.168.1.2` quiere mandar una peticion al servidor del contenedor de forma directa no podra, por que la ip del contenedor es privada, solo se puede comunicar con la ip publica del servidor pero para hacer que nuestra aplicacion sea visible y que los cliente pueden comunicarse con ella lo que tenemos que hacer es publicar un puerto de nuestro contenedor a un puerto de nuestro host del servidor para que los cliente se comuniquen solo con el host del servidor por que no se pueden comunicar directamente con contenedores

En este caso el:
nosotros tenemos la aplicacion en el puerto 3000 del contenedor lo que tenemos que hacer es publicar ese puerto 3000 en un puerto de nuestro host para que el puerto de nuestro host se comunique con el puerto 3000 del contenedor. para publicar puertos en docker tenemos que hacerlo antes de crear el contenedor, cuando creamos el contenedor ya no se puede publicar un puerto para el host solucion seria volver a crear el contenedor

```bash
docker run -itw /App --publish 5000:3000 --name App-00-Nodejs ubuntu:22.04
root@6f68557da99b:/App#
```

```bash
docker run -itw /App -p 5000:3000 --name App-00-Nodejs ubuntu:22.04

```

el `--publish`, -p es para publicar el puerto que en este caso seria `5000` el del host y el del contenedor seria `3000`
por lo tanto seria asi

**puerto host`:`puerto contenedor**

tendremos que repetir los pasos para instalar las dependencias,binario y utilidades

```bash
root@6f68557da99b:/App# apt update && apt install -y curl && curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh && bash nodesource_setup.sh && apt-get install -y nodejs && node -v && npm -v
```
