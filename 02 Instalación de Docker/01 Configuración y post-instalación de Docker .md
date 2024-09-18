<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->
# ***Configuración y post-instalación de Docker***

*Para configurar Docker correctamente después de la instalación en Linux, sigue estos pasos:*

1. **Crea el grupo Docker:**

    ```bash
    sudo groupadd docker
    ```

2. **Agrega tu usuario al grupo Docker:**

    ```bash
    sudo usermod -aG docker $USER
    ```

3. **Inicia un nuevo grupo de shell para que los cambios surtan efecto:**

    ```bash
    newgrp docker
    ```

4. **Verifica que Docker esté instalado correctamente ejecutando un contenedor de prueba:**

    ```bash
    docker run hello-world
    ```

    **Si obtienes el siguiente error:**

    ```plaintext
    WARNING: Error loading config file: /home/user/.docker/config.json -
    stat /home/user/.docker/config.json: permission denied
    ```

5. **Ajusta los permisos del directorio `.docker`:**

    ```bash
    sudo chown "$USER":"$USER" /home/"$USER"/.docker -R
    sudo chmod g+rwx "$HOME/.docker" -R
    ```

6. **Habilita los servicios de Docker y containerd para que se inicien automáticamente en el arranque:**

    ```bash
    sudo systemctl enable docker.service
    sudo systemctl enable containerd.service
    ```

7. **Opcional: Si deseas deshabilitar los servicios de Docker y containerd para que no se inicien automáticamente en el arranque:**

```bash
sudo systemctl disable docker.service
sudo systemctl disable containerd.service
```

*Ahora Docker debería estar configurado correctamente en tu sistema Linux.*

---

> [!NOTE]
> *Recuerda que estos pasos son para la configuración básica y post-instalación de Docker en sistemas Linux. Para obtener más información y opciones de configuración avanzada, consulta la [documentación oficial de Docker](https://docs.docker.com/engine/install/linux-postinstall/ "https://docs.docker.com/engine/install/linux-postinstall/").*
