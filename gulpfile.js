'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var shell = require('gulp-shell');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-html-minifier');
var deletefile = require('gulp-delete-file');
var webserver = require('gulp-webserver');
var del = require('del');
var path = require('path');
var less = require('gulp-less');
var connect = require('gulp-connect');
var open = require('gulp-open');
var runSequence = require('run-sequence');

var paths = {
	folderDist: './www',
	folderHtml: './www-dev/sections/**/*.html',
	folderSass: './www-dev/sections/**/*.scss',
	folderLess: './www-dev/sections/**/*.less',
	folderDev: './www-dev',
	folderJs: [
		'./www-dev/sections/**/*.module.js',
		'./www-dev/sections/**/*.*.js',
		'./www-dev/sections/**/*.js',
		'./www-dev/app.js'
	],
	folderCss:[
		'./www-dev/sections/**/*.css'
	]
};

var options = {
	uri: 'http://localhost:8003',
	app: '/Applications/Google\ Chrome.app'
};

gulp.task('ionic-sass', function(done) {
	gulp.src('./scss/ionic.app.scss')
		.pipe(sass())
		.on('error', sass.logError)
		.pipe(gulp.dest(paths.folderDev+'/sections/app/scss/'))
});

gulp.task('sections-sass', function(done) {
	return gulp.src([
		paths.folderSass,
		'!www-dev/sections/scss/**/inc/*',
		'!www-dev/sections/scss/**/inc/**/*'
	])
	.pipe(sass())
	.on('error', sass.logError)
	.pipe(gulp.dest(paths.folderDev+'/sections/'))
});

gulp.task('sections-less', function () {
  	return gulp.src([
  		paths.folderLess,
		'!www-dev/sections/less/**/inc/*',
		'!www-dev/sections/less/**/inc/**/*'
  	])
    .pipe(less())
    .pipe(gulp.dest(paths.folderDev+'/sections/'));

});

gulp.task('jshint', function() {
	return gulp.src([
		paths.folderDev+'/sections/**/*.module.js',
		paths.folderDev+'/sections/**/*.js',
		paths.folderDev+'/app.js'
	])
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('html', function () {
  	console.log('HTML-reload');
  	
  	gulp.src([
  		paths.folderHtml
  	])
    .pipe(connect.reload());
});

gulp.task('concat-js', function() {
	/* --- Concatena todos os arquivo JS e salva na pasta www-dev/assets/js/script.js ---*/
	return gulp.src([
		paths.folderDev+'/sections/**/*.module.js',
		paths.folderDev+'/sections/**/*.directive.js',
		paths.folderDev+'/sections/**/*.filter.js',
		paths.folderDev+'/sections/**/*.service.js',
		paths.folderDev+'/sections/**/*.factory.js',
		paths.folderDev+'/sections/**/*.run.js',
		paths.folderDev+'/sections/**/*.route.js',
		paths.folderDev+'/sections/**/*.js',
		paths.folderDev+'/app.js'
	])
	.pipe(sourcemaps.init())
	.pipe(concat('scripts.js'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(paths.folderDev+'/assets/js/'))
	//.pipe(gulp.dest(paths.folderDist+'/assets/js/'))
	.pipe(connect.reload());
});

gulp.task('concat-css', function() {
	/* --- Concatena todos os arquivo CSS e salva na pasta www-dev/assets/css/styles.css ---*/
	return gulp.src([
		paths.folderDev+'/sections/**/*.css'
	])
	.pipe(sourcemaps.init())
	.pipe(concat('styles.css'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(paths.folderDev+'/assets/css/'))
	//.pipe(gulp.dest(paths.folderDist+'/assets/css/'))
	.pipe(connect.reload());
});

/* --- MINIFY ------------------------------ */
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

gulp.task('compress-images-www', function() {
	gulp.src([
    	paths.folderDev+'/assets/img/**/*.png',
    	paths.folderDev+'/assets/img/**/*.jpg',
    	paths.folderDev+'/assets/img/**/*.gif',
    	paths.folderDev+'/assets/img/**/*.jpeg'
    ])
    .pipe(imagemin([
	    imagemin.gifsicle({interlaced: true}),
	    imagemin.jpegtran({progressive: true}),
	    imagemin.optipng({optimizationLevel: 5}),
	    imagemin.svgo({plugins: [{removeViewBox: true}]})
	]))
    .pipe(gulp.dest(paths.folderDist+'/assets/img'));
    
	gulp.src(paths.folderDev+'/dist.html')
	.pipe(rename('index.html'))
    .pipe(gulp.dest('./'+paths.folderDist));
});

gulp.task('minify-html', function() {
  	return gulp.src([paths.folderHtml])
	.pipe(htmlmin({
		collapseWhitespace: true,
		removeComments: true
	}))
	.pipe(gulp.dest(paths.folderDist+'/sections'));
});

gulp.task('copy-vendors', function() {
	return  gulp.src([
		paths.folderDev+'/vendors/**/*'
	])
    .pipe(gulp.dest(paths.folderDist+'/vendors'));   
});

gulp.task('copy-fonts', function(){
 	return gulp.src([
		paths.folderDev+'/assets/fonts/**/*'
	])
    .pipe(gulp.dest(paths.folderDist+'/assets/fonts'));
});

gulp.task('replace-index-dev', function() {
	del([paths.folderDev+'/index.html']);
	
	gulp.src(paths.folderDev+'/dev.html')
		.pipe(rename('index.html'))
        .pipe(gulp.dest('./'+paths.folderDev));
});

gulp.task('replace-index-dev-concat', function() {
	del([paths.folderDev+'/index.html']);
	
	gulp.src(paths.folderDev+'/dev-concat.html')
		.pipe(rename('index.html'))
        .pipe(gulp.dest('./'+paths.folderDev));
});

gulp.task('replace-index-dist', function() {
	del([paths.folderDev+'/index.html']);
	
	gulp.src(paths.folderDev+'/dist.html')
		.pipe(rename('index.html'))
        .pipe(gulp.dest('./'+paths.folderDist));
});

gulp.task('connect-dev-concat', function(){
	connect.server({
    	root: paths.folderDev,
	    port: 8003,
	    livereload: true
  	});
});

gulp.task('concat-minify-css-www', function(){
	return gulp.src([
		paths.folderDev+'/sections/**/*.css'
	])
	.pipe(sourcemaps.init())
	.pipe(concat('styles.css'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(paths.folderDist+'/assets/css/'))
	.pipe(rename('styles.min.js'))
	.pipe(cleanCSS({debug: true}, function(details) {
	    console.log(details.name + ': ' + details.stats.originalSize);
	    console.log(details.name + ': ' + details.stats.minifiedSize);
	}))
	.pipe(gulp.dest(paths.folderDist+'/assets/css'));
});

gulp.task('concat-minify-js-www', function(){
	return gulp.src([
		paths.folderDev+'/sections/**/*.module.js',
		paths.folderDev+'/sections/**/*.directive.js',
		paths.folderDev+'/sections/**/*.filter.js',
		paths.folderDev+'/sections/**/*.service.js',
		paths.folderDev+'/sections/**/*.factory.js',
		paths.folderDev+'/sections/**/*.run.js',
		paths.folderDev+'/sections/**/*.route.js',
		paths.folderDev+'/sections/**/*.js',
		paths.folderDev+'/app.js'
	])
	.pipe(sourcemaps.init())
	.pipe(concat('scripts.js'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(paths.folderDist+'/assets/js'))
	.pipe(rename('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest(paths.folderDist+'/assets/js'));
});

gulp.task('shell-ionic-serve', shell.task([
  'ionic serve',
  'clear'
]));

gulp.task('ionic-serve', function(done) {
    runSequence('build-www', 'shell-ionic-serve', function() {
        console.log('Run something else');
        done();
    });
});
gulp.task('build-www',[
	'compress-images-www',
	'copy-fonts',
	'copy-vendors'
],function(){

    gulp.src([
		paths.folderDev+'/sections/**/*.css'
	])
	.pipe(sourcemaps.init())
	.pipe(concat('styles.css'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(paths.folderDist+'/assets/css/'))
	.pipe(rename('styles.min.css'))
	.pipe(cleanCSS({debug: true}, function(details) {
	    console.log(details.name + ': ' + details.stats.originalSize);
	    console.log(details.name + ': ' + details.stats.minifiedSize);
	}))
	.pipe(gulp.dest(paths.folderDist+'/assets/css/'));

	gulp.src([
		paths.folderDev+'/sections/**/*.module.js',
		paths.folderDev+'/sections/**/*.directive.js',
		paths.folderDev+'/sections/**/*.filter.js',
		paths.folderDev+'/sections/**/*.service.js',
		paths.folderDev+'/sections/**/*.factory.js',
		paths.folderDev+'/sections/**/*.run.js',
		paths.folderDev+'/sections/**/*.route.js',
		paths.folderDev+'/sections/**/*.js',
		paths.folderDev+'/app.js'
	])
	.pipe(sourcemaps.init())
	.pipe(concat('scripts.js'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(paths.folderDist+'/assets/js'))
	.pipe(rename('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest(paths.folderDist+'/assets/js'));

    gulp.src([paths.folderHtml])
	.pipe(htmlmin({
		collapseWhitespace: true,
		removeComments: true
	}))
	.pipe(gulp.dest(paths.folderDist+'/sections'));    
});

gulp.task('build-dev-concat', [
	'replace-index-dev-concat',
	'sections-sass',
	'sections-less',
	'concat-js',
	'concat-css'
]);

gulp.task('watch-dev-concat',[
	'sections-sass', 
	'sections-less', 
	'concat-js', 
	'concat-css',
	'jshint'
], function(){
	gulp.watch([paths.folderSass], ['sections-sass']);
	gulp.watch([paths.folderLess], ['sections-less']);
	gulp.watch([paths.folderJs], ['jshint','concat-js']);
	gulp.watch([paths.folderCss], ['concat-css']);
	gulp.watch([paths.folderHtml], ['html']);
});

/* INICIA O SERVIDOR WEB */
gulp.task('build-www-dev', [
	'build-dev-concat',
	'connect-dev-concat',
	'watch-dev-concat'
], function(){
	gulp.src('./').pipe(open(options));
});




