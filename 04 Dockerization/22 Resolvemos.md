<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->

# ***Resolvemos***

---

## ***Descomprimir archivo***

**Comenzamos descomprimiendo el archivo `Reto_Dockerization_Ruby.zip` en el directorio indicado:**

```bash
unzip Reto_Dockerization_Ruby.zip -d "./06 App Ruby On Rails"
```

---

### ***Estructura de Carpetas***

- **Al descomprimir, encontrarás la estructura de carpetas del proyecto Ruby on Rails. Es importante mencionar que la estructura de carpetas y archivos de Rails es similar a la de Laravel, ya que este último se inspiró en Rails para su diseño.**

---

### ***Archivos para las Dependencias***

- **Dentro del directorio descomprimido, verás dos archivos importantes para la gestión de dependencias: `Gemfile` y `Gemfile.lock`. Estos archivos contienen la lista de gemas (bibliotecas) necesarias para el proyecto y son equivalentes al `composer.json` y `composer.lock` en Laravel.**

---

#### ***Gemfile***

**El archivo `Gemfile` especifica las dependencias de gemas que necesita tu aplicación. Aquí tienes un ejemplo típico de este archivo:**

```ruby
source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.0.2"

gem "rails", "~> 7.0.4", ">= 7.0.4.2"
gem "sprockets-rails"
gem "sqlite3", "~> 1.4"
gem "puma", "~> 5.0"
gem "importmap-rails"
gem "turbo-rails"
gem "stimulus-rails"
gem "jbuilder"
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]
gem "bootsnap", require: false

group :development, :test do
  gem "debug", platforms: %i[ mri mingw x64_mingw ]
end

group :development do
  gem "web-console"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
  gem "webdrivers"
end
```

**Este archivo define varias gemas esenciales para tu aplicación, como `rails` (el marco de trabajo principal), `sqlite3` (la base de datos utilizada en desarrollo) y `puma` (el servidor web predeterminado).**

---

### ***Archivo `Gemfile.lock`***

**El archivo `Gemfile.lock` garantiza que las versiones exactas de las gemas utilizadas en el proyecto se mantengan coherentes entre distintos entornos. Aquí tienes un extracto típico:**

```bash
GEM
  remote: https://rubygems.org/
  specs:
    actioncable (7.0.4.2)
      actionpack (= 7.0.4.2)
      activesupport (= 7.0.4.2)
      nio4r (~> 2.0)
      websocket-driver (>= 0.6.1)
    actionmailbox (7.0.4.2)
      actionpack (= 7.0.4.2)
      activejob (= 7.0.4.2)
      activerecord (= 7.0.4.2)
      activestorage (= 7.0.4.2)
      activesupport (= 7.0.4.2)
      mail (>= 2.7.1)
      net-imap
      net-pop
      net-smtp
    actionmailer (7.0.4.2)
      actionpack (= 7.0.4.2)
      actionview (= 7.0.4.2)
      activejob (= 7.0.4.2)
      activesupport (= 7.0.4.2)
      mail (~> 2.5, >= 2.5.4)
      net-imap
      net-pop
      net-smtp
      rails-dom-testing (~> 2.0)
    actionpack (7.0.4.2)
      actionview (= 7.0.4.2)
      activesupport (= 7.0.4.2)
      rack (~> 2.0, >= 2.2.0)
      rack-test (>= 0.6.3)
      rails-dom-testing (~> 2.0)
      rails-html-sanitizer (~> 1.0, >= 1.2.0)
    actiontext (7.0.4.2)
      actionpack (= 7.0.4.2)
      activerecord (= 7.0.4.2)
      activestorage (= 7.0.4.2)
      activesupport (= 7.0.4.2)
      globalid (>= 0.6.0)
      nokogiri (>= 1.8.5)
    actionview (7.0.4.2)
      activesupport (= 7.0.4.2)
      builder (~> 3.1)
      erubi (~> 1.4)
      rails-dom-testing (~> 2.0)
      rails-html-sanitizer (~> 1.1, >= 1.2.0)
    activejob (7.0.4.2)
      activesupport (= 7.0.4.2)
      globalid (>= 0.3.6)
    activemodel (7.0.4.2)
      activesupport (= 7.0.4.2)
    activerecord (7.0.4.2)
      activemodel (= 7.0.4.2)
      activesupport (= 7.0.4.2)
    activestorage (7.0.4.2)
      actionpack (= 7.0.4.2)
      activejob (= 7.0.4.2)
      activerecord (= 7.0.4.2)
      activesupport (= 7.0.4.2)
      marcel (~> 1.0)
      mini_mime (>= 1.1.0)
    activesupport (7.0.4.2)
      concurrent-ruby (~> 1.0, >= 1.0.2)
      i18n (>= 1.6, < 2)
      minitest (>= 5.1)
      tzinfo (~> 2.0)
    addressable (2.8.1)
      public_suffix (>= 2.0.2, < 6.0)
    bindex (0.8.1)
    bootsnap (1.16.0)
      msgpack (~> 1.2)
    builder (3.2.4)
    capybara (3.38.0)
      addressable
      matrix
      mini_mime (>= 0.1.3)
      nokogiri (~> 1.8)
      rack (>= 1.6.0)
      rack-test (>= 0.6.3)
      regexp_parser (>= 1.5, < 3.0)
      xpath (~> 3.2)
    concurrent-ruby (1.2.2)
    crass (1.0.6)
    date (3.3.3)
    debug (1.7.1)
      irb (>= 1.5.0)
      reline (>= 0.3.1)
    erubi (1.12.0)
    globalid (1.1.0)
      activesupport (>= 5.0)
    i18n (1.12.0)
      concurrent-ruby (~> 1.0)
    importmap-rails (1.1.5)
      actionpack (>= 6.0.0)
      railties (>= 6.0.0)
    io-console (0.6.0)
    irb (1.6.2)
      reline (>= 0.3.0)
    jbuilder (2.11.5)
      actionview (>= 5.0.0)
      activesupport (>= 5.0.0)
    loofah (2.19.1)
      crass (~> 1.0.2)
      nokogiri (>= 1.5.9)
    mail (2.8.1)
      mini_mime (>= 0.1.1)
      net-imap
      net-pop
      net-smtp
    marcel (1.0.2)
    matrix (0.4.2)
    method_source (1.0.0)
    mini_mime (1.1.2)
    minitest (5.17.0)
    msgpack (1.6.0)
    net-imap (0.3.4)
      date
      net-protocol
    net-pop (0.1.2)
      net-protocol
    net-protocol (0.2.1)
      timeout
    net-smtp (0.3.3)
      net-protocol
    nio4r (2.5.8)
    nokogiri (1.14.2-x86_64-linux)
      racc (~> 1.4)
    public_suffix (5.0.1)
    puma (5.6.5)
      nio4r (~> 2.0)
    racc (1.6.2)
    rack (2.2.6.2)
    rack-test (2.0.2)
      rack (>= 1.3)
    rails (7.0.4.2)
      actioncable (= 7.0.4.2)
      actionmailbox (= 7.0.4.2)
      actionmailer (= 7.0.4.2)
      actionpack (= 7.0.4.2)
      actiontext (= 7.0.4.2)
      actionview (= 7.0.4.2)
      activejob (= 7.0.4.2)
      activemodel (= 7.0.4.2)
      activerecord (= 7.0.4.2)
      activestorage (= 7.0.4.2)
      activesupport (= 7.0.4.2)
      bundler (>= 1.15.0)
      railties (= 7.0.4.2)
    rails-dom-testing (2.0.3)
      activesupport (>= 4.2.0)
      nokogiri (>= 1.6)
    rails-html-sanitizer (1.5.0)
      loofah (~> 2.19, >= 2.19.1)
    railties (7.0.4.2)
      actionpack (= 7.0.4.2)
      activesupport (= 7.0.4.2)
      method_source
      rake (>= 12.2)
      thor (~> 1.0)
      zeitwerk (~> 2.5)
    rake (13.0.6)
    regexp_parser (2.7.0)
    reline (0.3.2)
      io-console (~> 0.5)
    rexml (3.2.5)
    rubyzip (2.3.2)
    selenium-webdriver (4.8.1)
      rexml (~> 3.2, >= 3.2.5)
      rubyzip (>= 1.2.2, < 3.0)
      websocket (~> 1.0)
    sprockets (4.2.0)
      concurrent-ruby (~> 1.0)
      rack (>= 2.2.4, < 4)
    sprockets-rails (3.4.2)
      actionpack (>= 5.2)
      activesupport (>= 5.2)
      sprockets (>= 3.0.0)
    sqlite3 (1.6.1-x86_64-linux)
    stimulus-rails (1.2.1)
      railties (>= 6.0.0)
    thor (1.2.1)
    timeout (0.3.2)
    turbo-rails (1.3.3)
      actionpack (>= 6.0.0)
      activejob (>= 6.0.0)
      railties (>= 6.0.0)
    tzinfo (2.0.6)
      concurrent-ruby (~> 1.0)
    web-console (4.2.0)
      actionview (>= 6.0.0)
      activemodel (>= 6.0.0)
      bindex (>= 0.4.0)
      railties (>= 6.0.0)
    webdrivers (5.2.0)
      nokogiri (~> 1.6)
      rubyzip (>= 1.3.0)
      selenium-webdriver (~> 4.0)
    websocket (1.2.9)
    websocket-driver (0.7.5)
      websocket-extensions (>= 0.1.0)
    websocket-extensions (0.1.5)
    xpath (3.2.0)
      nokogiri (~> 1.8)
    zeitwerk (2.6.7)

PLATFORMS
  x86_64-linux

DEPENDENCIES
  bootsnap
  capybara
  debug
  importmap-rails
  jbuilder
  puma (~> 5.0)
  rails (~> 7.0.4, >= 7.0.4.2)
  selenium-webdriver
  sprockets-rails
  sqlite3 (~> 1.4)
  stimulus-rails
  turbo-rails
  tzinfo-data
  web-console
  webdrivers

RUBY VERSION
   ruby 3.0.2p107

BUNDLED WITH
   2.4.7
```

---

### ***Introducción a Ruby on Rails***

- *Ruby on Rails es un framework para desarrollar aplicaciones web de manera rápida y eficiente utilizando el lenguaje de programación Ruby. Este framework sigue el patrón de diseño **MVC (Modelo-Vista-Controlador)**, facilitando la creación de aplicaciones web mantenibles y escalables.*

**Para aprender más sobre Ruby on Rails y su guía oficial, visita los siguientes enlaces:**

- **Página oficial:** *[Ruby on Rails](https://rubyonrails.org/ "https://rubyonrails.org/")*
- **Guía oficial de Ruby on Rails:** *[Guía de Rails](https://guides.rubyonrails.org/ "https://guides.rubyonrails.org/")*
- **Guía para empezar con Ruby on Rails:** *[Getting Started](https://guides.rubyonrails.org/getting_started.html "https://guides.rubyonrails.org/getting_started.html")*

**Si aún no tienes Ruby instalado en tu sistema, puedes consultar cómo hacerlo en:**

- **Instalación de Ruby:** *[Instalar Ruby](https://www.ruby-lang.org/en/documentation/installation/ "https://www.ruby-lang.org/en/documentation/installation/")*

---

### ***Configuración del Entorno de Desarrollo con Docker***

**A continuación, se muestra cómo iniciar un contenedor Docker con la imagen de Ubuntu 22.04, montando el directorio de trabajo y exponiendo el puerto 3000, que es comúnmente usado por aplicaciones Ruby on Rails.**

---

#### ***Comando para ejecutar el contenedor***

```bash
docker run -itw/App -p3000:3000 --mount type=bind,src="$(pwd)",dst=/App --name ruby-practicas ubuntu:22.04
```

**El comando hace lo siguiente:**

- **`-it`:** *Ejecuta el contenedor en modo interactivo con acceso a la terminal.*
- **`-w /App`:** *Establece el directorio de trabajo dentro del contenedor en `/App`.*
- **`-p 3000:3000`:** *Mapea el puerto 3000 del contenedor al puerto 3000 de la máquina anfitriona.*
- **`--mount`:** *Monta el directorio actual (`$(pwd)`) en la ruta `/App` del contenedor.*
- **`--name ruby-practicas`:** *Nombra al contenedor `ruby-practicas`.*
- **`ubuntu:22.04`:** *Especifica la imagen de Ubuntu 22.04 como base.*

**El sistema descargará la imagen de Ubuntu si no está disponible localmente:**

```bash
Unable to find image 'ubuntu:22.04' locally
22.04: Pulling from library/ubuntu
857cc8cb19c0: Pull complete
Digest: sha256:adbb90115a21969d2fe6fa7f9af4253e16d45f8d4c1e930182610c4731962658
Status: Downloaded newer image for ubuntu:22.04
```

---

### ***Listado de Archivos del Proyecto***

**Al listar los archivos del directorio del proyecto usando `ls -lA`, obtenemos algo similar a lo siguiente:**

```bash
ls -lA ./
```

**Resultado:**

```bash
total 80
drwxrwxr-x  8 1000 1000 4096 Feb 27  2023 .git
-rw-rw-r--  1 1000 1000  246 Feb 27  2023 .gitattributes
-rw-rw-r--  1 1000 1000  785 Feb 27  2023 .gitignore
-rw-rw-r--  1 1000 1000   11 Feb 27  2023 .ruby-version
-rw-rw-r--  1 1000 1000 2284 Feb 27  2023 Gemfile
-rw-rw-r--  1 1000 1000 5543 Feb 27  2023 Gemfile.lock
-rw-rw-r--  1 1000 1000  374 Feb 27  2023 README.md
-rw-rw-r--  1 1000 1000  227 Feb 27  2023 Rakefile
drwxrwxr-x 10 1000 1000 4096 Feb 27  2023 app
drwxrwxr-x  2 1000 1000 4096 Feb 27  2023 bin
drwxrwxr-x  5 1000 1000 4096 Feb 27  2023 config
-rw-rw-r--  1 1000 1000  160 Feb 27  2023 config.ru
drwxrwxr-x  2 1000 1000 4096 Feb 27  2023 db
drwxrwxr-x  4 1000 1000 4096 Feb 27  2023 lib
drwxrwxr-x  2 1000 1000 4096 Feb 27  2023 log
drwxrwxr-x  2 1000 1000 4096 Feb 27  2023 public
drwxrwxr-x  2 1000 1000 4096 Feb 27  2023 storage
drwxrwxr-x 10 1000 1000 4096 Feb 27  2023 test
drwxrwxr-x  4 1000 1000 4096 Feb 27  2023 tmp
```

---

### ***Instalación de Ruby y Actualización del Sistema***

**Dentro del contenedor Docker, instalamos Ruby y otros paquetes esenciales utilizando el siguiente comando:**

```bash
apt update && apt install -y ruby-full
```

**Una vez completada la instalación, verificamos la versión de Ruby:**

```bash
ruby --version
```

- **El resultado esperado podría ser algo similar a:**

```bash
ruby 3.0.2p107 (2021-07-07 revision 0db68f0233) [x86_64-linux-gnu]
```

**Esto indica que Ruby se ha instalado correctamente y está listo para usar dentro del contenedor.**

---

### ***Instalación de Rails y Manejo de Dependencias***

**Cuando intentas instalar `rails` utilizando el siguiente comando:**

```bash
gem install rails
```

```bash
gem install rails
Fetching thor-1.3.2.gem
Fetching webrick-1.8.1.gem
Fetching rack-3.1.7.gem
Fetching zeitwerk-2.6.18.gem
Fetching rackup-2.1.0.gem
Fetching concurrent-ruby-1.3.4.gem
Fetching tzinfo-2.0.6.gem
Fetching minitest-5.25.1.gem
Fetching i18n-1.14.5.gem
Fetching connection_pool-2.4.1.gem
Fetching activesupport-7.1.4.gem
Fetching racc-1.8.1.gem
Fetching nokogiri-1.16.7-x86_64-linux.gem
Fetching crass-1.0.6.gem
Fetching loofah-2.22.0.gem
Fetching rails-html-sanitizer-1.6.0.gem
Fetching rails-dom-testing-2.2.0.gem
Fetching rack-test-2.1.0.gem
Fetching rack-session-2.0.0.gem
Fetching erubi-1.13.0.gem
Fetching builder-3.3.0.gem
Fetching actionview-7.1.4.gem
Fetching actionpack-7.1.4.gem
Fetching railties-7.1.4.gem
Fetching marcel-1.0.4.gem
Fetching timeout-0.4.1.gem
Fetching activemodel-7.1.4.gem
Fetching activerecord-7.1.4.gem
Fetching globalid-1.2.1.gem
Fetching activejob-7.1.4.gem
Fetching activestorage-7.1.4.gem
Fetching actiontext-7.1.4.gem
Fetching mini_mime-1.1.5.gem
Fetching mail-2.8.1.gem
Fetching actionmailer-7.1.4.gem
Fetching actionmailbox-7.1.4.gem
Fetching websocket-extensions-0.1.5.gem
Fetching websocket-driver-0.7.6.gem
Fetching nio4r-2.7.3.gem
Fetching actioncable-7.1.4.gem
Fetching rails-7.1.4.gem
Successfully installed zeitwerk-2.6.18
Successfully installed thor-1.3.2
Successfully installed webrick-1.8.1
Successfully installed rack-3.1.7
Successfully installed rackup-2.1.0
Successfully installed concurrent-ruby-1.3.4
Successfully installed tzinfo-2.0.6
Successfully installed minitest-5.25.1
Successfully installed i18n-1.14.5
Successfully installed connection_pool-2.4.1
Successfully installed activesupport-7.1.4
Building native extensions. This could take a while...
ERROR:  Error installing rails:
        ERROR: Failed to build gem native extension.

    current directory: /var/lib/gems/3.0.0/gems/racc-1.8.1/ext/racc/cparse
/usr/bin/ruby3.0 -I /usr/lib/ruby/vendor_ruby -r ./siteconf20240905-2945-5cinu0.rb extconf.rb
creating Makefile

current directory: /var/lib/gems/3.0.0/gems/racc-1.8.1/ext/racc/cparse
make DESTDIR\= clean
current directory: /var/lib/gems/3.0.0/gems/racc-1.8.1/ext/racc/cparse
make DESTDIR\=
make failedNo such file or directory - make

Gem files will remain installed in /var/lib/gems/3.0.0/gems/racc-1.8.1 for inspection.
Results logged to /var/lib/gems/3.0.0/extensions/x86_64-linux/3.0.0/racc-1.8.1/gem_make.out
```

- **Verás que comienza a descargar una serie de dependencias (`gems`). Cada una de estas gemas es un componente que Rails necesita para funcionar correctamente, como `thor`, `rack`, y `activerecord`. Sin embargo, al finalizar el proceso, podrías encontrarte con el siguiente error:**

```bash
ERROR:  Error installing rails:
        ERROR: Failed to build gem native extension.
```

**Este error suele ocurrir porque la gema en cuestión requiere la compilación de extensiones nativas, y a veces faltan herramientas o bibliotecas de desarrollo necesarias para esa compilación, como `make` o dependencias específicas del sistema.**

---

### ***¿Por qué ocurre este error y cómo solucionarlo?***

**El error ocurre principalmente porque `rails` es un *meta-paquete* que no solo instala Rails como tal, sino también un conjunto de dependencias (gems) que son necesarias para crear un proyecto Rails. Sin embargo, cuando ya tienes un proyecto Rails existente, **no necesitas instalar `rails` desde cero**, sino simplemente instalar las dependencias del proyecto que ya están definidas en el archivo `Gemfile` de tu proyecto.**

**Para resolver este problema, en lugar de usar `gem install rails`, es necesario utilizar **Bundler**, que es la herramienta para gestionar las dependencias de un proyecto Ruby.**

---

### ***¿Qué es Bundler y cómo se usa?***

- *[**Bundler**](https://bundler.io/ "https://bundler.io/") es una herramienta que permite gestionar las gemas necesarias para un proyecto Ruby, asegurando que todas las dependencias estén alineadas correctamente y evitando conflictos entre versiones. En un proyecto Rails, Bundler instala todas las gemas especificadas en el archivo `Gemfile`.*

**Para instalar Bundler,** *ejecuta el siguiente comando:*

```bash
gem install bundler
```

```bash
gem install bundle
Fetching bundle-0.0.1.gem
Successfully installed bundle-0.0.1
Parsing documentation for bundle-0.0.1
Installing ri documentation for bundle-0.0.1
Done installing documentation for bundle after 0 seconds
1 gem installed
```

*Esto instalará Bundler, la herramienta que se usará para instalar las dependencias del proyecto Rails que ya está definido en el archivo `Gemfile`.*

**Una vez que tengas Bundler instalado, puedes ejecutar:**

```bash
bundle3.0 install
```

**Esto leerá el archivo `Gemfile`, descargará e instalará todas las dependencias especificadas, y configurará tu entorno de desarrollo correctamente.**

---

### ***Diferencias entre Gems, Bundler, y otras herramientas***

**Gemas (gems):** **Son paquetes de código Ruby que extienden la funcionalidad de Ruby y Rails. Cada gema puede cumplir una tarea específica, como `rails` que proporciona el framework web, o `nokogiri` que facilita el análisis de HTML y XML.**

**Bundler:** *Es una herramienta para gestionar dependencias en proyectos Ruby. Garantiza que las gemas necesarias y sus versiones compatibles se instalen correctamente, evitando conflictos entre versiones y asegurando que todas las gemas necesarias estén presentes.*

**RVM (Ruby Version Manager):** *Es una herramienta para gestionar diferentes versiones de Ruby en el mismo sistema. Permite instalar y cambiar entre versiones de Ruby fácilmente, útil cuando trabajas en proyectos que requieren versiones específicas de Ruby.*

**Gems vs Bundler:** *Las gemas son los componentes individuales que extienden la funcionalidad de Ruby, mientras que Bundler es la herramienta que gestiona la instalación y las versiones de esas gemas en un proyecto Ruby.*

**Para más información sobre estas diferencias, puedes consultar este foro de Stack Overflow donde se explican las diferencias en más detalle:**

- *[Bundler vs RVM vs Gems](https://stackoverflow.com/questions/15586216/bundler-vs-rvm-vs-gems-vs-rubygems-vs-gemsets-vs-system-ruby "Bundler vs RVM vs Gems")*

- **Conclusión**

*En resumen, si ya tienes un proyecto Rails existente, no necesitas instalar Rails directamente con `gem install rails`. Solo necesitas instalar Bundler, y luego usar `bundle install` para descargar e instalar todas las dependencias necesarias para tu proyecto.*

- **Versiones**

```bash
bundler3.0 --version
Bundler version 2.2.22
```

```bash
bundle3.0 --version
Bundler version 2.2.22
```

---

### ***Errores en `bundle3.0 install` y Solución***

**Al ejecutar `bundle3.0 install` para instalar las dependencias de tu proyecto Rails, es posible que enfrentes el siguiente error:**

```bash
Gem::Ext::BuildError: ERROR: Failed to build gem native extension.
```

- **Salida:**

```bash
bundle3.0 install
Don't run Bundler as root. Bundler can ask for sudo if it is needed, and installing your bundle as root will break this application for all non-root
users on this machine.
Warning: the running version of Bundler (2.2.22) is older than the version that created the lockfile (2.4.7). We suggest you to upgrade to the version that created the lockfile by running `gem install bundler:2.4.7`.
Fetching gem metadata from https://rubygems.org/
Fetching gem metadata from https://rubygems.org/..........
Using rake 13.0.6
Fetching minitest 5.17.0
Fetching erubi 1.12.0
Fetching concurrent-ruby 1.2.2
Fetching builder 3.2.4
Installing erubi 1.12.0
Fetching racc 1.6.2
Installing minitest 5.17.0
Fetching crass 1.0.6
Installing crass 1.0.6
Fetching rack 2.2.6.2
Installing concurrent-ruby 1.2.2
Installing racc 1.6.2 with native extensions
Fetching nio4r 2.5.8
Fetching websocket-extensions 0.1.5
Installing websocket-extensions 0.1.5
Fetching marcel 1.0.2
Installing rack 2.2.6.2
Fetching mini_mime 1.1.2
Installing nio4r 2.5.8 with native extensions
Installing marcel 1.0.2
Fetching date 3.3.3
Installing mini_mime 1.1.2
Fetching timeout 0.3.2
Fetching public_suffix 5.0.1
Installing timeout 0.3.2
Fetching bindex 0.8.1
Installing date 3.3.3 with native extensions
Installing public_suffix 5.0.1
Fetching msgpackbundle3.0 install0.4.2
Installing bindex 0.8.1 with native extensions
Fetching regexp_parser 2.7.0
Installing matrix 0.4.2
Fetching io-console 0.6.0
Installing msgpack 1.6.0 with native extensions
Installing io-console 0.6.0 with native extensions
Fetching method_source 1.0.0
Installing regexp_parser 2.7.0
Fetching thor 1.2.1
Fetching zeitwerk 2.6.7
Installing method_source 1.0.0
Using rexml 3.2.5
Fetching rubyzip 2.3.2
Installing zeitwerk 2.6.7
Fetching websocket 1.2.9
Installing thor 1.2.1
Fetching sqlite3 1.6.1 (x86_64-linux)
Installing rubyzip 2.3.2
Fetching i18n 1.12.0
Installing websocket 1.2.9
Using tzinfo 2.0.6
Fetching websocket-driver 0.7.5
Installing i18n 1.12.0
Fetching rack-test 2.0.2
Installing websocket-driver 0.7.5 with native extensions
Fetching sprockets 4.2.0
Installing rack-test 2.0.2
Fetching net-protocol 0.2.1
Installing sqlite3 1.6.1 (x86_64-linux)
Installing net-protocol 0.2.1
Fetching addressable 2.8.1
Installing sprockets 4.2.0
Fetching selenium-webdriver 4.8.1
Fetching activesupport 7.0.4.2
Installing addressable 2.8.1
Fetching net-pop 0.1.2
Installing net-pop 0.1.2
Fetching net-smtp 0.3.3
Installing activesupport 7.0.4.2
Fetching globalid 1.1.0
Installing net-smtp 0.3.3
Fetching activemodel 7.0.4.2
Installing globalid 1.1.0
Fetching activejob 7.0.4.2
Installing builder 3.2.4
Installing activemodel 7.0.4.2
Installing activejob 7.0.4.2
Installing selenium-webdriver 4.8.1
Gem::Ext::BuildError: ERROR: Failed to build gem native extension.

    current directory: /var/lib/gems/3.0.0/gems/racc-1.6.2/ext/racc/cparse
/usr/bin/ruby3.0 -I /usr/lib/ruby/vendor_ruby -r ./siteconf20240905-2972-te2gdx.rb extconf.rb
checking for rb_block_call()... *** extconf.rb failed ***
Could not create Makefile due to some reason, probably lack of necessary
libraries and/or headers.  Check the mkmf.log file for more details.  You may
need configuration options.

Provided configuration options:
        --with-opt-dir
        --without-opt-dir
        --with-opt-include
        --without-opt-include=${opt-dir}/include
        --with-opt-lib
        --without-opt-lib=${opt-dir}/lib
        --with-make-prog
        --without-make-prog
        --srcdir=.
        --curdir
        --ruby=/usr/bin/$(RUBY_BASE_NAME)3.0
/usr/lib/ruby/3.0.0/mkmf.rb:471:in `try_do': The compiler failed to generate an executable file. (RuntimeError)
You have to install development tools first.
        from /usr/lib/ruby/3.0.0/mkmf.rb:564:in `try_link0'
        from /usr/lib/ruby/3.0.0/mkmf.rb:582:in `try_link'
        from /usr/lib/ruby/3.0.0/mkmf.rb:794:in `try_func'
        from /usr/lib/ruby/3.0.0/mkmf.rb:1083:in `block in have_func'
        from /usr/lib/ruby/3.0.0/mkmf.rb:971:in `block in checking_for'
        from /usr/lib/ruby/3.0.0/mkmf.rb:361:in `block (2 levels) in postpone'
        from /usr/lib/ruby/3.0.0/mkmf.rb:331:in `open'
        from /usr/lib/ruby/3.0.0/mkmf.rb:361:in `block in postpone'
        from /usr/lib/ruby/3.0.0/mkmf.rb:331:in `open'
        from /usr/lib/ruby/3.0.0/mkmf.rb:357:in `postpone'
        from /usr/lib/ruby/3.0.0/mkmf.rb:970:in `checking_for'
        from /usr/lib/ruby/3.0.0/mkmf.rb:1082:in `have_func'
        from extconf.rb:6:in `<main>'

To see why this extension failed to compile, please check the mkmf.log which can be found here:

  /var/lib/gems/3.0.0/extensions/x86_64-linux/3.0.0/racc-1.6.2/mkmf.log

extconf failed, exit code 1

Gem files will remain installed in /var/lib/gems/3.0.0/gems/racc-1.6.2 for inspection.
Results logged to /var/lib/gems/3.0.0/extensions/x86_64-linux/3.0.0/racc-1.6.2/gem_make.out

An error occurred while installing racc (1.6.2), and Bundler cannot continue.
Make sure that `gem install racc -v '1.6.2' --source 'https://rubygems.org/'` succeeds before bundling.

In Gemfile:
  rails was resolved to 7.0.4.2, which depends on
    actioncable was resolved to 7.0.4.2, which depends on
      actionpack was resolved to 7.0.4.2, which depends on
        actionview was resolved to 7.0.4.2, which depends on
          rails-dom-testing was resolved to 2.0.3, which depends on
            nokogiri was resolved to 1.14.2, which depends on
              racc


Gem::Ext::BuildError: ERROR: Failed to build gem native extension.

    current directory: /var/lib/gems/3.0.0/gems/nio4r-2.5.8/ext/nio4r
/usr/bin/ruby3.0 -I /usr/lib/ruby/vendor_ruby -r ./siteconf20240905-2972-29lyz1.rb extconf.rb
checking for unistd.h... *** extconf.rb failed ***
Could not create Makefile due to some reason, probably lack of necessary
libraries and/or headers.  Check the mkmf.log file for more details.  You may
need configuration options.

Provided configuration options:
        --with-opt-dir
        --without-opt-dir
        --with-opt-include
        --without-opt-include=${opt-dir}/include
        --with-opt-lib
        --without-opt-lib=${opt-dir}/lib
        --with-make-prog
        --without-make-prog
        --srcdir=.
        --curdir
        --ruby=/usr/bin/$(RUBY_BASE_NAME)3.0
        --with-unistd-dir
        --without-unistd-dir
        --with-unistd-include
        --without-unistd-include=${unistd-dir}/include
        --with-unistd-lib
        --without-unistd-lib=${unistd-dir}/lib
/usr/lib/ruby/3.0.0/mkmf.rb:471:in `try_do': The compiler failed to generate an executable file. (RuntimeError)
You have to install development tools first.
        from /usr/lib/ruby/3.0.0/mkmf.rb:613:in `try_cpp'
        from /usr/lib/ruby/3.0.0/mkmf.rb:1124:in `block in have_header'
        from /usr/lib/ruby/3.0.0/mkmf.rb:971:in `block in checking_for'
        from /usr/lib/ruby/3.0.0/mkmf.rb:361:in `block (2 levels) in postpone'
        from /usr/lib/ruby/3.0.0/mkmf.rb:331:in `open'
        from /usr/lib/ruby/3.0.0/mkmf.rb:361:in `block in postpone'
        from /usr/lib/ruby/3.0.0/mkmf.rb:331:in `open'
        from /usr/lib/ruby/3.0.0/mkmf.rb:357:in `postpone'
        from /usr/lib/ruby/3.0.0/mkmf.rb:970:in `checking_for'
        from /usr/lib/ruby/3.0.0/mkmf.rb:1123:in `have_header'
        from extconf.rb:15:in `<main>'

To see why this extension failed to compile, please check the mkmf.log which can be found here:

  /var/lib/gems/3.0.0/extensions/x86_64-linux/3.0.0/nio4r-2.5.8/mkmf.log

extconf failed, exit code 1

Gem files will remain installed in /var/lib/gems/3.0.0/gems/nio4r-2.5.8 for inspection.
Results logged to /var/lib/gems/3.0.0/extensions/x86_64-linux/3.0.0/nio4r-2.5.8/gem_make.out

An error occurred while installing nio4r (2.5.8), and Bundler cannot continue.
Make sure that `gem install nio4r -v '2.5.8' --source 'https://rubygems.org/'` succeeds before bundling.

In Gemfile:
  rails was resolved to 7.0.4.2, which depends on
    actioncable was resolved to 7.0.4.2, which depends on
      nio4r


Gem::Ext::BuildError: ERROR: Failed to build gem native extension.

    current directory: /var/lib/gems/3.0.0/gems/websocket-driver-0.7.5/ext/websocket-driver
/usr/bin/ruby3.0 -I /usr/lib/ruby/vendor_ruby -r ./siteconf20240905-2972-y7uvdy.rb extconf.rb
creating Makefile

current directory: /var/lib/gems/3.0.0/gems/websocket-driver-0.7.5/ext/websocket-driver
make DESTDIR\= clean
current directory: /var/lib/gems/3.0.0/gems/websocket-driver-0.7.5/ext/websocket-driver
make DESTDIR\=
make failedNo such file or directory - make

Gem files will remain installed in /var/lib/gems/3.0.0/gems/websocket-driver-0.7.5 for inspection.
Results logged to /var/lib/gems/3.0.0/extensions/x86_64-linux/3.0.0/websocket-driver-0.7.5/gem_make.out

An error occurred while installing websocket-driver (0.7.5), and Bundler cannot continue.
Make sure that `gem install websocket-driver -v '0.7.5' --source 'https://rubygems.org/'` succeeds before bundling.

In Gemfile:
  rails was resolved to 7.0.4.2, which depends on
    actioncable was resolved to 7.0.4.2, which depends on
      websocket-driver


Gem::Ext::BuildError: ERROR: Failed to build gem native extension.

    current directory: /var/lib/gems/3.0.0/gems/date-3.3.3/ext/date
/usr/bin/ruby3.0 -I /usr/lib/ruby/vendor_ruby -r ./siteconf20240905-2972-4y9s8q.rb extconf.rb
checking for rb_category_warn()... *** extconf.rb failed ***
Could not create Makefile due to some reason, probably lack of necessary
libraries and/or headers.  Check the mkmf.log file for more details.  You may
need configuration options.

Provided configuration options:
        --with-opt-dir
        --without-opt-dir
        --with-opt-include
        --without-opt-include=${opt-dir}/include
        --with-opt-lib
        --without-opt-lib=${opt-dir}/lib
        --with-make-prog
        --without-make-prog
        --srcdir=.
        --curdir
        --ruby=/usr/bin/$(RUBY_BASE_NAME)3.0
/usr/lib/ruby/3.0.0/mkmf.rb:471:in `try_do': The compiler failed to generate an executable file. (RuntimeError)
You have to install development tools first.
        from /usr/lib/ruby/3.0.0/mkmf.rb:564:in `try_link0'
        from /usr/lib/ruby/3.0.0/mkmf.rb:582:in `try_link'
        from /usr/lib/ruby/3.0.0/mkmf.rb:794:in `try_func'
        from /usr/lib/ruby/3.0.0/mkmf.rb:1083:in `block in have_func'
        from /usr/lib/ruby/3.0.0/mkmf.rb:971:in `block in checking_for'
        from /usr/lib/ruby/3.0.0/mkmf.rb:361:in `block (2 levels) in postpone'
        from /usr/lib/ruby/3.0.0/mkmf.rb:331:in `open'
        from /usr/lib/ruby/3.0.0/mkmf.rb:361:in `block in postpone'
        from /usr/lib/ruby/3.0.0/mkmf.rb:331:in `open'
        from /usr/lib/ruby/3.0.0/mkmf.rb:357:in `postpone'
        from /usr/lib/ruby/3.0.0/mkmf.rb:970:in `checking_for'
        from /usr/lib/ruby/3.0.0/mkmf.rb:1082:in `have_func'
        from extconf.rb:6:in `<main>'

To see why this extension failed to compile, please check the mkmf.log which can be found here:

  /var/lib/gems/3.0.0/extensions/x86_64-linux/3.0.0/date-3.3.3/mkmf.log

extconf failed, exit code 1

Gem files will remain installed in /var/lib/gems/3.0.0/gems/date-3.3.3 for inspection.
Results logged to /var/lib/gems/3.0.0/extensions/x86_64-linux/3.0.0/date-3.3.3/gem_make.out

An error occurred while installing date (3.3.3), and Bundler cannot continue.
Make sure that `gem install date -v '3.3.3' --source 'https://rubygems.org/'` succeeds before bundling.

In Gemfile:
  rails was resolved to 7.0.4.2, which depends on
    actionmailbox was resolved to 7.0.4.2, which depends on
      mail was resolved to 2.8.1, which depends on
        net-imap was resolved to 0.3.4, which depends on
          date


Gem::Ext::BuildError: ERROR: Failed to build gem native extension.

    current directory: /var/lib/gems/3.0.0/gems/bindex-0.8.1/ext/skiptrace
/usr/bin/ruby3.0 -I /usr/lib/ruby/vendor_ruby -r ./siteconf20240905-2972-bi7g4o.rb extconf.rb
creating Makefile

current directory: /var/lib/gems/3.0.0/gems/bindex-0.8.1/ext/skiptrace
make DESTDIR\= clean
current directory: /var/lib/gems/3.0.0/gems/bindex-0.8.1/ext/skiptrace
make DESTDIR\=
make failedNo such file or directory - make

Gem files will remain installed in /var/lib/gems/3.0.0/gems/bindex-0.8.1 for inspection.
Results logged to /var/lib/gems/3.0.0/extensions/x86_64-linux/3.0.0/bindex-0.8.1/gem_make.out

An error occurred while installing bindex (0.8.1), and Bundler cannot continue.
Make sure that `gem install bindex -v '0.8.1' --source 'https://rubygems.org/'` succeeds before bundling.

In Gemfile:
  web-console was resolved to 4.2.0, which depends on
    bindex


Gem::Ext::BuildError: ERROR: Failed to build gem native extension.

    current directory: /var/lib/gems/3.0.0/gems/msgpack-1.6.0/ext/msgpack
/usr/bin/ruby3.0 -I /usr/lib/ruby/vendor_ruby -r ./siteconf20240905-2972-a0tlgv.rb extconf.rb
checking for ruby/st.h... *** extconf.rb failed ***
Could not create Makefile due to some reason, probably lack of necessary
libraries and/or headers.  Check the mkmf.log file for more details.  You may
need configuration options.

Provided configuration options:
        --with-opt-dir
        --without-opt-dir
        --with-opt-include
        --without-opt-include=${opt-dir}/include
        --with-opt-lib
        --without-opt-lib=${opt-dir}/lib
        --with-make-prog
        --without-make-prog
        --srcdir=.
        --curdir
        --ruby=/usr/bin/$(RUBY_BASE_NAME)3.0
        --with-ruby-dir
        --without-ruby-dir
        --with-ruby-include
        --without-ruby-include=${ruby-dir}/include
        --with-ruby-lib
        --without-ruby-lib=${ruby-dir}/lib
/usr/lib/ruby/3.0.0/mkmf.rb:471:in `try_do': The compiler failed to generate an executable file. (RuntimeError)
You have to install development tools first.
        from /usr/lib/ruby/3.0.0/mkmf.rb:613:in `try_cpp'
        from /usr/lib/ruby/3.0.0/mkmf.rb:1124:in `block in have_header'
        from /usr/lib/ruby/3.0.0/mkmf.rb:971:in `block in checking_for'
        from /usr/lib/ruby/3.0.0/mkmf.rb:361:in `block (2 levels) in postpone'
        from /usr/lib/ruby/3.0.0/mkmf.rb:331:in `open'
        from /usr/lib/ruby/3.0.0/mkmf.rb:361:in `block in postpone'
        from /usr/lib/ruby/3.0.0/mkmf.rb:331:in `open'
        from /usr/lib/ruby/3.0.0/mkmf.rb:357:in `postpone'
        from /usr/lib/ruby/3.0.0/mkmf.rb:970:in `checking_for'
        from /usr/lib/ruby/3.0.0/mkmf.rb:1123:in `have_header'
        from extconf.rb:3:in `<main>'

To see why this extension failed to compile, please check the mkmf.log which can be found here:

  /var/lib/gems/3.0.0/extensions/x86_64-linux/3.0.0/msgpack-1.6.0/mkmf.log

extconf failed, exit code 1

Gem files will remain installed in /var/lib/gems/3.0.0/gems/msgpack-1.6.0 for inspection.
Results logged to /var/lib/gems/3.0.0/extensions/x86_64-linux/3.0.0/msgpack-1.6.0/gem_make.out

An error occurred while installing msgpack (1.6.0), and Bundler cannot continue.
Make sure that `gem install msgpack -v '1.6.0' --source 'https://rubygems.org/'` succeeds before bundling.

In Gemfile:
  bootsnap was resolved to 1.16.0, which depends on
    msgpack


Gem::Ext::BuildError: ERROR: Failed to build gem native extension.

    current directory: /var/lib/gems/3.0.0/gems/io-console-0.6.0/ext/io/console
/usr/bin/ruby3.0 -I /usr/lib/ruby/vendor_ruby -r ./siteconf20240905-2972-kzk5ag.rb extconf.rb
*** extconf.rb failed ***
Could not create Makefile due to some reason, probably lack of necessary
libraries and/or headers.  Check the mkmf.log file for more details.  You may
need configuration options.

Provided configuration options:
        --with-opt-dir
        --without-opt-dir
        --with-opt-include
        --without-opt-include=${opt-dir}/include
        --with-opt-lib
        --without-opt-lib=${opt-dir}/lib
        --with-make-prog
        --without-make-prog
        --srcdir=.
        --curdir
        --ruby=/usr/bin/$(RUBY_BASE_NAME)3.0
/usr/lib/ruby/3.0.0/mkmf.rb:471:in `try_do': The compiler failed to generate an executable file. (RuntimeError)
You have to install development tools first.
        from /usr/lib/ruby/3.0.0/mkmf.rb:597:in `block in try_compile'
        from /usr/lib/ruby/3.0.0/mkmf.rb:546:in `with_werror'
        from /usr/lib/ruby/3.0.0/mkmf.rb:597:in `try_compile'
        from /usr/lib/ruby/3.0.0/mkmf.rb:864:in `macro_defined?'
        from extconf.rb:7:in `<main>'

To see why this extension failed to compile, please check the mkmf.log which can be found here:

  /var/lib/gems/3.0.0/extensions/x86_64-linux/3.0.0/io-console-0.6.0/mkmf.log

extconf failed, exit code 1

Gem files will remain installed in /var/lib/gems/3.0.0/gems/io-console-0.6.0 for inspection.
Results logged to /var/lib/gems/3.0.0/extensions/x86_64-linux/3.0.0/io-console-0.6.0/gem_make.out

An error occurred while installing io-console (0.6.0), and Bundler cannot continue.
Make sure that `gem install io-console -v '0.6.0' --source 'https://rubygems.org/'` succeeds before bundling.

In Gemfile:
  debug was resolved to 1.7.1, which depends on
    irb was resolved to 1.6.2, which depends on
      reline was resolved to 0.3.2, which depends on
        io-console
```

- **Este error ocurre cuando Bundler intenta construir una gema que requiere extensiones nativas, y el proceso de construcción falla. Las extensiones nativas a menudo requieren herramientas y bibliotecas específicas del sistema para compilar correctamente.**

**Foro para resolución del error:**

*Para obtener más detalles sobre este problema y posibles soluciones, puedes consultar el siguiente foro de Stack Overflow:*

- *[Gem::Ext::BuildError: ERROR: Failed to build gem native extension](https://stackoverflow.com/questions/62965073/gemextbuilderror-error-failed-to-build-gem-native-extension-keep-getting "https://stackoverflow.com/questions/62965073/gemextbuilderror-error-failed-to-build-gem-native-extension-keep-getting")*

**Solución propuesta:**

- **Una solución común para este tipo de errores es instalar `build-essential`, que proporciona las herramientas necesarias para compilar gemas que contienen extensiones nativas.**

**Para instalar `build-essential`, ejecuta el siguiente comando en tu contenedor Docker:**

```bash
apt-get install -y build-essential
```

- *Este comando instalará un conjunto de herramientas de desarrollo esenciales, incluyendo compiladores y bibliotecas necesarias para la construcción de extensiones nativas.*

---

### ***Reintentar la Instalación de Dependencias***

- **Después de instalar `build-essential`, vuelve a ejecutar el comando `bundle3.0 install` para intentar instalar las dependencias nuevamente:**

```bash
bundle3.0 install
```

```bash
bundle3.0 install
Don't run Bundler as root. Bundler can ask for sudo if it is needed, and installing your bundle as root will break this
application for all non-root users on this machine.
Warning: the running version of Bundler (2.2.22) is older than the version that created the lockfile (2.4.7). We suggest you to upgrade to the version that created the lockfile by running `gem install bundler:2.4.7`.
Fetching gem metadata from https://rubygems.org/
Fetching gem metadata from https://rubygems.org/..........
Using rake 13.0.6
Using concurrent-ruby 1.2.2
Using minitest 5.17.0
Using crass 1.0.6
Using rack 2.2.6.2
Using builder 3.2.4
Using websocket-extensions 0.1.5
Using erubi 1.12.0
Using mini_mime 1.1.2
Fetching nio4r 2.5.8
Fetching racc 1.6.2
Using marcel 1.0.2
Using timeout 0.3.2
Using public_suffix 5.0.1
Fetching date 3.3.3
Fetching bindex 0.8.1
Installing bindex 0.8.1 with native extensions
Installing racc 1.6.2 with native extensions
Installing date 3.3.3 with native extensions
Installing nio4r 2.5.8 with native extensions
Fetching msgpack 1.6.0
Installing msgpack 1.6.0 with native extensions
Using bundler 2.2.22
Using matrix 0.4.2
Using regexp_parser 2.7.0
Fetching io-console 0.6.0
Installing io-console 0.6.0 with native extensions
Using method_source 1.0.0
Using thor 1.2.1
Using zeitwerk 2.6.7
Using rexml 3.2.5
Using rubyzip 2.3.2
Using websocket 1.2.9
Using sqlite3 1.6.1 (x86_64-linux)
Using i18n 1.12.0
Using tzinfo 2.0.6
Using rack-test 2.0.2
Using sprockets 4.2.0
Fetching websocket-driver 0.7.5
Installing websocket-driver 0.7.5 with native extensions
Using net-protocol 0.2.1
Using addressable 2.8.1
Fetching nokogiri 1.14.2 (x86_64-linux)
Fetching reline 0.3.2
Installing nokogiri 1.14.2 (x86_64-linux)
Installing reline 0.3.2
Using selenium-webdriver 4.8.1
Using activesupport 7.0.4.2
Using net-pop 0.1.2
Using net-smtp 0.3.3
Fetching puma 5.6.5
Fetching irb 1.6.2
Installing puma 5.6.5 with native extensions
Installing irb 1.6.2
Using globalid 1.1.0
Using activemodel 7.0.4.2
Fetching rails-dom-testing 2.0.3
Installing rails-dom-testing 2.0.3
Fetching loofah 2.19.1
Installing loofah 2.19.1
Fetching xpath 3.2.0
Installing xpath 3.2.0
Fetching webdrivers 5.2.0
Installing webdrivers 5.2.0
Fetching debug 1.7.1
Installing debug 1.7.1 with native extensions
Using activejob 7.0.4.2
Fetching activerecord 7.0.4.2
Fetching rails-html-sanitizer 1.5.0
Fetching capybara 3.38.0
Installing rails-html-sanitizer 1.5.0
Fetching bootsnap 1.16.0
Installing activerecord 7.0.4.2
Fetching actionview 7.0.4.2
Installing bootsnap 1.16.0 with native extensions
Installing capybara 3.38.0
Installing actionview 7.0.4.2
Fetching actionpack 7.0.4.2
Fetching jbuilder 2.11.5
Installing jbuilder 2.11.5
Installing actionpack 7.0.4.2
Fetching actioncable 7.0.4.2
Fetching activestorage 7.0.4.2
Fetching railties 7.0.4.2
Installing actioncable 7.0.4.2
Installing activestorage 7.0.4.2
Installing railties 7.0.4.2
Fetching sprockets-rails 3.4.2
Fetching actiontext 7.0.4.2
Installing sprockets-rails 3.4.2
Fetching importmap-rails 1.1.5
Fetching stimulus-rails 1.2.1
Installing actiontext 7.0.4.2
Fetching turbo-rails 1.3.3
Installing importmap-rails 1.1.5
Installing stimulus-rails 1.2.1
Fetching web-console 4.2.0
Installing web-console 4.2.0
Installing turbo-rails 1.3.3
Fetching net-imap 0.3.4
Installing net-imap 0.3.4
Fetching mail 2.8.1
Installing mail 2.8.1
Fetching actionmailbox 7.0.4.2
Fetching actionmailer 7.0.4.2
Installing actionmailbox 7.0.4.2
Installing actionmailer 7.0.4.2
Fetching rails 7.0.4.2
Installing rails 7.0.4.2
Bundle complete! 15 Gemfile dependencies, 72 gems now installed.
Use `bundle info [gemname]` to see where a bundled gem is installed.
```

**Este comando hace lo siguiente:**

- **`bundle3.0 install`:** *Lee el archivo `Gemfile`, descarga todas las gemas necesarias y las instala en tu entorno, asegurando que las versiones sean compatibles.*

**Resultado esperado:**

**Después de ejecutar `bundle3.0 install` correctamente, deberías ver que todas las dependencias del proyecto se han instalado sin errores, y tu entorno de desarrollo estará listo para usar.**

---

### ***Resumen y Consideraciones Adicionales***

1. **Errores de Extensión Nativa:** *Los errores de construcción de extensiones nativas a menudo se deben a la falta de herramientas de compilación en el sistema. La instalación de `build-essential` suele resolver estos problemas.*

2. **Bundler y Versión de Ruby:** **Asegúrate de que la versión de Bundler y la versión de Ruby sean compatibles con las gemas que estás instalando. Puedes verificar la versión de Bundler con:**

    ```bash
    bundler3.0 --version
    ```

3. **Documentación y Soporte:** *Consulta la documentación de Ruby on Rails y Bundler para obtener más detalles sobre la instalación y configuración. También puedes buscar ayuda en foros y comunidades si encuentras problemas específicos.*

4. **Ejemplo de Comando Completo para Bundler:** *Asegúrate de que el comando `bundle` que utilices esté correctamente vinculado a la versión de Ruby que estás usando. A veces, puede ser necesario usar un alias específico para Bundler si tienes múltiples versiones instaladas.*

---

### ***Preferencia de Directorio para Dependencias***

- *Si prefieres que el directorio donde se crean las dependencias sea el directorio actual, es importante saber cómo configurar correctamente Bundler para que respete esta preferencia. Aunque la opción para especificar el directorio con `--path ./vendor` está obsoleta, existen métodos recomendados para lograr el mismo objetivo.*

**Foro sobre `--path` Obsoleto:**

```bash
bundle3.0 install --path ./vendor
```

```bash
bundle3.0 install --path ./vendor
[DEPRECATED] The `--path` flag is deprecated because it relies on being remembered across bundler invocations, which bundler will no longer do in future versions. Instead please use `bundle config set --local path './vendor'`, and stop using this flag
Don't run Bundler as root. Bundler can ask for sudo if it is needed, and installing your bundle as root will break this
application for all non-root users on this machine.
Warning: the running version of Bundler (2.2.22) is older than the version that created the lockfile (2.4.7). We suggest you to upgrade to the version that created the lockfile by running `gem install bundler:2.4.7`.
Fetching gem metadata from https://rubygems.org/
Fetching gem metadata from https://rubygems.org/..........
Fetching rake 13.0.6
Installing rake 13.0.6
Fetching minitest 5.17.0
Fetching concurrent-ruby 1.2.2
Fetching builder 3.2.4
Fetching erubi 1.12.0
Installing erubi 1.12.0
Installing builder 3.2.4
Fetching racc 1.6.2
Fetching crass 1.0.6
Installing minitest 5.17.0
Fetching rack 2.2.6.2
Installing concurrent-ruby 1.2.2
Installing crass 1.0.6
Fetching nio4r 2.5.8
Fetching websocket-extensions 0.1.5
Installing racc 1.6.2 with native extensions
Installing websocket-extensions 0.1.5
Installing rack 2.2.6.2
Fetching marcel 1.0.2
Fetching mini_mime 1.1.2
Installing nio4r 2.5.8 with native extensions
Installing marcel 1.0.2
Fetching date 3.3.3
Installing mini_mime 1.1.2
Fetching timeout 0.3.2
Installing timeout 0.3.2
Fetching public_suffix 5.0.1
Installing date 3.3.3 with native extensions
Installing public_suffix 5.0.1
Fetching bindex 0.8.1
Installing bindex 0.8.1 with native extensions
Fetching msgpack 1.6.0
Using bundler 2.2.22
Fetching matrix 0.4.2
Installing msgpack 1.6.0 with native extensions
Installing matrix 0.4.2
Fetching regexp_parser 2.7.0
Installing regexp_parser 2.7.0
Fetching io-console 0.6.0
Installing io-console 0.6.0 with native extensions
Fetching method_source 1.0.0
Installing method_source 1.0.0
Fetching thor 1.2.1
Installing thor 1.2.1
Fetching zeitwerk 2.6.7
Fetching rexml 3.2.5
Installing zeitwerk 2.6.7
Fetching rubyzip 2.3.2
Installing rexml 3.2.5
Installing rubyzip 2.3.2
Fetching websocket 1.2.9
Fetching sqlite3 1.6.1 (x86_64-linux)
Installing websocket 1.2.9
Fetching i18n 1.12.0
Installing i18n 1.12.0
Fetching tzinfo 2.0.6
Installing tzinfo 2.0.6
Installing sqlite3 1.6.1 (x86_64-linux)
Fetching websocket-driver 0.7.5
Installing websocket-driver 0.7.5 with native extensions
Fetching rack-test 2.0.2
Installing rack-test 2.0.2
Fetching sprockets 4.2.0
Fetching net-protocol 0.2.1
Installing sprockets 4.2.0
Fetching addressable 2.8.1
Installing net-protocol 0.2.1
Fetching nokogiri 1.14.2 (x86_64-linux)
Installing addressable 2.8.1
Fetching reline 0.3.2
Installing reline 0.3.2
Fetching puma 5.6.5
Installing nokogiri 1.14.2 (x86_64-linux)
Installing puma 5.6.5 with native extensions
Fetching selenium-webdriver 4.8.1
Fetching activesupport 7.0.4.2
Installing activesupport 7.0.4.2
Fetching net-pop 0.1.2
Installing selenium-webdriver 4.8.1
Installing net-pop 0.1.2
Fetching net-smtp 0.3.3
Fetching irb 1.6.2
Installing net-smtp 0.3.3
Fetching bootsnap 1.16.0
Installing bootsnap 1.16.0 with native extensions
Installing irb 1.6.2
Fetching loofah 2.19.1
Fetching xpath 3.2.0
Installing loofah 2.19.1
Installing xpath 3.2.0
Fetching rails-dom-testing 2.0.3
Fetching globalid 1.1.0
Installing rails-dom-testing 2.0.3
Fetching activemodel 7.0.4.2
Installing globalid 1.1.0
Fetching debug 1.7.1
Fetching webdrivers 5.2.0
Installing activemodel 7.0.4.2
Fetching rails-html-sanitizer 1.5.0
Installing webdrivers 5.2.0
Fetching capybara 3.38.0
Installing debug 1.7.1 with native extensions
Installing rails-html-sanitizer 1.5.0
Fetching activejob 7.0.4.2
Installing activejob 7.0.4.2
Fetching activerecord 7.0.4.2
Fetching actionview 7.0.4.2
Installing capybara 3.38.0
Fetching net-imap 0.3.4
Installing actionview 7.0.4.2
Installing net-imap 0.3.4
Installing activerecord 7.0.4.2
Fetching mail 2.8.1
Fetching actionpack 7.0.4.2
Fetching jbuilder 2.11.5
Installing jbuilder 2.11.5
Installing actionpack 7.0.4.2
Installing mail 2.8.1
Fetching activestorage 7.0.4.2
Fetching railties 7.0.4.2
Fetching actioncable 7.0.4.2
Fetching sprockets-rails 3.4.2
Installing sprockets-rails 3.4.2
Installing actioncable 7.0.4.2
Installing activestorage 7.0.4.2
Fetching actionmailer 7.0.4.2
Installing railties 7.0.4.2
Fetching actionmailbox 7.0.4.2
Fetching actiontext 7.0.4.2
Fetching importmap-rails 1.1.5
Installing actionmailer 7.0.4.2
Fetching stimulus-rails 1.2.1
Installing actionmailbox 7.0.4.2
Fetching turbo-rails 1.3.3
Installing actiontext 7.0.4.2
Installing importmap-rails 1.1.5
Fetching web-console 4.2.0
Fetching rails 7.0.4.2
Installing stimulus-rails 1.2.1
Installing turbo-rails 1.3.3
Installing web-console 4.2.0
Installing rails 7.0.4.2
Bundle complete! 15 Gemfile dependencies, 72 gems now installed.
Bundled gems are installed into `./vendor`
Post-install message from rubyzip:
RubyZip 3.0 is coming!
**********************

The public API of some Rubyzip classes has been modernized to use named
parameters for optional arguments. Please check your usage of the
following classes:
  * `Zip::File`
  * `Zip::Entry`
  * `Zip::InputStream`
  * `Zip::OutputStream`

Please ensure that your Gemfiles and .gemspecs are suitably restrictive
to avoid an unexpected breakage when 3.0 is released (e.g. ~> 2.3.0).
See https://github.com/rubyzip/rubyzip for details. The Changelog also
lists other enhancements and bugfixes that have been implemented since
version 2.3.0.
```

- **Para entender por qué la opción `--path` puede no ser adecuada en versiones recientes de Bundler, puedes consultar el siguiente foro:**

- *[Why `bundle install` is installing gems in vendor/bundle](https://stackoverflow.com/questions/19961821/why-bundle-install-is-installing-gems-in-vendor-bundle "https://stackoverflow.com/questions/19961821/why-bundle-install-is-installing-gems-in-vendor-bundle")*

- ***Nota:** La opción `--path` ha sido marcada como obsoleta en versiones recientes de Bundler.*

---

### ***Verificación de Estructura del proyecto***

**Después de ejecutar el comando `bundle3.0 install --path ./vendor`, verifica el contenido del directorio `./` para confirmar que las gemas se han instalado correctamente:**

```bash
ls -lA .
```

```bash
ls -lA .
total 88
drwxr-xr-x  2 root root 4096 Sep  5 22:24 .bundle
drwxrwxr-x  8 1000 1000 4096 Feb 27  2023 .git
-rw-rw-r--  1 1000 1000  246 Feb 27  2023 .gitattributes
-rw-rw-r--  1 1000 1000  785 Feb 27  2023 .gitignore
-rw-rw-r--  1 1000 1000   11 Feb 27  2023 .ruby-version
-rw-rw-r--  1 1000 1000 2284 Feb 27  2023 Gemfile
-rw-rw-r--  1 1000 1000 5543 Feb 27  2023 Gemfile.lock
-rw-rw-r--  1 1000 1000  374 Feb 27  2023 README.md
-rw-rw-r--  1 1000 1000  227 Feb 27  2023 Rakefile
drwxrwxr-x 10 1000 1000 4096 Feb 27  2023 app
drwxrwxr-x  2 1000 1000 4096 Feb 27  2023 bin
drwxrwxr-x  5 1000 1000 4096 Feb 27  2023 config
-rw-rw-r--  1 1000 1000  160 Feb 27  2023 config.ru
drwxrwxr-x  2 1000 1000 4096 Feb 27  2023 db
drwxrwxr-x  4 1000 1000 4096 Feb 27  2023 lib
drwxrwxr-x  2 1000 1000 4096 Feb 27  2023 log
drwxrwxr-x  2 1000 1000 4096 Feb 27  2023 public
drwxrwxr-x  2 1000 1000 4096 Feb 27  2023 storage
drwxrwxr-x 10 1000 1000 4096 Feb 27  2023 test
drwxrwxr-x  4 1000 1000 4096 Feb 27  2023 tmp
drwxr-xr-x  3 root root 4096 Sep  5 22:24 vendor
```

**Comando para Instalar `tree` para una Visualización Más Clara:**

**Si prefieres una vista más clara de la estructura de directorios, puedes instalar el paquete `tree`:**

```bash
apt install -y tree
```

- **Luego, puedes usar `tree` para visualizar la estructura del directorio:**

```bash
tree -C .
```

**Resultado esperado:**

```bash
[01;34m.[0m
|-- [00mGemfile[0m
|-- [00mGemfile.lock[0m
|-- [00mREADME.md[0m
|-- [00mRakefile[0m
|-- [01;34mapp[0m
|   |-- [01;34massets[0m
|   |   |-- [01;34mconfig[0m
|   |   |   `-- [00mmanifest.js[0m
|   |   |-- [01;34mimages[0m
|   |   `-- [01;34mstylesheets[0m
|   |       `-- [00mapplication.css[0m
|   |-- [01;34mchannels[0m
|   |   `-- [01;34mapplication_cable[0m
|   |       |-- [00mchannel.rb[0m
|   |       `-- [00mconnection.rb[0m
|   |-- [01;34mcontrollers[0m
|   |   |-- [00mapplication_controller.rb[0m
|   |   |-- [01;34mconcerns[0m
|   |   `-- [00mhome_controller.rb[0m
|   |-- [01;34mhelpers[0m
|   |   |-- [00mapplication_helper.rb[0m
|   |   `-- [00mhome_helper.rb[0m
|   |-- [01;34mjobs[0m
|   |   `-- [00mapplication_job.rb[0m
|   |-- [01;34mmailers[0m
|   |   `-- [00mapplication_mailer.rb[0m
|   |-- [01;34mmodels[0m
|   |   |-- [00mapplication_record.rb[0m
|   |   `-- [01;34mconcerns[0m
|   `-- [01;34mviews[0m
|       |-- [01;34mhome[0m
|       |   `-- [00mindex.html.erb[0m
|       `-- [01;34mlayouts[0m
|           |-- [00mapplication.html.erb[0m
|           |-- [00mmailer.html.erb[0m
|           `-- [00mmailer.text.erb[0m
|-- [01;34mbin[0m
|   |-- [01;32mrails[0m
|   |-- [01;32mrake[0m
|   `-- [01;32msetup[0m
|-- [01;34mconfig[0m
|   |-- [00mapplication.rb[0m
|   |-- [00mboot.rb[0m
|   |-- [00mcable.yml[0m
|   |-- [00mcredentials.yml.enc[0m
|   |-- [00mdatabase.yml[0m
|   |-- [00menvironment.rb[0m
|   |-- [01;34menvironments[0m
|   |   |-- [00mdevelopment.rb[0m
|   |   |-- [00mproduction.rb[0m
|   |   `-- [00mtest.rb[0m
|   |-- [01;34minitializers[0m
|   |   |-- [00massets.rb[0m
|   |   |-- [00mcontent_security_policy.rb[0m
|   |   |-- [00mfilter_parameter_logging.rb[0m
|   |   |-- [00minflections.rb[0m
|   |   `-- [00mpermissions_policy.rb[0m
|   |-- [01;34mlocales[0m
|   |   `-- [00men.yml[0m
|   |-- [00mpuma.rb[0m
|   |-- [00mroutes.rb[0m
|   `-- [00mstorage.yml[0m
|-- [00mconfig.ru[0m
|-- [01;34mdb[0m
|   `-- [00mseeds.rb[0m
|-- [01;34mlib[0m
|   |-- [01;34massets[0m
|   `-- [01;34mtasks[0m
|-- [01;34mlog[0m
|-- [01;34mpublic[0m
|   |-- [00m404.html[0m
|   |-- [00m422.html[0m
|   |-- [00m500.html[0m
|   |-- [00mapple-touch-icon-precomposed.png[0m
|   |-- [00mapple-touch-icon.png[0m
|   |-- [00mfavicon.ico[0m
|   `-- [00mrobots.txt[0m
|-- [01;34mstorage[0m
|-- [01;34mtest[0m
|   |-- [00mapplication_system_test_case.rb[0m
|   |-- [01;34mchannels[0m
|   |   `-- [01;34mapplication_cable[0m
|   |       `-- [00mconnection_test.rb[0m
|   |-- [01;34mcontrollers[0m
|   |   `-- [00mhome_controller_test.rb[0m
|   |-- [01;34mfixtures[0m
|   |   `-- [01;34mfiles[0m
|   |-- [01;34mhelpers[0m
|   |-- [01;34mintegration[0m
|   |-- [01;34mmailers[0m
|   |-- [01;34mmodels[0m
|   |-- [01;34msystem[0m
|   `-- [00mtest_helper.rb[0m
|-- [01;34mtmp[0m
|   |-- [01;34mpids[0m
|   `-- [01;34mstorage[0m
`-- [01;34mvendor[0m
    `-- [01;34mruby[0m
        `-- [01;34m3.0.0[0m
            |-- [01;34mbin[0m
            |   |-- [01;32mbootsnap[0m
            |   |-- [01;32mirb[0m
            |   |-- [01;32mnokogiri[0m
            |   |-- [01;32mpuma[0m
            |   |-- [01;32mpumactl[0m
            |   |-- [01;32mracc[0m
            |   |-- [01;32mrackup[0m
            |   |-- [01;32mrails[0m
            |   |-- [01;32mrake[0m
            |   |-- [01;32mrdbg[0m
            |   |-- [01;32msprockets[0m
            |   `-- [01;32mthor[0m
            |-- [01;34mbuild_info[0m
            |-- [01;34mcache[0m
            |   |-- [00mactioncable-7.0.4.2.gem[0m
            |   |-- [00mactionmailbox-7.0.4.2.gem[0m
            |   |-- [00mactionmailer-7.0.4.2.gem[0m
            |   |-- [00mactionpack-7.0.4.2.gem[0m
            |   |-- [00mactiontext-7.0.4.2.gem[0m
            |   |-- [00mactionview-7.0.4.2.gem[0m
            |   |-- [00mactivejob-7.0.4.2.gem[0m
            |   |-- [00mactivemodel-7.0.4.2.gem[0m
            |   |-- [00mactiverecord-7.0.4.2.gem[0m
            |   |-- [00mactivestorage-7.0.4.2.gem[0m
            |   |-- [00mactivesupport-7.0.4.2.gem[0m
            |   |-- [00maddressable-2.8.1.gem[0m
            |   |-- [00mbindex-0.8.1.gem[0m
            |   |-- [00mbootsnap-1.16.0.gem[0m
            |   |-- [00mbuilder-3.2.4.gem[0m
            |   |-- [00mcapybara-3.38.0.gem[0m
            |   |-- [00mconcurrent-ruby-1.2.2.gem[0m
            |   |-- [00mcrass-1.0.6.gem[0m
            |   |-- [00mdate-3.3.3.gem[0m
            |   |-- [00mdebug-1.7.1.gem[0m
            |   |-- [00merubi-1.12.0.gem[0m
            |   |-- [00mglobalid-1.1.0.gem[0m
            |   |-- [00mi18n-1.12.0.gem[0m
            |   |-- [00mimportmap-rails-1.1.5.gem[0m
            |   |-- [00mio-console-0.6.0.gem[0m
            |   |-- [00mirb-1.6.2.gem[0m
            |   |-- [00mjbuilder-2.11.5.gem[0m
            |   |-- [00mloofah-2.19.1.gem[0m
            |   |-- [00mmail-2.8.1.gem[0m
            |   |-- [00mmarcel-1.0.2.gem[0m
            |   |-- [00mmatrix-0.4.2.gem[0m
            |   |-- [00mmethod_source-1.0.0.gem[0m
            |   |-- [00mmini_mime-1.1.2.gem[0m
            |   |-- [00mminitest-5.17.0.gem[0m
            |   |-- [00mmsgpack-1.6.0.gem[0m
            |   |-- [00mnet-imap-0.3.4.gem[0m
            |   |-- [00mnet-pop-0.1.2.gem[0m
            |   |-- [00mnet-protocol-0.2.1.gem[0m
            |   |-- [00mnet-smtp-0.3.3.gem[0m
            |   |-- [00mnio4r-2.5.8.gem[0m
            |   |-- [00mnokogiri-1.14.2-x86_64-linux.gem[0m
            |   |-- [00mpublic_suffix-5.0.1.gem[0m
            |   |-- [00mpuma-5.6.5.gem[0m
            |   |-- [00mracc-1.6.2.gem[0m
            |   |-- [00mrack-2.2.6.2.gem[0m
            |   |-- [00mrack-test-2.0.2.gem[0m
            |   |-- [00mrails-7.0.4.2.gem[0m
            |   |-- [00mrails-dom-testing-2.0.3.gem[0m
            |   |-- [00mrails-html-sanitizer-1.5.0.gem[0m
            |   |-- [00mrailties-7.0.4.2.gem[0m
            |   |-- [00mrake-13.0.6.gem[0m
            |   |-- [00mregexp_parser-2.7.0.gem[0m
            |   |-- [00mreline-0.3.2.gem[0m
            |   |-- [00mrexml-3.2.5.gem[0m
            |   |-- [00mrubyzip-2.3.2.gem[0m
            |   |-- [00mselenium-webdriver-4.8.1.gem[0m
            |   |-- [00msprockets-4.2.0.gem[0m
            |   |-- [00msprockets-rails-3.4.2.gem[0m
            |   |-- [00msqlite3-1.6.1-x86_64-linux.gem[0m
            |   |-- [00mstimulus-rails-1.2.1.gem[0m
            |   |-- [00mthor-1.2.1.gem[0m
            |   |-- [00mtimeout-0.3.2.gem[0m
            |   |-- [00mturbo-rails-1.3.3.gem[0m
            |   |-- [00mtzinfo-2.0.6.gem[0m
            |   |-- [00mweb-console-4.2.0.gem[0m
            |   |-- [00mwebdrivers-5.2.0.gem[0m
            |   |-- [00mwebsocket-1.2.9.gem[0m
            |   |-- [00mwebsocket-driver-0.7.5.gem[0m
            |   |-- [00mwebsocket-extensions-0.1.5.gem[0m
            |   |-- [00mxpath-3.2.0.gem[0m
            |   `-- [00mzeitwerk-2.6.7.gem[0m
            |-- [01;34mdoc[0m
            |-- [01;34mextensions[0m
            |   `-- [01;34mx86_64-linux[0m
            |       `-- [01;34m3.0.0[0m
            |           |-- [01;34mbindex-0.8.1[0m
            |           |   |-- [00mgem.build_complete[0m
            |           |   |-- [00mgem_make.out[0m
            |           |   `-- [01;34mskiptrace[0m
            |           |       `-- [01;34minternal[0m
            |           |           `-- [01;32mcruby.so[0m
            |           |-- [01;34mbootsnap-1.16.0[0m
            |           |   |-- [01;34mbootsnap[0m
            |           |   |   `-- [01;32mbootsnap.so[0m
            |           |   |-- [00mgem.build_complete[0m
            |           |   `-- [00mgem_make.out[0m
            |           |-- [01;34mdate-3.3.3[0m
            |           |   |-- [01;32mdate_core.so[0m
            |           |   |-- [00mgem.build_complete[0m
            |           |   |-- [00mgem_make.out[0m
            |           |   `-- [00mmkmf.log[0m
            |           |-- [01;34mdebug-1.7.1[0m
            |           |   |-- [01;34mdebug[0m
            |           |   |   `-- [01;32mdebug.so[0m
            |           |   |-- [00mgem.build_complete[0m
            |           |   `-- [00mgem_make.out[0m
            |           |-- [01;34mio-console-0.6.0[0m
            |           |   |-- [00mgem.build_complete[0m
            |           |   |-- [00mgem_make.out[0m
            |           |   |-- [01;34mio[0m
            |           |   |   `-- [01;32mconsole.so[0m
            |           |   `-- [00mmkmf.log[0m
            |           |-- [01;34mmsgpack-1.6.0[0m
            |           |   |-- [00mgem.build_complete[0m
            |           |   |-- [00mgem_make.out[0m
            |           |   |-- [00mmkmf.log[0m
            |           |   `-- [01;34mmsgpack[0m
            |           |       `-- [01;32mmsgpack.so[0m
            |           |-- [01;34mnio4r-2.5.8[0m
            |           |   |-- [00mgem.build_complete[0m
            |           |   |-- [00mgem_make.out[0m
            |           |   |-- [00mmkmf.log[0m
            |           |   `-- [01;32mnio4r_ext.so[0m
            |           |-- [01;34mpuma-5.6.5[0m
            |           |   |-- [00mgem.build_complete[0m
            |           |   |-- [00mgem_make.out[0m
            |           |   |-- [00mmkmf.log[0m
            |           |   `-- [01;34mpuma[0m
            |           |       `-- [01;32mpuma_http11.so[0m
            |           |-- [01;34mracc-1.6.2[0m
            |           |   |-- [00mgem.build_complete[0m
            |           |   |-- [00mgem_make.out[0m
            |           |   |-- [00mmkmf.log[0m
            |           |   `-- [01;34mracc[0m
            |           |       `-- [01;32mcparse.so[0m
            |           `-- [01;34mwebsocket-driver-0.7.5[0m
            |               |-- [00mgem.build_complete[0m
            |               |-- [00mgem_make.out[0m
            |               `-- [01;32mwebsocket_mask.so[0m
            |-- [01;34mgems[0m
            |   |-- [01;34mactioncable-7.0.4.2[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [01;34mapp[0m
            |   |   |   `-- [01;34massets[0m
            |   |   |       `-- [01;34mjavascripts[0m
            |   |   |           |-- [00maction_cable.js[0m
            |   |   |           |-- [00mactioncable.esm.js[0m
            |   |   |           `-- [00mactioncable.js[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34maction_cable[0m
            |   |       |   |-- [01;34mchannel[0m
            |   |       |   |   |-- [00mbase.rb[0m
            |   |       |   |   |-- [00mbroadcasting.rb[0m
            |   |       |   |   |-- [00mcallbacks.rb[0m
            |   |       |   |   |-- [00mnaming.rb[0m
            |   |       |   |   |-- [00mperiodic_timers.rb[0m
            |   |       |   |   |-- [00mstreams.rb[0m
            |   |       |   |   `-- [00mtest_case.rb[0m
            |   |       |   |-- [00mchannel.rb[0m
            |   |       |   |-- [01;34mconnection[0m
            |   |       |   |   |-- [00mauthorization.rb[0m
            |   |       |   |   |-- [00mbase.rb[0m
            |   |       |   |   |-- [00mclient_socket.rb[0m
            |   |       |   |   |-- [00midentification.rb[0m
            |   |       |   |   |-- [00minternal_channel.rb[0m
            |   |       |   |   |-- [00mmessage_buffer.rb[0m
            |   |       |   |   |-- [00mstream.rb[0m
            |   |       |   |   |-- [00mstream_event_loop.rb[0m
            |   |       |   |   |-- [00msubscriptions.rb[0m
            |   |       |   |   |-- [00mtagged_logger_proxy.rb[0m
            |   |       |   |   |-- [00mtest_case.rb[0m
            |   |       |   |   `-- [00mweb_socket.rb[0m
            |   |       |   |-- [00mconnection.rb[0m
            |   |       |   |-- [00mengine.rb[0m
            |   |       |   |-- [00mgem_version.rb[0m
            |   |       |   |-- [01;34mhelpers[0m
            |   |       |   |   `-- [00maction_cable_helper.rb[0m
            |   |       |   |-- [00mremote_connections.rb[0m
            |   |       |   |-- [01;34mserver[0m
            |   |       |   |   |-- [00mbase.rb[0m
            |   |       |   |   |-- [00mbroadcasting.rb[0m
            |   |       |   |   |-- [00mconfiguration.rb[0m
            |   |       |   |   |-- [00mconnections.rb[0m
            |   |       |   |   |-- [01;34mworker[0m
            |   |       |   |   |   `-- [00mactive_record_connection_management.rb[0m
            |   |       |   |   `-- [00mworker.rb[0m
            |   |       |   |-- [00mserver.rb[0m
            |   |       |   |-- [01;34msubscription_adapter[0m
            |   |       |   |   |-- [00masync.rb[0m
            |   |       |   |   |-- [00mbase.rb[0m
            |   |       |   |   |-- [00mchannel_prefix.rb[0m
            |   |       |   |   |-- [00minline.rb[0m
            |   |       |   |   |-- [00mpostgresql.rb[0m
            |   |       |   |   |-- [00mredis.rb[0m
            |   |       |   |   |-- [00msubscriber_map.rb[0m
            |   |       |   |   `-- [00mtest.rb[0m
            |   |       |   |-- [00msubscription_adapter.rb[0m
            |   |       |   |-- [00mtest_case.rb[0m
            |   |       |   |-- [00mtest_helper.rb[0m
            |   |       |   `-- [00mversion.rb[0m
            |   |       |-- [00maction_cable.rb[0m
            |   |       `-- [01;34mrails[0m
            |   |           `-- [01;34mgenerators[0m
            |   |               |-- [01;34mchannel[0m
            |   |               |   |-- [00mUSAGE[0m
            |   |               |   |-- [00mchannel_generator.rb[0m
            |   |               |   `-- [01;34mtemplates[0m
            |   |               |       |-- [01;34mapplication_cable[0m
            |   |               |       |   |-- [00mchannel.rb[0m
            |   |               |       |   `-- [00mconnection.rb[0m
            |   |               |       |-- [00mchannel.rb.tt[0m
            |   |               |       `-- [01;34mjavascript[0m
            |   |               |           |-- [00mchannel.js.tt[0m
            |   |               |           |-- [00mconsumer.js.tt[0m
            |   |               |           `-- [00mindex.js.tt[0m
            |   |               `-- [01;34mtest_unit[0m
            |   |                   |-- [00mchannel_generator.rb[0m
            |   |                   `-- [01;34mtemplates[0m
            |   |                       `-- [00mchannel_test.rb.tt[0m
            |   |-- [01;34mactionmailbox-7.0.4.2[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [01;34mapp[0m
            |   |   |   |-- [01;34mcontrollers[0m
            |   |   |   |   |-- [01;34maction_mailbox[0m
            |   |   |   |   |   |-- [00mbase_controller.rb[0m
            |   |   |   |   |   `-- [01;34mingresses[0m
            |   |   |   |   |       |-- [01;34mmailgun[0m
            |   |   |   |   |       |   `-- [00minbound_emails_controller.rb[0m
            |   |   |   |   |       |-- [01;34mmandrill[0m
            |   |   |   |   |       |   `-- [00minbound_emails_controller.rb[0m
            |   |   |   |   |       |-- [01;34mpostmark[0m
            |   |   |   |   |       |   `-- [00minbound_emails_controller.rb[0m
            |   |   |   |   |       |-- [01;34mrelay[0m
            |   |   |   |   |       |   `-- [00minbound_emails_controller.rb[0m
            |   |   |   |   |       `-- [01;34msendgrid[0m
            |   |   |   |   |           `-- [00minbound_emails_controller.rb[0m
            |   |   |   |   `-- [01;34mrails[0m
            |   |   |   |       `-- [01;34mconductor[0m
            |   |   |   |           |-- [01;34maction_mailbox[0m
            |   |   |   |           |   |-- [01;34minbound_emails[0m
            |   |   |   |           |   |   `-- [00msources_controller.rb[0m
            |   |   |   |           |   |-- [00minbound_emails_controller.rb[0m
            |   |   |   |           |   |-- [00mincinerates_controller.rb[0m
            |   |   |   |           |   `-- [00mreroutes_controller.rb[0m
            |   |   |   |           `-- [00mbase_controller.rb[0m
            |   |   |   |-- [01;34mjobs[0m
            |   |   |   |   `-- [01;34maction_mailbox[0m
            |   |   |   |       |-- [00mincineration_job.rb[0m
            |   |   |   |       `-- [00mrouting_job.rb[0m
            |   |   |   |-- [01;34mmodels[0m
            |   |   |   |   `-- [01;34maction_mailbox[0m
            |   |   |   |       |-- [01;34minbound_email[0m
            |   |   |   |       |   |-- [01;34mincineratable[0m
            |   |   |   |       |   |   `-- [00mincineration.rb[0m
            |   |   |   |       |   |-- [00mincineratable.rb[0m
            |   |   |   |       |   |-- [00mmessage_id.rb[0m
            |   |   |   |       |   `-- [00mroutable.rb[0m
            |   |   |   |       |-- [00minbound_email.rb[0m
            |   |   |   |       `-- [00mrecord.rb[0m
            |   |   |   `-- [01;34mviews[0m
            |   |   |       |-- [01;34mlayouts[0m
            |   |   |       |   `-- [01;34mrails[0m
            |   |   |       |       `-- [00mconductor.html.erb[0m
            |   |   |       `-- [01;34mrails[0m
            |   |   |           `-- [01;34mconductor[0m
            |   |   |               `-- [01;34maction_mailbox[0m
            |   |   |                   `-- [01;34minbound_emails[0m
            |   |   |                       |-- [00mindex.html.erb[0m
            |   |   |                       |-- [00mnew.html.erb[0m
            |   |   |                       |-- [00mshow.html.erb[0m
            |   |   |                       `-- [01;34msources[0m
            |   |   |                           `-- [00mnew.html.erb[0m
            |   |   |-- [01;34mconfig[0m
            |   |   |   `-- [00mroutes.rb[0m
            |   |   |-- [01;34mdb[0m
            |   |   |   `-- [01;34mmigrate[0m
            |   |   |       `-- [00m20180917164000_create_action_mailbox_tables.rb[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34maction_mailbox[0m
            |   |       |   |-- [00mbase.rb[0m
            |   |       |   |-- [00mcallbacks.rb[0m
            |   |       |   |-- [00mengine.rb[0m
            |   |       |   |-- [00mgem_version.rb[0m
            |   |       |   |-- [01;34mmail_ext[0m
            |   |       |   |   |-- [00maddress_equality.rb[0m
            |   |       |   |   |-- [00maddress_wrapping.rb[0m
            |   |       |   |   |-- [00maddresses.rb[0m
            |   |       |   |   |-- [00mfrom_source.rb[0m
            |   |       |   |   `-- [00mrecipients.rb[0m
            |   |       |   |-- [00mmail_ext.rb[0m
            |   |       |   |-- [00mrelayer.rb[0m
            |   |       |   |-- [01;34mrouter[0m
            |   |       |   |   `-- [00mroute.rb[0m
            |   |       |   |-- [00mrouter.rb[0m
            |   |       |   |-- [00mrouting.rb[0m
            |   |       |   |-- [00mtest_case.rb[0m
            |   |       |   |-- [00mtest_helper.rb[0m
            |   |       |   `-- [00mversion.rb[0m
            |   |       |-- [00maction_mailbox.rb[0m
            |   |       |-- [01;34mgenerators[0m
            |   |       |   `-- [01;34maction_mailbox[0m
            |   |       |       `-- [01;34minstall[0m
            |   |       |           `-- [00minstall_generator.rb[0m
            |   |       |-- [01;34mrails[0m
            |   |       |   `-- [01;34mgenerators[0m
            |   |       |       |-- [01;34mmailbox[0m
            |   |       |       |   |-- [00mUSAGE[0m
            |   |       |       |   |-- [00mmailbox_generator.rb[0m
            |   |       |       |   `-- [01;34mtemplates[0m
            |   |       |       |       |-- [00mapplication_mailbox.rb.tt[0m
            |   |       |       |       `-- [00mmailbox.rb.tt[0m
            |   |       |       `-- [01;34mtest_unit[0m
            |   |       |           |-- [00mmailbox_generator.rb[0m
            |   |       |           `-- [01;34mtemplates[0m
            |   |       |               `-- [00mmailbox_test.rb.tt[0m
            |   |       `-- [01;34mtasks[0m
            |   |           |-- [00mingress.rake[0m
            |   |           `-- [00minstall.rake[0m
            |   |-- [01;34mactionmailer-7.0.4.2[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.rdoc[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34maction_mailer[0m
            |   |       |   |-- [00mbase.rb[0m
            |   |       |   |-- [00mcollector.rb[0m
            |   |       |   |-- [00mdelivery_methods.rb[0m
            |   |       |   |-- [00mgem_version.rb[0m
            |   |       |   |-- [00minline_preview_interceptor.rb[0m
            |   |       |   |-- [00mlog_subscriber.rb[0m
            |   |       |   |-- [00mmail_delivery_job.rb[0m
            |   |       |   |-- [00mmail_helper.rb[0m
            |   |       |   |-- [00mmessage_delivery.rb[0m
            |   |       |   |-- [00mparameterized.rb[0m
            |   |       |   |-- [00mpreview.rb[0m
            |   |       |   |-- [00mrailtie.rb[0m
            |   |       |   |-- [00mrescuable.rb[0m
            |   |       |   |-- [00mtest_case.rb[0m
            |   |       |   |-- [00mtest_helper.rb[0m
            |   |       |   `-- [00mversion.rb[0m
            |   |       |-- [00maction_mailer.rb[0m
            |   |       `-- [01;34mrails[0m
            |   |           `-- [01;34mgenerators[0m
            |   |               `-- [01;34mmailer[0m
            |   |                   |-- [00mUSAGE[0m
            |   |                   |-- [00mmailer_generator.rb[0m
            |   |                   `-- [01;34mtemplates[0m
            |   |                       |-- [00mapplication_mailer.rb.tt[0m
            |   |                       `-- [00mmailer.rb.tt[0m
            |   |-- [01;34mactionpack-7.0.4.2[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.rdoc[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34mabstract_controller[0m
            |   |       |   |-- [00masset_paths.rb[0m
            |   |       |   |-- [00mbase.rb[0m
            |   |       |   |-- [01;34mcaching[0m
            |   |       |   |   `-- [00mfragments.rb[0m
            |   |       |   |-- [00mcaching.rb[0m
            |   |       |   |-- [00mcallbacks.rb[0m
            |   |       |   |-- [00mcollector.rb[0m
            |   |       |   |-- [00merror.rb[0m
            |   |       |   |-- [00mhelpers.rb[0m
            |   |       |   |-- [00mlogger.rb[0m
            |   |       |   |-- [01;34mrailties[0m
            |   |       |   |   `-- [00mroutes_helpers.rb[0m
            |   |       |   |-- [00mrendering.rb[0m
            |   |       |   |-- [00mtranslation.rb[0m
            |   |       |   `-- [00murl_for.rb[0m
            |   |       |-- [00mabstract_controller.rb[0m
            |   |       |-- [01;34maction_controller[0m
            |   |       |   |-- [01;34mapi[0m
            |   |       |   |   `-- [00mapi_rendering.rb[0m
            |   |       |   |-- [00mapi.rb[0m
            |   |       |   |-- [00mbase.rb[0m
            |   |       |   |-- [00mcaching.rb[0m
            |   |       |   |-- [00mform_builder.rb[0m
            |   |       |   |-- [00mlog_subscriber.rb[0m
            |   |       |   |-- [01;34mmetal[0m
            |   |       |   |   |-- [00mbasic_implicit_render.rb[0m
            |   |       |   |   |-- [00mconditional_get.rb[0m
            |   |       |   |   |-- [00mcontent_security_policy.rb[0m
            |   |       |   |   |-- [00mcookies.rb[0m
            |   |       |   |   |-- [00mdata_streaming.rb[0m
            |   |       |   |   |-- [00mdefault_headers.rb[0m
            |   |       |   |   |-- [00metag_with_flash.rb[0m
            |   |       |   |   |-- [00metag_with_template_digest.rb[0m
            |   |       |   |   |-- [00mexceptions.rb[0m
            |   |       |   |   |-- [00mflash.rb[0m
            |   |       |   |   |-- [00mhead.rb[0m
            |   |       |   |   |-- [00mhelpers.rb[0m
            |   |       |   |   |-- [00mhttp_authentication.rb[0m
            |   |       |   |   |-- [00mimplicit_render.rb[0m
            |   |       |   |   |-- [00minstrumentation.rb[0m
            |   |       |   |   |-- [00mlive.rb[0m
            |   |       |   |   |-- [00mlogging.rb[0m
            |   |       |   |   |-- [00mmime_responds.rb[0m
            |   |       |   |   |-- [00mparameter_encoding.rb[0m
            |   |       |   |   |-- [00mparams_wrapper.rb[0m
            |   |       |   |   |-- [00mpermissions_policy.rb[0m
            |   |       |   |   |-- [00mredirecting.rb[0m
            |   |       |   |   |-- [00mrenderers.rb[0m
            |   |       |   |   |-- [00mrendering.rb[0m
            |   |       |   |   |-- [00mrequest_forgery_protection.rb[0m
            |   |       |   |   |-- [00mrescue.rb[0m
            |   |       |   |   |-- [00mstreaming.rb[0m
            |   |       |   |   |-- [00mstrong_parameters.rb[0m
            |   |       |   |   |-- [00mtesting.rb[0m
            |   |       |   |   `-- [00murl_for.rb[0m
            |   |       |   |-- [00mmetal.rb[0m
            |   |       |   |-- [00mrailtie.rb[0m
            |   |       |   |-- [01;34mrailties[0m
            |   |       |   |   `-- [00mhelpers.rb[0m
            |   |       |   |-- [00mrenderer.rb[0m
            |   |       |   |-- [00mtemplate_assertions.rb[0m
            |   |       |   `-- [00mtest_case.rb[0m
            |   |       |-- [00maction_controller.rb[0m
            |   |       |-- [01;34maction_dispatch[0m
            |   |       |   |-- [01;34mhttp[0m
            |   |       |   |   |-- [00mcache.rb[0m
            |   |       |   |   |-- [00mcontent_disposition.rb[0m
            |   |       |   |   |-- [00mcontent_security_policy.rb[0m
            |   |       |   |   |-- [00mfilter_parameters.rb[0m
            |   |       |   |   |-- [00mfilter_redirect.rb[0m
            |   |       |   |   |-- [00mheaders.rb[0m
            |   |       |   |   |-- [00mmime_negotiation.rb[0m
            |   |       |   |   |-- [00mmime_type.rb[0m
            |   |       |   |   |-- [00mmime_types.rb[0m
            |   |       |   |   |-- [00mparameters.rb[0m
            |   |       |   |   |-- [00mpermissions_policy.rb[0m
            |   |       |   |   |-- [00mrack_cache.rb[0m
            |   |       |   |   |-- [00mrequest.rb[0m
            |   |       |   |   |-- [00mresponse.rb[0m
            |   |       |   |   |-- [00mupload.rb[0m
            |   |       |   |   `-- [00murl.rb[0m
            |   |       |   |-- [01;34mjourney[0m
            |   |       |   |   |-- [00mformatter.rb[0m
            |   |       |   |   |-- [01;34mgtg[0m
            |   |       |   |   |   |-- [00mbuilder.rb[0m
            |   |       |   |   |   |-- [00msimulator.rb[0m
            |   |       |   |   |   `-- [00mtransition_table.rb[0m
            |   |       |   |   |-- [01;34mnfa[0m
            |   |       |   |   |   `-- [00mdot.rb[0m
            |   |       |   |   |-- [01;34mnodes[0m
            |   |       |   |   |   `-- [00mnode.rb[0m
            |   |       |   |   |-- [00mparser.rb[0m
            |   |       |   |   |-- [00mparser.y[0m
            |   |       |   |   |-- [00mparser_extras.rb[0m
            |   |       |   |   |-- [01;34mpath[0m
            |   |       |   |   |   `-- [00mpattern.rb[0m
            |   |       |   |   |-- [00mroute.rb[0m
            |   |       |   |   |-- [01;34mrouter[0m
            |   |       |   |   |   `-- [00mutils.rb[0m
            |   |       |   |   |-- [00mrouter.rb[0m
            |   |       |   |   |-- [00mroutes.rb[0m
            |   |       |   |   |-- [00mscanner.rb[0m
            |   |       |   |   |-- [00mvisitors.rb[0m
            |   |       |   |   `-- [01;34mvisualizer[0m
            |   |       |   |       |-- [00mfsm.css[0m
            |   |       |   |       |-- [00mfsm.js[0m
            |   |       |   |       `-- [00mindex.html.erb[0m
            |   |       |   |-- [00mjourney.rb[0m
            |   |       |   |-- [01;34mmiddleware[0m
            |   |       |   |   |-- [00mactionable_exceptions.rb[0m
            |   |       |   |   |-- [00mcallbacks.rb[0m
            |   |       |   |   |-- [00mcookies.rb[0m
            |   |       |   |   |-- [00mdebug_exceptions.rb[0m
            |   |       |   |   |-- [00mdebug_locks.rb[0m
            |   |       |   |   |-- [00mdebug_view.rb[0m
            |   |       |   |   |-- [00mexception_wrapper.rb[0m
            |   |       |   |   |-- [00mexecutor.rb[0m
            |   |       |   |   |-- [00mflash.rb[0m
            |   |       |   |   |-- [00mhost_authorization.rb[0m
            |   |       |   |   |-- [00mpublic_exceptions.rb[0m
            |   |       |   |   |-- [00mreloader.rb[0m
            |   |       |   |   |-- [00mremote_ip.rb[0m
            |   |       |   |   |-- [00mrequest_id.rb[0m
            |   |       |   |   |-- [00mserver_timing.rb[0m
            |   |       |   |   |-- [01;34msession[0m
            |   |       |   |   |   |-- [00mabstract_store.rb[0m
            |   |       |   |   |   |-- [00mcache_store.rb[0m
            |   |       |   |   |   |-- [00mcookie_store.rb[0m
            |   |       |   |   |   `-- [00mmem_cache_store.rb[0m
            |   |       |   |   |-- [00mshow_exceptions.rb[0m
            |   |       |   |   |-- [00mssl.rb[0m
            |   |       |   |   |-- [00mstack.rb[0m
            |   |       |   |   |-- [00mstatic.rb[0m
            |   |       |   |   `-- [01;34mtemplates[0m
            |   |       |   |       |-- [01;34mrescues[0m
            |   |       |   |       |   |-- [00m_actions.html.erb[0m
            |   |       |   |       |   |-- [00m_actions.text.erb[0m
            |   |       |   |       |   |-- [00m_message_and_suggestions.html.erb[0m
            |   |       |   |       |   |-- [00m_request_and_response.html.erb[0m
            |   |       |   |       |   |-- [00m_request_and_response.text.erb[0m
            |   |       |   |       |   |-- [00m_source.html.erb[0m
            |   |       |   |       |   |-- [00m_source.text.erb[0m
            |   |       |   |       |   |-- [00m_trace.html.erb[0m
            |   |       |   |       |   |-- [00m_trace.text.erb[0m
            |   |       |   |       |   |-- [00mblocked_host.html.erb[0m
            |   |       |   |       |   |-- [00mblocked_host.text.erb[0m
            |   |       |   |       |   |-- [00mdiagnostics.html.erb[0m
            |   |       |   |       |   |-- [00mdiagnostics.text.erb[0m
            |   |       |   |       |   |-- [00minvalid_statement.html.erb[0m
            |   |       |   |       |   |-- [00minvalid_statement.text.erb[0m
            |   |       |   |       |   |-- [00mlayout.erb[0m
            |   |       |   |       |   |-- [00mmissing_exact_template.html.erb[0m
            |   |       |   |       |   |-- [00mmissing_exact_template.text.erb[0m
            |   |       |   |       |   |-- [00mmissing_template.html.erb[0m
            |   |       |   |       |   |-- [00mmissing_template.text.erb[0m
            |   |       |   |       |   |-- [00mrouting_error.html.erb[0m
            |   |       |   |       |   |-- [00mrouting_error.text.erb[0m
            |   |       |   |       |   |-- [00mtemplate_error.html.erb[0m
            |   |       |   |       |   |-- [00mtemplate_error.text.erb[0m
            |   |       |   |       |   |-- [00munknown_action.html.erb[0m
            |   |       |   |       |   `-- [00munknown_action.text.erb[0m
            |   |       |   |       `-- [01;34mroutes[0m
            |   |       |   |           |-- [00m_route.html.erb[0m
            |   |       |   |           `-- [00m_table.html.erb[0m
            |   |       |   |-- [00mrailtie.rb[0m
            |   |       |   |-- [01;34mrequest[0m
            |   |       |   |   |-- [00msession.rb[0m
            |   |       |   |   `-- [00mutils.rb[0m
            |   |       |   |-- [01;34mrouting[0m
            |   |       |   |   |-- [00mendpoint.rb[0m
            |   |       |   |   |-- [00minspector.rb[0m
            |   |       |   |   |-- [00mmapper.rb[0m
            |   |       |   |   |-- [00mpolymorphic_routes.rb[0m
            |   |       |   |   |-- [00mredirection.rb[0m
            |   |       |   |   |-- [00mroute_set.rb[0m
            |   |       |   |   |-- [00mroutes_proxy.rb[0m
            |   |       |   |   `-- [00murl_for.rb[0m
            |   |       |   |-- [00mrouting.rb[0m
            |   |       |   |-- [00msystem_test_case.rb[0m
            |   |       |   |-- [01;34msystem_testing[0m
            |   |       |   |   |-- [00mbrowser.rb[0m
            |   |       |   |   |-- [00mdriver.rb[0m
            |   |       |   |   |-- [00mserver.rb[0m
            |   |       |   |   `-- [01;34mtest_helpers[0m
            |   |       |   |       |-- [00mscreenshot_helper.rb[0m
            |   |       |   |       `-- [00msetup_and_teardown.rb[0m
            |   |       |   `-- [01;34mtesting[0m
            |   |       |       |-- [00massertion_response.rb[0m
            |   |       |       |-- [01;34massertions[0m
            |   |       |       |   |-- [00mresponse.rb[0m
            |   |       |       |   `-- [00mrouting.rb[0m
            |   |       |       |-- [00massertions.rb[0m
            |   |       |       |-- [00mintegration.rb[0m
            |   |       |       |-- [00mrequest_encoder.rb[0m
            |   |       |       |-- [00mtest_process.rb[0m
            |   |       |       |-- [00mtest_request.rb[0m
            |   |       |       `-- [00mtest_response.rb[0m
            |   |       |-- [00maction_dispatch.rb[0m
            |   |       |-- [01;34maction_pack[0m
            |   |       |   |-- [00mgem_version.rb[0m
            |   |       |   `-- [00mversion.rb[0m
            |   |       `-- [00maction_pack.rb[0m
            |   |-- [01;34mactiontext-7.0.4.2[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [01;34mapp[0m
            |   |   |   |-- [01;34massets[0m
            |   |   |   |   |-- [01;34mjavascripts[0m
            |   |   |   |   |   |-- [00mactiontext.js[0m
            |   |   |   |   |   `-- [00mtrix.js[0m
            |   |   |   |   `-- [01;34mstylesheets[0m
            |   |   |   |       `-- [00mtrix.css[0m
            |   |   |   |-- [01;34mhelpers[0m
            |   |   |   |   `-- [01;34maction_text[0m
            |   |   |   |       |-- [00mcontent_helper.rb[0m
            |   |   |   |       `-- [00mtag_helper.rb[0m
            |   |   |   |-- [01;34mjavascript[0m
            |   |   |   |   `-- [01;34mactiontext[0m
            |   |   |   |       |-- [00mattachment_upload.js[0m
            |   |   |   |       `-- [00mindex.js[0m
            |   |   |   |-- [01;34mmodels[0m
            |   |   |   |   `-- [01;34maction_text[0m
            |   |   |   |       |-- [00mencrypted_rich_text.rb[0m
            |   |   |   |       |-- [00mrecord.rb[0m
            |   |   |   |       `-- [00mrich_text.rb[0m
            |   |   |   `-- [01;34mviews[0m
            |   |   |       |-- [01;34maction_text[0m
            |   |   |       |   |-- [01;34mattachables[0m
            |   |   |       |   |   |-- [00m_missing_attachable.html.erb[0m
            |   |   |       |   |   `-- [00m_remote_image.html.erb[0m
            |   |   |       |   |-- [01;34mattachment_galleries[0m
            |   |   |       |   |   `-- [00m_attachment_gallery.html.erb[0m
            |   |   |       |   `-- [01;34mcontents[0m
            |   |   |       |       `-- [00m_content.html.erb[0m
            |   |   |       |-- [01;34mactive_storage[0m
            |   |   |       |   `-- [01;34mblobs[0m
            |   |   |       |       `-- [00m_blob.html.erb[0m
            |   |   |       `-- [01;34mlayouts[0m
            |   |   |           `-- [01;34maction_text[0m
            |   |   |               `-- [01;34mcontents[0m
            |   |   |                   `-- [00m_content.html.erb[0m
            |   |   |-- [01;34mdb[0m
            |   |   |   `-- [01;34mmigrate[0m
            |   |   |       `-- [00m20180528164100_create_action_text_tables.rb[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34maction_text[0m
            |   |   |   |   |-- [00mattachable.rb[0m
            |   |   |   |   |-- [01;34mattachables[0m
            |   |   |   |   |   |-- [00mcontent_attachment.rb[0m
            |   |   |   |   |   |-- [00mmissing_attachable.rb[0m
            |   |   |   |   |   `-- [00mremote_image.rb[0m
            |   |   |   |   |-- [00mattachment.rb[0m
            |   |   |   |   |-- [00mattachment_gallery.rb[0m
            |   |   |   |   |-- [01;34mattachments[0m
            |   |   |   |   |   |-- [00mcaching.rb[0m
            |   |   |   |   |   |-- [00mminification.rb[0m
            |   |   |   |   |   `-- [00mtrix_conversion.rb[0m
            |   |   |   |   |-- [00mattribute.rb[0m
            |   |   |   |   |-- [00mcontent.rb[0m
            |   |   |   |   |-- [00mencryption.rb[0m
            |   |   |   |   |-- [00mengine.rb[0m
            |   |   |   |   |-- [00mfixture_set.rb[0m
            |   |   |   |   |-- [00mfragment.rb[0m
            |   |   |   |   |-- [00mgem_version.rb[0m
            |   |   |   |   |-- [00mhtml_conversion.rb[0m
            |   |   |   |   |-- [00mplain_text_conversion.rb[0m
            |   |   |   |   |-- [00mrendering.rb[0m
            |   |   |   |   |-- [00mserialization.rb[0m
            |   |   |   |   |-- [00msystem_test_helper.rb[0m
            |   |   |   |   |-- [00mtrix_attachment.rb[0m
            |   |   |   |   `-- [00mversion.rb[0m
            |   |   |   |-- [00maction_text.rb[0m
            |   |   |   |-- [01;34mgenerators[0m
            |   |   |   |   `-- [01;34maction_text[0m
            |   |   |   |       `-- [01;34minstall[0m
            |   |   |   |           |-- [00minstall_generator.rb[0m
            |   |   |   |           `-- [01;34mtemplates[0m
            |   |   |   |               `-- [00mactiontext.css[0m
            |   |   |   |-- [01;34mrails[0m
            |   |   |   |   `-- [01;34mgenerators[0m
            |   |   |   |       `-- [01;34mtest_unit[0m
            |   |   |   |           |-- [00minstall_generator.rb[0m
            |   |   |   |           `-- [01;34mtemplates[0m
            |   |   |   |               `-- [00mfixtures.yml[0m
            |   |   |   `-- [01;34mtasks[0m
            |   |   |       `-- [00mactiontext.rake[0m
            |   |   `-- [00mpackage.json[0m
            |   |-- [01;34mactionview-7.0.4.2[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.rdoc[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34maction_view[0m
            |   |       |   |-- [00mbase.rb[0m
            |   |       |   |-- [00mbuffers.rb[0m
            |   |       |   |-- [00mcache_expiry.rb[0m
            |   |       |   |-- [00mcontext.rb[0m
            |   |       |   |-- [01;34mdependency_tracker[0m
            |   |       |   |   |-- [00merb_tracker.rb[0m
            |   |       |   |   `-- [00mripper_tracker.rb[0m
            |   |       |   |-- [00mdependency_tracker.rb[0m
            |   |       |   |-- [00mdigestor.rb[0m
            |   |       |   |-- [00mflows.rb[0m
            |   |       |   |-- [00mgem_version.rb[0m
            |   |       |   |-- [01;34mhelpers[0m
            |   |       |   |   |-- [00mactive_model_helper.rb[0m
            |   |       |   |   |-- [00masset_tag_helper.rb[0m
            |   |       |   |   |-- [00masset_url_helper.rb[0m
            |   |       |   |   |-- [00matom_feed_helper.rb[0m
            |   |       |   |   |-- [00mcache_helper.rb[0m
            |   |       |   |   |-- [00mcapture_helper.rb[0m
            |   |       |   |   |-- [00mcontroller_helper.rb[0m
            |   |       |   |   |-- [00mcsp_helper.rb[0m
            |   |       |   |   |-- [00mcsrf_helper.rb[0m
            |   |       |   |   |-- [00mdate_helper.rb[0m
            |   |       |   |   |-- [00mdebug_helper.rb[0m
            |   |       |   |   |-- [00mform_helper.rb[0m
            |   |       |   |   |-- [00mform_options_helper.rb[0m
            |   |       |   |   |-- [00mform_tag_helper.rb[0m
            |   |       |   |   |-- [00mjavascript_helper.rb[0m
            |   |       |   |   |-- [00mnumber_helper.rb[0m
            |   |       |   |   |-- [00moutput_safety_helper.rb[0m
            |   |       |   |   |-- [00mrendering_helper.rb[0m
            |   |       |   |   |-- [00msanitize_helper.rb[0m
            |   |       |   |   |-- [00mtag_helper.rb[0m
            |   |       |   |   |-- [01;34mtags[0m
            |   |       |   |   |   |-- [00mbase.rb[0m
            |   |       |   |   |   |-- [00mcheck_box.rb[0m
            |   |       |   |   |   |-- [00mcheckable.rb[0m
            |   |       |   |   |   |-- [00mcollection_check_boxes.rb[0m
            |   |       |   |   |   |-- [00mcollection_helpers.rb[0m
            |   |       |   |   |   |-- [00mcollection_radio_buttons.rb[0m
            |   |       |   |   |   |-- [00mcollection_select.rb[0m
            |   |       |   |   |   |-- [00mcolor_field.rb[0m
            |   |       |   |   |   |-- [00mdate_field.rb[0m
            |   |       |   |   |   |-- [00mdate_select.rb[0m
            |   |       |   |   |   |-- [00mdatetime_field.rb[0m
            |   |       |   |   |   |-- [00mdatetime_local_field.rb[0m
            |   |       |   |   |   |-- [00mdatetime_select.rb[0m
            |   |       |   |   |   |-- [00memail_field.rb[0m
            |   |       |   |   |   |-- [00mfile_field.rb[0m
            |   |       |   |   |   |-- [00mgrouped_collection_select.rb[0m
            |   |       |   |   |   |-- [00mhidden_field.rb[0m
            |   |       |   |   |   |-- [00mlabel.rb[0m
            |   |       |   |   |   |-- [00mmonth_field.rb[0m
            |   |       |   |   |   |-- [00mnumber_field.rb[0m
            |   |       |   |   |   |-- [00mpassword_field.rb[0m
            |   |       |   |   |   |-- [00mplaceholderable.rb[0m
            |   |       |   |   |   |-- [00mradio_button.rb[0m
            |   |       |   |   |   |-- [00mrange_field.rb[0m
            |   |       |   |   |   |-- [00msearch_field.rb[0m
            |   |       |   |   |   |-- [00mselect.rb[0m
            |   |       |   |   |   |-- [00mtel_field.rb[0m
            |   |       |   |   |   |-- [00mtext_area.rb[0m
            |   |       |   |   |   |-- [00mtext_field.rb[0m
            |   |       |   |   |   |-- [00mtime_field.rb[0m
            |   |       |   |   |   |-- [00mtime_select.rb[0m
            |   |       |   |   |   |-- [00mtime_zone_select.rb[0m
            |   |       |   |   |   |-- [00mtranslator.rb[0m
            |   |       |   |   |   |-- [00murl_field.rb[0m
            |   |       |   |   |   |-- [00mweek_field.rb[0m
            |   |       |   |   |   `-- [00mweekday_select.rb[0m
            |   |       |   |   |-- [00mtags.rb[0m
            |   |       |   |   |-- [00mtext_helper.rb[0m
            |   |       |   |   |-- [00mtranslation_helper.rb[0m
            |   |       |   |   `-- [00murl_helper.rb[0m
            |   |       |   |-- [00mhelpers.rb[0m
            |   |       |   |-- [00mlayouts.rb[0m
            |   |       |   |-- [01;34mlocale[0m
            |   |       |   |   `-- [00men.yml[0m
            |   |       |   |-- [00mlog_subscriber.rb[0m
            |   |       |   |-- [00mlookup_context.rb[0m
            |   |       |   |-- [00mmodel_naming.rb[0m
            |   |       |   |-- [00mpath_set.rb[0m
            |   |       |   |-- [00mrailtie.rb[0m
            |   |       |   |-- [00mrecord_identifier.rb[0m
            |   |       |   |-- [00mrender_parser.rb[0m
            |   |       |   |-- [01;34mrenderer[0m
            |   |       |   |   |-- [00mabstract_renderer.rb[0m
            |   |       |   |   |-- [00mcollection_renderer.rb[0m
            |   |       |   |   |-- [00mobject_renderer.rb[0m
            |   |       |   |   |-- [01;34mpartial_renderer[0m
            |   |       |   |   |   `-- [00mcollection_caching.rb[0m
            |   |       |   |   |-- [00mpartial_renderer.rb[0m
            |   |       |   |   |-- [00mrenderer.rb[0m
            |   |       |   |   |-- [00mstreaming_template_renderer.rb[0m
            |   |       |   |   `-- [00mtemplate_renderer.rb[0m
            |   |       |   |-- [00mrendering.rb[0m
            |   |       |   |-- [00mripper_ast_parser.rb[0m
            |   |       |   |-- [00mrouting_url_for.rb[0m
            |   |       |   |-- [01;34mtasks[0m
            |   |       |   |   `-- [00mcache_digests.rake[0m
            |   |       |   |-- [01;34mtemplate[0m
            |   |       |   |   |-- [00merror.rb[0m
            |   |       |   |   |-- [01;34mhandlers[0m
            |   |       |   |   |   |-- [00mbuilder.rb[0m
            |   |       |   |   |   |-- [01;34merb[0m
            |   |       |   |   |   |   `-- [00merubi.rb[0m
            |   |       |   |   |   |-- [00merb.rb[0m
            |   |       |   |   |   |-- [00mhtml.rb[0m
            |   |       |   |   |   `-- [00mraw.rb[0m
            |   |       |   |   |-- [00mhandlers.rb[0m
            |   |       |   |   |-- [00mhtml.rb[0m
            |   |       |   |   |-- [00minline.rb[0m
            |   |       |   |   |-- [00mraw_file.rb[0m
            |   |       |   |   |-- [00mrenderable.rb[0m
            |   |       |   |   |-- [00mresolver.rb[0m
            |   |       |   |   |-- [01;34msources[0m
            |   |       |   |   |   `-- [00mfile.rb[0m
            |   |       |   |   |-- [00msources.rb[0m
            |   |       |   |   |-- [00mtext.rb[0m
            |   |       |   |   `-- [00mtypes.rb[0m
            |   |       |   |-- [00mtemplate.rb[0m
            |   |       |   |-- [00mtemplate_details.rb[0m
            |   |       |   |-- [00mtemplate_path.rb[0m
            |   |       |   |-- [00mtest_case.rb[0m
            |   |       |   |-- [01;34mtesting[0m
            |   |       |   |   `-- [00mresolvers.rb[0m
            |   |       |   |-- [00munbound_template.rb[0m
            |   |       |   |-- [00mversion.rb[0m
            |   |       |   `-- [00mview_paths.rb[0m
            |   |       |-- [00maction_view.rb[0m
            |   |       `-- [01;34massets[0m
            |   |           `-- [01;34mcompiled[0m
            |   |               `-- [00mrails-ujs.js[0m
            |   |-- [01;34mactivejob-7.0.4.2[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.md[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34mactive_job[0m
            |   |       |   |-- [00marguments.rb[0m
            |   |       |   |-- [00mbase.rb[0m
            |   |       |   |-- [00mcallbacks.rb[0m
            |   |       |   |-- [00mconfigured_job.rb[0m
            |   |       |   |-- [00mcore.rb[0m
            |   |       |   |-- [00menqueuing.rb[0m
            |   |       |   |-- [00mexceptions.rb[0m
            |   |       |   |-- [00mexecution.rb[0m
            |   |       |   |-- [00mgem_version.rb[0m
            |   |       |   |-- [00minstrumentation.rb[0m
            |   |       |   |-- [00mlog_subscriber.rb[0m
            |   |       |   |-- [00mlogging.rb[0m
            |   |       |   |-- [00mqueue_adapter.rb[0m
            |   |       |   |-- [01;34mqueue_adapters[0m
            |   |       |   |   |-- [00masync_adapter.rb[0m
            |   |       |   |   |-- [00mbackburner_adapter.rb[0m
            |   |       |   |   |-- [00mdelayed_job_adapter.rb[0m
            |   |       |   |   |-- [00minline_adapter.rb[0m
            |   |       |   |   |-- [00mque_adapter.rb[0m
            |   |       |   |   |-- [00mqueue_classic_adapter.rb[0m
            |   |       |   |   |-- [00mresque_adapter.rb[0m
            |   |       |   |   |-- [00msidekiq_adapter.rb[0m
            |   |       |   |   |-- [00msneakers_adapter.rb[0m
            |   |       |   |   |-- [00msucker_punch_adapter.rb[0m
            |   |       |   |   `-- [00mtest_adapter.rb[0m
            |   |       |   |-- [00mqueue_adapters.rb[0m
            |   |       |   |-- [00mqueue_name.rb[0m
            |   |       |   |-- [00mqueue_priority.rb[0m
            |   |       |   |-- [00mrailtie.rb[0m
            |   |       |   |-- [01;34mserializers[0m
            |   |       |   |   |-- [00mdate_serializer.rb[0m
            |   |       |   |   |-- [00mdate_time_serializer.rb[0m
            |   |       |   |   |-- [00mduration_serializer.rb[0m
            |   |       |   |   |-- [00mmodule_serializer.rb[0m
            |   |       |   |   |-- [00mobject_serializer.rb[0m
            |   |       |   |   |-- [00mrange_serializer.rb[0m
            |   |       |   |   |-- [00msymbol_serializer.rb[0m
            |   |       |   |   |-- [00mtime_object_serializer.rb[0m
            |   |       |   |   |-- [00mtime_serializer.rb[0m
            |   |       |   |   `-- [00mtime_with_zone_serializer.rb[0m
            |   |       |   |-- [00mserializers.rb[0m
            |   |       |   |-- [00mtest_case.rb[0m
            |   |       |   |-- [00mtest_helper.rb[0m
            |   |       |   |-- [00mtimezones.rb[0m
            |   |       |   |-- [00mtranslation.rb[0m
            |   |       |   `-- [00mversion.rb[0m
            |   |       |-- [00mactive_job.rb[0m
            |   |       `-- [01;34mrails[0m
            |   |           `-- [01;34mgenerators[0m
            |   |               `-- [01;34mjob[0m
            |   |                   |-- [00mjob_generator.rb[0m
            |   |                   `-- [01;34mtemplates[0m
            |   |                       |-- [00mapplication_job.rb.tt[0m
            |   |                       `-- [00mjob.rb.tt[0m
            |   |-- [01;34mactivemodel-7.0.4.2[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.rdoc[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34mactive_model[0m
            |   |       |   |-- [00mapi.rb[0m
            |   |       |   |-- [01;34mattribute[0m
            |   |       |   |   `-- [00muser_provided_default.rb[0m
            |   |       |   |-- [00mattribute.rb[0m
            |   |       |   |-- [00mattribute_assignment.rb[0m
            |   |       |   |-- [00mattribute_methods.rb[0m
            |   |       |   |-- [00mattribute_mutation_tracker.rb[0m
            |   |       |   |-- [01;34mattribute_set[0m
            |   |       |   |   |-- [00mbuilder.rb[0m
            |   |       |   |   `-- [00myaml_encoder.rb[0m
            |   |       |   |-- [00mattribute_set.rb[0m
            |   |       |   |-- [00mattributes.rb[0m
            |   |       |   |-- [00mcallbacks.rb[0m
            |   |       |   |-- [00mconversion.rb[0m
            |   |       |   |-- [00mdirty.rb[0m
            |   |       |   |-- [00merror.rb[0m
            |   |       |   |-- [00merrors.rb[0m
            |   |       |   |-- [00mforbidden_attributes_protection.rb[0m
            |   |       |   |-- [00mgem_version.rb[0m
            |   |       |   |-- [00mlint.rb[0m
            |   |       |   |-- [01;34mlocale[0m
            |   |       |   |   `-- [00men.yml[0m
            |   |       |   |-- [00mmodel.rb[0m
            |   |       |   |-- [00mnaming.rb[0m
            |   |       |   |-- [00mnested_error.rb[0m
            |   |       |   |-- [00mrailtie.rb[0m
            |   |       |   |-- [00msecure_password.rb[0m
            |   |       |   |-- [00mserialization.rb[0m
            |   |       |   |-- [01;34mserializers[0m
            |   |       |   |   `-- [00mjson.rb[0m
            |   |       |   |-- [00mtranslation.rb[0m
            |   |       |   |-- [01;34mtype[0m
            |   |       |   |   |-- [00mbig_integer.rb[0m
            |   |       |   |   |-- [00mbinary.rb[0m
            |   |       |   |   |-- [00mboolean.rb[0m
            |   |       |   |   |-- [00mdate.rb[0m
            |   |       |   |   |-- [00mdate_time.rb[0m
            |   |       |   |   |-- [00mdecimal.rb[0m
            |   |       |   |   |-- [00mfloat.rb[0m
            |   |       |   |   |-- [01;34mhelpers[0m
            |   |       |   |   |   |-- [00maccepts_multiparameter_time.rb[0m
            |   |       |   |   |   |-- [00mmutable.rb[0m
            |   |       |   |   |   |-- [00mnumeric.rb[0m
            |   |       |   |   |   |-- [00mtime_value.rb[0m
            |   |       |   |   |   `-- [00mtimezone.rb[0m
            |   |       |   |   |-- [00mhelpers.rb[0m
            |   |       |   |   |-- [00mimmutable_string.rb[0m
            |   |       |   |   |-- [00minteger.rb[0m
            |   |       |   |   |-- [00mregistry.rb[0m
            |   |       |   |   |-- [00mstring.rb[0m
            |   |       |   |   |-- [00mtime.rb[0m
            |   |       |   |   `-- [00mvalue.rb[0m
            |   |       |   |-- [00mtype.rb[0m
            |   |       |   |-- [01;34mvalidations[0m
            |   |       |   |   |-- [00mabsence.rb[0m
            |   |       |   |   |-- [00macceptance.rb[0m
            |   |       |   |   |-- [00mcallbacks.rb[0m
            |   |       |   |   |-- [00mclusivity.rb[0m
            |   |       |   |   |-- [00mcomparability.rb[0m
            |   |       |   |   |-- [00mcomparison.rb[0m
            |   |       |   |   |-- [00mconfirmation.rb[0m
            |   |       |   |   |-- [00mexclusion.rb[0m
            |   |       |   |   |-- [00mformat.rb[0m
            |   |       |   |   |-- [00mhelper_methods.rb[0m
            |   |       |   |   |-- [00minclusion.rb[0m
            |   |       |   |   |-- [00mlength.rb[0m
            |   |       |   |   |-- [00mnumericality.rb[0m
            |   |       |   |   |-- [00mpresence.rb[0m
            |   |       |   |   |-- [00mvalidates.rb[0m
            |   |       |   |   `-- [00mwith.rb[0m
            |   |       |   |-- [00mvalidations.rb[0m
            |   |       |   |-- [00mvalidator.rb[0m
            |   |       |   `-- [00mversion.rb[0m
            |   |       `-- [00mactive_model.rb[0m
            |   |-- [01;34mactiverecord-7.0.4.2[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.rdoc[0m
            |   |   |-- [01;34mexamples[0m
            |   |   |   |-- [00mperformance.rb[0m
            |   |   |   `-- [00msimple.rb[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34mactive_record[0m
            |   |       |   |-- [00maggregations.rb[0m
            |   |       |   |-- [00massociation_relation.rb[0m
            |   |       |   |-- [01;34massociations[0m
            |   |       |   |   |-- [00malias_tracker.rb[0m
            |   |       |   |   |-- [00massociation.rb[0m
            |   |       |   |   |-- [00massociation_scope.rb[0m
            |   |       |   |   |-- [00mbelongs_to_association.rb[0m
            |   |       |   |   |-- [00mbelongs_to_polymorphic_association.rb[0m
            |   |       |   |   |-- [01;34mbuilder[0m
            |   |       |   |   |   |-- [00massociation.rb[0m
            |   |       |   |   |   |-- [00mbelongs_to.rb[0m
            |   |       |   |   |   |-- [00mcollection_association.rb[0m
            |   |       |   |   |   |-- [00mhas_and_belongs_to_many.rb[0m
            |   |       |   |   |   |-- [00mhas_many.rb[0m
            |   |       |   |   |   |-- [00mhas_one.rb[0m
            |   |       |   |   |   `-- [00msingular_association.rb[0m
            |   |       |   |   |-- [00mcollection_association.rb[0m
            |   |       |   |   |-- [00mcollection_proxy.rb[0m
            |   |       |   |   |-- [00mdisable_joins_association_scope.rb[0m
            |   |       |   |   |-- [00mforeign_association.rb[0m
            |   |       |   |   |-- [00mhas_many_association.rb[0m
            |   |       |   |   |-- [00mhas_many_through_association.rb[0m
            |   |       |   |   |-- [00mhas_one_association.rb[0m
            |   |       |   |   |-- [00mhas_one_through_association.rb[0m
            |   |       |   |   |-- [01;34mjoin_dependency[0m
            |   |       |   |   |   |-- [00mjoin_association.rb[0m
            |   |       |   |   |   |-- [00mjoin_base.rb[0m
            |   |       |   |   |   `-- [00mjoin_part.rb[0m
            |   |       |   |   |-- [00mjoin_dependency.rb[0m
            |   |       |   |   |-- [01;34mpreloader[0m
            |   |       |   |   |   |-- [00massociation.rb[0m
            |   |       |   |   |   |-- [00mbatch.rb[0m
            |   |       |   |   |   |-- [00mbranch.rb[0m
            |   |       |   |   |   `-- [00mthrough_association.rb[0m
            |   |       |   |   |-- [00mpreloader.rb[0m
            |   |       |   |   |-- [00msingular_association.rb[0m
            |   |       |   |   `-- [00mthrough_association.rb[0m
            |   |       |   |-- [00massociations.rb[0m
            |   |       |   |-- [00masynchronous_queries_tracker.rb[0m
            |   |       |   |-- [00mattribute_assignment.rb[0m
            |   |       |   |-- [01;34mattribute_methods[0m
            |   |       |   |   |-- [00mbefore_type_cast.rb[0m
            |   |       |   |   |-- [00mdirty.rb[0m
            |   |       |   |   |-- [00mprimary_key.rb[0m
            |   |       |   |   |-- [00mquery.rb[0m
            |   |       |   |   |-- [00mread.rb[0m
            |   |       |   |   |-- [00mserialization.rb[0m
            |   |       |   |   |-- [00mtime_zone_conversion.rb[0m
            |   |       |   |   `-- [00mwrite.rb[0m
            |   |       |   |-- [00mattribute_methods.rb[0m
            |   |       |   |-- [00mattributes.rb[0m
            |   |       |   |-- [00mautosave_association.rb[0m
            |   |       |   |-- [00mbase.rb[0m
            |   |       |   |-- [00mcallbacks.rb[0m
            |   |       |   |-- [01;34mcoders[0m
            |   |       |   |   |-- [00mjson.rb[0m
            |   |       |   |   `-- [00myaml_column.rb[0m
            |   |       |   |-- [01;34mconnection_adapters[0m
            |   |       |   |   |-- [01;34mabstract[0m
            |   |       |   |   |   |-- [00mconnection_handler.rb[0m
            |   |       |   |   |   |-- [01;34mconnection_pool[0m
            |   |       |   |   |   |   |-- [00mqueue.rb[0m
            |   |       |   |   |   |   `-- [00mreaper.rb[0m
            |   |       |   |   |   |-- [00mconnection_pool.rb[0m
            |   |       |   |   |   |-- [00mdatabase_limits.rb[0m
            |   |       |   |   |   |-- [00mdatabase_statements.rb[0m
            |   |       |   |   |   |-- [00mquery_cache.rb[0m
            |   |       |   |   |   |-- [00mquoting.rb[0m
            |   |       |   |   |   |-- [00msavepoints.rb[0m
            |   |       |   |   |   |-- [00mschema_creation.rb[0m
            |   |       |   |   |   |-- [00mschema_definitions.rb[0m
            |   |       |   |   |   |-- [00mschema_dumper.rb[0m
            |   |       |   |   |   |-- [00mschema_statements.rb[0m
            |   |       |   |   |   `-- [00mtransaction.rb[0m
            |   |       |   |   |-- [00mabstract_adapter.rb[0m
            |   |       |   |   |-- [00mabstract_mysql_adapter.rb[0m
            |   |       |   |   |-- [00mcolumn.rb[0m
            |   |       |   |   |-- [00mdeduplicable.rb[0m
            |   |       |   |   |-- [00mlegacy_pool_manager.rb[0m
            |   |       |   |   |-- [01;34mmysql[0m
            |   |       |   |   |   |-- [00mcolumn.rb[0m
            |   |       |   |   |   |-- [00mdatabase_statements.rb[0m
            |   |       |   |   |   |-- [00mexplain_pretty_printer.rb[0m
            |   |       |   |   |   |-- [00mquoting.rb[0m
            |   |       |   |   |   |-- [00mschema_creation.rb[0m
            |   |       |   |   |   |-- [00mschema_definitions.rb[0m
            |   |       |   |   |   |-- [00mschema_dumper.rb[0m
            |   |       |   |   |   |-- [00mschema_statements.rb[0m
            |   |       |   |   |   `-- [00mtype_metadata.rb[0m
            |   |       |   |   |-- [00mmysql2_adapter.rb[0m
            |   |       |   |   |-- [00mpool_config.rb[0m
            |   |       |   |   |-- [00mpool_manager.rb[0m
            |   |       |   |   |-- [01;34mpostgresql[0m
            |   |       |   |   |   |-- [00mcolumn.rb[0m
            |   |       |   |   |   |-- [00mdatabase_statements.rb[0m
            |   |       |   |   |   |-- [00mexplain_pretty_printer.rb[0m
            |   |       |   |   |   |-- [01;34moid[0m
            |   |       |   |   |   |   |-- [00marray.rb[0m
            |   |       |   |   |   |   |-- [00mbit.rb[0m
            |   |       |   |   |   |   |-- [00mbit_varying.rb[0m
            |   |       |   |   |   |   |-- [00mbytea.rb[0m
            |   |       |   |   |   |   |-- [00mcidr.rb[0m
            |   |       |   |   |   |   |-- [00mdate.rb[0m
            |   |       |   |   |   |   |-- [00mdate_time.rb[0m
            |   |       |   |   |   |   |-- [00mdecimal.rb[0m
            |   |       |   |   |   |   |-- [00menum.rb[0m
            |   |       |   |   |   |   |-- [00mhstore.rb[0m
            |   |       |   |   |   |   |-- [00minet.rb[0m
            |   |       |   |   |   |   |-- [00minterval.rb[0m
            |   |       |   |   |   |   |-- [00mjsonb.rb[0m
            |   |       |   |   |   |   |-- [00mlegacy_point.rb[0m
            |   |       |   |   |   |   |-- [00mmacaddr.rb[0m
            |   |       |   |   |   |   |-- [00mmoney.rb[0m
            |   |       |   |   |   |   |-- [00moid.rb[0m
            |   |       |   |   |   |   |-- [00mpoint.rb[0m
            |   |       |   |   |   |   |-- [00mrange.rb[0m
            |   |       |   |   |   |   |-- [00mspecialized_string.rb[0m
            |   |       |   |   |   |   |-- [00mtimestamp.rb[0m
            |   |       |   |   |   |   |-- [00mtimestamp_with_time_zone.rb[0m
            |   |       |   |   |   |   |-- [00mtype_map_initializer.rb[0m
            |   |       |   |   |   |   |-- [00muuid.rb[0m
            |   |       |   |   |   |   |-- [00mvector.rb[0m
            |   |       |   |   |   |   `-- [00mxml.rb[0m
            |   |       |   |   |   |-- [00moid.rb[0m
            |   |       |   |   |   |-- [00mquoting.rb[0m
            |   |       |   |   |   |-- [00mreferential_integrity.rb[0m
            |   |       |   |   |   |-- [00mschema_creation.rb[0m
            |   |       |   |   |   |-- [00mschema_definitions.rb[0m
            |   |       |   |   |   |-- [00mschema_dumper.rb[0m
            |   |       |   |   |   |-- [00mschema_statements.rb[0m
            |   |       |   |   |   |-- [00mtype_metadata.rb[0m
            |   |       |   |   |   `-- [00mutils.rb[0m
            |   |       |   |   |-- [00mpostgresql_adapter.rb[0m
            |   |       |   |   |-- [00mschema_cache.rb[0m
            |   |       |   |   |-- [00msql_type_metadata.rb[0m
            |   |       |   |   |-- [01;34msqlite3[0m
            |   |       |   |   |   |-- [00mdatabase_statements.rb[0m
            |   |       |   |   |   |-- [00mexplain_pretty_printer.rb[0m
            |   |       |   |   |   |-- [00mquoting.rb[0m
            |   |       |   |   |   |-- [00mschema_creation.rb[0m
            |   |       |   |   |   |-- [00mschema_definitions.rb[0m
            |   |       |   |   |   |-- [00mschema_dumper.rb[0m
            |   |       |   |   |   `-- [00mschema_statements.rb[0m
            |   |       |   |   |-- [00msqlite3_adapter.rb[0m
            |   |       |   |   `-- [00mstatement_pool.rb[0m
            |   |       |   |-- [00mconnection_adapters.rb[0m
            |   |       |   |-- [00mconnection_handling.rb[0m
            |   |       |   |-- [00mcore.rb[0m
            |   |       |   |-- [00mcounter_cache.rb[0m
            |   |       |   |-- [01;34mdatabase_configurations[0m
            |   |       |   |   |-- [00mconnection_url_resolver.rb[0m
            |   |       |   |   |-- [00mdatabase_config.rb[0m
            |   |       |   |   |-- [00mhash_config.rb[0m
            |   |       |   |   `-- [00murl_config.rb[0m
            |   |       |   |-- [00mdatabase_configurations.rb[0m
            |   |       |   |-- [00mdelegated_type.rb[0m
            |   |       |   |-- [00mdestroy_association_async_job.rb[0m
            |   |       |   |-- [00mdisable_joins_association_relation.rb[0m
            |   |       |   |-- [00mdynamic_matchers.rb[0m
            |   |       |   |-- [01;34mencryption[0m
            |   |       |   |   |-- [01;34mcipher[0m
            |   |       |   |   |   `-- [00maes256_gcm.rb[0m
            |   |       |   |   |-- [00mcipher.rb[0m
            |   |       |   |   |-- [00mconfig.rb[0m
            |   |       |   |   |-- [00mconfigurable.rb[0m
            |   |       |   |   |-- [00mcontext.rb[0m
            |   |       |   |   |-- [00mcontexts.rb[0m
            |   |       |   |   |-- [00mderived_secret_key_provider.rb[0m
            |   |       |   |   |-- [00mdeterministic_key_provider.rb[0m
            |   |       |   |   |-- [00mencryptable_record.rb[0m
            |   |       |   |   |-- [00mencrypted_attribute_type.rb[0m
            |   |       |   |   |-- [00mencrypted_fixtures.rb[0m
            |   |       |   |   |-- [00mencrypting_only_encryptor.rb[0m
            |   |       |   |   |-- [00mencryptor.rb[0m
            |   |       |   |   |-- [00menvelope_encryption_key_provider.rb[0m
            |   |       |   |   |-- [00merrors.rb[0m
            |   |       |   |   |-- [00mextended_deterministic_queries.rb[0m
            |   |       |   |   |-- [00mextended_deterministic_uniqueness_validator.rb[0m
            |   |       |   |   |-- [00mkey.rb[0m
            |   |       |   |   |-- [00mkey_generator.rb[0m
            |   |       |   |   |-- [00mkey_provider.rb[0m
            |   |       |   |   |-- [00mmessage.rb[0m
            |   |       |   |   |-- [00mmessage_serializer.rb[0m
            |   |       |   |   |-- [00mnull_encryptor.rb[0m
            |   |       |   |   |-- [00mproperties.rb[0m
            |   |       |   |   |-- [00mread_only_null_encryptor.rb[0m
            |   |       |   |   `-- [00mscheme.rb[0m
            |   |       |   |-- [00mencryption.rb[0m
            |   |       |   |-- [00menum.rb[0m
            |   |       |   |-- [00merrors.rb[0m
            |   |       |   |-- [00mexplain.rb[0m
            |   |       |   |-- [00mexplain_registry.rb[0m
            |   |       |   |-- [00mexplain_subscriber.rb[0m
            |   |       |   |-- [01;34mfixture_set[0m
            |   |       |   |   |-- [00mfile.rb[0m
            |   |       |   |   |-- [00mmodel_metadata.rb[0m
            |   |       |   |   |-- [00mrender_context.rb[0m
            |   |       |   |   |-- [00mtable_row.rb[0m
            |   |       |   |   `-- [00mtable_rows.rb[0m
            |   |       |   |-- [00mfixtures.rb[0m
            |   |       |   |-- [00mfuture_result.rb[0m
            |   |       |   |-- [00mgem_version.rb[0m
            |   |       |   |-- [00minheritance.rb[0m
            |   |       |   |-- [00minsert_all.rb[0m
            |   |       |   |-- [00mintegration.rb[0m
            |   |       |   |-- [00minternal_metadata.rb[0m
            |   |       |   |-- [00mlegacy_yaml_adapter.rb[0m
            |   |       |   |-- [01;34mlocale[0m
            |   |       |   |   `-- [00men.yml[0m
            |   |       |   |-- [01;34mlocking[0m
            |   |       |   |   |-- [00moptimistic.rb[0m
            |   |       |   |   `-- [00mpessimistic.rb[0m
            |   |       |   |-- [00mlog_subscriber.rb[0m
            |   |       |   |-- [01;34mmiddleware[0m
            |   |       |   |   |-- [01;34mdatabase_selector[0m
            |   |       |   |   |   |-- [01;34mresolver[0m
            |   |       |   |   |   |   `-- [00msession.rb[0m
            |   |       |   |   |   `-- [00mresolver.rb[0m
            |   |       |   |   |-- [00mdatabase_selector.rb[0m
            |   |       |   |   `-- [00mshard_selector.rb[0m
            |   |       |   |-- [01;34mmigration[0m
            |   |       |   |   |-- [00mcommand_recorder.rb[0m
            |   |       |   |   |-- [00mcompatibility.rb[0m
            |   |       |   |   `-- [00mjoin_table.rb[0m
            |   |       |   |-- [00mmigration.rb[0m
            |   |       |   |-- [00mmodel_schema.rb[0m
            |   |       |   |-- [00mnested_attributes.rb[0m
            |   |       |   |-- [00mno_touching.rb[0m
            |   |       |   |-- [00mnull_relation.rb[0m
            |   |       |   |-- [00mpersistence.rb[0m
            |   |       |   |-- [00mquery_cache.rb[0m
            |   |       |   |-- [00mquery_logs.rb[0m
            |   |       |   |-- [00mquerying.rb[0m
            |   |       |   |-- [00mrailtie.rb[0m
            |   |       |   |-- [01;34mrailties[0m
            |   |       |   |   |-- [00mconsole_sandbox.rb[0m
            |   |       |   |   |-- [00mcontroller_runtime.rb[0m
            |   |       |   |   `-- [00mdatabases.rake[0m
            |   |       |   |-- [00mreadonly_attributes.rb[0m
            |   |       |   |-- [00mreflection.rb[0m
            |   |       |   |-- [01;34mrelation[0m
            |   |       |   |   |-- [01;34mbatches[0m
            |   |       |   |   |   `-- [00mbatch_enumerator.rb[0m
            |   |       |   |   |-- [00mbatches.rb[0m
            |   |       |   |   |-- [00mcalculations.rb[0m
            |   |       |   |   |-- [00mdelegation.rb[0m
            |   |       |   |   |-- [00mfinder_methods.rb[0m
            |   |       |   |   |-- [00mfrom_clause.rb[0m
            |   |       |   |   |-- [00mmerger.rb[0m
            |   |       |   |   |-- [01;34mpredicate_builder[0m
            |   |       |   |   |   |-- [00marray_handler.rb[0m
            |   |       |   |   |   |-- [00massociation_query_value.rb[0m
            |   |       |   |   |   |-- [00mbasic_object_handler.rb[0m
            |   |       |   |   |   |-- [00mpolymorphic_array_value.rb[0m
            |   |       |   |   |   |-- [00mrange_handler.rb[0m
            |   |       |   |   |   `-- [00mrelation_handler.rb[0m
            |   |       |   |   |-- [00mpredicate_builder.rb[0m
            |   |       |   |   |-- [00mquery_attribute.rb[0m
            |   |       |   |   |-- [00mquery_methods.rb[0m
            |   |       |   |   |-- [00mrecord_fetch_warning.rb[0m
            |   |       |   |   |-- [00mspawn_methods.rb[0m
            |   |       |   |   `-- [00mwhere_clause.rb[0m
            |   |       |   |-- [00mrelation.rb[0m
            |   |       |   |-- [00mresult.rb[0m
            |   |       |   |-- [00mruntime_registry.rb[0m
            |   |       |   |-- [00msanitization.rb[0m
            |   |       |   |-- [00mschema.rb[0m
            |   |       |   |-- [00mschema_dumper.rb[0m
            |   |       |   |-- [00mschema_migration.rb[0m
            |   |       |   |-- [01;34mscoping[0m
            |   |       |   |   |-- [00mdefault.rb[0m
            |   |       |   |   `-- [00mnamed.rb[0m
            |   |       |   |-- [00mscoping.rb[0m
            |   |       |   |-- [00msecure_token.rb[0m
            |   |       |   |-- [00mserialization.rb[0m
            |   |       |   |-- [00msigned_id.rb[0m
            |   |       |   |-- [00mstatement_cache.rb[0m
            |   |       |   |-- [00mstore.rb[0m
            |   |       |   |-- [00msuppressor.rb[0m
            |   |       |   |-- [00mtable_metadata.rb[0m
            |   |       |   |-- [01;34mtasks[0m
            |   |       |   |   |-- [00mdatabase_tasks.rb[0m
            |   |       |   |   |-- [00mmysql_database_tasks.rb[0m
            |   |       |   |   |-- [00mpostgresql_database_tasks.rb[0m
            |   |       |   |   `-- [00msqlite_database_tasks.rb[0m
            |   |       |   |-- [00mtest_databases.rb[0m
            |   |       |   |-- [00mtest_fixtures.rb[0m
            |   |       |   |-- [00mtimestamp.rb[0m
            |   |       |   |-- [00mtouch_later.rb[0m
            |   |       |   |-- [00mtransactions.rb[0m
            |   |       |   |-- [00mtranslation.rb[0m
            |   |       |   |-- [01;34mtype[0m
            |   |       |   |   |-- [00madapter_specific_registry.rb[0m
            |   |       |   |   |-- [00mdate.rb[0m
            |   |       |   |   |-- [00mdate_time.rb[0m
            |   |       |   |   |-- [00mdecimal_without_scale.rb[0m
            |   |       |   |   |-- [00mhash_lookup_type_map.rb[0m
            |   |       |   |   |-- [01;34minternal[0m
            |   |       |   |   |   `-- [00mtimezone.rb[0m
            |   |       |   |   |-- [00mjson.rb[0m
            |   |       |   |   |-- [00mserialized.rb[0m
            |   |       |   |   |-- [00mtext.rb[0m
            |   |       |   |   |-- [00mtime.rb[0m
            |   |       |   |   |-- [00mtype_map.rb[0m
            |   |       |   |   `-- [00munsigned_integer.rb[0m
            |   |       |   |-- [00mtype.rb[0m
            |   |       |   |-- [01;34mtype_caster[0m
            |   |       |   |   |-- [00mconnection.rb[0m
            |   |       |   |   `-- [00mmap.rb[0m
            |   |       |   |-- [00mtype_caster.rb[0m
            |   |       |   |-- [01;34mvalidations[0m
            |   |       |   |   |-- [00mabsence.rb[0m
            |   |       |   |   |-- [00massociated.rb[0m
            |   |       |   |   |-- [00mlength.rb[0m
            |   |       |   |   |-- [00mnumericality.rb[0m
            |   |       |   |   |-- [00mpresence.rb[0m
            |   |       |   |   `-- [00muniqueness.rb[0m
            |   |       |   |-- [00mvalidations.rb[0m
            |   |       |   `-- [00mversion.rb[0m
            |   |       |-- [00mactive_record.rb[0m
            |   |       |-- [01;34marel[0m
            |   |       |   |-- [00malias_predication.rb[0m
            |   |       |   |-- [01;34mattributes[0m
            |   |       |   |   `-- [00mattribute.rb[0m
            |   |       |   |-- [01;34mcollectors[0m
            |   |       |   |   |-- [00mbind.rb[0m
            |   |       |   |   |-- [00mcomposite.rb[0m
            |   |       |   |   |-- [00mplain_string.rb[0m
            |   |       |   |   |-- [00msql_string.rb[0m
            |   |       |   |   `-- [00msubstitute_binds.rb[0m
            |   |       |   |-- [00mcrud.rb[0m
            |   |       |   |-- [00mdelete_manager.rb[0m
            |   |       |   |-- [00merrors.rb[0m
            |   |       |   |-- [00mexpressions.rb[0m
            |   |       |   |-- [00mfactory_methods.rb[0m
            |   |       |   |-- [00mfilter_predications.rb[0m
            |   |       |   |-- [00minsert_manager.rb[0m
            |   |       |   |-- [00mmath.rb[0m
            |   |       |   |-- [01;34mnodes[0m
            |   |       |   |   |-- [00mand.rb[0m
            |   |       |   |   |-- [00mascending.rb[0m
            |   |       |   |   |-- [00mbinary.rb[0m
            |   |       |   |   |-- [00mbind_param.rb[0m
            |   |       |   |   |-- [00mcase.rb[0m
            |   |       |   |   |-- [00mcasted.rb[0m
            |   |       |   |   |-- [00mcomment.rb[0m
            |   |       |   |   |-- [00mcount.rb[0m
            |   |       |   |   |-- [00mdelete_statement.rb[0m
            |   |       |   |   |-- [00mdescending.rb[0m
            |   |       |   |   |-- [00mequality.rb[0m
            |   |       |   |   |-- [00mextract.rb[0m
            |   |       |   |   |-- [00mfalse.rb[0m
            |   |       |   |   |-- [00mfilter.rb[0m
            |   |       |   |   |-- [00mfull_outer_join.rb[0m
            |   |       |   |   |-- [00mfunction.rb[0m
            |   |       |   |   |-- [00mgrouping.rb[0m
            |   |       |   |   |-- [00mhomogeneous_in.rb[0m
            |   |       |   |   |-- [00min.rb[0m
            |   |       |   |   |-- [00minfix_operation.rb[0m
            |   |       |   |   |-- [00minner_join.rb[0m
            |   |       |   |   |-- [00minsert_statement.rb[0m
            |   |       |   |   |-- [00mjoin_source.rb[0m
            |   |       |   |   |-- [00mmatches.rb[0m
            |   |       |   |   |-- [00mnamed_function.rb[0m
            |   |       |   |   |-- [00mnode.rb[0m
            |   |       |   |   |-- [00mnode_expression.rb[0m
            |   |       |   |   |-- [00mordering.rb[0m
            |   |       |   |   |-- [00mouter_join.rb[0m
            |   |       |   |   |-- [00mover.rb[0m
            |   |       |   |   |-- [00mregexp.rb[0m
            |   |       |   |   |-- [00mright_outer_join.rb[0m
            |   |       |   |   |-- [00mselect_core.rb[0m
            |   |       |   |   |-- [00mselect_statement.rb[0m
            |   |       |   |   |-- [00msql_literal.rb[0m
            |   |       |   |   |-- [00mstring_join.rb[0m
            |   |       |   |   |-- [00mtable_alias.rb[0m
            |   |       |   |   |-- [00mterminal.rb[0m
            |   |       |   |   |-- [00mtrue.rb[0m
            |   |       |   |   |-- [00munary.rb[0m
            |   |       |   |   |-- [00munary_operation.rb[0m
            |   |       |   |   |-- [00munqualified_column.rb[0m
            |   |       |   |   |-- [00mupdate_statement.rb[0m
            |   |       |   |   |-- [00mvalues_list.rb[0m
            |   |       |   |   |-- [00mwindow.rb[0m
            |   |       |   |   `-- [00mwith.rb[0m
            |   |       |   |-- [00mnodes.rb[0m
            |   |       |   |-- [00morder_predications.rb[0m
            |   |       |   |-- [00mpredications.rb[0m
            |   |       |   |-- [00mselect_manager.rb[0m
            |   |       |   |-- [00mtable.rb[0m
            |   |       |   |-- [00mtree_manager.rb[0m
            |   |       |   |-- [00mupdate_manager.rb[0m
            |   |       |   |-- [01;34mvisitors[0m
            |   |       |   |   |-- [00mdot.rb[0m
            |   |       |   |   |-- [00mmysql.rb[0m
            |   |       |   |   |-- [00mpostgresql.rb[0m
            |   |       |   |   |-- [00msqlite.rb[0m
            |   |       |   |   |-- [00mto_sql.rb[0m
            |   |       |   |   `-- [00mvisitor.rb[0m
            |   |       |   |-- [00mvisitors.rb[0m
            |   |       |   `-- [00mwindow_predications.rb[0m
            |   |       |-- [00marel.rb[0m
            |   |       `-- [01;34mrails[0m
            |   |           `-- [01;34mgenerators[0m
            |   |               |-- [01;34mactive_record[0m
            |   |               |   |-- [01;34mapplication_record[0m
            |   |               |   |   |-- [00mapplication_record_generator.rb[0m
            |   |               |   |   `-- [01;34mtemplates[0m
            |   |               |   |       `-- [00mapplication_record.rb.tt[0m
            |   |               |   |-- [01;34mmigration[0m
            |   |               |   |   |-- [00mmigration_generator.rb[0m
            |   |               |   |   `-- [01;34mtemplates[0m
            |   |               |   |       |-- [00mcreate_table_migration.rb.tt[0m
            |   |               |   |       `-- [00mmigration.rb.tt[0m
            |   |               |   |-- [00mmigration.rb[0m
            |   |               |   |-- [01;34mmodel[0m
            |   |               |   |   |-- [00mmodel_generator.rb[0m
            |   |               |   |   `-- [01;34mtemplates[0m
            |   |               |   |       |-- [00mabstract_base_class.rb.tt[0m
            |   |               |   |       |-- [00mmodel.rb.tt[0m
            |   |               |   |       `-- [00mmodule.rb.tt[0m
            |   |               |   `-- [01;34mmulti_db[0m
            |   |               |       |-- [00mmulti_db_generator.rb[0m
            |   |               |       `-- [01;34mtemplates[0m
            |   |               |           `-- [00mmulti_db.rb.tt[0m
            |   |               `-- [00mactive_record.rb[0m
            |   |-- [01;34mactivestorage-7.0.4.2[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [01;34mapp[0m
            |   |   |   |-- [01;34massets[0m
            |   |   |   |   `-- [01;34mjavascripts[0m
            |   |   |   |       |-- [00mactivestorage.esm.js[0m
            |   |   |   |       `-- [00mactivestorage.js[0m
            |   |   |   |-- [01;34mcontrollers[0m
            |   |   |   |   |-- [01;34mactive_storage[0m
            |   |   |   |   |   |-- [00mbase_controller.rb[0m
            |   |   |   |   |   |-- [01;34mblobs[0m
            |   |   |   |   |   |   |-- [00mproxy_controller.rb[0m
            |   |   |   |   |   |   `-- [00mredirect_controller.rb[0m
            |   |   |   |   |   |-- [00mdirect_uploads_controller.rb[0m
            |   |   |   |   |   |-- [00mdisk_controller.rb[0m
            |   |   |   |   |   `-- [01;34mrepresentations[0m
            |   |   |   |   |       |-- [00mbase_controller.rb[0m
            |   |   |   |   |       |-- [00mproxy_controller.rb[0m
            |   |   |   |   |       `-- [00mredirect_controller.rb[0m
            |   |   |   |   `-- [01;34mconcerns[0m
            |   |   |   |       `-- [01;34mactive_storage[0m
            |   |   |   |           |-- [00mfile_server.rb[0m
            |   |   |   |           |-- [00mset_blob.rb[0m
            |   |   |   |           |-- [00mset_current.rb[0m
            |   |   |   |           `-- [00mstreaming.rb[0m
            |   |   |   |-- [01;34mjavascript[0m
            |   |   |   |   `-- [01;34mactivestorage[0m
            |   |   |   |       |-- [00mblob_record.js[0m
            |   |   |   |       |-- [00mblob_upload.js[0m
            |   |   |   |       |-- [00mdirect_upload.js[0m
            |   |   |   |       |-- [00mdirect_upload_controller.js[0m
            |   |   |   |       |-- [00mdirect_uploads_controller.js[0m
            |   |   |   |       |-- [00mfile_checksum.js[0m
            |   |   |   |       |-- [00mhelpers.js[0m
            |   |   |   |       |-- [00mindex.js[0m
            |   |   |   |       `-- [00mujs.js[0m
            |   |   |   |-- [01;34mjobs[0m
            |   |   |   |   `-- [01;34mactive_storage[0m
            |   |   |   |       |-- [00manalyze_job.rb[0m
            |   |   |   |       |-- [00mbase_job.rb[0m
            |   |   |   |       |-- [00mmirror_job.rb[0m
            |   |   |   |       `-- [00mpurge_job.rb[0m
            |   |   |   `-- [01;34mmodels[0m
            |   |   |       `-- [01;34mactive_storage[0m
            |   |   |           |-- [00mattachment.rb[0m
            |   |   |           |-- [01;34mblob[0m
            |   |   |           |   |-- [00manalyzable.rb[0m
            |   |   |           |   |-- [00midentifiable.rb[0m
            |   |   |           |   `-- [00mrepresentable.rb[0m
            |   |   |           |-- [00mblob.rb[0m
            |   |   |           |-- [00mcurrent.rb[0m
            |   |   |           |-- [00mfilename.rb[0m
            |   |   |           |-- [00mpreview.rb[0m
            |   |   |           |-- [00mrecord.rb[0m
            |   |   |           |-- [00mvariant.rb[0m
            |   |   |           |-- [00mvariant_record.rb[0m
            |   |   |           |-- [00mvariant_with_record.rb[0m
            |   |   |           `-- [00mvariation.rb[0m
            |   |   |-- [01;34mconfig[0m
            |   |   |   `-- [00mroutes.rb[0m
            |   |   |-- [01;34mdb[0m
            |   |   |   |-- [01;34mmigrate[0m
            |   |   |   |   `-- [00m20170806125915_create_active_storage_tables.rb[0m
            |   |   |   `-- [01;34mupdate_migrate[0m
            |   |   |       |-- [00m20190112182829_add_service_name_to_active_storage_blobs.rb[0m
            |   |   |       |-- [00m20191206030411_create_active_storage_variant_records.rb[0m
            |   |   |       `-- [00m20211119233751_remove_not_null_on_active_storage_blobs_checksum.rb[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34mactive_storage[0m
            |   |       |   |-- [01;34manalyzer[0m
            |   |       |   |   |-- [00maudio_analyzer.rb[0m
            |   |       |   |   |-- [01;34mimage_analyzer[0m
            |   |       |   |   |   |-- [00mimage_magick.rb[0m
            |   |       |   |   |   `-- [00mvips.rb[0m
            |   |       |   |   |-- [00mimage_analyzer.rb[0m
            |   |       |   |   |-- [00mnull_analyzer.rb[0m
            |   |       |   |   `-- [00mvideo_analyzer.rb[0m
            |   |       |   |-- [00manalyzer.rb[0m
            |   |       |   |-- [01;34mattached[0m
            |   |       |   |   |-- [01;34mchanges[0m
            |   |       |   |   |   |-- [00mcreate_many.rb[0m
            |   |       |   |   |   |-- [00mcreate_one.rb[0m
            |   |       |   |   |   |-- [00mcreate_one_of_many.rb[0m
            |   |       |   |   |   |-- [00mdelete_many.rb[0m
            |   |       |   |   |   |-- [00mdelete_one.rb[0m
            |   |       |   |   |   |-- [00mdetach_many.rb[0m
            |   |       |   |   |   |-- [00mdetach_one.rb[0m
            |   |       |   |   |   |-- [00mpurge_many.rb[0m
            |   |       |   |   |   `-- [00mpurge_one.rb[0m
            |   |       |   |   |-- [00mchanges.rb[0m
            |   |       |   |   |-- [00mmany.rb[0m
            |   |       |   |   |-- [00mmodel.rb[0m
            |   |       |   |   `-- [00mone.rb[0m
            |   |       |   |-- [00mattached.rb[0m
            |   |       |   |-- [00mdownloader.rb[0m
            |   |       |   |-- [00mengine.rb[0m
            |   |       |   |-- [00merrors.rb[0m
            |   |       |   |-- [00mfixture_set.rb[0m
            |   |       |   |-- [00mgem_version.rb[0m
            |   |       |   |-- [00mlog_subscriber.rb[0m
            |   |       |   |-- [01;34mpreviewer[0m
            |   |       |   |   |-- [00mmupdf_previewer.rb[0m
            |   |       |   |   |-- [00mpoppler_pdf_previewer.rb[0m
            |   |       |   |   `-- [00mvideo_previewer.rb[0m
            |   |       |   |-- [00mpreviewer.rb[0m
            |   |       |   |-- [00mreflection.rb[0m
            |   |       |   |-- [01;34mservice[0m
            |   |       |   |   |-- [00mazure_storage_service.rb[0m
            |   |       |   |   |-- [00mconfigurator.rb[0m
            |   |       |   |   |-- [00mdisk_service.rb[0m
            |   |       |   |   |-- [00mgcs_service.rb[0m
            |   |       |   |   |-- [00mmirror_service.rb[0m
            |   |       |   |   |-- [00mregistry.rb[0m
            |   |       |   |   `-- [00ms3_service.rb[0m
            |   |       |   |-- [00mservice.rb[0m
            |   |       |   |-- [01;34mtransformers[0m
            |   |       |   |   |-- [00mimage_processing_transformer.rb[0m
            |   |       |   |   `-- [00mtransformer.rb[0m
            |   |       |   `-- [00mversion.rb[0m
            |   |       |-- [00mactive_storage.rb[0m
            |   |       `-- [01;34mtasks[0m
            |   |           `-- [00mactivestorage.rake[0m
            |   |-- [01;34mactivesupport-7.0.4.2[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.rdoc[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34mactive_support[0m
            |   |       |   |-- [00mactionable_error.rb[0m
            |   |       |   |-- [00mall.rb[0m
            |   |       |   |-- [00marray_inquirer.rb[0m
            |   |       |   |-- [00mbacktrace_cleaner.rb[0m
            |   |       |   |-- [00mbenchmarkable.rb[0m
            |   |       |   |-- [00mbuilder.rb[0m
            |   |       |   |-- [01;34mcache[0m
            |   |       |   |   |-- [00mfile_store.rb[0m
            |   |       |   |   |-- [00mmem_cache_store.rb[0m
            |   |       |   |   |-- [00mmemory_store.rb[0m
            |   |       |   |   |-- [00mnull_store.rb[0m
            |   |       |   |   |-- [00mredis_cache_store.rb[0m
            |   |       |   |   `-- [01;34mstrategy[0m
            |   |       |   |       |-- [00mlocal_cache.rb[0m
            |   |       |   |       `-- [00mlocal_cache_middleware.rb[0m
            |   |       |   |-- [00mcache.rb[0m
            |   |       |   |-- [00mcallbacks.rb[0m
            |   |       |   |-- [00mcode_generator.rb[0m
            |   |       |   |-- [00mconcern.rb[0m
            |   |       |   |-- [01;34mconcurrency[0m
            |   |       |   |   |-- [00mload_interlock_aware_monitor.rb[0m
            |   |       |   |   `-- [00mshare_lock.rb[0m
            |   |       |   |-- [00mconfigurable.rb[0m
            |   |       |   |-- [00mconfiguration_file.rb[0m
            |   |       |   |-- [01;34mcore_ext[0m
            |   |       |   |   |-- [01;34marray[0m
            |   |       |   |   |   |-- [00maccess.rb[0m
            |   |       |   |   |   |-- [00mconversions.rb[0m
            |   |       |   |   |   |-- [00mdeprecated_conversions.rb[0m
            |   |       |   |   |   |-- [00mextract.rb[0m
            |   |       |   |   |   |-- [00mextract_options.rb[0m
            |   |       |   |   |   |-- [00mgrouping.rb[0m
            |   |       |   |   |   |-- [00minquiry.rb[0m
            |   |       |   |   |   `-- [00mwrap.rb[0m
            |   |       |   |   |-- [00marray.rb[0m
            |   |       |   |   |-- [00mbenchmark.rb[0m
            |   |       |   |   |-- [01;34mbig_decimal[0m
            |   |       |   |   |   `-- [00mconversions.rb[0m
            |   |       |   |   |-- [00mbig_decimal.rb[0m
            |   |       |   |   |-- [01;34mclass[0m
            |   |       |   |   |   |-- [00mattribute.rb[0m
            |   |       |   |   |   |-- [00mattribute_accessors.rb[0m
            |   |       |   |   |   `-- [00msubclasses.rb[0m
            |   |       |   |   |-- [00mclass.rb[0m
            |   |       |   |   |-- [01;34mdate[0m
            |   |       |   |   |   |-- [00macts_like.rb[0m
            |   |       |   |   |   |-- [00mblank.rb[0m
            |   |       |   |   |   |-- [00mcalculations.rb[0m
            |   |       |   |   |   |-- [00mconversions.rb[0m
            |   |       |   |   |   |-- [00mdeprecated_conversions.rb[0m
            |   |       |   |   |   `-- [00mzones.rb[0m
            |   |       |   |   |-- [00mdate.rb[0m
            |   |       |   |   |-- [01;34mdate_and_time[0m
            |   |       |   |   |   |-- [00mcalculations.rb[0m
            |   |       |   |   |   |-- [00mcompatibility.rb[0m
            |   |       |   |   |   `-- [00mzones.rb[0m
            |   |       |   |   |-- [01;34mdate_time[0m
            |   |       |   |   |   |-- [00macts_like.rb[0m
            |   |       |   |   |   |-- [00mblank.rb[0m
            |   |       |   |   |   |-- [00mcalculations.rb[0m
            |   |       |   |   |   |-- [00mcompatibility.rb[0m
            |   |       |   |   |   |-- [00mconversions.rb[0m
            |   |       |   |   |   `-- [00mdeprecated_conversions.rb[0m
            |   |       |   |   |-- [00mdate_time.rb[0m
            |   |       |   |   |-- [01;34mdigest[0m
            |   |       |   |   |   `-- [00muuid.rb[0m
            |   |       |   |   |-- [00mdigest.rb[0m
            |   |       |   |   |-- [00menumerable.rb[0m
            |   |       |   |   |-- [01;34mfile[0m
            |   |       |   |   |   `-- [00matomic.rb[0m
            |   |       |   |   |-- [00mfile.rb[0m
            |   |       |   |   |-- [01;34mhash[0m
            |   |       |   |   |   |-- [00mconversions.rb[0m
            |   |       |   |   |   |-- [00mdeep_merge.rb[0m
            |   |       |   |   |   |-- [00mdeep_transform_values.rb[0m
            |   |       |   |   |   |-- [00mexcept.rb[0m
            |   |       |   |   |   |-- [00mindifferent_access.rb[0m
            |   |       |   |   |   |-- [00mkeys.rb[0m
            |   |       |   |   |   |-- [00mreverse_merge.rb[0m
            |   |       |   |   |   `-- [00mslice.rb[0m
            |   |       |   |   |-- [00mhash.rb[0m
            |   |       |   |   |-- [01;34minteger[0m
            |   |       |   |   |   |-- [00minflections.rb[0m
            |   |       |   |   |   |-- [00mmultiple.rb[0m
            |   |       |   |   |   `-- [00mtime.rb[0m
            |   |       |   |   |-- [00minteger.rb[0m
            |   |       |   |   |-- [01;34mkernel[0m
            |   |       |   |   |   |-- [00mconcern.rb[0m
            |   |       |   |   |   |-- [00mreporting.rb[0m
            |   |       |   |   |   `-- [00msingleton_class.rb[0m
            |   |       |   |   |-- [00mkernel.rb[0m
            |   |       |   |   |-- [00mload_error.rb[0m
            |   |       |   |   |-- [01;34mmodule[0m
            |   |       |   |   |   |-- [00maliasing.rb[0m
            |   |       |   |   |   |-- [00manonymous.rb[0m
            |   |       |   |   |   |-- [00mattr_internal.rb[0m
            |   |       |   |   |   |-- [00mattribute_accessors.rb[0m
            |   |       |   |   |   |-- [00mattribute_accessors_per_thread.rb[0m
            |   |       |   |   |   |-- [00mconcerning.rb[0m
            |   |       |   |   |   |-- [00mdelegation.rb[0m
            |   |       |   |   |   |-- [00mdeprecation.rb[0m
            |   |       |   |   |   |-- [00mintrospection.rb[0m
            |   |       |   |   |   |-- [00mredefine_method.rb[0m
            |   |       |   |   |   `-- [00mremove_method.rb[0m
            |   |       |   |   |-- [00mmodule.rb[0m
            |   |       |   |   |-- [00mname_error.rb[0m
            |   |       |   |   |-- [01;34mnumeric[0m
            |   |       |   |   |   |-- [00mbytes.rb[0m
            |   |       |   |   |   |-- [00mconversions.rb[0m
            |   |       |   |   |   |-- [00mdeprecated_conversions.rb[0m
            |   |       |   |   |   `-- [00mtime.rb[0m
            |   |       |   |   |-- [00mnumeric.rb[0m
            |   |       |   |   |-- [01;34mobject[0m
            |   |       |   |   |   |-- [00macts_like.rb[0m
            |   |       |   |   |   |-- [00mblank.rb[0m
            |   |       |   |   |   |-- [00mconversions.rb[0m
            |   |       |   |   |   |-- [00mdeep_dup.rb[0m
            |   |       |   |   |   |-- [00mduplicable.rb[0m
            |   |       |   |   |   |-- [00minclusion.rb[0m
            |   |       |   |   |   |-- [00minstance_variables.rb[0m
            |   |       |   |   |   |-- [00mjson.rb[0m
            |   |       |   |   |   |-- [00mto_param.rb[0m
            |   |       |   |   |   |-- [00mto_query.rb[0m
            |   |       |   |   |   |-- [00mtry.rb[0m
            |   |       |   |   |   `-- [00mwith_options.rb[0m
            |   |       |   |   |-- [00mobject.rb[0m
            |   |       |   |   |-- [01;34mpathname[0m
            |   |       |   |   |   `-- [00mexistence.rb[0m
            |   |       |   |   |-- [00mpathname.rb[0m
            |   |       |   |   |-- [01;34mrange[0m
            |   |       |   |   |   |-- [00mcompare_range.rb[0m
            |   |       |   |   |   |-- [00mconversions.rb[0m
            |   |       |   |   |   |-- [00mdeprecated_conversions.rb[0m
            |   |       |   |   |   |-- [00meach.rb[0m
            |   |       |   |   |   |-- [00minclude_time_with_zone.rb[0m
            |   |       |   |   |   `-- [00moverlaps.rb[0m
            |   |       |   |   |-- [00mrange.rb[0m
            |   |       |   |   |-- [00mregexp.rb[0m
            |   |       |   |   |-- [00msecurerandom.rb[0m
            |   |       |   |   |-- [01;34mstring[0m
            |   |       |   |   |   |-- [00maccess.rb[0m
            |   |       |   |   |   |-- [00mbehavior.rb[0m
            |   |       |   |   |   |-- [00mconversions.rb[0m
            |   |       |   |   |   |-- [00mexclude.rb[0m
            |   |       |   |   |   |-- [00mfilters.rb[0m
            |   |       |   |   |   |-- [00mindent.rb[0m
            |   |       |   |   |   |-- [00minflections.rb[0m
            |   |       |   |   |   |-- [00minquiry.rb[0m
            |   |       |   |   |   |-- [00mmultibyte.rb[0m
            |   |       |   |   |   |-- [00moutput_safety.rb[0m
            |   |       |   |   |   |-- [00mstarts_ends_with.rb[0m
            |   |       |   |   |   |-- [00mstrip.rb[0m
            |   |       |   |   |   `-- [00mzones.rb[0m
            |   |       |   |   |-- [00mstring.rb[0m
            |   |       |   |   |-- [01;34msymbol[0m
            |   |       |   |   |   `-- [00mstarts_ends_with.rb[0m
            |   |       |   |   |-- [00msymbol.rb[0m
            |   |       |   |   |-- [01;34mtime[0m
            |   |       |   |   |   |-- [00macts_like.rb[0m
            |   |       |   |   |   |-- [00mcalculations.rb[0m
            |   |       |   |   |   |-- [00mcompatibility.rb[0m
            |   |       |   |   |   |-- [00mconversions.rb[0m
            |   |       |   |   |   |-- [00mdeprecated_conversions.rb[0m
            |   |       |   |   |   `-- [00mzones.rb[0m
            |   |       |   |   |-- [00mtime.rb[0m
            |   |       |   |   `-- [00muri.rb[0m
            |   |       |   |-- [00mcore_ext.rb[0m
            |   |       |   |-- [01;34mcurrent_attributes[0m
            |   |       |   |   `-- [00mtest_helper.rb[0m
            |   |       |   |-- [00mcurrent_attributes.rb[0m
            |   |       |   |-- [01;34mdependencies[0m
            |   |       |   |   |-- [00mautoload.rb[0m
            |   |       |   |   |-- [00minterlock.rb[0m
            |   |       |   |   `-- [00mrequire_dependency.rb[0m
            |   |       |   |-- [00mdependencies.rb[0m
            |   |       |   |-- [01;34mdeprecation[0m
            |   |       |   |   |-- [00mbehaviors.rb[0m
            |   |       |   |   |-- [00mconstant_accessor.rb[0m
            |   |       |   |   |-- [00mdisallowed.rb[0m
            |   |       |   |   |-- [00minstance_delegator.rb[0m
            |   |       |   |   |-- [00mmethod_wrappers.rb[0m
            |   |       |   |   |-- [00mproxy_wrappers.rb[0m
            |   |       |   |   `-- [00mreporting.rb[0m
            |   |       |   |-- [00mdeprecation.rb[0m
            |   |       |   |-- [00mdescendants_tracker.rb[0m
            |   |       |   |-- [00mdigest.rb[0m
            |   |       |   |-- [01;34mduration[0m
            |   |       |   |   |-- [00miso8601_parser.rb[0m
            |   |       |   |   `-- [00miso8601_serializer.rb[0m
            |   |       |   |-- [00mduration.rb[0m
            |   |       |   |-- [00mencrypted_configuration.rb[0m
            |   |       |   |-- [00mencrypted_file.rb[0m
            |   |       |   |-- [00menvironment_inquirer.rb[0m
            |   |       |   |-- [00merror_reporter.rb[0m
            |   |       |   |-- [00mevented_file_update_checker.rb[0m
            |   |       |   |-- [01;34mexecution_context[0m
            |   |       |   |   `-- [00mtest_helper.rb[0m
            |   |       |   |-- [00mexecution_context.rb[0m
            |   |       |   |-- [00mexecution_wrapper.rb[0m
            |   |       |   |-- [01;34mexecutor[0m
            |   |       |   |   `-- [00mtest_helper.rb[0m
            |   |       |   |-- [00mexecutor.rb[0m
            |   |       |   |-- [00mfile_update_checker.rb[0m
            |   |       |   |-- [00mfork_tracker.rb[0m
            |   |       |   |-- [00mgem_version.rb[0m
            |   |       |   |-- [00mgzip.rb[0m
            |   |       |   |-- [00mhash_with_indifferent_access.rb[0m
            |   |       |   |-- [00mhtml_safe_translation.rb[0m
            |   |       |   |-- [00mi18n.rb[0m
            |   |       |   |-- [00mi18n_railtie.rb[0m
            |   |       |   |-- [00minflections.rb[0m
            |   |       |   |-- [01;34minflector[0m
            |   |       |   |   |-- [00minflections.rb[0m
            |   |       |   |   |-- [00mmethods.rb[0m
            |   |       |   |   `-- [00mtransliterate.rb[0m
            |   |       |   |-- [00minflector.rb[0m
            |   |       |   |-- [00misolated_execution_state.rb[0m
            |   |       |   |-- [01;34mjson[0m
            |   |       |   |   |-- [00mdecoding.rb[0m
            |   |       |   |   `-- [00mencoding.rb[0m
            |   |       |   |-- [00mjson.rb[0m
            |   |       |   |-- [00mkey_generator.rb[0m
            |   |       |   |-- [00mlazy_load_hooks.rb[0m
            |   |       |   |-- [01;34mlocale[0m
            |   |       |   |   |-- [00men.rb[0m
            |   |       |   |   `-- [00men.yml[0m
            |   |       |   |-- [01;34mlog_subscriber[0m
            |   |       |   |   `-- [00mtest_helper.rb[0m
            |   |       |   |-- [00mlog_subscriber.rb[0m
            |   |       |   |-- [00mlogger.rb[0m
            |   |       |   |-- [00mlogger_silence.rb[0m
            |   |       |   |-- [00mlogger_thread_safe_level.rb[0m
            |   |       |   |-- [00mmessage_encryptor.rb[0m
            |   |       |   |-- [00mmessage_verifier.rb[0m
            |   |       |   |-- [01;34mmessages[0m
            |   |       |   |   |-- [00mmetadata.rb[0m
            |   |       |   |   |-- [00mrotation_configuration.rb[0m
            |   |       |   |   `-- [00mrotator.rb[0m
            |   |       |   |-- [01;34mmultibyte[0m
            |   |       |   |   |-- [00mchars.rb[0m
            |   |       |   |   `-- [00municode.rb[0m
            |   |       |   |-- [00mmultibyte.rb[0m
            |   |       |   |-- [01;34mnotifications[0m
            |   |       |   |   |-- [00mfanout.rb[0m
            |   |       |   |   `-- [00minstrumenter.rb[0m
            |   |       |   |-- [00mnotifications.rb[0m
            |   |       |   |-- [01;34mnumber_helper[0m
            |   |       |   |   |-- [00mnumber_converter.rb[0m
            |   |       |   |   |-- [00mnumber_to_currency_converter.rb[0m
            |   |       |   |   |-- [00mnumber_to_delimited_converter.rb[0m
            |   |       |   |   |-- [00mnumber_to_human_converter.rb[0m
            |   |       |   |   |-- [00mnumber_to_human_size_converter.rb[0m
            |   |       |   |   |-- [00mnumber_to_percentage_converter.rb[0m
            |   |       |   |   |-- [00mnumber_to_phone_converter.rb[0m
            |   |       |   |   |-- [00mnumber_to_rounded_converter.rb[0m
            |   |       |   |   `-- [00mrounding_helper.rb[0m
            |   |       |   |-- [00mnumber_helper.rb[0m
            |   |       |   |-- [00moption_merger.rb[0m
            |   |       |   |-- [00mordered_hash.rb[0m
            |   |       |   |-- [00mordered_options.rb[0m
            |   |       |   |-- [00mparameter_filter.rb[0m
            |   |       |   |-- [00mper_thread_registry.rb[0m
            |   |       |   |-- [00mproxy_object.rb[0m
            |   |       |   |-- [00mrails.rb[0m
            |   |       |   |-- [00mrailtie.rb[0m
            |   |       |   |-- [00mreloader.rb[0m
            |   |       |   |-- [00mrescuable.rb[0m
            |   |       |   |-- [00mruby_features.rb[0m
            |   |       |   |-- [00msecure_compare_rotator.rb[0m
            |   |       |   |-- [00msecurity_utils.rb[0m
            |   |       |   |-- [00mstring_inquirer.rb[0m
            |   |       |   |-- [00msubscriber.rb[0m
            |   |       |   |-- [00mtagged_logging.rb[0m
            |   |       |   |-- [00mtest_case.rb[0m
            |   |       |   |-- [01;34mtesting[0m
            |   |       |   |   |-- [00massertions.rb[0m
            |   |       |   |   |-- [00mautorun.rb[0m
            |   |       |   |   |-- [00mconstant_lookup.rb[0m
            |   |       |   |   |-- [00mdeclarative.rb[0m
            |   |       |   |   |-- [00mdeprecation.rb[0m
            |   |       |   |   |-- [00mfile_fixtures.rb[0m
            |   |       |   |   |-- [00misolation.rb[0m
            |   |       |   |   |-- [00mmethod_call_assertions.rb[0m
            |   |       |   |   |-- [01;34mparallelization[0m
            |   |       |   |   |   |-- [00mserver.rb[0m
            |   |       |   |   |   `-- [00mworker.rb[0m
            |   |       |   |   |-- [00mparallelization.rb[0m
            |   |       |   |   |-- [00mparallelize_executor.rb[0m
            |   |       |   |   |-- [00msetup_and_teardown.rb[0m
            |   |       |   |   |-- [00mstream.rb[0m
            |   |       |   |   |-- [00mtagged_logging.rb[0m
            |   |       |   |   `-- [00mtime_helpers.rb[0m
            |   |       |   |-- [00mtime.rb[0m
            |   |       |   |-- [00mtime_with_zone.rb[0m
            |   |       |   |-- [01;34mvalues[0m
            |   |       |   |   `-- [00mtime_zone.rb[0m
            |   |       |   |-- [00mversion.rb[0m
            |   |       |   |-- [01;34mxml_mini[0m
            |   |       |   |   |-- [00mjdom.rb[0m
            |   |       |   |   |-- [00mlibxml.rb[0m
            |   |       |   |   |-- [00mlibxmlsax.rb[0m
            |   |       |   |   |-- [00mnokogiri.rb[0m
            |   |       |   |   |-- [00mnokogirisax.rb[0m
            |   |       |   |   `-- [00mrexml.rb[0m
            |   |       |   `-- [00mxml_mini.rb[0m
            |   |       `-- [00mactive_support.rb[0m
            |   |-- [01;34maddressable-2.8.1[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mGemfile[0m
            |   |   |-- [00mLICENSE.txt[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [00mRakefile[0m
            |   |   |-- [01;34mdata[0m
            |   |   |   `-- [00municode.data[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34maddressable[0m
            |   |   |   |   |-- [01;34midna[0m
            |   |   |   |   |   |-- [00mnative.rb[0m
            |   |   |   |   |   `-- [00mpure.rb[0m
            |   |   |   |   |-- [00midna.rb[0m
            |   |   |   |   |-- [00mtemplate.rb[0m
            |   |   |   |   |-- [00muri.rb[0m
            |   |   |   |   `-- [00mversion.rb[0m
            |   |   |   `-- [00maddressable.rb[0m
            |   |   |-- [01;34mspec[0m
            |   |   |   |-- [01;34maddressable[0m
            |   |   |   |   |-- [00midna_spec.rb[0m
            |   |   |   |   |-- [00mnet_http_compat_spec.rb[0m
            |   |   |   |   |-- [00msecurity_spec.rb[0m
            |   |   |   |   |-- [00mtemplate_spec.rb[0m
            |   |   |   |   `-- [00muri_spec.rb[0m
            |   |   |   `-- [00mspec_helper.rb[0m
            |   |   `-- [01;34mtasks[0m
            |   |       |-- [00mclobber.rake[0m
            |   |       |-- [00mgem.rake[0m
            |   |       |-- [00mgit.rake[0m
            |   |       |-- [00mmetrics.rake[0m
            |   |       |-- [00mprofile.rake[0m
            |   |       |-- [00mrspec.rake[0m
            |   |       `-- [00myard.rake[0m
            |   |-- [01;34mbindex-0.8.1[0m
            |   |   |-- [00mCONTRIBUTING.md[0m
            |   |   |-- [00mGemfile[0m
            |   |   |-- [00mLICENSE.txt[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [00mRakefile[0m
            |   |   |-- [00mbindex.gemspec[0m
            |   |   |-- [01;34mext[0m
            |   |   |   `-- [01;34mskiptrace[0m
            |   |   |       |-- [00mMakefile[0m
            |   |   |       |-- [01;34mcom[0m
            |   |   |       |   `-- [01;34mgsamokovarov[0m
            |   |   |       |       `-- [01;34mskiptrace[0m
            |   |   |       |           |-- [00mBindingBuilder.java[0m
            |   |   |       |           |-- [00mCurrentBindingsIterator.java[0m
            |   |   |       |           |-- [00mJRubyIntegration.java[0m
            |   |   |       |           |-- [00mRubyBindingsCollector.java[0m
            |   |   |       |           |-- [00mSetExceptionBindingsEventHook.java[0m
            |   |   |       |           |-- [00mThreadContextInterfaceException.java[0m
            |   |   |       |           `-- [00mThreadContextInternals.java[0m
            |   |   |       |-- [00mcruby.c[0m
            |   |   |       |-- [00mcruby.o[0m
            |   |   |       |-- [01;32mcruby.so[0m
            |   |   |       `-- [00mextconf.rb[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [00mbindex.rb[0m
            |   |   |   |-- [01;34mskiptrace[0m
            |   |   |   |   |-- [00mbinding_ext.rb[0m
            |   |   |   |   |-- [00mbinding_locations.rb[0m
            |   |   |   |   |-- [00mexception_ext.rb[0m
            |   |   |   |   |-- [01;34minternal[0m
            |   |   |   |   |   |-- [01;32mcruby.so[0m
            |   |   |   |   |   |-- [00mjruby.rb[0m
            |   |   |   |   |   |-- [00mjruby_internals.jar[0m
            |   |   |   |   |   `-- [00mrubinius.rb[0m
            |   |   |   |   |-- [00mlocation.rb[0m
            |   |   |   |   `-- [00mversion.rb[0m
            |   |   |   `-- [00mskiptrace.rb[0m
            |   |   |-- [00mskiptrace.gemspec[0m
            |   |   `-- [01;34mtest[0m
            |   |       |-- [01;34mfixtures[0m
            |   |       |   |-- [00mbasic_nested_fixture.rb[0m
            |   |       |   |-- [00mcustom_error_fixture.rb[0m
            |   |       |   |-- [00meval_nested_fixture.rb[0m
            |   |       |   |-- [00mflat_fixture.rb[0m
            |   |       |   `-- [00mreraised_fixture.rb[0m
            |   |       |-- [01;34mskiptrace[0m
            |   |       |   |-- [00mcurrent_bindings_test.rb[0m
            |   |       |   |-- [00mexception_test.rb[0m
            |   |       |   `-- [00mlocation_test.rb[0m
            |   |       `-- [00mtest_helper.rb[0m
            |   |-- [01;34mbootsnap-1.16.0[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mLICENSE.txt[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [01;34mexe[0m
            |   |   |   `-- [01;32mbootsnap[0m
            |   |   |-- [01;34mext[0m
            |   |   |   `-- [01;34mbootsnap[0m
            |   |   |       |-- [00mMakefile[0m
            |   |   |       |-- [00mbootsnap.c[0m
            |   |   |       |-- [00mbootsnap.h[0m
            |   |   |       |-- [00mbootsnap.o[0m
            |   |   |       |-- [01;32mbootsnap.so[0m
            |   |   |       `-- [00mextconf.rb[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34mbootsnap[0m
            |   |       |   |-- [01;32mbootsnap.so[0m
            |   |       |   |-- [00mbundler.rb[0m
            |   |       |   |-- [01;34mcli[0m
            |   |       |   |   `-- [00mworker_pool.rb[0m
            |   |       |   |-- [00mcli.rb[0m
            |   |       |   |-- [01;34mcompile_cache[0m
            |   |       |   |   |-- [00miseq.rb[0m
            |   |       |   |   |-- [00mjson.rb[0m
            |   |       |   |   `-- [00myaml.rb[0m
            |   |       |   |-- [00mcompile_cache.rb[0m
            |   |       |   |-- [00mexplicit_require.rb[0m
            |   |       |   |-- [01;34mload_path_cache[0m
            |   |       |   |   |-- [00mcache.rb[0m
            |   |       |   |   |-- [00mchange_observer.rb[0m
            |   |       |   |   |-- [01;34mcore_ext[0m
            |   |       |   |   |   |-- [00mkernel_require.rb[0m
            |   |       |   |   |   `-- [00mloaded_features.rb[0m
            |   |       |   |   |-- [00mloaded_features_index.rb[0m
            |   |       |   |   |-- [00mpath.rb[0m
            |   |       |   |   |-- [00mpath_scanner.rb[0m
            |   |       |   |   `-- [00mstore.rb[0m
            |   |       |   |-- [00mload_path_cache.rb[0m
            |   |       |   |-- [00msetup.rb[0m
            |   |       |   `-- [00mversion.rb[0m
            |   |       `-- [00mbootsnap.rb[0m
            |   |-- [01;34mbuilder-3.2.4[0m
            |   |   |-- [00mCHANGES[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [00mRakefile[0m
            |   |   |-- [00mbuilder.blurb[0m
            |   |   |-- [00mbuilder.gemspec[0m
            |   |   |-- [01;34mdoc[0m
            |   |   |   |-- [00mjamis.rb[0m
            |   |   |   `-- [01;34mreleases[0m
            |   |   |       |-- [00mbuilder-1.2.4.rdoc[0m
            |   |   |       |-- [00mbuilder-2.0.0.rdoc[0m
            |   |   |       `-- [01;32mbuilder-2.1.1.rdoc[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [00mblankslate.rb[0m
            |   |   |   |-- [01;34mbuilder[0m
            |   |   |   |   |-- [00mblankslate.rb[0m
            |   |   |   |   |-- [00mversion.rb[0m
            |   |   |   |   |-- [00mxchar.rb[0m
            |   |   |   |   |-- [00mxmlbase.rb[0m
            |   |   |   |   |-- [00mxmlevents.rb[0m
            |   |   |   |   `-- [00mxmlmarkup.rb[0m
            |   |   |   `-- [00mbuilder.rb[0m
            |   |   |-- [01;34mrakelib[0m
            |   |   |   |-- [00mpublish.rake[0m
            |   |   |   |-- [00mtags.rake[0m
            |   |   |   `-- [00mtesting.rake[0m
            |   |   `-- [01;34mtest[0m
            |   |       |-- [00mhelper.rb[0m
            |   |       |-- [00mperformance.rb[0m
            |   |       |-- [00mpreload.rb[0m
            |   |       |-- [00mtest_blankslate.rb[0m
            |   |       |-- [00mtest_eventbuilder.rb[0m
            |   |       |-- [00mtest_markupbuilder.rb[0m
            |   |       |-- [00mtest_method_caching.rb[0m
            |   |       |-- [00mtest_namecollision.rb[0m
            |   |       `-- [00mtest_xchar.rb[0m
            |   |-- [01;34mcapybara-3.38.0[0m
            |   |   |-- [00mHistory.md[0m
            |   |   |-- [00mLicense.txt[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34mcapybara[0m
            |   |   |   |   |-- [00mconfig.rb[0m
            |   |   |   |   |-- [00mcucumber.rb[0m
            |   |   |   |   |-- [01;34mdriver[0m
            |   |   |   |   |   |-- [00mbase.rb[0m
            |   |   |   |   |   `-- [00mnode.rb[0m
            |   |   |   |   |-- [00mdsl.rb[0m
            |   |   |   |   |-- [00mhelpers.rb[0m
            |   |   |   |   |-- [01;34mminitest[0m
            |   |   |   |   |   `-- [00mspec.rb[0m
            |   |   |   |   |-- [00mminitest.rb[0m
            |   |   |   |   |-- [01;34mnode[0m
            |   |   |   |   |   |-- [00mactions.rb[0m
            |   |   |   |   |   |-- [00mbase.rb[0m
            |   |   |   |   |   |-- [00mdocument.rb[0m
            |   |   |   |   |   |-- [00mdocument_matchers.rb[0m
            |   |   |   |   |   |-- [00melement.rb[0m
            |   |   |   |   |   |-- [00mfinders.rb[0m
            |   |   |   |   |   |-- [00mmatchers.rb[0m
            |   |   |   |   |   `-- [00msimple.rb[0m
            |   |   |   |   |-- [01;34mqueries[0m
            |   |   |   |   |   |-- [00mactive_element_query.rb[0m
            |   |   |   |   |   |-- [00mancestor_query.rb[0m
            |   |   |   |   |   |-- [00mbase_query.rb[0m
            |   |   |   |   |   |-- [00mcurrent_path_query.rb[0m
            |   |   |   |   |   |-- [00mmatch_query.rb[0m
            |   |   |   |   |   |-- [00mselector_query.rb[0m
            |   |   |   |   |   |-- [00msibling_query.rb[0m
            |   |   |   |   |   |-- [00mstyle_query.rb[0m
            |   |   |   |   |   |-- [00mtext_query.rb[0m
            |   |   |   |   |   `-- [00mtitle_query.rb[0m
            |   |   |   |   |-- [01;34mrack_test[0m
            |   |   |   |   |   |-- [00mbrowser.rb[0m
            |   |   |   |   |   |-- [00mcss_handlers.rb[0m
            |   |   |   |   |   |-- [00mdriver.rb[0m
            |   |   |   |   |   |-- [00merrors.rb[0m
            |   |   |   |   |   |-- [00mform.rb[0m
            |   |   |   |   |   `-- [00mnode.rb[0m
            |   |   |   |   |-- [00mrails.rb[0m
            |   |   |   |   |-- [00mregistration_container.rb[0m
            |   |   |   |   |-- [01;34mregistrations[0m
            |   |   |   |   |   |-- [00mdrivers.rb[0m
            |   |   |   |   |   |-- [01;34mpatches[0m
            |   |   |   |   |   |   `-- [00mpuma_ssl.rb[0m
            |   |   |   |   |   `-- [00mservers.rb[0m
            |   |   |   |   |-- [00mresult.rb[0m
            |   |   |   |   |-- [01;34mrspec[0m
            |   |   |   |   |   |-- [00mfeatures.rb[0m
            |   |   |   |   |   |-- [00mmatcher_proxies.rb[0m
            |   |   |   |   |   |-- [01;34mmatchers[0m
            |   |   |   |   |   |   |-- [00mbase.rb[0m
            |   |   |   |   |   |   |-- [00mbecome_closed.rb[0m
            |   |   |   |   |   |   |-- [00mcompound.rb[0m
            |   |   |   |   |   |   |-- [00mcount_sugar.rb[0m
            |   |   |   |   |   |   |-- [00mhave_ancestor.rb[0m
            |   |   |   |   |   |   |-- [00mhave_current_path.rb[0m
            |   |   |   |   |   |   |-- [00mhave_selector.rb[0m
            |   |   |   |   |   |   |-- [00mhave_sibling.rb[0m
            |   |   |   |   |   |   |-- [00mhave_text.rb[0m
            |   |   |   |   |   |   |-- [00mhave_title.rb[0m
            |   |   |   |   |   |   |-- [00mmatch_selector.rb[0m
            |   |   |   |   |   |   |-- [00mmatch_style.rb[0m
            |   |   |   |   |   |   `-- [00mspatial_sugar.rb[0m
            |   |   |   |   |   `-- [00mmatchers.rb[0m
            |   |   |   |   |-- [00mrspec.rb[0m
            |   |   |   |   |-- [01;34mselector[0m
            |   |   |   |   |   |-- [01;34mbuilders[0m
            |   |   |   |   |   |   |-- [00mcss_builder.rb[0m
            |   |   |   |   |   |   `-- [00mxpath_builder.rb[0m
            |   |   |   |   |   |-- [00mcss.rb[0m
            |   |   |   |   |   |-- [01;34mdefinition[0m
            |   |   |   |   |   |   |-- [00mbutton.rb[0m
            |   |   |   |   |   |   |-- [00mcheckbox.rb[0m
            |   |   |   |   |   |   |-- [00mcss.rb[0m
            |   |   |   |   |   |   |-- [00mdatalist_input.rb[0m
            |   |   |   |   |   |   |-- [00mdatalist_option.rb[0m
            |   |   |   |   |   |   |-- [00melement.rb[0m
            |   |   |   |   |   |   |-- [00mfield.rb[0m
            |   |   |   |   |   |   |-- [00mfieldset.rb[0m
            |   |   |   |   |   |   |-- [00mfile_field.rb[0m
            |   |   |   |   |   |   |-- [00mfillable_field.rb[0m
            |   |   |   |   |   |   |-- [00mframe.rb[0m
            |   |   |   |   |   |   |-- [00mid.rb[0m
            |   |   |   |   |   |   |-- [00mlabel.rb[0m
            |   |   |   |   |   |   |-- [00mlink.rb[0m
            |   |   |   |   |   |   |-- [00mlink_or_button.rb[0m
            |   |   |   |   |   |   |-- [00moption.rb[0m
            |   |   |   |   |   |   |-- [00mradio_button.rb[0m
            |   |   |   |   |   |   |-- [00mselect.rb[0m
            |   |   |   |   |   |   |-- [00mtable.rb[0m
            |   |   |   |   |   |   |-- [00mtable_row.rb[0m
            |   |   |   |   |   |   `-- [00mxpath.rb[0m
            |   |   |   |   |   |-- [00mdefinition.rb[0m
            |   |   |   |   |   |-- [00mfilter.rb[0m
            |   |   |   |   |   |-- [00mfilter_set.rb[0m
            |   |   |   |   |   |-- [01;34mfilters[0m
            |   |   |   |   |   |   |-- [00mbase.rb[0m
            |   |   |   |   |   |   |-- [00mexpression_filter.rb[0m
            |   |   |   |   |   |   |-- [00mlocator_filter.rb[0m
            |   |   |   |   |   |   `-- [00mnode_filter.rb[0m
            |   |   |   |   |   |-- [00mregexp_disassembler.rb[0m
            |   |   |   |   |   |-- [00mselector.rb[0m
            |   |   |   |   |   `-- [00mxpath_extensions.rb[0m
            |   |   |   |   |-- [00mselector.rb[0m
            |   |   |   |   |-- [01;34mselenium[0m
            |   |   |   |   |   |-- [01;34matoms[0m
            |   |   |   |   |   |   |-- [00mgetAttribute.min.js[0m
            |   |   |   |   |   |   |-- [00misDisplayed.min.js[0m
            |   |   |   |   |   |   `-- [01;34msrc[0m
            |   |   |   |   |   |       |-- [00mgetAttribute.js[0m
            |   |   |   |   |   |       `-- [00misDisplayed.js[0m
            |   |   |   |   |   |-- [00mdriver.rb[0m
            |   |   |   |   |   |-- [01;34mdriver_specializations[0m
            |   |   |   |   |   |   |-- [00mchrome_driver.rb[0m
            |   |   |   |   |   |   |-- [00medge_driver.rb[0m
            |   |   |   |   |   |   |-- [00mfirefox_driver.rb[0m
            |   |   |   |   |   |   |-- [00minternet_explorer_driver.rb[0m
            |   |   |   |   |   |   `-- [00msafari_driver.rb[0m
            |   |   |   |   |   |-- [01;34mextensions[0m
            |   |   |   |   |   |   |-- [00mfile_input_click_emulation.rb[0m
            |   |   |   |   |   |   |-- [00mfind.rb[0m
            |   |   |   |   |   |   |-- [00mhtml5_drag.rb[0m
            |   |   |   |   |   |   |-- [00mmodifier_keys_stack.rb[0m
            |   |   |   |   |   |   `-- [00mscroll.rb[0m
            |   |   |   |   |   |-- [00mlogger_suppressor.rb[0m
            |   |   |   |   |   |-- [00mnode.rb[0m
            |   |   |   |   |   |-- [01;34mnodes[0m
            |   |   |   |   |   |   |-- [00mchrome_node.rb[0m
            |   |   |   |   |   |   |-- [00medge_node.rb[0m
            |   |   |   |   |   |   |-- [00mfirefox_node.rb[0m
            |   |   |   |   |   |   |-- [00mie_node.rb[0m
            |   |   |   |   |   |   `-- [00msafari_node.rb[0m
            |   |   |   |   |   `-- [01;34mpatches[0m
            |   |   |   |   |       |-- [00maction_pauser.rb[0m
            |   |   |   |   |       |-- [00matoms.rb[0m
            |   |   |   |   |       |-- [00mis_displayed.rb[0m
            |   |   |   |   |       |-- [00mlogs.rb[0m
            |   |   |   |   |       |-- [00mpause_duration_fix.rb[0m
            |   |   |   |   |       `-- [00mpersistent_client.rb[0m
            |   |   |   |   |-- [01;34mserver[0m
            |   |   |   |   |   |-- [00manimation_disabler.rb[0m
            |   |   |   |   |   |-- [00mchecker.rb[0m
            |   |   |   |   |   `-- [00mmiddleware.rb[0m
            |   |   |   |   |-- [00mserver.rb[0m
            |   |   |   |   |-- [01;34msession[0m
            |   |   |   |   |   |-- [00mconfig.rb[0m
            |   |   |   |   |   `-- [00mmatchers.rb[0m
            |   |   |   |   |-- [00msession.rb[0m
            |   |   |   |   |-- [01;34mspec[0m
            |   |   |   |   |   |-- [01;34mfixtures[0m
            |   |   |   |   |   |   |-- [00manother_test_file.txt[0m
            |   |   |   |   |   |   |-- [01;35mcapybara.jpg[0m
            |   |   |   |   |   |   |-- [00mno_extension[0m
            |   |   |   |   |   |   `-- [00mtest_file.txt[0m
            |   |   |   |   |   |-- [01;34mpublic[0m
            |   |   |   |   |   |   |-- [00mjquery-ui.js[0m
            |   |   |   |   |   |   |-- [00mjquery.js[0m
            |   |   |   |   |   |   |-- [00moffset.js[0m
            |   |   |   |   |   |   `-- [00mtest.js[0m
            |   |   |   |   |   |-- [01;34msession[0m
            |   |   |   |   |   |   |-- [00maccept_alert_spec.rb[0m
            |   |   |   |   |   |   |-- [00maccept_confirm_spec.rb[0m
            |   |   |   |   |   |   |-- [00maccept_prompt_spec.rb[0m
            |   |   |   |   |   |   |-- [00mactive_element_spec.rb[0m
            |   |   |   |   |   |   |-- [00mall_spec.rb[0m
            |   |   |   |   |   |   |-- [00mancestor_spec.rb[0m
            |   |   |   |   |   |   |-- [00massert_all_of_selectors_spec.rb[0m
            |   |   |   |   |   |   |-- [00massert_current_path_spec.rb[0m
            |   |   |   |   |   |   |-- [00massert_selector_spec.rb[0m
            |   |   |   |   |   |   |-- [00massert_style_spec.rb[0m
            |   |   |   |   |   |   |-- [00massert_text_spec.rb[0m
            |   |   |   |   |   |   |-- [00massert_title_spec.rb[0m
            |   |   |   |   |   |   |-- [00mattach_file_spec.rb[0m
            |   |   |   |   |   |   |-- [00mbody_spec.rb[0m
            |   |   |   |   |   |   |-- [00mcheck_spec.rb[0m
            |   |   |   |   |   |   |-- [00mchoose_spec.rb[0m
            |   |   |   |   |   |   |-- [00mclick_button_spec.rb[0m
            |   |   |   |   |   |   |-- [00mclick_link_or_button_spec.rb[0m
            |   |   |   |   |   |   |-- [00mclick_link_spec.rb[0m
            |   |   |   |   |   |   |-- [00mcurrent_scope_spec.rb[0m
            |   |   |   |   |   |   |-- [00mcurrent_url_spec.rb[0m
            |   |   |   |   |   |   |-- [00mdismiss_confirm_spec.rb[0m
            |   |   |   |   |   |   |-- [00mdismiss_prompt_spec.rb[0m
            |   |   |   |   |   |   |-- [01;34melement[0m
            |   |   |   |   |   |   |   |-- [00massert_match_selector_spec.rb[0m
            |   |   |   |   |   |   |   |-- [00mmatch_css_spec.rb[0m
            |   |   |   |   |   |   |   |-- [00mmatch_xpath_spec.rb[0m
            |   |   |   |   |   |   |   `-- [00mmatches_selector_spec.rb[0m
            |   |   |   |   |   |   |-- [00mevaluate_async_script_spec.rb[0m
            |   |   |   |   |   |   |-- [00mevaluate_script_spec.rb[0m
            |   |   |   |   |   |   |-- [00mexecute_script_spec.rb[0m
            |   |   |   |   |   |   |-- [00mfill_in_spec.rb[0m
            |   |   |   |   |   |   |-- [00mfind_button_spec.rb[0m
            |   |   |   |   |   |   |-- [00mfind_by_id_spec.rb[0m
            |   |   |   |   |   |   |-- [00mfind_field_spec.rb[0m
            |   |   |   |   |   |   |-- [00mfind_link_spec.rb[0m
            |   |   |   |   |   |   |-- [00mfind_spec.rb[0m
            |   |   |   |   |   |   |-- [00mfirst_spec.rb[0m
            |   |   |   |   |   |   |-- [01;34mframe[0m
            |   |   |   |   |   |   |   |-- [00mframe_title_spec.rb[0m
            |   |   |   |   |   |   |   |-- [00mframe_url_spec.rb[0m
            |   |   |   |   |   |   |   |-- [00mswitch_to_frame_spec.rb[0m
            |   |   |   |   |   |   |   `-- [00mwithin_frame_spec.rb[0m
            |   |   |   |   |   |   |-- [00mgo_back_spec.rb[0m
            |   |   |   |   |   |   |-- [00mgo_forward_spec.rb[0m
            |   |   |   |   |   |   |-- [00mhas_all_selectors_spec.rb[0m
            |   |   |   |   |   |   |-- [00mhas_ancestor_spec.rb[0m
            |   |   |   |   |   |   |-- [00mhas_any_selectors_spec.rb[0m
            |   |   |   |   |   |   |-- [00mhas_button_spec.rb[0m
            |   |   |   |   |   |   |-- [00mhas_css_spec.rb[0m
            |   |   |   |   |   |   |-- [00mhas_current_path_spec.rb[0m
            |   |   |   |   |   |   |-- [00mhas_field_spec.rb[0m
            |   |   |   |   |   |   |-- [00mhas_link_spec.rb[0m
            |   |   |   |   |   |   |-- [00mhas_none_selectors_spec.rb[0m
            |   |   |   |   |   |   |-- [00mhas_select_spec.rb[0m
            |   |   |   |   |   |   |-- [00mhas_selector_spec.rb[0m
            |   |   |   |   |   |   |-- [00mhas_sibling_spec.rb[0m
            |   |   |   |   |   |   |-- [00mhas_table_spec.rb[0m
            |   |   |   |   |   |   |-- [00mhas_text_spec.rb[0m
            |   |   |   |   |   |   |-- [00mhas_title_spec.rb[0m
            |   |   |   |   |   |   |-- [00mhas_xpath_spec.rb[0m
            |   |   |   |   |   |   |-- [00mheaders_spec.rb[0m
            |   |   |   |   |   |   |-- [00mhtml_spec.rb[0m
            |   |   |   |   |   |   |-- [00mmatches_style_spec.rb[0m
            |   |   |   |   |   |   |-- [00mnode_spec.rb[0m
            |   |   |   |   |   |   |-- [00mnode_wrapper_spec.rb[0m
            |   |   |   |   |   |   |-- [00mrefresh_spec.rb[0m
            |   |   |   |   |   |   |-- [00mreset_session_spec.rb[0m
            |   |   |   |   |   |   |-- [00mresponse_code_spec.rb[0m
            |   |   |   |   |   |   |-- [00msave_and_open_page_spec.rb[0m
            |   |   |   |   |   |   |-- [00msave_and_open_screenshot_spec.rb[0m
            |   |   |   |   |   |   |-- [00msave_page_spec.rb[0m
            |   |   |   |   |   |   |-- [00msave_screenshot_spec.rb[0m
            |   |   |   |   |   |   |-- [00mscreenshot_spec.rb[0m
            |   |   |   |   |   |   |-- [00mscroll_spec.rb[0m
            |   |   |   |   |   |   |-- [00mselect_spec.rb[0m
            |   |   |   |   |   |   |-- [00mselectors_spec.rb[0m
            |   |   |   |   |   |   |-- [00msibling_spec.rb[0m
            |   |   |   |   |   |   |-- [00mtext_spec.rb[0m
            |   |   |   |   |   |   |-- [00mtitle_spec.rb[0m
            |   |   |   |   |   |   |-- [00muncheck_spec.rb[0m
            |   |   |   |   |   |   |-- [00munselect_spec.rb[0m
            |   |   |   |   |   |   |-- [00mvisit_spec.rb[0m
            |   |   |   |   |   |   |-- [01;34mwindow[0m
            |   |   |   |   |   |   |   |-- [00mbecome_closed_spec.rb[0m
            |   |   |   |   |   |   |   |-- [00mcurrent_window_spec.rb[0m
            |   |   |   |   |   |   |   |-- [00mopen_new_window_spec.rb[0m
            |   |   |   |   |   |   |   |-- [00mswitch_to_window_spec.rb[0m
            |   |   |   |   |   |   |   |-- [00mwindow_opened_by_spec.rb[0m
            |   |   |   |   |   |   |   |-- [00mwindow_spec.rb[0m
            |   |   |   |   |   |   |   |-- [00mwindows_spec.rb[0m
            |   |   |   |   |   |   |   `-- [00mwithin_window_spec.rb[0m
            |   |   |   |   |   |   `-- [00mwithin_spec.rb[0m
            |   |   |   |   |   |-- [00mspec_helper.rb[0m
            |   |   |   |   |   |-- [00mtest_app.rb[0m
            |   |   |   |   |   `-- [01;34mviews[0m
            |   |   |   |   |       |-- [00manimated.erb[0m
            |   |   |   |   |       |-- [00mbuttons.erb[0m
            |   |   |   |   |       |-- [00mfieldsets.erb[0m
            |   |   |   |   |       |-- [00mform.erb[0m
            |   |   |   |   |       |-- [00mframe_child.erb[0m
            |   |   |   |   |       |-- [00mframe_one.erb[0m
            |   |   |   |   |       |-- [00mframe_parent.erb[0m
            |   |   |   |   |       |-- [00mframe_two.erb[0m
            |   |   |   |   |       |-- [00mheader_links.erb[0m
            |   |   |   |   |       |-- [00mhost_links.erb[0m
            |   |   |   |   |       |-- [00minitial_alert.erb[0m
            |   |   |   |   |       |-- [00mlayout.erb[0m
            |   |   |   |   |       |-- [00mobscured.erb[0m
            |   |   |   |   |       |-- [00moffset.erb[0m
            |   |   |   |   |       |-- [00mpath.erb[0m
            |   |   |   |   |       |-- [00mpopup_one.erb[0m
            |   |   |   |   |       |-- [00mpopup_two.erb[0m
            |   |   |   |   |       |-- [00mpostback.erb[0m
            |   |   |   |   |       |-- [00mreact.erb[0m
            |   |   |   |   |       |-- [00mscroll.erb[0m
            |   |   |   |   |       |-- [00mspatial.erb[0m
            |   |   |   |   |       |-- [00mtables.erb[0m
            |   |   |   |   |       |-- [00mwith_animation.erb[0m
            |   |   |   |   |       |-- [00mwith_base_tag.erb[0m
            |   |   |   |   |       |-- [00mwith_count.erb[0m
            |   |   |   |   |       |-- [00mwith_dragula.erb[0m
            |   |   |   |   |       |-- [00mwith_fixed_header_footer.erb[0m
            |   |   |   |   |       |-- [00mwith_hover.erb[0m
            |   |   |   |   |       |-- [00mwith_hover1.erb[0m
            |   |   |   |   |       |-- [00mwith_html.erb[0m
            |   |   |   |   |       |-- [00mwith_html5_svg.erb[0m
            |   |   |   |   |       |-- [00mwith_html_entities.erb[0m
            |   |   |   |   |       |-- [00mwith_jquery_animation.erb[0m
            |   |   |   |   |       |-- [00mwith_js.erb[0m
            |   |   |   |   |       |-- [00mwith_jstree.erb[0m
            |   |   |   |   |       |-- [00mwith_namespace.erb[0m
            |   |   |   |   |       |-- [00mwith_scope.erb[0m
            |   |   |   |   |       |-- [00mwith_scope_other.erb[0m
            |   |   |   |   |       |-- [00mwith_shadow.erb[0m
            |   |   |   |   |       |-- [00mwith_simple_html.erb[0m
            |   |   |   |   |       |-- [00mwith_slow_unload.erb[0m
            |   |   |   |   |       |-- [00mwith_sortable_js.erb[0m
            |   |   |   |   |       |-- [00mwith_unload_alert.erb[0m
            |   |   |   |   |       |-- [00mwith_windows.erb[0m
            |   |   |   |   |       `-- [00mwithin_frames.erb[0m
            |   |   |   |   |-- [00mversion.rb[0m
            |   |   |   |   `-- [00mwindow.rb[0m
            |   |   |   `-- [00mcapybara.rb[0m
            |   |   `-- [01;34mspec[0m
            |   |       |-- [00mbasic_node_spec.rb[0m
            |   |       |-- [00mcapybara_spec.rb[0m
            |   |       |-- [00mcounter_spec.rb[0m
            |   |       |-- [00mcss_builder_spec.rb[0m
            |   |       |-- [00mcss_splitter_spec.rb[0m
            |   |       |-- [00mdsl_spec.rb[0m
            |   |       |-- [00mfilter_set_spec.rb[0m
            |   |       |-- [01;34mfixtures[0m
            |   |       |   |-- [00mcapybara.csv[0m
            |   |       |   |-- [00mcertificate.pem[0m
            |   |       |   |-- [00mkey.pem[0m
            |   |       |   |-- [00mselenium_driver_rspec_failure.rb[0m
            |   |       |   `-- [00mselenium_driver_rspec_success.rb[0m
            |   |       |-- [00mminitest_spec.rb[0m
            |   |       |-- [00mminitest_spec_spec.rb[0m
            |   |       |-- [00mper_session_config_spec.rb[0m
            |   |       |-- [00mrack_test_spec.rb[0m
            |   |       |-- [00mregexp_dissassembler_spec.rb[0m
            |   |       |-- [00mresult_spec.rb[0m
            |   |       |-- [01;34mrspec[0m
            |   |       |   |-- [00mfeatures_spec.rb[0m
            |   |       |   |-- [00mscenarios_spec.rb[0m
            |   |       |   |-- [00mshared_spec_matchers.rb[0m
            |   |       |   `-- [00mviews_spec.rb[0m
            |   |       |-- [00mrspec_matchers_spec.rb[0m
            |   |       |-- [00mrspec_spec.rb[0m
            |   |       |-- [00msauce_spec_chrome.rb[0m
            |   |       |-- [00mselector_spec.rb[0m
            |   |       |-- [00mselenium_spec_chrome.rb[0m
            |   |       |-- [00mselenium_spec_chrome_remote.rb[0m
            |   |       |-- [00mselenium_spec_edge.rb[0m
            |   |       |-- [00mselenium_spec_firefox.rb[0m
            |   |       |-- [00mselenium_spec_firefox_remote.rb[0m
            |   |       |-- [00mselenium_spec_ie.rb[0m
            |   |       |-- [00mselenium_spec_safari.rb[0m
            |   |       |-- [00mserver_spec.rb[0m
            |   |       |-- [00msession_spec.rb[0m
            |   |       |-- [00mshared_selenium_node.rb[0m
            |   |       |-- [00mshared_selenium_session.rb[0m
            |   |       |-- [00mspec_helper.rb[0m
            |   |       `-- [00mxpath_builder_spec.rb[0m
            |   |-- [01;34mconcurrent-ruby-1.2.2[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mGemfile[0m
            |   |   |-- [00mLICENSE.txt[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [00mRakefile[0m
            |   |   |-- [01;34mext[0m
            |   |   |   `-- [01;34mconcurrent-ruby[0m
            |   |   |       |-- [00mConcurrentRubyService.java[0m
            |   |   |       `-- [01;34mcom[0m
            |   |   |           `-- [01;34mconcurrent_ruby[0m
            |   |   |               `-- [01;34mext[0m
            |   |   |                   |-- [00mAtomicReferenceLibrary.java[0m
            |   |   |                   |-- [00mJRubyMapBackendLibrary.java[0m
            |   |   |                   |-- [00mJavaAtomicBooleanLibrary.java[0m
            |   |   |                   |-- [00mJavaAtomicFixnumLibrary.java[0m
            |   |   |                   |-- [00mJavaSemaphoreLibrary.java[0m
            |   |   |                   |-- [00mSynchronizationLibrary.java[0m
            |   |   |                   |-- [01;34mjsr166e[0m
            |   |   |                   |   |-- [00mConcurrentHashMap.java[0m
            |   |   |                   |   |-- [00mConcurrentHashMapV8.java[0m
            |   |   |                   |   |-- [00mLongAdder.java[0m
            |   |   |                   |   |-- [00mStriped64.java[0m
            |   |   |                   |   `-- [01;34mnounsafe[0m
            |   |   |                   |       |-- [00mConcurrentHashMapV8.java[0m
            |   |   |                   |       |-- [00mLongAdder.java[0m
            |   |   |                   |       `-- [00mStriped64.java[0m
            |   |   |                   `-- [01;34mjsr166y[0m
            |   |   |                       `-- [00mThreadLocalRandom.java[0m
            |   |   `-- [01;34mlib[0m
            |   |       `-- [01;34mconcurrent-ruby[0m
            |   |           |-- [01;34mconcurrent[0m
            |   |           |   |-- [00magent.rb[0m
            |   |           |   |-- [00marray.rb[0m
            |   |           |   |-- [00masync.rb[0m
            |   |           |   |-- [00matom.rb[0m
            |   |           |   |-- [01;34matomic[0m
            |   |           |   |   |-- [00matomic_boolean.rb[0m
            |   |           |   |   |-- [00matomic_fixnum.rb[0m
            |   |           |   |   |-- [00matomic_markable_reference.rb[0m
            |   |           |   |   |-- [00matomic_reference.rb[0m
            |   |           |   |   |-- [00mcount_down_latch.rb[0m
            |   |           |   |   |-- [00mcyclic_barrier.rb[0m
            |   |           |   |   |-- [00mevent.rb[0m
            |   |           |   |   |-- [00mfiber_local_var.rb[0m
            |   |           |   |   |-- [00mjava_count_down_latch.rb[0m
            |   |           |   |   |-- [00mlocals.rb[0m
            |   |           |   |   |-- [00mlock_local_var.rb[0m
            |   |           |   |   |-- [00mmutex_atomic_boolean.rb[0m
            |   |           |   |   |-- [00mmutex_atomic_fixnum.rb[0m
            |   |           |   |   |-- [00mmutex_count_down_latch.rb[0m
            |   |           |   |   |-- [00mmutex_semaphore.rb[0m
            |   |           |   |   |-- [00mread_write_lock.rb[0m
            |   |           |   |   |-- [00mreentrant_read_write_lock.rb[0m
            |   |           |   |   |-- [00msemaphore.rb[0m
            |   |           |   |   `-- [00mthread_local_var.rb[0m
            |   |           |   |-- [01;34matomic_reference[0m
            |   |           |   |   |-- [00matomic_direct_update.rb[0m
            |   |           |   |   |-- [00mmutex_atomic.rb[0m
            |   |           |   |   `-- [00mnumeric_cas_wrapper.rb[0m
            |   |           |   |-- [00matomics.rb[0m
            |   |           |   |-- [01;34mcollection[0m
            |   |           |   |   |-- [00mcopy_on_notify_observer_set.rb[0m
            |   |           |   |   |-- [00mcopy_on_write_observer_set.rb[0m
            |   |           |   |   |-- [00mjava_non_concurrent_priority_queue.rb[0m
            |   |           |   |   |-- [00mlock_free_stack.rb[0m
            |   |           |   |   |-- [01;34mmap[0m
            |   |           |   |   |   |-- [00matomic_reference_map_backend.rb[0m
            |   |           |   |   |   |-- [00mmri_map_backend.rb[0m
            |   |           |   |   |   |-- [00mnon_concurrent_map_backend.rb[0m
            |   |           |   |   |   |-- [00msynchronized_map_backend.rb[0m
            |   |           |   |   |   `-- [00mtruffleruby_map_backend.rb[0m
            |   |           |   |   |-- [00mnon_concurrent_priority_queue.rb[0m
            |   |           |   |   `-- [00mruby_non_concurrent_priority_queue.rb[0m
            |   |           |   |-- [01;34mconcern[0m
            |   |           |   |   |-- [00mdeprecation.rb[0m
            |   |           |   |   |-- [00mdereferenceable.rb[0m
            |   |           |   |   |-- [00mlogging.rb[0m
            |   |           |   |   |-- [00mobligation.rb[0m
            |   |           |   |   `-- [00mobservable.rb[0m
            |   |           |   |-- [00mconcurrent_ruby.jar[0m
            |   |           |   |-- [00mconfiguration.rb[0m
            |   |           |   |-- [00mconstants.rb[0m
            |   |           |   |-- [00mdataflow.rb[0m
            |   |           |   |-- [00mdelay.rb[0m
            |   |           |   |-- [00merrors.rb[0m
            |   |           |   |-- [00mexchanger.rb[0m
            |   |           |   |-- [01;34mexecutor[0m
            |   |           |   |   |-- [00mabstract_executor_service.rb[0m
            |   |           |   |   |-- [00mcached_thread_pool.rb[0m
            |   |           |   |   |-- [00mexecutor_service.rb[0m
            |   |           |   |   |-- [00mfixed_thread_pool.rb[0m
            |   |           |   |   |-- [00mimmediate_executor.rb[0m
            |   |           |   |   |-- [00mindirect_immediate_executor.rb[0m
            |   |           |   |   |-- [00mjava_executor_service.rb[0m
            |   |           |   |   |-- [00mjava_single_thread_executor.rb[0m
            |   |           |   |   |-- [00mjava_thread_pool_executor.rb[0m
            |   |           |   |   |-- [00mruby_executor_service.rb[0m
            |   |           |   |   |-- [00mruby_single_thread_executor.rb[0m
            |   |           |   |   |-- [00mruby_thread_pool_executor.rb[0m
            |   |           |   |   |-- [00msafe_task_executor.rb[0m
            |   |           |   |   |-- [00mserial_executor_service.rb[0m
            |   |           |   |   |-- [00mserialized_execution.rb[0m
            |   |           |   |   |-- [00mserialized_execution_delegator.rb[0m
            |   |           |   |   |-- [00msimple_executor_service.rb[0m
            |   |           |   |   |-- [00msingle_thread_executor.rb[0m
            |   |           |   |   |-- [00mthread_pool_executor.rb[0m
            |   |           |   |   `-- [00mtimer_set.rb[0m
            |   |           |   |-- [00mexecutors.rb[0m
            |   |           |   |-- [00mfuture.rb[0m
            |   |           |   |-- [00mhash.rb[0m
            |   |           |   |-- [00mimmutable_struct.rb[0m
            |   |           |   |-- [00mivar.rb[0m
            |   |           |   |-- [00mmap.rb[0m
            |   |           |   |-- [00mmaybe.rb[0m
            |   |           |   |-- [00mmutable_struct.rb[0m
            |   |           |   |-- [00mmvar.rb[0m
            |   |           |   |-- [00moptions.rb[0m
            |   |           |   |-- [00mpromise.rb[0m
            |   |           |   |-- [00mpromises.rb[0m
            |   |           |   |-- [00mre_include.rb[0m
            |   |           |   |-- [00mscheduled_task.rb[0m
            |   |           |   |-- [00mset.rb[0m
            |   |           |   |-- [00msettable_struct.rb[0m
            |   |           |   |-- [01;34msynchronization[0m
            |   |           |   |   |-- [00mabstract_lockable_object.rb[0m
            |   |           |   |   |-- [00mabstract_object.rb[0m
            |   |           |   |   |-- [00mabstract_struct.rb[0m
            |   |           |   |   |-- [00mcondition.rb[0m
            |   |           |   |   |-- [00mfull_memory_barrier.rb[0m
            |   |           |   |   |-- [00mjruby_lockable_object.rb[0m
            |   |           |   |   |-- [00mlock.rb[0m
            |   |           |   |   |-- [00mlockable_object.rb[0m
            |   |           |   |   |-- [00mmutex_lockable_object.rb[0m
            |   |           |   |   |-- [00mobject.rb[0m
            |   |           |   |   |-- [00msafe_initialization.rb[0m
            |   |           |   |   `-- [00mvolatile.rb[0m
            |   |           |   |-- [00msynchronization.rb[0m
            |   |           |   |-- [01;34mthread_safe[0m
            |   |           |   |   |-- [00msynchronized_delegator.rb[0m
            |   |           |   |   |-- [01;34mutil[0m
            |   |           |   |   |   |-- [00madder.rb[0m
            |   |           |   |   |   |-- [00mcheap_lockable.rb[0m
            |   |           |   |   |   |-- [00mdata_structures.rb[0m
            |   |           |   |   |   |-- [00mpower_of_two_tuple.rb[0m
            |   |           |   |   |   |-- [00mstriped64.rb[0m
            |   |           |   |   |   |-- [00mvolatile.rb[0m
            |   |           |   |   |   `-- [00mxor_shift_random.rb[0m
            |   |           |   |   `-- [00mutil.rb[0m
            |   |           |   |-- [00mtimer_task.rb[0m
            |   |           |   |-- [00mtuple.rb[0m
            |   |           |   |-- [00mtvar.rb[0m
            |   |           |   |-- [01;34mutility[0m
            |   |           |   |   |-- [00mengine.rb[0m
            |   |           |   |   |-- [00mmonotonic_time.rb[0m
            |   |           |   |   |-- [00mnative_extension_loader.rb[0m
            |   |           |   |   |-- [00mnative_integer.rb[0m
            |   |           |   |   `-- [00mprocessor_counter.rb[0m
            |   |           |   `-- [00mversion.rb[0m
            |   |           |-- [00mconcurrent-ruby.rb[0m
            |   |           `-- [00mconcurrent.rb[0m
            |   |-- [01;34mcrass-1.0.6[0m
            |   |   |-- [00mGemfile[0m
            |   |   |-- [00mHISTORY.md[0m
            |   |   |-- [00mLICENSE[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [00mRakefile[0m
            |   |   |-- [00mcrass.gemspec[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34mcrass[0m
            |   |       |   |-- [00mparser.rb[0m
            |   |       |   |-- [00mscanner.rb[0m
            |   |       |   |-- [00mtoken-scanner.rb[0m
            |   |       |   |-- [00mtokenizer.rb[0m
            |   |       |   `-- [00mversion.rb[0m
            |   |       `-- [00mcrass.rb[0m
            |   |-- [01;34mdate-3.3.3[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [01;34mext[0m
            |   |   |   `-- [01;34mdate[0m
            |   |   |       |-- [00mMakefile[0m
            |   |   |       |-- [00mdate_core.c[0m
            |   |   |       |-- [00mdate_core.o[0m
            |   |   |       |-- [01;32mdate_core.so[0m
            |   |   |       |-- [00mdate_parse.c[0m
            |   |   |       |-- [00mdate_parse.o[0m
            |   |   |       |-- [00mdate_strftime.c[0m
            |   |   |       |-- [00mdate_strftime.o[0m
            |   |   |       |-- [00mdate_strptime.c[0m
            |   |   |       |-- [00mdate_strptime.o[0m
            |   |   |       |-- [00mdate_tmx.h[0m
            |   |   |       |-- [00mextconf.rb[0m
            |   |   |       |-- [00mprereq.mk[0m
            |   |   |       |-- [00mzonetab.h[0m
            |   |   |       `-- [00mzonetab.list[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [00mdate.rb[0m
            |   |       `-- [01;32mdate_core.so[0m
            |   |-- [01;34mdebug-1.7.1[0m
            |   |   |-- [00mCONTRIBUTING.md[0m
            |   |   |-- [00mGemfile[0m
            |   |   |-- [00mLICENSE.txt[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [00mRakefile[0m
            |   |   |-- [00mTODO.md[0m
            |   |   |-- [00mdebug.gemspec[0m
            |   |   |-- [01;34mexe[0m
            |   |   |   `-- [01;32mrdbg[0m
            |   |   |-- [01;34mext[0m
            |   |   |   `-- [01;34mdebug[0m
            |   |   |       |-- [00mMakefile[0m
            |   |   |       |-- [00mdebug.c[0m
            |   |   |       |-- [00mdebug.o[0m
            |   |   |       |-- [01;32mdebug.so[0m
            |   |   |       |-- [00mdebug_version.h[0m
            |   |   |       |-- [00mextconf.rb[0m
            |   |   |       |-- [00miseq_collector.c[0m
            |   |   |       `-- [00miseq_collector.o[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34mdebug[0m
            |   |   |   |   |-- [00mabbrev_command.rb[0m
            |   |   |   |   |-- [00mbreakpoint.rb[0m
            |   |   |   |   |-- [00mclient.rb[0m
            |   |   |   |   |-- [00mcolor.rb[0m
            |   |   |   |   |-- [00mconfig.rb[0m
            |   |   |   |   |-- [00mconsole.rb[0m
            |   |   |   |   |-- [01;32mdebug.so[0m
            |   |   |   |   |-- [00mframe_info.rb[0m
            |   |   |   |   |-- [00mlocal.rb[0m
            |   |   |   |   |-- [00mopen.rb[0m
            |   |   |   |   |-- [00mopen_nonstop.rb[0m
            |   |   |   |   |-- [00mprelude.rb[0m
            |   |   |   |   |-- [00mserver.rb[0m
            |   |   |   |   |-- [00mserver_cdp.rb[0m
            |   |   |   |   |-- [00mserver_dap.rb[0m
            |   |   |   |   |-- [00msession.rb[0m
            |   |   |   |   |-- [00msource_repository.rb[0m
            |   |   |   |   |-- [00mstart.rb[0m
            |   |   |   |   |-- [00mthread_client.rb[0m
            |   |   |   |   |-- [00mtracer.rb[0m
            |   |   |   |   `-- [00mversion.rb[0m
            |   |   |   `-- [00mdebug.rb[0m
            |   |   `-- [01;34mmisc[0m
            |   |       `-- [00mREADME.md.erb[0m
            |   |-- [01;34merubi-1.12.0[0m
            |   |   |-- [00mCHANGELOG[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.rdoc[0m
            |   |   |-- [00mRakefile[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34merubi[0m
            |   |       |   `-- [00mcapture_end.rb[0m
            |   |       `-- [00merubi.rb[0m
            |   |-- [01;34mglobalid-1.1.0[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.md[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34mglobal_id[0m
            |   |       |   |-- [00mfixture_set.rb[0m
            |   |       |   |-- [00mglobal_id.rb[0m
            |   |       |   |-- [00midentification.rb[0m
            |   |       |   |-- [00mlocator.rb[0m
            |   |       |   |-- [00mrailtie.rb[0m
            |   |       |   |-- [00msigned_global_id.rb[0m
            |   |       |   |-- [01;34muri[0m
            |   |       |   |   `-- [00mgid.rb[0m
            |   |       |   `-- [00mverifier.rb[0m
            |   |       |-- [00mglobal_id.rb[0m
            |   |       `-- [00mglobalid.rb[0m
            |   |-- [01;34mi18n-1.12.0[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.md[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34mi18n[0m
            |   |       |   |-- [01;34mbackend[0m
            |   |       |   |   |-- [00mbase.rb[0m
            |   |       |   |   |-- [00mcache.rb[0m
            |   |       |   |   |-- [00mcache_file.rb[0m
            |   |       |   |   |-- [00mcascade.rb[0m
            |   |       |   |   |-- [00mchain.rb[0m
            |   |       |   |   |-- [00mfallbacks.rb[0m
            |   |       |   |   |-- [00mflatten.rb[0m
            |   |       |   |   |-- [00mgettext.rb[0m
            |   |       |   |   |-- [00minterpolation_compiler.rb[0m
            |   |       |   |   |-- [00mkey_value.rb[0m
            |   |       |   |   |-- [00mlazy_loadable.rb[0m
            |   |       |   |   |-- [00mmemoize.rb[0m
            |   |       |   |   |-- [00mmetadata.rb[0m
            |   |       |   |   |-- [00mpluralization.rb[0m
            |   |       |   |   |-- [00msimple.rb[0m
            |   |       |   |   `-- [00mtransliterator.rb[0m
            |   |       |   |-- [00mbackend.rb[0m
            |   |       |   |-- [00mconfig.rb[0m
            |   |       |   |-- [00mexceptions.rb[0m
            |   |       |   |-- [01;34mgettext[0m
            |   |       |   |   |-- [00mhelpers.rb[0m
            |   |       |   |   `-- [00mpo_parser.rb[0m
            |   |       |   |-- [00mgettext.rb[0m
            |   |       |   |-- [01;34minterpolate[0m
            |   |       |   |   `-- [00mruby.rb[0m
            |   |       |   |-- [01;34mlocale[0m
            |   |       |   |   |-- [00mfallbacks.rb[0m
            |   |       |   |   |-- [01;34mtag[0m
            |   |       |   |   |   |-- [00mparents.rb[0m
            |   |       |   |   |   |-- [00mrfc4646.rb[0m
            |   |       |   |   |   `-- [00msimple.rb[0m
            |   |       |   |   `-- [00mtag.rb[0m
            |   |       |   |-- [00mlocale.rb[0m
            |   |       |   |-- [00mmiddleware.rb[0m
            |   |       |   |-- [01;34mtests[0m
            |   |       |   |   |-- [00mbasics.rb[0m
            |   |       |   |   |-- [00mdefaults.rb[0m
            |   |       |   |   |-- [00minterpolation.rb[0m
            |   |       |   |   |-- [00mlink.rb[0m
            |   |       |   |   |-- [01;34mlocalization[0m
            |   |       |   |   |   |-- [00mdate.rb[0m
            |   |       |   |   |   |-- [00mdate_time.rb[0m
            |   |       |   |   |   |-- [00mprocs.rb[0m
            |   |       |   |   |   `-- [00mtime.rb[0m
            |   |       |   |   |-- [00mlocalization.rb[0m
            |   |       |   |   |-- [00mlookup.rb[0m
            |   |       |   |   |-- [00mpluralization.rb[0m
            |   |       |   |   `-- [00mprocs.rb[0m
            |   |       |   |-- [00mtests.rb[0m
            |   |       |   |-- [00mutils.rb[0m
            |   |       |   `-- [00mversion.rb[0m
            |   |       `-- [00mi18n.rb[0m
            |   |-- [01;34mimportmap-rails-1.1.5[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [00mRakefile[0m
            |   |   |-- [01;34mapp[0m
            |   |   |   |-- [01;34massets[0m
            |   |   |   |   `-- [01;34mjavascripts[0m
            |   |   |   |       |-- [00mes-module-shims.js[0m
            |   |   |   |       |-- [00mes-module-shims.js.map[0m
            |   |   |   |       `-- [00mes-module-shims.min.js[0m
            |   |   |   `-- [01;34mhelpers[0m
            |   |   |       `-- [01;34mimportmap[0m
            |   |   |           `-- [00mimportmap_tags_helper.rb[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34mimportmap[0m
            |   |       |   |-- [00mcommands.rb[0m
            |   |       |   |-- [01;32mengine.rb[0m
            |   |       |   |-- [00mmap.rb[0m
            |   |       |   |-- [00mnpm.rb[0m
            |   |       |   |-- [00mpackager.rb[0m
            |   |       |   |-- [00mreloader.rb[0m
            |   |       |   `-- [00mversion.rb[0m
            |   |       |-- [00mimportmap-rails.rb[0m
            |   |       |-- [01;34minstall[0m
            |   |       |   |-- [01;34mbin[0m
            |   |       |   |   `-- [01;32mimportmap[0m
            |   |       |   |-- [01;34mconfig[0m
            |   |       |   |   `-- [00mimportmap.rb[0m
            |   |       |   `-- [00minstall.rb[0m
            |   |       |-- [00mshim.js[0m
            |   |       `-- [01;34mtasks[0m
            |   |           `-- [00mimportmap_tasks.rake[0m
            |   |-- [01;34mio-console-0.6.0[0m
            |   |   |-- [00mLICENSE.txt[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [01;34mext[0m
            |   |   |   `-- [01;34mio[0m
            |   |   |       `-- [01;34mconsole[0m
            |   |   |           |-- [00mMakefile[0m
            |   |   |           |-- [00mconsole.c[0m
            |   |   |           |-- [00mconsole.o[0m
            |   |   |           |-- [01;32mconsole.so[0m
            |   |   |           |-- [00mextconf.rb[0m
            |   |   |           `-- [00mwin32_vk.inc[0m
            |   |   `-- [01;34mlib[0m
            |   |       `-- [01;34mio[0m
            |   |           |-- [01;34mconsole[0m
            |   |           |   `-- [00msize.rb[0m
            |   |           `-- [01;32mconsole.so[0m
            |   |-- [01;34mirb-1.6.2[0m
            |   |   |-- [00mGemfile[0m
            |   |   |-- [00mLICENSE.txt[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [00mRakefile[0m
            |   |   |-- [01;34mbin[0m
            |   |   |   |-- [01;32mconsole[0m
            |   |   |   `-- [01;32msetup[0m
            |   |   |-- [01;34mdoc[0m
            |   |   |   `-- [01;34mirb[0m
            |   |   |       |-- [00mirb-tools.rd.ja[0m
            |   |   |       `-- [00mirb.rd.ja[0m
            |   |   |-- [01;34mexe[0m
            |   |   |   `-- [01;32mirb[0m
            |   |   |-- [00mirb.gemspec[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34mirb[0m
            |   |   |   |   |-- [01;34mcmd[0m
            |   |   |   |   |   |-- [00mbacktrace.rb[0m
            |   |   |   |   |   |-- [00mbreak.rb[0m
            |   |   |   |   |   |-- [00mcatch.rb[0m
            |   |   |   |   |   |-- [00mchws.rb[0m
            |   |   |   |   |   |-- [00mcontinue.rb[0m
            |   |   |   |   |   |-- [00mdebug.rb[0m
            |   |   |   |   |   |-- [00mdelete.rb[0m
            |   |   |   |   |   |-- [00medit.rb[0m
            |   |   |   |   |   |-- [00mfinish.rb[0m
            |   |   |   |   |   |-- [00mfork.rb[0m
            |   |   |   |   |   |-- [00mhelp.rb[0m
            |   |   |   |   |   |-- [00minfo.rb[0m
            |   |   |   |   |   |-- [00mirb_info.rb[0m
            |   |   |   |   |   |-- [00mload.rb[0m
            |   |   |   |   |   |-- [00mls.rb[0m
            |   |   |   |   |   |-- [00mmeasure.rb[0m
            |   |   |   |   |   |-- [00mnext.rb[0m
            |   |   |   |   |   |-- [00mnop.rb[0m
            |   |   |   |   |   |-- [00mpushws.rb[0m
            |   |   |   |   |   |-- [00mshow_cmds.rb[0m
            |   |   |   |   |   |-- [00mshow_source.rb[0m
            |   |   |   |   |   |-- [00mstep.rb[0m
            |   |   |   |   |   |-- [00msubirb.rb[0m
            |   |   |   |   |   `-- [00mwhereami.rb[0m
            |   |   |   |   |-- [00mcolor.rb[0m
            |   |   |   |   |-- [00mcolor_printer.rb[0m
            |   |   |   |   |-- [00mcompletion.rb[0m
            |   |   |   |   |-- [00mcontext.rb[0m
            |   |   |   |   |-- [00measter-egg.rb[0m
            |   |   |   |   |-- [01;34mext[0m
            |   |   |   |   |   |-- [00mchange-ws.rb[0m
            |   |   |   |   |   |-- [00mhistory.rb[0m
            |   |   |   |   |   |-- [00mloader.rb[0m
            |   |   |   |   |   |-- [00mmulti-irb.rb[0m
            |   |   |   |   |   |-- [00msave-history.rb[0m
            |   |   |   |   |   |-- [00mtracer.rb[0m
            |   |   |   |   |   |-- [00muse-loader.rb[0m
            |   |   |   |   |   `-- [00mworkspaces.rb[0m
            |   |   |   |   |-- [00mextend-command.rb[0m
            |   |   |   |   |-- [00mframe.rb[0m
            |   |   |   |   |-- [00mhelp.rb[0m
            |   |   |   |   |-- [00minit.rb[0m
            |   |   |   |   |-- [00minput-method.rb[0m
            |   |   |   |   |-- [00minspector.rb[0m
            |   |   |   |   |-- [01;34mlc[0m
            |   |   |   |   |   |-- [00merror.rb[0m
            |   |   |   |   |   |-- [00mhelp-message[0m
            |   |   |   |   |   `-- [01;34mja[0m
            |   |   |   |   |       |-- [00mencoding_aliases.rb[0m
            |   |   |   |   |       |-- [00merror.rb[0m
            |   |   |   |   |       `-- [00mhelp-message[0m
            |   |   |   |   |-- [00mlocale.rb[0m
            |   |   |   |   |-- [00mmagic-file.rb[0m
            |   |   |   |   |-- [00mnotifier.rb[0m
            |   |   |   |   |-- [00moutput-method.rb[0m
            |   |   |   |   |-- [00mruby-lex.rb[0m
            |   |   |   |   |-- [00mruby_logo.aa[0m
            |   |   |   |   |-- [00msrc_encoding.rb[0m
            |   |   |   |   |-- [00mversion.rb[0m
            |   |   |   |   |-- [00mworkspace.rb[0m
            |   |   |   |   |-- [00mws-for-case-2.rb[0m
            |   |   |   |   `-- [00mxmp.rb[0m
            |   |   |   `-- [00mirb.rb[0m
            |   |   `-- [01;34mman[0m
            |   |       `-- [00mirb.1[0m
            |   |-- [01;34mjbuilder-2.11.5[0m
            |   |   |-- [00mAppraisals[0m
            |   |   |-- [00mCONTRIBUTING.md[0m
            |   |   |-- [00mGemfile[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [00mRakefile[0m
            |   |   |-- [01;34mgemfiles[0m
            |   |   |   |-- [00mrails_5_0.gemfile[0m
            |   |   |   |-- [00mrails_5_1.gemfile[0m
            |   |   |   |-- [00mrails_5_2.gemfile[0m
            |   |   |   |-- [00mrails_6_0.gemfile[0m
            |   |   |   |-- [00mrails_6_1.gemfile[0m
            |   |   |   `-- [00mrails_head.gemfile[0m
            |   |   |-- [00mjbuilder.gemspec[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34mgenerators[0m
            |   |   |   |   `-- [01;34mrails[0m
            |   |   |   |       |-- [00mjbuilder_generator.rb[0m
            |   |   |   |       |-- [00mscaffold_controller_generator.rb[0m
            |   |   |   |       `-- [01;34mtemplates[0m
            |   |   |   |           |-- [00mapi_controller.rb[0m
            |   |   |   |           |-- [00mcontroller.rb[0m
            |   |   |   |           |-- [00mindex.json.jbuilder[0m
            |   |   |   |           |-- [00mpartial.json.jbuilder[0m
            |   |   |   |           `-- [00mshow.json.jbuilder[0m
            |   |   |   |-- [01;34mjbuilder[0m
            |   |   |   |   |-- [00mblank.rb[0m
            |   |   |   |   |-- [00mcollection_renderer.rb[0m
            |   |   |   |   |-- [00mdependency_tracker.rb[0m
            |   |   |   |   |-- [00merrors.rb[0m
            |   |   |   |   |-- [00mjbuilder.rb[0m
            |   |   |   |   |-- [00mjbuilder_template.rb[0m
            |   |   |   |   |-- [00mkey_formatter.rb[0m
            |   |   |   |   `-- [00mrailtie.rb[0m
            |   |   |   `-- [00mjbuilder.rb[0m
            |   |   `-- [01;34mtest[0m
            |   |       |-- [00mjbuilder_dependency_tracker_test.rb[0m
            |   |       |-- [00mjbuilder_generator_test.rb[0m
            |   |       |-- [00mjbuilder_template_test.rb[0m
            |   |       |-- [00mjbuilder_test.rb[0m
            |   |       |-- [00mscaffold_api_controller_generator_test.rb[0m
            |   |       |-- [00mscaffold_controller_generator_test.rb[0m
            |   |       `-- [00mtest_helper.rb[0m
            |   |-- [01;34mloofah-2.19.1[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mMIT-LICENSE.txt[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [00mSECURITY.md[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34mloofah[0m
            |   |       |   |-- [00melements.rb[0m
            |   |       |   |-- [00mhelpers.rb[0m
            |   |       |   |-- [01;34mhtml[0m
            |   |       |   |   |-- [00mdocument.rb[0m
            |   |       |   |   `-- [00mdocument_fragment.rb[0m
            |   |       |   |-- [01;34mhtml5[0m
            |   |       |   |   |-- [00mlibxml2_workarounds.rb[0m
            |   |       |   |   |-- [00msafelist.rb[0m
            |   |       |   |   `-- [00mscrub.rb[0m
            |   |       |   |-- [00minstance_methods.rb[0m
            |   |       |   |-- [00mmetahelpers.rb[0m
            |   |       |   |-- [00mscrubber.rb[0m
            |   |       |   |-- [00mscrubbers.rb[0m
            |   |       |   |-- [00mversion.rb[0m
            |   |       |   `-- [01;34mxml[0m
            |   |       |       |-- [00mdocument.rb[0m
            |   |       |       `-- [00mdocument_fragment.rb[0m
            |   |       `-- [00mloofah.rb[0m
            |   |-- [01;34mmail-2.8.1[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.md[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34mmail[0m
            |   |       |   |-- [00mattachments_list.rb[0m
            |   |       |   |-- [00mbody.rb[0m
            |   |       |   |-- [00mcheck_delivery_params.rb[0m
            |   |       |   |-- [00mconfiguration.rb[0m
            |   |       |   |-- [00mconstants.rb[0m
            |   |       |   |-- [01;34melements[0m
            |   |       |   |   |-- [00maddress.rb[0m
            |   |       |   |   |-- [00maddress_list.rb[0m
            |   |       |   |   |-- [00mcontent_disposition_element.rb[0m
            |   |       |   |   |-- [00mcontent_location_element.rb[0m
            |   |       |   |   |-- [00mcontent_transfer_encoding_element.rb[0m
            |   |       |   |   |-- [00mcontent_type_element.rb[0m
            |   |       |   |   |-- [00mdate_time_element.rb[0m
            |   |       |   |   |-- [00menvelope_from_element.rb[0m
            |   |       |   |   |-- [00mmessage_ids_element.rb[0m
            |   |       |   |   |-- [00mmime_version_element.rb[0m
            |   |       |   |   |-- [00mphrase_list.rb[0m
            |   |       |   |   `-- [00mreceived_element.rb[0m
            |   |       |   |-- [00melements.rb[0m
            |   |       |   |-- [01;34mencodings[0m
            |   |       |   |   |-- [00m7bit.rb[0m
            |   |       |   |   |-- [00m8bit.rb[0m
            |   |       |   |   |-- [00mbase64.rb[0m
            |   |       |   |   |-- [00mbinary.rb[0m
            |   |       |   |   |-- [00midentity.rb[0m
            |   |       |   |   |-- [00mquoted_printable.rb[0m
            |   |       |   |   |-- [00mtransfer_encoding.rb[0m
            |   |       |   |   `-- [00munix_to_unix.rb[0m
            |   |       |   |-- [00mencodings.rb[0m
            |   |       |   |-- [00menvelope.rb[0m
            |   |       |   |-- [00mfield.rb[0m
            |   |       |   |-- [00mfield_list.rb[0m
            |   |       |   |-- [01;34mfields[0m
            |   |       |   |   |-- [00mbcc_field.rb[0m
            |   |       |   |   |-- [00mcc_field.rb[0m
            |   |       |   |   |-- [00mcomments_field.rb[0m
            |   |       |   |   |-- [00mcommon_address_field.rb[0m
            |   |       |   |   |-- [00mcommon_date_field.rb[0m
            |   |       |   |   |-- [00mcommon_field.rb[0m
            |   |       |   |   |-- [00mcommon_message_id_field.rb[0m
            |   |       |   |   |-- [00mcontent_description_field.rb[0m
            |   |       |   |   |-- [00mcontent_disposition_field.rb[0m
            |   |       |   |   |-- [00mcontent_id_field.rb[0m
            |   |       |   |   |-- [00mcontent_location_field.rb[0m
            |   |       |   |   |-- [00mcontent_transfer_encoding_field.rb[0m
            |   |       |   |   |-- [00mcontent_type_field.rb[0m
            |   |       |   |   |-- [00mdate_field.rb[0m
            |   |       |   |   |-- [00mfrom_field.rb[0m
            |   |       |   |   |-- [00min_reply_to_field.rb[0m
            |   |       |   |   |-- [00mkeywords_field.rb[0m
            |   |       |   |   |-- [00mmessage_id_field.rb[0m
            |   |       |   |   |-- [00mmime_version_field.rb[0m
            |   |       |   |   |-- [00mnamed_structured_field.rb[0m
            |   |       |   |   |-- [00mnamed_unstructured_field.rb[0m
            |   |       |   |   |-- [00moptional_field.rb[0m
            |   |       |   |   |-- [00mparameter_hash.rb[0m
            |   |       |   |   |-- [00mreceived_field.rb[0m
            |   |       |   |   |-- [00mreferences_field.rb[0m
            |   |       |   |   |-- [00mreply_to_field.rb[0m
            |   |       |   |   |-- [00mresent_bcc_field.rb[0m
            |   |       |   |   |-- [00mresent_cc_field.rb[0m
            |   |       |   |   |-- [00mresent_date_field.rb[0m
            |   |       |   |   |-- [00mresent_from_field.rb[0m
            |   |       |   |   |-- [00mresent_message_id_field.rb[0m
            |   |       |   |   |-- [00mresent_sender_field.rb[0m
            |   |       |   |   |-- [00mresent_to_field.rb[0m
            |   |       |   |   |-- [00mreturn_path_field.rb[0m
            |   |       |   |   |-- [00msender_field.rb[0m
            |   |       |   |   |-- [00mstructured_field.rb[0m
            |   |       |   |   |-- [00msubject_field.rb[0m
            |   |       |   |   |-- [00mto_field.rb[0m
            |   |       |   |   `-- [00munstructured_field.rb[0m
            |   |       |   |-- [00mfields.rb[0m
            |   |       |   |-- [00mheader.rb[0m
            |   |       |   |-- [00mindifferent_hash.rb[0m
            |   |       |   |-- [00mmail.rb[0m
            |   |       |   |-- [01;34mmatchers[0m
            |   |       |   |   |-- [00mattachment_matchers.rb[0m
            |   |       |   |   `-- [00mhas_sent_mail.rb[0m
            |   |       |   |-- [00mmessage.rb[0m
            |   |       |   |-- [01;34mmultibyte[0m
            |   |       |   |   |-- [00mchars.rb[0m
            |   |       |   |   |-- [00municode.rb[0m
            |   |       |   |   `-- [00mutils.rb[0m
            |   |       |   |-- [00mmultibyte.rb[0m
            |   |       |   |-- [01;34mnetwork[0m
            |   |       |   |   |-- [01;34mdelivery_methods[0m
            |   |       |   |   |   |-- [00mexim.rb[0m
            |   |       |   |   |   |-- [00mfile_delivery.rb[0m
            |   |       |   |   |   |-- [00mlogger_delivery.rb[0m
            |   |       |   |   |   |-- [00msendmail.rb[0m
            |   |       |   |   |   |-- [00msmtp.rb[0m
            |   |       |   |   |   |-- [00msmtp_connection.rb[0m
            |   |       |   |   |   `-- [00mtest_mailer.rb[0m
            |   |       |   |   `-- [01;34mretriever_methods[0m
            |   |       |   |       |-- [00mbase.rb[0m
            |   |       |   |       |-- [00mimap.rb[0m
            |   |       |   |       |-- [00mpop3.rb[0m
            |   |       |   |       `-- [00mtest_retriever.rb[0m
            |   |       |   |-- [00mnetwork.rb[0m
            |   |       |   |-- [00mparser_tools.rb[0m
            |   |       |   |-- [01;34mparsers[0m
            |   |       |   |   |-- [00maddress_lists_parser.rb[0m
            |   |       |   |   |-- [00maddress_lists_parser.rl[0m
            |   |       |   |   |-- [00mcontent_disposition_parser.rb[0m
            |   |       |   |   |-- [00mcontent_disposition_parser.rl[0m
            |   |       |   |   |-- [00mcontent_location_parser.rb[0m
            |   |       |   |   |-- [00mcontent_location_parser.rl[0m
            |   |       |   |   |-- [00mcontent_transfer_encoding_parser.rb[0m
            |   |       |   |   |-- [00mcontent_transfer_encoding_parser.rl[0m
            |   |       |   |   |-- [00mcontent_type_parser.rb[0m
            |   |       |   |   |-- [00mcontent_type_parser.rl[0m
            |   |       |   |   |-- [00mdate_time_parser.rb[0m
            |   |       |   |   |-- [00mdate_time_parser.rl[0m
            |   |       |   |   |-- [00menvelope_from_parser.rb[0m
            |   |       |   |   |-- [00menvelope_from_parser.rl[0m
            |   |       |   |   |-- [00mmessage_ids_parser.rb[0m
            |   |       |   |   |-- [00mmessage_ids_parser.rl[0m
            |   |       |   |   |-- [00mmime_version_parser.rb[0m
            |   |       |   |   |-- [00mmime_version_parser.rl[0m
            |   |       |   |   |-- [00mphrase_lists_parser.rb[0m
            |   |       |   |   |-- [00mphrase_lists_parser.rl[0m
            |   |       |   |   |-- [00mreceived_parser.rb[0m
            |   |       |   |   |-- [00mreceived_parser.rl[0m
            |   |       |   |   |-- [00mrfc2045_content_transfer_encoding.rl[0m
            |   |       |   |   |-- [00mrfc2045_content_type.rl[0m
            |   |       |   |   |-- [00mrfc2045_mime.rl[0m
            |   |       |   |   |-- [00mrfc2183_content_disposition.rl[0m
            |   |       |   |   |-- [00mrfc3629_utf8.rl[0m
            |   |       |   |   |-- [00mrfc5234_abnf_core_rules.rl[0m
            |   |       |   |   |-- [00mrfc5322.rl[0m
            |   |       |   |   |-- [00mrfc5322_address.rl[0m
            |   |       |   |   |-- [00mrfc5322_date_time.rl[0m
            |   |       |   |   `-- [00mrfc5322_lexical_tokens.rl[0m
            |   |       |   |-- [00mparsers.rb[0m
            |   |       |   |-- [00mpart.rb[0m
            |   |       |   |-- [00mparts_list.rb[0m
            |   |       |   |-- [00msmtp_envelope.rb[0m
            |   |       |   |-- [00mutilities.rb[0m
            |   |       |   |-- [01;34mvalues[0m
            |   |       |   |   `-- [00municode_tables.dat[0m
            |   |       |   |-- [00mversion.rb[0m
            |   |       |   `-- [00myaml.rb[0m
            |   |       `-- [00mmail.rb[0m
            |   |-- [01;34mmarcel-1.0.2[0m
            |   |   |-- [00mAPACHE-LICENSE[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.md[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34mmarcel[0m
            |   |       |   |-- [00mmagic.rb[0m
            |   |       |   |-- [01;34mmime_type[0m
            |   |       |   |   `-- [00mdefinitions.rb[0m
            |   |       |   |-- [00mmime_type.rb[0m
            |   |       |   |-- [00mtables.rb[0m
            |   |       |   `-- [00mversion.rb[0m
            |   |       `-- [00mmarcel.rb[0m
            |   |-- [01;34mmatrix-0.4.2[0m
            |   |   |-- [00mLICENSE.txt[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34mmatrix[0m
            |   |   |   |   |-- [00meigenvalue_decomposition.rb[0m
            |   |   |   |   |-- [00mlup_decomposition.rb[0m
            |   |   |   |   `-- [00mversion.rb[0m
            |   |   |   `-- [00mmatrix.rb[0m
            |   |   `-- [00mmatrix.gemspec[0m
            |   |-- [01;34mmethod_source-1.0.0[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mGemfile[0m
            |   |   |-- [00mLICENSE[0m
            |   |   |-- [00mREADME.markdown[0m
            |   |   |-- [00mRakefile[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34mmethod_source[0m
            |   |   |   |   |-- [00mcode_helpers.rb[0m
            |   |   |   |   |-- [00msource_location.rb[0m
            |   |   |   |   `-- [00mversion.rb[0m
            |   |   |   `-- [00mmethod_source.rb[0m
            |   |   |-- [00mmethod_source.gemspec[0m
            |   |   `-- [01;34mspec[0m
            |   |       |-- [01;34mmethod_source[0m
            |   |       |   `-- [00mcode_helpers_spec.rb[0m
            |   |       |-- [00mmethod_source_spec.rb[0m
            |   |       `-- [00mspec_helper.rb[0m
            |   |-- [01;34mmini_mime-1.1.2[0m
            |   |   |-- [00mCHANGELOG[0m
            |   |   |-- [00mCODE_OF_CONDUCT.md[0m
            |   |   |-- [00mGemfile[0m
            |   |   |-- [00mLICENSE.txt[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [00mRakefile[0m
            |   |   |-- [01;34mbench[0m
            |   |   |   `-- [00mbench.rb[0m
            |   |   |-- [01;34mbin[0m
            |   |   |   |-- [01;32mconsole[0m
            |   |   |   |-- [01;32mdb_pull_request[0m
            |   |   |   `-- [01;32msetup[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34mdb[0m
            |   |   |   |   |-- [00mcontent_type_mime.db[0m
            |   |   |   |   `-- [00mext_mime.db[0m
            |   |   |   |-- [01;34mmini_mime[0m
            |   |   |   |   `-- [00mversion.rb[0m
            |   |   |   `-- [00mmini_mime.rb[0m
            |   |   `-- [00mmini_mime.gemspec[0m
            |   |-- [01;34mminitest-5.17.0[0m
            |   |   |-- [00mHistory.rdoc[0m
            |   |   |-- [00mManifest.txt[0m
            |   |   |-- [00mREADME.rdoc[0m
            |   |   |-- [00mRakefile[0m
            |   |   |-- [00mdesign_rationale.rb[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34mhoe[0m
            |   |   |   |   `-- [00mminitest.rb[0m
            |   |   |   |-- [01;34mminitest[0m
            |   |   |   |   |-- [00massertions.rb[0m
            |   |   |   |   |-- [00mautorun.rb[0m
            |   |   |   |   |-- [00mbenchmark.rb[0m
            |   |   |   |   |-- [00mexpectations.rb[0m
            |   |   |   |   |-- [00mhell.rb[0m
            |   |   |   |   |-- [00mmock.rb[0m
            |   |   |   |   |-- [00mparallel.rb[0m
            |   |   |   |   |-- [00mpride.rb[0m
            |   |   |   |   |-- [00mpride_plugin.rb[0m
            |   |   |   |   |-- [00mspec.rb[0m
            |   |   |   |   |-- [00mtest.rb[0m
            |   |   |   |   |-- [00mtest_task.rb[0m
            |   |   |   |   `-- [00munit.rb[0m
            |   |   |   `-- [00mminitest.rb[0m
            |   |   `-- [01;34mtest[0m
            |   |       `-- [01;34mminitest[0m
            |   |           |-- [00mmetametameta.rb[0m
            |   |           |-- [00mtest_minitest_assertions.rb[0m
            |   |           |-- [00mtest_minitest_benchmark.rb[0m
            |   |           |-- [00mtest_minitest_mock.rb[0m
            |   |           |-- [00mtest_minitest_reporter.rb[0m
            |   |           |-- [00mtest_minitest_spec.rb[0m
            |   |           |-- [00mtest_minitest_test.rb[0m
            |   |           `-- [00mtest_minitest_test_task.rb[0m
            |   |-- [01;34mmsgpack-1.6.0[0m
            |   |   |-- [00mChangeLog[0m
            |   |   |-- [00mGemfile[0m
            |   |   |-- [00mLICENSE[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [00mRakefile[0m
            |   |   |-- [00mappveyor.yml[0m
            |   |   |-- [01;34mbench[0m
            |   |   |   `-- [00mbench.rb[0m
            |   |   |-- [01;34mbin[0m
            |   |   |   `-- [01;32mconsole[0m
            |   |   |-- [01;34mdoclib[0m
            |   |   |   |-- [01;34mmsgpack[0m
            |   |   |   |   |-- [00mbuffer.rb[0m
            |   |   |   |   |-- [00mcore_ext.rb[0m
            |   |   |   |   |-- [00merror.rb[0m
            |   |   |   |   |-- [00mextension_value.rb[0m
            |   |   |   |   |-- [00mfactory.rb[0m
            |   |   |   |   |-- [00mpacker.rb[0m
            |   |   |   |   |-- [00mtime.rb[0m
            |   |   |   |   |-- [00mtimestamp.rb[0m
            |   |   |   |   `-- [00munpacker.rb[0m
            |   |   |   `-- [00mmsgpack.rb[0m
            |   |   |-- [01;34mext[0m
            |   |   |   |-- [01;34mjava[0m
            |   |   |   |   `-- [01;34morg[0m
            |   |   |   |       `-- [01;34mmsgpack[0m
            |   |   |   |           `-- [01;34mjruby[0m
            |   |   |   |               |-- [00mBuffer.java[0m
            |   |   |   |               |-- [00mDecoder.java[0m
            |   |   |   |               |-- [00mEncoder.java[0m
            |   |   |   |               |-- [00mExtensionRegistry.java[0m
            |   |   |   |               |-- [00mExtensionValue.java[0m
            |   |   |   |               |-- [00mFactory.java[0m
            |   |   |   |               |-- [00mMessagePackLibrary.java[0m
            |   |   |   |               |-- [00mPacker.java[0m
            |   |   |   |               |-- [00mTypes.java[0m
            |   |   |   |               `-- [00mUnpacker.java[0m
            |   |   |   `-- [01;34mmsgpack[0m
            |   |   |       |-- [00mMakefile[0m
            |   |   |       |-- [00mbuffer.c[0m
            |   |   |       |-- [00mbuffer.h[0m
            |   |   |       |-- [00mbuffer.o[0m
            |   |   |       |-- [00mbuffer_class.c[0m
            |   |   |       |-- [00mbuffer_class.h[0m
            |   |   |       |-- [00mbuffer_class.o[0m
            |   |   |       |-- [00mcompat.h[0m
            |   |   |       |-- [00mextconf.rb[0m
            |   |   |       |-- [00mextension_value_class.c[0m
            |   |   |       |-- [00mextension_value_class.h[0m
            |   |   |       |-- [00mextension_value_class.o[0m
            |   |   |       |-- [00mfactory_class.c[0m
            |   |   |       |-- [00mfactory_class.h[0m
            |   |   |       |-- [00mfactory_class.o[0m
            |   |   |       |-- [01;32mmsgpack.so[0m
            |   |   |       |-- [00mpacker.c[0m
            |   |   |       |-- [00mpacker.h[0m
            |   |   |       |-- [00mpacker.o[0m
            |   |   |       |-- [00mpacker_class.c[0m
            |   |   |       |-- [00mpacker_class.h[0m
            |   |   |       |-- [00mpacker_class.o[0m
            |   |   |       |-- [00mpacker_ext_registry.c[0m
            |   |   |       |-- [00mpacker_ext_registry.h[0m
            |   |   |       |-- [00mpacker_ext_registry.o[0m
            |   |   |       |-- [00mrbinit.c[0m
            |   |   |       |-- [00mrbinit.o[0m
            |   |   |       |-- [00mrmem.c[0m
            |   |   |       |-- [00mrmem.h[0m
            |   |   |       |-- [00mrmem.o[0m
            |   |   |       |-- [00msysdep.h[0m
            |   |   |       |-- [00msysdep_endian.h[0m
            |   |   |       |-- [00msysdep_types.h[0m
            |   |   |       |-- [00munpacker.c[0m
            |   |   |       |-- [00munpacker.h[0m
            |   |   |       |-- [00munpacker.o[0m
            |   |   |       |-- [00munpacker_class.c[0m
            |   |   |       |-- [00munpacker_class.h[0m
            |   |   |       |-- [00munpacker_class.o[0m
            |   |   |       |-- [00munpacker_ext_registry.c[0m
            |   |   |       |-- [00munpacker_ext_registry.h[0m
            |   |   |       `-- [00munpacker_ext_registry.o[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34mmsgpack[0m
            |   |   |   |   |-- [00mbigint.rb[0m
            |   |   |   |   |-- [00mcore_ext.rb[0m
            |   |   |   |   |-- [00mfactory.rb[0m
            |   |   |   |   |-- [01;32mmsgpack.so[0m
            |   |   |   |   |-- [00mpacker.rb[0m
            |   |   |   |   |-- [00msymbol.rb[0m
            |   |   |   |   |-- [00mtime.rb[0m
            |   |   |   |   |-- [00mtimestamp.rb[0m
            |   |   |   |   |-- [00munpacker.rb[0m
            |   |   |   |   `-- [00mversion.rb[0m
            |   |   |   `-- [00mmsgpack.rb[0m
            |   |   |-- [00mmsgpack.gemspec[0m
            |   |   |-- [00mmsgpack.org.md[0m
            |   |   `-- [01;34mspec[0m
            |   |       |-- [00mbigint_spec.rb[0m
            |   |       |-- [00mcases.json[0m
            |   |       |-- [00mcases.msg[0m
            |   |       |-- [00mcases_compact.msg[0m
            |   |       |-- [00mcases_spec.rb[0m
            |   |       |-- [01;34mcruby[0m
            |   |       |   |-- [00mbuffer_io_spec.rb[0m
            |   |       |   |-- [00mbuffer_packer.rb[0m
            |   |       |   |-- [00mbuffer_spec.rb[0m
            |   |       |   |-- [00mbuffer_unpacker.rb[0m
            |   |       |   `-- [00munpacker_spec.rb[0m
            |   |       |-- [00mext_value_spec.rb[0m
            |   |       |-- [00mexttypes.rb[0m
            |   |       |-- [00mfactory_spec.rb[0m
            |   |       |-- [00mformat_spec.rb[0m
            |   |       |-- [01;34mjruby[0m
            |   |       |   |-- [01;34mbenchmarks[0m
            |   |       |   |   |-- [00mshootout_bm.rb[0m
            |   |       |   |   `-- [00msymbolize_keys_bm.rb[0m
            |   |       |   `-- [00munpacker_spec.rb[0m
            |   |       |-- [00mmsgpack_spec.rb[0m
            |   |       |-- [00mpack_spec.rb[0m
            |   |       |-- [00mpacker_spec.rb[0m
            |   |       |-- [00mrandom_compat.rb[0m
            |   |       |-- [00mspec_helper.rb[0m
            |   |       |-- [00mtimestamp_spec.rb[0m
            |   |       |-- [00munpack_spec.rb[0m
            |   |       `-- [00munpacker_spec.rb[0m
            |   |-- [01;34mnet-imap-0.3.4[0m
            |   |   |-- [00mGemfile[0m
            |   |   |-- [00mLICENSE.txt[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [00mRakefile[0m
            |   |   |-- [01;34mbenchmarks[0m
            |   |   |   |-- [00mstringprep.yml[0m
            |   |   |   `-- [00mtable-regexps.yml[0m
            |   |   |-- [01;34mdocs[0m
            |   |   |   `-- [00mstyles.css[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   `-- [01;34mnet[0m
            |   |   |       |-- [01;34mimap[0m
            |   |   |       |   |-- [01;34mauthenticators[0m
            |   |   |       |   |   |-- [00mcram_md5.rb[0m
            |   |   |       |   |   |-- [00mdigest_md5.rb[0m
            |   |   |       |   |   |-- [00mlogin.rb[0m
            |   |   |       |   |   |-- [00mplain.rb[0m
            |   |   |       |   |   `-- [00mxoauth2.rb[0m
            |   |   |       |   |-- [00mauthenticators.rb[0m
            |   |   |       |   |-- [00mcommand_data.rb[0m
            |   |   |       |   |-- [00mdata_encoding.rb[0m
            |   |   |       |   |-- [00merrors.rb[0m
            |   |   |       |   |-- [00mflags.rb[0m
            |   |   |       |   |-- [00mresponse_data.rb[0m
            |   |   |       |   |-- [00mresponse_parser.rb[0m
            |   |   |       |   |-- [01;34msasl[0m
            |   |   |       |   |   |-- [00msaslprep.rb[0m
            |   |   |       |   |   |-- [00msaslprep_tables.rb[0m
            |   |   |       |   |   |-- [00mstringprep.rb[0m
            |   |   |       |   |   `-- [00mstringprep_tables.rb[0m
            |   |   |       |   `-- [00msasl.rb[0m
            |   |   |       `-- [00mimap.rb[0m
            |   |   |-- [00mnet-imap.gemspec[0m
            |   |   `-- [01;34mrakelib[0m
            |   |       |-- [00mrdoc.rake[0m
            |   |       |-- [00mrfcs.rake[0m
            |   |       |-- [00msaslprep.rake[0m
            |   |       `-- [00mstring_prep_tables_generator.rb[0m
            |   |-- [01;34mnet-pop-0.1.2[0m
            |   |   |-- [00mGemfile[0m
            |   |   |-- [00mLICENSE.txt[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [00mRakefile[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   `-- [01;34mnet[0m
            |   |   |       `-- [00mpop.rb[0m
            |   |   `-- [00mnet-pop.gemspec[0m
            |   |-- [01;34mnet-protocol-0.2.1[0m
            |   |   |-- [00mGemfile[0m
            |   |   |-- [00mLICENSE.txt[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [00mRakefile[0m
            |   |   |-- [01;34mbin[0m
            |   |   |   |-- [01;32mconsole[0m
            |   |   |   `-- [01;32msetup[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   `-- [01;34mnet[0m
            |   |   |       `-- [00mprotocol.rb[0m
            |   |   `-- [00mnet-protocol.gemspec[0m
            |   |-- [01;34mnet-smtp-0.3.3[0m
            |   |   |-- [00mLICENSE.txt[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   `-- [01;34mnet[0m
            |   |   |       `-- [00msmtp.rb[0m
            |   |   `-- [00mnet-smtp.gemspec[0m
            |   |-- [01;34mnio4r-2.5.8[0m
            |   |   |-- [00mCHANGES.md[0m
            |   |   |-- [00mGemfile[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [00mRakefile[0m
            |   |   |-- [01;34mexamples[0m
            |   |   |   `-- [01;32mecho_server.rb[0m
            |   |   |-- [01;34mext[0m
            |   |   |   |-- [01;34mlibev[0m
            |   |   |   |   |-- [00mChanges[0m
            |   |   |   |   |-- [00mLICENSE[0m
            |   |   |   |   |-- [00mREADME[0m
            |   |   |   |   |-- [00mev.c[0m
            |   |   |   |   |-- [00mev.h[0m
            |   |   |   |   |-- [00mev_epoll.c[0m
            |   |   |   |   |-- [00mev_iouring.c[0m
            |   |   |   |   |-- [00mev_kqueue.c[0m
            |   |   |   |   |-- [00mev_linuxaio.c[0m
            |   |   |   |   |-- [00mev_poll.c[0m
            |   |   |   |   |-- [00mev_port.c[0m
            |   |   |   |   |-- [00mev_select.c[0m
            |   |   |   |   |-- [00mev_vars.h[0m
            |   |   |   |   |-- [00mev_win32.c[0m
            |   |   |   |   `-- [00mev_wrap.h[0m
            |   |   |   `-- [01;34mnio4r[0m
            |   |   |       |-- [00mMakefile[0m
            |   |   |       |-- [00mbytebuffer.c[0m
            |   |   |       |-- [00mbytebuffer.o[0m
            |   |   |       |-- [00mextconf.rb[0m
            |   |   |       |-- [00mlibev.h[0m
            |   |   |       |-- [00mmonitor.c[0m
            |   |   |       |-- [00mmonitor.o[0m
            |   |   |       |-- [00mnio4r.h[0m
            |   |   |       |-- [00mnio4r_ext.c[0m
            |   |   |       |-- [00mnio4r_ext.o[0m
            |   |   |       |-- [01;32mnio4r_ext.so[0m
            |   |   |       |-- [01;34morg[0m
            |   |   |       |   `-- [01;34mnio4r[0m
            |   |   |       |       |-- [00mByteBuffer.java[0m
            |   |   |       |       |-- [00mMonitor.java[0m
            |   |   |       |       |-- [00mNio4r.java[0m
            |   |   |       |       `-- [00mSelector.java[0m
            |   |   |       |-- [00mselector.c[0m
            |   |   |       `-- [00mselector.o[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34mnio[0m
            |   |   |   |   |-- [00mbytebuffer.rb[0m
            |   |   |   |   |-- [00mmonitor.rb[0m
            |   |   |   |   |-- [00mselector.rb[0m
            |   |   |   |   `-- [00mversion.rb[0m
            |   |   |   |-- [00mnio.rb[0m
            |   |   |   `-- [01;32mnio4r_ext.so[0m
            |   |   |-- [00mlogo.png[0m
            |   |   |-- [00mnio4r.gemspec[0m
            |   |   |-- [01;34mrakelib[0m
            |   |   |   |-- [00mextension.rake[0m
            |   |   |   |-- [00mrspec.rake[0m
            |   |   |   `-- [00mrubocop.rake[0m
            |   |   `-- [01;34mspec[0m
            |   |       |-- [01;34mnio[0m
            |   |       |   |-- [00macceptables_spec.rb[0m
            |   |       |   |-- [00mbytebuffer_spec.rb[0m
            |   |       |   |-- [00mmonitor_spec.rb[0m
            |   |       |   |-- [01;34mselectables[0m
            |   |       |   |   |-- [00mpipe_spec.rb[0m
            |   |       |   |   |-- [00mssl_socket_spec.rb[0m
            |   |       |   |   |-- [00mtcp_socket_spec.rb[0m
            |   |       |   |   `-- [00mudp_socket_spec.rb[0m
            |   |       |   `-- [00mselector_spec.rb[0m
            |   |       |-- [00mspec_helper.rb[0m
            |   |       `-- [01;34msupport[0m
            |   |           `-- [00mselectable_examples.rb[0m
            |   |-- [01;34mnokogiri-1.14.2-x86_64-linux[0m
            |   |   |-- [00mGemfile[0m
            |   |   |-- [00mLICENSE-DEPENDENCIES.md[0m
            |   |   |-- [00mLICENSE.md[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [01;34mbin[0m
            |   |   |   `-- [01;32mnokogiri[0m
            |   |   |-- [00mdependencies.yml[0m
            |   |   |-- [01;34mext[0m
            |   |   |   `-- [01;34mnokogiri[0m
            |   |   |       |-- [00mdepend[0m
            |   |   |       |-- [00mextconf.rb[0m
            |   |   |       |-- [00mgumbo.c[0m
            |   |   |       |-- [00mhtml4_document.c[0m
            |   |   |       |-- [00mhtml4_element_description.c[0m
            |   |   |       |-- [00mhtml4_entity_lookup.c[0m
            |   |   |       |-- [00mhtml4_sax_parser_context.c[0m
            |   |   |       |-- [00mhtml4_sax_push_parser.c[0m
            |   |   |       |-- [01;34minclude[0m
            |   |   |       |   |-- [01;34mlibexslt[0m
            |   |   |       |   |   |-- [00mexslt.h[0m
            |   |   |       |   |   |-- [00mexsltconfig.h[0m
            |   |   |       |   |   `-- [00mexsltexports.h[0m
            |   |   |       |   |-- [01;34mlibxml2[0m
            |   |   |       |   |   `-- [01;34mlibxml[0m
            |   |   |       |   |       |-- [00mHTMLparser.h[0m
            |   |   |       |   |       |-- [00mHTMLtree.h[0m
            |   |   |       |   |       |-- [00mSAX.h[0m
            |   |   |       |   |       |-- [00mSAX2.h[0m
            |   |   |       |   |       |-- [00mc14n.h[0m
            |   |   |       |   |       |-- [00mcatalog.h[0m
            |   |   |       |   |       |-- [00mchvalid.h[0m
            |   |   |       |   |       |-- [00mdebugXML.h[0m
            |   |   |       |   |       |-- [00mdict.h[0m
            |   |   |       |   |       |-- [00mencoding.h[0m
            |   |   |       |   |       |-- [00mentities.h[0m
            |   |   |       |   |       |-- [00mglobals.h[0m
            |   |   |       |   |       |-- [00mhash.h[0m
            |   |   |       |   |       |-- [00mlist.h[0m
            |   |   |       |   |       |-- [00mnanoftp.h[0m
            |   |   |       |   |       |-- [00mnanohttp.h[0m
            |   |   |       |   |       |-- [00mparser.h[0m
            |   |   |       |   |       |-- [00mparserInternals.h[0m
            |   |   |       |   |       |-- [00mpattern.h[0m
            |   |   |       |   |       |-- [00mrelaxng.h[0m
            |   |   |       |   |       |-- [00mschemasInternals.h[0m
            |   |   |       |   |       |-- [00mschematron.h[0m
            |   |   |       |   |       |-- [00mthreads.h[0m
            |   |   |       |   |       |-- [00mtree.h[0m
            |   |   |       |   |       |-- [00muri.h[0m
            |   |   |       |   |       |-- [00mvalid.h[0m
            |   |   |       |   |       |-- [00mxinclude.h[0m
            |   |   |       |   |       |-- [00mxlink.h[0m
            |   |   |       |   |       |-- [00mxmlIO.h[0m
            |   |   |       |   |       |-- [00mxmlautomata.h[0m
            |   |   |       |   |       |-- [00mxmlerror.h[0m
            |   |   |       |   |       |-- [00mxmlexports.h[0m
            |   |   |       |   |       |-- [00mxmlmemory.h[0m
            |   |   |       |   |       |-- [00mxmlmodule.h[0m
            |   |   |       |   |       |-- [00mxmlreader.h[0m
            |   |   |       |   |       |-- [00mxmlregexp.h[0m
            |   |   |       |   |       |-- [00mxmlsave.h[0m
            |   |   |       |   |       |-- [00mxmlschemas.h[0m
            |   |   |       |   |       |-- [00mxmlschemastypes.h[0m
            |   |   |       |   |       |-- [00mxmlstring.h[0m
            |   |   |       |   |       |-- [00mxmlunicode.h[0m
            |   |   |       |   |       |-- [00mxmlversion.h[0m
            |   |   |       |   |       |-- [00mxmlwriter.h[0m
            |   |   |       |   |       |-- [00mxpath.h[0m
            |   |   |       |   |       |-- [00mxpathInternals.h[0m
            |   |   |       |   |       `-- [00mxpointer.h[0m
            |   |   |       |   `-- [01;34mlibxslt[0m
            |   |   |       |       |-- [00mattributes.h[0m
            |   |   |       |       |-- [00mdocuments.h[0m
            |   |   |       |       |-- [00mextensions.h[0m
            |   |   |       |       |-- [00mextra.h[0m
            |   |   |       |       |-- [00mfunctions.h[0m
            |   |   |       |       |-- [00mimports.h[0m
            |   |   |       |       |-- [00mkeys.h[0m
            |   |   |       |       |-- [00mnamespaces.h[0m
            |   |   |       |       |-- [00mnumbersInternals.h[0m
            |   |   |       |       |-- [00mpattern.h[0m
            |   |   |       |       |-- [00mpreproc.h[0m
            |   |   |       |       |-- [00msecurity.h[0m
            |   |   |       |       |-- [00mtemplates.h[0m
            |   |   |       |       |-- [00mtransform.h[0m
            |   |   |       |       |-- [00mvariables.h[0m
            |   |   |       |       |-- [00mxslt.h[0m
            |   |   |       |       |-- [00mxsltInternals.h[0m
            |   |   |       |       |-- [00mxsltconfig.h[0m
            |   |   |       |       |-- [00mxsltexports.h[0m
            |   |   |       |       |-- [00mxsltlocale.h[0m
            |   |   |       |       `-- [00mxsltutils.h[0m
            |   |   |       |-- [00mlibxml2_backwards_compat.c[0m
            |   |   |       |-- [00mnokogiri.c[0m
            |   |   |       |-- [00mnokogiri.h[0m
            |   |   |       |-- [00mtest_global_handlers.c[0m
            |   |   |       |-- [00mxml_attr.c[0m
            |   |   |       |-- [00mxml_attribute_decl.c[0m
            |   |   |       |-- [00mxml_cdata.c[0m
            |   |   |       |-- [00mxml_comment.c[0m
            |   |   |       |-- [00mxml_document.c[0m
            |   |   |       |-- [00mxml_document_fragment.c[0m
            |   |   |       |-- [00mxml_dtd.c[0m
            |   |   |       |-- [00mxml_element_content.c[0m
            |   |   |       |-- [00mxml_element_decl.c[0m
            |   |   |       |-- [00mxml_encoding_handler.c[0m
            |   |   |       |-- [00mxml_entity_decl.c[0m
            |   |   |       |-- [00mxml_entity_reference.c[0m
            |   |   |       |-- [00mxml_namespace.c[0m
            |   |   |       |-- [00mxml_node.c[0m
            |   |   |       |-- [00mxml_node_set.c[0m
            |   |   |       |-- [00mxml_processing_instruction.c[0m
            |   |   |       |-- [00mxml_reader.c[0m
            |   |   |       |-- [00mxml_relax_ng.c[0m
            |   |   |       |-- [00mxml_sax_parser.c[0m
            |   |   |       |-- [00mxml_sax_parser_context.c[0m
            |   |   |       |-- [00mxml_sax_push_parser.c[0m
            |   |   |       |-- [00mxml_schema.c[0m
            |   |   |       |-- [00mxml_syntax_error.c[0m
            |   |   |       |-- [00mxml_text.c[0m
            |   |   |       |-- [00mxml_xpath_context.c[0m
            |   |   |       `-- [00mxslt_stylesheet.c[0m
            |   |   |-- [01;34mgumbo-parser[0m
            |   |   |   |-- [00mCHANGES.md[0m
            |   |   |   |-- [00mMakefile[0m
            |   |   |   `-- [00mTHANKS[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34mnokogiri[0m
            |   |       |   |-- [01;34m2.7[0m
            |   |       |   |   `-- [01;32mnokogiri.so[0m
            |   |       |   |-- [01;34m3.0[0m
            |   |       |   |   `-- [01;32mnokogiri.so[0m
            |   |       |   |-- [01;34m3.1[0m
            |   |       |   |   `-- [01;32mnokogiri.so[0m
            |   |       |   |-- [01;34m3.2[0m
            |   |       |   |   `-- [01;32mnokogiri.so[0m
            |   |       |   |-- [00mclass_resolver.rb[0m
            |   |       |   |-- [01;34mcss[0m
            |   |       |   |   |-- [00mnode.rb[0m
            |   |       |   |   |-- [00mparser.rb[0m
            |   |       |   |   |-- [00mparser.y[0m
            |   |       |   |   |-- [00mparser_extras.rb[0m
            |   |       |   |   |-- [00msyntax_error.rb[0m
            |   |       |   |   |-- [00mtokenizer.rb[0m
            |   |       |   |   |-- [00mtokenizer.rex[0m
            |   |       |   |   `-- [00mxpath_visitor.rb[0m
            |   |       |   |-- [00mcss.rb[0m
            |   |       |   |-- [01;34mdecorators[0m
            |   |       |   |   `-- [00mslop.rb[0m
            |   |       |   |-- [00mencoding_handler.rb[0m
            |   |       |   |-- [00mextension.rb[0m
            |   |       |   |-- [00mgumbo.rb[0m
            |   |       |   |-- [00mhtml.rb[0m
            |   |       |   |-- [01;34mhtml4[0m
            |   |       |   |   |-- [00mbuilder.rb[0m
            |   |       |   |   |-- [00mdocument.rb[0m
            |   |       |   |   |-- [00mdocument_fragment.rb[0m
            |   |       |   |   |-- [00melement_description.rb[0m
            |   |       |   |   |-- [00melement_description_defaults.rb[0m
            |   |       |   |   |-- [00mencoding_reader.rb[0m
            |   |       |   |   |-- [00mentity_lookup.rb[0m
            |   |       |   |   `-- [01;34msax[0m
            |   |       |   |       |-- [00mparser.rb[0m
            |   |       |   |       |-- [00mparser_context.rb[0m
            |   |       |   |       `-- [00mpush_parser.rb[0m
            |   |       |   |-- [00mhtml4.rb[0m
            |   |       |   |-- [01;34mhtml5[0m
            |   |       |   |   |-- [00mdocument.rb[0m
            |   |       |   |   |-- [00mdocument_fragment.rb[0m
            |   |       |   |   `-- [00mnode.rb[0m
            |   |       |   |-- [00mhtml5.rb[0m
            |   |       |   |-- [01;34mjruby[0m
            |   |       |   |   |-- [00mdependencies.rb[0m
            |   |       |   |   `-- [00mnokogiri_jars.rb[0m
            |   |       |   |-- [00msyntax_error.rb[0m
            |   |       |   |-- [01;34mversion[0m
            |   |       |   |   |-- [00mconstant.rb[0m
            |   |       |   |   `-- [00minfo.rb[0m
            |   |       |   |-- [00mversion.rb[0m
            |   |       |   |-- [01;34mxml[0m
            |   |       |   |   |-- [00mattr.rb[0m
            |   |       |   |   |-- [00mattribute_decl.rb[0m
            |   |       |   |   |-- [00mbuilder.rb[0m
            |   |       |   |   |-- [00mcdata.rb[0m
            |   |       |   |   |-- [00mcharacter_data.rb[0m
            |   |       |   |   |-- [00mdocument.rb[0m
            |   |       |   |   |-- [00mdocument_fragment.rb[0m
            |   |       |   |   |-- [00mdtd.rb[0m
            |   |       |   |   |-- [00melement_content.rb[0m
            |   |       |   |   |-- [00melement_decl.rb[0m
            |   |       |   |   |-- [00mentity_decl.rb[0m
            |   |       |   |   |-- [00mentity_reference.rb[0m
            |   |       |   |   |-- [00mnamespace.rb[0m
            |   |       |   |   |-- [01;34mnode[0m
            |   |       |   |   |   `-- [00msave_options.rb[0m
            |   |       |   |   |-- [00mnode.rb[0m
            |   |       |   |   |-- [00mnode_set.rb[0m
            |   |       |   |   |-- [00mnotation.rb[0m
            |   |       |   |   |-- [00mparse_options.rb[0m
            |   |       |   |   |-- [01;34mpp[0m
            |   |       |   |   |   |-- [00mcharacter_data.rb[0m
            |   |       |   |   |   `-- [00mnode.rb[0m
            |   |       |   |   |-- [00mpp.rb[0m
            |   |       |   |   |-- [00mprocessing_instruction.rb[0m
            |   |       |   |   |-- [00mreader.rb[0m
            |   |       |   |   |-- [00mrelax_ng.rb[0m
            |   |       |   |   |-- [01;34msax[0m
            |   |       |   |   |   |-- [00mdocument.rb[0m
            |   |       |   |   |   |-- [00mparser.rb[0m
            |   |       |   |   |   |-- [00mparser_context.rb[0m
            |   |       |   |   |   `-- [00mpush_parser.rb[0m
            |   |       |   |   |-- [00msax.rb[0m
            |   |       |   |   |-- [00mschema.rb[0m
            |   |       |   |   |-- [00msearchable.rb[0m
            |   |       |   |   |-- [00msyntax_error.rb[0m
            |   |       |   |   |-- [00mtext.rb[0m
            |   |       |   |   |-- [01;34mxpath[0m
            |   |       |   |   |   `-- [00msyntax_error.rb[0m
            |   |       |   |   |-- [00mxpath.rb[0m
            |   |       |   |   `-- [00mxpath_context.rb[0m
            |   |       |   |-- [00mxml.rb[0m
            |   |       |   |-- [01;34mxslt[0m
            |   |       |   |   `-- [00mstylesheet.rb[0m
            |   |       |   `-- [00mxslt.rb[0m
            |   |       |-- [00mnokogiri.rb[0m
            |   |       `-- [01;34mxsd[0m
            |   |           `-- [01;34mxmlparser[0m
            |   |               `-- [00mnokogiri.rb[0m
            |   |-- [01;34mpublic_suffix-5.0.1[0m
            |   |   |-- [00m2.0-Upgrade.md[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mGemfile[0m
            |   |   |-- [00mLICENSE.txt[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [00mRakefile[0m
            |   |   |-- [00mSECURITY.md[0m
            |   |   |-- [01;34mbin[0m
            |   |   |   `-- [01;32mconsole[0m
            |   |   |-- [01;34mdata[0m
            |   |   |   `-- [00mlist.txt[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34mpublic_suffix[0m
            |   |   |   |   |-- [00mdomain.rb[0m
            |   |   |   |   |-- [00merrors.rb[0m
            |   |   |   |   |-- [00mlist.rb[0m
            |   |   |   |   |-- [00mrule.rb[0m
            |   |   |   |   `-- [00mversion.rb[0m
            |   |   |   `-- [00mpublic_suffix.rb[0m
            |   |   |-- [00mpublic_suffix.gemspec[0m
            |   |   `-- [01;34mtest[0m
            |   |       |-- [00macceptance_test.rb[0m
            |   |       |-- [01;34mbenchmarks[0m
            |   |       |   |-- [00mbm_find.rb[0m
            |   |       |   |-- [00mbm_find_all.rb[0m
            |   |       |   |-- [00mbm_names.rb[0m
            |   |       |   |-- [00mbm_select.rb[0m
            |   |       |   |-- [00mbm_select_incremental.rb[0m
            |   |       |   `-- [00mbm_valid.rb[0m
            |   |       |-- [01;34mprofilers[0m
            |   |       |   |-- [00mdomain_profiler.rb[0m
            |   |       |   |-- [00mfind_profiler.rb[0m
            |   |       |   |-- [00mfind_profiler_jp.rb[0m
            |   |       |   |-- [00minitialization_profiler.rb[0m
            |   |       |   |-- [00mlist_profsize.rb[0m
            |   |       |   `-- [00mobject_binsize.rb[0m
            |   |       |-- [00mpsl_test.rb[0m
            |   |       |-- [00mtest_helper.rb[0m
            |   |       |-- [00mtests.txt[0m
            |   |       `-- [01;34munit[0m
            |   |           |-- [00mdomain_test.rb[0m
            |   |           |-- [00merrors_test.rb[0m
            |   |           |-- [00mlist_test.rb[0m
            |   |           |-- [00mpublic_suffix_test.rb[0m
            |   |           `-- [00mrule_test.rb[0m
            |   |-- [01;34mpuma-5.6.5[0m
            |   |   |-- [01;32mHistory.md[0m
            |   |   |-- [01;32mLICENSE[0m
            |   |   |-- [01;32mREADME.md[0m
            |   |   |-- [01;34mbin[0m
            |   |   |   |-- [01;32mpuma[0m
            |   |   |   |-- [01;32mpuma-wild[0m
            |   |   |   `-- [01;32mpumactl[0m
            |   |   |-- [01;34mdocs[0m
            |   |   |   |-- [01;32marchitecture.md[0m
            |   |   |   |-- [01;32mcompile_options.md[0m
            |   |   |   |-- [01;32mdeployment.md[0m
            |   |   |   |-- [01;32mfork_worker.md[0m
            |   |   |   |-- [01;34mimages[0m
            |   |   |   |   |-- [01;32mpuma-connection-flow-no-reactor.png[0m
            |   |   |   |   |-- [01;32mpuma-connection-flow.png[0m
            |   |   |   |   `-- [01;32mpuma-general-arch.png[0m
            |   |   |   |-- [01;34mjungle[0m
            |   |   |   |   |-- [01;32mREADME.md[0m
            |   |   |   |   `-- [01;34mrc.d[0m
            |   |   |   |       |-- [01;32mREADME.md[0m
            |   |   |   |       |-- [01;32mpuma[0m
            |   |   |   |       `-- [01;32mpuma.conf[0m
            |   |   |   |-- [01;32mkubernetes.md[0m
            |   |   |   |-- [01;32mnginx.md[0m
            |   |   |   |-- [01;32mplugins.md[0m
            |   |   |   |-- [01;32mrails_dev_mode.md[0m
            |   |   |   |-- [01;32mrestart.md[0m
            |   |   |   |-- [01;32msignals.md[0m
            |   |   |   |-- [01;32mstats.md[0m
            |   |   |   `-- [01;32msystemd.md[0m
            |   |   |-- [01;34mext[0m
            |   |   |   `-- [01;34mpuma_http11[0m
            |   |   |       |-- [00mMakefile[0m
            |   |   |       |-- [01;32mPumaHttp11Service.java[0m
            |   |   |       |-- [01;32mext_help.h[0m
            |   |   |       |-- [01;32mextconf.rb[0m
            |   |   |       |-- [01;32mhttp11_parser.c[0m
            |   |   |       |-- [01;32mhttp11_parser.h[0m
            |   |   |       |-- [01;32mhttp11_parser.java.rl[0m
            |   |   |       |-- [00mhttp11_parser.o[0m
            |   |   |       |-- [01;32mhttp11_parser.rl[0m
            |   |   |       |-- [01;32mhttp11_parser_common.rl[0m
            |   |   |       |-- [01;32mmini_ssl.c[0m
            |   |   |       |-- [00mmini_ssl.o[0m
            |   |   |       |-- [01;34mno_ssl[0m
            |   |   |       |   `-- [01;32mPumaHttp11Service.java[0m
            |   |   |       |-- [01;34morg[0m
            |   |   |       |   `-- [01;34mjruby[0m
            |   |   |       |       `-- [01;34mpuma[0m
            |   |   |       |           |-- [01;32mHttp11.java[0m
            |   |   |       |           |-- [01;32mHttp11Parser.java[0m
            |   |   |       |           `-- [01;32mMiniSSL.java[0m
            |   |   |       |-- [01;32mpuma_http11.c[0m
            |   |   |       |-- [00mpuma_http11.o[0m
            |   |   |       `-- [01;32mpuma_http11.so[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34mpuma[0m
            |   |   |   |   |-- [01;34mapp[0m
            |   |   |   |   |   `-- [01;32mstatus.rb[0m
            |   |   |   |   |-- [01;32mbinder.rb[0m
            |   |   |   |   |-- [01;32mcli.rb[0m
            |   |   |   |   |-- [01;32mclient.rb[0m
            |   |   |   |   |-- [01;34mcluster[0m
            |   |   |   |   |   |-- [01;32mworker.rb[0m
            |   |   |   |   |   `-- [01;32mworker_handle.rb[0m
            |   |   |   |   |-- [01;32mcluster.rb[0m
            |   |   |   |   |-- [01;32mcommonlogger.rb[0m
            |   |   |   |   |-- [01;32mconfiguration.rb[0m
            |   |   |   |   |-- [01;32mconst.rb[0m
            |   |   |   |   |-- [01;32mcontrol_cli.rb[0m
            |   |   |   |   |-- [01;32mdetect.rb[0m
            |   |   |   |   |-- [01;32mdsl.rb[0m
            |   |   |   |   |-- [01;32merror_logger.rb[0m
            |   |   |   |   |-- [01;32mevents.rb[0m
            |   |   |   |   |-- [01;32mio_buffer.rb[0m
            |   |   |   |   |-- [01;32mjruby_restart.rb[0m
            |   |   |   |   |-- [01;32mjson_serialization.rb[0m
            |   |   |   |   |-- [01;32mlauncher.rb[0m
            |   |   |   |   |-- [01;34mminissl[0m
            |   |   |   |   |   `-- [01;32mcontext_builder.rb[0m
            |   |   |   |   |-- [01;32mminissl.rb[0m
            |   |   |   |   |-- [01;32mnull_io.rb[0m
            |   |   |   |   |-- [01;34mplugin[0m
            |   |   |   |   |   `-- [01;32mtmp_restart.rb[0m
            |   |   |   |   |-- [01;32mplugin.rb[0m
            |   |   |   |   |-- [01;32mpuma_http11.so[0m
            |   |   |   |   |-- [01;32mqueue_close.rb[0m
            |   |   |   |   |-- [01;34mrack[0m
            |   |   |   |   |   |-- [01;32mbuilder.rb[0m
            |   |   |   |   |   `-- [01;32murlmap.rb[0m
            |   |   |   |   |-- [01;32mrack_default.rb[0m
            |   |   |   |   |-- [01;32mreactor.rb[0m
            |   |   |   |   |-- [01;32mrequest.rb[0m
            |   |   |   |   |-- [01;32mrunner.rb[0m
            |   |   |   |   |-- [01;32mserver.rb[0m
            |   |   |   |   |-- [01;32msingle.rb[0m
            |   |   |   |   |-- [01;32mstate_file.rb[0m
            |   |   |   |   |-- [01;32msystemd.rb[0m
            |   |   |   |   |-- [01;32mthread_pool.rb[0m
            |   |   |   |   `-- [01;32mutil.rb[0m
            |   |   |   |-- [01;32mpuma.rb[0m
            |   |   |   `-- [01;34mrack[0m
            |   |   |       `-- [01;34mhandler[0m
            |   |   |           `-- [01;32mpuma.rb[0m
            |   |   `-- [01;34mtools[0m
            |   |       |-- [01;32mDockerfile[0m
            |   |       `-- [01;32mtrickletest.rb[0m
            |   |-- [01;34mracc-1.6.2[0m
            |   |   |-- [00mCOPYING[0m
            |   |   |-- [00mChangeLog[0m
            |   |   |-- [00mREADME.ja.rdoc[0m
            |   |   |-- [00mREADME.rdoc[0m
            |   |   |-- [00mTODO[0m
            |   |   |-- [01;34mbin[0m
            |   |   |   `-- [01;32mracc[0m
            |   |   |-- [01;34mdoc[0m
            |   |   |   |-- [01;34men[0m
            |   |   |   |   |-- [00mNEWS.en.rdoc[0m
            |   |   |   |   |-- [00mgrammar.en.rdoc[0m
            |   |   |   |   `-- [00mgrammar2.en.rdoc[0m
            |   |   |   `-- [01;34mja[0m
            |   |   |       |-- [00mNEWS.ja.rdoc[0m
            |   |   |       |-- [00mcommand.ja.html[0m
            |   |   |       |-- [00mdebug.ja.rdoc[0m
            |   |   |       |-- [00mgrammar.ja.rdoc[0m
            |   |   |       |-- [00mindex.ja.html[0m
            |   |   |       |-- [00mparser.ja.rdoc[0m
            |   |   |       `-- [00musage.ja.html[0m
            |   |   |-- [01;34mext[0m
            |   |   |   `-- [01;34mracc[0m
            |   |   |       |-- [00mMANIFEST[0m
            |   |   |       `-- [01;34mcparse[0m
            |   |   |           |-- [00mMakefile[0m
            |   |   |           |-- [00mcparse.c[0m
            |   |   |           |-- [00mcparse.o[0m
            |   |   |           |-- [01;32mcparse.so[0m
            |   |   |           `-- [00mextconf.rb[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34mracc[0m
            |   |       |   |-- [00mcompat.rb[0m
            |   |       |   |-- [01;32mcparse.so[0m
            |   |       |   |-- [00mdebugflags.rb[0m
            |   |       |   |-- [00mexception.rb[0m
            |   |       |   |-- [00mgrammar.rb[0m
            |   |       |   |-- [00mgrammarfileparser.rb[0m
            |   |       |   |-- [00minfo.rb[0m
            |   |       |   |-- [00miset.rb[0m
            |   |       |   |-- [00mlogfilegenerator.rb[0m
            |   |       |   |-- [00mparser-text.rb[0m
            |   |       |   |-- [00mparser.rb[0m
            |   |       |   |-- [00mparserfilegenerator.rb[0m
            |   |       |   |-- [00msourcetext.rb[0m
            |   |       |   |-- [00mstate.rb[0m
            |   |       |   |-- [00mstatetransitiontable.rb[0m
            |   |       |   `-- [00mstatic.rb[0m
            |   |       `-- [00mracc.rb[0m
            |   |-- [01;34mrack-2.2.6.2[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mCONTRIBUTING.md[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.rdoc[0m
            |   |   |-- [00mRakefile[0m
            |   |   |-- [00mSPEC.rdoc[0m
            |   |   |-- [01;34mbin[0m
            |   |   |   `-- [01;32mrackup[0m
            |   |   |-- [01;34mcontrib[0m
            |   |   |   |-- [00mrack.png[0m
            |   |   |   |-- [00mrack.svg[0m
            |   |   |   |-- [00mrack_logo.svg[0m
            |   |   |   `-- [00mrdoc.css[0m
            |   |   |-- [01;34mexample[0m
            |   |   |   |-- [00mlobster.ru[0m
            |   |   |   |-- [00mprotectedlobster.rb[0m
            |   |   |   `-- [00mprotectedlobster.ru[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34mrack[0m
            |   |   |   |   |-- [01;34mauth[0m
            |   |   |   |   |   |-- [01;34mabstract[0m
            |   |   |   |   |   |   |-- [00mhandler.rb[0m
            |   |   |   |   |   |   `-- [00mrequest.rb[0m
            |   |   |   |   |   |-- [00mbasic.rb[0m
            |   |   |   |   |   `-- [01;34mdigest[0m
            |   |   |   |   |       |-- [00mmd5.rb[0m
            |   |   |   |   |       |-- [00mnonce.rb[0m
            |   |   |   |   |       |-- [00mparams.rb[0m
            |   |   |   |   |       `-- [00mrequest.rb[0m
            |   |   |   |   |-- [00mbody_proxy.rb[0m
            |   |   |   |   |-- [00mbuilder.rb[0m
            |   |   |   |   |-- [00mcascade.rb[0m
            |   |   |   |   |-- [00mchunked.rb[0m
            |   |   |   |   |-- [00mcommon_logger.rb[0m
            |   |   |   |   |-- [00mconditional_get.rb[0m
            |   |   |   |   |-- [00mconfig.rb[0m
            |   |   |   |   |-- [00mcontent_length.rb[0m
            |   |   |   |   |-- [00mcontent_type.rb[0m
            |   |   |   |   |-- [01;34mcore_ext[0m
            |   |   |   |   |   `-- [00mregexp.rb[0m
            |   |   |   |   |-- [00mdeflater.rb[0m
            |   |   |   |   |-- [00mdirectory.rb[0m
            |   |   |   |   |-- [00metag.rb[0m
            |   |   |   |   |-- [00mevents.rb[0m
            |   |   |   |   |-- [00mfile.rb[0m
            |   |   |   |   |-- [00mfiles.rb[0m
            |   |   |   |   |-- [01;34mhandler[0m
            |   |   |   |   |   |-- [00mcgi.rb[0m
            |   |   |   |   |   |-- [00mfastcgi.rb[0m
            |   |   |   |   |   |-- [00mlsws.rb[0m
            |   |   |   |   |   |-- [00mscgi.rb[0m
            |   |   |   |   |   |-- [00mthin.rb[0m
            |   |   |   |   |   `-- [00mwebrick.rb[0m
            |   |   |   |   |-- [00mhandler.rb[0m
            |   |   |   |   |-- [00mhead.rb[0m
            |   |   |   |   |-- [00mlint.rb[0m
            |   |   |   |   |-- [00mlobster.rb[0m
            |   |   |   |   |-- [00mlock.rb[0m
            |   |   |   |   |-- [00mlogger.rb[0m
            |   |   |   |   |-- [00mmedia_type.rb[0m
            |   |   |   |   |-- [00mmethod_override.rb[0m
            |   |   |   |   |-- [00mmime.rb[0m
            |   |   |   |   |-- [00mmock.rb[0m
            |   |   |   |   |-- [01;34mmultipart[0m
            |   |   |   |   |   |-- [00mgenerator.rb[0m
            |   |   |   |   |   |-- [00mparser.rb[0m
            |   |   |   |   |   `-- [00muploaded_file.rb[0m
            |   |   |   |   |-- [00mmultipart.rb[0m
            |   |   |   |   |-- [00mnull_logger.rb[0m
            |   |   |   |   |-- [00mquery_parser.rb[0m
            |   |   |   |   |-- [00mrecursive.rb[0m
            |   |   |   |   |-- [00mreloader.rb[0m
            |   |   |   |   |-- [00mrequest.rb[0m
            |   |   |   |   |-- [00mresponse.rb[0m
            |   |   |   |   |-- [00mrewindable_input.rb[0m
            |   |   |   |   |-- [00mruntime.rb[0m
            |   |   |   |   |-- [00msendfile.rb[0m
            |   |   |   |   |-- [00mserver.rb[0m
            |   |   |   |   |-- [01;34msession[0m
            |   |   |   |   |   |-- [01;34mabstract[0m
            |   |   |   |   |   |   `-- [00mid.rb[0m
            |   |   |   |   |   |-- [00mcookie.rb[0m
            |   |   |   |   |   |-- [00mmemcache.rb[0m
            |   |   |   |   |   `-- [00mpool.rb[0m
            |   |   |   |   |-- [00mshow_exceptions.rb[0m
            |   |   |   |   |-- [00mshow_status.rb[0m
            |   |   |   |   |-- [00mstatic.rb[0m
            |   |   |   |   |-- [00mtempfile_reaper.rb[0m
            |   |   |   |   |-- [00murlmap.rb[0m
            |   |   |   |   |-- [00mutils.rb[0m
            |   |   |   |   `-- [00mversion.rb[0m
            |   |   |   `-- [00mrack.rb[0m
            |   |   `-- [00mrack.gemspec[0m
            |   |-- [01;34mrack-test-2.0.2[0m
            |   |   |-- [00mHistory.md[0m
            |   |   |-- [00mMIT-LICENSE.txt[0m
            |   |   |-- [00mREADME.md[0m
            |   |   `-- [01;34mlib[0m
            |   |       `-- [01;34mrack[0m
            |   |           |-- [00mmock_session.rb[0m
            |   |           |-- [01;34mtest[0m
            |   |           |   |-- [00mcookie_jar.rb[0m
            |   |           |   |-- [00mmethods.rb[0m
            |   |           |   |-- [00mmock_digest_request.rb[0m
            |   |           |   |-- [00muploaded_file.rb[0m
            |   |           |   |-- [00mutils.rb[0m
            |   |           |   `-- [00mversion.rb[0m
            |   |           `-- [00mtest.rb[0m
            |   |-- [01;34mrails-7.0.4.2[0m
            |   |   `-- [00mREADME.md[0m
            |   |-- [01;34mrails-dom-testing-2.0.3[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34mrails[0m
            |   |   |   |   `-- [01;34mdom[0m
            |   |   |   |       `-- [01;34mtesting[0m
            |   |   |   |           |-- [01;34massertions[0m
            |   |   |   |           |   |-- [00mdom_assertions.rb[0m
            |   |   |   |           |   |-- [01;34mselector_assertions[0m
            |   |   |   |           |   |   |-- [00mcount_describable.rb[0m
            |   |   |   |           |   |   |-- [00mhtml_selector.rb[0m
            |   |   |   |           |   |   `-- [00msubstitution_context.rb[0m
            |   |   |   |           |   `-- [00mselector_assertions.rb[0m
            |   |   |   |           |-- [00massertions.rb[0m
            |   |   |   |           `-- [00mversion.rb[0m
            |   |   |   `-- [00mrails-dom-testing.rb[0m
            |   |   `-- [01;34mtest[0m
            |   |       |-- [00mdom_assertions_test.rb[0m
            |   |       |-- [00mselector_assertions_test.rb[0m
            |   |       `-- [00mtest_helper.rb[0m
            |   |-- [01;34mrails-html-sanitizer-1.5.0[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34mrails[0m
            |   |   |   |   `-- [01;34mhtml[0m
            |   |   |   |       |-- [01;34msanitizer[0m
            |   |   |   |       |   `-- [00mversion.rb[0m
            |   |   |   |       |-- [00msanitizer.rb[0m
            |   |   |   |       `-- [00mscrubbers.rb[0m
            |   |   |   `-- [00mrails-html-sanitizer.rb[0m
            |   |   `-- [01;34mtest[0m
            |   |       |-- [00msanitizer_test.rb[0m
            |   |       `-- [00mscrubbers_test.rb[0m
            |   |-- [01;34mrailties-7.0.4.2[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mRDOC_MAIN.rdoc[0m
            |   |   |-- [00mREADME.rdoc[0m
            |   |   |-- [01;34mexe[0m
            |   |   |   `-- [01;32mrails[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34mminitest[0m
            |   |       |   `-- [00mrails_plugin.rb[0m
            |   |       |-- [01;34mrails[0m
            |   |       |   |-- [00mall.rb[0m
            |   |       |   |-- [01;34mapi[0m
            |   |       |   |   |-- [00mgenerator.rb[0m
            |   |       |   |   `-- [00mtask.rb[0m
            |   |       |   |-- [00mapp_loader.rb[0m
            |   |       |   |-- [00mapp_updater.rb[0m
            |   |       |   |-- [01;34mapplication[0m
            |   |       |   |   |-- [00mbootstrap.rb[0m
            |   |       |   |   |-- [00mconfiguration.rb[0m
            |   |       |   |   |-- [00mdefault_middleware_stack.rb[0m
            |   |       |   |   |-- [00mdummy_erb_compiler.rb[0m
            |   |       |   |   |-- [00mfinisher.rb[0m
            |   |       |   |   `-- [00mroutes_reloader.rb[0m
            |   |       |   |-- [00mapplication.rb[0m
            |   |       |   |-- [00mapplication_controller.rb[0m
            |   |       |   |-- [01;34mautoloaders[0m
            |   |       |   |   `-- [00minflector.rb[0m
            |   |       |   |-- [00mautoloaders.rb[0m
            |   |       |   |-- [00mbacktrace_cleaner.rb[0m
            |   |       |   |-- [00mcli.rb[0m
            |   |       |   |-- [00mcode_statistics.rb[0m
            |   |       |   |-- [00mcode_statistics_calculator.rb[0m
            |   |       |   |-- [01;34mcommand[0m
            |   |       |   |   |-- [00mactions.rb[0m
            |   |       |   |   |-- [00mbase.rb[0m
            |   |       |   |   |-- [00mbehavior.rb[0m
            |   |       |   |   |-- [00menvironment_argument.rb[0m
            |   |       |   |   `-- [01;34mhelpers[0m
            |   |       |   |       `-- [00meditor.rb[0m
            |   |       |   |-- [00mcommand.rb[0m
            |   |       |   |-- [01;34mcommands[0m
            |   |       |   |   |-- [01;34mapplication[0m
            |   |       |   |   |   `-- [00mapplication_command.rb[0m
            |   |       |   |   |-- [01;34mconsole[0m
            |   |       |   |   |   `-- [00mconsole_command.rb[0m
            |   |       |   |   |-- [01;34mcredentials[0m
            |   |       |   |   |   |-- [00mUSAGE[0m
            |   |       |   |   |   |-- [01;34mcredentials_command[0m
            |   |       |   |   |   |   `-- [00mdiffing.rb[0m
            |   |       |   |   |   `-- [00mcredentials_command.rb[0m
            |   |       |   |   |-- [01;34mdb[0m
            |   |       |   |   |   `-- [01;34msystem[0m
            |   |       |   |   |       `-- [01;34mchange[0m
            |   |       |   |   |           `-- [00mchange_command.rb[0m
            |   |       |   |   |-- [01;34mdbconsole[0m
            |   |       |   |   |   `-- [00mdbconsole_command.rb[0m
            |   |       |   |   |-- [01;34mdestroy[0m
            |   |       |   |   |   `-- [00mdestroy_command.rb[0m
            |   |       |   |   |-- [01;34mdev[0m
            |   |       |   |   |   `-- [00mdev_command.rb[0m
            |   |       |   |   |-- [01;34mencrypted[0m
            |   |       |   |   |   |-- [00mUSAGE[0m
            |   |       |   |   |   `-- [00mencrypted_command.rb[0m
            |   |       |   |   |-- [01;34mgenerate[0m
            |   |       |   |   |   `-- [00mgenerate_command.rb[0m
            |   |       |   |   |-- [01;34mhelp[0m
            |   |       |   |   |   |-- [00mUSAGE[0m
            |   |       |   |   |   `-- [00mhelp_command.rb[0m
            |   |       |   |   |-- [01;34minitializers[0m
            |   |       |   |   |   `-- [00minitializers_command.rb[0m
            |   |       |   |   |-- [01;34mnew[0m
            |   |       |   |   |   `-- [00mnew_command.rb[0m
            |   |       |   |   |-- [01;34mnotes[0m
            |   |       |   |   |   `-- [00mnotes_command.rb[0m
            |   |       |   |   |-- [01;34mplugin[0m
            |   |       |   |   |   `-- [00mplugin_command.rb[0m
            |   |       |   |   |-- [01;34mrake[0m
            |   |       |   |   |   `-- [00mrake_command.rb[0m
            |   |       |   |   |-- [01;34mroutes[0m
            |   |       |   |   |   `-- [00mroutes_command.rb[0m
            |   |       |   |   |-- [01;34mrunner[0m
            |   |       |   |   |   |-- [00mUSAGE[0m
            |   |       |   |   |   `-- [00mrunner_command.rb[0m
            |   |       |   |   |-- [01;34msecrets[0m
            |   |       |   |   |   |-- [00mUSAGE[0m
            |   |       |   |   |   `-- [00msecrets_command.rb[0m
            |   |       |   |   |-- [01;34mserver[0m
            |   |       |   |   |   `-- [00mserver_command.rb[0m
            |   |       |   |   |-- [01;34mtest[0m
            |   |       |   |   |   `-- [00mtest_command.rb[0m
            |   |       |   |   `-- [01;34mversion[0m
            |   |       |   |       `-- [00mversion_command.rb[0m
            |   |       |   |-- [00mcommands.rb[0m
            |   |       |   |-- [00mconfiguration.rb[0m
            |   |       |   |-- [01;34mconsole[0m
            |   |       |   |   |-- [00mapp.rb[0m
            |   |       |   |   `-- [00mhelpers.rb[0m
            |   |       |   |-- [00mdev_caching.rb[0m
            |   |       |   |-- [01;34mengine[0m
            |   |       |   |   |-- [00mcommands.rb[0m
            |   |       |   |   |-- [00mconfiguration.rb[0m
            |   |       |   |   |-- [00mrailties.rb[0m
            |   |       |   |   `-- [00mupdater.rb[0m
            |   |       |   |-- [00mengine.rb[0m
            |   |       |   |-- [00mgem_version.rb[0m
            |   |       |   |-- [01;34mgenerators[0m
            |   |       |   |   |-- [01;34mactions[0m
            |   |       |   |   |   `-- [00mcreate_migration.rb[0m
            |   |       |   |   |-- [00mactions.rb[0m
            |   |       |   |   |-- [00mactive_model.rb[0m
            |   |       |   |   |-- [00mapp_base.rb[0m
            |   |       |   |   |-- [00mapp_name.rb[0m
            |   |       |   |   |-- [00mbase.rb[0m
            |   |       |   |   |-- [00mdatabase.rb[0m
            |   |       |   |   |-- [01;34merb[0m
            |   |       |   |   |   |-- [01;34mcontroller[0m
            |   |       |   |   |   |   |-- [00mcontroller_generator.rb[0m
            |   |       |   |   |   |   `-- [01;34mtemplates[0m
            |   |       |   |   |   |       `-- [00mview.html.erb.tt[0m
            |   |       |   |   |   |-- [01;34mmailer[0m
            |   |       |   |   |   |   |-- [00mmailer_generator.rb[0m
            |   |       |   |   |   |   `-- [01;34mtemplates[0m
            |   |       |   |   |   |       |-- [00mlayout.html.erb.tt[0m
            |   |       |   |   |   |       |-- [00mlayout.text.erb.tt[0m
            |   |       |   |   |   |       |-- [00mview.html.erb.tt[0m
            |   |       |   |   |   |       `-- [00mview.text.erb.tt[0m
            |   |       |   |   |   `-- [01;34mscaffold[0m
            |   |       |   |   |       |-- [00mscaffold_generator.rb[0m
            |   |       |   |   |       `-- [01;34mtemplates[0m
            |   |       |   |   |           |-- [00m_form.html.erb.tt[0m
            |   |       |   |   |           |-- [00medit.html.erb.tt[0m
            |   |       |   |   |           |-- [00mindex.html.erb.tt[0m
            |   |       |   |   |           |-- [00mnew.html.erb.tt[0m
            |   |       |   |   |           |-- [00mpartial.html.erb.tt[0m
            |   |       |   |   |           `-- [00mshow.html.erb.tt[0m
            |   |       |   |   |-- [00merb.rb[0m
            |   |       |   |   |-- [00mgenerated_attribute.rb[0m
            |   |       |   |   |-- [00mmigration.rb[0m
            |   |       |   |   |-- [00mmodel_helpers.rb[0m
            |   |       |   |   |-- [00mnamed_base.rb[0m
            |   |       |   |   |-- [01;34mrails[0m
            |   |       |   |   |   |-- [01;34mapp[0m
            |   |       |   |   |   |   |-- [00mUSAGE[0m
            |   |       |   |   |   |   |-- [00mapp_generator.rb[0m
            |   |       |   |   |   |   `-- [01;34mtemplates[0m
            |   |       |   |   |   |       |-- [00mGemfile.tt[0m
            |   |       |   |   |   |       |-- [00mREADME.md.tt[0m
            |   |       |   |   |   |       |-- [00mRakefile.tt[0m
            |   |       |   |   |   |       |-- [01;34mapp[0m
            |   |       |   |   |   |       |   |-- [01;34massets[0m
            |   |       |   |   |   |       |   |   |-- [01;34mconfig[0m
            |   |       |   |   |   |       |   |   |   `-- [00mmanifest.js.tt[0m
            |   |       |   |   |   |       |   |   `-- [01;34mstylesheets[0m
            |   |       |   |   |   |       |   |       `-- [00mapplication.css.tt[0m
            |   |       |   |   |   |       |   |-- [01;34mchannels[0m
            |   |       |   |   |   |       |   |   `-- [01;34mapplication_cable[0m
            |   |       |   |   |   |       |   |       |-- [00mchannel.rb.tt[0m
            |   |       |   |   |   |       |   |       `-- [00mconnection.rb.tt[0m
            |   |       |   |   |   |       |   |-- [01;34mcontrollers[0m
            |   |       |   |   |   |       |   |   `-- [00mapplication_controller.rb.tt[0m
            |   |       |   |   |   |       |   |-- [01;34mhelpers[0m
            |   |       |   |   |   |       |   |   `-- [00mapplication_helper.rb.tt[0m
            |   |       |   |   |   |       |   |-- [01;34mjobs[0m
            |   |       |   |   |   |       |   |   `-- [00mapplication_job.rb.tt[0m
            |   |       |   |   |   |       |   |-- [01;34mmailers[0m
            |   |       |   |   |   |       |   |   `-- [00mapplication_mailer.rb.tt[0m
            |   |       |   |   |   |       |   |-- [01;34mmodels[0m
            |   |       |   |   |   |       |   |   `-- [00mapplication_record.rb.tt[0m
            |   |       |   |   |   |       |   `-- [01;34mviews[0m
            |   |       |   |   |   |       |       `-- [01;34mlayouts[0m
            |   |       |   |   |   |       |           |-- [00mapplication.html.erb.tt[0m
            |   |       |   |   |   |       |           |-- [00mmailer.html.erb.tt[0m
            |   |       |   |   |   |       |           `-- [00mmailer.text.erb.tt[0m
            |   |       |   |   |   |       |-- [01;34mbin[0m
            |   |       |   |   |   |       |   |-- [00mrails.tt[0m
            |   |       |   |   |   |       |   |-- [00mrake.tt[0m
            |   |       |   |   |   |       |   `-- [00msetup.tt[0m
            |   |       |   |   |   |       |-- [01;34mconfig[0m
            |   |       |   |   |   |       |   |-- [00mapplication.rb.tt[0m
            |   |       |   |   |   |       |   |-- [00mboot.rb.tt[0m
            |   |       |   |   |   |       |   |-- [00mcable.yml.tt[0m
            |   |       |   |   |   |       |   |-- [01;34mdatabases[0m
            |   |       |   |   |   |       |   |   |-- [00mjdbc.yml.tt[0m
            |   |       |   |   |   |       |   |   |-- [00mjdbcmysql.yml.tt[0m
            |   |       |   |   |   |       |   |   |-- [00mjdbcpostgresql.yml.tt[0m
            |   |       |   |   |   |       |   |   |-- [00mjdbcsqlite3.yml.tt[0m
            |   |       |   |   |   |       |   |   |-- [00mmysql.yml.tt[0m
            |   |       |   |   |   |       |   |   |-- [00moracle.yml.tt[0m
            |   |       |   |   |   |       |   |   |-- [00mpostgresql.yml.tt[0m
            |   |       |   |   |   |       |   |   |-- [00msqlite3.yml.tt[0m
            |   |       |   |   |   |       |   |   `-- [00msqlserver.yml.tt[0m
            |   |       |   |   |   |       |   |-- [00menvironment.rb.tt[0m
            |   |       |   |   |   |       |   |-- [01;34menvironments[0m
            |   |       |   |   |   |       |   |   |-- [00mdevelopment.rb.tt[0m
            |   |       |   |   |   |       |   |   |-- [00mproduction.rb.tt[0m
            |   |       |   |   |   |       |   |   `-- [00mtest.rb.tt[0m
            |   |       |   |   |   |       |   |-- [01;34minitializers[0m
            |   |       |   |   |   |       |   |   |-- [00massets.rb.tt[0m
            |   |       |   |   |   |       |   |   |-- [00mcontent_security_policy.rb.tt[0m
            |   |       |   |   |   |       |   |   |-- [00mcors.rb.tt[0m
            |   |       |   |   |   |       |   |   |-- [00mfilter_parameter_logging.rb.tt[0m
            |   |       |   |   |   |       |   |   |-- [00minflections.rb.tt[0m
            |   |       |   |   |   |       |   |   |-- [00mnew_framework_defaults_7_0.rb.tt[0m
            |   |       |   |   |   |       |   |   `-- [00mpermissions_policy.rb.tt[0m
            |   |       |   |   |   |       |   |-- [01;34mlocales[0m
            |   |       |   |   |   |       |   |   `-- [00men.yml[0m
            |   |       |   |   |   |       |   |-- [00mpuma.rb.tt[0m
            |   |       |   |   |   |       |   |-- [00mroutes.rb.tt[0m
            |   |       |   |   |   |       |   `-- [00mstorage.yml.tt[0m
            |   |       |   |   |   |       |-- [00mconfig.ru.tt[0m
            |   |       |   |   |   |       |-- [01;34mdb[0m
            |   |       |   |   |   |       |   `-- [00mseeds.rb.tt[0m
            |   |       |   |   |   |       |-- [00mgitattributes.tt[0m
            |   |       |   |   |   |       |-- [00mgitignore.tt[0m
            |   |       |   |   |   |       |-- [01;34mpublic[0m
            |   |       |   |   |   |       |   |-- [00m404.html[0m
            |   |       |   |   |   |       |   |-- [00m422.html[0m
            |   |       |   |   |   |       |   |-- [00m500.html[0m
            |   |       |   |   |   |       |   |-- [00mapple-touch-icon-precomposed.png[0m
            |   |       |   |   |   |       |   |-- [00mapple-touch-icon.png[0m
            |   |       |   |   |   |       |   |-- [00mfavicon.ico[0m
            |   |       |   |   |   |       |   `-- [00mrobots.txt[0m
            |   |       |   |   |   |       |-- [00mruby-version.tt[0m
            |   |       |   |   |   |       `-- [01;34mtest[0m
            |   |       |   |   |   |           |-- [00mapplication_system_test_case.rb.tt[0m
            |   |       |   |   |   |           |-- [01;34mchannels[0m
            |   |       |   |   |   |           |   `-- [01;34mapplication_cable[0m
            |   |       |   |   |   |           |       `-- [00mconnection_test.rb.tt[0m
            |   |       |   |   |   |           `-- [00mtest_helper.rb.tt[0m
            |   |       |   |   |   |-- [01;34mapplication_record[0m
            |   |       |   |   |   |   `-- [00mapplication_record_generator.rb[0m
            |   |       |   |   |   |-- [01;34mbenchmark[0m
            |   |       |   |   |   |   |-- [00mUSAGE[0m
            |   |       |   |   |   |   |-- [00mbenchmark_generator.rb[0m
            |   |       |   |   |   |   `-- [01;34mtemplates[0m
            |   |       |   |   |   |       `-- [00mbenchmark.rb.tt[0m
            |   |       |   |   |   |-- [01;34mcontroller[0m
            |   |       |   |   |   |   |-- [00mUSAGE[0m
            |   |       |   |   |   |   |-- [00mcontroller_generator.rb[0m
            |   |       |   |   |   |   `-- [01;34mtemplates[0m
            |   |       |   |   |   |       `-- [00mcontroller.rb.tt[0m
            |   |       |   |   |   |-- [01;34mcredentials[0m
            |   |       |   |   |   |   `-- [00mcredentials_generator.rb[0m
            |   |       |   |   |   |-- [01;34mdb[0m
            |   |       |   |   |   |   `-- [01;34msystem[0m
            |   |       |   |   |   |       `-- [01;34mchange[0m
            |   |       |   |   |   |           `-- [00mchange_generator.rb[0m
            |   |       |   |   |   |-- [01;34mencrypted_file[0m
            |   |       |   |   |   |   `-- [00mencrypted_file_generator.rb[0m
            |   |       |   |   |   |-- [01;34mencryption_key_file[0m
            |   |       |   |   |   |   `-- [00mencryption_key_file_generator.rb[0m
            |   |       |   |   |   |-- [01;34mgenerator[0m
            |   |       |   |   |   |   |-- [00mUSAGE[0m
            |   |       |   |   |   |   |-- [00mgenerator_generator.rb[0m
            |   |       |   |   |   |   `-- [01;34mtemplates[0m
            |   |       |   |   |   |       |-- [00m%file_name%_generator.rb.tt[0m
            |   |       |   |   |   |       |-- [00mUSAGE.tt[0m
            |   |       |   |   |   |       `-- [01;34mtemplates[0m
            |   |       |   |   |   |-- [01;34mhelper[0m
            |   |       |   |   |   |   |-- [00mUSAGE[0m
            |   |       |   |   |   |   |-- [00mhelper_generator.rb[0m
            |   |       |   |   |   |   `-- [01;34mtemplates[0m
            |   |       |   |   |   |       `-- [00mhelper.rb.tt[0m
            |   |       |   |   |   |-- [01;34mintegration_test[0m
            |   |       |   |   |   |   |-- [00mUSAGE[0m
            |   |       |   |   |   |   `-- [00mintegration_test_generator.rb[0m
            |   |       |   |   |   |-- [01;34mmaster_key[0m
            |   |       |   |   |   |   `-- [00mmaster_key_generator.rb[0m
            |   |       |   |   |   |-- [01;34mmigration[0m
            |   |       |   |   |   |   |-- [00mUSAGE[0m
            |   |       |   |   |   |   `-- [00mmigration_generator.rb[0m
            |   |       |   |   |   |-- [01;34mmodel[0m
            |   |       |   |   |   |   |-- [00mUSAGE[0m
            |   |       |   |   |   |   `-- [00mmodel_generator.rb[0m
            |   |       |   |   |   |-- [01;34mplugin[0m
            |   |       |   |   |   |   |-- [00mUSAGE[0m
            |   |       |   |   |   |   |-- [00mplugin_generator.rb[0m
            |   |       |   |   |   |   `-- [01;34mtemplates[0m
            |   |       |   |   |   |       |-- [00m%name%.gemspec.tt[0m
            |   |       |   |   |   |       |-- [00mGemfile.tt[0m
            |   |       |   |   |   |       |-- [00mMIT-LICENSE.tt[0m
            |   |       |   |   |   |       |-- [00mREADME.md.tt[0m
            |   |       |   |   |   |       |-- [00mRakefile.tt[0m
            |   |       |   |   |   |       |-- [01;34mapp[0m
            |   |       |   |   |   |       |   |-- [01;34mcontrollers[0m
            |   |       |   |   |   |       |   |   `-- [01;34m%namespaced_name%[0m
            |   |       |   |   |   |       |   |       `-- [00mapplication_controller.rb.tt[0m
            |   |       |   |   |   |       |   |-- [01;34mhelpers[0m
            |   |       |   |   |   |       |   |   `-- [01;34m%namespaced_name%[0m
            |   |       |   |   |   |       |   |       `-- [00mapplication_helper.rb.tt[0m
            |   |       |   |   |   |       |   |-- [01;34mjobs[0m
            |   |       |   |   |   |       |   |   `-- [01;34m%namespaced_name%[0m
            |   |       |   |   |   |       |   |       `-- [00mapplication_job.rb.tt[0m
            |   |       |   |   |   |       |   |-- [01;34mmailers[0m
            |   |       |   |   |   |       |   |   `-- [01;34m%namespaced_name%[0m
            |   |       |   |   |   |       |   |       `-- [00mapplication_mailer.rb.tt[0m
            |   |       |   |   |   |       |   |-- [01;34mmodels[0m
            |   |       |   |   |   |       |   |   `-- [01;34m%namespaced_name%[0m
            |   |       |   |   |   |       |   |       `-- [00mapplication_record.rb.tt[0m
            |   |       |   |   |   |       |   `-- [01;34mviews[0m
            |   |       |   |   |   |       |       `-- [01;34mlayouts[0m
            |   |       |   |   |   |       |           `-- [01;34m%namespaced_name%[0m
            |   |       |   |   |   |       |               `-- [00mapplication.html.erb.tt[0m
            |   |       |   |   |   |       |-- [01;34mbin[0m
            |   |       |   |   |   |       |   |-- [00mrails.tt[0m
            |   |       |   |   |   |       |   `-- [00mtest.tt[0m
            |   |       |   |   |   |       |-- [01;34mconfig[0m
            |   |       |   |   |   |       |   `-- [00mroutes.rb.tt[0m
            |   |       |   |   |   |       |-- [00mgitignore.tt[0m
            |   |       |   |   |   |       |-- [01;34mlib[0m
            |   |       |   |   |   |       |   |-- [01;34m%namespaced_name%[0m
            |   |       |   |   |   |       |   |   |-- [00mengine.rb.tt[0m
            |   |       |   |   |   |       |   |   |-- [00mrailtie.rb.tt[0m
            |   |       |   |   |   |       |   |   `-- [00mversion.rb.tt[0m
            |   |       |   |   |   |       |   |-- [00m%namespaced_name%.rb.tt[0m
            |   |       |   |   |   |       |   `-- [01;34mtasks[0m
            |   |       |   |   |   |       |       `-- [00m%namespaced_name%_tasks.rake.tt[0m
            |   |       |   |   |   |       |-- [01;34mrails[0m
            |   |       |   |   |   |       |   |-- [00mboot.rb.tt[0m
            |   |       |   |   |   |       |   |-- [00mdummy_manifest.js.tt[0m
            |   |       |   |   |   |       |   |-- [00mengine_manifest.js.tt[0m
            |   |       |   |   |   |       |   |-- [00mjavascripts.js.tt[0m
            |   |       |   |   |   |       |   |-- [00mroutes.rb.tt[0m
            |   |       |   |   |   |       |   `-- [00mstylesheets.css[0m
            |   |       |   |   |   |       `-- [01;34mtest[0m
            |   |       |   |   |   |           |-- [00m%namespaced_name%_test.rb.tt[0m
            |   |       |   |   |   |           |-- [00mapplication_system_test_case.rb.tt[0m
            |   |       |   |   |   |           |-- [01;34mintegration[0m
            |   |       |   |   |   |           |   `-- [00mnavigation_test.rb.tt[0m
            |   |       |   |   |   |           `-- [00mtest_helper.rb.tt[0m
            |   |       |   |   |   |-- [01;34mresource[0m
            |   |       |   |   |   |   |-- [00mUSAGE[0m
            |   |       |   |   |   |   `-- [00mresource_generator.rb[0m
            |   |       |   |   |   |-- [01;34mresource_route[0m
            |   |       |   |   |   |   `-- [00mresource_route_generator.rb[0m
            |   |       |   |   |   |-- [01;34mscaffold[0m
            |   |       |   |   |   |   |-- [00mUSAGE[0m
            |   |       |   |   |   |   `-- [00mscaffold_generator.rb[0m
            |   |       |   |   |   |-- [01;34mscaffold_controller[0m
            |   |       |   |   |   |   |-- [00mUSAGE[0m
            |   |       |   |   |   |   |-- [00mscaffold_controller_generator.rb[0m
            |   |       |   |   |   |   `-- [01;34mtemplates[0m
            |   |       |   |   |   |       |-- [00mapi_controller.rb.tt[0m
            |   |       |   |   |   |       `-- [00mcontroller.rb.tt[0m
            |   |       |   |   |   |-- [01;34msystem_test[0m
            |   |       |   |   |   |   |-- [00mUSAGE[0m
            |   |       |   |   |   |   `-- [00msystem_test_generator.rb[0m
            |   |       |   |   |   `-- [01;34mtask[0m
            |   |       |   |   |       |-- [00mUSAGE[0m
            |   |       |   |   |       |-- [00mtask_generator.rb[0m
            |   |       |   |   |       `-- [01;34mtemplates[0m
            |   |       |   |   |           `-- [00mtask.rb.tt[0m
            |   |       |   |   |-- [00mresource_helpers.rb[0m
            |   |       |   |   |-- [00mtest_case.rb[0m
            |   |       |   |   |-- [01;34mtest_unit[0m
            |   |       |   |   |   |-- [01;34mcontroller[0m
            |   |       |   |   |   |   |-- [00mcontroller_generator.rb[0m
            |   |       |   |   |   |   `-- [01;34mtemplates[0m
            |   |       |   |   |   |       `-- [00mfunctional_test.rb.tt[0m
            |   |       |   |   |   |-- [01;34mgenerator[0m
            |   |       |   |   |   |   |-- [00mgenerator_generator.rb[0m
            |   |       |   |   |   |   `-- [01;34mtemplates[0m
            |   |       |   |   |   |       `-- [00mgenerator_test.rb.tt[0m
            |   |       |   |   |   |-- [01;34mhelper[0m
            |   |       |   |   |   |   `-- [00mhelper_generator.rb[0m
            |   |       |   |   |   |-- [01;34mintegration[0m
            |   |       |   |   |   |   |-- [00mintegration_generator.rb[0m
            |   |       |   |   |   |   `-- [01;34mtemplates[0m
            |   |       |   |   |   |       `-- [00mintegration_test.rb.tt[0m
            |   |       |   |   |   |-- [01;34mjob[0m
            |   |       |   |   |   |   |-- [00mjob_generator.rb[0m
            |   |       |   |   |   |   `-- [01;34mtemplates[0m
            |   |       |   |   |   |       `-- [00munit_test.rb.tt[0m
            |   |       |   |   |   |-- [01;34mmailer[0m
            |   |       |   |   |   |   |-- [00mmailer_generator.rb[0m
            |   |       |   |   |   |   `-- [01;34mtemplates[0m
            |   |       |   |   |   |       |-- [00mfunctional_test.rb.tt[0m
            |   |       |   |   |   |       `-- [00mpreview.rb.tt[0m
            |   |       |   |   |   |-- [01;34mmodel[0m
            |   |       |   |   |   |   |-- [00mmodel_generator.rb[0m
            |   |       |   |   |   |   `-- [01;34mtemplates[0m
            |   |       |   |   |   |       |-- [00mfixtures.yml.tt[0m
            |   |       |   |   |   |       `-- [00munit_test.rb.tt[0m
            |   |       |   |   |   |-- [01;34mplugin[0m
            |   |       |   |   |   |   |-- [00mplugin_generator.rb[0m
            |   |       |   |   |   |   `-- [01;34mtemplates[0m
            |   |       |   |   |   |       |-- [00m%file_name%_test.rb.tt[0m
            |   |       |   |   |   |       `-- [00mtest_helper.rb[0m
            |   |       |   |   |   |-- [01;34mscaffold[0m
            |   |       |   |   |   |   |-- [00mscaffold_generator.rb[0m
            |   |       |   |   |   |   `-- [01;34mtemplates[0m
            |   |       |   |   |   |       |-- [00mapi_functional_test.rb.tt[0m
            |   |       |   |   |   |       |-- [00mfunctional_test.rb.tt[0m
            |   |       |   |   |   |       `-- [00msystem_test.rb.tt[0m
            |   |       |   |   |   `-- [01;34msystem[0m
            |   |       |   |   |       |-- [00msystem_generator.rb[0m
            |   |       |   |   |       `-- [01;34mtemplates[0m
            |   |       |   |   |           |-- [00mapplication_system_test_case.rb.tt[0m
            |   |       |   |   |           `-- [00msystem_test.rb.tt[0m
            |   |       |   |   |-- [00mtest_unit.rb[0m
            |   |       |   |   `-- [01;34mtesting[0m
            |   |       |   |       |-- [00massertions.rb[0m
            |   |       |   |       |-- [00mbehaviour.rb[0m
            |   |       |   |       `-- [00msetup_and_teardown.rb[0m
            |   |       |   |-- [00mgenerators.rb[0m
            |   |       |   |-- [00minfo.rb[0m
            |   |       |   |-- [00minfo_controller.rb[0m
            |   |       |   |-- [00minitializable.rb[0m
            |   |       |   |-- [00mmailers_controller.rb[0m
            |   |       |   |-- [00mpaths.rb[0m
            |   |       |   |-- [01;34mplugin[0m
            |   |       |   |   `-- [00mtest.rb[0m
            |   |       |   |-- [01;34mrack[0m
            |   |       |   |   `-- [00mlogger.rb[0m
            |   |       |   |-- [00mrack.rb[0m
            |   |       |   |-- [01;34mrailtie[0m
            |   |       |   |   |-- [00mconfigurable.rb[0m
            |   |       |   |   `-- [00mconfiguration.rb[0m
            |   |       |   |-- [00mrailtie.rb[0m
            |   |       |   |-- [00mruby_version_check.rb[0m
            |   |       |   |-- [00msecrets.rb[0m
            |   |       |   |-- [00msource_annotation_extractor.rb[0m
            |   |       |   |-- [01;34mtasks[0m
            |   |       |   |   |-- [00mengine.rake[0m
            |   |       |   |   |-- [00mframework.rake[0m
            |   |       |   |   |-- [00mlog.rake[0m
            |   |       |   |   |-- [00mmiddleware.rake[0m
            |   |       |   |   |-- [00mmisc.rake[0m
            |   |       |   |   |-- [00mrestart.rake[0m
            |   |       |   |   |-- [00mstatistics.rake[0m
            |   |       |   |   |-- [00mtmp.rake[0m
            |   |       |   |   |-- [00myarn.rake[0m
            |   |       |   |   `-- [00mzeitwerk.rake[0m
            |   |       |   |-- [00mtasks.rb[0m
            |   |       |   |-- [01;34mtemplates[0m
            |   |       |   |   |-- [01;34mlayouts[0m
            |   |       |   |   |   `-- [00mapplication.html.erb[0m
            |   |       |   |   `-- [01;34mrails[0m
            |   |       |   |       |-- [01;34minfo[0m
            |   |       |   |       |   |-- [00mproperties.html.erb[0m
            |   |       |   |       |   `-- [00mroutes.html.erb[0m
            |   |       |   |       |-- [01;34mmailers[0m
            |   |       |   |       |   |-- [00memail.html.erb[0m
            |   |       |   |       |   |-- [00mindex.html.erb[0m
            |   |       |   |       |   `-- [00mmailer.html.erb[0m
            |   |       |   |       `-- [01;34mwelcome[0m
            |   |       |   |           `-- [00mindex.html.erb[0m
            |   |       |   |-- [00mtest_help.rb[0m
            |   |       |   |-- [01;34mtest_unit[0m
            |   |       |   |   |-- [00mline_filtering.rb[0m
            |   |       |   |   |-- [00mrailtie.rb[0m
            |   |       |   |   |-- [00mreporter.rb[0m
            |   |       |   |   |-- [00mrunner.rb[0m
            |   |       |   |   `-- [00mtesting.rake[0m
            |   |       |   |-- [00mversion.rb[0m
            |   |       |   `-- [00mwelcome_controller.rb[0m
            |   |       `-- [00mrails.rb[0m
            |   |-- [01;34mrake-13.0.6[0m
            |   |   |-- [00mHistory.rdoc[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.rdoc[0m
            |   |   |-- [01;34mdoc[0m
            |   |   |   |-- [00mcommand_line_usage.rdoc[0m
            |   |   |   |-- [01;34mexample[0m
            |   |   |   |   |-- [00mRakefile1[0m
            |   |   |   |   |-- [00mRakefile2[0m
            |   |   |   |   |-- [00ma.c[0m
            |   |   |   |   |-- [00mb.c[0m
            |   |   |   |   `-- [00mmain.c[0m
            |   |   |   |-- [00mglossary.rdoc[0m
            |   |   |   |-- [00mjamis.rb[0m
            |   |   |   |-- [00mproto_rake.rdoc[0m
            |   |   |   |-- [00mrake.1[0m
            |   |   |   |-- [00mrakefile.rdoc[0m
            |   |   |   `-- [00mrational.rdoc[0m
            |   |   |-- [01;34mexe[0m
            |   |   |   `-- [01;32mrake[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34mrake[0m
            |   |   |   |   |-- [00mapplication.rb[0m
            |   |   |   |   |-- [00mbacktrace.rb[0m
            |   |   |   |   |-- [00mclean.rb[0m
            |   |   |   |   |-- [00mcloneable.rb[0m
            |   |   |   |   |-- [00mcpu_counter.rb[0m
            |   |   |   |   |-- [00mdefault_loader.rb[0m
            |   |   |   |   |-- [00mdsl_definition.rb[0m
            |   |   |   |   |-- [00mearly_time.rb[0m
            |   |   |   |   |-- [01;34mext[0m
            |   |   |   |   |   |-- [00mcore.rb[0m
            |   |   |   |   |   `-- [00mstring.rb[0m
            |   |   |   |   |-- [00mfile_creation_task.rb[0m
            |   |   |   |   |-- [00mfile_list.rb[0m
            |   |   |   |   |-- [00mfile_task.rb[0m
            |   |   |   |   |-- [00mfile_utils.rb[0m
            |   |   |   |   |-- [00mfile_utils_ext.rb[0m
            |   |   |   |   |-- [00minvocation_chain.rb[0m
            |   |   |   |   |-- [00minvocation_exception_mixin.rb[0m
            |   |   |   |   |-- [00mlate_time.rb[0m
            |   |   |   |   |-- [00mlinked_list.rb[0m
            |   |   |   |   |-- [01;34mloaders[0m
            |   |   |   |   |   `-- [00mmakefile.rb[0m
            |   |   |   |   |-- [00mmulti_task.rb[0m
            |   |   |   |   |-- [00mname_space.rb[0m
            |   |   |   |   |-- [00mpackagetask.rb[0m
            |   |   |   |   |-- [00mphony.rb[0m
            |   |   |   |   |-- [00mprivate_reader.rb[0m
            |   |   |   |   |-- [00mpromise.rb[0m
            |   |   |   |   |-- [00mpseudo_status.rb[0m
            |   |   |   |   |-- [00mrake_module.rb[0m
            |   |   |   |   |-- [00mrake_test_loader.rb[0m
            |   |   |   |   |-- [00mrule_recursion_overflow_error.rb[0m
            |   |   |   |   |-- [00mscope.rb[0m
            |   |   |   |   |-- [00mtask.rb[0m
            |   |   |   |   |-- [00mtask_argument_error.rb[0m
            |   |   |   |   |-- [00mtask_arguments.rb[0m
            |   |   |   |   |-- [00mtask_manager.rb[0m
            |   |   |   |   |-- [00mtasklib.rb[0m
            |   |   |   |   |-- [00mtesttask.rb[0m
            |   |   |   |   |-- [00mthread_history_display.rb[0m
            |   |   |   |   |-- [00mthread_pool.rb[0m
            |   |   |   |   |-- [00mtrace_output.rb[0m
            |   |   |   |   |-- [00mversion.rb[0m
            |   |   |   |   `-- [00mwin32.rb[0m
            |   |   |   `-- [00mrake.rb[0m
            |   |   `-- [00mrake.gemspec[0m
            |   |-- [01;34mregexp_parser-2.7.0[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mGemfile[0m
            |   |   |-- [00mLICENSE[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [00mRakefile[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34mregexp_parser[0m
            |   |   |   |   |-- [00merror.rb[0m
            |   |   |   |   |-- [01;34mexpression[0m
            |   |   |   |   |   |-- [00mbase.rb[0m
            |   |   |   |   |   |-- [01;34mclasses[0m
            |   |   |   |   |   |   |-- [00malternation.rb[0m
            |   |   |   |   |   |   |-- [00manchor.rb[0m
            |   |   |   |   |   |   |-- [00mbackreference.rb[0m
            |   |   |   |   |   |   |-- [01;34mcharacter_set[0m
            |   |   |   |   |   |   |   |-- [00mintersection.rb[0m
            |   |   |   |   |   |   |   `-- [00mrange.rb[0m
            |   |   |   |   |   |   |-- [00mcharacter_set.rb[0m
            |   |   |   |   |   |   |-- [00mcharacter_type.rb[0m
            |   |   |   |   |   |   |-- [00mconditional.rb[0m
            |   |   |   |   |   |   |-- [00mescape_sequence.rb[0m
            |   |   |   |   |   |   |-- [00mfree_space.rb[0m
            |   |   |   |   |   |   |-- [00mgroup.rb[0m
            |   |   |   |   |   |   |-- [00mkeep.rb[0m
            |   |   |   |   |   |   |-- [00mliteral.rb[0m
            |   |   |   |   |   |   |-- [00mposix_class.rb[0m
            |   |   |   |   |   |   |-- [00mroot.rb[0m
            |   |   |   |   |   |   `-- [00municode_property.rb[0m
            |   |   |   |   |   |-- [01;34mmethods[0m
            |   |   |   |   |   |   |-- [00mconstruct.rb[0m
            |   |   |   |   |   |   |-- [00mhuman_name.rb[0m
            |   |   |   |   |   |   |-- [00mmatch.rb[0m
            |   |   |   |   |   |   |-- [00mmatch_length.rb[0m
            |   |   |   |   |   |   |-- [00moptions.rb[0m
            |   |   |   |   |   |   |-- [00mstrfregexp.rb[0m
            |   |   |   |   |   |   |-- [00mtests.rb[0m
            |   |   |   |   |   |   `-- [00mtraverse.rb[0m
            |   |   |   |   |   |-- [00mquantifier.rb[0m
            |   |   |   |   |   |-- [00msequence.rb[0m
            |   |   |   |   |   |-- [00msequence_operation.rb[0m
            |   |   |   |   |   |-- [00mshared.rb[0m
            |   |   |   |   |   `-- [00msubexpression.rb[0m
            |   |   |   |   |-- [00mexpression.rb[0m
            |   |   |   |   |-- [00mlexer.rb[0m
            |   |   |   |   |-- [00mparser.rb[0m
            |   |   |   |   |-- [01;34mscanner[0m
            |   |   |   |   |   |-- [00mchar_type.rl[0m
            |   |   |   |   |   |-- [01;34mproperties[0m
            |   |   |   |   |   |   |-- [00mlong.csv[0m
            |   |   |   |   |   |   `-- [00mshort.csv[0m
            |   |   |   |   |   |-- [00mproperty.rl[0m
            |   |   |   |   |   `-- [00mscanner.rl[0m
            |   |   |   |   |-- [00mscanner.rb[0m
            |   |   |   |   |-- [01;34msyntax[0m
            |   |   |   |   |   |-- [00many.rb[0m
            |   |   |   |   |   |-- [00mbase.rb[0m
            |   |   |   |   |   |-- [01;34mtoken[0m
            |   |   |   |   |   |   |-- [00manchor.rb[0m
            |   |   |   |   |   |   |-- [00massertion.rb[0m
            |   |   |   |   |   |   |-- [00mbackreference.rb[0m
            |   |   |   |   |   |   |-- [00mcharacter_set.rb[0m
            |   |   |   |   |   |   |-- [00mcharacter_type.rb[0m
            |   |   |   |   |   |   |-- [00mconditional.rb[0m
            |   |   |   |   |   |   |-- [00mescape.rb[0m
            |   |   |   |   |   |   |-- [00mgroup.rb[0m
            |   |   |   |   |   |   |-- [00mkeep.rb[0m
            |   |   |   |   |   |   |-- [00mmeta.rb[0m
            |   |   |   |   |   |   |-- [00mposix_class.rb[0m
            |   |   |   |   |   |   |-- [00mquantifier.rb[0m
            |   |   |   |   |   |   `-- [00municode_property.rb[0m
            |   |   |   |   |   |-- [00mtoken.rb[0m
            |   |   |   |   |   |-- [00mversion_lookup.rb[0m
            |   |   |   |   |   |-- [01;34mversions[0m
            |   |   |   |   |   |   |-- [00m1.8.6.rb[0m
            |   |   |   |   |   |   |-- [00m1.9.1.rb[0m
            |   |   |   |   |   |   |-- [00m1.9.3.rb[0m
            |   |   |   |   |   |   |-- [00m2.0.0.rb[0m
            |   |   |   |   |   |   |-- [00m2.2.0.rb[0m
            |   |   |   |   |   |   |-- [00m2.3.0.rb[0m
            |   |   |   |   |   |   |-- [00m2.4.0.rb[0m
            |   |   |   |   |   |   |-- [00m2.4.1.rb[0m
            |   |   |   |   |   |   |-- [00m2.5.0.rb[0m
            |   |   |   |   |   |   |-- [00m2.6.0.rb[0m
            |   |   |   |   |   |   |-- [00m2.6.2.rb[0m
            |   |   |   |   |   |   |-- [00m2.6.3.rb[0m
            |   |   |   |   |   |   |-- [00m3.1.0.rb[0m
            |   |   |   |   |   |   `-- [00m3.2.0.rb[0m
            |   |   |   |   |   `-- [00mversions.rb[0m
            |   |   |   |   |-- [00msyntax.rb[0m
            |   |   |   |   |-- [00mtoken.rb[0m
            |   |   |   |   `-- [00mversion.rb[0m
            |   |   |   `-- [00mregexp_parser.rb[0m
            |   |   `-- [00mregexp_parser.gemspec[0m
            |   |-- [01;34mreline-0.3.2[0m
            |   |   |-- [00mBSDL[0m
            |   |   |-- [00mCOPYING[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34mreline[0m
            |   |   |   |   |-- [00mansi.rb[0m
            |   |   |   |   |-- [00mconfig.rb[0m
            |   |   |   |   |-- [00mgeneral_io.rb[0m
            |   |   |   |   |-- [00mhistory.rb[0m
            |   |   |   |   |-- [01;34mkey_actor[0m
            |   |   |   |   |   |-- [00mbase.rb[0m
            |   |   |   |   |   |-- [00memacs.rb[0m
            |   |   |   |   |   |-- [00mvi_command.rb[0m
            |   |   |   |   |   `-- [00mvi_insert.rb[0m
            |   |   |   |   |-- [00mkey_actor.rb[0m
            |   |   |   |   |-- [00mkey_stroke.rb[0m
            |   |   |   |   |-- [00mkill_ring.rb[0m
            |   |   |   |   |-- [00mline_editor.rb[0m
            |   |   |   |   |-- [00mterminfo.rb[0m
            |   |   |   |   |-- [01;34municode[0m
            |   |   |   |   |   `-- [00meast_asian_width.rb[0m
            |   |   |   |   |-- [00municode.rb[0m
            |   |   |   |   |-- [00mversion.rb[0m
            |   |   |   |   `-- [00mwindows.rb[0m
            |   |   |   `-- [00mreline.rb[0m
            |   |   `-- [00mlicense_of_rb-readline[0m
            |   |-- [01;34mrexml-3.2.5[0m
            |   |   |-- [00mLICENSE.txt[0m
            |   |   |-- [00mNEWS.md[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [01;34mdoc[0m
            |   |   |   `-- [01;34mrexml[0m
            |   |   |       |-- [00mcontext.rdoc[0m
            |   |   |       `-- [01;34mtasks[0m
            |   |   |           |-- [01;34mrdoc[0m
            |   |   |           |   |-- [00mchild.rdoc[0m
            |   |   |           |   |-- [00mdocument.rdoc[0m
            |   |   |           |   |-- [00melement.rdoc[0m
            |   |   |           |   |-- [00mnode.rdoc[0m
            |   |   |           |   `-- [00mparent.rdoc[0m
            |   |   |           `-- [01;34mtocs[0m
            |   |   |               |-- [00mchild_toc.rdoc[0m
            |   |   |               |-- [00mdocument_toc.rdoc[0m
            |   |   |               |-- [00melement_toc.rdoc[0m
            |   |   |               |-- [00mmaster_toc.rdoc[0m
            |   |   |               |-- [00mnode_toc.rdoc[0m
            |   |   |               `-- [00mparent_toc.rdoc[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34mrexml[0m
            |   |       |   |-- [00mattlistdecl.rb[0m
            |   |       |   |-- [00mattribute.rb[0m
            |   |       |   |-- [00mcdata.rb[0m
            |   |       |   |-- [00mchild.rb[0m
            |   |       |   |-- [00mcomment.rb[0m
            |   |       |   |-- [00mdoctype.rb[0m
            |   |       |   |-- [00mdocument.rb[0m
            |   |       |   |-- [01;34mdtd[0m
            |   |       |   |   |-- [00mattlistdecl.rb[0m
            |   |       |   |   |-- [00mdtd.rb[0m
            |   |       |   |   |-- [00melementdecl.rb[0m
            |   |       |   |   |-- [00mentitydecl.rb[0m
            |   |       |   |   `-- [00mnotationdecl.rb[0m
            |   |       |   |-- [00melement.rb[0m
            |   |       |   |-- [00mencoding.rb[0m
            |   |       |   |-- [00mentity.rb[0m
            |   |       |   |-- [01;34mformatters[0m
            |   |       |   |   |-- [00mdefault.rb[0m
            |   |       |   |   |-- [00mpretty.rb[0m
            |   |       |   |   `-- [00mtransitive.rb[0m
            |   |       |   |-- [00mfunctions.rb[0m
            |   |       |   |-- [00minstruction.rb[0m
            |   |       |   |-- [01;34mlight[0m
            |   |       |   |   `-- [00mnode.rb[0m
            |   |       |   |-- [00mnamespace.rb[0m
            |   |       |   |-- [00mnode.rb[0m
            |   |       |   |-- [00moutput.rb[0m
            |   |       |   |-- [00mparent.rb[0m
            |   |       |   |-- [00mparseexception.rb[0m
            |   |       |   |-- [01;34mparsers[0m
            |   |       |   |   |-- [00mbaseparser.rb[0m
            |   |       |   |   |-- [00mlightparser.rb[0m
            |   |       |   |   |-- [00mpullparser.rb[0m
            |   |       |   |   |-- [00msax2parser.rb[0m
            |   |       |   |   |-- [00mstreamparser.rb[0m
            |   |       |   |   |-- [00mtreeparser.rb[0m
            |   |       |   |   |-- [00multralightparser.rb[0m
            |   |       |   |   `-- [00mxpathparser.rb[0m
            |   |       |   |-- [00mquickpath.rb[0m
            |   |       |   |-- [00mrexml.rb[0m
            |   |       |   |-- [00msax2listener.rb[0m
            |   |       |   |-- [00msecurity.rb[0m
            |   |       |   |-- [00msource.rb[0m
            |   |       |   |-- [00mstreamlistener.rb[0m
            |   |       |   |-- [00mtext.rb[0m
            |   |       |   |-- [00mundefinednamespaceexception.rb[0m
            |   |       |   |-- [01;34mvalidation[0m
            |   |       |   |   |-- [00mrelaxng.rb[0m
            |   |       |   |   |-- [00mvalidation.rb[0m
            |   |       |   |   `-- [00mvalidationexception.rb[0m
            |   |       |   |-- [00mxmldecl.rb[0m
            |   |       |   |-- [00mxmltokens.rb[0m
            |   |       |   |-- [00mxpath.rb[0m
            |   |       |   `-- [00mxpath_parser.rb[0m
            |   |       `-- [00mrexml.rb[0m
            |   |-- [01;34mrubyzip-2.3.2[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [00mRakefile[0m
            |   |   |-- [00mTODO[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34mzip[0m
            |   |   |   |   |-- [00mcentral_directory.rb[0m
            |   |   |   |   |-- [00mcompressor.rb[0m
            |   |   |   |   |-- [00mconstants.rb[0m
            |   |   |   |   |-- [01;34mcrypto[0m
            |   |   |   |   |   |-- [00mdecrypted_io.rb[0m
            |   |   |   |   |   |-- [00mencryption.rb[0m
            |   |   |   |   |   |-- [00mnull_encryption.rb[0m
            |   |   |   |   |   `-- [00mtraditional_encryption.rb[0m
            |   |   |   |   |-- [00mdecompressor.rb[0m
            |   |   |   |   |-- [00mdeflater.rb[0m
            |   |   |   |   |-- [00mdos_time.rb[0m
            |   |   |   |   |-- [00mentry.rb[0m
            |   |   |   |   |-- [00mentry_set.rb[0m
            |   |   |   |   |-- [00merrors.rb[0m
            |   |   |   |   |-- [01;34mextra_field[0m
            |   |   |   |   |   |-- [00mgeneric.rb[0m
            |   |   |   |   |   |-- [00mntfs.rb[0m
            |   |   |   |   |   |-- [00mold_unix.rb[0m
            |   |   |   |   |   |-- [00muniversal_time.rb[0m
            |   |   |   |   |   |-- [00munix.rb[0m
            |   |   |   |   |   |-- [00mzip64.rb[0m
            |   |   |   |   |   `-- [00mzip64_placeholder.rb[0m
            |   |   |   |   |-- [00mextra_field.rb[0m
            |   |   |   |   |-- [00mfile.rb[0m
            |   |   |   |   |-- [00mfilesystem.rb[0m
            |   |   |   |   |-- [00minflater.rb[0m
            |   |   |   |   |-- [00minput_stream.rb[0m
            |   |   |   |   |-- [01;34mioextras[0m
            |   |   |   |   |   |-- [00mabstract_input_stream.rb[0m
            |   |   |   |   |   `-- [00mabstract_output_stream.rb[0m
            |   |   |   |   |-- [00mioextras.rb[0m
            |   |   |   |   |-- [00mnull_compressor.rb[0m
            |   |   |   |   |-- [00mnull_decompressor.rb[0m
            |   |   |   |   |-- [00mnull_input_stream.rb[0m
            |   |   |   |   |-- [00moutput_stream.rb[0m
            |   |   |   |   |-- [00mpass_thru_compressor.rb[0m
            |   |   |   |   |-- [00mpass_thru_decompressor.rb[0m
            |   |   |   |   |-- [00mstreamable_directory.rb[0m
            |   |   |   |   |-- [00mstreamable_stream.rb[0m
            |   |   |   |   `-- [00mversion.rb[0m
            |   |   |   `-- [00mzip.rb[0m
            |   |   `-- [01;34msamples[0m
            |   |       |-- [01;32mexample.rb[0m
            |   |       |-- [01;32mexample_filesystem.rb[0m
            |   |       |-- [00mexample_recursive.rb[0m
            |   |       |-- [01;32mgtk_ruby_zip.rb[0m
            |   |       |-- [01;32mqtzip.rb[0m
            |   |       |-- [01;32mwrite_simple.rb[0m
            |   |       `-- [01;32mzipfind.rb[0m
            |   |-- [01;34mselenium-webdriver-4.8.1[0m
            |   |   |-- [00mCHANGES[0m
            |   |   |-- [00mGemfile[0m
            |   |   |-- [01;32mLICENSE[0m
            |   |   |-- [01;32mNOTICE[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [01;34mbin[0m
            |   |   |   |-- [01;34mlinux[0m
            |   |   |   |   `-- [01;32mselenium-manager[0m
            |   |   |   |-- [01;34mmacos[0m
            |   |   |   |   `-- [01;32mselenium-manager[0m
            |   |   |   `-- [01;34mwindows[0m
            |   |   |       `-- [01;32mselenium-manager.exe[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34mselenium[0m
            |   |   |   |   |-- [00mserver.rb[0m
            |   |   |   |   |-- [01;34mwebdriver[0m
            |   |   |   |   |   |-- [01;34matoms[0m
            |   |   |   |   |   |   |-- [01;32mfindElements.js[0m
            |   |   |   |   |   |   |-- [01;32mgetAttribute.js[0m
            |   |   |   |   |   |   |-- [01;32misDisplayed.js[0m
            |   |   |   |   |   |   `-- [01;32mmutationListener.js[0m
            |   |   |   |   |   |-- [00matoms.rb[0m
            |   |   |   |   |   |-- [01;34mbidi[0m
            |   |   |   |   |   |   |-- [00mbrowsing_context.rb[0m
            |   |   |   |   |   |   |-- [00mbrowsing_context_info.rb[0m
            |   |   |   |   |   |   |-- [01;34mlog[0m
            |   |   |   |   |   |   |   |-- [00mbase_log_entry.rb[0m
            |   |   |   |   |   |   |   |-- [00mconsole_log_entry.rb[0m
            |   |   |   |   |   |   |   |-- [00mfilter_by.rb[0m
            |   |   |   |   |   |   |   |-- [00mgeneric_log_entry.rb[0m
            |   |   |   |   |   |   |   `-- [00mjavascript_log_entry.rb[0m
            |   |   |   |   |   |   |-- [00mlog_inspector.rb[0m
            |   |   |   |   |   |   |-- [00mnavigate_result.rb[0m
            |   |   |   |   |   |   `-- [00msession.rb[0m
            |   |   |   |   |   |-- [00mbidi.rb[0m
            |   |   |   |   |   |-- [01;34mchrome[0m
            |   |   |   |   |   |   |-- [00mdriver.rb[0m
            |   |   |   |   |   |   |-- [00mfeatures.rb[0m
            |   |   |   |   |   |   |-- [00moptions.rb[0m
            |   |   |   |   |   |   |-- [00mprofile.rb[0m
            |   |   |   |   |   |   `-- [00mservice.rb[0m
            |   |   |   |   |   |-- [00mchrome.rb[0m
            |   |   |   |   |   |-- [01;34mchromium[0m
            |   |   |   |   |   |   |-- [00mdriver.rb[0m
            |   |   |   |   |   |   |-- [00mfeatures.rb[0m
            |   |   |   |   |   |   |-- [00moptions.rb[0m
            |   |   |   |   |   |   |-- [00mprofile.rb[0m
            |   |   |   |   |   |   `-- [00mservice.rb[0m
            |   |   |   |   |   |-- [00mchromium.rb[0m
            |   |   |   |   |   |-- [01;34mcommon[0m
            |   |   |   |   |   |   |-- [00maction_builder.rb[0m
            |   |   |   |   |   |   |-- [00malert.rb[0m
            |   |   |   |   |   |   |-- [00mchild_process.rb[0m
            |   |   |   |   |   |   |-- [00mdriver.rb[0m
            |   |   |   |   |   |   |-- [01;34mdriver_extensions[0m
            |   |   |   |   |   |   |   |-- [00mdownloads_files.rb[0m
            |   |   |   |   |   |   |   |-- [00mfull_page_screenshot.rb[0m
            |   |   |   |   |   |   |   |-- [00mhas_addons.rb[0m
            |   |   |   |   |   |   |   |-- [00mhas_apple_permissions.rb[0m
            |   |   |   |   |   |   |   |-- [00mhas_authentication.rb[0m
            |   |   |   |   |   |   |   |-- [00mhas_bidi.rb[0m
            |   |   |   |   |   |   |   |-- [00mhas_casting.rb[0m
            |   |   |   |   |   |   |   |-- [00mhas_cdp.rb[0m
            |   |   |   |   |   |   |   |-- [00mhas_context.rb[0m
            |   |   |   |   |   |   |   |-- [00mhas_debugger.rb[0m
            |   |   |   |   |   |   |   |-- [00mhas_devtools.rb[0m
            |   |   |   |   |   |   |   |-- [00mhas_launching.rb[0m
            |   |   |   |   |   |   |   |-- [00mhas_location.rb[0m
            |   |   |   |   |   |   |   |-- [00mhas_log_events.rb[0m
            |   |   |   |   |   |   |   |-- [00mhas_logs.rb[0m
            |   |   |   |   |   |   |   |-- [00mhas_network_conditions.rb[0m
            |   |   |   |   |   |   |   |-- [00mhas_network_connection.rb[0m
            |   |   |   |   |   |   |   |-- [00mhas_network_interception.rb[0m
            |   |   |   |   |   |   |   |-- [00mhas_permissions.rb[0m
            |   |   |   |   |   |   |   |-- [00mhas_pinned_scripts.rb[0m
            |   |   |   |   |   |   |   |-- [00mhas_session_id.rb[0m
            |   |   |   |   |   |   |   |-- [00mhas_web_storage.rb[0m
            |   |   |   |   |   |   |   |-- [00mprints_page.rb[0m
            |   |   |   |   |   |   |   `-- [00muploads_files.rb[0m
            |   |   |   |   |   |   |-- [00melement.rb[0m
            |   |   |   |   |   |   |-- [00merror.rb[0m
            |   |   |   |   |   |   |-- [00mfile_reaper.rb[0m
            |   |   |   |   |   |   |-- [01;34mhtml5[0m
            |   |   |   |   |   |   |   |-- [00mlocal_storage.rb[0m
            |   |   |   |   |   |   |   |-- [00msession_storage.rb[0m
            |   |   |   |   |   |   |   `-- [00mshared_web_storage.rb[0m
            |   |   |   |   |   |   |-- [01;34minteractions[0m
            |   |   |   |   |   |   |   |-- [00minput_device.rb[0m
            |   |   |   |   |   |   |   |-- [00minteraction.rb[0m
            |   |   |   |   |   |   |   |-- [00minteractions.rb[0m
            |   |   |   |   |   |   |   |-- [00mkey_actions.rb[0m
            |   |   |   |   |   |   |   |-- [00mkey_input.rb[0m
            |   |   |   |   |   |   |   |-- [00mnone_input.rb[0m
            |   |   |   |   |   |   |   |-- [00mpause.rb[0m
            |   |   |   |   |   |   |   |-- [00mpointer_actions.rb[0m
            |   |   |   |   |   |   |   |-- [00mpointer_cancel.rb[0m
            |   |   |   |   |   |   |   |-- [00mpointer_event_properties.rb[0m
            |   |   |   |   |   |   |   |-- [00mpointer_input.rb[0m
            |   |   |   |   |   |   |   |-- [00mpointer_move.rb[0m
            |   |   |   |   |   |   |   |-- [00mpointer_press.rb[0m
            |   |   |   |   |   |   |   |-- [00mscroll.rb[0m
            |   |   |   |   |   |   |   |-- [00mscroll_origin.rb[0m
            |   |   |   |   |   |   |   |-- [00mtyping_interaction.rb[0m
            |   |   |   |   |   |   |   |-- [00mwheel_actions.rb[0m
            |   |   |   |   |   |   |   `-- [00mwheel_input.rb[0m
            |   |   |   |   |   |   |-- [00mkeys.rb[0m
            |   |   |   |   |   |   |-- [00mlog_entry.rb[0m
            |   |   |   |   |   |   |-- [00mlogger.rb[0m
            |   |   |   |   |   |   |-- [00mlogs.rb[0m
            |   |   |   |   |   |   |-- [00mmanager.rb[0m
            |   |   |   |   |   |   |-- [00mnavigation.rb[0m
            |   |   |   |   |   |   |-- [00moptions.rb[0m
            |   |   |   |   |   |   |-- [00mplatform.rb[0m
            |   |   |   |   |   |   |-- [00mport_prober.rb[0m
            |   |   |   |   |   |   |-- [00mprofile_helper.rb[0m
            |   |   |   |   |   |   |-- [00mproxy.rb[0m
            |   |   |   |   |   |   |-- [00msearch_context.rb[0m
            |   |   |   |   |   |   |-- [00mselenium_manager.rb[0m
            |   |   |   |   |   |   |-- [00mservice.rb[0m
            |   |   |   |   |   |   |-- [00mservice_manager.rb[0m
            |   |   |   |   |   |   |-- [00mshadow_root.rb[0m
            |   |   |   |   |   |   |-- [00msocket_lock.rb[0m
            |   |   |   |   |   |   |-- [00msocket_poller.rb[0m
            |   |   |   |   |   |   |-- [00mtakes_screenshot.rb[0m
            |   |   |   |   |   |   |-- [00mtarget_locator.rb[0m
            |   |   |   |   |   |   |-- [00mtimeouts.rb[0m
            |   |   |   |   |   |   |-- [01;34mvirtual_authenticator[0m
            |   |   |   |   |   |   |   |-- [00mcredential.rb[0m
            |   |   |   |   |   |   |   |-- [00mvirtual_authenticator.rb[0m
            |   |   |   |   |   |   |   `-- [00mvirtual_authenticator_options.rb[0m
            |   |   |   |   |   |   |-- [00mwait.rb[0m
            |   |   |   |   |   |   |-- [00mwebsocket_connection.rb[0m
            |   |   |   |   |   |   |-- [00mwindow.rb[0m
            |   |   |   |   |   |   `-- [00mzipper.rb[0m
            |   |   |   |   |   |-- [00mcommon.rb[0m
            |   |   |   |   |   |-- [01;34mdevtools[0m
            |   |   |   |   |   |   |-- [00mconsole_event.rb[0m
            |   |   |   |   |   |   |-- [00mexception_event.rb[0m
            |   |   |   |   |   |   |-- [00mmutation_event.rb[0m
            |   |   |   |   |   |   |-- [00mnetwork_interceptor.rb[0m
            |   |   |   |   |   |   |-- [00mpinned_script.rb[0m
            |   |   |   |   |   |   |-- [00mrequest.rb[0m
            |   |   |   |   |   |   `-- [00mresponse.rb[0m
            |   |   |   |   |   |-- [00mdevtools.rb[0m
            |   |   |   |   |   |-- [01;34medge[0m
            |   |   |   |   |   |   |-- [00mdriver.rb[0m
            |   |   |   |   |   |   |-- [00mfeatures.rb[0m
            |   |   |   |   |   |   |-- [00moptions.rb[0m
            |   |   |   |   |   |   |-- [00mprofile.rb[0m
            |   |   |   |   |   |   `-- [00mservice.rb[0m
            |   |   |   |   |   |-- [00medge.rb[0m
            |   |   |   |   |   |-- [01;34mfirefox[0m
            |   |   |   |   |   |   |-- [00mdriver.rb[0m
            |   |   |   |   |   |   |-- [00mextension.rb[0m
            |   |   |   |   |   |   |-- [00mfeatures.rb[0m
            |   |   |   |   |   |   |-- [00moptions.rb[0m
            |   |   |   |   |   |   |-- [00mprofile.rb[0m
            |   |   |   |   |   |   |-- [00mprofiles_ini.rb[0m
            |   |   |   |   |   |   |-- [00mservice.rb[0m
            |   |   |   |   |   |   `-- [00mutil.rb[0m
            |   |   |   |   |   |-- [00mfirefox.rb[0m
            |   |   |   |   |   |-- [01;34mie[0m
            |   |   |   |   |   |   |-- [00mdriver.rb[0m
            |   |   |   |   |   |   |-- [00moptions.rb[0m
            |   |   |   |   |   |   `-- [00mservice.rb[0m
            |   |   |   |   |   |-- [00mie.rb[0m
            |   |   |   |   |   |-- [01;34mremote[0m
            |   |   |   |   |   |   |-- [01;34mbridge[0m
            |   |   |   |   |   |   |   `-- [00mcommands.rb[0m
            |   |   |   |   |   |   |-- [00mbridge.rb[0m
            |   |   |   |   |   |   |-- [00mcapabilities.rb[0m
            |   |   |   |   |   |   |-- [00mdriver.rb[0m
            |   |   |   |   |   |   |-- [01;34mhttp[0m
            |   |   |   |   |   |   |   |-- [00mcommon.rb[0m
            |   |   |   |   |   |   |   |-- [00mcurb.rb[0m
            |   |   |   |   |   |   |   `-- [00mdefault.rb[0m
            |   |   |   |   |   |   |-- [00mresponse.rb[0m
            |   |   |   |   |   |   `-- [00mserver_error.rb[0m
            |   |   |   |   |   |-- [00mremote.rb[0m
            |   |   |   |   |   |-- [01;34msafari[0m
            |   |   |   |   |   |   |-- [00mdriver.rb[0m
            |   |   |   |   |   |   |-- [00mfeatures.rb[0m
            |   |   |   |   |   |   |-- [00moptions.rb[0m
            |   |   |   |   |   |   `-- [00mservice.rb[0m
            |   |   |   |   |   |-- [00msafari.rb[0m
            |   |   |   |   |   |-- [01;34msupport[0m
            |   |   |   |   |   |   |-- [00mabstract_event_listener.rb[0m
            |   |   |   |   |   |   |-- [00mblock_event_listener.rb[0m
            |   |   |   |   |   |   |-- [00mcolor.rb[0m
            |   |   |   |   |   |   |-- [00mescaper.rb[0m
            |   |   |   |   |   |   |-- [00mevent_firing_bridge.rb[0m
            |   |   |   |   |   |   |-- [01;34mguards[0m
            |   |   |   |   |   |   |   |-- [00mguard.rb[0m
            |   |   |   |   |   |   |   `-- [00mguard_condition.rb[0m
            |   |   |   |   |   |   |-- [00mguards.rb[0m
            |   |   |   |   |   |   |-- [00mrelative_locator.rb[0m
            |   |   |   |   |   |   `-- [00mselect.rb[0m
            |   |   |   |   |   |-- [00msupport.rb[0m
            |   |   |   |   |   `-- [00mversion.rb[0m
            |   |   |   |   `-- [00mwebdriver.rb[0m
            |   |   |   `-- [00mselenium-webdriver.rb[0m
            |   |   `-- [00mselenium-webdriver.gemspec[0m
            |   |-- [01;34msprockets-4.2.0[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [01;34mbin[0m
            |   |   |   `-- [01;32msprockets[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34mrake[0m
            |   |       |   `-- [00msprocketstask.rb[0m
            |   |       |-- [01;34msprockets[0m
            |   |       |   |-- [00madd_source_map_comment_to_asset_processor.rb[0m
            |   |       |   |-- [00masset.rb[0m
            |   |       |   |-- [01;34mautoload[0m
            |   |       |   |   |-- [00mbabel.rb[0m
            |   |       |   |   |-- [00mclosure.rb[0m
            |   |       |   |   |-- [00mcoffee_script.rb[0m
            |   |       |   |   |-- [00meco.rb[0m
            |   |       |   |   |-- [00mejs.rb[0m
            |   |       |   |   |-- [00mjsminc.rb[0m
            |   |       |   |   |-- [00msass.rb[0m
            |   |       |   |   |-- [00msassc.rb[0m
            |   |       |   |   |-- [00muglifier.rb[0m
            |   |       |   |   |-- [00myui.rb[0m
            |   |       |   |   `-- [00mzopfli.rb[0m
            |   |       |   |-- [00mautoload.rb[0m
            |   |       |   |-- [00mbabel_processor.rb[0m
            |   |       |   |-- [00mbase.rb[0m
            |   |       |   |-- [00mbower.rb[0m
            |   |       |   |-- [00mbundle.rb[0m
            |   |       |   |-- [01;34mcache[0m
            |   |       |   |   |-- [00mfile_store.rb[0m
            |   |       |   |   |-- [00mmemory_store.rb[0m
            |   |       |   |   `-- [00mnull_store.rb[0m
            |   |       |   |-- [00mcache.rb[0m
            |   |       |   |-- [00mcached_environment.rb[0m
            |   |       |   |-- [00mclosure_compressor.rb[0m
            |   |       |   |-- [00mcoffee_script_processor.rb[0m
            |   |       |   |-- [00mcompressing.rb[0m
            |   |       |   |-- [00mconfiguration.rb[0m
            |   |       |   |-- [00mcontext.rb[0m
            |   |       |   |-- [00mdependencies.rb[0m
            |   |       |   |-- [00mdigest_utils.rb[0m
            |   |       |   |-- [00mdirective_processor.rb[0m
            |   |       |   |-- [00meco_processor.rb[0m
            |   |       |   |-- [00mejs_processor.rb[0m
            |   |       |   |-- [00mencoding_utils.rb[0m
            |   |       |   |-- [00menvironment.rb[0m
            |   |       |   |-- [00merb_processor.rb[0m
            |   |       |   |-- [00merrors.rb[0m
            |   |       |   |-- [01;34mexporters[0m
            |   |       |   |   |-- [00mbase.rb[0m
            |   |       |   |   |-- [00mfile_exporter.rb[0m
            |   |       |   |   |-- [00mzlib_exporter.rb[0m
            |   |       |   |   `-- [00mzopfli_exporter.rb[0m
            |   |       |   |-- [00mexporting.rb[0m
            |   |       |   |-- [00mfile_reader.rb[0m
            |   |       |   |-- [00mhttp_utils.rb[0m
            |   |       |   |-- [00mjsminc_compressor.rb[0m
            |   |       |   |-- [00mjst_processor.rb[0m
            |   |       |   |-- [00mloader.rb[0m
            |   |       |   |-- [00mmanifest.rb[0m
            |   |       |   |-- [00mmanifest_utils.rb[0m
            |   |       |   |-- [00mmime.rb[0m
            |   |       |   |-- [00mnpm.rb[0m
            |   |       |   |-- [00mpath_dependency_utils.rb[0m
            |   |       |   |-- [00mpath_digest_utils.rb[0m
            |   |       |   |-- [00mpath_utils.rb[0m
            |   |       |   |-- [00mpaths.rb[0m
            |   |       |   |-- [01;34mpreprocessors[0m
            |   |       |   |   `-- [00mdefault_source_map.rb[0m
            |   |       |   |-- [00mprocessing.rb[0m
            |   |       |   |-- [00mprocessor_utils.rb[0m
            |   |       |   |-- [00mresolve.rb[0m
            |   |       |   |-- [00msass_cache_store.rb[0m
            |   |       |   |-- [00msass_compressor.rb[0m
            |   |       |   |-- [00msass_functions.rb[0m
            |   |       |   |-- [00msass_importer.rb[0m
            |   |       |   |-- [00msass_processor.rb[0m
            |   |       |   |-- [00msassc_compressor.rb[0m
            |   |       |   |-- [00msassc_processor.rb[0m
            |   |       |   |-- [00mserver.rb[0m
            |   |       |   |-- [00msource_map_processor.rb[0m
            |   |       |   |-- [00msource_map_utils.rb[0m
            |   |       |   |-- [00mtransformers.rb[0m
            |   |       |   |-- [00muglifier_compressor.rb[0m
            |   |       |   |-- [00munloaded_asset.rb[0m
            |   |       |   |-- [00muri_tar.rb[0m
            |   |       |   |-- [00muri_utils.rb[0m
            |   |       |   |-- [01;34mutils[0m
            |   |       |   |   `-- [00mgzip.rb[0m
            |   |       |   |-- [00mutils.rb[0m
            |   |       |   |-- [00mversion.rb[0m
            |   |       |   `-- [00myui_compressor.rb[0m
            |   |       `-- [00msprockets.rb[0m
            |   |-- [01;34msprockets-rails-3.4.2[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.md[0m
            |   |   `-- [01;34mlib[0m
            |   |       `-- [01;34msprockets[0m
            |   |           |-- [01;34mrails[0m
            |   |           |   |-- [00masset_url_processor.rb[0m
            |   |           |   |-- [00mcontext.rb[0m
            |   |           |   |-- [00mhelper.rb[0m
            |   |           |   |-- [00mquiet_assets.rb[0m
            |   |           |   |-- [00mroute_wrapper.rb[0m
            |   |           |   |-- [00msourcemapping_url_processor.rb[0m
            |   |           |   |-- [00mtask.rb[0m
            |   |           |   |-- [00mutils.rb[0m
            |   |           |   `-- [00mversion.rb[0m
            |   |           |-- [00mrails.rb[0m
            |   |           `-- [00mrailtie.rb[0m
            |   |-- [01;34msqlite3-1.6.1-x86_64-linux[0m
            |   |   |-- [00mAPI_CHANGES.md[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mCONTRIBUTING.md[0m
            |   |   |-- [00mChangeLog.cvs[0m
            |   |   |-- [00mGemfile[0m
            |   |   |-- [00mLICENSE[0m
            |   |   |-- [00mLICENSE-DEPENDENCIES[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [00mdependencies.yml[0m
            |   |   |-- [01;34mext[0m
            |   |   |   `-- [01;34msqlite3[0m
            |   |   |       |-- [00maggregator.c[0m
            |   |   |       |-- [00maggregator.h[0m
            |   |   |       |-- [00mbackup.c[0m
            |   |   |       |-- [00mbackup.h[0m
            |   |   |       |-- [00mdatabase.c[0m
            |   |   |       |-- [00mdatabase.h[0m
            |   |   |       |-- [00mexception.c[0m
            |   |   |       |-- [00mexception.h[0m
            |   |   |       |-- [00mextconf.rb[0m
            |   |   |       |-- [00msqlite3.c[0m
            |   |   |       |-- [00msqlite3_ruby.h[0m
            |   |   |       |-- [00mstatement.c[0m
            |   |   |       `-- [00mstatement.h[0m
            |   |   |-- [01;34mfaq[0m
            |   |   |   |-- [00mfaq.md[0m
            |   |   |   |-- [00mfaq.rb[0m
            |   |   |   `-- [00mfaq.yml[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34msqlite3[0m
            |   |   |   |   |-- [01;34m2.7[0m
            |   |   |   |   |   `-- [01;32msqlite3_native.so[0m
            |   |   |   |   |-- [01;34m3.0[0m
            |   |   |   |   |   `-- [01;32msqlite3_native.so[0m
            |   |   |   |   |-- [01;34m3.1[0m
            |   |   |   |   |   `-- [01;32msqlite3_native.so[0m
            |   |   |   |   |-- [01;34m3.2[0m
            |   |   |   |   |   `-- [01;32msqlite3_native.so[0m
            |   |   |   |   |-- [00mconstants.rb[0m
            |   |   |   |   |-- [00mdatabase.rb[0m
            |   |   |   |   |-- [00merrors.rb[0m
            |   |   |   |   |-- [00mpragmas.rb[0m
            |   |   |   |   |-- [00mresultset.rb[0m
            |   |   |   |   |-- [00mstatement.rb[0m
            |   |   |   |   |-- [00mtranslator.rb[0m
            |   |   |   |   |-- [00mvalue.rb[0m
            |   |   |   |   `-- [00mversion.rb[0m
            |   |   |   `-- [00msqlite3.rb[0m
            |   |   `-- [01;34mtest[0m
            |   |       |-- [00mhelper.rb[0m
            |   |       |-- [00mtest_backup.rb[0m
            |   |       |-- [00mtest_collation.rb[0m
            |   |       |-- [00mtest_database.rb[0m
            |   |       |-- [00mtest_database_flags.rb[0m
            |   |       |-- [00mtest_database_readonly.rb[0m
            |   |       |-- [00mtest_database_readwrite.rb[0m
            |   |       |-- [00mtest_deprecated.rb[0m
            |   |       |-- [00mtest_encoding.rb[0m
            |   |       |-- [00mtest_integration.rb[0m
            |   |       |-- [00mtest_integration_aggregate.rb[0m
            |   |       |-- [00mtest_integration_open_close.rb[0m
            |   |       |-- [00mtest_integration_pending.rb[0m
            |   |       |-- [00mtest_integration_resultset.rb[0m
            |   |       |-- [00mtest_integration_statement.rb[0m
            |   |       |-- [00mtest_pragmas.rb[0m
            |   |       |-- [00mtest_result_set.rb[0m
            |   |       |-- [00mtest_sqlite3.rb[0m
            |   |       |-- [00mtest_statement.rb[0m
            |   |       `-- [00mtest_statement_execute.rb[0m
            |   |-- [01;34mstimulus-rails-1.2.1[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [00mRakefile[0m
            |   |   |-- [01;34mapp[0m
            |   |   |   `-- [01;34massets[0m
            |   |   |       `-- [01;34mjavascripts[0m
            |   |   |           |-- [00mstimulus-autoloader.js[0m
            |   |   |           |-- [00mstimulus-importmap-autoloader.js[0m
            |   |   |           |-- [00mstimulus-loading.js[0m
            |   |   |           |-- [00mstimulus.js[0m
            |   |   |           |-- [00mstimulus.min.js[0m
            |   |   |           `-- [00mstimulus.min.js.map[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34mgenerators[0m
            |   |       |   `-- [01;34mstimulus[0m
            |   |       |       |-- [00mUSAGE[0m
            |   |       |       |-- [00mstimulus_generator.rb[0m
            |   |       |       `-- [01;34mtemplates[0m
            |   |       |           `-- [00mcontroller.js.tt[0m
            |   |       |-- [01;34minstall[0m
            |   |       |   |-- [01;34mapp[0m
            |   |       |   |   `-- [01;34mjavascript[0m
            |   |       |   |       `-- [01;34mcontrollers[0m
            |   |       |   |           |-- [00mapplication.js[0m
            |   |       |   |           |-- [00mhello_controller.js[0m
            |   |       |   |           |-- [00mindex_for_importmap.js[0m
            |   |       |   |           `-- [00mindex_for_node.js[0m
            |   |       |   |-- [00mstimulus_with_importmap.rb[0m
            |   |       |   `-- [00mstimulus_with_node.rb[0m
            |   |       |-- [01;34mstimulus[0m
            |   |       |   |-- [01;32mengine.rb[0m
            |   |       |   |-- [00mmanifest.rb[0m
            |   |       |   `-- [00mversion.rb[0m
            |   |       |-- [00mstimulus-rails.rb[0m
            |   |       `-- [01;34mtasks[0m
            |   |           `-- [00mstimulus_tasks.rake[0m
            |   |-- [01;34mthor-1.2.1[0m
            |   |   |-- [00mCONTRIBUTING.md[0m
            |   |   |-- [00mLICENSE.md[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [01;34mbin[0m
            |   |   |   `-- [01;32mthor[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34mthor[0m
            |   |   |   |   |-- [01;34mactions[0m
            |   |   |   |   |   |-- [00mcreate_file.rb[0m
            |   |   |   |   |   |-- [00mcreate_link.rb[0m
            |   |   |   |   |   |-- [00mdirectory.rb[0m
            |   |   |   |   |   |-- [00mempty_directory.rb[0m
            |   |   |   |   |   |-- [00mfile_manipulation.rb[0m
            |   |   |   |   |   `-- [00minject_into_file.rb[0m
            |   |   |   |   |-- [00mactions.rb[0m
            |   |   |   |   |-- [00mbase.rb[0m
            |   |   |   |   |-- [00mcommand.rb[0m
            |   |   |   |   |-- [01;34mcore_ext[0m
            |   |   |   |   |   `-- [00mhash_with_indifferent_access.rb[0m
            |   |   |   |   |-- [00merror.rb[0m
            |   |   |   |   |-- [00mgroup.rb[0m
            |   |   |   |   |-- [00minvocation.rb[0m
            |   |   |   |   |-- [01;34mline_editor[0m
            |   |   |   |   |   |-- [00mbasic.rb[0m
            |   |   |   |   |   `-- [00mreadline.rb[0m
            |   |   |   |   |-- [00mline_editor.rb[0m
            |   |   |   |   |-- [00mnested_context.rb[0m
            |   |   |   |   |-- [01;34mparser[0m
            |   |   |   |   |   |-- [00margument.rb[0m
            |   |   |   |   |   |-- [00marguments.rb[0m
            |   |   |   |   |   |-- [00moption.rb[0m
            |   |   |   |   |   `-- [00moptions.rb[0m
            |   |   |   |   |-- [00mparser.rb[0m
            |   |   |   |   |-- [00mrake_compat.rb[0m
            |   |   |   |   |-- [00mrunner.rb[0m
            |   |   |   |   |-- [01;34mshell[0m
            |   |   |   |   |   |-- [00mbasic.rb[0m
            |   |   |   |   |   |-- [00mcolor.rb[0m
            |   |   |   |   |   `-- [00mhtml.rb[0m
            |   |   |   |   |-- [00mshell.rb[0m
            |   |   |   |   |-- [00mutil.rb[0m
            |   |   |   |   `-- [00mversion.rb[0m
            |   |   |   `-- [00mthor.rb[0m
            |   |   `-- [00mthor.gemspec[0m
            |   |-- [01;34mtimeout-0.3.2[0m
            |   |   |-- [00mGemfile[0m
            |   |   |-- [00mLICENSE.txt[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   `-- [00mtimeout.rb[0m
            |   |   `-- [00mtimeout.gemspec[0m
            |   |-- [01;34mturbo-rails-1.3.3[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [00mRakefile[0m
            |   |   |-- [01;34mapp[0m
            |   |   |   |-- [01;34massets[0m
            |   |   |   |   `-- [01;34mjavascripts[0m
            |   |   |   |       |-- [00mturbo.js[0m
            |   |   |   |       |-- [00mturbo.min.js[0m
            |   |   |   |       `-- [00mturbo.min.js.map[0m
            |   |   |   |-- [01;34mchannels[0m
            |   |   |   |   `-- [01;34mturbo[0m
            |   |   |   |       |-- [01;34mstreams[0m
            |   |   |   |       |   |-- [00mbroadcasts.rb[0m
            |   |   |   |       |   `-- [00mstream_name.rb[0m
            |   |   |   |       `-- [00mstreams_channel.rb[0m
            |   |   |   |-- [01;34mcontrollers[0m
            |   |   |   |   `-- [01;34mturbo[0m
            |   |   |   |       |-- [01;34mframes[0m
            |   |   |   |       |   `-- [00mframe_request.rb[0m
            |   |   |   |       |-- [01;34mnative[0m
            |   |   |   |       |   |-- [00mnavigation.rb[0m
            |   |   |   |       |   `-- [00mnavigation_controller.rb[0m
            |   |   |   |       `-- [01;34mstreams[0m
            |   |   |   |           `-- [00mturbo_streams_tag_builder.rb[0m
            |   |   |   |-- [01;34mhelpers[0m
            |   |   |   |   `-- [01;34mturbo[0m
            |   |   |   |       |-- [00mdrive_helper.rb[0m
            |   |   |   |       |-- [00mframes_helper.rb[0m
            |   |   |   |       |-- [00mincludes_helper.rb[0m
            |   |   |   |       |-- [01;34mstreams[0m
            |   |   |   |       |   `-- [00maction_helper.rb[0m
            |   |   |   |       `-- [00mstreams_helper.rb[0m
            |   |   |   |-- [01;34mjavascript[0m
            |   |   |   |   `-- [01;34mturbo[0m
            |   |   |   |       |-- [00mcable.js[0m
            |   |   |   |       |-- [00mcable_stream_source_element.js[0m
            |   |   |   |       |-- [00mfetch_requests.js[0m
            |   |   |   |       |-- [00mindex.js[0m
            |   |   |   |       `-- [00msnakeize.js[0m
            |   |   |   |-- [01;34mjobs[0m
            |   |   |   |   `-- [01;34mturbo[0m
            |   |   |   |       `-- [01;34mstreams[0m
            |   |   |   |           |-- [00maction_broadcast_job.rb[0m
            |   |   |   |           `-- [00mbroadcast_job.rb[0m
            |   |   |   `-- [01;34mmodels[0m
            |   |   |       |-- [01;34mconcerns[0m
            |   |   |       |   `-- [01;34mturbo[0m
            |   |   |       |       `-- [00mbroadcastable.rb[0m
            |   |   |       `-- [01;34mturbo[0m
            |   |   |           `-- [01;34mstreams[0m
            |   |   |               `-- [00mtag_builder.rb[0m
            |   |   |-- [01;34mconfig[0m
            |   |   |   `-- [00mroutes.rb[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34minstall[0m
            |   |       |   |-- [00mturbo_needs_redis.rb[0m
            |   |       |   |-- [00mturbo_with_importmap.rb[0m
            |   |       |   `-- [00mturbo_with_node.rb[0m
            |   |       |-- [01;34mtasks[0m
            |   |       |   `-- [00mturbo_tasks.rake[0m
            |   |       |-- [01;34mturbo[0m
            |   |       |   |-- [00mengine.rb[0m
            |   |       |   |-- [00mtest_assertions.rb[0m
            |   |       |   `-- [00mversion.rb[0m
            |   |       `-- [00mturbo-rails.rb[0m
            |   |-- [01;34mtzinfo-2.0.6[0m
            |   |   |-- [00mCHANGES.md[0m
            |   |   |-- [00mLICENSE[0m
            |   |   |-- [00mREADME.md[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34mtzinfo[0m
            |   |       |   |-- [00mannual_rules.rb[0m
            |   |       |   |-- [00mcountry.rb[0m
            |   |       |   |-- [00mcountry_timezone.rb[0m
            |   |       |   |-- [00mdata_source.rb[0m
            |   |       |   |-- [01;34mdata_sources[0m
            |   |       |   |   |-- [00mconstant_offset_data_timezone_info.rb[0m
            |   |       |   |   |-- [00mcountry_info.rb[0m
            |   |       |   |   |-- [00mdata_timezone_info.rb[0m
            |   |       |   |   |-- [00mlinked_timezone_info.rb[0m
            |   |       |   |   |-- [00mposix_time_zone_parser.rb[0m
            |   |       |   |   |-- [00mruby_data_source.rb[0m
            |   |       |   |   |-- [00mtimezone_info.rb[0m
            |   |       |   |   |-- [00mtransitions_data_timezone_info.rb[0m
            |   |       |   |   |-- [00mzoneinfo_data_source.rb[0m
            |   |       |   |   `-- [00mzoneinfo_reader.rb[0m
            |   |       |   |-- [00mdata_sources.rb[0m
            |   |       |   |-- [00mdata_timezone.rb[0m
            |   |       |   |-- [00mdatetime_with_offset.rb[0m
            |   |       |   |-- [01;34mformat1[0m
            |   |       |   |   |-- [00mcountry_definer.rb[0m
            |   |       |   |   |-- [00mcountry_index_definition.rb[0m
            |   |       |   |   |-- [00mtimezone_definer.rb[0m
            |   |       |   |   |-- [00mtimezone_definition.rb[0m
            |   |       |   |   `-- [00mtimezone_index_definition.rb[0m
            |   |       |   |-- [00mformat1.rb[0m
            |   |       |   |-- [01;34mformat2[0m
            |   |       |   |   |-- [00mcountry_definer.rb[0m
            |   |       |   |   |-- [00mcountry_index_definer.rb[0m
            |   |       |   |   |-- [00mcountry_index_definition.rb[0m
            |   |       |   |   |-- [00mtimezone_definer.rb[0m
            |   |       |   |   |-- [00mtimezone_definition.rb[0m
            |   |       |   |   |-- [00mtimezone_index_definer.rb[0m
            |   |       |   |   `-- [00mtimezone_index_definition.rb[0m
            |   |       |   |-- [00mformat2.rb[0m
            |   |       |   |-- [00minfo_timezone.rb[0m
            |   |       |   |-- [00mlinked_timezone.rb[0m
            |   |       |   |-- [00moffset_timezone_period.rb[0m
            |   |       |   |-- [00mruby_core_support.rb[0m
            |   |       |   |-- [00mstring_deduper.rb[0m
            |   |       |   |-- [00mtime_with_offset.rb[0m
            |   |       |   |-- [00mtimestamp.rb[0m
            |   |       |   |-- [00mtimestamp_with_offset.rb[0m
            |   |       |   |-- [00mtimezone.rb[0m
            |   |       |   |-- [00mtimezone_offset.rb[0m
            |   |       |   |-- [00mtimezone_period.rb[0m
            |   |       |   |-- [00mtimezone_proxy.rb[0m
            |   |       |   |-- [00mtimezone_transition.rb[0m
            |   |       |   |-- [00mtransition_rule.rb[0m
            |   |       |   |-- [00mtransitions_timezone_period.rb[0m
            |   |       |   |-- [00mversion.rb[0m
            |   |       |   `-- [00mwith_offset.rb[0m
            |   |       `-- [00mtzinfo.rb[0m
            |   |-- [01;34mweb-console-4.2.0[0m
            |   |   |-- [00mCHANGELOG.markdown[0m
            |   |   |-- [00mMIT-LICENSE[0m
            |   |   |-- [00mREADME.markdown[0m
            |   |   |-- [00mRakefile[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [00mweb-console.rb[0m
            |   |       |-- [01;34mweb_console[0m
            |   |       |   |-- [00mcontext.rb[0m
            |   |       |   |-- [00merrors.rb[0m
            |   |       |   |-- [00mevaluator.rb[0m
            |   |       |   |-- [00mexception_mapper.rb[0m
            |   |       |   |-- [00mextensions.rb[0m
            |   |       |   |-- [00minjector.rb[0m
            |   |       |   |-- [00minterceptor.rb[0m
            |   |       |   |-- [01;34mlocales[0m
            |   |       |   |   `-- [00men.yml[0m
            |   |       |   |-- [00mmiddleware.rb[0m
            |   |       |   |-- [00mpermissions.rb[0m
            |   |       |   |-- [00mrailtie.rb[0m
            |   |       |   |-- [00mrequest.rb[0m
            |   |       |   |-- [00msession.rb[0m
            |   |       |   |-- [00msource_location.rb[0m
            |   |       |   |-- [01;34mtasks[0m
            |   |       |   |   |-- [00mextensions.rake[0m
            |   |       |   |   `-- [00mtemplates.rake[0m
            |   |       |   |-- [00mtemplate.rb[0m
            |   |       |   |-- [01;34mtemplates[0m
            |   |       |   |   |-- [00m_inner_console_markup.html.erb[0m
            |   |       |   |   |-- [00m_markup.html.erb[0m
            |   |       |   |   |-- [00m_prompt_box_markup.html.erb[0m
            |   |       |   |   |-- [00mconsole.js.erb[0m
            |   |       |   |   |-- [00merror_page.js.erb[0m
            |   |       |   |   |-- [00mindex.html.erb[0m
            |   |       |   |   |-- [01;34mlayouts[0m
            |   |       |   |   |   |-- [00minlined_string.erb[0m
            |   |       |   |   |   `-- [00mjavascript.erb[0m
            |   |       |   |   |-- [00mmain.js.erb[0m
            |   |       |   |   |-- [00mregular_page.js.erb[0m
            |   |       |   |   `-- [00mstyle.css.erb[0m
            |   |       |   |-- [01;34mtesting[0m
            |   |       |   |   |-- [00merb_precompiler.rb[0m
            |   |       |   |   |-- [00mfake_middleware.rb[0m
            |   |       |   |   `-- [00mhelper.rb[0m
            |   |       |   |-- [00mversion.rb[0m
            |   |       |   |-- [00mview.rb[0m
            |   |       |   `-- [00mwhiny_request.rb[0m
            |   |       `-- [00mweb_console.rb[0m
            |   |-- [01;34mwebdrivers-5.2.0[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mLICENSE.txt[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34mwebdrivers[0m
            |   |   |   |   |-- [00mRakefile[0m
            |   |   |   |   |-- [00mchrome_finder.rb[0m
            |   |   |   |   |-- [00mchromedriver.rb[0m
            |   |   |   |   |-- [00mcommon.rb[0m
            |   |   |   |   |-- [00medge_finder.rb[0m
            |   |   |   |   |-- [00medgedriver.rb[0m
            |   |   |   |   |-- [00mgeckodriver.rb[0m
            |   |   |   |   |-- [00miedriver.rb[0m
            |   |   |   |   |-- [00mlogger.rb[0m
            |   |   |   |   |-- [00mnetwork.rb[0m
            |   |   |   |   |-- [00mrailtie.rb[0m
            |   |   |   |   |-- [00msystem.rb[0m
            |   |   |   |   |-- [01;34mtasks[0m
            |   |   |   |   |   |-- [00mchromedriver.rake[0m
            |   |   |   |   |   |-- [00medgedriver.rake[0m
            |   |   |   |   |   |-- [00mgeckodriver.rake[0m
            |   |   |   |   |   `-- [00miedriver.rake[0m
            |   |   |   |   `-- [00mversion.rb[0m
            |   |   |   `-- [00mwebdrivers.rb[0m
            |   |   `-- [01;34mspec[0m
            |   |       |-- [00mspec_helper.rb[0m
            |   |       |-- [01;34mwebdrivers[0m
            |   |       |   |-- [00mchrome_finder_spec.rb[0m
            |   |       |   |-- [00mchromedriver_spec.rb[0m
            |   |       |   |-- [00medge_finder_spec.rb[0m
            |   |       |   |-- [00medgedriver_spec.rb[0m
            |   |       |   |-- [00mgeckodriver_spec.rb[0m
            |   |       |   |-- [00mi_edriver_spec.rb[0m
            |   |       |   |-- [00msystem_spec.rb[0m
            |   |       |   `-- [00mwebdrivers_spec.rb[0m
            |   |       `-- [00mwebdrivers_proxy_support_spec.rb[0m
            |   |-- [01;34mwebsocket-1.2.9[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mGemfile[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [00mRakefile[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34mwebsocket[0m
            |   |   |   |   |-- [00merror.rb[0m
            |   |   |   |   |-- [00mexception_handler.rb[0m
            |   |   |   |   |-- [01;34mframe[0m
            |   |   |   |   |   |-- [00mbase.rb[0m
            |   |   |   |   |   |-- [00mdata.rb[0m
            |   |   |   |   |   |-- [01;34mhandler[0m
            |   |   |   |   |   |   |-- [00mbase.rb[0m
            |   |   |   |   |   |   |-- [00mhandler03.rb[0m
            |   |   |   |   |   |   |-- [00mhandler04.rb[0m
            |   |   |   |   |   |   |-- [00mhandler05.rb[0m
            |   |   |   |   |   |   |-- [00mhandler07.rb[0m
            |   |   |   |   |   |   `-- [00mhandler75.rb[0m
            |   |   |   |   |   |-- [00mhandler.rb[0m
            |   |   |   |   |   |-- [01;34mincoming[0m
            |   |   |   |   |   |   |-- [00mclient.rb[0m
            |   |   |   |   |   |   `-- [00mserver.rb[0m
            |   |   |   |   |   |-- [00mincoming.rb[0m
            |   |   |   |   |   |-- [01;34moutgoing[0m
            |   |   |   |   |   |   |-- [00mclient.rb[0m
            |   |   |   |   |   |   `-- [00mserver.rb[0m
            |   |   |   |   |   `-- [00moutgoing.rb[0m
            |   |   |   |   |-- [00mframe.rb[0m
            |   |   |   |   |-- [01;34mhandshake[0m
            |   |   |   |   |   |-- [00mbase.rb[0m
            |   |   |   |   |   |-- [00mclient.rb[0m
            |   |   |   |   |   |-- [01;34mhandler[0m
            |   |   |   |   |   |   |-- [00mbase.rb[0m
            |   |   |   |   |   |   |-- [00mclient.rb[0m
            |   |   |   |   |   |   |-- [00mclient01.rb[0m
            |   |   |   |   |   |   |-- [00mclient04.rb[0m
            |   |   |   |   |   |   |-- [00mclient11.rb[0m
            |   |   |   |   |   |   |-- [00mclient75.rb[0m
            |   |   |   |   |   |   |-- [00mclient76.rb[0m
            |   |   |   |   |   |   |-- [00mserver.rb[0m
            |   |   |   |   |   |   |-- [00mserver04.rb[0m
            |   |   |   |   |   |   |-- [00mserver75.rb[0m
            |   |   |   |   |   |   `-- [00mserver76.rb[0m
            |   |   |   |   |   |-- [00mhandler.rb[0m
            |   |   |   |   |   `-- [00mserver.rb[0m
            |   |   |   |   |-- [00mhandshake.rb[0m
            |   |   |   |   |-- [00mnice_inspect.rb[0m
            |   |   |   |   `-- [00mversion.rb[0m
            |   |   |   `-- [00mwebsocket.rb[0m
            |   |   |-- [01;34mspec[0m
            |   |   |   |-- [01;34mframe[0m
            |   |   |   |   |-- [00mincoming_03_spec.rb[0m
            |   |   |   |   |-- [00mincoming_04_spec.rb[0m
            |   |   |   |   |-- [00mincoming_05_spec.rb[0m
            |   |   |   |   |-- [00mincoming_07_spec.rb[0m
            |   |   |   |   |-- [00mincoming_75_spec.rb[0m
            |   |   |   |   |-- [00mincoming_common_spec.rb[0m
            |   |   |   |   |-- [00mmasking_spec.rb[0m
            |   |   |   |   |-- [00moutgoing_03_spec.rb[0m
            |   |   |   |   |-- [00moutgoing_04_spec.rb[0m
            |   |   |   |   |-- [00moutgoing_05_spec.rb[0m
            |   |   |   |   |-- [00moutgoing_07_spec.rb[0m
            |   |   |   |   |-- [00moutgoing_75_spec.rb[0m
            |   |   |   |   `-- [00moutgoing_common_spec.rb[0m
            |   |   |   |-- [01;34mhandshake[0m
            |   |   |   |   |-- [00mclient_04_spec.rb[0m
            |   |   |   |   |-- [00mclient_11_spec.rb[0m
            |   |   |   |   |-- [00mclient_75_spec.rb[0m
            |   |   |   |   |-- [00mclient_76_spec.rb[0m
            |   |   |   |   |-- [00mserver_04_spec.rb[0m
            |   |   |   |   |-- [00mserver_75_spec.rb[0m
            |   |   |   |   `-- [00mserver_76_spec.rb[0m
            |   |   |   |-- [00mspec_helper.rb[0m
            |   |   |   `-- [01;34msupport[0m
            |   |   |       |-- [00mall_client_drafts.rb[0m
            |   |   |       |-- [00mall_server_drafts.rb[0m
            |   |   |       |-- [00mframes_base.rb[0m
            |   |   |       |-- [00mhandshake_requests.rb[0m
            |   |   |       |-- [00mincoming_frames.rb[0m
            |   |   |       |-- [00moutgoing_frames.rb[0m
            |   |   |       `-- [00moverwrites.rb[0m
            |   |   `-- [00mwebsocket.gemspec[0m
            |   |-- [01;34mwebsocket-driver-0.7.5[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mLICENSE.md[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [01;34mext[0m
            |   |   |   `-- [01;34mwebsocket-driver[0m
            |   |   |       |-- [00mMakefile[0m
            |   |   |       |-- [00mWebsocketMaskService.java[0m
            |   |   |       |-- [00mextconf.rb[0m
            |   |   |       |-- [00mwebsocket_mask.c[0m
            |   |   |       |-- [00mwebsocket_mask.o[0m
            |   |   |       `-- [01;32mwebsocket_mask.so[0m
            |   |   `-- [01;34mlib[0m
            |   |       |-- [01;34mwebsocket[0m
            |   |       |   |-- [01;34mdriver[0m
            |   |       |   |   |-- [00mclient.rb[0m
            |   |       |   |   |-- [00mdraft75.rb[0m
            |   |       |   |   |-- [00mdraft76.rb[0m
            |   |       |   |   |-- [00mevent_emitter.rb[0m
            |   |       |   |   |-- [00mheaders.rb[0m
            |   |       |   |   |-- [01;34mhybi[0m
            |   |       |   |   |   |-- [00mframe.rb[0m
            |   |       |   |   |   `-- [00mmessage.rb[0m
            |   |       |   |   |-- [00mhybi.rb[0m
            |   |       |   |   |-- [00mproxy.rb[0m
            |   |       |   |   |-- [00mserver.rb[0m
            |   |       |   |   `-- [00mstream_reader.rb[0m
            |   |       |   |-- [00mdriver.rb[0m
            |   |       |   |-- [01;34mhttp[0m
            |   |       |   |   |-- [00mheaders.rb[0m
            |   |       |   |   |-- [00mrequest.rb[0m
            |   |       |   |   `-- [00mresponse.rb[0m
            |   |       |   |-- [00mhttp.rb[0m
            |   |       |   |-- [00mmask.rb[0m
            |   |       |   `-- [00mwebsocket_mask.rb[0m
            |   |       `-- [01;32mwebsocket_mask.so[0m
            |   |-- [01;34mwebsocket-extensions-0.1.5[0m
            |   |   |-- [00mCHANGELOG.md[0m
            |   |   |-- [00mLICENSE.md[0m
            |   |   |-- [00mREADME.md[0m
            |   |   `-- [01;34mlib[0m
            |   |       `-- [01;34mwebsocket[0m
            |   |           |-- [01;34mextensions[0m
            |   |           |   `-- [00mparser.rb[0m
            |   |           `-- [00mextensions.rb[0m
            |   |-- [01;34mxpath-3.2.0[0m
            |   |   |-- [00mREADME.md[0m
            |   |   |-- [01;34mlib[0m
            |   |   |   |-- [01;34mxpath[0m
            |   |   |   |   |-- [00mdsl.rb[0m
            |   |   |   |   |-- [00mexpression.rb[0m
            |   |   |   |   |-- [00mliteral.rb[0m
            |   |   |   |   |-- [00mrenderer.rb[0m
            |   |   |   |   |-- [00munion.rb[0m
            |   |   |   |   `-- [00mversion.rb[0m
            |   |   |   `-- [00mxpath.rb[0m
            |   |   `-- [01;34mspec[0m
            |   |       |-- [01;34mfixtures[0m
            |   |       |   |-- [00mform.html[0m
            |   |       |   |-- [00msimple.html[0m
            |   |       |   `-- [00mstuff.html[0m
            |   |       |-- [00mspec_helper.rb[0m
            |   |       |-- [00munion_spec.rb[0m
            |   |       `-- [00mxpath_spec.rb[0m
            |   `-- [01;34mzeitwerk-2.6.7[0m
            |       |-- [00mMIT-LICENSE[0m
            |       |-- [00mREADME.md[0m
            |       `-- [01;34mlib[0m
            |           |-- [01;34mzeitwerk[0m
            |           |   |-- [00merror.rb[0m
            |           |   |-- [00mexplicit_namespace.rb[0m
            |           |   |-- [00mgem_inflector.rb[0m
            |           |   |-- [00mgem_loader.rb[0m
            |           |   |-- [00minflector.rb[0m
            |           |   |-- [00minternal.rb[0m
            |           |   |-- [00mkernel.rb[0m
            |           |   |-- [01;34mloader[0m
            |           |   |   |-- [00mcallbacks.rb[0m
            |           |   |   |-- [00mconfig.rb[0m
            |           |   |   |-- [00meager_load.rb[0m
            |           |   |   `-- [00mhelpers.rb[0m
            |           |   |-- [00mloader.rb[0m
            |           |   |-- [00mreal_mod_name.rb[0m
            |           |   |-- [00mregistry.rb[0m
            |           |   `-- [00mversion.rb[0m
            |           `-- [00mzeitwerk.rb[0m
            |-- [01;34mplugins[0m
            `-- [01;34mspecifications[0m
                |-- [00mactioncable-7.0.4.2.gemspec[0m
                |-- [00mactionmailbox-7.0.4.2.gemspec[0m
                |-- [00mactionmailer-7.0.4.2.gemspec[0m
                |-- [00mactionpack-7.0.4.2.gemspec[0m
                |-- [00mactiontext-7.0.4.2.gemspec[0m
                |-- [00mactionview-7.0.4.2.gemspec[0m
                |-- [00mactivejob-7.0.4.2.gemspec[0m
                |-- [00mactivemodel-7.0.4.2.gemspec[0m
                |-- [00mactiverecord-7.0.4.2.gemspec[0m
                |-- [00mactivestorage-7.0.4.2.gemspec[0m
                |-- [00mactivesupport-7.0.4.2.gemspec[0m
                |-- [00maddressable-2.8.1.gemspec[0m
                |-- [00mbindex-0.8.1.gemspec[0m
                |-- [00mbootsnap-1.16.0.gemspec[0m
                |-- [00mbuilder-3.2.4.gemspec[0m
                |-- [00mcapybara-3.38.0.gemspec[0m
                |-- [00mconcurrent-ruby-1.2.2.gemspec[0m
                |-- [00mcrass-1.0.6.gemspec[0m
                |-- [00mdate-3.3.3.gemspec[0m
                |-- [00mdebug-1.7.1.gemspec[0m
                |-- [00merubi-1.12.0.gemspec[0m
                |-- [00mglobalid-1.1.0.gemspec[0m
                |-- [00mi18n-1.12.0.gemspec[0m
                |-- [00mimportmap-rails-1.1.5.gemspec[0m
                |-- [00mio-console-0.6.0.gemspec[0m
                |-- [00mirb-1.6.2.gemspec[0m
                |-- [00mjbuilder-2.11.5.gemspec[0m
                |-- [00mloofah-2.19.1.gemspec[0m
                |-- [00mmail-2.8.1.gemspec[0m
                |-- [00mmarcel-1.0.2.gemspec[0m
                |-- [00mmatrix-0.4.2.gemspec[0m
                |-- [00mmethod_source-1.0.0.gemspec[0m
                |-- [00mmini_mime-1.1.2.gemspec[0m
                |-- [00mminitest-5.17.0.gemspec[0m
                |-- [00mmsgpack-1.6.0.gemspec[0m
                |-- [00mnet-imap-0.3.4.gemspec[0m
                |-- [00mnet-pop-0.1.2.gemspec[0m
                |-- [00mnet-protocol-0.2.1.gemspec[0m
                |-- [00mnet-smtp-0.3.3.gemspec[0m
                |-- [00mnio4r-2.5.8.gemspec[0m
                |-- [00mnokogiri-1.14.2-x86_64-linux.gemspec[0m
                |-- [00mpublic_suffix-5.0.1.gemspec[0m
                |-- [00mpuma-5.6.5.gemspec[0m
                |-- [00mracc-1.6.2.gemspec[0m
                |-- [00mrack-2.2.6.2.gemspec[0m
                |-- [00mrack-test-2.0.2.gemspec[0m
                |-- [00mrails-7.0.4.2.gemspec[0m
                |-- [00mrails-dom-testing-2.0.3.gemspec[0m
                |-- [00mrails-html-sanitizer-1.5.0.gemspec[0m
                |-- [00mrailties-7.0.4.2.gemspec[0m
                |-- [00mrake-13.0.6.gemspec[0m
                |-- [00mregexp_parser-2.7.0.gemspec[0m
                |-- [00mreline-0.3.2.gemspec[0m
                |-- [00mrexml-3.2.5.gemspec[0m
                |-- [00mrubyzip-2.3.2.gemspec[0m
                |-- [00mselenium-webdriver-4.8.1.gemspec[0m
                |-- [00msprockets-4.2.0.gemspec[0m
                |-- [00msprockets-rails-3.4.2.gemspec[0m
                |-- [00msqlite3-1.6.1-x86_64-linux.gemspec[0m
                |-- [00mstimulus-rails-1.2.1.gemspec[0m
                |-- [00mthor-1.2.1.gemspec[0m
                |-- [00mtimeout-0.3.2.gemspec[0m
                |-- [00mturbo-rails-1.3.3.gemspec[0m
                |-- [00mtzinfo-2.0.6.gemspec[0m
                |-- [00mweb-console-4.2.0.gemspec[0m
                |-- [00mwebdrivers-5.2.0.gemspec[0m
                |-- [00mwebsocket-1.2.9.gemspec[0m
                |-- [00mwebsocket-driver-0.7.5.gemspec[0m
                |-- [00mwebsocket-extensions-0.1.5.gemspec[0m
                |-- [00mxpath-3.2.0.gemspec[0m
                `-- [00mzeitwerk-2.6.7.gemspec[0m

1103 directories, 4629 files
```

- **Deberías ver una jerarquía de directorios que refleja la estructura de las gemas instaladas.**

---

### ***Configuración Actualizada para Bundler:***

- **La opción recomendada ahora es configurar el directorio de instalación de las gemas a través del archivo de configuración de Bundler.**

**Comando para Configurar el Directorio de Instalación:**

```bash
bundle3.0 config set --local path './vendor/bundle'
```

**Este comando establece la configuración local de Bundler para que las gemas se instalen en el directorio `./vendor/bundle`, asegurando que las dependencias se gestionen dentro del proyecto sin interferir con otros proyectos o el sistema global.**

---

### ***Procedimiento para Aplicar la Configuración***

1. **Eliminar el Directorio `vendor`:**

   **Antes de aplicar la nueva configuración, es útil limpiar cualquier configuración anterior o directorios de instalación previos. Ejecuta el siguiente comando para eliminar el directorio `vendor`:**

   ```bash
   rm -rf ./vendor/
   ```

2. **Configurar Bundler:**

   **Ejecuta el comando para configurar Bundler con el nuevo directorio de instalación:**

   ```bash
   bundle3.0 config set --local path './vendor/bundle'
   ```

   **Salida esperada:**

   ```bash
   You are replacing the current local value of path, which is currently "./vendor"
   ```

   **Este mensaje indica que la configuración se ha actualizado correctamente.**

3. **Instalar Dependencias:**

   **Finalmente, vuelve a instalar las dependencias del proyecto utilizando el comando `bundle3.0 install`:**

   ```bash
   bundle3.0 install
   ```

  ```bash
  bundle3.0 install
  Don't run Bundler as root. Bundler can ask for sudo if it is needed, and installing your bundle as root will break this application for all non-root users on this
  machine.
  Warning: the running version of Bundler (2.2.22) is older than the version that created the lockfile (2.4.7). We suggest you to upgrade to the version that created the lockfile by running `gem install bundler:2.4.7`.
  Fetching gem metadata from https://rubygems.org/
  Fetching gem metadata from https://rubygems.org/..........
  Fetching rake 13.0.6
  Installing rake 13.0.6
  Fetching minitest 5.17.0
  Fetching concurrent-ruby 1.2.2
  Fetching builder 3.2.4
  Fetching erubi 1.12.0
  Installing erubi 1.12.0
  Installing builder 3.2.4
  Fetching racc 1.6.2
  Fetching crass 1.0.6
  Installing minitest 5.17.0
  Fetching rack 2.2.6.2
  Installing concurrent-ruby 1.2.2
  Installing crass 1.0.6
  Fetching nio4r 2.5.8
  Installing racc 1.6.2 with native extensions
  Fetching websocket-extensions 0.1.5
  Installing rack 2.2.6.2
  Installing websocket-extensions 0.1.5
  Fetching marcel 1.0.2
  Fetching mini_mime 1.1.2
  Installing nio4r 2.5.8 with native extensions
  Installing marcel 1.0.2
  Fetching date 3.3.3
  Installing mini_mime 1.1.2
  Fetching timeout 0.3.2
  Installing timeout 0.3.2
  Fetching public_suffix 5.0.1
  Installing date 3.3.3 with native extensions
  Installing public_suffix 5.0.1
  Fetching bindex 0.8.1
  Fetching msgpack 1.6.0
  Installing bindex 0.8.1 with native extensions
  Installing msgpack 1.6.0 with native extensions
  Using bundler 2.2.22
  Fetching matrix 0.4.2
  Installing matrix 0.4.2
  Fetching regexp_parser 2.7.0
  Installing regexp_parser 2.7.0
  Fetching io-console 0.6.0
  Installing io-console 0.6.0 with native extensions
  Fetching method_source 1.0.0
  Installing method_source 1.0.0
  Fetching thor 1.2.1
  Installing thor 1.2.1
  Fetching zeitwerk 2.6.7
  Installing zeitwerk 2.6.7
  Fetching rexml 3.2.5
  Fetching rubyzip 2.3.2
  Installing rexml 3.2.5
  Fetching websocket 1.2.9
  Installing rubyzip 2.3.2
  Fetching sqlite3 1.6.1 (x86_64-linux)
  Installing websocket 1.2.9
  Fetching i18n 1.12.0
  Installing i18n 1.12.0
  Fetching tzinfo 2.0.6
  Installing tzinfo 2.0.6
  Fetching websocket-driver 0.7.5
  Installing sqlite3 1.6.1 (x86_64-linux)
  Installing websocket-driver 0.7.5 with native extensions
  Fetching rack-test 2.0.2
  Installing rack-test 2.0.2
  Fetching sprockets 4.2.0
  Fetching net-protocol 0.2.1
  Installing sprockets 4.2.0
  Installing net-protocol 0.2.1
  Fetching addressable 2.8.1
  Fetching nokogiri 1.14.2 (x86_64-linux)
  Installing addressable 2.8.1
  Fetching reline 0.3.2
  Installing reline 0.3.2
  Fetching puma 5.6.5
  Installing nokogiri 1.14.2 (x86_64-linux)
  Fetching selenium-webdriver 4.8.1
  Installing puma 5.6.5 with native extensions
  Fetching activesupport 7.0.4.2
  Installing selenium-webdriver 4.8.1
  Installing activesupport 7.0.4.2
  Fetching net-pop 0.1.2
  Fetching net-smtp 0.3.3
  Installing net-pop 0.1.2
  Fetching irb 1.6.2
  Installing net-smtp 0.3.3
  Fetching bootsnap 1.16.0
  Fetching loofah 2.19.1
  Installing bootsnap 1.16.0 with native extensions
  Installing irb 1.6.2
  Fetching xpath 3.2.0
  Installing loofah 2.19.1
  Fetching rails-dom-testing 2.0.3
  Installing xpath 3.2.0
  Fetching globalid 1.1.0
  Installing rails-dom-testing 2.0.3
  Fetching activemodel 7.0.4.2
  Installing globalid 1.1.0
  Fetching webdrivers 5.2.0
  Installing activemodel 7.0.4.2
  Installing webdrivers 5.2.0
  Fetching debug 1.7.1
  Fetching rails-html-sanitizer 1.5.0
  Fetching capybara 3.38.0
  Installing rails-html-sanitizer 1.5.0
  Fetching activejob 7.0.4.2
  Installing debug 1.7.1 with native extensions
  Installing activejob 7.0.4.2
  Installing capybara 3.38.0
  Fetching activerecord 7.0.4.2
  Fetching actionview 7.0.4.2
  Fetching net-imap 0.3.4
  Installing actionview 7.0.4.2
  Installing net-imap 0.3.4
  Fetching actionpack 7.0.4.2
  Fetching jbuilder 2.11.5
  Fetching mail 2.8.1
  Installing activerecord 7.0.4.2
  Installing jbuilder 2.11.5
  Installing actionpack 7.0.4.2
  Installing mail 2.8.1
  Fetching actioncable 7.0.4.2
  Fetching railties 7.0.4.2
  Fetching activestorage 7.0.4.2
  Fetching sprockets-rails 3.4.2
  Installing sprockets-rails 3.4.2
  Installing actioncable 7.0.4.2
  Installing activestorage 7.0.4.2
  Fetching actionmailer 7.0.4.2
  Installing railties 7.0.4.2
  Fetching actionmailbox 7.0.4.2
  Fetching actiontext 7.0.4.2
  Fetching importmap-rails 1.1.5
  Installing actionmailer 7.0.4.2
  Fetching stimulus-rails 1.2.1
  Installing actionmailbox 7.0.4.2
  Fetching turbo-rails 1.3.3
  Installing actiontext 7.0.4.2
  Fetching web-console 4.2.0
  Installing importmap-rails 1.1.5
  Fetching rails 7.0.4.2
  Installing stimulus-rails 1.2.1
  Installing turbo-rails 1.3.3
  Installing web-console 4.2.0
  Installing rails 7.0.4.2
  Bundle complete! 15 Gemfile dependencies, 72 gems now installed.
  Bundled gems are installed into `./vendor/bundle`
  Post-install message from rubyzip:
  RubyZip 3.0 is coming!
  **********************

  The public API of some Rubyzip classes has been modernized to use named
  parameters for optional arguments. Please check your usage of the
  following classes:
    * `Zip::File`
    * `Zip::Entry`
    * `Zip::InputStream`
    * `Zip::OutputStream`

  Please ensure that your Gemfiles and .gemspecs are suitably restrictive
  to avoid an unexpected breakage when 3.0 is released (e.g. ~> 2.3.0).
  See https://github.com/rubyzip/rubyzip for details. The Changelog also
  lists other enhancements and bugfixes that have been implemented since
  version 2.3.0.
  ```

   **Este comando instalará todas las gemas necesarias en el directorio `./vendor/bundle`, respetando la nueva configuración.**

- **Listamos Permisos de Directorios y Ficheros**

```bash
ls -lA
total 88
drwxr-xr-x  2 root root 4096 Sep  5 22:24 .bundle
drwxrwxr-x  8 1000 1000 4096 Feb 27  2023 .git
-rw-rw-r--  1 1000 1000  246 Feb 27  2023 .gitattributes
-rw-rw-r--  1 1000 1000  785 Feb 27  2023 .gitignore
-rw-rw-r--  1 1000 1000   11 Feb 27  2023 .ruby-version
-rw-rw-r--  1 1000 1000 2284 Feb 27  2023 Gemfile
-rw-rw-r--  1 1000 1000 5543 Feb 27  2023 Gemfile.lock
-rw-rw-r--  1 1000 1000  374 Feb 27  2023 README.md
-rw-rw-r--  1 1000 1000  227 Feb 27  2023 Rakefile
drwxrwxr-x 10 1000 1000 4096 Feb 27  2023 app
drwxrwxr-x  2 1000 1000 4096 Feb 27  2023 bin
drwxrwxr-x  5 1000 1000 4096 Feb 27  2023 config
-rw-rw-r--  1 1000 1000  160 Feb 27  2023 config.ru
drwxrwxr-x  2 1000 1000 4096 Feb 27  2023 db
drwxrwxr-x  4 1000 1000 4096 Feb 27  2023 lib
drwxrwxr-x  2 1000 1000 4096 Feb 27  2023 log
drwxrwxr-x  2 1000 1000 4096 Feb 27  2023 public
drwxrwxr-x  2 1000 1000 4096 Feb 27  2023 storage
drwxrwxr-x 10 1000 1000 4096 Feb 27  2023 test
drwxrwxr-x  4 1000 1000 4096 Feb 27  2023 tmp
drwxr-xr-x  3 root root 4096 Sep  5 22:32 vendor
```

```bash
tree -C ./
[01;34m.[0m
|-- [00mGemfile[0m
|-- [00mGemfile.lock[0m
|-- [00mREADME.md[0m
|-- [00mRakefile[0m
|-- [01;34mapp[0m
|   |-- [01;34massets[0m
|   |   |-- [01;34mconfig[0m
|   |   |   `-- [00mmanifest.js[0m
|   |   |-- [01;34mimages[0m
|   |   `-- [01;34mstylesheets[0m
|   |       `-- [00mapplication.css[0m
|   |-- [01;34mchannels[0m
|   |   `-- [01;34mapplication_cable[0m
|   |       |-- [00mchannel.rb[0m
|   |       `-- [00mconnection.rb[0m
|   |-- [01;34mcontrollers[0m
|   |   |-- [00mapplication_controller.rb[0m
|   |   |-- [01;34mconcerns[0m
|   |   `-- [00mhome_controller.rb[0m
|   |-- [01;34mhelpers[0m
|   |   |-- [00mapplication_helper.rb[0m
|   |   `-- [00mhome_helper.rb[0m
|   |-- [01;34mjobs[0m
|   |   `-- [00mapplication_job.rb[0m
|   |-- [01;34mmailers[0m
|   |   `-- [00mapplication_mailer.rb[0m
|   |-- [01;34mmodels[0m
|   |   |-- [00mapplication_record.rb[0m
|   |   `-- [01;34mconcerns[0m
|   `-- [01;34mviews[0m
|       |-- [01;34mhome[0m
|       |   `-- [00mindex.html.erb[0m
|       `-- [01;34mlayouts[0m
|           |-- [00mapplication.html.erb[0m
|           |-- [00mmailer.html.erb[0m
|           `-- [00mmailer.text.erb[0m
|-- [01;34mbin[0m
|   |-- [01;32mrails[0m
|   |-- [01;32mrake[0m
|   `-- [01;32msetup[0m
|-- [01;34mconfig[0m
|   |-- [00mapplication.rb[0m
|   |-- [00mboot.rb[0m
|   |-- [00mcable.yml[0m
|   |-- [00mcredentials.yml.enc[0m
|   |-- [00mdatabase.yml[0m
|   |-- [00menvironment.rb[0m
|   |-- [01;34menvironments[0m
|   |   |-- [00mdevelopment.rb[0m
|   |   |-- [00mproduction.rb[0m
|   |   `-- [00mtest.rb[0m
|   |-- [01;34minitializers[0m
|   |   |-- [00massets.rb[0m
|   |   |-- [00mcontent_security_policy.rb[0m
|   |   |-- [00mfilter_parameter_logging.rb[0m
|   |   |-- [00minflections.rb[0m
|   |   `-- [00mpermissions_policy.rb[0m
|   |-- [01;34mlocales[0m
|   |   `-- [00men.yml[0m
|   |-- [00mpuma.rb[0m
|   |-- [00mroutes.rb[0m
|   `-- [00mstorage.yml[0m
|-- [00mconfig.ru[0m
|-- [01;34mdb[0m
|   `-- [00mseeds.rb[0m
|-- [01;34mlib[0m
|   |-- [01;34massets[0m
|   `-- [01;34mtasks[0m
|-- [01;34mlog[0m
|-- [01;34mpublic[0m
|   |-- [00m404.html[0m
|   |-- [00m422.html[0m
|   |-- [00m500.html[0m
|   |-- [00mapple-touch-icon-precomposed.png[0m
|   |-- [00mapple-touch-icon.png[0m
|   |-- [00mfavicon.ico[0m
|   `-- [00mrobots.txt[0m
|-- [01;34mstorage[0m
|-- [01;34mtest[0m
|   |-- [00mapplication_system_test_case.rb[0m
|   |-- [01;34mchannels[0m
|   |   `-- [01;34mapplication_cable[0m
|   |       `-- [00mconnection_test.rb[0m
|   |-- [01;34mcontrollers[0m
|   |   `-- [00mhome_controller_test.rb[0m
|   |-- [01;34mfixtures[0m
|   |   `-- [01;34mfiles[0m
|   |-- [01;34mhelpers[0m
|   |-- [01;34mintegration[0m
|   |-- [01;34mmailers[0m
|   |-- [01;34mmodels[0m
|   |-- [01;34msystem[0m
|   `-- [00mtest_helper.rb[0m
|-- [01;34mtmp[0m
|   |-- [01;34mpids[0m
|   `-- [01;34mstorage[0m
`-- [01;34mvendor[0m
    `-- [01;34mbundle[0m
        `-- [01;34mruby[0m
            `-- [01;34m3.0.0[0m
                |-- [01;34mbin[0m
                |   |-- [01;32mbootsnap[0m
                |   |-- [01;32mirb[0m
                |   |-- [01;32mnokogiri[0m
                |   |-- [01;32mpuma[0m
                |   |-- [01;32mpumactl[0m
                |   |-- [01;32mracc[0m
                |   |-- [01;32mrackup[0m
                |   |-- [01;32mrails[0m
                |   |-- [01;32mrake[0m
                |   |-- [01;32mrdbg[0m
                |   |-- [01;32msprockets[0m
                |   `-- [01;32mthor[0m
                |-- [01;34mbuild_info[0m
                |-- [01;34mcache[0m
                |   |-- [00mactioncable-7.0.4.2.gem[0m
                |   |-- [00mactionmailbox-7.0.4.2.gem[0m
                |   |-- [00mactionmailer-7.0.4.2.gem[0m
                |   |-- [00mactionpack-7.0.4.2.gem[0m
                |   |-- [00mactiontext-7.0.4.2.gem[0m
                |   |-- [00mactionview-7.0.4.2.gem[0m
                |   |-- [00mactivejob-7.0.4.2.gem[0m
                |   |-- [00mactivemodel-7.0.4.2.gem[0m
                |   |-- [00mactiverecord-7.0.4.2.gem[0m
                |   |-- [00mactivestorage-7.0.4.2.gem[0m
                |   |-- [00mactivesupport-7.0.4.2.gem[0m
                |   |-- [00maddressable-2.8.1.gem[0m
                |   |-- [00mbindex-0.8.1.gem[0m
                |   |-- [00mbootsnap-1.16.0.gem[0m
                |   |-- [00mbuilder-3.2.4.gem[0m
                |   |-- [00mcapybara-3.38.0.gem[0m
                |   |-- [00mconcurrent-ruby-1.2.2.gem[0m
                |   |-- [00mcrass-1.0.6.gem[0m
                |   |-- [00mdate-3.3.3.gem[0m
                |   |-- [00mdebug-1.7.1.gem[0m
                |   |-- [00merubi-1.12.0.gem[0m
                |   |-- [00mglobalid-1.1.0.gem[0m
                |   |-- [00mi18n-1.12.0.gem[0m
                |   |-- [00mimportmap-rails-1.1.5.gem[0m
                |   |-- [00mio-console-0.6.0.gem[0m
                |   |-- [00mirb-1.6.2.gem[0m
                |   |-- [00mjbuilder-2.11.5.gem[0m
                |   |-- [00mloofah-2.19.1.gem[0m
                |   |-- [00mmail-2.8.1.gem[0m
                |   |-- [00mmarcel-1.0.2.gem[0m
                |   |-- [00mmatrix-0.4.2.gem[0m
                |   |-- [00mmethod_source-1.0.0.gem[0m
                |   |-- [00mmini_mime-1.1.2.gem[0m
                |   |-- [00mminitest-5.17.0.gem[0m
                |   |-- [00mmsgpack-1.6.0.gem[0m
                |   |-- [00mnet-imap-0.3.4.gem[0m
                |   |-- [00mnet-pop-0.1.2.gem[0m
                |   |-- [00mnet-protocol-0.2.1.gem[0m
                |   |-- [00mnet-smtp-0.3.3.gem[0m
                |   |-- [00mnio4r-2.5.8.gem[0m
                |   |-- [00mnokogiri-1.14.2-x86_64-linux.gem[0m
                |   |-- [00mpublic_suffix-5.0.1.gem[0m
                |   |-- [00mpuma-5.6.5.gem[0m
                |   |-- [00mracc-1.6.2.gem[0m
                |   |-- [00mrack-2.2.6.2.gem[0m
                |   |-- [00mrack-test-2.0.2.gem[0m
                |   |-- [00mrails-7.0.4.2.gem[0m
                |   |-- [00mrails-dom-testing-2.0.3.gem[0m
                |   |-- [00mrails-html-sanitizer-1.5.0.gem[0m
                |   |-- [00mrailties-7.0.4.2.gem[0m
                |   |-- [00mrake-13.0.6.gem[0m
                |   |-- [00mregexp_parser-2.7.0.gem[0m
                |   |-- [00mreline-0.3.2.gem[0m
                |   |-- [00mrexml-3.2.5.gem[0m
                |   |-- [00mrubyzip-2.3.2.gem[0m
                |   |-- [00mselenium-webdriver-4.8.1.gem[0m
                |   |-- [00msprockets-4.2.0.gem[0m
                |   |-- [00msprockets-rails-3.4.2.gem[0m
                |   |-- [00msqlite3-1.6.1-x86_64-linux.gem[0m
                |   |-- [00mstimulus-rails-1.2.1.gem[0m
                |   |-- [00mthor-1.2.1.gem[0m
                |   |-- [00mtimeout-0.3.2.gem[0m
                |   |-- [00mturbo-rails-1.3.3.gem[0m
                |   |-- [00mtzinfo-2.0.6.gem[0m
                |   |-- [00mweb-console-4.2.0.gem[0m
                |   |-- [00mwebdrivers-5.2.0.gem[0m
                |   |-- [00mwebsocket-1.2.9.gem[0m
                |   |-- [00mwebsocket-driver-0.7.5.gem[0m
                |   |-- [00mwebsocket-extensions-0.1.5.gem[0m
                |   |-- [00mxpath-3.2.0.gem[0m
                |   `-- [00mzeitwerk-2.6.7.gem[0m
                |-- [01;34mdoc[0m
                |-- [01;34mextensions[0m
                |   `-- [01;34mx86_64-linux[0m
                |       `-- [01;34m3.0.0[0m
                |           |-- [01;34mbindex-0.8.1[0m
                |           |   |-- [00mgem.build_complete[0m
                |           |   |-- [00mgem_make.out[0m
                |           |   `-- [01;34mskiptrace[0m
                |           |       `-- [01;34minternal[0m
                |           |           `-- [01;32mcruby.so[0m
                |           |-- [01;34mbootsnap-1.16.0[0m
                |           |   |-- [01;34mbootsnap[0m
                |           |   |   `-- [01;32mbootsnap.so[0m
                |           |   |-- [00mgem.build_complete[0m
                |           |   `-- [00mgem_make.out[0m
                |           |-- [01;34mdate-3.3.3[0m
                |           |   |-- [01;32mdate_core.so[0m
                |           |   |-- [00mgem.build_complete[0m
                |           |   |-- [00mgem_make.out[0m
                |           |   `-- [00mmkmf.log[0m
                |           |-- [01;34mdebug-1.7.1[0m
                |           |   |-- [01;34mdebug[0m
                |           |   |   `-- [01;32mdebug.so[0m
                |           |   |-- [00mgem.build_complete[0m
                |           |   `-- [00mgem_make.out[0m
                |           |-- [01;34mio-console-0.6.0[0m
                |           |   |-- [00mgem.build_complete[0m
                |           |   |-- [00mgem_make.out[0m
                |           |   |-- [01;34mio[0m
                |           |   |   `-- [01;32mconsole.so[0m
                |           |   `-- [00mmkmf.log[0m
                |           |-- [01;34mmsgpack-1.6.0[0m
                |           |   |-- [00mgem.build_complete[0m
                |           |   |-- [00mgem_make.out[0m
                |           |   |-- [00mmkmf.log[0m
                |           |   `-- [01;34mmsgpack[0m
                |           |       `-- [01;32mmsgpack.so[0m
                |           |-- [01;34mnio4r-2.5.8[0m
                |           |   |-- [00mgem.build_complete[0m
                |           |   |-- [00mgem_make.out[0m
                |           |   |-- [00mmkmf.log[0m
                |           |   `-- [01;32mnio4r_ext.so[0m
                |           |-- [01;34mpuma-5.6.5[0m
                |           |   |-- [00mgem.build_complete[0m
                |           |   |-- [00mgem_make.out[0m
                |           |   |-- [00mmkmf.log[0m
                |           |   `-- [01;34mpuma[0m
                |           |       `-- [01;32mpuma_http11.so[0m
                |           |-- [01;34mracc-1.6.2[0m
                |           |   |-- [00mgem.build_complete[0m
                |           |   |-- [00mgem_make.out[0m
                |           |   |-- [00mmkmf.log[0m
                |           |   `-- [01;34mracc[0m
                |           |       `-- [01;32mcparse.so[0m
                |           `-- [01;34mwebsocket-driver-0.7.5[0m
                |               |-- [00mgem.build_complete[0m
                |               |-- [00mgem_make.out[0m
                |               `-- [01;32mwebsocket_mask.so[0m
                |-- [01;34mgems[0m
                |   |-- [01;34mactioncable-7.0.4.2[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [01;34mapp[0m
                |   |   |   `-- [01;34massets[0m
                |   |   |       `-- [01;34mjavascripts[0m
                |   |   |           |-- [00maction_cable.js[0m
                |   |   |           |-- [00mactioncable.esm.js[0m
                |   |   |           `-- [00mactioncable.js[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34maction_cable[0m
                |   |       |   |-- [01;34mchannel[0m
                |   |       |   |   |-- [00mbase.rb[0m
                |   |       |   |   |-- [00mbroadcasting.rb[0m
                |   |       |   |   |-- [00mcallbacks.rb[0m
                |   |       |   |   |-- [00mnaming.rb[0m
                |   |       |   |   |-- [00mperiodic_timers.rb[0m
                |   |       |   |   |-- [00mstreams.rb[0m
                |   |       |   |   `-- [00mtest_case.rb[0m
                |   |       |   |-- [00mchannel.rb[0m
                |   |       |   |-- [01;34mconnection[0m
                |   |       |   |   |-- [00mauthorization.rb[0m
                |   |       |   |   |-- [00mbase.rb[0m
                |   |       |   |   |-- [00mclient_socket.rb[0m
                |   |       |   |   |-- [00midentification.rb[0m
                |   |       |   |   |-- [00minternal_channel.rb[0m
                |   |       |   |   |-- [00mmessage_buffer.rb[0m
                |   |       |   |   |-- [00mstream.rb[0m
                |   |       |   |   |-- [00mstream_event_loop.rb[0m
                |   |       |   |   |-- [00msubscriptions.rb[0m
                |   |       |   |   |-- [00mtagged_logger_proxy.rb[0m
                |   |       |   |   |-- [00mtest_case.rb[0m
                |   |       |   |   `-- [00mweb_socket.rb[0m
                |   |       |   |-- [00mconnection.rb[0m
                |   |       |   |-- [00mengine.rb[0m
                |   |       |   |-- [00mgem_version.rb[0m
                |   |       |   |-- [01;34mhelpers[0m
                |   |       |   |   `-- [00maction_cable_helper.rb[0m
                |   |       |   |-- [00mremote_connections.rb[0m
                |   |       |   |-- [01;34mserver[0m
                |   |       |   |   |-- [00mbase.rb[0m
                |   |       |   |   |-- [00mbroadcasting.rb[0m
                |   |       |   |   |-- [00mconfiguration.rb[0m
                |   |       |   |   |-- [00mconnections.rb[0m
                |   |       |   |   |-- [01;34mworker[0m
                |   |       |   |   |   `-- [00mactive_record_connection_management.rb[0m
                |   |       |   |   `-- [00mworker.rb[0m
                |   |       |   |-- [00mserver.rb[0m
                |   |       |   |-- [01;34msubscription_adapter[0m
                |   |       |   |   |-- [00masync.rb[0m
                |   |       |   |   |-- [00mbase.rb[0m
                |   |       |   |   |-- [00mchannel_prefix.rb[0m
                |   |       |   |   |-- [00minline.rb[0m
                |   |       |   |   |-- [00mpostgresql.rb[0m
                |   |       |   |   |-- [00mredis.rb[0m
                |   |       |   |   |-- [00msubscriber_map.rb[0m
                |   |       |   |   `-- [00mtest.rb[0m
                |   |       |   |-- [00msubscription_adapter.rb[0m
                |   |       |   |-- [00mtest_case.rb[0m
                |   |       |   |-- [00mtest_helper.rb[0m
                |   |       |   `-- [00mversion.rb[0m
                |   |       |-- [00maction_cable.rb[0m
                |   |       `-- [01;34mrails[0m
                |   |           `-- [01;34mgenerators[0m
                |   |               |-- [01;34mchannel[0m
                |   |               |   |-- [00mUSAGE[0m
                |   |               |   |-- [00mchannel_generator.rb[0m
                |   |               |   `-- [01;34mtemplates[0m
                |   |               |       |-- [01;34mapplication_cable[0m
                |   |               |       |   |-- [00mchannel.rb[0m
                |   |               |       |   `-- [00mconnection.rb[0m
                |   |               |       |-- [00mchannel.rb.tt[0m
                |   |               |       `-- [01;34mjavascript[0m
                |   |               |           |-- [00mchannel.js.tt[0m
                |   |               |           |-- [00mconsumer.js.tt[0m
                |   |               |           `-- [00mindex.js.tt[0m
                |   |               `-- [01;34mtest_unit[0m
                |   |                   |-- [00mchannel_generator.rb[0m
                |   |                   `-- [01;34mtemplates[0m
                |   |                       `-- [00mchannel_test.rb.tt[0m
                |   |-- [01;34mactionmailbox-7.0.4.2[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [01;34mapp[0m
                |   |   |   |-- [01;34mcontrollers[0m
                |   |   |   |   |-- [01;34maction_mailbox[0m
                |   |   |   |   |   |-- [00mbase_controller.rb[0m
                |   |   |   |   |   `-- [01;34mingresses[0m
                |   |   |   |   |       |-- [01;34mmailgun[0m
                |   |   |   |   |       |   `-- [00minbound_emails_controller.rb[0m
                |   |   |   |   |       |-- [01;34mmandrill[0m
                |   |   |   |   |       |   `-- [00minbound_emails_controller.rb[0m
                |   |   |   |   |       |-- [01;34mpostmark[0m
                |   |   |   |   |       |   `-- [00minbound_emails_controller.rb[0m
                |   |   |   |   |       |-- [01;34mrelay[0m
                |   |   |   |   |       |   `-- [00minbound_emails_controller.rb[0m
                |   |   |   |   |       `-- [01;34msendgrid[0m
                |   |   |   |   |           `-- [00minbound_emails_controller.rb[0m
                |   |   |   |   `-- [01;34mrails[0m
                |   |   |   |       `-- [01;34mconductor[0m
                |   |   |   |           |-- [01;34maction_mailbox[0m
                |   |   |   |           |   |-- [01;34minbound_emails[0m
                |   |   |   |           |   |   `-- [00msources_controller.rb[0m
                |   |   |   |           |   |-- [00minbound_emails_controller.rb[0m
                |   |   |   |           |   |-- [00mincinerates_controller.rb[0m
                |   |   |   |           |   `-- [00mreroutes_controller.rb[0m
                |   |   |   |           `-- [00mbase_controller.rb[0m
                |   |   |   |-- [01;34mjobs[0m
                |   |   |   |   `-- [01;34maction_mailbox[0m
                |   |   |   |       |-- [00mincineration_job.rb[0m
                |   |   |   |       `-- [00mrouting_job.rb[0m
                |   |   |   |-- [01;34mmodels[0m
                |   |   |   |   `-- [01;34maction_mailbox[0m
                |   |   |   |       |-- [01;34minbound_email[0m
                |   |   |   |       |   |-- [01;34mincineratable[0m
                |   |   |   |       |   |   `-- [00mincineration.rb[0m
                |   |   |   |       |   |-- [00mincineratable.rb[0m
                |   |   |   |       |   |-- [00mmessage_id.rb[0m
                |   |   |   |       |   `-- [00mroutable.rb[0m
                |   |   |   |       |-- [00minbound_email.rb[0m
                |   |   |   |       `-- [00mrecord.rb[0m
                |   |   |   `-- [01;34mviews[0m
                |   |   |       |-- [01;34mlayouts[0m
                |   |   |       |   `-- [01;34mrails[0m
                |   |   |       |       `-- [00mconductor.html.erb[0m
                |   |   |       `-- [01;34mrails[0m
                |   |   |           `-- [01;34mconductor[0m
                |   |   |               `-- [01;34maction_mailbox[0m
                |   |   |                   `-- [01;34minbound_emails[0m
                |   |   |                       |-- [00mindex.html.erb[0m
                |   |   |                       |-- [00mnew.html.erb[0m
                |   |   |                       |-- [00mshow.html.erb[0m
                |   |   |                       `-- [01;34msources[0m
                |   |   |                           `-- [00mnew.html.erb[0m
                |   |   |-- [01;34mconfig[0m
                |   |   |   `-- [00mroutes.rb[0m
                |   |   |-- [01;34mdb[0m
                |   |   |   `-- [01;34mmigrate[0m
                |   |   |       `-- [00m20180917164000_create_action_mailbox_tables.rb[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34maction_mailbox[0m
                |   |       |   |-- [00mbase.rb[0m
                |   |       |   |-- [00mcallbacks.rb[0m
                |   |       |   |-- [00mengine.rb[0m
                |   |       |   |-- [00mgem_version.rb[0m
                |   |       |   |-- [01;34mmail_ext[0m
                |   |       |   |   |-- [00maddress_equality.rb[0m
                |   |       |   |   |-- [00maddress_wrapping.rb[0m
                |   |       |   |   |-- [00maddresses.rb[0m
                |   |       |   |   |-- [00mfrom_source.rb[0m
                |   |       |   |   `-- [00mrecipients.rb[0m
                |   |       |   |-- [00mmail_ext.rb[0m
                |   |       |   |-- [00mrelayer.rb[0m
                |   |       |   |-- [01;34mrouter[0m
                |   |       |   |   `-- [00mroute.rb[0m
                |   |       |   |-- [00mrouter.rb[0m
                |   |       |   |-- [00mrouting.rb[0m
                |   |       |   |-- [00mtest_case.rb[0m
                |   |       |   |-- [00mtest_helper.rb[0m
                |   |       |   `-- [00mversion.rb[0m
                |   |       |-- [00maction_mailbox.rb[0m
                |   |       |-- [01;34mgenerators[0m
                |   |       |   `-- [01;34maction_mailbox[0m
                |   |       |       `-- [01;34minstall[0m
                |   |       |           `-- [00minstall_generator.rb[0m
                |   |       |-- [01;34mrails[0m
                |   |       |   `-- [01;34mgenerators[0m
                |   |       |       |-- [01;34mmailbox[0m
                |   |       |       |   |-- [00mUSAGE[0m
                |   |       |       |   |-- [00mmailbox_generator.rb[0m
                |   |       |       |   `-- [01;34mtemplates[0m
                |   |       |       |       |-- [00mapplication_mailbox.rb.tt[0m
                |   |       |       |       `-- [00mmailbox.rb.tt[0m
                |   |       |       `-- [01;34mtest_unit[0m
                |   |       |           |-- [00mmailbox_generator.rb[0m
                |   |       |           `-- [01;34mtemplates[0m
                |   |       |               `-- [00mmailbox_test.rb.tt[0m
                |   |       `-- [01;34mtasks[0m
                |   |           |-- [00mingress.rake[0m
                |   |           `-- [00minstall.rake[0m
                |   |-- [01;34mactionmailer-7.0.4.2[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.rdoc[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34maction_mailer[0m
                |   |       |   |-- [00mbase.rb[0m
                |   |       |   |-- [00mcollector.rb[0m
                |   |       |   |-- [00mdelivery_methods.rb[0m
                |   |       |   |-- [00mgem_version.rb[0m
                |   |       |   |-- [00minline_preview_interceptor.rb[0m
                |   |       |   |-- [00mlog_subscriber.rb[0m
                |   |       |   |-- [00mmail_delivery_job.rb[0m
                |   |       |   |-- [00mmail_helper.rb[0m
                |   |       |   |-- [00mmessage_delivery.rb[0m
                |   |       |   |-- [00mparameterized.rb[0m
                |   |       |   |-- [00mpreview.rb[0m
                |   |       |   |-- [00mrailtie.rb[0m
                |   |       |   |-- [00mrescuable.rb[0m
                |   |       |   |-- [00mtest_case.rb[0m
                |   |       |   |-- [00mtest_helper.rb[0m
                |   |       |   `-- [00mversion.rb[0m
                |   |       |-- [00maction_mailer.rb[0m
                |   |       `-- [01;34mrails[0m
                |   |           `-- [01;34mgenerators[0m
                |   |               `-- [01;34mmailer[0m
                |   |                   |-- [00mUSAGE[0m
                |   |                   |-- [00mmailer_generator.rb[0m
                |   |                   `-- [01;34mtemplates[0m
                |   |                       |-- [00mapplication_mailer.rb.tt[0m
                |   |                       `-- [00mmailer.rb.tt[0m
                |   |-- [01;34mactionpack-7.0.4.2[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.rdoc[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34mabstract_controller[0m
                |   |       |   |-- [00masset_paths.rb[0m
                |   |       |   |-- [00mbase.rb[0m
                |   |       |   |-- [01;34mcaching[0m
                |   |       |   |   `-- [00mfragments.rb[0m
                |   |       |   |-- [00mcaching.rb[0m
                |   |       |   |-- [00mcallbacks.rb[0m
                |   |       |   |-- [00mcollector.rb[0m
                |   |       |   |-- [00merror.rb[0m
                |   |       |   |-- [00mhelpers.rb[0m
                |   |       |   |-- [00mlogger.rb[0m
                |   |       |   |-- [01;34mrailties[0m
                |   |       |   |   `-- [00mroutes_helpers.rb[0m
                |   |       |   |-- [00mrendering.rb[0m
                |   |       |   |-- [00mtranslation.rb[0m
                |   |       |   `-- [00murl_for.rb[0m
                |   |       |-- [00mabstract_controller.rb[0m
                |   |       |-- [01;34maction_controller[0m
                |   |       |   |-- [01;34mapi[0m
                |   |       |   |   `-- [00mapi_rendering.rb[0m
                |   |       |   |-- [00mapi.rb[0m
                |   |       |   |-- [00mbase.rb[0m
                |   |       |   |-- [00mcaching.rb[0m
                |   |       |   |-- [00mform_builder.rb[0m
                |   |       |   |-- [00mlog_subscriber.rb[0m
                |   |       |   |-- [01;34mmetal[0m
                |   |       |   |   |-- [00mbasic_implicit_render.rb[0m
                |   |       |   |   |-- [00mconditional_get.rb[0m
                |   |       |   |   |-- [00mcontent_security_policy.rb[0m
                |   |       |   |   |-- [00mcookies.rb[0m
                |   |       |   |   |-- [00mdata_streaming.rb[0m
                |   |       |   |   |-- [00mdefault_headers.rb[0m
                |   |       |   |   |-- [00metag_with_flash.rb[0m
                |   |       |   |   |-- [00metag_with_template_digest.rb[0m
                |   |       |   |   |-- [00mexceptions.rb[0m
                |   |       |   |   |-- [00mflash.rb[0m
                |   |       |   |   |-- [00mhead.rb[0m
                |   |       |   |   |-- [00mhelpers.rb[0m
                |   |       |   |   |-- [00mhttp_authentication.rb[0m
                |   |       |   |   |-- [00mimplicit_render.rb[0m
                |   |       |   |   |-- [00minstrumentation.rb[0m
                |   |       |   |   |-- [00mlive.rb[0m
                |   |       |   |   |-- [00mlogging.rb[0m
                |   |       |   |   |-- [00mmime_responds.rb[0m
                |   |       |   |   |-- [00mparameter_encoding.rb[0m
                |   |       |   |   |-- [00mparams_wrapper.rb[0m
                |   |       |   |   |-- [00mpermissions_policy.rb[0m
                |   |       |   |   |-- [00mredirecting.rb[0m
                |   |       |   |   |-- [00mrenderers.rb[0m
                |   |       |   |   |-- [00mrendering.rb[0m
                |   |       |   |   |-- [00mrequest_forgery_protection.rb[0m
                |   |       |   |   |-- [00mrescue.rb[0m
                |   |       |   |   |-- [00mstreaming.rb[0m
                |   |       |   |   |-- [00mstrong_parameters.rb[0m
                |   |       |   |   |-- [00mtesting.rb[0m
                |   |       |   |   `-- [00murl_for.rb[0m
                |   |       |   |-- [00mmetal.rb[0m
                |   |       |   |-- [00mrailtie.rb[0m
                |   |       |   |-- [01;34mrailties[0m
                |   |       |   |   `-- [00mhelpers.rb[0m
                |   |       |   |-- [00mrenderer.rb[0m
                |   |       |   |-- [00mtemplate_assertions.rb[0m
                |   |       |   `-- [00mtest_case.rb[0m
                |   |       |-- [00maction_controller.rb[0m
                |   |       |-- [01;34maction_dispatch[0m
                |   |       |   |-- [01;34mhttp[0m
                |   |       |   |   |-- [00mcache.rb[0m
                |   |       |   |   |-- [00mcontent_disposition.rb[0m
                |   |       |   |   |-- [00mcontent_security_policy.rb[0m
                |   |       |   |   |-- [00mfilter_parameters.rb[0m
                |   |       |   |   |-- [00mfilter_redirect.rb[0m
                |   |       |   |   |-- [00mheaders.rb[0m
                |   |       |   |   |-- [00mmime_negotiation.rb[0m
                |   |       |   |   |-- [00mmime_type.rb[0m
                |   |       |   |   |-- [00mmime_types.rb[0m
                |   |       |   |   |-- [00mparameters.rb[0m
                |   |       |   |   |-- [00mpermissions_policy.rb[0m
                |   |       |   |   |-- [00mrack_cache.rb[0m
                |   |       |   |   |-- [00mrequest.rb[0m
                |   |       |   |   |-- [00mresponse.rb[0m
                |   |       |   |   |-- [00mupload.rb[0m
                |   |       |   |   `-- [00murl.rb[0m
                |   |       |   |-- [01;34mjourney[0m
                |   |       |   |   |-- [00mformatter.rb[0m
                |   |       |   |   |-- [01;34mgtg[0m
                |   |       |   |   |   |-- [00mbuilder.rb[0m
                |   |       |   |   |   |-- [00msimulator.rb[0m
                |   |       |   |   |   `-- [00mtransition_table.rb[0m
                |   |       |   |   |-- [01;34mnfa[0m
                |   |       |   |   |   `-- [00mdot.rb[0m
                |   |       |   |   |-- [01;34mnodes[0m
                |   |       |   |   |   `-- [00mnode.rb[0m
                |   |       |   |   |-- [00mparser.rb[0m
                |   |       |   |   |-- [00mparser.y[0m
                |   |       |   |   |-- [00mparser_extras.rb[0m
                |   |       |   |   |-- [01;34mpath[0m
                |   |       |   |   |   `-- [00mpattern.rb[0m
                |   |       |   |   |-- [00mroute.rb[0m
                |   |       |   |   |-- [01;34mrouter[0m
                |   |       |   |   |   `-- [00mutils.rb[0m
                |   |       |   |   |-- [00mrouter.rb[0m
                |   |       |   |   |-- [00mroutes.rb[0m
                |   |       |   |   |-- [00mscanner.rb[0m
                |   |       |   |   |-- [00mvisitors.rb[0m
                |   |       |   |   `-- [01;34mvisualizer[0m
                |   |       |   |       |-- [00mfsm.css[0m
                |   |       |   |       |-- [00mfsm.js[0m
                |   |       |   |       `-- [00mindex.html.erb[0m
                |   |       |   |-- [00mjourney.rb[0m
                |   |       |   |-- [01;34mmiddleware[0m
                |   |       |   |   |-- [00mactionable_exceptions.rb[0m
                |   |       |   |   |-- [00mcallbacks.rb[0m
                |   |       |   |   |-- [00mcookies.rb[0m
                |   |       |   |   |-- [00mdebug_exceptions.rb[0m
                |   |       |   |   |-- [00mdebug_locks.rb[0m
                |   |       |   |   |-- [00mdebug_view.rb[0m
                |   |       |   |   |-- [00mexception_wrapper.rb[0m
                |   |       |   |   |-- [00mexecutor.rb[0m
                |   |       |   |   |-- [00mflash.rb[0m
                |   |       |   |   |-- [00mhost_authorization.rb[0m
                |   |       |   |   |-- [00mpublic_exceptions.rb[0m
                |   |       |   |   |-- [00mreloader.rb[0m
                |   |       |   |   |-- [00mremote_ip.rb[0m
                |   |       |   |   |-- [00mrequest_id.rb[0m
                |   |       |   |   |-- [00mserver_timing.rb[0m
                |   |       |   |   |-- [01;34msession[0m
                |   |       |   |   |   |-- [00mabstract_store.rb[0m
                |   |       |   |   |   |-- [00mcache_store.rb[0m
                |   |       |   |   |   |-- [00mcookie_store.rb[0m
                |   |       |   |   |   `-- [00mmem_cache_store.rb[0m
                |   |       |   |   |-- [00mshow_exceptions.rb[0m
                |   |       |   |   |-- [00mssl.rb[0m
                |   |       |   |   |-- [00mstack.rb[0m
                |   |       |   |   |-- [00mstatic.rb[0m
                |   |       |   |   `-- [01;34mtemplates[0m
                |   |       |   |       |-- [01;34mrescues[0m
                |   |       |   |       |   |-- [00m_actions.html.erb[0m
                |   |       |   |       |   |-- [00m_actions.text.erb[0m
                |   |       |   |       |   |-- [00m_message_and_suggestions.html.erb[0m
                |   |       |   |       |   |-- [00m_request_and_response.html.erb[0m
                |   |       |   |       |   |-- [00m_request_and_response.text.erb[0m
                |   |       |   |       |   |-- [00m_source.html.erb[0m
                |   |       |   |       |   |-- [00m_source.text.erb[0m
                |   |       |   |       |   |-- [00m_trace.html.erb[0m
                |   |       |   |       |   |-- [00m_trace.text.erb[0m
                |   |       |   |       |   |-- [00mblocked_host.html.erb[0m
                |   |       |   |       |   |-- [00mblocked_host.text.erb[0m
                |   |       |   |       |   |-- [00mdiagnostics.html.erb[0m
                |   |       |   |       |   |-- [00mdiagnostics.text.erb[0m
                |   |       |   |       |   |-- [00minvalid_statement.html.erb[0m
                |   |       |   |       |   |-- [00minvalid_statement.text.erb[0m
                |   |       |   |       |   |-- [00mlayout.erb[0m
                |   |       |   |       |   |-- [00mmissing_exact_template.html.erb[0m
                |   |       |   |       |   |-- [00mmissing_exact_template.text.erb[0m
                |   |       |   |       |   |-- [00mmissing_template.html.erb[0m
                |   |       |   |       |   |-- [00mmissing_template.text.erb[0m
                |   |       |   |       |   |-- [00mrouting_error.html.erb[0m
                |   |       |   |       |   |-- [00mrouting_error.text.erb[0m
                |   |       |   |       |   |-- [00mtemplate_error.html.erb[0m
                |   |       |   |       |   |-- [00mtemplate_error.text.erb[0m
                |   |       |   |       |   |-- [00munknown_action.html.erb[0m
                |   |       |   |       |   `-- [00munknown_action.text.erb[0m
                |   |       |   |       `-- [01;34mroutes[0m
                |   |       |   |           |-- [00m_route.html.erb[0m
                |   |       |   |           `-- [00m_table.html.erb[0m
                |   |       |   |-- [00mrailtie.rb[0m
                |   |       |   |-- [01;34mrequest[0m
                |   |       |   |   |-- [00msession.rb[0m
                |   |       |   |   `-- [00mutils.rb[0m
                |   |       |   |-- [01;34mrouting[0m
                |   |       |   |   |-- [00mendpoint.rb[0m
                |   |       |   |   |-- [00minspector.rb[0m
                |   |       |   |   |-- [00mmapper.rb[0m
                |   |       |   |   |-- [00mpolymorphic_routes.rb[0m
                |   |       |   |   |-- [00mredirection.rb[0m
                |   |       |   |   |-- [00mroute_set.rb[0m
                |   |       |   |   |-- [00mroutes_proxy.rb[0m
                |   |       |   |   `-- [00murl_for.rb[0m
                |   |       |   |-- [00mrouting.rb[0m
                |   |       |   |-- [00msystem_test_case.rb[0m
                |   |       |   |-- [01;34msystem_testing[0m
                |   |       |   |   |-- [00mbrowser.rb[0m
                |   |       |   |   |-- [00mdriver.rb[0m
                |   |       |   |   |-- [00mserver.rb[0m
                |   |       |   |   `-- [01;34mtest_helpers[0m
                |   |       |   |       |-- [00mscreenshot_helper.rb[0m
                |   |       |   |       `-- [00msetup_and_teardown.rb[0m
                |   |       |   `-- [01;34mtesting[0m
                |   |       |       |-- [00massertion_response.rb[0m
                |   |       |       |-- [01;34massertions[0m
                |   |       |       |   |-- [00mresponse.rb[0m
                |   |       |       |   `-- [00mrouting.rb[0m
                |   |       |       |-- [00massertions.rb[0m
                |   |       |       |-- [00mintegration.rb[0m
                |   |       |       |-- [00mrequest_encoder.rb[0m
                |   |       |       |-- [00mtest_process.rb[0m
                |   |       |       |-- [00mtest_request.rb[0m
                |   |       |       `-- [00mtest_response.rb[0m
                |   |       |-- [00maction_dispatch.rb[0m
                |   |       |-- [01;34maction_pack[0m
                |   |       |   |-- [00mgem_version.rb[0m
                |   |       |   `-- [00mversion.rb[0m
                |   |       `-- [00maction_pack.rb[0m
                |   |-- [01;34mactiontext-7.0.4.2[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [01;34mapp[0m
                |   |   |   |-- [01;34massets[0m
                |   |   |   |   |-- [01;34mjavascripts[0m
                |   |   |   |   |   |-- [00mactiontext.js[0m
                |   |   |   |   |   `-- [00mtrix.js[0m
                |   |   |   |   `-- [01;34mstylesheets[0m
                |   |   |   |       `-- [00mtrix.css[0m
                |   |   |   |-- [01;34mhelpers[0m
                |   |   |   |   `-- [01;34maction_text[0m
                |   |   |   |       |-- [00mcontent_helper.rb[0m
                |   |   |   |       `-- [00mtag_helper.rb[0m
                |   |   |   |-- [01;34mjavascript[0m
                |   |   |   |   `-- [01;34mactiontext[0m
                |   |   |   |       |-- [00mattachment_upload.js[0m
                |   |   |   |       `-- [00mindex.js[0m
                |   |   |   |-- [01;34mmodels[0m
                |   |   |   |   `-- [01;34maction_text[0m
                |   |   |   |       |-- [00mencrypted_rich_text.rb[0m
                |   |   |   |       |-- [00mrecord.rb[0m
                |   |   |   |       `-- [00mrich_text.rb[0m
                |   |   |   `-- [01;34mviews[0m
                |   |   |       |-- [01;34maction_text[0m
                |   |   |       |   |-- [01;34mattachables[0m
                |   |   |       |   |   |-- [00m_missing_attachable.html.erb[0m
                |   |   |       |   |   `-- [00m_remote_image.html.erb[0m
                |   |   |       |   |-- [01;34mattachment_galleries[0m
                |   |   |       |   |   `-- [00m_attachment_gallery.html.erb[0m
                |   |   |       |   `-- [01;34mcontents[0m
                |   |   |       |       `-- [00m_content.html.erb[0m
                |   |   |       |-- [01;34mactive_storage[0m
                |   |   |       |   `-- [01;34mblobs[0m
                |   |   |       |       `-- [00m_blob.html.erb[0m
                |   |   |       `-- [01;34mlayouts[0m
                |   |   |           `-- [01;34maction_text[0m
                |   |   |               `-- [01;34mcontents[0m
                |   |   |                   `-- [00m_content.html.erb[0m
                |   |   |-- [01;34mdb[0m
                |   |   |   `-- [01;34mmigrate[0m
                |   |   |       `-- [00m20180528164100_create_action_text_tables.rb[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34maction_text[0m
                |   |   |   |   |-- [00mattachable.rb[0m
                |   |   |   |   |-- [01;34mattachables[0m
                |   |   |   |   |   |-- [00mcontent_attachment.rb[0m
                |   |   |   |   |   |-- [00mmissing_attachable.rb[0m
                |   |   |   |   |   `-- [00mremote_image.rb[0m
                |   |   |   |   |-- [00mattachment.rb[0m
                |   |   |   |   |-- [00mattachment_gallery.rb[0m
                |   |   |   |   |-- [01;34mattachments[0m
                |   |   |   |   |   |-- [00mcaching.rb[0m
                |   |   |   |   |   |-- [00mminification.rb[0m
                |   |   |   |   |   `-- [00mtrix_conversion.rb[0m
                |   |   |   |   |-- [00mattribute.rb[0m
                |   |   |   |   |-- [00mcontent.rb[0m
                |   |   |   |   |-- [00mencryption.rb[0m
                |   |   |   |   |-- [00mengine.rb[0m
                |   |   |   |   |-- [00mfixture_set.rb[0m
                |   |   |   |   |-- [00mfragment.rb[0m
                |   |   |   |   |-- [00mgem_version.rb[0m
                |   |   |   |   |-- [00mhtml_conversion.rb[0m
                |   |   |   |   |-- [00mplain_text_conversion.rb[0m
                |   |   |   |   |-- [00mrendering.rb[0m
                |   |   |   |   |-- [00mserialization.rb[0m
                |   |   |   |   |-- [00msystem_test_helper.rb[0m
                |   |   |   |   |-- [00mtrix_attachment.rb[0m
                |   |   |   |   `-- [00mversion.rb[0m
                |   |   |   |-- [00maction_text.rb[0m
                |   |   |   |-- [01;34mgenerators[0m
                |   |   |   |   `-- [01;34maction_text[0m
                |   |   |   |       `-- [01;34minstall[0m
                |   |   |   |           |-- [00minstall_generator.rb[0m
                |   |   |   |           `-- [01;34mtemplates[0m
                |   |   |   |               `-- [00mactiontext.css[0m
                |   |   |   |-- [01;34mrails[0m
                |   |   |   |   `-- [01;34mgenerators[0m
                |   |   |   |       `-- [01;34mtest_unit[0m
                |   |   |   |           |-- [00minstall_generator.rb[0m
                |   |   |   |           `-- [01;34mtemplates[0m
                |   |   |   |               `-- [00mfixtures.yml[0m
                |   |   |   `-- [01;34mtasks[0m
                |   |   |       `-- [00mactiontext.rake[0m
                |   |   `-- [00mpackage.json[0m
                |   |-- [01;34mactionview-7.0.4.2[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.rdoc[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34maction_view[0m
                |   |       |   |-- [00mbase.rb[0m
                |   |       |   |-- [00mbuffers.rb[0m
                |   |       |   |-- [00mcache_expiry.rb[0m
                |   |       |   |-- [00mcontext.rb[0m
                |   |       |   |-- [01;34mdependency_tracker[0m
                |   |       |   |   |-- [00merb_tracker.rb[0m
                |   |       |   |   `-- [00mripper_tracker.rb[0m
                |   |       |   |-- [00mdependency_tracker.rb[0m
                |   |       |   |-- [00mdigestor.rb[0m
                |   |       |   |-- [00mflows.rb[0m
                |   |       |   |-- [00mgem_version.rb[0m
                |   |       |   |-- [01;34mhelpers[0m
                |   |       |   |   |-- [00mactive_model_helper.rb[0m
                |   |       |   |   |-- [00masset_tag_helper.rb[0m
                |   |       |   |   |-- [00masset_url_helper.rb[0m
                |   |       |   |   |-- [00matom_feed_helper.rb[0m
                |   |       |   |   |-- [00mcache_helper.rb[0m
                |   |       |   |   |-- [00mcapture_helper.rb[0m
                |   |       |   |   |-- [00mcontroller_helper.rb[0m
                |   |       |   |   |-- [00mcsp_helper.rb[0m
                |   |       |   |   |-- [00mcsrf_helper.rb[0m
                |   |       |   |   |-- [00mdate_helper.rb[0m
                |   |       |   |   |-- [00mdebug_helper.rb[0m
                |   |       |   |   |-- [00mform_helper.rb[0m
                |   |       |   |   |-- [00mform_options_helper.rb[0m
                |   |       |   |   |-- [00mform_tag_helper.rb[0m
                |   |       |   |   |-- [00mjavascript_helper.rb[0m
                |   |       |   |   |-- [00mnumber_helper.rb[0m
                |   |       |   |   |-- [00moutput_safety_helper.rb[0m
                |   |       |   |   |-- [00mrendering_helper.rb[0m
                |   |       |   |   |-- [00msanitize_helper.rb[0m
                |   |       |   |   |-- [00mtag_helper.rb[0m
                |   |       |   |   |-- [01;34mtags[0m
                |   |       |   |   |   |-- [00mbase.rb[0m
                |   |       |   |   |   |-- [00mcheck_box.rb[0m
                |   |       |   |   |   |-- [00mcheckable.rb[0m
                |   |       |   |   |   |-- [00mcollection_check_boxes.rb[0m
                |   |       |   |   |   |-- [00mcollection_helpers.rb[0m
                |   |       |   |   |   |-- [00mcollection_radio_buttons.rb[0m
                |   |       |   |   |   |-- [00mcollection_select.rb[0m
                |   |       |   |   |   |-- [00mcolor_field.rb[0m
                |   |       |   |   |   |-- [00mdate_field.rb[0m
                |   |       |   |   |   |-- [00mdate_select.rb[0m
                |   |       |   |   |   |-- [00mdatetime_field.rb[0m
                |   |       |   |   |   |-- [00mdatetime_local_field.rb[0m
                |   |       |   |   |   |-- [00mdatetime_select.rb[0m
                |   |       |   |   |   |-- [00memail_field.rb[0m
                |   |       |   |   |   |-- [00mfile_field.rb[0m
                |   |       |   |   |   |-- [00mgrouped_collection_select.rb[0m
                |   |       |   |   |   |-- [00mhidden_field.rb[0m
                |   |       |   |   |   |-- [00mlabel.rb[0m
                |   |       |   |   |   |-- [00mmonth_field.rb[0m
                |   |       |   |   |   |-- [00mnumber_field.rb[0m
                |   |       |   |   |   |-- [00mpassword_field.rb[0m
                |   |       |   |   |   |-- [00mplaceholderable.rb[0m
                |   |       |   |   |   |-- [00mradio_button.rb[0m
                |   |       |   |   |   |-- [00mrange_field.rb[0m
                |   |       |   |   |   |-- [00msearch_field.rb[0m
                |   |       |   |   |   |-- [00mselect.rb[0m
                |   |       |   |   |   |-- [00mtel_field.rb[0m
                |   |       |   |   |   |-- [00mtext_area.rb[0m
                |   |       |   |   |   |-- [00mtext_field.rb[0m
                |   |       |   |   |   |-- [00mtime_field.rb[0m
                |   |       |   |   |   |-- [00mtime_select.rb[0m
                |   |       |   |   |   |-- [00mtime_zone_select.rb[0m
                |   |       |   |   |   |-- [00mtranslator.rb[0m
                |   |       |   |   |   |-- [00murl_field.rb[0m
                |   |       |   |   |   |-- [00mweek_field.rb[0m
                |   |       |   |   |   `-- [00mweekday_select.rb[0m
                |   |       |   |   |-- [00mtags.rb[0m
                |   |       |   |   |-- [00mtext_helper.rb[0m
                |   |       |   |   |-- [00mtranslation_helper.rb[0m
                |   |       |   |   `-- [00murl_helper.rb[0m
                |   |       |   |-- [00mhelpers.rb[0m
                |   |       |   |-- [00mlayouts.rb[0m
                |   |       |   |-- [01;34mlocale[0m
                |   |       |   |   `-- [00men.yml[0m
                |   |       |   |-- [00mlog_subscriber.rb[0m
                |   |       |   |-- [00mlookup_context.rb[0m
                |   |       |   |-- [00mmodel_naming.rb[0m
                |   |       |   |-- [00mpath_set.rb[0m
                |   |       |   |-- [00mrailtie.rb[0m
                |   |       |   |-- [00mrecord_identifier.rb[0m
                |   |       |   |-- [00mrender_parser.rb[0m
                |   |       |   |-- [01;34mrenderer[0m
                |   |       |   |   |-- [00mabstract_renderer.rb[0m
                |   |       |   |   |-- [00mcollection_renderer.rb[0m
                |   |       |   |   |-- [00mobject_renderer.rb[0m
                |   |       |   |   |-- [01;34mpartial_renderer[0m
                |   |       |   |   |   `-- [00mcollection_caching.rb[0m
                |   |       |   |   |-- [00mpartial_renderer.rb[0m
                |   |       |   |   |-- [00mrenderer.rb[0m
                |   |       |   |   |-- [00mstreaming_template_renderer.rb[0m
                |   |       |   |   `-- [00mtemplate_renderer.rb[0m
                |   |       |   |-- [00mrendering.rb[0m
                |   |       |   |-- [00mripper_ast_parser.rb[0m
                |   |       |   |-- [00mrouting_url_for.rb[0m
                |   |       |   |-- [01;34mtasks[0m
                |   |       |   |   `-- [00mcache_digests.rake[0m
                |   |       |   |-- [01;34mtemplate[0m
                |   |       |   |   |-- [00merror.rb[0m
                |   |       |   |   |-- [01;34mhandlers[0m
                |   |       |   |   |   |-- [00mbuilder.rb[0m
                |   |       |   |   |   |-- [01;34merb[0m
                |   |       |   |   |   |   `-- [00merubi.rb[0m
                |   |       |   |   |   |-- [00merb.rb[0m
                |   |       |   |   |   |-- [00mhtml.rb[0m
                |   |       |   |   |   `-- [00mraw.rb[0m
                |   |       |   |   |-- [00mhandlers.rb[0m
                |   |       |   |   |-- [00mhtml.rb[0m
                |   |       |   |   |-- [00minline.rb[0m
                |   |       |   |   |-- [00mraw_file.rb[0m
                |   |       |   |   |-- [00mrenderable.rb[0m
                |   |       |   |   |-- [00mresolver.rb[0m
                |   |       |   |   |-- [01;34msources[0m
                |   |       |   |   |   `-- [00mfile.rb[0m
                |   |       |   |   |-- [00msources.rb[0m
                |   |       |   |   |-- [00mtext.rb[0m
                |   |       |   |   `-- [00mtypes.rb[0m
                |   |       |   |-- [00mtemplate.rb[0m
                |   |       |   |-- [00mtemplate_details.rb[0m
                |   |       |   |-- [00mtemplate_path.rb[0m
                |   |       |   |-- [00mtest_case.rb[0m
                |   |       |   |-- [01;34mtesting[0m
                |   |       |   |   `-- [00mresolvers.rb[0m
                |   |       |   |-- [00munbound_template.rb[0m
                |   |       |   |-- [00mversion.rb[0m
                |   |       |   `-- [00mview_paths.rb[0m
                |   |       |-- [00maction_view.rb[0m
                |   |       `-- [01;34massets[0m
                |   |           `-- [01;34mcompiled[0m
                |   |               `-- [00mrails-ujs.js[0m
                |   |-- [01;34mactivejob-7.0.4.2[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.md[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34mactive_job[0m
                |   |       |   |-- [00marguments.rb[0m
                |   |       |   |-- [00mbase.rb[0m
                |   |       |   |-- [00mcallbacks.rb[0m
                |   |       |   |-- [00mconfigured_job.rb[0m
                |   |       |   |-- [00mcore.rb[0m
                |   |       |   |-- [00menqueuing.rb[0m
                |   |       |   |-- [00mexceptions.rb[0m
                |   |       |   |-- [00mexecution.rb[0m
                |   |       |   |-- [00mgem_version.rb[0m
                |   |       |   |-- [00minstrumentation.rb[0m
                |   |       |   |-- [00mlog_subscriber.rb[0m
                |   |       |   |-- [00mlogging.rb[0m
                |   |       |   |-- [00mqueue_adapter.rb[0m
                |   |       |   |-- [01;34mqueue_adapters[0m
                |   |       |   |   |-- [00masync_adapter.rb[0m
                |   |       |   |   |-- [00mbackburner_adapter.rb[0m
                |   |       |   |   |-- [00mdelayed_job_adapter.rb[0m
                |   |       |   |   |-- [00minline_adapter.rb[0m
                |   |       |   |   |-- [00mque_adapter.rb[0m
                |   |       |   |   |-- [00mqueue_classic_adapter.rb[0m
                |   |       |   |   |-- [00mresque_adapter.rb[0m
                |   |       |   |   |-- [00msidekiq_adapter.rb[0m
                |   |       |   |   |-- [00msneakers_adapter.rb[0m
                |   |       |   |   |-- [00msucker_punch_adapter.rb[0m
                |   |       |   |   `-- [00mtest_adapter.rb[0m
                |   |       |   |-- [00mqueue_adapters.rb[0m
                |   |       |   |-- [00mqueue_name.rb[0m
                |   |       |   |-- [00mqueue_priority.rb[0m
                |   |       |   |-- [00mrailtie.rb[0m
                |   |       |   |-- [01;34mserializers[0m
                |   |       |   |   |-- [00mdate_serializer.rb[0m
                |   |       |   |   |-- [00mdate_time_serializer.rb[0m
                |   |       |   |   |-- [00mduration_serializer.rb[0m
                |   |       |   |   |-- [00mmodule_serializer.rb[0m
                |   |       |   |   |-- [00mobject_serializer.rb[0m
                |   |       |   |   |-- [00mrange_serializer.rb[0m
                |   |       |   |   |-- [00msymbol_serializer.rb[0m
                |   |       |   |   |-- [00mtime_object_serializer.rb[0m
                |   |       |   |   |-- [00mtime_serializer.rb[0m
                |   |       |   |   `-- [00mtime_with_zone_serializer.rb[0m
                |   |       |   |-- [00mserializers.rb[0m
                |   |       |   |-- [00mtest_case.rb[0m
                |   |       |   |-- [00mtest_helper.rb[0m
                |   |       |   |-- [00mtimezones.rb[0m
                |   |       |   |-- [00mtranslation.rb[0m
                |   |       |   `-- [00mversion.rb[0m
                |   |       |-- [00mactive_job.rb[0m
                |   |       `-- [01;34mrails[0m
                |   |           `-- [01;34mgenerators[0m
                |   |               `-- [01;34mjob[0m
                |   |                   |-- [00mjob_generator.rb[0m
                |   |                   `-- [01;34mtemplates[0m
                |   |                       |-- [00mapplication_job.rb.tt[0m
                |   |                       `-- [00mjob.rb.tt[0m
                |   |-- [01;34mactivemodel-7.0.4.2[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.rdoc[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34mactive_model[0m
                |   |       |   |-- [00mapi.rb[0m
                |   |       |   |-- [01;34mattribute[0m
                |   |       |   |   `-- [00muser_provided_default.rb[0m
                |   |       |   |-- [00mattribute.rb[0m
                |   |       |   |-- [00mattribute_assignment.rb[0m
                |   |       |   |-- [00mattribute_methods.rb[0m
                |   |       |   |-- [00mattribute_mutation_tracker.rb[0m
                |   |       |   |-- [01;34mattribute_set[0m
                |   |       |   |   |-- [00mbuilder.rb[0m
                |   |       |   |   `-- [00myaml_encoder.rb[0m
                |   |       |   |-- [00mattribute_set.rb[0m
                |   |       |   |-- [00mattributes.rb[0m
                |   |       |   |-- [00mcallbacks.rb[0m
                |   |       |   |-- [00mconversion.rb[0m
                |   |       |   |-- [00mdirty.rb[0m
                |   |       |   |-- [00merror.rb[0m
                |   |       |   |-- [00merrors.rb[0m
                |   |       |   |-- [00mforbidden_attributes_protection.rb[0m
                |   |       |   |-- [00mgem_version.rb[0m
                |   |       |   |-- [00mlint.rb[0m
                |   |       |   |-- [01;34mlocale[0m
                |   |       |   |   `-- [00men.yml[0m
                |   |       |   |-- [00mmodel.rb[0m
                |   |       |   |-- [00mnaming.rb[0m
                |   |       |   |-- [00mnested_error.rb[0m
                |   |       |   |-- [00mrailtie.rb[0m
                |   |       |   |-- [00msecure_password.rb[0m
                |   |       |   |-- [00mserialization.rb[0m
                |   |       |   |-- [01;34mserializers[0m
                |   |       |   |   `-- [00mjson.rb[0m
                |   |       |   |-- [00mtranslation.rb[0m
                |   |       |   |-- [01;34mtype[0m
                |   |       |   |   |-- [00mbig_integer.rb[0m
                |   |       |   |   |-- [00mbinary.rb[0m
                |   |       |   |   |-- [00mboolean.rb[0m
                |   |       |   |   |-- [00mdate.rb[0m
                |   |       |   |   |-- [00mdate_time.rb[0m
                |   |       |   |   |-- [00mdecimal.rb[0m
                |   |       |   |   |-- [00mfloat.rb[0m
                |   |       |   |   |-- [01;34mhelpers[0m
                |   |       |   |   |   |-- [00maccepts_multiparameter_time.rb[0m
                |   |       |   |   |   |-- [00mmutable.rb[0m
                |   |       |   |   |   |-- [00mnumeric.rb[0m
                |   |       |   |   |   |-- [00mtime_value.rb[0m
                |   |       |   |   |   `-- [00mtimezone.rb[0m
                |   |       |   |   |-- [00mhelpers.rb[0m
                |   |       |   |   |-- [00mimmutable_string.rb[0m
                |   |       |   |   |-- [00minteger.rb[0m
                |   |       |   |   |-- [00mregistry.rb[0m
                |   |       |   |   |-- [00mstring.rb[0m
                |   |       |   |   |-- [00mtime.rb[0m
                |   |       |   |   `-- [00mvalue.rb[0m
                |   |       |   |-- [00mtype.rb[0m
                |   |       |   |-- [01;34mvalidations[0m
                |   |       |   |   |-- [00mabsence.rb[0m
                |   |       |   |   |-- [00macceptance.rb[0m
                |   |       |   |   |-- [00mcallbacks.rb[0m
                |   |       |   |   |-- [00mclusivity.rb[0m
                |   |       |   |   |-- [00mcomparability.rb[0m
                |   |       |   |   |-- [00mcomparison.rb[0m
                |   |       |   |   |-- [00mconfirmation.rb[0m
                |   |       |   |   |-- [00mexclusion.rb[0m
                |   |       |   |   |-- [00mformat.rb[0m
                |   |       |   |   |-- [00mhelper_methods.rb[0m
                |   |       |   |   |-- [00minclusion.rb[0m
                |   |       |   |   |-- [00mlength.rb[0m
                |   |       |   |   |-- [00mnumericality.rb[0m
                |   |       |   |   |-- [00mpresence.rb[0m
                |   |       |   |   |-- [00mvalidates.rb[0m
                |   |       |   |   `-- [00mwith.rb[0m
                |   |       |   |-- [00mvalidations.rb[0m
                |   |       |   |-- [00mvalidator.rb[0m
                |   |       |   `-- [00mversion.rb[0m
                |   |       `-- [00mactive_model.rb[0m
                |   |-- [01;34mactiverecord-7.0.4.2[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.rdoc[0m
                |   |   |-- [01;34mexamples[0m
                |   |   |   |-- [00mperformance.rb[0m
                |   |   |   `-- [00msimple.rb[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34mactive_record[0m
                |   |       |   |-- [00maggregations.rb[0m
                |   |       |   |-- [00massociation_relation.rb[0m
                |   |       |   |-- [01;34massociations[0m
                |   |       |   |   |-- [00malias_tracker.rb[0m
                |   |       |   |   |-- [00massociation.rb[0m
                |   |       |   |   |-- [00massociation_scope.rb[0m
                |   |       |   |   |-- [00mbelongs_to_association.rb[0m
                |   |       |   |   |-- [00mbelongs_to_polymorphic_association.rb[0m
                |   |       |   |   |-- [01;34mbuilder[0m
                |   |       |   |   |   |-- [00massociation.rb[0m
                |   |       |   |   |   |-- [00mbelongs_to.rb[0m
                |   |       |   |   |   |-- [00mcollection_association.rb[0m
                |   |       |   |   |   |-- [00mhas_and_belongs_to_many.rb[0m
                |   |       |   |   |   |-- [00mhas_many.rb[0m
                |   |       |   |   |   |-- [00mhas_one.rb[0m
                |   |       |   |   |   `-- [00msingular_association.rb[0m
                |   |       |   |   |-- [00mcollection_association.rb[0m
                |   |       |   |   |-- [00mcollection_proxy.rb[0m
                |   |       |   |   |-- [00mdisable_joins_association_scope.rb[0m
                |   |       |   |   |-- [00mforeign_association.rb[0m
                |   |       |   |   |-- [00mhas_many_association.rb[0m
                |   |       |   |   |-- [00mhas_many_through_association.rb[0m
                |   |       |   |   |-- [00mhas_one_association.rb[0m
                |   |       |   |   |-- [00mhas_one_through_association.rb[0m
                |   |       |   |   |-- [01;34mjoin_dependency[0m
                |   |       |   |   |   |-- [00mjoin_association.rb[0m
                |   |       |   |   |   |-- [00mjoin_base.rb[0m
                |   |       |   |   |   `-- [00mjoin_part.rb[0m
                |   |       |   |   |-- [00mjoin_dependency.rb[0m
                |   |       |   |   |-- [01;34mpreloader[0m
                |   |       |   |   |   |-- [00massociation.rb[0m
                |   |       |   |   |   |-- [00mbatch.rb[0m
                |   |       |   |   |   |-- [00mbranch.rb[0m
                |   |       |   |   |   `-- [00mthrough_association.rb[0m
                |   |       |   |   |-- [00mpreloader.rb[0m
                |   |       |   |   |-- [00msingular_association.rb[0m
                |   |       |   |   `-- [00mthrough_association.rb[0m
                |   |       |   |-- [00massociations.rb[0m
                |   |       |   |-- [00masynchronous_queries_tracker.rb[0m
                |   |       |   |-- [00mattribute_assignment.rb[0m
                |   |       |   |-- [01;34mattribute_methods[0m
                |   |       |   |   |-- [00mbefore_type_cast.rb[0m
                |   |       |   |   |-- [00mdirty.rb[0m
                |   |       |   |   |-- [00mprimary_key.rb[0m
                |   |       |   |   |-- [00mquery.rb[0m
                |   |       |   |   |-- [00mread.rb[0m
                |   |       |   |   |-- [00mserialization.rb[0m
                |   |       |   |   |-- [00mtime_zone_conversion.rb[0m
                |   |       |   |   `-- [00mwrite.rb[0m
                |   |       |   |-- [00mattribute_methods.rb[0m
                |   |       |   |-- [00mattributes.rb[0m
                |   |       |   |-- [00mautosave_association.rb[0m
                |   |       |   |-- [00mbase.rb[0m
                |   |       |   |-- [00mcallbacks.rb[0m
                |   |       |   |-- [01;34mcoders[0m
                |   |       |   |   |-- [00mjson.rb[0m
                |   |       |   |   `-- [00myaml_column.rb[0m
                |   |       |   |-- [01;34mconnection_adapters[0m
                |   |       |   |   |-- [01;34mabstract[0m
                |   |       |   |   |   |-- [00mconnection_handler.rb[0m
                |   |       |   |   |   |-- [01;34mconnection_pool[0m
                |   |       |   |   |   |   |-- [00mqueue.rb[0m
                |   |       |   |   |   |   `-- [00mreaper.rb[0m
                |   |       |   |   |   |-- [00mconnection_pool.rb[0m
                |   |       |   |   |   |-- [00mdatabase_limits.rb[0m
                |   |       |   |   |   |-- [00mdatabase_statements.rb[0m
                |   |       |   |   |   |-- [00mquery_cache.rb[0m
                |   |       |   |   |   |-- [00mquoting.rb[0m
                |   |       |   |   |   |-- [00msavepoints.rb[0m
                |   |       |   |   |   |-- [00mschema_creation.rb[0m
                |   |       |   |   |   |-- [00mschema_definitions.rb[0m
                |   |       |   |   |   |-- [00mschema_dumper.rb[0m
                |   |       |   |   |   |-- [00mschema_statements.rb[0m
                |   |       |   |   |   `-- [00mtransaction.rb[0m
                |   |       |   |   |-- [00mabstract_adapter.rb[0m
                |   |       |   |   |-- [00mabstract_mysql_adapter.rb[0m
                |   |       |   |   |-- [00mcolumn.rb[0m
                |   |       |   |   |-- [00mdeduplicable.rb[0m
                |   |       |   |   |-- [00mlegacy_pool_manager.rb[0m
                |   |       |   |   |-- [01;34mmysql[0m
                |   |       |   |   |   |-- [00mcolumn.rb[0m
                |   |       |   |   |   |-- [00mdatabase_statements.rb[0m
                |   |       |   |   |   |-- [00mexplain_pretty_printer.rb[0m
                |   |       |   |   |   |-- [00mquoting.rb[0m
                |   |       |   |   |   |-- [00mschema_creation.rb[0m
                |   |       |   |   |   |-- [00mschema_definitions.rb[0m
                |   |       |   |   |   |-- [00mschema_dumper.rb[0m
                |   |       |   |   |   |-- [00mschema_statements.rb[0m
                |   |       |   |   |   `-- [00mtype_metadata.rb[0m
                |   |       |   |   |-- [00mmysql2_adapter.rb[0m
                |   |       |   |   |-- [00mpool_config.rb[0m
                |   |       |   |   |-- [00mpool_manager.rb[0m
                |   |       |   |   |-- [01;34mpostgresql[0m
                |   |       |   |   |   |-- [00mcolumn.rb[0m
                |   |       |   |   |   |-- [00mdatabase_statements.rb[0m
                |   |       |   |   |   |-- [00mexplain_pretty_printer.rb[0m
                |   |       |   |   |   |-- [01;34moid[0m
                |   |       |   |   |   |   |-- [00marray.rb[0m
                |   |       |   |   |   |   |-- [00mbit.rb[0m
                |   |       |   |   |   |   |-- [00mbit_varying.rb[0m
                |   |       |   |   |   |   |-- [00mbytea.rb[0m
                |   |       |   |   |   |   |-- [00mcidr.rb[0m
                |   |       |   |   |   |   |-- [00mdate.rb[0m
                |   |       |   |   |   |   |-- [00mdate_time.rb[0m
                |   |       |   |   |   |   |-- [00mdecimal.rb[0m
                |   |       |   |   |   |   |-- [00menum.rb[0m
                |   |       |   |   |   |   |-- [00mhstore.rb[0m
                |   |       |   |   |   |   |-- [00minet.rb[0m
                |   |       |   |   |   |   |-- [00minterval.rb[0m
                |   |       |   |   |   |   |-- [00mjsonb.rb[0m
                |   |       |   |   |   |   |-- [00mlegacy_point.rb[0m
                |   |       |   |   |   |   |-- [00mmacaddr.rb[0m
                |   |       |   |   |   |   |-- [00mmoney.rb[0m
                |   |       |   |   |   |   |-- [00moid.rb[0m
                |   |       |   |   |   |   |-- [00mpoint.rb[0m
                |   |       |   |   |   |   |-- [00mrange.rb[0m
                |   |       |   |   |   |   |-- [00mspecialized_string.rb[0m
                |   |       |   |   |   |   |-- [00mtimestamp.rb[0m
                |   |       |   |   |   |   |-- [00mtimestamp_with_time_zone.rb[0m
                |   |       |   |   |   |   |-- [00mtype_map_initializer.rb[0m
                |   |       |   |   |   |   |-- [00muuid.rb[0m
                |   |       |   |   |   |   |-- [00mvector.rb[0m
                |   |       |   |   |   |   `-- [00mxml.rb[0m
                |   |       |   |   |   |-- [00moid.rb[0m
                |   |       |   |   |   |-- [00mquoting.rb[0m
                |   |       |   |   |   |-- [00mreferential_integrity.rb[0m
                |   |       |   |   |   |-- [00mschema_creation.rb[0m
                |   |       |   |   |   |-- [00mschema_definitions.rb[0m
                |   |       |   |   |   |-- [00mschema_dumper.rb[0m
                |   |       |   |   |   |-- [00mschema_statements.rb[0m
                |   |       |   |   |   |-- [00mtype_metadata.rb[0m
                |   |       |   |   |   `-- [00mutils.rb[0m
                |   |       |   |   |-- [00mpostgresql_adapter.rb[0m
                |   |       |   |   |-- [00mschema_cache.rb[0m
                |   |       |   |   |-- [00msql_type_metadata.rb[0m
                |   |       |   |   |-- [01;34msqlite3[0m
                |   |       |   |   |   |-- [00mdatabase_statements.rb[0m
                |   |       |   |   |   |-- [00mexplain_pretty_printer.rb[0m
                |   |       |   |   |   |-- [00mquoting.rb[0m
                |   |       |   |   |   |-- [00mschema_creation.rb[0m
                |   |       |   |   |   |-- [00mschema_definitions.rb[0m
                |   |       |   |   |   |-- [00mschema_dumper.rb[0m
                |   |       |   |   |   `-- [00mschema_statements.rb[0m
                |   |       |   |   |-- [00msqlite3_adapter.rb[0m
                |   |       |   |   `-- [00mstatement_pool.rb[0m
                |   |       |   |-- [00mconnection_adapters.rb[0m
                |   |       |   |-- [00mconnection_handling.rb[0m
                |   |       |   |-- [00mcore.rb[0m
                |   |       |   |-- [00mcounter_cache.rb[0m
                |   |       |   |-- [01;34mdatabase_configurations[0m
                |   |       |   |   |-- [00mconnection_url_resolver.rb[0m
                |   |       |   |   |-- [00mdatabase_config.rb[0m
                |   |       |   |   |-- [00mhash_config.rb[0m
                |   |       |   |   `-- [00murl_config.rb[0m
                |   |       |   |-- [00mdatabase_configurations.rb[0m
                |   |       |   |-- [00mdelegated_type.rb[0m
                |   |       |   |-- [00mdestroy_association_async_job.rb[0m
                |   |       |   |-- [00mdisable_joins_association_relation.rb[0m
                |   |       |   |-- [00mdynamic_matchers.rb[0m
                |   |       |   |-- [01;34mencryption[0m
                |   |       |   |   |-- [01;34mcipher[0m
                |   |       |   |   |   `-- [00maes256_gcm.rb[0m
                |   |       |   |   |-- [00mcipher.rb[0m
                |   |       |   |   |-- [00mconfig.rb[0m
                |   |       |   |   |-- [00mconfigurable.rb[0m
                |   |       |   |   |-- [00mcontext.rb[0m
                |   |       |   |   |-- [00mcontexts.rb[0m
                |   |       |   |   |-- [00mderived_secret_key_provider.rb[0m
                |   |       |   |   |-- [00mdeterministic_key_provider.rb[0m
                |   |       |   |   |-- [00mencryptable_record.rb[0m
                |   |       |   |   |-- [00mencrypted_attribute_type.rb[0m
                |   |       |   |   |-- [00mencrypted_fixtures.rb[0m
                |   |       |   |   |-- [00mencrypting_only_encryptor.rb[0m
                |   |       |   |   |-- [00mencryptor.rb[0m
                |   |       |   |   |-- [00menvelope_encryption_key_provider.rb[0m
                |   |       |   |   |-- [00merrors.rb[0m
                |   |       |   |   |-- [00mextended_deterministic_queries.rb[0m
                |   |       |   |   |-- [00mextended_deterministic_uniqueness_validator.rb[0m
                |   |       |   |   |-- [00mkey.rb[0m
                |   |       |   |   |-- [00mkey_generator.rb[0m
                |   |       |   |   |-- [00mkey_provider.rb[0m
                |   |       |   |   |-- [00mmessage.rb[0m
                |   |       |   |   |-- [00mmessage_serializer.rb[0m
                |   |       |   |   |-- [00mnull_encryptor.rb[0m
                |   |       |   |   |-- [00mproperties.rb[0m
                |   |       |   |   |-- [00mread_only_null_encryptor.rb[0m
                |   |       |   |   `-- [00mscheme.rb[0m
                |   |       |   |-- [00mencryption.rb[0m
                |   |       |   |-- [00menum.rb[0m
                |   |       |   |-- [00merrors.rb[0m
                |   |       |   |-- [00mexplain.rb[0m
                |   |       |   |-- [00mexplain_registry.rb[0m
                |   |       |   |-- [00mexplain_subscriber.rb[0m
                |   |       |   |-- [01;34mfixture_set[0m
                |   |       |   |   |-- [00mfile.rb[0m
                |   |       |   |   |-- [00mmodel_metadata.rb[0m
                |   |       |   |   |-- [00mrender_context.rb[0m
                |   |       |   |   |-- [00mtable_row.rb[0m
                |   |       |   |   `-- [00mtable_rows.rb[0m
                |   |       |   |-- [00mfixtures.rb[0m
                |   |       |   |-- [00mfuture_result.rb[0m
                |   |       |   |-- [00mgem_version.rb[0m
                |   |       |   |-- [00minheritance.rb[0m
                |   |       |   |-- [00minsert_all.rb[0m
                |   |       |   |-- [00mintegration.rb[0m
                |   |       |   |-- [00minternal_metadata.rb[0m
                |   |       |   |-- [00mlegacy_yaml_adapter.rb[0m
                |   |       |   |-- [01;34mlocale[0m
                |   |       |   |   `-- [00men.yml[0m
                |   |       |   |-- [01;34mlocking[0m
                |   |       |   |   |-- [00moptimistic.rb[0m
                |   |       |   |   `-- [00mpessimistic.rb[0m
                |   |       |   |-- [00mlog_subscriber.rb[0m
                |   |       |   |-- [01;34mmiddleware[0m
                |   |       |   |   |-- [01;34mdatabase_selector[0m
                |   |       |   |   |   |-- [01;34mresolver[0m
                |   |       |   |   |   |   `-- [00msession.rb[0m
                |   |       |   |   |   `-- [00mresolver.rb[0m
                |   |       |   |   |-- [00mdatabase_selector.rb[0m
                |   |       |   |   `-- [00mshard_selector.rb[0m
                |   |       |   |-- [01;34mmigration[0m
                |   |       |   |   |-- [00mcommand_recorder.rb[0m
                |   |       |   |   |-- [00mcompatibility.rb[0m
                |   |       |   |   `-- [00mjoin_table.rb[0m
                |   |       |   |-- [00mmigration.rb[0m
                |   |       |   |-- [00mmodel_schema.rb[0m
                |   |       |   |-- [00mnested_attributes.rb[0m
                |   |       |   |-- [00mno_touching.rb[0m
                |   |       |   |-- [00mnull_relation.rb[0m
                |   |       |   |-- [00mpersistence.rb[0m
                |   |       |   |-- [00mquery_cache.rb[0m
                |   |       |   |-- [00mquery_logs.rb[0m
                |   |       |   |-- [00mquerying.rb[0m
                |   |       |   |-- [00mrailtie.rb[0m
                |   |       |   |-- [01;34mrailties[0m
                |   |       |   |   |-- [00mconsole_sandbox.rb[0m
                |   |       |   |   |-- [00mcontroller_runtime.rb[0m
                |   |       |   |   `-- [00mdatabases.rake[0m
                |   |       |   |-- [00mreadonly_attributes.rb[0m
                |   |       |   |-- [00mreflection.rb[0m
                |   |       |   |-- [01;34mrelation[0m
                |   |       |   |   |-- [01;34mbatches[0m
                |   |       |   |   |   `-- [00mbatch_enumerator.rb[0m
                |   |       |   |   |-- [00mbatches.rb[0m
                |   |       |   |   |-- [00mcalculations.rb[0m
                |   |       |   |   |-- [00mdelegation.rb[0m
                |   |       |   |   |-- [00mfinder_methods.rb[0m
                |   |       |   |   |-- [00mfrom_clause.rb[0m
                |   |       |   |   |-- [00mmerger.rb[0m
                |   |       |   |   |-- [01;34mpredicate_builder[0m
                |   |       |   |   |   |-- [00marray_handler.rb[0m
                |   |       |   |   |   |-- [00massociation_query_value.rb[0m
                |   |       |   |   |   |-- [00mbasic_object_handler.rb[0m
                |   |       |   |   |   |-- [00mpolymorphic_array_value.rb[0m
                |   |       |   |   |   |-- [00mrange_handler.rb[0m
                |   |       |   |   |   `-- [00mrelation_handler.rb[0m
                |   |       |   |   |-- [00mpredicate_builder.rb[0m
                |   |       |   |   |-- [00mquery_attribute.rb[0m
                |   |       |   |   |-- [00mquery_methods.rb[0m
                |   |       |   |   |-- [00mrecord_fetch_warning.rb[0m
                |   |       |   |   |-- [00mspawn_methods.rb[0m
                |   |       |   |   `-- [00mwhere_clause.rb[0m
                |   |       |   |-- [00mrelation.rb[0m
                |   |       |   |-- [00mresult.rb[0m
                |   |       |   |-- [00mruntime_registry.rb[0m
                |   |       |   |-- [00msanitization.rb[0m
                |   |       |   |-- [00mschema.rb[0m
                |   |       |   |-- [00mschema_dumper.rb[0m
                |   |       |   |-- [00mschema_migration.rb[0m
                |   |       |   |-- [01;34mscoping[0m
                |   |       |   |   |-- [00mdefault.rb[0m
                |   |       |   |   `-- [00mnamed.rb[0m
                |   |       |   |-- [00mscoping.rb[0m
                |   |       |   |-- [00msecure_token.rb[0m
                |   |       |   |-- [00mserialization.rb[0m
                |   |       |   |-- [00msigned_id.rb[0m
                |   |       |   |-- [00mstatement_cache.rb[0m
                |   |       |   |-- [00mstore.rb[0m
                |   |       |   |-- [00msuppressor.rb[0m
                |   |       |   |-- [00mtable_metadata.rb[0m
                |   |       |   |-- [01;34mtasks[0m
                |   |       |   |   |-- [00mdatabase_tasks.rb[0m
                |   |       |   |   |-- [00mmysql_database_tasks.rb[0m
                |   |       |   |   |-- [00mpostgresql_database_tasks.rb[0m
                |   |       |   |   `-- [00msqlite_database_tasks.rb[0m
                |   |       |   |-- [00mtest_databases.rb[0m
                |   |       |   |-- [00mtest_fixtures.rb[0m
                |   |       |   |-- [00mtimestamp.rb[0m
                |   |       |   |-- [00mtouch_later.rb[0m
                |   |       |   |-- [00mtransactions.rb[0m
                |   |       |   |-- [00mtranslation.rb[0m
                |   |       |   |-- [01;34mtype[0m
                |   |       |   |   |-- [00madapter_specific_registry.rb[0m
                |   |       |   |   |-- [00mdate.rb[0m
                |   |       |   |   |-- [00mdate_time.rb[0m
                |   |       |   |   |-- [00mdecimal_without_scale.rb[0m
                |   |       |   |   |-- [00mhash_lookup_type_map.rb[0m
                |   |       |   |   |-- [01;34minternal[0m
                |   |       |   |   |   `-- [00mtimezone.rb[0m
                |   |       |   |   |-- [00mjson.rb[0m
                |   |       |   |   |-- [00mserialized.rb[0m
                |   |       |   |   |-- [00mtext.rb[0m
                |   |       |   |   |-- [00mtime.rb[0m
                |   |       |   |   |-- [00mtype_map.rb[0m
                |   |       |   |   `-- [00munsigned_integer.rb[0m
                |   |       |   |-- [00mtype.rb[0m
                |   |       |   |-- [01;34mtype_caster[0m
                |   |       |   |   |-- [00mconnection.rb[0m
                |   |       |   |   `-- [00mmap.rb[0m
                |   |       |   |-- [00mtype_caster.rb[0m
                |   |       |   |-- [01;34mvalidations[0m
                |   |       |   |   |-- [00mabsence.rb[0m
                |   |       |   |   |-- [00massociated.rb[0m
                |   |       |   |   |-- [00mlength.rb[0m
                |   |       |   |   |-- [00mnumericality.rb[0m
                |   |       |   |   |-- [00mpresence.rb[0m
                |   |       |   |   `-- [00muniqueness.rb[0m
                |   |       |   |-- [00mvalidations.rb[0m
                |   |       |   `-- [00mversion.rb[0m
                |   |       |-- [00mactive_record.rb[0m
                |   |       |-- [01;34marel[0m
                |   |       |   |-- [00malias_predication.rb[0m
                |   |       |   |-- [01;34mattributes[0m
                |   |       |   |   `-- [00mattribute.rb[0m
                |   |       |   |-- [01;34mcollectors[0m
                |   |       |   |   |-- [00mbind.rb[0m
                |   |       |   |   |-- [00mcomposite.rb[0m
                |   |       |   |   |-- [00mplain_string.rb[0m
                |   |       |   |   |-- [00msql_string.rb[0m
                |   |       |   |   `-- [00msubstitute_binds.rb[0m
                |   |       |   |-- [00mcrud.rb[0m
                |   |       |   |-- [00mdelete_manager.rb[0m
                |   |       |   |-- [00merrors.rb[0m
                |   |       |   |-- [00mexpressions.rb[0m
                |   |       |   |-- [00mfactory_methods.rb[0m
                |   |       |   |-- [00mfilter_predications.rb[0m
                |   |       |   |-- [00minsert_manager.rb[0m
                |   |       |   |-- [00mmath.rb[0m
                |   |       |   |-- [01;34mnodes[0m
                |   |       |   |   |-- [00mand.rb[0m
                |   |       |   |   |-- [00mascending.rb[0m
                |   |       |   |   |-- [00mbinary.rb[0m
                |   |       |   |   |-- [00mbind_param.rb[0m
                |   |       |   |   |-- [00mcase.rb[0m
                |   |       |   |   |-- [00mcasted.rb[0m
                |   |       |   |   |-- [00mcomment.rb[0m
                |   |       |   |   |-- [00mcount.rb[0m
                |   |       |   |   |-- [00mdelete_statement.rb[0m
                |   |       |   |   |-- [00mdescending.rb[0m
                |   |       |   |   |-- [00mequality.rb[0m
                |   |       |   |   |-- [00mextract.rb[0m
                |   |       |   |   |-- [00mfalse.rb[0m
                |   |       |   |   |-- [00mfilter.rb[0m
                |   |       |   |   |-- [00mfull_outer_join.rb[0m
                |   |       |   |   |-- [00mfunction.rb[0m
                |   |       |   |   |-- [00mgrouping.rb[0m
                |   |       |   |   |-- [00mhomogeneous_in.rb[0m
                |   |       |   |   |-- [00min.rb[0m
                |   |       |   |   |-- [00minfix_operation.rb[0m
                |   |       |   |   |-- [00minner_join.rb[0m
                |   |       |   |   |-- [00minsert_statement.rb[0m
                |   |       |   |   |-- [00mjoin_source.rb[0m
                |   |       |   |   |-- [00mmatches.rb[0m
                |   |       |   |   |-- [00mnamed_function.rb[0m
                |   |       |   |   |-- [00mnode.rb[0m
                |   |       |   |   |-- [00mnode_expression.rb[0m
                |   |       |   |   |-- [00mordering.rb[0m
                |   |       |   |   |-- [00mouter_join.rb[0m
                |   |       |   |   |-- [00mover.rb[0m
                |   |       |   |   |-- [00mregexp.rb[0m
                |   |       |   |   |-- [00mright_outer_join.rb[0m
                |   |       |   |   |-- [00mselect_core.rb[0m
                |   |       |   |   |-- [00mselect_statement.rb[0m
                |   |       |   |   |-- [00msql_literal.rb[0m
                |   |       |   |   |-- [00mstring_join.rb[0m
                |   |       |   |   |-- [00mtable_alias.rb[0m
                |   |       |   |   |-- [00mterminal.rb[0m
                |   |       |   |   |-- [00mtrue.rb[0m
                |   |       |   |   |-- [00munary.rb[0m
                |   |       |   |   |-- [00munary_operation.rb[0m
                |   |       |   |   |-- [00munqualified_column.rb[0m
                |   |       |   |   |-- [00mupdate_statement.rb[0m
                |   |       |   |   |-- [00mvalues_list.rb[0m
                |   |       |   |   |-- [00mwindow.rb[0m
                |   |       |   |   `-- [00mwith.rb[0m
                |   |       |   |-- [00mnodes.rb[0m
                |   |       |   |-- [00morder_predications.rb[0m
                |   |       |   |-- [00mpredications.rb[0m
                |   |       |   |-- [00mselect_manager.rb[0m
                |   |       |   |-- [00mtable.rb[0m
                |   |       |   |-- [00mtree_manager.rb[0m
                |   |       |   |-- [00mupdate_manager.rb[0m
                |   |       |   |-- [01;34mvisitors[0m
                |   |       |   |   |-- [00mdot.rb[0m
                |   |       |   |   |-- [00mmysql.rb[0m
                |   |       |   |   |-- [00mpostgresql.rb[0m
                |   |       |   |   |-- [00msqlite.rb[0m
                |   |       |   |   |-- [00mto_sql.rb[0m
                |   |       |   |   `-- [00mvisitor.rb[0m
                |   |       |   |-- [00mvisitors.rb[0m
                |   |       |   `-- [00mwindow_predications.rb[0m
                |   |       |-- [00marel.rb[0m
                |   |       `-- [01;34mrails[0m
                |   |           `-- [01;34mgenerators[0m
                |   |               |-- [01;34mactive_record[0m
                |   |               |   |-- [01;34mapplication_record[0m
                |   |               |   |   |-- [00mapplication_record_generator.rb[0m
                |   |               |   |   `-- [01;34mtemplates[0m
                |   |               |   |       `-- [00mapplication_record.rb.tt[0m
                |   |               |   |-- [01;34mmigration[0m
                |   |               |   |   |-- [00mmigration_generator.rb[0m
                |   |               |   |   `-- [01;34mtemplates[0m
                |   |               |   |       |-- [00mcreate_table_migration.rb.tt[0m
                |   |               |   |       `-- [00mmigration.rb.tt[0m
                |   |               |   |-- [00mmigration.rb[0m
                |   |               |   |-- [01;34mmodel[0m
                |   |               |   |   |-- [00mmodel_generator.rb[0m
                |   |               |   |   `-- [01;34mtemplates[0m
                |   |               |   |       |-- [00mabstract_base_class.rb.tt[0m
                |   |               |   |       |-- [00mmodel.rb.tt[0m
                |   |               |   |       `-- [00mmodule.rb.tt[0m
                |   |               |   `-- [01;34mmulti_db[0m
                |   |               |       |-- [00mmulti_db_generator.rb[0m
                |   |               |       `-- [01;34mtemplates[0m
                |   |               |           `-- [00mmulti_db.rb.tt[0m
                |   |               `-- [00mactive_record.rb[0m
                |   |-- [01;34mactivestorage-7.0.4.2[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [01;34mapp[0m
                |   |   |   |-- [01;34massets[0m
                |   |   |   |   `-- [01;34mjavascripts[0m
                |   |   |   |       |-- [00mactivestorage.esm.js[0m
                |   |   |   |       `-- [00mactivestorage.js[0m
                |   |   |   |-- [01;34mcontrollers[0m
                |   |   |   |   |-- [01;34mactive_storage[0m
                |   |   |   |   |   |-- [00mbase_controller.rb[0m
                |   |   |   |   |   |-- [01;34mblobs[0m
                |   |   |   |   |   |   |-- [00mproxy_controller.rb[0m
                |   |   |   |   |   |   `-- [00mredirect_controller.rb[0m
                |   |   |   |   |   |-- [00mdirect_uploads_controller.rb[0m
                |   |   |   |   |   |-- [00mdisk_controller.rb[0m
                |   |   |   |   |   `-- [01;34mrepresentations[0m
                |   |   |   |   |       |-- [00mbase_controller.rb[0m
                |   |   |   |   |       |-- [00mproxy_controller.rb[0m
                |   |   |   |   |       `-- [00mredirect_controller.rb[0m
                |   |   |   |   `-- [01;34mconcerns[0m
                |   |   |   |       `-- [01;34mactive_storage[0m
                |   |   |   |           |-- [00mfile_server.rb[0m
                |   |   |   |           |-- [00mset_blob.rb[0m
                |   |   |   |           |-- [00mset_current.rb[0m
                |   |   |   |           `-- [00mstreaming.rb[0m
                |   |   |   |-- [01;34mjavascript[0m
                |   |   |   |   `-- [01;34mactivestorage[0m
                |   |   |   |       |-- [00mblob_record.js[0m
                |   |   |   |       |-- [00mblob_upload.js[0m
                |   |   |   |       |-- [00mdirect_upload.js[0m
                |   |   |   |       |-- [00mdirect_upload_controller.js[0m
                |   |   |   |       |-- [00mdirect_uploads_controller.js[0m
                |   |   |   |       |-- [00mfile_checksum.js[0m
                |   |   |   |       |-- [00mhelpers.js[0m
                |   |   |   |       |-- [00mindex.js[0m
                |   |   |   |       `-- [00mujs.js[0m
                |   |   |   |-- [01;34mjobs[0m
                |   |   |   |   `-- [01;34mactive_storage[0m
                |   |   |   |       |-- [00manalyze_job.rb[0m
                |   |   |   |       |-- [00mbase_job.rb[0m
                |   |   |   |       |-- [00mmirror_job.rb[0m
                |   |   |   |       `-- [00mpurge_job.rb[0m
                |   |   |   `-- [01;34mmodels[0m
                |   |   |       `-- [01;34mactive_storage[0m
                |   |   |           |-- [00mattachment.rb[0m
                |   |   |           |-- [01;34mblob[0m
                |   |   |           |   |-- [00manalyzable.rb[0m
                |   |   |           |   |-- [00midentifiable.rb[0m
                |   |   |           |   `-- [00mrepresentable.rb[0m
                |   |   |           |-- [00mblob.rb[0m
                |   |   |           |-- [00mcurrent.rb[0m
                |   |   |           |-- [00mfilename.rb[0m
                |   |   |           |-- [00mpreview.rb[0m
                |   |   |           |-- [00mrecord.rb[0m
                |   |   |           |-- [00mvariant.rb[0m
                |   |   |           |-- [00mvariant_record.rb[0m
                |   |   |           |-- [00mvariant_with_record.rb[0m
                |   |   |           `-- [00mvariation.rb[0m
                |   |   |-- [01;34mconfig[0m
                |   |   |   `-- [00mroutes.rb[0m
                |   |   |-- [01;34mdb[0m
                |   |   |   |-- [01;34mmigrate[0m
                |   |   |   |   `-- [00m20170806125915_create_active_storage_tables.rb[0m
                |   |   |   `-- [01;34mupdate_migrate[0m
                |   |   |       |-- [00m20190112182829_add_service_name_to_active_storage_blobs.rb[0m
                |   |   |       |-- [00m20191206030411_create_active_storage_variant_records.rb[0m
                |   |   |       `-- [00m20211119233751_remove_not_null_on_active_storage_blobs_checksum.rb[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34mactive_storage[0m
                |   |       |   |-- [01;34manalyzer[0m
                |   |       |   |   |-- [00maudio_analyzer.rb[0m
                |   |       |   |   |-- [01;34mimage_analyzer[0m
                |   |       |   |   |   |-- [00mimage_magick.rb[0m
                |   |       |   |   |   `-- [00mvips.rb[0m
                |   |       |   |   |-- [00mimage_analyzer.rb[0m
                |   |       |   |   |-- [00mnull_analyzer.rb[0m
                |   |       |   |   `-- [00mvideo_analyzer.rb[0m
                |   |       |   |-- [00manalyzer.rb[0m
                |   |       |   |-- [01;34mattached[0m
                |   |       |   |   |-- [01;34mchanges[0m
                |   |       |   |   |   |-- [00mcreate_many.rb[0m
                |   |       |   |   |   |-- [00mcreate_one.rb[0m
                |   |       |   |   |   |-- [00mcreate_one_of_many.rb[0m
                |   |       |   |   |   |-- [00mdelete_many.rb[0m
                |   |       |   |   |   |-- [00mdelete_one.rb[0m
                |   |       |   |   |   |-- [00mdetach_many.rb[0m
                |   |       |   |   |   |-- [00mdetach_one.rb[0m
                |   |       |   |   |   |-- [00mpurge_many.rb[0m
                |   |       |   |   |   `-- [00mpurge_one.rb[0m
                |   |       |   |   |-- [00mchanges.rb[0m
                |   |       |   |   |-- [00mmany.rb[0m
                |   |       |   |   |-- [00mmodel.rb[0m
                |   |       |   |   `-- [00mone.rb[0m
                |   |       |   |-- [00mattached.rb[0m
                |   |       |   |-- [00mdownloader.rb[0m
                |   |       |   |-- [00mengine.rb[0m
                |   |       |   |-- [00merrors.rb[0m
                |   |       |   |-- [00mfixture_set.rb[0m
                |   |       |   |-- [00mgem_version.rb[0m
                |   |       |   |-- [00mlog_subscriber.rb[0m
                |   |       |   |-- [01;34mpreviewer[0m
                |   |       |   |   |-- [00mmupdf_previewer.rb[0m
                |   |       |   |   |-- [00mpoppler_pdf_previewer.rb[0m
                |   |       |   |   `-- [00mvideo_previewer.rb[0m
                |   |       |   |-- [00mpreviewer.rb[0m
                |   |       |   |-- [00mreflection.rb[0m
                |   |       |   |-- [01;34mservice[0m
                |   |       |   |   |-- [00mazure_storage_service.rb[0m
                |   |       |   |   |-- [00mconfigurator.rb[0m
                |   |       |   |   |-- [00mdisk_service.rb[0m
                |   |       |   |   |-- [00mgcs_service.rb[0m
                |   |       |   |   |-- [00mmirror_service.rb[0m
                |   |       |   |   |-- [00mregistry.rb[0m
                |   |       |   |   `-- [00ms3_service.rb[0m
                |   |       |   |-- [00mservice.rb[0m
                |   |       |   |-- [01;34mtransformers[0m
                |   |       |   |   |-- [00mimage_processing_transformer.rb[0m
                |   |       |   |   `-- [00mtransformer.rb[0m
                |   |       |   `-- [00mversion.rb[0m
                |   |       |-- [00mactive_storage.rb[0m
                |   |       `-- [01;34mtasks[0m
                |   |           `-- [00mactivestorage.rake[0m
                |   |-- [01;34mactivesupport-7.0.4.2[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.rdoc[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34mactive_support[0m
                |   |       |   |-- [00mactionable_error.rb[0m
                |   |       |   |-- [00mall.rb[0m
                |   |       |   |-- [00marray_inquirer.rb[0m
                |   |       |   |-- [00mbacktrace_cleaner.rb[0m
                |   |       |   |-- [00mbenchmarkable.rb[0m
                |   |       |   |-- [00mbuilder.rb[0m
                |   |       |   |-- [01;34mcache[0m
                |   |       |   |   |-- [00mfile_store.rb[0m
                |   |       |   |   |-- [00mmem_cache_store.rb[0m
                |   |       |   |   |-- [00mmemory_store.rb[0m
                |   |       |   |   |-- [00mnull_store.rb[0m
                |   |       |   |   |-- [00mredis_cache_store.rb[0m
                |   |       |   |   `-- [01;34mstrategy[0m
                |   |       |   |       |-- [00mlocal_cache.rb[0m
                |   |       |   |       `-- [00mlocal_cache_middleware.rb[0m
                |   |       |   |-- [00mcache.rb[0m
                |   |       |   |-- [00mcallbacks.rb[0m
                |   |       |   |-- [00mcode_generator.rb[0m
                |   |       |   |-- [00mconcern.rb[0m
                |   |       |   |-- [01;34mconcurrency[0m
                |   |       |   |   |-- [00mload_interlock_aware_monitor.rb[0m
                |   |       |   |   `-- [00mshare_lock.rb[0m
                |   |       |   |-- [00mconfigurable.rb[0m
                |   |       |   |-- [00mconfiguration_file.rb[0m
                |   |       |   |-- [01;34mcore_ext[0m
                |   |       |   |   |-- [01;34marray[0m
                |   |       |   |   |   |-- [00maccess.rb[0m
                |   |       |   |   |   |-- [00mconversions.rb[0m
                |   |       |   |   |   |-- [00mdeprecated_conversions.rb[0m
                |   |       |   |   |   |-- [00mextract.rb[0m
                |   |       |   |   |   |-- [00mextract_options.rb[0m
                |   |       |   |   |   |-- [00mgrouping.rb[0m
                |   |       |   |   |   |-- [00minquiry.rb[0m
                |   |       |   |   |   `-- [00mwrap.rb[0m
                |   |       |   |   |-- [00marray.rb[0m
                |   |       |   |   |-- [00mbenchmark.rb[0m
                |   |       |   |   |-- [01;34mbig_decimal[0m
                |   |       |   |   |   `-- [00mconversions.rb[0m
                |   |       |   |   |-- [00mbig_decimal.rb[0m
                |   |       |   |   |-- [01;34mclass[0m
                |   |       |   |   |   |-- [00mattribute.rb[0m
                |   |       |   |   |   |-- [00mattribute_accessors.rb[0m
                |   |       |   |   |   `-- [00msubclasses.rb[0m
                |   |       |   |   |-- [00mclass.rb[0m
                |   |       |   |   |-- [01;34mdate[0m
                |   |       |   |   |   |-- [00macts_like.rb[0m
                |   |       |   |   |   |-- [00mblank.rb[0m
                |   |       |   |   |   |-- [00mcalculations.rb[0m
                |   |       |   |   |   |-- [00mconversions.rb[0m
                |   |       |   |   |   |-- [00mdeprecated_conversions.rb[0m
                |   |       |   |   |   `-- [00mzones.rb[0m
                |   |       |   |   |-- [00mdate.rb[0m
                |   |       |   |   |-- [01;34mdate_and_time[0m
                |   |       |   |   |   |-- [00mcalculations.rb[0m
                |   |       |   |   |   |-- [00mcompatibility.rb[0m
                |   |       |   |   |   `-- [00mzones.rb[0m
                |   |       |   |   |-- [01;34mdate_time[0m
                |   |       |   |   |   |-- [00macts_like.rb[0m
                |   |       |   |   |   |-- [00mblank.rb[0m
                |   |       |   |   |   |-- [00mcalculations.rb[0m
                |   |       |   |   |   |-- [00mcompatibility.rb[0m
                |   |       |   |   |   |-- [00mconversions.rb[0m
                |   |       |   |   |   `-- [00mdeprecated_conversions.rb[0m
                |   |       |   |   |-- [00mdate_time.rb[0m
                |   |       |   |   |-- [01;34mdigest[0m
                |   |       |   |   |   `-- [00muuid.rb[0m
                |   |       |   |   |-- [00mdigest.rb[0m
                |   |       |   |   |-- [00menumerable.rb[0m
                |   |       |   |   |-- [01;34mfile[0m
                |   |       |   |   |   `-- [00matomic.rb[0m
                |   |       |   |   |-- [00mfile.rb[0m
                |   |       |   |   |-- [01;34mhash[0m
                |   |       |   |   |   |-- [00mconversions.rb[0m
                |   |       |   |   |   |-- [00mdeep_merge.rb[0m
                |   |       |   |   |   |-- [00mdeep_transform_values.rb[0m
                |   |       |   |   |   |-- [00mexcept.rb[0m
                |   |       |   |   |   |-- [00mindifferent_access.rb[0m
                |   |       |   |   |   |-- [00mkeys.rb[0m
                |   |       |   |   |   |-- [00mreverse_merge.rb[0m
                |   |       |   |   |   `-- [00mslice.rb[0m
                |   |       |   |   |-- [00mhash.rb[0m
                |   |       |   |   |-- [01;34minteger[0m
                |   |       |   |   |   |-- [00minflections.rb[0m
                |   |       |   |   |   |-- [00mmultiple.rb[0m
                |   |       |   |   |   `-- [00mtime.rb[0m
                |   |       |   |   |-- [00minteger.rb[0m
                |   |       |   |   |-- [01;34mkernel[0m
                |   |       |   |   |   |-- [00mconcern.rb[0m
                |   |       |   |   |   |-- [00mreporting.rb[0m
                |   |       |   |   |   `-- [00msingleton_class.rb[0m
                |   |       |   |   |-- [00mkernel.rb[0m
                |   |       |   |   |-- [00mload_error.rb[0m
                |   |       |   |   |-- [01;34mmodule[0m
                |   |       |   |   |   |-- [00maliasing.rb[0m
                |   |       |   |   |   |-- [00manonymous.rb[0m
                |   |       |   |   |   |-- [00mattr_internal.rb[0m
                |   |       |   |   |   |-- [00mattribute_accessors.rb[0m
                |   |       |   |   |   |-- [00mattribute_accessors_per_thread.rb[0m
                |   |       |   |   |   |-- [00mconcerning.rb[0m
                |   |       |   |   |   |-- [00mdelegation.rb[0m
                |   |       |   |   |   |-- [00mdeprecation.rb[0m
                |   |       |   |   |   |-- [00mintrospection.rb[0m
                |   |       |   |   |   |-- [00mredefine_method.rb[0m
                |   |       |   |   |   `-- [00mremove_method.rb[0m
                |   |       |   |   |-- [00mmodule.rb[0m
                |   |       |   |   |-- [00mname_error.rb[0m
                |   |       |   |   |-- [01;34mnumeric[0m
                |   |       |   |   |   |-- [00mbytes.rb[0m
                |   |       |   |   |   |-- [00mconversions.rb[0m
                |   |       |   |   |   |-- [00mdeprecated_conversions.rb[0m
                |   |       |   |   |   `-- [00mtime.rb[0m
                |   |       |   |   |-- [00mnumeric.rb[0m
                |   |       |   |   |-- [01;34mobject[0m
                |   |       |   |   |   |-- [00macts_like.rb[0m
                |   |       |   |   |   |-- [00mblank.rb[0m
                |   |       |   |   |   |-- [00mconversions.rb[0m
                |   |       |   |   |   |-- [00mdeep_dup.rb[0m
                |   |       |   |   |   |-- [00mduplicable.rb[0m
                |   |       |   |   |   |-- [00minclusion.rb[0m
                |   |       |   |   |   |-- [00minstance_variables.rb[0m
                |   |       |   |   |   |-- [00mjson.rb[0m
                |   |       |   |   |   |-- [00mto_param.rb[0m
                |   |       |   |   |   |-- [00mto_query.rb[0m
                |   |       |   |   |   |-- [00mtry.rb[0m
                |   |       |   |   |   `-- [00mwith_options.rb[0m
                |   |       |   |   |-- [00mobject.rb[0m
                |   |       |   |   |-- [01;34mpathname[0m
                |   |       |   |   |   `-- [00mexistence.rb[0m
                |   |       |   |   |-- [00mpathname.rb[0m
                |   |       |   |   |-- [01;34mrange[0m
                |   |       |   |   |   |-- [00mcompare_range.rb[0m
                |   |       |   |   |   |-- [00mconversions.rb[0m
                |   |       |   |   |   |-- [00mdeprecated_conversions.rb[0m
                |   |       |   |   |   |-- [00meach.rb[0m
                |   |       |   |   |   |-- [00minclude_time_with_zone.rb[0m
                |   |       |   |   |   `-- [00moverlaps.rb[0m
                |   |       |   |   |-- [00mrange.rb[0m
                |   |       |   |   |-- [00mregexp.rb[0m
                |   |       |   |   |-- [00msecurerandom.rb[0m
                |   |       |   |   |-- [01;34mstring[0m
                |   |       |   |   |   |-- [00maccess.rb[0m
                |   |       |   |   |   |-- [00mbehavior.rb[0m
                |   |       |   |   |   |-- [00mconversions.rb[0m
                |   |       |   |   |   |-- [00mexclude.rb[0m
                |   |       |   |   |   |-- [00mfilters.rb[0m
                |   |       |   |   |   |-- [00mindent.rb[0m
                |   |       |   |   |   |-- [00minflections.rb[0m
                |   |       |   |   |   |-- [00minquiry.rb[0m
                |   |       |   |   |   |-- [00mmultibyte.rb[0m
                |   |       |   |   |   |-- [00moutput_safety.rb[0m
                |   |       |   |   |   |-- [00mstarts_ends_with.rb[0m
                |   |       |   |   |   |-- [00mstrip.rb[0m
                |   |       |   |   |   `-- [00mzones.rb[0m
                |   |       |   |   |-- [00mstring.rb[0m
                |   |       |   |   |-- [01;34msymbol[0m
                |   |       |   |   |   `-- [00mstarts_ends_with.rb[0m
                |   |       |   |   |-- [00msymbol.rb[0m
                |   |       |   |   |-- [01;34mtime[0m
                |   |       |   |   |   |-- [00macts_like.rb[0m
                |   |       |   |   |   |-- [00mcalculations.rb[0m
                |   |       |   |   |   |-- [00mcompatibility.rb[0m
                |   |       |   |   |   |-- [00mconversions.rb[0m
                |   |       |   |   |   |-- [00mdeprecated_conversions.rb[0m
                |   |       |   |   |   `-- [00mzones.rb[0m
                |   |       |   |   |-- [00mtime.rb[0m
                |   |       |   |   `-- [00muri.rb[0m
                |   |       |   |-- [00mcore_ext.rb[0m
                |   |       |   |-- [01;34mcurrent_attributes[0m
                |   |       |   |   `-- [00mtest_helper.rb[0m
                |   |       |   |-- [00mcurrent_attributes.rb[0m
                |   |       |   |-- [01;34mdependencies[0m
                |   |       |   |   |-- [00mautoload.rb[0m
                |   |       |   |   |-- [00minterlock.rb[0m
                |   |       |   |   `-- [00mrequire_dependency.rb[0m
                |   |       |   |-- [00mdependencies.rb[0m
                |   |       |   |-- [01;34mdeprecation[0m
                |   |       |   |   |-- [00mbehaviors.rb[0m
                |   |       |   |   |-- [00mconstant_accessor.rb[0m
                |   |       |   |   |-- [00mdisallowed.rb[0m
                |   |       |   |   |-- [00minstance_delegator.rb[0m
                |   |       |   |   |-- [00mmethod_wrappers.rb[0m
                |   |       |   |   |-- [00mproxy_wrappers.rb[0m
                |   |       |   |   `-- [00mreporting.rb[0m
                |   |       |   |-- [00mdeprecation.rb[0m
                |   |       |   |-- [00mdescendants_tracker.rb[0m
                |   |       |   |-- [00mdigest.rb[0m
                |   |       |   |-- [01;34mduration[0m
                |   |       |   |   |-- [00miso8601_parser.rb[0m
                |   |       |   |   `-- [00miso8601_serializer.rb[0m
                |   |       |   |-- [00mduration.rb[0m
                |   |       |   |-- [00mencrypted_configuration.rb[0m
                |   |       |   |-- [00mencrypted_file.rb[0m
                |   |       |   |-- [00menvironment_inquirer.rb[0m
                |   |       |   |-- [00merror_reporter.rb[0m
                |   |       |   |-- [00mevented_file_update_checker.rb[0m
                |   |       |   |-- [01;34mexecution_context[0m
                |   |       |   |   `-- [00mtest_helper.rb[0m
                |   |       |   |-- [00mexecution_context.rb[0m
                |   |       |   |-- [00mexecution_wrapper.rb[0m
                |   |       |   |-- [01;34mexecutor[0m
                |   |       |   |   `-- [00mtest_helper.rb[0m
                |   |       |   |-- [00mexecutor.rb[0m
                |   |       |   |-- [00mfile_update_checker.rb[0m
                |   |       |   |-- [00mfork_tracker.rb[0m
                |   |       |   |-- [00mgem_version.rb[0m
                |   |       |   |-- [00mgzip.rb[0m
                |   |       |   |-- [00mhash_with_indifferent_access.rb[0m
                |   |       |   |-- [00mhtml_safe_translation.rb[0m
                |   |       |   |-- [00mi18n.rb[0m
                |   |       |   |-- [00mi18n_railtie.rb[0m
                |   |       |   |-- [00minflections.rb[0m
                |   |       |   |-- [01;34minflector[0m
                |   |       |   |   |-- [00minflections.rb[0m
                |   |       |   |   |-- [00mmethods.rb[0m
                |   |       |   |   `-- [00mtransliterate.rb[0m
                |   |       |   |-- [00minflector.rb[0m
                |   |       |   |-- [00misolated_execution_state.rb[0m
                |   |       |   |-- [01;34mjson[0m
                |   |       |   |   |-- [00mdecoding.rb[0m
                |   |       |   |   `-- [00mencoding.rb[0m
                |   |       |   |-- [00mjson.rb[0m
                |   |       |   |-- [00mkey_generator.rb[0m
                |   |       |   |-- [00mlazy_load_hooks.rb[0m
                |   |       |   |-- [01;34mlocale[0m
                |   |       |   |   |-- [00men.rb[0m
                |   |       |   |   `-- [00men.yml[0m
                |   |       |   |-- [01;34mlog_subscriber[0m
                |   |       |   |   `-- [00mtest_helper.rb[0m
                |   |       |   |-- [00mlog_subscriber.rb[0m
                |   |       |   |-- [00mlogger.rb[0m
                |   |       |   |-- [00mlogger_silence.rb[0m
                |   |       |   |-- [00mlogger_thread_safe_level.rb[0m
                |   |       |   |-- [00mmessage_encryptor.rb[0m
                |   |       |   |-- [00mmessage_verifier.rb[0m
                |   |       |   |-- [01;34mmessages[0m
                |   |       |   |   |-- [00mmetadata.rb[0m
                |   |       |   |   |-- [00mrotation_configuration.rb[0m
                |   |       |   |   `-- [00mrotator.rb[0m
                |   |       |   |-- [01;34mmultibyte[0m
                |   |       |   |   |-- [00mchars.rb[0m
                |   |       |   |   `-- [00municode.rb[0m
                |   |       |   |-- [00mmultibyte.rb[0m
                |   |       |   |-- [01;34mnotifications[0m
                |   |       |   |   |-- [00mfanout.rb[0m
                |   |       |   |   `-- [00minstrumenter.rb[0m
                |   |       |   |-- [00mnotifications.rb[0m
                |   |       |   |-- [01;34mnumber_helper[0m
                |   |       |   |   |-- [00mnumber_converter.rb[0m
                |   |       |   |   |-- [00mnumber_to_currency_converter.rb[0m
                |   |       |   |   |-- [00mnumber_to_delimited_converter.rb[0m
                |   |       |   |   |-- [00mnumber_to_human_converter.rb[0m
                |   |       |   |   |-- [00mnumber_to_human_size_converter.rb[0m
                |   |       |   |   |-- [00mnumber_to_percentage_converter.rb[0m
                |   |       |   |   |-- [00mnumber_to_phone_converter.rb[0m
                |   |       |   |   |-- [00mnumber_to_rounded_converter.rb[0m
                |   |       |   |   `-- [00mrounding_helper.rb[0m
                |   |       |   |-- [00mnumber_helper.rb[0m
                |   |       |   |-- [00moption_merger.rb[0m
                |   |       |   |-- [00mordered_hash.rb[0m
                |   |       |   |-- [00mordered_options.rb[0m
                |   |       |   |-- [00mparameter_filter.rb[0m
                |   |       |   |-- [00mper_thread_registry.rb[0m
                |   |       |   |-- [00mproxy_object.rb[0m
                |   |       |   |-- [00mrails.rb[0m
                |   |       |   |-- [00mrailtie.rb[0m
                |   |       |   |-- [00mreloader.rb[0m
                |   |       |   |-- [00mrescuable.rb[0m
                |   |       |   |-- [00mruby_features.rb[0m
                |   |       |   |-- [00msecure_compare_rotator.rb[0m
                |   |       |   |-- [00msecurity_utils.rb[0m
                |   |       |   |-- [00mstring_inquirer.rb[0m
                |   |       |   |-- [00msubscriber.rb[0m
                |   |       |   |-- [00mtagged_logging.rb[0m
                |   |       |   |-- [00mtest_case.rb[0m
                |   |       |   |-- [01;34mtesting[0m
                |   |       |   |   |-- [00massertions.rb[0m
                |   |       |   |   |-- [00mautorun.rb[0m
                |   |       |   |   |-- [00mconstant_lookup.rb[0m
                |   |       |   |   |-- [00mdeclarative.rb[0m
                |   |       |   |   |-- [00mdeprecation.rb[0m
                |   |       |   |   |-- [00mfile_fixtures.rb[0m
                |   |       |   |   |-- [00misolation.rb[0m
                |   |       |   |   |-- [00mmethod_call_assertions.rb[0m
                |   |       |   |   |-- [01;34mparallelization[0m
                |   |       |   |   |   |-- [00mserver.rb[0m
                |   |       |   |   |   `-- [00mworker.rb[0m
                |   |       |   |   |-- [00mparallelization.rb[0m
                |   |       |   |   |-- [00mparallelize_executor.rb[0m
                |   |       |   |   |-- [00msetup_and_teardown.rb[0m
                |   |       |   |   |-- [00mstream.rb[0m
                |   |       |   |   |-- [00mtagged_logging.rb[0m
                |   |       |   |   `-- [00mtime_helpers.rb[0m
                |   |       |   |-- [00mtime.rb[0m
                |   |       |   |-- [00mtime_with_zone.rb[0m
                |   |       |   |-- [01;34mvalues[0m
                |   |       |   |   `-- [00mtime_zone.rb[0m
                |   |       |   |-- [00mversion.rb[0m
                |   |       |   |-- [01;34mxml_mini[0m
                |   |       |   |   |-- [00mjdom.rb[0m
                |   |       |   |   |-- [00mlibxml.rb[0m
                |   |       |   |   |-- [00mlibxmlsax.rb[0m
                |   |       |   |   |-- [00mnokogiri.rb[0m
                |   |       |   |   |-- [00mnokogirisax.rb[0m
                |   |       |   |   `-- [00mrexml.rb[0m
                |   |       |   `-- [00mxml_mini.rb[0m
                |   |       `-- [00mactive_support.rb[0m
                |   |-- [01;34maddressable-2.8.1[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mGemfile[0m
                |   |   |-- [00mLICENSE.txt[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [00mRakefile[0m
                |   |   |-- [01;34mdata[0m
                |   |   |   `-- [00municode.data[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34maddressable[0m
                |   |   |   |   |-- [01;34midna[0m
                |   |   |   |   |   |-- [00mnative.rb[0m
                |   |   |   |   |   `-- [00mpure.rb[0m
                |   |   |   |   |-- [00midna.rb[0m
                |   |   |   |   |-- [00mtemplate.rb[0m
                |   |   |   |   |-- [00muri.rb[0m
                |   |   |   |   `-- [00mversion.rb[0m
                |   |   |   `-- [00maddressable.rb[0m
                |   |   |-- [01;34mspec[0m
                |   |   |   |-- [01;34maddressable[0m
                |   |   |   |   |-- [00midna_spec.rb[0m
                |   |   |   |   |-- [00mnet_http_compat_spec.rb[0m
                |   |   |   |   |-- [00msecurity_spec.rb[0m
                |   |   |   |   |-- [00mtemplate_spec.rb[0m
                |   |   |   |   `-- [00muri_spec.rb[0m
                |   |   |   `-- [00mspec_helper.rb[0m
                |   |   `-- [01;34mtasks[0m
                |   |       |-- [00mclobber.rake[0m
                |   |       |-- [00mgem.rake[0m
                |   |       |-- [00mgit.rake[0m
                |   |       |-- [00mmetrics.rake[0m
                |   |       |-- [00mprofile.rake[0m
                |   |       |-- [00mrspec.rake[0m
                |   |       `-- [00myard.rake[0m
                |   |-- [01;34mbindex-0.8.1[0m
                |   |   |-- [00mCONTRIBUTING.md[0m
                |   |   |-- [00mGemfile[0m
                |   |   |-- [00mLICENSE.txt[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [00mRakefile[0m
                |   |   |-- [00mbindex.gemspec[0m
                |   |   |-- [01;34mext[0m
                |   |   |   `-- [01;34mskiptrace[0m
                |   |   |       |-- [00mMakefile[0m
                |   |   |       |-- [01;34mcom[0m
                |   |   |       |   `-- [01;34mgsamokovarov[0m
                |   |   |       |       `-- [01;34mskiptrace[0m
                |   |   |       |           |-- [00mBindingBuilder.java[0m
                |   |   |       |           |-- [00mCurrentBindingsIterator.java[0m
                |   |   |       |           |-- [00mJRubyIntegration.java[0m
                |   |   |       |           |-- [00mRubyBindingsCollector.java[0m
                |   |   |       |           |-- [00mSetExceptionBindingsEventHook.java[0m
                |   |   |       |           |-- [00mThreadContextInterfaceException.java[0m
                |   |   |       |           `-- [00mThreadContextInternals.java[0m
                |   |   |       |-- [00mcruby.c[0m
                |   |   |       |-- [00mcruby.o[0m
                |   |   |       |-- [01;32mcruby.so[0m
                |   |   |       `-- [00mextconf.rb[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [00mbindex.rb[0m
                |   |   |   |-- [01;34mskiptrace[0m
                |   |   |   |   |-- [00mbinding_ext.rb[0m
                |   |   |   |   |-- [00mbinding_locations.rb[0m
                |   |   |   |   |-- [00mexception_ext.rb[0m
                |   |   |   |   |-- [01;34minternal[0m
                |   |   |   |   |   |-- [01;32mcruby.so[0m
                |   |   |   |   |   |-- [00mjruby.rb[0m
                |   |   |   |   |   |-- [00mjruby_internals.jar[0m
                |   |   |   |   |   `-- [00mrubinius.rb[0m
                |   |   |   |   |-- [00mlocation.rb[0m
                |   |   |   |   `-- [00mversion.rb[0m
                |   |   |   `-- [00mskiptrace.rb[0m
                |   |   |-- [00mskiptrace.gemspec[0m
                |   |   `-- [01;34mtest[0m
                |   |       |-- [01;34mfixtures[0m
                |   |       |   |-- [00mbasic_nested_fixture.rb[0m
                |   |       |   |-- [00mcustom_error_fixture.rb[0m
                |   |       |   |-- [00meval_nested_fixture.rb[0m
                |   |       |   |-- [00mflat_fixture.rb[0m
                |   |       |   `-- [00mreraised_fixture.rb[0m
                |   |       |-- [01;34mskiptrace[0m
                |   |       |   |-- [00mcurrent_bindings_test.rb[0m
                |   |       |   |-- [00mexception_test.rb[0m
                |   |       |   `-- [00mlocation_test.rb[0m
                |   |       `-- [00mtest_helper.rb[0m
                |   |-- [01;34mbootsnap-1.16.0[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mLICENSE.txt[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [01;34mexe[0m
                |   |   |   `-- [01;32mbootsnap[0m
                |   |   |-- [01;34mext[0m
                |   |   |   `-- [01;34mbootsnap[0m
                |   |   |       |-- [00mMakefile[0m
                |   |   |       |-- [00mbootsnap.c[0m
                |   |   |       |-- [00mbootsnap.h[0m
                |   |   |       |-- [00mbootsnap.o[0m
                |   |   |       |-- [01;32mbootsnap.so[0m
                |   |   |       `-- [00mextconf.rb[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34mbootsnap[0m
                |   |       |   |-- [01;32mbootsnap.so[0m
                |   |       |   |-- [00mbundler.rb[0m
                |   |       |   |-- [01;34mcli[0m
                |   |       |   |   `-- [00mworker_pool.rb[0m
                |   |       |   |-- [00mcli.rb[0m
                |   |       |   |-- [01;34mcompile_cache[0m
                |   |       |   |   |-- [00miseq.rb[0m
                |   |       |   |   |-- [00mjson.rb[0m
                |   |       |   |   `-- [00myaml.rb[0m
                |   |       |   |-- [00mcompile_cache.rb[0m
                |   |       |   |-- [00mexplicit_require.rb[0m
                |   |       |   |-- [01;34mload_path_cache[0m
                |   |       |   |   |-- [00mcache.rb[0m
                |   |       |   |   |-- [00mchange_observer.rb[0m
                |   |       |   |   |-- [01;34mcore_ext[0m
                |   |       |   |   |   |-- [00mkernel_require.rb[0m
                |   |       |   |   |   `-- [00mloaded_features.rb[0m
                |   |       |   |   |-- [00mloaded_features_index.rb[0m
                |   |       |   |   |-- [00mpath.rb[0m
                |   |       |   |   |-- [00mpath_scanner.rb[0m
                |   |       |   |   `-- [00mstore.rb[0m
                |   |       |   |-- [00mload_path_cache.rb[0m
                |   |       |   |-- [00msetup.rb[0m
                |   |       |   `-- [00mversion.rb[0m
                |   |       `-- [00mbootsnap.rb[0m
                |   |-- [01;34mbuilder-3.2.4[0m
                |   |   |-- [00mCHANGES[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [00mRakefile[0m
                |   |   |-- [00mbuilder.blurb[0m
                |   |   |-- [00mbuilder.gemspec[0m
                |   |   |-- [01;34mdoc[0m
                |   |   |   |-- [00mjamis.rb[0m
                |   |   |   `-- [01;34mreleases[0m
                |   |   |       |-- [00mbuilder-1.2.4.rdoc[0m
                |   |   |       |-- [00mbuilder-2.0.0.rdoc[0m
                |   |   |       `-- [01;32mbuilder-2.1.1.rdoc[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [00mblankslate.rb[0m
                |   |   |   |-- [01;34mbuilder[0m
                |   |   |   |   |-- [00mblankslate.rb[0m
                |   |   |   |   |-- [00mversion.rb[0m
                |   |   |   |   |-- [00mxchar.rb[0m
                |   |   |   |   |-- [00mxmlbase.rb[0m
                |   |   |   |   |-- [00mxmlevents.rb[0m
                |   |   |   |   `-- [00mxmlmarkup.rb[0m
                |   |   |   `-- [00mbuilder.rb[0m
                |   |   |-- [01;34mrakelib[0m
                |   |   |   |-- [00mpublish.rake[0m
                |   |   |   |-- [00mtags.rake[0m
                |   |   |   `-- [00mtesting.rake[0m
                |   |   `-- [01;34mtest[0m
                |   |       |-- [00mhelper.rb[0m
                |   |       |-- [00mperformance.rb[0m
                |   |       |-- [00mpreload.rb[0m
                |   |       |-- [00mtest_blankslate.rb[0m
                |   |       |-- [00mtest_eventbuilder.rb[0m
                |   |       |-- [00mtest_markupbuilder.rb[0m
                |   |       |-- [00mtest_method_caching.rb[0m
                |   |       |-- [00mtest_namecollision.rb[0m
                |   |       `-- [00mtest_xchar.rb[0m
                |   |-- [01;34mcapybara-3.38.0[0m
                |   |   |-- [00mHistory.md[0m
                |   |   |-- [00mLicense.txt[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34mcapybara[0m
                |   |   |   |   |-- [00mconfig.rb[0m
                |   |   |   |   |-- [00mcucumber.rb[0m
                |   |   |   |   |-- [01;34mdriver[0m
                |   |   |   |   |   |-- [00mbase.rb[0m
                |   |   |   |   |   `-- [00mnode.rb[0m
                |   |   |   |   |-- [00mdsl.rb[0m
                |   |   |   |   |-- [00mhelpers.rb[0m
                |   |   |   |   |-- [01;34mminitest[0m
                |   |   |   |   |   `-- [00mspec.rb[0m
                |   |   |   |   |-- [00mminitest.rb[0m
                |   |   |   |   |-- [01;34mnode[0m
                |   |   |   |   |   |-- [00mactions.rb[0m
                |   |   |   |   |   |-- [00mbase.rb[0m
                |   |   |   |   |   |-- [00mdocument.rb[0m
                |   |   |   |   |   |-- [00mdocument_matchers.rb[0m
                |   |   |   |   |   |-- [00melement.rb[0m
                |   |   |   |   |   |-- [00mfinders.rb[0m
                |   |   |   |   |   |-- [00mmatchers.rb[0m
                |   |   |   |   |   `-- [00msimple.rb[0m
                |   |   |   |   |-- [01;34mqueries[0m
                |   |   |   |   |   |-- [00mactive_element_query.rb[0m
                |   |   |   |   |   |-- [00mancestor_query.rb[0m
                |   |   |   |   |   |-- [00mbase_query.rb[0m
                |   |   |   |   |   |-- [00mcurrent_path_query.rb[0m
                |   |   |   |   |   |-- [00mmatch_query.rb[0m
                |   |   |   |   |   |-- [00mselector_query.rb[0m
                |   |   |   |   |   |-- [00msibling_query.rb[0m
                |   |   |   |   |   |-- [00mstyle_query.rb[0m
                |   |   |   |   |   |-- [00mtext_query.rb[0m
                |   |   |   |   |   `-- [00mtitle_query.rb[0m
                |   |   |   |   |-- [01;34mrack_test[0m
                |   |   |   |   |   |-- [00mbrowser.rb[0m
                |   |   |   |   |   |-- [00mcss_handlers.rb[0m
                |   |   |   |   |   |-- [00mdriver.rb[0m
                |   |   |   |   |   |-- [00merrors.rb[0m
                |   |   |   |   |   |-- [00mform.rb[0m
                |   |   |   |   |   `-- [00mnode.rb[0m
                |   |   |   |   |-- [00mrails.rb[0m
                |   |   |   |   |-- [00mregistration_container.rb[0m
                |   |   |   |   |-- [01;34mregistrations[0m
                |   |   |   |   |   |-- [00mdrivers.rb[0m
                |   |   |   |   |   |-- [01;34mpatches[0m
                |   |   |   |   |   |   `-- [00mpuma_ssl.rb[0m
                |   |   |   |   |   `-- [00mservers.rb[0m
                |   |   |   |   |-- [00mresult.rb[0m
                |   |   |   |   |-- [01;34mrspec[0m
                |   |   |   |   |   |-- [00mfeatures.rb[0m
                |   |   |   |   |   |-- [00mmatcher_proxies.rb[0m
                |   |   |   |   |   |-- [01;34mmatchers[0m
                |   |   |   |   |   |   |-- [00mbase.rb[0m
                |   |   |   |   |   |   |-- [00mbecome_closed.rb[0m
                |   |   |   |   |   |   |-- [00mcompound.rb[0m
                |   |   |   |   |   |   |-- [00mcount_sugar.rb[0m
                |   |   |   |   |   |   |-- [00mhave_ancestor.rb[0m
                |   |   |   |   |   |   |-- [00mhave_current_path.rb[0m
                |   |   |   |   |   |   |-- [00mhave_selector.rb[0m
                |   |   |   |   |   |   |-- [00mhave_sibling.rb[0m
                |   |   |   |   |   |   |-- [00mhave_text.rb[0m
                |   |   |   |   |   |   |-- [00mhave_title.rb[0m
                |   |   |   |   |   |   |-- [00mmatch_selector.rb[0m
                |   |   |   |   |   |   |-- [00mmatch_style.rb[0m
                |   |   |   |   |   |   `-- [00mspatial_sugar.rb[0m
                |   |   |   |   |   `-- [00mmatchers.rb[0m
                |   |   |   |   |-- [00mrspec.rb[0m
                |   |   |   |   |-- [01;34mselector[0m
                |   |   |   |   |   |-- [01;34mbuilders[0m
                |   |   |   |   |   |   |-- [00mcss_builder.rb[0m
                |   |   |   |   |   |   `-- [00mxpath_builder.rb[0m
                |   |   |   |   |   |-- [00mcss.rb[0m
                |   |   |   |   |   |-- [01;34mdefinition[0m
                |   |   |   |   |   |   |-- [00mbutton.rb[0m
                |   |   |   |   |   |   |-- [00mcheckbox.rb[0m
                |   |   |   |   |   |   |-- [00mcss.rb[0m
                |   |   |   |   |   |   |-- [00mdatalist_input.rb[0m
                |   |   |   |   |   |   |-- [00mdatalist_option.rb[0m
                |   |   |   |   |   |   |-- [00melement.rb[0m
                |   |   |   |   |   |   |-- [00mfield.rb[0m
                |   |   |   |   |   |   |-- [00mfieldset.rb[0m
                |   |   |   |   |   |   |-- [00mfile_field.rb[0m
                |   |   |   |   |   |   |-- [00mfillable_field.rb[0m
                |   |   |   |   |   |   |-- [00mframe.rb[0m
                |   |   |   |   |   |   |-- [00mid.rb[0m
                |   |   |   |   |   |   |-- [00mlabel.rb[0m
                |   |   |   |   |   |   |-- [00mlink.rb[0m
                |   |   |   |   |   |   |-- [00mlink_or_button.rb[0m
                |   |   |   |   |   |   |-- [00moption.rb[0m
                |   |   |   |   |   |   |-- [00mradio_button.rb[0m
                |   |   |   |   |   |   |-- [00mselect.rb[0m
                |   |   |   |   |   |   |-- [00mtable.rb[0m
                |   |   |   |   |   |   |-- [00mtable_row.rb[0m
                |   |   |   |   |   |   `-- [00mxpath.rb[0m
                |   |   |   |   |   |-- [00mdefinition.rb[0m
                |   |   |   |   |   |-- [00mfilter.rb[0m
                |   |   |   |   |   |-- [00mfilter_set.rb[0m
                |   |   |   |   |   |-- [01;34mfilters[0m
                |   |   |   |   |   |   |-- [00mbase.rb[0m
                |   |   |   |   |   |   |-- [00mexpression_filter.rb[0m
                |   |   |   |   |   |   |-- [00mlocator_filter.rb[0m
                |   |   |   |   |   |   `-- [00mnode_filter.rb[0m
                |   |   |   |   |   |-- [00mregexp_disassembler.rb[0m
                |   |   |   |   |   |-- [00mselector.rb[0m
                |   |   |   |   |   `-- [00mxpath_extensions.rb[0m
                |   |   |   |   |-- [00mselector.rb[0m
                |   |   |   |   |-- [01;34mselenium[0m
                |   |   |   |   |   |-- [01;34matoms[0m
                |   |   |   |   |   |   |-- [00mgetAttribute.min.js[0m
                |   |   |   |   |   |   |-- [00misDisplayed.min.js[0m
                |   |   |   |   |   |   `-- [01;34msrc[0m
                |   |   |   |   |   |       |-- [00mgetAttribute.js[0m
                |   |   |   |   |   |       `-- [00misDisplayed.js[0m
                |   |   |   |   |   |-- [00mdriver.rb[0m
                |   |   |   |   |   |-- [01;34mdriver_specializations[0m
                |   |   |   |   |   |   |-- [00mchrome_driver.rb[0m
                |   |   |   |   |   |   |-- [00medge_driver.rb[0m
                |   |   |   |   |   |   |-- [00mfirefox_driver.rb[0m
                |   |   |   |   |   |   |-- [00minternet_explorer_driver.rb[0m
                |   |   |   |   |   |   `-- [00msafari_driver.rb[0m
                |   |   |   |   |   |-- [01;34mextensions[0m
                |   |   |   |   |   |   |-- [00mfile_input_click_emulation.rb[0m
                |   |   |   |   |   |   |-- [00mfind.rb[0m
                |   |   |   |   |   |   |-- [00mhtml5_drag.rb[0m
                |   |   |   |   |   |   |-- [00mmodifier_keys_stack.rb[0m
                |   |   |   |   |   |   `-- [00mscroll.rb[0m
                |   |   |   |   |   |-- [00mlogger_suppressor.rb[0m
                |   |   |   |   |   |-- [00mnode.rb[0m
                |   |   |   |   |   |-- [01;34mnodes[0m
                |   |   |   |   |   |   |-- [00mchrome_node.rb[0m
                |   |   |   |   |   |   |-- [00medge_node.rb[0m
                |   |   |   |   |   |   |-- [00mfirefox_node.rb[0m
                |   |   |   |   |   |   |-- [00mie_node.rb[0m
                |   |   |   |   |   |   `-- [00msafari_node.rb[0m
                |   |   |   |   |   `-- [01;34mpatches[0m
                |   |   |   |   |       |-- [00maction_pauser.rb[0m
                |   |   |   |   |       |-- [00matoms.rb[0m
                |   |   |   |   |       |-- [00mis_displayed.rb[0m
                |   |   |   |   |       |-- [00mlogs.rb[0m
                |   |   |   |   |       |-- [00mpause_duration_fix.rb[0m
                |   |   |   |   |       `-- [00mpersistent_client.rb[0m
                |   |   |   |   |-- [01;34mserver[0m
                |   |   |   |   |   |-- [00manimation_disabler.rb[0m
                |   |   |   |   |   |-- [00mchecker.rb[0m
                |   |   |   |   |   `-- [00mmiddleware.rb[0m
                |   |   |   |   |-- [00mserver.rb[0m
                |   |   |   |   |-- [01;34msession[0m
                |   |   |   |   |   |-- [00mconfig.rb[0m
                |   |   |   |   |   `-- [00mmatchers.rb[0m
                |   |   |   |   |-- [00msession.rb[0m
                |   |   |   |   |-- [01;34mspec[0m
                |   |   |   |   |   |-- [01;34mfixtures[0m
                |   |   |   |   |   |   |-- [00manother_test_file.txt[0m
                |   |   |   |   |   |   |-- [01;35mcapybara.jpg[0m
                |   |   |   |   |   |   |-- [00mno_extension[0m
                |   |   |   |   |   |   `-- [00mtest_file.txt[0m
                |   |   |   |   |   |-- [01;34mpublic[0m
                |   |   |   |   |   |   |-- [00mjquery-ui.js[0m
                |   |   |   |   |   |   |-- [00mjquery.js[0m
                |   |   |   |   |   |   |-- [00moffset.js[0m
                |   |   |   |   |   |   `-- [00mtest.js[0m
                |   |   |   |   |   |-- [01;34msession[0m
                |   |   |   |   |   |   |-- [00maccept_alert_spec.rb[0m
                |   |   |   |   |   |   |-- [00maccept_confirm_spec.rb[0m
                |   |   |   |   |   |   |-- [00maccept_prompt_spec.rb[0m
                |   |   |   |   |   |   |-- [00mactive_element_spec.rb[0m
                |   |   |   |   |   |   |-- [00mall_spec.rb[0m
                |   |   |   |   |   |   |-- [00mancestor_spec.rb[0m
                |   |   |   |   |   |   |-- [00massert_all_of_selectors_spec.rb[0m
                |   |   |   |   |   |   |-- [00massert_current_path_spec.rb[0m
                |   |   |   |   |   |   |-- [00massert_selector_spec.rb[0m
                |   |   |   |   |   |   |-- [00massert_style_spec.rb[0m
                |   |   |   |   |   |   |-- [00massert_text_spec.rb[0m
                |   |   |   |   |   |   |-- [00massert_title_spec.rb[0m
                |   |   |   |   |   |   |-- [00mattach_file_spec.rb[0m
                |   |   |   |   |   |   |-- [00mbody_spec.rb[0m
                |   |   |   |   |   |   |-- [00mcheck_spec.rb[0m
                |   |   |   |   |   |   |-- [00mchoose_spec.rb[0m
                |   |   |   |   |   |   |-- [00mclick_button_spec.rb[0m
                |   |   |   |   |   |   |-- [00mclick_link_or_button_spec.rb[0m
                |   |   |   |   |   |   |-- [00mclick_link_spec.rb[0m
                |   |   |   |   |   |   |-- [00mcurrent_scope_spec.rb[0m
                |   |   |   |   |   |   |-- [00mcurrent_url_spec.rb[0m
                |   |   |   |   |   |   |-- [00mdismiss_confirm_spec.rb[0m
                |   |   |   |   |   |   |-- [00mdismiss_prompt_spec.rb[0m
                |   |   |   |   |   |   |-- [01;34melement[0m
                |   |   |   |   |   |   |   |-- [00massert_match_selector_spec.rb[0m
                |   |   |   |   |   |   |   |-- [00mmatch_css_spec.rb[0m
                |   |   |   |   |   |   |   |-- [00mmatch_xpath_spec.rb[0m
                |   |   |   |   |   |   |   `-- [00mmatches_selector_spec.rb[0m
                |   |   |   |   |   |   |-- [00mevaluate_async_script_spec.rb[0m
                |   |   |   |   |   |   |-- [00mevaluate_script_spec.rb[0m
                |   |   |   |   |   |   |-- [00mexecute_script_spec.rb[0m
                |   |   |   |   |   |   |-- [00mfill_in_spec.rb[0m
                |   |   |   |   |   |   |-- [00mfind_button_spec.rb[0m
                |   |   |   |   |   |   |-- [00mfind_by_id_spec.rb[0m
                |   |   |   |   |   |   |-- [00mfind_field_spec.rb[0m
                |   |   |   |   |   |   |-- [00mfind_link_spec.rb[0m
                |   |   |   |   |   |   |-- [00mfind_spec.rb[0m
                |   |   |   |   |   |   |-- [00mfirst_spec.rb[0m
                |   |   |   |   |   |   |-- [01;34mframe[0m
                |   |   |   |   |   |   |   |-- [00mframe_title_spec.rb[0m
                |   |   |   |   |   |   |   |-- [00mframe_url_spec.rb[0m
                |   |   |   |   |   |   |   |-- [00mswitch_to_frame_spec.rb[0m
                |   |   |   |   |   |   |   `-- [00mwithin_frame_spec.rb[0m
                |   |   |   |   |   |   |-- [00mgo_back_spec.rb[0m
                |   |   |   |   |   |   |-- [00mgo_forward_spec.rb[0m
                |   |   |   |   |   |   |-- [00mhas_all_selectors_spec.rb[0m
                |   |   |   |   |   |   |-- [00mhas_ancestor_spec.rb[0m
                |   |   |   |   |   |   |-- [00mhas_any_selectors_spec.rb[0m
                |   |   |   |   |   |   |-- [00mhas_button_spec.rb[0m
                |   |   |   |   |   |   |-- [00mhas_css_spec.rb[0m
                |   |   |   |   |   |   |-- [00mhas_current_path_spec.rb[0m
                |   |   |   |   |   |   |-- [00mhas_field_spec.rb[0m
                |   |   |   |   |   |   |-- [00mhas_link_spec.rb[0m
                |   |   |   |   |   |   |-- [00mhas_none_selectors_spec.rb[0m
                |   |   |   |   |   |   |-- [00mhas_select_spec.rb[0m
                |   |   |   |   |   |   |-- [00mhas_selector_spec.rb[0m
                |   |   |   |   |   |   |-- [00mhas_sibling_spec.rb[0m
                |   |   |   |   |   |   |-- [00mhas_table_spec.rb[0m
                |   |   |   |   |   |   |-- [00mhas_text_spec.rb[0m
                |   |   |   |   |   |   |-- [00mhas_title_spec.rb[0m
                |   |   |   |   |   |   |-- [00mhas_xpath_spec.rb[0m
                |   |   |   |   |   |   |-- [00mheaders_spec.rb[0m
                |   |   |   |   |   |   |-- [00mhtml_spec.rb[0m
                |   |   |   |   |   |   |-- [00mmatches_style_spec.rb[0m
                |   |   |   |   |   |   |-- [00mnode_spec.rb[0m
                |   |   |   |   |   |   |-- [00mnode_wrapper_spec.rb[0m
                |   |   |   |   |   |   |-- [00mrefresh_spec.rb[0m
                |   |   |   |   |   |   |-- [00mreset_session_spec.rb[0m
                |   |   |   |   |   |   |-- [00mresponse_code_spec.rb[0m
                |   |   |   |   |   |   |-- [00msave_and_open_page_spec.rb[0m
                |   |   |   |   |   |   |-- [00msave_and_open_screenshot_spec.rb[0m
                |   |   |   |   |   |   |-- [00msave_page_spec.rb[0m
                |   |   |   |   |   |   |-- [00msave_screenshot_spec.rb[0m
                |   |   |   |   |   |   |-- [00mscreenshot_spec.rb[0m
                |   |   |   |   |   |   |-- [00mscroll_spec.rb[0m
                |   |   |   |   |   |   |-- [00mselect_spec.rb[0m
                |   |   |   |   |   |   |-- [00mselectors_spec.rb[0m
                |   |   |   |   |   |   |-- [00msibling_spec.rb[0m
                |   |   |   |   |   |   |-- [00mtext_spec.rb[0m
                |   |   |   |   |   |   |-- [00mtitle_spec.rb[0m
                |   |   |   |   |   |   |-- [00muncheck_spec.rb[0m
                |   |   |   |   |   |   |-- [00munselect_spec.rb[0m
                |   |   |   |   |   |   |-- [00mvisit_spec.rb[0m
                |   |   |   |   |   |   |-- [01;34mwindow[0m
                |   |   |   |   |   |   |   |-- [00mbecome_closed_spec.rb[0m
                |   |   |   |   |   |   |   |-- [00mcurrent_window_spec.rb[0m
                |   |   |   |   |   |   |   |-- [00mopen_new_window_spec.rb[0m
                |   |   |   |   |   |   |   |-- [00mswitch_to_window_spec.rb[0m
                |   |   |   |   |   |   |   |-- [00mwindow_opened_by_spec.rb[0m
                |   |   |   |   |   |   |   |-- [00mwindow_spec.rb[0m
                |   |   |   |   |   |   |   |-- [00mwindows_spec.rb[0m
                |   |   |   |   |   |   |   `-- [00mwithin_window_spec.rb[0m
                |   |   |   |   |   |   `-- [00mwithin_spec.rb[0m
                |   |   |   |   |   |-- [00mspec_helper.rb[0m
                |   |   |   |   |   |-- [00mtest_app.rb[0m
                |   |   |   |   |   `-- [01;34mviews[0m
                |   |   |   |   |       |-- [00manimated.erb[0m
                |   |   |   |   |       |-- [00mbuttons.erb[0m
                |   |   |   |   |       |-- [00mfieldsets.erb[0m
                |   |   |   |   |       |-- [00mform.erb[0m
                |   |   |   |   |       |-- [00mframe_child.erb[0m
                |   |   |   |   |       |-- [00mframe_one.erb[0m
                |   |   |   |   |       |-- [00mframe_parent.erb[0m
                |   |   |   |   |       |-- [00mframe_two.erb[0m
                |   |   |   |   |       |-- [00mheader_links.erb[0m
                |   |   |   |   |       |-- [00mhost_links.erb[0m
                |   |   |   |   |       |-- [00minitial_alert.erb[0m
                |   |   |   |   |       |-- [00mlayout.erb[0m
                |   |   |   |   |       |-- [00mobscured.erb[0m
                |   |   |   |   |       |-- [00moffset.erb[0m
                |   |   |   |   |       |-- [00mpath.erb[0m
                |   |   |   |   |       |-- [00mpopup_one.erb[0m
                |   |   |   |   |       |-- [00mpopup_two.erb[0m
                |   |   |   |   |       |-- [00mpostback.erb[0m
                |   |   |   |   |       |-- [00mreact.erb[0m
                |   |   |   |   |       |-- [00mscroll.erb[0m
                |   |   |   |   |       |-- [00mspatial.erb[0m
                |   |   |   |   |       |-- [00mtables.erb[0m
                |   |   |   |   |       |-- [00mwith_animation.erb[0m
                |   |   |   |   |       |-- [00mwith_base_tag.erb[0m
                |   |   |   |   |       |-- [00mwith_count.erb[0m
                |   |   |   |   |       |-- [00mwith_dragula.erb[0m
                |   |   |   |   |       |-- [00mwith_fixed_header_footer.erb[0m
                |   |   |   |   |       |-- [00mwith_hover.erb[0m
                |   |   |   |   |       |-- [00mwith_hover1.erb[0m
                |   |   |   |   |       |-- [00mwith_html.erb[0m
                |   |   |   |   |       |-- [00mwith_html5_svg.erb[0m
                |   |   |   |   |       |-- [00mwith_html_entities.erb[0m
                |   |   |   |   |       |-- [00mwith_jquery_animation.erb[0m
                |   |   |   |   |       |-- [00mwith_js.erb[0m
                |   |   |   |   |       |-- [00mwith_jstree.erb[0m
                |   |   |   |   |       |-- [00mwith_namespace.erb[0m
                |   |   |   |   |       |-- [00mwith_scope.erb[0m
                |   |   |   |   |       |-- [00mwith_scope_other.erb[0m
                |   |   |   |   |       |-- [00mwith_shadow.erb[0m
                |   |   |   |   |       |-- [00mwith_simple_html.erb[0m
                |   |   |   |   |       |-- [00mwith_slow_unload.erb[0m
                |   |   |   |   |       |-- [00mwith_sortable_js.erb[0m
                |   |   |   |   |       |-- [00mwith_unload_alert.erb[0m
                |   |   |   |   |       |-- [00mwith_windows.erb[0m
                |   |   |   |   |       `-- [00mwithin_frames.erb[0m
                |   |   |   |   |-- [00mversion.rb[0m
                |   |   |   |   `-- [00mwindow.rb[0m
                |   |   |   `-- [00mcapybara.rb[0m
                |   |   `-- [01;34mspec[0m
                |   |       |-- [00mbasic_node_spec.rb[0m
                |   |       |-- [00mcapybara_spec.rb[0m
                |   |       |-- [00mcounter_spec.rb[0m
                |   |       |-- [00mcss_builder_spec.rb[0m
                |   |       |-- [00mcss_splitter_spec.rb[0m
                |   |       |-- [00mdsl_spec.rb[0m
                |   |       |-- [00mfilter_set_spec.rb[0m
                |   |       |-- [01;34mfixtures[0m
                |   |       |   |-- [00mcapybara.csv[0m
                |   |       |   |-- [00mcertificate.pem[0m
                |   |       |   |-- [00mkey.pem[0m
                |   |       |   |-- [00mselenium_driver_rspec_failure.rb[0m
                |   |       |   `-- [00mselenium_driver_rspec_success.rb[0m
                |   |       |-- [00mminitest_spec.rb[0m
                |   |       |-- [00mminitest_spec_spec.rb[0m
                |   |       |-- [00mper_session_config_spec.rb[0m
                |   |       |-- [00mrack_test_spec.rb[0m
                |   |       |-- [00mregexp_dissassembler_spec.rb[0m
                |   |       |-- [00mresult_spec.rb[0m
                |   |       |-- [01;34mrspec[0m
                |   |       |   |-- [00mfeatures_spec.rb[0m
                |   |       |   |-- [00mscenarios_spec.rb[0m
                |   |       |   |-- [00mshared_spec_matchers.rb[0m
                |   |       |   `-- [00mviews_spec.rb[0m
                |   |       |-- [00mrspec_matchers_spec.rb[0m
                |   |       |-- [00mrspec_spec.rb[0m
                |   |       |-- [00msauce_spec_chrome.rb[0m
                |   |       |-- [00mselector_spec.rb[0m
                |   |       |-- [00mselenium_spec_chrome.rb[0m
                |   |       |-- [00mselenium_spec_chrome_remote.rb[0m
                |   |       |-- [00mselenium_spec_edge.rb[0m
                |   |       |-- [00mselenium_spec_firefox.rb[0m
                |   |       |-- [00mselenium_spec_firefox_remote.rb[0m
                |   |       |-- [00mselenium_spec_ie.rb[0m
                |   |       |-- [00mselenium_spec_safari.rb[0m
                |   |       |-- [00mserver_spec.rb[0m
                |   |       |-- [00msession_spec.rb[0m
                |   |       |-- [00mshared_selenium_node.rb[0m
                |   |       |-- [00mshared_selenium_session.rb[0m
                |   |       |-- [00mspec_helper.rb[0m
                |   |       `-- [00mxpath_builder_spec.rb[0m
                |   |-- [01;34mconcurrent-ruby-1.2.2[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mGemfile[0m
                |   |   |-- [00mLICENSE.txt[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [00mRakefile[0m
                |   |   |-- [01;34mext[0m
                |   |   |   `-- [01;34mconcurrent-ruby[0m
                |   |   |       |-- [00mConcurrentRubyService.java[0m
                |   |   |       `-- [01;34mcom[0m
                |   |   |           `-- [01;34mconcurrent_ruby[0m
                |   |   |               `-- [01;34mext[0m
                |   |   |                   |-- [00mAtomicReferenceLibrary.java[0m
                |   |   |                   |-- [00mJRubyMapBackendLibrary.java[0m
                |   |   |                   |-- [00mJavaAtomicBooleanLibrary.java[0m
                |   |   |                   |-- [00mJavaAtomicFixnumLibrary.java[0m
                |   |   |                   |-- [00mJavaSemaphoreLibrary.java[0m
                |   |   |                   |-- [00mSynchronizationLibrary.java[0m
                |   |   |                   |-- [01;34mjsr166e[0m
                |   |   |                   |   |-- [00mConcurrentHashMap.java[0m
                |   |   |                   |   |-- [00mConcurrentHashMapV8.java[0m
                |   |   |                   |   |-- [00mLongAdder.java[0m
                |   |   |                   |   |-- [00mStriped64.java[0m
                |   |   |                   |   `-- [01;34mnounsafe[0m
                |   |   |                   |       |-- [00mConcurrentHashMapV8.java[0m
                |   |   |                   |       |-- [00mLongAdder.java[0m
                |   |   |                   |       `-- [00mStriped64.java[0m
                |   |   |                   `-- [01;34mjsr166y[0m
                |   |   |                       `-- [00mThreadLocalRandom.java[0m
                |   |   `-- [01;34mlib[0m
                |   |       `-- [01;34mconcurrent-ruby[0m
                |   |           |-- [01;34mconcurrent[0m
                |   |           |   |-- [00magent.rb[0m
                |   |           |   |-- [00marray.rb[0m
                |   |           |   |-- [00masync.rb[0m
                |   |           |   |-- [00matom.rb[0m
                |   |           |   |-- [01;34matomic[0m
                |   |           |   |   |-- [00matomic_boolean.rb[0m
                |   |           |   |   |-- [00matomic_fixnum.rb[0m
                |   |           |   |   |-- [00matomic_markable_reference.rb[0m
                |   |           |   |   |-- [00matomic_reference.rb[0m
                |   |           |   |   |-- [00mcount_down_latch.rb[0m
                |   |           |   |   |-- [00mcyclic_barrier.rb[0m
                |   |           |   |   |-- [00mevent.rb[0m
                |   |           |   |   |-- [00mfiber_local_var.rb[0m
                |   |           |   |   |-- [00mjava_count_down_latch.rb[0m
                |   |           |   |   |-- [00mlocals.rb[0m
                |   |           |   |   |-- [00mlock_local_var.rb[0m
                |   |           |   |   |-- [00mmutex_atomic_boolean.rb[0m
                |   |           |   |   |-- [00mmutex_atomic_fixnum.rb[0m
                |   |           |   |   |-- [00mmutex_count_down_latch.rb[0m
                |   |           |   |   |-- [00mmutex_semaphore.rb[0m
                |   |           |   |   |-- [00mread_write_lock.rb[0m
                |   |           |   |   |-- [00mreentrant_read_write_lock.rb[0m
                |   |           |   |   |-- [00msemaphore.rb[0m
                |   |           |   |   `-- [00mthread_local_var.rb[0m
                |   |           |   |-- [01;34matomic_reference[0m
                |   |           |   |   |-- [00matomic_direct_update.rb[0m
                |   |           |   |   |-- [00mmutex_atomic.rb[0m
                |   |           |   |   `-- [00mnumeric_cas_wrapper.rb[0m
                |   |           |   |-- [00matomics.rb[0m
                |   |           |   |-- [01;34mcollection[0m
                |   |           |   |   |-- [00mcopy_on_notify_observer_set.rb[0m
                |   |           |   |   |-- [00mcopy_on_write_observer_set.rb[0m
                |   |           |   |   |-- [00mjava_non_concurrent_priority_queue.rb[0m
                |   |           |   |   |-- [00mlock_free_stack.rb[0m
                |   |           |   |   |-- [01;34mmap[0m
                |   |           |   |   |   |-- [00matomic_reference_map_backend.rb[0m
                |   |           |   |   |   |-- [00mmri_map_backend.rb[0m
                |   |           |   |   |   |-- [00mnon_concurrent_map_backend.rb[0m
                |   |           |   |   |   |-- [00msynchronized_map_backend.rb[0m
                |   |           |   |   |   `-- [00mtruffleruby_map_backend.rb[0m
                |   |           |   |   |-- [00mnon_concurrent_priority_queue.rb[0m
                |   |           |   |   `-- [00mruby_non_concurrent_priority_queue.rb[0m
                |   |           |   |-- [01;34mconcern[0m
                |   |           |   |   |-- [00mdeprecation.rb[0m
                |   |           |   |   |-- [00mdereferenceable.rb[0m
                |   |           |   |   |-- [00mlogging.rb[0m
                |   |           |   |   |-- [00mobligation.rb[0m
                |   |           |   |   `-- [00mobservable.rb[0m
                |   |           |   |-- [00mconcurrent_ruby.jar[0m
                |   |           |   |-- [00mconfiguration.rb[0m
                |   |           |   |-- [00mconstants.rb[0m
                |   |           |   |-- [00mdataflow.rb[0m
                |   |           |   |-- [00mdelay.rb[0m
                |   |           |   |-- [00merrors.rb[0m
                |   |           |   |-- [00mexchanger.rb[0m
                |   |           |   |-- [01;34mexecutor[0m
                |   |           |   |   |-- [00mabstract_executor_service.rb[0m
                |   |           |   |   |-- [00mcached_thread_pool.rb[0m
                |   |           |   |   |-- [00mexecutor_service.rb[0m
                |   |           |   |   |-- [00mfixed_thread_pool.rb[0m
                |   |           |   |   |-- [00mimmediate_executor.rb[0m
                |   |           |   |   |-- [00mindirect_immediate_executor.rb[0m
                |   |           |   |   |-- [00mjava_executor_service.rb[0m
                |   |           |   |   |-- [00mjava_single_thread_executor.rb[0m
                |   |           |   |   |-- [00mjava_thread_pool_executor.rb[0m
                |   |           |   |   |-- [00mruby_executor_service.rb[0m
                |   |           |   |   |-- [00mruby_single_thread_executor.rb[0m
                |   |           |   |   |-- [00mruby_thread_pool_executor.rb[0m
                |   |           |   |   |-- [00msafe_task_executor.rb[0m
                |   |           |   |   |-- [00mserial_executor_service.rb[0m
                |   |           |   |   |-- [00mserialized_execution.rb[0m
                |   |           |   |   |-- [00mserialized_execution_delegator.rb[0m
                |   |           |   |   |-- [00msimple_executor_service.rb[0m
                |   |           |   |   |-- [00msingle_thread_executor.rb[0m
                |   |           |   |   |-- [00mthread_pool_executor.rb[0m
                |   |           |   |   `-- [00mtimer_set.rb[0m
                |   |           |   |-- [00mexecutors.rb[0m
                |   |           |   |-- [00mfuture.rb[0m
                |   |           |   |-- [00mhash.rb[0m
                |   |           |   |-- [00mimmutable_struct.rb[0m
                |   |           |   |-- [00mivar.rb[0m
                |   |           |   |-- [00mmap.rb[0m
                |   |           |   |-- [00mmaybe.rb[0m
                |   |           |   |-- [00mmutable_struct.rb[0m
                |   |           |   |-- [00mmvar.rb[0m
                |   |           |   |-- [00moptions.rb[0m
                |   |           |   |-- [00mpromise.rb[0m
                |   |           |   |-- [00mpromises.rb[0m
                |   |           |   |-- [00mre_include.rb[0m
                |   |           |   |-- [00mscheduled_task.rb[0m
                |   |           |   |-- [00mset.rb[0m
                |   |           |   |-- [00msettable_struct.rb[0m
                |   |           |   |-- [01;34msynchronization[0m
                |   |           |   |   |-- [00mabstract_lockable_object.rb[0m
                |   |           |   |   |-- [00mabstract_object.rb[0m
                |   |           |   |   |-- [00mabstract_struct.rb[0m
                |   |           |   |   |-- [00mcondition.rb[0m
                |   |           |   |   |-- [00mfull_memory_barrier.rb[0m
                |   |           |   |   |-- [00mjruby_lockable_object.rb[0m
                |   |           |   |   |-- [00mlock.rb[0m
                |   |           |   |   |-- [00mlockable_object.rb[0m
                |   |           |   |   |-- [00mmutex_lockable_object.rb[0m
                |   |           |   |   |-- [00mobject.rb[0m
                |   |           |   |   |-- [00msafe_initialization.rb[0m
                |   |           |   |   `-- [00mvolatile.rb[0m
                |   |           |   |-- [00msynchronization.rb[0m
                |   |           |   |-- [01;34mthread_safe[0m
                |   |           |   |   |-- [00msynchronized_delegator.rb[0m
                |   |           |   |   |-- [01;34mutil[0m
                |   |           |   |   |   |-- [00madder.rb[0m
                |   |           |   |   |   |-- [00mcheap_lockable.rb[0m
                |   |           |   |   |   |-- [00mdata_structures.rb[0m
                |   |           |   |   |   |-- [00mpower_of_two_tuple.rb[0m
                |   |           |   |   |   |-- [00mstriped64.rb[0m
                |   |           |   |   |   |-- [00mvolatile.rb[0m
                |   |           |   |   |   `-- [00mxor_shift_random.rb[0m
                |   |           |   |   `-- [00mutil.rb[0m
                |   |           |   |-- [00mtimer_task.rb[0m
                |   |           |   |-- [00mtuple.rb[0m
                |   |           |   |-- [00mtvar.rb[0m
                |   |           |   |-- [01;34mutility[0m
                |   |           |   |   |-- [00mengine.rb[0m
                |   |           |   |   |-- [00mmonotonic_time.rb[0m
                |   |           |   |   |-- [00mnative_extension_loader.rb[0m
                |   |           |   |   |-- [00mnative_integer.rb[0m
                |   |           |   |   `-- [00mprocessor_counter.rb[0m
                |   |           |   `-- [00mversion.rb[0m
                |   |           |-- [00mconcurrent-ruby.rb[0m
                |   |           `-- [00mconcurrent.rb[0m
                |   |-- [01;34mcrass-1.0.6[0m
                |   |   |-- [00mGemfile[0m
                |   |   |-- [00mHISTORY.md[0m
                |   |   |-- [00mLICENSE[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [00mRakefile[0m
                |   |   |-- [00mcrass.gemspec[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34mcrass[0m
                |   |       |   |-- [00mparser.rb[0m
                |   |       |   |-- [00mscanner.rb[0m
                |   |       |   |-- [00mtoken-scanner.rb[0m
                |   |       |   |-- [00mtokenizer.rb[0m
                |   |       |   `-- [00mversion.rb[0m
                |   |       `-- [00mcrass.rb[0m
                |   |-- [01;34mdate-3.3.3[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [01;34mext[0m
                |   |   |   `-- [01;34mdate[0m
                |   |   |       |-- [00mMakefile[0m
                |   |   |       |-- [00mdate_core.c[0m
                |   |   |       |-- [00mdate_core.o[0m
                |   |   |       |-- [01;32mdate_core.so[0m
                |   |   |       |-- [00mdate_parse.c[0m
                |   |   |       |-- [00mdate_parse.o[0m
                |   |   |       |-- [00mdate_strftime.c[0m
                |   |   |       |-- [00mdate_strftime.o[0m
                |   |   |       |-- [00mdate_strptime.c[0m
                |   |   |       |-- [00mdate_strptime.o[0m
                |   |   |       |-- [00mdate_tmx.h[0m
                |   |   |       |-- [00mextconf.rb[0m
                |   |   |       |-- [00mprereq.mk[0m
                |   |   |       |-- [00mzonetab.h[0m
                |   |   |       `-- [00mzonetab.list[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [00mdate.rb[0m
                |   |       `-- [01;32mdate_core.so[0m
                |   |-- [01;34mdebug-1.7.1[0m
                |   |   |-- [00mCONTRIBUTING.md[0m
                |   |   |-- [00mGemfile[0m
                |   |   |-- [00mLICENSE.txt[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [00mRakefile[0m
                |   |   |-- [00mTODO.md[0m
                |   |   |-- [00mdebug.gemspec[0m
                |   |   |-- [01;34mexe[0m
                |   |   |   `-- [01;32mrdbg[0m
                |   |   |-- [01;34mext[0m
                |   |   |   `-- [01;34mdebug[0m
                |   |   |       |-- [00mMakefile[0m
                |   |   |       |-- [00mdebug.c[0m
                |   |   |       |-- [00mdebug.o[0m
                |   |   |       |-- [01;32mdebug.so[0m
                |   |   |       |-- [00mdebug_version.h[0m
                |   |   |       |-- [00mextconf.rb[0m
                |   |   |       |-- [00miseq_collector.c[0m
                |   |   |       `-- [00miseq_collector.o[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34mdebug[0m
                |   |   |   |   |-- [00mabbrev_command.rb[0m
                |   |   |   |   |-- [00mbreakpoint.rb[0m
                |   |   |   |   |-- [00mclient.rb[0m
                |   |   |   |   |-- [00mcolor.rb[0m
                |   |   |   |   |-- [00mconfig.rb[0m
                |   |   |   |   |-- [00mconsole.rb[0m
                |   |   |   |   |-- [01;32mdebug.so[0m
                |   |   |   |   |-- [00mframe_info.rb[0m
                |   |   |   |   |-- [00mlocal.rb[0m
                |   |   |   |   |-- [00mopen.rb[0m
                |   |   |   |   |-- [00mopen_nonstop.rb[0m
                |   |   |   |   |-- [00mprelude.rb[0m
                |   |   |   |   |-- [00mserver.rb[0m
                |   |   |   |   |-- [00mserver_cdp.rb[0m
                |   |   |   |   |-- [00mserver_dap.rb[0m
                |   |   |   |   |-- [00msession.rb[0m
                |   |   |   |   |-- [00msource_repository.rb[0m
                |   |   |   |   |-- [00mstart.rb[0m
                |   |   |   |   |-- [00mthread_client.rb[0m
                |   |   |   |   |-- [00mtracer.rb[0m
                |   |   |   |   `-- [00mversion.rb[0m
                |   |   |   `-- [00mdebug.rb[0m
                |   |   `-- [01;34mmisc[0m
                |   |       `-- [00mREADME.md.erb[0m
                |   |-- [01;34merubi-1.12.0[0m
                |   |   |-- [00mCHANGELOG[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.rdoc[0m
                |   |   |-- [00mRakefile[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34merubi[0m
                |   |       |   `-- [00mcapture_end.rb[0m
                |   |       `-- [00merubi.rb[0m
                |   |-- [01;34mglobalid-1.1.0[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.md[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34mglobal_id[0m
                |   |       |   |-- [00mfixture_set.rb[0m
                |   |       |   |-- [00mglobal_id.rb[0m
                |   |       |   |-- [00midentification.rb[0m
                |   |       |   |-- [00mlocator.rb[0m
                |   |       |   |-- [00mrailtie.rb[0m
                |   |       |   |-- [00msigned_global_id.rb[0m
                |   |       |   |-- [01;34muri[0m
                |   |       |   |   `-- [00mgid.rb[0m
                |   |       |   `-- [00mverifier.rb[0m
                |   |       |-- [00mglobal_id.rb[0m
                |   |       `-- [00mglobalid.rb[0m
                |   |-- [01;34mi18n-1.12.0[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.md[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34mi18n[0m
                |   |       |   |-- [01;34mbackend[0m
                |   |       |   |   |-- [00mbase.rb[0m
                |   |       |   |   |-- [00mcache.rb[0m
                |   |       |   |   |-- [00mcache_file.rb[0m
                |   |       |   |   |-- [00mcascade.rb[0m
                |   |       |   |   |-- [00mchain.rb[0m
                |   |       |   |   |-- [00mfallbacks.rb[0m
                |   |       |   |   |-- [00mflatten.rb[0m
                |   |       |   |   |-- [00mgettext.rb[0m
                |   |       |   |   |-- [00minterpolation_compiler.rb[0m
                |   |       |   |   |-- [00mkey_value.rb[0m
                |   |       |   |   |-- [00mlazy_loadable.rb[0m
                |   |       |   |   |-- [00mmemoize.rb[0m
                |   |       |   |   |-- [00mmetadata.rb[0m
                |   |       |   |   |-- [00mpluralization.rb[0m
                |   |       |   |   |-- [00msimple.rb[0m
                |   |       |   |   `-- [00mtransliterator.rb[0m
                |   |       |   |-- [00mbackend.rb[0m
                |   |       |   |-- [00mconfig.rb[0m
                |   |       |   |-- [00mexceptions.rb[0m
                |   |       |   |-- [01;34mgettext[0m
                |   |       |   |   |-- [00mhelpers.rb[0m
                |   |       |   |   `-- [00mpo_parser.rb[0m
                |   |       |   |-- [00mgettext.rb[0m
                |   |       |   |-- [01;34minterpolate[0m
                |   |       |   |   `-- [00mruby.rb[0m
                |   |       |   |-- [01;34mlocale[0m
                |   |       |   |   |-- [00mfallbacks.rb[0m
                |   |       |   |   |-- [01;34mtag[0m
                |   |       |   |   |   |-- [00mparents.rb[0m
                |   |       |   |   |   |-- [00mrfc4646.rb[0m
                |   |       |   |   |   `-- [00msimple.rb[0m
                |   |       |   |   `-- [00mtag.rb[0m
                |   |       |   |-- [00mlocale.rb[0m
                |   |       |   |-- [00mmiddleware.rb[0m
                |   |       |   |-- [01;34mtests[0m
                |   |       |   |   |-- [00mbasics.rb[0m
                |   |       |   |   |-- [00mdefaults.rb[0m
                |   |       |   |   |-- [00minterpolation.rb[0m
                |   |       |   |   |-- [00mlink.rb[0m
                |   |       |   |   |-- [01;34mlocalization[0m
                |   |       |   |   |   |-- [00mdate.rb[0m
                |   |       |   |   |   |-- [00mdate_time.rb[0m
                |   |       |   |   |   |-- [00mprocs.rb[0m
                |   |       |   |   |   `-- [00mtime.rb[0m
                |   |       |   |   |-- [00mlocalization.rb[0m
                |   |       |   |   |-- [00mlookup.rb[0m
                |   |       |   |   |-- [00mpluralization.rb[0m
                |   |       |   |   `-- [00mprocs.rb[0m
                |   |       |   |-- [00mtests.rb[0m
                |   |       |   |-- [00mutils.rb[0m
                |   |       |   `-- [00mversion.rb[0m
                |   |       `-- [00mi18n.rb[0m
                |   |-- [01;34mimportmap-rails-1.1.5[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [00mRakefile[0m
                |   |   |-- [01;34mapp[0m
                |   |   |   |-- [01;34massets[0m
                |   |   |   |   `-- [01;34mjavascripts[0m
                |   |   |   |       |-- [00mes-module-shims.js[0m
                |   |   |   |       |-- [00mes-module-shims.js.map[0m
                |   |   |   |       `-- [00mes-module-shims.min.js[0m
                |   |   |   `-- [01;34mhelpers[0m
                |   |   |       `-- [01;34mimportmap[0m
                |   |   |           `-- [00mimportmap_tags_helper.rb[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34mimportmap[0m
                |   |       |   |-- [00mcommands.rb[0m
                |   |       |   |-- [01;32mengine.rb[0m
                |   |       |   |-- [00mmap.rb[0m
                |   |       |   |-- [00mnpm.rb[0m
                |   |       |   |-- [00mpackager.rb[0m
                |   |       |   |-- [00mreloader.rb[0m
                |   |       |   `-- [00mversion.rb[0m
                |   |       |-- [00mimportmap-rails.rb[0m
                |   |       |-- [01;34minstall[0m
                |   |       |   |-- [01;34mbin[0m
                |   |       |   |   `-- [01;32mimportmap[0m
                |   |       |   |-- [01;34mconfig[0m
                |   |       |   |   `-- [00mimportmap.rb[0m
                |   |       |   `-- [00minstall.rb[0m
                |   |       |-- [00mshim.js[0m
                |   |       `-- [01;34mtasks[0m
                |   |           `-- [00mimportmap_tasks.rake[0m
                |   |-- [01;34mio-console-0.6.0[0m
                |   |   |-- [00mLICENSE.txt[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [01;34mext[0m
                |   |   |   `-- [01;34mio[0m
                |   |   |       `-- [01;34mconsole[0m
                |   |   |           |-- [00mMakefile[0m
                |   |   |           |-- [00mconsole.c[0m
                |   |   |           |-- [00mconsole.o[0m
                |   |   |           |-- [01;32mconsole.so[0m
                |   |   |           |-- [00mextconf.rb[0m
                |   |   |           `-- [00mwin32_vk.inc[0m
                |   |   `-- [01;34mlib[0m
                |   |       `-- [01;34mio[0m
                |   |           |-- [01;34mconsole[0m
                |   |           |   `-- [00msize.rb[0m
                |   |           `-- [01;32mconsole.so[0m
                |   |-- [01;34mirb-1.6.2[0m
                |   |   |-- [00mGemfile[0m
                |   |   |-- [00mLICENSE.txt[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [00mRakefile[0m
                |   |   |-- [01;34mbin[0m
                |   |   |   |-- [01;32mconsole[0m
                |   |   |   `-- [01;32msetup[0m
                |   |   |-- [01;34mdoc[0m
                |   |   |   `-- [01;34mirb[0m
                |   |   |       |-- [00mirb-tools.rd.ja[0m
                |   |   |       `-- [00mirb.rd.ja[0m
                |   |   |-- [01;34mexe[0m
                |   |   |   `-- [01;32mirb[0m
                |   |   |-- [00mirb.gemspec[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34mirb[0m
                |   |   |   |   |-- [01;34mcmd[0m
                |   |   |   |   |   |-- [00mbacktrace.rb[0m
                |   |   |   |   |   |-- [00mbreak.rb[0m
                |   |   |   |   |   |-- [00mcatch.rb[0m
                |   |   |   |   |   |-- [00mchws.rb[0m
                |   |   |   |   |   |-- [00mcontinue.rb[0m
                |   |   |   |   |   |-- [00mdebug.rb[0m
                |   |   |   |   |   |-- [00mdelete.rb[0m
                |   |   |   |   |   |-- [00medit.rb[0m
                |   |   |   |   |   |-- [00mfinish.rb[0m
                |   |   |   |   |   |-- [00mfork.rb[0m
                |   |   |   |   |   |-- [00mhelp.rb[0m
                |   |   |   |   |   |-- [00minfo.rb[0m
                |   |   |   |   |   |-- [00mirb_info.rb[0m
                |   |   |   |   |   |-- [00mload.rb[0m
                |   |   |   |   |   |-- [00mls.rb[0m
                |   |   |   |   |   |-- [00mmeasure.rb[0m
                |   |   |   |   |   |-- [00mnext.rb[0m
                |   |   |   |   |   |-- [00mnop.rb[0m
                |   |   |   |   |   |-- [00mpushws.rb[0m
                |   |   |   |   |   |-- [00mshow_cmds.rb[0m
                |   |   |   |   |   |-- [00mshow_source.rb[0m
                |   |   |   |   |   |-- [00mstep.rb[0m
                |   |   |   |   |   |-- [00msubirb.rb[0m
                |   |   |   |   |   `-- [00mwhereami.rb[0m
                |   |   |   |   |-- [00mcolor.rb[0m
                |   |   |   |   |-- [00mcolor_printer.rb[0m
                |   |   |   |   |-- [00mcompletion.rb[0m
                |   |   |   |   |-- [00mcontext.rb[0m
                |   |   |   |   |-- [00measter-egg.rb[0m
                |   |   |   |   |-- [01;34mext[0m
                |   |   |   |   |   |-- [00mchange-ws.rb[0m
                |   |   |   |   |   |-- [00mhistory.rb[0m
                |   |   |   |   |   |-- [00mloader.rb[0m
                |   |   |   |   |   |-- [00mmulti-irb.rb[0m
                |   |   |   |   |   |-- [00msave-history.rb[0m
                |   |   |   |   |   |-- [00mtracer.rb[0m
                |   |   |   |   |   |-- [00muse-loader.rb[0m
                |   |   |   |   |   `-- [00mworkspaces.rb[0m
                |   |   |   |   |-- [00mextend-command.rb[0m
                |   |   |   |   |-- [00mframe.rb[0m
                |   |   |   |   |-- [00mhelp.rb[0m
                |   |   |   |   |-- [00minit.rb[0m
                |   |   |   |   |-- [00minput-method.rb[0m
                |   |   |   |   |-- [00minspector.rb[0m
                |   |   |   |   |-- [01;34mlc[0m
                |   |   |   |   |   |-- [00merror.rb[0m
                |   |   |   |   |   |-- [00mhelp-message[0m
                |   |   |   |   |   `-- [01;34mja[0m
                |   |   |   |   |       |-- [00mencoding_aliases.rb[0m
                |   |   |   |   |       |-- [00merror.rb[0m
                |   |   |   |   |       `-- [00mhelp-message[0m
                |   |   |   |   |-- [00mlocale.rb[0m
                |   |   |   |   |-- [00mmagic-file.rb[0m
                |   |   |   |   |-- [00mnotifier.rb[0m
                |   |   |   |   |-- [00moutput-method.rb[0m
                |   |   |   |   |-- [00mruby-lex.rb[0m
                |   |   |   |   |-- [00mruby_logo.aa[0m
                |   |   |   |   |-- [00msrc_encoding.rb[0m
                |   |   |   |   |-- [00mversion.rb[0m
                |   |   |   |   |-- [00mworkspace.rb[0m
                |   |   |   |   |-- [00mws-for-case-2.rb[0m
                |   |   |   |   `-- [00mxmp.rb[0m
                |   |   |   `-- [00mirb.rb[0m
                |   |   `-- [01;34mman[0m
                |   |       `-- [00mirb.1[0m
                |   |-- [01;34mjbuilder-2.11.5[0m
                |   |   |-- [00mAppraisals[0m
                |   |   |-- [00mCONTRIBUTING.md[0m
                |   |   |-- [00mGemfile[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [00mRakefile[0m
                |   |   |-- [01;34mgemfiles[0m
                |   |   |   |-- [00mrails_5_0.gemfile[0m
                |   |   |   |-- [00mrails_5_1.gemfile[0m
                |   |   |   |-- [00mrails_5_2.gemfile[0m
                |   |   |   |-- [00mrails_6_0.gemfile[0m
                |   |   |   |-- [00mrails_6_1.gemfile[0m
                |   |   |   `-- [00mrails_head.gemfile[0m
                |   |   |-- [00mjbuilder.gemspec[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34mgenerators[0m
                |   |   |   |   `-- [01;34mrails[0m
                |   |   |   |       |-- [00mjbuilder_generator.rb[0m
                |   |   |   |       |-- [00mscaffold_controller_generator.rb[0m
                |   |   |   |       `-- [01;34mtemplates[0m
                |   |   |   |           |-- [00mapi_controller.rb[0m
                |   |   |   |           |-- [00mcontroller.rb[0m
                |   |   |   |           |-- [00mindex.json.jbuilder[0m
                |   |   |   |           |-- [00mpartial.json.jbuilder[0m
                |   |   |   |           `-- [00mshow.json.jbuilder[0m
                |   |   |   |-- [01;34mjbuilder[0m
                |   |   |   |   |-- [00mblank.rb[0m
                |   |   |   |   |-- [00mcollection_renderer.rb[0m
                |   |   |   |   |-- [00mdependency_tracker.rb[0m
                |   |   |   |   |-- [00merrors.rb[0m
                |   |   |   |   |-- [00mjbuilder.rb[0m
                |   |   |   |   |-- [00mjbuilder_template.rb[0m
                |   |   |   |   |-- [00mkey_formatter.rb[0m
                |   |   |   |   `-- [00mrailtie.rb[0m
                |   |   |   `-- [00mjbuilder.rb[0m
                |   |   `-- [01;34mtest[0m
                |   |       |-- [00mjbuilder_dependency_tracker_test.rb[0m
                |   |       |-- [00mjbuilder_generator_test.rb[0m
                |   |       |-- [00mjbuilder_template_test.rb[0m
                |   |       |-- [00mjbuilder_test.rb[0m
                |   |       |-- [00mscaffold_api_controller_generator_test.rb[0m
                |   |       |-- [00mscaffold_controller_generator_test.rb[0m
                |   |       `-- [00mtest_helper.rb[0m
                |   |-- [01;34mloofah-2.19.1[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mMIT-LICENSE.txt[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [00mSECURITY.md[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34mloofah[0m
                |   |       |   |-- [00melements.rb[0m
                |   |       |   |-- [00mhelpers.rb[0m
                |   |       |   |-- [01;34mhtml[0m
                |   |       |   |   |-- [00mdocument.rb[0m
                |   |       |   |   `-- [00mdocument_fragment.rb[0m
                |   |       |   |-- [01;34mhtml5[0m
                |   |       |   |   |-- [00mlibxml2_workarounds.rb[0m
                |   |       |   |   |-- [00msafelist.rb[0m
                |   |       |   |   `-- [00mscrub.rb[0m
                |   |       |   |-- [00minstance_methods.rb[0m
                |   |       |   |-- [00mmetahelpers.rb[0m
                |   |       |   |-- [00mscrubber.rb[0m
                |   |       |   |-- [00mscrubbers.rb[0m
                |   |       |   |-- [00mversion.rb[0m
                |   |       |   `-- [01;34mxml[0m
                |   |       |       |-- [00mdocument.rb[0m
                |   |       |       `-- [00mdocument_fragment.rb[0m
                |   |       `-- [00mloofah.rb[0m
                |   |-- [01;34mmail-2.8.1[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.md[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34mmail[0m
                |   |       |   |-- [00mattachments_list.rb[0m
                |   |       |   |-- [00mbody.rb[0m
                |   |       |   |-- [00mcheck_delivery_params.rb[0m
                |   |       |   |-- [00mconfiguration.rb[0m
                |   |       |   |-- [00mconstants.rb[0m
                |   |       |   |-- [01;34melements[0m
                |   |       |   |   |-- [00maddress.rb[0m
                |   |       |   |   |-- [00maddress_list.rb[0m
                |   |       |   |   |-- [00mcontent_disposition_element.rb[0m
                |   |       |   |   |-- [00mcontent_location_element.rb[0m
                |   |       |   |   |-- [00mcontent_transfer_encoding_element.rb[0m
                |   |       |   |   |-- [00mcontent_type_element.rb[0m
                |   |       |   |   |-- [00mdate_time_element.rb[0m
                |   |       |   |   |-- [00menvelope_from_element.rb[0m
                |   |       |   |   |-- [00mmessage_ids_element.rb[0m
                |   |       |   |   |-- [00mmime_version_element.rb[0m
                |   |       |   |   |-- [00mphrase_list.rb[0m
                |   |       |   |   `-- [00mreceived_element.rb[0m
                |   |       |   |-- [00melements.rb[0m
                |   |       |   |-- [01;34mencodings[0m
                |   |       |   |   |-- [00m7bit.rb[0m
                |   |       |   |   |-- [00m8bit.rb[0m
                |   |       |   |   |-- [00mbase64.rb[0m
                |   |       |   |   |-- [00mbinary.rb[0m
                |   |       |   |   |-- [00midentity.rb[0m
                |   |       |   |   |-- [00mquoted_printable.rb[0m
                |   |       |   |   |-- [00mtransfer_encoding.rb[0m
                |   |       |   |   `-- [00munix_to_unix.rb[0m
                |   |       |   |-- [00mencodings.rb[0m
                |   |       |   |-- [00menvelope.rb[0m
                |   |       |   |-- [00mfield.rb[0m
                |   |       |   |-- [00mfield_list.rb[0m
                |   |       |   |-- [01;34mfields[0m
                |   |       |   |   |-- [00mbcc_field.rb[0m
                |   |       |   |   |-- [00mcc_field.rb[0m
                |   |       |   |   |-- [00mcomments_field.rb[0m
                |   |       |   |   |-- [00mcommon_address_field.rb[0m
                |   |       |   |   |-- [00mcommon_date_field.rb[0m
                |   |       |   |   |-- [00mcommon_field.rb[0m
                |   |       |   |   |-- [00mcommon_message_id_field.rb[0m
                |   |       |   |   |-- [00mcontent_description_field.rb[0m
                |   |       |   |   |-- [00mcontent_disposition_field.rb[0m
                |   |       |   |   |-- [00mcontent_id_field.rb[0m
                |   |       |   |   |-- [00mcontent_location_field.rb[0m
                |   |       |   |   |-- [00mcontent_transfer_encoding_field.rb[0m
                |   |       |   |   |-- [00mcontent_type_field.rb[0m
                |   |       |   |   |-- [00mdate_field.rb[0m
                |   |       |   |   |-- [00mfrom_field.rb[0m
                |   |       |   |   |-- [00min_reply_to_field.rb[0m
                |   |       |   |   |-- [00mkeywords_field.rb[0m
                |   |       |   |   |-- [00mmessage_id_field.rb[0m
                |   |       |   |   |-- [00mmime_version_field.rb[0m
                |   |       |   |   |-- [00mnamed_structured_field.rb[0m
                |   |       |   |   |-- [00mnamed_unstructured_field.rb[0m
                |   |       |   |   |-- [00moptional_field.rb[0m
                |   |       |   |   |-- [00mparameter_hash.rb[0m
                |   |       |   |   |-- [00mreceived_field.rb[0m
                |   |       |   |   |-- [00mreferences_field.rb[0m
                |   |       |   |   |-- [00mreply_to_field.rb[0m
                |   |       |   |   |-- [00mresent_bcc_field.rb[0m
                |   |       |   |   |-- [00mresent_cc_field.rb[0m
                |   |       |   |   |-- [00mresent_date_field.rb[0m
                |   |       |   |   |-- [00mresent_from_field.rb[0m
                |   |       |   |   |-- [00mresent_message_id_field.rb[0m
                |   |       |   |   |-- [00mresent_sender_field.rb[0m
                |   |       |   |   |-- [00mresent_to_field.rb[0m
                |   |       |   |   |-- [00mreturn_path_field.rb[0m
                |   |       |   |   |-- [00msender_field.rb[0m
                |   |       |   |   |-- [00mstructured_field.rb[0m
                |   |       |   |   |-- [00msubject_field.rb[0m
                |   |       |   |   |-- [00mto_field.rb[0m
                |   |       |   |   `-- [00munstructured_field.rb[0m
                |   |       |   |-- [00mfields.rb[0m
                |   |       |   |-- [00mheader.rb[0m
                |   |       |   |-- [00mindifferent_hash.rb[0m
                |   |       |   |-- [00mmail.rb[0m
                |   |       |   |-- [01;34mmatchers[0m
                |   |       |   |   |-- [00mattachment_matchers.rb[0m
                |   |       |   |   `-- [00mhas_sent_mail.rb[0m
                |   |       |   |-- [00mmessage.rb[0m
                |   |       |   |-- [01;34mmultibyte[0m
                |   |       |   |   |-- [00mchars.rb[0m
                |   |       |   |   |-- [00municode.rb[0m
                |   |       |   |   `-- [00mutils.rb[0m
                |   |       |   |-- [00mmultibyte.rb[0m
                |   |       |   |-- [01;34mnetwork[0m
                |   |       |   |   |-- [01;34mdelivery_methods[0m
                |   |       |   |   |   |-- [00mexim.rb[0m
                |   |       |   |   |   |-- [00mfile_delivery.rb[0m
                |   |       |   |   |   |-- [00mlogger_delivery.rb[0m
                |   |       |   |   |   |-- [00msendmail.rb[0m
                |   |       |   |   |   |-- [00msmtp.rb[0m
                |   |       |   |   |   |-- [00msmtp_connection.rb[0m
                |   |       |   |   |   `-- [00mtest_mailer.rb[0m
                |   |       |   |   `-- [01;34mretriever_methods[0m
                |   |       |   |       |-- [00mbase.rb[0m
                |   |       |   |       |-- [00mimap.rb[0m
                |   |       |   |       |-- [00mpop3.rb[0m
                |   |       |   |       `-- [00mtest_retriever.rb[0m
                |   |       |   |-- [00mnetwork.rb[0m
                |   |       |   |-- [00mparser_tools.rb[0m
                |   |       |   |-- [01;34mparsers[0m
                |   |       |   |   |-- [00maddress_lists_parser.rb[0m
                |   |       |   |   |-- [00maddress_lists_parser.rl[0m
                |   |       |   |   |-- [00mcontent_disposition_parser.rb[0m
                |   |       |   |   |-- [00mcontent_disposition_parser.rl[0m
                |   |       |   |   |-- [00mcontent_location_parser.rb[0m
                |   |       |   |   |-- [00mcontent_location_parser.rl[0m
                |   |       |   |   |-- [00mcontent_transfer_encoding_parser.rb[0m
                |   |       |   |   |-- [00mcontent_transfer_encoding_parser.rl[0m
                |   |       |   |   |-- [00mcontent_type_parser.rb[0m
                |   |       |   |   |-- [00mcontent_type_parser.rl[0m
                |   |       |   |   |-- [00mdate_time_parser.rb[0m
                |   |       |   |   |-- [00mdate_time_parser.rl[0m
                |   |       |   |   |-- [00menvelope_from_parser.rb[0m
                |   |       |   |   |-- [00menvelope_from_parser.rl[0m
                |   |       |   |   |-- [00mmessage_ids_parser.rb[0m
                |   |       |   |   |-- [00mmessage_ids_parser.rl[0m
                |   |       |   |   |-- [00mmime_version_parser.rb[0m
                |   |       |   |   |-- [00mmime_version_parser.rl[0m
                |   |       |   |   |-- [00mphrase_lists_parser.rb[0m
                |   |       |   |   |-- [00mphrase_lists_parser.rl[0m
                |   |       |   |   |-- [00mreceived_parser.rb[0m
                |   |       |   |   |-- [00mreceived_parser.rl[0m
                |   |       |   |   |-- [00mrfc2045_content_transfer_encoding.rl[0m
                |   |       |   |   |-- [00mrfc2045_content_type.rl[0m
                |   |       |   |   |-- [00mrfc2045_mime.rl[0m
                |   |       |   |   |-- [00mrfc2183_content_disposition.rl[0m
                |   |       |   |   |-- [00mrfc3629_utf8.rl[0m
                |   |       |   |   |-- [00mrfc5234_abnf_core_rules.rl[0m
                |   |       |   |   |-- [00mrfc5322.rl[0m
                |   |       |   |   |-- [00mrfc5322_address.rl[0m
                |   |       |   |   |-- [00mrfc5322_date_time.rl[0m
                |   |       |   |   `-- [00mrfc5322_lexical_tokens.rl[0m
                |   |       |   |-- [00mparsers.rb[0m
                |   |       |   |-- [00mpart.rb[0m
                |   |       |   |-- [00mparts_list.rb[0m
                |   |       |   |-- [00msmtp_envelope.rb[0m
                |   |       |   |-- [00mutilities.rb[0m
                |   |       |   |-- [01;34mvalues[0m
                |   |       |   |   `-- [00municode_tables.dat[0m
                |   |       |   |-- [00mversion.rb[0m
                |   |       |   `-- [00myaml.rb[0m
                |   |       `-- [00mmail.rb[0m
                |   |-- [01;34mmarcel-1.0.2[0m
                |   |   |-- [00mAPACHE-LICENSE[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.md[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34mmarcel[0m
                |   |       |   |-- [00mmagic.rb[0m
                |   |       |   |-- [01;34mmime_type[0m
                |   |       |   |   `-- [00mdefinitions.rb[0m
                |   |       |   |-- [00mmime_type.rb[0m
                |   |       |   |-- [00mtables.rb[0m
                |   |       |   `-- [00mversion.rb[0m
                |   |       `-- [00mmarcel.rb[0m
                |   |-- [01;34mmatrix-0.4.2[0m
                |   |   |-- [00mLICENSE.txt[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34mmatrix[0m
                |   |   |   |   |-- [00meigenvalue_decomposition.rb[0m
                |   |   |   |   |-- [00mlup_decomposition.rb[0m
                |   |   |   |   `-- [00mversion.rb[0m
                |   |   |   `-- [00mmatrix.rb[0m
                |   |   `-- [00mmatrix.gemspec[0m
                |   |-- [01;34mmethod_source-1.0.0[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mGemfile[0m
                |   |   |-- [00mLICENSE[0m
                |   |   |-- [00mREADME.markdown[0m
                |   |   |-- [00mRakefile[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34mmethod_source[0m
                |   |   |   |   |-- [00mcode_helpers.rb[0m
                |   |   |   |   |-- [00msource_location.rb[0m
                |   |   |   |   `-- [00mversion.rb[0m
                |   |   |   `-- [00mmethod_source.rb[0m
                |   |   |-- [00mmethod_source.gemspec[0m
                |   |   `-- [01;34mspec[0m
                |   |       |-- [01;34mmethod_source[0m
                |   |       |   `-- [00mcode_helpers_spec.rb[0m
                |   |       |-- [00mmethod_source_spec.rb[0m
                |   |       `-- [00mspec_helper.rb[0m
                |   |-- [01;34mmini_mime-1.1.2[0m
                |   |   |-- [00mCHANGELOG[0m
                |   |   |-- [00mCODE_OF_CONDUCT.md[0m
                |   |   |-- [00mGemfile[0m
                |   |   |-- [00mLICENSE.txt[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [00mRakefile[0m
                |   |   |-- [01;34mbench[0m
                |   |   |   `-- [00mbench.rb[0m
                |   |   |-- [01;34mbin[0m
                |   |   |   |-- [01;32mconsole[0m
                |   |   |   |-- [01;32mdb_pull_request[0m
                |   |   |   `-- [01;32msetup[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34mdb[0m
                |   |   |   |   |-- [00mcontent_type_mime.db[0m
                |   |   |   |   `-- [00mext_mime.db[0m
                |   |   |   |-- [01;34mmini_mime[0m
                |   |   |   |   `-- [00mversion.rb[0m
                |   |   |   `-- [00mmini_mime.rb[0m
                |   |   `-- [00mmini_mime.gemspec[0m
                |   |-- [01;34mminitest-5.17.0[0m
                |   |   |-- [00mHistory.rdoc[0m
                |   |   |-- [00mManifest.txt[0m
                |   |   |-- [00mREADME.rdoc[0m
                |   |   |-- [00mRakefile[0m
                |   |   |-- [00mdesign_rationale.rb[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34mhoe[0m
                |   |   |   |   `-- [00mminitest.rb[0m
                |   |   |   |-- [01;34mminitest[0m
                |   |   |   |   |-- [00massertions.rb[0m
                |   |   |   |   |-- [00mautorun.rb[0m
                |   |   |   |   |-- [00mbenchmark.rb[0m
                |   |   |   |   |-- [00mexpectations.rb[0m
                |   |   |   |   |-- [00mhell.rb[0m
                |   |   |   |   |-- [00mmock.rb[0m
                |   |   |   |   |-- [00mparallel.rb[0m
                |   |   |   |   |-- [00mpride.rb[0m
                |   |   |   |   |-- [00mpride_plugin.rb[0m
                |   |   |   |   |-- [00mspec.rb[0m
                |   |   |   |   |-- [00mtest.rb[0m
                |   |   |   |   |-- [00mtest_task.rb[0m
                |   |   |   |   `-- [00munit.rb[0m
                |   |   |   `-- [00mminitest.rb[0m
                |   |   `-- [01;34mtest[0m
                |   |       `-- [01;34mminitest[0m
                |   |           |-- [00mmetametameta.rb[0m
                |   |           |-- [00mtest_minitest_assertions.rb[0m
                |   |           |-- [00mtest_minitest_benchmark.rb[0m
                |   |           |-- [00mtest_minitest_mock.rb[0m
                |   |           |-- [00mtest_minitest_reporter.rb[0m
                |   |           |-- [00mtest_minitest_spec.rb[0m
                |   |           |-- [00mtest_minitest_test.rb[0m
                |   |           `-- [00mtest_minitest_test_task.rb[0m
                |   |-- [01;34mmsgpack-1.6.0[0m
                |   |   |-- [00mChangeLog[0m
                |   |   |-- [00mGemfile[0m
                |   |   |-- [00mLICENSE[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [00mRakefile[0m
                |   |   |-- [00mappveyor.yml[0m
                |   |   |-- [01;34mbench[0m
                |   |   |   `-- [00mbench.rb[0m
                |   |   |-- [01;34mbin[0m
                |   |   |   `-- [01;32mconsole[0m
                |   |   |-- [01;34mdoclib[0m
                |   |   |   |-- [01;34mmsgpack[0m
                |   |   |   |   |-- [00mbuffer.rb[0m
                |   |   |   |   |-- [00mcore_ext.rb[0m
                |   |   |   |   |-- [00merror.rb[0m
                |   |   |   |   |-- [00mextension_value.rb[0m
                |   |   |   |   |-- [00mfactory.rb[0m
                |   |   |   |   |-- [00mpacker.rb[0m
                |   |   |   |   |-- [00mtime.rb[0m
                |   |   |   |   |-- [00mtimestamp.rb[0m
                |   |   |   |   `-- [00munpacker.rb[0m
                |   |   |   `-- [00mmsgpack.rb[0m
                |   |   |-- [01;34mext[0m
                |   |   |   |-- [01;34mjava[0m
                |   |   |   |   `-- [01;34morg[0m
                |   |   |   |       `-- [01;34mmsgpack[0m
                |   |   |   |           `-- [01;34mjruby[0m
                |   |   |   |               |-- [00mBuffer.java[0m
                |   |   |   |               |-- [00mDecoder.java[0m
                |   |   |   |               |-- [00mEncoder.java[0m
                |   |   |   |               |-- [00mExtensionRegistry.java[0m
                |   |   |   |               |-- [00mExtensionValue.java[0m
                |   |   |   |               |-- [00mFactory.java[0m
                |   |   |   |               |-- [00mMessagePackLibrary.java[0m
                |   |   |   |               |-- [00mPacker.java[0m
                |   |   |   |               |-- [00mTypes.java[0m
                |   |   |   |               `-- [00mUnpacker.java[0m
                |   |   |   `-- [01;34mmsgpack[0m
                |   |   |       |-- [00mMakefile[0m
                |   |   |       |-- [00mbuffer.c[0m
                |   |   |       |-- [00mbuffer.h[0m
                |   |   |       |-- [00mbuffer.o[0m
                |   |   |       |-- [00mbuffer_class.c[0m
                |   |   |       |-- [00mbuffer_class.h[0m
                |   |   |       |-- [00mbuffer_class.o[0m
                |   |   |       |-- [00mcompat.h[0m
                |   |   |       |-- [00mextconf.rb[0m
                |   |   |       |-- [00mextension_value_class.c[0m
                |   |   |       |-- [00mextension_value_class.h[0m
                |   |   |       |-- [00mextension_value_class.o[0m
                |   |   |       |-- [00mfactory_class.c[0m
                |   |   |       |-- [00mfactory_class.h[0m
                |   |   |       |-- [00mfactory_class.o[0m
                |   |   |       |-- [01;32mmsgpack.so[0m
                |   |   |       |-- [00mpacker.c[0m
                |   |   |       |-- [00mpacker.h[0m
                |   |   |       |-- [00mpacker.o[0m
                |   |   |       |-- [00mpacker_class.c[0m
                |   |   |       |-- [00mpacker_class.h[0m
                |   |   |       |-- [00mpacker_class.o[0m
                |   |   |       |-- [00mpacker_ext_registry.c[0m
                |   |   |       |-- [00mpacker_ext_registry.h[0m
                |   |   |       |-- [00mpacker_ext_registry.o[0m
                |   |   |       |-- [00mrbinit.c[0m
                |   |   |       |-- [00mrbinit.o[0m
                |   |   |       |-- [00mrmem.c[0m
                |   |   |       |-- [00mrmem.h[0m
                |   |   |       |-- [00mrmem.o[0m
                |   |   |       |-- [00msysdep.h[0m
                |   |   |       |-- [00msysdep_endian.h[0m
                |   |   |       |-- [00msysdep_types.h[0m
                |   |   |       |-- [00munpacker.c[0m
                |   |   |       |-- [00munpacker.h[0m
                |   |   |       |-- [00munpacker.o[0m
                |   |   |       |-- [00munpacker_class.c[0m
                |   |   |       |-- [00munpacker_class.h[0m
                |   |   |       |-- [00munpacker_class.o[0m
                |   |   |       |-- [00munpacker_ext_registry.c[0m
                |   |   |       |-- [00munpacker_ext_registry.h[0m
                |   |   |       `-- [00munpacker_ext_registry.o[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34mmsgpack[0m
                |   |   |   |   |-- [00mbigint.rb[0m
                |   |   |   |   |-- [00mcore_ext.rb[0m
                |   |   |   |   |-- [00mfactory.rb[0m
                |   |   |   |   |-- [01;32mmsgpack.so[0m
                |   |   |   |   |-- [00mpacker.rb[0m
                |   |   |   |   |-- [00msymbol.rb[0m
                |   |   |   |   |-- [00mtime.rb[0m
                |   |   |   |   |-- [00mtimestamp.rb[0m
                |   |   |   |   |-- [00munpacker.rb[0m
                |   |   |   |   `-- [00mversion.rb[0m
                |   |   |   `-- [00mmsgpack.rb[0m
                |   |   |-- [00mmsgpack.gemspec[0m
                |   |   |-- [00mmsgpack.org.md[0m
                |   |   `-- [01;34mspec[0m
                |   |       |-- [00mbigint_spec.rb[0m
                |   |       |-- [00mcases.json[0m
                |   |       |-- [00mcases.msg[0m
                |   |       |-- [00mcases_compact.msg[0m
                |   |       |-- [00mcases_spec.rb[0m
                |   |       |-- [01;34mcruby[0m
                |   |       |   |-- [00mbuffer_io_spec.rb[0m
                |   |       |   |-- [00mbuffer_packer.rb[0m
                |   |       |   |-- [00mbuffer_spec.rb[0m
                |   |       |   |-- [00mbuffer_unpacker.rb[0m
                |   |       |   `-- [00munpacker_spec.rb[0m
                |   |       |-- [00mext_value_spec.rb[0m
                |   |       |-- [00mexttypes.rb[0m
                |   |       |-- [00mfactory_spec.rb[0m
                |   |       |-- [00mformat_spec.rb[0m
                |   |       |-- [01;34mjruby[0m
                |   |       |   |-- [01;34mbenchmarks[0m
                |   |       |   |   |-- [00mshootout_bm.rb[0m
                |   |       |   |   `-- [00msymbolize_keys_bm.rb[0m
                |   |       |   `-- [00munpacker_spec.rb[0m
                |   |       |-- [00mmsgpack_spec.rb[0m
                |   |       |-- [00mpack_spec.rb[0m
                |   |       |-- [00mpacker_spec.rb[0m
                |   |       |-- [00mrandom_compat.rb[0m
                |   |       |-- [00mspec_helper.rb[0m
                |   |       |-- [00mtimestamp_spec.rb[0m
                |   |       |-- [00munpack_spec.rb[0m
                |   |       `-- [00munpacker_spec.rb[0m
                |   |-- [01;34mnet-imap-0.3.4[0m
                |   |   |-- [00mGemfile[0m
                |   |   |-- [00mLICENSE.txt[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [00mRakefile[0m
                |   |   |-- [01;34mbenchmarks[0m
                |   |   |   |-- [00mstringprep.yml[0m
                |   |   |   `-- [00mtable-regexps.yml[0m
                |   |   |-- [01;34mdocs[0m
                |   |   |   `-- [00mstyles.css[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   `-- [01;34mnet[0m
                |   |   |       |-- [01;34mimap[0m
                |   |   |       |   |-- [01;34mauthenticators[0m
                |   |   |       |   |   |-- [00mcram_md5.rb[0m
                |   |   |       |   |   |-- [00mdigest_md5.rb[0m
                |   |   |       |   |   |-- [00mlogin.rb[0m
                |   |   |       |   |   |-- [00mplain.rb[0m
                |   |   |       |   |   `-- [00mxoauth2.rb[0m
                |   |   |       |   |-- [00mauthenticators.rb[0m
                |   |   |       |   |-- [00mcommand_data.rb[0m
                |   |   |       |   |-- [00mdata_encoding.rb[0m
                |   |   |       |   |-- [00merrors.rb[0m
                |   |   |       |   |-- [00mflags.rb[0m
                |   |   |       |   |-- [00mresponse_data.rb[0m
                |   |   |       |   |-- [00mresponse_parser.rb[0m
                |   |   |       |   |-- [01;34msasl[0m
                |   |   |       |   |   |-- [00msaslprep.rb[0m
                |   |   |       |   |   |-- [00msaslprep_tables.rb[0m
                |   |   |       |   |   |-- [00mstringprep.rb[0m
                |   |   |       |   |   `-- [00mstringprep_tables.rb[0m
                |   |   |       |   `-- [00msasl.rb[0m
                |   |   |       `-- [00mimap.rb[0m
                |   |   |-- [00mnet-imap.gemspec[0m
                |   |   `-- [01;34mrakelib[0m
                |   |       |-- [00mrdoc.rake[0m
                |   |       |-- [00mrfcs.rake[0m
                |   |       |-- [00msaslprep.rake[0m
                |   |       `-- [00mstring_prep_tables_generator.rb[0m
                |   |-- [01;34mnet-pop-0.1.2[0m
                |   |   |-- [00mGemfile[0m
                |   |   |-- [00mLICENSE.txt[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [00mRakefile[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   `-- [01;34mnet[0m
                |   |   |       `-- [00mpop.rb[0m
                |   |   `-- [00mnet-pop.gemspec[0m
                |   |-- [01;34mnet-protocol-0.2.1[0m
                |   |   |-- [00mGemfile[0m
                |   |   |-- [00mLICENSE.txt[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [00mRakefile[0m
                |   |   |-- [01;34mbin[0m
                |   |   |   |-- [01;32mconsole[0m
                |   |   |   `-- [01;32msetup[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   `-- [01;34mnet[0m
                |   |   |       `-- [00mprotocol.rb[0m
                |   |   `-- [00mnet-protocol.gemspec[0m
                |   |-- [01;34mnet-smtp-0.3.3[0m
                |   |   |-- [00mLICENSE.txt[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   `-- [01;34mnet[0m
                |   |   |       `-- [00msmtp.rb[0m
                |   |   `-- [00mnet-smtp.gemspec[0m
                |   |-- [01;34mnio4r-2.5.8[0m
                |   |   |-- [00mCHANGES.md[0m
                |   |   |-- [00mGemfile[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [00mRakefile[0m
                |   |   |-- [01;34mexamples[0m
                |   |   |   `-- [01;32mecho_server.rb[0m
                |   |   |-- [01;34mext[0m
                |   |   |   |-- [01;34mlibev[0m
                |   |   |   |   |-- [00mChanges[0m
                |   |   |   |   |-- [00mLICENSE[0m
                |   |   |   |   |-- [00mREADME[0m
                |   |   |   |   |-- [00mev.c[0m
                |   |   |   |   |-- [00mev.h[0m
                |   |   |   |   |-- [00mev_epoll.c[0m
                |   |   |   |   |-- [00mev_iouring.c[0m
                |   |   |   |   |-- [00mev_kqueue.c[0m
                |   |   |   |   |-- [00mev_linuxaio.c[0m
                |   |   |   |   |-- [00mev_poll.c[0m
                |   |   |   |   |-- [00mev_port.c[0m
                |   |   |   |   |-- [00mev_select.c[0m
                |   |   |   |   |-- [00mev_vars.h[0m
                |   |   |   |   |-- [00mev_win32.c[0m
                |   |   |   |   `-- [00mev_wrap.h[0m
                |   |   |   `-- [01;34mnio4r[0m
                |   |   |       |-- [00mMakefile[0m
                |   |   |       |-- [00mbytebuffer.c[0m
                |   |   |       |-- [00mbytebuffer.o[0m
                |   |   |       |-- [00mextconf.rb[0m
                |   |   |       |-- [00mlibev.h[0m
                |   |   |       |-- [00mmonitor.c[0m
                |   |   |       |-- [00mmonitor.o[0m
                |   |   |       |-- [00mnio4r.h[0m
                |   |   |       |-- [00mnio4r_ext.c[0m
                |   |   |       |-- [00mnio4r_ext.o[0m
                |   |   |       |-- [01;32mnio4r_ext.so[0m
                |   |   |       |-- [01;34morg[0m
                |   |   |       |   `-- [01;34mnio4r[0m
                |   |   |       |       |-- [00mByteBuffer.java[0m
                |   |   |       |       |-- [00mMonitor.java[0m
                |   |   |       |       |-- [00mNio4r.java[0m
                |   |   |       |       `-- [00mSelector.java[0m
                |   |   |       |-- [00mselector.c[0m
                |   |   |       `-- [00mselector.o[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34mnio[0m
                |   |   |   |   |-- [00mbytebuffer.rb[0m
                |   |   |   |   |-- [00mmonitor.rb[0m
                |   |   |   |   |-- [00mselector.rb[0m
                |   |   |   |   `-- [00mversion.rb[0m
                |   |   |   |-- [00mnio.rb[0m
                |   |   |   `-- [01;32mnio4r_ext.so[0m
                |   |   |-- [00mlogo.png[0m
                |   |   |-- [00mnio4r.gemspec[0m
                |   |   |-- [01;34mrakelib[0m
                |   |   |   |-- [00mextension.rake[0m
                |   |   |   |-- [00mrspec.rake[0m
                |   |   |   `-- [00mrubocop.rake[0m
                |   |   `-- [01;34mspec[0m
                |   |       |-- [01;34mnio[0m
                |   |       |   |-- [00macceptables_spec.rb[0m
                |   |       |   |-- [00mbytebuffer_spec.rb[0m
                |   |       |   |-- [00mmonitor_spec.rb[0m
                |   |       |   |-- [01;34mselectables[0m
                |   |       |   |   |-- [00mpipe_spec.rb[0m
                |   |       |   |   |-- [00mssl_socket_spec.rb[0m
                |   |       |   |   |-- [00mtcp_socket_spec.rb[0m
                |   |       |   |   `-- [00mudp_socket_spec.rb[0m
                |   |       |   `-- [00mselector_spec.rb[0m
                |   |       |-- [00mspec_helper.rb[0m
                |   |       `-- [01;34msupport[0m
                |   |           `-- [00mselectable_examples.rb[0m
                |   |-- [01;34mnokogiri-1.14.2-x86_64-linux[0m
                |   |   |-- [00mGemfile[0m
                |   |   |-- [00mLICENSE-DEPENDENCIES.md[0m
                |   |   |-- [00mLICENSE.md[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [01;34mbin[0m
                |   |   |   `-- [01;32mnokogiri[0m
                |   |   |-- [00mdependencies.yml[0m
                |   |   |-- [01;34mext[0m
                |   |   |   `-- [01;34mnokogiri[0m
                |   |   |       |-- [00mdepend[0m
                |   |   |       |-- [00mextconf.rb[0m
                |   |   |       |-- [00mgumbo.c[0m
                |   |   |       |-- [00mhtml4_document.c[0m
                |   |   |       |-- [00mhtml4_element_description.c[0m
                |   |   |       |-- [00mhtml4_entity_lookup.c[0m
                |   |   |       |-- [00mhtml4_sax_parser_context.c[0m
                |   |   |       |-- [00mhtml4_sax_push_parser.c[0m
                |   |   |       |-- [01;34minclude[0m
                |   |   |       |   |-- [01;34mlibexslt[0m
                |   |   |       |   |   |-- [00mexslt.h[0m
                |   |   |       |   |   |-- [00mexsltconfig.h[0m
                |   |   |       |   |   `-- [00mexsltexports.h[0m
                |   |   |       |   |-- [01;34mlibxml2[0m
                |   |   |       |   |   `-- [01;34mlibxml[0m
                |   |   |       |   |       |-- [00mHTMLparser.h[0m
                |   |   |       |   |       |-- [00mHTMLtree.h[0m
                |   |   |       |   |       |-- [00mSAX.h[0m
                |   |   |       |   |       |-- [00mSAX2.h[0m
                |   |   |       |   |       |-- [00mc14n.h[0m
                |   |   |       |   |       |-- [00mcatalog.h[0m
                |   |   |       |   |       |-- [00mchvalid.h[0m
                |   |   |       |   |       |-- [00mdebugXML.h[0m
                |   |   |       |   |       |-- [00mdict.h[0m
                |   |   |       |   |       |-- [00mencoding.h[0m
                |   |   |       |   |       |-- [00mentities.h[0m
                |   |   |       |   |       |-- [00mglobals.h[0m
                |   |   |       |   |       |-- [00mhash.h[0m
                |   |   |       |   |       |-- [00mlist.h[0m
                |   |   |       |   |       |-- [00mnanoftp.h[0m
                |   |   |       |   |       |-- [00mnanohttp.h[0m
                |   |   |       |   |       |-- [00mparser.h[0m
                |   |   |       |   |       |-- [00mparserInternals.h[0m
                |   |   |       |   |       |-- [00mpattern.h[0m
                |   |   |       |   |       |-- [00mrelaxng.h[0m
                |   |   |       |   |       |-- [00mschemasInternals.h[0m
                |   |   |       |   |       |-- [00mschematron.h[0m
                |   |   |       |   |       |-- [00mthreads.h[0m
                |   |   |       |   |       |-- [00mtree.h[0m
                |   |   |       |   |       |-- [00muri.h[0m
                |   |   |       |   |       |-- [00mvalid.h[0m
                |   |   |       |   |       |-- [00mxinclude.h[0m
                |   |   |       |   |       |-- [00mxlink.h[0m
                |   |   |       |   |       |-- [00mxmlIO.h[0m
                |   |   |       |   |       |-- [00mxmlautomata.h[0m
                |   |   |       |   |       |-- [00mxmlerror.h[0m
                |   |   |       |   |       |-- [00mxmlexports.h[0m
                |   |   |       |   |       |-- [00mxmlmemory.h[0m
                |   |   |       |   |       |-- [00mxmlmodule.h[0m
                |   |   |       |   |       |-- [00mxmlreader.h[0m
                |   |   |       |   |       |-- [00mxmlregexp.h[0m
                |   |   |       |   |       |-- [00mxmlsave.h[0m
                |   |   |       |   |       |-- [00mxmlschemas.h[0m
                |   |   |       |   |       |-- [00mxmlschemastypes.h[0m
                |   |   |       |   |       |-- [00mxmlstring.h[0m
                |   |   |       |   |       |-- [00mxmlunicode.h[0m
                |   |   |       |   |       |-- [00mxmlversion.h[0m
                |   |   |       |   |       |-- [00mxmlwriter.h[0m
                |   |   |       |   |       |-- [00mxpath.h[0m
                |   |   |       |   |       |-- [00mxpathInternals.h[0m
                |   |   |       |   |       `-- [00mxpointer.h[0m
                |   |   |       |   `-- [01;34mlibxslt[0m
                |   |   |       |       |-- [00mattributes.h[0m
                |   |   |       |       |-- [00mdocuments.h[0m
                |   |   |       |       |-- [00mextensions.h[0m
                |   |   |       |       |-- [00mextra.h[0m
                |   |   |       |       |-- [00mfunctions.h[0m
                |   |   |       |       |-- [00mimports.h[0m
                |   |   |       |       |-- [00mkeys.h[0m
                |   |   |       |       |-- [00mnamespaces.h[0m
                |   |   |       |       |-- [00mnumbersInternals.h[0m
                |   |   |       |       |-- [00mpattern.h[0m
                |   |   |       |       |-- [00mpreproc.h[0m
                |   |   |       |       |-- [00msecurity.h[0m
                |   |   |       |       |-- [00mtemplates.h[0m
                |   |   |       |       |-- [00mtransform.h[0m
                |   |   |       |       |-- [00mvariables.h[0m
                |   |   |       |       |-- [00mxslt.h[0m
                |   |   |       |       |-- [00mxsltInternals.h[0m
                |   |   |       |       |-- [00mxsltconfig.h[0m
                |   |   |       |       |-- [00mxsltexports.h[0m
                |   |   |       |       |-- [00mxsltlocale.h[0m
                |   |   |       |       `-- [00mxsltutils.h[0m
                |   |   |       |-- [00mlibxml2_backwards_compat.c[0m
                |   |   |       |-- [00mnokogiri.c[0m
                |   |   |       |-- [00mnokogiri.h[0m
                |   |   |       |-- [00mtest_global_handlers.c[0m
                |   |   |       |-- [00mxml_attr.c[0m
                |   |   |       |-- [00mxml_attribute_decl.c[0m
                |   |   |       |-- [00mxml_cdata.c[0m
                |   |   |       |-- [00mxml_comment.c[0m
                |   |   |       |-- [00mxml_document.c[0m
                |   |   |       |-- [00mxml_document_fragment.c[0m
                |   |   |       |-- [00mxml_dtd.c[0m
                |   |   |       |-- [00mxml_element_content.c[0m
                |   |   |       |-- [00mxml_element_decl.c[0m
                |   |   |       |-- [00mxml_encoding_handler.c[0m
                |   |   |       |-- [00mxml_entity_decl.c[0m
                |   |   |       |-- [00mxml_entity_reference.c[0m
                |   |   |       |-- [00mxml_namespace.c[0m
                |   |   |       |-- [00mxml_node.c[0m
                |   |   |       |-- [00mxml_node_set.c[0m
                |   |   |       |-- [00mxml_processing_instruction.c[0m
                |   |   |       |-- [00mxml_reader.c[0m
                |   |   |       |-- [00mxml_relax_ng.c[0m
                |   |   |       |-- [00mxml_sax_parser.c[0m
                |   |   |       |-- [00mxml_sax_parser_context.c[0m
                |   |   |       |-- [00mxml_sax_push_parser.c[0m
                |   |   |       |-- [00mxml_schema.c[0m
                |   |   |       |-- [00mxml_syntax_error.c[0m
                |   |   |       |-- [00mxml_text.c[0m
                |   |   |       |-- [00mxml_xpath_context.c[0m
                |   |   |       `-- [00mxslt_stylesheet.c[0m
                |   |   |-- [01;34mgumbo-parser[0m
                |   |   |   |-- [00mCHANGES.md[0m
                |   |   |   |-- [00mMakefile[0m
                |   |   |   `-- [00mTHANKS[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34mnokogiri[0m
                |   |       |   |-- [01;34m2.7[0m
                |   |       |   |   `-- [01;32mnokogiri.so[0m
                |   |       |   |-- [01;34m3.0[0m
                |   |       |   |   `-- [01;32mnokogiri.so[0m
                |   |       |   |-- [01;34m3.1[0m
                |   |       |   |   `-- [01;32mnokogiri.so[0m
                |   |       |   |-- [01;34m3.2[0m
                |   |       |   |   `-- [01;32mnokogiri.so[0m
                |   |       |   |-- [00mclass_resolver.rb[0m
                |   |       |   |-- [01;34mcss[0m
                |   |       |   |   |-- [00mnode.rb[0m
                |   |       |   |   |-- [00mparser.rb[0m
                |   |       |   |   |-- [00mparser.y[0m
                |   |       |   |   |-- [00mparser_extras.rb[0m
                |   |       |   |   |-- [00msyntax_error.rb[0m
                |   |       |   |   |-- [00mtokenizer.rb[0m
                |   |       |   |   |-- [00mtokenizer.rex[0m
                |   |       |   |   `-- [00mxpath_visitor.rb[0m
                |   |       |   |-- [00mcss.rb[0m
                |   |       |   |-- [01;34mdecorators[0m
                |   |       |   |   `-- [00mslop.rb[0m
                |   |       |   |-- [00mencoding_handler.rb[0m
                |   |       |   |-- [00mextension.rb[0m
                |   |       |   |-- [00mgumbo.rb[0m
                |   |       |   |-- [00mhtml.rb[0m
                |   |       |   |-- [01;34mhtml4[0m
                |   |       |   |   |-- [00mbuilder.rb[0m
                |   |       |   |   |-- [00mdocument.rb[0m
                |   |       |   |   |-- [00mdocument_fragment.rb[0m
                |   |       |   |   |-- [00melement_description.rb[0m
                |   |       |   |   |-- [00melement_description_defaults.rb[0m
                |   |       |   |   |-- [00mencoding_reader.rb[0m
                |   |       |   |   |-- [00mentity_lookup.rb[0m
                |   |       |   |   `-- [01;34msax[0m
                |   |       |   |       |-- [00mparser.rb[0m
                |   |       |   |       |-- [00mparser_context.rb[0m
                |   |       |   |       `-- [00mpush_parser.rb[0m
                |   |       |   |-- [00mhtml4.rb[0m
                |   |       |   |-- [01;34mhtml5[0m
                |   |       |   |   |-- [00mdocument.rb[0m
                |   |       |   |   |-- [00mdocument_fragment.rb[0m
                |   |       |   |   `-- [00mnode.rb[0m
                |   |       |   |-- [00mhtml5.rb[0m
                |   |       |   |-- [01;34mjruby[0m
                |   |       |   |   |-- [00mdependencies.rb[0m
                |   |       |   |   `-- [00mnokogiri_jars.rb[0m
                |   |       |   |-- [00msyntax_error.rb[0m
                |   |       |   |-- [01;34mversion[0m
                |   |       |   |   |-- [00mconstant.rb[0m
                |   |       |   |   `-- [00minfo.rb[0m
                |   |       |   |-- [00mversion.rb[0m
                |   |       |   |-- [01;34mxml[0m
                |   |       |   |   |-- [00mattr.rb[0m
                |   |       |   |   |-- [00mattribute_decl.rb[0m
                |   |       |   |   |-- [00mbuilder.rb[0m
                |   |       |   |   |-- [00mcdata.rb[0m
                |   |       |   |   |-- [00mcharacter_data.rb[0m
                |   |       |   |   |-- [00mdocument.rb[0m
                |   |       |   |   |-- [00mdocument_fragment.rb[0m
                |   |       |   |   |-- [00mdtd.rb[0m
                |   |       |   |   |-- [00melement_content.rb[0m
                |   |       |   |   |-- [00melement_decl.rb[0m
                |   |       |   |   |-- [00mentity_decl.rb[0m
                |   |       |   |   |-- [00mentity_reference.rb[0m
                |   |       |   |   |-- [00mnamespace.rb[0m
                |   |       |   |   |-- [01;34mnode[0m
                |   |       |   |   |   `-- [00msave_options.rb[0m
                |   |       |   |   |-- [00mnode.rb[0m
                |   |       |   |   |-- [00mnode_set.rb[0m
                |   |       |   |   |-- [00mnotation.rb[0m
                |   |       |   |   |-- [00mparse_options.rb[0m
                |   |       |   |   |-- [01;34mpp[0m
                |   |       |   |   |   |-- [00mcharacter_data.rb[0m
                |   |       |   |   |   `-- [00mnode.rb[0m
                |   |       |   |   |-- [00mpp.rb[0m
                |   |       |   |   |-- [00mprocessing_instruction.rb[0m
                |   |       |   |   |-- [00mreader.rb[0m
                |   |       |   |   |-- [00mrelax_ng.rb[0m
                |   |       |   |   |-- [01;34msax[0m
                |   |       |   |   |   |-- [00mdocument.rb[0m
                |   |       |   |   |   |-- [00mparser.rb[0m
                |   |       |   |   |   |-- [00mparser_context.rb[0m
                |   |       |   |   |   `-- [00mpush_parser.rb[0m
                |   |       |   |   |-- [00msax.rb[0m
                |   |       |   |   |-- [00mschema.rb[0m
                |   |       |   |   |-- [00msearchable.rb[0m
                |   |       |   |   |-- [00msyntax_error.rb[0m
                |   |       |   |   |-- [00mtext.rb[0m
                |   |       |   |   |-- [01;34mxpath[0m
                |   |       |   |   |   `-- [00msyntax_error.rb[0m
                |   |       |   |   |-- [00mxpath.rb[0m
                |   |       |   |   `-- [00mxpath_context.rb[0m
                |   |       |   |-- [00mxml.rb[0m
                |   |       |   |-- [01;34mxslt[0m
                |   |       |   |   `-- [00mstylesheet.rb[0m
                |   |       |   `-- [00mxslt.rb[0m
                |   |       |-- [00mnokogiri.rb[0m
                |   |       `-- [01;34mxsd[0m
                |   |           `-- [01;34mxmlparser[0m
                |   |               `-- [00mnokogiri.rb[0m
                |   |-- [01;34mpublic_suffix-5.0.1[0m
                |   |   |-- [00m2.0-Upgrade.md[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mGemfile[0m
                |   |   |-- [00mLICENSE.txt[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [00mRakefile[0m
                |   |   |-- [00mSECURITY.md[0m
                |   |   |-- [01;34mbin[0m
                |   |   |   `-- [01;32mconsole[0m
                |   |   |-- [01;34mdata[0m
                |   |   |   `-- [00mlist.txt[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34mpublic_suffix[0m
                |   |   |   |   |-- [00mdomain.rb[0m
                |   |   |   |   |-- [00merrors.rb[0m
                |   |   |   |   |-- [00mlist.rb[0m
                |   |   |   |   |-- [00mrule.rb[0m
                |   |   |   |   `-- [00mversion.rb[0m
                |   |   |   `-- [00mpublic_suffix.rb[0m
                |   |   |-- [00mpublic_suffix.gemspec[0m
                |   |   `-- [01;34mtest[0m
                |   |       |-- [00macceptance_test.rb[0m
                |   |       |-- [01;34mbenchmarks[0m
                |   |       |   |-- [00mbm_find.rb[0m
                |   |       |   |-- [00mbm_find_all.rb[0m
                |   |       |   |-- [00mbm_names.rb[0m
                |   |       |   |-- [00mbm_select.rb[0m
                |   |       |   |-- [00mbm_select_incremental.rb[0m
                |   |       |   `-- [00mbm_valid.rb[0m
                |   |       |-- [01;34mprofilers[0m
                |   |       |   |-- [00mdomain_profiler.rb[0m
                |   |       |   |-- [00mfind_profiler.rb[0m
                |   |       |   |-- [00mfind_profiler_jp.rb[0m
                |   |       |   |-- [00minitialization_profiler.rb[0m
                |   |       |   |-- [00mlist_profsize.rb[0m
                |   |       |   `-- [00mobject_binsize.rb[0m
                |   |       |-- [00mpsl_test.rb[0m
                |   |       |-- [00mtest_helper.rb[0m
                |   |       |-- [00mtests.txt[0m
                |   |       `-- [01;34munit[0m
                |   |           |-- [00mdomain_test.rb[0m
                |   |           |-- [00merrors_test.rb[0m
                |   |           |-- [00mlist_test.rb[0m
                |   |           |-- [00mpublic_suffix_test.rb[0m
                |   |           `-- [00mrule_test.rb[0m
                |   |-- [01;34mpuma-5.6.5[0m
                |   |   |-- [01;32mHistory.md[0m
                |   |   |-- [01;32mLICENSE[0m
                |   |   |-- [01;32mREADME.md[0m
                |   |   |-- [01;34mbin[0m
                |   |   |   |-- [01;32mpuma[0m
                |   |   |   |-- [01;32mpuma-wild[0m
                |   |   |   `-- [01;32mpumactl[0m
                |   |   |-- [01;34mdocs[0m
                |   |   |   |-- [01;32marchitecture.md[0m
                |   |   |   |-- [01;32mcompile_options.md[0m
                |   |   |   |-- [01;32mdeployment.md[0m
                |   |   |   |-- [01;32mfork_worker.md[0m
                |   |   |   |-- [01;34mimages[0m
                |   |   |   |   |-- [01;32mpuma-connection-flow-no-reactor.png[0m
                |   |   |   |   |-- [01;32mpuma-connection-flow.png[0m
                |   |   |   |   `-- [01;32mpuma-general-arch.png[0m
                |   |   |   |-- [01;34mjungle[0m
                |   |   |   |   |-- [01;32mREADME.md[0m
                |   |   |   |   `-- [01;34mrc.d[0m
                |   |   |   |       |-- [01;32mREADME.md[0m
                |   |   |   |       |-- [01;32mpuma[0m
                |   |   |   |       `-- [01;32mpuma.conf[0m
                |   |   |   |-- [01;32mkubernetes.md[0m
                |   |   |   |-- [01;32mnginx.md[0m
                |   |   |   |-- [01;32mplugins.md[0m
                |   |   |   |-- [01;32mrails_dev_mode.md[0m
                |   |   |   |-- [01;32mrestart.md[0m
                |   |   |   |-- [01;32msignals.md[0m
                |   |   |   |-- [01;32mstats.md[0m
                |   |   |   `-- [01;32msystemd.md[0m
                |   |   |-- [01;34mext[0m
                |   |   |   `-- [01;34mpuma_http11[0m
                |   |   |       |-- [00mMakefile[0m
                |   |   |       |-- [01;32mPumaHttp11Service.java[0m
                |   |   |       |-- [01;32mext_help.h[0m
                |   |   |       |-- [01;32mextconf.rb[0m
                |   |   |       |-- [01;32mhttp11_parser.c[0m
                |   |   |       |-- [01;32mhttp11_parser.h[0m
                |   |   |       |-- [01;32mhttp11_parser.java.rl[0m
                |   |   |       |-- [00mhttp11_parser.o[0m
                |   |   |       |-- [01;32mhttp11_parser.rl[0m
                |   |   |       |-- [01;32mhttp11_parser_common.rl[0m
                |   |   |       |-- [01;32mmini_ssl.c[0m
                |   |   |       |-- [00mmini_ssl.o[0m
                |   |   |       |-- [01;34mno_ssl[0m
                |   |   |       |   `-- [01;32mPumaHttp11Service.java[0m
                |   |   |       |-- [01;34morg[0m
                |   |   |       |   `-- [01;34mjruby[0m
                |   |   |       |       `-- [01;34mpuma[0m
                |   |   |       |           |-- [01;32mHttp11.java[0m
                |   |   |       |           |-- [01;32mHttp11Parser.java[0m
                |   |   |       |           `-- [01;32mMiniSSL.java[0m
                |   |   |       |-- [01;32mpuma_http11.c[0m
                |   |   |       |-- [00mpuma_http11.o[0m
                |   |   |       `-- [01;32mpuma_http11.so[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34mpuma[0m
                |   |   |   |   |-- [01;34mapp[0m
                |   |   |   |   |   `-- [01;32mstatus.rb[0m
                |   |   |   |   |-- [01;32mbinder.rb[0m
                |   |   |   |   |-- [01;32mcli.rb[0m
                |   |   |   |   |-- [01;32mclient.rb[0m
                |   |   |   |   |-- [01;34mcluster[0m
                |   |   |   |   |   |-- [01;32mworker.rb[0m
                |   |   |   |   |   `-- [01;32mworker_handle.rb[0m
                |   |   |   |   |-- [01;32mcluster.rb[0m
                |   |   |   |   |-- [01;32mcommonlogger.rb[0m
                |   |   |   |   |-- [01;32mconfiguration.rb[0m
                |   |   |   |   |-- [01;32mconst.rb[0m
                |   |   |   |   |-- [01;32mcontrol_cli.rb[0m
                |   |   |   |   |-- [01;32mdetect.rb[0m
                |   |   |   |   |-- [01;32mdsl.rb[0m
                |   |   |   |   |-- [01;32merror_logger.rb[0m
                |   |   |   |   |-- [01;32mevents.rb[0m
                |   |   |   |   |-- [01;32mio_buffer.rb[0m
                |   |   |   |   |-- [01;32mjruby_restart.rb[0m
                |   |   |   |   |-- [01;32mjson_serialization.rb[0m
                |   |   |   |   |-- [01;32mlauncher.rb[0m
                |   |   |   |   |-- [01;34mminissl[0m
                |   |   |   |   |   `-- [01;32mcontext_builder.rb[0m
                |   |   |   |   |-- [01;32mminissl.rb[0m
                |   |   |   |   |-- [01;32mnull_io.rb[0m
                |   |   |   |   |-- [01;34mplugin[0m
                |   |   |   |   |   `-- [01;32mtmp_restart.rb[0m
                |   |   |   |   |-- [01;32mplugin.rb[0m
                |   |   |   |   |-- [01;32mpuma_http11.so[0m
                |   |   |   |   |-- [01;32mqueue_close.rb[0m
                |   |   |   |   |-- [01;34mrack[0m
                |   |   |   |   |   |-- [01;32mbuilder.rb[0m
                |   |   |   |   |   `-- [01;32murlmap.rb[0m
                |   |   |   |   |-- [01;32mrack_default.rb[0m
                |   |   |   |   |-- [01;32mreactor.rb[0m
                |   |   |   |   |-- [01;32mrequest.rb[0m
                |   |   |   |   |-- [01;32mrunner.rb[0m
                |   |   |   |   |-- [01;32mserver.rb[0m
                |   |   |   |   |-- [01;32msingle.rb[0m
                |   |   |   |   |-- [01;32mstate_file.rb[0m
                |   |   |   |   |-- [01;32msystemd.rb[0m
                |   |   |   |   |-- [01;32mthread_pool.rb[0m
                |   |   |   |   `-- [01;32mutil.rb[0m
                |   |   |   |-- [01;32mpuma.rb[0m
                |   |   |   `-- [01;34mrack[0m
                |   |   |       `-- [01;34mhandler[0m
                |   |   |           `-- [01;32mpuma.rb[0m
                |   |   `-- [01;34mtools[0m
                |   |       |-- [01;32mDockerfile[0m
                |   |       `-- [01;32mtrickletest.rb[0m
                |   |-- [01;34mracc-1.6.2[0m
                |   |   |-- [00mCOPYING[0m
                |   |   |-- [00mChangeLog[0m
                |   |   |-- [00mREADME.ja.rdoc[0m
                |   |   |-- [00mREADME.rdoc[0m
                |   |   |-- [00mTODO[0m
                |   |   |-- [01;34mbin[0m
                |   |   |   `-- [01;32mracc[0m
                |   |   |-- [01;34mdoc[0m
                |   |   |   |-- [01;34men[0m
                |   |   |   |   |-- [00mNEWS.en.rdoc[0m
                |   |   |   |   |-- [00mgrammar.en.rdoc[0m
                |   |   |   |   `-- [00mgrammar2.en.rdoc[0m
                |   |   |   `-- [01;34mja[0m
                |   |   |       |-- [00mNEWS.ja.rdoc[0m
                |   |   |       |-- [00mcommand.ja.html[0m
                |   |   |       |-- [00mdebug.ja.rdoc[0m
                |   |   |       |-- [00mgrammar.ja.rdoc[0m
                |   |   |       |-- [00mindex.ja.html[0m
                |   |   |       |-- [00mparser.ja.rdoc[0m
                |   |   |       `-- [00musage.ja.html[0m
                |   |   |-- [01;34mext[0m
                |   |   |   `-- [01;34mracc[0m
                |   |   |       |-- [00mMANIFEST[0m
                |   |   |       `-- [01;34mcparse[0m
                |   |   |           |-- [00mMakefile[0m
                |   |   |           |-- [00mcparse.c[0m
                |   |   |           |-- [00mcparse.o[0m
                |   |   |           |-- [01;32mcparse.so[0m
                |   |   |           `-- [00mextconf.rb[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34mracc[0m
                |   |       |   |-- [00mcompat.rb[0m
                |   |       |   |-- [01;32mcparse.so[0m
                |   |       |   |-- [00mdebugflags.rb[0m
                |   |       |   |-- [00mexception.rb[0m
                |   |       |   |-- [00mgrammar.rb[0m
                |   |       |   |-- [00mgrammarfileparser.rb[0m
                |   |       |   |-- [00minfo.rb[0m
                |   |       |   |-- [00miset.rb[0m
                |   |       |   |-- [00mlogfilegenerator.rb[0m
                |   |       |   |-- [00mparser-text.rb[0m
                |   |       |   |-- [00mparser.rb[0m
                |   |       |   |-- [00mparserfilegenerator.rb[0m
                |   |       |   |-- [00msourcetext.rb[0m
                |   |       |   |-- [00mstate.rb[0m
                |   |       |   |-- [00mstatetransitiontable.rb[0m
                |   |       |   `-- [00mstatic.rb[0m
                |   |       `-- [00mracc.rb[0m
                |   |-- [01;34mrack-2.2.6.2[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mCONTRIBUTING.md[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.rdoc[0m
                |   |   |-- [00mRakefile[0m
                |   |   |-- [00mSPEC.rdoc[0m
                |   |   |-- [01;34mbin[0m
                |   |   |   `-- [01;32mrackup[0m
                |   |   |-- [01;34mcontrib[0m
                |   |   |   |-- [00mrack.png[0m
                |   |   |   |-- [00mrack.svg[0m
                |   |   |   |-- [00mrack_logo.svg[0m
                |   |   |   `-- [00mrdoc.css[0m
                |   |   |-- [01;34mexample[0m
                |   |   |   |-- [00mlobster.ru[0m
                |   |   |   |-- [00mprotectedlobster.rb[0m
                |   |   |   `-- [00mprotectedlobster.ru[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34mrack[0m
                |   |   |   |   |-- [01;34mauth[0m
                |   |   |   |   |   |-- [01;34mabstract[0m
                |   |   |   |   |   |   |-- [00mhandler.rb[0m
                |   |   |   |   |   |   `-- [00mrequest.rb[0m
                |   |   |   |   |   |-- [00mbasic.rb[0m
                |   |   |   |   |   `-- [01;34mdigest[0m
                |   |   |   |   |       |-- [00mmd5.rb[0m
                |   |   |   |   |       |-- [00mnonce.rb[0m
                |   |   |   |   |       |-- [00mparams.rb[0m
                |   |   |   |   |       `-- [00mrequest.rb[0m
                |   |   |   |   |-- [00mbody_proxy.rb[0m
                |   |   |   |   |-- [00mbuilder.rb[0m
                |   |   |   |   |-- [00mcascade.rb[0m
                |   |   |   |   |-- [00mchunked.rb[0m
                |   |   |   |   |-- [00mcommon_logger.rb[0m
                |   |   |   |   |-- [00mconditional_get.rb[0m
                |   |   |   |   |-- [00mconfig.rb[0m
                |   |   |   |   |-- [00mcontent_length.rb[0m
                |   |   |   |   |-- [00mcontent_type.rb[0m
                |   |   |   |   |-- [01;34mcore_ext[0m
                |   |   |   |   |   `-- [00mregexp.rb[0m
                |   |   |   |   |-- [00mdeflater.rb[0m
                |   |   |   |   |-- [00mdirectory.rb[0m
                |   |   |   |   |-- [00metag.rb[0m
                |   |   |   |   |-- [00mevents.rb[0m
                |   |   |   |   |-- [00mfile.rb[0m
                |   |   |   |   |-- [00mfiles.rb[0m
                |   |   |   |   |-- [01;34mhandler[0m
                |   |   |   |   |   |-- [00mcgi.rb[0m
                |   |   |   |   |   |-- [00mfastcgi.rb[0m
                |   |   |   |   |   |-- [00mlsws.rb[0m
                |   |   |   |   |   |-- [00mscgi.rb[0m
                |   |   |   |   |   |-- [00mthin.rb[0m
                |   |   |   |   |   `-- [00mwebrick.rb[0m
                |   |   |   |   |-- [00mhandler.rb[0m
                |   |   |   |   |-- [00mhead.rb[0m
                |   |   |   |   |-- [00mlint.rb[0m
                |   |   |   |   |-- [00mlobster.rb[0m
                |   |   |   |   |-- [00mlock.rb[0m
                |   |   |   |   |-- [00mlogger.rb[0m
                |   |   |   |   |-- [00mmedia_type.rb[0m
                |   |   |   |   |-- [00mmethod_override.rb[0m
                |   |   |   |   |-- [00mmime.rb[0m
                |   |   |   |   |-- [00mmock.rb[0m
                |   |   |   |   |-- [01;34mmultipart[0m
                |   |   |   |   |   |-- [00mgenerator.rb[0m
                |   |   |   |   |   |-- [00mparser.rb[0m
                |   |   |   |   |   `-- [00muploaded_file.rb[0m
                |   |   |   |   |-- [00mmultipart.rb[0m
                |   |   |   |   |-- [00mnull_logger.rb[0m
                |   |   |   |   |-- [00mquery_parser.rb[0m
                |   |   |   |   |-- [00mrecursive.rb[0m
                |   |   |   |   |-- [00mreloader.rb[0m
                |   |   |   |   |-- [00mrequest.rb[0m
                |   |   |   |   |-- [00mresponse.rb[0m
                |   |   |   |   |-- [00mrewindable_input.rb[0m
                |   |   |   |   |-- [00mruntime.rb[0m
                |   |   |   |   |-- [00msendfile.rb[0m
                |   |   |   |   |-- [00mserver.rb[0m
                |   |   |   |   |-- [01;34msession[0m
                |   |   |   |   |   |-- [01;34mabstract[0m
                |   |   |   |   |   |   `-- [00mid.rb[0m
                |   |   |   |   |   |-- [00mcookie.rb[0m
                |   |   |   |   |   |-- [00mmemcache.rb[0m
                |   |   |   |   |   `-- [00mpool.rb[0m
                |   |   |   |   |-- [00mshow_exceptions.rb[0m
                |   |   |   |   |-- [00mshow_status.rb[0m
                |   |   |   |   |-- [00mstatic.rb[0m
                |   |   |   |   |-- [00mtempfile_reaper.rb[0m
                |   |   |   |   |-- [00murlmap.rb[0m
                |   |   |   |   |-- [00mutils.rb[0m
                |   |   |   |   `-- [00mversion.rb[0m
                |   |   |   `-- [00mrack.rb[0m
                |   |   `-- [00mrack.gemspec[0m
                |   |-- [01;34mrack-test-2.0.2[0m
                |   |   |-- [00mHistory.md[0m
                |   |   |-- [00mMIT-LICENSE.txt[0m
                |   |   |-- [00mREADME.md[0m
                |   |   `-- [01;34mlib[0m
                |   |       `-- [01;34mrack[0m
                |   |           |-- [00mmock_session.rb[0m
                |   |           |-- [01;34mtest[0m
                |   |           |   |-- [00mcookie_jar.rb[0m
                |   |           |   |-- [00mmethods.rb[0m
                |   |           |   |-- [00mmock_digest_request.rb[0m
                |   |           |   |-- [00muploaded_file.rb[0m
                |   |           |   |-- [00mutils.rb[0m
                |   |           |   `-- [00mversion.rb[0m
                |   |           `-- [00mtest.rb[0m
                |   |-- [01;34mrails-7.0.4.2[0m
                |   |   `-- [00mREADME.md[0m
                |   |-- [01;34mrails-dom-testing-2.0.3[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34mrails[0m
                |   |   |   |   `-- [01;34mdom[0m
                |   |   |   |       `-- [01;34mtesting[0m
                |   |   |   |           |-- [01;34massertions[0m
                |   |   |   |           |   |-- [00mdom_assertions.rb[0m
                |   |   |   |           |   |-- [01;34mselector_assertions[0m
                |   |   |   |           |   |   |-- [00mcount_describable.rb[0m
                |   |   |   |           |   |   |-- [00mhtml_selector.rb[0m
                |   |   |   |           |   |   `-- [00msubstitution_context.rb[0m
                |   |   |   |           |   `-- [00mselector_assertions.rb[0m
                |   |   |   |           |-- [00massertions.rb[0m
                |   |   |   |           `-- [00mversion.rb[0m
                |   |   |   `-- [00mrails-dom-testing.rb[0m
                |   |   `-- [01;34mtest[0m
                |   |       |-- [00mdom_assertions_test.rb[0m
                |   |       |-- [00mselector_assertions_test.rb[0m
                |   |       `-- [00mtest_helper.rb[0m
                |   |-- [01;34mrails-html-sanitizer-1.5.0[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34mrails[0m
                |   |   |   |   `-- [01;34mhtml[0m
                |   |   |   |       |-- [01;34msanitizer[0m
                |   |   |   |       |   `-- [00mversion.rb[0m
                |   |   |   |       |-- [00msanitizer.rb[0m
                |   |   |   |       `-- [00mscrubbers.rb[0m
                |   |   |   `-- [00mrails-html-sanitizer.rb[0m
                |   |   `-- [01;34mtest[0m
                |   |       |-- [00msanitizer_test.rb[0m
                |   |       `-- [00mscrubbers_test.rb[0m
                |   |-- [01;34mrailties-7.0.4.2[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mRDOC_MAIN.rdoc[0m
                |   |   |-- [00mREADME.rdoc[0m
                |   |   |-- [01;34mexe[0m
                |   |   |   `-- [01;32mrails[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34mminitest[0m
                |   |       |   `-- [00mrails_plugin.rb[0m
                |   |       |-- [01;34mrails[0m
                |   |       |   |-- [00mall.rb[0m
                |   |       |   |-- [01;34mapi[0m
                |   |       |   |   |-- [00mgenerator.rb[0m
                |   |       |   |   `-- [00mtask.rb[0m
                |   |       |   |-- [00mapp_loader.rb[0m
                |   |       |   |-- [00mapp_updater.rb[0m
                |   |       |   |-- [01;34mapplication[0m
                |   |       |   |   |-- [00mbootstrap.rb[0m
                |   |       |   |   |-- [00mconfiguration.rb[0m
                |   |       |   |   |-- [00mdefault_middleware_stack.rb[0m
                |   |       |   |   |-- [00mdummy_erb_compiler.rb[0m
                |   |       |   |   |-- [00mfinisher.rb[0m
                |   |       |   |   `-- [00mroutes_reloader.rb[0m
                |   |       |   |-- [00mapplication.rb[0m
                |   |       |   |-- [00mapplication_controller.rb[0m
                |   |       |   |-- [01;34mautoloaders[0m
                |   |       |   |   `-- [00minflector.rb[0m
                |   |       |   |-- [00mautoloaders.rb[0m
                |   |       |   |-- [00mbacktrace_cleaner.rb[0m
                |   |       |   |-- [00mcli.rb[0m
                |   |       |   |-- [00mcode_statistics.rb[0m
                |   |       |   |-- [00mcode_statistics_calculator.rb[0m
                |   |       |   |-- [01;34mcommand[0m
                |   |       |   |   |-- [00mactions.rb[0m
                |   |       |   |   |-- [00mbase.rb[0m
                |   |       |   |   |-- [00mbehavior.rb[0m
                |   |       |   |   |-- [00menvironment_argument.rb[0m
                |   |       |   |   `-- [01;34mhelpers[0m
                |   |       |   |       `-- [00meditor.rb[0m
                |   |       |   |-- [00mcommand.rb[0m
                |   |       |   |-- [01;34mcommands[0m
                |   |       |   |   |-- [01;34mapplication[0m
                |   |       |   |   |   `-- [00mapplication_command.rb[0m
                |   |       |   |   |-- [01;34mconsole[0m
                |   |       |   |   |   `-- [00mconsole_command.rb[0m
                |   |       |   |   |-- [01;34mcredentials[0m
                |   |       |   |   |   |-- [00mUSAGE[0m
                |   |       |   |   |   |-- [01;34mcredentials_command[0m
                |   |       |   |   |   |   `-- [00mdiffing.rb[0m
                |   |       |   |   |   `-- [00mcredentials_command.rb[0m
                |   |       |   |   |-- [01;34mdb[0m
                |   |       |   |   |   `-- [01;34msystem[0m
                |   |       |   |   |       `-- [01;34mchange[0m
                |   |       |   |   |           `-- [00mchange_command.rb[0m
                |   |       |   |   |-- [01;34mdbconsole[0m
                |   |       |   |   |   `-- [00mdbconsole_command.rb[0m
                |   |       |   |   |-- [01;34mdestroy[0m
                |   |       |   |   |   `-- [00mdestroy_command.rb[0m
                |   |       |   |   |-- [01;34mdev[0m
                |   |       |   |   |   `-- [00mdev_command.rb[0m
                |   |       |   |   |-- [01;34mencrypted[0m
                |   |       |   |   |   |-- [00mUSAGE[0m
                |   |       |   |   |   `-- [00mencrypted_command.rb[0m
                |   |       |   |   |-- [01;34mgenerate[0m
                |   |       |   |   |   `-- [00mgenerate_command.rb[0m
                |   |       |   |   |-- [01;34mhelp[0m
                |   |       |   |   |   |-- [00mUSAGE[0m
                |   |       |   |   |   `-- [00mhelp_command.rb[0m
                |   |       |   |   |-- [01;34minitializers[0m
                |   |       |   |   |   `-- [00minitializers_command.rb[0m
                |   |       |   |   |-- [01;34mnew[0m
                |   |       |   |   |   `-- [00mnew_command.rb[0m
                |   |       |   |   |-- [01;34mnotes[0m
                |   |       |   |   |   `-- [00mnotes_command.rb[0m
                |   |       |   |   |-- [01;34mplugin[0m
                |   |       |   |   |   `-- [00mplugin_command.rb[0m
                |   |       |   |   |-- [01;34mrake[0m
                |   |       |   |   |   `-- [00mrake_command.rb[0m
                |   |       |   |   |-- [01;34mroutes[0m
                |   |       |   |   |   `-- [00mroutes_command.rb[0m
                |   |       |   |   |-- [01;34mrunner[0m
                |   |       |   |   |   |-- [00mUSAGE[0m
                |   |       |   |   |   `-- [00mrunner_command.rb[0m
                |   |       |   |   |-- [01;34msecrets[0m
                |   |       |   |   |   |-- [00mUSAGE[0m
                |   |       |   |   |   `-- [00msecrets_command.rb[0m
                |   |       |   |   |-- [01;34mserver[0m
                |   |       |   |   |   `-- [00mserver_command.rb[0m
                |   |       |   |   |-- [01;34mtest[0m
                |   |       |   |   |   `-- [00mtest_command.rb[0m
                |   |       |   |   `-- [01;34mversion[0m
                |   |       |   |       `-- [00mversion_command.rb[0m
                |   |       |   |-- [00mcommands.rb[0m
                |   |       |   |-- [00mconfiguration.rb[0m
                |   |       |   |-- [01;34mconsole[0m
                |   |       |   |   |-- [00mapp.rb[0m
                |   |       |   |   `-- [00mhelpers.rb[0m
                |   |       |   |-- [00mdev_caching.rb[0m
                |   |       |   |-- [01;34mengine[0m
                |   |       |   |   |-- [00mcommands.rb[0m
                |   |       |   |   |-- [00mconfiguration.rb[0m
                |   |       |   |   |-- [00mrailties.rb[0m
                |   |       |   |   `-- [00mupdater.rb[0m
                |   |       |   |-- [00mengine.rb[0m
                |   |       |   |-- [00mgem_version.rb[0m
                |   |       |   |-- [01;34mgenerators[0m
                |   |       |   |   |-- [01;34mactions[0m
                |   |       |   |   |   `-- [00mcreate_migration.rb[0m
                |   |       |   |   |-- [00mactions.rb[0m
                |   |       |   |   |-- [00mactive_model.rb[0m
                |   |       |   |   |-- [00mapp_base.rb[0m
                |   |       |   |   |-- [00mapp_name.rb[0m
                |   |       |   |   |-- [00mbase.rb[0m
                |   |       |   |   |-- [00mdatabase.rb[0m
                |   |       |   |   |-- [01;34merb[0m
                |   |       |   |   |   |-- [01;34mcontroller[0m
                |   |       |   |   |   |   |-- [00mcontroller_generator.rb[0m
                |   |       |   |   |   |   `-- [01;34mtemplates[0m
                |   |       |   |   |   |       `-- [00mview.html.erb.tt[0m
                |   |       |   |   |   |-- [01;34mmailer[0m
                |   |       |   |   |   |   |-- [00mmailer_generator.rb[0m
                |   |       |   |   |   |   `-- [01;34mtemplates[0m
                |   |       |   |   |   |       |-- [00mlayout.html.erb.tt[0m
                |   |       |   |   |   |       |-- [00mlayout.text.erb.tt[0m
                |   |       |   |   |   |       |-- [00mview.html.erb.tt[0m
                |   |       |   |   |   |       `-- [00mview.text.erb.tt[0m
                |   |       |   |   |   `-- [01;34mscaffold[0m
                |   |       |   |   |       |-- [00mscaffold_generator.rb[0m
                |   |       |   |   |       `-- [01;34mtemplates[0m
                |   |       |   |   |           |-- [00m_form.html.erb.tt[0m
                |   |       |   |   |           |-- [00medit.html.erb.tt[0m
                |   |       |   |   |           |-- [00mindex.html.erb.tt[0m
                |   |       |   |   |           |-- [00mnew.html.erb.tt[0m
                |   |       |   |   |           |-- [00mpartial.html.erb.tt[0m
                |   |       |   |   |           `-- [00mshow.html.erb.tt[0m
                |   |       |   |   |-- [00merb.rb[0m
                |   |       |   |   |-- [00mgenerated_attribute.rb[0m
                |   |       |   |   |-- [00mmigration.rb[0m
                |   |       |   |   |-- [00mmodel_helpers.rb[0m
                |   |       |   |   |-- [00mnamed_base.rb[0m
                |   |       |   |   |-- [01;34mrails[0m
                |   |       |   |   |   |-- [01;34mapp[0m
                |   |       |   |   |   |   |-- [00mUSAGE[0m
                |   |       |   |   |   |   |-- [00mapp_generator.rb[0m
                |   |       |   |   |   |   `-- [01;34mtemplates[0m
                |   |       |   |   |   |       |-- [00mGemfile.tt[0m
                |   |       |   |   |   |       |-- [00mREADME.md.tt[0m
                |   |       |   |   |   |       |-- [00mRakefile.tt[0m
                |   |       |   |   |   |       |-- [01;34mapp[0m
                |   |       |   |   |   |       |   |-- [01;34massets[0m
                |   |       |   |   |   |       |   |   |-- [01;34mconfig[0m
                |   |       |   |   |   |       |   |   |   `-- [00mmanifest.js.tt[0m
                |   |       |   |   |   |       |   |   `-- [01;34mstylesheets[0m
                |   |       |   |   |   |       |   |       `-- [00mapplication.css.tt[0m
                |   |       |   |   |   |       |   |-- [01;34mchannels[0m
                |   |       |   |   |   |       |   |   `-- [01;34mapplication_cable[0m
                |   |       |   |   |   |       |   |       |-- [00mchannel.rb.tt[0m
                |   |       |   |   |   |       |   |       `-- [00mconnection.rb.tt[0m
                |   |       |   |   |   |       |   |-- [01;34mcontrollers[0m
                |   |       |   |   |   |       |   |   `-- [00mapplication_controller.rb.tt[0m
                |   |       |   |   |   |       |   |-- [01;34mhelpers[0m
                |   |       |   |   |   |       |   |   `-- [00mapplication_helper.rb.tt[0m
                |   |       |   |   |   |       |   |-- [01;34mjobs[0m
                |   |       |   |   |   |       |   |   `-- [00mapplication_job.rb.tt[0m
                |   |       |   |   |   |       |   |-- [01;34mmailers[0m
                |   |       |   |   |   |       |   |   `-- [00mapplication_mailer.rb.tt[0m
                |   |       |   |   |   |       |   |-- [01;34mmodels[0m
                |   |       |   |   |   |       |   |   `-- [00mapplication_record.rb.tt[0m
                |   |       |   |   |   |       |   `-- [01;34mviews[0m
                |   |       |   |   |   |       |       `-- [01;34mlayouts[0m
                |   |       |   |   |   |       |           |-- [00mapplication.html.erb.tt[0m
                |   |       |   |   |   |       |           |-- [00mmailer.html.erb.tt[0m
                |   |       |   |   |   |       |           `-- [00mmailer.text.erb.tt[0m
                |   |       |   |   |   |       |-- [01;34mbin[0m
                |   |       |   |   |   |       |   |-- [00mrails.tt[0m
                |   |       |   |   |   |       |   |-- [00mrake.tt[0m
                |   |       |   |   |   |       |   `-- [00msetup.tt[0m
                |   |       |   |   |   |       |-- [01;34mconfig[0m
                |   |       |   |   |   |       |   |-- [00mapplication.rb.tt[0m
                |   |       |   |   |   |       |   |-- [00mboot.rb.tt[0m
                |   |       |   |   |   |       |   |-- [00mcable.yml.tt[0m
                |   |       |   |   |   |       |   |-- [01;34mdatabases[0m
                |   |       |   |   |   |       |   |   |-- [00mjdbc.yml.tt[0m
                |   |       |   |   |   |       |   |   |-- [00mjdbcmysql.yml.tt[0m
                |   |       |   |   |   |       |   |   |-- [00mjdbcpostgresql.yml.tt[0m
                |   |       |   |   |   |       |   |   |-- [00mjdbcsqlite3.yml.tt[0m
                |   |       |   |   |   |       |   |   |-- [00mmysql.yml.tt[0m
                |   |       |   |   |   |       |   |   |-- [00moracle.yml.tt[0m
                |   |       |   |   |   |       |   |   |-- [00mpostgresql.yml.tt[0m
                |   |       |   |   |   |       |   |   |-- [00msqlite3.yml.tt[0m
                |   |       |   |   |   |       |   |   `-- [00msqlserver.yml.tt[0m
                |   |       |   |   |   |       |   |-- [00menvironment.rb.tt[0m
                |   |       |   |   |   |       |   |-- [01;34menvironments[0m
                |   |       |   |   |   |       |   |   |-- [00mdevelopment.rb.tt[0m
                |   |       |   |   |   |       |   |   |-- [00mproduction.rb.tt[0m
                |   |       |   |   |   |       |   |   `-- [00mtest.rb.tt[0m
                |   |       |   |   |   |       |   |-- [01;34minitializers[0m
                |   |       |   |   |   |       |   |   |-- [00massets.rb.tt[0m
                |   |       |   |   |   |       |   |   |-- [00mcontent_security_policy.rb.tt[0m
                |   |       |   |   |   |       |   |   |-- [00mcors.rb.tt[0m
                |   |       |   |   |   |       |   |   |-- [00mfilter_parameter_logging.rb.tt[0m
                |   |       |   |   |   |       |   |   |-- [00minflections.rb.tt[0m
                |   |       |   |   |   |       |   |   |-- [00mnew_framework_defaults_7_0.rb.tt[0m
                |   |       |   |   |   |       |   |   `-- [00mpermissions_policy.rb.tt[0m
                |   |       |   |   |   |       |   |-- [01;34mlocales[0m
                |   |       |   |   |   |       |   |   `-- [00men.yml[0m
                |   |       |   |   |   |       |   |-- [00mpuma.rb.tt[0m
                |   |       |   |   |   |       |   |-- [00mroutes.rb.tt[0m
                |   |       |   |   |   |       |   `-- [00mstorage.yml.tt[0m
                |   |       |   |   |   |       |-- [00mconfig.ru.tt[0m
                |   |       |   |   |   |       |-- [01;34mdb[0m
                |   |       |   |   |   |       |   `-- [00mseeds.rb.tt[0m
                |   |       |   |   |   |       |-- [00mgitattributes.tt[0m
                |   |       |   |   |   |       |-- [00mgitignore.tt[0m
                |   |       |   |   |   |       |-- [01;34mpublic[0m
                |   |       |   |   |   |       |   |-- [00m404.html[0m
                |   |       |   |   |   |       |   |-- [00m422.html[0m
                |   |       |   |   |   |       |   |-- [00m500.html[0m
                |   |       |   |   |   |       |   |-- [00mapple-touch-icon-precomposed.png[0m
                |   |       |   |   |   |       |   |-- [00mapple-touch-icon.png[0m
                |   |       |   |   |   |       |   |-- [00mfavicon.ico[0m
                |   |       |   |   |   |       |   `-- [00mrobots.txt[0m
                |   |       |   |   |   |       |-- [00mruby-version.tt[0m
                |   |       |   |   |   |       `-- [01;34mtest[0m
                |   |       |   |   |   |           |-- [00mapplication_system_test_case.rb.tt[0m
                |   |       |   |   |   |           |-- [01;34mchannels[0m
                |   |       |   |   |   |           |   `-- [01;34mapplication_cable[0m
                |   |       |   |   |   |           |       `-- [00mconnection_test.rb.tt[0m
                |   |       |   |   |   |           `-- [00mtest_helper.rb.tt[0m
                |   |       |   |   |   |-- [01;34mapplication_record[0m
                |   |       |   |   |   |   `-- [00mapplication_record_generator.rb[0m
                |   |       |   |   |   |-- [01;34mbenchmark[0m
                |   |       |   |   |   |   |-- [00mUSAGE[0m
                |   |       |   |   |   |   |-- [00mbenchmark_generator.rb[0m
                |   |       |   |   |   |   `-- [01;34mtemplates[0m
                |   |       |   |   |   |       `-- [00mbenchmark.rb.tt[0m
                |   |       |   |   |   |-- [01;34mcontroller[0m
                |   |       |   |   |   |   |-- [00mUSAGE[0m
                |   |       |   |   |   |   |-- [00mcontroller_generator.rb[0m
                |   |       |   |   |   |   `-- [01;34mtemplates[0m
                |   |       |   |   |   |       `-- [00mcontroller.rb.tt[0m
                |   |       |   |   |   |-- [01;34mcredentials[0m
                |   |       |   |   |   |   `-- [00mcredentials_generator.rb[0m
                |   |       |   |   |   |-- [01;34mdb[0m
                |   |       |   |   |   |   `-- [01;34msystem[0m
                |   |       |   |   |   |       `-- [01;34mchange[0m
                |   |       |   |   |   |           `-- [00mchange_generator.rb[0m
                |   |       |   |   |   |-- [01;34mencrypted_file[0m
                |   |       |   |   |   |   `-- [00mencrypted_file_generator.rb[0m
                |   |       |   |   |   |-- [01;34mencryption_key_file[0m
                |   |       |   |   |   |   `-- [00mencryption_key_file_generator.rb[0m
                |   |       |   |   |   |-- [01;34mgenerator[0m
                |   |       |   |   |   |   |-- [00mUSAGE[0m
                |   |       |   |   |   |   |-- [00mgenerator_generator.rb[0m
                |   |       |   |   |   |   `-- [01;34mtemplates[0m
                |   |       |   |   |   |       |-- [00m%file_name%_generator.rb.tt[0m
                |   |       |   |   |   |       |-- [00mUSAGE.tt[0m
                |   |       |   |   |   |       `-- [01;34mtemplates[0m
                |   |       |   |   |   |-- [01;34mhelper[0m
                |   |       |   |   |   |   |-- [00mUSAGE[0m
                |   |       |   |   |   |   |-- [00mhelper_generator.rb[0m
                |   |       |   |   |   |   `-- [01;34mtemplates[0m
                |   |       |   |   |   |       `-- [00mhelper.rb.tt[0m
                |   |       |   |   |   |-- [01;34mintegration_test[0m
                |   |       |   |   |   |   |-- [00mUSAGE[0m
                |   |       |   |   |   |   `-- [00mintegration_test_generator.rb[0m
                |   |       |   |   |   |-- [01;34mmaster_key[0m
                |   |       |   |   |   |   `-- [00mmaster_key_generator.rb[0m
                |   |       |   |   |   |-- [01;34mmigration[0m
                |   |       |   |   |   |   |-- [00mUSAGE[0m
                |   |       |   |   |   |   `-- [00mmigration_generator.rb[0m
                |   |       |   |   |   |-- [01;34mmodel[0m
                |   |       |   |   |   |   |-- [00mUSAGE[0m
                |   |       |   |   |   |   `-- [00mmodel_generator.rb[0m
                |   |       |   |   |   |-- [01;34mplugin[0m
                |   |       |   |   |   |   |-- [00mUSAGE[0m
                |   |       |   |   |   |   |-- [00mplugin_generator.rb[0m
                |   |       |   |   |   |   `-- [01;34mtemplates[0m
                |   |       |   |   |   |       |-- [00m%name%.gemspec.tt[0m
                |   |       |   |   |   |       |-- [00mGemfile.tt[0m
                |   |       |   |   |   |       |-- [00mMIT-LICENSE.tt[0m
                |   |       |   |   |   |       |-- [00mREADME.md.tt[0m
                |   |       |   |   |   |       |-- [00mRakefile.tt[0m
                |   |       |   |   |   |       |-- [01;34mapp[0m
                |   |       |   |   |   |       |   |-- [01;34mcontrollers[0m
                |   |       |   |   |   |       |   |   `-- [01;34m%namespaced_name%[0m
                |   |       |   |   |   |       |   |       `-- [00mapplication_controller.rb.tt[0m
                |   |       |   |   |   |       |   |-- [01;34mhelpers[0m
                |   |       |   |   |   |       |   |   `-- [01;34m%namespaced_name%[0m
                |   |       |   |   |   |       |   |       `-- [00mapplication_helper.rb.tt[0m
                |   |       |   |   |   |       |   |-- [01;34mjobs[0m
                |   |       |   |   |   |       |   |   `-- [01;34m%namespaced_name%[0m
                |   |       |   |   |   |       |   |       `-- [00mapplication_job.rb.tt[0m
                |   |       |   |   |   |       |   |-- [01;34mmailers[0m
                |   |       |   |   |   |       |   |   `-- [01;34m%namespaced_name%[0m
                |   |       |   |   |   |       |   |       `-- [00mapplication_mailer.rb.tt[0m
                |   |       |   |   |   |       |   |-- [01;34mmodels[0m
                |   |       |   |   |   |       |   |   `-- [01;34m%namespaced_name%[0m
                |   |       |   |   |   |       |   |       `-- [00mapplication_record.rb.tt[0m
                |   |       |   |   |   |       |   `-- [01;34mviews[0m
                |   |       |   |   |   |       |       `-- [01;34mlayouts[0m
                |   |       |   |   |   |       |           `-- [01;34m%namespaced_name%[0m
                |   |       |   |   |   |       |               `-- [00mapplication.html.erb.tt[0m
                |   |       |   |   |   |       |-- [01;34mbin[0m
                |   |       |   |   |   |       |   |-- [00mrails.tt[0m
                |   |       |   |   |   |       |   `-- [00mtest.tt[0m
                |   |       |   |   |   |       |-- [01;34mconfig[0m
                |   |       |   |   |   |       |   `-- [00mroutes.rb.tt[0m
                |   |       |   |   |   |       |-- [00mgitignore.tt[0m
                |   |       |   |   |   |       |-- [01;34mlib[0m
                |   |       |   |   |   |       |   |-- [01;34m%namespaced_name%[0m
                |   |       |   |   |   |       |   |   |-- [00mengine.rb.tt[0m
                |   |       |   |   |   |       |   |   |-- [00mrailtie.rb.tt[0m
                |   |       |   |   |   |       |   |   `-- [00mversion.rb.tt[0m
                |   |       |   |   |   |       |   |-- [00m%namespaced_name%.rb.tt[0m
                |   |       |   |   |   |       |   `-- [01;34mtasks[0m
                |   |       |   |   |   |       |       `-- [00m%namespaced_name%_tasks.rake.tt[0m
                |   |       |   |   |   |       |-- [01;34mrails[0m
                |   |       |   |   |   |       |   |-- [00mboot.rb.tt[0m
                |   |       |   |   |   |       |   |-- [00mdummy_manifest.js.tt[0m
                |   |       |   |   |   |       |   |-- [00mengine_manifest.js.tt[0m
                |   |       |   |   |   |       |   |-- [00mjavascripts.js.tt[0m
                |   |       |   |   |   |       |   |-- [00mroutes.rb.tt[0m
                |   |       |   |   |   |       |   `-- [00mstylesheets.css[0m
                |   |       |   |   |   |       `-- [01;34mtest[0m
                |   |       |   |   |   |           |-- [00m%namespaced_name%_test.rb.tt[0m
                |   |       |   |   |   |           |-- [00mapplication_system_test_case.rb.tt[0m
                |   |       |   |   |   |           |-- [01;34mintegration[0m
                |   |       |   |   |   |           |   `-- [00mnavigation_test.rb.tt[0m
                |   |       |   |   |   |           `-- [00mtest_helper.rb.tt[0m
                |   |       |   |   |   |-- [01;34mresource[0m
                |   |       |   |   |   |   |-- [00mUSAGE[0m
                |   |       |   |   |   |   `-- [00mresource_generator.rb[0m
                |   |       |   |   |   |-- [01;34mresource_route[0m
                |   |       |   |   |   |   `-- [00mresource_route_generator.rb[0m
                |   |       |   |   |   |-- [01;34mscaffold[0m
                |   |       |   |   |   |   |-- [00mUSAGE[0m
                |   |       |   |   |   |   `-- [00mscaffold_generator.rb[0m
                |   |       |   |   |   |-- [01;34mscaffold_controller[0m
                |   |       |   |   |   |   |-- [00mUSAGE[0m
                |   |       |   |   |   |   |-- [00mscaffold_controller_generator.rb[0m
                |   |       |   |   |   |   `-- [01;34mtemplates[0m
                |   |       |   |   |   |       |-- [00mapi_controller.rb.tt[0m
                |   |       |   |   |   |       `-- [00mcontroller.rb.tt[0m
                |   |       |   |   |   |-- [01;34msystem_test[0m
                |   |       |   |   |   |   |-- [00mUSAGE[0m
                |   |       |   |   |   |   `-- [00msystem_test_generator.rb[0m
                |   |       |   |   |   `-- [01;34mtask[0m
                |   |       |   |   |       |-- [00mUSAGE[0m
                |   |       |   |   |       |-- [00mtask_generator.rb[0m
                |   |       |   |   |       `-- [01;34mtemplates[0m
                |   |       |   |   |           `-- [00mtask.rb.tt[0m
                |   |       |   |   |-- [00mresource_helpers.rb[0m
                |   |       |   |   |-- [00mtest_case.rb[0m
                |   |       |   |   |-- [01;34mtest_unit[0m
                |   |       |   |   |   |-- [01;34mcontroller[0m
                |   |       |   |   |   |   |-- [00mcontroller_generator.rb[0m
                |   |       |   |   |   |   `-- [01;34mtemplates[0m
                |   |       |   |   |   |       `-- [00mfunctional_test.rb.tt[0m
                |   |       |   |   |   |-- [01;34mgenerator[0m
                |   |       |   |   |   |   |-- [00mgenerator_generator.rb[0m
                |   |       |   |   |   |   `-- [01;34mtemplates[0m
                |   |       |   |   |   |       `-- [00mgenerator_test.rb.tt[0m
                |   |       |   |   |   |-- [01;34mhelper[0m
                |   |       |   |   |   |   `-- [00mhelper_generator.rb[0m
                |   |       |   |   |   |-- [01;34mintegration[0m
                |   |       |   |   |   |   |-- [00mintegration_generator.rb[0m
                |   |       |   |   |   |   `-- [01;34mtemplates[0m
                |   |       |   |   |   |       `-- [00mintegration_test.rb.tt[0m
                |   |       |   |   |   |-- [01;34mjob[0m
                |   |       |   |   |   |   |-- [00mjob_generator.rb[0m
                |   |       |   |   |   |   `-- [01;34mtemplates[0m
                |   |       |   |   |   |       `-- [00munit_test.rb.tt[0m
                |   |       |   |   |   |-- [01;34mmailer[0m
                |   |       |   |   |   |   |-- [00mmailer_generator.rb[0m
                |   |       |   |   |   |   `-- [01;34mtemplates[0m
                |   |       |   |   |   |       |-- [00mfunctional_test.rb.tt[0m
                |   |       |   |   |   |       `-- [00mpreview.rb.tt[0m
                |   |       |   |   |   |-- [01;34mmodel[0m
                |   |       |   |   |   |   |-- [00mmodel_generator.rb[0m
                |   |       |   |   |   |   `-- [01;34mtemplates[0m
                |   |       |   |   |   |       |-- [00mfixtures.yml.tt[0m
                |   |       |   |   |   |       `-- [00munit_test.rb.tt[0m
                |   |       |   |   |   |-- [01;34mplugin[0m
                |   |       |   |   |   |   |-- [00mplugin_generator.rb[0m
                |   |       |   |   |   |   `-- [01;34mtemplates[0m
                |   |       |   |   |   |       |-- [00m%file_name%_test.rb.tt[0m
                |   |       |   |   |   |       `-- [00mtest_helper.rb[0m
                |   |       |   |   |   |-- [01;34mscaffold[0m
                |   |       |   |   |   |   |-- [00mscaffold_generator.rb[0m
                |   |       |   |   |   |   `-- [01;34mtemplates[0m
                |   |       |   |   |   |       |-- [00mapi_functional_test.rb.tt[0m
                |   |       |   |   |   |       |-- [00mfunctional_test.rb.tt[0m
                |   |       |   |   |   |       `-- [00msystem_test.rb.tt[0m
                |   |       |   |   |   `-- [01;34msystem[0m
                |   |       |   |   |       |-- [00msystem_generator.rb[0m
                |   |       |   |   |       `-- [01;34mtemplates[0m
                |   |       |   |   |           |-- [00mapplication_system_test_case.rb.tt[0m
                |   |       |   |   |           `-- [00msystem_test.rb.tt[0m
                |   |       |   |   |-- [00mtest_unit.rb[0m
                |   |       |   |   `-- [01;34mtesting[0m
                |   |       |   |       |-- [00massertions.rb[0m
                |   |       |   |       |-- [00mbehaviour.rb[0m
                |   |       |   |       `-- [00msetup_and_teardown.rb[0m
                |   |       |   |-- [00mgenerators.rb[0m
                |   |       |   |-- [00minfo.rb[0m
                |   |       |   |-- [00minfo_controller.rb[0m
                |   |       |   |-- [00minitializable.rb[0m
                |   |       |   |-- [00mmailers_controller.rb[0m
                |   |       |   |-- [00mpaths.rb[0m
                |   |       |   |-- [01;34mplugin[0m
                |   |       |   |   `-- [00mtest.rb[0m
                |   |       |   |-- [01;34mrack[0m
                |   |       |   |   `-- [00mlogger.rb[0m
                |   |       |   |-- [00mrack.rb[0m
                |   |       |   |-- [01;34mrailtie[0m
                |   |       |   |   |-- [00mconfigurable.rb[0m
                |   |       |   |   `-- [00mconfiguration.rb[0m
                |   |       |   |-- [00mrailtie.rb[0m
                |   |       |   |-- [00mruby_version_check.rb[0m
                |   |       |   |-- [00msecrets.rb[0m
                |   |       |   |-- [00msource_annotation_extractor.rb[0m
                |   |       |   |-- [01;34mtasks[0m
                |   |       |   |   |-- [00mengine.rake[0m
                |   |       |   |   |-- [00mframework.rake[0m
                |   |       |   |   |-- [00mlog.rake[0m
                |   |       |   |   |-- [00mmiddleware.rake[0m
                |   |       |   |   |-- [00mmisc.rake[0m
                |   |       |   |   |-- [00mrestart.rake[0m
                |   |       |   |   |-- [00mstatistics.rake[0m
                |   |       |   |   |-- [00mtmp.rake[0m
                |   |       |   |   |-- [00myarn.rake[0m
                |   |       |   |   `-- [00mzeitwerk.rake[0m
                |   |       |   |-- [00mtasks.rb[0m
                |   |       |   |-- [01;34mtemplates[0m
                |   |       |   |   |-- [01;34mlayouts[0m
                |   |       |   |   |   `-- [00mapplication.html.erb[0m
                |   |       |   |   `-- [01;34mrails[0m
                |   |       |   |       |-- [01;34minfo[0m
                |   |       |   |       |   |-- [00mproperties.html.erb[0m
                |   |       |   |       |   `-- [00mroutes.html.erb[0m
                |   |       |   |       |-- [01;34mmailers[0m
                |   |       |   |       |   |-- [00memail.html.erb[0m
                |   |       |   |       |   |-- [00mindex.html.erb[0m
                |   |       |   |       |   `-- [00mmailer.html.erb[0m
                |   |       |   |       `-- [01;34mwelcome[0m
                |   |       |   |           `-- [00mindex.html.erb[0m
                |   |       |   |-- [00mtest_help.rb[0m
                |   |       |   |-- [01;34mtest_unit[0m
                |   |       |   |   |-- [00mline_filtering.rb[0m
                |   |       |   |   |-- [00mrailtie.rb[0m
                |   |       |   |   |-- [00mreporter.rb[0m
                |   |       |   |   |-- [00mrunner.rb[0m
                |   |       |   |   `-- [00mtesting.rake[0m
                |   |       |   |-- [00mversion.rb[0m
                |   |       |   `-- [00mwelcome_controller.rb[0m
                |   |       `-- [00mrails.rb[0m
                |   |-- [01;34mrake-13.0.6[0m
                |   |   |-- [00mHistory.rdoc[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.rdoc[0m
                |   |   |-- [01;34mdoc[0m
                |   |   |   |-- [00mcommand_line_usage.rdoc[0m
                |   |   |   |-- [01;34mexample[0m
                |   |   |   |   |-- [00mRakefile1[0m
                |   |   |   |   |-- [00mRakefile2[0m
                |   |   |   |   |-- [00ma.c[0m
                |   |   |   |   |-- [00mb.c[0m
                |   |   |   |   `-- [00mmain.c[0m
                |   |   |   |-- [00mglossary.rdoc[0m
                |   |   |   |-- [00mjamis.rb[0m
                |   |   |   |-- [00mproto_rake.rdoc[0m
                |   |   |   |-- [00mrake.1[0m
                |   |   |   |-- [00mrakefile.rdoc[0m
                |   |   |   `-- [00mrational.rdoc[0m
                |   |   |-- [01;34mexe[0m
                |   |   |   `-- [01;32mrake[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34mrake[0m
                |   |   |   |   |-- [00mapplication.rb[0m
                |   |   |   |   |-- [00mbacktrace.rb[0m
                |   |   |   |   |-- [00mclean.rb[0m
                |   |   |   |   |-- [00mcloneable.rb[0m
                |   |   |   |   |-- [00mcpu_counter.rb[0m
                |   |   |   |   |-- [00mdefault_loader.rb[0m
                |   |   |   |   |-- [00mdsl_definition.rb[0m
                |   |   |   |   |-- [00mearly_time.rb[0m
                |   |   |   |   |-- [01;34mext[0m
                |   |   |   |   |   |-- [00mcore.rb[0m
                |   |   |   |   |   `-- [00mstring.rb[0m
                |   |   |   |   |-- [00mfile_creation_task.rb[0m
                |   |   |   |   |-- [00mfile_list.rb[0m
                |   |   |   |   |-- [00mfile_task.rb[0m
                |   |   |   |   |-- [00mfile_utils.rb[0m
                |   |   |   |   |-- [00mfile_utils_ext.rb[0m
                |   |   |   |   |-- [00minvocation_chain.rb[0m
                |   |   |   |   |-- [00minvocation_exception_mixin.rb[0m
                |   |   |   |   |-- [00mlate_time.rb[0m
                |   |   |   |   |-- [00mlinked_list.rb[0m
                |   |   |   |   |-- [01;34mloaders[0m
                |   |   |   |   |   `-- [00mmakefile.rb[0m
                |   |   |   |   |-- [00mmulti_task.rb[0m
                |   |   |   |   |-- [00mname_space.rb[0m
                |   |   |   |   |-- [00mpackagetask.rb[0m
                |   |   |   |   |-- [00mphony.rb[0m
                |   |   |   |   |-- [00mprivate_reader.rb[0m
                |   |   |   |   |-- [00mpromise.rb[0m
                |   |   |   |   |-- [00mpseudo_status.rb[0m
                |   |   |   |   |-- [00mrake_module.rb[0m
                |   |   |   |   |-- [00mrake_test_loader.rb[0m
                |   |   |   |   |-- [00mrule_recursion_overflow_error.rb[0m
                |   |   |   |   |-- [00mscope.rb[0m
                |   |   |   |   |-- [00mtask.rb[0m
                |   |   |   |   |-- [00mtask_argument_error.rb[0m
                |   |   |   |   |-- [00mtask_arguments.rb[0m
                |   |   |   |   |-- [00mtask_manager.rb[0m
                |   |   |   |   |-- [00mtasklib.rb[0m
                |   |   |   |   |-- [00mtesttask.rb[0m
                |   |   |   |   |-- [00mthread_history_display.rb[0m
                |   |   |   |   |-- [00mthread_pool.rb[0m
                |   |   |   |   |-- [00mtrace_output.rb[0m
                |   |   |   |   |-- [00mversion.rb[0m
                |   |   |   |   `-- [00mwin32.rb[0m
                |   |   |   `-- [00mrake.rb[0m
                |   |   `-- [00mrake.gemspec[0m
                |   |-- [01;34mregexp_parser-2.7.0[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mGemfile[0m
                |   |   |-- [00mLICENSE[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [00mRakefile[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34mregexp_parser[0m
                |   |   |   |   |-- [00merror.rb[0m
                |   |   |   |   |-- [01;34mexpression[0m
                |   |   |   |   |   |-- [00mbase.rb[0m
                |   |   |   |   |   |-- [01;34mclasses[0m
                |   |   |   |   |   |   |-- [00malternation.rb[0m
                |   |   |   |   |   |   |-- [00manchor.rb[0m
                |   |   |   |   |   |   |-- [00mbackreference.rb[0m
                |   |   |   |   |   |   |-- [01;34mcharacter_set[0m
                |   |   |   |   |   |   |   |-- [00mintersection.rb[0m
                |   |   |   |   |   |   |   `-- [00mrange.rb[0m
                |   |   |   |   |   |   |-- [00mcharacter_set.rb[0m
                |   |   |   |   |   |   |-- [00mcharacter_type.rb[0m
                |   |   |   |   |   |   |-- [00mconditional.rb[0m
                |   |   |   |   |   |   |-- [00mescape_sequence.rb[0m
                |   |   |   |   |   |   |-- [00mfree_space.rb[0m
                |   |   |   |   |   |   |-- [00mgroup.rb[0m
                |   |   |   |   |   |   |-- [00mkeep.rb[0m
                |   |   |   |   |   |   |-- [00mliteral.rb[0m
                |   |   |   |   |   |   |-- [00mposix_class.rb[0m
                |   |   |   |   |   |   |-- [00mroot.rb[0m
                |   |   |   |   |   |   `-- [00municode_property.rb[0m
                |   |   |   |   |   |-- [01;34mmethods[0m
                |   |   |   |   |   |   |-- [00mconstruct.rb[0m
                |   |   |   |   |   |   |-- [00mhuman_name.rb[0m
                |   |   |   |   |   |   |-- [00mmatch.rb[0m
                |   |   |   |   |   |   |-- [00mmatch_length.rb[0m
                |   |   |   |   |   |   |-- [00moptions.rb[0m
                |   |   |   |   |   |   |-- [00mstrfregexp.rb[0m
                |   |   |   |   |   |   |-- [00mtests.rb[0m
                |   |   |   |   |   |   `-- [00mtraverse.rb[0m
                |   |   |   |   |   |-- [00mquantifier.rb[0m
                |   |   |   |   |   |-- [00msequence.rb[0m
                |   |   |   |   |   |-- [00msequence_operation.rb[0m
                |   |   |   |   |   |-- [00mshared.rb[0m
                |   |   |   |   |   `-- [00msubexpression.rb[0m
                |   |   |   |   |-- [00mexpression.rb[0m
                |   |   |   |   |-- [00mlexer.rb[0m
                |   |   |   |   |-- [00mparser.rb[0m
                |   |   |   |   |-- [01;34mscanner[0m
                |   |   |   |   |   |-- [00mchar_type.rl[0m
                |   |   |   |   |   |-- [01;34mproperties[0m
                |   |   |   |   |   |   |-- [00mlong.csv[0m
                |   |   |   |   |   |   `-- [00mshort.csv[0m
                |   |   |   |   |   |-- [00mproperty.rl[0m
                |   |   |   |   |   `-- [00mscanner.rl[0m
                |   |   |   |   |-- [00mscanner.rb[0m
                |   |   |   |   |-- [01;34msyntax[0m
                |   |   |   |   |   |-- [00many.rb[0m
                |   |   |   |   |   |-- [00mbase.rb[0m
                |   |   |   |   |   |-- [01;34mtoken[0m
                |   |   |   |   |   |   |-- [00manchor.rb[0m
                |   |   |   |   |   |   |-- [00massertion.rb[0m
                |   |   |   |   |   |   |-- [00mbackreference.rb[0m
                |   |   |   |   |   |   |-- [00mcharacter_set.rb[0m
                |   |   |   |   |   |   |-- [00mcharacter_type.rb[0m
                |   |   |   |   |   |   |-- [00mconditional.rb[0m
                |   |   |   |   |   |   |-- [00mescape.rb[0m
                |   |   |   |   |   |   |-- [00mgroup.rb[0m
                |   |   |   |   |   |   |-- [00mkeep.rb[0m
                |   |   |   |   |   |   |-- [00mmeta.rb[0m
                |   |   |   |   |   |   |-- [00mposix_class.rb[0m
                |   |   |   |   |   |   |-- [00mquantifier.rb[0m
                |   |   |   |   |   |   `-- [00municode_property.rb[0m
                |   |   |   |   |   |-- [00mtoken.rb[0m
                |   |   |   |   |   |-- [00mversion_lookup.rb[0m
                |   |   |   |   |   |-- [01;34mversions[0m
                |   |   |   |   |   |   |-- [00m1.8.6.rb[0m
                |   |   |   |   |   |   |-- [00m1.9.1.rb[0m
                |   |   |   |   |   |   |-- [00m1.9.3.rb[0m
                |   |   |   |   |   |   |-- [00m2.0.0.rb[0m
                |   |   |   |   |   |   |-- [00m2.2.0.rb[0m
                |   |   |   |   |   |   |-- [00m2.3.0.rb[0m
                |   |   |   |   |   |   |-- [00m2.4.0.rb[0m
                |   |   |   |   |   |   |-- [00m2.4.1.rb[0m
                |   |   |   |   |   |   |-- [00m2.5.0.rb[0m
                |   |   |   |   |   |   |-- [00m2.6.0.rb[0m
                |   |   |   |   |   |   |-- [00m2.6.2.rb[0m
                |   |   |   |   |   |   |-- [00m2.6.3.rb[0m
                |   |   |   |   |   |   |-- [00m3.1.0.rb[0m
                |   |   |   |   |   |   `-- [00m3.2.0.rb[0m
                |   |   |   |   |   `-- [00mversions.rb[0m
                |   |   |   |   |-- [00msyntax.rb[0m
                |   |   |   |   |-- [00mtoken.rb[0m
                |   |   |   |   `-- [00mversion.rb[0m
                |   |   |   `-- [00mregexp_parser.rb[0m
                |   |   `-- [00mregexp_parser.gemspec[0m
                |   |-- [01;34mreline-0.3.2[0m
                |   |   |-- [00mBSDL[0m
                |   |   |-- [00mCOPYING[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34mreline[0m
                |   |   |   |   |-- [00mansi.rb[0m
                |   |   |   |   |-- [00mconfig.rb[0m
                |   |   |   |   |-- [00mgeneral_io.rb[0m
                |   |   |   |   |-- [00mhistory.rb[0m
                |   |   |   |   |-- [01;34mkey_actor[0m
                |   |   |   |   |   |-- [00mbase.rb[0m
                |   |   |   |   |   |-- [00memacs.rb[0m
                |   |   |   |   |   |-- [00mvi_command.rb[0m
                |   |   |   |   |   `-- [00mvi_insert.rb[0m
                |   |   |   |   |-- [00mkey_actor.rb[0m
                |   |   |   |   |-- [00mkey_stroke.rb[0m
                |   |   |   |   |-- [00mkill_ring.rb[0m
                |   |   |   |   |-- [00mline_editor.rb[0m
                |   |   |   |   |-- [00mterminfo.rb[0m
                |   |   |   |   |-- [01;34municode[0m
                |   |   |   |   |   `-- [00meast_asian_width.rb[0m
                |   |   |   |   |-- [00municode.rb[0m
                |   |   |   |   |-- [00mversion.rb[0m
                |   |   |   |   `-- [00mwindows.rb[0m
                |   |   |   `-- [00mreline.rb[0m
                |   |   `-- [00mlicense_of_rb-readline[0m
                |   |-- [01;34mrexml-3.2.5[0m
                |   |   |-- [00mLICENSE.txt[0m
                |   |   |-- [00mNEWS.md[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [01;34mdoc[0m
                |   |   |   `-- [01;34mrexml[0m
                |   |   |       |-- [00mcontext.rdoc[0m
                |   |   |       `-- [01;34mtasks[0m
                |   |   |           |-- [01;34mrdoc[0m
                |   |   |           |   |-- [00mchild.rdoc[0m
                |   |   |           |   |-- [00mdocument.rdoc[0m
                |   |   |           |   |-- [00melement.rdoc[0m
                |   |   |           |   |-- [00mnode.rdoc[0m
                |   |   |           |   `-- [00mparent.rdoc[0m
                |   |   |           `-- [01;34mtocs[0m
                |   |   |               |-- [00mchild_toc.rdoc[0m
                |   |   |               |-- [00mdocument_toc.rdoc[0m
                |   |   |               |-- [00melement_toc.rdoc[0m
                |   |   |               |-- [00mmaster_toc.rdoc[0m
                |   |   |               |-- [00mnode_toc.rdoc[0m
                |   |   |               `-- [00mparent_toc.rdoc[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34mrexml[0m
                |   |       |   |-- [00mattlistdecl.rb[0m
                |   |       |   |-- [00mattribute.rb[0m
                |   |       |   |-- [00mcdata.rb[0m
                |   |       |   |-- [00mchild.rb[0m
                |   |       |   |-- [00mcomment.rb[0m
                |   |       |   |-- [00mdoctype.rb[0m
                |   |       |   |-- [00mdocument.rb[0m
                |   |       |   |-- [01;34mdtd[0m
                |   |       |   |   |-- [00mattlistdecl.rb[0m
                |   |       |   |   |-- [00mdtd.rb[0m
                |   |       |   |   |-- [00melementdecl.rb[0m
                |   |       |   |   |-- [00mentitydecl.rb[0m
                |   |       |   |   `-- [00mnotationdecl.rb[0m
                |   |       |   |-- [00melement.rb[0m
                |   |       |   |-- [00mencoding.rb[0m
                |   |       |   |-- [00mentity.rb[0m
                |   |       |   |-- [01;34mformatters[0m
                |   |       |   |   |-- [00mdefault.rb[0m
                |   |       |   |   |-- [00mpretty.rb[0m
                |   |       |   |   `-- [00mtransitive.rb[0m
                |   |       |   |-- [00mfunctions.rb[0m
                |   |       |   |-- [00minstruction.rb[0m
                |   |       |   |-- [01;34mlight[0m
                |   |       |   |   `-- [00mnode.rb[0m
                |   |       |   |-- [00mnamespace.rb[0m
                |   |       |   |-- [00mnode.rb[0m
                |   |       |   |-- [00moutput.rb[0m
                |   |       |   |-- [00mparent.rb[0m
                |   |       |   |-- [00mparseexception.rb[0m
                |   |       |   |-- [01;34mparsers[0m
                |   |       |   |   |-- [00mbaseparser.rb[0m
                |   |       |   |   |-- [00mlightparser.rb[0m
                |   |       |   |   |-- [00mpullparser.rb[0m
                |   |       |   |   |-- [00msax2parser.rb[0m
                |   |       |   |   |-- [00mstreamparser.rb[0m
                |   |       |   |   |-- [00mtreeparser.rb[0m
                |   |       |   |   |-- [00multralightparser.rb[0m
                |   |       |   |   `-- [00mxpathparser.rb[0m
                |   |       |   |-- [00mquickpath.rb[0m
                |   |       |   |-- [00mrexml.rb[0m
                |   |       |   |-- [00msax2listener.rb[0m
                |   |       |   |-- [00msecurity.rb[0m
                |   |       |   |-- [00msource.rb[0m
                |   |       |   |-- [00mstreamlistener.rb[0m
                |   |       |   |-- [00mtext.rb[0m
                |   |       |   |-- [00mundefinednamespaceexception.rb[0m
                |   |       |   |-- [01;34mvalidation[0m
                |   |       |   |   |-- [00mrelaxng.rb[0m
                |   |       |   |   |-- [00mvalidation.rb[0m
                |   |       |   |   `-- [00mvalidationexception.rb[0m
                |   |       |   |-- [00mxmldecl.rb[0m
                |   |       |   |-- [00mxmltokens.rb[0m
                |   |       |   |-- [00mxpath.rb[0m
                |   |       |   `-- [00mxpath_parser.rb[0m
                |   |       `-- [00mrexml.rb[0m
                |   |-- [01;34mrubyzip-2.3.2[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [00mRakefile[0m
                |   |   |-- [00mTODO[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34mzip[0m
                |   |   |   |   |-- [00mcentral_directory.rb[0m
                |   |   |   |   |-- [00mcompressor.rb[0m
                |   |   |   |   |-- [00mconstants.rb[0m
                |   |   |   |   |-- [01;34mcrypto[0m
                |   |   |   |   |   |-- [00mdecrypted_io.rb[0m
                |   |   |   |   |   |-- [00mencryption.rb[0m
                |   |   |   |   |   |-- [00mnull_encryption.rb[0m
                |   |   |   |   |   `-- [00mtraditional_encryption.rb[0m
                |   |   |   |   |-- [00mdecompressor.rb[0m
                |   |   |   |   |-- [00mdeflater.rb[0m
                |   |   |   |   |-- [00mdos_time.rb[0m
                |   |   |   |   |-- [00mentry.rb[0m
                |   |   |   |   |-- [00mentry_set.rb[0m
                |   |   |   |   |-- [00merrors.rb[0m
                |   |   |   |   |-- [01;34mextra_field[0m
                |   |   |   |   |   |-- [00mgeneric.rb[0m
                |   |   |   |   |   |-- [00mntfs.rb[0m
                |   |   |   |   |   |-- [00mold_unix.rb[0m
                |   |   |   |   |   |-- [00muniversal_time.rb[0m
                |   |   |   |   |   |-- [00munix.rb[0m
                |   |   |   |   |   |-- [00mzip64.rb[0m
                |   |   |   |   |   `-- [00mzip64_placeholder.rb[0m
                |   |   |   |   |-- [00mextra_field.rb[0m
                |   |   |   |   |-- [00mfile.rb[0m
                |   |   |   |   |-- [00mfilesystem.rb[0m
                |   |   |   |   |-- [00minflater.rb[0m
                |   |   |   |   |-- [00minput_stream.rb[0m
                |   |   |   |   |-- [01;34mioextras[0m
                |   |   |   |   |   |-- [00mabstract_input_stream.rb[0m
                |   |   |   |   |   `-- [00mabstract_output_stream.rb[0m
                |   |   |   |   |-- [00mioextras.rb[0m
                |   |   |   |   |-- [00mnull_compressor.rb[0m
                |   |   |   |   |-- [00mnull_decompressor.rb[0m
                |   |   |   |   |-- [00mnull_input_stream.rb[0m
                |   |   |   |   |-- [00moutput_stream.rb[0m
                |   |   |   |   |-- [00mpass_thru_compressor.rb[0m
                |   |   |   |   |-- [00mpass_thru_decompressor.rb[0m
                |   |   |   |   |-- [00mstreamable_directory.rb[0m
                |   |   |   |   |-- [00mstreamable_stream.rb[0m
                |   |   |   |   `-- [00mversion.rb[0m
                |   |   |   `-- [00mzip.rb[0m
                |   |   `-- [01;34msamples[0m
                |   |       |-- [01;32mexample.rb[0m
                |   |       |-- [01;32mexample_filesystem.rb[0m
                |   |       |-- [00mexample_recursive.rb[0m
                |   |       |-- [01;32mgtk_ruby_zip.rb[0m
                |   |       |-- [01;32mqtzip.rb[0m
                |   |       |-- [01;32mwrite_simple.rb[0m
                |   |       `-- [01;32mzipfind.rb[0m
                |   |-- [01;34mselenium-webdriver-4.8.1[0m
                |   |   |-- [00mCHANGES[0m
                |   |   |-- [00mGemfile[0m
                |   |   |-- [01;32mLICENSE[0m
                |   |   |-- [01;32mNOTICE[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [01;34mbin[0m
                |   |   |   |-- [01;34mlinux[0m
                |   |   |   |   `-- [01;32mselenium-manager[0m
                |   |   |   |-- [01;34mmacos[0m
                |   |   |   |   `-- [01;32mselenium-manager[0m
                |   |   |   `-- [01;34mwindows[0m
                |   |   |       `-- [01;32mselenium-manager.exe[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34mselenium[0m
                |   |   |   |   |-- [00mserver.rb[0m
                |   |   |   |   |-- [01;34mwebdriver[0m
                |   |   |   |   |   |-- [01;34matoms[0m
                |   |   |   |   |   |   |-- [01;32mfindElements.js[0m
                |   |   |   |   |   |   |-- [01;32mgetAttribute.js[0m
                |   |   |   |   |   |   |-- [01;32misDisplayed.js[0m
                |   |   |   |   |   |   `-- [01;32mmutationListener.js[0m
                |   |   |   |   |   |-- [00matoms.rb[0m
                |   |   |   |   |   |-- [01;34mbidi[0m
                |   |   |   |   |   |   |-- [00mbrowsing_context.rb[0m
                |   |   |   |   |   |   |-- [00mbrowsing_context_info.rb[0m
                |   |   |   |   |   |   |-- [01;34mlog[0m
                |   |   |   |   |   |   |   |-- [00mbase_log_entry.rb[0m
                |   |   |   |   |   |   |   |-- [00mconsole_log_entry.rb[0m
                |   |   |   |   |   |   |   |-- [00mfilter_by.rb[0m
                |   |   |   |   |   |   |   |-- [00mgeneric_log_entry.rb[0m
                |   |   |   |   |   |   |   `-- [00mjavascript_log_entry.rb[0m
                |   |   |   |   |   |   |-- [00mlog_inspector.rb[0m
                |   |   |   |   |   |   |-- [00mnavigate_result.rb[0m
                |   |   |   |   |   |   `-- [00msession.rb[0m
                |   |   |   |   |   |-- [00mbidi.rb[0m
                |   |   |   |   |   |-- [01;34mchrome[0m
                |   |   |   |   |   |   |-- [00mdriver.rb[0m
                |   |   |   |   |   |   |-- [00mfeatures.rb[0m
                |   |   |   |   |   |   |-- [00moptions.rb[0m
                |   |   |   |   |   |   |-- [00mprofile.rb[0m
                |   |   |   |   |   |   `-- [00mservice.rb[0m
                |   |   |   |   |   |-- [00mchrome.rb[0m
                |   |   |   |   |   |-- [01;34mchromium[0m
                |   |   |   |   |   |   |-- [00mdriver.rb[0m
                |   |   |   |   |   |   |-- [00mfeatures.rb[0m
                |   |   |   |   |   |   |-- [00moptions.rb[0m
                |   |   |   |   |   |   |-- [00mprofile.rb[0m
                |   |   |   |   |   |   `-- [00mservice.rb[0m
                |   |   |   |   |   |-- [00mchromium.rb[0m
                |   |   |   |   |   |-- [01;34mcommon[0m
                |   |   |   |   |   |   |-- [00maction_builder.rb[0m
                |   |   |   |   |   |   |-- [00malert.rb[0m
                |   |   |   |   |   |   |-- [00mchild_process.rb[0m
                |   |   |   |   |   |   |-- [00mdriver.rb[0m
                |   |   |   |   |   |   |-- [01;34mdriver_extensions[0m
                |   |   |   |   |   |   |   |-- [00mdownloads_files.rb[0m
                |   |   |   |   |   |   |   |-- [00mfull_page_screenshot.rb[0m
                |   |   |   |   |   |   |   |-- [00mhas_addons.rb[0m
                |   |   |   |   |   |   |   |-- [00mhas_apple_permissions.rb[0m
                |   |   |   |   |   |   |   |-- [00mhas_authentication.rb[0m
                |   |   |   |   |   |   |   |-- [00mhas_bidi.rb[0m
                |   |   |   |   |   |   |   |-- [00mhas_casting.rb[0m
                |   |   |   |   |   |   |   |-- [00mhas_cdp.rb[0m
                |   |   |   |   |   |   |   |-- [00mhas_context.rb[0m
                |   |   |   |   |   |   |   |-- [00mhas_debugger.rb[0m
                |   |   |   |   |   |   |   |-- [00mhas_devtools.rb[0m
                |   |   |   |   |   |   |   |-- [00mhas_launching.rb[0m
                |   |   |   |   |   |   |   |-- [00mhas_location.rb[0m
                |   |   |   |   |   |   |   |-- [00mhas_log_events.rb[0m
                |   |   |   |   |   |   |   |-- [00mhas_logs.rb[0m
                |   |   |   |   |   |   |   |-- [00mhas_network_conditions.rb[0m
                |   |   |   |   |   |   |   |-- [00mhas_network_connection.rb[0m
                |   |   |   |   |   |   |   |-- [00mhas_network_interception.rb[0m
                |   |   |   |   |   |   |   |-- [00mhas_permissions.rb[0m
                |   |   |   |   |   |   |   |-- [00mhas_pinned_scripts.rb[0m
                |   |   |   |   |   |   |   |-- [00mhas_session_id.rb[0m
                |   |   |   |   |   |   |   |-- [00mhas_web_storage.rb[0m
                |   |   |   |   |   |   |   |-- [00mprints_page.rb[0m
                |   |   |   |   |   |   |   `-- [00muploads_files.rb[0m
                |   |   |   |   |   |   |-- [00melement.rb[0m
                |   |   |   |   |   |   |-- [00merror.rb[0m
                |   |   |   |   |   |   |-- [00mfile_reaper.rb[0m
                |   |   |   |   |   |   |-- [01;34mhtml5[0m
                |   |   |   |   |   |   |   |-- [00mlocal_storage.rb[0m
                |   |   |   |   |   |   |   |-- [00msession_storage.rb[0m
                |   |   |   |   |   |   |   `-- [00mshared_web_storage.rb[0m
                |   |   |   |   |   |   |-- [01;34minteractions[0m
                |   |   |   |   |   |   |   |-- [00minput_device.rb[0m
                |   |   |   |   |   |   |   |-- [00minteraction.rb[0m
                |   |   |   |   |   |   |   |-- [00minteractions.rb[0m
                |   |   |   |   |   |   |   |-- [00mkey_actions.rb[0m
                |   |   |   |   |   |   |   |-- [00mkey_input.rb[0m
                |   |   |   |   |   |   |   |-- [00mnone_input.rb[0m
                |   |   |   |   |   |   |   |-- [00mpause.rb[0m
                |   |   |   |   |   |   |   |-- [00mpointer_actions.rb[0m
                |   |   |   |   |   |   |   |-- [00mpointer_cancel.rb[0m
                |   |   |   |   |   |   |   |-- [00mpointer_event_properties.rb[0m
                |   |   |   |   |   |   |   |-- [00mpointer_input.rb[0m
                |   |   |   |   |   |   |   |-- [00mpointer_move.rb[0m
                |   |   |   |   |   |   |   |-- [00mpointer_press.rb[0m
                |   |   |   |   |   |   |   |-- [00mscroll.rb[0m
                |   |   |   |   |   |   |   |-- [00mscroll_origin.rb[0m
                |   |   |   |   |   |   |   |-- [00mtyping_interaction.rb[0m
                |   |   |   |   |   |   |   |-- [00mwheel_actions.rb[0m
                |   |   |   |   |   |   |   `-- [00mwheel_input.rb[0m
                |   |   |   |   |   |   |-- [00mkeys.rb[0m
                |   |   |   |   |   |   |-- [00mlog_entry.rb[0m
                |   |   |   |   |   |   |-- [00mlogger.rb[0m
                |   |   |   |   |   |   |-- [00mlogs.rb[0m
                |   |   |   |   |   |   |-- [00mmanager.rb[0m
                |   |   |   |   |   |   |-- [00mnavigation.rb[0m
                |   |   |   |   |   |   |-- [00moptions.rb[0m
                |   |   |   |   |   |   |-- [00mplatform.rb[0m
                |   |   |   |   |   |   |-- [00mport_prober.rb[0m
                |   |   |   |   |   |   |-- [00mprofile_helper.rb[0m
                |   |   |   |   |   |   |-- [00mproxy.rb[0m
                |   |   |   |   |   |   |-- [00msearch_context.rb[0m
                |   |   |   |   |   |   |-- [00mselenium_manager.rb[0m
                |   |   |   |   |   |   |-- [00mservice.rb[0m
                |   |   |   |   |   |   |-- [00mservice_manager.rb[0m
                |   |   |   |   |   |   |-- [00mshadow_root.rb[0m
                |   |   |   |   |   |   |-- [00msocket_lock.rb[0m
                |   |   |   |   |   |   |-- [00msocket_poller.rb[0m
                |   |   |   |   |   |   |-- [00mtakes_screenshot.rb[0m
                |   |   |   |   |   |   |-- [00mtarget_locator.rb[0m
                |   |   |   |   |   |   |-- [00mtimeouts.rb[0m
                |   |   |   |   |   |   |-- [01;34mvirtual_authenticator[0m
                |   |   |   |   |   |   |   |-- [00mcredential.rb[0m
                |   |   |   |   |   |   |   |-- [00mvirtual_authenticator.rb[0m
                |   |   |   |   |   |   |   `-- [00mvirtual_authenticator_options.rb[0m
                |   |   |   |   |   |   |-- [00mwait.rb[0m
                |   |   |   |   |   |   |-- [00mwebsocket_connection.rb[0m
                |   |   |   |   |   |   |-- [00mwindow.rb[0m
                |   |   |   |   |   |   `-- [00mzipper.rb[0m
                |   |   |   |   |   |-- [00mcommon.rb[0m
                |   |   |   |   |   |-- [01;34mdevtools[0m
                |   |   |   |   |   |   |-- [00mconsole_event.rb[0m
                |   |   |   |   |   |   |-- [00mexception_event.rb[0m
                |   |   |   |   |   |   |-- [00mmutation_event.rb[0m
                |   |   |   |   |   |   |-- [00mnetwork_interceptor.rb[0m
                |   |   |   |   |   |   |-- [00mpinned_script.rb[0m
                |   |   |   |   |   |   |-- [00mrequest.rb[0m
                |   |   |   |   |   |   `-- [00mresponse.rb[0m
                |   |   |   |   |   |-- [00mdevtools.rb[0m
                |   |   |   |   |   |-- [01;34medge[0m
                |   |   |   |   |   |   |-- [00mdriver.rb[0m
                |   |   |   |   |   |   |-- [00mfeatures.rb[0m
                |   |   |   |   |   |   |-- [00moptions.rb[0m
                |   |   |   |   |   |   |-- [00mprofile.rb[0m
                |   |   |   |   |   |   `-- [00mservice.rb[0m
                |   |   |   |   |   |-- [00medge.rb[0m
                |   |   |   |   |   |-- [01;34mfirefox[0m
                |   |   |   |   |   |   |-- [00mdriver.rb[0m
                |   |   |   |   |   |   |-- [00mextension.rb[0m
                |   |   |   |   |   |   |-- [00mfeatures.rb[0m
                |   |   |   |   |   |   |-- [00moptions.rb[0m
                |   |   |   |   |   |   |-- [00mprofile.rb[0m
                |   |   |   |   |   |   |-- [00mprofiles_ini.rb[0m
                |   |   |   |   |   |   |-- [00mservice.rb[0m
                |   |   |   |   |   |   `-- [00mutil.rb[0m
                |   |   |   |   |   |-- [00mfirefox.rb[0m
                |   |   |   |   |   |-- [01;34mie[0m
                |   |   |   |   |   |   |-- [00mdriver.rb[0m
                |   |   |   |   |   |   |-- [00moptions.rb[0m
                |   |   |   |   |   |   `-- [00mservice.rb[0m
                |   |   |   |   |   |-- [00mie.rb[0m
                |   |   |   |   |   |-- [01;34mremote[0m
                |   |   |   |   |   |   |-- [01;34mbridge[0m
                |   |   |   |   |   |   |   `-- [00mcommands.rb[0m
                |   |   |   |   |   |   |-- [00mbridge.rb[0m
                |   |   |   |   |   |   |-- [00mcapabilities.rb[0m
                |   |   |   |   |   |   |-- [00mdriver.rb[0m
                |   |   |   |   |   |   |-- [01;34mhttp[0m
                |   |   |   |   |   |   |   |-- [00mcommon.rb[0m
                |   |   |   |   |   |   |   |-- [00mcurb.rb[0m
                |   |   |   |   |   |   |   `-- [00mdefault.rb[0m
                |   |   |   |   |   |   |-- [00mresponse.rb[0m
                |   |   |   |   |   |   `-- [00mserver_error.rb[0m
                |   |   |   |   |   |-- [00mremote.rb[0m
                |   |   |   |   |   |-- [01;34msafari[0m
                |   |   |   |   |   |   |-- [00mdriver.rb[0m
                |   |   |   |   |   |   |-- [00mfeatures.rb[0m
                |   |   |   |   |   |   |-- [00moptions.rb[0m
                |   |   |   |   |   |   `-- [00mservice.rb[0m
                |   |   |   |   |   |-- [00msafari.rb[0m
                |   |   |   |   |   |-- [01;34msupport[0m
                |   |   |   |   |   |   |-- [00mabstract_event_listener.rb[0m
                |   |   |   |   |   |   |-- [00mblock_event_listener.rb[0m
                |   |   |   |   |   |   |-- [00mcolor.rb[0m
                |   |   |   |   |   |   |-- [00mescaper.rb[0m
                |   |   |   |   |   |   |-- [00mevent_firing_bridge.rb[0m
                |   |   |   |   |   |   |-- [01;34mguards[0m
                |   |   |   |   |   |   |   |-- [00mguard.rb[0m
                |   |   |   |   |   |   |   `-- [00mguard_condition.rb[0m
                |   |   |   |   |   |   |-- [00mguards.rb[0m
                |   |   |   |   |   |   |-- [00mrelative_locator.rb[0m
                |   |   |   |   |   |   `-- [00mselect.rb[0m
                |   |   |   |   |   |-- [00msupport.rb[0m
                |   |   |   |   |   `-- [00mversion.rb[0m
                |   |   |   |   `-- [00mwebdriver.rb[0m
                |   |   |   `-- [00mselenium-webdriver.rb[0m
                |   |   `-- [00mselenium-webdriver.gemspec[0m
                |   |-- [01;34msprockets-4.2.0[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [01;34mbin[0m
                |   |   |   `-- [01;32msprockets[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34mrake[0m
                |   |       |   `-- [00msprocketstask.rb[0m
                |   |       |-- [01;34msprockets[0m
                |   |       |   |-- [00madd_source_map_comment_to_asset_processor.rb[0m
                |   |       |   |-- [00masset.rb[0m
                |   |       |   |-- [01;34mautoload[0m
                |   |       |   |   |-- [00mbabel.rb[0m
                |   |       |   |   |-- [00mclosure.rb[0m
                |   |       |   |   |-- [00mcoffee_script.rb[0m
                |   |       |   |   |-- [00meco.rb[0m
                |   |       |   |   |-- [00mejs.rb[0m
                |   |       |   |   |-- [00mjsminc.rb[0m
                |   |       |   |   |-- [00msass.rb[0m
                |   |       |   |   |-- [00msassc.rb[0m
                |   |       |   |   |-- [00muglifier.rb[0m
                |   |       |   |   |-- [00myui.rb[0m
                |   |       |   |   `-- [00mzopfli.rb[0m
                |   |       |   |-- [00mautoload.rb[0m
                |   |       |   |-- [00mbabel_processor.rb[0m
                |   |       |   |-- [00mbase.rb[0m
                |   |       |   |-- [00mbower.rb[0m
                |   |       |   |-- [00mbundle.rb[0m
                |   |       |   |-- [01;34mcache[0m
                |   |       |   |   |-- [00mfile_store.rb[0m
                |   |       |   |   |-- [00mmemory_store.rb[0m
                |   |       |   |   `-- [00mnull_store.rb[0m
                |   |       |   |-- [00mcache.rb[0m
                |   |       |   |-- [00mcached_environment.rb[0m
                |   |       |   |-- [00mclosure_compressor.rb[0m
                |   |       |   |-- [00mcoffee_script_processor.rb[0m
                |   |       |   |-- [00mcompressing.rb[0m
                |   |       |   |-- [00mconfiguration.rb[0m
                |   |       |   |-- [00mcontext.rb[0m
                |   |       |   |-- [00mdependencies.rb[0m
                |   |       |   |-- [00mdigest_utils.rb[0m
                |   |       |   |-- [00mdirective_processor.rb[0m
                |   |       |   |-- [00meco_processor.rb[0m
                |   |       |   |-- [00mejs_processor.rb[0m
                |   |       |   |-- [00mencoding_utils.rb[0m
                |   |       |   |-- [00menvironment.rb[0m
                |   |       |   |-- [00merb_processor.rb[0m
                |   |       |   |-- [00merrors.rb[0m
                |   |       |   |-- [01;34mexporters[0m
                |   |       |   |   |-- [00mbase.rb[0m
                |   |       |   |   |-- [00mfile_exporter.rb[0m
                |   |       |   |   |-- [00mzlib_exporter.rb[0m
                |   |       |   |   `-- [00mzopfli_exporter.rb[0m
                |   |       |   |-- [00mexporting.rb[0m
                |   |       |   |-- [00mfile_reader.rb[0m
                |   |       |   |-- [00mhttp_utils.rb[0m
                |   |       |   |-- [00mjsminc_compressor.rb[0m
                |   |       |   |-- [00mjst_processor.rb[0m
                |   |       |   |-- [00mloader.rb[0m
                |   |       |   |-- [00mmanifest.rb[0m
                |   |       |   |-- [00mmanifest_utils.rb[0m
                |   |       |   |-- [00mmime.rb[0m
                |   |       |   |-- [00mnpm.rb[0m
                |   |       |   |-- [00mpath_dependency_utils.rb[0m
                |   |       |   |-- [00mpath_digest_utils.rb[0m
                |   |       |   |-- [00mpath_utils.rb[0m
                |   |       |   |-- [00mpaths.rb[0m
                |   |       |   |-- [01;34mpreprocessors[0m
                |   |       |   |   `-- [00mdefault_source_map.rb[0m
                |   |       |   |-- [00mprocessing.rb[0m
                |   |       |   |-- [00mprocessor_utils.rb[0m
                |   |       |   |-- [00mresolve.rb[0m
                |   |       |   |-- [00msass_cache_store.rb[0m
                |   |       |   |-- [00msass_compressor.rb[0m
                |   |       |   |-- [00msass_functions.rb[0m
                |   |       |   |-- [00msass_importer.rb[0m
                |   |       |   |-- [00msass_processor.rb[0m
                |   |       |   |-- [00msassc_compressor.rb[0m
                |   |       |   |-- [00msassc_processor.rb[0m
                |   |       |   |-- [00mserver.rb[0m
                |   |       |   |-- [00msource_map_processor.rb[0m
                |   |       |   |-- [00msource_map_utils.rb[0m
                |   |       |   |-- [00mtransformers.rb[0m
                |   |       |   |-- [00muglifier_compressor.rb[0m
                |   |       |   |-- [00munloaded_asset.rb[0m
                |   |       |   |-- [00muri_tar.rb[0m
                |   |       |   |-- [00muri_utils.rb[0m
                |   |       |   |-- [01;34mutils[0m
                |   |       |   |   `-- [00mgzip.rb[0m
                |   |       |   |-- [00mutils.rb[0m
                |   |       |   |-- [00mversion.rb[0m
                |   |       |   `-- [00myui_compressor.rb[0m
                |   |       `-- [00msprockets.rb[0m
                |   |-- [01;34msprockets-rails-3.4.2[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.md[0m
                |   |   `-- [01;34mlib[0m
                |   |       `-- [01;34msprockets[0m
                |   |           |-- [01;34mrails[0m
                |   |           |   |-- [00masset_url_processor.rb[0m
                |   |           |   |-- [00mcontext.rb[0m
                |   |           |   |-- [00mhelper.rb[0m
                |   |           |   |-- [00mquiet_assets.rb[0m
                |   |           |   |-- [00mroute_wrapper.rb[0m
                |   |           |   |-- [00msourcemapping_url_processor.rb[0m
                |   |           |   |-- [00mtask.rb[0m
                |   |           |   |-- [00mutils.rb[0m
                |   |           |   `-- [00mversion.rb[0m
                |   |           |-- [00mrails.rb[0m
                |   |           `-- [00mrailtie.rb[0m
                |   |-- [01;34msqlite3-1.6.1-x86_64-linux[0m
                |   |   |-- [00mAPI_CHANGES.md[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mCONTRIBUTING.md[0m
                |   |   |-- [00mChangeLog.cvs[0m
                |   |   |-- [00mGemfile[0m
                |   |   |-- [00mLICENSE[0m
                |   |   |-- [00mLICENSE-DEPENDENCIES[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [00mdependencies.yml[0m
                |   |   |-- [01;34mext[0m
                |   |   |   `-- [01;34msqlite3[0m
                |   |   |       |-- [00maggregator.c[0m
                |   |   |       |-- [00maggregator.h[0m
                |   |   |       |-- [00mbackup.c[0m
                |   |   |       |-- [00mbackup.h[0m
                |   |   |       |-- [00mdatabase.c[0m
                |   |   |       |-- [00mdatabase.h[0m
                |   |   |       |-- [00mexception.c[0m
                |   |   |       |-- [00mexception.h[0m
                |   |   |       |-- [00mextconf.rb[0m
                |   |   |       |-- [00msqlite3.c[0m
                |   |   |       |-- [00msqlite3_ruby.h[0m
                |   |   |       |-- [00mstatement.c[0m
                |   |   |       `-- [00mstatement.h[0m
                |   |   |-- [01;34mfaq[0m
                |   |   |   |-- [00mfaq.md[0m
                |   |   |   |-- [00mfaq.rb[0m
                |   |   |   `-- [00mfaq.yml[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34msqlite3[0m
                |   |   |   |   |-- [01;34m2.7[0m
                |   |   |   |   |   `-- [01;32msqlite3_native.so[0m
                |   |   |   |   |-- [01;34m3.0[0m
                |   |   |   |   |   `-- [01;32msqlite3_native.so[0m
                |   |   |   |   |-- [01;34m3.1[0m
                |   |   |   |   |   `-- [01;32msqlite3_native.so[0m
                |   |   |   |   |-- [01;34m3.2[0m
                |   |   |   |   |   `-- [01;32msqlite3_native.so[0m
                |   |   |   |   |-- [00mconstants.rb[0m
                |   |   |   |   |-- [00mdatabase.rb[0m
                |   |   |   |   |-- [00merrors.rb[0m
                |   |   |   |   |-- [00mpragmas.rb[0m
                |   |   |   |   |-- [00mresultset.rb[0m
                |   |   |   |   |-- [00mstatement.rb[0m
                |   |   |   |   |-- [00mtranslator.rb[0m
                |   |   |   |   |-- [00mvalue.rb[0m
                |   |   |   |   `-- [00mversion.rb[0m
                |   |   |   `-- [00msqlite3.rb[0m
                |   |   `-- [01;34mtest[0m
                |   |       |-- [00mhelper.rb[0m
                |   |       |-- [00mtest_backup.rb[0m
                |   |       |-- [00mtest_collation.rb[0m
                |   |       |-- [00mtest_database.rb[0m
                |   |       |-- [00mtest_database_flags.rb[0m
                |   |       |-- [00mtest_database_readonly.rb[0m
                |   |       |-- [00mtest_database_readwrite.rb[0m
                |   |       |-- [00mtest_deprecated.rb[0m
                |   |       |-- [00mtest_encoding.rb[0m
                |   |       |-- [00mtest_integration.rb[0m
                |   |       |-- [00mtest_integration_aggregate.rb[0m
                |   |       |-- [00mtest_integration_open_close.rb[0m
                |   |       |-- [00mtest_integration_pending.rb[0m
                |   |       |-- [00mtest_integration_resultset.rb[0m
                |   |       |-- [00mtest_integration_statement.rb[0m
                |   |       |-- [00mtest_pragmas.rb[0m
                |   |       |-- [00mtest_result_set.rb[0m
                |   |       |-- [00mtest_sqlite3.rb[0m
                |   |       |-- [00mtest_statement.rb[0m
                |   |       `-- [00mtest_statement_execute.rb[0m
                |   |-- [01;34mstimulus-rails-1.2.1[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [00mRakefile[0m
                |   |   |-- [01;34mapp[0m
                |   |   |   `-- [01;34massets[0m
                |   |   |       `-- [01;34mjavascripts[0m
                |   |   |           |-- [00mstimulus-autoloader.js[0m
                |   |   |           |-- [00mstimulus-importmap-autoloader.js[0m
                |   |   |           |-- [00mstimulus-loading.js[0m
                |   |   |           |-- [00mstimulus.js[0m
                |   |   |           |-- [00mstimulus.min.js[0m
                |   |   |           `-- [00mstimulus.min.js.map[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34mgenerators[0m
                |   |       |   `-- [01;34mstimulus[0m
                |   |       |       |-- [00mUSAGE[0m
                |   |       |       |-- [00mstimulus_generator.rb[0m
                |   |       |       `-- [01;34mtemplates[0m
                |   |       |           `-- [00mcontroller.js.tt[0m
                |   |       |-- [01;34minstall[0m
                |   |       |   |-- [01;34mapp[0m
                |   |       |   |   `-- [01;34mjavascript[0m
                |   |       |   |       `-- [01;34mcontrollers[0m
                |   |       |   |           |-- [00mapplication.js[0m
                |   |       |   |           |-- [00mhello_controller.js[0m
                |   |       |   |           |-- [00mindex_for_importmap.js[0m
                |   |       |   |           `-- [00mindex_for_node.js[0m
                |   |       |   |-- [00mstimulus_with_importmap.rb[0m
                |   |       |   `-- [00mstimulus_with_node.rb[0m
                |   |       |-- [01;34mstimulus[0m
                |   |       |   |-- [01;32mengine.rb[0m
                |   |       |   |-- [00mmanifest.rb[0m
                |   |       |   `-- [00mversion.rb[0m
                |   |       |-- [00mstimulus-rails.rb[0m
                |   |       `-- [01;34mtasks[0m
                |   |           `-- [00mstimulus_tasks.rake[0m
                |   |-- [01;34mthor-1.2.1[0m
                |   |   |-- [00mCONTRIBUTING.md[0m
                |   |   |-- [00mLICENSE.md[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [01;34mbin[0m
                |   |   |   `-- [01;32mthor[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34mthor[0m
                |   |   |   |   |-- [01;34mactions[0m
                |   |   |   |   |   |-- [00mcreate_file.rb[0m
                |   |   |   |   |   |-- [00mcreate_link.rb[0m
                |   |   |   |   |   |-- [00mdirectory.rb[0m
                |   |   |   |   |   |-- [00mempty_directory.rb[0m
                |   |   |   |   |   |-- [00mfile_manipulation.rb[0m
                |   |   |   |   |   `-- [00minject_into_file.rb[0m
                |   |   |   |   |-- [00mactions.rb[0m
                |   |   |   |   |-- [00mbase.rb[0m
                |   |   |   |   |-- [00mcommand.rb[0m
                |   |   |   |   |-- [01;34mcore_ext[0m
                |   |   |   |   |   `-- [00mhash_with_indifferent_access.rb[0m
                |   |   |   |   |-- [00merror.rb[0m
                |   |   |   |   |-- [00mgroup.rb[0m
                |   |   |   |   |-- [00minvocation.rb[0m
                |   |   |   |   |-- [01;34mline_editor[0m
                |   |   |   |   |   |-- [00mbasic.rb[0m
                |   |   |   |   |   `-- [00mreadline.rb[0m
                |   |   |   |   |-- [00mline_editor.rb[0m
                |   |   |   |   |-- [00mnested_context.rb[0m
                |   |   |   |   |-- [01;34mparser[0m
                |   |   |   |   |   |-- [00margument.rb[0m
                |   |   |   |   |   |-- [00marguments.rb[0m
                |   |   |   |   |   |-- [00moption.rb[0m
                |   |   |   |   |   `-- [00moptions.rb[0m
                |   |   |   |   |-- [00mparser.rb[0m
                |   |   |   |   |-- [00mrake_compat.rb[0m
                |   |   |   |   |-- [00mrunner.rb[0m
                |   |   |   |   |-- [01;34mshell[0m
                |   |   |   |   |   |-- [00mbasic.rb[0m
                |   |   |   |   |   |-- [00mcolor.rb[0m
                |   |   |   |   |   `-- [00mhtml.rb[0m
                |   |   |   |   |-- [00mshell.rb[0m
                |   |   |   |   |-- [00mutil.rb[0m
                |   |   |   |   `-- [00mversion.rb[0m
                |   |   |   `-- [00mthor.rb[0m
                |   |   `-- [00mthor.gemspec[0m
                |   |-- [01;34mtimeout-0.3.2[0m
                |   |   |-- [00mGemfile[0m
                |   |   |-- [00mLICENSE.txt[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   `-- [00mtimeout.rb[0m
                |   |   `-- [00mtimeout.gemspec[0m
                |   |-- [01;34mturbo-rails-1.3.3[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [00mRakefile[0m
                |   |   |-- [01;34mapp[0m
                |   |   |   |-- [01;34massets[0m
                |   |   |   |   `-- [01;34mjavascripts[0m
                |   |   |   |       |-- [00mturbo.js[0m
                |   |   |   |       |-- [00mturbo.min.js[0m
                |   |   |   |       `-- [00mturbo.min.js.map[0m
                |   |   |   |-- [01;34mchannels[0m
                |   |   |   |   `-- [01;34mturbo[0m
                |   |   |   |       |-- [01;34mstreams[0m
                |   |   |   |       |   |-- [00mbroadcasts.rb[0m
                |   |   |   |       |   `-- [00mstream_name.rb[0m
                |   |   |   |       `-- [00mstreams_channel.rb[0m
                |   |   |   |-- [01;34mcontrollers[0m
                |   |   |   |   `-- [01;34mturbo[0m
                |   |   |   |       |-- [01;34mframes[0m
                |   |   |   |       |   `-- [00mframe_request.rb[0m
                |   |   |   |       |-- [01;34mnative[0m
                |   |   |   |       |   |-- [00mnavigation.rb[0m
                |   |   |   |       |   `-- [00mnavigation_controller.rb[0m
                |   |   |   |       `-- [01;34mstreams[0m
                |   |   |   |           `-- [00mturbo_streams_tag_builder.rb[0m
                |   |   |   |-- [01;34mhelpers[0m
                |   |   |   |   `-- [01;34mturbo[0m
                |   |   |   |       |-- [00mdrive_helper.rb[0m
                |   |   |   |       |-- [00mframes_helper.rb[0m
                |   |   |   |       |-- [00mincludes_helper.rb[0m
                |   |   |   |       |-- [01;34mstreams[0m
                |   |   |   |       |   `-- [00maction_helper.rb[0m
                |   |   |   |       `-- [00mstreams_helper.rb[0m
                |   |   |   |-- [01;34mjavascript[0m
                |   |   |   |   `-- [01;34mturbo[0m
                |   |   |   |       |-- [00mcable.js[0m
                |   |   |   |       |-- [00mcable_stream_source_element.js[0m
                |   |   |   |       |-- [00mfetch_requests.js[0m
                |   |   |   |       |-- [00mindex.js[0m
                |   |   |   |       `-- [00msnakeize.js[0m
                |   |   |   |-- [01;34mjobs[0m
                |   |   |   |   `-- [01;34mturbo[0m
                |   |   |   |       `-- [01;34mstreams[0m
                |   |   |   |           |-- [00maction_broadcast_job.rb[0m
                |   |   |   |           `-- [00mbroadcast_job.rb[0m
                |   |   |   `-- [01;34mmodels[0m
                |   |   |       |-- [01;34mconcerns[0m
                |   |   |       |   `-- [01;34mturbo[0m
                |   |   |       |       `-- [00mbroadcastable.rb[0m
                |   |   |       `-- [01;34mturbo[0m
                |   |   |           `-- [01;34mstreams[0m
                |   |   |               `-- [00mtag_builder.rb[0m
                |   |   |-- [01;34mconfig[0m
                |   |   |   `-- [00mroutes.rb[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34minstall[0m
                |   |       |   |-- [00mturbo_needs_redis.rb[0m
                |   |       |   |-- [00mturbo_with_importmap.rb[0m
                |   |       |   `-- [00mturbo_with_node.rb[0m
                |   |       |-- [01;34mtasks[0m
                |   |       |   `-- [00mturbo_tasks.rake[0m
                |   |       |-- [01;34mturbo[0m
                |   |       |   |-- [00mengine.rb[0m
                |   |       |   |-- [00mtest_assertions.rb[0m
                |   |       |   `-- [00mversion.rb[0m
                |   |       `-- [00mturbo-rails.rb[0m
                |   |-- [01;34mtzinfo-2.0.6[0m
                |   |   |-- [00mCHANGES.md[0m
                |   |   |-- [00mLICENSE[0m
                |   |   |-- [00mREADME.md[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34mtzinfo[0m
                |   |       |   |-- [00mannual_rules.rb[0m
                |   |       |   |-- [00mcountry.rb[0m
                |   |       |   |-- [00mcountry_timezone.rb[0m
                |   |       |   |-- [00mdata_source.rb[0m
                |   |       |   |-- [01;34mdata_sources[0m
                |   |       |   |   |-- [00mconstant_offset_data_timezone_info.rb[0m
                |   |       |   |   |-- [00mcountry_info.rb[0m
                |   |       |   |   |-- [00mdata_timezone_info.rb[0m
                |   |       |   |   |-- [00mlinked_timezone_info.rb[0m
                |   |       |   |   |-- [00mposix_time_zone_parser.rb[0m
                |   |       |   |   |-- [00mruby_data_source.rb[0m
                |   |       |   |   |-- [00mtimezone_info.rb[0m
                |   |       |   |   |-- [00mtransitions_data_timezone_info.rb[0m
                |   |       |   |   |-- [00mzoneinfo_data_source.rb[0m
                |   |       |   |   `-- [00mzoneinfo_reader.rb[0m
                |   |       |   |-- [00mdata_sources.rb[0m
                |   |       |   |-- [00mdata_timezone.rb[0m
                |   |       |   |-- [00mdatetime_with_offset.rb[0m
                |   |       |   |-- [01;34mformat1[0m
                |   |       |   |   |-- [00mcountry_definer.rb[0m
                |   |       |   |   |-- [00mcountry_index_definition.rb[0m
                |   |       |   |   |-- [00mtimezone_definer.rb[0m
                |   |       |   |   |-- [00mtimezone_definition.rb[0m
                |   |       |   |   `-- [00mtimezone_index_definition.rb[0m
                |   |       |   |-- [00mformat1.rb[0m
                |   |       |   |-- [01;34mformat2[0m
                |   |       |   |   |-- [00mcountry_definer.rb[0m
                |   |       |   |   |-- [00mcountry_index_definer.rb[0m
                |   |       |   |   |-- [00mcountry_index_definition.rb[0m
                |   |       |   |   |-- [00mtimezone_definer.rb[0m
                |   |       |   |   |-- [00mtimezone_definition.rb[0m
                |   |       |   |   |-- [00mtimezone_index_definer.rb[0m
                |   |       |   |   `-- [00mtimezone_index_definition.rb[0m
                |   |       |   |-- [00mformat2.rb[0m
                |   |       |   |-- [00minfo_timezone.rb[0m
                |   |       |   |-- [00mlinked_timezone.rb[0m
                |   |       |   |-- [00moffset_timezone_period.rb[0m
                |   |       |   |-- [00mruby_core_support.rb[0m
                |   |       |   |-- [00mstring_deduper.rb[0m
                |   |       |   |-- [00mtime_with_offset.rb[0m
                |   |       |   |-- [00mtimestamp.rb[0m
                |   |       |   |-- [00mtimestamp_with_offset.rb[0m
                |   |       |   |-- [00mtimezone.rb[0m
                |   |       |   |-- [00mtimezone_offset.rb[0m
                |   |       |   |-- [00mtimezone_period.rb[0m
                |   |       |   |-- [00mtimezone_proxy.rb[0m
                |   |       |   |-- [00mtimezone_transition.rb[0m
                |   |       |   |-- [00mtransition_rule.rb[0m
                |   |       |   |-- [00mtransitions_timezone_period.rb[0m
                |   |       |   |-- [00mversion.rb[0m
                |   |       |   `-- [00mwith_offset.rb[0m
                |   |       `-- [00mtzinfo.rb[0m
                |   |-- [01;34mweb-console-4.2.0[0m
                |   |   |-- [00mCHANGELOG.markdown[0m
                |   |   |-- [00mMIT-LICENSE[0m
                |   |   |-- [00mREADME.markdown[0m
                |   |   |-- [00mRakefile[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [00mweb-console.rb[0m
                |   |       |-- [01;34mweb_console[0m
                |   |       |   |-- [00mcontext.rb[0m
                |   |       |   |-- [00merrors.rb[0m
                |   |       |   |-- [00mevaluator.rb[0m
                |   |       |   |-- [00mexception_mapper.rb[0m
                |   |       |   |-- [00mextensions.rb[0m
                |   |       |   |-- [00minjector.rb[0m
                |   |       |   |-- [00minterceptor.rb[0m
                |   |       |   |-- [01;34mlocales[0m
                |   |       |   |   `-- [00men.yml[0m
                |   |       |   |-- [00mmiddleware.rb[0m
                |   |       |   |-- [00mpermissions.rb[0m
                |   |       |   |-- [00mrailtie.rb[0m
                |   |       |   |-- [00mrequest.rb[0m
                |   |       |   |-- [00msession.rb[0m
                |   |       |   |-- [00msource_location.rb[0m
                |   |       |   |-- [01;34mtasks[0m
                |   |       |   |   |-- [00mextensions.rake[0m
                |   |       |   |   `-- [00mtemplates.rake[0m
                |   |       |   |-- [00mtemplate.rb[0m
                |   |       |   |-- [01;34mtemplates[0m
                |   |       |   |   |-- [00m_inner_console_markup.html.erb[0m
                |   |       |   |   |-- [00m_markup.html.erb[0m
                |   |       |   |   |-- [00m_prompt_box_markup.html.erb[0m
                |   |       |   |   |-- [00mconsole.js.erb[0m
                |   |       |   |   |-- [00merror_page.js.erb[0m
                |   |       |   |   |-- [00mindex.html.erb[0m
                |   |       |   |   |-- [01;34mlayouts[0m
                |   |       |   |   |   |-- [00minlined_string.erb[0m
                |   |       |   |   |   `-- [00mjavascript.erb[0m
                |   |       |   |   |-- [00mmain.js.erb[0m
                |   |       |   |   |-- [00mregular_page.js.erb[0m
                |   |       |   |   `-- [00mstyle.css.erb[0m
                |   |       |   |-- [01;34mtesting[0m
                |   |       |   |   |-- [00merb_precompiler.rb[0m
                |   |       |   |   |-- [00mfake_middleware.rb[0m
                |   |       |   |   `-- [00mhelper.rb[0m
                |   |       |   |-- [00mversion.rb[0m
                |   |       |   |-- [00mview.rb[0m
                |   |       |   `-- [00mwhiny_request.rb[0m
                |   |       `-- [00mweb_console.rb[0m
                |   |-- [01;34mwebdrivers-5.2.0[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mLICENSE.txt[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34mwebdrivers[0m
                |   |   |   |   |-- [00mRakefile[0m
                |   |   |   |   |-- [00mchrome_finder.rb[0m
                |   |   |   |   |-- [00mchromedriver.rb[0m
                |   |   |   |   |-- [00mcommon.rb[0m
                |   |   |   |   |-- [00medge_finder.rb[0m
                |   |   |   |   |-- [00medgedriver.rb[0m
                |   |   |   |   |-- [00mgeckodriver.rb[0m
                |   |   |   |   |-- [00miedriver.rb[0m
                |   |   |   |   |-- [00mlogger.rb[0m
                |   |   |   |   |-- [00mnetwork.rb[0m
                |   |   |   |   |-- [00mrailtie.rb[0m
                |   |   |   |   |-- [00msystem.rb[0m
                |   |   |   |   |-- [01;34mtasks[0m
                |   |   |   |   |   |-- [00mchromedriver.rake[0m
                |   |   |   |   |   |-- [00medgedriver.rake[0m
                |   |   |   |   |   |-- [00mgeckodriver.rake[0m
                |   |   |   |   |   `-- [00miedriver.rake[0m
                |   |   |   |   `-- [00mversion.rb[0m
                |   |   |   `-- [00mwebdrivers.rb[0m
                |   |   `-- [01;34mspec[0m
                |   |       |-- [00mspec_helper.rb[0m
                |   |       |-- [01;34mwebdrivers[0m
                |   |       |   |-- [00mchrome_finder_spec.rb[0m
                |   |       |   |-- [00mchromedriver_spec.rb[0m
                |   |       |   |-- [00medge_finder_spec.rb[0m
                |   |       |   |-- [00medgedriver_spec.rb[0m
                |   |       |   |-- [00mgeckodriver_spec.rb[0m
                |   |       |   |-- [00mi_edriver_spec.rb[0m
                |   |       |   |-- [00msystem_spec.rb[0m
                |   |       |   `-- [00mwebdrivers_spec.rb[0m
                |   |       `-- [00mwebdrivers_proxy_support_spec.rb[0m
                |   |-- [01;34mwebsocket-1.2.9[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mGemfile[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [00mRakefile[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34mwebsocket[0m
                |   |   |   |   |-- [00merror.rb[0m
                |   |   |   |   |-- [00mexception_handler.rb[0m
                |   |   |   |   |-- [01;34mframe[0m
                |   |   |   |   |   |-- [00mbase.rb[0m
                |   |   |   |   |   |-- [00mdata.rb[0m
                |   |   |   |   |   |-- [01;34mhandler[0m
                |   |   |   |   |   |   |-- [00mbase.rb[0m
                |   |   |   |   |   |   |-- [00mhandler03.rb[0m
                |   |   |   |   |   |   |-- [00mhandler04.rb[0m
                |   |   |   |   |   |   |-- [00mhandler05.rb[0m
                |   |   |   |   |   |   |-- [00mhandler07.rb[0m
                |   |   |   |   |   |   `-- [00mhandler75.rb[0m
                |   |   |   |   |   |-- [00mhandler.rb[0m
                |   |   |   |   |   |-- [01;34mincoming[0m
                |   |   |   |   |   |   |-- [00mclient.rb[0m
                |   |   |   |   |   |   `-- [00mserver.rb[0m
                |   |   |   |   |   |-- [00mincoming.rb[0m
                |   |   |   |   |   |-- [01;34moutgoing[0m
                |   |   |   |   |   |   |-- [00mclient.rb[0m
                |   |   |   |   |   |   `-- [00mserver.rb[0m
                |   |   |   |   |   `-- [00moutgoing.rb[0m
                |   |   |   |   |-- [00mframe.rb[0m
                |   |   |   |   |-- [01;34mhandshake[0m
                |   |   |   |   |   |-- [00mbase.rb[0m
                |   |   |   |   |   |-- [00mclient.rb[0m
                |   |   |   |   |   |-- [01;34mhandler[0m
                |   |   |   |   |   |   |-- [00mbase.rb[0m
                |   |   |   |   |   |   |-- [00mclient.rb[0m
                |   |   |   |   |   |   |-- [00mclient01.rb[0m
                |   |   |   |   |   |   |-- [00mclient04.rb[0m
                |   |   |   |   |   |   |-- [00mclient11.rb[0m
                |   |   |   |   |   |   |-- [00mclient75.rb[0m
                |   |   |   |   |   |   |-- [00mclient76.rb[0m
                |   |   |   |   |   |   |-- [00mserver.rb[0m
                |   |   |   |   |   |   |-- [00mserver04.rb[0m
                |   |   |   |   |   |   |-- [00mserver75.rb[0m
                |   |   |   |   |   |   `-- [00mserver76.rb[0m
                |   |   |   |   |   |-- [00mhandler.rb[0m
                |   |   |   |   |   `-- [00mserver.rb[0m
                |   |   |   |   |-- [00mhandshake.rb[0m
                |   |   |   |   |-- [00mnice_inspect.rb[0m
                |   |   |   |   `-- [00mversion.rb[0m
                |   |   |   `-- [00mwebsocket.rb[0m
                |   |   |-- [01;34mspec[0m
                |   |   |   |-- [01;34mframe[0m
                |   |   |   |   |-- [00mincoming_03_spec.rb[0m
                |   |   |   |   |-- [00mincoming_04_spec.rb[0m
                |   |   |   |   |-- [00mincoming_05_spec.rb[0m
                |   |   |   |   |-- [00mincoming_07_spec.rb[0m
                |   |   |   |   |-- [00mincoming_75_spec.rb[0m
                |   |   |   |   |-- [00mincoming_common_spec.rb[0m
                |   |   |   |   |-- [00mmasking_spec.rb[0m
                |   |   |   |   |-- [00moutgoing_03_spec.rb[0m
                |   |   |   |   |-- [00moutgoing_04_spec.rb[0m
                |   |   |   |   |-- [00moutgoing_05_spec.rb[0m
                |   |   |   |   |-- [00moutgoing_07_spec.rb[0m
                |   |   |   |   |-- [00moutgoing_75_spec.rb[0m
                |   |   |   |   `-- [00moutgoing_common_spec.rb[0m
                |   |   |   |-- [01;34mhandshake[0m
                |   |   |   |   |-- [00mclient_04_spec.rb[0m
                |   |   |   |   |-- [00mclient_11_spec.rb[0m
                |   |   |   |   |-- [00mclient_75_spec.rb[0m
                |   |   |   |   |-- [00mclient_76_spec.rb[0m
                |   |   |   |   |-- [00mserver_04_spec.rb[0m
                |   |   |   |   |-- [00mserver_75_spec.rb[0m
                |   |   |   |   `-- [00mserver_76_spec.rb[0m
                |   |   |   |-- [00mspec_helper.rb[0m
                |   |   |   `-- [01;34msupport[0m
                |   |   |       |-- [00mall_client_drafts.rb[0m
                |   |   |       |-- [00mall_server_drafts.rb[0m
                |   |   |       |-- [00mframes_base.rb[0m
                |   |   |       |-- [00mhandshake_requests.rb[0m
                |   |   |       |-- [00mincoming_frames.rb[0m
                |   |   |       |-- [00moutgoing_frames.rb[0m
                |   |   |       `-- [00moverwrites.rb[0m
                |   |   `-- [00mwebsocket.gemspec[0m
                |   |-- [01;34mwebsocket-driver-0.7.5[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mLICENSE.md[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [01;34mext[0m
                |   |   |   `-- [01;34mwebsocket-driver[0m
                |   |   |       |-- [00mMakefile[0m
                |   |   |       |-- [00mWebsocketMaskService.java[0m
                |   |   |       |-- [00mextconf.rb[0m
                |   |   |       |-- [00mwebsocket_mask.c[0m
                |   |   |       |-- [00mwebsocket_mask.o[0m
                |   |   |       `-- [01;32mwebsocket_mask.so[0m
                |   |   `-- [01;34mlib[0m
                |   |       |-- [01;34mwebsocket[0m
                |   |       |   |-- [01;34mdriver[0m
                |   |       |   |   |-- [00mclient.rb[0m
                |   |       |   |   |-- [00mdraft75.rb[0m
                |   |       |   |   |-- [00mdraft76.rb[0m
                |   |       |   |   |-- [00mevent_emitter.rb[0m
                |   |       |   |   |-- [00mheaders.rb[0m
                |   |       |   |   |-- [01;34mhybi[0m
                |   |       |   |   |   |-- [00mframe.rb[0m
                |   |       |   |   |   `-- [00mmessage.rb[0m
                |   |       |   |   |-- [00mhybi.rb[0m
                |   |       |   |   |-- [00mproxy.rb[0m
                |   |       |   |   |-- [00mserver.rb[0m
                |   |       |   |   `-- [00mstream_reader.rb[0m
                |   |       |   |-- [00mdriver.rb[0m
                |   |       |   |-- [01;34mhttp[0m
                |   |       |   |   |-- [00mheaders.rb[0m
                |   |       |   |   |-- [00mrequest.rb[0m
                |   |       |   |   `-- [00mresponse.rb[0m
                |   |       |   |-- [00mhttp.rb[0m
                |   |       |   |-- [00mmask.rb[0m
                |   |       |   `-- [00mwebsocket_mask.rb[0m
                |   |       `-- [01;32mwebsocket_mask.so[0m
                |   |-- [01;34mwebsocket-extensions-0.1.5[0m
                |   |   |-- [00mCHANGELOG.md[0m
                |   |   |-- [00mLICENSE.md[0m
                |   |   |-- [00mREADME.md[0m
                |   |   `-- [01;34mlib[0m
                |   |       `-- [01;34mwebsocket[0m
                |   |           |-- [01;34mextensions[0m
                |   |           |   `-- [00mparser.rb[0m
                |   |           `-- [00mextensions.rb[0m
                |   |-- [01;34mxpath-3.2.0[0m
                |   |   |-- [00mREADME.md[0m
                |   |   |-- [01;34mlib[0m
                |   |   |   |-- [01;34mxpath[0m
                |   |   |   |   |-- [00mdsl.rb[0m
                |   |   |   |   |-- [00mexpression.rb[0m
                |   |   |   |   |-- [00mliteral.rb[0m
                |   |   |   |   |-- [00mrenderer.rb[0m
                |   |   |   |   |-- [00munion.rb[0m
                |   |   |   |   `-- [00mversion.rb[0m
                |   |   |   `-- [00mxpath.rb[0m
                |   |   `-- [01;34mspec[0m
                |   |       |-- [01;34mfixtures[0m
                |   |       |   |-- [00mform.html[0m
                |   |       |   |-- [00msimple.html[0m
                |   |       |   `-- [00mstuff.html[0m
                |   |       |-- [00mspec_helper.rb[0m
                |   |       |-- [00munion_spec.rb[0m
                |   |       `-- [00mxpath_spec.rb[0m
                |   `-- [01;34mzeitwerk-2.6.7[0m
                |       |-- [00mMIT-LICENSE[0m
                |       |-- [00mREADME.md[0m
                |       `-- [01;34mlib[0m
                |           |-- [01;34mzeitwerk[0m
                |           |   |-- [00merror.rb[0m
                |           |   |-- [00mexplicit_namespace.rb[0m
                |           |   |-- [00mgem_inflector.rb[0m
                |           |   |-- [00mgem_loader.rb[0m
                |           |   |-- [00minflector.rb[0m
                |           |   |-- [00minternal.rb[0m
                |           |   |-- [00mkernel.rb[0m
                |           |   |-- [01;34mloader[0m
                |           |   |   |-- [00mcallbacks.rb[0m
                |           |   |   |-- [00mconfig.rb[0m
                |           |   |   |-- [00meager_load.rb[0m
                |           |   |   `-- [00mhelpers.rb[0m
                |           |   |-- [00mloader.rb[0m
                |           |   |-- [00mreal_mod_name.rb[0m
                |           |   |-- [00mregistry.rb[0m
                |           |   `-- [00mversion.rb[0m
                |           `-- [00mzeitwerk.rb[0m
                |-- [01;34mplugins[0m
                `-- [01;34mspecifications[0m
                    |-- [00mactioncable-7.0.4.2.gemspec[0m
                    |-- [00mactionmailbox-7.0.4.2.gemspec[0m
                    |-- [00mactionmailer-7.0.4.2.gemspec[0m
                    |-- [00mactionpack-7.0.4.2.gemspec[0m
                    |-- [00mactiontext-7.0.4.2.gemspec[0m
                    |-- [00mactionview-7.0.4.2.gemspec[0m
                    |-- [00mactivejob-7.0.4.2.gemspec[0m
                    |-- [00mactivemodel-7.0.4.2.gemspec[0m
                    |-- [00mactiverecord-7.0.4.2.gemspec[0m
                    |-- [00mactivestorage-7.0.4.2.gemspec[0m
                    |-- [00mactivesupport-7.0.4.2.gemspec[0m
                    |-- [00maddressable-2.8.1.gemspec[0m
                    |-- [00mbindex-0.8.1.gemspec[0m
                    |-- [00mbootsnap-1.16.0.gemspec[0m
                    |-- [00mbuilder-3.2.4.gemspec[0m
                    |-- [00mcapybara-3.38.0.gemspec[0m
                    |-- [00mconcurrent-ruby-1.2.2.gemspec[0m
                    |-- [00mcrass-1.0.6.gemspec[0m
                    |-- [00mdate-3.3.3.gemspec[0m
                    |-- [00mdebug-1.7.1.gemspec[0m
                    |-- [00merubi-1.12.0.gemspec[0m
                    |-- [00mglobalid-1.1.0.gemspec[0m
                    |-- [00mi18n-1.12.0.gemspec[0m
                    |-- [00mimportmap-rails-1.1.5.gemspec[0m
                    |-- [00mio-console-0.6.0.gemspec[0m
                    |-- [00mirb-1.6.2.gemspec[0m
                    |-- [00mjbuilder-2.11.5.gemspec[0m
                    |-- [00mloofah-2.19.1.gemspec[0m
                    |-- [00mmail-2.8.1.gemspec[0m
                    |-- [00mmarcel-1.0.2.gemspec[0m
                    |-- [00mmatrix-0.4.2.gemspec[0m
                    |-- [00mmethod_source-1.0.0.gemspec[0m
                    |-- [00mmini_mime-1.1.2.gemspec[0m
                    |-- [00mminitest-5.17.0.gemspec[0m
                    |-- [00mmsgpack-1.6.0.gemspec[0m
                    |-- [00mnet-imap-0.3.4.gemspec[0m
                    |-- [00mnet-pop-0.1.2.gemspec[0m
                    |-- [00mnet-protocol-0.2.1.gemspec[0m
                    |-- [00mnet-smtp-0.3.3.gemspec[0m
                    |-- [00mnio4r-2.5.8.gemspec[0m
                    |-- [00mnokogiri-1.14.2-x86_64-linux.gemspec[0m
                    |-- [00mpublic_suffix-5.0.1.gemspec[0m
                    |-- [00mpuma-5.6.5.gemspec[0m
                    |-- [00mracc-1.6.2.gemspec[0m
                    |-- [00mrack-2.2.6.2.gemspec[0m
                    |-- [00mrack-test-2.0.2.gemspec[0m
                    |-- [00mrails-7.0.4.2.gemspec[0m
                    |-- [00mrails-dom-testing-2.0.3.gemspec[0m
                    |-- [00mrails-html-sanitizer-1.5.0.gemspec[0m
                    |-- [00mrailties-7.0.4.2.gemspec[0m
                    |-- [00mrake-13.0.6.gemspec[0m
                    |-- [00mregexp_parser-2.7.0.gemspec[0m
                    |-- [00mreline-0.3.2.gemspec[0m
                    |-- [00mrexml-3.2.5.gemspec[0m
                    |-- [00mrubyzip-2.3.2.gemspec[0m
                    |-- [00mselenium-webdriver-4.8.1.gemspec[0m
                    |-- [00msprockets-4.2.0.gemspec[0m
                    |-- [00msprockets-rails-3.4.2.gemspec[0m
                    |-- [00msqlite3-1.6.1-x86_64-linux.gemspec[0m
                    |-- [00mstimulus-rails-1.2.1.gemspec[0m
                    |-- [00mthor-1.2.1.gemspec[0m
                    |-- [00mtimeout-0.3.2.gemspec[0m
                    |-- [00mturbo-rails-1.3.3.gemspec[0m
                    |-- [00mtzinfo-2.0.6.gemspec[0m
                    |-- [00mweb-console-4.2.0.gemspec[0m
                    |-- [00mwebdrivers-5.2.0.gemspec[0m
                    |-- [00mwebsocket-1.2.9.gemspec[0m
                    |-- [00mwebsocket-driver-0.7.5.gemspec[0m
                    |-- [00mwebsocket-extensions-0.1.5.gemspec[0m
                    |-- [00mxpath-3.2.0.gemspec[0m
                    `-- [00mzeitwerk-2.6.7.gemspec[0m

1104 directories, 4629 files
```

---

### ***Resumen***

1. **Configuración Recomendada:** *Usa `bundle3.0 config set --local path './vendor/bundle'` para configurar el directorio de instalación de gemas.*
2. **Eliminación de Configuración Anterior:** *Limpia el directorio `vendor` anterior con `rm -rf ./vendor/`.*
3. **Instalación de Dependencias:** *Ejecuta `bundle3.0 install` para instalar las gemas en el nuevo directorio configurado.*

- *Con esta configuración y procedimientos, puedes gestionar las dependencias de tu proyecto Rails de manera más eficiente y organizada. Si surgen problemas adicionales, consulta la documentación de Bundler y otros recursos de soporte.*

---

### **Problema al Iniciar el Servidor Rails**

**Al intentar iniciar el servidor de Rails con el siguiente comando:**

```bash
./bin/rails server
```

**puedes encontrar el siguiente error:**

```bash
./bin/rails server
=> Booting Puma
=> Rails 7.0.4.2 application starting in development
=> Run `bin/rails server --help` for more startup options
Exiting
/App/vendor/bundle/ruby/3.0.0/gems/tzinfo-2.0.6/lib/tzinfo/data_source.rb:159:in `rescue in create_default_data_source': tzinfo-data is not present. Please add gem 'tzinfo-data' to your Gemfile and run bundle install (TZInfo::DataSourceNotFound)
        from /App/vendor/bundle/ruby/3.0.0/gems/tzinfo-2.0.6/lib/tzinfo/data_source.rb:156:in `create_default_data_source'
        from /App/vendor/bundle/ruby/3.0.0/gems/tzinfo-2.0.6/lib/tzinfo/data_source.rb:55:in `block in get'
        from /App/vendor/bundle/ruby/3.0.0/gems/tzinfo-2.0.6/lib/tzinfo/data_source.rb:54:in `synchronize'
        from /App/vendor/bundle/ruby/3.0.0/gems/tzinfo-2.0.6/lib/tzinfo/data_source.rb:54:in `get'
        from /App/vendor/bundle/ruby/3.0.0/gems/activesupport-7.0.4.2/lib/active_support/railtie.rb:88:in `block in <class:Railtie>'
        from /App/vendor/bundle/ruby/3.0.0/gems/railties-7.0.4.2/lib/rails/initializable.rb:32:in `instance_exec'
        from /App/vendor/bundle/ruby/3.0.0/gems/railties-7.0.4.2/lib/rails/initializable.rb:32:in `run'
        from /App/vendor/bundle/ruby/3.0.0/gems/railties-7.0.4.2/lib/rails/initializable.rb:61:in `block in run_initializers'
        from /usr/lib/ruby/3.0.0/tsort.rb:228:in `block in tsort_each'
        from /usr/lib/ruby/3.0.0/tsort.rb:350:in `block (2 levels) in each_strongly_connected_component'
        from /usr/lib/ruby/3.0.0/tsort.rb:431:in `each_strongly_connected_component_from'
        from /usr/lib/ruby/3.0.0/tsort.rb:349:in `block in each_strongly_connected_component'
        from /usr/lib/ruby/3.0.0/tsort.rb:347:in `each'
        from /usr/lib/ruby/3.0.0/tsort.rb:347:in `call'
        from /usr/lib/ruby/3.0.0/tsort.rb:347:in `each_strongly_connected_component'
        from /usr/lib/ruby/3.0.0/tsort.rb:226:in `tsort_each'
        from /usr/lib/ruby/3.0.0/tsort.rb:205:in `tsort_each'
        from /App/vendor/bundle/ruby/3.0.0/gems/railties-7.0.4.2/lib/rails/initializable.rb:60:in `run_initializers'
        from /App/vendor/bundle/ruby/3.0.0/gems/railties-7.0.4.2/lib/rails/application.rb:372:in `initialize!'
        from /App/config/environment.rb:5:in `<main>'
        from config.ru:3:in `require_relative'
        from config.ru:3:in `block in <main>'
        from /App/vendor/bundle/ruby/3.0.0/gems/rack-2.2.6.2/lib/rack/builder.rb:116:in `eval'
        from /App/vendor/bundle/ruby/3.0.0/gems/rack-2.2.6.2/lib/rack/builder.rb:116:in `new_from_string'
        from /App/vendor/bundle/ruby/3.0.0/gems/rack-2.2.6.2/lib/rack/builder.rb:105:in `load_file'
        from /App/vendor/bundle/ruby/3.0.0/gems/rack-2.2.6.2/lib/rack/builder.rb:66:in `parse_file'
        from /App/vendor/bundle/ruby/3.0.0/gems/rack-2.2.6.2/lib/rack/server.rb:349:in `build_app_and_options_from_config'
        from /App/vendor/bundle/ruby/3.0.0/gems/rack-2.2.6.2/lib/rack/server.rb:249:in `app'
        from /App/vendor/bundle/ruby/3.0.0/gems/rack-2.2.6.2/lib/rack/server.rb:422:in `wrapped_app'
        from /App/vendor/bundle/ruby/3.0.0/gems/railties-7.0.4.2/lib/rails/commands/server/server_command.rb:76:in `log_to_stdout'
        from /App/vendor/bundle/ruby/3.0.0/gems/railties-7.0.4.2/lib/rails/commands/server/server_command.rb:36:in `start'
        from /App/vendor/bundle/ruby/3.0.0/gems/railties-7.0.4.2/lib/rails/commands/server/server_command.rb:143:in `block in perform'
        from <internal:kernel>:90:in `tap'
        from /App/vendor/bundle/ruby/3.0.0/gems/railties-7.0.4.2/lib/rails/commands/server/server_command.rb:134:in `perform'
        from /App/vendor/bundle/ruby/3.0.0/gems/thor-1.2.1/lib/thor/command.rb:27:in `run'
        from /App/vendor/bundle/ruby/3.0.0/gems/thor-1.2.1/lib/thor/invocation.rb:127:in `invoke_command'
        from /App/vendor/bundle/ruby/3.0.0/gems/thor-1.2.1/lib/thor.rb:392:in `dispatch'
        from /App/vendor/bundle/ruby/3.0.0/gems/railties-7.0.4.2/lib/rails/command/base.rb:87:in `perform'
        from /App/vendor/bundle/ruby/3.0.0/gems/railties-7.0.4.2/lib/rails/command.rb:48:in `invoke'
        from /App/vendor/bundle/ruby/3.0.0/gems/railties-7.0.4.2/lib/rails/commands.rb:18:in `<main>'
        from /App/vendor/bundle/ruby/3.0.0/gems/bootsnap-1.16.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:32:in `require'
        from /App/vendor/bundle/ruby/3.0.0/gems/bootsnap-1.16.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:32:in `require'
        from ./bin/rails:4:in `<main>'
/App/vendor/bundle/ruby/3.0.0/gems/tzinfo-2.0.6/lib/tzinfo/data_sources/zoneinfo_data_source.rb:252:in `initialize': None of the paths included in TZInfo::DataSources::ZoneinfoDataSource.search_path are valid zoneinfo directories. (TZInfo::DataSources::ZoneinfoDirectoryNotFound)
        from /App/vendor/bundle/ruby/3.0.0/gems/tzinfo-2.0.6/lib/tzinfo/data_source.rb:157:in `new'
        from /App/vendor/bundle/ruby/3.0.0/gems/tzinfo-2.0.6/lib/tzinfo/data_source.rb:157:in `create_default_data_source'
        from /App/vendor/bundle/ruby/3.0.0/gems/tzinfo-2.0.6/lib/tzinfo/data_source.rb:55:in `block in get'
        from /App/vendor/bundle/ruby/3.0.0/gems/tzinfo-2.0.6/lib/tzinfo/data_source.rb:54:in `synchronize'
        from /App/vendor/bundle/ruby/3.0.0/gems/tzinfo-2.0.6/lib/tzinfo/data_source.rb:54:in `get'
        from /App/vendor/bundle/ruby/3.0.0/gems/activesupport-7.0.4.2/lib/active_support/railtie.rb:88:in `block in <class:Railtie>'
        from /App/vendor/bundle/ruby/3.0.0/gems/railties-7.0.4.2/lib/rails/initializable.rb:32:in `instance_exec'
        from /App/vendor/bundle/ruby/3.0.0/gems/railties-7.0.4.2/lib/rails/initializable.rb:32:in `run'
        from /App/vendor/bundle/ruby/3.0.0/gems/railties-7.0.4.2/lib/rails/initializable.rb:61:in `block in run_initializers'
        from /usr/lib/ruby/3.0.0/tsort.rb:228:in `block in tsort_each'
        from /usr/lib/ruby/3.0.0/tsort.rb:350:in `block (2 levels) in each_strongly_connected_component'
        from /usr/lib/ruby/3.0.0/tsort.rb:431:in `each_strongly_connected_component_from'
        from /usr/lib/ruby/3.0.0/tsort.rb:349:in `block in each_strongly_connected_component'
        from /usr/lib/ruby/3.0.0/tsort.rb:347:in `each'
        from /usr/lib/ruby/3.0.0/tsort.rb:347:in `call'
        from /usr/lib/ruby/3.0.0/tsort.rb:347:in `each_strongly_connected_component'
        from /usr/lib/ruby/3.0.0/tsort.rb:226:in `tsort_each'
        from /usr/lib/ruby/3.0.0/tsort.rb:205:in `tsort_each'
        from /App/vendor/bundle/ruby/3.0.0/gems/railties-7.0.4.2/lib/rails/initializable.rb:60:in `run_initializers'
        from /App/vendor/bundle/ruby/3.0.0/gems/railties-7.0.4.2/lib/rails/application.rb:372:in `initialize!'
        from /App/config/environment.rb:5:in `<main>'
        from config.ru:3:in `require_relative'
        from config.ru:3:in `block in <main>'
        from /App/vendor/bundle/ruby/3.0.0/gems/rack-2.2.6.2/lib/rack/builder.rb:116:in `eval'
        from /App/vendor/bundle/ruby/3.0.0/gems/rack-2.2.6.2/lib/rack/builder.rb:116:in `new_from_string'
        from /App/vendor/bundle/ruby/3.0.0/gems/rack-2.2.6.2/lib/rack/builder.rb:105:in `load_file'
        from /App/vendor/bundle/ruby/3.0.0/gems/rack-2.2.6.2/lib/rack/builder.rb:66:in `parse_file'
        from /App/vendor/bundle/ruby/3.0.0/gems/rack-2.2.6.2/lib/rack/server.rb:349:in `build_app_and_options_from_config'
        from /App/vendor/bundle/ruby/3.0.0/gems/rack-2.2.6.2/lib/rack/server.rb:249:in `app'
        from /App/vendor/bundle/ruby/3.0.0/gems/rack-2.2.6.2/lib/rack/server.rb:422:in `wrapped_app'
        from /App/vendor/bundle/ruby/3.0.0/gems/railties-7.0.4.2/lib/rails/commands/server/server_command.rb:76:in `log_to_stdout'
        from /App/vendor/bundle/ruby/3.0.0/gems/railties-7.0.4.2/lib/rails/commands/server/server_command.rb:36:in `start'
        from /App/vendor/bundle/ruby/3.0.0/gems/railties-7.0.4.2/lib/rails/commands/server/server_command.rb:143:in `block in perform'
        from <internal:kernel>:90:in `tap'
        from /App/vendor/bundle/ruby/3.0.0/gems/railties-7.0.4.2/lib/rails/commands/server/server_command.rb:134:in `perform'
        from /App/vendor/bundle/ruby/3.0.0/gems/thor-1.2.1/lib/thor/command.rb:27:in `run'
        from /App/vendor/bundle/ruby/3.0.0/gems/thor-1.2.1/lib/thor/invocation.rb:127:in `invoke_command'
        from /App/vendor/bundle/ruby/3.0.0/gems/thor-1.2.1/lib/thor.rb:392:in `dispatch'
        from /App/vendor/bundle/ruby/3.0.0/gems/railties-7.0.4.2/lib/rails/command/base.rb:87:in `perform'
        from /App/vendor/bundle/ruby/3.0.0/gems/railties-7.0.4.2/lib/rails/command.rb:48:in `invoke'
        from /App/vendor/bundle/ruby/3.0.0/gems/railties-7.0.4.2/lib/rails/commands.rb:18:in `<main>'
        from /App/vendor/bundle/ruby/3.0.0/gems/bootsnap-1.16.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:32:in `require'
        from /App/vendor/bundle/ruby/3.0.0/gems/bootsnap-1.16.0/lib/bootsnap/load_path_cache/core_ext/kernel_require.rb:32:in `require'
        from ./bin/rails:4:in `<main>'
```

---

#### **Solución al Problema**

**El error se debe a la falta del paquete `tzdata`, que es necesario para que Rails funcione correctamente. Este paquete proporciona la base de datos de zonas horarias utilizada por `tzinfo`.**

1. **Instalación del Paquete `tzdata`**

   **Para instalar el paquete `tzdata`, utiliza el siguiente comando:**

   ```bash
   apt install tzdata
   ```

2. **Configuración del Paquete `tzdata`**

   **Durante la instalación, se te pedirá que configures el paquete `tzdata`. La configuración básica se realiza mediante una serie de pasos en la consola:**

   ```bash
    Configuring tzdata
    ------------------
    
    Please select the geographic area in which you live. Subsequent configuration questions will narrow this down by presenting a list of cities, representing the time
    zones in which they are located.
    
      1. Africa  2. America  3. Antarctica  4. Australia  5. Arctic  6. Asia  7. Atlantic  8. Europe  9. Indian  10. Pacific  11. US  12. Etc
    Geographic area: 2
    
    Please select the city or region corresponding to your time zone.
    
      1. Adak                     28. Boa_Vista      55. Fort_Nelson           82. Kentucky/Monticello  109. Noronha                 136. Scoresbysund
      2. Anchorage                29. Bogota         56. Fortaleza             83. Kralendijk           110. North_Dakota/Beulah     137. Shiprock
      3. Anguilla                 30. Boise          57. Glace_Bay             84. La_Paz               111. North_Dakota/Center     138. Sitka
      4. Antigua                  31. Cambridge_Bay  58. Godthab               85. Lima                 112. North_Dakota/New_Salem  139. St_Barthelemy
      5. Araguaina                32. Campo_Grande   59. Goose_Bay             86. Los_Angeles          113. Nuuk                    140. St_Johns
      6. Argentina/Buenos_Aires   33. Cancun         60. Grand_Turk            87. Lower_Princes        114. Ojinaga                 141. St_Kitts
      7. Argentina/Catamarca      34. Caracas        61. Grenada               88. Maceio               115. Panama                  142. St_Lucia
      8. Argentina/Cordoba        35. Cayenne        62. Guadeloupe            89. Managua              116. Pangnirtung             143. St_Thomas
      9. Argentina/Jujuy          36. Cayman         63. Guatemala             90. Manaus               117. Paramaribo              144. St_Vincent
      10. Argentina/La_Rioja      37. Chicago        64. Guayaquil             91. Marigot              118. Phoenix                 145. Swift_Current
      11. Argentina/Mendoza       38. Chihuahua      65. Guyana                92. Martinique           119. Port-au-Prince          146. Tegucigalpa
      12. Argentina/Rio_Gallegos  39. Ciudad_Juarez  66. Halifax               93. Matamoros            120. Port_of_Spain           147. Thule
      13. Argentina/Salta         40. Coral_Harbour  67. Havana                94. Mazatlan             121. Porto_Acre              148. Thunder_Bay
      14. Argentina/San_Juan      41. Costa_Rica     68. Hermosillo            95. Menominee            122. Porto_Velho             149. Tijuana
      15. Argentina/San_Luis      42. Creston        69. Indiana/Indianapolis  96. Merida               123. Puerto_Rico             150. Toronto
      16. Argentina/Tucuman       43. Cuiaba         70. Indiana/Knox          97. Metlakatla           124. Punta_Arenas            151. Tortola
      17. Argentina/Ushuaia       44. Curacao        71. Indiana/Marengo       98. Mexico_City          125. Rainy_River             152. Vancouver
      18. Aruba                   45. Danmarkshavn   72. Indiana/Petersburg    99. Miquelon             126. Rankin_Inlet            153. Virgin
      19. Asuncion                46. Dawson         73. Indiana/Tell_City     100. Moncton             127. Recife                  154. Whitehorse
      20. Atikokan                47. Dawson_Creek   74. Indiana/Vevay         101. Monterrey           128. Regina                  155. Winnipeg
      21. Atka                    48. Denver         75. Indiana/Vincennes     102. Montevideo          129. Resolute                156. Yakutat
      22. Bahia                   49. Detroit        76. Indiana/Winamac       103. Montreal            130. Rio_Branco              157. Yellowknife
      23. Bahia_Banderas          50. Dominica       77. Inuvik                104. Montserrat          131. Santa_Isabel
      24. Barbados                51. Edmonton       78. Iqaluit               105. Nassau              132. Santarem
      25. Belem                   52. Eirunepe       79. Jamaica               106. New_York            133. Santiago
      26. Belize                  53. El_Salvador    80. Juneau                107. Nipigon             134. Santo_Domingo
      27. Blanc-Sablon            54. Ensenada       81. Kentucky/Louisville   108. Nome                135. Sao_Paulo
    Time zone: 89
    
    
    Current default time zone: 'America/Managua'
    Local time is now:      Thu Sep  5 16:44:07 CST 2024.
    Universal Time is now:  Thu Sep  5 22:44:07 UTC 2024.
    Run 'dpkg-reconfigure tzdata' if you wish to change it.
    ```

   *Selecciona la opción que corresponda a tu ubicación geográfica y la zona horaria correcta.*

3. **Actualización del Gemfile**

   *Además, asegúrate de que el gem `tzinfo-data` esté incluido en tu `Gemfile` para que Rails pueda encontrar y utilizar la información de zonas horarias. Agrega la línea siguiente a tu `Gemfile` si el paquete no esta:*

   ```bash
   grep -iEn "tzinfo-data" Gemfile.lock
   224:  tzinfo-data
   ```

   ```bash
   grep -iEn "tzinfo-data" Gemfile
   39:# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
   40:gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]
   ```

   ```ruby
   gem 'tzinfo-data'
   ```

   **Luego, ejecuta `bundle install` para instalar la gema:**

   ```bash
   bundle install
   ```

4. **Reinicia el Servidor Rails**

   **Una vez que hayas instalado y configurado `tzdata` y `tzinfo-data`, intenta reiniciar el servidor Rails:**

   ```bash
   ./bin/rails server
   ```

   ```bash
   ./bin/rails server
   => Booting Puma
   => Rails 7.0.4.2 application starting in development
   => Run `bin/rails server --help` for more startup options
   Puma starting in single mode...
   * Puma version: 5.6.5 (ruby 3.0.2-p107) ("Birdie's Version")
   *  Min threads: 5
   *  Max threads: 5
   *  Environment: development
   *          PID: 1319
   * Listening on http://127.0.0.1:3000
   * Listening on http://[::1]:3000
   Use Ctrl-C to stop
   ```

---

#### **Recursos Adicionales**

- *Foro de ayuda para resolver errores similares: [Gist de Skozz](https://gist.github.com/skozz/0ac405c565b41bfa21fb93e32ab69ad4 "https://gist.github.com/skozz/0ac405c565b41bfa21fb93e32ab69ad4")*
- *Otro foro de discusión: [Stack Overflow](https://stackoverflow.com/questions/23033610/ruby-on-rails-server-not-starting "https://stackoverflow.com/questions/23033610/ruby-on-rails-server-not-starting")*

---

### -***Detenemos el Servidor y Revisamos las Flags***

**Para detener el servidor y ver las opciones disponibles, ejecutamos:**

```bash
./bin/rails server --help
```

**Esto mostrará la siguiente salida:**

```bash
Usage:
  rails server -u [thin/puma/webrick] [options]

Options:
  -e, [--environment=ENVIRONMENT]              # Especifica el entorno en el que se ejecutará el servidor (test/development/production).
  -p, [--port=port]                            # Ejecuta Rails en el puerto especificado - por defecto es 3000.
  -b, [--binding=IP]                           # Asocia Rails a la IP especificada - por defecto es 'localhost' en desarrollo y '0.0.0.0' en otros entornos.
  -c, [--config=file]                          # Usa una configuración rackup personalizada.
                                               # Predeterminado: config.ru
  -d, [--daemon], [--no-daemon]                # Ejecuta el servidor como un Daemon.
  -u, [--using=name]                           # Especifica el servidor Rack utilizado para ejecutar la aplicación (thin/puma/webrick).
  -P, [--pid=PID]                              # Especifica el archivo PID - por defecto es tmp/pids/server.pid.
  -C, [--dev-caching], [--no-dev-caching]      # Especifica si se debe realizar caché en desarrollo.
      [--early-hints], [--no-early-hints]      # Habilita sugerencias tempranas de HTTP/2.
      [--log-to-stdout], [--no-log-to-stdout]  # Si se debe registrar en stdout. Activado por defecto en desarrollo cuando no está en modo daemon.
```

---

### ***Iniciar el Servidor para Escuchar en Todas las IPs***

- **Para iniciar el servidor y que escuche en todas las IPs, usamos:**

```bash
./bin/rails server --binding 0.0.0.0
```

- **La salida será:**

```bash
=> Booting Puma
=> Rails 7.0.4.2 application starting in development
=> Run `bin/rails server --help` for more startup options
Puma starting in single mode...
* Puma version: 5.6.5 (ruby 3.0.2-p107) ("Birdie's Version")
*  Min threads: 5
*  Max threads: 5
*  Environment: development
*          PID: 1349
* Listening on http://0.0.0.0:3000
Use Ctrl-C to stop
```

---

### ***Acceso a la Aplicación***

**Con solo un contenedor en ejecución, podemos acceder a la aplicación en [http://172.17.0.2:3000/](http://172.17.0.2:3000/ "http://172.17.0.2:3000/") o directamente en `localhost:3000`.**

### ***Ver los Logs del Servidor***

**Para observar los logs del servidor, ejecutamos:**

```bash
./bin/rails server --binding 0.0.0.0
```

- **Los logs mostrarán información como la siguiente:**

```bash
=> Booting Puma
=> Rails 7.0.4.2 application starting in development
=> Run `bin/rails server --help` for more startup options
Puma starting in single mode...
* Puma version: 5.6.5 (ruby 3.0.2-p107) ("Birdie's Version")
*  Min threads: 5
*  Max threads: 5
*  Environment: development
*          PID: 1349
* Listening on http://0.0.0.0:3000
Use Ctrl-C to stop
Started GET "/" for 172.17.0.1 at 2024-09-05 17:02:32 -0600
Cannot render console from 172.17.0.1! Allowed networks: 127.0.0.0/127.255.255.255, ::1
Processing by HomeController#index as HTML
  Rendering layout layouts/application.html.erb
  Rendering home/index.html.erb within layouts/application
  Rendered home/index.html.erb within layouts/application (Duration: 2.3ms | Allocations: 451)
  Rendered layout layouts/application.html.erb (Duration: 68.2ms | Allocations: 22193)
Completed 200 OK in 87ms (Views: 73.2ms | ActiveRecord: 0.0ms | Allocations: 28228)
```

---

### ***Preparativos Antes de Construir el Dockerfile***

**Primero, detenemos el contenedor para construir el Dockerfile. Pero antes de proceder, eliminamos el directorio `.git` ya que no lo necesitamos dentro del contenedor:**

```bash
rm -rf ./.git
```

**Luego, creamos los archivos necesarios para la configuración de Docker:**

```bash
touch Dockerfile .dockerignore
```

---

### ***Configuración del Dockerfile***

**A continuación, configuramos el `Dockerfile` con el siguiente contenido:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Utiliza la imagen base de Ubuntu 22.04
FROM ubuntu:22.04

# Configura variables de entorno para evitar la interacción en instalaciones (modo no interactivo)
# y establece la zona horaria a "America/Managua"
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=America/Managua

# Actualiza la lista de paquetes y instala Ruby y las dependencias necesarias.
# También se instala 'tzdata' para manejar correctamente la zona horaria.
RUN apt update \
    && apt install -y ruby-full build-essential tzdata \
    && gem install bundler  # Instala Bundler, una herramienta para gestionar dependencias en Ruby.

# Establece el directorio de trabajo donde se ejecutarán las siguientes instrucciones
WORKDIR /App

# Copia los archivos de Gemfile al contenedor.
# Esto asegura que solo se vuelvan a instalar las dependencias si el Gemfile cambia.
COPY ./Gemfile* ./

# Configura Bundler para instalar las dependencias localmente en el directorio 'vendor/bundle'
# y procede con la instalación de las dependencias del proyecto.
RUN bundle config set --local path ./vendor/bundle && bundle install

# Copia el resto de los archivos de la aplicación al contenedor.
COPY ./ ./

# Expone el puerto 3000, que es donde la aplicación Ruby on Rails escuchará.
EXPOSE 3000

# Comando por defecto para iniciar el servidor de Rails.
# Se enlaza a 0.0.0.0 para que sea accesible desde fuera del contenedor.
CMD ./bin/rails server --binding 0.0.0.0
```

---

### ***Configuración del `.dockerignore`***

**El archivo `.dockerignore` se configura con el siguiente contenido para excluir archivos innecesarios:**

```bash
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

vendor
.git*
Dockerfile*
.dockerignore
```

---

### ***Construcción de la Imagen Docker***

- **Finalmente, construimos la imagen Docker con el siguiente comando, asignando un tag a la imagen:**

```bash
docker image build -t d4nitrix13/rails:latest ./
```

```bash
docker image build -td4nitrix13/rails:latest ./
[+] Building 108.1s (11/11) FINISHED                                                                                                                     docker:default
 => [internal] load build definition from Dockerfile                                                                                                               0.0s
 => => transferring dockerfile: 1.60kB                                                                                                                             0.0s
 => WARN: JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 38)                                   0.0s
 => [internal] load metadata for docker.io/library/ubuntu:22.04                                                                                                    0.0s
 => [internal] load .dockerignore                                                                                                                                  0.0s
 => => transferring context: 221B                                                                                                                                  0.0s
 => [1/6] FROM docker.io/library/ubuntu:22.04                                                                                                                      0.0s
 => [internal] load build context                                                                                                                                  0.9s
 => => transferring context: 9.57MB                                                                                                                                0.8s
 => [2/6] RUN apt update     && apt install -y ruby-full build-essential tzdata     && gem install bundler  # Instala Bundler, una herramienta para gestionar de  60.6s
 => [3/6] WORKDIR /App                                                                                                                                             0.0s
 => [4/6] COPY ./Gemfile* ./                                                                                                                                       0.0s
 => [5/6] RUN bundle config set --local path ./vendor/bundle && bundle install                                                                                    37.7s
 => [6/6] COPY ./ ./                                                                                                                                               0.4s
 => exporting to image                                                                                                                                             9.2s
 => => exporting layers                                                                                                                                            9.2s
 => => writing image sha256:f3940d6565247b2968d0355c9bb681594b9dbe2e27ca7ae9c336e95856fc4439                                                                       0.0s
 => => naming to docker.io/d4nitrix13/rails:latest                                                                                                                 0.0s

 1 warning found (use docker --debug to expand):
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 38)
```

---

### ***Acceso a la Aplicación en el Navegador***

**Para acceder a la aplicación en un navegador, utilizamos la siguiente URL:**

*[http://localhost:3000/](http://localhost:3000/ "http://localhost:3000/")*

---

### ***Ejecución del Contenedor Docker***

**Para ejecutar el contenedor Docker y exponer el puerto 3000, utilizamos el siguiente comando:**

```bash
docker container run -it -p 3000:3000 --rm d4nitrix13/rails
```

**La salida esperada del servidor es:**

```bash
=> Booting Puma
=> Rails 7.0.4.2 application starting in development
=> Run `bin/rails server --help` for more startup options
Puma starting in single mode...
* Puma version: 5.6.5 (ruby 3.0.2-p107) ("Birdie's Version")
*  Min threads: 5
*  Max threads: 5
*  Environment: development
*          PID: 7
* Listening on http://0.0.0.0:3000
Use Ctrl-C to stop
```

---

### ***Logs del Servidor***

**Al realizar una solicitud al servidor, el log generado será similar al siguiente:**

```bash
Started GET "/" for 172.17.0.1 at 2024-09-05 17:26:21 -0600
Cannot render console from 172.17.0.1! Allowed networks: 127.0.0.0/127.255.255.255, ::1
Processing by HomeController#index as HTML
  Rendering layout layouts/application.html.erb
  Rendering home/index.html.erb within layouts/application
  Rendered home/index.html.erb within layouts/application (Duration: 3.6ms | Allocations: 556)
  Rendered layout layouts/application.html.erb (Duration: 187.8ms | Allocations: 26215)
Completed 200 OK in 212ms (Views: 194.7ms | ActiveRecord: 0.0ms | Allocations: 33417)
```

---

### ***Copia del Dockerfile***

**Para mantener una copia del `Dockerfile` original, ejecutamos:**

```bash
cp Dockerfile Dockerfile.manual
```

---

### ***Configuración del Nuevo Dockerfile***

**Si deseamos mantener la zona horaria, añadimos la siguiente línea al `Dockerfile`:**

```Dockerfile
ENV TZ=America/Managua
```

**Si no configuramos la zona horaria, el contenedor utilizará la configuración predeterminada y podría mostrar una hora desfasada.**

---

### ***Dockerfile Mejorado***

**Sobreescribimos el `Dockerfile` con el siguiente contenido:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Utiliza la imagen base de Ruby 3.0.2
FROM ruby:3.0.2

# Establece el directorio de trabajo donde se ejecutarán las siguientes instrucciones
WORKDIR /App

# Copia los archivos de Gemfile al contenedor.
# Esto asegura que solo se vuelvan a instalar las dependencias si el Gemfile cambia.
COPY ./Gemfile* ./

# Configura Bundler para instalar las dependencias localmente en el directorio 'vendor/bundle'
# y procede con la instalación de las dependencias del proyecto.
RUN bundle config set --local path ./vendor/bundle && bundle install

# Copia el resto de los archivos de la aplicación al contenedor.
COPY ./ ./

# Expone el puerto 3000, que es donde la aplicación Ruby on Rails escuchará.
EXPOSE 3000

# Comando por defecto para iniciar el servidor de Rails.
# Se enlaza a 0.0.0.0 para que sea accesible desde fuera del contenedor.
CMD ./bin/rails server --binding 0.0.0.0
```

---

### ***Construcción de la Nueva Imagen Docker***

***Construimos la imagen Docker con el siguiente comando:***

```bash
docker build -t d4nitrix13/rails:preconfig ./
```

```bash
docker build -td4nitrix13/rails:preconfig ./
[+] Building 110.8s (10/10) FINISHED                                                                                                                     docker:default
 => [internal] load build definition from Dockerfile                                                                                                               0.0s
 => => transferring dockerfile: 1.06kB                                                                                                                             0.0s
 => [internal] load metadata for docker.io/library/ruby:3.0.2                                                                                                      1.6s
 => [internal] load .dockerignore                                                                                                                                  0.0s
 => => transferring context: 221B                                                                                                                                  0.0s
 => [1/5] FROM docker.io/library/ruby:3.0.2@sha256:15dd21ae353c5f4faebed038d9d131c47b9fd84c14be8c3cfbc750204b63f009                                               66.0s
 => => resolve docker.io/library/ruby:3.0.2@sha256:15dd21ae353c5f4faebed038d9d131c47b9fd84c14be8c3cfbc750204b63f009                                                0.0s
 => => sha256:647acf3d48c2780e00cd27bb0984367415f270d78477ef9d5b238e6ebd5290da 54.93MB / 54.93MB                                                                  13.6s
 => => sha256:b02967ef003473d9adc6e20868d9d66af85b0871919bcec92419f65c974aa8ce 5.15MB / 5.15MB                                                                     5.9s
 => => sha256:15dd21ae353c5f4faebed038d9d131c47b9fd84c14be8c3cfbc750204b63f009 1.86kB / 1.86kB                                                                     0.0s
 => => sha256:1ab61bd6653437e017e00493b7fdd8a66e6b1b3904220fb02614c72ac1379a23 2.00kB / 2.00kB                                                                     0.0s
 => => sha256:43a012460a2c590e31c635e750a3b2a29d85e6d575d9d3a4822a4e028a6cdb14 7.29kB / 7.29kB                                                                     0.0s
 => => sha256:e1ad2231829e42e6f095971b5d2dc143d97db2d0870571ba4d29ecd599db62cb 10.87MB / 10.87MB                                                                  10.7s
 => => sha256:5576ce26bf1df68da60eeb5162dccde1b69f865d2815aba8b2d29e7181aeb62b 54.57MB / 54.57MB                                                                  32.9s
 => => sha256:a66b7f31b095b7fa01d8ba10e600a192bab43a1311f50216cf6fa9a45d0f435e 196.50MB / 196.50MB                                                                55.9s
 => => extracting sha256:647acf3d48c2780e00cd27bb0984367415f270d78477ef9d5b238e6ebd5290da                                                                          3.0s
 => => sha256:11c270d8f828fe2d06ecdcab761a226d5de10060af6a34af7e3bed50159e3b7e 200B / 200B                                                                        13.9s
 => => sha256:5df92bd6f19a6f98e0a07e6f56f1ca22e5404393ddb728b0a7d6d130160a62ea 28.80MB / 28.80MB                                                                  21.9s
 => => extracting sha256:b02967ef003473d9adc6e20868d9d66af85b0871919bcec92419f65c974aa8ce                                                                          0.3s
 => => extracting sha256:e1ad2231829e42e6f095971b5d2dc143d97db2d0870571ba4d29ecd599db62cb                                                                          0.3s
 => => sha256:834a3e3a7652bcc6309bace7a87e43a4b746f9b50eaeea799fa8a77830ba290d 176B / 176B                                                                        22.1s
 => => extracting sha256:5576ce26bf1df68da60eeb5162dccde1b69f865d2815aba8b2d29e7181aeb62b                                                                          3.1s
 => => extracting sha256:a66b7f31b095b7fa01d8ba10e600a192bab43a1311f50216cf6fa9a45d0f435e                                                                          8.2s
 => => extracting sha256:11c270d8f828fe2d06ecdcab761a226d5de10060af6a34af7e3bed50159e3b7e                                                                          0.0s
 => => extracting sha256:5df92bd6f19a6f98e0a07e6f56f1ca22e5404393ddb728b0a7d6d130160a62ea                                                                          1.1s
 => => extracting sha256:834a3e3a7652bcc6309bace7a87e43a4b746f9b50eaeea799fa8a77830ba290d                                                                          0.0s
 => [internal] load build context                                                                                                                                  0.2s
 => => transferring context: 162.62kB                                                                                                                              0.2s
 => [2/5] WORKDIR /App                                                                                                                                             0.9s
 => [3/5] COPY ./Gemfile* ./                                                                                                                                       0.1s
 => [4/5] RUN bundle config set --local path ./vendor/bundle && bundle install                                                                                    38.7s
 => [5/5] COPY ./ ./                                                                                                                                               0.5s
 => exporting to image                                                                                                                                             2.8s
 => => exporting layers                                                                                                                                            2.7s
 => => writing image sha256:68f5a326fdb53f88e94630316073daeaf172b87cd656ae1117a9fed4d7b0ec95                                                                       0.0s
 => => naming to docker.io/d4nitrix13/rails:preconfig                                                                                                              0.0s

 1 warning found (use docker --debug to expand):
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 27)
```

---

### ***Iniciar y Crear el Contenedor***

**Para iniciar y crear el contenedor, ejecuta:**

```bash
docker run -itp3000:3000 --rm d4nitrix13/rails:preconfig
```

```bash
docker run -itp3000:3000 --rm d4nitrix13/rails:preconfig
=> Booting Puma
=> Rails 7.0.4.2 application starting in development
=> Run `bin/rails server --help` for more startup options
Puma starting in single mode...
* Puma version: 5.6.5 (ruby 3.0.2-p107) ("Birdie's Version")
*  Min threads: 5
*  Max threads: 5
*  Environment: development
*          PID: 7
* Listening on http://0.0.0.0:3000
Use Ctrl-C to stop
```

---

### ***Acceso a la Nueva Aplicación***

**Una vez que el contenedor esté en ejecución, puedes acceder a la aplicación a través de [http://localhost:3000](http://localhost:3000 "http://localhost:3000") en tu navegador.**

---

### ***Verificar Logs del Servidor***

**Aquí están los logs del servidor cuando ejecutas el contenedor:**

```bash
docker run -itp3000:3000 --rm d4nitrix13/rails:preconfig
=> Booting Puma
=> Rails 7.0.4.2 application starting in development
=> Run `bin/rails server --help` for more startup options
Puma starting in single mode...
* Puma version: 5.6.5 (ruby 3.0.2-p107) ("Birdie's Version")
*  Min threads: 5
*  Max threads: 5
*  Environment: development
*          PID: 7
* Listening on http://0.0.0.0:3000
Use Ctrl-C to stop
Started GET "/" for 172.17.0.1 at 2024-09-06 00:55:04 +0000
Cannot render console from 172.17.0.1! Allowed networks: 127.0.0.0/127.255.255.255, ::1
Processing by HomeController#index as HTML
  Rendering layout layouts/application.html.erb
  Rendering home/index.html.erb within layouts/application
  Rendered home/index.html.erb within layouts/application (Duration: 3.9ms | Allocations: 557)
  Rendered layout layouts/application.html.erb (Duration: 244.7ms | Allocations: 26344)
Completed 200 OK in 276ms (Views: 255.1ms | ActiveRecord: 0.0ms | Allocations: 33548)
```
