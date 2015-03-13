var gulp        = require ('gulp')
    , compass   = require ('gulp-compass')
    , concatCss = require ('gulp-concat-css')
    , webpack   = require ('gulp-webpack')
    , wp        = require ('webpack')
    , plumber   = require ('gulp-plumber')
    , path      = require ('path');

function onError () {
  this.emit('end');
};

gulp.task('sass', function () {
  return gulp.src('front/src/scss/*.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(compass({
      project: path.join(__dirname, 'front/src'),
      css: 'css',
      sass: 'scss'
    }))
    .pipe(gulp.dest('front/src/css/'));
});

gulp.task('concat-css', function () {
  var files = ['node_modules/bootstrap/dist/css/bootstrap.css', 'front/src/css/*.css'];

  return gulp.src(files)
    .pipe(concatCss('styles.css'))
    .pipe(gulp.dest('front/build/css/'));
});

gulp.task('webpack', function () {
  return gulp.src('front/src/js/app.js')
    .pipe(webpack({
      output: {
        filename: 'app.js'
      },
      resolve: {
        extensions: ['', '.js', '.jsx']
      },
      module: {
        loaders: [
          { test: /\.jsx?$/, loader: 'jsx-loader' }
        ]
      },
      plugins: [
        new wp.ProvidePlugin({
          $: 'jquery'
          , jQuery: 'jquery'
          , _: 'underscore'
          , Backbone: 'backbone'
          , React: 'react'
          , io: 'socket.io-client/socket.io.js'
        })
      ]
    }))
    .pipe(gulp.dest('front/build/js/'));
});

gulp.task('watch', function () {
  gulp.watch('front/src/scss/*.scss', ['sass']);
  gulp.watch('front/src/css/*.css', ['concat-css']);
  gulp.watch('front/src/js/**/*.{js,jsx}', ['webpack']);
  gulp.watch('front/src/js/components/**/*.jsx', ['webpack']);
});

gulp.task('default', ['sass', 'concat-css', 'webpack', 'watch']);
