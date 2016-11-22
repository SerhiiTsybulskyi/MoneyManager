var gulp = require('gulp');
var shell = require('gulp-shell');
var clean = require('gulp-clean');
var htmlreplace = require('gulp-html-replace');
var runSequence = require('run-sequence');
var Builder = require('systemjs-builder');
var builder = new Builder('', 'systemjs.config.js');

var bundleHash = new Date().getTime();
var mainBundleName = bundleHash + '.main.bundle.js';
var vendorBundleName = bundleHash + '.vendor.bundle.js';

// This is main task for production use
gulp.task('dist', function(done) {
    runSequence('clean', 'compile_ts', 'bundle', 'copy_assets', 'copy_favicon', function() {
        done();
    });
});

gulp.task('bundle', ['bundle:vendor', 'bundle:app'], function () {
    return gulp.src('index.html')
        .pipe(htmlreplace({
            'app': mainBundleName,
            'vendor': vendorBundleName
        }))
        .pipe(gulp.dest('../resources/static'));
});

gulp.task('bundle:vendor', function () {
    return builder
        .buildStatic('app/vendor.js', '../resources/static/' + vendorBundleName)
        .catch(function (err) {
            console.log('Vendor bundle error');
            console.log(err);
        });
});

gulp.task('bundle:app', function () {
    return builder
        .buildStatic('app/main.js', '../resources/static/' + mainBundleName)
        .catch(function (err) {
            console.log('App bundle error');
            console.log(err);
        });
});

gulp.task('compile_ts', ['clean:ts'], shell.task([
    'tsc'
]));

gulp.task('copy_assets', function() {
     return gulp.src(['./assets/**/*'], {base:"."})
        .pipe(gulp.dest('../resources/static/'));
});

gulp.task('copy_favicon', function() {
    return gulp.src('favicon.ico')
        .pipe(gulp.dest('../resources/static'));
});

gulp.task('clean', ['clean:ts', 'clean:dist']);

gulp.task('clean:dist', function () {
    return gulp.src(['../resources/static'], {read: false})
        .pipe(clean({force: true}));
});

gulp.task('clean:ts', function () {
    return gulp.src(['./app/**/*.js', './app/**/*.js.map'], {read: false})
        .pipe(clean({force: true}));
});