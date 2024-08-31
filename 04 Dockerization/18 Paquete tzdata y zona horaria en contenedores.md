<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->

# ***Paquete `tzdata` y Configuración de Zona Horaria en Contenedores Docker***

**A continuación, configuraremos un entorno para desarrollar aplicaciones PHP con Laravel dentro de un contenedor Docker. Usaremos Ubuntu 22.04 como base para nuestro contenedor.**

---

## ***1. Preparar el Entorno***

**Primero, crea un directorio para tu aplicación Laravel y navega a él:**

```bash
mkdir "04 App Laravel"
cd "04 App Laravel"
```

---

## ***2. Consultar Documentación***

- **Laravel:** *Visita la [página oficial de Laravel](https://laravel.com/ "https://laravel.com/") y consulta su [documentación oficial](https://laravel.com/docs/11.x "https://laravel.com/docs/11.x").*
- **Composer:** *Composer es el gestor de paquetes para PHP, similar a npm o pnpm en Node.js, o pip en Python. Consulta su [documentación oficial](https://getcomposer.org/ "https://getcomposer.org/").*

---

## ***3. Iniciar el Contenedor***

**Para iniciar un contenedor Docker con Ubuntu 22.04 y montar el directorio actual en `/App`, usa el siguiente comando:**

```bash
docker run -itw/App --mount type=bind,source="$(pwd)",target=/App --name php-practicas ubuntu:22.04
```

---

### ***Alternativas de Comando***

**Puedes acortar o modificar el comando con diferentes opciones de nombres para los parámetros:**

- **`source` es equivalente a `src`:**

  ```bash
  docker run -itw/App --mount type=bind,src="$(pwd)",target=/App --name php-practicas ubuntu:22.04
  ```

- **`target` es equivalente a `destination`:**

  ```bash
  docker run -itw/App --mount type=bind,source="$(pwd)",destination=/App --name php-practicas ubuntu:22.04
  ```

- **`destination` es equivalente a `dst`:**

  ```bash
  docker run -itw/App --mount type=bind,source="$(pwd)",dst=/App --name php-practicas ubuntu:22.04
  ```

---

## ***4. Instalación de PHP***

**Al ejecutar el comando anterior, si la imagen de Ubuntu no está disponible localmente, Docker la descargará:**

```bash
Unable to find image 'ubuntu:22.04' locally
22.04: Pulling from library/ubuntu
857cc8cb19c0: Already exists
Digest: sha256:adbb90115a21969d2fe6fa7f9af4253e16d45f8d4c1e930182610c4731962658
Status: Downloaded newer image for ubuntu:22.04
```

**Para instalar PHP en Ubuntu, sigue estas instrucciones:**

1. **Actualiza los paquetes e instala la versión `8.1` de PHP:**

   ```bash
   apt update && apt install php8.1
   ```

   **Nota: No uses la flag `-y` para poder revisar los paquetes que se instalarán.**

2. *Para más detalles sobre la instalación de PHP en Ubuntu, consulta [esta guía](https://phoenixnap.com/kb/install-php-on-ubuntu "ttps://phoenixnap.com/kb/install-php-on-ubuntu").*

---

```bash
The following additional packages will be installed:
  apache2 apache2-bin apache2-data apache2-utils bzip2 ca-certificates file libapache2-mod-php8.1 libapr1 libaprutil1 libaprutil1-dbd-sqlite3
  libaprutil1-ldap libargon2-1 libbrotli1 libbsd0 libcurl4 libedit2 libexpat1 libgdbm-compat4 libgdbm6 libicu70 libjansson4 libldap-2.5-0
  libldap-common liblua5.3-0 libmagic-mgc libmagic1 libmd0 libnghttp2-14 libperl5.34 libpsl5 librtmp1 libsasl2-2 libsasl2-modules
  libsasl2-modules-db libsodium23 libsqlite3-0 libssh-4 libxml2 mailcap media-types mime-support netbase openssl perl perl-modules-5.34 php-common
  php8.1-cli php8.1-common php8.1-opcache php8.1-readline psmisc publicsuffix ssl-cert tzdata ucf xz-utils
Suggested packages:
  apache2-doc apache2-suexec-pristine | apache2-suexec-custom www-browser ufw bzip2-doc php-pear gdbm-l10n libsasl2-modules-gssapi-mit
  | libsasl2-modules-gssapi-heimdal libsasl2-modules-ldap libsasl2-modules-otp libsasl2-modules-sql perl-doc libterm-readline-gnu-perl
  | libterm-readline-perl-perl make libtap-harness-archive-perl
The following NEW packages will be installed:
  apache2 apache2-bin apache2-data apache2-utils bzip2 ca-certificates file libapache2-mod-php8.1 libapr1 libaprutil1 libaprutil1-dbd-sqlite3
  libaprutil1-ldap libargon2-1 libbrotli1 libbsd0 libcurl4 libedit2 libexpat1 libgdbm-compat4 libgdbm6 libicu70 libjansson4 libldap-2.5-0
  libldap-common liblua5.3-0 libmagic-mgc libmagic1 libmd0 libnghttp2-14 libperl5.34 libpsl5 librtmp1 libsasl2-2 libsasl2-modules
  libsasl2-modules-db libsodium23 libsqlite3-0 libssh-4 libxml2 mailcap media-types mime-support netbase openssl perl perl-modules-5.34 php-common
  php8.1 php8.1-cli php8.1-common php8.1-opcache php8.1-readline psmisc publicsuffix ssl-cert tzdata ucf xz-utils
0 upgraded, 58 newly installed, 0 to remove and 5 not upgraded.
Need to get 31.6 MB of archives.
After this operation, 138 MB of additional disk space will be used.
Do you want to continue? [Y/n]
```

> [!IMPORTANT]
> *Observamos que uno de los paquetes que actúa como dependencia para PHP es `tzdata`. Este paquete proporciona datos de zonas horarias, que son necesarios para que PHP maneje correctamente las fechas y horas en diferentes regiones del mundo. En otras palabras, `tzdata` garantiza que PHP pueda realizar conversiones y cálculos de fechas y horas basados en las zonas horarias adecuadas, lo que es fundamental para aplicaciones que necesitan manejar datos temporales de manera precisa.*

```bash
The following NEW packages will be installed:
  apache2 apache2-bin apache2-data apache2-utils bzip2 ca-certificates file libapache2-mod-php8.1 libapr1 libaprutil1 libaprutil1-dbd-sqlite3
  libaprutil1-ldap libargon2-1 libbrotli1 libbsd0 libcurl4 libedit2 libexpat1 libgdbm-compat4 libgdbm6 libicu70 libjansson4 libldap-2.5-0
  libldap-common liblua5.3-0 libmagic-mgc libmagic1 libmd0 libnghttp2-14 libperl5.34 libpsl5 librtmp1 libsasl2-2 libsasl2-modules
  libsasl2-modules-db libsodium23 libsqlite3-0 libssh-4 libxml2 mailcap media-types mime-support netbase openssl perl perl-modules-5.34 php-common
  php8.1 php8.1-cli php8.1-common php8.1-opcache php8.1-readline psmisc publicsuffix ssl-cert tzdata ucf xz-utils
```

---

> [!NOTE]
> *En los contenedores Docker, es común que algunos paquetes esenciales, como `tzdata`, no estén instalados o configurados por defecto. Este paquete es crucial para la configuración correcta de la zona horaria, y muchos programas, incluyendo PHP, requieren que `tzdata` esté instalado y configurado para funcionar correctamente.*

---

## ***¿Qué es `tzdata`?***

- *`tzdata` es el paquete que contiene la base de datos de zonas horarias. Sus siglas se derivan de "Time Zone Data" (Datos de Zona Horaria). Proporciona información sobre la hora estándar y el horario de verano para diversas regiones del mundo. Es utilizado por varios sistemas y aplicaciones para manejar y ajustar las fechas y horas de manera correcta.*

---

## ***Instalación y Configuración de `tzdata` en Contenedores***

---

### ***Instalación de `tzdata`***

**Dado que `tzdata` no siempre viene preinstalado en los contenedores Docker, especialmente en entornos base como Ubuntu, es posible que necesites instalarlo manualmente. Para hacerlo, ejecuta el siguiente comando en tu contenedor:**

```bash
apt update && apt install tzdata
```

**Este comando actualizará la lista de paquetes e instalará `tzdata` en el contenedor.**

---

### ***Verificación de la Instalación***

**Puedes verificar si `tzdata` está instalado en el contenedor ejecutando el siguiente comando:**

```bash
docker exec -it php-practicas /bin/bash -c "apt list --installed | grep -iE tzdata --color=auto"

WARNING: apt does not have a stable CLI interface. Use with caution in scripts.
```

**Esto te mostrará si `tzdata` está instalado y su versión.**

**Para verificar si `tzdata` está instalado en el host, usa:**

```bash
apt list --installed | grep -iE tzdata --color=auto

WARNING: apt does not have a stable CLI interface. Use with caution in scripts.

tzdata/noble-updates,now 2024a-3ubuntu1.1 all [instalado, automático]
```

**Esto te mostrará la versión de `tzdata` instalada en tu sistema host.**

---

### ***Notas Adicionales***

- **Configuración de la Zona Horaria:** *Después de instalar `tzdata`, puede ser necesario configurar la zona horaria. Puedes hacerlo con el comando `dpkg-reconfigure tzdata` dentro del contenedor.*

- **En Distribuciones:** *En la mayoría de las distribuciones de Linux, `tzdata` ya está instalado. Sin embargo, en entornos base de contenedores, como los que usamos para crear imágenes Docker, este paquete puede no estar presente.*

---

**Debido a la falta del paquete `tzdata`, es posible que el comando `date` en el contenedor Docker no muestre la hora correcta. Por ejemplo, si ejecutas el comando `date` en el contenedor, es posible que obtengas la hora en UTC, que significa "Coordinated Universal Time" (Tiempo Universal Coordinado). UTC es el estándar de tiempo global que no se ajusta a horarios de verano.**

```bash
docker exec -it php-practicas date
Sat Aug 31 19:46:03 UTC 2024
```

**Por otro lado, si ejecutas el comando `date` en tu host, que está correctamente configurado para la zona horaria CST (Central Standard Time):**

```bash
date
Sat Aug 31 13:46:25 CST 2024
```

---

## ***Confirmar Instalación de PHP 8.1***

**Si aún no has instalado PHP 8.1 en el contenedor, hazlo ejecutando:**

```bash
apt update && apt install php8.1
```

---

## ***Problema con la Configuración de `tzdata` en Docker***

- *Cuando instalas `tzdata` en un contenedor Docker, se te pedirá que realices una configuración interactiva, como seleccionar la región geográfica y la ciudad o región que corresponda a tu zona horaria. Sin embargo, en un Dockerfile, no es posible realizar estas configuraciones de manera interactiva durante la construcción de la imagen. Por lo tanto, es necesario automatizar este proceso.*

---

### ***Configuración Interactiva de `tzdata`***

**Aquí está el proceso interactivo típico que se presenta al instalar `tzdata`:**

1. **Selecciona el área geográfica:** *Por ejemplo, para América, selecciona `2`.*

   ```bash
   Please select the geographic area in which you live. Subsequent configuration questions will narrow this down by presenting a list of cities,
   representing the time zones in which they are located.

     1. Africa  2. America  3. Antarctica  4. Australia  5. Arctic  6. Asia  7. Atlantic  8. Europe  9. Indian  10. Pacific  11. US  12. Etc
   Geographic area: 2
   ```

2. **Selecciona la ciudad o región:** *En este caso, para Managua, selecciona `89`. Si no ves tu opción, presiona Enter para ver más opciones disponibles.*

```bash
Please select the city or region corresponding to your time zone.

  1. Adak                     33. Cancun         65. Guyana                97. Metlakatla               129. Resolute
  2. Anchorage                34. Caracas        66. Halifax               98. Mexico_City              130. Rio_Branco
  3. Anguilla                 35. Cayenne        67. Havana                99. Miquelon                 131. Santa_Isabel
  4. Antigua                  36. Cayman         68. Hermosillo            100. Moncton                 132. Santarem
  5. Araguaina                37. Chicago        69. Indiana/Indianapolis  101. Monterrey               133. Santiago
  6. Argentina/Buenos_Aires   38. Chihuahua      70. Indiana/Knox          102. Montevideo              134. Santo_Domingo
  7. Argentina/Catamarca      39. Ciudad_Juarez  71. Indiana/Marengo       103. Montreal                135. Sao_Paulo
  8. Argentina/Cordoba        40. Coral_Harbour  72. Indiana/Petersburg    104. Montserrat              136. Scoresbysund
  9. Argentina/Jujuy          41. Costa_Rica     73. Indiana/Tell_City     105. Nassau                  137. Shiprock
  10. Argentina/La_Rioja      42. Creston        74. Indiana/Vevay         106. New_York                138. Sitka
  11. Argentina/Mendoza       43. Cuiaba         75. Indiana/Vincennes     107. Nipigon                 139. St_Barthelemy
  12. Argentina/Rio_Gallegos  44. Curacao        76. Indiana/Winamac       108. Nome                    140. St_Johns
  13. Argentina/Salta         45. Danmarkshavn   77. Inuvik                109. Noronha                 141. St_Kitts
  14. Argentina/San_Juan      46. Dawson         78. Iqaluit               110. North_Dakota/Beulah     142. St_Lucia
  15. Argentina/San_Luis      47. Dawson_Creek   79. Jamaica               111. North_Dakota/Center     143. St_Thomas
  16. Argentina/Tucuman       48. Denver         80. Juneau                112. North_Dakota/New_Salem  144. St_Vincent
  17. Argentina/Ushuaia       49. Detroit        81. Kentucky/Louisville   113. Nuuk                    145. Swift_Current
  18. Aruba                   50. Dominica       82. Kentucky/Monticello   114. Ojinaga                 146. Tegucigalpa
  19. Asuncion                51. Edmonton       83. Kralendijk            115. Panama                  147. Thule
  20. Atikokan                52. Eirunepe       84. La_Paz                116. Pangnirtung             148. Thunder_Bay
  21. Atka                    53. El_Salvador    85. Lima                  117. Paramaribo              149. Tijuana
  22. Bahia                   54. Ensenada       86. Los_Angeles           118. Phoenix                 150. Toronto
  23. Bahia_Banderas          55. Fort_Nelson    87. Lower_Princes         119. Port-au-Prince          151. Tortola
  24. Barbados                56. Fortaleza      88. Maceio                120. Port_of_Spain           152. Vancouver
  25. Belem                   57. Glace_Bay      89. Managua               121. Porto_Acre              153. Virgin
  26. Belize                  58. Godthab        90. Manaus                122. Porto_Velho             154. Whitehorse
  27. Blanc-Sablon            59. Goose_Bay      91. Marigot               123. Puerto_Rico             155. Winnipeg
  28. Boa_Vista               60. Grand_Turk     92. Martinique            124. Punta_Arenas            156. Yakutat
  29. Bogota                  61. Grenada        93. Matamoros             125. Rainy_River             157. Yellowknife
[More]

  1.  Boise                   62. Guadeloupe     94. Mazatlan              126. Rankin_Inlet
  2.  Cambridge_Bay           63. Guatemala      95. Menominee             127. Recife
  3.  Campo_Grande            64. Guayaquil      96. Merida                128. Regina
Time zone: 89
```

**Después de instalar y configurar el paquete `tzdata` en el contenedor, es útil verificar si el comando `date` dentro del contenedor coincide con el comando `date` en tu host.**

### ***Verificación de la Zona Horaria en el Contenedor y el Host***

1. **Comando `date` en el Contenedor**

   **Ejecuta el comando `date` dentro del contenedor para confirmar que la zona horaria se ha configurado correctamente:**

   ```bash
   root@44add26ca7a4:/App# date
   Sat Aug 31 13:54:53 CST 2024
   ```

   **Aquí, `CST` (Central Standard Time) debería coincidir con la configuración de la zona horaria del host.**

2. **Comando `date` en el Host**

   **Ejecuta el mismo comando en tu host para comparar la hora:**

   ```bash
   date
   Sat Aug 31 13:55:58 CST 2024
   ```

   **La hora debe estar cerca de la del contenedor, con una diferencia mínima que puede deberse a la sincronización del reloj.**

---

### ***Verificación de la Instalación de `tzdata` en el Contenedor***

**Para asegurarte de que `tzdata` está instalado correctamente en el contenedor, puedes usar el siguiente comando:**

```bash
root@44add26ca7a4:/App# apt list --installed | grep -iE tzdata --color=auto

WARNING: apt does not have a stable CLI interface. Use with caution in scripts.

tzdata/jammy-updates,now 2024a-0ubuntu0.22.04.1 all [installed,automatic]
```

**Este comando confirma que `tzdata` está instalado y muestra la versión instalada en el contenedor.**

---

### ***Verificación de la Instalación de PHP***

**Finalmente, para verificar que PHP está instalado y revisar su versión, usa el siguiente comando:**

```bash
root@44add26ca7a4:/App# php --version
PHP 8.1.2-1ubuntu2.18 (cli) (built: Jun 14 2024 15:52:55) (NTS)
Copyright (c) The PHP Group
Zend Engine v4.1.2, Copyright (c) Zend Technologies
    with Zend OPcache v8.1.2-1ubuntu2.18, Copyright (c), by Zend Technologies
```

*Este comando confirma que PHP `8.1.2` está instalado en el contenedor y muestra información sobre la versión y la configuración de PHP.*
