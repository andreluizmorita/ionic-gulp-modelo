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

var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var imageop = require('gulp-image-optimization');
var htmlmin = require('gulp-html-minifier');
var deletefile = require('gulp-delete-file');
var webserver = require('gulp-webserver');
var del = require('del');

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

gulp.task('watch-jshint', ['watch-js']);

gulp.task('jshint', function() {
	return gulp.src([paths.folderDev+'/sections/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch-js', function() {
	gulp.watch([paths.folderDev+'/sections/**/*.js'], ['jshint']);
});

gulp.task('watch-css', function() {
	gulp.watch([paths.folderDev+'/sections/**/*.css'], ['concat-css']);
});

gulp.task('watch-dev-concat', function() {
	gulp.watch([
		paths.folderDev+'/sections/**/*.css',
		paths.folderDev+'/sections/**/*.js',
	], ['concat-js','concat-css']);
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

gulp.task('minify-images', function(cb) {
    gulp.src([
    	paths.folderDev+'/assets/img/**/*.png',
    	paths.folderDev+'/assets/img/**/*.jpg',
    	paths.folderDev+'/assets/img/**/*.gif',
    	paths.folderDev+'/assets/img/**/*.jpeg'
    ])
    .pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    }))
    .pipe(gulp.dest(paths.folderDist+'/assets/img'))
	.on('end', cb).on('error', cb);
});

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
 
gulp.task('index-server-dev', function() {
	del([paths.folderDev+'/index.html']);
	
	gulp.src(paths.folderDev+'/dev.html')
		.pipe(rename('index.html'))
        .pipe(gulp.dest('./'+paths.folderDev));
});

gulp.task('index-server-dist', function() {
	del([paths.folderDev+'/index.html']);
	
	gulp.src(paths.folderDev+'/dist.html')
		.pipe(rename('index.html'))
        .pipe(gulp.dest('./'+paths.folderDev));
});

gulp.task('server-dev-concat', function() {
  	gulp.src('./www-dev')
	    .pipe(webserver({
	    	host:'localhost',
	    	port:8001,
	    	//directoryListing: { path: 'www-dev' },
	  		livereload: false,
			//directoryListing: true,
	      	open: true
	    }));
});

gulp.task('server-dev', function() {
  	gulp.src('./www-dev')
	    .pipe(webserver({
	    	host:'localhost',
	    	port:8001,
	    	//directoryListing: { path: 'www-dev' },
	  		livereload: true,
			//directoryListing: true,
	      	open: true
	    }));
});

gulp.task('server-build', function() {
  	gulp.src('./www')
	    .pipe(webserver({
	    	host:'localhost',
	    	port:8001,
	  		livereload: true,
			//directoryListing: true,
	      	open: true
	    }));
});

gulp.task('webserver-build', ['build-dist','index-server-dist','server-build']);

gulp.task('webserver-dev', ['index-server-dev','server-dev','watch-jshint']);

gulp.task('webserver-dev-concat', [
	'ionic-sass',
	'concat-css',
	'minify-css',
	'concat-js',
	'minify-js',
	'index-server-dist',
	'server-dev',
	'watch-jshint',
	'watch-dev-concat'
]);





