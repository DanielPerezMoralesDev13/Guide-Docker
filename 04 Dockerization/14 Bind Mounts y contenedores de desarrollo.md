<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->

# ***Bind Mounts y Contenedores de Desarrollo***

**Vamos a explorar cómo usar bind mounts para montar una directorio del host en un contenedor Docker. Primero, creamos un directorio para nuestro proyecto de Python Flask y verificamos su ubicación:**

```bash
mkdir "02 App Python Flask"
cd "02 App Python Flask"
pwd
../04 Dockerization/02 App Python Flask
```

**Al listar el contenido del directorio, vemos lo siguiente:**

```bash
ls -la
drwxrwxr-x d4nitrix13 d4nitrix13 4.0 KB Fri Jun 28 14:39:28 2024 .
drwxrwxr-x d4nitrix13 d4nitrix13 4.0 KB Fri Jun 28 14:39:28 2024 ..
```

---

## ***Ejecutando un Contenedor con Bind Mounts***

**Para montar este directorio en un contenedor Ubuntu y trabajar en él:**

```bash
docker run -itw /App --name python-practicas --mount type=bind,source="$(pwd)",target=/App ubuntu:22.04
```

```bash
docker run -itw /App --name python-practicas --mount type=bind,source="$(pwd)",target=/App ubuntu:22.04
Unable to find image 'ubuntu:22.04' locally
22.04: Pulling from library/ubuntu
857cc8cb19c0: Pull complete 
Digest: sha256:adbb90115a21969d2fe6fa7f9af4253e16d45f8d4c1e930182610c4731962658
Status: Downloaded newer image for ubuntu:22.04
root@08b7c877e9f3:/App# 
```

**En este comando:**

- *`--name python-practicas` asigna un nombre al contenedor.*
- *`--mount type=bind,source="$(pwd)",target=/App` configura un bind mount donde `source` es el directorio actual (`$(pwd)`) del host y `target` es `/App` en el contenedor.*

---

### ***Explicación Detallada de `--mount type=bind`***

- *En Docker, `--mount` se utiliza para montar volúmenes en un contenedor. Cuando usamos `type=bind`, indicamos que queremos realizar un bind mount, que permite montar un directorio o fichero desde el host dentro del contenedor.*

#### ***Componentes de `--mount type=bind`***

- **`type=bind`:** *Especifica el tipo de montaje que estamos realizando, en este caso, un bind mount.*

- **`source="$(pwd)`":** *Especifica la ruta completa del directorio en el host que deseamos montar dentro del contenedor. En este ejemplo, `$(pwd)` se usa para obtener la ruta actual del directorio desde donde se ejecuta el comando `docker run`. Esto garantiza que siempre montamos el directorio actual del host, independientemente de dónde se encuentre el script o terminal desde donde se ejecuta Docker.*

- **`target=/App`:** *Especifica la ruta dentro del contenedor donde se montará el directorio del host. En este caso, el directorio `/App` dentro del contenedor se utilizará para almacenar y trabajar con los ficheros que compartimos desde el host.*

---

### ***Ejemplo Completo y Funcionamiento***

**Veamos nuevamente el comando completo y cómo funciona:**

```bash
docker run -itw /App --name python-practicas --mount type=bind,source="$(pwd)",target=/App ubuntu:22.04
```

- **`-itw /App`:** *Estas opciones tienen los siguientes significados:*
  - **`-i`:** *Mantiene abierta la sesión interactiva con el contenedor.*
  - **`-t`:** *Asigna un pseudo-TTY (terminal) para la interacción.*
  - **`-w /App`:** *Establece el directorio de trabajo dentro del contenedor como `/App`. Esto significa que cualquier comando que se ejecute dentro del contenedor comenzará en el directorio `/App`.*

- **`--name python-practicas`:** *Asigna un nombre (`python-practicas`) al contenedor para facilitar su identificación y gestión posterior.*

- **`--mount type=bind,source="$(pwd)",target=/App`:** *Define el bind mount:*
  - **`type=bind`:** *Especifica que estamos utilizando un bind mount.*
  - **`source="$(pwd)"`:** *La ruta completa del directorio actual del host.*
  - **`target=/App`:** *La ruta dentro del contenedor donde se montará el directorio del host.*

---

### ***Uso y Ventajas***

- *Este enfoque es útil en entornos de desarrollo donde deseamos trabajar con ficheros locales en el host pero también dentro del contenedor Docker. Facilita el desarrollo al permitir que los cambios realizados en ficheros locales se reflejen inmediatamente dentro del contenedor sin necesidad de reconstruir la imagen Docker.*

---

### ***Dentro del Contenedor***

**Dentro del contenedor, verificamos el contenido de `/App`:**

```bash
root@76cb80da7238:/App# ls -la    
total 8
drwxrwxr-x 2 1000 1000 4096 Jun 28 20:39 .
drwxr-xr-x 1 root root 4096 Jun 28 20:49 ..
```

---

### ***Creando un Fichero Dentro del Contenedor***

**Creamos un fichero `fichero.txt` dentro del contenedor:**

```bash
root@76cb80da7238:/App# touch fichero.txt
root@76cb80da7238:/App# ls -la
total 8
drwxrwxr-x 2 1000 1000 4096 Jun 28 20:51 .
drwxr-xr-x 1 root root 4096 Jun 28 20:49 ..
-rw-r--r-- 1 root root    0 Jun 28 20:51 fichero.txt
```

---

### ***Verificando en el Host***

**De vuelta en el host, verificamos que el fichero `fichero.txt` se ha creado:**

```bash
lsd -la
drwxrwxr-x d4nitrix13 d4nitrix13 4.0 KB Fri Jun 28 14:51:04 2024  .
drwxrwxr-x d4nitrix13 d4nitrix13 4.0 KB Fri Jun 28 14:39:28 2024  ..
.rw-r--r-- root       root         0 B  Fri Jun 28 14:51:04 2024  fichero.txt
```

- *Este ejemplo muestra cómo usar bind mounts para desarrollar aplicaciones dentro de contenedores Docker mientras mantenemos sincronizados los cambios con el host. Es útil para entornos de desarrollo donde se requiere flexibilidad y compartición de ficheros entre el host y el contenedor.*

---

### ***Funcionamiento Bidireccional del Bind Mount***

---

#### ***Creación de un Fichero en el Host***

**Primero, creamos un fichero `fichero2.txt` en el host:**

```bash
touch fichero2.txt
```

**Esto crea un fichero `fichero2.txt` en el directorio actual del host.**

---

#### ***Verificación en el Host y en el Contenedor***

**En el Host:**

```bash
lsd -la
drwxrwxr-x d4nitrix13 d4nitrix13 4.0 KB Fri Jun 28 14:53:17 2024  .
drwxrwxr-x d4nitrix13 d4nitrix13 4.0 KB Fri Jun 28 14:39:28 2024  ..
.rw-r--r-- root       root         0 B  Fri Jun 28 14:51:04 2024  fichero.txt
.rw-rw-r-- d4nitrix13 d4nitrix13   0 B  Fri Jun 28 14:53:17 2024  fichero2.txt
```

**En el Contenedor:**

```bash
ls -la
total 8
drwxrwxr-x 2 1000 1000 4096 Jun 28 20:53 .
drwxr-xr-x 1 root root 4096 Jun 28 20:49 ..
-rw-r--r-- 1 root root    0 Jun 28 20:51 fichero.txt
-rw-rw-r-- 1 1000 1000    0 Jun 28 20:53 fichero2.txt
```

**Aquí vemos que el fichero `fichero2.txt` creado en el host también está presente en el contenedor, debido al bind mount.**

---

#### ***Escritura en los Ficheros desde el Host y el Contenedor***

- **Desde el Contenedor:**

- **Podemos ver y modificar el contenido del fichero `fichero2.txt` desde el contenedor:**

- *Agregamos el siguiente texto al `fichero2.txt`*

```txt
Name: Daniel Benjamin Perez Morales
```

```bash
cat fichero2.txt
Name: Daniel Benjamin Perez Morales
```

**Desde el Host:**

**Podemos editar el fichero `fichero.txt` desde el host, pero no podemos debido a los permisos del usuario root en el contenedor:**

```txt
Error al guardar 'fichero.txt': Permisos insuficientes. Seleccione 'Reintentar como Sudo' para reintentarlo como superusuario.
```

---

#### ***Conclusión***

- *El bind mount permite compartir ficheros y directorios entre el host y el contenedor de Docker. Esto facilita el desarrollo y la colaboración, ya que los cambios realizados en el host se reflejan instantáneamente dentro del contenedor y viceversa, siempre y cuando los permisos lo permitan según el usuario que ejecuta las operaciones en cada extremo.*

---

### ***Gestión de Usuarios y Permisos en Contenedores Docker con Bind Mounts***

---

#### ***Observación de Propietarios de Ficheros***

**Al listar los ficheros en el directorio `/App` del contenedor, observamos lo siguiente:**

```bash
root@76cb80da7238:/App# ls -la
total 8
drwxrwxr-x 2 1000 1000 4096 Jun 28 20:53 .
drwxr-xr-x 1 root root 4096 Jun 28 20:49 ..
-rw-r--r-- 1 root root    0 Jun 28 20:51 fichero.txt
-rw-rw-r-- 1 1000 1000    0 Jun 28 20:53 fichero2.txt
```

**Aquí, `fichero2.txt` tiene como propietario a un usuario con ID 1000, que no existe dentro del contenedor, pero corresponde al usuario `d4nitrix13` fuera del contenedor, como se muestra al verificar el ID del usuario en el host:**

- *En sistemas basados en Linux, al crear el primer usuario, comúnmente se le asigna el ID 1000 por defecto.*

- *Este es un estándar que facilita la gestión de usuarios y permisos en el sistema operativo.*

```bash
cat /etc/passwd | grep -iE $USER
d4nitrix13:x:1000:1000:d4nitrix13:/home/d4nitrix13:/bin/bash
```

---

#### ***Creación de un Usuario Dentro del Contenedor***

**Para resolver problemas de permisos, podemos crear un usuario dentro del contenedor con el mismo nombre y ID que el usuario fuera del contenedor:**

```bash
root@76cb80da7238:/App# useradd -m -s "/bin/bash" d4nitrix13
root@76cb80da7238:/App# su d4nitrix13
d4nitrix13@76cb80da7238:/App$ touch fichero3.txt
d4nitrix13@76cb80da7238:/App$ ls -la
total 12
drwxrwxr-x 2 d4nitrix13 d4nitrix13 4096 Jun 28 21:12 .
drwxr-xr-x 1 root       root       4096 Jun 28 20:49 ..
-rw-r--r-- 1 root       root          0 Jun 28 20:51 fichero.txt
-rw-rw-r-- 1 d4nitrix13 d4nitrix13   35 Jun 28 21:10 fichero2.txt
-rw-rw-r-- 1 d4nitrix13 d4nitrix13    0 Jun 28 21:12 fichero3.txt
```

- *Ahora, el usuario `d4nitrix13` dentro del contenedor tiene los permisos correctos sobre los ficheros `fichero2.txt` y `fichero3.txt`, lo que permite la escritura desde el host.*

---

#### ***Verificación de la Escritura desde el Host***

**Desde el host, escribimos algo en `fichero3.txt`:**

```txt
Musica
```

**Y al verificar dentro del contenedor:**

```bash
d4nitrix13@76cb80da7238:/App$ cat fichero3.txt
Musica
```

- *Podemos ver que el contenido escrito desde el host en `fichero3.txt` es accesible y legible desde el contenedor, gracias a los permisos adecuados del usuario `d4nitrix13`.*

---

### ***Conclusiones***

- *Al crear usuarios con identificadores consistentes tanto dentro como fuera del contenedor, podemos gestionar de manera efectiva los permisos de ficheros compartidos a través de bind mounts en Docker. Esto facilita el desarrollo y la colaboración al permitir que los cambios en ficheros se propaguen correctamente entre el host y el contenedor, sin conflictos de permisos.*

---

### ***Gestión de Permisos y Persistencia en Bind Mounts en Docker***

---

#### ***Asegurar Propiedad Recursiva con `chown`***

**Para garantizar que todos los ficheros y directorios dentro del punto de montaje pertenezcan al usuario `d4nitrix13` dentro del contenedor, ejecutamos el comando `chown -R d4nitrix13:d4nitrix13 ./` desde el usuario `root`:**

```bash
chown -R d4nitrix13:d4nitrix13 ./
root@76cb80da7238:/App# ls -la
total 16
drwxrwxr-x 2 d4nitrix13 d4nitrix13 4096 Jun 28 21:12 .
drwxr-xr-x 1 root       root       4096 Jun 28 20:49 ..
-rw-r--r-- 1 d4nitrix13 d4nitrix13    0 Jun 28 20:51 fichero.txt
-rw-rw-r-- 1 d4nitrix13 d4nitrix13   35 Jun 28 21:10 fichero2.txt
-rw-rw-r-- 1 d4nitrix13 d4nitrix13    6 Jun 28 21:14 fichero3.txt
```

- *Ahora, todos los ficheros en `/App` son propiedad del usuario `d4nitrix13`, lo que garantiza que podamos escribir en ellos desde el host sin problemas de permisos.*

---

#### ***Persistencia de Cambios en Bind Mounts***

**Al detener y volver a iniciar el contenedor, los cambios realizados en los ficheros dentro del punto de montaje persisten:**

```bash
docker stop -t3 python-practicas
docker start -i python-practicas 
root@76cb80da7238:/App# ls -la
total 20
drwxrwxr-x 2 d4nitrix13 d4nitrix13 4096 Jun 28 21:23 .
drwxr-xr-x 1 root       root       4096 Jun 28 20:49 ..
-rw-r--r-- 1 d4nitrix13 d4nitrix13   57 Jun 28 21:19 fichero.txt
-rw-rw-r-- 1 d4nitrix13 d4nitrix13   35 Jun 28 21:10 fichero2.txt
-rw-rw-r-- 1 d4nitrix13 d4nitrix13    6 Jun 28 21:14 fichero3.txt
-rw-r--r-- 1 root       root          0 Jun 28 21:23 fichero4.txt
```

- *Vemos que `fichero4.txt` se mantiene en el punto de montaje pero es propiedad de `root`, reflejando los cambios realizados dentro del contenedor.*

---

#### ***Verificación en el Host***

**En el host, los ficheros dentro del directorio de montaje también reflejan los cambios y las propiedades correctas:**

```bash
lsd -la
drwxrwxr-x d4nitrix13 d4nitrix13 4.0 KB Fri Jun 28 15:23:51 2024  .
drwxrwxr-x d4nitrix13 d4nitrix13 4.0 KB Fri Jun 28 14:39:28 2024  ..
.rw-r--r-- d4nitrix13 d4nitrix13  57 B  Fri Jun 28 15:19:51 2024  fichero.txt
.rw-rw-r-- d4nitrix13 d4nitrix13  35 B  Fri Jun 28 15:10:09 2024  fichero2.txt
.rw-rw-r-- d4nitrix13 d4nitrix13   6 B  Fri Jun 28 15:14:54 2024  fichero3.txt
.rw-r--r-- root       root         0 B  Fri Jun 28 15:23:51 2024  fichero4.txt
```

**Todos los ficheros tienen las propiedades correctas según los cambios realizados en el contenedor.**

---

#### ***Limpieza***

**Finalmente, limpiamos todos los ficheros dentro del contenedor:**

```bash
root@76cb80da7238:/App# rm *.txt
root@76cb80da7238:/App# ls -la
total 8
drwxrwxr-x 2 d4nitrix13 d4nitrix13 4096 Jun 28 21:24 .
drwxr-xr-x 1 root       root       4096 Jun 28 20:49 ..
```

---

### ***Conclusión:***

- *El uso de `chown -R` nos permite asegurar que todos los ficheros y directorios dentro del punto de montaje en el contenedor Docker sean accesibles y modificables por el usuario adecuado, facilitando así el desarrollo y la gestión de ficheros compartidos entre el host y el contenedor.*

- *Montar una directorio del host al contenedor es similar a montar una directorio de red en tu NAS en casa. Es como conectar un disco duro externo a tu computadora, donde el contenido del disco se refleja en un directorio de tu sistema. En el contexto de un contenedor, no es un disco o un NAS, sino una directorio del host que se monta en una directorio específica del contenedor.*

> [!WARNING]
> **Este proceso se conoce como utilizar volúmenes. Es importante tener en cuenta que si un hacker compromete el contenedor y accede a un volumen, que es una directorio montada del host al contenedor, podría potencialmente obtener acceso al host desde el contenedor.**

- *![Image de explicacion de montaje de directorio del host al contenedor](../images/Image%20de%20explicacion%20de%20montaje%20de%20directorio%20del%20host%20al%20contenedor.png "../images/Image de explicacion de montaje de directorio del host al contenedor.png")*
- *![Image de explicacion de montaje de directorio del host al contenedor segundo ejemplo](../images/Image%20de%20explicacion%20de%20montaje%20de%20directorio%20del%20host%20al%20contenedor%20segundo%20ejemplo.png "../images/Image de explicacion de montaje de directorio del host al contenedor segundo ejemplo.png")*
