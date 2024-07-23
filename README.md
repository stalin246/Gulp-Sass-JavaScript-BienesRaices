
# Bienes Raices

## Descripción
Este es un proyecto de ejemplo para una página de bienes raíces. La estructura del proyecto está organizada utilizando SCSS para los estilos, Gulp para la automatización de tareas y Node.js para la gestión de dependencias.

## Estructura del Proyecto
```
BIENESRAICES_V2/
│
├── build/
│   ├── css/
│   ├── img/
│   └── js/
│
├── node_modules/
│
├── src/
│   ├── img/
│   ├── js/
│   │   ├── app.js
│   │   └── modernizr.js
│   └── scss/
│       ├── base/
│       │   ├── _botones.scss
│       │   ├── _darkMode.scss
│       │   ├── _globales.scss
│       │   ├── _mixins.scss
│       │   ├── _normalize.scss
│       │   ├── _utilidades.scss
│       │   └── _variables.scss
│       ├── internas/
│       │   └── _nosotros.scss
│       ├── layout/
│       │   ├── _anuncios.scss
│       │   ├── _contactar.scss
│       │   ├── _footer.scss
│       │   ├── _formularios.scss
│       │   ├── _header.scss
│       │   ├── _iconos.scss
│       │   ├── _inferior.scss
│       │   ├── _navegacion.scss
│       │   └── _testimoniales.scss
│       └── app.scss
│
├── anuncio.html
├── anuncios.html
├── blog.html
├── contacto.html
├── copy.html
├── entrada.html
├── gulpfile.js
├── index.html
├── nosotros.html
├── package-lock.json
└── package.json
```

## Instalación
Para instalar y ejecutar este proyecto, sigue los siguientes pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu_usuario/real-estate-hub.git
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd real-estate-hub
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Ejecuta Gulp para compilar los archivos SCSS, minificar el JavaScript y optimizar las imágenes:
   ```bash
   npx gulp
   ```

## Uso
Después de instalar las dependencias y ejecutar Gulp, los archivos compilados se encontrarán en el directorio `build`. Abre el archivo `index.html` en tu navegador para ver la página principal del proyecto.

### Funcionalidades

#### JavaScript para Navegación Responsive y Modo Oscuro

- **app.js**
  ```javascript
  // Archivo app.js: JavaScript para la funcionalidad del menú de navegación responsive y modo oscuro

  // Espera a que el contenido del DOM esté completamente cargado
  document.addEventListener("DOMContentLoaded", function() {
      eventListeners(); // Llama a la función que inicializa los event listeners
      darkMode(); // Llama a la función que inicializa el modo oscuro
  });

  // Función para inicializar el modo oscuro
  function darkMode() {
      const prefiereDarkMode = window.matchMedia("(prefers-color-scheme: dark)"); // Verifica si el usuario prefiere el modo oscuro

      // Aplica el modo oscuro si es la preferencia del usuario
      if(prefiereDarkMode.matches){
          document.body.classList.add("dark-mode");
      } else {
          document.body.classList.remove("dark-mode");
      }

      // Escucha cambios en las preferencias del usuario
      prefiereDarkMode.addEventListener("change", function() {
          if(prefiereDarkMode.matches){
              document.body.classList.add("dark-mode");
          } else {
              document.body.classList.remove("dark-mode");
          }
      });

      const botonDarkMode = document.querySelector(".dark-mode-boton"); // Selecciona el botón para activar el modo oscuro

      // Agrega un event listener para el click en el botón de modo oscuro
      botonDarkMode.addEventListener("click", function() {
          document.body.classList.toggle("dark-mode"); // Alterna la clase 'dark-mode' en el body
      });
  }

  // Función para inicializar los event listeners
  function eventListeners() {
      const mobileMenu = document.querySelector(".mobile-menu"); // Selecciona el elemento del menú móvil

      // Agrega un event listener para el click en el menú móvil
      mobileMenu.addEventListener("click", navegacionResponsive);
  }

  // Función para manejar la navegación responsive
  function navegacionResponsive() {
      const navegacion = document.querySelector(".navegacion"); // Selecciona el elemento de navegación

      // Verifica si la navegación tiene la clase 'mostrar'
      if (navegacion.classList.contains("mostrar")) {
          navegacion.classList.remove("mostrar"); // Si tiene la clase, la elimina
      } else {
          navegacion.classList.add("mostrar"); // Si no tiene la clase, la agrega
      }

      // Alternativa para agregar y quitar la clase utilizando toggle:
      // navegacion.classList.toggle("mostrar");
  }
  ```

#### SCSS para Modo Oscuro

- **_darkMode.scss**
  ```scss
  // Archivo _darkMode.scss: Estilos específicos para el modo oscuro del proyecto de Bienes Raíces

  .dark-mode {
      background-color: darken($grisOscuro, 10); // Oscurece el color de fondo gris oscuro

      p {
          color: $blanco; // Cambia el color del texto de los párrafos a blanco
      }

      a, h1, h2, h3, h4 {
          color: $gris; // Cambia el color de los enlaces y encabezados a gris
      }

      .anuncio,
      .resumen-propiedad {
          background-color: $grisOscuro; // Cambia el color de fondo de los anuncios y resumen de propiedad a gris oscuro
          border: 1px solid $grisOscuro; // Establece un borde sólido de color gris oscuro

          .precio {
              color: $verde; // Cambia el color del precio a verde
          }

          .icono {
              filter: invert(100%); // Invierte los colores de los iconos
          }
      }

      .texto-nosotros blockquote {
          color: $blanco; // Cambia el color de las citas en la sección "Nosotros" a blanco
      }

      .formulario {
          label,
          legend,
          p {
              color: $gris; // Cambia el color de los labels, legendas y párrafos a gris
          }

          input:not([type="submit"]),
          select,
          textarea {
              background-color: $grisOscuro; // Cambia el color de fondo de los inputs, selects y textareas a gris oscuro
              border: 1px solid $grisOscuro; // Establece un borde sólido de color gris oscuro
              color: $blanco; // Cambia el color del texto de los inputs, selects y textareas a blanco
          }
      }
  }
  ```

## Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cualquier cambio que te gustaría realizar.

## Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
