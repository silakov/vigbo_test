const gulp            = require('gulp');
const sass            = require('gulp-sass');
const sourcemaps      = require('gulp-sourcemaps');
const autoprefixer    = require('gulp-autoprefixer');
const pug             = require('gulp-pug');
const connect         = require('gulp-connect');

const src = {
  html: "src/",
  css: "src/sass/",
  js: "src/js/",
};
const dest = {
  html: "docs/",
  css: "docs/css",
  js: "docs/js",
};

function css(cb) {
  gulp
    .src(src.css + 'main.scss')
    // .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest.css))
    .pipe(connect.reload());
  cb();
};

function html(cb) {
  gulp
    .src(src.html + '*.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(dest.html))
    .pipe(connect.reload());
  gulp
    .src(src.html + 'favicon.ico')
    .pipe(gulp.dest(dest.html));
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
  gulp.watch(src.html, html);
  gulp.watch(src.js, js);
  gulp.watch(src.css + '**/*.scss', css);
});

gulp.task('default', gulp.series([css, html, js, webServer, 'watch']));
