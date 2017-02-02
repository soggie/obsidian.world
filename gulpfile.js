const gulp = require('gulp')
const babel = require('gulp-babel')
const rename = require('gulp-rename')
const standard = require('gulp-standard')
const ava = require('gulp-ava')
const clean = require('gulp-clean')
const chmod = require('gulp-chmod')
const shell = require('gulp-shell')
const filter = require('gulp-filter')

const jsf = filter(['**/*.js'], { restore: true })

// Copy tasks. Copies files from the src directory over to the dist directory
// without performing ANY compilations or mutations in the code.
gulp.task('copy-env', () =>
  gulp.src('src/.env.dev')
    .pipe(rename('.env'))
    .pipe(gulp.dest('dist'))
)

gulp.task('copy-static', () =>
  gulp.src('src/public/**/*')
    .pipe(gulp.dest('dist/public'))
)

// Use standardjs to lint the code and output the format using the default
// reporter.
gulp.task('lint', () => 
  gulp.src('src/**/*.js')
    .pipe(standard())
    .pipe(standard.reporter('default', {}))
)

// Build tasks
gulp.task('clean-server', () => gulp.src('dist/server').pipe(clean()))
gulp.task('build-server', ['clean-server'], () => 
  gulp.src('src/server/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/server'))
)

gulp.task('clean-public', () => gulp.src('dist/public').pipe(clean()))
gulp.task('build-public', ['clean-public'], () =>
  gulp.src('src/public/**/*')
    .pipe(jsf)
    .pipe(babel())
    .pipe(jsf.restore)
    .pipe(gulp.dest('dist/public'))
)

gulp.task('clean-bin', () => gulp.src('dist/bin').pipe(clean()))
gulp.task('copy-bin', ['clean-bin'], () => 
  gulp.src('src/bin/**/*')
    .pipe(chmod(0o755))
    .pipe(gulp.dest('dist/bin'))
)

// Test tasks
gulp.task('test', ['build-server'], () => 
  gulp.src('dist/server/test/**/*.js')
    .pipe(ava({ verbose: true }))
)

gulp.task('default', ['lint', 'copy-bin', 'build-server', 'build-public'])
gulp.task('run', ['copy-bin', 'build-server', 'build-public'], shell.task('dist/bin/run'))