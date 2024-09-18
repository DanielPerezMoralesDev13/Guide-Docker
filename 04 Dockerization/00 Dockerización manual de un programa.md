<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->
# ***Dockerización Manual de un Programa***

- *Para dockerizar un programa, es fundamental conocer bien el entorno de trabajo (tecnologías), saber cómo instalarlo, configurarlo y programarlo para que funcione. Es decir, debes comprender todos los componentes que utilizas para el desarrollo.*

---

## ***Recursos***

- *[Guía NodeJs](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs "Introducción a NodeJs")*
- *[Visual Studio Code](https://code.visualstudio.com/ "Descargar Visual Studio Code")*
- *[NodeJs v20.14.01](https://nodejs.org/en "Descargar NodeJs")*
- *[Node Installation Instructions](https://github.com/nodesource/distributions "Instrucciones para la instalación de Node")*

---

## ***Instalacion***

```bash
sudo apt-get install -y curl
curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh
sudo -E bash nodesource_setup.sh
sudo apt-get install -y nodejs
node -v && npm -v
```

---

## ***Posible Error al Instalar NodeJs***

**Al instalar NodeJs, podrías encontrarte con el siguiente error:**

```bash
sudo apt-get install -y nodejs
dpkg-deb: error: el subproceso copiado fue terminado por la señal (Broken pipe)
Se encontraron errores al procesar:
 /var/cache/apt/archives/nodejs_22.2.0-1nodesource1_amd64.deb
E: Sub-process /usr/bin/dpkg returned an error code (1)
```

- *El error indica un problema al instalar el paquete `nodejs` debido a un error con el subproceso de `dpkg-deb`, específicamente un "Broken pipe". Esto usualmente significa que hubo un problema al descomprimir o copiar los ficheros del paquete.*

---

### ***Solución***

**Aquí hay algunos pasos que puedes seguir para intentar resolver este problema:**

1. **Actualizar la lista de paquetes y limpiar la caché:**

   ```bash
   sudo apt-get update
   sudo apt-get clean
   sudo apt-get autoremove
   ```

2. **Eliminar el fichero de paquete problemático:**

   ```bash
   sudo rm /var/cache/apt/archives/nodejs_22.2.0-1nodesource1_amd64.deb
   ```

3. **Reinstalar el paquete:**

   ```bash
   sudo apt-get install -y nodejs
   ```

4. **Forzar la reconfiguración de `dpkg`:**

   ```bash
   sudo dpkg --configure -a
   ```

5. **Instalar `nodejs` desde un repositorio diferente:**

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

## ***Poner en Marcha el Programa en el Host***

**Ejecuta tu aplicación Node.js en el host:**

```bash
node index.js 
Server running at http://127.0.0.1:3000/
```

**Para verificar que está funcionando, usa `curl`:**

```bash
curl localhost:3000
Hello World
```

**O escribe esto en tu navegador:**

```txt
127.0.0.1:3000
localhost:3000
```

---

## ***Dockerización del Programa***

- *El directorio de trabajo en el contenedor será `-w`,`--workdir` `/App` aunque comunmente es `/code`. Los puntos después de `ubuntu` indican la versión.*

```bash
docker run -it --workdir /code --name App-00-Nodejs ubuntu:22.04
docker run -itw /App --name App-00-Nodejs ubuntu:22.04
```

---

### ***Salida Esperada***

```bash
docker run -itw /App --name App-00-Nodejs ubuntu:22.04
Unable to find image 'ubuntu:22.04' locally
22.04: Pulling from library/ubuntu
a8b1c5f80c2d: Pull complete 
Digest: sha256:a6d2b38300ce017add71440577d5b0a90460d0e57fd7aec21dd0d1b0761bbfb2
Status: Downloaded newer image for ubuntu:22.04

root@a2e5334b6474:/App# pwd
/App

root@a2e5334b6474:/App# cd ..
root@a2e5334b6474:/# ls -a
.   .dockerenv  bin   dev  home  lib32  libx32  mnt  proc  run   srv  tmp  var
..  App         boot  etc  lib   lib64  media   opt  root  sbin  sys  usr
```

---

### ***Copiar el Fichero***

**Copia tu fichero `index.js` al contenedor:**

```bash
docker cp ./index.js App-00-Nodejs:/App
```

---

### ***Instalar Dependencias***

**Instala las dependencias necesarias para ejecutar Node.js dentro del contenedor:**

```bash
root@a2e5334b6474:/App# apt-get update && apt-get -y upgrade && apt-get clean && apt-get autoremove && apt-get install -y curl
```

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh
```

```bash
bash nodesource_setup.sh
```

```bash
apt-get install -y nodejs
```

```bash
node -v && npm -v
```

**Ponemos en marcha el programa en el contenedor:**

```bash
root@a2e5334b6474:/App# node index.js 
Server running at http://127.0.0.1:3000/
```
