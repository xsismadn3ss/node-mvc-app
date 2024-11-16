# Gestor de productos con Node JS
**Realizado por:** Carlos Abraham Artiga Arana

Este proyecto es una practica del patrón de diseño MVC usando Node Js como backend. A lo largo de este proyecto aprendí a como utilizar mejor los controladores.

### Tecnología utilizadas
 - **Express js**: framework javascript ligero para backend.
 - **Node js**: javascript de lado del servidor.
 - **Pug**: motor de renderizado de plantillas.
 - **Sequelize**: ORM.
 - **Nodemon**: paquete para soportar hot reload en node.
 - **Mysql2**: gestor de base de datos my sql.
 

## Instrucciones
Ejecuta ``npm install`` para instalar todas las dependencias necesarias que se encuentran en el ``package.json``.

En el proyecto se encuentran dos archivos ejemplo:
 * ``.example.env``
 * ``example.config.json``

En un archivo ``.env`` se deben poner las variables de entorno especificadas.

Se debe ejecutar ``sequelize init`` para activar el ORM y que cree un archivo ``config.json`` en este archivo se deben poner las configuracions de la base datos