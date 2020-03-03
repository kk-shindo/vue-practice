/* webpackも試してみる */
const gulp        = require('gulp'),
      $           = require('gulp-load-plugins')(),
      // typescript  = require('gulp-typescript'),
      sourcemaps  = require('gulp-sourcemaps'),
      minifycss   = require('gulp-minify-css'),
      // mozjpeg     = require('imagemin-mozjpeg'),
      // pngquant    = require('imagemin-pngquant'),
      del         = require('del');

const setting = {
  autoprefixer: {
      browser: ['last 2 version', 'Explorer >= 11', 'Android >= 4', 'Android 2.3']
  },
  sass: {
    path: {
      pc: {
        src: 'assets/sass/**/*.scss',
        dest: 'assets/css/',
      },
      sp: {
        src: 's/assets/sass/**/*.scss',
        dest: 's/assets/css/',
      },
    },
  },
  ts: {
    path: {
      pc: {
        src: 'assets/ts/**/*.ts',
        dest: 'assets/js/',
      },
      sp: {
        src: 's/assets/ts/**/*.ts',
        dest: 's/assets/js/',
      },
    },
    options: {
      target: 'ES5',
      out: 'app.js',
      lib: ['ES5', 'dom']
    }
  },
  img: {
    quality: 80,
    path: {
      pc: {
        src: 'assets/img/**/*',
        dest: 'assets/img/',
      },
      sp: {
        src: 's/assets/img/**/*',
        dest: 's/assets/img/',
      }
    }
  },
};

// SASS
const scss = done => {
  for(var dir in setting.sass.path) {
    gulp.src(setting.sass.path[dir].src)
      .pipe($.plumber({
        errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
      }))
      .pipe(sourcemaps.init())
      .pipe($.sass({outputStyle: 'expanded'}))
      .pipe($.autoprefixer(setting.autoprefixer.browser))
      .pipe(minifycss({advanced:false})) // minify
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(setting.sass.path[dir].dest));
  }

  // DONE
  done();
}

// TypeScript
/* const ts = done => {
  for(var dir in setting.ts.path) {
    gulp.src(setting.ts.path[dir].src)
      .pipe($.plumber({
        errorHandler: $.notify.onError("Error: <%= error.message %>") //<-
      }))
      .pipe(sourcemaps.init())
      .pipe(typescript(setting.ts.options))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(setting.ts.path[dir].dest));
  }

  // DONE
  done();
} */

// image
/* const imgmin = done => {
  for(var dir in setting.img.path) {
    gulp.src(setting.img.path[dir].src)
    .pipe($.imagemin([
      mozjpeg({ quality: setting.img.quality }),
      pngquant(),
    ], {
      verbose: true
    }))
    .pipe($.imagemin())
    .pipe(gulp.dest(setting.img.path[dir].dest));
  }

  // DONE
  done();
} */

// Clean
const clean = done => {
  del([
      // assets/css以下を削除
      setting.sass.path.pc.dest,
      setting.sass.path.sp.dest,

      // assets/js/app.jsを削除
      // setting.ts.path.pc.dest+setting.ts.options.out,
      // setting.ts.path.sp.dest+setting.ts.options.out,

      // assets/js/app.js.mapを削除
      // setting.ts.path.pc.dest+setting.ts.options.out+".map",
      // setting.ts.path.sp.dest+setting.ts.options.out+".map",
  ]);

  // DONE
  done();
}

// Build
gulp.task('build', gulp.series(
  gulp.parallel(
    clean,
    scss,
    // ts,
    /* imgmin, */
  ),
  done => {
    done();
  }
 )
);

// Watch
gulp.task('watch', () => {
  gulp.watch([setting.sass.path.pc.src, setting.sass.path.sp.src], scss);
  // gulp.watch([setting.ts.path.pc.src, setting.ts.path.sp.src], ts);
});

gulp.task('default', gulp.task('watch'));
