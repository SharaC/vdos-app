
# VDos app v1.0

Prototipo de una aplicación web de streaming, tipo mini-youtube.
En este repositorio se encuentra el código de los proyectos tanto para el Frontend como para el Backend de la aplicación.

*Para ver el funcionamiento de esta aplicación puedes visitar el sitio publicado en mi perfil mediante Github pages:
## https://sharac.github.io/vdos-app-front/
Requisitos para desplegar en ambientes locales:

**Backend:**
1.  Contar con una conexión a una base de datos MongoDB
2.  Contar con Nodejs (versión utilizada: v14.17.6)
3.  Ubicado en el directorio **./backend/src** abra una terminal y ejecute el comando: `npm install`
4.  En las variables de ambiente debe configurar la variable **mongoURI**=<cadena de conexión a su base de datos>
5.  Para ejecutar el servidor Nodejs con la app corriendo, debe ejecutar el comando: `npm run start`

**NOTAS**:  
  **-** Puede probar los endpoints expuestos a través de peticiones por postman, ya que el backend está diseñado como una API/Rest que no depende directamente del front que lo consume.
  **-** El Backend consumido desde el front expuesto en githubpages, se desplegó con los servicios gratuitos de Heroku y MongoDB Atlas.
    (https://vdos-app-bootcamp.herokuapp.com)
 **-** La base de datos publicada se pobló con varios datos iniciales, por lo que cualquier endpoint puede ser probado sin problema.



**Frontend:**  
7. Levantar un servidor web local para acceder a los recursos del Frontend, se recomienda utilizar la extensión de Live Server en el editor Visual Studio Code. El archivo principal que debe abrir en el navegador es ./front/index.html . Si estás usando el liveserver por el puerto 5500, entonces ingresa en el navegador: [http://127.0.0.1:5500/index.html](http://127.0.0.1:5500/Frontend/html/login.html) y deberías ver el buscador de inicio de la aplicación.
8. En el archivo ./scripts/index.js se debe editar la variable **URL_VDOS**=<URL del basepath expuesto para consumo del back.
(Por ejemplo: URL_VDOS = "https://vdos-app-bootcamp.herokuapp.com" o URL_VDOS = "http://localhost:3000", de acuerdo a donde tenga desplegado el servicio del backend)
9. El frontend publicado en github pages se encuentra conectado a una base de datos poblada con suficientes videos para probar todas las funcionalidades:
- Búsqueda de vídeos por coincidencias de autor o titulo del video
- Resultado dinámico de la consulta con vistas miniatura de cada video (la imagen de miniatura correspondiente la sube el usuario que carga el video)
- Reproducción en línea del video seleccionado
- Opción para descargar el video seleccionado
- Opción para aumentar el número de likes de un video
- Sección de visualización dinámica de los últimos videos subidos al sitio
- Opción para subir nuevos videos al sitio
*Para ver el funcionamiento de esta aplicación puedes visitar el sitio publicado en mi perfil mediante Github pages:
## https://sharac.github.io/vdos-app-front/
