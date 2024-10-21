<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->

# ***Pipenv una alternativa moderna a pip***

---

> [!NOTE]
> *Ahora utilizaremos una alternativa para gestionar nuestros entornos y dependencias en Python usando **Pipenv**. Este es un administrador de entornos virtuales y dependencias que facilita la gestión de proyectos Python. Puedes encontrar más información en la documentación oficial: [Pipenv Documentation](https://pipenv-es.readthedocs.io/es/latest/) y en [PyPI](https://pypi.org/project/pipenv/).*

**Existen dos métodos para instalar **Pipenv**:**

---

## ***Método 1: Instalación a través de PPA (Ubuntu/Debian)***

**Este método utiliza un repositorio personal de paquetes (PPA) para instalar **Pipenv** en sistemas basados en Debian/Ubuntu:**

```bash
sudo apt install software-properties-common python-software-properties -y
sudo add-apt-repository ppa:pypa/ppa -y
sudo apt update
sudo apt install pipenv -y
```

---

### ***Método 2: Instalación con `pip`***

**Este método es más directo y no depende de un PPA:**

```bash
pip install pipenv
```

---

### ***Instalación de Pipenv en un Contenedor Docker***

**Antes de integrar **Pipenv** en un `Dockerfile`, primero practicaremos su instalación en un contenedor Docker. A continuación, se muestra cómo iniciar un contenedor y preparar el entorno:**

1. **Inicia el contenedor:**

    ```bash
    docker start -i python-practicas
    ```

2. **Actualiza la lista de paquetes e instala `python3-pip`:**

    ```bash
    apt update && apt install -y python3-pip
    ```

    **Esto asegura que el módulo `pip` esté instalado y actualizado.**

3. **Verifica la instalación de `pip`:**

    ```bash
    root@08b7c877e9f3:/App# pip --version
    pip 22.0.2 from /usr/lib/python3/dist-packages/pip (python 3.10)
    ```

    **También puedes verificarlo con el siguiente comando:**

    ```bash
    root@08b7c877e9f3:/App# python3 -m pip --version
    pip 22.0.2 from /usr/lib/python3/dist-packages/pip (python 3.10)
    ```

4. **Instala *Pipenv* dentro del contenedor:**

    ```bash
    pip install pipenv
    ```

    **Durante la instalación, verás un proceso similar al siguiente:**

    ```bash
    Collecting pipenv
      Downloading pipenv-2024.0.1-py3-none-any.whl (3.2 MB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 3.2/3.2 MB 6.2 MB/s eta 0:00:00
    Collecting setuptools>=67
      Downloading setuptools-74.0.0-py3-none-any.whl (1.3 MB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 1.3/1.3 MB 16.8 MB/s eta 0:00:00
    Collecting virtualenv>=20.24.2
      Downloading virtualenv-20.26.3-py3-none-any.whl (5.7 MB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 5.7/5.7 MB 18.6 MB/s eta 0:00:00
    Collecting certifi
      Downloading certifi-2024.8.30-py3-none-any.whl (167 kB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 167.3/167.3 KB 4.8 MB/s eta 0:00:00
    Collecting filelock<4,>=3.12.2
      Downloading filelock-3.15.4-py3-none-any.whl (16 kB)
    Collecting distlib<1,>=0.3.7
      Downloading distlib-0.3.8-py2.py3-none-any.whl (468 kB)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 468.9/468.9 KB 19.7 MB/s eta 0:00:00
    Collecting platformdirs<5,>=3.9.1
      Downloading platformdirs-4.2.2-py3-none-any.whl (18 kB)
    Installing collected packages: distlib, setuptools, platformdirs, filelock, certifi, virtualenv, pipenv
      Attempting uninstall: setuptools
        Found existing installation: setuptools 59.6.0
        Not uninstalling setuptools at /usr/lib/python3/dist-packages, outside environment /usr
        Can't uninstall 'setuptools'. No files were found to uninstall.
    Successfully installed certifi-2024.8.30 distlib-0.3.8 filelock-3.15.4 pipenv-2024.0.1 platformdirs-4.2.2 setuptools-74.0.0 virtualenv-20.26.3
    ```

5. **Advertencia importante:**

    **Durante la instalación, es posible que veas la siguiente advertencia:**

    ```bash
    WARNING: Running pip as the 'root' user can result in broken permissions and conflicting behaviour with the system package manager. It is recommended to use a virtual environment instead: https://pip.pypa.io/warnings/venv
    ```

    **ADVERTENCIA:** *Ejecutar `pip` como el usuario 'root' puede causar problemas con los permisos y generar conflictos con el gestor de paquetes del sistema. Es recomendable utilizar un entorno virtual para evitar estos inconvenientes. Consulta la guía en [https://pip.pypa.io/warnings/venv](https://pip.pypa.io/warnings/venv "https://pip.pypa.io/warnings/venv") para más detalles.*

---

## ***Verificación de la instalación de Pipenv***

*Para comprobar si `pipenv` se ha instalado correctamente, ejecuta el siguiente comando:*

```bash
pipenv --help
```

**Deberías ver un resultado similar al siguiente, que proporciona un resumen de las opciones y comandos disponibles en Pipenv:**

```bash
Usage: pipenv [OPTIONS] COMMAND [ARGS]...

Options:
  --where                         Output project home information.
  --venv                          Output virtualenv information.
  --py                            Output Python interpreter information.
  --envs                          Output Environment Variable options.
  --rm                            Remove the virtualenv.
  --bare                          Minimal output.
  --man                           Display manpage.
  --support                       Output diagnostic information for use in
                                  GitHub issues.
  --site-packages / --no-site-packages
                                  Enable site-packages for the virtualenv.
                                  [env var: PIPENV_SITE_PACKAGES]
  --python TEXT                   Specify which version of Python virtualenv
                                  should use.
  --clear                         Clears caches (pipenv, pip).  [env var:
                                  PIPENV_CLEAR]
  -q, --quiet                     Quiet mode.
  -v, --verbose                   Verbose mode.
  --pypi-mirror TEXT              Specify a PyPI mirror.
  --version                       Show the version and exit.
  -h, --help                      Show this message and exit.

Usage Examples:
   Create a new project using Python 3.7, specifically:
   $ pipenv --python 3.7

   Remove project virtualenv (inferred from current directory):
   $ pipenv --rm

   Install all dependencies for a project (including dev):
   $ pipenv install --dev

   Create a lockfile containing pre-releases:
   $ pipenv lock --pre

   Show a graph of your installed dependencies:
   $ pipenv graph

   Check your installed dependencies for security vulnerabilities:
   $ pipenv check

   Install a local setup.py into your virtual environment/Pipfile:
   $ pipenv install -e .

   Use a lower-level pip command:
   $ pipenv run pip freeze

Commands:
  check         Checks for PyUp Safety security vulnerabilities and against
                PEP 508 markers provided in Pipfile.
  clean         Uninstalls all packages not specified in Pipfile.lock.
  graph         Displays currently-installed dependency graph information.
  install       Installs provided packages and adds them to Pipfile, or (if no
                packages are given), installs all packages from Pipfile.
  lock          Generates Pipfile.lock.
  open          View a given module in your editor.
  requirements  Generate a requirements.txt from Pipfile.lock.
  run           Spawns a command installed into the virtualenv.
  scripts       Lists scripts in current environment config.
  shell         Spawns a shell within the virtualenv.
  sync          Installs all packages specified in Pipfile.lock.
  uninstall     Uninstalls a provided package and removes it from Pipfile.
  update        Runs lock, then sync.
  upgrade       Resolves provided packages and adds them to Pipfile, or (if no
                packages are given), merges results to Pipfile.lock
  verify        Verify the hash in Pipfile.lock is up-to-date.
```

**Este comando muestra información sobre cómo usar pipenv, incluidas sus opciones y comandos principales:**

- *`--where`: Muestra la ubicación del proyecto.*
- *`--venv:` Muestra la ubicación del entorno virtual.*
- *`--py:` Muestra información sobre el intérprete de Python utilizado.*
- *`--envs:` Muestra opciones de variables de entorno.*
- *`--rm:` Elimina el entorno virtual.*
- *`--bare:` Salida mínima.*
- *`--man:` Muestra la página de manual.*
- *`--support:` Muestra información de diagnóstico para usar en problemas en GitHub.*
- *`--site-packages / --no-site-packages:` Habilita o deshabilita los paquetes de sitio en el entorno virtual.*
- *`--python TEXT`: Especifica la versión de Python que debe usar el entorno virtual.*
- *`--clear:` Limpia las cachés (pipenv, pip).*
- *`-q, --quiet:` Modo silencioso.*
- *`-v, --verbose:` Modo detallado.*
- *`--pypi-mirror TEXT:` Especifica un espejo de PyPI.*
- *`--version:` Muestra la versión de pipenv y sale.*
- *`-h, --help:` Muestra la ayuda y sale.*

*Además, se incluyen ejemplos de uso, como crear un proyecto con Python 3.7 o instalar dependencias, y una lista de comandos que permiten manejar dependencias, visualizar el árbol de dependencias, verificar vulnerabilidades de seguridad, y más.*

---

## ***Eliminación del Directorio Virtual Anterior***

*Antes de continuar con la instalación de nuevas dependencias utilizando `pipenv`, eliminamos el directorio virtual anterior para evitar conflictos. Esto es especialmente útil si previamente habías configurado un entorno virtual utilizando otro método.*

```bash
root@08b7c877e9f3:/App# ls -lA .
total 24
-rw-rw-r-- 1 d4nitrix13 d4nitrix13  195 Aug 29 01:53 .dockerignore
-rw-rw-r-- 1 d4nitrix13 d4nitrix13  170 Aug 29 02:53 .gitignore
drwxrwxr-x 5 d4nitrix13 d4nitrix13 4096 Aug 29 01:39 .venv
-rw-rw-r-- 1 d4nitrix13 d4nitrix13 3121 Aug 30 01:38 Dockerfile
-rw-rw-r-- 1 d4nitrix13 d4nitrix13  147 Aug 29 01:40 requirements.txt
drwxrwxr-x 3 d4nitrix13 d4nitrix13 4096 Aug 29 01:19 src
root@08b7c877e9f3:/App# rm -rf ./.venv/
```

---

## ***Instalación de Flask con Pipenv***

*Una vez eliminado el directorio virtual anterior, podemos proceder a instalar `Flask` utilizando `pipenv`. La instalación de `Flask` también creará un nuevo entorno virtual específico para el proyecto.*

```bash
pipenv install flask
```

**Salida esperada:**

```bash
Warning: the environment variable LANG is not set!
We recommend setting this in ~/.profile (or equivalent) for proper expected behavior.
Creating a virtualenv for this project...
Pipfile: /App/Pipfile
Using default python from /usr/bin/python3 (3.10.12) to create virtualenv...
⠸ Creating virtual environment...created virtual environment CPython3.10.12.final.0-64 in 950ms
  creator CPython3Posix(dest=/root/.local/share/virtualenvs/App-LKE3ViPB, clear=False, no_vcs_ignore=False, global=False)
  seeder FromAppData(download=False, pip=bundle, setuptools=bundle, wheel=bundle, via=copy, app_data_dir=/root/.local/share/virtualenv)
    added seed packages: pip==24.1, setuptools==70.1.0, wheel==0.43.0
  activators BashActivator,CShellActivator,FishActivator,NushellActivator,PowerShellActivator,PythonActivator

✔ Successfully created virtual environment!
Virtualenv location: /root/.local/share/virtualenvs/App-LKE3ViPB
Creating a Pipfile for this project...
Installing flask...
Resolving flask...
Added flask to Pipfile's [packages] ...
✔ Installation Succeeded
Pipfile.lock not found, creating...
Locking [packages] dependencies...
Building requirements...
Resolving dependencies...
✔ Success!
Locking [dev-packages] dependencies...
Updated Pipfile.lock (295fa60b4ad3b19ec29744ec2dfafba79ad5ee9a0b9ff095ac626e3d3981f117)!
To activate this project's virtualenv, run pipenv shell.
Alternatively, run a command inside the virtualenv with pipenv run.
Installing dependencies from Pipfile.lock (81f117)...
```

**Como podemos observar, la instalación de Flask se realizó correctamente, y se generaron algunos ficheros clave:**

- **Pipfile:** *Este fichero está en formato TOML (**Tom's Obvious, Minimal Language**), un lenguaje de serialización simple y legible. Sirve para especificar las dependencias del proyecto, tanto para producción como para desarrollo.*

  ```toml
  [[source]]
  url = "https://pypi.org/simple"
  verify_ssl = true
  name = "pypi"

  [packages]
  flask = "*"

  [dev-packages]

  [requires]
  python_version = "3.10"
  ```

- **Pipfile.lock:** *Este fichero en formato JSON asegura que todas las dependencias se instalen exactamente en las versiones especificadas, garantizando un entorno reproducible.*

```json
{
    "_meta": {
        "hash": {
            "sha256": "295fa60b4ad3b19ec29744ec2dfafba79ad5ee9a0b9ff095ac626e3d3981f117"
        },
        "pipfile-spec": 6,
        "requires": {
            "python_version": "3.10"
        },
        "sources": [
            {
                "name": "pypi",
                "url": "https://pypi.org/simple",
                "verify_ssl": true
            }
        ]
    },
    "default": {
        "blinker": {
            "hashes": [
                "sha256:1779309f71bf239144b9399d06ae925637cf6634cf6bd131104184531bf67c01",
                "sha256:8f77b09d3bf7c795e969e9486f39c2c5e9c39d4ee07424be2bc594ece9642d83"
            ],
            "markers": "python_version >= '3.8'",
            "version": "==1.8.2"
        },
        "click": {
            "hashes": [
                "sha256:ae74fb96c20a0277a1d615f1e4d73c8414f5a98db8b799a7931d1582f3390c28",
                "sha256:ca9853ad459e787e2192211578cc907e7594e294c7ccc834310722b41b9ca6de"
            ],
            "markers": "python_version >= '3.7'",
            "version": "==8.1.7"
        },
        "flask": {
            "hashes": [
                "sha256:34e815dfaa43340d1d15a5c3a02b8476004037eb4840b34910c6e21679d288f3",
                "sha256:ceb27b0af3823ea2737928a4d99d125a06175b8512c445cbd9a9ce200ef76842"
            ],
            "index": "pypi",
            "markers": "python_version >= '3.8'",
            "version": "==3.0.3"
        },
        "itsdangerous": {
            "hashes": [
                "sha256:c6242fc49e35958c8b15141343aa660db5fc54d4f13a1db01a3f5891b98700ef",
                "sha256:e0050c0b7da1eea53ffaf149c0cfbb5c6e2e2b69c4bef22c81fa6eb73e5f6173"
            ],
            "markers": "python_version >= '3.8'",
            "version": "==2.2.0"
        },
        "jinja2": {
            "hashes": [
                "sha256:4a3aee7acbbe7303aede8e9648d13b8bf88a429282aa6122a993f0ac800cb369",
                "sha256:bc5dd2abb727a5319567b7a813e6a2e7318c39f4f487cfe6c89c6f9c7d25197d"
            ],
            "markers": "python_version >= '3.7'",
            "version": "==3.1.4"
        },
        "markupsafe": {
            "hashes": [
                "sha256:00e046b6dd71aa03a41079792f8473dc494d564611a8f89bbbd7cb93295ebdcf",
                "sha256:075202fa5b72c86ad32dc7d0b56024ebdbcf2048c0ba09f1cde31bfdd57bcfff",
                "sha256:0e397ac966fdf721b2c528cf028494e86172b4feba51d65f81ffd65c63798f3f",
                "sha256:17b950fccb810b3293638215058e432159d2b71005c74371d784862b7e4683f3",
                "sha256:1f3fbcb7ef1f16e48246f704ab79d79da8a46891e2da03f8783a5b6fa41a9532",
                "sha256:2174c595a0d73a3080ca3257b40096db99799265e1c27cc5a610743acd86d62f",
                "sha256:2b7c57a4dfc4f16f7142221afe5ba4e093e09e728ca65c51f5620c9aaeb9a617",
                "sha256:2d2d793e36e230fd32babe143b04cec8a8b3eb8a3122d2aceb4a371e6b09b8df",
                "sha256:30b600cf0a7ac9234b2638fbc0fb6158ba5bdcdf46aeb631ead21248b9affbc4",
                "sha256:397081c1a0bfb5124355710fe79478cdbeb39626492b15d399526ae53422b906",
                "sha256:3a57fdd7ce31c7ff06cdfbf31dafa96cc533c21e443d57f5b1ecc6cdc668ec7f",
                "sha256:3c6b973f22eb18a789b1460b4b91bf04ae3f0c4234a0a6aa6b0a92f6f7b951d4",
                "sha256:3e53af139f8579a6d5f7b76549125f0d94d7e630761a2111bc431fd820e163b8",
                "sha256:4096e9de5c6fdf43fb4f04c26fb114f61ef0bf2e5604b6ee3019d51b69e8c371",
                "sha256:4275d846e41ecefa46e2015117a9f491e57a71ddd59bbead77e904dc02b1bed2",
                "sha256:4c31f53cdae6ecfa91a77820e8b151dba54ab528ba65dfd235c80b086d68a465",
                "sha256:4f11aa001c540f62c6166c7726f71f7573b52c68c31f014c25cc7901deea0b52",
                "sha256:5049256f536511ee3f7e1b3f87d1d1209d327e818e6ae1365e8653d7e3abb6a6",
                "sha256:58c98fee265677f63a4385256a6d7683ab1832f3ddd1e66fe948d5880c21a169",
                "sha256:598e3276b64aff0e7b3451b72e94fa3c238d452e7ddcd893c3ab324717456bad",
                "sha256:5b7b716f97b52c5a14bffdf688f971b2d5ef4029127f1ad7a513973cfd818df2",
                "sha256:5dedb4db619ba5a2787a94d877bc8ffc0566f92a01c0ef214865e54ecc9ee5e0",
                "sha256:619bc166c4f2de5caa5a633b8b7326fbe98e0ccbfacabd87268a2b15ff73a029",
                "sha256:629ddd2ca402ae6dbedfceeba9c46d5f7b2a61d9749597d4307f943ef198fc1f",
                "sha256:656f7526c69fac7f600bd1f400991cc282b417d17539a1b228617081106feb4a",
                "sha256:6ec585f69cec0aa07d945b20805be741395e28ac1627333b1c5b0105962ffced",
                "sha256:72b6be590cc35924b02c78ef34b467da4ba07e4e0f0454a2c5907f473fc50ce5",
                "sha256:7502934a33b54030eaf1194c21c692a534196063db72176b0c4028e140f8f32c",
                "sha256:7a68b554d356a91cce1236aa7682dc01df0edba8d043fd1ce607c49dd3c1edcf",
                "sha256:7b2e5a267c855eea6b4283940daa6e88a285f5f2a67f2220203786dfa59b37e9",
                "sha256:823b65d8706e32ad2df51ed89496147a42a2a6e01c13cfb6ffb8b1e92bc910bb",
                "sha256:8590b4ae07a35970728874632fed7bd57b26b0102df2d2b233b6d9d82f6c62ad",
                "sha256:8dd717634f5a044f860435c1d8c16a270ddf0ef8588d4887037c5028b859b0c3",
                "sha256:8dec4936e9c3100156f8a2dc89c4b88d5c435175ff03413b443469c7c8c5f4d1",
                "sha256:97cafb1f3cbcd3fd2b6fbfb99ae11cdb14deea0736fc2b0952ee177f2b813a46",
                "sha256:a17a92de5231666cfbe003f0e4b9b3a7ae3afb1ec2845aadc2bacc93ff85febc",
                "sha256:a549b9c31bec33820e885335b451286e2969a2d9e24879f83fe904a5ce59d70a",
                "sha256:ac07bad82163452a6884fe8fa0963fb98c2346ba78d779ec06bd7a6262132aee",
                "sha256:ae2ad8ae6ebee9d2d94b17fb62763125f3f374c25618198f40cbb8b525411900",
                "sha256:b91c037585eba9095565a3556f611e3cbfaa42ca1e865f7b8015fe5c7336d5a5",
                "sha256:bc1667f8b83f48511b94671e0e441401371dfd0f0a795c7daa4a3cd1dde55bea",
                "sha256:bec0a414d016ac1a18862a519e54b2fd0fc8bbfd6890376898a6c0891dd82e9f",
                "sha256:bf50cd79a75d181c9181df03572cdce0fbb75cc353bc350712073108cba98de5",
                "sha256:bff1b4290a66b490a2f4719358c0cdcd9bafb6b8f061e45c7a2460866bf50c2e",
                "sha256:c061bb86a71b42465156a3ee7bd58c8c2ceacdbeb95d05a99893e08b8467359a",
                "sha256:c8b29db45f8fe46ad280a7294f5c3ec36dbac9491f2d1c17345be8e69cc5928f",
                "sha256:ce409136744f6521e39fd8e2a24c53fa18ad67aa5bc7c2cf83645cce5b5c4e50",
                "sha256:d050b3361367a06d752db6ead6e7edeb0009be66bc3bae0ee9d97fb326badc2a",
                "sha256:d283d37a890ba4c1ae73ffadf8046435c76e7bc2247bbb63c00bd1a709c6544b",
                "sha256:d9fad5155d72433c921b782e58892377c44bd6252b5af2f67f16b194987338a4",
                "sha256:daa4ee5a243f0f20d528d939d06670a298dd39b1ad5f8a72a4275124a7819eff",
                "sha256:db0b55e0f3cc0be60c1f19efdde9a637c32740486004f20d1cff53c3c0ece4d2",
                "sha256:e61659ba32cf2cf1481e575d0462554625196a1f2fc06a1c777d3f48e8865d46",
                "sha256:ea3d8a3d18833cf4304cd2fc9cbb1efe188ca9b5efef2bdac7adc20594a0e46b",
                "sha256:ec6a563cff360b50eed26f13adc43e61bc0c04d94b8be985e6fb24b81f6dcfdf",
                "sha256:f5dfb42c4604dddc8e4305050aa6deb084540643ed5804d7455b5df8fe16f5e5",
                "sha256:fa173ec60341d6bb97a89f5ea19c85c5643c1e7dedebc22f5181eb73573142c5",
                "sha256:fa9db3f79de01457b03d4f01b34cf91bc0048eb2c3846ff26f66687c2f6d16ab",
                "sha256:fce659a462a1be54d2ffcacea5e3ba2d74daa74f30f5f143fe0c58636e355fdd",
                "sha256:ffee1f21e5ef0d712f9033568f8344d5da8cc2869dbd08d87c84656e6a2d2f68"
            ],
            "markers": "python_version >= '3.7'",
            "version": "==2.1.5"
        },
        "werkzeug": {
            "hashes": [
                "sha256:02c9eb92b7d6c06f31a782811505d2157837cea66aaede3e217c7c27c039476c",
                "sha256:34f2371506b250df4d4f84bfe7b0921e4762525762bbd936614909fe25cd7306"
            ],
            "markers": "python_version >= '3.8'",
            "version": "==3.0.4"
        }
    },
    "develop": {}
}
```

---

## ***Comparación con NPM***

- *Los ficheros generados por Pipenv (`Pipfile` y `Pipfile.lock`) cumplen funciones similares a los ficheros `package.json` y `package-lock.json` de npm, pero están diseñados para el entorno Python.*

- **Pipfile:** *Es similar al `package.json` de npm. Define las dependencias del proyecto, tanto para producción como para desarrollo, y especifica la versión de Python a utilizar.*

- **Pipfile.lock:** *Equivale al `package-lock.json` de npm. Este fichero asegura que todas las dependencias se instalen en las versiones exactas especificadas, garantizando un entorno reproducible.*

*Ambos ficheros permiten a Pipenv gestionar las dependencias de tu proyecto y mantener la consistencia entre diferentes entornos de desarrollo.*

---

## ***Ubicación del Entorno Virtual***

*Por defecto, Pipenv crea el entorno virtual en el directorio del usuario actual. En este caso, el entorno virtual se creó en:*

```bash
/root/.local/share/virtualenvs/App-LKE3ViPB
```

- *Si prefieres que el entorno virtual se instale dentro del directorio del proyecto en lugar de en el directorio global del usuario, puedes configurar Pipenv para que lo haga. Esto se logra estableciendo la variable de entorno `PIPENV_VENV_IN_PROJECT`, la cual le indica a Pipenv que cree el entorno virtual en el directorio actual. El valor `1` indica que la opción está activada.*

**Para configurar esta preferencia, usa el siguiente comando:**

```bash
export PIPENV_VENV_IN_PROJECT=1
```

---

## ***Reinstalación del Entorno Virtual***

*Para aplicar esta configuración, primero debemos eliminar el entorno virtual actual y los ficheros generados, y luego reinstalar las dependencias con Pipenv.*

1. **Eliminar el Entorno Virtual y Ficheros Relacionados:**

   ```bash
   rm -r /root/.local/share/virtualenvs/App-LKE3ViPB/
   rm ./Pipfile*
   ```

2. **Reinstalar Flask con Pipenv:**

   *Al reinstalar Flask con Pipenv, la opción `--verbose` proporciona información más detallada sobre el proceso de instalación.*

   ```bash
   pipenv install flask --verbose
   ```

*Este comando reinstalará Flask y creará el entorno virtual en el directorio del proyecto según la configuración establecida.*

**Salida del comando `pipenv install flask --verbose`:**

```bash
pipenv install flask --verbose
Warning: the environment variable LANG is not set!
We recommend setting this in ~/.profile (or equivalent) for proper expected behavior.
Using python: 3.10
Path to python: /usr/bin/python3
Creating a virtualenv for this project...
Pipfile: /App/Pipfile
Using /usr/bin/python3 (3.10.12) to create virtualenv...
⠴ Creating virtual environment...created virtual environment CPython3.10.12.final.0-64 in 307ms
  creator CPython3Posix(dest=/App/.venv, clear=False, no_vcs_ignore=False, global=False)
  seeder FromAppData(download=False, pip=bundle, setuptools=bundle, wheel=bundle, via=copy, app_data_dir=/root/.local/share/virtualenv)
    added seed packages: pip==24.1, setuptools==70.1.0, wheel==0.43.0
  activators BashActivator,CShellActivator,FishActivator,NushellActivator,PowerShellActivator,PythonActivator

✔ Successfully created virtual environment!
Virtualenv location: /App/.venv
Installing flask...
Resolving flask...
✔ Installation Succeeded
To activate this project's virtualenv, run pipenv shell.
Alternatively, run a command inside the virtualenv with pipenv run.
Installing dependencies from Pipfile.lock (81f117)...
Writing supplied requirement line to temporary file: "blinker==1.8.2; python_version >= '3.8'
--hash=sha256:1779309f71bf239144b9399d06ae925637cf6634cf6bd131104184531bf67c01
--hash=sha256:8f77b09d3bf7c795e969e9486f39c2c5e9c39d4ee07424be2bc594ece9642d83"
Writing supplied requirement line to temporary file: "click==8.1.7; python_version >= '3.7'
--hash=sha256:ae74fb96c20a0277a1d615f1e4d73c8414f5a98db8b799a7931d1582f3390c28
--hash=sha256:ca9853ad459e787e2192211578cc907e7594e294c7ccc834310722b41b9ca6de"
Writing supplied requirement line to temporary file: "flask==3.0.3; python_version >= '3.8'
--hash=sha256:34e815dfaa43340d1d15a5c3a02b8476004037eb4840b34910c6e21679d288f3
--hash=sha256:ceb27b0af3823ea2737928a4d99d125a06175b8512c445cbd9a9ce200ef76842"
Writing supplied requirement line to temporary file: "itsdangerous==2.2.0; python_version >= '3.8'
--hash=sha256:c6242fc49e35958c8b15141343aa660db5fc54d4f13a1db01a3f5891b98700ef
--hash=sha256:e0050c0b7da1eea53ffaf149c0cfbb5c6e2e2b69c4bef22c81fa6eb73e5f6173"
Writing supplied requirement line to temporary file: "jinja2==3.1.4; python_version >= '3.7'
--hash=sha256:4a3aee7acbbe7303aede8e9648d13b8bf88a429282aa6122a993f0ac800cb369
--hash=sha256:bc5dd2abb727a5319567b7a813e6a2e7318c39f4f487cfe6c89c6f9c7d25197d"
Writing supplied requirement line to temporary file: "markupsafe==2.1.5; python_version >= '3.7'
--hash=sha256:00e046b6dd71aa03a41079792f8473dc494d564611a8f89bbbd7cb93295ebdcf
--hash=sha256:075202fa5b72c86ad32dc7d0b56024ebdbcf2048c0ba09f1cde31bfdd57bcfff
--hash=sha256:0e397ac966fdf721b2c528cf028494e86172b4feba51d65f81ffd65c63798f3f
--hash=sha256:17b950fccb810b3293638215058e432159d2b71005c74371d784862b7e4683f3
--hash=sha256:1f3fbcb7ef1f16e48246f704ab79d79da8a46891e2da03f8783a5b6fa41a9532
--hash=sha256:2174c595a0d73a3080ca3257b40096db99799265e1c27cc5a610743acd86d62f
--hash=sha256:2b7c57a4dfc4f16f7142221afe5ba4e093e09e728ca65c51f5620c9aaeb9a617
--hash=sha256:2d2d793e36e230fd32babe143b04cec8a8b3eb8a3122d2aceb4a371e6b09b8df
--hash=sha256:30b600cf0a7ac9234b2638fbc0fb6158ba5bdcdf46aeb631ead21248b9affbc4
--hash=sha256:397081c1a0bfb5124355710fe79478cdbeb39626492b15d399526ae53422b906
--hash=sha256:3a57fdd7ce31c7ff06cdfbf31dafa96cc533c21e443d57f5b1ecc6cdc668ec7f
--hash=sha256:3c6b973f22eb18a789b1460b4b91bf04ae3f0c4234a0a6aa6b0a92f6f7b951d4
--hash=sha256:3e53af139f8579a6d5f7b76549125f0d94d7e630761a2111bc431fd820e163b8
--hash=sha256:4096e9de5c6fdf43fb4f04c26fb114f61ef0bf2e5604b6ee3019d51b69e8c371
--hash=sha256:4275d846e41ecefa46e2015117a9f491e57a71ddd59bbead77e904dc02b1bed2
--hash=sha256:4c31f53cdae6ecfa91a77820e8b151dba54ab528ba65dfd235c80b086d68a465
--hash=sha256:4f11aa001c540f62c6166c7726f71f7573b52c68c31f014c25cc7901deea0b52
--hash=sha256:5049256f536511ee3f7e1b3f87d1d1209d327e818e6ae1365e8653d7e3abb6a6
--hash=sha256:58c98fee265677f63a4385256a6d7683ab1832f3ddd1e66fe948d5880c21a169
--hash=sha256:598e3276b64aff0e7b3451b72e94fa3c238d452e7ddcd893c3ab324717456bad
--hash=sha256:5b7b716f97b52c5a14bffdf688f971b2d5ef4029127f1ad7a513973cfd818df2
--hash=sha256:5dedb4db619ba5a2787a94d877bc8ffc0566f92a01c0ef214865e54ecc9ee5e0
--hash=sha256:619bc166c4f2de5caa5a633b8b7326fbe98e0ccbfacabd87268a2b15ff73a029
--hash=sha256:629ddd2ca402ae6dbedfceeba9c46d5f7b2a61d9749597d4307f943ef198fc1f
--hash=sha256:656f7526c69fac7f600bd1f400991cc282b417d17539a1b228617081106feb4a
--hash=sha256:6ec585f69cec0aa07d945b20805be741395e28ac1627333b1c5b0105962ffced
--hash=sha256:72b6be590cc35924b02c78ef34b467da4ba07e4e0f0454a2c5907f473fc50ce5
--hash=sha256:7502934a33b54030eaf1194c21c692a534196063db72176b0c4028e140f8f32c
--hash=sha256:7a68b554d356a91cce1236aa7682dc01df0edba8d043fd1ce607c49dd3c1edcf
--hash=sha256:7b2e5a267c855eea6b4283940daa6e88a285f5f2a67f2220203786dfa59b37e9
--hash=sha256:823b65d8706e32ad2df51ed89496147a42a2a6e01c13cfb6ffb8b1e92bc910bb
--hash=sha256:8590b4ae07a35970728874632fed7bd57b26b0102df2d2b233b6d9d82f6c62ad
--hash=sha256:8dd717634f5a044f860435c1d8c16a270ddf0ef8588d4887037c5028b859b0c3
--hash=sha256:8dec4936e9c3100156f8a2dc89c4b88d5c435175ff03413b443469c7c8c5f4d1
--hash=sha256:97cafb1f3cbcd3fd2b6fbfb99ae11cdb14deea0736fc2b0952ee177f2b813a46
--hash=sha256:a17a92de5231666cfbe003f0e4b9b3a7ae3afb1ec2845aadc2bacc93ff85febc
--hash=sha256:a549b9c31bec33820e885335b451286e2969a2d9e24879f83fe904a5ce59d70a
--hash=sha256:ac07bad82163452a6884fe8fa0963fb98c2346ba78d779ec06bd7a6262132aee
--hash=sha256:ae2ad8ae6ebee9d2d94b17fb62763125f3f374c25618198f40cbb8b525411900
--hash=sha256:b91c037585eba9095565a3556f611e3cbfaa42ca1e865f7b8015fe5c7336d5a5
--hash=sha256:bc1667f8b83f48511b94671e0e441401371dfd0f0a795c7daa4a3cd1dde55bea
--hash=sha256:bec0a414d016ac1a18862a519e54b2fd0fc8bbfd6890376898a6c0891dd82e9f
--hash=sha256:bf50cd79a75d181c9181df03572cdce0fbb75cc353bc350712073108cba98de5
--hash=sha256:bff1b4290a66b490a2f4719358c0cdcd9bafb6b8f061e45c7a2460866bf50c2e
--hash=sha256:c061bb86a71b42465156a3ee7bd58c8c2ceacdbeb95d05a99893e08b8467359a
--hash=sha256:c8b29db45f8fe46ad280a7294f5c3ec36dbac9491f2d1c17345be8e69cc5928f
--hash=sha256:ce409136744f6521e39fd8e2a24c53fa18ad67aa5bc7c2cf83645cce5b5c4e50
--hash=sha256:d050b3361367a06d752db6ead6e7edeb0009be66bc3bae0ee9d97fb326badc2a
--hash=sha256:d283d37a890ba4c1ae73ffadf8046435c76e7bc2247bbb63c00bd1a709c6544b
--hash=sha256:d9fad5155d72433c921b782e58892377c44bd6252b5af2f67f16b194987338a4
--hash=sha256:daa4ee5a243f0f20d528d939d06670a298dd39b1ad5f8a72a4275124a7819eff
--hash=sha256:db0b55e0f3cc0be60c1f19efdde9a637c32740486004f20d1cff53c3c0ece4d2
--hash=sha256:e61659ba32cf2cf1481e575d0462554625196a1f2fc06a1c777d3f48e8865d46
--hash=sha256:ea3d8a3d18833cf4304cd2fc9cbb1efe188ca9b5efef2bdac7adc20594a0e46b
--hash=sha256:ec6a563cff360b50eed26f13adc43e61bc0c04d94b8be985e6fb24b81f6dcfdf
--hash=sha256:f5dfb42c4604dddc8e4305050aa6deb084540643ed5804d7455b5df8fe16f5e5
--hash=sha256:fa173ec60341d6bb97a89f5ea19c85c5643c1e7dedebc22f5181eb73573142c5
--hash=sha256:fa9db3f79de01457b03d4f01b34cf91bc0048eb2c3846ff26f66687c2f6d16ab
--hash=sha256:fce659a462a1be54d2ffcacea5e3ba2d74daa74f30f5f143fe0c58636e355fdd
--hash=sha256:ffee1f21e5ef0d712f9033568f8344d5da8cc2869dbd08d87c84656e6a2d2f68"
Writing supplied requirement line to temporary file: "werkzeug==3.0.4; python_version >= '3.8'
--hash=sha256:02c9eb92b7d6c06f31a782811505d2157837cea66aaede3e217c7c27c039476c
--hash=sha256:34f2371506b250df4d4f84bfe7b0921e4762525762bbd936614909fe25cd7306"
Install Phase: Standard Requirements
Preparing Installation of "blinker==1.8.2; python_version >= '3.8' --hash=sha256:1779309f71bf239144b9399d06ae925637cf6634cf6bd131104184531bf67c01
--hash=sha256:8f77b09d3bf7c795e969e9486f39c2c5e9c39d4ee07424be2bc594ece9642d83"
Preparing Installation of "click==8.1.7; python_version >= '3.7' --hash=sha256:ae74fb96c20a0277a1d615f1e4d73c8414f5a98db8b799a7931d1582f3390c28
--hash=sha256:ca9853ad459e787e2192211578cc907e7594e294c7ccc834310722b41b9ca6de"
Preparing Installation of "flask==3.0.3; python_version >= '3.8' --hash=sha256:34e815dfaa43340d1d15a5c3a02b8476004037eb4840b34910c6e21679d288f3
--hash=sha256:ceb27b0af3823ea2737928a4d99d125a06175b8512c445cbd9a9ce200ef76842"
Preparing Installation of "itsdangerous==2.2.0; python_version >= '3.8'
--hash=sha256:c6242fc49e35958c8b15141343aa660db5fc54d4f13a1db01a3f5891b98700ef
--hash=sha256:e0050c0b7da1eea53ffaf149c0cfbb5c6e2e2b69c4bef22c81fa6eb73e5f6173"
Preparing Installation of "jinja2==3.1.4; python_version >= '3.7' --hash=sha256:4a3aee7acbbe7303aede8e9648d13b8bf88a429282aa6122a993f0ac800cb369
--hash=sha256:bc5dd2abb727a5319567b7a813e6a2e7318c39f4f487cfe6c89c6f9c7d25197d"
Preparing Installation of "markupsafe==2.1.5; python_version >= '3.7' --hash=sha256:00e046b6dd71aa03a41079792f8473dc494d564611a8f89bbbd7cb93295ebdcf
--hash=sha256:075202fa5b72c86ad32dc7d0b56024ebdbcf2048c0ba09f1cde31bfdd57bcfff
--hash=sha256:0e397ac966fdf721b2c528cf028494e86172b4feba51d65f81ffd65c63798f3f
--hash=sha256:17b950fccb810b3293638215058e432159d2b71005c74371d784862b7e4683f3
--hash=sha256:1f3fbcb7ef1f16e48246f704ab79d79da8a46891e2da03f8783a5b6fa41a9532
--hash=sha256:2174c595a0d73a3080ca3257b40096db99799265e1c27cc5a610743acd86d62f
--hash=sha256:2b7c57a4dfc4f16f7142221afe5ba4e093e09e728ca65c51f5620c9aaeb9a617
--hash=sha256:2d2d793e36e230fd32babe143b04cec8a8b3eb8a3122d2aceb4a371e6b09b8df
--hash=sha256:30b600cf0a7ac9234b2638fbc0fb6158ba5bdcdf46aeb631ead21248b9affbc4
--hash=sha256:397081c1a0bfb5124355710fe79478cdbeb39626492b15d399526ae53422b906
--hash=sha256:3a57fdd7ce31c7ff06cdfbf31dafa96cc533c21e443d57f5b1ecc6cdc668ec7f
--hash=sha256:3c6b973f22eb18a789b1460b4b91bf04ae3f0c4234a0a6aa6b0a92f6f7b951d4
--hash=sha256:3e53af139f8579a6d5f7b76549125f0d94d7e630761a2111bc431fd820e163b8
--hash=sha256:4096e9de5c6fdf43fb4f04c26fb114f61ef0bf2e5604b6ee3019d51b69e8c371
--hash=sha256:4275d846e41ecefa46e2015117a9f491e57a71ddd59bbead77e904dc02b1bed2
--hash=sha256:4c31f53cdae6ecfa91a77820e8b151dba54ab528ba65dfd235c80b086d68a465
--hash=sha256:4f11aa001c540f62c6166c7726f71f7573b52c68c31f014c25cc7901deea0b52
--hash=sha256:5049256f536511ee3f7e1b3f87d1d1209d327e818e6ae1365e8653d7e3abb6a6
--hash=sha256:58c98fee265677f63a4385256a6d7683ab1832f3ddd1e66fe948d5880c21a169
--hash=sha256:598e3276b64aff0e7b3451b72e94fa3c238d452e7ddcd893c3ab324717456bad
--hash=sha256:5b7b716f97b52c5a14bffdf688f971b2d5ef4029127f1ad7a513973cfd818df2
--hash=sha256:5dedb4db619ba5a2787a94d877bc8ffc0566f92a01c0ef214865e54ecc9ee5e0
--hash=sha256:619bc166c4f2de5caa5a633b8b7326fbe98e0ccbfacabd87268a2b15ff73a029
--hash=sha256:629ddd2ca402ae6dbedfceeba9c46d5f7b2a61d9749597d4307f943ef198fc1f
--hash=sha256:656f7526c69fac7f600bd1f400991cc282b417d17539a1b228617081106feb4a
--hash=sha256:6ec585f69cec0aa07d945b20805be741395e28ac1627333b1c5b0105962ffced
--hash=sha256:72b6be590cc35924b02c78ef34b467da4ba07e4e0f0454a2c5907f473fc50ce5
--hash=sha256:7502934a33b54030eaf1194c21c692a534196063db72176b0c4028e140f8f32c
--hash=sha256:7a68b554d356a91cce1236aa7682dc01df0edba8d043fd1ce607c49dd3c1edcf
--hash=sha256:7b2e5a267c855eea6b4283940daa6e88a285f5f2a67f2220203786dfa59b37e9
--hash=sha256:823b65d8706e32ad2df51ed89496147a42a2a6e01c13cfb6ffb8b1e92bc910bb
--hash=sha256:8590b4ae07a35970728874632fed7bd57b26b0102df2d2b233b6d9d82f6c62ad
--hash=sha256:8dd717634f5a044f860435c1d8c16a270ddf0ef8588d4887037c5028b859b0c3
--hash=sha256:8dec4936e9c3100156f8a2dc89c4b88d5c435175ff03413b443469c7c8c5f4d1
--hash=sha256:97cafb1f3cbcd3fd2b6fbfb99ae11cdb14deea0736fc2b0952ee177f2b813a46
--hash=sha256:a17a92de5231666cfbe003f0e4b9b3a7ae3afb1ec2845aadc2bacc93ff85febc
--hash=sha256:a549b9c31bec33820e885335b451286e2969a2d9e24879f83fe904a5ce59d70a
--hash=sha256:ac07bad82163452a6884fe8fa0963fb98c2346ba78d779ec06bd7a6262132aee
--hash=sha256:ae2ad8ae6ebee9d2d94b17fb62763125f3f374c25618198f40cbb8b525411900
--hash=sha256:b91c037585eba9095565a3556f611e3cbfaa42ca1e865f7b8015fe5c7336d5a5
--hash=sha256:bc1667f8b83f48511b94671e0e441401371dfd0f0a795c7daa4a3cd1dde55bea
--hash=sha256:bec0a414d016ac1a18862a519e54b2fd0fc8bbfd6890376898a6c0891dd82e9f
--hash=sha256:bf50cd79a75d181c9181df03572cdce0fbb75cc353bc350712073108cba98de5
--hash=sha256:bff1b4290a66b490a2f4719358c0cdcd9bafb6b8f061e45c7a2460866bf50c2e
--hash=sha256:c061bb86a71b42465156a3ee7bd58c8c2ceacdbeb95d05a99893e08b8467359a
--hash=sha256:c8b29db45f8fe46ad280a7294f5c3ec36dbac9491f2d1c17345be8e69cc5928f
--hash=sha256:ce409136744f6521e39fd8e2a24c53fa18ad67aa5bc7c2cf83645cce5b5c4e50
--hash=sha256:d050b3361367a06d752db6ead6e7edeb0009be66bc3bae0ee9d97fb326badc2a
--hash=sha256:d283d37a890ba4c1ae73ffadf8046435c76e7bc2247bbb63c00bd1a709c6544b
--hash=sha256:d9fad5155d72433c921b782e58892377c44bd6252b5af2f67f16b194987338a4
--hash=sha256:daa4ee5a243f0f20d528d939d06670a298dd39b1ad5f8a72a4275124a7819eff
--hash=sha256:db0b55e0f3cc0be60c1f19efdde9a637c32740486004f20d1cff53c3c0ece4d2
--hash=sha256:e61659ba32cf2cf1481e575d0462554625196a1f2fc06a1c777d3f48e8865d46
--hash=sha256:ea3d8a3d18833cf4304cd2fc9cbb1efe188ca9b5efef2bdac7adc20594a0e46b
--hash=sha256:ec6a563cff360b50eed26f13adc43e61bc0c04d94b8be985e6fb24b81f6dcfdf
--hash=sha256:f5dfb42c4604dddc8e4305050aa6deb084540643ed5804d7455b5df8fe16f5e5
--hash=sha256:fa173ec60341d6bb97a89f5ea19c85c5643c1e7dedebc22f5181eb73573142c5
--hash=sha256:fa9db3f79de01457b03d4f01b34cf91bc0048eb2c3846ff26f66687c2f6d16ab
--hash=sha256:fce659a462a1be54d2ffcacea5e3ba2d74daa74f30f5f143fe0c58636e355fdd
--hash=sha256:ffee1f21e5ef0d712f9033568f8344d5da8cc2869dbd08d87c84656e6a2d2f68"
Preparing Installation of "werkzeug==3.0.4; python_version >= '3.8' --hash=sha256:02c9eb92b7d6c06f31a782811505d2157837cea66aaede3e217c7c27c039476c
--hash=sha256:34f2371506b250df4d4f84bfe7b0921e4762525762bbd936614909fe25cd7306"
$ /App/.venv/bin/python /usr/local/lib/python3.10/dist-packages/pipenv/patched/pip/__pip-runner__.py install -i https://pypi.org/simple --no-input
--upgrade --no-deps -r /tmp/pipenv-_2w_ioz_-requirements/pipenv-vd3_w4ud-hashed-reqs.txt
Using source directory: '/App/.venv/src'
Collecting blinker==1.8.2 (from -r /tmp/pipenv-_2w_ioz_-requirements/pipenv-vd3_w4ud-hashed-reqs.txt (line 1))

  Using cached blinker-1.8.2-py3-none-any.whl (9.5 kB)

Collecting click==8.1.7 (from -r /tmp/pipenv-_2w_ioz_-requirements/pipenv-vd3_w4ud-hashed-reqs.txt (line 2))

  Using cached click-8.1.7-py3-none-any.whl (97 kB)

Collecting flask==3.0.3 (from -r /tmp/pipenv-_2w_ioz_-requirements/pipenv-vd3_w4ud-hashed-reqs.txt (line 3))

  Using cached flask-3.0.3-py3-none-any.whl (101 kB)

Collecting itsdangerous==2.2.0 (from -r /tmp/pipenv-_2w_ioz_-requirements/pipenv-vd3_w4ud-hashed-reqs.txt (line 4))

  Using cached itsdangerous-2.2.0-py3-none-any.whl (16 kB)

Collecting jinja2==3.1.4 (from -r /tmp/pipenv-_2w_ioz_-requirements/pipenv-vd3_w4ud-hashed-reqs.txt (line 5))

  Using cached jinja2-3.1.4-py3-none-any.whl (133 kB)

Collecting markupsafe==2.1.5 (from -r /tmp/pipenv-_2w_ioz_-requirements/pipenv-vd3_w4ud-hashed-reqs.txt (line 6))

  Using cached MarkupSafe-2.1.5-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (25 kB)

Collecting werkzeug==3.0.4 (from -r /tmp/pipenv-_2w_ioz_-requirements/pipenv-vd3_w4ud-hashed-reqs.txt (line 7))

  Using cached werkzeug-3.0.4-py3-none-any.whl (227 kB)

Installing collected packages: werkzeug, markupsafe, jinja2, itsdangerous, flask, click, blinker

Successfully installed blinker-1.8.2 click-8.1.7 flask-3.0.3 itsdangerous-2.2.0 jinja2-3.1.4 markupsafe-2.1.5 werkzeug-3.0.4

Install Phase: Editable Requirements
Preparing Installation of "blinker==1.8.2; python_version >= '3.8' --hash=sha256:1779309f71bf239144b9399d06ae925637cf6634cf6bd131104184531bf67c01
--hash=sha256:8f77b09d3bf7c795e969e9486f39c2c5e9c39d4ee07424be2bc594ece9642d83"
Preparing Installation of "click==8.1.7; python_version >= '3.7' --hash=sha256:ae74fb96c20a0277a1d615f1e4d73c8414f5a98db8b799a7931d1582f3390c28
--hash=sha256:ca9853ad459e787e2192211578cc907e7594e294c7ccc834310722b41b9ca6de"
Preparing Installation of "flask==3.0.3; python_version >= '3.8' --hash=sha256:34e815dfaa43340d1d15a5c3a02b8476004037eb4840b34910c6e21679d288f3
--hash=sha256:ceb27b0af3823ea2737928a4d99d125a06175b8512c445cbd9a9ce200ef76842"
Preparing Installation of "itsdangerous==2.2.0; python_version >= '3.8'
--hash=sha256:c6242fc49e35958c8b15141343aa660db5fc54d4f13a1db01a3f5891b98700ef
--hash=sha256:e0050c0b7da1eea53ffaf149c0cfbb5c6e2e2b69c4bef22c81fa6eb73e5f6173"
Preparing Installation of "jinja2==3.1.4; python_version >= '3.7' --hash=sha256:4a3aee7acbbe7303aede8e9648d13b8bf88a429282aa6122a993f0ac800cb369
--hash=sha256:bc5dd2abb727a5319567b7a813e6a2e7318c39f4f487cfe6c89c6f9c7d25197d"
Preparing Installation of "markupsafe==2.1.5; python_version >= '3.7' --hash=sha256:00e046b6dd71aa03a41079792f8473dc494d564611a8f89bbbd7cb93295ebdcf
--hash=sha256:075202fa5b72c86ad32dc7d0b56024ebdbcf2048c0ba09f1cde31bfdd57bcfff
--hash=sha256:0e397ac966fdf721b2c528cf028494e86172b4feba51d65f81ffd65c63798f3f
--hash=sha256:17b950fccb810b3293638215058e432159d2b71005c74371d784862b7e4683f3
--hash=sha256:1f3fbcb7ef1f16e48246f704ab79d79da8a46891e2da03f8783a5b6fa41a9532
--hash=sha256:2174c595a0d73a3080ca3257b40096db99799265e1c27cc5a610743acd86d62f
--hash=sha256:2b7c57a4dfc4f16f7142221afe5ba4e093e09e728ca65c51f5620c9aaeb9a617
--hash=sha256:2d2d793e36e230fd32babe143b04cec8a8b3eb8a3122d2aceb4a371e6b09b8df
--hash=sha256:30b600cf0a7ac9234b2638fbc0fb6158ba5bdcdf46aeb631ead21248b9affbc4
--hash=sha256:397081c1a0bfb5124355710fe79478cdbeb39626492b15d399526ae53422b906
--hash=sha256:3a57fdd7ce31c7ff06cdfbf31dafa96cc533c21e443d57f5b1ecc6cdc668ec7f
--hash=sha256:3c6b973f22eb18a789b1460b4b91bf04ae3f0c4234a0a6aa6b0a92f6f7b951d4
--hash=sha256:3e53af139f8579a6d5f7b76549125f0d94d7e630761a2111bc431fd820e163b8
--hash=sha256:4096e9de5c6fdf43fb4f04c26fb114f61ef0bf2e5604b6ee3019d51b69e8c371
--hash=sha256:4275d846e41ecefa46e2015117a9f491e57a71ddd59bbead77e904dc02b1bed2
--hash=sha256:4c31f53cdae6ecfa91a77820e8b151dba54ab528ba65dfd235c80b086d68a465
--hash=sha256:4f11aa001c540f62c6166c7726f71f7573b52c68c31f014c25cc7901deea0b52
--hash=sha256:5049256f536511ee3f7e1b3f87d1d1209d327e818e6ae1365e8653d7e3abb6a6
--hash=sha256:58c98fee265677f63a4385256a6d7683ab1832f3ddd1e66fe948d5880c21a169
--hash=sha256:598e3276b64aff0e7b3451b72e94fa3c238d452e7ddcd893c3ab324717456bad
--hash=sha256:5b7b716f97b52c5a14bffdf688f971b2d5ef4029127f1ad7a513973cfd818df2
--hash=sha256:5dedb4db619ba5a2787a94d877bc8ffc0566f92a01c0ef214865e54ecc9ee5e0
--hash=sha256:619bc166c4f2de5caa5a633b8b7326fbe98e0ccbfacabd87268a2b15ff73a029
--hash=sha256:629ddd2ca402ae6dbedfceeba9c46d5f7b2a61d9749597d4307f943ef198fc1f
--hash=sha256:656f7526c69fac7f600bd1f400991cc282b417d17539a1b228617081106feb4a
--hash=sha256:6ec585f69cec0aa07d945b20805be741395e28ac1627333b1c5b0105962ffced
--hash=sha256:72b6be590cc35924b02c78ef34b467da4ba07e4e0f0454a2c5907f473fc50ce5
--hash=sha256:7502934a33b54030eaf1194c21c692a534196063db72176b0c4028e140f8f32c
--hash=sha256:7a68b554d356a91cce1236aa7682dc01df0edba8d043fd1ce607c49dd3c1edcf
--hash=sha256:7b2e5a267c855eea6b4283940daa6e88a285f5f2a67f2220203786dfa59b37e9
--hash=sha256:823b65d8706e32ad2df51ed89496147a42a2a6e01c13cfb6ffb8b1e92bc910bb
--hash=sha256:8590b4ae07a35970728874632fed7bd57b26b0102df2d2b233b6d9d82f6c62ad
--hash=sha256:8dd717634f5a044f860435c1d8c16a270ddf0ef8588d4887037c5028b859b0c3
--hash=sha256:8dec4936e9c3100156f8a2dc89c4b88d5c435175ff03413b443469c7c8c5f4d1
--hash=sha256:97cafb1f3cbcd3fd2b6fbfb99ae11cdb14deea0736fc2b0952ee177f2b813a46
--hash=sha256:a17a92de5231666cfbe003f0e4b9b3a7ae3afb1ec2845aadc2bacc93ff85febc
--hash=sha256:a549b9c31bec33820e885335b451286e2969a2d9e24879f83fe904a5ce59d70a
--hash=sha256:ac07bad82163452a6884fe8fa0963fb98c2346ba78d779ec06bd7a6262132aee
--hash=sha256:ae2ad8ae6ebee9d2d94b17fb62763125f3f374c25618198f40cbb8b525411900
--hash=sha256:b91c037585eba9095565a3556f611e3cbfaa42ca1e865f7b8015fe5c7336d5a5
--hash=sha256:bc1667f8b83f48511b94671e0e441401371dfd0f0a795c7daa4a3cd1dde55bea
--hash=sha256:bec0a414d016ac1a18862a519e54b2fd0fc8bbfd6890376898a6c0891dd82e9f
--hash=sha256:bf50cd79a75d181c9181df03572cdce0fbb75cc353bc350712073108cba98de5
--hash=sha256:bff1b4290a66b490a2f4719358c0cdcd9bafb6b8f061e45c7a2460866bf50c2e
--hash=sha256:c061bb86a71b42465156a3ee7bd58c8c2ceacdbeb95d05a99893e08b8467359a
--hash=sha256:c8b29db45f8fe46ad280a7294f5c3ec36dbac9491f2d1c17345be8e69cc5928f
--hash=sha256:ce409136744f6521e39fd8e2a24c53fa18ad67aa5bc7c2cf83645cce5b5c4e50
--hash=sha256:d050b3361367a06d752db6ead6e7edeb0009be66bc3bae0ee9d97fb326badc2a
--hash=sha256:d283d37a890ba4c1ae73ffadf8046435c76e7bc2247bbb63c00bd1a709c6544b
--hash=sha256:d9fad5155d72433c921b782e58892377c44bd6252b5af2f67f16b194987338a4
--hash=sha256:daa4ee5a243f0f20d528d939d06670a298dd39b1ad5f8a72a4275124a7819eff
--hash=sha256:db0b55e0f3cc0be60c1f19efdde9a637c32740486004f20d1cff53c3c0ece4d2
--hash=sha256:e61659ba32cf2cf1481e575d0462554625196a1f2fc06a1c777d3f48e8865d46
--hash=sha256:ea3d8a3d18833cf4304cd2fc9cbb1efe188ca9b5efef2bdac7adc20594a0e46b
--hash=sha256:ec6a563cff360b50eed26f13adc43e61bc0c04d94b8be985e6fb24b81f6dcfdf
--hash=sha256:f5dfb42c4604dddc8e4305050aa6deb084540643ed5804d7455b5df8fe16f5e5
--hash=sha256:fa173ec60341d6bb97a89f5ea19c85c5643c1e7dedebc22f5181eb73573142c5
--hash=sha256:fa9db3f79de01457b03d4f01b34cf91bc0048eb2c3846ff26f66687c2f6d16ab
--hash=sha256:fce659a462a1be54d2ffcacea5e3ba2d74daa74f30f5f143fe0c58636e355fdd
--hash=sha256:ffee1f21e5ef0d712f9033568f8344d5da8cc2869dbd08d87c84656e6a2d2f68"
Preparing Installation of "werkzeug==3.0.4; python_version >= '3.8' --hash=sha256:02c9eb92b7d6c06f31a782811505d2157837cea66aaede3e217c7c27c039476c
--hash=sha256:34f2371506b250df4d4f84bfe7b0921e4762525762bbd936614909fe25cd7306"
$ /App/.venv/bin/python /usr/local/lib/python3.10/dist-packages/pipenv/patched/pip/__pip-runner__.py install -i https://pypi.org/simple --no-input
--upgrade --no-deps -r /tmp/pipenv-_2w_ioz_-requirements/pipenv-s_b9lrf4-reqs.txt
Using source directory: '/App/.venv/src'
```

---

## ***Instalación y Ejecución de Flask con Pipenv***

---

### ***Ubicación del Entorno Virtual Actualmente***

**Como se observa, el entorno virtual se ha instalado en el directorio actual del proyecto en lugar del directorio global del usuario. La ubicación del entorno virtual es:**

```bash
/App/.venv
```

**Donde `/App` es el directorio actual.**

---

### ***Ejecución de la Aplicación Flask***

**Para ejecutar la aplicación Flask, usa el siguiente comando:**

```bash
pipenv run flask --app ./src/app.py run
```

**Esto iniciará el servidor Flask en el puerto 5000, y la salida será:**

```bash
 * Serving Flask app './src/app.py'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
```

**Si necesitas que el servidor sea accesible desde todas las interfaces de red, puedes añadir la opción `--host 0.0.0.0`:**

```bash
pipenv run flask --app ./src/app.py run --host 0.0.0.0
```

**La salida será:**

```bash
 * Serving Flask app './src/app.py'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://172.17.0.2:5000
Press CTRL+C to quit
```

**Aquí, `http://172.17.0.2:5000` es la dirección IP asignada por Docker. Puedes verificar que la aplicación esté funcionando correctamente haciendo una solicitud `curl` a esta dirección:**

```bash
curl http://172.17.0.2:5000
<p>Hello, World!</p>
```

**La respuesta debería ser:**

```html
<p>Hello, World!</p>
```

---

### ***Verificación de Logs del Servidor***

**Para verificar los logs del servidor mientras está en ejecución, puedes usar el mismo comando con la opción `--host 0.0.0.0`:**

```bash
pipenv run flask --app ./src/app.py run --host 0.0.0.0
```

**En los logs podrás ver algo como:**

```bash
 * Serving Flask app './src/app.py'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://172.17.0.2:5000
Press CTRL+C to quit
172.17.0.1 - - [30/Aug/2024 23:19:19] "GET / HTTP/1.1" 200 -
```

---

### ***Manejo del Entorno Virtual***

- *Si ya tienes el `Pipfile` y el `Pipfile.lock`, el entorno virtual `.venv` puede ser eliminado y recreado sin perder tus dependencias.*

1. **Borrar el Entorno Virtual:**

   ```bash
   rm -rf ./.venv/
   ```

2. **Instalar Dependencias:**

   **Ejecuta el siguiente comando para reinstalar las dependencias desde el `Pipfile.lock`:**

   ```bash
   pipenv install
   ```

   **La salida indicará que se ha creado un nuevo entorno virtual en el directorio actual y que las dependencias se han instalado correctamente:**

   ```bash
   Warning: the environment variable LANG is not set!
   We recommend setting this in ~/.profile (or equivalent) for proper expected behavior.
   Creating a virtualenv for this project...
   Pipfile: /App/Pipfile
   Using /usr/bin/python3 (3.10.12) to create virtualenv...
   ⠼ Creating virtual environment...created virtual environment CPython3.10.12.final.0-64 in 240ms
     creator CPython3Posix(dest=/App/.venv, clear=False, no_vcs_ignore=False, global=False)
     seeder FromAppData(download=False, pip=bundle, setuptools=bundle, wheel=bundle, via=copy, app_data_dir=/root/.local/share/virtualenv)
       added seed packages: pip==24.1, setuptools==70.1.0, wheel==0.43.0
     activators BashActivator,CShellActivator,FishActivator,NushellActivator,PowerShellActivator,PythonActivator

   ✔ Successfully created virtual environment!
   Virtualenv location: /App/.venv
   To activate this project's virtualenv, run pipenv shell.
   Alternatively, run a command inside the virtualenv with pipenv run.
   Installing dependencies from Pipfile.lock (81f117)...
   ```

*Con esta información, tendrás todo lo necesario para manejar tu entorno virtual y ejecutar tu aplicación Flask con Pipenv de manera efectiva.*

---

## ***Renombrar y Crear un Nuevo Dockerfile***

---

### ***Renombrar el Fichero Existente***

**Para cambiar el nombre del fichero `Dockerfile` a `Dockerfile.pip`, usa el siguiente comando:**

```bash
mv Dockerfile Dockerfile.pip
```

**El fichero `.dockerignore` actual es el siguiente:**

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

- *Modificamos el fichero para incluir un comodín (`*`) en el nombre del Dockerfile, de manera que también se ignore cualquier fichero que comience con `Dockerfile`, como `Dockerfile.pip`. El nuevo contenido del fichero `.dockerignore` es:*

```bash
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

Dockerfile*
.venv
.gitignore
.dockerignore
__pycache__
```

**Esto asegura que cualquier fichero cuyo nombre comience con `Dockerfile` será ignorado durante el proceso de construcción de la imagen Docker.**

---

### ***Crear un Nuevo Dockerfile***

**Crea un nuevo fichero `Dockerfile` con el siguiente contenido:**

```bash
nano Dockerfile
```

---

### ***Contenido del Nuevo Dockerfile***

**Agrega el siguiente contenido al nuevo `Dockerfile`:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Usamos la imagen base oficial de Python 3.10
# Esta imagen incluye Python y sus herramientas asociadas preinstaladas
FROM python:3.10

# Instalamos Pipenv, una herramienta de gestión de entornos virtuales y dependencias para Python
RUN pip install pipenv

# Definimos la variable de entorno FLASK_APP para apuntar al fichero principal de la aplicación Flask
# Esto indica a Flask dónde encontrar la aplicación cuando se ejecute
ENV FLASK_APP=./src.app

# Creamos el directorio de trabajo dentro del contenedor y lo establecemos como el directorio actual
# Todos los comandos subsiguientes se ejecutarán desde este directorio
WORKDIR /App

# Copiamos los ficheros Pipfile y Pipfile.lock al directorio de trabajo del contenedor
# Estos ficheros contienen las dependencias necesarias para la aplicación
COPY ./Pipfile* ./

# Instalamos las dependencias especificadas en Pipfile usando Pipenv
# Esto configura el entorno virtual con todas las bibliotecas necesarias
RUN pipenv install

# Copiamos todos los ficheros del proyecto desde el host al contenedor
# Esto incluye el código fuente de la aplicación y cualquier otro recurso necesario
COPY ./ ./

# Exponemos el puerto 5000 para permitir el acceso externo a la aplicación Flask
# Este es el puerto por defecto en el que Flask escucha
EXPOSE 5000

# Iniciamos el servidor Flask usando Pipenv para activar el entorno virtual
# La opción --host 0.0.0.0 permite que la aplicación sea accesible desde cualquier dirección IP
CMD pipenv run flask run --host 0.0.0.0
```

---

### ***Explicación del Dockerfile***

- **Autor y Contacto:** *Información de autor, GitHub y correo electrónico.*
- **Imagen Base:** *`python:3.10` es la imagen oficial de Python 3.10, que incluye Python y herramientas asociadas.*
- **Instalación de Pipenv:** *Se instala Pipenv para gestionar entornos virtuales y dependencias.*
- **Variable de Entorno FLASK_APP:** *Se configura para apuntar al fichero principal de la aplicación Flask.*
- **Directorio de Trabajo:** *Se crea y establece `/App` como el directorio de trabajo del contenedor.*
- **Copia de Ficheros:** *Se copian `Pipfile` y `Pipfile.lock` para instalar las dependencias.*
- **Instalación de Dependencias:** *`pipenv install` instala las dependencias en el entorno virtual.*
- **Copia del Proyecto:** *Se copian todos los ficheros del proyecto al contenedor.*
- **Exposición de Puerto:** *Se expone el puerto 5000, que es el puerto por defecto de Flask.*
- **Comando de Ejecución:** *Se inicia el servidor Flask con `pipenv run flask run --host 0.0.0.0`, permitiendo el acceso desde cualquier dirección IP.*

- *Con esta configuración, tu aplicación Flask se ejecutará dentro de un contenedor Docker con un entorno virtual gestionado por Pipenv*

---

### ***Explicación del Comando `COPY Pipfile* ./`***

**En el comando `COPY Pipfile* ./` del Dockerfile, el asterisco (`*`) se utiliza como un carácter comodín en el contexto de la copia de ficheros. Aquí está lo que significa:**

```Dockerfile
COPY Pipfile* ./
```

- **`Pipfile*`:** *El asterisco (`*`) es un comodín que coincide con cualquier fichero que comience con `Pipfile`. Esto incluye `Pipfile` y cualquier fichero que tenga un nombre que empiece con `Pipfile`, como `Pipfile.lock`. En otras palabras, `Pipfile*` selecciona todos los ficheros que inician con `Pipfile`.*

- **`./`:** *Especifica el destino dentro del contenedor Docker. En este caso, `./` se refiere al directorio de trabajo actual en el contenedor, que ha sido configurado previamente con `WORKDIR /App`.*

---

### ***Propósito***

- *El propósito de usar `Pipfile*` es copiar tanto `Pipfile` como `Pipfile.lock` (si está presente) al contenedor. `Pipfile` y `Pipfile.lock` son ficheros generados por Pipenv que especifican las dependencias del proyecto Python.*

---

### ***Ejemplo de Cómo Funciona***

**Si tienes los siguientes ficheros en tu directorio de proyecto:**

- *`Pipfile`*
- *`Pipfile.lock`*
- *`Pipfile.old`*

- *Entonces, el comando `COPY Pipfile* ./` copiará `Pipfile`, `Pipfile.lock`, y `Pipfile.old` al directorio de trabajo `/App` dentro del contenedor Docker*

---

### ***Consideraciones***

- *Si solo deseas copiar `Pipfile` y `Pipfile.lock`, asegúrate de que no haya otros ficheros inesperados que coincidan con el patrón `Pipfile*`. Si solo te interesan `Pipfile` y `Pipfile.lock`, podrías ser más específico con los comandos `COPY` para evitar incluir ficheros no deseados.*

- *Usar un patrón de comodín puede ser útil para mantener tu Dockerfile flexible y compatible con posibles cambios en los ficheros de configuración del proyecto.*

---

### ***Error indica que Docker no puede resolver el nombre de dominio registry-1.docker.io, lo que significa que hay un problema de conectividad o DNS en tu entorno. Esto impide que Docker descargue la imagen base por ejemplo `python:3.10`.***

---

### ***1. `ping google.com`***

- **Propósito:** *`ping` es una herramienta de red utilizada para verificar la conectividad entre tu máquina y un host remoto (en este caso, `google.com`).*
- **Uso:** *Envía paquetes ICMP (Internet Control Message Protocol) al host especificado y mide el tiempo que tarda en recibir una respuesta. Esto te permite saber si tu máquina está conectada a Internet y si puede alcanzar un servidor en particular.*
- **Ejemplo de uso:**

  ```bash
  ping google.com
  ```

  *Esto te dará información sobre la latencia y si el host es alcanzable.*

### ***2. `nameserver 8.8.8.8` en `/etc/resolv.conf`***

- **`/etc/resolv.conf`**

```bash
# This is /run/systemd/resolve/stub-resolv.conf managed by man:systemd-resolved(8).
# Do not edit.
#
# This file might be symlinked as /etc/resolv.conf. If you're looking at
# /etc/resolv.conf and seeing this text, you have followed the symlink.
#
# This is a dynamic resolv.conf file for connecting local clients to the
# internal DNS stub resolver of systemd-resolved. This file lists all
# configured search domains.
#
# Run "resolvectl status" to see details about the uplink DNS servers
# currently in use.
#
# Third party programs should typically not access this file directly, but only
# through the symlink at /etc/resolv.conf. To manage man:resolv.conf(5) in a
# different way, replace this symlink by a static file or a different symlink.
#
# See man:systemd-resolved.service(8) for details about the supported modes of
# operation for /etc/resolv.conf.

nameserver 127.0.0.53
options edns0 trust-ad
search .
```

- **Propósito:** *`resolv.conf` es un fichero de configuración en sistemas Unix y Linux que especifica los servidores DNS que tu máquina debe utilizar para la resolución de nombres de dominio.*
- **Uso:** *Al agregar la línea `nameserver 8.8.8.8`, estás configurando tu máquina para que utilice el servidor DNS público de Google. Esto es útil si el servidor DNS predeterminado está fallando.*
- **Ejemplo de edición:**

  ```bash
  sudo nano /etc/resolv.conf
  ```

  **Luego, agrega la línea:**

  ```plaintext
  nameserver 8.8.8.8
  ```

### ***3. `sudo systemctl restart docker`***

- **Propósito:** *`systemctl` es una herramienta para gestionar servicios en sistemas basados en systemd. El comando `restart` detiene y luego inicia nuevamente un servicio específico, en este caso, `docker`.*
- **Uso:** *Reiniciar el servicio Docker puede resolver problemas temporales, como cuellos de botella en la red o errores en la ejecución de contenedores.*
- **Ejemplo de uso:**

  ```bash
  sudo systemctl restart docker
  ```

---

### ***4. `sudo resolvectl flush-caches`***

- **Propósito:** *`resolvectl` es una herramienta utilizada en sistemas modernos que reemplaza a `systemd-resolve`. El comando `flush-caches` limpia la caché DNS, eliminando las entradas almacenadas que podrían estar causando problemas de resolución de nombres de dominio.*
- **Uso:** *Útil cuando has realizado cambios en la configuración de DNS y necesitas asegurarte de que no se utilicen datos antiguos de la caché.*
- **Ejemplo de uso:**

  ```bash
  sudo resolvectl flush-caches
  ```

### ***5. `sudo systemctl restart systemd-resolved`***

- **Propósito:** *Similar a reiniciar Docker, este comando reinicia el servicio `systemd-resolved`, que es responsable de la resolución de nombres de dominio en sistemas basados en systemd.*
- **Uso:** *Si sospechas que hay un problema con la resolución de DNS, reiniciar este servicio puede ayudar a restablecer y solucionar problemas.*
- **Ejemplo de uso:**

  ```bash
  sudo systemctl restart systemd-resolved
  ```

### ***6. `systemctl status systemd-resolved`***

- **Propósito:** *Este comando muestra el estado actual del servicio `systemd-resolved`, incluyendo si está activo, si hay errores recientes, y otra información de diagnóstico.*
- **Uso:** *Utilízalo para verificar si el servicio `systemd-resolved` está funcionando correctamente y para diagnosticar posibles problemas.*
- **Ejemplo de uso:**

  ```bash
  systemctl status systemd-resolved
  ```

---

### ***7. Fichero `/etc/resolv.conf`***

- **Propósito:** *Este fichero contiene la configuración de los servidores DNS que el sistema debe utilizar para resolver nombres de dominio.*
- **Uso:** *Editar este fichero es una forma de cambiar manualmente los servidores DNS, lo que puede ser necesario si los servidores predeterminados no funcionan correctamente.*
- **Ejemplo de edición:**

  ```bash
  sudo nano /etc/resolv.conf
  ```

---

### ***8. Proxy y configuración de Docker***

- **Propósito:** *Cuando trabajas en una red que requiere un proxy para acceder a Internet, Docker debe estar configurado para usar ese proxy para acceder a recursos externos como Docker Hub.*
- **Uso:** *Configurar Docker para que utilice un proxy garantiza que pueda conectarse a Internet y descargar imágenes, incluso cuando está detrás de un firewall o proxy corporativo.*
- **Ejemplo de configuración:** *Puedes configurar Docker para usar un proxy editando el fichero de configuración de Docker o estableciendo las variables de entorno `HTTP_PROXY` y `HTTPS_PROXY`.*

*Estas explicaciones proporcionan un contexto claro de cómo cada comando y fichero de configuración se relaciona con la resolución de problemas de conectividad y DNS, especialmente cuando trabajas con Docker en un entorno Linux.*

---

## ***Construcción de la Imagen Docker***

**Construimos la imagen Docker utilizando la flag `pipenv` con el siguiente comando:**

```bash
docker build -t d4nitrix13/flask:pipenv ./
```

**El proceso de construcción produce la siguiente salida:**

```bash
[+] Building 29.7s (11/11) FINISHED                                                                                                   docker:default
 => [internal] load build definition from Dockerfile                                                                                            0.0s
 => => transferring dockerfile: 1.71kB                                                                                                          0.0s
 => [internal] load metadata for docker.io/library/python:3.10                                                                                  6.4s
 => [internal] load .dockerignore                                                                                                               0.0s
 => => transferring context: 237B                                                                                                               0.0s
 => CACHED [1/6] FROM docker.io/library/python:3.10@sha256:09447073b9603858602b4a725ad92e4fd4c8f6979768cee295afae67fd997718                     0.0s
 => [internal] load build context                                                                                                               0.0s
 => => transferring context: 11.78kB                                                                                                            0.0s
 => [2/6] RUN pip install pipenv                                                                                                               13.3s
 => [3/6] WORKDIR /App                                                                                                                          0.0s
 => [4/6] COPY ./Pipfile* ./                                                                                                                    0.0s
 => [5/6] RUN pipenv install                                                                                                                    8.6s
 => [6/6] COPY ./ ./                                                                                                                            0.1s
 => exporting to image                                                                                                                          1.1s
 => => exporting layers                                                                                                                         1.1s
 => => writing image sha256:410205f8f575c321f0e01309a5a6ddb6346416c68435166bcb1398d2bcd2960c                                                    0.0s
 => => naming to docker.io/d4nitrix13/flask:pipenv                                                                                              0.0s

 1 warning found (use docker --debug to expand):
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 38)
```

**Este proceso crea una imagen llamada `d4nitrix13/flask:pipenv`.**

---

## ***Iniciar el Contenedor***

**Para iniciar el contenedor y ejecutar la aplicación Flask, usamos el siguiente comando:**

```bash
docker run -it --rm d4nitrix13/flask:pipenv
```

**La salida del contenedor será:**

```bash
 * Serving Flask app './src.app'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://172.17.0.2:5000
Press CTRL+C to quit
```

**Para verificar que la aplicación está funcionando, podemos usar `curl` para hacer una solicitud HTTP:**

```bash
curl http://172.17.0.2:5000
<p>Hello, World!</p>
```

---

## ***Verificar los Logs del Servidor***

**Para revisar los logs del servidor Flask, iniciamos el contenedor nuevamente y observamos los mensajes de log:**

```bash
docker run -it --rm d4nitrix13/flask:pipenv
 * Serving Flask app './src.app'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://172.17.0.2:5000
Press CTRL+C to quit
172.17.0.1 - - [31/Aug/2024 17:38:33] "GET / HTTP/1.1" 200 -
```

---

## ***Verificar la Ubicación del Entorno Virtual***

**Para comprobar si el entorno virtual (`.venv`) se ha creado en el directorio `/App`, ejecutamos el siguiente comando:**

```bash
docker exec -it $(docker ps -q) ls -lA
```

**La salida mostrará los ficheros y directorios en el contenedor:**

```bash
total 24
-rw-r--r-- 1 root root  151 Aug 30 23:11 Pipfile
-rw-r--r-- 1 root root 8114 Aug 30 22:50 Pipfile.lock
-rw-rw-r-- 1 root root  147 Aug 29 01:40 requirements.txt
drwxrwxr-x 3 root root 4096 Aug 29 01:19 src
```

---

## ***Configuración del Entorno Virtual en el Directorio del Proyecto***

**Para asegurarnos de que el entorno virtual se cree dentro del directorio `/App`, añadimos la siguiente línea al Dockerfile:**

```Dockerfile
ENV PIPENV_VENV_IN_PROJECT=1
```

**El Dockerfile completo será:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Usamos la imagen base oficial de Python 3.10
# Esta imagen incluye Python y sus herramientas asociadas preinstaladas
FROM python:3.10

# Instalamos Pipenv, una herramienta de gestión de entornos virtuales y dependencias para Python
RUN pip install pipenv

# Definimos la variable de entorno FLASK_APP para apuntar al fichero principal de la aplicación Flask
# Esto indica a Flask dónde encontrar la aplicación cuando se ejecute
ENV FLASK_APP=./src.app

# Configuramos Pipenv para crear el entorno virtual dentro del directorio del proyecto
# Esto asegura que el entorno virtual se almacene en el directorio del proyecto en lugar de en el directorio de usuario
ENV PIPENV_VENV_IN_PROJECT=1

# Creamos el directorio de trabajo dentro del contenedor y lo establecemos como el directorio actual
# Todos los comandos subsiguientes se ejecutarán desde este directorio
WORKDIR /App

# Copiamos los ficheros Pipfile y Pipfile.lock al directorio de trabajo del contenedor
# Estos ficheros contienen las dependencias necesarias para la aplicación
COPY ./Pipfile* ./

# Instalamos las dependencias especificadas en Pipfile usando Pipenv
# Esto configura el entorno virtual con todas las bibliotecas necesarias
RUN pipenv install

# Copiamos todos los ficheros del proyecto desde el host al contenedor
# Esto incluye el código fuente de la aplicación y cualquier otro recurso necesario
COPY ./ ./

# Exponemos el puerto 5000 para permitir el acceso externo a la aplicación Flask
# Este es el puerto por defecto en el que Flask escucha
EXPOSE 5000

# Iniciamos el servidor Flask usando Pipenv para activar el entorno virtual
# La opción --host 0.0.0.0 permite que la aplicación sea accesible desde cualquier dirección IP
CMD pipenv run flask run --host 0.0.0.0
```

---

## ***Detener el Contenedor Anterior***

**Para detener cualquier contenedor en ejecución, usamos el siguiente comando:**

```bash
docker stop -t1 $(docker ps -q)
```

*Este comando envía una señal de terminación al contenedor, deteniéndolo de manera ordenada.*

---

**Construimos la imagen con la etiqueta `releasecandidate` usando el siguiente comando:**

```bash
docker build -t d4nitrix13/flask:releasecandidate ./
```

**El proceso de construcción mostró el siguiente resultado:**

```bash
[+] Building 10.6s (11/11) FINISHED                                                                                                   docker:default
 => [internal] load build definition from Dockerfile                                                                                            0.0s
 => => transferring dockerfile: 1.94kB                                                                                                          0.0s
 => [internal] load metadata for docker.io/library/python:3.10                                                                                  1.3s
 => [internal] load .dockerignore                                                                                                               0.0s
 => => transferring context: 237B                                                                                                               0.0s
 => [1/6] FROM docker.io/library/python:3.10@sha256:09447073b9603858602b4a725ad92e4fd4c8f6979768cee295afae67fd997718                            0.0s
 => [internal] load build context                                                                                                               0.0s
 => => transferring context: 368B                                                                                                               0.0s
 => CACHED [2/6] RUN pip install pipenv                                                                                                         0.0s
 => CACHED [3/6] WORKDIR /App                                                                                                                   0.0s
 => CACHED [4/6] COPY ./Pipfile* ./                                                                                                             0.0s
 => [5/6] RUN pipenv install                                                                                                                    8.3s
 => [6/6] COPY ./ ./                                                                                                                            0.0s
 => exporting to image                                                                                                                          0.9s
 => => exporting layers                                                                                                                         0.9s
 => => writing image sha256:2c94f8de84d67fdfa60f5aef79611595c6bcfaa7ad6fc00af2f8933b882f9779                                                    0.0s
 => => naming to docker.io/d4nitrix13/flask:releasecandidate                                                                                    0.0s

 1 warning found (use docker --debug to expand):
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 43)
```

**Iniciamos el contenedor con el siguiente comando:**

```bash
docker run -it d4nitrix13/flask:releasecandidate
 * Serving Flask app './src.app'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://172.17.0.2:5000
Press CTRL+C to quit
```

**Verificamos la respuesta del servidor usando `curl`:**

```bash
curl http://172.17.0.2:5000
<p>Hello, World!</p>
```

**Verificamos los logs del servidor:**

```bash
docker run -it --rm d4nitrix13/flask:releasecandidate
 * Serving Flask app './src.app'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://172.17.0.2:5000
Press CTRL+C to quit
172.17.0.1 - - [31/Aug/2024 17:38:33] "GET / HTTP/1.1" 200 -
```

**Finalmente, verificamos si el entorno virtual `.venv` se encuentra en el directorio `/App`:**

```bash
docker exec -it $(docker ps -q) ls -lA
total 28
drwxr-xr-x 5 root root 4096 Aug 31 17:48 .venv
-rw-r--r-- 1 root root  151 Aug 30 23:11 Pipfile
-rw-r--r-- 1 root root 8114 Aug 30 22:50 Pipfile.lock
-rw-rw-r-- 1 root root  147 Aug 29 01:40 requirements.txt
drwxrwxr-x 3 root root 4096 Aug 29 01:19 src
```

---

## *Cómo Cambiar el Intérprete de Python en Visual Studio Code*

> *Visual Studio Code (VS Code) te permite elegir entre diferentes intérpretes de Python instalados en tu sistema. Aquí te explico cómo hacerlo paso a paso.*

---

### ***1. Abrir la Paleta de Comandos***

*Primero, abre la **Paleta de Comandos** en VS Code. Puedes hacerlo presionando la combinación de teclas:*

- **Windows/Linux:** *`Ctrl + Shift + P`*
- **macOS:** *`Cmd + Shift + P`*

### *2. Seleccionar la Opción para Cambiar el Intérprete*

- *En la Paleta de Comandos, escribe `Python: Select Interpreter` y selecciona la opción correspondiente. Esto abrirá una lista de los intérpretes de Python disponibles en tu sistema.*

*![Seleccionar intérprete en VS Code](/images/ImageSelectInterprete.png "/images/ImageSelectInterprete.png")*

---

### ***3. Elegir el Intérprete de Python***

- *Se mostrará una lista de todos los intérpretes de Python instalados, tanto en ambientes virtuales como en ubicaciones globales. Elige el intérprete que deseas usar haciendo clic sobre él.*

*![Ubicación del intérprete de Python](/images/ImageSelectInterpreteUbication.png "/images/ImageSelectInterpreteUbication.png")*

---

### ***4. Verificar la Ubicación del Intérprete***

- *Si necesitas más información sobre la ubicación del intérprete, puedes revisar el detalle completo de la ruta del mismo, lo cual es útil cuando trabajas con entornos virtuales o múltiples versiones de Python.*

*![Ruta absoluta del intérprete](/images/ImageSelectInterpreteUbicationAbsolute.png "/images/ImageSelectInterpreteUbicationAbsolute.png")*
