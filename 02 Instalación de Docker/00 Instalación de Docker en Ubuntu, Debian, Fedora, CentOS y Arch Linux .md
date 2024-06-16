<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->
# ***Instalación de Docker***

*Este documento proporciona instrucciones paso a paso para instalar Docker en diferentes distribuciones de Linux, incluyendo Ubuntu, Debian, Fedora y CentOS.*

## ***Contenidos***

1. *[Requisitos previos](#requisitos-previos)*
2. *[Instalación Rápida en Debian y Ubuntu](#instalación-rápida-en-debian-y-ubuntu)*
3. *[Instalación en Ubuntu](#instalación-en-ubuntu)*
4. *[Instalación en Debian](#instalación-en-debian)*
5. *[Instalación en Fedora](#instalación-en-fedora)*
6. *[Instalación en CentOS](#instalación-en-centos)*
7. *[Instalación de Docker en Arch Linux](#instalación-de-docker-en-arch-linux)*
8. *[Verificación de la instalación](#verificación-de-la-instalación)*

## ***Requisitos previos***

*Asegúrate de cumplir con los siguientes requisitos antes de proceder con la instalación:*

- *Un sistema operativo compatible (Ubuntu, Debian, Fedora o CentOS).*
- *Acceso a una cuenta de usuario con privilegios sudo.*
- *Conexión a Internet.*

### ***Instalación Rápida en Debian y Ubuntu***

*Esta seccion proporciona instrucciones para realizar una instalación rápida de Docker en sistemas Debian y Ubuntu.*

#### ***Paso 1: Desinstalación de versiones anteriores de Docker (opcional)***

**Si tienes versiones anteriores de Docker instaladas, puedes desinstalarlas con el siguiente comando:**

```bash
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

#### ***Paso 2: Agregar la clave GPG de Docker y el repositorio***

1. **Agregar la clave GPG de Docker:**

    ```bash
    sudo apt-get update
    sudo apt-get install ca-certificates curl
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc
    ```

2. **Agregar el repositorio de Docker a Apt sources:**

    ```bash
    echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update
    ```

    ```bash
    # Si da error en Ubuntu Linux
    echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update
    ```

#### ***Paso 3: Instalación de Docker***

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

#### ***Paso 4: Verificación de la instalación***

**Para verificar que Docker se haya instalado correctamente, puedes ejecutar el siguiente comando:**

```bash
sudo docker run hello-world
```

*Estos pasos te permitirán realizar una instalación rápida de Docker en sistemas Debian y Ubuntu. Una vez completada la instalación, podrás empezar a utilizar Docker para trabajar con contenedores.*

## ***Instalación en Ubuntu***

### ***Paso 1: Actualizar el índice de paquetes***

```bash
sudo apt-get update
```

### ***Paso 2: Instalar paquetes necesarios***

```bash
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
```

1. **apt-transport-https:**
   - **Descripción:** *Permite que el gestor de paquetes `apt` utilice el protocolo HTTPS para descargar paquetes desde repositorios.*
   - **Función:** *Esto es importante porque HTTPS cifra la comunicación entre el sistema y el servidor de repositorios, proporcionando una capa adicional de seguridad. Sin este paquete, `apt` solo puede utilizar HTTP, que no es seguro.*

2. **ca-certificates:**
   - **Descripción:** *Paquete que instala certificados de autoridades de certificación (CA) en el sistema.*
   - **Función:** *Estos certificados permiten que el sistema valide la autenticidad de los servidores HTTPS. Esencial para asegurarse de que las conexiones HTTPS se realizan con servidores confiables.*

3. **curl:**
   - **Descripción:** *Herramienta de línea de comandos para transferir datos con URL sintaxis.*
   - **Función:** *Se utiliza para descargar ficheros desde la web. En el contexto de la instalación de Docker, `curl` se usa para descargar la clave GPG del repositorio de Docker y otros ficheros necesarios.*

4. **software-properties-common:**
   - **Descripción:** *Paquete que proporciona scripts para manejar el software y las propiedades de los repositorios.*
   - **Función:** *Incluye el comando `add-apt-repository`, que facilita la adición de nuevos repositorios de software y sus claves GPG. Esto simplifica la administración de los repositorios de software en el sistema.*

### ***Resumen***

- **apt-transport-https:** *Permite que `apt` utilice HTTPS para mayor seguridad.*
- **ca-certificates:** *Proporciona certificados de autoridades de certificación para validar servidores HTTPS.*
- **curl:** *Herramienta para descargar ficheros desde la web.*
- **software-properties-common:** *Proporciona herramientas para agregar y gestionar repositorios de software.*

- *Estos paquetes son esenciales para configurar el sistema de manera segura y eficiente antes de proceder a agregar repositorios externos (como el de Docker) y descargar los paquetes desde ellos.*

### ***Paso 3: Agregar la clave GPG de Docker***

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

### ***Paso 4: Agregar el repositorio de Docker***

```bash
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```

### ***Paso 5: Actualizar el índice de paquetes nuevamente***

```bash
sudo apt-get update
```

### ***Paso 6: Instalar Docker***

```bash
sudo apt-get install docker-ce
```

## ***Instalación en Debian***

### ***Paso 1: Actualizar el índice de paquetes Debian***

```bash
sudo apt-get update
```

### ***Paso 2: Instalar paquetes necesarios Debian***

```bash
sudo apt-get install apt-transport-https ca-certificates curl gnupg2 software-properties-common
```

### ***Paso 3: Agregar la clave GPG de Docker Debian***

```bash
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
```

### ***Paso 4: Agregar el repositorio de Docker Debian***

```bash
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"
```

### ***Paso 5: Actualizar el índice de paquetes nuevamente Debian***

```bash
sudo apt-get update
```

### ***Paso 6: Instalar Docker Debian***

```bash
sudo apt-get install docker-ce
```

## ***Instalación en Fedora***

### ***Paso 1: Desinstalar versiones anteriores de Docker (si existen) Fedora***

```bash
sudo dnf remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-selinux docker-engine-selinux docker-engine
```

### ***Paso 2: Instalar paquetes necesarios Fedora***

```bash
sudo dnf -y install dnf-plugins-core
```

### ***Paso 3: Agregar el repositorio de Docker Fedora***

```bash
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
```

### ***Paso 4: Instalar Docker Fedora***

```bash
sudo dnf install docker-ce docker-ce-cli containerd.io
```

### ***Paso 5: Iniciar Docker Fedora***

```bash
sudo systemctl start docker
```

### ***Paso 6: Habilitar Docker para que se inicie al arrancar el sistema Fedora***

```bash
sudo systemctl enable docker
```

## ***Instalación en CentOS***

### ***Paso 1: Desinstalar versiones anteriores de Docker (si existen) CentOS***

```bash
sudo yum remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine
```

### ***Paso 2: Instalar paquetes necesarios CentOS***

```bash
sudo yum install -y yum-utils
```

### ***Paso 3: Agregar el repositorio de Docker CentOS***

```bash
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

### ***Paso 4: Instalar Docker CentOS***

```bash
sudo yum install docker-ce docker-ce-cli containerd.io
```

### ***Paso 5: Iniciar Docker CentOS***

```bash
sudo systemctl start docker
```

## ***Instalación de Docker en Arch Linux***

```bash
sudo pacman -Syu docker docker-compose
```

```bash
sudo systemctl start docker
```

> [!IMPORTANT]
> *Docker Compose es una herramienta que permite definir y ejecutar aplicaciones Docker de múltiples contenedores de una manera más sencilla y estructurada. Con Compose, puedes definir la configuración de tus servicios en un fichero YAML y luego utilizar un solo comando para crear y comenzar todos los contenedores definidos en esa configuración.*

### ***Características principales***

1. **Definición de servicios con YAML:** *En un fichero `docker-compose.yml`, puedes definir todos los servicios, volúmenes, redes y configuraciones de tu aplicación en un formato fácil de entender y de escribir.*

2. **Ejecución fácil de múltiples contenedores:** *Con un solo comando (`docker-compose up`), Docker Compose creará y ejecutará todos los contenedores definidos en tu fichero YAML, asegurándose de que estén correctamente conectados y configurados según tus especificaciones.*

3. **Gestión de dependencias entre contenedores:** *Docker Compose permite definir dependencias entre los servicios, lo que garantiza que los contenedores se inicien en el orden adecuado y se comuniquen entre sí según sea necesario.*

4. **Gestión de volúmenes y redes:** *Puedes definir volúmenes y redes personalizadas para tus servicios en el fichero `docker-compose.yml`, lo que simplifica la gestión y el acceso a los datos compartidos entre contenedores.*

5. **Escalabilidad:** *Compose facilita la escalabilidad de tus servicios, permitiéndote especificar el número de réplicas para cada servicio y configurar opciones de balanceo de carga.*

### *Ejemplo de fichero `docker-compose.yml` básico*

```yaml
version: '3.8'
services:
  web:
    image: nginx:latest
    ports:
      - "8080:80"
  db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: example
```

*En este ejemplo, definimos dos servicios: `web` y `db`. El servicio `web` utiliza la imagen de Nginx y expone el puerto 80 del contenedor al puerto 8080 del host. El servicio `db` utiliza la imagen de MySQL 5.7 y establece una variable de entorno para la contraseña de root.*

### ***Uso básico de Docker Compose***

- **`docker-compose up`:** *Crea y arranca los servicios definidos en el fichero `docker-compose.yml`.*
- **`docker-compose down`:** *Detiene y elimina los contenedores, redes y volúmenes definidos en el fichero `docker-compose.yml`.*
- **`docker-compose ps`:** *Muestra el estado de los servicios definidos en el fichero `docker-compose.yml`.*
- **`docker-compose exec`:** *Ejecuta comandos en un servicio en ejecución.*

- *Docker Compose simplifica significativamente el proceso de gestión de aplicaciones Docker con múltiples contenedores, lo que lo hace ideal para el desarrollo y la implementación de aplicaciones modernas basadas en microservicios.*

- *Los Unix sockets, también conocidos como sockets de dominio de Unix, son un mecanismo de comunicación entre procesos en sistemas operativos Unix o Unix-like, como Linux y macOS. Funcionan de manera similar a los sockets de red, pero en lugar de utilizar direcciones IP y puertos, utilizan rutas de fichero en el sistema de ficheros del sistema operativo.*

**Aquí hay algunos puntos clave sobre los Unix sockets:**

1. **Comunicación local:** *Los Unix sockets se utilizan para la comunicación entre procesos que se ejecutan en la misma máquina. Proporcionan una forma eficiente y rápida para que los procesos intercambien datos sin necesidad de pasar por la red física.*

2. **fichero de socket:** *Un Unix socket se representa como un fichero en el sistema de ficheros. Este fichero actúa como un punto final para la comunicación entre procesos. Los procesos pueden conectarse a este fichero para enviar y recibir datos.*

3. **Permisos de fichero:** *Al igual que cualquier otro fichero en el sistema de ficheros, un Unix socket tiene permisos de fichero asociados. Esto significa que puedes controlar quién puede acceder al socket y qué tipo de operaciones pueden realizar.*

4. **Protocolo de comunicación:** *Los Unix sockets pueden utilizar diferentes protocolos de comunicación, como SOCK_STREAM para comunicación bidireccional y orientada a la conexión (similar a TCP) o SOCK_DGRAM para comunicación sin conexión y orientada a datagramas (similar a UDP).*

5. **Uso común:** *Los Unix sockets son utilizados por una variedad de aplicaciones y servicios en sistemas Unix. Por ejemplo, en Linux, el demonio de Docker utiliza Unix sockets para aceptar comandos y solicitudes de clientes Docker locales.*

*En resumen, los Unix sockets son un mecanismo de comunicación local eficiente y seguro que permite a los procesos intercambiar datos en sistemas Unix sin necesidad de utilizar la red física.*

### ***Paso 6: Habilitar Docker para que se inicie al arrancar el sistema CentOS***

```bash
sudo systemctl enable docker
```

## ***Verificación de la instalación***

### ***Paso 1: Verificar la versión de Docker instalada***

```bash
docker --version
```

### ***Paso 2: Ejecutar el contenedor de prueba "hello-world"***

```bash
sudo docker run hello-world
```

*Si todo está configurado correctamente, deberías ver un mensaje indicando que la instalación de Docker fue exitosa.*

---

> [!NOTE]
> *Este fichero cubre los pasos básicos para instalar Docker en las distribuciones de Linux mencionadas. Si necesitas más detalles o tienes problemas durante la instalación, consulta la [documentación oficial de Docker](https://docs.docker.com/get-docker/ "https://docs.docker.com/get-docker/").*
