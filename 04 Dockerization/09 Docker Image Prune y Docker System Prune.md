<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->

# ***Docker Image Prune y Docker System Prune***

## ***Docker Image Prune***

*El comando `docker image prune` se utiliza para eliminar imágenes de Docker no utilizadas. Según la [documentación oficial](https://docs.docker.com/reference/cli/docker/image/prune/ "https://docs.docker.com/reference/cli/docker/image/prune/"), este comando elimina imágenes que no están en uso por ningún contenedor y aquellas que no tienen etiquetas (dangling images). Es importante destacar que no eliminará imágenes dangling si están siendo utilizadas por un contenedor.*

### ***Ejemplo de uso***

```bash
docker image prune
```

## ***Docker Image Prune con la opción --all***

*El comando `docker image prune --all` (`docker image prune -a`) elimina todas las imágenes que no están siendo utilizadas por un contenedor, independientemente de si son dangling o no.*

### ***Ejemplo de uso:***

```bash
docker image prune --all
```

## ***Docker System Prune***

*El comando `docker system prune` realiza una limpieza más completa del sistema Docker. Según la [documentación oficial](https://docs.docker.com/reference/cli/docker/system/prune/ "https://docs.docker.com/reference/cli/docker/system/prune/"), este comando elimina:*

- *Todos los contenedores detenidos.*
- *Todas las redes no utilizadas por contenedores.*
- *Todas las imágenes dangling.*
- *La caché de construcción de Docker.*

### ***Ejemplo de uso de este comando***

```bash
docker system prune
```

*Con estos comandos, puedes mantener tu entorno Docker limpio y ordenado, eliminando recursos no utilizados y liberando espacio en tu sistema.*

```bash
docker images
REPOSITORY        TAG       IMAGE ID       CREATED       SIZE
<none>            <none>    8422c7d5dbfe   4 days ago    344MB
d4nitrix13/node   exec      ee87e1b066d0   5 days ago    344MB
d4nitrix13/node   shell     287616143143   5 days ago    344MB
d4nitrix13/node   latest    146b0b14c7a8   2 weeks ago   344MB
d4nitrix13/node   0.1.1     93755b038008   2 weeks ago   344MB
ubuntu            22.04     52882761a72a   8 weeks ago   77.44MB
```
