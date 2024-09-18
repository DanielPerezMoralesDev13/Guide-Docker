# ***Preparación previa a escribir un Dockerfile en un entorno nuevo***

---

## ***1. Iniciar un Contenedor Existente***

**Para iniciar un contenedor previamente creado pero detenido, utilizamos el siguiente comando:**

```bash
docker container start --interactive python-practicas
```

**Explicación Detallada:**

- **`docker container start`:** *Este comando se utiliza para iniciar un contenedor que ya ha sido creado previamente. Un contenedor en Docker es una instancia en ejecución de una imagen de Docker, que encapsula una aplicación y todas sus dependencias en un solo entorno aislado.*
  
- **`--interactive` (`-i`):** *La opción `--interactive` permite que el contenedor continúe ejecutándose en modo interactivo, manteniendo la conexión con la entrada estándar (stdin) abierta. Esto es útil cuando queremos ejecutar comandos dentro del contenedor o mantener una sesión activa de terminal.*

- **`python-practicas`:** *Este es el nombre del contenedor que se va a iniciar. En tu caso, has asignado el nombre `python-practicas` cuando creaste el contenedor.*

- *Este comando es particularmente útil cuando quieres volver a trabajar en un contenedor ya existente, sin necesidad de crear uno nuevo.*

---

### ***2. Instalación de Flask***

- **Una vez que el contenedor esté en ejecución, podemos proceder a instalar Flask, un microframework web para Python. La documentación oficial de Flask se encuentra en:**

- *[Página oficial de Flask](https://flask.palletsprojects.com/en/3.0.x/ "https://flask.palletsprojects.com/en/3.0.x/")*
- *[Sección de instalación](https://flask.palletsprojects.com/en/3.0.x/installation/ "https://flask.palletsprojects.com/en/3.0.x/installation/")*

---

### ***3. Entornos Virtuales en Python***

---

#### **¿*Qué es un Entorno Virtual?***

> [!NOTE]
> *Un **entorno virtual** en Python es un entorno auto-contenido que incluye una versión específica de Python y un conjunto de paquetes instalados localmente. Permite que diferentes proyectos de Python mantengan sus dependencias aisladas entre sí.*
---

#### ***¿Para Qué Sirve un Entorno Virtual?***

> [!NOTE]
> *La principal utilidad de un entorno virtual es **aislar las dependencias** de un proyecto. Esto es crucial cuando trabajas en múltiples proyectos que requieren diferentes versiones de los mismos paquetes o incluso diferentes versiones de Python.*

- *Por ejemplo, podrías tener un proyecto que necesite Flask en la versión `1.1.2` y otro proyecto que necesite Flask en la versión `2.0.0`. Sin un entorno virtual, tendrías que gestionar manualmente estas versiones y podrías encontrarte con conflictos de versiones. Con entornos virtuales, cada proyecto tiene sus propias dependencias separadas del entorno global de Python.*

---

#### ***Ventajas de los Entornos Virtuales***

- **Aislamiento de Dependencias:** *Cada proyecto puede tener sus propias versiones de paquetes sin interferir con otros proyectos.*
  
- **Facilidad para la Gestión de Proyectos:** *Puedes clonar un proyecto y tener todas las dependencias instaladas en un entorno virtual sin afectar otros proyectos.*
  
- **Compatibilidad con Múltiples Versiones de Python:** *Puedes tener entornos virtuales con diferentes versiones de Python, lo que es útil para probar la compatibilidad de tu código con diferentes versiones del lenguaje.*

- **Portabilidad del Proyecto:** *Puedes incluir el entorno virtual en tu sistema de control de versiones (como Git) para que otros desarrolladores puedan replicar tu entorno exactamente.*

---

#### ***Desventajas de los Entornos Virtuales***

- **Consumo Adicional de Espacio:** *Cada entorno virtual almacena una copia de los paquetes instalados, lo que puede resultar en un mayor consumo de espacio en disco.*

- **Complejidad Adicional:** *Manejar múltiples entornos virtuales puede añadir complejidad, especialmente si no se utilizan herramientas para gestionarlos eficientemente.*

---

#### ***Herramientas para Crear y Administrar Entornos Virtuales***

- **`venv`:** *Es el módulo estándar de Python (disponible desde Python `3.3`) para crear entornos virtuales. Es simple de usar y se incluye con la instalación de Python.*
  
- **`virtualenv`:** *Una herramienta más antigua que `venv`, pero aún muy utilizada. Ofrece más características y es compatible con versiones de Python anteriores a la `3.3`.*

- **`conda`:** *Una herramienta que gestiona entornos y paquetes, no solo para Python sino también para otras lenguajes y bibliotecas. Es popular en entornos científicos y de datos.*

---

## ***Cambiar de Usuario y Crear un Entorno Virtual en un Contenedor***

---

### ***1. Cambiar de Usuario dentro del Contenedor***

- *Cuando estamos trabajando dentro de un contenedor, es común utilizar diferentes usuarios para realizar tareas específicas. En este caso, vamos a cambiar al usuario `d4nitrix13` que has creado previamente.*

```bash
su d4nitrix13
```

**Explicación Detallada:**

- **`su`:** *Este comando se utiliza para cambiar al superusuario o a otro usuario en el sistema. En este caso, cambiamos al usuario `d4nitrix13`.*
  
- **`d4nitrix13`:** *Este es el nombre del usuario al que estás cambiando. Una vez que se ejecuta este comando, el shell se ejecutará bajo los permisos y el entorno de `d4nitrix13`.*

- *Cambiar de usuario puede ser útil para aislar tareas y garantizar que ciertos comandos o procesos se ejecuten con los permisos correctos.*

---

### ***2. Crear un Entorno Virtual `.venv`***

- *Una vez que has cambiado al usuario adecuado, es común crear un entorno virtual para gestionar las dependencias de tu proyecto de manera aislada. Vamos a crear un entorno virtual llamado `.venv`:*

```bash
python3 -m venv .venv || apt update && apt install -y python3 nano
```

**Explicación Detallada:**

- **`python3 -m venv .venv`:** *Este comando crea un entorno virtual en el directorio `.venv`. La razón por la cual el nombre del entorno virtual empieza con un punto (`.`) es para que sea un fichero oculto en sistemas Unix, siguiendo la convención de ocultar directorios y ficheros de configuración. Esto es similar a cómo se maneja el directorio `node_modules` en proyectos Node.js, ayudando a mantener la estructura del proyecto limpia y organizada.*

- **Binarios en `.venv`:** *El entorno virtual `.venv` contiene copias de los binarios de `python3` y `pip3`, que son enlaces simbólicos (symlinks) a los binarios instalados en el contenedor. Esto permite que el entorno virtual funcione como un entorno aislado, pero eficiente, utilizando los recursos existentes del contenedor.*

- **`|| apt update && apt install -y python3 nano`:** *La construcción `||` indica que si el comando anterior (`python3 -m venv .venv`) falla (por ejemplo, si `python3` no está instalado), entonces se ejecutará el siguiente comando.*

  - **`apt update`:** *Este comando actualiza la lista de paquetes disponibles desde los repositorios configurados en el contenedor. Es importante ejecutar este comando antes de instalar nuevos paquetes para asegurarse de que se está utilizando la información más reciente.*

  - **`apt install -y python3 nano`:** *Aquí, `apt install` se utiliza para instalar los paquetes `python3` y `nano`. El flag `-y` se utiliza para aceptar automáticamente todas las preguntas durante la instalación, lo que es útil en un entorno automatizado como un contenedor.*

  - **`nano`:** `nano` *es un editor de texto de terminal simple y fácil de usar, que puedes instalar para editar ficheros directamente dentro del contenedor.*

- *Este comando asegura que si `python3` no está disponible, se instale junto con un editor de texto (`nano`) para que puedas continuar con tu trabajo dentro del contenedor.*

---

### ***3. Crear el Entorno Virtual en un Segundo Paso***

- *Para asegurarte de que el entorno virtual se ha creado correctamente bajo el usuario `d4nitrix13`, puedes volver a ejecutar el comando de creación de entorno virtual:*

```bash
su d4nitrix13
python3 -m venv .venv
```

**Explicación Detallada:**

- *Este paso es redundante si el entorno virtual se creó correctamente en el paso anterior. Sin embargo, garantiza que el entorno virtual se configura bajo el usuario correcto, y que el entorno de desarrollo está listo para usar.*

---

## ***Solución de Errores al Crear un Entorno Virtual en un Contenedor***

---

### ***1. Error al Crear el Entorno Virtual***

- *Si al intentar crear un entorno virtual con `python3 -m venv .venv` se encuentra el siguiente error:*

```bash
python3 -m venv .venv
The virtual environment was not created successfully because ensurepip is not
available.  On Debian/Ubuntu systems, you need to install the python3-venv
package using the following command.

    apt install python3.10-venv

You may need to use sudo with that command.  After installing the python3-venv
package, recreate your virtual environment.

Failing command: /App/.venv/bin/python3
```

**Explicación Detallada:**

- **Error `ensurepip is not available`:** *Este error indica que el módulo `ensurepip`, necesario para la creación de entornos virtuales, no está disponible en tu instalación actual de Python. Esto generalmente ocurre cuando falta el paquete `python3-venv`, que proporciona los componentes necesarios para crear entornos virtuales.*

- **`python3-venv` o `python3.10-venv`:** *En sistemas Debian/Ubuntu, el paquete necesario puede ser `python3-venv` o `python3.10-venv`, dependiendo de la versión de Python que estás utilizando. La diferencia radica en la versión específica de Python a la que el paquete está destinado.*

---

### ***2. Revisar el Contenido del Directorio `.venv`***

- *Antes de solucionar el error, es útil revisar el contenido del directorio `.venv` que se creó parcialmente:*

```bash
tree -C .venv/
.venv/
├── bin
│   ├── python -> python3
│   ├── python3 -> /usr/bin/python3
│   └── python3.10 -> python3
├── include
├── lib
│   └── python3.10
│       └── site-packages
├── lib64 -> lib
└── pyvenv.cfg

7 directories, 4 files
```

**Explicación Detallada:**

- **Estructura del Directorio `.venv`:** *El directorio `.venv` contiene subdirectorios `bin`, `include`, `lib`, y ficheros como `pyvenv.cfg`. El subdirectorio `bin` incluye enlaces simbólicos a los ejecutables de Python. Aunque el entorno virtual se creó parcialmente, la falta del módulo `ensurepip` impide que se configure correctamente.*

---

### ***3. Instalar el Paquete Faltante***

- *Para solucionar el problema, primero salimos del usuario `d4nitrix13` y luego instalamos el paquete faltante. Puedes elegir instalar `python3.10-venv` o `python3-venv`:*

```bash
exit
apt install python3.10-venv -y
```

**Explicación Detallada:**

- **`exit`:** *Este comando sale de la sesión del usuario `d4nitrix13` y regresa al usuario anterior o al shell principal del contenedor.*

- **`apt install python3.10-venv -y`:** *Este comando instala el paquete `python3.10-venv`, que proporciona los módulos necesarios para crear entornos virtuales con Python 3.10. El flag `-y` se utiliza para aceptar automáticamente las preguntas durante la instalación.*

---

### ***4. Eliminar y Volver a Crear el Entorno Virtual***

- *Después de instalar el paquete necesario, elimina el directorio `.venv` que se creó parcialmente y vuelve a crear el entorno virtual:*

```bash
rm -rf .venv
```

**Explicación Detallada:**

- **`rm -rf .venv`:** *Este comando elimina el directorio `.venv` y su contenido de manera recursiva y forzada. Se utiliza para eliminar el entorno virtual parcialmente creado.*

```bash
su d4nitrix13
python3 -m venv .venv
```

**Explicación Detallada:**

- **`su d4nitrix13`:** *Cambia al usuario `d4nitrix13` para ejecutar el siguiente comando bajo este usuario.*

- **`python3 -m venv .venv`:** *Este comando crea un nuevo entorno virtual en el directorio `.venv`. El flag `-m` especifica que se debe ejecutar el módulo `venv` de Python 3, que es responsable de la creación del entorno virtual.*

---

### ***5. Verificar la Creación Correcta del Entorno Virtual***

- *Revisa el contenido del directorio `.venv` para confirmar que el entorno virtual se ha creado correctamente:*

```bash
tree -C .venv/
```

**Explicación Detallada:**

- *Este comando muestra la estructura del directorio `.venv` y confirma que el entorno virtual se ha creado correctamente con todos los directorios y ficheros necesarios.*

```bash
[01;34m.venv/[0m
├── [01;34mbin[0m
│   ├── activate
│   ├── activate.csh
│   ├── activate.fish
│   ├── Activate.ps1
│   ├── [01;32mpip[0m
│   ├── [01;32mpip3[0m
│   ├── [01;32mpip3.10[0m
│   ├── [01;36mpython[0m -> [01;32mpython3[0m
│   ├── [01;36mpython3[0m -> [01;32m/usr/bin/python3[0m
│   └── [01;36mpython3.10[0m -> [01;32mpython3[0m
├── [01;34minclude[0m
├── [01;34mlib[0m
│   └── [01;34mpython3.10[0m
│       └── [01;34msite-packages[0m
│           ├── [01;34m_distutils_hack[0m
│           │   ├── __init__.py
│           │   ├── override.py
│           │   └── [01;34m__pycache__[0m
│           │       ├── __init__.cpython-310.pyc
│           │       └── override.cpython-310.pyc
│           ├── distutils-precedence.pth
│           ├── [01;34mpip[0m
│           │   ├── __init__.py
│           │   ├── [01;34m_internal[0m
│           │   │   ├── build_env.py
│           │   │   ├── cache.py
│           │   │   ├── [01;34mcli[0m
│           │   │   │   ├── autocompletion.py
│           │   │   │   ├── base_command.py
│           │   │   │   ├── cmdoptions.py
│           │   │   │   ├── command_context.py
│           │   │   │   ├── __init__.py
│           │   │   │   ├── main_parser.py
│           │   │   │   ├── main.py
│           │   │   │   ├── parser.py
│           │   │   │   ├── progress_bars.py
│           │   │   │   ├── [01;34m__pycache__[0m
│           │   │   │   │   ├── autocompletion.cpython-310.pyc
│           │   │   │   │   ├── base_command.cpython-310.pyc
│           │   │   │   │   ├── cmdoptions.cpython-310.pyc
│           │   │   │   │   ├── command_context.cpython-310.pyc
│           │   │   │   │   ├── __init__.cpython-310.pyc
│           │   │   │   │   ├── main.cpython-310.pyc
│           │   │   │   │   ├── main_parser.cpython-310.pyc
│           │   │   │   │   ├── parser.cpython-310.pyc
│           │   │   │   │   ├── progress_bars.cpython-310.pyc
│           │   │   │   │   ├── req_command.cpython-310.pyc
│           │   │   │   │   ├── spinners.cpython-310.pyc
│           │   │   │   │   └── status_codes.cpython-310.pyc
│           │   │   │   ├── req_command.py
│           │   │   │   ├── spinners.py
│           │   │   │   └── status_codes.py
│           │   │   ├── [01;34mcommands[0m
│           │   │   │   ├── cache.py
│           │   │   │   ├── check.py
│           │   │   │   ├── completion.py
│           │   │   │   ├── configuration.py
│           │   │   │   ├── debug.py
│           │   │   │   ├── download.py
│           │   │   │   ├── freeze.py
│           │   │   │   ├── hash.py
│           │   │   │   ├── help.py
│           │   │   │   ├── index.py
│           │   │   │   ├── __init__.py
│           │   │   │   ├── install.py
│           │   │   │   ├── list.py
│           │   │   │   ├── [01;34m__pycache__[0m
│           │   │   │   │   ├── cache.cpython-310.pyc
│           │   │   │   │   ├── check.cpython-310.pyc
│           │   │   │   │   ├── completion.cpython-310.pyc
│           │   │   │   │   ├── configuration.cpython-310.pyc
│           │   │   │   │   ├── debug.cpython-310.pyc
│           │   │   │   │   ├── download.cpython-310.pyc
│           │   │   │   │   ├── freeze.cpython-310.pyc
│           │   │   │   │   ├── hash.cpython-310.pyc
│           │   │   │   │   ├── help.cpython-310.pyc
│           │   │   │   │   ├── index.cpython-310.pyc
│           │   │   │   │   ├── __init__.cpython-310.pyc
│           │   │   │   │   ├── install.cpython-310.pyc
│           │   │   │   │   ├── list.cpython-310.pyc
│           │   │   │   │   ├── search.cpython-310.pyc
│           │   │   │   │   ├── show.cpython-310.pyc
│           │   │   │   │   ├── uninstall.cpython-310.pyc
│           │   │   │   │   └── wheel.cpython-310.pyc
│           │   │   │   ├── search.py
│           │   │   │   ├── show.py
│           │   │   │   ├── uninstall.py
│           │   │   │   └── wheel.py
│           │   │   ├── configuration.py
│           │   │   ├── [01;34mdistributions[0m
│           │   │   │   ├── base.py
│           │   │   │   ├── __init__.py
│           │   │   │   ├── installed.py
│           │   │   │   ├── [01;34m__pycache__[0m
│           │   │   │   │   ├── base.cpython-310.pyc
│           │   │   │   │   ├── __init__.cpython-310.pyc
│           │   │   │   │   ├── installed.cpython-310.pyc
│           │   │   │   │   ├── sdist.cpython-310.pyc
│           │   │   │   │   └── wheel.cpython-310.pyc
│           │   │   │   ├── sdist.py
│           │   │   │   └── wheel.py
│           │   │   ├── exceptions.py
│           │   │   ├── [01;34mindex[0m
│           │   │   │   ├── collector.py
│           │   │   │   ├── __init__.py
│           │   │   │   ├── package_finder.py
│           │   │   │   ├── [01;34m__pycache__[0m
│           │   │   │   │   ├── collector.cpython-310.pyc
│           │   │   │   │   ├── __init__.cpython-310.pyc
│           │   │   │   │   ├── package_finder.cpython-310.pyc
│           │   │   │   │   └── sources.cpython-310.pyc
│           │   │   │   └── sources.py
│           │   │   ├── __init__.py
│           │   │   ├── [01;34mlocations[0m
│           │   │   │   ├── base.py
│           │   │   │   ├── _distutils.py
│           │   │   │   ├── __init__.py
│           │   │   │   ├── [01;34m__pycache__[0m
│           │   │   │   │   ├── base.cpython-310.pyc
│           │   │   │   │   ├── _distutils.cpython-310.pyc
│           │   │   │   │   ├── __init__.cpython-310.pyc
│           │   │   │   │   └── _sysconfig.cpython-310.pyc
│           │   │   │   └── _sysconfig.py
│           │   │   ├── main.py
│           │   │   ├── [01;34mmetadata[0m
│           │   │   │   ├── base.py
│           │   │   │   ├── __init__.py
│           │   │   │   ├── pkg_resources.py
│           │   │   │   └── [01;34m__pycache__[0m
│           │   │   │       ├── base.cpython-310.pyc
│           │   │   │       ├── __init__.cpython-310.pyc
│           │   │   │       └── pkg_resources.cpython-310.pyc
│           │   │   ├── [01;34mmodels[0m
│           │   │   │   ├── candidate.py
│           │   │   │   ├── direct_url.py
│           │   │   │   ├── format_control.py
│           │   │   │   ├── index.py
│           │   │   │   ├── __init__.py
│           │   │   │   ├── link.py
│           │   │   │   ├── [01;34m__pycache__[0m
│           │   │   │   │   ├── candidate.cpython-310.pyc
│           │   │   │   │   ├── direct_url.cpython-310.pyc
│           │   │   │   │   ├── format_control.cpython-310.pyc
│           │   │   │   │   ├── index.cpython-310.pyc
│           │   │   │   │   ├── __init__.cpython-310.pyc
│           │   │   │   │   ├── link.cpython-310.pyc
│           │   │   │   │   ├── scheme.cpython-310.pyc
│           │   │   │   │   ├── search_scope.cpython-310.pyc
│           │   │   │   │   ├── selection_prefs.cpython-310.pyc
│           │   │   │   │   ├── target_python.cpython-310.pyc
│           │   │   │   │   └── wheel.cpython-310.pyc
│           │   │   │   ├── scheme.py
│           │   │   │   ├── search_scope.py
│           │   │   │   ├── selection_prefs.py
│           │   │   │   ├── target_python.py
│           │   │   │   └── wheel.py
│           │   │   ├── [01;34mnetwork[0m
│           │   │   │   ├── auth.py
│           │   │   │   ├── cache.py
│           │   │   │   ├── download.py
│           │   │   │   ├── __init__.py
│           │   │   │   ├── lazy_wheel.py
│           │   │   │   ├── [01;34m__pycache__[0m
│           │   │   │   │   ├── auth.cpython-310.pyc
│           │   │   │   │   ├── cache.cpython-310.pyc
│           │   │   │   │   ├── download.cpython-310.pyc
│           │   │   │   │   ├── __init__.cpython-310.pyc
│           │   │   │   │   ├── lazy_wheel.cpython-310.pyc
│           │   │   │   │   ├── session.cpython-310.pyc
│           │   │   │   │   ├── utils.cpython-310.pyc
│           │   │   │   │   └── xmlrpc.cpython-310.pyc
│           │   │   │   ├── session.py
│           │   │   │   ├── utils.py
│           │   │   │   └── xmlrpc.py
│           │   │   ├── [01;34moperations[0m
│           │   │   │   ├── [01;34mbuild[0m
│           │   │   │   │   ├── __init__.py
│           │   │   │   │   ├── metadata_editable.py
│           │   │   │   │   ├── metadata_legacy.py
│           │   │   │   │   ├── metadata.py
│           │   │   │   │   ├── [01;34m__pycache__[0m
│           │   │   │   │   │   ├── __init__.cpython-310.pyc
│           │   │   │   │   │   ├── metadata.cpython-310.pyc
│           │   │   │   │   │   ├── metadata_editable.cpython-310.pyc
│           │   │   │   │   │   ├── metadata_legacy.cpython-310.pyc
│           │   │   │   │   │   ├── wheel.cpython-310.pyc
│           │   │   │   │   │   ├── wheel_editable.cpython-310.pyc
│           │   │   │   │   │   └── wheel_legacy.cpython-310.pyc
│           │   │   │   │   ├── wheel_editable.py
│           │   │   │   │   ├── wheel_legacy.py
│           │   │   │   │   └── wheel.py
│           │   │   │   ├── check.py
│           │   │   │   ├── freeze.py
│           │   │   │   ├── __init__.py
│           │   │   │   ├── [01;34minstall[0m
│           │   │   │   │   ├── editable_legacy.py
│           │   │   │   │   ├── __init__.py
│           │   │   │   │   ├── legacy.py
│           │   │   │   │   ├── [01;34m__pycache__[0m
│           │   │   │   │   │   ├── editable_legacy.cpython-310.pyc
│           │   │   │   │   │   ├── __init__.cpython-310.pyc
│           │   │   │   │   │   ├── legacy.cpython-310.pyc
│           │   │   │   │   │   └── wheel.cpython-310.pyc
│           │   │   │   │   └── wheel.py
│           │   │   │   ├── prepare.py
│           │   │   │   └── [01;34m__pycache__[0m
│           │   │   │       ├── check.cpython-310.pyc
│           │   │   │       ├── freeze.cpython-310.pyc
│           │   │   │       ├── __init__.cpython-310.pyc
│           │   │   │       └── prepare.cpython-310.pyc
│           │   │   ├── [01;34m__pycache__[0m
│           │   │   │   ├── build_env.cpython-310.pyc
│           │   │   │   ├── cache.cpython-310.pyc
│           │   │   │   ├── configuration.cpython-310.pyc
│           │   │   │   ├── exceptions.cpython-310.pyc
│           │   │   │   ├── __init__.cpython-310.pyc
│           │   │   │   ├── main.cpython-310.pyc
│           │   │   │   ├── pyproject.cpython-310.pyc
│           │   │   │   ├── self_outdated_check.cpython-310.pyc
│           │   │   │   └── wheel_builder.cpython-310.pyc
│           │   │   ├── pyproject.py
│           │   │   ├── [01;34mreq[0m
│           │   │   │   ├── constructors.py
│           │   │   │   ├── __init__.py
│           │   │   │   ├── [01;34m__pycache__[0m
│           │   │   │   │   ├── constructors.cpython-310.pyc
│           │   │   │   │   ├── __init__.cpython-310.pyc
│           │   │   │   │   ├── req_file.cpython-310.pyc
│           │   │   │   │   ├── req_install.cpython-310.pyc
│           │   │   │   │   ├── req_set.cpython-310.pyc
│           │   │   │   │   ├── req_tracker.cpython-310.pyc
│           │   │   │   │   └── req_uninstall.cpython-310.pyc
│           │   │   │   ├── req_file.py
│           │   │   │   ├── req_install.py
│           │   │   │   ├── req_set.py
│           │   │   │   ├── req_tracker.py
│           │   │   │   └── req_uninstall.py
│           │   │   ├── [01;34mresolution[0m
│           │   │   │   ├── base.py
│           │   │   │   ├── __init__.py
│           │   │   │   ├── [01;34mlegacy[0m
│           │   │   │   │   ├── __init__.py
│           │   │   │   │   ├── [01;34m__pycache__[0m
│           │   │   │   │   │   ├── __init__.cpython-310.pyc
│           │   │   │   │   │   └── resolver.cpython-310.pyc
│           │   │   │   │   └── resolver.py
│           │   │   │   ├── [01;34m__pycache__[0m
│           │   │   │   │   ├── base.cpython-310.pyc
│           │   │   │   │   └── __init__.cpython-310.pyc
│           │   │   │   └── [01;34mresolvelib[0m
│           │   │   │       ├── base.py
│           │   │   │       ├── candidates.py
│           │   │   │       ├── factory.py
│           │   │   │       ├── found_candidates.py
│           │   │   │       ├── __init__.py
│           │   │   │       ├── provider.py
│           │   │   │       ├── [01;34m__pycache__[0m
│           │   │   │       │   ├── base.cpython-310.pyc
│           │   │   │       │   ├── candidates.cpython-310.pyc
│           │   │   │       │   ├── factory.cpython-310.pyc
│           │   │   │       │   ├── found_candidates.cpython-310.pyc
│           │   │   │       │   ├── __init__.cpython-310.pyc
│           │   │   │       │   ├── provider.cpython-310.pyc
│           │   │   │       │   ├── reporter.cpython-310.pyc
│           │   │   │       │   ├── requirements.cpython-310.pyc
│           │   │   │       │   └── resolver.cpython-310.pyc
│           │   │   │       ├── reporter.py
│           │   │   │       ├── requirements.py
│           │   │   │       └── resolver.py
│           │   │   ├── self_outdated_check.py
│           │   │   ├── [01;34mutils[0m
│           │   │   │   ├── appdirs.py
│           │   │   │   ├── compatibility_tags.py
│           │   │   │   ├── compat.py
│           │   │   │   ├── datetime.py
│           │   │   │   ├── deprecation.py
│           │   │   │   ├── direct_url_helpers.py
│           │   │   │   ├── distutils_args.py
│           │   │   │   ├── egg_link.py
│           │   │   │   ├── encoding.py
│           │   │   │   ├── entrypoints.py
│           │   │   │   ├── filesystem.py
│           │   │   │   ├── filetypes.py
│           │   │   │   ├── glibc.py
│           │   │   │   ├── hashes.py
│           │   │   │   ├── __init__.py
│           │   │   │   ├── inject_securetransport.py
│           │   │   │   ├── logging.py
│           │   │   │   ├── _log.py
│           │   │   │   ├── misc.py
│           │   │   │   ├── models.py
│           │   │   │   ├── packaging.py
│           │   │   │   ├── [01;34m__pycache__[0m
│           │   │   │   │   ├── appdirs.cpython-310.pyc
│           │   │   │   │   ├── compat.cpython-310.pyc
│           │   │   │   │   ├── compatibility_tags.cpython-310.pyc
│           │   │   │   │   ├── datetime.cpython-310.pyc
│           │   │   │   │   ├── deprecation.cpython-310.pyc
│           │   │   │   │   ├── direct_url_helpers.cpython-310.pyc
│           │   │   │   │   ├── distutils_args.cpython-310.pyc
│           │   │   │   │   ├── egg_link.cpython-310.pyc
│           │   │   │   │   ├── encoding.cpython-310.pyc
│           │   │   │   │   ├── entrypoints.cpython-310.pyc
│           │   │   │   │   ├── filesystem.cpython-310.pyc
│           │   │   │   │   ├── filetypes.cpython-310.pyc
│           │   │   │   │   ├── glibc.cpython-310.pyc
│           │   │   │   │   ├── hashes.cpython-310.pyc
│           │   │   │   │   ├── __init__.cpython-310.pyc
│           │   │   │   │   ├── inject_securetransport.cpython-310.pyc
│           │   │   │   │   ├── _log.cpython-310.pyc
│           │   │   │   │   ├── logging.cpython-310.pyc
│           │   │   │   │   ├── misc.cpython-310.pyc
│           │   │   │   │   ├── models.cpython-310.pyc
│           │   │   │   │   ├── packaging.cpython-310.pyc
│           │   │   │   │   ├── setuptools_build.cpython-310.pyc
│           │   │   │   │   ├── subprocess.cpython-310.pyc
│           │   │   │   │   ├── temp_dir.cpython-310.pyc
│           │   │   │   │   ├── unpacking.cpython-310.pyc
│           │   │   │   │   ├── urls.cpython-310.pyc
│           │   │   │   │   ├── virtualenv.cpython-310.pyc
│           │   │   │   │   └── wheel.cpython-310.pyc
│           │   │   │   ├── setuptools_build.py
│           │   │   │   ├── subprocess.py
│           │   │   │   ├── temp_dir.py
│           │   │   │   ├── unpacking.py
│           │   │   │   ├── urls.py
│           │   │   │   ├── virtualenv.py
│           │   │   │   └── wheel.py
│           │   │   ├── [01;34mvcs[0m
│           │   │   │   ├── bazaar.py
│           │   │   │   ├── git.py
│           │   │   │   ├── __init__.py
│           │   │   │   ├── mercurial.py
│           │   │   │   ├── [01;34m__pycache__[0m
│           │   │   │   │   ├── bazaar.cpython-310.pyc
│           │   │   │   │   ├── git.cpython-310.pyc
│           │   │   │   │   ├── __init__.cpython-310.pyc
│           │   │   │   │   ├── mercurial.cpython-310.pyc
│           │   │   │   │   ├── subversion.cpython-310.pyc
│           │   │   │   │   └── versioncontrol.cpython-310.pyc
│           │   │   │   ├── subversion.py
│           │   │   │   └── versioncontrol.py
│           │   │   └── wheel_builder.py
│           │   ├── __main__.py
│           │   ├── [01;34m__pycache__[0m
│           │   │   ├── __init__.cpython-310.pyc
│           │   │   └── __main__.cpython-310.pyc
│           │   ├── py.typed
│           │   └── [01;34m_vendor[0m
│           │       ├── [01;34mcachecontrol[0m
│           │       │   ├── adapter.py
│           │       │   ├── cache.py
│           │       │   ├── [01;34mcaches[0m
│           │       │   │   ├── file_cache.py
│           │       │   │   ├── __init__.py
│           │       │   │   ├── [01;34m__pycache__[0m
│           │       │   │   │   ├── file_cache.cpython-310.pyc
│           │       │   │   │   ├── __init__.cpython-310.pyc
│           │       │   │   │   └── redis_cache.cpython-310.pyc
│           │       │   │   └── redis_cache.py
│           │       │   ├── _cmd.py
│           │       │   ├── compat.py
│           │       │   ├── controller.py
│           │       │   ├── filewrapper.py
│           │       │   ├── heuristics.py
│           │       │   ├── __init__.py
│           │       │   ├── [01;34m__pycache__[0m
│           │       │   │   ├── adapter.cpython-310.pyc
│           │       │   │   ├── cache.cpython-310.pyc
│           │       │   │   ├── _cmd.cpython-310.pyc
│           │       │   │   ├── compat.cpython-310.pyc
│           │       │   │   ├── controller.cpython-310.pyc
│           │       │   │   ├── filewrapper.cpython-310.pyc
│           │       │   │   ├── heuristics.cpython-310.pyc
│           │       │   │   ├── __init__.cpython-310.pyc
│           │       │   │   ├── serialize.cpython-310.pyc
│           │       │   │   └── wrapper.cpython-310.pyc
│           │       │   ├── serialize.py
│           │       │   └── wrapper.py
│           │       ├── [01;34mcertifi[0m
│           │       │   ├── cacert.pem
│           │       │   ├── core.py
│           │       │   ├── __init__.py
│           │       │   ├── __main__.py
│           │       │   └── [01;34m__pycache__[0m
│           │       │       ├── core.cpython-310.pyc
│           │       │       ├── __init__.cpython-310.pyc
│           │       │       └── __main__.cpython-310.pyc
│           │       ├── [01;34mchardet[0m
│           │       │   ├── big5freq.py
│           │       │   ├── big5prober.py
│           │       │   ├── chardistribution.py
│           │       │   ├── charsetgroupprober.py
│           │       │   ├── charsetprober.py
│           │       │   ├── [01;34mcli[0m
│           │       │   │   ├── chardetect.py
│           │       │   │   ├── __init__.py
│           │       │   │   └── [01;34m__pycache__[0m
│           │       │   │       ├── chardetect.cpython-310.pyc
│           │       │   │       └── __init__.cpython-310.pyc
│           │       │   ├── codingstatemachine.py
│           │       │   ├── compat.py
│           │       │   ├── cp949prober.py
│           │       │   ├── enums.py
│           │       │   ├── escprober.py
│           │       │   ├── escsm.py
│           │       │   ├── eucjpprober.py
│           │       │   ├── euckrfreq.py
│           │       │   ├── euckrprober.py
│           │       │   ├── euctwfreq.py
│           │       │   ├── euctwprober.py
│           │       │   ├── gb2312freq.py
│           │       │   ├── gb2312prober.py
│           │       │   ├── hebrewprober.py
│           │       │   ├── __init__.py
│           │       │   ├── jisfreq.py
│           │       │   ├── jpcntx.py
│           │       │   ├── langbulgarianmodel.py
│           │       │   ├── langgreekmodel.py
│           │       │   ├── langhebrewmodel.py
│           │       │   ├── langhungarianmodel.py
│           │       │   ├── langrussianmodel.py
│           │       │   ├── langthaimodel.py
│           │       │   ├── langturkishmodel.py
│           │       │   ├── latin1prober.py
│           │       │   ├── mbcharsetprober.py
│           │       │   ├── mbcsgroupprober.py
│           │       │   ├── mbcssm.py
│           │       │   ├── [01;34mmetadata[0m
│           │       │   │   ├── __init__.py
│           │       │   │   ├── languages.py
│           │       │   │   └── [01;34m__pycache__[0m
│           │       │   │       ├── __init__.cpython-310.pyc
│           │       │   │       └── languages.cpython-310.pyc
│           │       │   ├── [01;34m__pycache__[0m
│           │       │   │   ├── big5freq.cpython-310.pyc
│           │       │   │   ├── big5prober.cpython-310.pyc
│           │       │   │   ├── chardistribution.cpython-310.pyc
│           │       │   │   ├── charsetgroupprober.cpython-310.pyc
│           │       │   │   ├── charsetprober.cpython-310.pyc
│           │       │   │   ├── codingstatemachine.cpython-310.pyc
│           │       │   │   ├── compat.cpython-310.pyc
│           │       │   │   ├── cp949prober.cpython-310.pyc
│           │       │   │   ├── enums.cpython-310.pyc
│           │       │   │   ├── escprober.cpython-310.pyc
│           │       │   │   ├── escsm.cpython-310.pyc
│           │       │   │   ├── eucjpprober.cpython-310.pyc
│           │       │   │   ├── euckrfreq.cpython-310.pyc
│           │       │   │   ├── euckrprober.cpython-310.pyc
│           │       │   │   ├── euctwfreq.cpython-310.pyc
│           │       │   │   ├── euctwprober.cpython-310.pyc
│           │       │   │   ├── gb2312freq.cpython-310.pyc
│           │       │   │   ├── gb2312prober.cpython-310.pyc
│           │       │   │   ├── hebrewprober.cpython-310.pyc
│           │       │   │   ├── __init__.cpython-310.pyc
│           │       │   │   ├── jisfreq.cpython-310.pyc
│           │       │   │   ├── jpcntx.cpython-310.pyc
│           │       │   │   ├── langbulgarianmodel.cpython-310.pyc
│           │       │   │   ├── langgreekmodel.cpython-310.pyc
│           │       │   │   ├── langhebrewmodel.cpython-310.pyc
│           │       │   │   ├── langhungarianmodel.cpython-310.pyc
│           │       │   │   ├── langrussianmodel.cpython-310.pyc
│           │       │   │   ├── langthaimodel.cpython-310.pyc
│           │       │   │   ├── langturkishmodel.cpython-310.pyc
│           │       │   │   ├── latin1prober.cpython-310.pyc
│           │       │   │   ├── mbcharsetprober.cpython-310.pyc
│           │       │   │   ├── mbcsgroupprober.cpython-310.pyc
│           │       │   │   ├── mbcssm.cpython-310.pyc
│           │       │   │   ├── sbcharsetprober.cpython-310.pyc
│           │       │   │   ├── sbcsgroupprober.cpython-310.pyc
│           │       │   │   ├── sjisprober.cpython-310.pyc
│           │       │   │   ├── universaldetector.cpython-310.pyc
│           │       │   │   ├── utf8prober.cpython-310.pyc
│           │       │   │   └── version.cpython-310.pyc
│           │       │   ├── sbcharsetprober.py
│           │       │   ├── sbcsgroupprober.py
│           │       │   ├── sjisprober.py
│           │       │   ├── universaldetector.py
│           │       │   ├── utf8prober.py
│           │       │   └── version.py
│           │       ├── [01;34mcolorama[0m
│           │       │   ├── ansi.py
│           │       │   ├── ansitowin32.py
│           │       │   ├── initialise.py
│           │       │   ├── __init__.py
│           │       │   ├── [01;34m__pycache__[0m
│           │       │   │   ├── ansi.cpython-310.pyc
│           │       │   │   ├── ansitowin32.cpython-310.pyc
│           │       │   │   ├── __init__.cpython-310.pyc
│           │       │   │   ├── initialise.cpython-310.pyc
│           │       │   │   ├── win32.cpython-310.pyc
│           │       │   │   └── winterm.cpython-310.pyc
│           │       │   ├── win32.py
│           │       │   └── winterm.py
│           │       ├── [01;34mdistlib[0m
│           │       │   ├── compat.py
│           │       │   ├── database.py
│           │       │   ├── index.py
│           │       │   ├── __init__.py
│           │       │   ├── locators.py
│           │       │   ├── manifest.py
│           │       │   ├── markers.py
│           │       │   ├── metadata.py
│           │       │   ├── [01;34m__pycache__[0m
│           │       │   │   ├── compat.cpython-310.pyc
│           │       │   │   ├── database.cpython-310.pyc
│           │       │   │   ├── index.cpython-310.pyc
│           │       │   │   ├── __init__.cpython-310.pyc
│           │       │   │   ├── locators.cpython-310.pyc
│           │       │   │   ├── manifest.cpython-310.pyc
│           │       │   │   ├── markers.cpython-310.pyc
│           │       │   │   ├── metadata.cpython-310.pyc
│           │       │   │   ├── resources.cpython-310.pyc
│           │       │   │   ├── scripts.cpython-310.pyc
│           │       │   │   ├── util.cpython-310.pyc
│           │       │   │   ├── version.cpython-310.pyc
│           │       │   │   └── wheel.cpython-310.pyc
│           │       │   ├── resources.py
│           │       │   ├── scripts.py
│           │       │   ├── util.py
│           │       │   ├── version.py
│           │       │   └── wheel.py
│           │       ├── distro.py
│           │       ├── [01;34mhtml5lib[0m
│           │       │   ├── constants.py
│           │       │   ├── [01;34mfilters[0m
│           │       │   │   ├── alphabeticalattributes.py
│           │       │   │   ├── base.py
│           │       │   │   ├── __init__.py
│           │       │   │   ├── inject_meta_charset.py
│           │       │   │   ├── lint.py
│           │       │   │   ├── optionaltags.py
│           │       │   │   ├── [01;34m__pycache__[0m
│           │       │   │   │   ├── alphabeticalattributes.cpython-310.pyc
│           │       │   │   │   ├── base.cpython-310.pyc
│           │       │   │   │   ├── __init__.cpython-310.pyc
│           │       │   │   │   ├── inject_meta_charset.cpython-310.pyc
│           │       │   │   │   ├── lint.cpython-310.pyc
│           │       │   │   │   ├── optionaltags.cpython-310.pyc
│           │       │   │   │   ├── sanitizer.cpython-310.pyc
│           │       │   │   │   └── whitespace.cpython-310.pyc
│           │       │   │   ├── sanitizer.py
│           │       │   │   └── whitespace.py
│           │       │   ├── html5parser.py
│           │       │   ├── _ihatexml.py
│           │       │   ├── __init__.py
│           │       │   ├── _inputstream.py
│           │       │   ├── [01;34m__pycache__[0m
│           │       │   │   ├── constants.cpython-310.pyc
│           │       │   │   ├── html5parser.cpython-310.pyc
│           │       │   │   ├── _ihatexml.cpython-310.pyc
│           │       │   │   ├── __init__.cpython-310.pyc
│           │       │   │   ├── _inputstream.cpython-310.pyc
│           │       │   │   ├── serializer.cpython-310.pyc
│           │       │   │   ├── _tokenizer.cpython-310.pyc
│           │       │   │   └── _utils.cpython-310.pyc
│           │       │   ├── serializer.py
│           │       │   ├── _tokenizer.py
│           │       │   ├── [01;34mtreeadapters[0m
│           │       │   │   ├── genshi.py
│           │       │   │   ├── __init__.py
│           │       │   │   ├── [01;34m__pycache__[0m
│           │       │   │   │   ├── genshi.cpython-310.pyc
│           │       │   │   │   ├── __init__.cpython-310.pyc
│           │       │   │   │   └── sax.cpython-310.pyc
│           │       │   │   └── sax.py
│           │       │   ├── [01;34mtreebuilders[0m
│           │       │   │   ├── base.py
│           │       │   │   ├── dom.py
│           │       │   │   ├── etree_lxml.py
│           │       │   │   ├── etree.py
│           │       │   │   ├── __init__.py
│           │       │   │   └── [01;34m__pycache__[0m
│           │       │   │       ├── base.cpython-310.pyc
│           │       │   │       ├── dom.cpython-310.pyc
│           │       │   │       ├── etree.cpython-310.pyc
│           │       │   │       ├── etree_lxml.cpython-310.pyc
│           │       │   │       └── __init__.cpython-310.pyc
│           │       │   ├── [01;34mtreewalkers[0m
│           │       │   │   ├── base.py
│           │       │   │   ├── dom.py
│           │       │   │   ├── etree_lxml.py
│           │       │   │   ├── etree.py
│           │       │   │   ├── genshi.py
│           │       │   │   ├── __init__.py
│           │       │   │   └── [01;34m__pycache__[0m
│           │       │   │       ├── base.cpython-310.pyc
│           │       │   │       ├── dom.cpython-310.pyc
│           │       │   │       ├── etree.cpython-310.pyc
│           │       │   │       ├── etree_lxml.cpython-310.pyc
│           │       │   │       ├── genshi.cpython-310.pyc
│           │       │   │       └── __init__.cpython-310.pyc
│           │       │   ├── [01;34m_trie[0m
│           │       │   │   ├── _base.py
│           │       │   │   ├── __init__.py
│           │       │   │   ├── [01;34m__pycache__[0m
│           │       │   │   │   ├── _base.cpython-310.pyc
│           │       │   │   │   ├── __init__.cpython-310.pyc
│           │       │   │   │   └── py.cpython-310.pyc
│           │       │   │   └── py.py
│           │       │   └── _utils.py
│           │       ├── [01;34midna[0m
│           │       │   ├── codec.py
│           │       │   ├── compat.py
│           │       │   ├── core.py
│           │       │   ├── idnadata.py
│           │       │   ├── __init__.py
│           │       │   ├── intranges.py
│           │       │   ├── package_data.py
│           │       │   ├── [01;34m__pycache__[0m
│           │       │   │   ├── codec.cpython-310.pyc
│           │       │   │   ├── compat.cpython-310.pyc
│           │       │   │   ├── core.cpython-310.pyc
│           │       │   │   ├── idnadata.cpython-310.pyc
│           │       │   │   ├── __init__.cpython-310.pyc
│           │       │   │   ├── intranges.cpython-310.pyc
│           │       │   │   ├── package_data.cpython-310.pyc
│           │       │   │   └── uts46data.cpython-310.pyc
│           │       │   └── uts46data.py
│           │       ├── __init__.py
│           │       ├── [01;34mmsgpack[0m
│           │       │   ├── exceptions.py
│           │       │   ├── ext.py
│           │       │   ├── fallback.py
│           │       │   ├── __init__.py
│           │       │   ├── [01;34m__pycache__[0m
│           │       │   │   ├── exceptions.cpython-310.pyc
│           │       │   │   ├── ext.cpython-310.pyc
│           │       │   │   ├── fallback.cpython-310.pyc
│           │       │   │   ├── __init__.cpython-310.pyc
│           │       │   │   └── _version.cpython-310.pyc
│           │       │   └── _version.py
│           │       ├── [01;34mpackaging[0m
│           │       │   ├── __about__.py
│           │       │   ├── __init__.py
│           │       │   ├── _manylinux.py
│           │       │   ├── markers.py
│           │       │   ├── _musllinux.py
│           │       │   ├── [01;34m__pycache__[0m
│           │       │   │   ├── __about__.cpython-310.pyc
│           │       │   │   ├── __init__.cpython-310.pyc
│           │       │   │   ├── _manylinux.cpython-310.pyc
│           │       │   │   ├── markers.cpython-310.pyc
│           │       │   │   ├── _musllinux.cpython-310.pyc
│           │       │   │   ├── requirements.cpython-310.pyc
│           │       │   │   ├── specifiers.cpython-310.pyc
│           │       │   │   ├── _structures.cpython-310.pyc
│           │       │   │   ├── tags.cpython-310.pyc
│           │       │   │   ├── utils.cpython-310.pyc
│           │       │   │   └── version.cpython-310.pyc
│           │       │   ├── requirements.py
│           │       │   ├── specifiers.py
│           │       │   ├── _structures.py
│           │       │   ├── tags.py
│           │       │   ├── utils.py
│           │       │   └── version.py
│           │       ├── [01;34mpep517[0m
│           │       │   ├── build.py
│           │       │   ├── check.py
│           │       │   ├── colorlog.py
│           │       │   ├── compat.py
│           │       │   ├── dirtools.py
│           │       │   ├── envbuild.py
│           │       │   ├── __init__.py
│           │       │   ├── [01;34min_process[0m
│           │       │   │   ├── __init__.py
│           │       │   │   ├── _in_process.py
│           │       │   │   └── [01;34m__pycache__[0m
│           │       │   │       ├── __init__.cpython-310.pyc
│           │       │   │       └── _in_process.cpython-310.pyc
│           │       │   ├── meta.py
│           │       │   ├── [01;34m__pycache__[0m
│           │       │   │   ├── build.cpython-310.pyc
│           │       │   │   ├── check.cpython-310.pyc
│           │       │   │   ├── colorlog.cpython-310.pyc
│           │       │   │   ├── compat.cpython-310.pyc
│           │       │   │   ├── dirtools.cpython-310.pyc
│           │       │   │   ├── envbuild.cpython-310.pyc
│           │       │   │   ├── __init__.cpython-310.pyc
│           │       │   │   ├── meta.cpython-310.pyc
│           │       │   │   └── wrappers.cpython-310.pyc
│           │       │   └── wrappers.py
│           │       ├── [01;34mpkg_resources[0m
│           │       │   ├── __init__.py
│           │       │   ├── py31compat.py
│           │       │   └── [01;34m__pycache__[0m
│           │       │       ├── __init__.cpython-310.pyc
│           │       │       └── py31compat.cpython-310.pyc
│           │       ├── [01;34mplatformdirs[0m
│           │       │   ├── android.py
│           │       │   ├── api.py
│           │       │   ├── __init__.py
│           │       │   ├── macos.py
│           │       │   ├── __main__.py
│           │       │   ├── [01;34m__pycache__[0m
│           │       │   │   ├── android.cpython-310.pyc
│           │       │   │   ├── api.cpython-310.pyc
│           │       │   │   ├── __init__.cpython-310.pyc
│           │       │   │   ├── macos.cpython-310.pyc
│           │       │   │   ├── __main__.cpython-310.pyc
│           │       │   │   ├── unix.cpython-310.pyc
│           │       │   │   ├── version.cpython-310.pyc
│           │       │   │   └── windows.cpython-310.pyc
│           │       │   ├── unix.py
│           │       │   ├── version.py
│           │       │   └── windows.py
│           │       ├── [01;34mprogress[0m
│           │       │   ├── bar.py
│           │       │   ├── colors.py
│           │       │   ├── counter.py
│           │       │   ├── __init__.py
│           │       │   ├── [01;34m__pycache__[0m
│           │       │   │   ├── bar.cpython-310.pyc
│           │       │   │   ├── colors.cpython-310.pyc
│           │       │   │   ├── counter.cpython-310.pyc
│           │       │   │   ├── __init__.cpython-310.pyc
│           │       │   │   └── spinner.cpython-310.pyc
│           │       │   └── spinner.py
│           │       ├── [01;34m__pycache__[0m
│           │       │   ├── distro.cpython-310.pyc
│           │       │   ├── __init__.cpython-310.pyc
│           │       │   ├── six.cpython-310.pyc
│           │       │   └── typing_extensions.cpython-310.pyc
│           │       ├── [01;34mpygments[0m
│           │       │   ├── cmdline.py
│           │       │   ├── console.py
│           │       │   ├── filter.py
│           │       │   ├── [01;34mfilters[0m
│           │       │   │   ├── __init__.py
│           │       │   │   └── [01;34m__pycache__[0m
│           │       │   │       └── __init__.cpython-310.pyc
│           │       │   ├── formatter.py
│           │       │   ├── [01;34mformatters[0m
│           │       │   │   ├── bbcode.py
│           │       │   │   ├── groff.py
│           │       │   │   ├── html.py
│           │       │   │   ├── img.py
│           │       │   │   ├── __init__.py
│           │       │   │   ├── irc.py
│           │       │   │   ├── latex.py
│           │       │   │   ├── _mapping.py
│           │       │   │   ├── other.py
│           │       │   │   ├── pangomarkup.py
│           │       │   │   ├── [01;34m__pycache__[0m
│           │       │   │   │   ├── bbcode.cpython-310.pyc
│           │       │   │   │   ├── groff.cpython-310.pyc
│           │       │   │   │   ├── html.cpython-310.pyc
│           │       │   │   │   ├── img.cpython-310.pyc
│           │       │   │   │   ├── __init__.cpython-310.pyc
│           │       │   │   │   ├── irc.cpython-310.pyc
│           │       │   │   │   ├── latex.cpython-310.pyc
│           │       │   │   │   ├── _mapping.cpython-310.pyc
│           │       │   │   │   ├── other.cpython-310.pyc
│           │       │   │   │   ├── pangomarkup.cpython-310.pyc
│           │       │   │   │   ├── rtf.cpython-310.pyc
│           │       │   │   │   ├── svg.cpython-310.pyc
│           │       │   │   │   ├── terminal256.cpython-310.pyc
│           │       │   │   │   └── terminal.cpython-310.pyc
│           │       │   │   ├── rtf.py
│           │       │   │   ├── svg.py
│           │       │   │   ├── terminal256.py
│           │       │   │   └── terminal.py
│           │       │   ├── __init__.py
│           │       │   ├── lexer.py
│           │       │   ├── [01;34mlexers[0m
│           │       │   │   ├── __init__.py
│           │       │   │   ├── _mapping.py
│           │       │   │   ├── [01;34m__pycache__[0m
│           │       │   │   │   ├── __init__.cpython-310.pyc
│           │       │   │   │   ├── _mapping.cpython-310.pyc
│           │       │   │   │   └── python.cpython-310.pyc
│           │       │   │   └── python.py
│           │       │   ├── __main__.py
│           │       │   ├── modeline.py
│           │       │   ├── plugin.py
│           │       │   ├── [01;34m__pycache__[0m
│           │       │   │   ├── cmdline.cpython-310.pyc
│           │       │   │   ├── console.cpython-310.pyc
│           │       │   │   ├── filter.cpython-310.pyc
│           │       │   │   ├── formatter.cpython-310.pyc
│           │       │   │   ├── __init__.cpython-310.pyc
│           │       │   │   ├── lexer.cpython-310.pyc
│           │       │   │   ├── __main__.cpython-310.pyc
│           │       │   │   ├── modeline.cpython-310.pyc
│           │       │   │   ├── plugin.cpython-310.pyc
│           │       │   │   ├── regexopt.cpython-310.pyc
│           │       │   │   ├── scanner.cpython-310.pyc
│           │       │   │   ├── sphinxext.cpython-310.pyc
│           │       │   │   ├── style.cpython-310.pyc
│           │       │   │   ├── token.cpython-310.pyc
│           │       │   │   ├── unistring.cpython-310.pyc
│           │       │   │   └── util.cpython-310.pyc
│           │       │   ├── regexopt.py
│           │       │   ├── scanner.py
│           │       │   ├── sphinxext.py
│           │       │   ├── style.py
│           │       │   ├── [01;34mstyles[0m
│           │       │   │   ├── __init__.py
│           │       │   │   └── [01;34m__pycache__[0m
│           │       │   │       └── __init__.cpython-310.pyc
│           │       │   ├── token.py
│           │       │   ├── unistring.py
│           │       │   └── util.py
│           │       ├── [01;34mpyparsing[0m
│           │       │   ├── actions.py
│           │       │   ├── common.py
│           │       │   ├── core.py
│           │       │   ├── [01;34mdiagram[0m
│           │       │   │   ├── __init__.py
│           │       │   │   └── [01;34m__pycache__[0m
│           │       │   │       └── __init__.cpython-310.pyc
│           │       │   ├── exceptions.py
│           │       │   ├── helpers.py
│           │       │   ├── __init__.py
│           │       │   ├── [01;34m__pycache__[0m
│           │       │   │   ├── actions.cpython-310.pyc
│           │       │   │   ├── common.cpython-310.pyc
│           │       │   │   ├── core.cpython-310.pyc
│           │       │   │   ├── exceptions.cpython-310.pyc
│           │       │   │   ├── helpers.cpython-310.pyc
│           │       │   │   ├── __init__.cpython-310.pyc
│           │       │   │   ├── results.cpython-310.pyc
│           │       │   │   ├── testing.cpython-310.pyc
│           │       │   │   ├── unicode.cpython-310.pyc
│           │       │   │   └── util.cpython-310.pyc
│           │       │   ├── results.py
│           │       │   ├── testing.py
│           │       │   ├── unicode.py
│           │       │   └── util.py
│           │       ├── [01;34mrequests[0m
│           │       │   ├── adapters.py
│           │       │   ├── api.py
│           │       │   ├── auth.py
│           │       │   ├── certs.py
│           │       │   ├── compat.py
│           │       │   ├── cookies.py
│           │       │   ├── exceptions.py
│           │       │   ├── help.py
│           │       │   ├── hooks.py
│           │       │   ├── __init__.py
│           │       │   ├── _internal_utils.py
│           │       │   ├── models.py
│           │       │   ├── packages.py
│           │       │   ├── [01;34m__pycache__[0m
│           │       │   │   ├── adapters.cpython-310.pyc
│           │       │   │   ├── api.cpython-310.pyc
│           │       │   │   ├── auth.cpython-310.pyc
│           │       │   │   ├── certs.cpython-310.pyc
│           │       │   │   ├── compat.cpython-310.pyc
│           │       │   │   ├── cookies.cpython-310.pyc
│           │       │   │   ├── exceptions.cpython-310.pyc
│           │       │   │   ├── help.cpython-310.pyc
│           │       │   │   ├── hooks.cpython-310.pyc
│           │       │   │   ├── __init__.cpython-310.pyc
│           │       │   │   ├── _internal_utils.cpython-310.pyc
│           │       │   │   ├── models.cpython-310.pyc
│           │       │   │   ├── packages.cpython-310.pyc
│           │       │   │   ├── sessions.cpython-310.pyc
│           │       │   │   ├── status_codes.cpython-310.pyc
│           │       │   │   ├── structures.cpython-310.pyc
│           │       │   │   ├── utils.cpython-310.pyc
│           │       │   │   └── __version__.cpython-310.pyc
│           │       │   ├── sessions.py
│           │       │   ├── status_codes.py
│           │       │   ├── structures.py
│           │       │   ├── utils.py
│           │       │   └── __version__.py
│           │       ├── [01;34mresolvelib[0m
│           │       │   ├── [01;34mcompat[0m
│           │       │   │   ├── collections_abc.py
│           │       │   │   ├── __init__.py
│           │       │   │   └── [01;34m__pycache__[0m
│           │       │   │       ├── collections_abc.cpython-310.pyc
│           │       │   │       └── __init__.cpython-310.pyc
│           │       │   ├── __init__.py
│           │       │   ├── providers.py
│           │       │   ├── [01;34m__pycache__[0m
│           │       │   │   ├── __init__.cpython-310.pyc
│           │       │   │   ├── providers.cpython-310.pyc
│           │       │   │   ├── reporters.cpython-310.pyc
│           │       │   │   ├── resolvers.cpython-310.pyc
│           │       │   │   └── structs.cpython-310.pyc
│           │       │   ├── reporters.py
│           │       │   ├── resolvers.py
│           │       │   └── structs.py
│           │       ├── [01;34mrich[0m
│           │       │   ├── abc.py
│           │       │   ├── align.py
│           │       │   ├── ansi.py
│           │       │   ├── bar.py
│           │       │   ├── box.py
│           │       │   ├── cells.py
│           │       │   ├── _cell_widths.py
│           │       │   ├── color.py
│           │       │   ├── color_triplet.py
│           │       │   ├── columns.py
│           │       │   ├── console.py
│           │       │   ├── constrain.py
│           │       │   ├── containers.py
│           │       │   ├── control.py
│           │       │   ├── default_styles.py
│           │       │   ├── diagnose.py
│           │       │   ├── _emoji_codes.py
│           │       │   ├── emoji.py
│           │       │   ├── _emoji_replace.py
│           │       │   ├── errors.py
│           │       │   ├── _extension.py
│           │       │   ├── file_proxy.py
│           │       │   ├── filesize.py
│           │       │   ├── highlighter.py
│           │       │   ├── __init__.py
│           │       │   ├── _inspect.py
│           │       │   ├── json.py
│           │       │   ├── jupyter.py
│           │       │   ├── layout.py
│           │       │   ├── live.py
│           │       │   ├── live_render.py
│           │       │   ├── logging.py
│           │       │   ├── _log_render.py
│           │       │   ├── _loop.py
│           │       │   ├── _lru_cache.py
│           │       │   ├── __main__.py
│           │       │   ├── markup.py
│           │       │   ├── measure.py
│           │       │   ├── padding.py
│           │       │   ├── pager.py
│           │       │   ├── palette.py
│           │       │   ├── _palettes.py
│           │       │   ├── panel.py
│           │       │   ├── _pick.py
│           │       │   ├── pretty.py
│           │       │   ├── progress_bar.py
│           │       │   ├── progress.py
│           │       │   ├── prompt.py
│           │       │   ├── protocol.py
│           │       │   ├── [01;34m__pycache__[0m
│           │       │   │   ├── abc.cpython-310.pyc
│           │       │   │   ├── align.cpython-310.pyc
│           │       │   │   ├── ansi.cpython-310.pyc
│           │       │   │   ├── bar.cpython-310.pyc
│           │       │   │   ├── box.cpython-310.pyc
│           │       │   │   ├── cells.cpython-310.pyc
│           │       │   │   ├── _cell_widths.cpython-310.pyc
│           │       │   │   ├── color.cpython-310.pyc
│           │       │   │   ├── color_triplet.cpython-310.pyc
│           │       │   │   ├── columns.cpython-310.pyc
│           │       │   │   ├── console.cpython-310.pyc
│           │       │   │   ├── constrain.cpython-310.pyc
│           │       │   │   ├── containers.cpython-310.pyc
│           │       │   │   ├── control.cpython-310.pyc
│           │       │   │   ├── default_styles.cpython-310.pyc
│           │       │   │   ├── diagnose.cpython-310.pyc
│           │       │   │   ├── _emoji_codes.cpython-310.pyc
│           │       │   │   ├── emoji.cpython-310.pyc
│           │       │   │   ├── _emoji_replace.cpython-310.pyc
│           │       │   │   ├── errors.cpython-310.pyc
│           │       │   │   ├── _extension.cpython-310.pyc
│           │       │   │   ├── file_proxy.cpython-310.pyc
│           │       │   │   ├── filesize.cpython-310.pyc
│           │       │   │   ├── highlighter.cpython-310.pyc
│           │       │   │   ├── __init__.cpython-310.pyc
│           │       │   │   ├── _inspect.cpython-310.pyc
│           │       │   │   ├── json.cpython-310.pyc
│           │       │   │   ├── jupyter.cpython-310.pyc
│           │       │   │   ├── layout.cpython-310.pyc
│           │       │   │   ├── live.cpython-310.pyc
│           │       │   │   ├── live_render.cpython-310.pyc
│           │       │   │   ├── logging.cpython-310.pyc
│           │       │   │   ├── _log_render.cpython-310.pyc
│           │       │   │   ├── _loop.cpython-310.pyc
│           │       │   │   ├── _lru_cache.cpython-310.pyc
│           │       │   │   ├── __main__.cpython-310.pyc
│           │       │   │   ├── markup.cpython-310.pyc
│           │       │   │   ├── measure.cpython-310.pyc
│           │       │   │   ├── padding.cpython-310.pyc
│           │       │   │   ├── pager.cpython-310.pyc
│           │       │   │   ├── palette.cpython-310.pyc
│           │       │   │   ├── _palettes.cpython-310.pyc
│           │       │   │   ├── panel.cpython-310.pyc
│           │       │   │   ├── _pick.cpython-310.pyc
│           │       │   │   ├── pretty.cpython-310.pyc
│           │       │   │   ├── progress_bar.cpython-310.pyc
│           │       │   │   ├── progress.cpython-310.pyc
│           │       │   │   ├── prompt.cpython-310.pyc
│           │       │   │   ├── protocol.cpython-310.pyc
│           │       │   │   ├── _ratio.cpython-310.pyc
│           │       │   │   ├── region.cpython-310.pyc
│           │       │   │   ├── repr.cpython-310.pyc
│           │       │   │   ├── rule.cpython-310.pyc
│           │       │   │   ├── scope.cpython-310.pyc
│           │       │   │   ├── screen.cpython-310.pyc
│           │       │   │   ├── segment.cpython-310.pyc
│           │       │   │   ├── spinner.cpython-310.pyc
│           │       │   │   ├── _spinners.cpython-310.pyc
│           │       │   │   ├── _stack.cpython-310.pyc
│           │       │   │   ├── status.cpython-310.pyc
│           │       │   │   ├── style.cpython-310.pyc
│           │       │   │   ├── styled.cpython-310.pyc
│           │       │   │   ├── syntax.cpython-310.pyc
│           │       │   │   ├── table.cpython-310.pyc
│           │       │   │   ├── tabulate.cpython-310.pyc
│           │       │   │   ├── terminal_theme.cpython-310.pyc
│           │       │   │   ├── text.cpython-310.pyc
│           │       │   │   ├── theme.cpython-310.pyc
│           │       │   │   ├── themes.cpython-310.pyc
│           │       │   │   ├── _timer.cpython-310.pyc
│           │       │   │   ├── traceback.cpython-310.pyc
│           │       │   │   ├── tree.cpython-310.pyc
│           │       │   │   ├── _windows.cpython-310.pyc
│           │       │   │   └── _wrap.cpython-310.pyc
│           │       │   ├── _ratio.py
│           │       │   ├── region.py
│           │       │   ├── repr.py
│           │       │   ├── rule.py
│           │       │   ├── scope.py
│           │       │   ├── screen.py
│           │       │   ├── segment.py
│           │       │   ├── spinner.py
│           │       │   ├── _spinners.py
│           │       │   ├── _stack.py
│           │       │   ├── status.py
│           │       │   ├── styled.py
│           │       │   ├── style.py
│           │       │   ├── syntax.py
│           │       │   ├── table.py
│           │       │   ├── tabulate.py
│           │       │   ├── terminal_theme.py
│           │       │   ├── text.py
│           │       │   ├── theme.py
│           │       │   ├── themes.py
│           │       │   ├── _timer.py
│           │       │   ├── traceback.py
│           │       │   ├── tree.py
│           │       │   ├── _windows.py
│           │       │   └── _wrap.py
│           │       ├── six.py
│           │       ├── [01;34mtenacity[0m
│           │       │   ├── after.py
│           │       │   ├── _asyncio.py
│           │       │   ├── before.py
│           │       │   ├── before_sleep.py
│           │       │   ├── __init__.py
│           │       │   ├── nap.py
│           │       │   ├── [01;34m__pycache__[0m
│           │       │   │   ├── after.cpython-310.pyc
│           │       │   │   ├── _asyncio.cpython-310.pyc
│           │       │   │   ├── before.cpython-310.pyc
│           │       │   │   ├── before_sleep.cpython-310.pyc
│           │       │   │   ├── __init__.cpython-310.pyc
│           │       │   │   ├── nap.cpython-310.pyc
│           │       │   │   ├── retry.cpython-310.pyc
│           │       │   │   ├── stop.cpython-310.pyc
│           │       │   │   ├── tornadoweb.cpython-310.pyc
│           │       │   │   ├── _utils.cpython-310.pyc
│           │       │   │   └── wait.cpython-310.pyc
│           │       │   ├── retry.py
│           │       │   ├── stop.py
│           │       │   ├── tornadoweb.py
│           │       │   ├── _utils.py
│           │       │   └── wait.py
│           │       ├── [01;34mtomli[0m
│           │       │   ├── __init__.py
│           │       │   ├── _parser.py
│           │       │   ├── [01;34m__pycache__[0m
│           │       │   │   ├── __init__.cpython-310.pyc
│           │       │   │   ├── _parser.cpython-310.pyc
│           │       │   │   └── _re.cpython-310.pyc
│           │       │   └── _re.py
│           │       ├── typing_extensions.py
│           │       ├── [01;34murllib3[0m
│           │       │   ├── _collections.py
│           │       │   ├── connectionpool.py
│           │       │   ├── connection.py
│           │       │   ├── [01;34mcontrib[0m
│           │       │   │   ├── _appengine_environ.py
│           │       │   │   ├── appengine.py
│           │       │   │   ├── __init__.py
│           │       │   │   ├── ntlmpool.py
│           │       │   │   ├── [01;34m__pycache__[0m
│           │       │   │   │   ├── appengine.cpython-310.pyc
│           │       │   │   │   ├── _appengine_environ.cpython-310.pyc
│           │       │   │   │   ├── __init__.cpython-310.pyc
│           │       │   │   │   ├── ntlmpool.cpython-310.pyc
│           │       │   │   │   ├── pyopenssl.cpython-310.pyc
│           │       │   │   │   ├── securetransport.cpython-310.pyc
│           │       │   │   │   └── socks.cpython-310.pyc
│           │       │   │   ├── pyopenssl.py
│           │       │   │   ├── [01;34m_securetransport[0m
│           │       │   │   │   ├── bindings.py
│           │       │   │   │   ├── __init__.py
│           │       │   │   │   ├── low_level.py
│           │       │   │   │   └── [01;34m__pycache__[0m
│           │       │   │   │       ├── bindings.cpython-310.pyc
│           │       │   │   │       ├── __init__.cpython-310.pyc
│           │       │   │   │       └── low_level.cpython-310.pyc
│           │       │   │   ├── securetransport.py
│           │       │   │   └── socks.py
│           │       │   ├── exceptions.py
│           │       │   ├── fields.py
│           │       │   ├── filepost.py
│           │       │   ├── __init__.py
│           │       │   ├── [01;34mpackages[0m
│           │       │   │   ├── [01;34mbackports[0m
│           │       │   │   │   ├── __init__.py
│           │       │   │   │   ├── makefile.py
│           │       │   │   │   └── [01;34m__pycache__[0m
│           │       │   │   │       ├── __init__.cpython-310.pyc
│           │       │   │   │       └── makefile.cpython-310.pyc
│           │       │   │   ├── __init__.py
│           │       │   │   ├── [01;34m__pycache__[0m
│           │       │   │   │   ├── __init__.cpython-310.pyc
│           │       │   │   │   └── six.cpython-310.pyc
│           │       │   │   └── six.py
│           │       │   ├── poolmanager.py
│           │       │   ├── [01;34m__pycache__[0m
│           │       │   │   ├── _collections.cpython-310.pyc
│           │       │   │   ├── connection.cpython-310.pyc
│           │       │   │   ├── connectionpool.cpython-310.pyc
│           │       │   │   ├── exceptions.cpython-310.pyc
│           │       │   │   ├── fields.cpython-310.pyc
│           │       │   │   ├── filepost.cpython-310.pyc
│           │       │   │   ├── __init__.cpython-310.pyc
│           │       │   │   ├── poolmanager.cpython-310.pyc
│           │       │   │   ├── request.cpython-310.pyc
│           │       │   │   ├── response.cpython-310.pyc
│           │       │   │   └── _version.cpython-310.pyc
│           │       │   ├── request.py
│           │       │   ├── response.py
│           │       │   ├── [01;34mutil[0m
│           │       │   │   ├── connection.py
│           │       │   │   ├── __init__.py
│           │       │   │   ├── proxy.py
│           │       │   │   ├── [01;34m__pycache__[0m
│           │       │   │   │   ├── connection.cpython-310.pyc
│           │       │   │   │   ├── __init__.cpython-310.pyc
│           │       │   │   │   ├── proxy.cpython-310.pyc
│           │       │   │   │   ├── queue.cpython-310.pyc
│           │       │   │   │   ├── request.cpython-310.pyc
│           │       │   │   │   ├── response.cpython-310.pyc
│           │       │   │   │   ├── retry.cpython-310.pyc
│           │       │   │   │   ├── ssl_.cpython-310.pyc
│           │       │   │   │   ├── ssl_match_hostname.cpython-310.pyc
│           │       │   │   │   ├── ssltransport.cpython-310.pyc
│           │       │   │   │   ├── timeout.cpython-310.pyc
│           │       │   │   │   ├── url.cpython-310.pyc
│           │       │   │   │   └── wait.cpython-310.pyc
│           │       │   │   ├── queue.py
│           │       │   │   ├── request.py
│           │       │   │   ├── response.py
│           │       │   │   ├── retry.py
│           │       │   │   ├── ssl_match_hostname.py
│           │       │   │   ├── ssl_.py
│           │       │   │   ├── ssltransport.py
│           │       │   │   ├── timeout.py
│           │       │   │   ├── url.py
│           │       │   │   └── wait.py
│           │       │   └── _version.py
│           │       ├── vendor.txt
│           │       └── [01;34mwebencodings[0m
│           │           ├── __init__.py
│           │           ├── labels.py
│           │           ├── mklabels.py
│           │           ├── [01;34m__pycache__[0m
│           │           │   ├── __init__.cpython-310.pyc
│           │           │   ├── labels.cpython-310.pyc
│           │           │   ├── mklabels.cpython-310.pyc
│           │           │   ├── tests.cpython-310.pyc
│           │           │   └── x_user_defined.cpython-310.pyc
│           │           ├── tests.py
│           │           └── x_user_defined.py
│           ├── [01;34mpip-22.0.2.dist-info[0m
│           │   ├── entry_points.txt
│           │   ├── INSTALLER
│           │   ├── LICENSE.txt
│           │   ├── METADATA
│           │   ├── RECORD
│           │   ├── REQUESTED
│           │   ├── top_level.txt
│           │   └── WHEEL
│           ├── [01;34mpkg_resources[0m
│           │   ├── [01;34mextern[0m
│           │   │   ├── __init__.py
│           │   │   └── [01;34m__pycache__[0m
│           │   │       └── __init__.cpython-310.pyc
│           │   ├── __init__.py
│           │   ├── [01;34m__pycache__[0m
│           │   │   └── __init__.cpython-310.pyc
│           │   ├── [01;34mtests[0m
│           │   │   └── [01;34mdata[0m
│           │   │       └── [01;34mmy-test-package-source[0m
│           │   │           ├── [01;34m__pycache__[0m
│           │   │           │   └── setup.cpython-310.pyc
│           │   │           └── setup.py
│           │   └── [01;34m_vendor[0m
│           │       ├── appdirs.py
│           │       ├── __init__.py
│           │       ├── [01;34mpackaging[0m
│           │       │   ├── __about__.py
│           │       │   ├── __init__.py
│           │       │   ├── _manylinux.py
│           │       │   ├── markers.py
│           │       │   ├── _musllinux.py
│           │       │   ├── [01;34m__pycache__[0m
│           │       │   │   ├── __about__.cpython-310.pyc
│           │       │   │   ├── __init__.cpython-310.pyc
│           │       │   │   ├── _manylinux.cpython-310.pyc
│           │       │   │   ├── markers.cpython-310.pyc
│           │       │   │   ├── _musllinux.cpython-310.pyc
│           │       │   │   ├── requirements.cpython-310.pyc
│           │       │   │   ├── specifiers.cpython-310.pyc
│           │       │   │   ├── _structures.cpython-310.pyc
│           │       │   │   ├── tags.cpython-310.pyc
│           │       │   │   ├── utils.cpython-310.pyc
│           │       │   │   └── version.cpython-310.pyc
│           │       │   ├── requirements.py
│           │       │   ├── specifiers.py
│           │       │   ├── _structures.py
│           │       │   ├── tags.py
│           │       │   ├── utils.py
│           │       │   └── version.py
│           │       ├── [01;34m__pycache__[0m
│           │       │   ├── appdirs.cpython-310.pyc
│           │       │   ├── __init__.cpython-310.pyc
│           │       │   └── pyparsing.cpython-310.pyc
│           │       └── pyparsing.py
│           ├── [01;34msetuptools[0m
│           │   ├── archive_util.py
│           │   ├── build_meta.py
│           │   ├── cli-32.exe
│           │   ├── cli-64.exe
│           │   ├── cli-arm64.exe
│           │   ├── cli.exe
│           │   ├── [01;34mcommand[0m
│           │   │   ├── alias.py
│           │   │   ├── bdist_egg.py
│           │   │   ├── bdist_rpm.py
│           │   │   ├── build_clib.py
│           │   │   ├── build_ext.py
│           │   │   ├── build_py.py
│           │   │   ├── develop.py
│           │   │   ├── dist_info.py
│           │   │   ├── easy_install.py
│           │   │   ├── egg_info.py
│           │   │   ├── __init__.py
│           │   │   ├── install_egg_info.py
│           │   │   ├── install_lib.py
│           │   │   ├── install.py
│           │   │   ├── install_scripts.py
│           │   │   ├── launcher manifest.xml
│           │   │   ├── py36compat.py
│           │   │   ├── [01;34m__pycache__[0m
│           │   │   │   ├── alias.cpython-310.pyc
│           │   │   │   ├── bdist_egg.cpython-310.pyc
│           │   │   │   ├── bdist_rpm.cpython-310.pyc
│           │   │   │   ├── build_clib.cpython-310.pyc
│           │   │   │   ├── build_ext.cpython-310.pyc
│           │   │   │   ├── build_py.cpython-310.pyc
│           │   │   │   ├── develop.cpython-310.pyc
│           │   │   │   ├── dist_info.cpython-310.pyc
│           │   │   │   ├── easy_install.cpython-310.pyc
│           │   │   │   ├── egg_info.cpython-310.pyc
│           │   │   │   ├── __init__.cpython-310.pyc
│           │   │   │   ├── install.cpython-310.pyc
│           │   │   │   ├── install_egg_info.cpython-310.pyc
│           │   │   │   ├── install_lib.cpython-310.pyc
│           │   │   │   ├── install_scripts.cpython-310.pyc
│           │   │   │   ├── py36compat.cpython-310.pyc
│           │   │   │   ├── register.cpython-310.pyc
│           │   │   │   ├── rotate.cpython-310.pyc
│           │   │   │   ├── saveopts.cpython-310.pyc
│           │   │   │   ├── sdist.cpython-310.pyc
│           │   │   │   ├── setopt.cpython-310.pyc
│           │   │   │   ├── test.cpython-310.pyc
│           │   │   │   ├── upload.cpython-310.pyc
│           │   │   │   └── upload_docs.cpython-310.pyc
│           │   │   ├── register.py
│           │   │   ├── rotate.py
│           │   │   ├── saveopts.py
│           │   │   ├── sdist.py
│           │   │   ├── setopt.py
│           │   │   ├── test.py
│           │   │   ├── upload_docs.py
│           │   │   └── upload.py
│           │   ├── config.py
│           │   ├── depends.py
│           │   ├── _deprecation_warning.py
│           │   ├── dep_util.py
│           │   ├── dist.py
│           │   ├── [01;34m_distutils[0m
│           │   │   ├── archive_util.py
│           │   │   ├── bcppcompiler.py
│           │   │   ├── ccompiler.py
│           │   │   ├── cmd.py
│           │   │   ├── [01;34mcommand[0m
│           │   │   │   ├── bdist_dumb.py
│           │   │   │   ├── bdist_msi.py
│           │   │   │   ├── bdist.py
│           │   │   │   ├── bdist_rpm.py
│           │   │   │   ├── bdist_wininst.py
│           │   │   │   ├── build_clib.py
│           │   │   │   ├── build_ext.py
│           │   │   │   ├── build.py
│           │   │   │   ├── build_py.py
│           │   │   │   ├── build_scripts.py
│           │   │   │   ├── check.py
│           │   │   │   ├── clean.py
│           │   │   │   ├── config.py
│           │   │   │   ├── __init__.py
│           │   │   │   ├── install_data.py
│           │   │   │   ├── install_egg_info.py
│           │   │   │   ├── install_headers.py
│           │   │   │   ├── install_lib.py
│           │   │   │   ├── install.py
│           │   │   │   ├── install_scripts.py
│           │   │   │   ├── py37compat.py
│           │   │   │   ├── [01;34m__pycache__[0m
│           │   │   │   │   ├── bdist.cpython-310.pyc
│           │   │   │   │   ├── bdist_dumb.cpython-310.pyc
│           │   │   │   │   ├── bdist_msi.cpython-310.pyc
│           │   │   │   │   ├── bdist_rpm.cpython-310.pyc
│           │   │   │   │   ├── bdist_wininst.cpython-310.pyc
│           │   │   │   │   ├── build_clib.cpython-310.pyc
│           │   │   │   │   ├── build.cpython-310.pyc
│           │   │   │   │   ├── build_ext.cpython-310.pyc
│           │   │   │   │   ├── build_py.cpython-310.pyc
│           │   │   │   │   ├── build_scripts.cpython-310.pyc
│           │   │   │   │   ├── check.cpython-310.pyc
│           │   │   │   │   ├── clean.cpython-310.pyc
│           │   │   │   │   ├── config.cpython-310.pyc
│           │   │   │   │   ├── __init__.cpython-310.pyc
│           │   │   │   │   ├── install.cpython-310.pyc
│           │   │   │   │   ├── install_data.cpython-310.pyc
│           │   │   │   │   ├── install_egg_info.cpython-310.pyc
│           │   │   │   │   ├── install_headers.cpython-310.pyc
│           │   │   │   │   ├── install_lib.cpython-310.pyc
│           │   │   │   │   ├── install_scripts.cpython-310.pyc
│           │   │   │   │   ├── py37compat.cpython-310.pyc
│           │   │   │   │   ├── register.cpython-310.pyc
│           │   │   │   │   ├── sdist.cpython-310.pyc
│           │   │   │   │   └── upload.cpython-310.pyc
│           │   │   │   ├── register.py
│           │   │   │   ├── sdist.py
│           │   │   │   └── upload.py
│           │   │   ├── config.py
│           │   │   ├── core.py
│           │   │   ├── cygwinccompiler.py
│           │   │   ├── debug.py
│           │   │   ├── dep_util.py
│           │   │   ├── dir_util.py
│           │   │   ├── dist.py
│           │   │   ├── errors.py
│           │   │   ├── extension.py
│           │   │   ├── fancy_getopt.py
│           │   │   ├── filelist.py
│           │   │   ├── file_util.py
│           │   │   ├── __init__.py
│           │   │   ├── log.py
│           │   │   ├── msvc9compiler.py
│           │   │   ├── _msvccompiler.py
│           │   │   ├── msvccompiler.py
│           │   │   ├── py35compat.py
│           │   │   ├── py38compat.py
│           │   │   ├── [01;34m__pycache__[0m
│           │   │   │   ├── archive_util.cpython-310.pyc
│           │   │   │   ├── bcppcompiler.cpython-310.pyc
│           │   │   │   ├── ccompiler.cpython-310.pyc
│           │   │   │   ├── cmd.cpython-310.pyc
│           │   │   │   ├── config.cpython-310.pyc
│           │   │   │   ├── core.cpython-310.pyc
│           │   │   │   ├── cygwinccompiler.cpython-310.pyc
│           │   │   │   ├── debug.cpython-310.pyc
│           │   │   │   ├── dep_util.cpython-310.pyc
│           │   │   │   ├── dir_util.cpython-310.pyc
│           │   │   │   ├── dist.cpython-310.pyc
│           │   │   │   ├── errors.cpython-310.pyc
│           │   │   │   ├── extension.cpython-310.pyc
│           │   │   │   ├── fancy_getopt.cpython-310.pyc
│           │   │   │   ├── filelist.cpython-310.pyc
│           │   │   │   ├── file_util.cpython-310.pyc
│           │   │   │   ├── __init__.cpython-310.pyc
│           │   │   │   ├── log.cpython-310.pyc
│           │   │   │   ├── msvc9compiler.cpython-310.pyc
│           │   │   │   ├── _msvccompiler.cpython-310.pyc
│           │   │   │   ├── msvccompiler.cpython-310.pyc
│           │   │   │   ├── py35compat.cpython-310.pyc
│           │   │   │   ├── py38compat.cpython-310.pyc
│           │   │   │   ├── spawn.cpython-310.pyc
│           │   │   │   ├── sysconfig.cpython-310.pyc
│           │   │   │   ├── text_file.cpython-310.pyc
│           │   │   │   ├── unixccompiler.cpython-310.pyc
│           │   │   │   ├── util.cpython-310.pyc
│           │   │   │   ├── version.cpython-310.pyc
│           │   │   │   └── versionpredicate.cpython-310.pyc
│           │   │   ├── spawn.py
│           │   │   ├── sysconfig.py
│           │   │   ├── text_file.py
│           │   │   ├── unixccompiler.py
│           │   │   ├── util.py
│           │   │   ├── versionpredicate.py
│           │   │   └── version.py
│           │   ├── errors.py
│           │   ├── extension.py
│           │   ├── [01;34mextern[0m
│           │   │   ├── __init__.py
│           │   │   └── [01;34m__pycache__[0m
│           │   │       └── __init__.cpython-310.pyc
│           │   ├── glob.py
│           │   ├── gui-32.exe
│           │   ├── gui-64.exe
│           │   ├── gui-arm64.exe
│           │   ├── gui.exe
│           │   ├── _imp.py
│           │   ├── __init__.py
│           │   ├── installer.py
│           │   ├── launch.py
│           │   ├── monkey.py
│           │   ├── msvc.py
│           │   ├── namespaces.py
│           │   ├── package_index.py
│           │   ├── py34compat.py
│           │   ├── [01;34m__pycache__[0m
│           │   │   ├── archive_util.cpython-310.pyc
│           │   │   ├── build_meta.cpython-310.pyc
│           │   │   ├── config.cpython-310.pyc
│           │   │   ├── depends.cpython-310.pyc
│           │   │   ├── _deprecation_warning.cpython-310.pyc
│           │   │   ├── dep_util.cpython-310.pyc
│           │   │   ├── dist.cpython-310.pyc
│           │   │   ├── errors.cpython-310.pyc
│           │   │   ├── extension.cpython-310.pyc
│           │   │   ├── glob.cpython-310.pyc
│           │   │   ├── _imp.cpython-310.pyc
│           │   │   ├── __init__.cpython-310.pyc
│           │   │   ├── installer.cpython-310.pyc
│           │   │   ├── launch.cpython-310.pyc
│           │   │   ├── monkey.cpython-310.pyc
│           │   │   ├── msvc.cpython-310.pyc
│           │   │   ├── namespaces.cpython-310.pyc
│           │   │   ├── package_index.cpython-310.pyc
│           │   │   ├── py34compat.cpython-310.pyc
│           │   │   ├── sandbox.cpython-310.pyc
│           │   │   ├── unicode_utils.cpython-310.pyc
│           │   │   ├── version.cpython-310.pyc
│           │   │   ├── wheel.cpython-310.pyc
│           │   │   └── windows_support.cpython-310.pyc
│           │   ├── sandbox.py
│           │   ├── script (dev).tmpl
│           │   ├── script.tmpl
│           │   ├── unicode_utils.py
│           │   ├── [01;34m_vendor[0m
│           │   │   ├── __init__.py
│           │   │   ├── [01;34mmore_itertools[0m
│           │   │   │   ├── __init__.py
│           │   │   │   ├── more.py
│           │   │   │   ├── [01;34m__pycache__[0m
│           │   │   │   │   ├── __init__.cpython-310.pyc
│           │   │   │   │   ├── more.cpython-310.pyc
│           │   │   │   │   └── recipes.cpython-310.pyc
│           │   │   │   └── recipes.py
│           │   │   ├── ordered_set.py
│           │   │   ├── [01;34mpackaging[0m
│           │   │   │   ├── __about__.py
│           │   │   │   ├── __init__.py
│           │   │   │   ├── _manylinux.py
│           │   │   │   ├── markers.py
│           │   │   │   ├── _musllinux.py
│           │   │   │   ├── [01;34m__pycache__[0m
│           │   │   │   │   ├── __about__.cpython-310.pyc
│           │   │   │   │   ├── __init__.cpython-310.pyc
│           │   │   │   │   ├── _manylinux.cpython-310.pyc
│           │   │   │   │   ├── markers.cpython-310.pyc
│           │   │   │   │   ├── _musllinux.cpython-310.pyc
│           │   │   │   │   ├── requirements.cpython-310.pyc
│           │   │   │   │   ├── specifiers.cpython-310.pyc
│           │   │   │   │   ├── _structures.cpython-310.pyc
│           │   │   │   │   ├── tags.cpython-310.pyc
│           │   │   │   │   ├── utils.cpython-310.pyc
│           │   │   │   │   └── version.cpython-310.pyc
│           │   │   │   ├── requirements.py
│           │   │   │   ├── specifiers.py
│           │   │   │   ├── _structures.py
│           │   │   │   ├── tags.py
│           │   │   │   ├── utils.py
│           │   │   │   └── version.py
│           │   │   ├── [01;34m__pycache__[0m
│           │   │   │   ├── __init__.cpython-310.pyc
│           │   │   │   ├── ordered_set.cpython-310.pyc
│           │   │   │   └── pyparsing.cpython-310.pyc
│           │   │   └── pyparsing.py
│           │   ├── version.py
│           │   ├── wheel.py
│           │   └── windows_support.py
│           └── [01;34msetuptools-59.6.0.dist-info[0m
│               ├── entry_points.txt
│               ├── INSTALLER
│               ├── LICENSE
│               ├── METADATA
│               ├── RECORD
│               ├── REQUESTED
│               ├── top_level.txt
│               └── WHEEL
├── [01;36mlib64[0m -> [01;34mlib[0m
└── pyvenv.cfg

163 directories, 1342 files
```

---

## ***Activar el Entorno Virtual en un Contenedor***

---

### ***1. Activar el Entorno Virtual***

- *Para que el entorno virtual sea útil, necesitas activarlo. La activación modifica el entorno del shell para usar los binarios y paquetes del entorno virtual en lugar de los del sistema global. Puedes activar el entorno virtual utilizando uno de los siguientes comandos:*

```bash
source ./.venv/bin/activate
```

```bash
. ./.venv/bin/activate
```

**Explicación Detallada:**

- **`source`:** *Es un comando de shell utilizado para leer y ejecutar el contenido de un fichero en el contexto del shell actual. Cuando se usa `source ./.venv/bin/activate`, el comando ejecuta el script `activate` en el entorno actual, cambiando las variables de entorno para usar el entorno virtual.*

- **`.` (punto):** *Es un atajo para el comando `source` en algunos shells como `bash`. Así que `. ./.venv/bin/activate` hace exactamente lo mismo que `source ./.venv/bin/activate`, es decir, ejecuta el script `activate` en el contexto del shell actual.*

---

### ***2. Contenido del Directorio `./.venv/bin`***

- *En el directorio `./.venv/bin`, se almacenan varios scripts que son importantes para el funcionamiento del entorno virtual. Uno de los scripts principales es `activate`. Aquí se muestra el contenido del directorio:*

```bash
ls ./.venv/bin/ -l
total 36
-rw-r--r-- 1 d4nitrix13 d4nitrix13 9033 Aug 29 00:06 Activate.ps1
-rw-r--r-- 1 d4nitrix13 d4nitrix13 1979 Aug 29 00:06 activate
-rw-r--r-- 1 d4nitrix13 d4nitrix13  905 Aug 29 00:06 activate.csh
-rw-r--r-- 1 d4nitrix13 d4nitrix13 2185 Aug 29 00:06 activate.fish
-rwxrwxr-x 1 d4nitrix13 d4nitrix13  227 Aug 29 00:06 pip
-rwxrwxr-x 1 d4nitrix13 d4nitrix13  227 Aug 29 00:06 pip3
-rwxrwxr-x 1 d4nitrix13 d4nitrix13  227 Aug 29 00:06 pip3.10
lrwxrwxrwx 1 d4nitrix13 d4nitrix13    7 Aug 29 00:06 python -> python3
lrwxrwxrwx 1 d4nitrix13 d4nitrix13   16 Aug 29 00:06 python3 -> /usr/bin/python3
lrwxrwxrwx 1 d4nitrix13 d4nitrix13    7 Aug 29 00:06 python3.10 -> python3
```

**Explicación Detallada:**

- **`Activate.ps1`:** *Un script de activación para PowerShell en sistemas Windows. Utilizado en entornos de Windows para activar el entorno virtual.*

- **`activate`:** *Es el script principal para activar el entorno virtual en `bash` y otros shells similares en sistemas Unix. Este script configura el entorno del shell para usar los binarios y paquetes del entorno virtual.*

- **`activate.csh`:** *Un script de activación para `csh` (C Shell). Utilizado en sistemas Unix con el shell `csh` para activar el entorno virtual.*

- **`activate.fish`:** *Un script de activación para el shell `fish` (Friendly Interactive Shell). Utilizado en sistemas Unix con el shell `fish` para activar el entorno virtual.*

- **`pip`, `pip3`, `pip3.10`:** *Son ejecutables para gestionar paquetes en el entorno virtual. Son enlaces simbólicos a los binarios de `pip` instalados en el entorno virtual.*

- **`python`, `python3`, `python3.10`:** *Son enlaces simbólicos a los binarios de Python en el entorno virtual, que apuntan a los binarios de Python instalados en el contenedor.*

---

### ***3. Revisar el Contenido del Script `activate`***

- *Para entender cómo el script `activate` configura el entorno, puedes visualizar su contenido:*

```bash
cat ./.venv/bin/activate
```

**Explicación Detallada:**

- **`cat`:** *Este comando muestra el contenido de un fichero en la terminal. Al usar `cat ./.venv/bin/activate`, se visualiza el contenido del script `activate`, permitiendo inspeccionar cómo se configuran las variables de entorno y qué configuraciones se realizan para activar el entorno virtual.*

```bash
# This file must be used with "source bin/activate" *from bash*
# you cannot run it directly

deactivate () {
    # reset old environment variables
    if [ -n "${_OLD_VIRTUAL_PATH:-}" ] ; then
        PATH="${_OLD_VIRTUAL_PATH:-}"
        export PATH
        unset _OLD_VIRTUAL_PATH
    fi
    if [ -n "${_OLD_VIRTUAL_PYTHONHOME:-}" ] ; then
        PYTHONHOME="${_OLD_VIRTUAL_PYTHONHOME:-}"
        export PYTHONHOME
        unset _OLD_VIRTUAL_PYTHONHOME
    fi

    # This should detect bash and zsh, which have a hash command that must
    # be called to get it to forget past commands.  Without forgetting
    # past commands the $PATH changes we made may not be respected
    if [ -n "${BASH:-}" -o -n "${ZSH_VERSION:-}" ] ; then
        hash -r 2> /dev/null
    fi

    if [ -n "${_OLD_VIRTUAL_PS1:-}" ] ; then
        PS1="${_OLD_VIRTUAL_PS1:-}"
        export PS1
        unset _OLD_VIRTUAL_PS1
    fi

    unset VIRTUAL_ENV
    unset VIRTUAL_ENV_PROMPT
    if [ ! "${1:-}" = "nondestructive" ] ; then
    # Self destruct!
        unset -f deactivate
    fi
}

# unset irrelevant variables
deactivate nondestructive

VIRTUAL_ENV="/App/.venv"
export VIRTUAL_ENV

_OLD_VIRTUAL_PATH="$PATH"
PATH="$VIRTUAL_ENV/bin:$PATH"
export PATH

# unset PYTHONHOME if set
# this will fail if PYTHONHOME is set to the empty string (which is bad anyway)
# could use `if (set -u; : $PYTHONHOME) ;` in bash
if [ -n "${PYTHONHOME:-}" ] ; then
    _OLD_VIRTUAL_PYTHONHOME="${PYTHONHOME:-}"
    unset PYTHONHOME
fi

if [ -z "${VIRTUAL_ENV_DISABLE_PROMPT:-}" ] ; then
    _OLD_VIRTUAL_PS1="${PS1:-}"
    PS1="(.venv) ${PS1:-}"
    export PS1
    VIRTUAL_ENV_PROMPT="(.venv) "
    export VIRTUAL_ENV_PROMPT
fi

# This should detect bash and zsh, which have a hash command that must
# be called to get it to forget past commands.  Without forgetting
# past commands the $PATH changes we made may not be respected
if [ -n "${BASH:-}" -o -n "${ZSH_VERSION:-}" ] ; then
    hash -r 2> /dev/null
fi
d4nitrix13@08b7c877e9f3:/App$ ^C
d4nitrix13@08b7c877e9f3:/App$ cat ./.venv/bin/activate
# This file must be used with "source bin/activate" *from bash*
# you cannot run it directly

deactivate () {
    # reset old environment variables
    if [ -n "${_OLD_VIRTUAL_PATH:-}" ] ; then
        PATH="${_OLD_VIRTUAL_PATH:-}"
        export PATH
        unset _OLD_VIRTUAL_PATH
    fi
    if [ -n "${_OLD_VIRTUAL_PYTHONHOME:-}" ] ; then
        PYTHONHOME="${_OLD_VIRTUAL_PYTHONHOME:-}"
        export PYTHONHOME
        unset _OLD_VIRTUAL_PYTHONHOME
    fi

    # This should detect bash and zsh, which have a hash command that must
    # be called to get it to forget past commands.  Without forgetting
    # past commands the $PATH changes we made may not be respected
    if [ -n "${BASH:-}" -o -n "${ZSH_VERSION:-}" ] ; then
        hash -r 2> /dev/null
    fi

    if [ -n "${_OLD_VIRTUAL_PS1:-}" ] ; then
        PS1="${_OLD_VIRTUAL_PS1:-}"
        export PS1
        unset _OLD_VIRTUAL_PS1
    fi

    unset VIRTUAL_ENV
    unset VIRTUAL_ENV_PROMPT
    if [ ! "${1:-}" = "nondestructive" ] ; then
    # Self destruct!
        unset -f deactivate
    fi
}

# unset irrelevant variables
deactivate nondestructive

VIRTUAL_ENV="/App/.venv"
export VIRTUAL_ENV

_OLD_VIRTUAL_PATH="$PATH"
PATH="$VIRTUAL_ENV/bin:$PATH"
export PATH

# unset PYTHONHOME if set
# this will fail if PYTHONHOME is set to the empty string (which is bad anyway)
# could use `if (set -u; : $PYTHONHOME) ;` in bash
if [ -n "${PYTHONHOME:-}" ] ; then
    _OLD_VIRTUAL_PYTHONHOME="${PYTHONHOME:-}"
    unset PYTHONHOME
fi

if [ -z "${VIRTUAL_ENV_DISABLE_PROMPT:-}" ] ; then
    _OLD_VIRTUAL_PS1="${PS1:-}"
    PS1="(.venv) ${PS1:-}"
    export PS1
    VIRTUAL_ENV_PROMPT="(.venv) "
    export VIRTUAL_ENV_PROMPT
fi

# This should detect bash and zsh, which have a hash command that must
# be called to get it to forget past commands.  Without forgetting
# past commands the $PATH changes we made may not be respected
if [ -n "${BASH:-}" -o -n "${ZSH_VERSION:-}" ] ; then
    hash -r 2> /dev/null
fi
```

---

## ***Activar el Entorno Virtual y Instalar Flask en un Contenedor***

- *Una vez que hayas activado el entorno virtual, el prompt del terminal debería cambiar para indicar que el entorno virtual está activo. Esto se debe a que el entorno virtual modifica el prompt para reflejar su nombre y señalar que estás trabajando dentro de él.*

```bash
. ./.venv/bin/activate
(.venv) d4nitrix13@08b7c877e9f3:/App$
```

**Explicación Detallada:**

- **`source ./.venv/bin/activate` o `. ./.venv/bin/activate`:** *Estos comandos activan el entorno virtual. Tras ejecutar uno de estos comandos, el prompt cambia para incluir el nombre del entorno virtual entre paréntesis, indicando que el entorno virtual está activo. En este caso, el prompt muestra `(.venv)`, lo que indica que estás trabajando dentro del entorno virtual llamado `.venv`.*

- **Cambio en el Prompt:** *El cambio en el prompt (`(.venv) d4nitrix13@08b7c877e9f3:/App$`) indica que el entorno virtual está activo. Esto es útil para recordar que cualquier comando que ejecutes, como la instalación de paquetes, se realizará dentro del entorno virtual, no en el sistema global.*

---

### ***2. Instalar Flask en el Entorno Virtual***

- *Con el entorno virtual activado, ahora puedes instalar paquetes específicos para tu proyecto sin afectar el sistema global. Para instalar Flask dentro del entorno virtual, usa el siguiente comando:*

```bash
(.venv) d4nitrix13@08b7c877e9f3:/App$ pip install flask
```

**Explicación Detallada:**

- **`pip install flask`:** *Este comando instala el paquete `flask` usando `pip`, el gestor de paquetes de Python. Al ejecutar este comando dentro de un entorno virtual, `pip` instala Flask únicamente en el entorno virtual `.venv`, no en el sistema global. Esto asegura que las dependencias de tu proyecto están aisladas y no interfieren con otros proyectos o con el sistema.*

- **`(.venv)`:** *El prefijo en el prompt indica que el entorno virtual está activo. Esto garantiza que cualquier paquete instalado con `pip` se ubicará en el directorio del entorno virtual y no afectará el Python del sistema global.*

```bash
(.venv) d4nitrix13@08b7c877e9f3:/App$ pip install flask
Collecting flask
  Downloading flask-3.0.3-py3-none-any.whl (101 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 101.7/101.7 KB 525.8 kB/s eta 0:00:00
Collecting Jinja2>=3.1.2
  Downloading jinja2-3.1.4-py3-none-any.whl (133 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 133.3/133.3 KB 1.5 MB/s eta 0:00:00
Collecting itsdangerous>=2.1.2
  Downloading itsdangerous-2.2.0-py3-none-any.whl (16 kB)
Collecting click>=8.1.3
  Downloading click-8.1.7-py3-none-any.whl (97 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 97.9/97.9 KB 5.8 MB/s eta 0:00:00
Collecting blinker>=1.6.2
  Downloading blinker-1.8.2-py3-none-any.whl (9.5 kB)
Collecting Werkzeug>=3.0.0
  Downloading werkzeug-3.0.4-py3-none-any.whl (227 kB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 227.6/227.6 KB 5.9 MB/s eta 0:00:00
Collecting MarkupSafe>=2.0
  Downloading MarkupSafe-2.1.5-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (25 kB)
Installing collected packages: MarkupSafe, itsdangerous, click, blinker, Werkzeug, Jinja2, flask
Successfully installed Jinja2-3.1.4 MarkupSafe-2.1.5 Werkzeug-3.0.4 blinker-1.8.2 click-8.1.7 flask-3.0.3 itsdangerous-2.2.0
```

---

## ***Creación y Verificación del Ejecutable `flask` en el Entorno Virtual***

---

### ***1. Verificar la Creación del Ejecutable `flask`***

- *Al instalar Flask en el entorno virtual, se crea un ejecutable llamado `flask` en el directorio `.venv/bin`. Este ejecutable es un script en Python que permite ejecutar comandos relacionados con Flask directamente desde la línea de comandos.*

```bash
(.venv) d4nitrix13@08b7c877e9f3:/App$ ls ./.venv/bin/ -l
total 40
-rw-r--r-- 1 d4nitrix13 d4nitrix13 9033 Aug 29 00:06 Activate.ps1
-rw-r--r-- 1 d4nitrix13 d4nitrix13 1979 Aug 29 00:06 activate
-rw-r--r-- 1 d4nitrix13 d4nitrix13  905 Aug 29 00:06 activate.csh
-rw-r--r-- 1 d4nitrix13 d4nitrix13 2185 Aug 29 00:06 activate.fish
-rwxrwxr-x 1 d4nitrix13 d4nitrix13  214 Aug 29 00:27 flask
-rwxrwxr-x 1 d4nitrix13 d4nitrix13  227 Aug 29 00:06 pip
-rwxrwxr-x 1 d4nitrix13 d4nitrix13  227 Aug 29 00:06 pip3
-rwxrwxr-x 1 d4nitrix13 d4nitrix13  227 Aug 29 00:06 pip3.10
lrwxrwxrwx 1 d4nitrix13 d4nitrix13    7 Aug 29 00:06 python -> python3
lrwxrwxrwx 1 d4nitrix13 d4nitrix13   16 Aug 29 00:06 python3 -> /usr/bin/python3
lrwxrwxrwx 1 d4nitrix13 d4nitrix13    7 Aug 29 00:06 python3.10 -> python3
```

**Explicación Detallada:**

- **`flask`:** *Este fichero es un script en Python que se ha creado como parte de la instalación del paquete Flask en el entorno virtual. El fichero tiene permisos de ejecución (`-rwxrwxr-x`), lo que permite que se ejecute como un programa.*

- **Otros Ficheros en `.venv/bin`:**
  - **`activate`, `activate.csh`, `activate.fish`:** *Estos son scripts para activar el entorno virtual en diferentes shells (Bash, CSH, Fish).*
  - **`pip`, `pip3`, `pip3.10`:** *Son ejecutables de `pip` para gestionar paquetes Python dentro del entorno virtual.*
  - **`python`, `python3`, `python3.10`:** *Son enlaces simbólicos a la versión de Python utilizada en el contenedor.*

---

### ***2. Contenido del Script `flask`***

- *El fichero `flask` en el directorio `.venv/bin/` es un script en Python que permite ejecutar el CLI de Flask. Aquí está el contenido del script:*

```bash
#!/App/.venv/bin/python3
# -*- coding: utf-8 -*-
import re
import sys
from flask.cli import main
if __name__ == '__main__':
    sys.argv[0] = re.sub(r'(-script\.pyw|\.exe)?$', '', sys.argv[0])
    sys.exit(main())
```

**Explicación Detallada:**

- **`#!/App/.venv/bin/python3`:** *Esta línea es el "shebang" que indica que el script debe ejecutarse utilizando el intérprete de Python localizado en el directorio `.venv/bin`. Especifica la ruta al ejecutable de Python dentro del entorno virtual.*

- **`import re`, `import sys`:** *Estos módulos de Python se utilizan para manipular cadenas de texto y manejar argumentos de la línea de comandos.*

- **`from flask.cli import main`:** *Importa la función `main` del módulo `flask.cli`, que es el punto de entrada para los comandos de la línea de comandos de Flask.*

- **`if __name__ == '__main__':`:** *Este bloque asegura que el script solo se ejecute si se llama directamente desde la línea de comandos, no si se importa como un módulo.*

- **`sys.argv[0] = re.sub(r'(-script\.pyw|\.exe)?$', '', sys.argv[0])`:** *Limpia el nombre del script de posibles sufijos como `-script.pyw` o `.exe`, adaptando el nombre del fichero para ser compatible con diferentes plataformas.*

- **`sys.exit(main())`:** *Ejecuta la función `main()` del módulo Flask y termina el script con el código de salida proporcionado por `main()`. Esto permite que los comandos de Flask sean ejecutados desde la línea de comandos.*

---

### ***3. Verificación de las Dependencias de Flask***

- *Además del ejecutable `flask`, las dependencias necesarias para que Flask funcione se instalan en el directorio `.venv/lib/python3.10/site-packages/`.*

**Explicación Detallada:**

- **`site-packages`:** *Este directorio contiene todos los paquetes instalados dentro del entorno virtual, incluyendo Flask y sus dependencias. Es donde `pip` instala los paquetes que se especifican en el entorno virtual.*

- *Al instalar Flask en el entorno virtual, `pip` descarga e instala Flask y cualquier paquete relacionado que sea necesario para su funcionamiento en el directorio `site-packages`, asegurando que todas las dependencias están disponibles para tu proyecto sin afectar el entorno global de Python.*

```bash
(.venv) d4nitrix13@08b7c877e9f3:/App$ ls ./.venv/lib/python3.10/site-packages/ -l
total 84
drwxrwxr-x 2 d4nitrix13 d4nitrix13 4096 Aug 29 00:27 MarkupSafe-2.1.5.dist-info
drwxrwxr-x 3 d4nitrix13 d4nitrix13 4096 Aug 29 00:06 _distutils_hack
drwxrwxr-x 3 d4nitrix13 d4nitrix13 4096 Aug 29 00:27 blinker
drwxrwxr-x 2 d4nitrix13 d4nitrix13 4096 Aug 29 00:27 blinker-1.8.2.dist-info
drwxrwxr-x 3 d4nitrix13 d4nitrix13 4096 Aug 29 00:27 click
drwxrwxr-x 2 d4nitrix13 d4nitrix13 4096 Aug 29 00:27 click-8.1.7.dist-info
-rw-rw-r-- 1 d4nitrix13 d4nitrix13  152 Aug 29 00:06 distutils-precedence.pth
drwxrwxr-x 5 d4nitrix13 d4nitrix13 4096 Aug 29 00:27 flask
drwxrwxr-x 2 d4nitrix13 d4nitrix13 4096 Aug 29 00:27 flask-3.0.3.dist-info
drwxrwxr-x 3 d4nitrix13 d4nitrix13 4096 Aug 29 00:27 itsdangerous
drwxrwxr-x 2 d4nitrix13 d4nitrix13 4096 Aug 29 00:27 itsdangerous-2.2.0.dist-info
drwxrwxr-x 3 d4nitrix13 d4nitrix13 4096 Aug 29 00:27 jinja2
drwxrwxr-x 2 d4nitrix13 d4nitrix13 4096 Aug 29 00:27 jinja2-3.1.4.dist-info
drwxrwxr-x 3 d4nitrix13 d4nitrix13 4096 Aug 29 00:27 markupsafe
drwxrwxr-x 5 d4nitrix13 d4nitrix13 4096 Aug 29 00:06 pip
drwxrwxr-x 2 d4nitrix13 d4nitrix13 4096 Aug 29 00:06 pip-22.0.2.dist-info
drwxrwxr-x 6 d4nitrix13 d4nitrix13 4096 Aug 29 00:06 pkg_resources
drwxrwxr-x 7 d4nitrix13 d4nitrix13 4096 Aug 29 00:06 setuptools
drwxrwxr-x 2 d4nitrix13 d4nitrix13 4096 Aug 29 00:06 setuptools-59.6.0.dist-info
drwxrwxr-x 9 d4nitrix13 d4nitrix13 4096 Aug 29 00:27 werkzeug
drwxrwxr-x 2 d4nitrix13 d4nitrix13 4096 Aug 29 00:27 werkzeug-3.0.4.dist-info
```

```bash
[01;34m.venv/lib/python3.10/site-packages/[0m
├── [01;34mblinker[0m
│   ├── base.py
│   ├── __init__.py
│   ├── [01;34m__pycache__[0m
│   │   ├── base.cpython-310.pyc
│   │   ├── __init__.cpython-310.pyc
│   │   └── _utilities.cpython-310.pyc
│   ├── py.typed
│   └── _utilities.py
├── [01;34mblinker-1.8.2.dist-info[0m
│   ├── INSTALLER
│   ├── LICENSE.txt
│   ├── METADATA
│   ├── RECORD
│   └── WHEEL
├── [01;34mclick[0m
│   ├── _compat.py
│   ├── core.py
│   ├── decorators.py
│   ├── exceptions.py
│   ├── formatting.py
│   ├── globals.py
│   ├── __init__.py
│   ├── parser.py
│   ├── [01;34m__pycache__[0m
│   │   ├── _compat.cpython-310.pyc
│   │   ├── core.cpython-310.pyc
│   │   ├── decorators.cpython-310.pyc
│   │   ├── exceptions.cpython-310.pyc
│   │   ├── formatting.cpython-310.pyc
│   │   ├── globals.cpython-310.pyc
│   │   ├── __init__.cpython-310.pyc
│   │   ├── parser.cpython-310.pyc
│   │   ├── shell_completion.cpython-310.pyc
│   │   ├── termui.cpython-310.pyc
│   │   ├── _termui_impl.cpython-310.pyc
│   │   ├── testing.cpython-310.pyc
│   │   ├── _textwrap.cpython-310.pyc
│   │   ├── types.cpython-310.pyc
│   │   ├── utils.cpython-310.pyc
│   │   └── _winconsole.cpython-310.pyc
│   ├── py.typed
│   ├── shell_completion.py
│   ├── _termui_impl.py
│   ├── termui.py
│   ├── testing.py
│   ├── _textwrap.py
│   ├── types.py
│   ├── utils.py
│   └── _winconsole.py
├── [01;34mclick-8.1.7.dist-info[0m
│   ├── INSTALLER
│   ├── LICENSE.rst
│   ├── METADATA
│   ├── RECORD
│   ├── top_level.txt
│   └── WHEEL
├── [01;34m_distutils_hack[0m
│   ├── __init__.py
│   ├── override.py
│   └── [01;34m__pycache__[0m
│       ├── __init__.cpython-310.pyc
│       └── override.cpython-310.pyc
├── distutils-precedence.pth
├── [01;34mflask[0m
│   ├── app.py
│   ├── blueprints.py
│   ├── cli.py
│   ├── config.py
│   ├── ctx.py
│   ├── debughelpers.py
│   ├── globals.py
│   ├── helpers.py
│   ├── __init__.py
│   ├── [01;34mjson[0m
│   │   ├── __init__.py
│   │   ├── provider.py
│   │   ├── [01;34m__pycache__[0m
│   │   │   ├── __init__.cpython-310.pyc
│   │   │   ├── provider.cpython-310.pyc
│   │   │   └── tag.cpython-310.pyc
│   │   └── tag.py
│   ├── logging.py
│   ├── __main__.py
│   ├── [01;34m__pycache__[0m
│   │   ├── app.cpython-310.pyc
│   │   ├── blueprints.cpython-310.pyc
│   │   ├── cli.cpython-310.pyc
│   │   ├── config.cpython-310.pyc
│   │   ├── ctx.cpython-310.pyc
│   │   ├── debughelpers.cpython-310.pyc
│   │   ├── globals.cpython-310.pyc
│   │   ├── helpers.cpython-310.pyc
│   │   ├── __init__.cpython-310.pyc
│   │   ├── logging.cpython-310.pyc
│   │   ├── __main__.cpython-310.pyc
│   │   ├── sessions.cpython-310.pyc
│   │   ├── signals.cpython-310.pyc
│   │   ├── templating.cpython-310.pyc
│   │   ├── testing.cpython-310.pyc
│   │   ├── typing.cpython-310.pyc
│   │   ├── views.cpython-310.pyc
│   │   └── wrappers.cpython-310.pyc
│   ├── py.typed
│   ├── [01;34msansio[0m
│   │   ├── app.py
│   │   ├── blueprints.py
│   │   ├── [01;34m__pycache__[0m
│   │   │   ├── app.cpython-310.pyc
│   │   │   ├── blueprints.cpython-310.pyc
│   │   │   └── scaffold.cpython-310.pyc
│   │   ├── README.md
│   │   └── scaffold.py
│   ├── sessions.py
│   ├── signals.py
│   ├── templating.py
│   ├── testing.py
│   ├── typing.py
│   ├── views.py
│   └── wrappers.py
├── [01;34mflask-3.0.3.dist-info[0m
│   ├── entry_points.txt
│   ├── INSTALLER
│   ├── LICENSE.txt
│   ├── METADATA
│   ├── RECORD
│   ├── REQUESTED
│   └── WHEEL
├── [01;34mitsdangerous[0m
│   ├── encoding.py
│   ├── exc.py
│   ├── __init__.py
│   ├── _json.py
│   ├── [01;34m__pycache__[0m
│   │   ├── encoding.cpython-310.pyc
│   │   ├── exc.cpython-310.pyc
│   │   ├── __init__.cpython-310.pyc
│   │   ├── _json.cpython-310.pyc
│   │   ├── serializer.cpython-310.pyc
│   │   ├── signer.cpython-310.pyc
│   │   ├── timed.cpython-310.pyc
│   │   └── url_safe.cpython-310.pyc
│   ├── py.typed
│   ├── serializer.py
│   ├── signer.py
│   ├── timed.py
│   └── url_safe.py
├── [01;34mitsdangerous-2.2.0.dist-info[0m
│   ├── INSTALLER
│   ├── LICENSE.txt
│   ├── METADATA
│   ├── RECORD
│   └── WHEEL
├── [01;34mjinja2[0m
│   ├── async_utils.py
│   ├── bccache.py
│   ├── compiler.py
│   ├── constants.py
│   ├── debug.py
│   ├── defaults.py
│   ├── environment.py
│   ├── exceptions.py
│   ├── ext.py
│   ├── filters.py
│   ├── _identifier.py
│   ├── idtracking.py
│   ├── __init__.py
│   ├── lexer.py
│   ├── loaders.py
│   ├── meta.py
│   ├── nativetypes.py
│   ├── nodes.py
│   ├── optimizer.py
│   ├── parser.py
│   ├── [01;34m__pycache__[0m
│   │   ├── async_utils.cpython-310.pyc
│   │   ├── bccache.cpython-310.pyc
│   │   ├── compiler.cpython-310.pyc
│   │   ├── constants.cpython-310.pyc
│   │   ├── debug.cpython-310.pyc
│   │   ├── defaults.cpython-310.pyc
│   │   ├── environment.cpython-310.pyc
│   │   ├── exceptions.cpython-310.pyc
│   │   ├── ext.cpython-310.pyc
│   │   ├── filters.cpython-310.pyc
│   │   ├── _identifier.cpython-310.pyc
│   │   ├── idtracking.cpython-310.pyc
│   │   ├── __init__.cpython-310.pyc
│   │   ├── lexer.cpython-310.pyc
│   │   ├── loaders.cpython-310.pyc
│   │   ├── meta.cpython-310.pyc
│   │   ├── nativetypes.cpython-310.pyc
│   │   ├── nodes.cpython-310.pyc
│   │   ├── optimizer.cpython-310.pyc
│   │   ├── parser.cpython-310.pyc
│   │   ├── runtime.cpython-310.pyc
│   │   ├── sandbox.cpython-310.pyc
│   │   ├── tests.cpython-310.pyc
│   │   ├── utils.cpython-310.pyc
│   │   └── visitor.cpython-310.pyc
│   ├── py.typed
│   ├── runtime.py
│   ├── sandbox.py
│   ├── tests.py
│   ├── utils.py
│   └── visitor.py
├── [01;34mjinja2-3.1.4.dist-info[0m
│   ├── entry_points.txt
│   ├── INSTALLER
│   ├── LICENSE.txt
│   ├── METADATA
│   ├── RECORD
│   └── WHEEL
├── [01;34mmarkupsafe[0m
│   ├── __init__.py
│   ├── _native.py
│   ├── [01;34m__pycache__[0m
│   │   ├── __init__.cpython-310.pyc
│   │   └── _native.cpython-310.pyc
│   ├── py.typed
│   ├── _speedups.c
│   ├── [01;32m_speedups.cpython-310-x86_64-linux-gnu.so[0m
│   └── _speedups.pyi
├── [01;34mMarkupSafe-2.1.5.dist-info[0m
│   ├── INSTALLER
│   ├── LICENSE.rst
│   ├── METADATA
│   ├── RECORD
│   ├── top_level.txt
│   └── WHEEL
├── [01;34mpip[0m
│   ├── __init__.py
│   ├── [01;34m_internal[0m
│   │   ├── build_env.py
│   │   ├── cache.py
│   │   ├── [01;34mcli[0m
│   │   │   ├── autocompletion.py
│   │   │   ├── base_command.py
│   │   │   ├── cmdoptions.py
│   │   │   ├── command_context.py
│   │   │   ├── __init__.py
│   │   │   ├── main_parser.py
│   │   │   ├── main.py
│   │   │   ├── parser.py
│   │   │   ├── progress_bars.py
│   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   ├── autocompletion.cpython-310.pyc
│   │   │   │   ├── base_command.cpython-310.pyc
│   │   │   │   ├── cmdoptions.cpython-310.pyc
│   │   │   │   ├── command_context.cpython-310.pyc
│   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   ├── main.cpython-310.pyc
│   │   │   │   ├── main_parser.cpython-310.pyc
│   │   │   │   ├── parser.cpython-310.pyc
│   │   │   │   ├── progress_bars.cpython-310.pyc
│   │   │   │   ├── req_command.cpython-310.pyc
│   │   │   │   ├── spinners.cpython-310.pyc
│   │   │   │   └── status_codes.cpython-310.pyc
│   │   │   ├── req_command.py
│   │   │   ├── spinners.py
│   │   │   └── status_codes.py
│   │   ├── [01;34mcommands[0m
│   │   │   ├── cache.py
│   │   │   ├── check.py
│   │   │   ├── completion.py
│   │   │   ├── configuration.py
│   │   │   ├── debug.py
│   │   │   ├── download.py
│   │   │   ├── freeze.py
│   │   │   ├── hash.py
│   │   │   ├── help.py
│   │   │   ├── index.py
│   │   │   ├── __init__.py
│   │   │   ├── install.py
│   │   │   ├── list.py
│   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   ├── cache.cpython-310.pyc
│   │   │   │   ├── check.cpython-310.pyc
│   │   │   │   ├── completion.cpython-310.pyc
│   │   │   │   ├── configuration.cpython-310.pyc
│   │   │   │   ├── debug.cpython-310.pyc
│   │   │   │   ├── download.cpython-310.pyc
│   │   │   │   ├── freeze.cpython-310.pyc
│   │   │   │   ├── hash.cpython-310.pyc
│   │   │   │   ├── help.cpython-310.pyc
│   │   │   │   ├── index.cpython-310.pyc
│   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   ├── install.cpython-310.pyc
│   │   │   │   ├── list.cpython-310.pyc
│   │   │   │   ├── search.cpython-310.pyc
│   │   │   │   ├── show.cpython-310.pyc
│   │   │   │   ├── uninstall.cpython-310.pyc
│   │   │   │   └── wheel.cpython-310.pyc
│   │   │   ├── search.py
│   │   │   ├── show.py
│   │   │   ├── uninstall.py
│   │   │   └── wheel.py
│   │   ├── configuration.py
│   │   ├── [01;34mdistributions[0m
│   │   │   ├── base.py
│   │   │   ├── __init__.py
│   │   │   ├── installed.py
│   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   ├── base.cpython-310.pyc
│   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   ├── installed.cpython-310.pyc
│   │   │   │   ├── sdist.cpython-310.pyc
│   │   │   │   └── wheel.cpython-310.pyc
│   │   │   ├── sdist.py
│   │   │   └── wheel.py
│   │   ├── exceptions.py
│   │   ├── [01;34mindex[0m
│   │   │   ├── collector.py
│   │   │   ├── __init__.py
│   │   │   ├── package_finder.py
│   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   ├── collector.cpython-310.pyc
│   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   ├── package_finder.cpython-310.pyc
│   │   │   │   └── sources.cpython-310.pyc
│   │   │   └── sources.py
│   │   ├── __init__.py
│   │   ├── [01;34mlocations[0m
│   │   │   ├── base.py
│   │   │   ├── _distutils.py
│   │   │   ├── __init__.py
│   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   ├── base.cpython-310.pyc
│   │   │   │   ├── _distutils.cpython-310.pyc
│   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   └── _sysconfig.cpython-310.pyc
│   │   │   └── _sysconfig.py
│   │   ├── main.py
│   │   ├── [01;34mmetadata[0m
│   │   │   ├── base.py
│   │   │   ├── __init__.py
│   │   │   ├── pkg_resources.py
│   │   │   └── [01;34m__pycache__[0m
│   │   │       ├── base.cpython-310.pyc
│   │   │       ├── __init__.cpython-310.pyc
│   │   │       └── pkg_resources.cpython-310.pyc
│   │   ├── [01;34mmodels[0m
│   │   │   ├── candidate.py
│   │   │   ├── direct_url.py
│   │   │   ├── format_control.py
│   │   │   ├── index.py
│   │   │   ├── __init__.py
│   │   │   ├── link.py
│   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   ├── candidate.cpython-310.pyc
│   │   │   │   ├── direct_url.cpython-310.pyc
│   │   │   │   ├── format_control.cpython-310.pyc
│   │   │   │   ├── index.cpython-310.pyc
│   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   ├── link.cpython-310.pyc
│   │   │   │   ├── scheme.cpython-310.pyc
│   │   │   │   ├── search_scope.cpython-310.pyc
│   │   │   │   ├── selection_prefs.cpython-310.pyc
│   │   │   │   ├── target_python.cpython-310.pyc
│   │   │   │   └── wheel.cpython-310.pyc
│   │   │   ├── scheme.py
│   │   │   ├── search_scope.py
│   │   │   ├── selection_prefs.py
│   │   │   ├── target_python.py
│   │   │   └── wheel.py
│   │   ├── [01;34mnetwork[0m
│   │   │   ├── auth.py
│   │   │   ├── cache.py
│   │   │   ├── download.py
│   │   │   ├── __init__.py
│   │   │   ├── lazy_wheel.py
│   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   ├── auth.cpython-310.pyc
│   │   │   │   ├── cache.cpython-310.pyc
│   │   │   │   ├── download.cpython-310.pyc
│   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   ├── lazy_wheel.cpython-310.pyc
│   │   │   │   ├── session.cpython-310.pyc
│   │   │   │   ├── utils.cpython-310.pyc
│   │   │   │   └── xmlrpc.cpython-310.pyc
│   │   │   ├── session.py
│   │   │   ├── utils.py
│   │   │   └── xmlrpc.py
│   │   ├── [01;34moperations[0m
│   │   │   ├── [01;34mbuild[0m
│   │   │   │   ├── __init__.py
│   │   │   │   ├── metadata_editable.py
│   │   │   │   ├── metadata_legacy.py
│   │   │   │   ├── metadata.py
│   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   │   ├── metadata.cpython-310.pyc
│   │   │   │   │   ├── metadata_editable.cpython-310.pyc
│   │   │   │   │   ├── metadata_legacy.cpython-310.pyc
│   │   │   │   │   ├── wheel.cpython-310.pyc
│   │   │   │   │   ├── wheel_editable.cpython-310.pyc
│   │   │   │   │   └── wheel_legacy.cpython-310.pyc
│   │   │   │   ├── wheel_editable.py
│   │   │   │   ├── wheel_legacy.py
│   │   │   │   └── wheel.py
│   │   │   ├── check.py
│   │   │   ├── freeze.py
│   │   │   ├── __init__.py
│   │   │   ├── [01;34minstall[0m
│   │   │   │   ├── editable_legacy.py
│   │   │   │   ├── __init__.py
│   │   │   │   ├── legacy.py
│   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   ├── editable_legacy.cpython-310.pyc
│   │   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   │   ├── legacy.cpython-310.pyc
│   │   │   │   │   └── wheel.cpython-310.pyc
│   │   │   │   └── wheel.py
│   │   │   ├── prepare.py
│   │   │   └── [01;34m__pycache__[0m
│   │   │       ├── check.cpython-310.pyc
│   │   │       ├── freeze.cpython-310.pyc
│   │   │       ├── __init__.cpython-310.pyc
│   │   │       └── prepare.cpython-310.pyc
│   │   ├── [01;34m__pycache__[0m
│   │   │   ├── build_env.cpython-310.pyc
│   │   │   ├── cache.cpython-310.pyc
│   │   │   ├── configuration.cpython-310.pyc
│   │   │   ├── exceptions.cpython-310.pyc
│   │   │   ├── __init__.cpython-310.pyc
│   │   │   ├── main.cpython-310.pyc
│   │   │   ├── pyproject.cpython-310.pyc
│   │   │   ├── self_outdated_check.cpython-310.pyc
│   │   │   └── wheel_builder.cpython-310.pyc
│   │   ├── pyproject.py
│   │   ├── [01;34mreq[0m
│   │   │   ├── constructors.py
│   │   │   ├── __init__.py
│   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   ├── constructors.cpython-310.pyc
│   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   ├── req_file.cpython-310.pyc
│   │   │   │   ├── req_install.cpython-310.pyc
│   │   │   │   ├── req_set.cpython-310.pyc
│   │   │   │   ├── req_tracker.cpython-310.pyc
│   │   │   │   └── req_uninstall.cpython-310.pyc
│   │   │   ├── req_file.py
│   │   │   ├── req_install.py
│   │   │   ├── req_set.py
│   │   │   ├── req_tracker.py
│   │   │   └── req_uninstall.py
│   │   ├── [01;34mresolution[0m
│   │   │   ├── base.py
│   │   │   ├── __init__.py
│   │   │   ├── [01;34mlegacy[0m
│   │   │   │   ├── __init__.py
│   │   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   │   └── resolver.cpython-310.pyc
│   │   │   │   └── resolver.py
│   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   ├── base.cpython-310.pyc
│   │   │   │   └── __init__.cpython-310.pyc
│   │   │   └── [01;34mresolvelib[0m
│   │   │       ├── base.py
│   │   │       ├── candidates.py
│   │   │       ├── factory.py
│   │   │       ├── found_candidates.py
│   │   │       ├── __init__.py
│   │   │       ├── provider.py
│   │   │       ├── [01;34m__pycache__[0m
│   │   │       │   ├── base.cpython-310.pyc
│   │   │       │   ├── candidates.cpython-310.pyc
│   │   │       │   ├── factory.cpython-310.pyc
│   │   │       │   ├── found_candidates.cpython-310.pyc
│   │   │       │   ├── __init__.cpython-310.pyc
│   │   │       │   ├── provider.cpython-310.pyc
│   │   │       │   ├── reporter.cpython-310.pyc
│   │   │       │   ├── requirements.cpython-310.pyc
│   │   │       │   └── resolver.cpython-310.pyc
│   │   │       ├── reporter.py
│   │   │       ├── requirements.py
│   │   │       └── resolver.py
│   │   ├── self_outdated_check.py
│   │   ├── [01;34mutils[0m
│   │   │   ├── appdirs.py
│   │   │   ├── compatibility_tags.py
│   │   │   ├── compat.py
│   │   │   ├── datetime.py
│   │   │   ├── deprecation.py
│   │   │   ├── direct_url_helpers.py
│   │   │   ├── distutils_args.py
│   │   │   ├── egg_link.py
│   │   │   ├── encoding.py
│   │   │   ├── entrypoints.py
│   │   │   ├── filesystem.py
│   │   │   ├── filetypes.py
│   │   │   ├── glibc.py
│   │   │   ├── hashes.py
│   │   │   ├── __init__.py
│   │   │   ├── inject_securetransport.py
│   │   │   ├── logging.py
│   │   │   ├── _log.py
│   │   │   ├── misc.py
│   │   │   ├── models.py
│   │   │   ├── packaging.py
│   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   ├── appdirs.cpython-310.pyc
│   │   │   │   ├── compat.cpython-310.pyc
│   │   │   │   ├── compatibility_tags.cpython-310.pyc
│   │   │   │   ├── datetime.cpython-310.pyc
│   │   │   │   ├── deprecation.cpython-310.pyc
│   │   │   │   ├── direct_url_helpers.cpython-310.pyc
│   │   │   │   ├── distutils_args.cpython-310.pyc
│   │   │   │   ├── egg_link.cpython-310.pyc
│   │   │   │   ├── encoding.cpython-310.pyc
│   │   │   │   ├── entrypoints.cpython-310.pyc
│   │   │   │   ├── filesystem.cpython-310.pyc
│   │   │   │   ├── filetypes.cpython-310.pyc
│   │   │   │   ├── glibc.cpython-310.pyc
│   │   │   │   ├── hashes.cpython-310.pyc
│   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   ├── inject_securetransport.cpython-310.pyc
│   │   │   │   ├── _log.cpython-310.pyc
│   │   │   │   ├── logging.cpython-310.pyc
│   │   │   │   ├── misc.cpython-310.pyc
│   │   │   │   ├── models.cpython-310.pyc
│   │   │   │   ├── packaging.cpython-310.pyc
│   │   │   │   ├── setuptools_build.cpython-310.pyc
│   │   │   │   ├── subprocess.cpython-310.pyc
│   │   │   │   ├── temp_dir.cpython-310.pyc
│   │   │   │   ├── unpacking.cpython-310.pyc
│   │   │   │   ├── urls.cpython-310.pyc
│   │   │   │   ├── virtualenv.cpython-310.pyc
│   │   │   │   └── wheel.cpython-310.pyc
│   │   │   ├── setuptools_build.py
│   │   │   ├── subprocess.py
│   │   │   ├── temp_dir.py
│   │   │   ├── unpacking.py
│   │   │   ├── urls.py
│   │   │   ├── virtualenv.py
│   │   │   └── wheel.py
│   │   ├── [01;34mvcs[0m
│   │   │   ├── bazaar.py
│   │   │   ├── git.py
│   │   │   ├── __init__.py
│   │   │   ├── mercurial.py
│   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   ├── bazaar.cpython-310.pyc
│   │   │   │   ├── git.cpython-310.pyc
│   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   ├── mercurial.cpython-310.pyc
│   │   │   │   ├── subversion.cpython-310.pyc
│   │   │   │   └── versioncontrol.cpython-310.pyc
│   │   │   ├── subversion.py
│   │   │   └── versioncontrol.py
│   │   └── wheel_builder.py
│   ├── __main__.py
│   ├── [01;34m__pycache__[0m
│   │   ├── __init__.cpython-310.pyc
│   │   └── __main__.cpython-310.pyc
│   ├── py.typed
│   └── [01;34m_vendor[0m
│       ├── [01;34mcachecontrol[0m
│       │   ├── adapter.py
│       │   ├── cache.py
│       │   ├── [01;34mcaches[0m
│       │   │   ├── file_cache.py
│       │   │   ├── __init__.py
│       │   │   ├── [01;34m__pycache__[0m
│       │   │   │   ├── file_cache.cpython-310.pyc
│       │   │   │   ├── __init__.cpython-310.pyc
│       │   │   │   └── redis_cache.cpython-310.pyc
│       │   │   └── redis_cache.py
│       │   ├── _cmd.py
│       │   ├── compat.py
│       │   ├── controller.py
│       │   ├── filewrapper.py
│       │   ├── heuristics.py
│       │   ├── __init__.py
│       │   ├── [01;34m__pycache__[0m
│       │   │   ├── adapter.cpython-310.pyc
│       │   │   ├── cache.cpython-310.pyc
│       │   │   ├── _cmd.cpython-310.pyc
│       │   │   ├── compat.cpython-310.pyc
│       │   │   ├── controller.cpython-310.pyc
│       │   │   ├── filewrapper.cpython-310.pyc
│       │   │   ├── heuristics.cpython-310.pyc
│       │   │   ├── __init__.cpython-310.pyc
│       │   │   ├── serialize.cpython-310.pyc
│       │   │   └── wrapper.cpython-310.pyc
│       │   ├── serialize.py
│       │   └── wrapper.py
│       ├── [01;34mcertifi[0m
│       │   ├── cacert.pem
│       │   ├── core.py
│       │   ├── __init__.py
│       │   ├── __main__.py
│       │   └── [01;34m__pycache__[0m
│       │       ├── core.cpython-310.pyc
│       │       ├── __init__.cpython-310.pyc
│       │       └── __main__.cpython-310.pyc
│       ├── [01;34mchardet[0m
│       │   ├── big5freq.py
│       │   ├── big5prober.py
│       │   ├── chardistribution.py
│       │   ├── charsetgroupprober.py
│       │   ├── charsetprober.py
│       │   ├── [01;34mcli[0m
│       │   │   ├── chardetect.py
│       │   │   ├── __init__.py
│       │   │   └── [01;34m__pycache__[0m
│       │   │       ├── chardetect.cpython-310.pyc
│       │   │       └── __init__.cpython-310.pyc
│       │   ├── codingstatemachine.py
│       │   ├── compat.py
│       │   ├── cp949prober.py
│       │   ├── enums.py
│       │   ├── escprober.py
│       │   ├── escsm.py
│       │   ├── eucjpprober.py
│       │   ├── euckrfreq.py
│       │   ├── euckrprober.py
│       │   ├── euctwfreq.py
│       │   ├── euctwprober.py
│       │   ├── gb2312freq.py
│       │   ├── gb2312prober.py
│       │   ├── hebrewprober.py
│       │   ├── __init__.py
│       │   ├── jisfreq.py
│       │   ├── jpcntx.py
│       │   ├── langbulgarianmodel.py
│       │   ├── langgreekmodel.py
│       │   ├── langhebrewmodel.py
│       │   ├── langhungarianmodel.py
│       │   ├── langrussianmodel.py
│       │   ├── langthaimodel.py
│       │   ├── langturkishmodel.py
│       │   ├── latin1prober.py
│       │   ├── mbcharsetprober.py
│       │   ├── mbcsgroupprober.py
│       │   ├── mbcssm.py
│       │   ├── [01;34mmetadata[0m
│       │   │   ├── __init__.py
│       │   │   ├── languages.py
│       │   │   └── [01;34m__pycache__[0m
│       │   │       ├── __init__.cpython-310.pyc
│       │   │       └── languages.cpython-310.pyc
│       │   ├── [01;34m__pycache__[0m
│       │   │   ├── big5freq.cpython-310.pyc
│       │   │   ├── big5prober.cpython-310.pyc
│       │   │   ├── chardistribution.cpython-310.pyc
│       │   │   ├── charsetgroupprober.cpython-310.pyc
│       │   │   ├── charsetprober.cpython-310.pyc
│       │   │   ├── codingstatemachine.cpython-310.pyc
│       │   │   ├── compat.cpython-310.pyc
│       │   │   ├── cp949prober.cpython-310.pyc
│       │   │   ├── enums.cpython-310.pyc
│       │   │   ├── escprober.cpython-310.pyc
│       │   │   ├── escsm.cpython-310.pyc
│       │   │   ├── eucjpprober.cpython-310.pyc
│       │   │   ├── euckrfreq.cpython-310.pyc
│       │   │   ├── euckrprober.cpython-310.pyc
│       │   │   ├── euctwfreq.cpython-310.pyc
│       │   │   ├── euctwprober.cpython-310.pyc
│       │   │   ├── gb2312freq.cpython-310.pyc
│       │   │   ├── gb2312prober.cpython-310.pyc
│       │   │   ├── hebrewprober.cpython-310.pyc
│       │   │   ├── __init__.cpython-310.pyc
│       │   │   ├── jisfreq.cpython-310.pyc
│       │   │   ├── jpcntx.cpython-310.pyc
│       │   │   ├── langbulgarianmodel.cpython-310.pyc
│       │   │   ├── langgreekmodel.cpython-310.pyc
│       │   │   ├── langhebrewmodel.cpython-310.pyc
│       │   │   ├── langhungarianmodel.cpython-310.pyc
│       │   │   ├── langrussianmodel.cpython-310.pyc
│       │   │   ├── langthaimodel.cpython-310.pyc
│       │   │   ├── langturkishmodel.cpython-310.pyc
│       │   │   ├── latin1prober.cpython-310.pyc
│       │   │   ├── mbcharsetprober.cpython-310.pyc
│       │   │   ├── mbcsgroupprober.cpython-310.pyc
│       │   │   ├── mbcssm.cpython-310.pyc
│       │   │   ├── sbcharsetprober.cpython-310.pyc
│       │   │   ├── sbcsgroupprober.cpython-310.pyc
│       │   │   ├── sjisprober.cpython-310.pyc
│       │   │   ├── universaldetector.cpython-310.pyc
│       │   │   ├── utf8prober.cpython-310.pyc
│       │   │   └── version.cpython-310.pyc
│       │   ├── sbcharsetprober.py
│       │   ├── sbcsgroupprober.py
│       │   ├── sjisprober.py
│       │   ├── universaldetector.py
│       │   ├── utf8prober.py
│       │   └── version.py
│       ├── [01;34mcolorama[0m
│       │   ├── ansi.py
│       │   ├── ansitowin32.py
│       │   ├── initialise.py
│       │   ├── __init__.py
│       │   ├── [01;34m__pycache__[0m
│       │   │   ├── ansi.cpython-310.pyc
│       │   │   ├── ansitowin32.cpython-310.pyc
│       │   │   ├── __init__.cpython-310.pyc
│       │   │   ├── initialise.cpython-310.pyc
│       │   │   ├── win32.cpython-310.pyc
│       │   │   └── winterm.cpython-310.pyc
│       │   ├── win32.py
│       │   └── winterm.py
│       ├── [01;34mdistlib[0m
│       │   ├── compat.py
│       │   ├── database.py
│       │   ├── index.py
│       │   ├── __init__.py
│       │   ├── locators.py
│       │   ├── manifest.py
│       │   ├── markers.py
│       │   ├── metadata.py
│       │   ├── [01;34m__pycache__[0m
│       │   │   ├── compat.cpython-310.pyc
│       │   │   ├── database.cpython-310.pyc
│       │   │   ├── index.cpython-310.pyc
│       │   │   ├── __init__.cpython-310.pyc
│       │   │   ├── locators.cpython-310.pyc
│       │   │   ├── manifest.cpython-310.pyc
│       │   │   ├── markers.cpython-310.pyc
│       │   │   ├── metadata.cpython-310.pyc
│       │   │   ├── resources.cpython-310.pyc
│       │   │   ├── scripts.cpython-310.pyc
│       │   │   ├── util.cpython-310.pyc
│       │   │   ├── version.cpython-310.pyc
│       │   │   └── wheel.cpython-310.pyc
│       │   ├── resources.py
│       │   ├── scripts.py
│       │   ├── util.py
│       │   ├── version.py
│       │   └── wheel.py
│       ├── distro.py
│       ├── [01;34mhtml5lib[0m
│       │   ├── constants.py
│       │   ├── [01;34mfilters[0m
│       │   │   ├── alphabeticalattributes.py
│       │   │   ├── base.py
│       │   │   ├── __init__.py
│       │   │   ├── inject_meta_charset.py
│       │   │   ├── lint.py
│       │   │   ├── optionaltags.py
│       │   │   ├── [01;34m__pycache__[0m
│       │   │   │   ├── alphabeticalattributes.cpython-310.pyc
│       │   │   │   ├── base.cpython-310.pyc
│       │   │   │   ├── __init__.cpython-310.pyc
│       │   │   │   ├── inject_meta_charset.cpython-310.pyc
│       │   │   │   ├── lint.cpython-310.pyc
│       │   │   │   ├── optionaltags.cpython-310.pyc
│       │   │   │   ├── sanitizer.cpython-310.pyc
│       │   │   │   └── whitespace.cpython-310.pyc
│       │   │   ├── sanitizer.py
│       │   │   └── whitespace.py
│       │   ├── html5parser.py
│       │   ├── _ihatexml.py
│       │   ├── __init__.py
│       │   ├── _inputstream.py
│       │   ├── [01;34m__pycache__[0m
│       │   │   ├── constants.cpython-310.pyc
│       │   │   ├── html5parser.cpython-310.pyc
│       │   │   ├── _ihatexml.cpython-310.pyc
│       │   │   ├── __init__.cpython-310.pyc
│       │   │   ├── _inputstream.cpython-310.pyc
│       │   │   ├── serializer.cpython-310.pyc
│       │   │   ├── _tokenizer.cpython-310.pyc
│       │   │   └── _utils.cpython-310.pyc
│       │   ├── serializer.py
│       │   ├── _tokenizer.py
│       │   ├── [01;34mtreeadapters[0m
│       │   │   ├── genshi.py
│       │   │   ├── __init__.py
│       │   │   ├── [01;34m__pycache__[0m
│       │   │   │   ├── genshi.cpython-310.pyc
│       │   │   │   ├── __init__.cpython-310.pyc
│       │   │   │   └── sax.cpython-310.pyc
│       │   │   └── sax.py
│       │   ├── [01;34mtreebuilders[0m
│       │   │   ├── base.py
│       │   │   ├── dom.py
│       │   │   ├── etree_lxml.py
│       │   │   ├── etree.py
│       │   │   ├── __init__.py
│       │   │   └── [01;34m__pycache__[0m
│       │   │       ├── base.cpython-310.pyc
│       │   │       ├── dom.cpython-310.pyc
│       │   │       ├── etree.cpython-310.pyc
│       │   │       ├── etree_lxml.cpython-310.pyc
│       │   │       └── __init__.cpython-310.pyc
│       │   ├── [01;34mtreewalkers[0m
│       │   │   ├── base.py
│       │   │   ├── dom.py
│       │   │   ├── etree_lxml.py
│       │   │   ├── etree.py
│       │   │   ├── genshi.py
│       │   │   ├── __init__.py
│       │   │   └── [01;34m__pycache__[0m
│       │   │       ├── base.cpython-310.pyc
│       │   │       ├── dom.cpython-310.pyc
│       │   │       ├── etree.cpython-310.pyc
│       │   │       ├── etree_lxml.cpython-310.pyc
│       │   │       ├── genshi.cpython-310.pyc
│       │   │       └── __init__.cpython-310.pyc
│       │   ├── [01;34m_trie[0m
│       │   │   ├── _base.py
│       │   │   ├── __init__.py
│       │   │   ├── [01;34m__pycache__[0m
│       │   │   │   ├── _base.cpython-310.pyc
│       │   │   │   ├── __init__.cpython-310.pyc
│       │   │   │   └── py.cpython-310.pyc
│       │   │   └── py.py
│       │   └── _utils.py
│       ├── [01;34midna[0m
│       │   ├── codec.py
│       │   ├── compat.py
│       │   ├── core.py
│       │   ├── idnadata.py
│       │   ├── __init__.py
│       │   ├── intranges.py
│       │   ├── package_data.py
│       │   ├── [01;34m__pycache__[0m
│       │   │   ├── codec.cpython-310.pyc
│       │   │   ├── compat.cpython-310.pyc
│       │   │   ├── core.cpython-310.pyc
│       │   │   ├── idnadata.cpython-310.pyc
│       │   │   ├── __init__.cpython-310.pyc
│       │   │   ├── intranges.cpython-310.pyc
│       │   │   ├── package_data.cpython-310.pyc
│       │   │   └── uts46data.cpython-310.pyc
│       │   └── uts46data.py
│       ├── __init__.py
│       ├── [01;34mmsgpack[0m
│       │   ├── exceptions.py
│       │   ├── ext.py
│       │   ├── fallback.py
│       │   ├── __init__.py
│       │   ├── [01;34m__pycache__[0m
│       │   │   ├── exceptions.cpython-310.pyc
│       │   │   ├── ext.cpython-310.pyc
│       │   │   ├── fallback.cpython-310.pyc
│       │   │   ├── __init__.cpython-310.pyc
│       │   │   └── _version.cpython-310.pyc
│       │   └── _version.py
│       ├── [01;34mpackaging[0m
│       │   ├── __about__.py
│       │   ├── __init__.py
│       │   ├── _manylinux.py
│       │   ├── markers.py
│       │   ├── _musllinux.py
│       │   ├── [01;34m__pycache__[0m
│       │   │   ├── __about__.cpython-310.pyc
│       │   │   ├── __init__.cpython-310.pyc
│       │   │   ├── _manylinux.cpython-310.pyc
│       │   │   ├── markers.cpython-310.pyc
│       │   │   ├── _musllinux.cpython-310.pyc
│       │   │   ├── requirements.cpython-310.pyc
│       │   │   ├── specifiers.cpython-310.pyc
│       │   │   ├── _structures.cpython-310.pyc
│       │   │   ├── tags.cpython-310.pyc
│       │   │   ├── utils.cpython-310.pyc
│       │   │   └── version.cpython-310.pyc
│       │   ├── requirements.py
│       │   ├── specifiers.py
│       │   ├── _structures.py
│       │   ├── tags.py
│       │   ├── utils.py
│       │   └── version.py
│       ├── [01;34mpep517[0m
│       │   ├── build.py
│       │   ├── check.py
│       │   ├── colorlog.py
│       │   ├── compat.py
│       │   ├── dirtools.py
│       │   ├── envbuild.py
│       │   ├── __init__.py
│       │   ├── [01;34min_process[0m
│       │   │   ├── __init__.py
│       │   │   ├── _in_process.py
│       │   │   └── [01;34m__pycache__[0m
│       │   │       ├── __init__.cpython-310.pyc
│       │   │       └── _in_process.cpython-310.pyc
│       │   ├── meta.py
│       │   ├── [01;34m__pycache__[0m
│       │   │   ├── build.cpython-310.pyc
│       │   │   ├── check.cpython-310.pyc
│       │   │   ├── colorlog.cpython-310.pyc
│       │   │   ├── compat.cpython-310.pyc
│       │   │   ├── dirtools.cpython-310.pyc
│       │   │   ├── envbuild.cpython-310.pyc
│       │   │   ├── __init__.cpython-310.pyc
│       │   │   ├── meta.cpython-310.pyc
│       │   │   └── wrappers.cpython-310.pyc
│       │   └── wrappers.py
│       ├── [01;34mpkg_resources[0m
│       │   ├── __init__.py
│       │   ├── py31compat.py
│       │   └── [01;34m__pycache__[0m
│       │       ├── __init__.cpython-310.pyc
│       │       └── py31compat.cpython-310.pyc
│       ├── [01;34mplatformdirs[0m
│       │   ├── android.py
│       │   ├── api.py
│       │   ├── __init__.py
│       │   ├── macos.py
│       │   ├── __main__.py
│       │   ├── [01;34m__pycache__[0m
│       │   │   ├── android.cpython-310.pyc
│       │   │   ├── api.cpython-310.pyc
│       │   │   ├── __init__.cpython-310.pyc
│       │   │   ├── macos.cpython-310.pyc
│       │   │   ├── __main__.cpython-310.pyc
│       │   │   ├── unix.cpython-310.pyc
│       │   │   ├── version.cpython-310.pyc
│       │   │   └── windows.cpython-310.pyc
│       │   ├── unix.py
│       │   ├── version.py
│       │   └── windows.py
│       ├── [01;34mprogress[0m
│       │   ├── bar.py
│       │   ├── colors.py
│       │   ├── counter.py
│       │   ├── __init__.py
│       │   ├── [01;34m__pycache__[0m
│       │   │   ├── bar.cpython-310.pyc
│       │   │   ├── colors.cpython-310.pyc
│       │   │   ├── counter.cpython-310.pyc
│       │   │   ├── __init__.cpython-310.pyc
│       │   │   └── spinner.cpython-310.pyc
│       │   └── spinner.py
│       ├── [01;34m__pycache__[0m
│       │   ├── distro.cpython-310.pyc
│       │   ├── __init__.cpython-310.pyc
│       │   ├── six.cpython-310.pyc
│       │   └── typing_extensions.cpython-310.pyc
│       ├── [01;34mpygments[0m
│       │   ├── cmdline.py
│       │   ├── console.py
│       │   ├── filter.py
│       │   ├── [01;34mfilters[0m
│       │   │   ├── __init__.py
│       │   │   └── [01;34m__pycache__[0m
│       │   │       └── __init__.cpython-310.pyc
│       │   ├── formatter.py
│       │   ├── [01;34mformatters[0m
│       │   │   ├── bbcode.py
│       │   │   ├── groff.py
│       │   │   ├── html.py
│       │   │   ├── img.py
│       │   │   ├── __init__.py
│       │   │   ├── irc.py
│       │   │   ├── latex.py
│       │   │   ├── _mapping.py
│       │   │   ├── other.py
│       │   │   ├── pangomarkup.py
│       │   │   ├── [01;34m__pycache__[0m
│       │   │   │   ├── bbcode.cpython-310.pyc
│       │   │   │   ├── groff.cpython-310.pyc
│       │   │   │   ├── html.cpython-310.pyc
│       │   │   │   ├── img.cpython-310.pyc
│       │   │   │   ├── __init__.cpython-310.pyc
│       │   │   │   ├── irc.cpython-310.pyc
│       │   │   │   ├── latex.cpython-310.pyc
│       │   │   │   ├── _mapping.cpython-310.pyc
│       │   │   │   ├── other.cpython-310.pyc
│       │   │   │   ├── pangomarkup.cpython-310.pyc
│       │   │   │   ├── rtf.cpython-310.pyc
│       │   │   │   ├── svg.cpython-310.pyc
│       │   │   │   ├── terminal256.cpython-310.pyc
│       │   │   │   └── terminal.cpython-310.pyc
│       │   │   ├── rtf.py
│       │   │   ├── svg.py
│       │   │   ├── terminal256.py
│       │   │   └── terminal.py
│       │   ├── __init__.py
│       │   ├── lexer.py
│       │   ├── [01;34mlexers[0m
│       │   │   ├── __init__.py
│       │   │   ├── _mapping.py
│       │   │   ├── [01;34m__pycache__[0m
│       │   │   │   ├── __init__.cpython-310.pyc
│       │   │   │   ├── _mapping.cpython-310.pyc
│       │   │   │   └── python.cpython-310.pyc
│       │   │   └── python.py
│       │   ├── __main__.py
│       │   ├── modeline.py
│       │   ├── plugin.py
│       │   ├── [01;34m__pycache__[0m
│       │   │   ├── cmdline.cpython-310.pyc
│       │   │   ├── console.cpython-310.pyc
│       │   │   ├── filter.cpython-310.pyc
│       │   │   ├── formatter.cpython-310.pyc
│       │   │   ├── __init__.cpython-310.pyc
│       │   │   ├── lexer.cpython-310.pyc
│       │   │   ├── __main__.cpython-310.pyc
│       │   │   ├── modeline.cpython-310.pyc
│       │   │   ├── plugin.cpython-310.pyc
│       │   │   ├── regexopt.cpython-310.pyc
│       │   │   ├── scanner.cpython-310.pyc
│       │   │   ├── sphinxext.cpython-310.pyc
│       │   │   ├── style.cpython-310.pyc
│       │   │   ├── token.cpython-310.pyc
│       │   │   ├── unistring.cpython-310.pyc
│       │   │   └── util.cpython-310.pyc
│       │   ├── regexopt.py
│       │   ├── scanner.py
│       │   ├── sphinxext.py
│       │   ├── style.py
│       │   ├── [01;34mstyles[0m
│       │   │   ├── __init__.py
│       │   │   └── [01;34m__pycache__[0m
│       │   │       └── __init__.cpython-310.pyc
│       │   ├── token.py
│       │   ├── unistring.py
│       │   └── util.py
│       ├── [01;34mpyparsing[0m
│       │   ├── actions.py
│       │   ├── common.py
│       │   ├── core.py
│       │   ├── [01;34mdiagram[0m
│       │   │   ├── __init__.py
│       │   │   └── [01;34m__pycache__[0m
│       │   │       └── __init__.cpython-310.pyc
│       │   ├── exceptions.py
│       │   ├── helpers.py
│       │   ├── __init__.py
│       │   ├── [01;34m__pycache__[0m
│       │   │   ├── actions.cpython-310.pyc
│       │   │   ├── common.cpython-310.pyc
│       │   │   ├── core.cpython-310.pyc
│       │   │   ├── exceptions.cpython-310.pyc
│       │   │   ├── helpers.cpython-310.pyc
│       │   │   ├── __init__.cpython-310.pyc
│       │   │   ├── results.cpython-310.pyc
│       │   │   ├── testing.cpython-310.pyc
│       │   │   ├── unicode.cpython-310.pyc
│       │   │   └── util.cpython-310.pyc
│       │   ├── results.py
│       │   ├── testing.py
│       │   ├── unicode.py
│       │   └── util.py
│       ├── [01;34mrequests[0m
│       │   ├── adapters.py
│       │   ├── api.py
│       │   ├── auth.py
│       │   ├── certs.py
│       │   ├── compat.py
│       │   ├── cookies.py
│       │   ├── exceptions.py
│       │   ├── help.py
│       │   ├── hooks.py
│       │   ├── __init__.py
│       │   ├── _internal_utils.py
│       │   ├── models.py
│       │   ├── packages.py
│       │   ├── [01;34m__pycache__[0m
│       │   │   ├── adapters.cpython-310.pyc
│       │   │   ├── api.cpython-310.pyc
│       │   │   ├── auth.cpython-310.pyc
│       │   │   ├── certs.cpython-310.pyc
│       │   │   ├── compat.cpython-310.pyc
│       │   │   ├── cookies.cpython-310.pyc
│       │   │   ├── exceptions.cpython-310.pyc
│       │   │   ├── help.cpython-310.pyc
│       │   │   ├── hooks.cpython-310.pyc
│       │   │   ├── __init__.cpython-310.pyc
│       │   │   ├── _internal_utils.cpython-310.pyc
│       │   │   ├── models.cpython-310.pyc
│       │   │   ├── packages.cpython-310.pyc
│       │   │   ├── sessions.cpython-310.pyc
│       │   │   ├── status_codes.cpython-310.pyc
│       │   │   ├── structures.cpython-310.pyc
│       │   │   ├── utils.cpython-310.pyc
│       │   │   └── __version__.cpython-310.pyc
│       │   ├── sessions.py
│       │   ├── status_codes.py
│       │   ├── structures.py
│       │   ├── utils.py
│       │   └── __version__.py
│       ├── [01;34mresolvelib[0m
│       │   ├── [01;34mcompat[0m
│       │   │   ├── collections_abc.py
│       │   │   ├── __init__.py
│       │   │   └── [01;34m__pycache__[0m
│       │   │       ├── collections_abc.cpython-310.pyc
│       │   │       └── __init__.cpython-310.pyc
│       │   ├── __init__.py
│       │   ├── providers.py
│       │   ├── [01;34m__pycache__[0m
│       │   │   ├── __init__.cpython-310.pyc
│       │   │   ├── providers.cpython-310.pyc
│       │   │   ├── reporters.cpython-310.pyc
│       │   │   ├── resolvers.cpython-310.pyc
│       │   │   └── structs.cpython-310.pyc
│       │   ├── reporters.py
│       │   ├── resolvers.py
│       │   └── structs.py
│       ├── [01;34mrich[0m
│       │   ├── abc.py
│       │   ├── align.py
│       │   ├── ansi.py
│       │   ├── bar.py
│       │   ├── box.py
│       │   ├── cells.py
│       │   ├── _cell_widths.py
│       │   ├── color.py
│       │   ├── color_triplet.py
│       │   ├── columns.py
│       │   ├── console.py
│       │   ├── constrain.py
│       │   ├── containers.py
│       │   ├── control.py
│       │   ├── default_styles.py
│       │   ├── diagnose.py
│       │   ├── _emoji_codes.py
│       │   ├── emoji.py
│       │   ├── _emoji_replace.py
│       │   ├── errors.py
│       │   ├── _extension.py
│       │   ├── file_proxy.py
│       │   ├── filesize.py
│       │   ├── highlighter.py
│       │   ├── __init__.py
│       │   ├── _inspect.py
│       │   ├── json.py
│       │   ├── jupyter.py
│       │   ├── layout.py
│       │   ├── live.py
│       │   ├── live_render.py
│       │   ├── logging.py
│       │   ├── _log_render.py
│       │   ├── _loop.py
│       │   ├── _lru_cache.py
│       │   ├── __main__.py
│       │   ├── markup.py
│       │   ├── measure.py
│       │   ├── padding.py
│       │   ├── pager.py
│       │   ├── palette.py
│       │   ├── _palettes.py
│       │   ├── panel.py
│       │   ├── _pick.py
│       │   ├── pretty.py
│       │   ├── progress_bar.py
│       │   ├── progress.py
│       │   ├── prompt.py
│       │   ├── protocol.py
│       │   ├── [01;34m__pycache__[0m
│       │   │   ├── abc.cpython-310.pyc
│       │   │   ├── align.cpython-310.pyc
│       │   │   ├── ansi.cpython-310.pyc
│       │   │   ├── bar.cpython-310.pyc
│       │   │   ├── box.cpython-310.pyc
│       │   │   ├── cells.cpython-310.pyc
│       │   │   ├── _cell_widths.cpython-310.pyc
│       │   │   ├── color.cpython-310.pyc
│       │   │   ├── color_triplet.cpython-310.pyc
│       │   │   ├── columns.cpython-310.pyc
│       │   │   ├── console.cpython-310.pyc
│       │   │   ├── constrain.cpython-310.pyc
│       │   │   ├── containers.cpython-310.pyc
│       │   │   ├── control.cpython-310.pyc
│       │   │   ├── default_styles.cpython-310.pyc
│       │   │   ├── diagnose.cpython-310.pyc
│       │   │   ├── _emoji_codes.cpython-310.pyc
│       │   │   ├── emoji.cpython-310.pyc
│       │   │   ├── _emoji_replace.cpython-310.pyc
│       │   │   ├── errors.cpython-310.pyc
│       │   │   ├── _extension.cpython-310.pyc
│       │   │   ├── file_proxy.cpython-310.pyc
│       │   │   ├── filesize.cpython-310.pyc
│       │   │   ├── highlighter.cpython-310.pyc
│       │   │   ├── __init__.cpython-310.pyc
│       │   │   ├── _inspect.cpython-310.pyc
│       │   │   ├── json.cpython-310.pyc
│       │   │   ├── jupyter.cpython-310.pyc
│       │   │   ├── layout.cpython-310.pyc
│       │   │   ├── live.cpython-310.pyc
│       │   │   ├── live_render.cpython-310.pyc
│       │   │   ├── logging.cpython-310.pyc
│       │   │   ├── _log_render.cpython-310.pyc
│       │   │   ├── _loop.cpython-310.pyc
│       │   │   ├── _lru_cache.cpython-310.pyc
│       │   │   ├── __main__.cpython-310.pyc
│       │   │   ├── markup.cpython-310.pyc
│       │   │   ├── measure.cpython-310.pyc
│       │   │   ├── padding.cpython-310.pyc
│       │   │   ├── pager.cpython-310.pyc
│       │   │   ├── palette.cpython-310.pyc
│       │   │   ├── _palettes.cpython-310.pyc
│       │   │   ├── panel.cpython-310.pyc
│       │   │   ├── _pick.cpython-310.pyc
│       │   │   ├── pretty.cpython-310.pyc
│       │   │   ├── progress_bar.cpython-310.pyc
│       │   │   ├── progress.cpython-310.pyc
│       │   │   ├── prompt.cpython-310.pyc
│       │   │   ├── protocol.cpython-310.pyc
│       │   │   ├── _ratio.cpython-310.pyc
│       │   │   ├── region.cpython-310.pyc
│       │   │   ├── repr.cpython-310.pyc
│       │   │   ├── rule.cpython-310.pyc
│       │   │   ├── scope.cpython-310.pyc
│       │   │   ├── screen.cpython-310.pyc
│       │   │   ├── segment.cpython-310.pyc
│       │   │   ├── spinner.cpython-310.pyc
│       │   │   ├── _spinners.cpython-310.pyc
│       │   │   ├── _stack.cpython-310.pyc
│       │   │   ├── status.cpython-310.pyc
│       │   │   ├── style.cpython-310.pyc
│       │   │   ├── styled.cpython-310.pyc
│       │   │   ├── syntax.cpython-310.pyc
│       │   │   ├── table.cpython-310.pyc
│       │   │   ├── tabulate.cpython-310.pyc
│       │   │   ├── terminal_theme.cpython-310.pyc
│       │   │   ├── text.cpython-310.pyc
│       │   │   ├── theme.cpython-310.pyc
│       │   │   ├── themes.cpython-310.pyc
│       │   │   ├── _timer.cpython-310.pyc
│       │   │   ├── traceback.cpython-310.pyc
│       │   │   ├── tree.cpython-310.pyc
│       │   │   ├── _windows.cpython-310.pyc
│       │   │   └── _wrap.cpython-310.pyc
│       │   ├── _ratio.py
│       │   ├── region.py
│       │   ├── repr.py
│       │   ├── rule.py
│       │   ├── scope.py
│       │   ├── screen.py
│       │   ├── segment.py
│       │   ├── spinner.py
│       │   ├── _spinners.py
│       │   ├── _stack.py
│       │   ├── status.py
│       │   ├── styled.py
│       │   ├── style.py
│       │   ├── syntax.py
│       │   ├── table.py
│       │   ├── tabulate.py
│       │   ├── terminal_theme.py
│       │   ├── text.py
│       │   ├── theme.py
│       │   ├── themes.py
│       │   ├── _timer.py
│       │   ├── traceback.py
│       │   ├── tree.py
│       │   ├── _windows.py
│       │   └── _wrap.py
│       ├── six.py
│       ├── [01;34mtenacity[0m
│       │   ├── after.py
│       │   ├── _asyncio.py
│       │   ├── before.py
│       │   ├── before_sleep.py
│       │   ├── __init__.py
│       │   ├── nap.py
│       │   ├── [01;34m__pycache__[0m
│       │   │   ├── after.cpython-310.pyc
│       │   │   ├── _asyncio.cpython-310.pyc
│       │   │   ├── before.cpython-310.pyc
│       │   │   ├── before_sleep.cpython-310.pyc
│       │   │   ├── __init__.cpython-310.pyc
│       │   │   ├── nap.cpython-310.pyc
│       │   │   ├── retry.cpython-310.pyc
│       │   │   ├── stop.cpython-310.pyc
│       │   │   ├── tornadoweb.cpython-310.pyc
│       │   │   ├── _utils.cpython-310.pyc
│       │   │   └── wait.cpython-310.pyc
│       │   ├── retry.py
│       │   ├── stop.py
│       │   ├── tornadoweb.py
│       │   ├── _utils.py
│       │   └── wait.py
│       ├── [01;34mtomli[0m
│       │   ├── __init__.py
│       │   ├── _parser.py
│       │   ├── [01;34m__pycache__[0m
│       │   │   ├── __init__.cpython-310.pyc
│       │   │   ├── _parser.cpython-310.pyc
│       │   │   └── _re.cpython-310.pyc
│       │   └── _re.py
│       ├── typing_extensions.py
│       ├── [01;34murllib3[0m
│       │   ├── _collections.py
│       │   ├── connectionpool.py
│       │   ├── connection.py
│       │   ├── [01;34mcontrib[0m
│       │   │   ├── _appengine_environ.py
│       │   │   ├── appengine.py
│       │   │   ├── __init__.py
│       │   │   ├── ntlmpool.py
│       │   │   ├── [01;34m__pycache__[0m
│       │   │   │   ├── appengine.cpython-310.pyc
│       │   │   │   ├── _appengine_environ.cpython-310.pyc
│       │   │   │   ├── __init__.cpython-310.pyc
│       │   │   │   ├── ntlmpool.cpython-310.pyc
│       │   │   │   ├── pyopenssl.cpython-310.pyc
│       │   │   │   ├── securetransport.cpython-310.pyc
│       │   │   │   └── socks.cpython-310.pyc
│       │   │   ├── pyopenssl.py
│       │   │   ├── [01;34m_securetransport[0m
│       │   │   │   ├── bindings.py
│       │   │   │   ├── __init__.py
│       │   │   │   ├── low_level.py
│       │   │   │   └── [01;34m__pycache__[0m
│       │   │   │       ├── bindings.cpython-310.pyc
│       │   │   │       ├── __init__.cpython-310.pyc
│       │   │   │       └── low_level.cpython-310.pyc
│       │   │   ├── securetransport.py
│       │   │   └── socks.py
│       │   ├── exceptions.py
│       │   ├── fields.py
│       │   ├── filepost.py
│       │   ├── __init__.py
│       │   ├── [01;34mpackages[0m
│       │   │   ├── [01;34mbackports[0m
│       │   │   │   ├── __init__.py
│       │   │   │   ├── makefile.py
│       │   │   │   └── [01;34m__pycache__[0m
│       │   │   │       ├── __init__.cpython-310.pyc
│       │   │   │       └── makefile.cpython-310.pyc
│       │   │   ├── __init__.py
│       │   │   ├── [01;34m__pycache__[0m
│       │   │   │   ├── __init__.cpython-310.pyc
│       │   │   │   └── six.cpython-310.pyc
│       │   │   └── six.py
│       │   ├── poolmanager.py
│       │   ├── [01;34m__pycache__[0m
│       │   │   ├── _collections.cpython-310.pyc
│       │   │   ├── connection.cpython-310.pyc
│       │   │   ├── connectionpool.cpython-310.pyc
│       │   │   ├── exceptions.cpython-310.pyc
│       │   │   ├── fields.cpython-310.pyc
│       │   │   ├── filepost.cpython-310.pyc
│       │   │   ├── __init__.cpython-310.pyc
│       │   │   ├── poolmanager.cpython-310.pyc
│       │   │   ├── request.cpython-310.pyc
│       │   │   ├── response.cpython-310.pyc
│       │   │   └── _version.cpython-310.pyc
│       │   ├── request.py
│       │   ├── response.py
│       │   ├── [01;34mutil[0m
│       │   │   ├── connection.py
│       │   │   ├── __init__.py
│       │   │   ├── proxy.py
│       │   │   ├── [01;34m__pycache__[0m
│       │   │   │   ├── connection.cpython-310.pyc
│       │   │   │   ├── __init__.cpython-310.pyc
│       │   │   │   ├── proxy.cpython-310.pyc
│       │   │   │   ├── queue.cpython-310.pyc
│       │   │   │   ├── request.cpython-310.pyc
│       │   │   │   ├── response.cpython-310.pyc
│       │   │   │   ├── retry.cpython-310.pyc
│       │   │   │   ├── ssl_.cpython-310.pyc
│       │   │   │   ├── ssl_match_hostname.cpython-310.pyc
│       │   │   │   ├── ssltransport.cpython-310.pyc
│       │   │   │   ├── timeout.cpython-310.pyc
│       │   │   │   ├── url.cpython-310.pyc
│       │   │   │   └── wait.cpython-310.pyc
│       │   │   ├── queue.py
│       │   │   ├── request.py
│       │   │   ├── response.py
│       │   │   ├── retry.py
│       │   │   ├── ssl_match_hostname.py
│       │   │   ├── ssl_.py
│       │   │   ├── ssltransport.py
│       │   │   ├── timeout.py
│       │   │   ├── url.py
│       │   │   └── wait.py
│       │   └── _version.py
│       ├── vendor.txt
│       └── [01;34mwebencodings[0m
│           ├── __init__.py
│           ├── labels.py
│           ├── mklabels.py
│           ├── [01;34m__pycache__[0m
│           │   ├── __init__.cpython-310.pyc
│           │   ├── labels.cpython-310.pyc
│           │   ├── mklabels.cpython-310.pyc
│           │   ├── tests.cpython-310.pyc
│           │   └── x_user_defined.cpython-310.pyc
│           ├── tests.py
│           └── x_user_defined.py
├── [01;34mpip-22.0.2.dist-info[0m
│   ├── entry_points.txt
│   ├── INSTALLER
│   ├── LICENSE.txt
│   ├── METADATA
│   ├── RECORD
│   ├── REQUESTED
│   ├── top_level.txt
│   └── WHEEL
├── [01;34mpkg_resources[0m
│   ├── [01;34mextern[0m
│   │   ├── __init__.py
│   │   └── [01;34m__pycache__[0m
│   │       └── __init__.cpython-310.pyc
│   ├── __init__.py
│   ├── [01;34m__pycache__[0m
│   │   └── __init__.cpython-310.pyc
│   ├── [01;34mtests[0m
│   │   └── [01;34mdata[0m
│   │       └── [01;34mmy-test-package-source[0m
│   │           ├── [01;34m__pycache__[0m
│   │           │   └── setup.cpython-310.pyc
│   │           └── setup.py
│   └── [01;34m_vendor[0m
│       ├── appdirs.py
│       ├── __init__.py
│       ├── [01;34mpackaging[0m
│       │   ├── __about__.py
│       │   ├── __init__.py
│       │   ├── _manylinux.py
│       │   ├── markers.py
│       │   ├── _musllinux.py
│       │   ├── [01;34m__pycache__[0m
│       │   │   ├── __about__.cpython-310.pyc
│       │   │   ├── __init__.cpython-310.pyc
│       │   │   ├── _manylinux.cpython-310.pyc
│       │   │   ├── markers.cpython-310.pyc
│       │   │   ├── _musllinux.cpython-310.pyc
│       │   │   ├── requirements.cpython-310.pyc
│       │   │   ├── specifiers.cpython-310.pyc
│       │   │   ├── _structures.cpython-310.pyc
│       │   │   ├── tags.cpython-310.pyc
│       │   │   ├── utils.cpython-310.pyc
│       │   │   └── version.cpython-310.pyc
│       │   ├── requirements.py
│       │   ├── specifiers.py
│       │   ├── _structures.py
│       │   ├── tags.py
│       │   ├── utils.py
│       │   └── version.py
│       ├── [01;34m__pycache__[0m
│       │   ├── appdirs.cpython-310.pyc
│       │   ├── __init__.cpython-310.pyc
│       │   └── pyparsing.cpython-310.pyc
│       └── pyparsing.py
├── [01;34msetuptools[0m
│   ├── archive_util.py
│   ├── build_meta.py
│   ├── cli-32.exe
│   ├── cli-64.exe
│   ├── cli-arm64.exe
│   ├── cli.exe
│   ├── [01;34mcommand[0m
│   │   ├── alias.py
│   │   ├── bdist_egg.py
│   │   ├── bdist_rpm.py
│   │   ├── build_clib.py
│   │   ├── build_ext.py
│   │   ├── build_py.py
│   │   ├── develop.py
│   │   ├── dist_info.py
│   │   ├── easy_install.py
│   │   ├── egg_info.py
│   │   ├── __init__.py
│   │   ├── install_egg_info.py
│   │   ├── install_lib.py
│   │   ├── install.py
│   │   ├── install_scripts.py
│   │   ├── launcher manifest.xml
│   │   ├── py36compat.py
│   │   ├── [01;34m__pycache__[0m
│   │   │   ├── alias.cpython-310.pyc
│   │   │   ├── bdist_egg.cpython-310.pyc
│   │   │   ├── bdist_rpm.cpython-310.pyc
│   │   │   ├── build_clib.cpython-310.pyc
│   │   │   ├── build_ext.cpython-310.pyc
│   │   │   ├── build_py.cpython-310.pyc
│   │   │   ├── develop.cpython-310.pyc
│   │   │   ├── dist_info.cpython-310.pyc
│   │   │   ├── easy_install.cpython-310.pyc
│   │   │   ├── egg_info.cpython-310.pyc
│   │   │   ├── __init__.cpython-310.pyc
│   │   │   ├── install.cpython-310.pyc
│   │   │   ├── install_egg_info.cpython-310.pyc
│   │   │   ├── install_lib.cpython-310.pyc
│   │   │   ├── install_scripts.cpython-310.pyc
│   │   │   ├── py36compat.cpython-310.pyc
│   │   │   ├── register.cpython-310.pyc
│   │   │   ├── rotate.cpython-310.pyc
│   │   │   ├── saveopts.cpython-310.pyc
│   │   │   ├── sdist.cpython-310.pyc
│   │   │   ├── setopt.cpython-310.pyc
│   │   │   ├── test.cpython-310.pyc
│   │   │   ├── upload.cpython-310.pyc
│   │   │   └── upload_docs.cpython-310.pyc
│   │   ├── register.py
│   │   ├── rotate.py
│   │   ├── saveopts.py
│   │   ├── sdist.py
│   │   ├── setopt.py
│   │   ├── test.py
│   │   ├── upload_docs.py
│   │   └── upload.py
│   ├── config.py
│   ├── depends.py
│   ├── _deprecation_warning.py
│   ├── dep_util.py
│   ├── dist.py
│   ├── [01;34m_distutils[0m
│   │   ├── archive_util.py
│   │   ├── bcppcompiler.py
│   │   ├── ccompiler.py
│   │   ├── cmd.py
│   │   ├── [01;34mcommand[0m
│   │   │   ├── bdist_dumb.py
│   │   │   ├── bdist_msi.py
│   │   │   ├── bdist.py
│   │   │   ├── bdist_rpm.py
│   │   │   ├── bdist_wininst.py
│   │   │   ├── build_clib.py
│   │   │   ├── build_ext.py
│   │   │   ├── build.py
│   │   │   ├── build_py.py
│   │   │   ├── build_scripts.py
│   │   │   ├── check.py
│   │   │   ├── clean.py
│   │   │   ├── config.py
│   │   │   ├── __init__.py
│   │   │   ├── install_data.py
│   │   │   ├── install_egg_info.py
│   │   │   ├── install_headers.py
│   │   │   ├── install_lib.py
│   │   │   ├── install.py
│   │   │   ├── install_scripts.py
│   │   │   ├── py37compat.py
│   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   ├── bdist.cpython-310.pyc
│   │   │   │   ├── bdist_dumb.cpython-310.pyc
│   │   │   │   ├── bdist_msi.cpython-310.pyc
│   │   │   │   ├── bdist_rpm.cpython-310.pyc
│   │   │   │   ├── bdist_wininst.cpython-310.pyc
│   │   │   │   ├── build_clib.cpython-310.pyc
│   │   │   │   ├── build.cpython-310.pyc
│   │   │   │   ├── build_ext.cpython-310.pyc
│   │   │   │   ├── build_py.cpython-310.pyc
│   │   │   │   ├── build_scripts.cpython-310.pyc
│   │   │   │   ├── check.cpython-310.pyc
│   │   │   │   ├── clean.cpython-310.pyc
│   │   │   │   ├── config.cpython-310.pyc
│   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   ├── install.cpython-310.pyc
│   │   │   │   ├── install_data.cpython-310.pyc
│   │   │   │   ├── install_egg_info.cpython-310.pyc
│   │   │   │   ├── install_headers.cpython-310.pyc
│   │   │   │   ├── install_lib.cpython-310.pyc
│   │   │   │   ├── install_scripts.cpython-310.pyc
│   │   │   │   ├── py37compat.cpython-310.pyc
│   │   │   │   ├── register.cpython-310.pyc
│   │   │   │   ├── sdist.cpython-310.pyc
│   │   │   │   └── upload.cpython-310.pyc
│   │   │   ├── register.py
│   │   │   ├── sdist.py
│   │   │   └── upload.py
│   │   ├── config.py
│   │   ├── core.py
│   │   ├── cygwinccompiler.py
│   │   ├── debug.py
│   │   ├── dep_util.py
│   │   ├── dir_util.py
│   │   ├── dist.py
│   │   ├── errors.py
│   │   ├── extension.py
│   │   ├── fancy_getopt.py
│   │   ├── filelist.py
│   │   ├── file_util.py
│   │   ├── __init__.py
│   │   ├── log.py
│   │   ├── msvc9compiler.py
│   │   ├── _msvccompiler.py
│   │   ├── msvccompiler.py
│   │   ├── py35compat.py
│   │   ├── py38compat.py
│   │   ├── [01;34m__pycache__[0m
│   │   │   ├── archive_util.cpython-310.pyc
│   │   │   ├── bcppcompiler.cpython-310.pyc
│   │   │   ├── ccompiler.cpython-310.pyc
│   │   │   ├── cmd.cpython-310.pyc
│   │   │   ├── config.cpython-310.pyc
│   │   │   ├── core.cpython-310.pyc
│   │   │   ├── cygwinccompiler.cpython-310.pyc
│   │   │   ├── debug.cpython-310.pyc
│   │   │   ├── dep_util.cpython-310.pyc
│   │   │   ├── dir_util.cpython-310.pyc
│   │   │   ├── dist.cpython-310.pyc
│   │   │   ├── errors.cpython-310.pyc
│   │   │   ├── extension.cpython-310.pyc
│   │   │   ├── fancy_getopt.cpython-310.pyc
│   │   │   ├── filelist.cpython-310.pyc
│   │   │   ├── file_util.cpython-310.pyc
│   │   │   ├── __init__.cpython-310.pyc
│   │   │   ├── log.cpython-310.pyc
│   │   │   ├── msvc9compiler.cpython-310.pyc
│   │   │   ├── _msvccompiler.cpython-310.pyc
│   │   │   ├── msvccompiler.cpython-310.pyc
│   │   │   ├── py35compat.cpython-310.pyc
│   │   │   ├── py38compat.cpython-310.pyc
│   │   │   ├── spawn.cpython-310.pyc
│   │   │   ├── sysconfig.cpython-310.pyc
│   │   │   ├── text_file.cpython-310.pyc
│   │   │   ├── unixccompiler.cpython-310.pyc
│   │   │   ├── util.cpython-310.pyc
│   │   │   ├── version.cpython-310.pyc
│   │   │   └── versionpredicate.cpython-310.pyc
│   │   ├── spawn.py
│   │   ├── sysconfig.py
│   │   ├── text_file.py
│   │   ├── unixccompiler.py
│   │   ├── util.py
│   │   ├── versionpredicate.py
│   │   └── version.py
│   ├── errors.py
│   ├── extension.py
│   ├── [01;34mextern[0m
│   │   ├── __init__.py
│   │   └── [01;34m__pycache__[0m
│   │       └── __init__.cpython-310.pyc
│   ├── glob.py
│   ├── gui-32.exe
│   ├── gui-64.exe
│   ├── gui-arm64.exe
│   ├── gui.exe
│   ├── _imp.py
│   ├── __init__.py
│   ├── installer.py
│   ├── launch.py
│   ├── monkey.py
│   ├── msvc.py
│   ├── namespaces.py
│   ├── package_index.py
│   ├── py34compat.py
│   ├── [01;34m__pycache__[0m
│   │   ├── archive_util.cpython-310.pyc
│   │   ├── build_meta.cpython-310.pyc
│   │   ├── config.cpython-310.pyc
│   │   ├── depends.cpython-310.pyc
│   │   ├── _deprecation_warning.cpython-310.pyc
│   │   ├── dep_util.cpython-310.pyc
│   │   ├── dist.cpython-310.pyc
│   │   ├── errors.cpython-310.pyc
│   │   ├── extension.cpython-310.pyc
│   │   ├── glob.cpython-310.pyc
│   │   ├── _imp.cpython-310.pyc
│   │   ├── __init__.cpython-310.pyc
│   │   ├── installer.cpython-310.pyc
│   │   ├── launch.cpython-310.pyc
│   │   ├── monkey.cpython-310.pyc
│   │   ├── msvc.cpython-310.pyc
│   │   ├── namespaces.cpython-310.pyc
│   │   ├── package_index.cpython-310.pyc
│   │   ├── py34compat.cpython-310.pyc
│   │   ├── sandbox.cpython-310.pyc
│   │   ├── unicode_utils.cpython-310.pyc
│   │   ├── version.cpython-310.pyc
│   │   ├── wheel.cpython-310.pyc
│   │   └── windows_support.cpython-310.pyc
│   ├── sandbox.py
│   ├── script (dev).tmpl
│   ├── script.tmpl
│   ├── unicode_utils.py
│   ├── [01;34m_vendor[0m
│   │   ├── __init__.py
│   │   ├── [01;34mmore_itertools[0m
│   │   │   ├── __init__.py
│   │   │   ├── more.py
│   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   ├── more.cpython-310.pyc
│   │   │   │   └── recipes.cpython-310.pyc
│   │   │   └── recipes.py
│   │   ├── ordered_set.py
│   │   ├── [01;34mpackaging[0m
│   │   │   ├── __about__.py
│   │   │   ├── __init__.py
│   │   │   ├── _manylinux.py
│   │   │   ├── markers.py
│   │   │   ├── _musllinux.py
│   │   │   ├── [01;34m__pycache__[0m
│   │   │   │   ├── __about__.cpython-310.pyc
│   │   │   │   ├── __init__.cpython-310.pyc
│   │   │   │   ├── _manylinux.cpython-310.pyc
│   │   │   │   ├── markers.cpython-310.pyc
│   │   │   │   ├── _musllinux.cpython-310.pyc
│   │   │   │   ├── requirements.cpython-310.pyc
│   │   │   │   ├── specifiers.cpython-310.pyc
│   │   │   │   ├── _structures.cpython-310.pyc
│   │   │   │   ├── tags.cpython-310.pyc
│   │   │   │   ├── utils.cpython-310.pyc
│   │   │   │   └── version.cpython-310.pyc
│   │   │   ├── requirements.py
│   │   │   ├── specifiers.py
│   │   │   ├── _structures.py
│   │   │   ├── tags.py
│   │   │   ├── utils.py
│   │   │   └── version.py
│   │   ├── [01;34m__pycache__[0m
│   │   │   ├── __init__.cpython-310.pyc
│   │   │   ├── ordered_set.cpython-310.pyc
│   │   │   └── pyparsing.cpython-310.pyc
│   │   └── pyparsing.py
│   ├── version.py
│   ├── wheel.py
│   └── windows_support.py
├── [01;34msetuptools-59.6.0.dist-info[0m
│   ├── entry_points.txt
│   ├── INSTALLER
│   ├── LICENSE
│   ├── METADATA
│   ├── RECORD
│   ├── REQUESTED
│   ├── top_level.txt
│   └── WHEEL
├── [01;34mwerkzeug[0m
│   ├── [01;34mdatastructures[0m
│   │   ├── accept.py
│   │   ├── accept.pyi
│   │   ├── auth.py
│   │   ├── cache_control.py
│   │   ├── cache_control.pyi
│   │   ├── csp.py
│   │   ├── csp.pyi
│   │   ├── etag.py
│   │   ├── etag.pyi
│   │   ├── file_storage.py
│   │   ├── file_storage.pyi
│   │   ├── headers.py
│   │   ├── headers.pyi
│   │   ├── __init__.py
│   │   ├── mixins.py
│   │   ├── mixins.pyi
│   │   ├── [01;34m__pycache__[0m
│   │   │   ├── accept.cpython-310.pyc
│   │   │   ├── auth.cpython-310.pyc
│   │   │   ├── cache_control.cpython-310.pyc
│   │   │   ├── csp.cpython-310.pyc
│   │   │   ├── etag.cpython-310.pyc
│   │   │   ├── file_storage.cpython-310.pyc
│   │   │   ├── headers.cpython-310.pyc
│   │   │   ├── __init__.cpython-310.pyc
│   │   │   ├── mixins.cpython-310.pyc
│   │   │   ├── range.cpython-310.pyc
│   │   │   └── structures.cpython-310.pyc
│   │   ├── range.py
│   │   ├── range.pyi
│   │   ├── structures.py
│   │   └── structures.pyi
│   ├── [01;34mdebug[0m
│   │   ├── console.py
│   │   ├── __init__.py
│   │   ├── [01;34m__pycache__[0m
│   │   │   ├── console.cpython-310.pyc
│   │   │   ├── __init__.cpython-310.pyc
│   │   │   ├── repr.cpython-310.pyc
│   │   │   └── tbtools.cpython-310.pyc
│   │   ├── repr.py
│   │   ├── [01;34mshared[0m
│   │   │   ├── [01;35mconsole.png[0m
│   │   │   ├── debugger.js
│   │   │   ├── ICON_LICENSE.md
│   │   │   ├── [01;35mless.png[0m
│   │   │   ├── [01;35mmore.png[0m
│   │   │   └── style.css
│   │   └── tbtools.py
│   ├── exceptions.py
│   ├── formparser.py
│   ├── http.py
│   ├── __init__.py
│   ├── _internal.py
│   ├── local.py
│   ├── [01;34mmiddleware[0m
│   │   ├── dispatcher.py
│   │   ├── http_proxy.py
│   │   ├── __init__.py
│   │   ├── lint.py
│   │   ├── profiler.py
│   │   ├── proxy_fix.py
│   │   ├── [01;34m__pycache__[0m
│   │   │   ├── dispatcher.cpython-310.pyc
│   │   │   ├── http_proxy.cpython-310.pyc
│   │   │   ├── __init__.cpython-310.pyc
│   │   │   ├── lint.cpython-310.pyc
│   │   │   ├── profiler.cpython-310.pyc
│   │   │   ├── proxy_fix.cpython-310.pyc
│   │   │   └── shared_data.cpython-310.pyc
│   │   └── shared_data.py
│   ├── [01;34m__pycache__[0m
│   │   ├── exceptions.cpython-310.pyc
│   │   ├── formparser.cpython-310.pyc
│   │   ├── http.cpython-310.pyc
│   │   ├── __init__.cpython-310.pyc
│   │   ├── _internal.cpython-310.pyc
│   │   ├── local.cpython-310.pyc
│   │   ├── _reloader.cpython-310.pyc
│   │   ├── security.cpython-310.pyc
│   │   ├── serving.cpython-310.pyc
│   │   ├── testapp.cpython-310.pyc
│   │   ├── test.cpython-310.pyc
│   │   ├── urls.cpython-310.pyc
│   │   ├── user_agent.cpython-310.pyc
│   │   ├── utils.cpython-310.pyc
│   │   └── wsgi.cpython-310.pyc
│   ├── py.typed
│   ├── _reloader.py
│   ├── [01;34mrouting[0m
│   │   ├── converters.py
│   │   ├── exceptions.py
│   │   ├── __init__.py
│   │   ├── map.py
│   │   ├── matcher.py
│   │   ├── [01;34m__pycache__[0m
│   │   │   ├── converters.cpython-310.pyc
│   │   │   ├── exceptions.cpython-310.pyc
│   │   │   ├── __init__.cpython-310.pyc
│   │   │   ├── map.cpython-310.pyc
│   │   │   ├── matcher.cpython-310.pyc
│   │   │   └── rules.cpython-310.pyc
│   │   └── rules.py
│   ├── [01;34msansio[0m
│   │   ├── http.py
│   │   ├── __init__.py
│   │   ├── multipart.py
│   │   ├── [01;34m__pycache__[0m
│   │   │   ├── http.cpython-310.pyc
│   │   │   ├── __init__.cpython-310.pyc
│   │   │   ├── multipart.cpython-310.pyc
│   │   │   ├── request.cpython-310.pyc
│   │   │   ├── response.cpython-310.pyc
│   │   │   └── utils.cpython-310.pyc
│   │   ├── request.py
│   │   ├── response.py
│   │   └── utils.py
│   ├── security.py
│   ├── serving.py
│   ├── testapp.py
│   ├── test.py
│   ├── urls.py
│   ├── user_agent.py
│   ├── utils.py
│   ├── [01;34mwrappers[0m
│   │   ├── __init__.py
│   │   ├── [01;34m__pycache__[0m
│   │   │   ├── __init__.cpython-310.pyc
│   │   │   ├── request.cpython-310.pyc
│   │   │   └── response.cpython-310.pyc
│   │   ├── request.py
│   │   └── response.py
│   └── wsgi.py
└── [01;34mwerkzeug-3.0.4.dist-info[0m
    ├── INSTALLER
    ├── LICENSE.txt
    ├── METADATA
    ├── RECORD
    └── WHEEL

195 directories, 1657 files
```

---

## ***Configuración y Ejecución de una Aplicación Flask***

---

### ***1. Crear el Directorio y el Fichero para la Aplicación***

- *Primero, creamos el directorio `src` dentro del entorno virtual para almacenar el fichero de la aplicación Flask.*

```bash
mkdir ./.venv/src
```

- *Luego, creamos el fichero `app.py` dentro del directorio `src`.*

```bash
touch ./src/app.py
```

---

### ***2. Escribir el Código de la Aplicación***

- *A continuación, editamos el fichero `app.py` con el siguiente código usando `nano` u otro editor de texto de tu preferencia.*

```bash
nano ./src/app.py
```

- *Contenido del fichero `app.py`:*

```python
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
```

**Explicación del Código:**

- **`from flask import Flask`:** *Importa la clase `Flask` del módulo `flask` para crear la aplicación web.*
  
- **`app = Flask(__name__)`:** *Crea una instancia de la aplicación Flask. `__name__` se pasa para permitir que Flask sepa dónde está el módulo actual.*

- **`@app.route("/")`:** *Define una ruta para la raíz (`"/"`) de la aplicación web.*

- **`def hello_world():`:** *Función que maneja las solicitudes a la ruta raíz. Devuelve el texto HTML `<p>Hello, World!</p>`.*

---

### ***3. Ejecutar la Aplicación Flask***

- *Para ejecutar la aplicación, asegúrate de que el entorno virtual esté activo. Si no lo está, actívalo con el siguiente comando.*

```bash
. ./venv/bin/activate
```

- *Luego, ejecuta el servidor Flask usando el siguiente comando. Asegúrate de que la variable de entorno `FLASK_APP` apunte al fichero `app.py`.*

```bash
flask --app ./src/app.py run
```

**Nota Importante:**

- *El comando `flask` solo funcionará si el entorno virtual está activo, ya que Flask está instalado dentro de él. Si el entorno virtual no está activo, se producirá un error.*

- *Para desactivar el entorno virtual, usa el siguiente comando:*

```bash
deactivate
```

- *Para salir del contenedor o del usuario `d4nitrix13`, simplemente cierra la sesión o usa el comando `exit`.*

---

### ***4. Verificar la Ejecución del Servidor***

- *Cuando el servidor Flask esté en ejecución, deberías ver una salida similar a la siguiente en la terminal:*

```bash
 * Serving Flask app './src/app.py'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
```

- *Puedes acceder a la aplicación en tu navegador web visitando [http://127.0.0.1:5000](http://127.0.0.1:5000 "http://127.0.0.1:5000").*

- *Para detener el servidor, presiona `CTRL+C` en la terminal.*

---

## ***Configurar Flask para Escuchar en Todas las Direcciones del Contenedor***

---

### ***1. Ejecutar el Servidor Flask en Todas las Direcciones***

**Para hacer que Flask escuche en todas las direcciones del contenedor (tanto en `localhost` como en la dirección IPv4 pública del contenedor), utiliza el siguiente comando:**

```bash
flask --app ./src/app.py run --host 0.0.0.0
```

**Explicación:**

- **`--host 0.0.0.0`:** *Esto le indica a Flask que debe escuchar en todas las interfaces de red disponibles en el contenedor.*

### ***2. Verificar que Flask Escucha en Todas las Direcciones***

**Después de ejecutar el comando anterior, deberías ver en la salida del terminal algo similar a esto:**

```bash
 * Serving Flask app './src/app.py'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://172.17.0.2:5000
Press CTRL+C to quit
```

**En este ejemplo:**

- **`http://127.0.0.1:5000`:** *Es la dirección `localhost` dentro del contenedor.*
- **`http://172.17.0.2:5000`:** *Es la dirección IPv4 pública del contenedor.*

### ***3. Acceder a la Aplicación desde el Navegador***

*Puedes acceder a la aplicación Flask desde un navegador o usar `curl` en la terminal. Si estás en la misma red local, puedes acceder a la aplicación usando la dirección IPv4 pública del contenedor. Por ejemplo:*

```bash
curl http://172.17.0.2:5000
```

**Esto debería devolver la respuesta de la aplicación Flask:**

```html
<p>Hello, World!</p>
```

### ***4. Verificar la Respuesta del Servidor***

**Para verificar si el servidor está respondiendo correctamente:**

1. **Abrir las Herramientas de Desarrollo del Navegador:**
   - *Presiona `Ctrl + Shift + C` (o `Cmd + Opt + I` en macOS) para abrir las herramientas de desarrollo.*

2. **Ir a la Sección de Red:**
   - *Recarga la página en el navegador y selecciona la primera petición en la sección de red.*

3. **Ver la Cabecera de la Respuesta:**
   - *Navega a la pestaña de **Cabeceras** y revisa la sección de **Respuesta**. Busca el dato `Server:` para confirmar que estás usando el servidor Flask de Python.*

   **Ejemplo de cabecera de respuesta:**

   ```bash
   HTTP/1.1 200 OK
   Server: Werkzeug/3.0.4 Python/3.10.12
   Date: Thu, 29 Aug 2024 01:04:43 GMT
   Content-Type: text/html; charset=utf-8
   Content-Length: 20
   Connection: close
   ```

4. **Revisar los Logs del Servidor:**
   - *En la terminal donde ejecutaste Flask, deberías ver mensajes de log que muestran la información de la petición recibida. Ejemplo:*

   ```bash
   172.17.0.1 - - [29/Aug/2024 01:07:24] "GET / HTTP/1.1" 200 -
   ```

> [!NOTE]
> *El servidor Flask está destinado para desarrollo. Para un entorno de producción, se recomienda usar un servidor WSGI como Gunicorn o uWSGI en combinación con un servidor web como Nginx o Apache.*

---

## ***Verificar la Dirección IP de Host***

---

### ***1. Obtener la Dirección IP del Host***

**Para verificar la dirección IP de la máquina host, puedes usar uno de los siguientes comandos en tu máquina host:**

**Opción 1: Usando `ip address`**

```bash
ip address show wlp6s0 | grep -iE "inet " --color=auto | awk '{print $2}' | cut -d'/' -f1
```

**Explicación:**

- **`ip address show wlp6s0`:** *Muestra la información de la interfaz `wlp6s0`. Asegúrate de reemplazar `wlp6s0` con el nombre de tu interfaz de red si es diferente.*
- **`grep -iE "inet " --color=auto`:** *Filtra las líneas que contienen "inet", donde aparece la dirección IP.*
- **`awk '{print $2}'`:** *Extrae la segunda columna de la línea filtrada, que contiene la dirección IP junto con la máscara (`192.168.1.17/24`).*
- **`cut -d'/' -f1`:** *Corta la dirección IP, eliminando la parte de la máscara (`/24`), dejando solo la dirección (`192.168.1.17`).*

**Opción 2: Usando `hostname -I`**

```bash
hostname -I | awk '{print $1}'
```

**Explicación:**

1. **`hostname -I`:**  
   - *Muestra todas las direcciones IP asignadas a la máquina, separadas por espacios. A diferencia de `ip address`, este comando solo muestra las direcciones IP sin información adicional como la máscara de subred o la interfaz.*
   - *Por ejemplo, podría devolver algo como `192.168.1.17 10.0.0.1`, si la máquina tiene más de una dirección IP.*

2. **`awk '{print $1}'`:**  
   - *`awk` es una herramienta de procesamiento de texto que divide una línea en campos, utilizando los espacios (por defecto) como delimitador.*
   - *`'{print $1}'` indica que solo se debe imprimir el primer campo de la salida, que corresponde a la primera dirección IP en la lista.*

---

## ***Iniciar el Servidor Flask de Manera Más Sencilla***

---

### ***1. Usar un Fichero `__init__.py`***

**Para simplificar el inicio del servidor Flask, puedes crear un fichero `__init__.py` en el directorio `./src`:**

```bash
touch ./src/__init__.py
```

**Opcionalmente, puedes agregar un comentario al fichero:**

```bash
nano ./src/__init__.py
```

```python
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me
```

**Ahora puedes iniciar el servidor Flask con la siguiente sintaxis de módulos:**

```bash
flask --app ./src/app run --host 0.0.0.0
```

**Salida esperada:**

```bash
(.venv) d4nitrix13@08b7c877e9f3:/App$ flask --app ./src/app run --host 0.0.0.0
 * Serving Flask app './src/app'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://172.17.0.2:5000
```

---

### ***2. Configurar una Variable de Entorno `FLASK_APP`***

**Otra manera sencilla de iniciar el servidor es configurar una variable de entorno `FLASK_APP` que almacene la ruta del fichero `app.py`:**

```bash
export FLASK_APP=./src/app.py
```

**Explicación:**

- **`export FLASK_APP=./src/app.py`:** *Esto define la variable de entorno `FLASK_APP`, que Flask usará para localizar el fichero de la aplicación.*

**Luego, puedes iniciar el servidor Flask sin especificar la ruta del fichero cada vez:**

```bash
flask run --host 0.0.0.0
```

**Salida esperada:**

```bash
(.venv) d4nitrix13@08b7c877e9f3:/App$ flask run --host 0.0.0.0
 * Serving Flask app './src/app.py'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://172.17.0.2:5000
Press CTRL+C to quit
```

> [!TIP]
> *Recuerda que el servidor Flask está destinado para desarrollo. Para un entorno de producción, se recomienda usar un servidor WSGI como Gunicorn o uWSGI en combinación con un servidor web como Nginx o Apache.*

---

## ***Crear un Fichero `requirements.txt` para Gestionar Dependencias en Python***

---

### ***1. Crear el Fichero `requirements.txt`***

**Para gestionar las dependencias de tu proyecto Python, debes crear un fichero llamado `requirements.txt`. La sintaxis básica para el fichero es simple:**

```bash
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

pkg1
pkg2>=1.0,<=2.0
pkg3==3.0.1
```

**Explicación:**

- **`pkg1`:** *Especifica una dependencia sin versión fija. Pip instalará la última versión disponible.*
- **`pkg2>=1.0,<=2.0`:** *Especifica una dependencia con un rango de versiones. Pip instalará cualquier versión de `pkg2` entre 1.0 y 2.0, inclusive.*
- **`pkg3==3.0.1`:** *Especifica una dependencia con una versión exacta. Pip instalará exactamente la versión 3.0.1 de `pkg3`.*

**Para tu proyecto, si solo necesitas Flask, el fichero `requirements.txt` debería contener:**

```bash
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

flask
```

*Para más información sobre ficheros de requisitos, puedes consultar la [documentación oficial de pip](https://pip.pypa.io/en/stable/user_guide/#requirements-files "https://pip.pypa.io/en/stable/user_guide/#requirements-files").*

---

### ***2. Configurar el Entorno Virtual y las Dependencias***

**Si necesitas actualizar o crear un nuevo entorno virtual para tu proyecto, sigue estos pasos:**

**Desactivar el Entorno Virtual (si está activado):**

```bash
deactivate
```

**Eliminar el Entorno Virtual Anterior:**

```bash
rm -rf ./.venv
```

**Crear un Nuevo Entorno Virtual:**

```bash
python3 -m venv ./.venv
```

**Activar el Nuevo Entorno Virtual:**

```bash
source ./.venv/bin/activate
```

**Instalar las Dependencias desde `requirements.txt`:**

```bash
pip install -r requirements.txt
```

**Explicación:**

- **`-r`:** *La flag `-r` indica a `pip` que lea las dependencias desde un fichero de requisitos. En este caso, `requirements.txt` contiene la lista de paquetes que `pip` debe instalar.*

---

**Con estos pasos, habrás configurado tu entorno de desarrollo con Flask y cualquier otra dependencia que necesites.**

> [!IMPORTANT]
> *Asegúrate de mantener el fichero `requirements.txt` actualizado con cualquier nueva dependencia que añadas a tu proyecto para garantizar que todos los entornos de desarrollo y producción sean consistentes.*

```bash
(.venv) d4nitrix13@08b7c877e9f3:/App$ pip install -r requirements.txt
Collecting flask
  Using cached flask-3.0.3-py3-none-any.whl (101 kB)
Collecting Jinja2>=3.1.2
  Using cached jinja2-3.1.4-py3-none-any.whl (133 kB)
Collecting blinker>=1.6.2
  Using cached blinker-1.8.2-py3-none-any.whl (9.5 kB)
Collecting click>=8.1.3
  Using cached click-8.1.7-py3-none-any.whl (97 kB)
Collecting itsdangerous>=2.1.2
  Using cached itsdangerous-2.2.0-py3-none-any.whl (16 kB)
Collecting Werkzeug>=3.0.0
  Using cached werkzeug-3.0.4-py3-none-any.whl (227 kB)
Collecting MarkupSafe>=2.0
  Using cached MarkupSafe-2.1.5-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (25 kB)
Installing collected packages: MarkupSafe, itsdangerous, click, blinker, Werkzeug, Jinja2, flask
Successfully installed Jinja2-3.1.4 MarkupSafe-2.1.5 Werkzeug-3.0.4 blinker-1.8.2 click-8.1.7 flask-3.0.3 itsdangerous-2.2.0
```

---

### ***4. Verificar que la Aplicación Sigue Funcionando***

**Después de haber configurado el entorno y las dependencias, asegúrate de que la aplicación Flask sigue funcionando correctamente. Ejecuta el siguiente comando para iniciar el servidor Flask:**

```bash
(.venv) d4nitrix13@08b7c877e9f3:/App$ flask run --host 0.0.0.0
 * Serving Flask app './src/app.py'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://172.17.0.2:5000
Press CTRL+C to quit
```

**Esto confirma que Flask está escuchando en todas las direcciones del contenedor y en las direcciones `localhost` y la IP pública del contenedor. Puedes acceder a la aplicación en la dirección `http://172.17.0.2:5000` desde tu navegador.**

### ***5. Configurar el Fichero `.dockerignore`***

**Antes de crear el `Dockerfile`, es importante configurar el fichero `.dockerignore` para excluir ficheros y directorios que no son necesarios para la construcción de la imagen Docker. Esto optimiza la construcción y evita la inclusión de ficheros innecesarios. Crea y edita el fichero `.dockerignore` de la siguiente manera:**

```bash
nano ./.dockerignore
```

**Contenido del fichero `.dockerignore`:**

```bash
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

Dockerfile
.venv
.gitignore
.dockerignore
__pycache__
```

- **`Dockerfile`:** *El fichero Dockerfile en sí mismo no es necesario en la imagen.*
- **`.venv`:** *El directorio del entorno virtual que no debe ser incluido en la imagen.*
- **`.gitignore` y `.dockerignore`:** *Estos ficheros son útiles para el control de versiones y la construcción, pero no deben ser incluidos en la imagen.*
- **`__pycache__`:** *Directorio generado automáticamente para acelerar la ejecución de módulos Python.*

### ***6. Configurar el Fichero `.gitignore`***

**Si estás usando Git, también debes configurar el fichero `.gitignore` para excluir ficheros y directorios innecesarios del repositorio. Esto evita que ficheros generados automáticamente y dependencias se incluyan en el control de versiones. Crea y edita el fichero `.gitignore` de la siguiente manera:**

```bash
nano ./.gitignore
```

**Contenido del fichero `.gitignore`:**

```bash
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

.venv
.gitignore
__pycache__
```

- **`.venv`:** *El directorio del entorno virtual que no debe ser incluido en el repositorio.*
- **`.gitignore`:** *El propio fichero `.gitignore` no necesita ser incluido en el repositorio.*
- **`__pycache__`:** *Directorios de caché generados automáticamente que no deben ser versionados.*

---

> [!NOTE]
> *Recuerda revisar y ajustar el contenido de los ficheros `.dockerignore` y `.gitignore` según las necesidades específicas de tu proyecto. Esto garantizará que tu imagen Docker y tu repositorio Git se mantengan limpios y eficientes.*
