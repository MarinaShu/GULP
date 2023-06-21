import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQeries from 'gulp-group-css-media-queries';

const sass = gulpSass(dartSass);

export const scss = () => {
	return app.gulp.src(app.path.src.scss, { sourcemaps: true })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SCSS",
				messager: "Error: <%= error.message %>"
			})
		))
		.pipe(app.plugins.replace(/@img\//g, '../img/'))
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(groupCssMediaQeries())
		.pipe(autoprefixer({
			grid: true,
			overrideBrowserslist: ["last 3 versions"],
			cascade: true
		}))
		.pipe(app.gulp.dest(app.path.build.css)) //несжатые стили
		.pipe(cleanCss())
		.pipe(rename({
			extname: ".min.css"
		}))
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.browsersync.stream());
};