const gulp = require("gulp"),
  sass = require("gulp-sass")(require("sass")),
  autoprefixer = require("gulp-autoprefixer"),
  sourcemaps = require("gulp-sourcemaps");

var paths = {
  sass: {
    src: "assets/sass/*.scss",
    // src: "assets/sass/index.scss",
    dest: "assets/styles",
  }
};


function SCSS() {
  return gulp
    .src(paths.sass.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.sass.dest));
}


function watch() {
  gulp.watch(paths.sass.src, SCSS);
}

let build = gulp.series(gulp.parallel(SCSS));

exports.SCSS = SCSS;
exports.watch = watch;
exports.build = build;

exports.default = build;
