import gulp from 'gulp';
import { filePaths } from './gulp/config/paths.js';
import { plugins } from './gulp/config/plugins.js';

/**
 * Импорт задач
 */
import { copy } from './gulp/tasks/copy.js';
import { copyRootFiles } from './gulp/tasks/copyRootFiles.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { fonts } from './gulp/tasks/fonts.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';

// Передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: filePaths,
  gulp,
  plugins,
};

const isBuild = process.argv.includes('--build');
const isDev = !process.argv.includes('--build');

/**
 * Наблюдатель за изменениями в файлах
 */
function watcher() {
  gulp.watch(filePaths.watch.static, gulp.series(copy));
  gulp.watch(filePaths.watch.html, gulp.series(html));
  gulp.watch(filePaths.watch.htmlScss, gulp.series(scss));
  gulp.watch(filePaths.watch.scss, gulp.series(scss));
  gulp.watch(filePaths.watch.js, gulp.series(js));
  gulp.watch(filePaths.watch.images, gulp.series(images));
  gulp.watch(filePaths.watch.fonts, gulp.series(fonts));
}

/**
 * Параллельные задачи в режиме разработки
 */
const devTasks = gulp.parallel(copy, copyRootFiles, html, scss, js, images, fonts);

/**
 * Основные задачи
 */
const mainTasks = gulp.series(devTasks);

/**
 * Построение сценариев выполнения задач
 */
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

/**
 * Выполнение сценария по умолчанию
 */
gulp.task('default', dev);

/**
 * Экспорт сценариев
 */
export { dev, build, deployZIP, deployFTP, isBuild, isDev };
