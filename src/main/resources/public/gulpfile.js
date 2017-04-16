/********************************
 *     gulp dependencies
 *******************************/

var gulp = require('gulp');
var install = require('gulp-install');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var iife = require('gulp-iife');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var ngTemplates = require('gulp-ng-templates');
var versionAppend = require('gulp-version-append');
var htmlMin = require('gulp-htmlmin');
var gulpCopy = require('gulp-copy');
var angularFilesort = require('gulp-angular-filesort');
var browserSync = require('browser-sync');
var jeditor = require("gulp-json-editor");
var dateFormat = require('dateformat');
var reload = browserSync.reload;

/********************************
 *          utilities
 *******************************/

var config = require('./gulp.config.json');

var MODULE_JS_FILES = mapToValues(config.sourcePaths.module.js)
    .filter(function (moduleFilePattern) {
        return typeof moduleFilePattern !== 'object';
    });

var PATHS = {
    module_dev: MODULE_JS_FILES.concat(mapToValues(config.sourcePaths.module.js.dev)),
    module_prod: MODULE_JS_FILES.concat(mapToValues(config.sourcePaths.module.js.prod))
};

var BUILD_PATHS = {
    dev: concatModuleFiles(PATHS.module_dev),
    prod: concatModuleFiles(PATHS.module_prod),
    views: concatModuleFiles([config.sourcePaths.module.views]),
    templates: [config.distPaths.templates.path + '/' + config.distPaths.templates.name],
    css: [config.distPaths.css.path + '/' + config.distPaths.css.name]
};

/********************************
 *     tasks configuration
 *******************************/

var TASKS = {
    INSTALL: 'install',
    LINT: 'lint',
    BUILD_CSS: 'build_css',
    CACHE_TEMPLATES: 'cache_templates',
    BUILD_JQUERY: 'build_jquery',
    BUILD_LIB_JS: 'build_lib_js',
    BUILD_LIB_CSS: 'build_lib_css',
    BUILD_VENDOR_JS: 'build_vendor_js',
    BUILD_VENDOR_CSS: 'build_vendor_css',
    BUILD_VENDOR_FONTS: 'build_vendor_fonts',
    BUILD_ANGULAR: 'build_angular',
    BUILD_ANGULAR_PRODUCTION: 'build_angular_production',
    BUILD_DEV: 'build_dev',
    BUILD_PRODUCTION: 'build_production',
    WATCH: 'watch',
    SYNC: 'sync',
    DEV_DISTRIBUTE: 'dev_distribute',
    DISTRIBUTE: 'distribute'
};

gulp.task(TASKS.INSTALL, function () {
    gulp.src([config.sourcePaths.package])
        .pipe(install());
});

gulp.task(TASKS.LINT, function () {
    var jshintrcFile = '.jshintrc';

    return gulp.src(BUILD_PATHS.dev.concat(BUILD_PATHS.prod))
        .pipe(jshint(jshintrcFile))
        .pipe(jshint.reporter(jshintStylish))
});

gulp.task(TASKS.BUILD_CSS, function () {
    console.log("=========  caching source css  =========");

    return gulp.src(config.sourcePaths.css)
        .pipe(minifyCss())
        .pipe(rename({
            suffix: '.min',
            extname: '.css'
        }))
        .pipe(concat(config.distPaths.css.name))
        .pipe(gulp.dest(config.distPaths.css.path));
});

gulp.task(TASKS.CACHE_TEMPLATES, function () {
    console.log("=========  caching templates  =========");

    var ngTemplateOptions = {
        standalone: true,
        module: 'microTag.templates',
        path: function (path, base) {
            var baseParts = base.split('\\');
            baseParts.pop();
            baseParts.pop();
            baseParts.pop();
            return config.sourcePaths.modules + '\\' + path.replace(baseParts.join('\\'), '');
        }
    };

    return gulp.src(BUILD_PATHS.views)
        .pipe(htmlMin({collapseWhitespace: true}))
        .pipe(ngTemplates(ngTemplateOptions))
        .pipe(concat(config.distPaths.templates.name))
        .pipe(gulp.dest(config.distPaths.templates.path));
});

gulp.task(TASKS.BUILD_JQUERY, function () {
    console.log("=========  building jquery  =========");

    return gulp.src(config.sourcePaths.jquery.js)
        .pipe(concat(config.distPaths.jquery.js.name))
        .pipe(gulp.dest(config.distPaths.jquery.js.path));
});

gulp.task(TASKS.BUILD_LIB_JS, function () {
    console.log("=========  building lib javascript  =========");

    return gulp.src(config.sourcePaths.lib.js)
        .pipe(concat(config.distPaths.lib.js.name))
        .pipe(gulp.dest(config.distPaths.lib.js.path));
});

gulp.task(TASKS.BUILD_LIB_CSS, function () {
    console.log("=========  building lib css  =========");

    return gulp.src(config.sourcePaths.lib.css)
        .pipe(concat(config.distPaths.lib.css.name))
        .pipe(gulp.dest(config.distPaths.lib.css.path));
});

gulp.task(TASKS.BUILD_VENDOR_JS, function () {
    console.log("=========  building vendor javascript  =========");

    return gulp.src(config.sourcePaths.vendor.js)
        .pipe(concat(config.distPaths.vendor.js.name))
        .pipe(gulp.dest(config.distPaths.vendor.js.path));
});

gulp.task(TASKS.BUILD_VENDOR_CSS, function () {
    console.log("=========  building vendor css  =========");

    return gulp.src(config.sourcePaths.vendor.css)
        .pipe(concat(config.distPaths.vendor.css.name))
        .pipe(gulp.dest(config.distPaths.vendor.css.path));
});

gulp.task(TASKS.BUILD_VENDOR_FONTS, function () {
    console.log("=========  building vendor fonts  =========");

    return gulp.src(config.sourcePaths.vendor.fonts)
        .pipe(gulpCopy(config.distPaths.vendor.fonts.path, {
            prefix: 5
        }));
});

gulp.task(TASKS.BUILD_ANGULAR, function () {
    return gulp.src(config.sourcePaths.angular)
        .pipe(angularFilesort())
        .pipe(concat(config.distPaths.vendor.angular.name))
        .pipe(gulp.dest(config.distPaths.vendor.angular.path))
});

gulp.task(TASKS.BUILD_ANGULAR_PRODUCTION, function () {
    return gulp.src(config.sourcePaths.angularMin)
        .pipe(rename(function (path) {
            path.basename = path.basename.replace('.min', '');
        }))
        .pipe(angularFilesort())
        .pipe(concat(config.distPaths.vendor.angular.name))
        .pipe(gulp.dest(config.distPaths.vendor.angular.path));
});

gulp.task(TASKS.BUILD_DEV, function () {
    console.log("=========  building development distribution  =========");

    return buildModule(BUILD_PATHS.dev.concat(BUILD_PATHS.templates));
});

gulp.task(TASKS.BUILD_PRODUCTION, function () {
    console.log("=========  building production distribution  =========");

    return buildModule(BUILD_PATHS.prod.concat(BUILD_PATHS.templates));
});

function buildModule(srcFiles) {
    console.log("=========  building module  =========");

    return gulp.src(srcFiles)
        .pipe(angularFilesort())
        .pipe(iife())
        .pipe(versionAppend(['html', 'js', 'css']))
        .pipe(concat(config.distPaths.module.name))
        .pipe(gulp.dest(config.distPaths.module.path))
        .pipe(reload({stream: true}));
}

gulp.task(TASKS.WATCH, function () {
    console.log("=========  watching files  =========");

    var wacthedFiles = [].concat(BUILD_PATHS.dev, BUILD_PATHS.prod, BUILD_PATHS.views,
        config.sourcePaths.css, config.sourcePaths.html, config.sourcePaths.gulpFile,
        config.sourcePaths.lib.js, config.sourcePaths.lib.css, config.sourcePaths.vendor.js,
        config.sourcePaths.vendor.css, config.sourcePaths.vendor.fonts);

    return gulp.watch(wacthedFiles,
        gulp.series(
            TASKS.LINT,
            TASKS.BUILD_CSS,
            TASKS.CACHE_TEMPLATES,
            TASKS.BUILD_JQUERY,
            TASKS.BUILD_LIB_JS,
            TASKS.BUILD_LIB_CSS,
            TASKS.BUILD_VENDOR_JS,
            TASKS.BUILD_VENDOR_CSS,
            TASKS.BUILD_VENDOR_FONTS,
            TASKS.BUILD_ANGULAR,
            TASKS.BUILD_DEV
        )
    ).on('change', function (path, stats) {
        console.info("file has changed at: \"" + path + "\"");
        return path;
    })
});

gulp.task(TASKS.SYNC, function () {
    console.log("=========  initiating browser sync  =========");

    return browserSync({
        server: {
            baseDir: config.root.path,
            notify: false
        }
    });
});

/********************************
 *  development distribution
 *******************************/

gulp.task(TASKS.DEV_DISTRIBUTE, gulp.series
    (
        TASKS.BUILD_CSS,
        TASKS.CACHE_TEMPLATES,
        TASKS.BUILD_JQUERY,
        TASKS.BUILD_LIB_JS,
        TASKS.BUILD_LIB_CSS,
        TASKS.BUILD_VENDOR_JS,
        TASKS.BUILD_VENDOR_CSS,
        TASKS.BUILD_VENDOR_FONTS,
        TASKS.BUILD_ANGULAR,
        TASKS.BUILD_DEV,
        gulp.parallel(TASKS.SYNC, TASKS.WATCH)
    )
);

/********************************
 *  production distribution
 *******************************/

gulp.task(TASKS.DISTRIBUTE, gulp.series
    (
        TASKS.CACHE_TEMPLATES,
        TASKS.BUILD_CSS,
        TASKS.BUILD_LIB_JS,
        TASKS.BUILD_LIB_JS,
        TASKS.BUILD_VENDOR_JS,
        TASKS.BUILD_VENDOR_CSS,
        TASKS.BUILD_VENDOR_FONTS,
        TASKS.BUILD_ANGULAR_PRODUCTION,
        TASKS.BUILD_PRODUCTION
    )
);

/********************************
 *          utilities
 *******************************/

function mapToValues(obj) {
    return Object.keys(obj).map(function (prop) {
        return obj[prop];
    });
}

function concatModuleFiles(files) {
    return flattenArray(config.modules.map(function (module) {
        return files.map(function (file) {
            return fixFilePath(module, file);
        });
    }));
}

function flattenArray(array) {
    return array.reduce(function (a, b) {
        return a.concat(b);
    });
}

function fixFilePath(module, file) {
    return config.sourcePaths.modules + '/' + module + '/' + file;
}
