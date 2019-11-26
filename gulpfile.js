const gulp            = require('gulp');
const sass            = require('gulp-sass');
const sourcemaps      = require('gulp-sourcemaps');
const autoprefixer    = require('gulp-autoprefixer');
const pug             = require('gulp-pug');
const connect         = require('gulp-connect');

const src = {
  pug: "src/*.pug",
  sass: "src/sass/",
  js: "src/js/",
};
const dest = {
  html: "docs/",
  css: "docs/css",
  js: "docs/js",
};

function css(cb) {
  gulp
    .src(src.sass + 'main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest.css))
    .pipe(connect.reload());
  cb();
};

function html(cb) {
  gulp
    .src(src.pug)
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(dest.html))
    .pipe(connect.reload());
  cb();
};

function js(cb) {
  gulp
    .src(src.js + 'main.js')
    .pipe(gulp.dest(dest.js))
    .pipe(connect.reload());
  cb();
};

function webServer(cb) {
  connect.server({
    root: 'docs',
    livereload: true
  });
  cb();
};

gulp.task('watch', () => {
  gulp.watch(src.pug, html);
  gulp.watch(src.js, js);
  gulp.watch(src.sass + '**/*.scss', css);
});

gulp.task('default', gulp.series([css, html, js, webServer, 'watch']));
