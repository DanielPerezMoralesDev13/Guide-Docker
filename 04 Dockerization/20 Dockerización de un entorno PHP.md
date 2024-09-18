<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->

# ***Dockerización de un Entorno PHP***

**Para comenzar, crearemos un fichero llamado `Dockerfile` y le agregaremos el siguiente contenido:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Utiliza la imagen base de Ubuntu 22.04
FROM ubuntu:22.04

# Actualiza los paquetes del sistema e instala dependencias necesarias
# Herramienta de línea de comandos para transferir datos con URL
# Herramienta para descomprimir ficheros zip
# Interprete de PHP versión 8.1
# Extensión de PHP para trabajar con CURL
# Extensión de PHP para trabajar con XML
RUN apt update && apt install -y \
    curl \
    unzip \
    php8.1 \
    php8.1-curl \
    php8.1-xml       

# Comando predeterminado que se ejecutará al iniciar el contenedor
# Nota: La variable $USER probablemente no esté definida, 
# por lo que no mostrará el nombre de usuario.
CMD echo "Te saluda el usuario $USER"
```

---

## ***Construcción de la Imagen Docker***

**Para construir la imagen Docker, utilizamos el siguiente comando:**

```bash
docker build -t d4nitrix13/laravel:latest ./
```

**Sin embargo, al intentar construir la imagen, es probable que te encuentres con un error relacionado con la configuración del paquete `tzdata`. Este paquete se instala como una dependencia, y durante su configuración, se requiere la selección de una zona horaria. Docker se quedará esperando la entrada del usuario para configurar `tzdata`, lo que provocará que la construcción de la imagen se bloquee.**

**El error resultante se verá así:**

```bash
[+] Building 57.7s (5/5) FINISHED                                                                                    docker:default
 => [internal] load build definition from Dockerfile                                                                           0.0s
 => => transferring dockerfile: 342B                                                                                           0.0s
 => WARN: JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line   0.0s
 => [internal] load metadata for docker.io/library/ubuntu:22.04                                                                0.0s
 => [internal] load .dockerignore                                                                                              0.0s
 => => transferring context: 2B                                                                                                0.0s
 => CACHED [1/2] FROM docker.io/library/ubuntu:22.04                                                                           0.0s
 => CANCELED [2/2] RUN apt update && apt install -y     curl     unzip     php8.1     php8.1-curl     php8.1-xml              57.6s
                                                                                                                                    
 1 warning found (use docker --debug to expand):                                                                                    
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 14)           
ERROR: failed to solve: Canceled: context canceled
```

- *Este error se produce porque la instalación de `tzdata` requiere una configuración manual de la zona horaria. Como Docker no puede interactuar con la terminal para recibir la entrada del usuario, la construcción se detiene.*

---

## ***Configuración de Variables de Entorno***

*Para evitar la interacción durante la instalación de paquetes y configurar la zona horaria, añadimos dos variables de entorno en el `Dockerfile`. Estas variables son:*

- **DEBIAN_FRONTEND:** *Se establece en `noninteractive` para que `apt` no solicite ninguna entrada del usuario durante la instalación de paquetes. Aunque Ubuntu no es Debian, está basado en Debian, por lo que esta variable también se aplica.*
- **TZ:** *Se utiliza para definir la zona horaria del contenedor. En este caso, se establece en `America/Managua`, pero puedes ajustarla según tus necesidades.*

**Puedes definir estas variables de entorno de dos maneras en el `Dockerfile`:**

---

### ***Forma Recomendada***

```Dockerfile
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=America/Managua
```

---

### ***Forma Alternativa (No Recomendado)***

```Dockerfile
ENV DEBIAN_FRONTEND noninteractive
ENV TZ America/Managua
```

**La forma recomendada es la primera, ya que proporciona un formato más claro y es la sintaxis estándar aceptada en las versiones actuales de Docker. La segunda forma puede generar advertencias y no es la práctica recomendada.**

---

## ***Dockerfile Mejorado***

**Aquí tienes el `Dockerfile` completo con las variables de entorno añadidas:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Utiliza la imagen base de Ubuntu 22.04
FROM ubuntu:22.04

# Configura el entorno de instalación para que no interactúe con el usuario,
# evitando preguntas durante la instalación de paquetes.
ENV DEBIAN_FRONTEND=noninteractive

# Establece la zona horaria a América/Managua
ENV TZ=America/Managua

# Actualiza los paquetes del sistema e instala las dependencias necesarias
# Herramienta de línea de comandos para transferir datos con URL
# Herramienta para descomprimir ficheros zip
# Interprete de PHP versión 8.1
# Extensión de PHP para trabajar con CURL
# Extensión de PHP para trabajar con XML
RUN apt update && apt install -y \
    curl \
    unzip \
    php8.1 \
    php8.1-curl \
    php8.1-xml

# Comando predeterminado que se ejecutará al iniciar el contenedor
# En este caso, mostrará la fecha y hora actuales, considerando la zona horaria configurada.
CMD date
```

---

## ***Construcción de la Imagen Docker Nuevamente***

**Al construir la imagen usando el siguiente comando:**

```bash
docker build -t d4nitrix13/laravel:latest ./
```

**Con las variables de entorno definidas correctamente (`DEBIAN_FRONTEND=noninteractive` y `TZ=America/Managua`), la construcción debería completarse sin problemas. A continuación, se muestran los resultados de la construcción:**

---

### ***Sin Espacios en las Variables de Entorno***

```bash
docker build -t d4nitrix13/laravel:latest ./
[+] Building 45.7s (6/6) FINISHED                                                                docker:default
 => [internal] load build definition from Dockerfile                                                       0.0s
 => => transferring dockerfile: 372B                                                                       0.0s
 => WARN: LegacyKeyValueFormat: "ENV key=value" should be used instead of legacy "ENV key value" format (  0.0s
 => WARN: JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related   0.0s
 => [internal] load metadata for docker.io/library/ubuntu:22.04                                            0.0s
 => [internal] load .dockerignore                                                                          0.0s
 => => transferring context: 2B                                                                            0.0s
 => CACHED [1/2] FROM docker.io/library/ubuntu:22.04                                                       0.0s
 => [2/2] RUN apt update && apt install -y     curl     unzip     php8.1     php8.1-curl     php8.1-xml   42.1s
 => exporting to image                                                                                     3.5s
 => => exporting layers                                                                                    3.5s
 => => writing image sha256:788df50b158fabe527aaecfc6b883a0b65868ddc8614f1955b4f4460604e38cf               0.0s
 => => naming to docker.io/d4nitrix13/laravel:latest                                                       0.0s

 3 warnings found (use docker --debug to expand):
 - LegacyKeyValueFormat: "ENV key=value" should be used instead of legacy "ENV key value" format (line 7)
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 17)
```

### ***Con Espacios en las Variables de Entorno (Forma Alternativa)***

```bash
docker rmi d4nitrix13/laravel:latest
```

```bash
docker build -t d4nitrix13/laravel:latest ./
[+] Building 0.1s (6/6) FINISHED                                                                 docker:default
 => [internal] load build definition from Dockerfile                                                       0.0s
 => => transferring dockerfile: 372B                                                                       0.0s
 => WARN: JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related   0.0s
 => [internal] load metadata for docker.io/library/ubuntu:22.04                                            0.0s
 => [internal] load .dockerignore                                                                          0.0s
 => => transferring context: 2B                                                                            0.0s
 => [1/2] FROM docker.io/library/ubuntu:22.04                                                              0.0s
 => CACHED [2/2] RUN apt update && apt install -y     curl     unzip     php8.1     php8.1-curl     php8.1-xml   0.0s
 => exporting to image                                                                                     0.0s
 => => exporting layers                                                                                    0.0s
 => => writing image sha256:788df50b158fabe527aaecfc6b883a0b65868ddc8614f1955b4f4460604e38cf               0.0s
 => => naming to docker.io/d4nitrix13/laravel:latest                                                       0.0s

 1 warning found (use docker --debug to expand):
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 17)
```

---

## ***Ejecución del Contenedor***

**Para ejecutar el contenedor y verificar la configuración de la zona horaria, utiliza el siguiente comando:**

```bash
docker run -it --rm d4nitrix13/laravel:latest
```

**La salida del comando será:**

```bash
Mon Sep  2 14:40:07 CST 2024
```

- **Esto confirma que la zona horaria está configurada correctamente y que el contenedor se está ejecutando como se esperaba.**

---

## ***Añadir `.dockerignore`***

**Para evitar copiar ficheros innecesarios al construir la imagen Docker, creamos un fichero `.dockerignore` en el directorio del proyecto. Este fichero especifica qué ficheros y directorios deben ser excluidos del contexto de construcción. Un fichero `.dockerignore` típico podría incluir:**

```bash
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

Dockerfile*
.dockerignore
.gitignore
vendor/
```

- *Esto asegura que los ficheros de configuración de Docker y directorios que no son necesarios para la construcción de la imagen (como `vendor/`) no se incluyan en la imagen final.*

---

## ***Modificación del `Dockerfile`***

**A continuación, actualizamos el `Dockerfile` para incluir la instalación de Composer y definir el entorno de trabajo. El `Dockerfile` modificado es el siguiente:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Utiliza la imagen base de Ubuntu 22.04
FROM ubuntu:22.04

# Configura el entorno de instalación para que no interactúe con el usuario,
# evitando preguntas durante la instalación de paquetes.
ENV DEBIAN_FRONTEND=noninteractive

# Establece la zona horaria a América/Managua
ENV TZ=America/Managua

# Actualiza los paquetes del sistema e instala las dependencias necesarias:
# - curl: Herramienta de línea de comandos para transferir datos con URL
# - unzip: Herramienta para descomprimir ficheros zip
# - php8.1: Interprete de PHP versión 8.1
# - php8.1-curl: Extensión de PHP para trabajar con CURL
# - php8.1-xml: Extensión de PHP para trabajar con XML
RUN apt update && apt install -y \
    curl \
    unzip \
    php8.1 \
    php8.1-curl \
    php8.1-xml

# Descarga e instala Composer, una herramienta de gestión de dependencias para PHP
RUN curl -sS https://getcomposer.org/installer \
    | php -- --install-dir=/usr/bin --filename=composer

# Establece el directorio de trabajo en el contenedor a /App
WORKDIR /App

# Copia los ficheros composer.json y composer.lock al directorio de trabajo
COPY ./composer.* ./

# Instala las dependencias del proyecto PHP utilizando Composer
RUN composer install

# Copia el resto de los ficheros del proyecto al directorio de trabajo
COPY ./ ./

# Expone el puerto 8000 para que el contenedor pueda aceptar conexiones externas
EXPOSE 8000

# Comando predeterminado que se ejecutará al iniciar el contenedor
# Inicia el servidor PHP integrado y lo configura para escuchar en todas las interfaces
CMD php artisan serve --host 0.0.0.0
```

---

## ***Construcción de la Imagen Docker Otra Vez***

**Para construir la imagen Docker con el mismo tag, utilizamos el siguiente comando:**

```bash
docker build -t d4nitrix13/laravel:latest ./
```

*Sin embargo, este proceso puede la construcción puede fallar si hay problemas con las dependencias. Específicamente, el proceso de construcción puede fallar debido a que el comando `composer install` intenta ejecutar `artisan`, pero no encuentra el fichero `artisan` en el contexto de construcción.*

---

### ***Error Durante la Construcción***

**Al construir la imagen Docker, podrías encontrar el siguiente error:**

```bash
docker build -t d4nitrix13/laravel:latest ./
[+] Building 20.5s (10/11)                                                                                                            docker:default
 => [internal] load build definition from Dockerfile                                                                                            0.3s
 => => transferring dockerfile: 1.77kB                                                                                                          0.0s
 => [internal] load metadata for docker.io/library/ubuntu:22.04                                                                                 0.0s
 => [internal] load .dockerignore                                                                                                               0.3s
 => => transferring context: 2B                                                                                                                 0.0s
 => [internal] load build context                                                                                                               1.4s
 => => transferring context: 746.42kB                                                                                                           0.6s
 => [1/7] FROM docker.io/library/ubuntu:22.04                                                                                                   0.0s
 => CACHED [2/7] RUN apt update && apt install -y     curl     unzip     php8.1     php8.1-curl     php8.1-xml                                  0.0s
 => [3/7] RUN curl -sS https://getcomposer.org/installer     | php -- --install-dir=/usr/bin --filename=composer                                5.9s
 => [4/7] WORKDIR /App                                                                                                                          0.1s
 => [5/7] COPY ./composer.* ./                                                                                                                  0.1s
 => ERROR [6/7] RUN composer install                                                                                                           13.3s
------
 > [6/7] RUN composer install:
0.422 Installing dependencies from lock file (including require-dev)
0.437 Verifying lock file contents can be installed on current platform.
0.474 Package operations: 112 installs, 0 updates, 0 removals
0.476   - Downloading doctrine/inflector (2.0.10)
0.478   - Downloading doctrine/lexer (3.0.1)
0.479   - Downloading symfony/polyfill-ctype (v1.30.0)
0.479   - Downloading webmozart/assert (1.11.0)
0.480   - Downloading dragonmantank/cron-expression (v3.3.3)
0.481   - Downloading symfony/deprecation-contracts (v3.5.0)
0.481   - Downloading psr/container (2.0.2)
0.482   - Downloading fakerphp/faker (v1.23.1)
0.483   - Downloading symfony/polyfill-php83 (v1.30.0)
0.483   - Downloading symfony/polyfill-mbstring (v1.30.0)
0.484   - Downloading symfony/http-foundation (v6.4.10)
0.485   - Downloading fruitcake/php-cors (v1.3.0)
0.486   - Downloading psr/http-message (2.0)
0.486   - Downloading psr/http-client (1.0.3)
0.486   - Downloading ralouphie/getallheaders (3.0.3)
0.487   - Downloading psr/http-factory (1.1.0)
0.487   - Downloading guzzlehttp/psr7 (2.7.0)
0.488   - Downloading guzzlehttp/promises (2.0.3)
0.488   - Downloading guzzlehttp/guzzle (7.9.2)
0.489   - Downloading symfony/polyfill-php80 (v1.30.0)
0.489   - Downloading guzzlehttp/uri-template (v1.0.3)
0.490   - Downloading laravel/pint (v1.17.2)
0.490   - Downloading symfony/polyfill-intl-normalizer (v1.30.0)
0.491   - Downloading symfony/polyfill-intl-grapheme (v1.30.0)
0.491   - Downloading symfony/string (v6.4.11)
0.491   - Downloading symfony/service-contracts (v3.5.0)
0.492   - Downloading symfony/console (v6.4.11)
0.492   - Downloading voku/portable-ascii (2.0.1)
0.493   - Downloading phpoption/phpoption (1.9.3)
0.493   - Downloading graham-campbell/result-type (v1.1.3)
0.494   - Downloading vlucas/phpdotenv (v5.6.1)
0.494   - Downloading symfony/css-selector (v6.4.8)
0.495   - Downloading tijsverkoyen/css-to-inline-styles (v2.2.7)
0.495   - Downloading symfony/var-dumper (v6.4.11)
0.496   - Downloading symfony/polyfill-uuid (v1.30.0)
0.496   - Downloading symfony/uid (v6.4.11)
0.496   - Downloading symfony/routing (v6.4.11)
0.497   - Downloading symfony/process (v6.4.8)
0.497   - Downloading symfony/polyfill-php72 (v1.30.0)
0.498   - Downloading symfony/polyfill-intl-idn (v1.30.0)
0.498   - Downloading symfony/mime (v6.4.11)
0.498   - Downloading psr/event-dispatcher (1.0.0)
0.499   - Downloading symfony/event-dispatcher-contracts (v3.5.0)
0.499   - Downloading symfony/event-dispatcher (v6.4.8)
0.500   - Downloading psr/log (3.0.1)
0.500   - Downloading egulias/email-validator (4.0.2)
0.501   - Downloading symfony/mailer (v6.4.9)
0.501   - Downloading symfony/error-handler (v6.4.10)
0.501   - Downloading symfony/http-kernel (v6.4.11)
0.502   - Downloading symfony/finder (v6.4.11)
0.502   - Downloading ramsey/collection (2.0.0)
0.503   - Downloading brick/math (0.12.1)
0.503   - Downloading ramsey/uuid (4.7.6)
0.504   - Downloading psr/simple-cache (3.0.0)
0.504   - Downloading nunomaduro/termwind (v1.15.1)
0.505   - Downloading symfony/translation-contracts (v3.5.0)
0.505   - Downloading symfony/translation (v6.4.10)
0.505   - Downloading psr/clock (1.0.0)
0.506   - Downloading carbonphp/carbon-doctrine-types (2.1.0)
0.506   - Downloading nesbot/carbon (2.72.5)
0.507   - Downloading monolog/monolog (3.7.0)
0.507   - Downloading league/mime-type-detection (1.15.0)
0.508   - Downloading league/flysystem (3.28.0)
0.508   - Downloading league/flysystem-local (3.28.0)
0.509   - Downloading nette/utils (v4.0.5)
0.509   - Downloading nette/schema (v1.3.0)
0.509   - Downloading dflydev/dot-access-data (v3.0.3)
0.510   - Downloading league/config (v1.2.0)
0.510   - Downloading league/commonmark (2.5.3)
0.511   - Downloading laravel/serializable-closure (v1.3.4)
0.511   - Downloading laravel/prompts (v0.1.25)
0.512   - Downloading laravel/framework (v10.48.20)
0.512   - Downloading symfony/yaml (v6.4.11)
0.512   - Downloading laravel/sail (v1.31.1)
0.513   - Downloading laravel/sanctum (v3.3.3)
0.513   - Downloading nikic/php-parser (v5.1.0)
0.514   - Downloading psy/psysh (v0.12.4)
0.514   - Downloading laravel/tinker (v2.9.0)
0.515   - Downloading hamcrest/hamcrest-php (v2.0.1)
0.515   - Downloading mockery/mockery (1.6.12)
0.516   - Downloading filp/whoops (2.15.4)
0.516   - Downloading nunomaduro/collision (v7.10.0)
0.517   - Downloading sebastian/version (4.0.1)
0.517   - Downloading sebastian/type (4.0.0)
0.518   - Downloading sebastian/recursion-context (5.0.0)
0.518   - Downloading sebastian/object-reflector (3.0.0)
0.518   - Downloading sebastian/object-enumerator (5.0.0)
0.519   - Downloading sebastian/global-state (6.0.2)
0.519   - Downloading sebastian/exporter (5.1.2)
0.520   - Downloading sebastian/environment (6.1.0)
0.520   - Downloading sebastian/diff (5.1.1)
0.521   - Downloading sebastian/comparator (5.0.2)
0.523   - Downloading sebastian/code-unit (2.0.0)
0.523   - Downloading sebastian/cli-parser (2.0.1)
0.523   - Downloading phpunit/php-timer (6.0.0)
0.523   - Downloading phpunit/php-text-template (3.0.1)
0.524   - Downloading phpunit/php-invoker (4.0.0)
0.524   - Downloading phpunit/php-file-iterator (4.1.0)
0.524   - Downloading theseer/tokenizer (1.2.3)
0.525   - Downloading sebastian/lines-of-code (2.0.2)
0.525   - Downloading sebastian/complexity (3.2.0)
0.526   - Downloading sebastian/code-unit-reverse-lookup (3.0.0)
0.527   - Downloading phpunit/php-code-coverage (10.1.16)
0.527   - Downloading phar-io/version (3.2.1)
0.529   - Downloading phar-io/manifest (2.0.4)
0.530   - Downloading myclabs/deep-copy (1.12.0)
0.531   - Downloading phpunit/phpunit (10.5.30)
0.532   - Downloading spatie/error-solutions (1.1.1)
0.533   - Downloading spatie/backtrace (1.6.2)
0.533   - Downloading spatie/flare-client-php (1.8.0)
0.534   - Downloading spatie/ignition (1.15.0)
0.534   - Downloading spatie/laravel-ignition (2.8.0)
0.562    0/112 [>---------------------------]   0%
2.211    2/112 [>---------------------------]   1%
2.667   17/112 [====>-----------------------]  15%
3.216   23/112 [=====>----------------------]  20%
4.230   30/112 [=======>--------------------]  26%
4.637   34/112 [========>-------------------]  30%
5.507   46/112 [===========>----------------]  41%
5.739   58/112 [==============>-------------]  51%
5.950   68/112 [=================>----------]  60%
6.572   84/112 [=====================>------]  75%
6.678   90/112 [======================>-----]  80%
6.901  102/112 [=========================>--]  91%
7.184  112/112 [============================] 100%
7.186   - Installing doctrine/inflector (2.0.10): Extracting archive
7.200   - Installing doctrine/lexer (3.0.1): Extracting archive
7.204   - Installing symfony/polyfill-ctype (v1.30.0): Extracting archive
7.210   - Installing webmozart/assert (1.11.0): Extracting archive
7.216   - Installing dragonmantank/cron-expression (v3.3.3): Extracting archive
7.220   - Installing symfony/deprecation-contracts (v3.5.0): Extracting archive
7.225   - Installing psr/container (2.0.2): Extracting archive
7.231   - Installing fakerphp/faker (v1.23.1): Extracting archive
7.236   - Installing symfony/polyfill-php83 (v1.30.0): Extracting archive
7.241   - Installing symfony/polyfill-mbstring (v1.30.0): Extracting archive
7.246   - Installing symfony/http-foundation (v6.4.10): Extracting archive
7.249   - Installing fruitcake/php-cors (v1.3.0): Extracting archive
7.249   - Installing psr/http-message (2.0): Extracting archive
7.249   - Installing psr/http-client (1.0.3): Extracting archive
7.249   - Installing ralouphie/getallheaders (3.0.3): Extracting archive
7.249   - Installing psr/http-factory (1.1.0): Extracting archive
7.250   - Installing guzzlehttp/psr7 (2.7.0): Extracting archive
7.251   - Installing guzzlehttp/promises (2.0.3): Extracting archive
7.252   - Installing guzzlehttp/guzzle (7.9.2): Extracting archive
7.253   - Installing symfony/polyfill-php80 (v1.30.0): Extracting archive
7.254   - Installing guzzlehttp/uri-template (v1.0.3): Extracting archive
7.255   - Installing laravel/pint (v1.17.2): Extracting archive
7.256   - Installing symfony/polyfill-intl-normalizer (v1.30.0): Extracting archive
7.257   - Installing symfony/polyfill-intl-grapheme (v1.30.0): Extracting archive
7.258   - Installing symfony/string (v6.4.11): Extracting archive
7.258   - Installing symfony/service-contracts (v3.5.0): Extracting archive
7.259   - Installing symfony/console (v6.4.11): Extracting archive
7.260   - Installing voku/portable-ascii (2.0.1): Extracting archive
7.260   - Installing phpoption/phpoption (1.9.3): Extracting archive
7.261   - Installing graham-campbell/result-type (v1.1.3): Extracting archive
7.262   - Installing vlucas/phpdotenv (v5.6.1): Extracting archive
7.262   - Installing symfony/css-selector (v6.4.8): Extracting archive
7.263   - Installing tijsverkoyen/css-to-inline-styles (v2.2.7): Extracting archive
7.264   - Installing symfony/var-dumper (v6.4.11): Extracting archive
7.264   - Installing symfony/polyfill-uuid (v1.30.0): Extracting archive
7.265   - Installing symfony/uid (v6.4.11): Extracting archive
7.266   - Installing symfony/routing (v6.4.11): Extracting archive
7.266   - Installing symfony/process (v6.4.8): Extracting archive
7.267   - Installing symfony/polyfill-php72 (v1.30.0): Extracting archive
7.268   - Installing symfony/polyfill-intl-idn (v1.30.0): Extracting archive
7.268   - Installing symfony/mime (v6.4.11): Extracting archive
7.269   - Installing psr/event-dispatcher (1.0.0): Extracting archive
7.270   - Installing symfony/event-dispatcher-contracts (v3.5.0): Extracting archive
7.270   - Installing symfony/event-dispatcher (v6.4.8): Extracting archive
7.271   - Installing psr/log (3.0.1): Extracting archive
7.272   - Installing egulias/email-validator (4.0.2): Extracting archive
7.272   - Installing symfony/mailer (v6.4.9): Extracting archive
7.273   - Installing symfony/error-handler (v6.4.10): Extracting archive
7.273   - Installing symfony/http-kernel (v6.4.11): Extracting archive
7.274   - Installing symfony/finder (v6.4.11): Extracting archive
7.275   - Installing ramsey/collection (2.0.0): Extracting archive
7.275   - Installing brick/math (0.12.1): Extracting archive
7.276   - Installing ramsey/uuid (4.7.6): Extracting archive
7.277   - Installing psr/simple-cache (3.0.0): Extracting archive
7.277   - Installing nunomaduro/termwind (v1.15.1): Extracting archive
7.278   - Installing symfony/translation-contracts (v3.5.0): Extracting archive
7.279   - Installing symfony/translation (v6.4.10): Extracting archive
7.279   - Installing psr/clock (1.0.0): Extracting archive
7.280   - Installing carbonphp/carbon-doctrine-types (2.1.0): Extracting archive
7.280   - Installing nesbot/carbon (2.72.5): Extracting archive
7.281   - Installing monolog/monolog (3.7.0): Extracting archive
7.282   - Installing league/mime-type-detection (1.15.0): Extracting archive
7.282   - Installing league/flysystem (3.28.0): Extracting archive
7.283   - Installing league/flysystem-local (3.28.0): Extracting archive
7.284   - Installing nette/utils (v4.0.5): Extracting archive
7.285   - Installing nette/schema (v1.3.0): Extracting archive
7.285   - Installing dflydev/dot-access-data (v3.0.3): Extracting archive
7.287   - Installing league/config (v1.2.0): Extracting archive
7.288   - Installing league/commonmark (2.5.3): Extracting archive
7.289   - Installing laravel/serializable-closure (v1.3.4): Extracting archive
7.291   - Installing laravel/prompts (v0.1.25): Extracting archive
7.293   - Installing laravel/framework (v10.48.20): Extracting archive
7.294   - Installing symfony/yaml (v6.4.11): Extracting archive
7.294   - Installing laravel/sail (v1.31.1): Extracting archive
7.295   - Installing laravel/sanctum (v3.3.3): Extracting archive
7.296   - Installing nikic/php-parser (v5.1.0): Extracting archive
7.296   - Installing psy/psysh (v0.12.4): Extracting archive
7.297   - Installing laravel/tinker (v2.9.0): Extracting archive
7.298   - Installing hamcrest/hamcrest-php (v2.0.1): Extracting archive
7.298   - Installing mockery/mockery (1.6.12): Extracting archive
7.299   - Installing filp/whoops (2.15.4): Extracting archive
7.300   - Installing nunomaduro/collision (v7.10.0): Extracting archive
7.300   - Installing sebastian/version (4.0.1): Extracting archive
7.301   - Installing sebastian/type (4.0.0): Extracting archive
7.302   - Installing sebastian/recursion-context (5.0.0): Extracting archive
7.302   - Installing sebastian/object-reflector (3.0.0): Extracting archive
7.303   - Installing sebastian/object-enumerator (5.0.0): Extracting archive
7.304   - Installing sebastian/global-state (6.0.2): Extracting archive
7.305   - Installing sebastian/exporter (5.1.2): Extracting archive
7.306   - Installing sebastian/environment (6.1.0): Extracting archive
7.307   - Installing sebastian/diff (5.1.1): Extracting archive
7.308   - Installing sebastian/comparator (5.0.2): Extracting archive
7.308   - Installing sebastian/code-unit (2.0.0): Extracting archive
7.309   - Installing sebastian/cli-parser (2.0.1): Extracting archive
7.310   - Installing phpunit/php-timer (6.0.0): Extracting archive
7.310   - Installing phpunit/php-text-template (3.0.1): Extracting archive
7.311   - Installing phpunit/php-invoker (4.0.0): Extracting archive
7.312   - Installing phpunit/php-file-iterator (4.1.0): Extracting archive
7.312   - Installing theseer/tokenizer (1.2.3): Extracting archive
7.313   - Installing sebastian/lines-of-code (2.0.2): Extracting archive
7.314   - Installing sebastian/complexity (3.2.0): Extracting archive
7.314   - Installing sebastian/code-unit-reverse-lookup (3.0.0): Extracting archive
7.315   - Installing phpunit/php-code-coverage (10.1.16): Extracting archive
7.316   - Installing phar-io/version (3.2.1): Extracting archive
7.316   - Installing phar-io/manifest (2.0.4): Extracting archive
7.317   - Installing myclabs/deep-copy (1.12.0): Extracting archive
7.318   - Installing phpunit/phpunit (10.5.30): Extracting archive
7.318   - Installing spatie/error-solutions (1.1.1): Extracting archive
7.319   - Installing spatie/backtrace (1.6.2): Extracting archive
7.320   - Installing spatie/flare-client-php (1.8.0): Extracting archive
7.321   - Installing spatie/ignition (1.15.0): Extracting archive
7.321   - Installing spatie/laravel-ignition (2.8.0): Extracting archive
7.362    0/112 [>---------------------------]   0%
7.517   17/112 [====>-----------------------]  15%
7.650   25/112 [======>---------------------]  22%
7.799   34/112 [========>-------------------]  30%
8.079   52/112 [=============>--------------]  46%
8.195   58/112 [==============>-------------]  51%
8.411   69/112 [=================>----------]  61%
8.681   83/112 [====================>-------]  74%
8.919   97/112 [========================>---]  86%
9.065  103/112 [=========================>--]  91%
9.216  112/112 [============================] 100%
9.858 Generating optimized autoload files
12.96 > Illuminate\Foundation\ComposerScripts::postAutoloadDump
12.99 > @php artisan package:discover --ansi
13.02 Could not open input file: artisan
13.03 Script @php artisan package:discover --ansi handling the post-autoload-dump event returned with error code 1
------

 1 warning found (use docker --debug to expand):
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 49)
Dockerfile:39
--------------------
  37 |
  38 |     # Instala las dependencias del proyecto PHP utilizando Composer
  39 | >>> RUN composer install
  40 |
  41 |     # Copia el resto de los ficheros del proyecto al directorio de trabajo
--------------------
ERROR: failed to solve: process "/bin/sh -c composer install" did not complete successfully: exit code: 1
```

### ***Explicación del Error***

**Uno de las posibles causas del error ocurre porque el comando `composer` no está disponible en el contenedor cuando se ejecuta `composer install`. Esto puede deberse a que Composer no está correctamente instalado o no está en el PATH del contenedor. Para resolver este problema, asegúrate de que Composer esté instalado correctamente y sea accesible en el entorno de construcción.**

### ***Contexto Adicional***

- **Al instalar dependencias con Composer, algunas de ellas pueden ejecutar scripts automáticamente que buscan el fichero `artisan`. Estos scripts se definen en la sección `"scripts"` del fichero `composer.json` y se ejecutan en momentos específicos durante el proceso de instalación.**

**Por ejemplo, los scripts definidos en `composer.json` incluyen:**

- **`post-autoload-dump`:** *Se ejecuta después de que Composer genera el fichero autoload.*
- **`post-update-cmd`:** *Se ejecuta después de que Composer actualiza las dependencias.*
- **`post-root-package-install`:** *Se ejecuta después de la instalación del paquete raíz.*
- **`post-create-project-cmd`:** *Se ejecuta después de la creación del proyecto.*

*Estos scripts pueden intentar ejecutar comandos de Artisan, como `artisan key:generate`, que requieren que el fichero `artisan` esté presente en el contenedor. Si el fichero `artisan` no está disponible, los scripts fallarán, lo que puede causar errores durante la instalación de dependencias.*

---

## ***Componente `composer.json`***

- **El fichero `composer.json` contiene información sobre las dependencias del proyecto PHP y los scripts a ejecutar. A continuación se muestra un ejemplo de este fichero:**

```json
{
    "name": "laravel/laravel",
    "type": "project",
    "description": "The skeleton application for the Laravel framework.",
    "keywords": ["laravel", "framework"],
    "license": "MIT",
    "require": {
        "php": "^8.1",
        "guzzlehttp/guzzle": "^7.2",
        "laravel/framework": "^10.10",
        "laravel/sanctum": "^3.3",
        "laravel/tinker": "^2.8"
    },
    "require-dev": {
        "fakerphp/faker": "^1.9.1",
        "laravel/pint": "^1.0",
        "laravel/sail": "^1.18",
        "mockery/mockery": "^1.4.4",
        "nunomaduro/collision": "^7.0",
        "phpunit/phpunit": "^10.1",
        "spatie/laravel-ignition": "^2.0"
    },
    "autoload": {
        "psr-4": {
            "App\\": "app/",
            "Database\\Factories\\": "database/factories/",
            "Database\\Seeders\\": "database/seeders/"
        }
    },
    "autoload-dev": {
        "psr-4": {
            "Tests\\": "tests/"
        }
    },
    "scripts": {
        "post-autoload-dump": [
            "Illuminate\\Foundation\\ComposerScripts::postAutoloadDump",
            "@php artisan package:discover --ansi"
        ],
        "post-update-cmd": [
            "@php artisan vendor:publish --tag=laravel-assets --ansi --force"
        ],
        "post-root-package-install": [
            "@php -r \"file_exists('.env') || copy('.env.example', '.env');\""
        ],
        "post-create-project-cmd": [
            "@php artisan key:generate --ansi"
        ]
    },
    "extra": {
        "laravel": {
            "dont-discover": []
        }
    },
    "config": {
        "optimize-autoloader": true,
        "preferred-install": "dist",
        "sort-packages": true,
        "allow-plugins": {
            "pestphp/pest-plugin": true,
            "php-http/discovery": true
        }
    },
    "minimum-stability": "stable",
    "prefer-stable": true
}
```

---

## ***Scripts de Composer***

**El fichero `composer.json` incluye una sección de scripts que se ejecutan durante varias fases del ciclo de vida de Composer. Los scripts definidos son:**

```json
"scripts": {
    "post-autoload-dump": [
        "Illuminate\\Foundation\\ComposerScripts::postAutoloadDump",
        "@php artisan package:discover --ansi"
    ],
    "post-update-cmd": [
        "@php artisan vendor:publish --tag=laravel-assets --ansi --force"
    ],
    "post-root-package-install": [
        "@php -r \"file_exists('.env') || copy('.env.example', '.env');\""
    ],
    "post-create-project-cmd": [
        "@php artisan key:generate --ansi"
    ]
}
```

- *Estos scripts intentan ejecutar comandos de Artisan, lo cual puede fallar si el fichero `artisan` no está disponible en el momento de la instalación.*

---

## ***Solución Propuesta***

- *Para evitar que los scripts definidos en `composer.json` se ejecuten durante la construcción de la imagen Docker, puedes agregar la opción `--no-scripts` al comando `composer install` en el `Dockerfile`. Esto previene la ejecución de scripts que podrían depender de ficheros o configuraciones que aún no están presentes en el contenedor.*

- **Modifica el `Dockerfile` para incluir la opción `--no-scripts` en el comando `composer install`:**

```Dockerfile
RUN composer install --no-scripts
```

**El Dockerfile actualizado.**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Utiliza la imagen base de Ubuntu 22.04
FROM ubuntu:22.04

# Configura el entorno de instalación para que no interactúe con el usuario,
# evitando preguntas durante la instalación de paquetes.
ENV DEBIAN_FRONTEND=noninteractive

# Establece la zona horaria a América/Managua
ENV TZ=America/Managua

# Actualiza los paquetes del sistema e instala las dependencias necesarias:
# - curl: Herramienta de línea de comandos para transferir datos con URL
# - unzip: Herramienta para descomprimir ficheros zip
# - php8.1: Interprete de PHP versión 8.1
# - php8.1-curl: Extensión de PHP para trabajar con CURL
# - php8.1-xml: Extensión de PHP para trabajar con XML
RUN apt update && apt install -y \
    curl \
    unzip \
    php8.1 \
    php8.1-curl \
    php8.1-xml

# Descarga e instala Composer, una herramienta de gestión de dependencias para PHP
RUN curl -sS https://getcomposer.org/installer \
    | php -- --install-dir=/usr/bin --filename=composer

# Establece el directorio de trabajo en el contenedor a /App
WORKDIR /App

# Copia los ficheros composer.json y composer.lock al directorio de trabajo
COPY ./composer.* ./

# Instala las dependencias del proyecto PHP utilizando Composer
RUN composer install --no-scripts

# Copia el resto de los ficheros del proyecto al directorio de trabajo
COPY ./ ./

# Expone el puerto 8000 para que el contenedor pueda aceptar conexiones externas
EXPOSE 8000

# Comando predeterminado que se ejecutará al iniciar el contenedor
# Inicia el servidor PHP integrado y lo configura para escuchar en todas las interfaces
CMD php artisan serve --host 0.0.0.0
```

---

### ***Ahora procedemos a construir la imagen con el mismo tag:***

```bash
docker build -t d4nitrix13/laravel:latest ./
```

**Una vez construida la imagen, ejecutamos e iniciamos el contenedor con el siguiente comando:**

```bash
docker run -it --rm d4nitrix13/laravel:latest
```

**Verás un mensaje similar a este:**

```bash
INFO  Server running on [http://0.0.0.0:8000].
Press Ctrl+C to stop the server
```

- *Para detener el servidor y salir del contenedor, presiona `Ctrl+C` (`^C`).*

**Para volver a iniciar el contenedor y publicar el puerto 8000, utiliza el siguiente comando:**

```bash
docker run -it -p 8000:8000 --rm d4nitrix13/laravel:latest
```

**Este comando mapea el `puerto 8000` del contenedor al `puerto 8000` de tu máquina local.**

- *Ahora, abre cualquier navegador web y accede a `http://localhost:8000`. Deberías ver la interfaz de la aplicación Laravel en tu navegador.*

- **Logs del servidor:**

```bash
docker run -itp8000:8000 --rm d4nitrix13/laravel:latest

   INFO  Server running on [http://0.0.0.0:8000].

  Press Ctrl+C to stop the server

  2024-09-02 17:19:23 ........................................................................................................................ ~ 1s
```

---

### ***Para optimizar el Dockerfile, modificaremos el fichero para utilizar una imagen oficial de PHP. Puedes encontrar más información sobre la imagen oficial de PHP aquí: [PHP Official Docker Image](https://hub.docker.com/_/php/ "https://hub.docker.com/_/php/").***

- *La imagen oficial de PHP incluye varias extensiones preinstaladas y proporciona herramientas útiles como `docker-php-ext-install` para instalar extensiones adicionales. Esto es especialmente útil porque las imágenes oficiales de lenguajes suelen basarse en distribuciones como Debian o Ubuntu, donde los nombres de los paquetes binarios pueden variar. Por lo tanto, las herramientas proporcionadas por la imagen oficial ayudan a simplificar la instalación de extensiones.*

- **Aquí hay un ejemplo de cómo modificar el Dockerfile para usar la imagen oficial de PHP y agregar una extensión (GD en este caso):**

```Dockerfile
FROM php:8.2-fpm

# Actualiza la lista de paquetes e instala las bibliotecas necesarias para GD
RUN apt-get update && apt-get install -y \
  libfreetype-dev \
  libjpeg62-turbo-dev \
  libpng-dev \
 && docker-php-ext-configure gd --with-freetype --with-jpeg \
 && docker-php-ext-install -j$(nproc) gd
```

**A continuación, copiaremos el contenido del Dockerfile a un fichero llamado `Dockerfile.manual` para mantener una copia del fichero original:**

```bash
cp Dockerfile Dockerfile.manual
```

**Una opción para manejar Composer es utilizar la imagen oficial de Composer disponible aquí: [Composer Official Docker Image](https://hub.docker.com/_/composer "https://hub.docker.com/_/composer"). Sin embargo, las imágenes de Composer, además de incluir PHP y Composer, no ofrecen configuraciones adicionales como Alpine, Slim, etc.**

**Una alternativa más avanzada es utilizar un enfoque llamado Multi-Stage Builds. Este enfoque permite utilizar múltiples imágenes en un único Dockerfile para optimizar la construcción y reducir el tamaño de la imagen final. Por ejemplo, puedes usar una imagen para instalar Composer y luego copiar el binario a la imagen final. Aquí hay un ejemplo de cómo hacerlo:**

```Dockerfile
# Etapa 1: Usa la imagen de PHP
FROM php:8.1

# Copia Composer
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Resto del Dockerfile
```

**En este ejemplo, la sintaxis `COPY --from=composer /usr/bin/composer /usr/bin/composer` copia el binario de Composer desde la imagen `composer` a la imagen final. Esto permite mantener una imagen final más ligera y optimizada.**

---

### ***Nuestro Dockerfile quedaría:***

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Utiliza la imagen base de PHP 8.1
FROM php:8.1

# Establece la zona horaria a América/Managua
ENV TZ=America/Managua

# Establece el directorio de trabajo en el contenedor a /App
WORKDIR /App

# Actualiza la lista de paquetes disponibles e instala la herramienta unzip.
# La opción -y asegura que la instalación se realice sin solicitar confirmación.
RUN apt update && apt install -y unzip

# Copia el ejecutable Composer desde una imagen anterior (denominada "composer").
# Esto asume que existe una etapa de construcción previa en el Dockerfile que usa una imagen base
# con Composer instalado, como una imagen oficial de Composer.
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Copia los ficheros composer.json y composer.lock al directorio de trabajo
COPY ./composer.* ./

# Instala las dependencias del proyecto PHP utilizando Composer
RUN composer install --no-scripts

# Copia el resto de los ficheros del proyecto al directorio de trabajo
COPY ./ ./

# Expone el puerto 8000 para que el contenedor pueda aceptar conexiones externas
EXPOSE 8000

# Comando predeterminado que se ejecutará al iniciar el contenedor
# Inicia el servidor PHP integrado y lo configura para escuchar en todas las interfaces
CMD php artisan serve --host 0.0.0.0
```

**Construimos la imagen con el siguiente comando:**

```bash
docker build -t d4nitrix13/laravel:preconfig ./
```

**El proceso de construcción de la imagen genera una salida detallada como la siguiente:**

```bash
[+] Building 79.8s (14/14) FINISHED
 => [internal] load build definition from Dockerfile                                                                                            0.0s
 => => transferring dockerfile: 1.45kB                                                                                                          0.0s
 => [internal] load metadata for docker.io/library/composer:latest                                                                              5.0s
 => [internal] load metadata for docker.io/library/php:8.1                                                                                      4.9s
 => [internal] load .dockerignore                                                                                                               0.4s
 => => transferring context: 228B                                                                                                               0.0s
 => FROM docker.io/library/composer:latest@sha256:57000529b4609b66beeba3ebdd0ebb68b28be262c30669dfccb31003febb245a                             53.0s
 => => resolve docker.io/library/composer:latest@sha256:57000529b4609b66beeba3ebdd0ebb68b28be262c30669dfccb31003febb245a                        1.9s
 => => sha256:57000529b4609b66beeba3ebdd0ebb68b28be262c30669dfccb31003febb245a 10.09kB / 10.09kB                                                0.0s
 => => sha256:ab5c4b0f704d03358a83a61078fd1b6c6414d114420c8cd4c0e9578ec4feacc8 3.61kB / 3.61kB                                                  0.0s
 => => sha256:de4265049b89e3fcb0f6300b190bbf0d6cb9bc8b2b287127d76fd6001160194b 11.43kB / 11.43kB                                                0.0s
 => => sha256:c6a83fedfae6ed8a4f5f7cbb6a7b6f1c1ec3d86fea8cb9e5ba2e5e6673fde9f6 3.62MB / 3.62MB                                                 29.1s
 => => sha256:3ae0d9dfc4dada15e6a030ba7b9c9a3b16f9f5a7597a4d46ff24226e91b91db7 3.27MB / 3.27MB                                                 31.0s
 => => extracting sha256:c6a83fedfae6ed8a4f5f7cbb6a7b6f1c1ec3d86fea8cb9e5ba2e5e6673fde9f6                                                       0.7s
 => => sha256:ce295ca8623e5dc914104e970c5496db996db5f2abb336389bcbadd10465d21d 941B / 941B                                                     30.2s
 => => sha256:60d3eb99f3c122bc8d6c22107602ed9c22fce771289b54bb2598142d1626f693 223B / 223B                                                     30.9s
 => => sha256:65cfaca9458603d6fd96c9abf37024e24ea6014e87e5561d2c87fd2d4146618c 12.50MB / 12.50MB                                               37.0s
 => => extracting sha256:3ae0d9dfc4dada15e6a030ba7b9c9a3b16f9f5a7597a4d46ff24226e91b91db7                                                       0.3s
 => => sha256:c683b07e94367b8215a0ccee2f58593839b995f7402a9632d33e859b209c6c45 499B / 499B                                                     31.5s
 => => extracting sha256:ce295ca8623e5dc914104e970c5496db996db5f2abb336389bcbadd10465d21d                                                       0.0s
 => => sha256:6e43c92d90fbef4adfc8584ac9d0217dd5eaea08ea883e91dea19de328c358d5 17.85MB / 17.85MB                                               39.7s
 => => extracting sha256:60d3eb99f3c122bc8d6c22107602ed9c22fce771289b54bb2598142d1626f693                                                       0.0s
 => => sha256:cf39c06bba01c28f1f33e07df742a744929fe64bc561e61b6dfad16791123e21 2.45kB / 2.45kB                                                 37.1s
 => => extracting sha256:65cfaca9458603d6fd96c9abf37024e24ea6014e87e5561d2c87fd2d4146618c                                                       0.4s
 => => sha256:05acb718a956542f3f31fc2e800a6fb033ae32b30108190882ee76e4ca30fd75 19.71kB / 19.71kB                                               37.4s
 => => sha256:5c1c628831a94550293f0eed742b775ec8f1aa8d60305f4abefc9ec81b154928 30.65MB / 30.65MB                                               47.5s
 => => extracting sha256:c683b07e94367b8215a0ccee2f58593839b995f7402a9632d33e859b209c6c45                                                       0.0s
 => => sha256:764093dcc51e2435749d4675b68e622a29d0e5456d88556388b76a0aebf6d935 258B / 258B                                                     39.9s
 => => extracting sha256:6e43c92d90fbef4adfc8584ac9d0217dd5eaea08ea883e91dea19de328c358d5                                                       2.2s
 => => sha256:62e2685bcdaf2dcc08c7640a9f71f313fc13b000d6990cbf55e2973800646a7c 949.75kB / 949.75kB                                             40.3s
 => => sha256:29150294844b29c5aa70bdb486012336c7e631c818ab6ade433ee191e0a9b5e1 420B / 420B                                                     40.5s
 => => sha256:982054c20aba2b4796055dcc88685b5a708e0fbdabec04266b53a8fa74404da4 93B / 93B                                                       40.7s
 => => extracting sha256:cf39c06bba01c28f1f33e07df742a744929fe

64bc561e61b6dfad16791123e21                                                       0.1s
 => => sha256:3e1aa6b29e9fbc245e37d80b7dd4414e357609cfbc61d9ec1c8910b67173c8b5 52.77MB / 52.77MB                                               58.0s
 => => sha256:80f38d75d32fcf7b4503fc2d4e7485f6ffbdbba6788b849daaa944c0420cdaff 99.85MB / 99.85MB                                               60.2s
 => => sha256:6c37327b33b6318336e8949634e0f3062a8555f98b2db49c7d11e2ad0d9207eb 63.24MB / 63.24MB                                               70.1s
 => => sha256:7f885a7562b0b7ea9ea1345b0c3e8ed75c92c430e883e7475648e12b8b799fd8 12.23MB / 12.23MB                                               78.0s
 => => sha256:b4d34b58a1faad5c9fdadf06a2ea61ddbc24f2e0e90d751cd9786c7a53c490c5 149.17MB / 149.17MB                                               80.2s
 => => sha256:4b58c623c3fc7fcad82329e1182fc87ec3879a4b3a97a97fa3961dbb5404233e 258B / 258B                                                     83.4s
 => => sha256:7d9d15a46b5180b1e44354c35ea807b21f87f6049b72ab1a83b44268f2077c8e 52.59MB / 52.59MB                                               82.2s
 => => sha256:5bba93ec7b67641e3f3ac9c32c453d89cf30fd10d69a8d53e67e6ae8de8f50f1 3.23MB / 3.23MB                                                 79.0s
 => => extracting sha256:7d9d15a46b5180b1e44354c35ea807b21f87f6049b72ab1a83b44268f2077c8e                                                       0.5s
 => => extracting sha256:5bba93ec7b67641e3f3ac9c32c453d89cf30fd10d69a8d53e67e6ae8de8f50f1                                                       0.6s
 => => extracting sha256:4b58c623c3fc7fcad82329e1182fc87ec3879a4b3a97a97fa3961dbb5404233e                                                       0.1s
 => => extracting sha256:764093dcc51e2435749d4675b68e622a29d0e5456d88556388b76a0aebf6d935                                                       0.0s
 => => extracting sha256:29150294844b29c5aa70bdb486012336c7e631c818ab6ade433ee191e0a9b5e1                                                       0.0s
 => => extracting sha256:982054c20aba2b4796055dcc88685b5a708e0fbdabec04266b53a8fa74404da4                                                       0.0s
 => => extracting sha256:3e1aa6b29e9fbc245e37d80b7dd4414e357609cfbc61d9ec1c8910b67173c8b5                                                       0.0s
 => => extracting sha256:62e2685bcdaf2dcc08c7640a9f71f313fc13b000d6990cbf55e2973800646a7c                                                       0.1s
 => => extracting sha256:80f38d75d32fcf7b4503fc2d4e7485f6ffbdbba6788b849daaa944c0420cdaff                                                       0.2s
 => => extracting sha256:7f885a7562b0b7ea9ea1345b0c3e8ed75c92c430e883e7475648e12b8b799fd8                                                       0.2s
 => => extracting sha256:5c1c628831a94550293f0eed742b775ec8f1aa8d60305f4abefc9ec81b154928                                                       0.3s
 => => extracting sha256:6c37327b33b6318336e8949634e0f3062a8555f98b2db49c7d11e2ad0d9207eb                                                       0.1s
 => => extracting sha256:b4d34b58a1faad5c9fdadf06a2ea61ddbc24f2e0e90d751cd9786c7a53c490c5                                                       0.2s
 => [internal] load build context                                                                                                                0.0s
 => => transferring context: 2.10kB                                                                                                              0.0s
 => [1/8] FROM docker.io/library/php:8.1                                                                                                          0.0s
 => [internal] load build definition from Dockerfile                                                                                            0.0s
 => [2/8] WORKDIR /App                                                                                                                            0.0s
 => [3/8] RUN apt update && apt install -y unzip                                                                                               3.2s
 => [4/8] COPY --from=composer /usr/bin/composer /usr/bin/composer                                                                               0.0s
 => [5/8] COPY ./composer.* ./                                                                                                                  0.1s
 => [6/8] RUN composer install --no-scripts                                                                                                    22.1s
 => [7/8] COPY ./ ./                                                                                                                             0.1s
 => [8/8] EXPOSE 8000                                                                                                                            0.0s
 => [internal] load build context                                                                                                                0.0s
 => => transferring context: 2.10kB                                                                                                              0.0s
```

**La opción `--no-scripts` en el comando `composer install` impide que se ejecuten scripts definidos en el `composer.json`, lo que puede ser útil en algunos entornos de construcción.**

**Para construir la imagen, asegurémonos de estar en la misma carpeta que el Dockerfile y el fichero `.dockerignore`. Ejecuta:**

```bash
docker build -t d4nitrix13/laravel:preconfig ./
```

**Esto generará una imagen con el nombre `d4nitrix13/laravel:preconfig` que puedes utilizar para crear contenedores con el entorno preconfigurado para tu proyecto Laravel.**

### ***Verificación de Módulos Instalados***

- **Para verificar que los módulos PHP `curl` y `xml` están instalados en la imagen, inicia un contenedor con el comando `php -m`, que lista los módulos PHP instalados:**

```bash
docker run -it --rm d4nitrix13/laravel:preconfig php -m
```

**La salida esperada debería incluir los módulos `curl` y `xml`:**

```plaintext
[PHP Modules]
Core
ctype
curl
date
dom
fileinfo
filter
ftp
hash
iconv
json
libxml
mbstring
mysqlnd
openssl
pcre
PDO
pdo_sqlite
Phar
posix
readline
Reflection
session
SimpleXML
sodium
SPL
sqlite3
standard
tokenizer
xml
xmlreader
xmlwriter
zlib

[Zend Modules]
```

#### ***Iniciar el Contenedor y Publicar el Puerto***

**Para iniciar el contenedor y publicar el puerto 8000, ejecuta el siguiente comando:**

```bash
docker run -it -p 8000:8000 --rm d4nitrix13/laravel:preconfig
```

**Esto iniciará el servidor y podrás acceder a tu aplicación Laravel en tu navegador. La salida del comando debería mostrar:**

```bash
INFO  Server running on [http://0.0.0.0:8000].

Press Ctrl+C to stop the server
```

### ***Acceso a la Aplicación***

**Abre un navegador y navega a `http://localhost:8000` para ver tu aplicación Laravel en acción.**

- **Logs del Servidor**

**La salida en la consola cuando el servidor está en funcionamiento debería mostrar algo como esto:**

```bash
INFO  Server running on [http://0.0.0.0:8000].

Press Ctrl+C to stop the server

2024-09-02 23:55:29 ........................................................................................................................ ~ 2s
```

**Esto indica que el servidor está corriendo y listo para manejar solicitudes.**

---

#### ***Limpieza del Sistema Docker***

---

#### ***1. Verificación de Imágenes y Contenedores Actuales***

***Primero, revisamos las imágenes y contenedores existentes para determinar qué datos necesitamos limpiar.***

```bash
docker image ls -a
REPOSITORY           TAG                IMAGE ID       CREATED             SIZE
d4nitrix13/laravel   preconfig          d05749bf3266   12 minutes ago      633MB
d4nitrix13/laravel   latest             e49d2e3d5885   About an hour ago   405MB
<none>               <none>             788df50b158f   4 hours ago         268MB
d4nitrix13/flask     releasecandidate   2c94f8de84d6   2 days ago          1.08GB
d4nitrix13/flask     pipenv             410205f8f575   2 days ago          1.08GB
d4nitrix13/flask     beta               5b87152169f2   3 days ago          1.03GB
d4nitrix13/flask     alpha              6eb51e40034d   3 days ago          190MB
d4nitrix13/flask     dev                31a3314b5881   4 days ago          190MB
d4nitrix13/flask     latest             114137beafdb   4 days ago          190MB
ubuntu               22.04              53a843653cbc   2 weeks ago         77.9MB
hello-world          latest             d2c94e258dcb   16 months ago       13.3kB
```

```bash
docker container list --all
CONTAINER ID   IMAGE                               COMMAND                  CREATED             STATUS                           PORTS     NAMES
09d8e1970eaa   d4nitrix13/laravel:preconfig        "docker-php-entrypoi…"   9 minutes ago       Exited (0) 9 minutes ago                   epic_brattain
3ee7c25b6d6a   d4nitrix13/laravel:preconfig        "docker-php-entrypoi…"   9 minutes ago       Exited (0) 9 minutes ago                   modest_robinson
7ace22dd0beb   d4nitrix13/laravel:latest           "/bin/sh -c 'php art…"   About an hour ago   Exited (130) About an hour ago             busy_ardinghelli
44add26ca7a4   ubuntu:22.04                        "/bin/bash"              2 days ago          Exited (0) 47 hours ago                    php-practicas
ce154ef3a585   d4nitrix13/flask:releasecandidate   "/bin/sh -c 'pipenv …"   2 days ago          Exited (130) 2 days ago                    ecstatic_ride
08b7c877e9f3   ubuntu:22.04                        "/bin/bash"              5 days ago          Exited (0) 2 days ago                      python-practicas
```

---

#### ***2. Eliminación de Contenedores Detenidos***

**Para liberar espacio, primero eliminamos los contenedores que ya no están en ejecución. Ejecuta el siguiente comando:**

```bash
docker container prune
WARNING! This will remove all stopped containers.
Are you sure you want to continue? [y/N] y
```

**Resultado esperado:**

```plaintext
Deleted Containers:
09d8e1970eaad884c7af6301066257c27c90eb35043660e42e6ab4c605031066
3ee7c25b6d6ae36825e1c1c61f80638bb7fcdcf27ad448d622a3b3e5895e82c6
7ace22dd0bebfcb4b0aeeb4e25fc88469525abbd88370011250d02132a0d686c
44add26ca7a4a470e68064409a682ccfcedf5cd1886fb93ffef3c4c47ad14b05
ce154ef3a5850cdeb25aa1a9749fd32c92d341ff312800a11afbdf4df20382df
08b7c877e9f366bc31397cfa69e4dcefbd465c504ae779b05b5b80f896b9ae5c

Total reclaimed space: 730.6MB
```

---

#### ***3. Eliminación de Imágenes Dangling y No Utilizadas***

**Luego, limpiamos todas las imágenes, tanto las "dangling" (sin etiqueta) como las que no están asociadas a ningún contenedor. Ejecuta el siguiente comando:**

```bash
docker image prune -a
WARNING! This will remove all images without at least one container associated to them.
Are you sure you want to continue? [y/N] y
```

**Resultado esperado:**

```plaintext
Deleted Images:
untagged: d4nitrix13/laravel:latest
deleted: sha256:e49d2e3d5885f797811e96ecc8cc1fbb51fb2f9cd22acf2578715854e0dd587d
untagged: d4nitrix13/flask:dev
deleted: sha256:31a3314b5881204edfbb2b4bb0bc7456648c9c8d7578e088f259f72c51063c82
untagged: d4nitrix13/flask:latest
deleted: sha256:114137beafdb49f75630cb1a8f2b86bb8037c1623bf06ab210a8973bb1618968
untagged: d4nitrix13/laravel:preconfig
deleted: sha256:d05749bf3266004fc7961c8f02090d077b2165974b6fb6c5e0d0a53baa8e08c4
untagged: d4nitrix13/flask:alpha
deleted: sha256:6eb51e40034d8e844b333a4bc4199c0c75536d58ed2aaa6af6baee0761f9ed02
untagged: hello-world:latest
untagged: hello-world@sha256:53cc4d415d839c98be39331c948609b659ed725170ad2ca8eb36951288f81b75
deleted: sha256:d2c94e258dcb3c5ac2798d32e1249e42ef01cba4841c2234249495f87264ac5a
deleted: sha256:ac28800ec8bb38d5c35b49d45a6ac4777544941199075dff8c4eb63e093aa81e
deleted: sha256:788df50b158fabe527aaecfc6b883a0b65868ddc8614f1955b4f4460604e38cf
untagged: d4nitrix13/flask:releasecandidate
deleted: sha256:2c94f8de84d67fdfa60f5aef79611595c6bcfaa7ad6fc00af2f8933b882f9779
untagged: ubuntu:22.04
untagged: ubuntu@sha256:adbb90115a21969d2fe6fa7f9af4253e16d45f8d4c1e930182610c4731962658
deleted: sha256:53a843653cbcd9e10be207e951d907dc2481d9c222de57d24cfcac32e5165188
untagged: d4nitrix13/flask:pipenv
deleted: sha256:410205f8f575c321f0e01309a5a6ddb6346416c68435166bcb1398d2bcd2960c
untagged: d4nitrix13/flask:beta
deleted: sha256:5b87152169f2f11750708eb09987eb31f2f57a98e77ddea9b850a97e44ff58cb

Total reclaimed space: 13.26kB
```

- **Resumen:**

- **Contenedores detenidos eliminados:** **`730.6MB`** *recuperados.*
- **Imágenes eliminadas:** **`13.26kB`** *recuperados.*

- **La limpieza regular de contenedores y imágenes no utilizados ayuda a mantener tu entorno Docker libre de datos innecesarios y a optimizar el uso del espacio en disco.**

---

### ***Limpiar el sistema Docker***

#### ***Borrar caché de Docker de redes de contenedores e imágenes***

**Primero, limpiamos el sistema de Docker para eliminar redes de contenedores no usadas, imágenes sin contenedores asociados y caché de construcción:**

```bash
docker system prune -a
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all images without at least one container associated to them
  - all build cache

Are you sure you want to continue? [y/N] y
```

**Objetos de caché de construcción eliminados:**

```plaintext
kjhm6k2dig8z6q2eqq9fzx1cj
i63vuua7dgf7q8d794cbrm2ep
kferxjj9bpvuahx6pf25365fd
ps2xuwq7jhavldx8jw2cappkm
7v4t90grht6ac7dzh8qw4t3gp
drj4asludk5ens98116x52tui
b3a6cnz6i0360kyjhh90nsrxg
7oo805mv1ve83d2kemiyvn6d3
qzh64xiwz402clfylk8nywai9
wprhdnskm4eff205cnr8ns1do
h7ciyut0mfsrv352nqzdv2qn5
15j7xc5qzelra9sfqf0s8nzza
y6io2onvtn21vkxh1n0xzhnpp
thq6irfz1ohie21c776veqmnv
nozb0sgqp06ado99g52v1t0c6
cvmrrx4l0adhzhm1xvo1z2kul
rfpa0nnh2663y9cg4d1f9utmn
abv36tvqs9fkvdq8jkbd3959r
p0ho2e9kjdlzjvy4zbz9g0760
k2lk2hyyyzuyb48qqdr70jnxz
7zjteu69161au501pvtkj2h0z
sdhq6tdrwsbbv3c2aymnspxie
mk7kz89jrh0a4z894a18w0lf8
soqz6bmgirsaos3wdfvouha48
ttle1sx1vrayz6fxy8s0waivs
1e363i8xasfc1268nvse37dvh
y74pdzwthscg8xig5z3uuxrta
xul7ihxd06cmdm94043hm9yax
r9hecm88cnz6ce18zqwm4jz43
80llzhw6sm6gmnaes2krrraq3
ugy0asr3ftvo0xv0vlphtqcui
z3qnas5ujc0lsz06diwsos6ek
c0lqn157dvs5qda3eu4qxd8cn
1mvur3oc1wsj3jjhozrersrgl
bqa6bpexcq49j2h9pm5vvq8yr
piqfhktvjynt4a8qe5un4ksd1
49lm2g0yf0ib7hyihr20b0jcy
y63l1n97ahouw5tdrwoff2gwh
pryewkkg9idzwn6ttxg00pxij
ntc11i54ssre2eft7nrlx59b8
m58zdg6m81hqcwky6iehka7cl
vgn3gb5fnmqw3g6l8irztvkkw
i5j40nyqqobwb4s6ab6v7f1b5
fjnfhp5gd1bkx4lagx1hxv44q
kxmkh2g7t76n0nsechw7w6sha
tcr01avdkjixxx3va72zf0i9v
3rz1d63znannxo33ovmvchf10
wroidt8ngjzpfk96qhfk6m2uo
jyacy6i7dluqxbeu7hr2f376g
bbbdvtntqgjkc7kwpkbpj2ljv
qheabj8ahs7lu68udf13hljmr
aetq4z0t1649yvbcovq6tly4f
jlctdt5psgun3we65fgeqlt8p
r92cepdglcsld7yyz53ns9xuf
k1pxsufshi5qc5z7i8a4fqzj3
wtjr98vudi2epyj0qbje3ycs6
sgboedp1etufkve3sqyur4r89
k9q6yo427ayjv5lgxa61kmoir
c2bfa8n4n2lpsuoauikqfk6on
tmwuy0m0t4fmb4vuwufiofl9l
qy68816edir7b8sd3j2cahmnc
llwi65ma5m4e3d5npb4tqiujm
9jsrms3sg02rpx8nlwuph383x
oq1ol2r5e4oj5gyk41xl04qe3
q2qm86cgh72ino619efjg5141
nor25ldab0kjgrjvu5k7m8qpb
8n5mozrmw2amdbby16za50hiz
c366fbmacy5a7gze8yjv818j1
qsw1rwi8nqb6fet726tp5ree3
irfvmh8m0wzrfrxzqv7162lvu
zvdvy3jw7nsvf73wjty2cv25s
x7vy80d7ttedybbr0syagw4ji
gv9cozn6lq7nxm9uaphcrv5ah
jlgmo2fckw48bgeyp8laouexj
lz8e3higtrwwy4nh8bj5fyxee
wplzqfg4f8stnm5b38fyi3yf9
lr02gnfiznrkz58f6wj1kcex0
```

#### ***Espacio total recuperado: 711.6MB***

---

#### ***Verificar contenedores existentes***

**Listamos los contenedores existentes para confirmar que no quedan contenedores en ejecución o detenidos:**

```bash
docker ps -a
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

**Si la lista está vacía, significa que todos los contenedores han sido eliminados correctamente.**

---

#### ***Verificar imágenes existentes***

**Listamos todas las imágenes para confirmar que no hay imágenes residuales:**

```bash
docker images -a
REPOSITORY   TAG       IMAGE ID   CREATED   SIZE
```

- **Si la lista está vacía, significa que todas las imágenes no asociadas a contenedores han sido eliminadas correctamente.**
- **Con estas acciones, hemos limpiado eficazmente el sistema de Docker de contenedores, imágenes e cachés no deseados.**
