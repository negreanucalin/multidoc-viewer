var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var runSequence = require('run-sequence');
var gulp = require('gulp');

var nodeModules = 'node_modules/**/*.js';
var jsFiles = 'js/**/*.js';
var distFolder = 'dist/multidoc';

var jsDest = distFolder+'/scripts';

var node_path = 'node_modules/';
var cleanCSS = require('gulp-clean-css');

gulp.task('minify-css', function() {
    return gulp.src(
        [
            'css/*.css',
            node_path+'bootstrap/dist/css/bootstrap.min.css',
            node_path+'angular-ui-bootstrap/dist/ui-bootstrap-csp.css'
        ])
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(distFolder+'/styles'))
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest(distFolder+'/styles'));
});

gulp.task('scripts', function() {
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest(jsDest));
});

gulp.task('vendor-scripts', function() {
    return gulp.src([
        node_path+'jquery/dist/jquery.min.js',
        node_path+'angular/angular.min.js',
        node_path+'angular-local-storage/dist/angular-local-storage.min.js',
        node_path+'angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
        node_path+'jsonformatter/dist/json-formatter.js',
        node_path+'angular-ui-router/release/angular-ui-router.min.js'
    ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('vendor.min.js'))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest(jsDest));
});

gulp.task('inject', function() {
    var target = gulp.src('index.php');
    var timeStamp = Math.floor(Date.now() / 1000);
    var sources = gulp.src(
        [distFolder+'/scripts/vendor.min.js', distFolder+'/scripts/scripts.min.js'], {read: false}, {starttag: '<!-- inject:js -->'}
    );
    target.pipe(inject(sources, {
            transform: function (filepath) {
                arguments[0] = filepath + '?v=' + timeStamp;
                return inject.transform.apply(inject.transform, arguments);
            }
        }
    )).pipe(gulp.dest('.'));
    var cssSources = gulp.src(
        [distFolder+'/styles/styles.min.css'], {read: false}, {starttag: '<!-- inject:css -->'}
    );
    return target.pipe(inject(cssSources, {
            transform: function (filepath) {
                arguments[0] = filepath + '?v=' + timeStamp;
                return inject.transform.apply(inject.transform, arguments);
            }
        }
    )).pipe(gulp.dest('.'));
});

gulp.task('default' ,function () {
    runSequence('scripts', 'vendor-scripts','minify-css' ,function() {
        gulp.start('inject');
    });
});