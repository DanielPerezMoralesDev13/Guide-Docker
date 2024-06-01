# Dockerización manual de un programa

para dockerizar un programa debe saber muy bien el entorno de trabajo (tecnologias) como instalarlo, configurarlas y programarlas para que funciones, osea todo lo que usas para el desarrolo

[Guía NodeJs](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs")

[Visual Studio Code](https://code.visualstudio.com/ "https://code.visualstudio.com/")

[NodeJs v20.14.01](https://nodejs.org/en "https://nodejs.org/en")

[Node Installation instructions](https://github.com/nodesource/distributions "https://github.com/nodesource/distributions")

posible error al instalarlo

```bash
sudo apt-get install -y nodejs
dpkg-deb: error: el subproceso copiado fue terminado por la señal (Broken pipe)
Se encontraron errores al procesar:
 /var/cache/apt/archives/nodejs_22.2.0-1nodesource1_amd64.deb
E: Sub-process /usr/bin/dpkg returned an error code (1)
```

El error que estás viendo indica que hubo un problema al instalar el paquete `nodejs` debido a un error con el subproceso de `dpkg-deb`, específicamente un "Broken pipe". Esto usualmente significa que hubo un problema al descomprimir o copiar los archivos del paquete.

Aquí hay algunos pasos que puedes seguir para intentar resolver este problema:

1. **Actualizar la lista de paquetes y limpiar la caché:**

   ```bash
   sudo apt-get update
   sudo apt-get clean
   sudo apt-get autoremove
   ```

2. **Eliminar el archivo de paquete problemático:**

   El mensaje de error menciona un archivo específico (`/var/cache/apt/archives/nodejs_22.2.0-1nodesource1_amd64.deb`). Puedes intentar eliminar este archivo manualmente:

   ```bash
   sudo rm /var/cache/apt/archives/nodejs_22.2.0-1nodesource1_amd64.deb
   ```

3. **Reinstalar el paquete:**

   Intenta instalar el paquete nuevamente después de haber limpiado y eliminado el archivo problemático:

   ```bash
   sudo apt-get install -y nodejs
   ```

4. **Forzar la reconfiguración de `dpkg`:**

   Si el problema persiste, podrías intentar forzar una reconfiguración de `dpkg`:

   ```bash
   sudo dpkg --configure -a
   ```

5. **Instalar `nodejs` desde un repositorio diferente:**

   Si sigue habiendo problemas, considera instalar `nodejs` desde un repositorio diferente. Por ejemplo, puedes usar el script de NodeSource para instalar la última versión de Node.js:

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

Si después de estos pasos sigues teniendo problemas, por favor proporciona más detalles sobre el error que estás viendo y cualquier salida adicional del terminal. Esto ayudará a diagnosticar el problema con mayor precisión.

poner en marcha el programa en el host

```bash
➜  d4nitrix13 00 App Node Javascript git:(master U:5 ?:2 ✗) node index.js 
Server running at http://127.0.0.1:3000/
```

```bash
curl localhost:3000
Hello World
```

```txt
127.0.0.1:3000
localhost:3000
```
