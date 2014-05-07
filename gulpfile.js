'use strict';

var gulp = require('gulp');

// Load plugins
var $ = require('gulp-load-plugins')();


// Styles
gulp.task('styles', function () {
    return gulp.src(['app/styles/*.scss'])
        .pipe($.rubySass({
            style: 'expanded',
            sourcemap: 'true',
            loadPath: ['app/bower_components']
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe($.concat('main.css'))
        .pipe(gulp.dest('dist/styles'))
        .pipe($.size())
        .pipe($.connect.reload());
});

// Scripts
gulp.task('jsx', function () {
    return gulp.src('app/scripts/app.js')
        .pipe($.browserify({
            insertGlobals: true,
            transform: ['reactify']
        }))
        // .pipe($.jshint('.jshintrc'))
        // .pipe($.jshint.reporter('default'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe($.size())
        .pipe($.connect.reload());
    });

gulp.task('scripts', function () {
    return gulp.src(['app/scripts/*.js','!app/scripts/app.js'])
        .pipe($.concat('other.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe($.size())
        .pipe($.connect.reload());
    });

// HTML
gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe($.useref.assets())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size())
        .pipe($.connect.reload());
});

// Images
gulp.task('images', function () {
    return gulp.src('app/images/*.png')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size())
        .pipe($.connect.reload());
});

//other
gulp.task('other', function() {
    return gulp.src(['app/*','!app/index.html'])
        .pipe(gulp.dest('./dist'));
});

// Clean
gulp.task('clean', function () {
    return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false}).pipe($.clean());
});

// Build
gulp.task('build', ['images','other','styles','scripts','jsx','bower','json','html']);

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

// Connect
gulp.task('connect', function() {
  $.connect.server({
    root: ['dist'],
    port: 9000,
    livereload: true
  });
});

// Bower helper
gulp.task('bower', function() {
    gulp.src(['app/bower_components/**/*.js',
        'app/bower_components/**/*.css',
        'app/bower_components/**/*.ttf',
        'app/bower_components/**/*.woff',
        'app/bower_components/**/*.svg',
        'app/bower_components/**/*.eot'
        ], {base: 'app/bower_components'})
        .pipe(gulp.dest('dist/bower_components/'));

});

gulp.task('json', function() {
    gulp.src('app/scripts/json/**/*.json', {base: 'app/scripts'})
        .pipe(gulp.dest('dist/scripts/'));
});


// Watch
gulp.task('watch', ['html','connect'], function () {

    // Watch .json files
    gulp.watch('app/scripts/**/*.json', ['json']);

    // Watch .html files
    gulp.watch('app/*.html', ['html']);

    // Watch .scss files
    gulp.watch('app/styles/**/*.scss', ['styles']);

    // Watch .jsx files
    // gulp.watch('app/scripts/**/*.jsx', ['jsx', 'scripts']);

    // Watch .js files
    gulp.watch('app/scripts/**/*.js', ['jsx','scripts']);

    // Watch image files
    gulp.watch('app/images/**/*', ['images']);

});
