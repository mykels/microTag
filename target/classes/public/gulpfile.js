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
var runSequence = require('gulp-run-sequence');
var angularFilesort = require('gulp-angular-filesort');
var browserSync = require('browser-sync');
var jeditor = require("gulp-json-editor");
var bump = require('gulp-bump');
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

var bumpTypes = {
	MAJOR: "major",           //version when you make incompatible API changes
	MINOR: "minor",           //version when you add functionality in a backwards-compatible manner
	PATCH: "patch",           //version when you make backwards-compatible bug fixes
	PRERELEASE: "prerelease"  //a pre-release version
};

/********************************
 *     tasks configuration
 *******************************/

var TASKS = {
	INSTALL: 'install',
	LINT: 'lint',
	BUILD_CSS: 'build_css',
	CACHE_TEMPLATES: 'cache_templates',
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
	console.log("=== caching source css ===");

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
	console.log("=== caching templates ===");

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

gulp.task(TASKS.BUILD_VENDOR_JS, function () {
	console.log("=== building vendor javascript ===");

	return gulp.src(config.sourcePaths.vendor.js)
		.pipe(concat(config.distPaths.vendor.js.name))
		.pipe(gulp.dest(config.distPaths.vendor.js.path));
});

gulp.task(TASKS.BUILD_VENDOR_CSS, function () {
	console.log("=== building vendor css ===");

	return gulp.src(config.sourcePaths.vendor.css)
		.pipe(concat(config.distPaths.vendor.css.name))
		.pipe(gulp.dest(config.distPaths.vendor.css.path));
});

gulp.task(TASKS.BUILD_VENDOR_FONTS, function () {
	console.log("=== building vendor fonts ===");

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
	console.log("=== building development distribution ===");

	return buildModule(BUILD_PATHS.dev.concat(BUILD_PATHS.templates));
});

gulp.task(TASKS.BUILD_PRODUCTION, function () {
	console.log("=== building production distribution ===");

	return buildModule(BUILD_PATHS.prod.concat(BUILD_PATHS.templates), bumpTypes.PATCH);
});

function buildModule(srcFiles, bumpType) {
	console.log("=== building module ===");

	return gulp.src(srcFiles)
		.pipe(angularFilesort())
		.pipe(iife())
		.pipe(versionAppend(['html', 'js', 'css']))
		.pipe(concat(config.distPaths.module.name))
		.pipe(gulp.dest(config.distPaths.module.path))
		.pipe(reload({stream: true}))
		.pipe(handlePostBuild(bumpType));
}

function handlePostBuild(bumpType) {
	console.log("=== module is built successfully! ===");

	return typeof bumpType !== 'undefined' ? bumpVersion(bumpType) : gulp.src('');
}

function bumpVersion(bumpType) {
	console.log("=== bumping version ===");

	return gulp.src(config.sourcePaths.package)
		.pipe(bump({type: bumpType}))
		.pipe(jeditor({
			'date': dateFormat(new Date(), "mmmm dS - yyyy, H:MM")
		}))
		.pipe(gulp.dest(config.root.path));
}

gulp.task(TASKS.WATCH, function () {
	console.log("=== watching files ===");

	gulp.watch(BUILD_PATHS.dev.concat(BUILD_PATHS.prod)
			.concat(BUILD_PATHS.views)
			.concat(config.sourcePaths.css)
			.concat(config.sourcePaths.html)
			.concat(config.sourcePaths.gulpFile)
			.concat(config.sourcePaths.vendor.js)
			.concat(config.sourcePaths.vendor.css),
		[
			TASKS.LINT,
			TASKS.BUILD_CSS,
			TASKS.BUILD_VENDOR_JS,
			TASKS.BUILD_VENDOR_CSS,
			TASKS.CACHE_TEMPLATES,
			TASKS.BUILD_DEV
		]);
});

gulp.task(TASKS.SYNC, function () {
	console.log("=== initiating browser sync ===");

	browserSync({
		server: {
			baseDir: config.root.path
		}
	});
});

/********************************
 *  development distribution
 *******************************/

gulp.task(TASKS.DEV_DISTRIBUTE, [
	TASKS.BUILD_CSS,
	TASKS.CACHE_TEMPLATES,
	TASKS.BUILD_VENDOR_FONTS,
	TASKS.BUILD_ANGULAR,
	TASKS.BUILD_DEV,
	TASKS.WATCH,
	TASKS.SYNC
]);

/********************************
 *  production distribution
 *******************************/

gulp.task(TASKS.DISTRIBUTE, function (cb) {
	runSequence(TASKS.CACHE_TEMPLATES, [
		TASKS.INSTALL,
		TASKS.BUILD_CSS,
		TASKS.BUILD_VENDOR_JS,
		TASKS.BUILD_VENDOR_CSS,
		TASKS.BUILD_VENDOR_FONTS,
		TASKS.BUILD_ANGULAR_PRODUCTION,
		TASKS.BUILD_PRODUCTION
	], cb);
});

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
