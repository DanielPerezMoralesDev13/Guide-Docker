<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->

# ***Reto Dockerization Ruby On Rails***

---

## ***Descripción del Reto***

**El objetivo es Dockerizar una aplicación Ruby on Rails contenida en un fichero `.zip`. Se deben seguir dos enfoques:**

1. **Dockerización Manual:** *Partiendo de la imagen `ubuntu:22.04`, instalar todos los componentes necesarios para ejecutar la aplicación Rails.*
2. **Dockerización Simplificada:** *Usando la imagen oficial `ruby:3.0.2` que coincide con la versión de Ruby utilizada para desarrollar la aplicación.*

- **La aplicación escucha en el puerto 3000. Si la Dockerizas correctamente y la inicias, deberías ver el mensaje "Mastermind Ruby Docker :)" al acceder a `http://localhost:3000` desde el navegador.**

---

## ***Pasos para Dockerizar la Aplicación***

---

### ***Preparación del Entorno***

**Primero, crea un nuevo directorio para el proyecto:**

```bash
mkdir "./05 Reto App Dockerization Ruby On Rails"
```

**Copia el fichero `.zip` llamado `Reto_Dockerization_Ruby.zip` al directorio creado.**

#### ***Crear y Ejecutar el Contenedor***

**Ejecuta el siguiente comando para crear e iniciar un contenedor basado en `ubuntu:22.04`:**

```bash
docker run -it -w /App --publish 3000:3000 --mount type=bind,src="$(pwd)",dst=/App --name ruby-practicas ubuntu:22.04
```

- *Esto creará un contenedor con Ubuntu 22.04, establecerá el directorio de trabajo en `/App`, expondrá el puerto 3000 y montará el directorio actual en `/App` dentro del contenedor.*

---

### ***Actualizar e Instalar Dependencias***

**Dentro del contenedor, actualiza los paquetes e instala las herramientas necesarias:**

```bash
apt update && apt install -y unzip tree
```

### ***Verificar el Contenido del Contenedor***

**Verifica el contenido del directorio de trabajo para confirmar que el fichero `Reto_Dockerization_Ruby.zip` está presente:**

```bash
ls -l
-rw-rw-r-- 1 1000 1000 112314 Sep  3 00:14 Reto_Dockerization_Ruby.zip
```

### ***Crear un Nuevo Usuario***

**Para evitar problemas con permisos, crea un nuevo usuario dentro del contenedor:**

```bash
useradd -m -s "/bin/bash" d4nitrix13
```

---

### ***Descomprimir el Fichero***

**Descomprime el fichero `.zip` para obtener el contenido de la aplicación Rails:**

```bash
unzip ./Reto_Dockerization_Ruby.zip
```

---

### ***Verificar el Contenido Descomprimido***

**Lista el contenido del directorio para asegurarte de que los ficheros de la aplicación Rails estén correctamente descomprimidos:**

```bash
ls -lA
total 192
drwxrwxr-x  8 root       root         4096 Feb 27  2023 .git
-rw-rw-r--  1 root       root          246 Feb 27  2023 .gitattributes
-rw-rw-r--  1 root       root          785 Feb 27  2023 .gitignore
-rw-rw-r--  1 root       root           11 Feb 27  2023 .ruby-version
-rw-rw-r--  1 root       root         2284 Feb 27  2023 Gemfile
-rw-rw-r--  1 root       root         5543 Feb 27  2023 Gemfile.lock
-rw-rw-r--  1 root       root          374 Feb 27  2023 README.md
-rw-rw-r--  1 root       root          227 Feb 27  2023 Rakefile
-rw-rw-r--  1 d4nitrix13 d4nitrix13 112314 Sep  3 00:14 Reto_Dockerization_Ruby.zip
drwxrwxr-x 10 root       root         4096 Feb 27  2023 app
drwxrwxr-x  2 root       root         4096 Feb 27  2023 bin
drwxrwxr-x  5 root       root         4096 Feb 27  2023 config
-rw-rw-r--  1 root       root          160 Feb 27  2023 config.ru
drwxrwxr-x  2 root       root         4096 Feb 27  2023 db
drwxrwxr-x  4 root       root         4096 Feb 27  2023 lib
drwxrwxr-x  2 root       root         4096 Feb 27  2023 log
drwxrwxr-x  2 root       root         4096 Feb 27  2023 public
drwxrwxr-x  2 root       root         4096 Feb 27  2023 storage
drwxrwxr-x 10 root       root         4096 Feb 27  2023 test
drwxrwxr-x  4 root       root         4096 Feb 27  2023 tmp
```

```bash
tree -C .
.
|-- Gemfile
|-- Gemfile.lock
|-- README.md
|-- Rakefile
|-- Reto_Dockerization_Ruby.zip
|-- app
|   |-- assets
|   |   |-- config
|   |   |   `-- manifest.js
|   |   |-- images
|   |   `-- stylesheets
|   |       `-- application.css
|   |-- channels
|   |   `-- application_cable
|   |       |-- channel.rb
|   |       `-- connection.rb
|   |-- controllers
|   |   |-- application_controller.rb
|   |   |-- concerns
|   |   `-- home_controller.rb
|   |-- helpers
|   |   |-- application_helper.rb
|   |   `-- home_helper.rb
|   |-- jobs
|   |   `-- application_job.rb
|   |-- mailers
|   |   `-- application_mailer.rb
|   |-- models
|   |   |-- application_record.rb
|   |   `-- concerns
|   `-- views
|       |-- home
|       |   `-- index.html.erb
|       `-- layouts
|           |-- application.html.erb
|           |-- mailer.html.erb
|           `-- mailer.text.erb
|-- bin
|   |-- rails
|   |-- rake
|   `-- setup
|-- config
|   |-- application.rb
|   |-- boot.rb
|   |-- cable.yml
|   |-- credentials.yml.enc
|   |-- database.yml
|   |-- environment.rb
|   |-- environments
|   |   |-- development.rb
|   |   |-- production.rb
|   |   `-- test.rb
|   |-- initializers
|   |   |-- assets.rb
|   |   |-- content_security_policy.rb
|   |   |-- filter_parameter_logging.rb
|   |   |-- inflections.rb
|   |   `-- permissions_policy.rb
|   |-- locales
|   |   `-- en.yml
|   |-- puma.rb
|   |-- routes.rb
|   `-- storage.yml
|-- config.ru
|-- db
|   `-- seeds.rb
|-- lib
|   |-- assets
|   `-- tasks
|-- log
|-- public
|   |-- 404.html
|   |-- 422.html
|   |-- 500.html
|   |-- apple-touch-icon-precomposed.png
|   |-- apple-touch-icon.png
|   |-- favicon.ico
|   `-- robots.txt
|-- storage
|-- test
|   |-- application_system_test_case.rb
|   |-- channels
|   |   `-- application_cable
|   |       `-- connection_test.rb
|   |-- controllers
|   |   `-- home_controller_test.rb
|   |-- fixtures
|   |   `-- files
|   |-- helpers
|   |-- integration
|   |-- mailers
|   |-- models
|   |-- system
|   `-- test_helper.rb
`-- tmp
    |-- pids
    `-- storage

43 directories, 54 files
```

---

### ***Cambiar los Permisos***

**Cambia los permisos de los ficheros y directorios descomprimidos para que sean propiedad del nuevo usuario creado:**

```bash
chown -R d4nitrix13:d4nitrix13 ./
```

---

### ***Verificar los Permisos***

**Verifica que los permisos hayan sido correctamente actualizados para los ficheros y directorios descomprimidos:**

```bash
ls -lA
total 192
drwxrwxr-x  8 d4nitrix13 d4nitrix13   4096 Feb 27  2023 .git
-rw-rw-r--  1 d4nitrix13 d4nitrix13    246 Feb 27  2023 .gitattributes
-rw-rw-r--  1 d4nitrix13 d4nitrix13    785 Feb 27  2023 .gitignore
-rw-rw-r--  1 d4nitrix13 d4nitrix13     11 Feb 27  2023 .ruby-version
-rw-rw-r--  1 d4nitrix13 d4nitrix13   2284 Feb 27  2023 Gemfile
-rw-rw-r--  1 d4nitrix13 d4nitrix13   5543 Feb 27  2023 Gemfile.lock
-rw-rw-r--  1 d4nitrix13 d4nitrix13    374 Feb 27  2023 README.md
-rw-rw-r--  1 d4nitrix13 d4nitrix13    227 Feb 27  2023 Rakefile
-rw-rw-r--  1 d4nitrix13 d4nitrix13 112314 Sep  3 00:14 Reto_Dockerization_Ruby.zip
drwxrwxr-x 10 d4nitrix13 d4nitrix13   4096 Feb 27  2023 app
drwxrwxr-x  2 d4nitrix13 d4nitrix13   4096 Feb 27  2023 bin
drwxrwxr-x  5 d4nitrix13 d4nitrix13   4096 Feb 27  2023 config
-rw-rw-r--  1 d4nitrix13 d4nitrix13    160 Feb 27  2023 config.ru
drwxrwxr-x  2 d4nitrix13 d4nitrix13   4096 Feb 27  2023 db
drwxrwxr-x  4 d4nitrix13 d4nitrix13   4096 Feb 27  2023 lib
drwxrwxr-x  2 d4nitrix13 d4nitrix13   4096 Feb 27  2023 log
drwxrwxr-x  2 d4nitrix13 d4nitrix13   4096 Feb 27  2023 public
drwxrwxr-x  2 d4nitrix13 d4nitrix13   4096 Feb 27  2023 storage
drwxrwxr-x 10 d4nitrix13 d4nitrix13   4096 Feb 27  2023 test
drwxrwxr-x  4 d4nitrix13 d4nitrix13   4096 Feb 27  2023 tmp
```

### ***Eliminar el Directorio `.git`***

**Elimina el directorio `.git` si no es necesario para la ejecución de la aplicación:**

```bash
rm -rf ./.git
```

---

### ***Instalar Dependencias Necesarias***

**Instala las dependencias necesarias para configurar el entorno Ruby y Rails:**

```bash
apt install -y git curl libssl-dev libreadline-dev zlib1g-dev autoconf bison build-essential libyaml-dev libncurses5-dev libffi-dev libgdbm-dev
```

---

### ***Instalar rbenv***

**Instala `rbenv` y `ruby-build` para gestionar las versiones de Ruby:**

```bash
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash
```

**Salida esperada:**

```bash
Installing rbenv with git...
hint: Using 'master' as the name for the initial branch. This default branch name
hint: is subject to change. To configure the initial branch name to use in all
hint: of your new repositories, which will suppress this warning, call:
hint:
hint:   git config --global init.defaultBranch <name>
hint:
hint: Names commonly chosen instead of 'master' are 'main', 'trunk' and
hint: 'development'. The just-created branch can be renamed via this command:
hint:
hint:   git branch -m <name>
Initialized empty Git repository in /root/.rbenv/.git/
Updating origin
remote: Enumerating objects: 3316, done.
remote: Counting objects: 100% (473/473), done.
remote: Compressing objects: 100% (258/258), done.
remote: Total 3316 (delta 267), reused 361 (delta 199), pack-reused 2843 (from 1)
Receiving objects: 100% (3316/3316), 677.38 KiB | 1.88 MiB/s, done.
Resolving deltas: 100% (2055/2055), done.
From https://github.com/rbenv/rbenv
 * [new branch]      master     -> origin/master
 * [new tag]         v0.1.0     -> v0.1.0
 * [new tag]         v0.1.1     -> v0.1.1
 * [new tag]         v0.1.2     -> v0.1.2
 * [new tag]         v0.2.0     -> v0.2.0
 * [new tag]         v0.2.1     -> v0.2.1
 * [new tag]         v0.3.0     -> v0.3.0
 * [new tag]         v0.4.0     -> v0.4.0
 * [new tag]         v1.0.0     -> v1.0.0
 * [new tag]         v1.1.0     -> v1.1.0
 * [new tag]         v1.1.1     -> v1.1.1
 * [new tag]         v1.1.2     -> v1.1.2
 * [new tag]         v1.2.0     -> v1.2.0
 * [new tag]         v1.3.0     -> v1.3.0
Branch 'master' set up to track remote branch 'master' from 'origin'.
Already on 'master'

Installing ruby-build with git...
Cloning into '/root/.rbenv/plugins/ruby-build'...
remote: Enumerating objects: 16347, done.
remote: Counting objects: 100% (4503/4503), done.
remote: Compressing objects: 100% (387/387), done.
remote: Total 16347 (delta 4373), reused 4164 (delta 4111), pack-reused 11844 (from 1)
Receiving objects: 100% (16347/16347), 3.15 MiB | 4.72 MiB/s, done.
Resolving deltas: 100% (11656/11656), done.

Setting up your shell with `rbenv init bash' ...
writing ~/.bashrc: now configured for rbenv.

All done! After reloading your terminal window, rbenv should be good to go.
```

---

### ***Actualizar el Fichero `.bashrc`***

**Añade `rbenv` al `PATH` y configura el entorno en el fichero `.bashrc`:**

```bash
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
source ~/.bashrc
```

---

### ***Verificar Instalación de rbenv***

**Verifica que `rbenv` está correctamente instalado y configurado:**

```bash
type rbenv
rbenv is a function
rbenv ()
{
    local command;
    command="${1:-}";
    if [ "$#" -gt 0 ]; then
        shift;
    fi;
    case "$command" in
        rehash | shell)
            eval "$(rbenv "sh-$command" "$@")"
        ;;
        *)
            command rbenv "$command" "$@"
        ;;
    esac
}
```

---

### ***Instalar Ruby con ruby-build***

**Con el plugin `ruby-build` ya instalado, puedes instalar cualquier versión de Ruby que necesites con un solo comando. Primero, lista todas las versiones disponibles de Ruby:**

---

```bash
rbenv install -l
3.1.6
3.2.5
3.3.5
jruby-9.4.8.0
mruby-3.3.0
picoruby-3.0.0
truffleruby-24.0.2
truffleruby+graalvm-24.0.2

Only latest stable releases for each Ruby implementation are shown.
Use `rbenv install --list-all` to show all local versions.
```

**Luego, instala la versión deseada de Ruby:**

---

```bash
rbenv install 3.0.2
==> Downloading openssl-1.1.1w.tar.gz...
-> curl -q -fL -o openssl-1.1.1w.tar.gz https://dqw8nmjcqpjn7.cloudfront.net/cf3098950cb4d853ad95c0841f1f9c6d3dc102dccfcacd521d93925208b76ac8
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 9661k  100 9661k    0     0  4999k      0  0:00:01  0:00:01 --:--:-- 4998k
==> Installing openssl-1.1.1w...
-> ./config "--prefix=$HOME/.rbenv/versions/3.0.2/openssl" "--openssldir=$HOME/.rbenv/versions/3.0.2/openssl/ssl" zlib-dynamic no-ssl3 shared
-> make -j 4
-> make install_sw install_ssldirs
==> Installed openssl-1.1.1w to /root/.rbenv/versions/3.0.2
==> Downloading ruby-3.0.2.tar.gz...
-> curl -q -fL -o ruby-3.0.2.tar.gz https://cache.ruby-lang.org/pub/ruby/3.0/ruby-3.0.2.tar.gz
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 19.0M  100 19.0M    0     0  5375k      0  0:00:03  0:00:03 --:--:-- 5376k
==> Installing ruby-3.0.2...

WARNING: ruby-3.0.2 is past its end of life and is now unsupported.
It no longer receives bug fixes or critical security updates.

-> ./configure "--prefix=$HOME/.rbenv/versions/3.0.2" "--with-openssl-dir=$HOME/.rbenv/versions/3.0.2/openssl" --enable-shared --with-ext=openssl,psych,+
-> make -j 4
-> make install
==> Installed ruby-3.0.2 to /root/.rbenv/versions/3.0.2
```

---

### ***Instalar un Editor de Texto***

**Instala `nano` para editar ficheros de configuración:**

```bash
apt install -y nano
```

---

### ***Configurar la Versión Global de Ruby***

**Cambia la versión de Ruby predeterminada a la versión que acabas de instalar:**

```bash
nano .ruby-version
```

**Reemplaza la versión actual `3.2.0` con `3.0.2` en el fichero `.ruby-version`:**

```bash
rbenv global 3.0.2
ruby -v
ruby 3.0.2p107 (2021-07-07 revision 0db68f0233) [x86_64-linux]
```

---

### ***Trabajando con Gems***

**Las gemas son la forma en que se distribuyen las librerías Ruby. Utiliza el comando `gem` para gestionar estas gemas, y este comando se emplea para instalar Rails.**

**Cuando instalas una gema, el proceso de instalación genera documentación local. Esto puede añadir una cantidad significativa de tiempo al proceso de instalación de cada gema. Para desactivar la generación de documentación local, crea un fichero llamado `~/.gemrc` con el siguiente parámetro de configuración:**

```bash
echo "gem: --no-document" > ~/.gemrc
```

**Bundler es una herramienta que gestiona las dependencias de gemas para los proyectos. Instala la gema Bundler a continuación, ya que Rails depende de ella:**

```bash
gem install bundler
Fetching bundler-2.5.18.gem
Successfully installed bundler-2.5.18
Parsing documentation for bundler-2.5.18
Installing ri documentation for bundler-2.5.18
Done installing documentation for bundler after 0 seconds
1 gem installed

A new release of RubyGems is available: 3.4.1 → 3.5.18!
Run `gem update --system 3.5.18` to update your installation.
```

**Para conocer más sobre el entorno y la configuración de las gemas, utiliza el comando `gem env` (donde el subcomando `env` es una abreviatura de `environment`). Puedes confirmar dónde se están instalando las gemas usando el argumento `home`, así:**

```bash
gem env home
/root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0
```

**Para instalar los paquetes definidos en tu `Gemfile`, utiliza el comando Bundler:**

```bash
bundle install
```

```bash
bundle install
Don't run Bundler as root. Installing your bundle as root will break this application for all non-root users on this machine.
Fetching gem metadata from https://rubygems.org/..........
Fetching rake 13.0.6
Installing rake 13.0.6
Fetching concurrent-ruby 1.2.2
Fetching minitest 5.17.0
Fetching builder 3.2.4
Fetching erubi 1.12.0
Installing concurrent-ruby 1.2.2
Installing minitest 5.17.0
Installing builder 3.2.4
Fetching racc 1.6.2
Installing erubi 1.12.0
Fetching crass 1.0.6
Fetching rack 2.2.6.2
Installing racc 1.6.2 with native extensions
Installing crass 1.0.6
Fetching nio4r 2.5.8
Installing rack 2.2.6.2
Installing nio4r 2.5.8 with native extensions
Fetching websocket-extensions 0.1.5
Installing websocket-extensions 0.1.5
Fetching marcel 1.0.2
Fetching mini_mime 1.1.2
Installing marcel 1.0.2
Fetching date 3.3.3
Installing mini_mime 1.1.2
Fetching timeout 0.3.2
Installing date 3.3.3 with native extensions
Installing timeout 0.3.2
Fetching public_suffix 5.0.1
Installing public_suffix 5.0.1
Fetching bindex 0.8.1
Installing bindex 0.8.1 with native extensions
Fetching msgpack 1.6.0
Installing msgpack 1.6.0 with native extensions
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
Fetching rubyzip 2.3.2
Installing rubyzip 2.3.2
Fetching websocket 1.2.9
Installing websocket 1.2.9
Fetching sqlite3 1.6.1 (x86_64-linux)
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
Installing sprockets 4.2.0
Fetching net-protocol 0.2.1
Installing net-protocol 0.2.1
Fetching addressable 2.8.1
Installing addressable 2.8.1
Fetching nokogiri 1.14.2 (x86_64-linux)
Fetching reline 0.3.2
Installing reline 0.3.2
Fetching selenium-webdriver 4.8.1
Installing nokogiri 1.14.2 (x86_64-linux)
Fetching puma 5.6.5
Fetching activesupport 7.0.4.2
Installing puma 5.6.5 with native extensions
Installing activesupport 7.0.4.2
Installing selenium-webdriver 4.8.1
Fetching net-pop 0.1.2
Installing net-pop 0.1.2
Fetching net-smtp 0.3.3
Installing net-smtp 0.3.3
Fetching irb 1.6.2
Installing irb 1.6.2
Fetching bootsnap 1.16.0
Installing bootsnap 1.16.0 with native extensions
Fetching loofah 2.19.1
Installing loofah 2.19.1
Fetching xpath 3.2.0
Installing xpath 3.2.0
Fetching rails-dom-testing 2.0.3
Installing rails-dom-testing 2.0.3
Fetching globalid 1.1.0
Installing globalid 1.1.0
Fetching activemodel 7.0.4.2
Installing activemodel 7.0.4.2
Fetching webdrivers 5.2.0
Installing webdrivers 5.2.0
Fetching debug 1.7.1
Installing debug 1.7.1 with native extensions
Fetching rails-html-sanitizer 1.5.0
Installing rails-html-sanitizer 1.5.0
Fetching capybara 3.38.0
Installing capybara 3.38.0
Fetching activejob 7.0.4.2
Fetching activerecord 7.0.4.2
Installing activejob 7.0.4.2
Fetching actionview 7.0.4.2
Installing activerecord 7.0.4.2
Installing actionview 7.0.4.2
Fetching actionpack 7.0.4.2
Installing actionpack 7.0.4.2
Fetching jbuilder 2.11.5
Fetching actioncable 7.0.4.2
Installing jbuilder 2.11.5
Installing actioncable 7.0.4.2
Fetching activestorage 7.0.4.2
Installing activestorage 7.0.4.2
Fetching railties 7.0.4.2
Installing railties 7.0.4.2
Fetching sprockets-rails 3.4.2
Installing sprockets-rails 3.4.2
Fetching actiontext 7.0.4.2
Installing actiontext 7.0.4.2
Fetching importmap-rails 1.1.5
Fetching stimulus-rails 1.2.1
Installing importmap-rails 1.1.5
Fetching turbo-rails 1.3.3
Installing stimulus-rails 1.2.1
Fetching web-console 4.2.0
Fetching net-imap 0.3.4
Installing web-console 4.2.0
Installing turbo-rails 1.3.3
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

---

### ***Iniciar Servidor***

**Problema:**

- **Al ejecutar el comando:**

```bash
rails server
```

**Recibirá el siguiente error:**

```bash
rails server
=> Booting Puma
=> Rails 7.0.4.2 application starting in development
=> Run `bin/rails server --help` for more startup options
Exiting
/root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/tzinfo-2.0.6/lib/tzinfo/data_source.rb:159:in `rescue in create_default_data_source': tzinfo-data is not present. Please add gem 'tzinfo-data' to your Gemfile and run bundle install (TZInfo::DataSourceNotFound)
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/tzinfo-2.0.6/lib/tzinfo/data_source.rb:156:in `create_default_data_source'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/tzinfo-2.0.6/lib/tzinfo/data_source.rb:55:in `block in get'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/tzinfo-2.0.6/lib/tzinfo/data_source.rb:54:in `synchronize'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/tzinfo-2.0.6/lib/tzinfo/data_source.rb:54:in `get'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/activesupport-7.0.4.2/lib/active_support/railtie.rb:88:in `block in <class:Railtie>'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/railties-7.0.4.2/lib/rails/initializable.rb:32:in `instance_exec'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/railties-7.0.4.2/lib/rails/initializable.rb:32:in `run'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/railties-7.0.4.2/lib/rails/initializable.rb:61:in `block in run_initializers'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/tsort.rb:228:in `block in tsort_each'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/tsort.rb:350:in `block (2 levels) in each_strongly_connected_component'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/tsort.rb:431:in `each_strongly_connected_component_from'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/tsort.rb:349:in `block in each_strongly_connected_component'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/tsort.rb:347:in `each'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/tsort.rb:347:in `call'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/tsort.rb:347:in `each_strongly_connected_component'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/tsort.rb:226:in `tsort_each'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/tsort.rb:205:in `tsort_each'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/railties-7.0.4.2/lib/rails/initializable.rb:60:in `run_initializers'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/railties-7.0.4.2/lib/rails/application.rb:372:in `initialize!'
        from /App/config/environment.rb:5:in `<main>'
        from config.ru:3:in `require_relative'
        from config.ru:3:in `block in <main>'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/rack-2.2.6.2/lib/rack/builder.rb:116:in `eval'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/rack-2.2.6.2/lib/rack/builder.rb:116:in `new_from_string'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/rack-2.2.6.2/lib/rack/builder.rb:105:in `load_file'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/rack-2.2.6.2/lib/rack/builder.rb:66:in `parse_file'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/rack-2.2.6.2/lib/rack/server.rb:349:in `build_app_and_options_from_config'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/rack-2.2.6.2/lib/rack/server.rb:249:in `app'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/rack-2.2.6.2/lib/rack/server.rb:422:in `wrapped_app'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/railties-7.0.4.2/lib/rails/commands/server/server_command.rb:76:in `log_to_stdout'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/railties-7.0.4.2/lib/rails/commands/server/server_command.rb:36:in `start'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/railties-7.0.4.2/lib/rails/commands/server/server_command.rb:143:in `block in perform'
        from <internal:kernel>:90:in `tap'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/railties-7.0.4.2/lib/rails/commands/server/server_command.rb:134:in `perform'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/thor-1.2.1/lib/thor/command.rb:27:in `run'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/thor-1.2.1/lib/thor/invocation.rb:127:in `invoke_command'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/thor-1.2.1/lib/thor.rb:392:in `dispatch'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/railties-7.0.4.2/lib/rails/command/base.rb:87:in `perform'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/railties-7.0.4.2/lib/rails/command.rb:48:in `invoke'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/

3.0.0/gems/railties-7.0.4.2/lib/rails/commands/commands_tasks.rb:144:in `server'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/railties-7.0.4.2/lib/rails/commands.rb:29:in `block in <main>'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/railties-7.0.4.2/lib/rails/commands.rb:27:in `tap'
        from /root/.rbenv/versions/3.0.2/lib/ruby/gems/3.0.0/gems/railties-7.0.4.2/lib/rails/commands.rb:27:in `<main>'
```

**Solución:**

1. **Agregar la gema `tzinfo-data` al `Gemfile`:**

   **Edite su fichero `Gemfile` y agregue la gema `tzinfo-data` en la sección de gems:**

   ```bash
   echo "gem 'tzinfo-data'" >> Gemfile
   ```

2. **Ejecutar `bundle install`:**

   **Después de agregar la gema al `Gemfile`, ejecute el siguiente comando para instalar las dependencias:**

   ```bash
   bundle install
   ```

    ```bash
    bundle install
    Don't run Bundler as root. Installing your bundle as root will break this application for all non-root users on this machine.
    Your Gemfile lists the gem tzinfo-data (>= 0) more than once.
    You should probably keep only one of them.
    Remove any duplicate entries and specify the gem only once.
    While it's not a problem now, it could cause errors if you change the version of one of them later.
    Fetching gem metadata from https://rubygems.org/..........
    Resolving dependencies...
    Fetching tzinfo-data 1.2024.1
    Installing tzinfo-data 1.2024.1
    Bundle complete! 16 Gemfile dependencies, 73 gems now installed.
    Use `bundle info [gemname]` to see where a bundled gem is installed.
    ```

---

### ***Iniciamos el servidor para que escuche en todas las interfaces***

```bash
rails server -b 0.0.0.0
=> Booting Puma
=> Rails 7.0.4.2 application starting in development
=> Run `bin/rails server --help` for more startup options
Puma starting in single mode...
* Puma version: 5.6.5 (ruby 3.0.2-p107) ("Birdie's Version")
* Min threads: 5
* Max threads: 5
* Environment: development
* PID: 391
* Listening on http://0.0.0.0:3000
Use Ctrl-C to stop
```

**En nuestro host, podemos acceder a la aplicación desde cualquier navegador utilizando la dirección `http://127.0.0.1:3000`.**

- **Logs del servidor**

```bash
rails server -b 0.0.0.0
=> Booting Puma
=> Rails 7.0.4.2 application starting in development
=> Run `bin/rails server --help` for more startup options
Puma starting in single mode...
* Puma version: 5.6.5 (ruby 3.0.2-p107) ("Birdie's Version")
* Min threads: 5
* Max threads: 5
* Environment: development
* PID: 424
* Listening on http://0.0.0.0:3000
Use Ctrl-C to stop
Started GET "/" for 172.17.0.1 at 2024-09-04 01:10:48 +0000
Cannot render console from 172.17.0.1! Allowed networks: 127.0.0.0/127.255.255.255, ::1
Processing by HomeController#index as HTML
  Rendering layout layouts/application.html.erb
  Rendering home/index.html.erb within layouts/application
  Rendered home/index.html.erb within layouts/application (Duration: 2.2ms | Allocations: 451)
  Rendered layout layouts/application.html.erb (Duration: 63.9ms | Allocations: 21651)
Completed 200 OK in 80ms (Views: 68.0ms | ActiveRecord: 0.0ms | Allocations: 27684)
```

**Explicación de los logs:**

- **Inicio del servidor:**
  - *`Started GET "/" for 172.17.0.1 at 2024-09-04 01:10:48 +0000` indica que se ha recibido una solicitud GET para la ruta raíz ("/") desde la IP `172.17.0.1` a las 01:10:48 GMT del 4 de septiembre de 2024.*
  - *`Cannot render console from 172.17.0.1! Allowed networks: 127.0.0.0/127.255.255.255, ::1` muestra que la consola de Rails no se puede renderizar desde la IP `172.17.0.1`, ya que solo se permiten las redes `127.0.0.0/127.255.255.255` y `::1`.*
  
- **Procesamiento de la solicitud:**
  - *`Processing by HomeController#index as HTML` indica que la solicitud está siendo procesada por la acción `index` del `HomeController` y se está generando una respuesta en formato HTML.*
  - *`Rendering layout layouts/application.html.erb` muestra que se está renderizando el layout `application.html.erb`.*
  - *`Rendering home/index.html.erb within layouts/application` indica que se está renderizando la vista `index.html.erb` dentro del layout `application.html.erb`.*
  - *`Rendered home/index.html.erb within layouts/application (Duration: 2.2ms | Allocations: 451)` indica que la vista `index.html.erb` fue renderizada en 2.2 milisegundos con 451 asignaciones de memoria.*
  - *`Rendered layout layouts/application.html.erb (Duration: 63.9ms | Allocations: 21651)` muestra que el layout `application.html.erb` fue renderizado en 63.9 milisegundos con 21,651 asignaciones de memoria.*

- **Respuesta completada:**
  - *`Completed 200 OK in 80ms (Views: 68.0ms | ActiveRecord: 0.0ms | Allocations: 27684)` indica que la solicitud fue completada con éxito (código de estado HTTP 200) en 80 milisegundos, con 68 milisegundos dedicados al renderizado de vistas, 0 milisegundos a ActiveRecord y 27,684 asignaciones de memoria.*

---

### ***Dockerización de una Aplicación Rails***

**Primero, accedemos a la terminal como el usuario correspondiente y creamos los ficheros necesarios para la configuración del contenedor Docker:**

```bash
su d4nitrix13
touch Dockerfile .dockerignore
```

---

### ***Configuración de `.dockerignore`***

**Es importante crear un fichero `.dockerignore` para excluir ficheros innecesarios del contexto de construcción de la imagen Docker. Esto ayuda a reducir el tamaño de la imagen y mejora el tiempo de construcción. Ejecutamos:**

```bash
nano .dockerignore
```

**Agregamos el siguiente contenido:**

```dockerignore
Dockerfile*
.git*
.dockerignoreDockerización de una Aplicación Rails
```

**Este fichero se asegura de que no se incluyan ficheros como el Dockerfile, el directorio `.git`, ficheros `.dockerignore` y cualquier fichero `.zip` en la imagen del contenedor.**

---

### ***Configuración del `Dockerfile`***

**El `Dockerfile` define cómo se construirá la imagen del contenedor. Para editarlo, ejecutamos:**

```bash
nano Dockerfile
```

**Aquí está el contenido detallado del `Dockerfile`:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Imagen base de Ubuntu 22.04
FROM ubuntu:22.04

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /App

# Define la variable de entorno HOME, necesaria para la instalación de rbenv
ENV HOME=/root

# Copia los ficheros Gemfile y Gemfile.lock (si existe)
COPY ./Gemfile* ./

# Instala las dependencias necesarias para rbenv y Ruby
RUN apt update \
    && apt install -y \
    git \
    curl \
    libssl-dev \
    libreadline-dev \
    zlib1g-dev \
    autoconf \
    bison \
    build-essential \
    libyaml-dev \
    libncurses5-dev \
    libffi-dev \
    libgdbm-dev \
    && curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash \
    && export PATH="$HOME/.rbenv/bin:$HOME/.rbenv/shims:$PATH" \
    && eval "$(rbenv init -)" \
    && rbenv install 3.0.2 \
    && echo 3.0.2 > ./.ruby-version \
    && rbenv global 3.0.2 \
    && echo "gem: --no-document" > ~/.gemrc \
    && gem install bundler \
    && bundle install

# Copia el resto de la aplicación al contenedor
COPY ./ ./

# Expone el puerto 3000
EXPOSE 3000

# Define la variable de entorno PATH para rbenv
ENV PATH="$HOME/.rbenv/bin:$HOME/.rbenv/shims:$PATH"

# Comando por defecto para iniciar el servidor Rails
CMD rails server -b 0.0.0.0
```

**Explicación del `Dockerfile`:**

1. **Imagen base:** *Se utiliza Ubuntu 22.04 como sistema operativo base del contenedor.*
2. **Directorio de trabajo:** *Se define `/App` como el directorio de trabajo dentro del contenedor.*
3. **Instalación de rbenv y Ruby:** *El contenedor se configura con las herramientas necesarias para instalar y gestionar Ruby (usando `rbenv`) y las gemas necesarias con Bundler.*
4. **Copia de ficheros:** *Se copian los ficheros `Gemfile` y luego todo el proyecto al contenedor.*
5. **Puerto expuesto:** *Se expone el puerto 3000, que suele ser el puerto por defecto para aplicaciones Rails.*
6. **Comando por defecto:** *El servidor Rails se inicia en todas las interfaces de red.*

---

### ***Recordatorio Importante***

**No uses los siguientes comandos para modificar el fichero `.bashrc`, ya que podría causar problemas al ejecutar los comandos dentro de Docker:**

- **Incorrecto:**

  ```bash
  echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
  eval '"$(rbenv init -)"' >> ~/.bashrc
  ```

- **Correcto:**

  ```bash
  export PATH="$HOME/.rbenv/bin:$PATH"
  eval "$(rbenv init -)"
  ```

**Esto asegura que los cambios se realicen temporalmente en la sesión actual sin modificar el fichero de configuración del shell.**

---

### ***Construcción de la Imagen Docker***

**Finalmente, construimos la imagen Docker con el siguiente comando:**

```bash
docker build -t d4nitrix13/rails ./
```

- **El proceso de construcción puede tomar algunos minutos, como se indica en la salida siguiente:**

```bash
[+] Building 669.9s (10/10) FINISHED                                                                                                  
 => [internal] load build definition from Dockerfile                                                                                           
 => WARN: JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 69)                
 => [internal] load metadata for docker.io/library/ubuntu:22.04                                                                                 
 => [internal] load .dockerignore                                                                                                               
 => [1/5] FROM docker.io/library/ubuntu:22.04                                                                                                   
 => [internal] load build context                                                                                                               
 => [2/5] WORKDIR /App                                                                                                                          
 => [3/5] COPY ./Gemfile* ./                                                                                                                    
 => [4/5] RUN apt update && apt install -y git curl libssl-dev libreadline-dev zlib1g-dev autoconf bison...  
 => [5/5] COPY ./ ./                                                                                                                            
 => exporting to image                                                                                                                          
 => => naming to docker.io/d4nitrix13/rails                                                                                                     
```

- **Esto crea la imagen con el nombre `d4nitrix13/rails`, lista para ser utilizada y desplegada en un contenedor Docker.**

---

### ***Ejecución del Contenedor***

**Para correr la imagen de Docker y exponer el puerto 3000, utilizamos el siguiente comando:**

```bash
docker run -itp 3000:3000 --rm d4nitrix13/rails:latest
```

> *Este comando ejecuta la imagen que creaste y mapea el puerto 3000 del contenedor al puerto 3000 de tu máquina local. El contenedor se ejecuta en modo interactivo (`-it`), y el flag `--rm` asegura que el contenedor se elimine automáticamente una vez que detengas su ejecución.*

---

### ***Mensajes al Iniciar la Aplicación***

**Al ejecutar el comando anterior, los logs muestran cómo Puma, el servidor de aplicaciones de Rails, inicia correctamente:**

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

- **Aquí puedes observar que Puma está funcionando en modo de desarrollo, y está escuchando en la dirección `http://0.0.0.0:3000`. Si accedes a este puerto desde tu navegador, deberías ver tu aplicación Rails en ejecución.**

---

### ***Verificación de Logs***

**Si necesitas verificar los logs del servidor, puedes ejecutarlo nuevamente y observar el flujo de las solicitudes entrantes, como se muestra a continuación:**

```bash
docker run -itp 3000:3000 --rm d4nitrix13/rails:latest
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
Started GET "/" for 172.17.0.1 at 2024-09-04 20:24:27 +0000
Cannot render console from 172.17.0.1! Allowed networks: 127.0.0.0/127.255.255.255, ::1
Processing by HomeController#index as HTML
  Rendering layout layouts/application.html.erb
  Rendering home/index.html.erb within layouts/application
  Rendered home/index.html.erb within layouts/application (Duration: 3.7ms | Allocations: 556)
  Rendered layout layouts/application.html.erb (Duration: 155.6ms | Allocations: 24867)
Completed 200 OK in 189ms (Views: 163.0ms | ActiveRecord: 0.0ms | Allocations: 32069)
```

- **Este es un ejemplo de un log típico en el que se puede ver que se procesó una solicitud GET a la raíz `/`, y se generó correctamente la página principal de la aplicación con un código de respuesta HTTP `200 OK`. Los tiempos de renderizado y las asignaciones de memoria también están presentes para ayudarte a diagnosticar cualquier posible problema de rendimiento.**

- **Conclusión:**

- *Con estos pasos, has logrado dockerizar tu aplicación Rails utilizando Puma como servidor web, con las dependencias y configuraciones correctas. Además, el contenedor se ejecuta en modo desarrollo, permitiéndote verificar su funcionamiento de manera eficiente.*

---

### ***Copia del Dockerfile***

**Primero, realizamos una copia del `Dockerfile` para poder trabajar en una versión manual:**

```bash
cp Dockerfile Dockerfile.manual
```

---

### ***Contenido del Dockerfile***

**Aquí está el contenido del `Dockerfile` que utilizamos:**

```Dockerfile
# Autor: Daniel Benjamin Perez Morales
# GitHub: https://github.com/DanielPerezMoralesDev13
# Correo electrónico: danielperezdev@proton.me

# Usa la imagen base de Ruby 3.0.2 desde Docker Hub
FROM ruby:3.0.2

# Establece el directorio de trabajo dentro del contenedor en /App
WORKDIR /App

# Copia el fichero Gemfile y, si existe, el fichero Gemfile.lock al contenedor.
# Esto permite instalar las dependencias de Ruby especificadas en el Gemfile.
COPY ./Gemfile* ./

# Instala Bundler, una herramienta para gestionar las gemas Ruby, y luego
# instala todas las gemas especificadas en el Gemfile usando Bundler.
RUN gem install bundler && bundle install

# Copia todo el contenido del directorio actual del host al contenedor.
# Esto incluye la aplicación y cualquier otro fichero necesario para la ejecución.
COPY ./ ./

# Expone el puerto 3000 del contenedor para que la aplicación web en desarrollo
# pueda ser accesible desde fuera del contenedor.
EXPOSE 3000

# Define el comando por defecto para iniciar el servidor Rails.
# El servidor escuchará en todas las interfaces de red (0.0.0.0) para permitir
# el acceso desde fuera del contenedor.
CMD ["rails", "server", "-b", "0.0.0.0"]
```

---

### ***Construcción de la Imagen***

**Construimos la imagen de Docker con el siguiente comando:**

```bash
docker build -t d4nitrix13/preconfig ./
```

**Este comando crea una imagen llamada `d4nitrix13/preconfig` utilizando el `Dockerfile` en el directorio actual.**

**Salida del Comando de Construcción:**

```bash
[+] Building 125.5s (10/10) FINISHED                                                                                                  docker:default
 => [internal] load build definition from Dockerfile                                                                                            0.0s
 => => transferring dockerfile: 872B                                                                                                            0.0s
 => [internal] load metadata for docker.io/library/ruby:3.0.2                                                                                   2.7s
 => [internal] load .dockerignore                                                                                                               0.0s
 => => transferring context: 220B                                                                                                               0.0s
 => [1/5] FROM docker.io/library/ruby:3.0.2@sha256:15dd21ae353c5f4faebed038d9d131c47b9fd84c14be8c3cfbc750204b63f009                            80.0s
 => => resolve docker.io/library/ruby:3.0.2@sha256:15dd21ae353c5f4faebed038d9d131c47b9fd84c14be8c3cfbc750204b63f009                             0.0s
 => => sha256:43a012460a2c590e31c635e750a3b2a29d85e6d575d9d3a4822a4e028a6cdb14 7.29kB / 7.29kB                                                  0.0s
 => => sha256:15dd21ae353c5f4faebed038d9d131c47b9fd84c14be8c3cfbc750204b63f009 1.86kB / 1.86kB                                                  0.0s
 => => sha256:647acf3d48c2780e00cd27bb0984367415f270d78477ef9d5b238e6ebd5290da 54.93MB / 54.93MB                                               16.7s
 => => sha256:b02967ef003473d9adc6e20868d9d66af85b0871919bcec92419f65c974aa8ce 5.15MB / 5.15MB                                                  6.1s
 => => sha256:e1ad2231829e42e6f095971b5d2dc143d97db2d0870571ba4d29ecd599db62cb 10.87MB / 10.87MB                                                9.8s
 => => sha256:1ab61bd6653437e017e00493b7fdd8a66e6b1b3904220fb02614c72ac1379a23 2.00kB / 2.00kB                                                  0.0s
 => => sha256:5576ce26bf1df68da60eeb5162dccde1b69f865d2815aba8b2d29e7181aeb62b 54.57MB / 54.57MB                                               34.6s
 => => sha256:a66b7f31b095b7fa01d8ba10e600a192bab43a1311f50216cf6fa9a45d0f435e 196.50MB / 196.50MB                                             69.4s
 => => extracting sha256:647acf3d48c2780e00cd27bb0984367415f270d78477ef9d5b238e6ebd5290da                                                       2.9s
 => => sha256:11c270d8f828fe2d06ecdcab761a226d5de10060af6a34af7e3bed50159e3b7e 200B / 200B                                                     17.0s
 => => sha256:5df92bd6f19a6f98e0a07e6f56f1ca22e5404393ddb728b0a7d6d130160a62ea 28.80MB / 28.80MB                                               34.5s
 => => extracting sha256:b02967ef003473d9adc6e20868d9d66af85b0871919bcec92419f65c974aa8ce                                                       0.3s
 => => extracting sha256:e1ad2231829e42e6f095971b5d2dc143d97db2d0870571ba4d29ecd599db62cb                                                       0.3s
 => => sha256:834a3e3a7652bcc6309bace7a87e43a4b746f9b50eaeea799fa8a77830ba290d 176B / 176B                                                     35.3s
 => => extracting sha256:5576ce26bf1df68da60eeb5162dccde1b69f865d2815aba8b2d29e7181aeb62b                                                       3.0s
 => => extracting sha256:a66b7f31b095b7fa01d8ba10e600a192bab43a1311f50216cf6fa9a45d0f435e                                                       8.3s
 => => extracting sha256:11c270d8f828fe2d06ecdcab761a226d5de10060af6a34af7e3bed50159e3b7e                                                       0.0s
 => => extracting sha256:5df92bd6f19a6f98e0a07e6f56f1ca22e5404393ddb728b0a7d6d130160a62ea                                                       1.2s
 => => extracting sha256:834a3e3a7652bcc6309bace7a87e43a4b746f9b50eaeea799fa8a77830ba290d                                                       0.0s
 => [internal] load build context                                                                                                               0.2s
 => => transferring context: 171.85kB                                                                                                           0.2s
 => [2/5] WORKDIR /App                                                                                                                          0.4s
 => [3/5] COPY ./Gemfile* ./                                                                                                                    0.1s
 => [4/5] RUN gem install bundler     && bundle install                                                                                        38.6s
 => [5/5] COPY ./ ./                                                                                                                            0.7s
 => exporting to image                                                                                                                          2.9s
 => => exporting layers                                                                                                                         2.8s
 => => writing image sha256:c2e74ff2f1fc4b10127045ab5d9a9367f14e964aeaf967ce3879e4c9d4677097                                                    0.0s
 => => naming to docker.io/d4nitrix13/preconfig                                                                                                 0.0s

 1 warning found (use docker --debug to expand):
 - JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 23)
```

**El proceso de construcción ha finalizado con éxito y la imagen ha sido etiquetada como `d4nitrix13/preconfig`. Nota que hay una advertencia recomendando el uso de argumentos en formato JSON para el comando `CMD` para evitar comportamientos no deseados relacionados con señales del sistema operativo.**

---

### ***Creación e Inicio del Contenedor***

- **Ahora, creamos y lanzamos**

- **un contenedor a partir de esta imagen:**

```bash
docker run -itp3000:3000 --rm d4nitrix13/preconfig
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

### ***Verificación del Contenedor***

**Para verificar que el contenedor está funcionando correctamente, abre cualquier navegador y visita `http://localhost:3000`. Luego, revisa los logs del contenedor para asegurarte de que la aplicación esté funcionando como se espera.**

**Puedes iniciar el contenedor en modo interactivo para ver los logs en tiempo real con el siguiente comando:**

```bash
docker run -itp3000:3000 --rm d4nitrix13/preconfig
```

**Salida de los Logs del Contenedor:**

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
Started GET "/" for 172.17.0.1 at 2024-09-04 21:44:02 +0000
Cannot render console from 172.17.0.1! Allowed networks: 127.0.0.0/127.255.255.255, ::1
Processing by HomeController#index as HTML
  Rendering layout layouts/application.html.erb
  Rendering home/index.html.erb within layouts/application
  Rendered home/index.html.erb within layouts/application (Duration: 2.8ms | Allocations: 556)
  Rendered layout layouts/application.html.erb (Duration: 408.0ms | Allocations: 73288)
Completed 200 OK in 431ms (Views: 414.8ms | ActiveRecord: 0.0ms | Allocations: 80489)
```

**Explicación de los Logs:**

- **Booting Puma:** *Indica que el servidor web Puma está iniciando.*
- **Rails 7.0.4.2 application starting in development:** *La aplicación Rails está iniciando en modo desarrollo.*
- **Puma starting in single mode:** *Puma está corriendo en modo single.*
- **Listening on `http://0.0.0.0:3000`:** *Puma está escuchando en el puerto 3000, accesible desde cualquier interfaz de red.*
- **Started GET "/" for 172.17.0.1:** *Se ha recibido una solicitud GET para la ruta raíz.*
- **Cannot render console from 172.17.0.1! Allowed networks:** *La consola no puede renderizarse desde la dirección IP externa debido a restricciones de red.*
- **Processing by HomeController#index as HTML:** *Rails está procesando la solicitud con el controlador `HomeController` y la acción `index`.*
- **Rendered home/index.html.erb within layouts/application:** *Se ha renderizado la vista `home/index.html.erb` dentro del diseño `layouts/application`.*
- **Completed 200 OK:** *La solicitud se completó con éxito con un código de estado HTTP 200.*

*Esto confirma que el contenedor está funcionando y sirviendo la aplicación correctamente.*
