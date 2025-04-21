import gulp from 'gulp';
import fs from 'fs';
import chalk from 'chalk';
import fonter from 'gulp-fonter-fix';
import ttf2woff2 from 'gulp-ttf2woff2';

import { filePaths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';

const fontWeights = {
  thin: 100,
  extralight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  heavy: 800,
  black: 900,
};

const fonts = () => {
  return (
    gulp // Ищем файлы шрифтов .otf
      .src(`${filePaths.srcFolder}/fonts/*.*`)
      .pipe(gulp.dest(filePaths.build.fonts))
  );
};

export { fonts };