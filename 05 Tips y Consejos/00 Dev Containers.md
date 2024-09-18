<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->

# ***Dev Containers***

- **El uso de Docker en el desarrollo, especialmente con tecnologías y extensiones que ofrecen autocompletado para lenguajes, es muy útil. Aunque Docker fue desarrollado inicialmente para la producción, se puede aprovechar su potencia para crear entornos de desarrollo consistentes y aislados. Una de las mejores formas de hacerlo es a través de **Dev Containers**, que permite a los desarrolladores trabajar dentro de contenedores sin perder funcionalidades como el autocompletado, la depuración y otras ventajas que ofrece Visual Studio Code.**

---

## ***Extensión recomendada de VS Code para Dev Containers***

- **Nombre:** *Dev Containers*
- **ID:** *ms-vscode-remote.remote-containers*
- **Descripción:** *Abre cualquier carpeta o repositorio dentro de un contenedor Docker y aprovecha todas las características de Visual Studio Code.*
- **Versión:** *`0.384.0`*
- **Editor:** *Microsoft*
- **Vínculo de VS Marketplace:** *[Dev Containers en VS Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers "https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers")*

---

### ***Uso de Dev Containers con Python***

- **A continuación, te mostramos cómo configurar un contenedor de desarrollo con Python (versión 3.10-bullseye):**

```json
{
  "key": "",
  "command": "remote-containers.openFolder"
}
```

1. **Selecciona la carpeta** *donde se encuentra tu proyecto o repositorio.*
2. **Configura el fichero `.devcontainer`** *dentro del directorio del contenedor.*
3. **Selecciona una imagen Docker.** *En este caso, utilizamos una imagen basada en Python.*
4. **Elige la versión** *de Python que prefieras, por ejemplo, `3.10-bullseye`.*
5. **Instala extensiones o paquetes adicionales** *de forma opcional para personalizar tu entorno.*
6. **Agrega un repositorio GitHub,** *si es necesario, para facilitar el flujo de trabajo en equipo.*

---

### ***Ejemplo de fichero `devcontainer.json`***

```bash
// Para detalles sobre el formato, consulta https://aka.ms/devcontainer.json. 
// Para opciones de configuración, revisa el README en: https://github.com/devcontainers/templates/tree/main/src/python
{
  "name": "Python 3",
  // O utiliza un Dockerfile o fichero Docker Compose. Más información: https://containers.dev/guide/dockerfile
  "image": "mcr.microsoft.com/devcontainers/python:1-3.10-bullseye",

  // Funcionalidades adicionales para el contenedor de desarrollo. Más información: https://containers.dev/features.
  // "features": {},

  // Usa 'forwardPorts' para hacer que los puertos dentro del contenedor estén disponibles localmente.
  // "forwardPorts": [],

  // Usa 'postCreateCommand' para ejecutar comandos después de crear el contenedor.
  // "postCreateCommand": "pip3 install --user -r requirements.txt",

  // Configura propiedades específicas para herramientas.
  // "customizations": {},

  // Descomenta para conectarte como root. Más información: https://aka.ms/dev-containers-non-root.
  // "remoteUser": "root"
}
```

---

### ***Administración de usuarios en el contenedor***

- **Al crear el contenedor, la extensión genera un usuario con el ID `1000` (puedes verificarlo con los comandos `id -u` o `id --user`). Además, este usuario tiene permisos de **sudo**, lo que permite realizar tareas administrativas, como eliminar un entorno virtual:**

```bash
sudo rm -rf ./.venv
```

---

### ***Configuración del intérprete de Python***

- **Puedes establecer la ubicación del intérprete de Python en tu contenedor mediante el siguiente comando:**

```json
{
  "key": "",
  "command": "python.setInterpreter"
}
```

- **Luego de configurar el intérprete, reiniciar VS Code es opcional, pero puede ser útil para que los cambios surtan efecto.**

---

### ***Reiniciar el servidor de análisis de Python***

- **Para reiniciar el servidor de análisis del lenguaje Python, puedes usar el siguiente comando:**

```json
{
  "key": "",
  "command": "python.analysis.restartLanguageServer"
}
```

---

### ***Depuración***

- *Para temas de depuración, selecciona el botón de **depuración** en Visual Studio Code y elige el intérprete de Python o una extensión recomendada. Luego, selecciona el framework que estás usando para que VS Code lo reconozca y asegúrate de especificar la ruta completa del fichero principal.*

---

### ***Verificación de la imagen Docker creada***

**Si necesitas verificar la imagen creada, puedes usar el siguiente comando:**

```bash
docker images --all --filter dangling=false
```

**Ejemplo de salida:**

```bash
REPOSITORY                                                                                        TAG       IMAGE ID       CREATED          SIZE
vsc-03apppythonflaskpipenv-8b891f8e513b263b57a45c758c78465b7a1eb578bc3d882d4a65cbcb6dd0003d-uid   latest    010381ed069b   28 minutes ago   1.4GB
```

- *Este comando muestra las imágenes de Docker, incluida la imagen del contenedor de desarrollo que acabas de crear.*
