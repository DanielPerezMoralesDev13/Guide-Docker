<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->

# ***Comandos para obtener informacion de las IP privadas y publicas de nuestro ordenador***

**Para saber tu dirección IP privada en Linux, puedes usar varios comandos en la terminal. Aquí tienes algunas opciones:**

---

## ***Usando `dig`***

**Para instalar `dig` en Linux, necesitas instalar el paquete `dnsutils`. Dependiendo de tu distribución de Linux, puedes usar el gestor de paquetes correspondiente. Aquí tienes los comandos para algunas distribuciones populares:**

- **Ubuntu/Debian**:

```bash
sudo apt-get update
sudo apt-get install dnsutils
```

- **CentOS/RHEL**:

```bash
sudo yum install bind-utils
```

- **Fedora**:

```bash
sudo dnf install bind-utils
```

- **OpenSUSE**:

```bash
sudo zypper install bind-utils
```

**Una vez instalado `dnsutils`, tendrás acceso a la utilidad `dig` en tu sistema. Puedes verificar su instalación ejecutando:**

```bash
dig --version
```

**Esto te mostrará la versión de `dig` instalada en tu sistema, si la instalación fue exitosa.**

**Uso:**

```bash
dig +short myip.opendns.com @resolver1.opendns.com
```

---

## ***Usando `ip a`***

1. *Abre una terminal.*
2. *Escribe el siguiente comando y presiona Enter:*

   ```bash
   ip address
   ```

   ```bash
   # alias
   ip a
   ```

   - *Este comando mostrará información detallada sobre todas las interfaces de red en tu sistema. Busca la sección que corresponde a tu interfaz de red activa (por lo general, `eth0` para conexiones cableadas o `wlan0` para conexiones inalámbricas) y encuentra la línea que dice `inet`. La dirección IP privada se muestra después de `inet` y antes de la barra `/`.*

---

### ***Usando `hostname -I` o `hostname -i`***

1. **Abre una terminal.**
2. **Escribe el siguiente comando y presiona Enter:**

   ```bash
   hostname -I
   ```

   ```bash
   hostname -i
   ```

   **Este comando te mostrará directamente las direcciones IP asignadas a tu dispositivo.**

---

### ***Usando `ifconfig`***

1. *Abre una terminal.*
2. *Escribe el siguiente comando y presiona Enter:*

   ```bash
   ifconfig
   ```

   - *Este comando es similar a `ip a` y te mostrará información sobre todas las interfaces de red. Busca la sección correspondiente a tu interfaz de red activa y encuentra la línea que dice `inet`. La dirección IP privada se muestra después de `inet`.*

---

### ***Usando `nmcli`***

1. *Abre una terminal.*
2. *Escribe el siguiente comando y presiona Enter:*

   ```bash
   nmcli -p device show
   ```

   - *Este comando mostrará información sobre todas las interfaces de red gestionadas por NetworkManager. Busca la sección correspondiente a tu interfaz de red activa y encuentra la línea que dice `IP4.ADDRESS[1]`.*

*Estos métodos te ayudarán a encontrar tu dirección IP privada en un sistema Linux.*

- *Si el comando `ip a` está dando error, podría ser porque no tienes los permisos necesarios o el comando `ip` no está instalado en tu sistema. Aquí tienes algunos pasos para solucionar y alternativas para encontrar tu IP privada:*

---

### ***1. Verificar permisos***

**Asegúrate de que estás ejecutando el comando con los permisos adecuados. Intenta usar `basudo`:**

```bash
sudo ip a
```

---

### **2. Instalar herramientas de red**

- *Si `ip` no está instalado, puedes instalarlo. En la mayoría de las distribuciones de Linux basadas en Debian (como Ubuntu), puedes instalarlo con:*

```bash
sudo apt-get update
sudo apt-get install iproute2
```

---

### ***3. Usar `ifconfig` (herramienta alternativa)***

**Si `ifconfig` tampoco está disponible, puedes instalar el paquete `net-tools`:**

```bash
sudo apt-get update
sudo apt-get install net-tools
```

**Luego puedes usar:**

```bash
ifconfig
```

---

### ***4. Usar `hostname -I` o  `hostname -i`(opción directa)***

**Este comando generalmente no requiere instalación adicional:**

```bash
hostname -I
```

```bash
hostname -i
```

---

### ***5. Usar `nmcli` (NetworkManager)***

**Este comando es útil si tienes NetworkManager instalado y configurado:**

```bash
nmcli -p device show
```

---

### ***6. Usar `ip addr` (forma alternativa del comando `ip`)***

**Otra forma de usar el comando `ip`:**

```bash
sudo ip addr show
```

---

### ***Ejemplo detallado de uso de `ifconfig`***

1. *Abre una terminal.*
2. *Escribe el siguiente comando y presiona Enter:*

   ```bash
   ifconfig
   ```

3. *Busca la sección que corresponde a tu interfaz de red activa, como `eth0` (para conexiones cableadas) o `wlan0` (para conexiones inalámbricas). En esta sección, busca la línea que contiene `inet`, que mostrará tu dirección IP privada.*

---

### ***Ejemplo detallado de uso de `nmcli`***

1. *Abre una terminal.*
2. *Escribe el siguiente comando y presiona Enter:*

   ```bash
   nmcli -p device show
   ```

3. *Busca la línea que dice `IP4.ADDRESS[1]`, que mostrará tu dirección IP privada.*

*El comando `ip address show` te ha mostrado las interfaces de red y sus direcciones IP. La interfaz `eth0@if9` tiene una dirección IP privada de `172.17.0.3/16`. Un posible error que que podemos tener es intentar mostrar información específica para `eth0@if9` puede deberse a que la interfaz está en un entorno de red de contenedores (por ejemplo, Docker). la manera correcta seria `eth0`*

**Posiblemente la salida del comando sea:**

```bash
root@0f3fdde42f5a:/# ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
10: eth0@if11: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:11:00:03 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.17.0.3/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever
```

- *La interfaz `eth0@if9` tiene la IP privada `172.17.0.3`.*

*La dirección IP `172.17.0.3` es una dirección privada, típicamente asignada a contenedores dentro de una red Docker.*

---

### ***Resumen***

- **Interfaz de red:** `eth0@if9`
- **Dirección IP privada:** `172.17.0.3/16`

---

- *Para ver solo la dirección IP específica para la interfaz `eth0`. Puedes usar el comando `ip address show` con `grep` para filtrar la salida y mostrar solo las líneas que contienen la dirección `inet`.*

**Aquí está el comando que puedes usar:**

```bash
ip address show eth0 | grep -iE "inet [0-9].*/"
```

**Este comando hace lo siguiente:**

1. *`ip address show eth0` muestra la información de la interfaz `eth0`.*
2. *`grep -iE "inet [0-9].*/"` filtra las líneas que contienen la dirección IP (`inet`).*

**En tu entorno actual, ejecutando el comando:**

```bash
ip address show eth0 | grep -iE "inet [0-9].*/"
```

**Debería mostrar:**

```bash
inet 172.17.0.3/16 brd 172.17.255.255 scope global eth0
```

- **Esta línea muestra la dirección IP privada `172.17.0.3/16` asignada a la interfaz `eth0`.**

- *Si quieres extraer y mostrar solo la dirección IP con su máscara, sin el resto de la información. Puedes hacer esto usando una combinación de `ip`, `grep`, y `awk`.*

**Aquí tienes el comando que hará exactamente eso:**

```bash
ip address show eth0 | grep -iE "inet [0-9].*/" | awk '{print $2}'
```

### ***Explicación del Comando***

1. **`ip address show eth0`:** *Muestra la información de la interfaz `eth0`.*
2. **`grep -iE "inet [0-9].*/"`:** *Filtra las líneas que contienen `inet` seguidas de una dirección IP.*
3. **`awk '{print $2}'`:** *Extrae y muestra solo el segundo campo de la línea, que es la dirección IP con su máscara.*

**Al ejecutar este comando, deberías obtener solo la dirección IP con su máscara:**

```bash
172.17.0.3/16
```

> [!WARNING]
> *Si `ifconfig` no está instalado, puedes instalar el paquete `net-tools` que lo incluye. Sin embargo, para obtener solo la dirección IP de una interfaz específica, los comandos basados en `ip` son recomendados ya que son más modernos y están generalmente disponibles en las distribuciones de Linux recientes.*

**Para instalar `ifconfig` y usarlo, sigue estos pasos:**

---

### ***Instalar `net-tools`***

**En distribuciones basadas en Debian/Ubuntu:**

```bash
sudo apt-get update
sudo apt-get install net-tools
```

**En distribuciones basadas en Red Hat/Fedora:**

```bash
sudo yum install net-tools
```

---

### ***Usar `ifconfig` para obtener la IP***

**Una vez instalado, puedes usar `ifconfig` para ver la dirección IP:**

```bash
ifconfig eth0 | grep 'inet ' | awk '{ print $2 }'
```

---

### ***Alternativa usando `ip`***

**Como alternativa más moderna y recomendada, ya que `ip` debería estar disponible, puedes usar el siguiente comando para obtener directamente la dirección IP de la interfaz `eth0`:**

```bash
ip -o -4 addr list eth0 | awk '{print $4}'
```

### ***Explicación del Comando `ip`***

1. **`ip -o -4 addr list eth0`:** *Muestra la información de la interfaz `eth0` en una línea, filtrando solo las direcciones IPv4.*
2. **`awk '{print $4}'`:** *Extrae y muestra solo la cuarta columna, que es la dirección IP con su máscara.*

---

### ***Ejecución del Comando***

**Ejecuta el siguiente comando en tu terminal para obtener solo la dirección IP con su máscara:**

```bash
ip address show eth0 | grep -iE "inet [0-9].*/" | awk '{print $2}'
```

**O con el comando alternativo:**

```bash
ip -o -4 addr list eth0 | awk '{print $4}'
```

**Cualquiera de estos comandos debería proporcionarte la salida deseada, que es solo la dirección IP `172.17.0.3/16`.**

- *El comando `ip -o -4 addr list eth0` está compuesto por varias opciones que modifican el comportamiento del comando `ip`, que se utiliza para mostrar o manipular la configuración de red en sistemas Linux. Aquí está la explicación de cada parte del comando:*

- **`ip`:** *Es el comando principal para interactuar con la configuración de red en sistemas Linux.*
  
- **`-o`:** *Esta opción, corta la salida para que cada línea tenga solo una entrada (one-line output). En otras palabras, cada interfaz y sus direcciones IP se muestran en una sola línea, lo que facilita el procesamiento posterior de la salida.*

- **`-4`:** *Esta opción indica que solo se deben mostrar direcciones IPv4.*

- **`-6`:** *Esta opción indica que solo se deben mostrar direcciones IPv6.*

- **`addr list eth0`:** *Esta parte del comando indica que se debe mostrar la información de la dirección IP de la interfaz de red `eth0`.*

- *Entonces, en resumen, el comando `ip -o -4 addr list eth0` muestra información sobre las direcciones IPv4 asociadas con la interfaz de red `eth0`, con cada entrada en una línea y solo mostrando direcciones IPv4.*

- *La salida de este comando se pasa a `awk`, que es una herramienta de manipulación de texto. En este caso, se usa para imprimir solo el cuarto campo de cada línea, que es la dirección IP con su máscara de subred. Por lo tanto, `$4` en `awk '{print $4}'` se refiere al cuarto campo de cada línea en la salida del comando `ip`, que contiene la dirección IP con su máscara de subred.*

---

**Instalación y Uso de `nmcli` en Docker**

- *Si estás trabajando en un contenedor Docker y necesitas administrar conexiones de red, `nmcli` podría ser una herramienta útil. Sin embargo, en el entorno de Docker, hay algunas consideraciones importantes que debes tener en cuenta.*

---

### ***Instalación de NetworkManager***

**Para instalar NetworkManager y `nmcli`, aquí tienes los comandos para diferentes distribuciones:**

- **Debian/Ubuntu:**

  ```bash
  sudo apt-get update
  sudo apt-get install network-manager
  ```

- **Red Hat/Fedora:**

  ```bash
  sudo yum install NetworkManager
  ```

- **Arch Linux:**

  ```bash
  sudo pacman -Syu networkmanager
  ```

### ***Verificación e Inicio de NetworkManager***

**Después de instalar NetworkManager, asegúrate de que el servicio esté activo y corriendo:**

```bash
sudo systemctl start NetworkManager
sudo systemctl enable NetworkManager
```

---

### ***Uso de `nmcli` para Obtener la Dirección IP***

**Una vez instalado, puedes usar `nmcli` para obtener la dirección IP de tu interfaz de red. Aquí están los comandos para obtener la dirección IP de la interfaz `eth0`:**

```bash
nmcli -g IP4.ADDRESS device show eth0
```

**Explicacion del comando `nmcli -g IP4.ADDRESS device show eth0` en sus partes constituyentes para una comprensión más detallada:**

- **`nmcli`:** *`nmcli` es el nombre del comando que estamos utilizando. Es la abreviatura de "NetworkManager Command Line Interface". Este comando se utiliza para interactuar con NetworkManager desde la línea de comandos.*

- **`-g IP4.ADDRESS`:** *La opción `-g` o `--get-values` se utiliza para especificar qué valores de atributos queremos obtener de la consulta. En este caso, estamos especificando que solo queremos obtener el valor del atributo `IP4.ADDRESS`, que representa la dirección IPv4 de la interfaz de red.*

- **`device show eth0`:** *Esta parte del comando especifica qué dispositivo o interfaz de red queremos mostrar. En este caso, estamos pidiendo información sobre el dispositivo `eth0`.*

**Entonces, en resumen:**

- **`nmcli`:** *El comando principal que estamos utilizando.*
- **`-g IP4.ADDRESS`:** *La opción que especifica qué valores de atributos queremos obtener, en este caso, la dirección IPv4.*
- **`device show eth0`:** *La especificación del dispositivo o interfaz de red del que queremos obtener información, en este caso, la interfaz `eth0`.*

- *Al ejecutar este comando, `nmcli` mostrará solo la dirección IPv4 de la interfaz `eth0`, lo que facilita la extracción de esta información para su uso en scripts u otros propósitos de automatización.*

```bash
nmcli -g IP4.ADDRESS device show wlp6s0
```

- **Extraer dirección IPv6**

```bash
nmcli -g IP6.ADDRESS device show wlp6s0 
fe80\:\:9419\:8468\:6306\:a88d/64
```

- *Se muestra en el formato estándar, seguido de la máscara de red (en este caso, /64), lo que indica el tamaño de la red.*

---

### ***Consideraciones de Docker***

- *Es importante recordar que Docker está diseñado para ser liviano y portable, y está optimizado para ejecutar aplicaciones en contenedores aislados. Si bien es posible instalar NetworkManager u otras herramientas similares dentro de un contenedor Docker, esto puede no ser la mejor práctica y puede introducir complejidad innecesaria en tu configuración.*

- *Antes de decidir instalar herramientas de gestión de red dentro de un contenedor Docker, considera si realmente necesitas estas herramientas y si hay alternativas más simples y adecuadas para tu caso de uso específico.*
