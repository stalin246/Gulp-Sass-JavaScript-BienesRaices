// Importación de módulos necesarios para las tareas de Gulp
const { src, dest, watch, series, parallel } = require('gulp'); // Funciones de Gulp para la creación de tareas
const sass = require('gulp-sass')(require('sass')); // Compila archivos SCSS a CSS usando Sass
const autoprefixer = require('autoprefixer'); // Añade prefijos de CSS automáticamente para compatibilidad entre navegadores
const postcss = require('gulp-postcss'); // Procesa CSS con varios plugins
const sourcemaps = require('gulp-sourcemaps'); // Genera sourcemaps para un mejor debugging
const cssnano = require('cssnano'); // Minifica el CSS para optimizar el tamaño del archivo
const concat = require('gulp-concat'); // Concatena múltiples archivos en uno solo
const terser = require('gulp-terser-js'); // Minifica el JavaScript
const rename = require('gulp-rename'); // Renombra archivos
const imagemin = require('gulp-imagemin'); // Minifica las imágenes
const notify = require('gulp-notify'); // Envía notificaciones del sistema
const cache = require('gulp-cache'); // Cachea tareas para evitar procesamiento innecesario
const clean = require('gulp-clean'); // Limpia archivos/carpetas
const webp = require('gulp-webp'); // Convierte imágenes a formato WebP

// Rutas de los archivos de origen
const paths = {
    scss: 'src/scss/**/*.scss', // Ruta de archivos SCSS
    js: 'src/js/**/*.js', // Ruta de archivos JavaScript
    imagenes: 'src/img/**/*' // Ruta de archivos de imágenes
}

// Función para compilar SCSS a CSS, añadir prefijos y generar sourcemaps
function css() {
    return src(paths.scss) // Fuente de los archivos SCSS
        .pipe(sourcemaps.init()) // Inicializa la generación de sourcemaps
        .pipe(sass()) // Compila SCSS a CSS
        .pipe(postcss([autoprefixer(), cssnano()])) // Añade prefijos y minifica el CSS
        .pipe(sourcemaps.write('.')) // Escribe los sourcemaps en un archivo separado
        .pipe(dest('build/css')); // Destino de los archivos CSS generados
}

// Función para concatenar y minificar archivos JavaScript y generar sourcemaps
function javascript() {
    return src(paths.js) // Fuente de los archivos JavaScript
      .pipe(sourcemaps.init()) // Inicializa la generación de sourcemaps
      .pipe(concat('bundle.js')) // Concatena todos los archivos JS en uno solo llamado bundle.js
      .pipe(terser()) // Minifica el archivo JavaScript concatenado
      .pipe(sourcemaps.write('.')) // Escribe los sourcemaps en un archivo separado
      .pipe(rename({ suffix: '.min' })) // Renombra el archivo concatenado y minificado con el sufijo .min
      .pipe(dest('./build/js')); // Destino del archivo JavaScript generado
}

// Función para optimizar y minificar imágenes
function imagenes() {
    return src(paths.imagenes) // Fuente de los archivos de imágenes
        .pipe(cache(imagemin({ optimizationLevel: 3 }))) // Minifica las imágenes y las cachea
        .pipe(dest('build/img')) // Destino de las imágenes optimizadas
        .pipe(notify('Imagen Completada' )); // Notificación de la tarea completada
}

// Función para convertir imágenes al formato WebP
function versionWebp() {
    return src(paths.imagenes) // Fuente de los archivos de imágenes
        .pipe(webp()) // Convierte las imágenes a formato WebP
        .pipe(dest('build/img')) // Destino de las imágenes en formato WebP
        .pipe(notify({ message: 'Imagen Completada' })); // Notificación de la tarea completada
}

// Función para observar cambios en archivos y ejecutar tareas correspondientes
function watchArchivos() {
    watch(paths.scss, css); // Observa cambios en archivos SCSS y ejecuta la tarea css
    watch(paths.js, javascript); // Observa cambios en archivos JS y ejecuta la tarea javascript
    watch(paths.imagenes, imagenes); // Observa cambios en imágenes y ejecuta la tarea imagenes
    watch(paths.imagenes, versionWebp); // Observa cambios en imágenes y ejecuta la tarea versionWebp
}

// Exportación de las funciones para poder ejecutarlas con Gulp
exports.css = css;
exports.watchArchivos = watchArchivos;
exports.default = parallel(css, javascript, imagenes, versionWebp, watchArchivos); // Tarea por defecto que ejecuta en paralelo las tareas definidas
