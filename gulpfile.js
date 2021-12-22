const {  src,  dest,  series,  parallel,  watch } = require("gulp");
const browserSync = require("browser-sync").create();
const del = require("del");
const fileinclude = require("gulp-file-include");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const uglify = require('gulp-uglify');
const rename = require("gulp-rename");
const glob = require('glob')
const webpack = require('webpack-stream');
const path = require('path');

const filesPath = "app";
const distPath = "dist";

function server() {
  browserSync.init({
    server: distPath
  });

  watch(filesPath + "/**/*.html").on("change", html);
  watch(filesPath + "/**/*.scss").on("change", css);
  watch(filesPath + "/**/*.js").on("change", js);
  watch(filesPath + "/**/*.{woff, woff2, ttf}").on("change", fonts);
  watch(filesPath + "/**/*.{jpg, png, svg, webp}").on("change", img);
}

function html() {
  return src(filesPath + "/html/*.html")
    .pipe(fileinclude({ prefix: "@@", basepath: "app/component/" }))
    .pipe(dest(distPath))
    .pipe(browserSync.stream());
}

function css() {
  return src(filesPath + "/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(dest(distPath + "/css"))
    .pipe(browserSync.stream());
}

function js() {
  return src(filesPath + "/js/**/*.js")
    .pipe(dest(distPath + "/js"))
    .pipe(browserSync.stream());
}

function fonts() {
  return src(filesPath + "/fonts/**/*")
    .pipe(dest(distPath + "/fonts"))
    .pipe(browserSync.stream());
}

function img() {
  return src(filesPath + "/img/**/*")
    .pipe(dest(distPath + "/img"))
    .pipe(browserSync.stream());
}


function bundle(){
  return glob(filesPath + "/js/*.js", function (er, files) {
    files.forEach((file, index) => {
        const name = file.split('/').pop().split('.')[0];

        return src(file)
          .pipe(
            webpack({
              mode: 'production',
              module: {
                rules: [
                  {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: ['@babel/preset-env'],
                      }
                    }
                  }
                ]
              },
              output: {
                filename: name + '.bundle.js',
              }
            })
          )
          .pipe(dest(distPath + "/js"));
    })
  })
}

function clear() {
  return del([distPath + "/**/*"]);
}

exports.default = server;
exports.dist = series(clear, html, css, js, bundle, fonts, img);
