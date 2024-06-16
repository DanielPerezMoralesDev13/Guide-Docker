<!-- Autor: Daniel Benjamin Perez Morales -->
<!-- GitHub: https://github.com/DanielPerezMoralesDev13 -->
<!-- Correo electrónico: danielperezdev@proton.me -->
# ***Docker no es una maquina virtual***

- *Docker y las máquinas virtuales (VMs) son tecnologías que permiten aislar aplicaciones, pero funcionan de manera fundamentalmente diferente. Aquí te explico por qué Docker no es una máquina virtual y cuáles son las principales diferencias entre ambas tecnologías.*

## ***Arquitectura***

1. **Máquinas Virtuales (VMs):**

   - **Hypervisor:** *Las VMs corren sobre un hipervisor (como VMware, Hyper-V, o KVM) que se encarga de gestionar múltiples VMs en un solo host físico.*

   - **Sistema Operativo Completo:** *Cada VM incluye un sistema operativo completo junto con la aplicación y sus dependencias. Esto significa que cada VM tiene su propio kernel.*

   - **Aislamiento Fuerte:** *Las VMs están completamente aisladas entre sí, ya que cada una tiene su propio sistema operativo.*

2. **Docker:**

   - **Motor de Docker:** *Docker corre sobre el sistema operativo del host y utiliza su kernel para crear contenedores.*

   - **Compartición del Kernel:** *Los contenedores comparten el mismo kernel del sistema operativo del host, pero mantienen un espacio de usuario separado. Esto significa que no incluyen un sistema operativo completo, solo las aplicaciones y sus dependencias necesarias.*

   - **Aislamiento Ligero:** *Los contenedores están aislados entre sí, pero comparten el mismo kernel, lo que los hace más ligeros que las VMs.*

### ***Rendimiento y Uso de Recursos***

1. **Máquinas Virtuales:**

   - **Recursos Pesados:** *Cada VM tiene su propio sistema operativo, lo que consume una cantidad considerable de recursos (CPU, memoria, almacenamiento).*

   - **Inicio Lento:** *Las VMs tardan más en arrancar debido a que deben inicializar un sistema operativo completo.*

2. **Docker:**

   - **Ligereza:** *Los contenedores son mucho más ligeros porque solo contienen las aplicaciones y sus dependencias, no un sistema operativo completo.*

   - **Inicio Rápido:** *Los contenedores pueden iniciarse en cuestión de segundos porque no necesitan arrancar un sistema operativo completo.*

### ***Escalabilidad y Portabilidad***

1. **Máquinas Virtuales:**

   - **Escalabilidad Limitada:** *Escalar aplicaciones con VMs puede ser más complejo y costoso debido a la sobrecarga de recursos.*

   - **Portabilidad:** *Las VMs son portables, pero debido a su tamaño y a la inclusión de un sistema operativo completo, moverlas entre diferentes entornos puede ser más complicado.*

2. **Docker:**

   - **Escalabilidad Fácil:** *Docker facilita la creación y gestión de múltiples instancias de contenedores, lo que permite escalar aplicaciones horizontalmente de manera más eficiente.*

   - **Alta Portabilidad:** *Los contenedores son extremadamente portables y pueden moverse fácilmente entre diferentes entornos (desarrollo, pruebas, producción) sin preocuparse por las inconsistencias del sistema operativo.*

### ***Uso Combinado***

- *En muchos casos, Docker y las VMs se utilizan en conjunto para aprovechar las ventajas de ambas tecnologías. Por ejemplo, puedes tener VMs ejecutando diferentes tipos de sistemas operativos y, dentro de esas VMs, ejecutar contenedores Docker para aprovechar la ligereza y portabilidad de los contenedores.*

- *Un hipervisor es una pieza de software, hardware o firmware que crea y ejecuta máquinas virtuales (VMs). Se puede considerar como una capa de abstracción que permite que múltiples sistemas operativos se ejecuten simultáneamente en un solo hardware físico, aislando y gestionando los recursos del hardware entre las VMs. Existen dos tipos principales de hipervisores: hipervisores de tipo 1 (bare metal) y hipervisores de tipo 2 (hosted).*

### ***Hipervisor***

1. **Hipervisor Tipo 1 (Bare Metal Hypervisor):**

   - **Definición:** *Un hipervisor de tipo 1, también conocido como hipervisor bare metal, se instala directamente sobre el hardware físico del servidor, sin necesidad de un sistema operativo subyacente.*

   - **Funcionamiento:** *Controla directamente el hardware del servidor y gestiona las VMs, asignando recursos de CPU, memoria, almacenamiento y red.*

   - **Ejemplos:** *VMware ESXi, Microsoft Hyper-V (cuando se usa en modo bare metal), Xen, KVM.*

   - **Ventajas:**

     - **Rendimiento:** *Ofrece mejor rendimiento y eficiencia ya que elimina la capa adicional del sistema operativo.*

     - **Seguridad y Estabilidad:** *Al operar directamente sobre el hardware, reduce las superficies de ataque y potenciales puntos de fallo.*

     - **Escalabilidad:** *Mejor manejo de recursos y mayor capacidad de escalabilidad para entornos empresariales grandes.*

   - **Desventajas:**

     - **Complejidad de Configuración:** *Puede ser más complejo de configurar y administrar.*

     - **Requiere Hardware Dedicado:** *Necesita hardware dedicado y no puede aprovechar un sistema operativo ya existente en el servidor.*

2. **Hipervisor Tipo 2 (Hosted Hypervisor):**

   - **Definición:** *Un hipervisor de tipo 2 se ejecuta sobre un sistema operativo anfitrión. El hipervisor actúa como una aplicación del sistema operativo anfitrión y permite ejecutar VMs sobre este sistema.*

   - **Funcionamiento:** *Utiliza el sistema operativo anfitrión para gestionar los recursos de hardware y luego asigna esos recursos a las VMs.*

   - **Ejemplos:** *VMware Workstation, Oracle VirtualBox, Parallels Desktop.*

   - **Ventajas:**

     - **Facilidad de Uso:** *Es más fácil de instalar y utilizar, especialmente en entornos de desarrollo y pruebas.*

     - **Flexibilidad:** *Puede ejecutarse en máquinas que ya tienen un sistema operativo instalado.*

   - **Desventajas:**

     - **Rendimiento Inferior:** *Menor rendimiento en comparación con los hipervisores de tipo 1 debido a la capa adicional del sistema operativo anfitrión.*

     - **Mayor Consumo de Recursos:** *El sistema operativo anfitrión también consume recursos, lo que puede reducir la eficiencia global.*

### ***Bare Metal Hypervisor***

*Un **bare metal hypervisor** (hipervisor de tipo 1) se instala directamente sobre el hardware del servidor. No requiere un sistema operativo base, ya que el hipervisor actúa como el sistema operativo que gestiona directamente los recursos de hardware y las VMs.*

**Características del Bare Metal Hypervisor:**

- **Acceso Directo al Hardware:** *Al tener acceso directo a los recursos del hardware, puede gestionar y asignar estos recursos de manera más eficiente y con menor latencia.*

- **Mayor Rendimiento y Estabilidad:** *Debido a la eliminación de la capa adicional del sistema operativo, los hipervisores bare metal suelen ofrecer mejor rendimiento y mayor estabilidad.*

- **Uso en Entornos de Producción:** *Son comúnmente utilizados en entornos de producción empresariales debido a su capacidad para manejar cargas de trabajo grandes y variadas con alta eficiencia.*

**Ejemplos y Comparaciones:**

- **VMware ESXi:** *Un hipervisor bare metal popular utilizado en centros de datos y entornos empresariales.*

- **Microsoft Hyper-V:** *Puede actuar como hipervisor bare metal cuando se instala directamente sobre el hardware sin un sistema operativo base.*

- *Un hipervisor es fundamental para la virtualización, permitiendo ejecutar múltiples VMs en un solo hardware físico. Los hipervisores de tipo 1 (bare metal) se instalan directamente sobre el hardware, ofreciendo mejor rendimiento y eficiencia, mientras que los hipervisores de tipo 2 se ejecutan sobre un sistema operativo anfitrión y son más fáciles de usar, aunque con menor rendimiento. La elección entre ellos depende de las necesidades específicas del entorno, con los bare metal hypervisors siendo ideales para entornos de producción empresariales que requieren alta eficiencia y estabilidad.*

- *Docker se asocia fuertemente con el concepto de aislamiento. El aislamiento es una característica fundamental de Docker y de la tecnología de contenedores en general. A continuación, se explica cómo Docker proporciona aislamiento y cuáles son los beneficios de este enfoque:*

### ***Cómo Docker Proporciona Aislamiento***

1. **Namespaces:**

   - *Los namespaces en Linux son una característica que Docker utiliza para proporcionar aislamiento a nivel del sistema operativo. Cada contenedor tiene su propio conjunto de namespaces, lo que significa que cada contenedor tiene su propia vista aislada del sistema operativo.*

   - **Tipos de Namespaces:**

     - **PID Namespace:** *Aisla los IDs de procesos para que los procesos en un contenedor no puedan ver o interferir con los procesos en otros contenedores o en el host.*

     - **Network Namespace:** *Aisla los recursos de red, como interfaces de red, direcciones IP, y puertos, proporcionando una pila de red independiente para cada contenedor.*

     - **Mount Namespace:** *Aisla los puntos de montaje y sistemas de ficheros, permitiendo que cada contenedor tenga su propio sistema de ficheros.*

     - **UTS Namespace:** *Aisla los nombres de host y los dominios, permitiendo que los contenedores tengan nombres de host diferentes.*

     - **IPC Namespace:** *Aisla los recursos de comunicación inter-proceso (IPC), como colas de mensajes y semáforos.*

     - **User Namespace:** *Aisla los IDs de usuario y grupo, permitiendo que los contenedores tengan sus propios IDs de usuario.*

2. **Control Groups (cgroups):**

   - *Los cgroups son otra característica del kernel de Linux que Docker utiliza para limitar y monitorear los recursos (CPU, memoria, E/S de disco, red) que un contenedor puede usar.*

   - *Esto asegura que cada contenedor tenga garantizados ciertos recursos y evita que un contenedor consuma todos los recursos del host, afectando a otros contenedores.*

3. **Union File Systems (UnionFS):**

   - *Docker utiliza sistemas de ficheros en unión (como OverlayFS) para crear imágenes de contenedor ligeras y rápidas. Esto permite que los contenedores compartan capas comunes sin duplicar datos, al tiempo que proporciona aislamiento a nivel del sistema de ficheros.*

### ***Beneficios del Aislamiento en Docker***

1. **Seguridad:**

   - *El aislamiento ayuda a mantener la seguridad al asegurar que los contenedores no puedan interferir o acceder a los recursos de otros contenedores o del sistema host. Esto limita el impacto de cualquier vulnerabilidad o fallo en un contenedor.*

2. **Consistencia:**

   - *Cada contenedor incluye todo lo necesario para ejecutar la aplicación (código, dependencias, bibliotecas, configuraciones), lo que garantiza que la aplicación se ejecutará de la misma manera en cualquier entorno.*

3. **Facilidad de Gestión y Despliegue:**

   - *Los contenedores se pueden gestionar y desplegar de manera más sencilla gracias al aislamiento, ya que cada contenedor es independiente y autónomo.*

4. **Escalabilidad:**

   - *El aislamiento facilita la escalabilidad horizontal, permitiendo ejecutar múltiples instancias de una aplicación en contenedores separados sin que interfieran entre sí.*

5. **Desarrollo y Pruebas:**

   - *Los entornos de desarrollo y pruebas pueden replicar con precisión el entorno de producción, reduciendo los problemas que pueden surgir al trasladar aplicaciones de un entorno a otro.*

### ***Ejemplo Práctico***

- *Considera una aplicación web que consiste en un servidor web, una base de datos y un sistema de caché. Con Docker, podrías ejecutar cada componente en un contenedor separado:*

- **Servidor Web:** *Ejecutándose en su propio contenedor, aislado del contenedor de la base de datos.*

- **Base de Datos:** *Ejecutándose en su propio contenedor, con sus propios recursos y configuraciones de red.*

- **Sistema de Caché:** *Ejecutándose en otro contenedor, aislado tanto del servidor web como de la base de datos.*

- *Cada uno de estos contenedores puede ser desarrollado, desplegado, escalado y administrado de manera independiente, sin interferencias entre ellos.*

- *Docker utiliza tecnologías de namespaces y cgroups para proporcionar un fuerte aislamiento entre contenedores, lo que ofrece importantes beneficios en términos de seguridad, consistencia, facilidad de gestión, escalabilidad y eficiencia en el desarrollo y despliegue de aplicaciones. Este aislamiento es una de las razones clave por las cuales Docker ha transformado la manera en que se desarrollan, despliegan y gestionan las aplicaciones modernas.*

### ***Conclusión***

- *Docker no es una máquina virtual porque opera a nivel del sistema operativo compartiendo el mismo kernel del host, mientras que las VMs incluyen un sistema operativo completo y se ejecutan sobre un hipervisor. Esta diferencia fundamental hace que los contenedores Docker sean más ligeros, rápidos y portables en comparación con las VMs, aunque ambos tienen sus propios casos de uso y ventajas dependiendo del contexto.*
