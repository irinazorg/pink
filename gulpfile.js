"use strict";

var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
// var csso = require('gulp-csso');
// var imagemin = require("gulp-imagemin");
var svgstore = require('gulp-svgstore');
// var rename = require("gulp-rename");

gulp.task('less', function(){ // Создаем таск Less
    gulp.src('app/less/**/*.less') // Берем источник
        .pipe(less()) // Преобразуем Less в CSS посредством gulp-sass
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'IE 11', 'Firefox ESR'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        // .pipe(csso())
        // .pipe(rename("style.min.css"))
        // .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('svgstore', function () {
    return gulp
        .src('app/img/svg-sprite/*.svg')
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest('app/img'));
});

// gulp.task("images", function() {
//   return gulp.src("img/**/*.{png,jpg,svg}")
//     .pipe(imagemin([
//         imagemin.optipng({optimizationLevel: 3}),
//         imagemin.jpegtran({progressive: true}),
//         imagemin.svgo()
//     ]))
//     .pipe(gulp.dest("app/img"));
// });

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('watch', function() {

    browserSync.init({
        server: "app"
    });

    gulp.watch('app/less/**/*.less', ['less']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});