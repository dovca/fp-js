const gulp = require('gulp');
const gulpPreprocess = require('gulp-preprocess');
const gulpTerser = require('gulp-terser');
const gulpClone = require('gulp-clone');
const gulpRename = require('gulp-rename');
const gulpReplace = require('gulp-replace');

const PATH_SRC = './src';
const PATH_DIST = './dist';

const SRC_GLOB_MODULES = `${PATH_SRC}/modules/*.js`;
const SRC_GLOB_ALL = `${PATH_SRC}/**/*.js`;

gulp.task('build', () => {
	const clone	= gulpClone.sink();

	return gulp
		.src(SRC_GLOB_MODULES)
		.pipe(gulpPreprocess())
		.pipe(clone)
		.pipe(gulpTerser({ecma: 8}))
		.pipe(gulpReplace('()=>', 'Q=>'))
		.pipe(gulpRename({suffix: '.min'}))
		.pipe(clone.tap())
		.pipe(gulp.dest(`${PATH_DIST}`));
});

gulp.task('watch', () => {
	return gulp.watch(SRC_GLOB_ALL, gulp.series(['build']));
});

gulp.task('default', gulp.series(['build', 'watch']));