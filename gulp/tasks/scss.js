import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css'; // Сжатие CSS файла
import webpCss from 'gulp-webpcss'; // Вывод WEBP изображений
import autoPrefixer from 'gulp-autoprefixer'; // Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Группировка медиа запросов
import sassGlob from 'gulp-sass-glob';

import { filePaths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';
import { isBuild, isDev } from '../../gulpfile.js';

const sass = gulpSass(dartSass);

const scss = () => {
  return (
    gulp
      .src(filePaths.src.scss, { sourcemaps: isDev })
      .pipe(sassGlob())
      .pipe(plugins.handleError('SCSS'))
      .pipe(sass({ outputStyle: 'expanded' }))
      .pipe(plugins.replace(/@img\//g, '../images/'))
      .pipe(plugins.if(isBuild, groupCssMediaQueries()))
      .pipe(
        plugins.if(
          isBuild,
          autoPrefixer({
            grid: true,
            overrideBrowserslist: ['last 5 versions'],
            cascade: true,
          })
        )
      )
      /** Раскомментировать если нужен не сжатый дубль файла стилей */
      // .pipe(gulp.dest(filePaths.build.css))
      .pipe(plugins.if(isBuild, cleanCss()))
      .pipe(rename({ extname: '.min.css' }))
      .pipe(gulp.dest(filePaths.build.css), { sourcemaps: isDev })
      .pipe(plugins.browserSync.stream())
  );
};

export { scss };
