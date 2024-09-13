# ***Demo de Despliegue de una App con Docker Hub y Digital Ocean***

*Para desplegar en la nube, puedes utilizar DigitalOcean. Más información en: [DigitalOcean](https://www.digitalocean.com/?utm_medium=affiliates&utm_source=impact&utm_campaign=5625023&utm_content=&irgwc=1&irclickid=3wswPzw8BxyKWcuQ6azW3wwdUkC25B3DHSclWk0&gad_source=1&gclid=CjwKCAjwooq3BhB3EiwAYqYoEvankrUYNcNAYMEptYUEbUh0VX1A7gWqDRPsu1I5EBaPUMpFW75HihoCH2UQAvD_BwE "https://www.digitalocean.com/?utm_medium=affiliates&utm_source=impact&utm_campaign=5625023&utm_content=&irgwc=1&irclickid=3wswPzw8BxyKWcuQ6azW3wwdUkC25B3DHSclWk0&gad_source=1&gclid=CjwKCAjwooq3BhB3EiwAYqYoEvankrUYNcNAYMEptYUEbUh0VX1A7gWqDRPsu1I5EBaPUMpFW75HihoCH2UQAvD_BwE").*

- *DigitalOcean utiliza el puerto 8080 por defecto para las aplicaciones desplegadas y ofrece varios servicios para la gestión de infraestructura en la nube.*

- *Para subir imágenes a Docker Hub, visita: [Docker Hub](https://hub.docker.com/ "https://hub.docker.com/").*

- *Ten en cuenta que con una cuenta gratuita en Docker Hub, solo puedes tener un repositorio privado. Para más repositorios privados, es necesario optar por un plan de pago.*

---

## ***Construimos la imagen con el siguiente comando:***

```bash
docker build -t d4nitrix13/aplication-express:latest ./
```

```bash
docker build -t  d4nitrix13/aplication-express:latest ./
[+] Building 26.7s (12/12) FINISHED                                                                                                                      docker:default
 => [internal] load build definition from Dockerfile                                                                                                               0.0s
 => => transferring dockerfile: 2.83kB                                                                                                                             0.0s
 => [internal] load metadata for docker.io/library/node:18.15.0-alpine                                                                                             9.3s
 => [auth] library/node:pull token for registry-1.docker.io                                                                                                        0.0s
 => [internal] load .dockerignore                                                                                                                                  0.0s
 => => transferring context: 221B                                                                                                                                  0.0s
 => [internal] load build context                                                                                                                                  0.0s
 => => transferring context: 27.72kB                                                                                                                               0.0s
 => [builder 1/6] FROM docker.io/library/node:18.15.0-alpine@sha256:47d97b93629d9461d64197773966cc49081cf4463b1b07de5a38b6bd5acfbe9d                              11.4s
 => => resolve docker.io/library/node:18.15.0-alpine@sha256:47d97b93629d9461d64197773966cc49081cf4463b1b07de5a38b6bd5acfbe9d                                       0.0s
 => => sha256:a89e758f145e81ebe13f42f7831a348f212dcb3c17bc269201752bb76a9e52cf 2.35MB / 2.35MB                                                                     1.2s
 => => sha256:47d97b93629d9461d64197773966cc49081cf4463b1b07de5a38b6bd5acfbe9d 1.43kB / 1.43kB                                                                     0.0s
 => => sha256:a3f2350bd3eb48525f801b57934300c11aa3610086b708854ab1c1045c018519 1.16kB / 1.16kB                                                                     0.0s
 => => sha256:305c985a481fc143f40c3a5c1cb398756057851f3ab748e381c76fd1ce5b0177 6.48kB / 6.48kB                                                                     0.0s
 => => sha256:f56be85fc22e46face30e2c3de3f7fe7c15f8fd7c4e5add29d7f64b87abdaa09 3.37MB / 3.37MB                                                                     0.8s
 => => sha256:51fa4270e0ccb40f31d39a195bac1ff5d1070909c60d8341690748af6abee321 47.54MB / 47.54MB                                                                   8.2s
 => => extracting sha256:f56be85fc22e46face30e2c3de3f7fe7c15f8fd7c4e5add29d7f64b87abdaa09                                                                          0.1s
 => => sha256:d3f921cbf16e91105a848c0cf6c365c0d7530152d264ce4bdd914a0a3ee00f82 453B / 453B                                                                         1.2s
 => => extracting sha256:51fa4270e0ccb40f31d39a195bac1ff5d1070909c60d8341690748af6abee321                                                                          2.8s
 => => extracting sha256:a89e758f145e81ebe13f42f7831a348f212dcb3c17bc269201752bb76a9e52cf                                                                          0.1s
 => => extracting sha256:d3f921cbf16e91105a848c0cf6c365c0d7530152d264ce4bdd914a0a3ee00f82                                                                          0.0s
 => [builder 2/6] RUN apk add --no-cache tini                                                                                                                      2.2s
 => [builder 3/6] WORKDIR /App                                                                                                                                     0.0s
 => [builder 4/6] COPY --chown=node:node ./package*.json ./                                                                                                        0.0s
 => [builder 5/6] RUN npm ci --omit=dev                                                                                                                            3.3s
 => [builder 6/6] COPY --chown=node:node ./ ./                                                                                                                     0.0s
 => exporting to image                                                                                                                                             0.2s
 => => exporting layers                                                                                                                                            0.2s
 => => writing image sha256:0b8c7dd738bc538dfb3be4f3ce886a4ac46099a73d732ffdbd67624aca5ee2c2                                                                       0.0s
 => => naming to docker.io/d4nitrix13/aplication-express:latest                                                                                                    0.0s
```

- **Para verificar las imágenes construidas, usamos:**

```bash
docker images -a
REPOSITORY                      TAG       IMAGE ID       CREATED         SIZE
d4nitrix13/aplication-express   latest    0b8c7dd738bc   7 minutes ago   181MB
```

- *Para etiquetar la imagen para Docker Hub, usamos el comando `docker tag`, que asigna una nueva etiqueta a la imagen. En este caso, ya hemos asignado la etiqueta `latest` en el paso de construcción, por lo que el comando simplemente confirma esta etiqueta:*

```bash
docker tag 0b8c7dd738bc d4nitrix13/aplication-express:latest
```

- *Este comando asocia el `IMAGE ID` con el nombre del repositorio y la etiqueta que deseamos usar en Docker Hub.*

---

### ***1. Crear un Token de Acceso***

**Para crear un token de acceso personal en Docker Hub, sigue estos enlaces:**

- *[Configurar token](https://app.docker.com/settings/personal-access-tokens "https://app.docker.com/settings/personal-access-tokens")*
- *[Crear nuevo token](https://app.docker.com/settings/personal-access-tokens/create "https://app.docker.com/settings/personal-access-tokens/create")*

- **Una vez creado el token, Docker Hub te proporcionará las siguientes credenciales:**

---

### **2. Comando para iniciar sesión**

```bash
docker login -u d4nitrix13
```

---

### ***3. Contraseña: (esto es el token generado)***

```text
b491b415a55d842c214004c8fa3372a4be1b
```

**Salida completa del comando `docker login`:**

```bash
docker login -u d4nitrix13
Password:
WARNING! Your password will be stored unencrypted in /home/d4nitrix13/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credential-stores

Login Succeeded
```

---

### ***4. Crear un Repositorio en Docker Hub***

- **Para crear un repositorio en Docker Hub y subir tu imagen, sigue estos enlaces:**

- *[Accede a tus repositorios](https://hub.docker.com/repositories/d4nitrix13 "https://hub.docker.com/repositories/d4nitrix13")*
- *[Accede a tus repositorio aplication-express](https://hub.docker.com/r/d4nitrix13/aplication-express "https://hub.docker.com/r/d4nitrix13/aplication-express")*
- *[Accede a tus repositorios General](https://hub.docker.com/repository/docker/d4nitrix13/aplication-express/general "https://hub.docker.com/repository/docker/d4nitrix13/aplication-express/general")*
- *[Accede a tus repositorios Tags](https://hub.docker.com/repository/docker/d4nitrix13/aplication-express/tags "https://hub.docker.com/repository/docker/d4nitrix13/aplication-express/tags")*
- *[Crear un nuevo repositorio](https://hub.docker.com/repository/create?namespace=d4nitrix13 "https://hub.docker.com/repository/create?namespace=d4nitrix13")*

**Nombre del repositorio:** `aplication-express`

**Etiqueta recomendada para la imagen:** `latest`

---

Sí, es recomendable hacer login mediante un token en lugar de usar una contraseña, especialmente por razones de seguridad. Aquí tienes la información mejorada sobre cómo hacer el login y bajar una imagen:

---

### ***1. Bajar la Imagen desde Docker Hub***

**Para descargar una imagen desde Docker Hub, usa el siguiente comando:**

```bash
docker pull d4nitrix13/aplication-express:latest
```

```bash
docker pull d4nitrix13/aplication-express:latest
latest: Pulling from d4nitrix13/aplication-express
f56be85fc22e: Pull complete
51fa4270e0cc: Pull complete
a89e758f145e: Pull complete
d3f921cbf16e: Pull complete
7e3b3bcd32b5: Pull complete
26cd4d4f7ca6: Pull complete
c1342ba71bd0: Pull complete
3f6eaa8df40d: Pull complete
2d543805d47e: Pull complete
Digest: sha256:f231da6ff30c87fa51d555aa67358cf53509f93e9d93a38e21432412f561944a
Status: Downloaded newer image for d4nitrix13/aplication-express:latest
docker.io/d4nitrix13/aplication-express:latest
```

- **1. Ejecutar el Contenedor Docker**

- **Para ejecutar tu contenedor Docker y exponer el puerto 8080, utiliza el siguiente comando:**

```bash
docker run -itp8080:8080 --rm d4nitrix13/aplication-express
```

**Explicación:**

- **`-it`:** *Ejecuta el contenedor en modo interactivo y con un terminal.*
- **`-p 8080:8080`:** *Mapea el puerto 8080 del contenedor al puerto 8080 de tu máquina local.*
- **`--rm`:** *Elimina el contenedor una vez que se detenga.*
- **`d4nitrix13/aplication-express`:** *Es el nombre de la imagen que estás ejecutando.*

**Salida Esperada:**

```bash
Aplicación de ejemplo escuchando en el puerto 8080
```

- **2. Realizar una Petición HTTP para Verificar el Funcionamiento**

- *Para asegurarte de que la aplicación está corriendo correctamente, puedes hacer una petición HTTP a `localhost` en el puerto 8080 usando `curl`:*

```bash
curl 127.0.0.1:8080
```

**Salida Esperada:**

```bash
Hello World!
```

**Notas Adicionales:**

- *Asegúrate de que el puerto 8080 esté disponible y no esté siendo usado por otro servicio en tu máquina local.*
- *Si la aplicación no responde como se espera, verifica los logs del contenedor para solucionar posibles errores.*

---

### ***2. Hacer Login en Docker Hub Usando un Token***

**Es altamente recomendable utilizar un token de acceso personal para autenticarte en Docker Hub en lugar de tu contraseña. Los tokens ofrecen un nivel adicional de seguridad y permiten un control más granular sobre los permisos y el acceso. Además, puedes revocar o crear nuevos tokens sin necesidad de cambiar tu contraseña principal.**

**Comando para iniciar sesión con un token:**

```bash
docker login -u d4nitrix13
```

**Cuando se te pida la contraseña, ingresa el token en lugar de tu contraseña real.**

**Ventajas de usar un token:**

- **Seguridad Mejorada:** *Los tokens pueden ser limitados en alcance y duración, reduciendo el riesgo de exposición de tu contraseña principal.*
- **Facilidad de Gestión:** *Puedes crear, revocar y gestionar múltiples tokens sin afectar tu contraseña principal.*
- **Cumplimiento de Políticas:** *En entornos organizacionales, los tokens son más compatibles con las políticas de seguridad que exigen el uso de credenciales temporales o limitadas.*

---

## ***Sí, puedes hacer login en Docker Hub sin usar un token, pero no es recomendable por motivos de seguridad. Aquí tienes la información mejorada sobre cómo hacer el login sin un token y por qué usar un token es preferible:***

---

### ***1. Hacer Login en Docker Hub Sin un Token***

**Para iniciar sesión en Docker Hub usando tu contraseña, utiliza el siguiente comando:**

```bash
docker login
```

- **Se te pedirá que ingreses tu nombre de usuario y contraseña. Después de ingresar tus credenciales, Docker guardará tu contraseña en un archivo de configuración en tu máquina local, que por defecto está en `/home/tu_usuario/.docker/config.json`.**

**Ejemplo de salida completa:**

```bash
docker login
Username: d4nitrix13
Password:
WARNING! Your password will be stored unencrypted in /home/d4nitrix13/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credential-stores

Login Succeeded
```
