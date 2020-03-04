"use strict";

const {
  series,
  src,
  dest
} = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cssmin = require("gulp-cssmin");

function compile() {
  return src("./assets/css/main.css")
    .pipe(sass.sync())
    .pipe(
      autoprefixer({
        browsers: ["ie > 9", "last 2 versions"],
        cascade: false
      })
    )
    .pipe(cssmin())
    .pipe(dest("./dist"));
}

function copyfont() {
  return src("./assets/fonts/**")
    .pipe(cssmin())
    .pipe(dest("./dist/fonts"));
}

exports.build = series(compile, copyfont);
