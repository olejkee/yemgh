import path from 'path';

const projectDirName = path.basename(path.resolve());
const themeFolder = `.`;
const buildFolder = `./dist`;
const srcFolder = `./src`;

const filePaths = {
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    images: `${buildFolder}/images/`,
    fonts: `${buildFolder}/fonts/`,
    static: `${buildFolder}/static/`,
  },
  src: {
    js: `${srcFolder}/js/app.js`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/images/**/*.svg`,
    scss: `${srcFolder}/scss/style.scss`,
    html: `${srcFolder}/*.html`,
    static: `${srcFolder}/static/**/*.*`,
    svgIcons: `${srcFolder}/icons/*.svg`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/scss/**/*.scss`,
    html: `${srcFolder}/**/*.html`,
    htmlScss: `${srcFolder}/**/*.scss`,
    images: `${srcFolder}/**/*.{jpg,jpeg,png,svg,gif,webp,ico}`,
    static: `${srcFolder}/static/**/*.*`,
    fonts: `${srcFolder}/fonts/**/*.*`,
  },
  clean: buildFolder,
  themeFolder: themeFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  projectDirName: projectDirName,
  ftp: ``, // Путь к нужной папке на удаленном сервере. Gulp добавит имя папки проекта автоматически
};

export { filePaths };
