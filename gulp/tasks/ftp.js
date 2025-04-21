import gulp from 'gulp';
import vinylFTP from 'vinyl-ftp';
import util from 'gulp-util';

import { configFTP } from '../config/ftp.js';
import { filePaths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';

const ftp = () => {
  configFTP.log = util.log;
  const ftpConnect = vinylFTP.create(configFTP);

  return gulp
    .src([
      `${filePaths.themeFolder}/**/*`,  // Все файлы и папки внутри директории темы
      `!${filePaths.themeFolder}/src/**`,  // Исключаем src
      `!${filePaths.themeFolder}/node_modules/**`,  // Исключаем node_modules
      `!${filePaths.themeFolder}/gulp/**`,  // Исключаем node_modules
      `!${filePaths.themeFolder}/gulpfile.js`, // Исключаем gulpfile.js
      `!${filePaths.themeFolder}/package.json`,  // Исключаем package.json
      `!${filePaths.themeFolder}/package-lock.json`,  // Исключаем package-lock.json
      `!${filePaths.themeFolder}/stylelint.config.js`,  // Исключаем stylelint.config.js
      `!${filePaths.themeFolder}/webpack.config.js`,  // Исключаем webpack.config.js
      `!${filePaths.themeFolder}/composer.json`  // Исключаем composer.json
    ], { base: '.', buffer: false }) // `base` чтобы сохранить структуру директорий, `buffer` для улучшения производительности при работе с большим количеством файлов
    .pipe(plugins.handleError('FTP'))
    .pipe(ftpConnect.dest(`/${filePaths.ftp}`));
};

export { ftp };
