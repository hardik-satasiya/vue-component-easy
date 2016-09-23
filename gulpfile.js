/*****************************************/
/*****Do not change this config file  ****/
/****  Author : Hardik Satasiya 	  ****/
/*****************************************/

var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var prettify = require('gulp-prettify');
var gutil = require('gulp-util');

//var gutil = require('gulp-util');
var fs = require('fs');
var browserSync = require('browser-sync').create();
// var vueify = require('gulp-vueify');
var vueify = require('vueify');

var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
//var browserify = require('browserify');
var babelify = require('babelify');
PrettyError = require('pretty-error');
pe = new PrettyError();

var assets_path = "assets/";

/*****************************************/
/*****Templates pre-rendering function****/
/*****************************************/
function compileVue() {

 	return gulp.src('./templates/vue-js/vue-bundle.js')
        //.pipe(sourcemaps.init())
        .pipe(browserify({
        	transform: [
        		'vueify',
        		'babelify'
        	],
        	plugins: [
        		'browserify-hmr'
        	]
    	}))
    .on('error', swallowError)
    .pipe(gulp.dest("./site/assets/vue/"));
}

function preTemplateChanges() {

	nunjucksRender.nunjucks.configure(['templates/'], { watch: false });

    // use !(_)*.html to exclude rendering of the files with prefix "_" (underscore)
    return gulp.src(['templates/**/!(_)*.html', '!templates/**/*?copy?.html', '!templates/**/*-*Copy.html'])
        .pipe(nunjucksRender({
            css_path: assets_path + "css/",
            js_path: assets_path + "js/",
            lib_path: assets_path + "libs/",
            img_path: assets_path + "images/",
            fs: fs,
            /* The below setting is used to hide ".html" extension in url paths */
            /* It will generate a folder with file's name and insert the content in index.html file */
            /* Example: if you pass "home.html", it will compile to "home/index.html" */
            // ext: '/index.html'
        }))
        .on('error', function(error){
            //gutil.log(error.message);
        })
        .pipe(prettify({indent_size: 4}))
        // .on('error', swallowError)
        .pipe(gulp.dest('site'));


   //  browserify('./templates/vue-js/app.js')
	  // .transform("babelify", {
	  // 	presets: ['es2015'],
   //      plugins: ['transform-runtime']
	  // })
	  // .bundle()
	  // .pipe(fs.createWriteStream("./site/assets/vue/bundle.js"))




}

// Watches changes of templates
function watchChanges(){

	compileVue();
    preTemplateChanges();

    gulp.watch(['templates/**/*.html'],['normal-reload']);
    gulp.watch(['site/assets/js/*.js'],['normal-reload']);

    // vue files
    gulp.watch(['templates/vue-js/*.js'],['vue-reload']);
    gulp.watch(['templates/vue-js/**/*.vue'],['vue-reload']);

    // Static server
	browserSync.init({
        server: {
            baseDir: "./site/"
        }
    });
}

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('normal-reload', ['change-templates'], function (done) {
	console.log('normal');
    browserSync.reload();
    done();
});

gulp.task('vue-reload', ['compile-vue'], function (done) {
	console.log('only-vue');
    browserSync.reload();
    done();
});

// Tasks
gulp.task('compile-vue', compileVue);
gulp.task('change-templates', preTemplateChanges);


gulp.task('watch', watchChanges);
//
// gulp.task('watch', myfunction);

// function myfunction() {
// 	gulp.watch(['./*.js'],function(event){
// 		delete require.cache[require.resolve('./test')]
// 		var data = require('./test');
// 		data.testing();
// 	});
// }


var swallowError = function(error) {
  //console.log('-------------------------------------------');
  console.log(pe.render(error));
  //console.log('-------------------------------------------');
  this.emit('end');
};
