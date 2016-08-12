var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
	sass: ['./scss/**/*.scss'],
	folderDev: 'www-dev',
	folderDist: 'www'
};

gulp.task('default', ['ionic-sass']);

gulp.task('ionic-sass', function(done) {

	gulp.src('./scss/ionic.app.scss')
		.pipe(sass())
		.on('error', sass.logError)
		.pipe(gulp.dest(paths.folderDev+'/sections/app/'))
});

gulp.task('watch', function() {
	gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
	return bower.commands.install()
		.on('log', function(data) {
			gutil.log('bower', gutil.colors.cyan(data.id), data.message);
		});
});

gulp.task('git-check', function(done) {
	if (!sh.which('git')) {
		console.log(
			'  ' + gutil.colors.red('Git is not installed.'),
			'\n  Git, the version control system, is required to download Ionic.',
			'\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
			'\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
		);
		process.exit(1);
	}
	done();
});

var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

// define the default task and add the watch task to it
gulp.task('watch-jshint', ['watch-js']);

// configure the jshint task
gulp.task('jshint', function() {
	return gulp.src([paths.folderDev+'/sections/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch-js', function() {
	gulp.watch([paths.folderDev+'/sections/**/*.js'], ['jshint']);
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch-css', function() {
	gulp.watch([paths.folderDev+'/sections/**/*.css'], ['concat-css']);
});

gulp.task('concat-js', function() {
	return gulp.src([paths.folderDev+'/sections/**/*.module.js',paths.folderDev+'/sections/**/*.js',paths.folderDev+'/app.js'])
		.pipe(sourcemaps.init())
		.pipe(concat('scripts.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.folderDev+'/assets/js/'));
});

gulp.task('concat-css', function() {
	return gulp.src(paths.folderDev+'/sections/**/*.css')
		.pipe(sourcemaps.init())
		.pipe(concat('styles.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.folderDev+'/assets/css/'));
});

gulp.task('minify-css', function() {
  return gulp.src(paths.folderDev+'/assets/css/styles.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(paths.folderDist+'/assets/css'));
});

gulp.task('minify-js', function (done) {
	return gulp.src(paths.folderDev+'/assets/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(paths.folderDist+'/assets/js'));
    
});

var imageop = require('gulp-image-optimization');
 
gulp.task('minify-images', function(cb) {
    gulp.src([paths.folderDev+'/assets/img/**/*.png',paths.folderDev+'/assets/img/**/*.jpg',paths.folderDev+'/assets/img/**/*.gif',paths.folderDev+'/assets/img/**/*.jpeg'])
    .pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    }))
    .pipe(gulp.dest(paths.folderDist+'/assets/img'))
	.on('end', cb).on('error', cb);
});

var htmlmin = require('gulp-html-minifier');

gulp.task('minify-html', function() {
  	return gulp.src([paths.folderDev+'/sections/**/*.html'])
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(gulp.dest(paths.folderDist+'/sections'));
});

gulp.task('copy-vendors', function() {
	return  gulp.src([paths.folderDev+'/vendors/**/*'])
        .pipe(gulp.dest(paths.folderDist+'/vendors'));
    
});

var deletefile = require('gulp-delete-file');

gulp.task('copy-index', function(){
	 return gulp.src(paths.folderDev+'/index-dist.html')
   		.pipe(rename(paths.folderDist+'/index.html'))
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments:true
		}))
		.pipe(gulp.dest('./'));
});

gulp.task('build-dist', [
	'concat-css',
	'concat-js',
	'minify-css',
	'minify-js',
	'minify-images',
	'minify-html',
	'copy-vendors',
	'copy-index'
]);


