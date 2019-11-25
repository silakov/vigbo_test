const gulp            = require('gulp');
const sass            = require('gulp-sass');
const sourcemaps      = require('gulp-sourcemaps');
const autoprefixer    = require('gulp-autoprefixer');
const pug             = require('gulp-pug');


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

gulp.task('sass', () => {
  return gulp
    .src(src.sass + 'main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest.css));
});

gulp.task('pug', () => {
  return gulp
    .src(src.pug)
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(dest.html));
});

gulp.task('copy-js', () => {
  return gulp
    .src(src.js + 'main.js')
    .pipe(gulp.dest(dest.js));
});

gulp.task('default', gulp.series(['sass', 'pug', 'copy-js']));
