import dotenv from 'dotenv';
dotenv.config();

import gulp from 'gulp';
import codacy from 'gulp-codacy';

gulp.task('codacy', () => {
  gulp
    .src(['./coverage/lcov.info'], { read: false })
    .pipe(codacy({
      token: process.env.ECOUTEBOT_CODACY_TOKEN,
    }));
});
