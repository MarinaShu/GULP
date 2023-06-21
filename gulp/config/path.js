import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
	build: {
		files: `${buildFolder}/assets/files/`,
		html: `${buildFolder}/`,
		css: `${buildFolder}/assets/css/`,
		js: `${buildFolder}/assets/js/`,
		images: `${buildFolder}/assets/img/`,
		fonts: `${buildFolder}/assets/fonts/`,
	},
	src: {
		files: `${srcFolder}/assets/files/**/*.*`,
		html: `${srcFolder}/*.html`,
		js: `${srcFolder}/assets/js/*.js`,
		images: `${srcFolder}/assets/img/**/*.{jpg,jpeg,png,svg,gif}`,
		scss: `${srcFolder}/partials/style.sass`,
		fonts: `${srcFolder}/assets/fonts/`,
	},
	watch: {
		files: `${srcFolder}/assets/files/**/*.*`,
		html: `${srcFolder}/**/*.html`,
		scss: `${srcFolder}/**/*.sass`,
		js: `${srcFolder}/**/*.js`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif}`,
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	// ftp: `test`
}